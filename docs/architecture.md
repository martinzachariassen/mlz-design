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

**Colour text, icons and rings with `-deep`; fill shapes with the base.** As *text* on paper the fills fail outright — cyan `--accent` measures **1.83:1**, the tint signals **1.8–2.0:1**. `Prose` links, `Link variant="subtle"`, `StatusDot`, the `Select`/`Combobox` check marks and every hover state read from `-deep` for exactly this reason. In dark mode `-deep` maps back to the fill, which is already light against ink — so a component reaches for `-deep` unconditionally and never branches on theme.

**Two fill modes, because no single lightness works for every hue.** Yellow cannot go dark and stay yellow; red cannot go light and stay emphatic. `tint` fills (L 0.74) carry ink text; `bold` fills (dark) carry paper text. Only `danger` and the `ink`/slate accent are bold — a destructive action must not read as decorative. The foreground therefore follows from the mode rather than being chosen per role, and only the bold roles need an on-dark value (`--mlz-danger-dark`, `--mlz-slate-dark`); the tints are theme-independent.

**The dead zone.** Between the two modes, at L ≈ 0.55–0.70, a fill can carry *neither* ink nor paper text at AA — both cap out near 4.3:1. No foreground rescues a fill placed there; the only fix is to move the fill. This is arithmetic, not taste, and it is exactly where the pre-ladder `blue`, `rust` and `success` solids sat, which is why paper text on them measured 2.75–3.12:1.

**Everything stays inside the sRGB gamut.** OKLCH can express colours no sRGB screen shows; the browser clips those silently, so a clipped value is not the value you measured and its contrast figure would hold only on some displays. The perceptual benefits of OKLCH come from the coordinate system, not the gamut, so nothing is lost by staying inside it.

Two test files hold this together, and the split is the point. `src/tokens.contrast.test.ts` asserts the ladder's **shape** against the `tokens.ts` mirror. `src/theme-css.test.ts` asserts **reality**: it parses `theme.css` — following `var()` and evaluating `color-mix()` — checks the mirror against it value-for-value, fails on any colour primitive the mirror has never heard of, re-runs the contrast contracts on the resolved semantic roles in both themes and every accent family, and fails if any doc or story quotes a value the palette no longer ships — prose is a mirror too, and three files were still advertising pre-ladder values when this landed.

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
    named.ts            displayName-as-expression, keeps the entry tree-shakeable
    contrast.ts         shared colour maths (contrast tests + ColourModel page)
    use-copy-to-clipboard.ts  the hook behind CopyButton, exported
    dom-test-env.ts     jsdom stubs (ResizeObserver, scrollIntoView), test-only
    theme-test-env.ts   matchMedia/localStorage stubs, test-only
    icons.tsx           the handful of glyphs components draw themselves —
                        internal, never exported (consumers inline their own)
  components/           grouped by function, kebab-case files
    brand/              BrandMark/Wordmark/Lockup, FloatingMarks, GlitchText,
                        GridBackground, MarginNote, ProjectCard, RepoBanner,
                        SocialCard, ThemeToggle/AccentPicker
    data-display/       Avatar, Badge, Code/CodeBlock, DataList, Kbd, Link,
                        Prose, Readout, Stat, StatusChip, StatusDot, Table, Text
    feedback/           Alert, Callout, EmptyState, FindingList, Progress,
                        Skeleton, Spinner, Toaster
    forms/              Button, Calendar, Checkbox, Combobox, CopyButton,
                        DatePicker, Field, Input, Label, RadioGroup, Select,
                        Slider, Switch, Textarea, Toggle, ToggleGroup
    layout/             Accordion, Breadcrumb, Card, Collapsible,
                        Container/Stack/Grid, NavigationMenu, Pagination,
                        ScrollArea, SectionHeading, Separator, Tabs
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
docs/                   getting-started, design system, architecture, versioning,
                        decisions, contributing, security
