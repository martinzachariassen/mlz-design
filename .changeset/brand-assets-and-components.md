---
"@martinzachariassen/design": minor
---

Expand the system into a broad component kit plus brand/marketing assets, all
styled purely from semantic tokens (so they re-theme with `dark` / `data-accent`
for free):

- **Brand assets (the logo)** — a fixed two-part identity: `BrandMark`
  (the solid **Block M** on an ink tile, always monochrome, `tile`/`glyph`
  variants) and `BrandWordmark` (`mlz.` in Space Mono Bold, the accent period
  driven by the new `--brand-period` token — deep on light for AA, base on dark),
  paired by `BrandLockup` (`horizontal` or `stacked`, mark = 1.45× wordmark, an
  optional 40px+ tagline). New Foundations/Logo page (system, construction,
  lockups, colour, sizing/clear-space, applications, misuse, hand-off) and a
  Brand & Favicon page with sizes, browser-chrome previews and an export recipe.
  The earlier stroked-`M`-plus-caret mark is retired.
- **`SocialCard`** — a ready-to-screenshot 1200×630 Open-Graph template built from
  tokens (engineering frame, ruled grid, brand lockup, grotesk headline), with a
  `width` prop that scales the whole card as one and a Next.js / `@vercel/og`
  generation recipe.
- **`RepoBanner`** — the README header banner, sized for GitHub's ~896px README
  width (1280×340), with four shared-structure layouts (`standard` · `minimal` ·
  `terminal` · `split`) driven only by per-project copy. A Foundations/Repo Banner
  page shows all four, light/dark capture and the `<picture>` export recipe; a
  `bun run gen:banner` script renders this repo's `assets/banner.svg` with the brand
  fonts subset and embedded, so it renders self-contained and theme-adaptive.
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
- **One-import setup** — a new `styles/index.css` bundles the tokens, fonts and
  base layer *and self-declares the package's Tailwind `@source`*, so a consuming
  app inherits the whole system (including every component's classes) in two lines:
  `@import "tailwindcss"` then `@import "@martinzachariassen/design/styles/index.css"`
  — no manual `@source`, no separate imports. The granular `theme.css`/`fonts.css`/
  `base.css` exports remain for finer control.
- **Portfolio & long-form** — `ProjectCard` (portfolio card with an on-brand
  grid+monogram cover, a `featured` horizontal layout, tags and a whole-card link),
  a native-`<dialog>` `Dialog` (focus-trap, Esc and inert background for free —
  no dependency), and `Prose` (token-styled long-form typography for blog/article
  text). Two full-page Templates stories — Portfolio and Blog (index + reading
  view) — each with a deliberate responsive alternate layout.
- **Avatar** — reworked initials-first: `xs`–`xl` sizes, `circle`/`square` shapes,
  presence `status` dots, fallback `tone`s, and an `AvatarGroup` (overlap + `+N`).
  All stock/placeholder imagery removed from the stories and patterns.
- **Layout & responsive** — new unstyled primitives `Container`, `Stack` and
  `Grid` (auto-fit or fixed responsive columns), a `breakpoints` token scale
  exported from `./tokens` (mirrors Tailwind's ladder), and a Foundations/Responsive
  page showing the mobile→desktop app shell.
- **SwiftUI token layer (iOS/macOS)** — a generated, dependency-free Swift package
  under `swift/` (`MLZColor`, `MLZFont`, `MLZSpacing`, `MLZRadius`, `MLZMotion`).
  `bun run gen:swift` converts the OKLCH tokens to sRGB and emits it from the same
  source of truth, so native apps inherit the exact palette (light/dark adaptive,
  five accent families). A Platforms/SwiftUI page documents the web→Swift mapping.
- **Accessibility** — the light `--muted-foreground` role is nudged a hair darker
  (`#63615a`) so muted text clears WCAG AA (4.5:1) on every paper surface (the
  `--mlz-muted` primitive is unchanged); `Alert` titles now render in high-contrast
  ink with the signal carried by the rail and icon. `Progress` now carries a default
  accessible name (`aria-label`) when none is supplied, and `Prose` links use the
  deeper accent for legibility. Every story is checked against axe (WCAG 2.1 A/AA)
  in CI, in light and dark.
