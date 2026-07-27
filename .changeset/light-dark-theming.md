---
"@martinzachariassen/design": minor
---

feat: ship a theme runtime + light/dark usage guidance

Make the system turnkey for a consumer that needs light/dark. The tokens already
carried a full light + dark palette and five accents; this adds the runtime and the
docs so a downstream app can flip and use them correctly.

- **`ThemeProvider` / `useTheme` / `themeInitScript`** (exported from the package
  root) — a zero-dependency, framework-agnostic runtime that toggles `.dark` and
  `data-accent` on `<html>`, follows `prefers-color-scheme` under `"system"`,
  persists the choice, and (via the inline `themeInitScript`) applies it before
  first paint so there's no flash.
- **Forced-theme subtrees** — the light semantic layer now also matches
  `[data-theme="light"]`, so a subtree can force light even inside a `.dark`
  ancestor (mirrors the existing `[data-theme="dark"]`). Enables side-by-side
  light/dark and always-light/always-dark widgets. No token values changed.
- **`Foundations/Colour Usage`** — a new Storybook page documenting surface →
  foreground pairings and which colours to use as text on dark vs. light
  backgrounds (accent goes deep on light, stays bright on dark), solids vs. subtle
  tints, and the "read the semantic layer only" rule.
- **Per-component `LightDark` stories** — every component now has a story that
  renders it in forced light and dark side by side, proving both themes at a glance.
- **Dark-mode contrast fixes (surfaced by the new axe-over-every-story CI gate)** —
  the `*-subtle` tints are now declared inside each theme scope instead of once on
  `:root`. A custom property substitutes its inner `var()`s at its declaring element,
  so the single `:root` definition had frozen the tints to the light `--background`,
  leaving `foreground`/`muted-foreground` unreadable on them in dark (Alert, Card…).
  Dark `--destructive` is also retuned (`oklch(0.64 0.19 20)` with a dark
  `--destructive-foreground`) to match how success/warning/info already lift in dark,
  so the outline destructive Button clears WCAG AA. Light values are unchanged.