.storybook/             main.ts · preview.tsx · manager.tsx · theme.ts · oklch.ts ·
                        app.css · test-runner.ts · public/
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
| **Radix primitive** | `Accordion` · `Avatar` · `Collapsible` · `DropdownMenu` · `HoverCard` · `NavigationMenu` · `Popover` · `InfoTip` (a narrower popover) · `Label` · `ScrollArea` · `Progress` · `RadioGroup` · `Select` · `Separator` · `Slider` · `Tabs` · `Toggle` · `ToggleGroup` · `Tooltip`, plus `Slot` for `asChild` |
| **Platform element** — Radix would add JS for what the browser already does | `Dialog`, `Sheet` and `AlertDialog` (native `<dialog>` + `showModal()`: focus-trap, Esc, inerting, top layer) · `Table` (a real `<table>`) · `DataList` (a real `<dl>`) · `Button` · `Input` · `Textarea` · `Checkbox` · `Switch` (native inputs styled with `peer-checked:`, zero JS) |
| **Third party** — the non-Radix runtime dependencies | `Toaster` (`sonner`, behind the `./toaster` subpath), `Command` / `Combobox` (`cmdk`) and `Calendar` / `DatePicker` (`react-day-picker`), each with its own styling switched off and every slot re-dressed from semantic tokens |
| **Presentational only** — no behaviour to own | everything else: `Alert`, `Badge`, `Breadcrumb`, `Callout`, `Card`, `FindingList`, `Kbd`, `Pagination`, `Prose`, `Readout`, `SectionHeading`, `Skeleton`, `Spinner`, `StatusChip`, `StatusDot`, `Text`, the layout primitives, all of `brand/` |

**`ScrollArea` is the one entry that overlaps something the browser already does**, so it earns a sentence. It does not replace scrolling: the viewport underneath is ordinary `overflow: auto`, so wheel, trackpad, touch, keyboard, scroll-anchoring and find-in-page stay native. What it replaces is the scrollbar's *appearance*, which otherwise ranges from a heavy slab on Windows to nothing at all on macOS until you scroll. Use it for bounded panels where the bar is part of the design — never around the document, where taking over the browser's own bar breaks scroll restoration and overscroll.

Two other placements are worth spelling out, because they look like exceptions and aren't. **`Breadcrumb` and `Pagination` are presentational** even though they navigate: they render real `<a>` elements inside a landmark `<nav>`, and the browser already owns every behaviour they need — bookmarkable URLs, middle-click, back/forward. Radix has no primitive for either. **`Dialog`, `Sheet` and `AlertDialog` share one `<dialog>` + `showModal()` engine**, `src/components/overlay/modal-root.tsx` — internal, never exported. It owns the controlled/uncontrolled state, the generated `aria-labelledby` / `aria-describedby` ids, and the backdrop-dismissal rule; the platform owns the focus trap, Esc, inerting and the top layer. Each component supplies its own surface classes and, for `AlertDialog`, `role="alertdialog"` with backdrop dismissal off.

Radix packages are depended on **granularly** (`@radix-ui/react-tabs`, …), not via the unified `radix-ui` meta-package: this ships as a library, and the meta-package would make every consumer install ~40 primitives to use one. A corollary that has bitten once: **every Radix package a component imports must be in `dependencies`**, not merely resolvable through another package's tree. `tsup` externalises exactly `dependencies` + `peerDependencies`, so an undeclared one gets silently *bundled* into `dist/index.js` while the `.d.ts` still imports it by name — which typechecks here and fails for anyone on pnpm's strict layout or Yarn PnP.

`asChild` (via `@radix-ui/react-slot`) is wired by hand on `Button`, `Badge`, `Card`, `BreadcrumbLink`, `PaginationLink`, `DialogClose` and `SheetClose` — render a router link or any other element while keeping the component's styling and props. The Radix-backed components (`Select`, `DropdownMenu`, `Tooltip`…) get `asChild` from the primitive itself, so it works there without us doing anything.

