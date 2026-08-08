# Architecture

How `@martinzachariassen/design` is put together. The README is the landing page; this file is the map for anyone changing the internals.

## Three-layer tokens

`src/styles/theme.css` is the source of truth, authored in **OKLCH**. Three layers keep components decoupled from raw brand values:

1. **Primitives** (`--mlz-*`) — the canonical MLZ brand values (the seven neutral paper/ink hex values, every chromatic value in OKLCH, font stacks, easings). This is the source of truth; **components never touch these directly.**
2. **Semantic** — shadcn/ui-standard role names (`--background`, `--foreground`, `--primary`, `--accent`, `--border`, `--ring`…), every surface paired with a `-foreground`, plus signal roles (`destructive`/`success`/`warning`/`info`) each with a solid, a foreground and a subtle tint. Light, dark (`.dark` / `data-theme`) and every `data-accent` family live here. **This is the only layer to read or override.**
3. **`@theme inline`** — re-exports the semantic layer to Tailwind so tokens and utilities are the same thing, and runtime theme/accent swaps keep working.

Beyond the core roles, the semantic layer also ships **subtle tints** for every accent/signal (`bg-accent-subtle`, `bg-warning-subtle`…, built with `color-mix`, so they follow the current theme and accent), a warm-tinted **elevation scale** (`shadow-xs · sm · md · lg`), a **radius scale** (`rounded-sm · md · lg · xl` off `--radius`), and `--overlay` and `--glitch-1/2` for scrims and the cyberpunk glitch motion.

### The colour ladder — fills fill, `-deep` reads

Every chromatic value sits on a **rung**, and the rung — not the hue — decides what it may be used for. Lightness is fixed per rung, so swapping `data-accent` changes hue without changing perceived weight: all four tint accents carry ink text between 7.2:1 and 8.0:1.

| Rung | Job | Contract |
| --- | --- | --- |
| `base` | a **fill** — background for its paired foreground, never text | ≥4.5:1 against its foreground |
| `-deep` | **on light** — text, icons, focus rings on a paper surface | ≥4.5:1 on `paper`, `paper-2` *and* `paper-3` |
| on-dark | the same job on an ink surface | ≥4.5:1 on `--background`, `--card` and `--muted` |

**Colour text, icons and rings with `-deep`; fill shapes with the base.** As *text* on paper the fills fail outright — cyan `--accent` measures **1.82:1**, the tint signals about **1.9:1**. `Prose` links, `Link variant="subtle"`, `StatusDot`, the `Select`/`Combobox` check marks and every hover state read from `-deep` for exactly this reason. In dark mode `-deep` maps back to the fill, which is already light against ink — so a component reaches for `-deep` unconditionally and never branches on theme.

**Two fill modes, because no single lightness works for every hue.** Yellow cannot go dark and stay yellow; red cannot go light and stay emphatic. `tint` fills (L 0.74) carry ink text; `bold` fills (dark) carry paper text. Only `danger` and the `ink`/slate accent are bold — a destructive action must not read as decorative. The foreground therefore follows from the mode rather than being chosen per role, and only the bold roles need an on-dark value (`--mlz-danger-dark`, `--mlz-slate-dark`); the tints are theme-independent.

**The dead zone.** Between the two modes, at L ≈ 0.55–0.70, a fill can carry *neither* ink nor paper text at AA — both cap out near 4.3:1. No foreground rescues a fill placed there; the only fix is to move the fill. This is arithmetic, not taste, and it is exactly where the pre-ladder `blue`, `rust` and `success` solids sat, which is why paper text on them measured 2.75–3.12:1.

**Everything stays inside the sRGB gamut.** OKLCH can express colours no sRGB screen shows; the browser clips those silently, so a clipped value is not the value you measured and its contrast figure would hold only on some displays. The perceptual benefits of OKLCH come from the coordinate system, not the gamut, so nothing is lost by staying inside it.

Two test files hold this together, and the split is the point. `src/tokens.contrast.test.ts` asserts the ladder's **shape** against the `tokens.ts` mirror. `src/theme-css.test.ts` asserts **reality**: it parses `theme.css` — following `var()` and evaluating `color-mix()` — checks the mirror against it value-for-value, fails on any colour primitive the mirror has never heard of, and re-runs the contrast contracts on the resolved semantic roles in both themes and every accent family.

