---
"@martinzachariassen/design": minor
---

feat: add an offline house icon set + `<Icon />` component

Icons are now part of the canonical system, so every project draws from one
curated vocabulary and nothing drifts. Built on Iconify (offline), so there is no
runtime network call and glyphs are deterministic.

- **`<Icon />`** (exported from the package root) — renders a curated Lucide glyph
  inline, inheriting `currentColor` (colour it with `text-*` utilities) and sized
  from a `size` scale (`xs`→`xl`, or any Tailwind `size-*` override). Decorative by
  default (`aria-hidden`); pass `label` to expose it to assistive tech as an image.
  Bring-your-own glyphs are supported via the raw `icon` data prop.
- **The house set** — 76 curated Lucide icons frozen into the package as inline
  `IconifyIcon` data (`houseIcons`, `iconNames`, and the `IconName` union). Regenerate
  or extend with `bun run gen:icons` (`scripts/generate-icons.ts`).
- **Iconify offline helpers re-exported** (`addCollection`, `addIcon`, the
  `IconifyIcon` type) so consumers can register their own offline glyphs without
  installing Iconify themselves.
- **Storybook** — `Components/Data Display/Icon` with a full gallery of the set,
  size/colour/in-button examples, and a light/dark split.