## Pre-paint theming under a strict CSP

`themeInitScript()` has to run **before the first paint**, or a reader who chose dark mode gets a white flash on every load. Its JSDoc says to inline it with `dangerouslySetInnerHTML`, and for most apps that is right.

It is wrong for an app whose `script-src` has no `'unsafe-inline'`. A static-asset host — Cloudflare Workers' static assets, S3 + CDN, GitHub Pages — has no server to mint a per-request nonce, and no hash you can pin either, because the script's content changes with its options. The browser refuses the tag and the flash comes back.

The fix is to stop inlining and start **emitting**: generate the string at build time, write it as a content-hashed asset, and reference it with a classic `<script src>`. Same-origin satisfies `script-src 'self'`, and a classic (non-module) script still blocks the parser, so `<html>` is themed before anything renders. As a Vite plugin, splicing into a marker comment in each HTML entry:

```ts
import { themeInitScript } from "@martinzachariassen/design";
import type { Plugin } from "vite";

export function themeInit(): Plugin {
  const source = themeInitScript();
  let src = "/@mlz-theme-init.js"; // dev URL; build replaces it with the hashed name

  return {
    name: "mlz:theme-init",
    renderStart() {
      // An asset's final hashed name is available as soon as its source is set,
      // and renderStart runs before vite:build-html rewrites the HTML.
      const ref = this.emitFile({ type: "asset", name: "theme-init.js", source });
      src = `/${this.getFileName(ref)}`;
    },
    configureServer(server) {
      server.middlewares.use("/@mlz-theme-init.js", (_req, res) => {
        res.setHeader("Content-Type", "text/javascript; charset=utf-8");
        res.end(source);
      });
    },
    transformIndexHtml: {
      order: "post", // after renderStart has resolved the hashed name
      handler: (html) => html.replace("<!--theme-init-->", `<script src="${src}"></script>`),
    },
  };
}
```

Then `<!--theme-init-->` goes in each document's `<head>`, ahead of the stylesheet, and `<ThemeProvider>` is rendered **with no props** so its defaults stay identical to the generated script's. Generating from the installed package on every build is the point: the two cannot drift.

Three things that bite:

- **`build.rolldownOptions` replaces `build.rollupOptions`**, it does not merge. Setting it to reach `treeshake` silently dropped a second HTML entry from a multi-page build.
- The plugin makes `vite.config.ts` import this package, so Node evaluates the whole ESM entry at config-load time. That is fine — nothing here touches the DOM at module scope — but it is the least conventional part. The fallback is a codegen script that writes the file into `public/`, with a CI `git diff --exit-code` guard against staleness.
- `style-src 'self'` does **not** block React's `style={{}}`: React writes through CSSOM, which CSP does not govern. It *does* block a `<style>` element inserted at runtime — the element lands in the DOM with `element.sheet === null`. That asymmetry is why `Toaster` lives behind the `./toaster` subpath (see Distribution).