The second is what makes "update both" enforceable rather than aspirational. A contract test that reads only the mirror proves the mirror is self-consistent; edit `theme.css` alone and it still passes while the two files quietly disagree. Reading the CSS closes that, and means the asserted numbers are the ones that ship.

Foundations → **Colour model** is the long form and computes its figures from the tokens, so the published numbers cannot go stale either.

`theme.css` is the source of truth; `src/tokens.ts` is a hand-maintained JS mirror that must match it value-for-value — **when you touch a token value, update both.** One naming quirk the mirror carries: the CSS `--destructive` role is exported as `signals.danger` in JS.

## Repo layout

```
src/
  index.ts              barrel export                        → .
  tokens.ts             typed token objects                  → ./tokens
  lib/
    cn.ts               clsx + tailwind-merge
    theme.tsx           ThemeProvider / useTheme / init script
    dom-test-env.ts     jsdom stubs (ResizeObserver, scrollIntoView), test-only
    icons.tsx           the handful of glyphs components draw themselves —
                        internal, never exported (consumers bring lucide-react)
  components/           grouped by function, kebab-case files
    brand/              BrandMark/Wordmark/Lockup, GlitchText, GridBackground,
                        FloatingMarks, ProjectCard, RepoBanner, SocialCard,
                        ThemeToggle/AccentPicker
    data-display/       Avatar, Badge, Code/CodeBlock, DataList, Kbd, Link,
                        Prose, Stat, StatusDot, Table, Text
    feedback/           Alert, Callout, EmptyState, Progress, Skeleton, Spinner,
                        Toaster
    forms/              Button, Checkbox, Combobox, Field, Input, Label,
                        RadioGroup, Select, Slider, Switch, Textarea, Toggle,
                        ToggleGroup
    layout/             Accordion, Breadcrumb, Card, Collapsible,
                        Container/Stack/Grid, Pagination, ScrollArea,
                        Separator, Tabs
    overlay/            AlertDialog, Command, Dialog, DropdownMenu, HoverCard,
                        InfoTip, Popover, Sheet, Tooltip
                        modal-root.tsx — the shared <dialog> engine, internal
                        modal-test-env.ts — the jsdom stub, test-only
  foundations/          Storybook-only: Introduction, Installation, Theming,
                        Colours, Colour usage, Typography, Motion, Responsive,
                        Logo, Favicon + theme-split.tsx
    foundations/patterns/ composed screens: application shell, dashboard,
                        forms, feedback and states
  styles/
    index.css           the one-import bundle                → ./styles/index.css
    index-self-hosted.css  same, with bundled WOFF2 fonts    → ./styles/index-self-hosted.css
    theme.css           the token system                     → ./styles/theme.css
    fonts.css           font loading                         → ./styles/fonts.css
    base.css            optional base layer                  → ./styles/base.css
    fonts/              bundled WOFF2 (self-hosted bundle)
docs/                   architecture, design system, contributing, security
.storybook/             main.ts · preview.tsx · app.css · test-runner.ts
.github/workflows/      ci · deploy · release · codeql · dependency-review · scorecard · zizmor
wrangler.jsonc          Cloudflare Workers deploy config (static assets + custom domain)
mise.toml               pinned toolchain + task aliases for the bun scripts
```

Subpath exports mirror the layout: `.` (components), `./tokens` (typed JS values), and `./styles/*` (the CSS bundle and its parts). `*.stories.tsx` / `*.test.tsx` colocate with their source but never ship — `files: ["dist"]` keeps them out of the package.

## Storybook

`.storybook/` is the playground and the reference doc site in one:

