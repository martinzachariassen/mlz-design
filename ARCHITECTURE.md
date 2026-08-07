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
  generate-banner.ts         README banner SVG    (bun run gen:banner)
  brand-assets/        per-repo banner/cards/favicon generator (bun run gen:assets)
    generate.ts          Vite + Playwright render + write / --check
    plan.ts              pure write-list + paths (unit-tested)
    ico.ts               PNG-in-ICO packer (unit-tested)
    capture.tsx          the component surface screenshotted per asset
swift/                 generated MLZDesign SwiftPM package (Package.swift + Sources/)
.storybook/            Storybook config
wrangler.jsonc          Cloudflare Workers deploy config (static assets + custom domain)
```

Subpath exports mirror the layout: `.` (components), `./tokens` (typed JS values), `./styles/*` (the CSS bundle and its parts), and `./brand-assets` (the config contract). `*.stories.tsx` / `*.test.tsx` colocate with their source but never ship — `files: ["dist"]` keeps them out of the package.

## Components

Components (`src/components/*.tsx`) use CVA + `tailwind-merge` via `cn()` (`src/lib/cn.ts`) and are styled purely from semantic-token utilities (`bg-primary`, `border-input`, `ring-ring`…). Because they read only the semantic layer, every component re-themes with the `class="dark"` / `data-accent` switches for free. `src/foundations/*` are Storybook-only.

## Conventions that bite

- **Biome is scoped to JS/TS.** CSS formatting/linting is disabled on purpose — `theme.css` is hand-column-aligned; don't let a tool reflow it.
- **Tailwind v4 in Storybook uses PostCSS** (`@tailwindcss/postcss` + `postcss.config.mjs`), NOT `@tailwindcss/vite` (open export-compat bug with Storybook's builder). `tsup` does not process CSS.
- When adding a token, keep light + dark + every `data-accent` in sync, and honour `prefers-reduced-motion` / `forced-colors`.

## Distribution

`tsup` builds `dist` (ESM + `.d.ts`), then the build copies `src/styles` into `dist/styles`. The committed `dist/` is the token-free fallback for `bun add github:martinzachariassen/mlz-design` — refresh it (`bun run build`) in any PR that changes `src/`. Primary distribution is **GitHub Packages** via Changesets (see [CONTRIBUTING.md](CONTRIBUTING.md)).
