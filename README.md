<div align="center">

<img src="assets/banner.svg" alt="MLZ · Design — one design system, every project" width="100%">

<br><br>

**Martin Zachariassen's design system** — one canonical source of colour, type,
style and motion, shipped as an installable **React + Tailwind v4** package (plus a
generated **SwiftUI** token layer) so every project I build inherits the same look
and can't drift.

`@martinzachariassen/design`

[![CI](https://github.com/martinzachariassen/mlz-design/actions/workflows/ci.yml/badge.svg)](https://github.com/martinzachariassen/mlz-design/actions/workflows/ci.yml)
[![CodeQL](https://github.com/martinzachariassen/mlz-design/actions/workflows/codeql.yml/badge.svg)](https://github.com/martinzachariassen/mlz-design/actions/workflows/codeql.yml)
[![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/martinzachariassen/mlz-design/badge)](https://scorecard.dev/viewer/?uri=github.com/martinzachariassen/mlz-design)
[![License: MIT](https://img.shields.io/github/license/martinzachariassen/mlz-design?style=flat-square&color=00c4c4)](LICENSE)
[![Version](https://img.shields.io/github/package-json/v/martinzachariassen/mlz-design?style=flat-square&label=version&color=00c4c4)](https://github.com/martinzachariassen/mlz-design/pkgs/npm/design)

![React 19](https://img.shields.io/badge/React-19-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Tailwind v4](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![TypeScript strict](https://img.shields.io/badge/TypeScript-strict-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Bun](https://img.shields.io/badge/Bun-FBF0DF?style=flat-square&logo=bun&logoColor=000)
![Storybook 10](https://img.shields.io/badge/Storybook-10-FF4785?style=flat-square&logo=storybook&logoColor=white)

</div>

---

MLZ Design is my **single source of truth for design**. Instead of re-deciding
colours, spacing and components in every new app, I decide them once — here — and
every project installs this package and inherits them. Change a token in this repo,
cut a release, and every app that consumes it moves with the system. No per-project
drift, no copy-pasted palettes.

It's a **public** repo on purpose: browse it, learn from it, or lift pieces for your
own work. But it's built first for me — a durable home for the styles behind
everything I make, from web apps to native iOS.

The look is a warm **paper / ink** palette, a house **cyan** accent, four
typefaces, and a technical, hand-drawn *engineering-notebook* character with a
cyberpunk edge. It runs on **React + Tailwind v4**; tokens are plain CSS custom
properties, so anything that loads a stylesheet can use them.

- **Inherit in two lines.** One `@import` pulls in the tokens, fonts, base layer
  and every component's styles — the package declares its own Tailwind source, so
  there's nothing else to wire up.
- **Restyle once, everywhere.** Components read only *semantic* tokens
  (`--primary`, `--accent`, `--border`…). Override them in a consuming app to make
  it your own while keeping the structure; change them here to move every app.
- **One system, every surface.** React components for the web, layout primitives
  for responsive pages, brand assets, page templates, and a generated **SwiftUI**
  token layer so native apps share the exact same palette.
- **Resilient by default.** OKLCH colour, a considered dark mode, five accent
  families, `prefers-reduced-motion`, `forced-colors`, and AA-minded foreground
  pairings are built in — not bolted on.

There's an **interactive Storybook** to try everything — colour, type, components,
templates — with live theme and accent switches before you commit them elsewhere.

---

## Quickstart

**1. Point the scope at GitHub Packages** — add `.npmrc` to your app repo:

```ini
@martinzachariassen:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Export a `GITHUB_TOKEN` (a token with `read:packages`) in your shell / CI. Never
commit it.

**2. Install:**

```bash
bun add @martinzachariassen/design
bun add react react-dom          # peers, if not already present
```

**3. Inherit the whole system — two lines** in your app's main stylesheet:

```css
@import "tailwindcss";
@import "@martinzachariassen/design/styles/index.css";
```

That's the entire setup. `index.css` bundles the tokens, fonts and base defaults,
**and declares the package's own Tailwind source** — so the components' classes are
emitted automatically. No manual `@source`, no separate imports. (Tailwind v4
auto-scans your own files; the package just adds the one thing it can't see — the
utility classes compiled into `node_modules`.)

**4. Use it:**

```tsx
import { Button, Card, CardHeader, CardTitle, CardContent, Badge } from "@martinzachariassen/design";

export function Example() {
  return (
    <Card>
      <CardHeader><CardTitle>Deploy</CardTitle></CardHeader>
      <CardContent className="flex items-center gap-3">
        <Button variant="solid">Ship it</Button>
        <Badge variant="accent">v0.1.0</Badge>
      </CardContent>
    </Card>
  );
}
```

Utilities (`bg-background`, `text-muted-foreground`, `border-border`, `font-hand`,
`ring-ring`, `rounded-md`…) and raw variables (`var(--accent)`, `var(--ease-out)`…)
are both available for your own markup.

> **Want finer control?** Skip `index.css` and import the pieces yourself:
> `styles/theme.css` (tokens, required), `styles/fonts.css` (or self-host — see its
> header) and `styles/base.css` (optional body defaults). If you import them
> individually, add `@source "../node_modules/@martinzachariassen/design/dist";`
> so Tailwind still emits the component classes.

---

## Theming at runtime

Swap by attribute on `<html>` — no rebuild:

| Attribute            | Effect                                                   |
| -------------------- | -------------------------------------------------------- |
| `class="dark"`       | Ink-surface dark mode (`data-theme="dark"` also works)   |
| `data-accent="rust"` | Accent + ring + glitch → another family                  |

Accent families: `cyan` (default), `blue`, `green`, `rust`, `ink`. Set them on the
whole page or on any subtree — a local `<div class="dark">` becomes an inverted
island, and `data-accent` re-tints just that branch.

## Making it your own

The point of the system is consistency *with room to adapt*. A consuming app never
edits the brand primitives — it re-maps the **semantic layer** to taste, and every
component follows:

```css
/* your app's stylesheet, after the MLZ import */
:root {
  --accent: oklch(0.70 0.15 300);   /* a different house accent for this app  */
  --radius: 0.5rem;                  /* softer corners than the sharp default  */
}
```

Because names match **shadcn/ui**, `npx shadcn@latest add <component>` also drops
straight in and inherits this palette with no extra wiring.

## What's inside

Every component reads only semantic tokens, so all of them re-theme with the
`class="dark"` / `data-accent` switches for free. Browse them live in Storybook.

**Forms & actions**

| Component  | Notes                                                |
| ---------- | ---------------------------------------------------- |
| `Button`   | `default` · `solid` · `accent` · `ghost` · `sketch` · `destructive` · `link`; sizes `sm`/`default`/`lg`/`icon`. The signature ghost that lifts on hover with an offset accent shadow. |
| `Input` · `Textarea` | accent focus ring, technical mono field         |
| `Label`    | mono, uppercase field label with `peer-disabled` states |
| `Checkbox` · `Switch` | accessible native controls with styled indicators |

**Surfaces & data**

| Component  | Notes                                                |
| ---------- | ---------------------------------------------------- |
| `Card` (+ `Header`/`Title`/`Description`/`Action`/`Content`/`Footer`) | `default` · `elevated` · `interactive` (hover-lift) · `accent` · `ghost` |
| `Badge`    | `default` · `accent` · `outline` · `muted` · `destructive` |
| `Alert` (+ `Title`/`Description`) | `default` · `info` · `success` · `warning` · `destructive` signal panels |
| `Avatar` (+ `Image`/`Fallback`/`Group`) | initials-first; `xs`–`xl`, circle/square, presence `status`, overlap group with `+N` |
| `ProjectCard` | portfolio card — on-brand cover, tags, whole-card link, `featured` horizontal layout |
| `Dialog` (+ `Content`/`Header`/`Title`/`Description`/`Footer`/`Close`) | modal on the native `<dialog>` — focus-trap, Esc, no dependency |
| `Prose` | token-styled long-form typography (blog/article) — no plugin |
| `Tabs` (+ `List`/`Trigger`/`Content`) | Radix-free, keyboard-navigable  |
| `Progress` · `Skeleton` · `Spinner` | determinate bar · loading placeholder · reduced-motion-aware ring |
| `Separator` · `Kbd` | hairline rule (optional label) · keyboard key   |

**Layout & responsive**

| Component  | Notes                                                |
| ---------- | ---------------------------------------------------- |
| `Container` | centred max-width page frame with responsive gutters (`sm`…`xl`/`prose`/`full`) |
| `Stack`    | flex row/column with a token gap; `direction="responsive"` stacks on mobile, flows to a row at `sm` |
| `Grid`     | responsive grid — auto-fitting (`min`) or fixed responsive `cols` (1–6) |

**Brand & marketing**

| Component  | Notes                                                |
| ---------- | ---------------------------------------------------- |
| `BrandMark` · `BrandWordmark` · `BrandLockup` | the logo — the solid Block-M mark (`tile`/`glyph`), the `mlz.` wordmark (accent period), and their `horizontal`/`stacked` lockup — backs favicons; see Foundations/Logo |
| `RepoBanner` | the README header banner at the top of this file — `standard` · `minimal` · `terminal` · `split` layouts, sized for GitHub's README width; one structure, per-project copy |
| `SocialCard` | a 1200×630 Open-Graph template, ready for Satori / `@vercel/og` |
| `GridBackground` · `FloatingMarks` · `GlitchText` | the signature decorative layers |

The banner at the top of this file is `RepoBanner` (standard layout), rendered to a
self-contained, theme-adaptive `assets/banner.svg` by `bun run gen:banner`. That
script also emits **`assets/banner-template.svg`** — a placeholder version any repo
can copy as its layout starting point. For the full turnkey path — banner **plus**
social cards and the favicon set, rendered per repo from one config — see
[**Brand assets**](#brand-assets--one-face-across-every-repo) below.

Storybook also ships composed references — **Foundations → Patterns** (dashboard,
forms, alerts…) and full-page **Templates → Portfolio / Blog** — showing how to
build real UIs in the system's voice, responsive by default.

`cn()` (clsx + tailwind-merge) is exported for your own composition.

## Brand assets — one face across every repo

Every repo I build wears the same graphics — README banner, social share cards,
and the full favicon / app-icon set — and they all come **out of the real
design-system components**, not redrawn per project. A consuming repo supplies only
the *copy*; every visual decision (the frame, ruled grid, type, colour, the `mlz.`
lockup) is inherited from the tokens and can't drift. One command renders the whole
set; a `--check` mode fails CI the moment a committed asset falls out of sync.

**1. Drop a `brand.config.ts` at the repo root.** It's just strings — fully typed
and autocompleted via the `defineBrandAssets` helper:

```ts
import { defineBrandAssets } from "@martinzachariassen/design/brand-assets";

export default defineBrandAssets({
  banner: {
    project: "mlz.no",
    eyebrow: "MLZ · Personal Site",
    description: "Personal homepage — a small Vite + React + TypeScript app.",
    badges: ["React", "Vite", "Bun", "TypeScript"],
    install: "bun run dev",
    footer: "github.com/martinzachariassen/mlz-no",
  },
  social: {
    title: "Senior Software Developer",
    eyebrow: "Martin Zachariassen",
    description: "Backend systems, distributed architecture, APIs.",
    footer: "mlz.no",
    tag: "Oslo, Norway",
    tagline: "Personal Site",   // the mono kicker under the wordmark
  },
});
```

Only `banner.project` and `social.title` are required; everything else is optional.
Add `favicons: false` to skip the icon set, or a `paths` object to redirect any
group (see the table below).

**2. Generate the set.** The generator lives in *this* repo — run it here, pointed
at the other repo's config and root:

```bash
bun run gen:assets --config ../mlz-no/brand.config.ts --out ../mlz-no
```

It writes eight files to their conventional locations (override any group with the
matching `paths` key):

| File(s)                                                        | Size     | Default dir (`paths` key)          |
| ------------------------------------------------------------- | -------- | ---------------------------------- |
| `banner.png`                                                  | 1280×340 | `assets/` (`banner`)               |
| `og.png` · `twitter-card.png`                                 | 1200×630 | `public/assets/social/` (`social`) |
| `favicon.svg` · `favicon-32.png` · `favicon-192.png` · `apple-touch-icon.png` | 32/192/180 | `public/assets/icons/` (`icons`) |
| `favicon.ico`                                                 | 16 + 32  | `public/` (`ico`)                  |

**3. Guard against drift in CI** with `--check` — it re-renders everything and
byte-compares against what's committed, exiting non-zero (and listing the stale
files) if a banner or card is out of date. No writes:

```bash
bun run gen:assets --config ../mlz-no/brand.config.ts --out ../mlz-no --check
```

### How it works

The generator boots **Vite + headless Chromium** (Playwright), injects the config
as `window.__BRAND__`, and screenshots the actual `<RepoBanner>` / `<SocialCard>` /
`<BrandMark>` components at 2× DPI downsampled to canonical size — pixel-identical
to what Storybook renders, gradients and `color-mix` and all. The favicon `.ico` is
packed by hand as 16 + 32 PNG-in-ICO (no extra dependency). Captures are made
deterministic — animations frozen and the drifting `FloatingMarks` disabled — so
`--check` is byte-stable across runs on the same toolchain (a Chromium bump can
shift antialiasing, so run the check with the toolchain that wrote the assets).

The generator itself is **not published**: it needs the source, Vite and Playwright,
so it runs from this repo against sibling repo configs rather than via `bunx` in a
consumer. What *is* exported is the config contract — `defineBrandAssets` and the
`BrandAssetsConfig` type — at the `@martinzachariassen/design/brand-assets` subpath,
so every repo's `brand.config.ts` is typed against the same source of truth.

## Tokens in JS

For the times you need the values outside CSS (charts, canvas, email, framer-motion):

```ts
import { tokens, accents, colors, signals, fonts, motion, radius, breakpoints } from "@martinzachariassen/design/tokens";

accents.rust.base; // "oklch(0.66 0.15 45)"
signals.warning;   // "oklch(0.80 0.15 78)"
fonts.hand;        // '"Architects Daughter", "Comic Sans MS", cursive'
motion.easeOut;    // "cubic-bezier(.22, .61, .36, 1)"
radius.base;       // "0.25rem"
breakpoints.lg;    // "64rem" — the min-width ladder, for matchMedia etc.
```

These mirror `theme.css` value-for-value. One naming quirk: the signal role
called `--destructive` in CSS is exported as `signals.danger` in JS (same colour).

## Token architecture

Three layers keep components decoupled from raw brand values
(`src/styles/theme.css`):

1. **Primitives** (`--mlz-*`) — the canonical MLZ brand values (paper hex, accent
   oklch, font stacks, easings). This is the source of truth; components never
   touch these directly.
2. **Semantic** — shadcn/ui-standard role names, every surface paired with a
   `-foreground`, plus signal roles (`destructive`/`success`/`warning`/`info`) each
   with a solid, a foreground and a subtle tint. Light, dark and every
   `data-accent` live here. **The only layer to read or override.**
3. **`@theme inline`** — re-exports the semantic layer to Tailwind so tokens and
   utilities are the same thing, and runtime swaps keep working.

Beyond the core roles, the semantic layer also ships **subtle tints** for every
accent/signal (`bg-accent-subtle`, `bg-warning-subtle`…, built with `color-mix`,
so they follow the current theme and accent), a warm-tinted **elevation scale**
(`shadow-xs · sm · md · lg`), a **radius scale** (`rounded-sm · md · lg · xl` off
`--radius`), and `--accent-deep`, `--overlay` and `--glitch-1/2` for hovers, scrims
and the cyberpunk glitch motion.

## Native (SwiftUI)

The same tokens, on iOS/macOS. `swift/` is a small **generated** SwiftPM package
(`MLZDesign`) with no dependencies — colour, type, spacing, radius and motion
emitted from `src/tokens.ts` + `theme.css` so native apps can't drift from the web
system either.

```bash
bun run gen:swift   # OKLCH → sRGB, writes swift/Sources/MLZDesign/*.swift
```

```swift
import SwiftUI
import MLZDesign

Text("Ship it")
    .font(MLZFont.hand(28))
    .foregroundStyle(MLZColor.foreground)   // light/dark adaptive
    .padding(MLZSpacing.lg)
    .background(MLZColor.card)
    .tint(MLZColor.accent(.rust))           // swap the whole accent family
```

`MLZColor` (semantic roles + brand primitives + five accent families), `MLZFont`,
`MLZSpacing` (4pt grid), `MLZRadius`, `MLZMotion`. See [`swift/README.md`](swift/README.md).

## Fonts

Space Mono (`mono`/body), Architects Daughter (`hand`/display), Space Grotesk
(`grotesk`), Instrument Serif (`serif`). `styles/fonts.css` (bundled into
`index.css`) loads them from Google Fonts for convenience; for production, self-host
with Fontsource + Fontaine metric-matched fallbacks (see the header comment in that
file). The `--font-*` stacks carry robust system fallbacks either way.

---

## Playground

An interactive Storybook — components, live foundations (colour, type, motion,
responsive), full-page templates, the a11y addon, and toolbar switches for
**theme** (light/dark) and **accent** (all five families).

```bash
bun run storybook          # dev server at http://localhost:6006
bun run build:storybook    # static build → storybook-static/
bun run serve:storybook    # serve the static build (honours $PORT)
```

### Deploy to Railway

The repo ships a `Dockerfile` (Bun install → Storybook build → tiny zero-dependency
Node static server binding `$PORT`) and a `railway.json`. Point a Railway service
at this repo and it builds and serves the playground with no extra config.

## Development

```bash
bun install
bun run build         # tsup → dist (ESM + d.ts), then copies styles/
bun run typecheck     # tsc --noEmit
bun run test          # Vitest + Testing Library
bun run lint          # Biome (lint:fix / format to write)
bun run gen:swift     # regenerate the SwiftUI token layer
bun run gen:banner    # regenerate assets/banner.svg (README header, embeds font subsets)
bun run gen:assets    # render a repo's banner + social cards + favicons (--config <path> [--out <dir>] [--check])
bun run preview       # static token reference page (preview/index.html) on :4321
```

`bun run preview` serves a dependency-free HTML page that consumes the tokens
exactly as a real app would — a quick way to eyeball the palette without the full
Storybook.

Package layout:

```
src/
  index.ts             barrel export
  tokens.ts            typed token objects        → ./tokens
  lib/cn.ts            clsx + tailwind-merge
  components/*.tsx      Button, Input, Card, Dialog, ProjectCard, Prose… (+ .stories, .test)
  foundations/*.tsx     Introduction, Colours, Typography, Patterns, Logo, Responsive,
                        Portfolio, Blog, Social Cards, Repo Banner, SwiftUI
  styles/
    index.css           the one-import bundle     → ./styles/index.css
    theme.css           the token system          → ./styles/theme.css
    fonts.css           font loading              → ./styles/fonts.css
    base.css            optional base layer       → ./styles/base.css
scripts/
  generate-swift-tokens.ts   tokens → SwiftUI     (bun run gen:swift)
  brand-assets/        per-repo banner/cards/favicon generator (bun run gen:assets)
    generate.ts          Vite + Playwright render + write / --check
    plan.ts              pure write-list + paths (unit-tested)
    ico.ts               PNG-in-ICO packer (unit-tested)
    capture.tsx          the component surface screenshotted per asset
swift/                 generated MLZDesign SwiftPM package (Package.swift + Sources/)
.storybook/            Storybook config
server.mjs  Dockerfile  railway.json   Railway deploy
```

## Quality & CI

- **CI** (`.github/workflows/ci.yml`): lint · typecheck · test · build ·
  build-storybook, plus a **Storybook a11y** job that runs axe (WCAG 2.1 A/AA) over
  every story in a headless browser — a violation fails the build.
- **Security & supply-chain**: **CodeQL** and **Dependency Review**, **OpenSSF
  Scorecard** and **`zizmor`** (Actions static analysis) with results in the
  Security tab, plus **Dependabot** for updates. Every workflow pins its actions to
  a commit SHA and runs under `step-security/harden-runner`; releases publish with
  build **provenance** (Sigstore). See [`SECURITY.md`](SECURITY.md).
- `main` is protected (enforced for admins) and merges require green checks.

> **a11y notes.** The palette is tuned so text clears WCAG AA (4.5:1) with no
> per-story exceptions: **`--accent-deep`** (house cyan) was deepened to land
> ~5.1:1 on paper, and the **destructive** signal to ~4.8:1 under its light
> foreground in both light and dark. The gate enforces every story unscoped.

## Releasing

Automated with [Changesets](https://github.com/changesets/changesets) → GitHub
Packages. There's no manual version bump or tag — you only ever describe changes;
`release.yml` does the rest on merge to `main`.

**1. Add a changeset to your feature PR** — one per user-facing change:

```bash
bun run changeset   # describe the change + pick the semver bump; commit the file
```

**2. Merge the PR.** `release.yml` sees the pending changeset and opens (or
updates) a **"version packages"** PR that applies every accumulated bump, updates
each `CHANGELOG`, and consumes the changesets.

**3. Merge the "version packages" PR** when you're ready to ship. That merge runs
`bun run release` (build + `changeset publish`), which publishes to GitHub Packages
with build **provenance** and cuts the matching GitHub Release + tag.

So the whole release surface is two merges: your change, then the version PR — no
local tagging, no `publish` from a laptop.

> Publishing stays on **GitHub Packages**, so consumers keep the `.npmrc` +
> `read:packages` token from [Quickstart](#quickstart). The committed `dist/` is
> the token-free fallback for `bun add github:martinzachariassen/mlz-design` — keep
> it fresh (`bun run build`) in any PR that changes `src/`.

## Roadmap

- [ ] Overlay components (Dropdown, Tooltip, Popover) alongside the native `Dialog`
- [ ] Glitch + cursor-spotlight motion helpers as an opt-in module
- [ ] Grow the SwiftUI layer beyond tokens — view modifiers and the core components

---

<div align="center">
<sub>MLZ Design · Martin Zachariassen's design system · © Martin Zachariassen · MIT</sub>
</div>