- **`main.ts`** — story globs, the a11y and docs addons, and `react-docgen-typescript` with a `propFilter` that drops inherited React HTML attributes, so a props table shows only the component's own API.
- **`preview.tsx`** — two independent toolbar dimensions (**Theme** light/dark, **Accent** across all five families) applied to the preview `<html>`, so every token in `theme.css` re-resolves live exactly as it would in a consuming app. Also sets the sidebar order and turns on `autodocs` globally.
- **`app.css`** — imports Tailwind plus `theme.css` / `fonts.css` / `base.css` from `src/`, and `@source "../src"` so classes used only by stories still emit.
- **`test-runner.ts`** — runs axe (WCAG 2.1 A/AA) against every story in a real browser; wired into CI as the `Storybook a11y` job.

Autodocs is on for every story by default. Story files without a `component` (foundations or multi-component compositions) opt out with `tags: ["!autodocs"]` so the sidebar doesn't fill with empty docs pages.

## Components

Components (`src/components/*.tsx`) use CVA + `tailwind-merge` via `cn()` (`src/lib/cn.ts`) and are styled purely from semantic-token utilities (`bg-primary`, `border-input`, `ring-ring`…). Because they read only the semantic layer, every component re-themes with the `class="dark"` / `data-accent` switches for free. `src/foundations/*` are Storybook-only.

### Behaviour comes from Radix, styling is ours

Anything with real interaction behaviour is a **Radix primitive** wrapped in MLZ styling — the same backbone shadcn/ui uses, so `npx shadcn add …` components behave identically to these. Radix supplies the WAI-ARIA keyboard patterns, focus management, collision-aware positioning and controlled/uncontrolled state; we supply the variants.

Which layer owns what:

| Layer | Components |
| ----- | ---------- |
| **Radix primitive** | `Accordion` · `Avatar` · `Collapsible` · `DropdownMenu` · `HoverCard` · `Popover` · `InfoTip` (a narrower popover) · `Label` · `ScrollArea` · `Progress` · `RadioGroup` · `Select` · `Separator` · `Slider` · `Tabs` · `Toggle` · `ToggleGroup` · `Tooltip`, plus `Slot` for `asChild` |
| **Platform element** — Radix would add JS for what the browser already does | `Dialog`, `Sheet` and `AlertDialog` (native `<dialog>` + `showModal()`: focus-trap, Esc, inerting, top layer) · `Table` (a real `<table>`) · `DataList` (a real `<dl>`) · `Button` · `Input` · `Textarea` · `Checkbox` · `Switch` (native inputs styled with `peer-checked:`, zero JS) |
| **Third party** — the two non-Radix runtime dependencies | `Toaster` (`sonner`) and `Command` / `Combobox` (`cmdk`), both with their own styling switched off and every slot re-dressed from semantic tokens |
| **Presentational only** — no behaviour to own | everything else: `Alert`, `Badge`, `Breadcrumb`, `Callout`, `Card`, `Kbd`, `Pagination`, `Prose`, `Skeleton`, `Spinner`, `StatusDot`, `Text`, the layout primitives, all of `brand/` |

**`ScrollArea` is the one entry that overlaps something the browser already does**, so it earns a sentence. It does not replace scrolling: the viewport underneath is ordinary `overflow: auto`, so wheel, trackpad, touch, keyboard, scroll-anchoring and find-in-page stay native. What it replaces is the scrollbar's *appearance*, which otherwise ranges from a heavy slab on Windows to nothing at all on macOS until you scroll. Use it for bounded panels where the bar is part of the design — never around the document, where taking over the browser's own bar breaks scroll restoration and overscroll.

Two other placements are worth spelling out, because they look like exceptions and aren't. **`Breadcrumb` and `Pagination` are presentational** even though they navigate: they render real `<a>` elements inside a landmark `<nav>`, and the browser already owns every behaviour they need — bookmarkable URLs, middle-click, back/forward. Radix has no primitive for either. **`Dialog`, `Sheet` and `AlertDialog` share one `<dialog>` + `showModal()` engine**, `src/components/overlay/modal-root.tsx` — internal, never exported. It owns the controlled/uncontrolled state, the generated `aria-labelledby` / `aria-describedby` ids, and the backdrop-dismissal rule; the platform owns the focus trap, Esc, inerting and the top layer. Each component supplies its own surface classes and, for `AlertDialog`, `role="alertdialog"` with backdrop dismissal off.

