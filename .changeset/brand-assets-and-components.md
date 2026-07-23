---
"@martinzachariassen/design": minor
---

Expand the system into a broad component kit plus brand/marketing assets, all
styled purely from semantic tokens (so they re-theme with `dark` / `data-accent`
for free):

- **Brand assets** — `BrandMark` (the MLZ monogram: a geometric `M` with a
  terminal caret, `tile`/`glyph` variants) and `BrandLockup` (mark + wordmark).
  New Foundations/Brand & Favicon page with sizes, browser-chrome previews and an
  export recipe.
- **`SocialCard`** — a ready-to-screenshot 1200×630 Open-Graph template built from
  tokens (engineering frame, ruled grid, brand lockup, grotesk headline), with a
  `width` prop that scales the whole card as one and a Next.js / `@vercel/og`
  generation recipe.
- **New components** — `Alert` (+ `Title`/`Description`), `Avatar`
  (+ `Image`/`Fallback`), `Checkbox`, `Switch`, `Label`, `Textarea`, `Tabs`
  (Radix-free, keyboard-navigable), `Progress`, `Skeleton`, `Spinner`,
  `Separator`, and `Kbd` — each accessible and colocated with stories.
- **`Card`** — now variant-driven: `default` · `elevated` · `interactive`
  (signature hover-lift with an offset accent shadow) · `accent` · `ghost`, plus a
  `CardAction` header slot and `data-slot` hooks. Richer stories (stat, feature,
  pricing, interactive).
- **Foundations/Patterns** — a composed reference (app shell, dashboard, settings
  form, tabbed auth, alerts, activity list, empty state) documenting how to build
  UIs in the system's voice.
