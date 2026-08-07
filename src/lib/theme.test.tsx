import "@testing-library/jest-dom/vitest";
import { act, render, renderHook, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider, themeInitScript, useTheme } from "./theme";

// jsdom ships no matchMedia — install a controllable stub so "system" is testable.
let prefersDark = false;
const listeners = new Set<() => void>();

function setSystemDark(value: boolean) {
  prefersDark = value;
  for (const fn of listeners) fn();
}

// jsdom's default opaque origin exposes no localStorage — back it with a Map.
const store = new Map<string, string>();
const localStorageMock: Storage = {
  getItem: (key) => store.get(key) ?? null,
  setItem: (key, value) => void store.set(key, String(value)),
  removeItem: (key) => void store.delete(key),
  clear: () => store.clear(),
  key: (index) => [...store.keys()][index] ?? null,
  get length() {
    return store.size;
  },
};
Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
  configurable: true,
  writable: true,
});

beforeEach(() => {
  prefersDark = false;
  listeners.clear();
  window.localStorage.clear();
  document.documentElement.className = "";
  document.documentElement.removeAttribute("data-accent");
  document.documentElement.removeAttribute("data-theme");
  vi.stubGlobal(
    "matchMedia",
    (query: string) =>
      ({
        get matches() {
          return query.includes("dark") ? prefersDark : false;
        },
        media: query,
        addEventListener: (_: string, fn: () => void) => listeners.add(fn),
        removeEventListener: (_: string, fn: () => void) => listeners.delete(fn),
        // legacy API some libs still call
        addListener: (fn: () => void) => listeners.add(fn),
        removeListener: (fn: () => void) => listeners.delete(fn),
        dispatchEvent: () => true,
        onchange: null,
      }) as unknown as MediaQueryList,
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
});

function wrapper(props: Partial<React.ComponentProps<typeof ThemeProvider>> = {}) {
  return ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider {...props}>{children}</ThemeProvider>
  );
}

describe("ThemeProvider / useTheme", () => {
  it("toggles the .dark class on <html> when set to dark", () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: wrapper({ defaultTheme: "light" }),
    });
    expect(document.documentElement).not.toHaveClass("dark");
    act(() => result.current.setTheme("dark"));
    expect(document.documentElement).toHaveClass("dark");
    expect(result.current.resolvedTheme).toBe("dark");
  });

  it("persists theme + accent to localStorage and mirrors data-accent", () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: wrapper({ defaultTheme: "light" }),
    });
    act(() => result.current.setTheme("dark"));
    act(() => result.current.setAccent("rust"));
    expect(window.localStorage.getItem("mlz-theme")).toBe("dark");
    expect(window.localStorage.getItem("mlz-accent")).toBe("rust");
    expect(document.documentElement.getAttribute("data-accent")).toBe("rust");
  });

  it("rehydrates the stored theme + accent on mount", () => {
    window.localStorage.setItem("mlz-theme", "dark");
    window.localStorage.setItem("mlz-accent", "green");
    const { result } = renderHook(() => useTheme(), { wrapper: wrapper() });
    expect(result.current.theme).toBe("dark");
    expect(result.current.accent).toBe("green");
    expect(document.documentElement).toHaveClass("dark");
    expect(document.documentElement.getAttribute("data-accent")).toBe("green");
  });

  it("follows prefers-color-scheme under 'system'", () => {
    prefersDark = true;
    const { result } = renderHook(() => useTheme(), {
      wrapper: wrapper({ defaultTheme: "system" }),
    });
    expect(result.current.resolvedTheme).toBe("dark");
    act(() => setSystemDark(false));
    expect(result.current.resolvedTheme).toBe("light");
    expect(document.documentElement).not.toHaveClass("dark");
  });

  it("throws when useTheme is used outside a provider", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => renderHook(() => useTheme())).toThrow(/within a <ThemeProvider>/);
    spy.mockRestore();
  });

  it("renders children", () => {
    render(
      <ThemeProvider>
        <span>hello</span>
      </ThemeProvider>,
    );
    expect(screen.getByText("hello")).toBeInTheDocument();
  });
});

describe("themeInitScript", () => {
  it("embeds the configured storage keys and defaults", () => {
    const script = themeInitScript({ defaultTheme: "dark", defaultAccent: "blue" });
    expect(script).toContain("mlz-theme");
    expect(script).toContain("mlz-accent");
    expect(script).toContain('"dark"');
    expect(script).toContain('"blue"');
    expect(script).toContain("classList.toggle");
  });

  it("uses data-theme when attribute is data-theme", () => {
    const script = themeInitScript({ attribute: "data-theme" });
    expect(script).toContain("setAttribute");
    expect(script).not.toContain("classList.toggle");
  });

  it("escapes values so they cannot break out of the inline <script> tag", () => {
    const evil = "</script><script>alert(1)</script>";
    const script = themeInitScript({ storageKey: evil, accentStorageKey: "a b c" });
    // No raw sequence can terminate the surrounding <script> or inject a new one.
    expect(script).not.toContain("</script>");
    expect(script).not.toContain("<script");
    expect(script).not.toContain(" ");
    expect(script).not.toContain(" ");
    // …but the escaped value still decodes to the original at runtime.
    const key = script.match(/getItem\(("(?:[^"\\]|\\.)*")\)/)?.[1];
    expect(key && JSON.parse(key)).toBe(evil);
  });
});
