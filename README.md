# @martinzachariassen/design

The shared design system for my apps — colour, type, style tokens **and** a
React component set, distilled from [mlz.no](https://mlz.no): a warm
**paper / ink** palette, a house **cyan** accent, four typefaces, and the
technical, hand-drawn "engineering notebook" feel.

Built for **React + Tailwind v4**. Tokens are plain CSS custom properties;
components are typed, tree-shakeable, and styled entirely from those tokens — so
restyling the system restyles every app that consumes it.

- **Tokens** — three-layer CSS variables (primitives → shadcn-standard semantic
  names → Tailwind `@theme`), light + dark + five accent families.
- **Components** — `Button`, `Input`, `Card`, `Badge`, built with
  class-variance-authority + `tailwind-merge`, carrying the mlz.no look.
- **JS tokens** — the same values as typed objects for canvas/charts/motion.

---

## Install

Published to **GitHub Packages**. Consuming apps need two things.

**1. Tell the scope where to resolve** — add `.npmrc` to the app repo:

```ini
@martinzachariassen:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Export a `GITHUB_TOKEN` (a classic PAT or fine-grained token with
`read:packages`) in your shell / CI environment. Never commit the token.

**2. Add the dependency:**

```bash
bun add @martinzachariassen/design
# peers, if not already present:
bun add react react-dom
```

---

## Set up a consuming app

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
the compiled package, so Tailwind must scan `dist` to generate their CSS. Adjust
the relative path to point at your `node_modules`.

Then use it:

```tsx
import { Button, Card, CardHeader, CardTitle, CardContent, Badge } from "@martinzachariassen/design";

export function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Deploy</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center gap-3">
        <Button variant="solid">Ship it</Button>
        <Badge variant="accent">v0.1.0</Badge>
      </CardContent>
    </Card>
  );
}
```

Utilities (`bg-background`, `text-muted-foreground`, `border-border`, `font-hand`,
`ring-ring`, `rounded-md`, …) and raw variables (`var(--accent)`,
`var(--ease-out)`, …) are both available for your own markup.

---

## Components

| Component                                          | Variants                                             |
| -------------------------------------------------- | ---------------------------------------------------- |
| `Button`                                           | `default` · `solid` · `accent` · `ghost` · `destructive` · `link`; sizes `sm`/`default`/`lg`/`icon` |
| `Input`                                            | accent focus ring                                    |
| `Badge`                                            | `default` · `accent` · `outline` · `muted` · `destructive` |
| `Card` + `CardHeader`/`CardTitle`/`CardDescription`/`CardContent`/`CardFooter` | hairline-border "paper" surfaces |

The default `Button` is the mlz.no signature: a ghost outline that lifts on hover
with an offset accent shadow. `cn()` (clsx + tailwind-merge) is exported for your
own composition.

## Tokens in JS

```ts
import { tokens, accents, colors, fonts } from "@martinzachariassen/design/tokens";

accents.rust.base; // "oklch(0.66 0.15 45)"
fonts.hand;        // '"Architects Daughter", cursive'
```

## Theming at runtime

Swap by attribute on `<html>` — no rebuild:

| Attribute            | Effect                                    |
| -------------------- | ----------------------------------------- |
| `class="dark"`       | Ink-surface dark mode (`data-theme="dark"` also works) |
| `data-accent="rust"` | Accent + ring + glitch → another family   |

Accent families: `cyan` (default), `blue`, `green`, `rust`, `ink`.

---

## How to extend it

- **Per-app tweaks** — override any semantic variable in the app's own CSS
  (`:root { --accent: … }`). Because components read semantic names, they follow
  automatically. Never override primitives (`--mlz-*`).
- **New components in an app** — build them with the exported `cn()` and the same
  `bg-*/text-*/border-*` utilities so they match by construction.
- **Promote to the system** — when a component proves reusable, add it under
  `src/components/`, export it from `src/index.ts`, add a changeset, and release.

## Token architecture

Three layers keep components decoupled from raw brand values (`src/styles/theme.css`):

1. **Primitives** (`--mlz-*`) — actual brand values (paper hex, accent oklch, font
   stacks, easings). Faithful to mlz.no. Components never touch these.
2. **Semantic** (`--background`, `--foreground`, `--primary`, `--accent`,
   `--border`, `--ring`, …) — shadcn/ui-standard role names. Light, dark and every
   `data-accent` live here. **The only layer to read or override.**
3. **`@theme inline`** — re-exports the semantic layer to Tailwind so tokens and
   utilities are one and the same, and runtime swaps keep working.

Because the semantic names match shadcn/ui, `npx shadcn@latest add <x>` drops in
and inherits this palette with no extra wiring.

---

## Development

```bash
bun install
bun run build        # tsup → dist (ESM + d.ts), then copies styles/
bun run typecheck
bun run lint         # Biome (lint:fix / format to write)
bun run preview      # static token reference at http://localhost:4321
```

Package layout:

```
src/
  index.ts            barrel export
  tokens.ts           typed token objects  → ./tokens
  lib/cn.ts           clsx + tailwind-merge
  components/*.tsx     Button, Input, Card, Badge
  styles/
    theme.css          the token system      → ./styles/theme.css
    fonts.css          Google Fonts           → ./styles/fonts.css
    base.css           optional base layer    → ./styles/base.css
preview/index.html    self-contained visual reference
```

## Releasing

Uses [Changesets](https://github.com/changesets/changesets) → GitHub Packages.

```bash
bun run changeset        # describe the change + pick a semver bump
git commit && push       # open a PR
```

Merging a PR with changesets opens a **Version Packages** PR; merging that runs
`.github/workflows/release.yml`, which builds and `changeset publish`es to GitHub
Packages.

## Roadmap

- [ ] More components (Dialog, Dropdown, Tabs) on Radix primitives
- [ ] Glitch + cursor-spotlight motion helpers as a small opt-in module
- [ ] Point mlz.no at this package so its colours never drift from the system
