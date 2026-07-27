import * as React from "react";
import type { AccentName } from "../tokens";

/**
 * MLZ Design — theme runtime.
 *
 * The tokens in `styles/theme.css` already carry a full light + dark palette and
 * five `data-accent` families; all a consuming app needs is something to flip the
 * `.dark` class (and `data-accent`) on `<html>`, remember the choice, and follow
 * the OS when asked. That's this file — a tiny, zero-dependency, framework-agnostic
 * provider (next-themes-shaped) so downstream apps get real light/dark + accent
 * switching without hand-rolling it.
 *
 * Pair `<ThemeProvider>` with {@link themeInitScript} inlined in `<head>` to set
 * the class before first paint (no flash of the wrong theme on load / SSR).
 */

export type Theme = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

const THEMES: readonly Theme[] = ["light", "dark", "system"];
const ACCENTS: readonly AccentName[] = ["cyan", "blue", "green", "rust", "ink"];

export interface ThemeProviderProps {
  children: React.ReactNode;
  /** Initial theme when nothing is stored. Default `"system"`. */
  defaultTheme?: Theme;
  /** Initial accent family when nothing is stored. Default `"cyan"`. */
  defaultAccent?: AccentName;
  /** localStorage key for the theme. Default `"mlz-theme"`. */
  storageKey?: string;
  /** localStorage key for the accent. Default `"mlz-accent"`. */
  accentStorageKey?: string;
  /** Whether `"system"` is honoured (follows `prefers-color-scheme`). Default `true`. */
  enableSystem?: boolean;
  /**
   * How the resolved theme is written to `<html>`. `"class"` toggles the `.dark`
   * class (matches theme.css and the Storybook toolbar); `"data-theme"` sets
   * `data-theme="light|dark"`. Default `"class"`.
   */
  attribute?: "class" | "data-theme";
}

interface ThemeContextValue {
  /** The chosen theme, including `"system"`. */
  theme: Theme;
  setTheme: (theme: Theme) => void;
  /** The concrete theme actually applied (`"system"` resolved to light/dark). */
  resolvedTheme: ResolvedTheme;
  accent: AccentName;
  setAccent: (accent: AccentName) => void;
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

const isBrowser = typeof window !== "undefined";

function prefersDark(): boolean {
  return isBrowser && window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function readStored<T extends string>(key: string, fallback: T, allowed: readonly T[]): T {
  if (!isBrowser) return fallback;
  try {
    const value = window.localStorage.getItem(key) as T | null;
    return value && allowed.includes(value) ? value : fallback;
  } catch {
    return fallback;
  }
}

function writeStored(key: string, value: string): void {
  if (!isBrowser) return;
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* storage can throw (private mode, quota) — theme still works in-memory */
  }
}

function applyToDocument(
  resolved: ResolvedTheme,
  accent: AccentName,
  attribute: "class" | "data-theme",
): void {
  if (!isBrowser) return;
  const root = document.documentElement;
  if (attribute === "class") {
    root.classList.toggle("dark", resolved === "dark");
  } else {
    root.setAttribute("data-theme", resolved);
  }
  root.setAttribute("data-accent", accent);
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  defaultAccent = "cyan",
  storageKey = "mlz-theme",
  accentStorageKey = "mlz-accent",
  enableSystem = true,
  attribute = "class",
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<Theme>(() =>
    readStored(storageKey, defaultTheme, THEMES),
  );
  const [accent, setAccentState] = React.useState<AccentName>(() =>
    readStored(accentStorageKey, defaultAccent, ACCENTS),
  );
  const [systemDark, setSystemDark] = React.useState<boolean>(() => prefersDark());

  const effectiveTheme: Theme = !enableSystem && theme === "system" ? "light" : theme;
  const resolvedTheme: ResolvedTheme =
    effectiveTheme === "system" ? (systemDark ? "dark" : "light") : effectiveTheme;

  // Follow the OS while on "system".
  React.useEffect(() => {
    if (!isBrowser || !enableSystem) return;
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => setSystemDark(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [enableSystem]);

  // Keep <html> in sync with the resolved theme + accent.
  React.useEffect(() => {
    applyToDocument(resolvedTheme, accent, attribute);
  }, [resolvedTheme, accent, attribute]);

  const setTheme = React.useCallback(
    (next: Theme) => {
      setThemeState(next);
      writeStored(storageKey, next);
    },
    [storageKey],
  );

  const setAccent = React.useCallback(
    (next: AccentName) => {
      setAccentState(next);
      writeStored(accentStorageKey, next);
    },
    [accentStorageKey],
  );

  const value = React.useMemo<ThemeContextValue>(
    () => ({ theme, setTheme, resolvedTheme, accent, setAccent }),
    [theme, setTheme, resolvedTheme, accent, setAccent],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/** Read + control the current theme and accent. Must be used under `<ThemeProvider>`. */
export function useTheme(): ThemeContextValue {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a <ThemeProvider>.");
  }
  return ctx;
}

export interface ThemeInitScriptOptions {
  storageKey?: string;
  accentStorageKey?: string;
  defaultTheme?: Theme;
  defaultAccent?: AccentName;
  attribute?: "class" | "data-theme";
}

/**
 * A blocking `<script>` body that applies the stored (or default) theme + accent
 * to `<html>` *before first paint*, so there's no flash of the wrong theme on
 * load. Inline the returned string in `<head>`, ahead of your styles:
 *
 * ```tsx
 * <script dangerouslySetInnerHTML={{ __html: themeInitScript() }} />
 * ```
 *
 * Keep the options identical to the matching `<ThemeProvider>` props.
 */
export function themeInitScript(options: ThemeInitScriptOptions = {}): string {
  const {
    storageKey = "mlz-theme",
    accentStorageKey = "mlz-accent",
    defaultTheme = "system",
    defaultAccent = "cyan",
    attribute = "class",
  } = options;
  // This string is inlined into an HTML <script>. JSON.stringify escapes JS
  // string content but NOT the HTML-significant `<`, so a value containing
  // "</script>" (or "<!--") could break out of the tag. Escape it to its unicode
  // form — it decodes back to the identical runtime string, but can no longer
  // terminate the script context (also handles the U+2028/U+2029 JS line breaks).
  const s = (value: string): string =>
    JSON.stringify(value)
      .replace(/</g, "\\u003c")
      .replace(/>/g, "\\u003e")
      .replace(/&/g, "\\u0026")
      .replace(/\u2028/g, "\\u2028")
      .replace(/\u2029/g, "\\u2029");
  const write =
    attribute === "class"
      ? `d.classList.toggle("dark",r==="dark");`
      : `d.setAttribute("data-theme",r);`;
  return `(function(){try{var d=document.documentElement;var t=localStorage.getItem(${s(storageKey)})||${s(defaultTheme)};var a=localStorage.getItem(${s(accentStorageKey)})||${s(defaultAccent)};var r=t==="system"?(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"):t;${write}d.setAttribute("data-accent",a);}catch(e){}})();`;
}