Radix packages are depended on **granularly** (`@radix-ui/react-tabs`, …), not via the unified `radix-ui` meta-package: this ships as a library, and the meta-package would make every consumer install ~40 primitives to use one. A corollary that has bitten once: **every Radix package a component imports must be in `dependencies`**, not merely resolvable through another package's tree. `tsup` externalises exactly `dependencies` + `peerDependencies`, so an undeclared one gets silently *bundled* into `dist/index.js` while the `.d.ts` still imports it by name — which typechecks here and fails for anyone on pnpm's strict layout or Yarn PnP.

`asChild` (via `@radix-ui/react-slot`) is wired by hand on `Button`, `Badge`, `Card`, `BreadcrumbLink`, `PaginationLink`, `DialogClose` and `SheetClose` — render a router link or any other element while keeping the component's styling and props. The Radix-backed components (`Select`, `DropdownMenu`, `Tooltip`…) get `asChild` from the primitive itself, so it works there without us doing anything.

## Conventions that bite

- **Biome is scoped to JS/TS.** CSS formatting/linting is disabled on purpose — `theme.css` is hand-column-aligned; don't let a tool reflow it.
- **Tailwind v4 in Storybook uses PostCSS** (`@tailwindcss/postcss` + `postcss.config.mjs`), NOT `@tailwindcss/vite` (open export-compat bug with Storybook's builder). `tsup` does not process CSS.
- When adding a token, keep light + dark + every `data-accent` in sync, and honour `prefers-reduced-motion` / `forced-colors`.

## Distribution

`tsup` builds `dist` (ESM + `.d.ts`), then the build copies `src/styles` into `dist/styles`. The committed `dist/` is the token-free fallback for `bun add github:martinzachariassen/mlz-design` — refresh it (`bun run build`) in any PR that changes `src/`. Primary distribution is **GitHub Packages** via Changesets (see [CONTRIBUTING.md](CONTRIBUTING.md)).

### Storybook manager theming, and the addon bug behind it

The manager chrome is MLZ-branded via `.storybook/manager.ts` + `theme.ts`, with
every colour read from `src/tokens.ts` so the chrome can't drift from the system
it documents. Getting there required working around a Storybook bug; both the
workaround and the trap next to it are load-bearing.

**The bug.** On Storybook **10.5.7**, a *built* manager renders a blank page and
throws `PolishedError #5` from `parseToRgb` when **two addons are registered and
a `.storybook/manager.ts` exists**. Bisected:

| Setup | Result |
| ----- | ------ |
| 2 addons, no `manager.ts` | works |
| 1 addon + `manager.ts` | works (either addon) |
| 2 addons + `manager.ts` | **blank** |
| `storybook dev`, 2 addons + `manager.ts` | works |

It is neither the theme values nor `create()` — a `manager.ts` containing only
`export {}` reproduces it, a built-in `themes.light` reproduces it, and swapping
the addon order changes nothing. Only `storybook build` is affected.

**The workaround.** `@storybook/addon-a11y` is registered only outside the build,
gated on `MLZ_STORYBOOK_BUILD=1` which `build:storybook` sets. The panel is
available in `bun run storybook`; the deployed build drops it and keeps the
branded chrome. **The a11y *gate* is unaffected** — that's `axe-playwright` in
`test-runner.ts`, which reads `parameters.a11y` directly and never imported the
addon. Verified: all 161 checks pass either way.

Revisit on the next Storybook release; if it's fixed, delete the `isBuild` gate.

**The adjacent trap.** MLZ accents are authored in **OKLCH**, and Storybook pipes
theme colours through `polished`, which parses only hex/rgb/hsl. An `oklch()`
string reaching the theme throws the *same* `PolishedError` for an entirely
different reason — hence `.storybook/oklch.ts`, which converts them.

### MDX needs GFM wired up explicitly

Storybook's MDX pipeline ships **no GFM**, so a markdown table in an `.mdx` page
renders as literal `|` characters — with no build warning. `Theming.mdx` shipped
that way and it was only caught by looking at the page. `remark-gfm` is now
passed through `addon-docs`'s `mdxPluginOptions` in `main.ts`; keep it there.
