---
"@martinzachariassen/design": minor
---

Add `Toggle`, `ToggleGroup` and `ThemeToggle` / `AccentPicker`.

Adds one dependency, `@radix-ui/react-toggle-group`.

- **`Toggle`** — a button that stays pressed, reporting state through
  `aria-pressed` so the label can stay constant. `default` and `outline`
  variants, `sm`/`default`/`icon` sizes.
- **`ToggleGroup`** (+ `Item`) — `type="single"` is a segmented control,
  `type="multiple"` a filter bar. The group sets `variant`/`size` once through
  context, and Radix owns the roving focus, so it's one tab stop.
- **`ThemeToggle`** and **`AccentPicker`** — the light/dark/system switch and
  the five accent swatches, built on the existing `useTheme()`. The system's
  headline feature is runtime theming, but until now every consuming app had to
  rebuild the control for it; these make `ThemeProvider` turnkey.

`AccentPicker` is built on the system's own `RadioGroup`, so arrow-key
navigation and the single tab stop come from Radix rather than being
hand-rolled. Every swatch is named — colour never carries the meaning alone.

`ThemeToggle` also guards against a single-select group being emptied by
re-pressing the active item, which would otherwise leave the app with no theme.