Reference implementation: `vite/theme-init.ts` in [mlz-no](https://github.com/martinzachariassen/mlz-no).

## Conventions that bite

- **Biome is scoped to JS/TS.** CSS formatting/linting is disabled on purpose — `theme.css` is hand-column-aligned; don't let a tool reflow it.
- **Tailwind v4 in Storybook uses PostCSS** (`@tailwindcss/postcss` + `postcss.config.mjs`), NOT `@tailwindcss/vite` (open export-compat bug with Storybook's builder). `tsup` does not process CSS.
- When adding a token, keep light + dark + every `data-accent` in sync, and honour `prefers-reduced-motion` / `forced-colors`.

## Distribution

`tsup` builds `dist` (ESM + `.d.ts`), then the build copies `src/styles` into `dist/styles`. The committed `dist/` is the token-free fallback for `bun add github:martinzachariassen/mlz-design` — refresh it (`bun run build`) in any PR that changes `src/`. Primary distribution is **GitHub Packages** via Changesets (see [CONTRIBUTING.md](CONTRIBUTING.md)).

### Storybook manager theming, and the addon bug behind it

The manager chrome is MLZ-branded via `.storybook/manager.tsx` + `theme.ts`, with
every colour read from `src/tokens.ts` so the chrome can't drift from the system
it documents. Getting there required working around a Storybook bug; both the
workaround and the trap next to it are load-bearing.

**The bug.** On Storybook **10.5.7**, a *built* manager renders a blank page and
throws `PolishedError #5` from `parseToRgb` when **two addons are registered and
a `.storybook/manager.tsx` exists**. Bisected:

| Setup | Result |
| ----- | ------ |
| 2 addons, no `manager.tsx` | works |
| 1 addon + `manager.tsx` | works (either addon) |
| 2 addons + `manager.tsx` | **blank** |
| `storybook dev`, 2 addons + `manager.tsx` | works |

It is neither the theme values nor `create()` — a `manager.tsx` containing only
`export {}` reproduces it, a built-in `themes.light` reproduces it, and swapping
the addon order changes nothing. Only `storybook build` is affected.

**The workaround.** `@storybook/addon-a11y` is registered only outside the build,
gated on `MLZ_STORYBOOK_BUILD=1` which `build:storybook` sets. The panel is
available in `bun run storybook`; the deployed build drops it and keeps the
branded chrome. **The a11y *gate* is unaffected** — that's `axe-playwright` in
`test-runner.ts`, which reads `parameters.a11y` directly and never imported the
addon. Verified: the full axe suite passes either way.

Revisit on the next Storybook release; if it's fixed, delete the `isBuild` gate.

**The adjacent trap.** MLZ accents are authored in **OKLCH**, and Storybook pipes
theme colours through `polished`, which parses only hex/rgb/hsl. An `oklch()`
string reaching the theme throws the *same* `PolishedError` for an entirely
different reason — hence `.storybook/oklch.ts`, which converts them.

### The MDX docs-page crash, and the `focus` shim in `preview.tsx`

On Storybook **10.5.7**, opening any MDX docs page (Installation, Theming,
Accessibility) throws `TypeError: Illegal invocation` from
`HTMLElement.get [as focus]` and the page dies. Two upstream halves collide:
Storybook's test annotation installs an *accessor* for `focus` on
`HTMLElement.prototype` whose getter dereferences `this.ownerDocument`, and the
react-aria code bundled into the docs-blocks chunk reads
`HTMLElement.prototype.focus` at module top level — a prototype receiver, so the
getter throws. Because ES modules cache the failed evaluation, every docs page
then replays the identical error, which is why all three pages "break at once".

**The workaround.** `preview.tsx` shadows `ownerDocument` on
`HTMLElement.prototype` with a receiver-safe wrapper around the native getter:
real elements behave identically, while a prototype receiver gets `null` instead
of a throw — so Storybook's `focus` getter falls back to its own noop, which is
behaviourally what the upstream fix does. Don't reach for the more obvious
"make `focus` non-redefinable" shim: user-event's `patchFocus()` also redefines
`focus`, *outside* any try/catch, so that variant breaks every play-function
story (found by the axe run).

**Remove when** Storybook ≥ 10.6 lands: the upstream fix
([storybookjs/storybook#35528](https://github.com/storybookjs/storybook/pull/35528),
merged 2026-07-28) makes the getter safe for prototype receivers. It shipped in
`10.6.0-alpha.4`; delete the shim when bumping past it, and retest the
two-addon/manager workaround above at the same time.

### MDX needs GFM wired up explicitly

Storybook's MDX pipeline ships **no GFM**, so a markdown table in an `.mdx` page
renders as literal `|` characters — with no build warning. `Theming.mdx` shipped
that way and it was only caught by looking at the page. `remark-gfm` is now
passed through `addon-docs`'s `mdxPluginOptions` in `main.ts`; keep it there.
