# @martinzachariassen/design

## 0.3.0

### Minor Changes

- c6d3884: feat: one-command brand-asset generator

  Add `gen:assets` — a generator that renders a repo's full graphical set (README
  banner, OG/Twitter cards, and the favicon/app-icon set) from the real
  design-system components in headless Chromium, so every project wears the
  identical face from one `brand.config.ts`. Ships:

  - `@martinzachariassen/design/brand-assets` — the `BrandAssetsConfig` contract and
    a `defineBrandAssets` helper for typed config files.
  - `bun run gen:assets --config <path> --out <repoRoot>` to write the assets, and
    `--check` to fail CI when a committed asset has drifted from a fresh render.
  - `SocialCard` now takes a `tagline` prop (was a hardcoded "Design System"), so a
    consuming site sets its own descriptor under the wordmark.

- 6de399a: feat: add an offline house icon set + `<Icon />` component

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

- 46e364a: feat: add `InfoTip` — an inline glossary popover

  A small icon button that sits in the flow of text and, on click, opens a compact
  popover explaining a term — built for glossary-style "what / why" help. Radix-free:
  the panel renders in a portal (so no ancestor `overflow: hidden` can clip it) as a
  non-modal `role="dialog"`, positions itself with `getBoundingClientRect` (flipping
  above the trigger when there's no room below and clamping to the viewport), and
  light-dismisses on outside-click, Esc, or a second click on the trigger. Focus moves
  into the panel on open and returns to the trigger on close. The trigger sizes itself
  in `em`, so it tracks the font-size of the text it's dropped into. Supports both
  controlled (`open`/`onOpenChange`) and uncontrolled use.

- 46e364a: feat: self-hosted fonts + Accordion, StatusDot, DataList, Callout and Text

  Adds the components and font-delivery a strict-CSP, privacy-first consumer
  (ip-speil) needs to be built entirely from the design system — all on the
  semantic token layer, so nothing app-specific leaks into the system.

  - **Self-hosted fonts** — ships Space Mono (400/700) and Space Grotesk
    (400/500/600/700) as bundled WOFF2 under `styles/fonts/`, plus two new CSS
    entry points:
    - `styles/fonts-self-hosted.css` — `@font-face` with relative urls, so a
      consumer's bundler fingerprints and serves them same-origin (no Google Fonts
      CDN, no visitor-IP leak). Works under `font-src 'self'` / `style-src 'self'`.
    - `styles/index-self-hosted.css` — the CSP-safe one-import bundle (theme +
      self-hosted fonts + base + `@source`). The Google-Fonts `fonts.css` /
      `index.css` remain for quick-start consumers.
  - **`<Accordion />`** (+ `AccordionItem`, `AccordionTrigger`, `AccordionContent`)
    — a Radix-free, context-driven disclosure with the WAI-ARIA accordion keyboard
    pattern (Up/Down/Home/End) and a fluid `grid-template-rows: 0fr→1fr` open/close
    animation. `type="single" | "multiple"`, controlled or uncontrolled,
    `collapsible`.
  - **`<StatusDot />`** — a semantic status dot (success/warning/destructive/info/
    accent/muted) with an optional pulsing ring; `bg-current` so the ring tracks the
    colour.
  - **`<DataList />` / `<DataRow />`** — a definition list for key/value facts. The
    default `layout="justify"` gives hairline dashed row rules with a right-aligned,
    optionally `mono` value; `layout="grid"` (cascaded from the list, overridable
    per row) switches to a fixed eyebrow-label column plus a left-aligned value that
    collapses to one column below 560px — a scannable field list for longer values.
    The label column width is set via the `--mlz-data-label` CSS var (default
    `8rem`).
  - **`<Callout />`** — a compact, dot-led inline note (lighter than `Alert`) for
    dense lists of findings/checks.
  - **`<Text />`** — an inline typography primitive (body/lead/muted/mono/eyebrow)
    for the small everyday type roles that don't warrant a full `Prose` block.
  - Stories + tests for every new component.

- 6de399a: feat: ship a theme runtime + light/dark usage guidance

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

### Patch Changes

- 46e364a: Button: slower, smoother hover/focus lift. The signature raise + offset shadow
  now travels over 260ms on a new, non-front-loaded easing instead of a snappy
  200ms. Adds `--ease-glide`/`--dur-hover` motion tokens (mirrored in `tokens.ts`
  as `motion.easeGlide`/`motion.durationHover`) so the tuned interaction feel is
  reusable across components.

## 0.2.0

### Minor Changes

- 0935e0b: Expand the system into a broad component kit plus brand/marketing assets, all
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
    base layer _and self-declares the package's Tailwind `@source`_, so a consuming
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
  - **Accessibility** — the palette is tuned to clear WCAG AA (4.5:1) for small text
    with no per-story exceptions: the light `--muted-foreground` role is a hair darker
    (`#63615a`); the house **`--mlz-cyan-deep`** (which backs `--accent-deep` and the
    wordmark period) is deepened to `oklch(0.48 0.10 200)` so it reads ~5.1:1 on paper;
    and the **destructive** signal is deepened in both themes (`oklch(0.53 0.22 18)`
    light / `oklch(0.55 0.21 20)` dark) so its light foreground clears ~4.8:1. `Alert`
    titles render in high-contrast ink with the signal carried by the rail and icon;
    `Progress` carries a default accessible name (`aria-label`) when none is supplied;
    `Prose` links use the deeper accent. Every story is checked against axe
    (WCAG 2.1 A/AA) in CI — unscoped.

- 3dcad2d: Add a motion foundation and decorative effects distilled from mlz.no:

  - **Motion tokens/utilities** — five signature animations as Tailwind `animate-*` utilities backed by `--animate-*` tokens (`rise`, `pulse-soft`, `blink`, `float`, `glitch`), mirrored in `tokens.ts` as `animations`. Includes a `data-motion="off"` kill-switch and a new Foundations/Motion Storybook page.
  - **`GlitchText`** — per-character cyberpunk RGB-split effect using the `--glitch-1`/`--glitch-2` tokens, with ambient and hover triggers and an accessible (visually-hidden) text copy.
  - **`GridBackground`** — the two-scale engineering/blueprint grid, static or revealed by a cursor-following spotlight with an accent glow.
  - **`FloatingMarks`** — drifting, deterministically-placed CSS sketch glyphs as a decorative background layer.
  - **`Button`** — new `sketch` variant (hand-drawn dashed outline that wobbles into an offset accent shadow on hover/focus), plus icons now tilt on hover/focus, matching the mlz.no contact-link interaction.
