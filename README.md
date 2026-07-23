<div align="center">

# MLZ Design

**Martin Zachariassen's design system.**
Colour, type and style — one resilient foundation every app I build extends from.

`@martinzachariassen/design`

</div>

---

MLZ Design is the single source of truth behind [mlz.no](https://mlz.no) and my
other projects: a warm **paper / ink** palette, a house **cyan** accent, four
typefaces, and the technical, hand-drawn *engineering-notebook* feel — packaged so
any project inherits the same look and, when the system changes, they all follow.

It is built for **React + Tailwind v4**. Tokens are plain CSS custom properties, so
anything that loads a stylesheet can use them; Tailwind and the React components
just make them ergonomic. There's an **interactive Storybook playground** for
trying colour, type and components before committing them elsewhere.

- **Tokens** — three-layer CSS variables (primitives → shadcn-standard semantic
  names → Tailwind `@theme`), authored in OKLCH, with light + dark + five accent
  families and full signal scales. `./tokens` also ships them as typed JS.
- **Components** — `Button`, `Input`, `Card`, `Badge`, built with
  class-variance-authority + `tailwind-merge`, styled purely from the tokens.
- **Playground** — a themed, a11y-checked Storybook, deployable to Railway.
- **Quality** — strict TypeScript, Vitest + Testing Library, Biome, CI, CodeQL,
  Dependabot, and changeset-based releases to GitHub Packages.

## Philosophy

- **Restyle once, everywhere.** Components read only *semantic* tokens
  (`--primary`, `--accent`, `--border`…). Change the token, every app changes.
  No per-app colour drift.
- **Resilient by default.** Robust font fallbacks, `prefers-reduced-motion`,
  `forced-colors`, a considered dark mode, and AA-minded foreground pairings are
  built in — not bolted on.
- **Faithful, then flexible.** The mlz.no brand values live untouched as
  *primitives*; the semantic layer maps them to roles you can safely override.

---

## Install

Published to **GitHub Packages**. A consuming app needs two things:

**1. Point the scope at GitHub Packages** — add `.npmrc` to the app repo:

```ini
@martinzachariassen:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Export a `GITHUB_TOKEN` (a token with `read:packages`) in your shell / CI. Never
commit it.

**2. Add the dependency:**

```bash
bun add @martinzachariassen/design
bun add react react-dom          # peers, if not already present
```

## Use it (Tailwind v4)

In your app's main stylesheet:

```css
@import "tailwindcss";
@import "@martinzachariassen/design/styles/theme.css";
@import "@martinzachariassen/design/styles/fonts.css"; /* or load fonts via <link> */
@import "@martinzachariassen/design/styles/base.css";  /* optional paper/ink defaults */

/* Let Tailwind see the class names inside the shipped components: */
@source "../node_modules/@martinzachariassen/design/dist";
```

The `@source` line matters — the components' Tailwind classes live as strings in
the compiled package, so Tailwind must scan `dist` to generate their CSS.

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

---

## Theming at runtime

Swap by attribute on `<html>` — no rebuild:

| Attribute            | Effect                                                   |
| -------------------- | -------------------------------------------------------- |
| `class="dark"`       | Ink-surface dark mode (`data-theme="dark"` also works)   |
| `data-accent="rust"` | Accent + ring + glitch → another family                  |

Accent families: `cyan` (default), `blue`, `green`, `rust`, `ink`.

## Components

| Component                                          | Notes                                                |
| -------------------------------------------------- | ---------------------------------------------------- |
| `Button`                                           | `default` · `solid` · `accent` · `ghost` · `destructive` · `link`; sizes `sm`/`default`/`lg`/`icon`. Default variant is the mlz.no ghost that lifts on hover with an offset accent shadow. |
| `Input`                                            | accent focus ring                                    |
| `Badge`                                            | `default` · `accent` · `outline` · `muted` · `destructive` |
| `Card` (+ `Header`/`Title`/`Description`/`Content`/`Footer`) | hairline-border "paper" surfaces           |

`cn()` (clsx + tailwind-merge) is exported for your own composition.

## Tokens in JS

```ts
import { tokens, accents, colors, signals, fonts, motion, radius } from "@martinzachariassen/design/tokens";

accents.rust.base; // "oklch(0.66 0.15 45)"
signals.warning;   // "oklch(0.80 0.15 78)"
fonts.hand;        // '"Architects Daughter", "Comic Sans MS", cursive'
motion.easeOut;    // "cubic-bezier(.22, .61, .36, 1)"
radius.base;       // "0.25rem"
```

These mirror `theme.css` value-for-value. One naming quirk: the signal role
called `--destructive` in CSS is exported as `signals.danger` in JS (same
colour).

## Token architecture

Three layers keep components decoupled from raw brand values
(`src/styles/theme.css`):

1. **Primitives** (`--mlz-*`) — the actual mlz.no values (paper hex, accent oklch,
   font stacks, easings). Faithful, no drift. Components never touch these.
2. **Semantic** — shadcn/ui-standard role names, every surface paired with a
   `-foreground`, plus signal roles (`destructive`/`success`/`warning`/`info`) each
   with a solid, a foreground and a subtle tint. Light, dark and every
   `data-accent` live here. **The only layer to read or override.**
3. **`@theme inline`** — re-exports the semantic layer to Tailwind so tokens and
   utilities are the same thing, and runtime swaps keep working.

Semantic names match shadcn/ui, so `npx shadcn@latest add <x>` drops in and
inherits this palette with no extra wiring.

Beyond the core roles, the semantic layer also ships **subtle tints** for every
accent/signal (`bg-accent-subtle`, `bg-warning-subtle`, `bg-destructive-subtle`,
`bg-success-subtle`, `bg-info-subtle` — built with `color-mix`, so they follow
the current theme and accent), a warm-tinted **elevation scale**
(`shadow-xs · sm · md · lg`), a **radius scale** (`rounded-sm · md · lg · xl`
off `--radius`), and `--accent-deep`, `--overlay` and `--glitch-1/2` for hovers,
scrims and the cyberpunk glitch motion.

## Fonts

Space Mono (`mono`/body), Architects Daughter (`hand`/display), Space Grotesk
(`grotesk`), Instrument Serif (`serif`). `styles/fonts.css` loads them from Google
Fonts for convenience; for production, self-host with Fontsource + Fontaine
metric-matched fallbacks (see the header comment in that file). The `--font-*`
stacks carry robust system fallbacks either way.

---

## Playground

An interactive Storybook — components, live foundations (colour & type), the a11y
addon, and toolbar switches for **theme** (light/dark) and **accent** (all five
families).

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
bun run preview       # static token reference page (preview/index.html) on :4321
```

`bun run preview` serves a dependency-free HTML page that consumes the tokens
exactly as a real app would — a quick way to eyeball the palette without the
full Storybook.

Package layout:

```
src/
  index.ts             barrel export
  tokens.ts            typed token objects        → ./tokens
  lib/cn.ts            clsx + tailwind-merge
  components/*.tsx      Button, Input, Card, Badge (+ .stories, .test)
  foundations/*.tsx     Introduction, Colours, Typography stories
  styles/
    theme.css           the token system          → ./styles/theme.css
    fonts.css           font loading              → ./styles/fonts.css
    base.css            optional base layer       → ./styles/base.css
.storybook/            Storybook config
server.mjs  Dockerfile  railway.json   Railway deploy
```

## Quality & CI

- **CI** (`.github/workflows/ci.yml`): lint · typecheck · test · build ·
  build-storybook on every push/PR.
- **CodeQL** and **Dependency Review** for security; **Dependabot** for updates.
- `main` is protected (enforced for admins) and merges require green checks.

## Releasing

Uses [Changesets](https://github.com/changesets/changesets) → GitHub Packages,
driven by a version **tag** (decoupled from the push-to-`main` CI build).

```bash
bun run changeset          # describe the change + pick a semver bump
bun run version-packages   # apply the bump + CHANGELOG, consume changesets
git commit -am "release: v<x.y.z>"
git tag v<x.y.z>
git push --follow-tags     # pushing the v* tag triggers release.yml
```

Pushing a `v*` tag runs `release.yml`, which builds and `changeset publish`es to
GitHub Packages.

## Roadmap

- [ ] More components (Dialog, Dropdown, Tabs) on Radix primitives
- [ ] Glitch + cursor-spotlight motion helpers as an opt-in module
- [ ] Point mlz.no at this package so its colours can't drift from the system

---

<div align="center">
<sub>MLZ Design · distilled from mlz.no · © Martin Zachariassen · MIT</sub>
</div>
