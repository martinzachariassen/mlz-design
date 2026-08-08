# mlz-design

Martin Zachariassen's design system — colour, type, style and motion as an installable React + Tailwind v4 package.

[![CI](https://github.com/martinzachariassen/mlz-design/actions/workflows/ci.yml/badge.svg)](https://github.com/martinzachariassen/mlz-design/actions/workflows/ci.yml)
[![Version](https://img.shields.io/github/package-json/v/martinzachariassen/mlz-design?label=version)](https://github.com/martinzachariassen/mlz-design/pkgs/npm/design)
[![License: MIT](https://img.shields.io/github/license/martinzachariassen/mlz-design)](LICENSE)

**Status:** Stable, actively maintained · Published as `@martinzachariassen/design` on GitHub Packages · Requires React 18 or newer

## What it does

MLZ Design is my **single source of truth for design**. Instead of re-deciding colours, spacing and components in every new app, I decide them once — here — and every project installs this package and inherits them. Change a token, cut a release, and every consuming app moves with the system. No per-project drift, no copy-pasted palettes.

- **Inherit in two lines.** One `@import` pulls in the tokens, fonts, base layer and every component's styles — the package declares its own Tailwind source, so there's nothing else to wire up.
- **Restyle once, everywhere.** Components read only *semantic* tokens (`--primary`, `--accent`, `--border`…). Override them in a consuming app to make it your own; change them here to move every app.
- **One system, every surface.** React components, layout primitives and composed patterns, all reading the same token layer.
- **Not a component library to depend on blindly.** It's *my* house style — a warm paper/ink palette, house cyan accent, an engineering-notebook character with a cyberpunk edge. Fork it or re-map the semantic layer if you want a different look; for a neutral, unopinionated kit use [shadcn/ui](https://ui.shadcn.com) directly (the token names match, so it drops in).

The repo is **public** on purpose — browse it, learn from it, lift pieces — but built first for me. Try everything in the [interactive Storybook](#playground): colour, type, components, patterns, with live theme and accent switches.

## Quick start

**1. Point the scope at GitHub Packages** — add `.npmrc` to your app repo:

```ini
@martinzachariassen:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Export a `GITHUB_TOKEN` (a token with `read:packages`) in your shell / CI. Never commit it.

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

That's the entire setup. `index.css` bundles the tokens, fonts and base defaults, **and declares the package's own Tailwind source** — so the components' classes are emitted automatically. No manual `@source`, no separate imports.

**4. Use it:**

```tsx
import { Button, Card, CardHeader, CardTitle, CardContent, Badge } from "@martinzachariassen/design";

export function Example() {
  return (
    <Card>
      <CardHeader><CardTitle>Deploy</CardTitle></CardHeader>
      <CardContent className="flex items-center gap-3">
        <Button variant="solid">Ship it</Button>
        <Badge variant="accent">Production</Badge>
      </CardContent>
    </Card>
  );
}
```

Utilities (`bg-background`, `text-muted-foreground`, `border-border`, `font-hand`, `ring-ring`, `rounded-md`…) and raw variables (`var(--accent)`, `var(--ease-out)`…) are both available for your own markup.

> [!NOTE]
> **Strict CSP / privacy-first?** Use `@import "@martinzachariassen/design/styles/index-self-hosted.css";` instead — identical to `index.css` but loads fonts from bundled WOFF2 files (Space Mono + Space Grotesk) same-origin, no Google Fonts CDN. Works under `font-src 'self'` / `style-src 'self'`.
>
> **Want finer control?** Skip `index.css` and import the pieces yourself: `styles/theme.css` (tokens, required), `styles/fonts.css` and `styles/base.css` (optional). If you import them individually, add `@source "../node_modules/@martinzachariassen/design/dist";` so Tailwind still emits the component classes.

## Usage

Beyond the components, the token values are exported as typed JS for the times you need them outside CSS (charts, canvas, email, framer-motion):

```ts
import { accents, signals, fonts, motion, radius, breakpoints } from "@martinzachariassen/design/tokens";

accents.rust.base; // "oklch(0.74 0.138 45)"  — the fill rung
signals.warning;   // "oklch(0.74 0.138 75)"
motion.easeOut;    // "cubic-bezier(.22, .61, .36, 1)"
breakpoints.lg;    // "64rem" — the min-width ladder, for matchMedia etc.
```

The full component catalogue, token architecture, runtime theming and fonts are documented in **[docs/design-system.md](docs/design-system.md)** — or browse them live in the [playground](#playground).

## Configuration

There's no build config to consume this package. Visual configuration is done **at runtime** — swap by attribute on `<html>` (or any subtree), no rebuild:

| Attribute            | Effect                                                   |
| -------------------- | -------------------------------------------------------- |
| `class="dark"`       | Ink-surface dark mode (`data-theme="dark"` also works)   |
| `data-accent="rust"` | Accent + ring + glitch → another family (`cyan` default; also `blue`, `green`, `ink`) |

Consuming apps re-map the **semantic tokens** to make the system their own — see [Making it your own](docs/design-system.md#making-it-your-own).

## Playground

An interactive Storybook — components with generated props tables, live foundations (colour, type, motion, responsive), composed patterns, an a11y checker on every story, and toolbar switches for **theme** (light/dark) and **accent** (all five families). Deployed to Cloudflare Workers at **[design.mlz.no](https://design.mlz.no)**.

```bash
bun run storybook          # dev server at http://localhost:6006
bun run build:storybook    # static build → storybook-static/
```

## Development

```bash
bun install
bun run build         # tsup → dist (ESM + d.ts), then copies styles/
bun run typecheck     # tsc --noEmit
bun run test          # Vitest + Testing Library
bun run lint          # Biome (lint:fix / format to write)
```

All documentation lives in **[docs/](docs/)**: the [design system](docs/design-system.md) (components, theming, tokens), the [architecture](docs/architecture.md) (token layering, repo layout, Storybook setup), and [contributing](docs/CONTRIBUTING.md) (development, release, deployment).

## Contributing

Issues and PRs welcome. Run `bun run lint && bun run typecheck && bun run test && bun run build` before opening a PR, and add a changeset (`bun run changeset`) for user-facing changes. See [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md); report vulnerabilities per [docs/SECURITY.md](docs/SECURITY.md). Planned work lives in [Issues](https://github.com/martinzachariassen/mlz-design/issues).

## License

[MIT](LICENSE) © Martin Zachariassen
