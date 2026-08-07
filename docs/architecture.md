# Architecture

How `@martinzachariassen/design` is put together. The README is the landing page; this file is the map for anyone changing the internals.

## Three-layer tokens

`src/styles/theme.css` is the source of truth, authored in **OKLCH**. Three layers keep components decoupled from raw brand values:

1. **Primitives** (`--mlz-*`) — the canonical MLZ brand values (paper hex, accent oklch, font stacks, easings). This is the source of truth; **components never touch these directly.**
2. **Semantic** — shadcn/ui-standard role names (`--background`, `--foreground`, `--primary`, `--accent`, `--border`, `--ring`…), every surface paired with a `-foreground`, plus signal roles (`destructive`/`success`/`warning`/`info`) each with a solid, a foreground and a subtle tint. Light, dark (`.dark` / `data-theme`) and every `data-accent` family live here. **This is the only layer to read or override.**
3. **`@theme inline`** — re-exports the semantic layer to Tailwind so tokens and utilities are the same thing, and runtime theme/accent swaps keep working.

Beyond the core roles, the semantic layer also ships **subtle tints** for every accent/signal (`bg-accent-subtle`, `bg-warning-subtle`…, built with `color-mix`, so they follow the current theme and accent), a warm-tinted **elevation scale** (`shadow-xs · sm · md · lg`), a **radius scale** (`rounded-sm · md · lg · xl` off `--radius`), and `--accent-deep`, `--overlay` and `--glitch-1/2` for hovers, scrims and the cyberpunk glitch motion.

`theme.css` is the source of truth; `src/tokens.ts` is a hand-maintained JS mirror that must match it value-for-value — **when you touch a token value, update both.** One naming quirk the mirror carries: the CSS `--destructive` role is exported as `signals.danger` in JS.

## Repo layout

```
src/
  index.ts              barrel export                        → .
  tokens.ts             typed token objects                  → ./tokens
  lib/
    cn.ts               clsx + tailwind-merge
    theme.tsx           ThemeProvider / useTheme / init script
  components/           grouped by function, kebab-case files
    brand/              BrandMark, GlitchText, ProjectCard, RepoBanner, SocialCard…
    data-display/       Badge, Avatar, DataList, Prose, StatusDot, Text, Kbd
    feedback/           Alert, Callout, Progress, Skeleton, Spinner
    forms/              Button, Input, Label, Checkbox, Switch, Textarea
    layout/             Card, Container/Stack/Grid, Accordion, Tabs, Separator
    overlay/            Dialog, InfoTip
  foundations/          Storybook-only: Introduction, Colours, Typography, Motion,
                        Patterns, Logo, Responsive… + theme-split.tsx
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
| **Radix primitive** | `Tabs` · `Accordion` · `InfoTip` (popover) · `Avatar` · `Progress` · `Separator` · `Label`, plus `Slot` for `asChild` |
| **Platform element** — Radix would add JS for what the browser already does | `Dialog` (native `<dialog>` + `showModal()`: focus-trap, Esc, inerting, top layer) · `Button` · `Input` · `Textarea` · `Checkbox` · `Switch` (native inputs styled with `peer-checked:`, zero JS) |
| **Presentational only** — no behaviour to own | everything else: `Badge`, `Card`, `Text`, `Prose`, `Kbd`, `Callout`, `Alert`, `Skeleton`, `Spinner`, `StatusDot`, `DataList`, the layout primitives, all of `brand/` |

Radix packages are depended on **granularly** (`@radix-ui/react-tabs`, …), not via the unified `radix-ui` meta-package: this ships as a library, and the meta-package would make every consumer install ~40 primitives to use one.

`asChild` (via `@radix-ui/react-slot`) is available on `Button`, `Badge`, `Card` and `DialogClose` — render a link or any other element while keeping the component's styling and props.

## Conventions that bite

- **Biome is scoped to JS/TS.** CSS formatting/linting is disabled on purpose — `theme.css` is hand-column-aligned; don't let a tool reflow it.
- **Tailwind v4 in Storybook uses PostCSS** (`@tailwindcss/postcss` + `postcss.config.mjs`), NOT `@tailwindcss/vite` (open export-compat bug with Storybook's builder). `tsup` does not process CSS.
- When adding a token, keep light + dark + every `data-accent` in sync, and honour `prefers-reduced-motion` / `forced-colors`.

## Distribution

`tsup` builds `dist` (ESM + `.d.ts`), then the build copies `src/styles` into `dist/styles`. The committed `dist/` is the token-free fallback for `bun add github:martinzachariassen/mlz-design` — refresh it (`bun run build`) in any PR that changes `src/`. Primary distribution is **GitHub Packages** via Changesets (see [CONTRIBUTING.md](CONTRIBUTING.md)).
