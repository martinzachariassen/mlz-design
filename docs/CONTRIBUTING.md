# Contributing

This is a personal design system, built first for cross-project consistency — but it's public, and issues and PRs are welcome. `main` is protected: PRs only, linear history (squash or rebase merge), required green checks (`verify` + `dependency-review`), enforced for admins too. Use [Conventional Commits](https://www.conventionalcommits.org) for commits and PR titles.

## Development

```bash
bun install
bun run build         # tsup → dist (ESM + d.ts), then copies styles/
bun run typecheck     # tsc --noEmit
bun run test          # Vitest + Testing Library
bun run lint          # Biome (lint:fix / format to write)
bun run storybook     # the playground on :6006 — the fastest way to eyeball a change
```

If you use [mise](https://mise.jdx.dev), `mise install && mise run setup` pins the toolchain and `mise run check` runs lint · typecheck · test in one go; `mise tasks` lists the rest.

Run `bun run lint && bun run typecheck && bun run test && bun run build` before opening a PR. Any PR that touches `src/` **must** refresh the committed `dist/` (`bun run build`) — it's the token-free fallback for `bun add github:...`, and CI fails the `verify` job if it's stale. See [architecture.md](architecture.md) for the token layering and repo layout.

## Testing

There are **two tiers**, and they check different things. Both gate `main`.

**Vitest + Testing Library** (`bun run test`) is the fast tier: jsdom, no browser, run on every commit. Tests colocate as `*.test.tsx` next to their component. They assert behaviour and API — that `Toggle` reports through `aria-pressed`, that `ToggleGroup` passes `variant` down through context, that a controlled component stays controlled. Class assertions are fair game (`expect(item.className).toContain("border-input")`), because the classes *are* the styling contract, but prefer a role query over a class query wherever one exists. Vitest runs with `globals: true` so Testing Library's auto-cleanup registers.

**axe over every story** is the slow tier: a real Chromium, driven by `@storybook/test-runner` against a built Storybook. `.storybook/test-runner.ts` runs WCAG 2.1 A/AA on each story and fails the build on any violation — currently 161 checks. It is scoped to the preview `body` rather than `#storybook-root` on purpose: dialogs, menus, listboxes and tooltips portal to `document.body`, and a root-scoped run would silently skip exactly the markup most worth auditing.

Run it locally — it needs a *built and served* Storybook, not the dev server:

```bash
mise run a11y                     # build → serve → axe, in one task
```

or by hand:

```bash
bun run build:storybook
bunx http-server storybook-static --port 6006 --silent &
bun run test-storybook --url http://127.0.0.1:6006
```

A story tunes or opts out of the gate with the standard `a11y` parameter:

```tsx
// Skip the whole story — use sparingly, and say why in a comment.
parameters: { a11y: { disable: true } }

// Or disable one rule, which is almost always the better answer.
parameters: { a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } } }
```

Prefer the per-rule form. A blanket `disable` hides every future regression in that story too, and the reason it was added is rarely still true a year later.

**What to write for a new component.** A story is not optional — the a11y gate only sees what has a story, so an unstoried component is an unaudited one. Beyond that: a unit test for anything with state, a variant, or a prop that changes markup; a `LightDark` story (see `theme-split.tsx`) for anything whose colours could break in one theme; and an interaction test for anything with a keyboard pattern of its own.

**Every component is covered, but not every component has its own test file.** Five are tested from a sibling, on purpose: `toggle-group` from `toggle.test.tsx` (they share a variant contract), `modal-root` from the `dialog` / `sheet` / `alert-dialog` / `command` tests that exercise it, and `grid-background` / `repo-banner` / `social-card` from `asset-templates.test.tsx`, which groups them because what they share — a locked aspect ratio and a decorative layer — is the thing worth asserting. Adding empty files for those would be coverage theatre.

### The story ladder

Stories appear in source order, so the order *is* the reading order. Follow this shape — `button.stories.tsx` is the reference implementation:

1. **`Playground`** — every prop wired to a control, driven by the meta's `args`. Use **`Default`** instead when the first story is a fixed composition with nothing meaningful to knob (compound components like `Dialog`, `Separator`). The two names are a signal, not a synonym: `Playground` promises working controls.
2. **`Variants`**, then **`Sizes`** — the CVA axes, one story each, all values side by side.
3. **States and cases** — `Disabled`, `WithLabel`, `Collapsed`, `Destructive`… whatever the component actually has.
4. **`LightDark`** — last, always. Wrap in `ThemeSplit` and set `parameters: { layout: "fullscreen" }`.

Every story carries a one-line JSDoc above the export; it becomes the story's description on the docs page.

Four components legitimately have no `LightDark`, and the reason is the same in each case — **skip it only if one of these applies to yours**. `Toaster` portals to `document.body`, so nothing it renders can be contained by a split pane. `ThemeToggle` *is* the theme switcher, and forcing a theme around it contradicts what the story is showing. `RepoBanner` and `SocialCard` are fixed-size export templates where light/dark isn't the axis — `RepoBanner` already ships `Asset` and `AssetDark` for that. `Dialog` and `Sheet` show the pattern for overlays that *can*: render the content component inline instead of opening a real one, since a live modal sits in the top layer and escapes the pane.

### Sidebar status badges

The sidebar draws a badge from a namespaced tag on the meta, rendered by `renderLabel` in `.storybook/manager.tsx`:

```tsx
tags: ["autodocs", "status:new"],
```

`status:new` · `status:experimental` · `status:deprecated`. **Untagged means stable** — that is the common case and must stay free, so don't add a `status:stable`. Badges are drawn on the component node only, never on the stories under it.

`status:new` is the one that needs pruning: **clear it when cutting a minor release**, or everything stays permanently new and the badge stops meaning anything. The other two describe an API contract rather than a date and look after themselves.

## Releasing

Automated with [Changesets](https://github.com/changesets/changesets) → GitHub Packages. There's no manual version bump or tag — you only ever describe changes; `release.yml` does the rest on merge to `main`.

1. **Add a changeset to your feature PR** — one per user-facing change:

   ```bash
   bun run changeset   # describe the change + pick the semver bump; commit the file
   ```

2. **Merge the PR.** `release.yml` sees the pending changeset and opens (or updates) a **"version packages"** PR that applies every accumulated bump, updates each `CHANGELOG`, and consumes the changesets.

3. **Merge the "version packages" PR** when you're ready to ship. That merge runs `bun run release` (build + `changeset publish`), which publishes to GitHub Packages and cuts the matching GitHub Release + tag.

So the whole release surface is two merges: your change, then the version PR — no local tagging, no `publish` from a laptop. Publishing stays on **GitHub Packages**, so consumers keep the `.npmrc` + `read:packages` token from the README quick start. (No npm provenance: GitHub Packages doesn't support npm's OIDC trusted-publishing / Sigstore attestation — that's a `registry.npmjs.org` feature.)

## Deployment (playground)

The Storybook playground deploys to **Cloudflare Workers** (static assets, no server code) at [design.mlz.no](https://design.mlz.no). `wrangler.jsonc` configures the assets directory (`storybook-static`) and the custom domain route; `.github/workflows/deploy.yml` runs `bun run build:storybook` then `wrangler deploy` on every push to `main`, authenticated with the `CLOUDFLARE_API_TOKEN` repo secret. No manual steps — push to `main` and it ships.

## Security

Security and supply-chain integrity are gated in CI, with results in the repo's Security tab: **CodeQL** on every PR, **Dependency Review** + **Dependabot** (npm / actions), SHA-pinned Actions with **`step-security/harden-runner`** and **`zizmor`**, and **Storybook a11y** (axe, WCAG 2.1 A/AA) failing the build on any violation. Report vulnerabilities per [SECURITY.md](SECURITY.md).
