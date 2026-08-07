# CLAUDE.md — @martinzachariassen/design

MLZ Design: Martin Zachariassen's design system and **canonical source of truth**
for colour, type, style and motion — shipped as an installable **React + Tailwind
v4** package that every one of my other projects inherits, so nothing drifts. It's
a public repo, but built first for
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
bun run test-storybook   # axe over every story (needs a built + served Storybook)
bun run changeset        # start a release (see below)
```

`mise.toml` mirrors these as tasks (`mise run check` = lint · typecheck · test).
Docs live in `docs/` — [architecture](docs/architecture.md),
[design system](docs/design-system.md), [contributing](docs/CONTRIBUTING.md),
[security](docs/SECURITY.md). Only `README.md`, `CHANGELOG.md` (Changesets writes
it next to `package.json`) and this file stay at the root.

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

Components (`src/components/<group>/*.tsx`, grouped by function — `forms`,
`data-display`, `feedback`, `layout`, `overlay`, `brand`) use CVA +
`tailwind-merge` via `cn()`
(`src/lib/cn.ts`) and are styled purely from semantic-token utilities
(`bg-primary`, `border-input`, `ring-ring`…). `src/tokens.ts` mirrors the values
as typed JS (exported at `./tokens`). `src/foundations/*` are Storybook-only.

`theme.css` is the source of truth; `src/tokens.ts` is a hand-maintained JS
mirror that must match it value-for-value — **when you touch a token value,
update both.** One naming quirk the mirror carries: the CSS `--destructive` role
is exported as `signals.danger` in JS.

## Behaviour: Radix backbone, MLZ styling

Interaction behaviour comes from **Radix primitives**; we only style them. Same
backbone as shadcn/ui, so anything `npx shadcn add …` drops in behaves like ours.
Three tiers — know which one you're touching before adding a dependency:

- **Radix** — `Tabs`, `Accordion`, `InfoTip` (popover), `Avatar`, `Progress`,
  `Separator`, `Label`, plus `Slot` behind `asChild`.
- **Platform** — do *not* migrate these; Radix would add JS for what the browser
  already does. `Dialog` is the native `<dialog>` + `showModal()` (focus-trap,
  Esc, inerting and top layer for free); `Checkbox`/`Switch` are native inputs
  styled with `peer-checked:`, zero JS. `Button`/`Input`/`Textarea` are plain
  elements — **Radix has no Button primitive**.
- **Presentational** — no behaviour at all, nothing to adopt.

Radix is depended on **granularly** (`@radix-ui/react-tabs`, …), never via the
unified `radix-ui` meta-package: this ships as a library, and the meta-package
would force every consumer to install ~40 primitives to use one.

**No icon library, deliberately.** The few glyphs the components need to draw
themselves live in `src/lib/icons.tsx` — internal, **never exported**, kept
minimal. Everything else is inline SVG in the component that needs it.
Consumers install `lucide-react` themselves. shadcn's generated components
import from `lucide-react`, so strip those when porting one or the CLI adds the
dependency by the back door: `rg -n 'from "lucide-react"' src/` must stay empty.
`asChild` is available on `Button`, `Badge`, `Card` and `DialogClose`.

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
  so Testing Library's auto-cleanup registers. `tsconfig.json` also covers
  `.storybook/` and the root `*.config.ts`, so those are typechecked too.
- **Autodocs is on globally** (`tags: ["autodocs"]` in `.storybook/preview.tsx`).
  **Every meta sets `tags` explicitly** — never rely on the global default.
  Meta has `component` → `["autodocs"]`; meta has none → `["!autodocs"]`.
  A story file with no `component` in its meta — foundations or a
  multi-component composition — **must** opt out, or it adds an empty docs page
  to the sidebar. Setting `component` on a meta makes Storybook infer required
  `args`: for a render-only compound story that still deserves a props table
  (see `dialog.stories.tsx`), name the `component`, add `subcomponents`, and
  satisfy the inference with `args: { children: null }` plus an `argTypes` entry
  disabling that row.
- **Component prose lives in the component's JSDoc**, not in
  `parameters.docs.description.component` — docgen lifts it into the docs page
  *and* the consumer's editor tooltip, so there's one source of truth. Setting
  the parameter **overrides** the JSDoc rather than adding to it, which silently
  drops it. Reserve the parameter for metas that document several components at
  once (`layout.stories.tsx`). Every component's JSDoc should say what it is and
  **when to reach for a sibling instead**.
- Storybook's props tables come from `react-docgen-typescript` with a `propFilter`
  that drops anything declared in `node_modules` — that's what keeps inherited
  React HTML attributes out of the table.
- When adding a token, keep light + dark + every `data-accent` in sync, and honour
  `prefers-reduced-motion` / `forced-colors`.

## Git, CI & releases

- `main` is protected (**enforced for admins**): PRs only, **linear history →
  squash or rebase merge**, required checks `verify` + `dependency-review`. No
  direct pushes to `main`.
- **Conventional Commits** for commits and PR titles.
- CI (`ci.yml`): the `verify` job runs lint · typecheck · test · build ·
  build-storybook, then **fails if committed `dist/` is stale**; it uploads
  `storybook-static` as an artifact that the `Storybook a11y` job (axe, WCAG 2.1
  A/AA via `test-runner.ts`) consumes, so Storybook is built once per run. Plus
  CodeQL, Dependency Review, Scorecard, zizmor, Dependabot (npm / actions).
- **Releases via Changesets → GitHub Packages** (scope `@martinzachariassen`,
  `.npmrc`), **fully automated** by the Changesets action — no manual version
  bump, no `v*` tag, no local `publish`. `release.yml` runs on **push to `main`**;
  the action decides what to do from pending changesets:
  1. Add a changeset to your feature PR (`bun run changeset` — describe the change,
     pick the bump).
  2. Merge the PR. `release.yml` sees the pending changeset and opens/updates a
     **"chore(release): version packages"** PR (`bun run version-packages` applies
     every bump + CHANGELOG and consumes the changesets).
  3. Merge that version PR. `release.yml` now finds no pending changesets and runs
     the publish path (`bun run release` = `bun run build && changeset publish`) —
     publishes to GitHub Packages and cuts the GitHub Release + tag. (No npm
     provenance: GitHub Packages doesn't support npm's OIDC trusted-publishing /
     Sigstore attestation — that's a `registry.npmjs.org` feature.)
  Committed `dist/` is the token-free fallback for
  `bun add github:martinzachariassen/mlz-design`; refresh it (`bun run build`) in
  any PR touching `src/`.

## Hosting

The Storybook playground is hosted **only on Cloudflare Workers** (static
assets, no server code) at **design.mlz.no**. `wrangler.jsonc` points
`assets.directory` at `storybook-static`, disables HTML clean-URL redirects
(`html_handling: "none"` — Storybook's manager requests `iframe.html` by exact
filename, so the default rewrite breaks it), sets `not_found_handling:
"single-page-application"` (serves `index.html` for any unmatched path,
including `/`, since `html_handling: "none"` also disables Cloudflare's
automatic `/` → `/index.html` mapping), and pins the custom domain via
`routes`. `.github/workflows/deploy.yml` runs `bun run build:storybook` then
`wrangler deploy` on every push to `main`, authenticated with the
`CLOUDFLARE_API_TOKEN` repo secret (needs Workers Scripts:Edit). Account:
Cloudflare "MLZ" (`1524bafd76d520ef1ce36c47a3f3bce1`).

Previously also deployed to Railway (`Dockerfile` + `railway.json` +
`server.mjs`); that path was retired once Cloudflare took over — those files
are gone, don't re-add them without a reason.
