import { vi } from "vitest";

/**
 * The two jsdom gaps `ThemeProvider` runs into, in one place.
 *
 * Test-only — never imported by `src/index.ts`, so it isn't bundled or shipped.
 * The filename deliberately doesn't end in `.test.ts`, so Vitest doesn't try to
 * run it as a suite.
 *
 * - **`localStorage`**: jsdom's default opaque origin exposes none, so reading it
 *   throws. Backed by a `Map` here.
 * - **`matchMedia`**: jsdom ships none at all, and `theme="system"` resolves
 *   through it. Stubbed so a test can drive the OS preference.
 *
 * ```ts
 * const env = installThemeTestEnv();
 * beforeEach(() => env.reset());
 * env.setSystemDark(true); // the OS just went dark
 * ```
 */
export function installThemeTestEnv() {
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

  let prefersDark = false;
  const listeners = new Set<() => void>();

  function installMatchMedia() {
    vi.stubGlobal("matchMedia", (query: string) => ({
      // A getter, not a snapshot: `ThemeProvider` holds on to the MediaQueryList
      // and re-reads `.matches` when the listener fires.
      get matches() {
        return query.includes("dark") ? prefersDark : false;
      },
      media: query,
      onchange: null,
      addEventListener: (_: string, fn: () => void) => void listeners.add(fn),
      removeEventListener: (_: string, fn: () => void) => void listeners.delete(fn),
      addListener: (fn: () => void) => void listeners.add(fn),
      removeListener: (fn: () => void) => void listeners.delete(fn),
      dispatchEvent: () => false,
    }));
  }

  return {
    /** Flip the simulated OS preference and notify anything listening. */
    setSystemDark(value: boolean) {
      prefersDark = value;
      for (const fn of listeners) fn();
    },
    /** Clear storage, the document attributes and the listener set. Call in `beforeEach`. */
    reset() {
      prefersDark = false;
      listeners.clear();
      store.clear();
      document.documentElement.className = "";
      document.documentElement.removeAttribute("data-accent");
      document.documentElement.removeAttribute("data-theme");
      installMatchMedia();
    },
  };
}
