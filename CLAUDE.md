# CLAUDE.md — @martinzachariassen/design

MLZ Design: Martin Zachariassen's design system and **canonical source of truth**
for colour, type, style and motion — shipped as an installable **React + Tailwind
v4** package (plus a generated SwiftUI token layer) that every one of my other
projects inherits, so nothing drifts. It's a public repo, but built first for
cross-project consistency. This repo *is* the origin of the look — do not frame it
as derived from any website. `README.md` has the full story; this file is the
working brief for agents. Global defaults in `~/.config/claude/CLAUDE.md` still
apply — this only adds repo specifics.

## Stack & commands

Bun + TypeScript. `tsup` builds the package, Storybook 10 is the playground,
Vitest runs the tests.

```
bun install
bun run dev              # tsup --watch (package)
bun run build            # tsup → dist (ESM + d.ts), then copies src/styles
bun run typecheck        # tsc --noEmit (strict)
bun run test             # Vitest + Testing Library
bun run lint / lint:fix  # Biome (JS/TS only)
bun run storybook        # dev playground on :6006
bun run build:storybook  # static build → storybook-static/
bun run serve:storybook  # node server.mjs (honours $PORT) — the Railway runtime
bun run preview          # static token reference (preview/index.html) on :4321
bun run changeset        # start a release (see below)
```

## Architecture — three-layer tokens

`src/styles/theme.css` is the source of truth, authored in OKLCH:

1. **Primitives** (`--mlz-*`) — the canonical MLZ brand values (the source of
   truth). **Components must never reference these directly.**
2. **Semantic** — shadcn-standard roles (`--background`, `--foreground`,
   `--primary`, `--accent`, `--border`, `--ring`, signals…), every surface paired
   with a `-foreground`. Light + dark (`.dark` / `data-theme`) + five accent
   families (`data-accent`). **This is the only layer to read or override.**
3. `@theme inline` — re-exports the semantic layer to Tailwind so tokens and
   utilities are the same thing (and runtime theme/accent swaps keep working).

Components (`src/components/*.tsx`) use CVA + `tailwind-merge` via `cn()`
(`src/lib/cn.ts`) and are styled purely from semantic-token utilities
(`bg-primary`, `border-input`, `ring-ring`…). `src/tokens.ts` mirrors the values
as typed JS (exported at `./tokens`). `src/foundations/*` are Storybook-only.

`theme.css` is the source of truth; `src/tokens.ts` is a hand-maintained JS
mirror that must match it value-for-value — **when you touch a token value,
update both.** One naming quirk the mirror carries: the CSS `--destructive` role
is exported as `signals.danger` in JS.

## Conventions that bite

- **Biome is scoped to JS/TS.** CSS formatting/linting is disabled on purpose —
  `theme.css` is hand-column-aligned; don't let a tool reflow it.
- **Tailwind v4 in Storybook uses PostCSS** (`@tailwindcss/postcss` +
  `postcss.config.mjs`), NOT `@tailwindcss/vite` (open export-compat bug with
  Storybook's builder). `tsup` does not process CSS.
- **Consumers** inherit everything in two lines: `@import "tailwindcss"` then
  `@import "@martinzachariassen/design/styles/index.css"`. That bundle pulls in
  theme + fonts + base and self-declares `@source "../*.js"`, so the components'
  classes emit with no manual `@source`. (The granular `theme.css`/`fonts.css`/
  `base.css` exports still exist; those need the explicit `@source ".../dist"`.)
  Semantic names match shadcn/ui, so `npx shadcn add …` drops in and inherits the
  palette.
- `*.stories.tsx` / `*.test.tsx` colocate under `src/`; they're typechecked and
  linted but never shipped (`files: ["dist"]`). Vitest runs with `globals: true`
  so Testing Library's auto-cleanup registers.
- When adding a token, keep light + dark + every `data-accent` in sync, and honour
  `prefers-reduced-motion` / `forced-colors`.

## Git, CI & releases

- `main` is protected (**enforced for admins**): PRs only, **linear history →
  squash or rebase merge**, required checks `verify` + `dependency-review`. No
  direct pushes to `main`.
- **Conventional Commits** for commits and PR titles.
- CI (`ci.yml`): lint · typecheck · test · build · build-storybook. Plus CodeQL,
  Dependency Review, Dependabot (npm / actions / docker).
- **Releases via Changesets → GitHub Packages** (scope `@martinzachariassen`,
  `.npmrc`), driven by a **version tag** — decoupled from the push-to-`main` CI
  build. Add a changeset, then when ready to ship: `bun run version-packages`
  (applies the bump + CHANGELOG), commit, and push a `v*` tag
  (`git tag vX.Y.Z && git push --follow-tags`). `release.yml` triggers on the
  `v*` tag, builds, and `changeset publish`es.

## Hosting

The Storybook playground deploys to Railway via the `Dockerfile` (Bun install →
Storybook build → `server.mjs` zero-dependency static server binding `$PORT`) and
`railway.json` (healthcheck). Node ≥ 20.16 (Storybook 10).
