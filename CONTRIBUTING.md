# Contributing

This is a personal design system, built first for cross-project consistency — but it's public, and issues and PRs are welcome. `main` is protected: PRs only, linear history (squash or rebase merge), required green checks (`verify` + `dependency-review`), enforced for admins too. Use [Conventional Commits](https://www.conventionalcommits.org) for commits and PR titles.

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
bun run preview       # static token reference page → http://localhost:4321/preview/
```

`bun run preview` serves the repo over `http://localhost:4321`; open [`/preview/`](http://localhost:4321/preview/) for a dependency-free HTML page that reads `src/styles/*.css` directly and consumes the tokens exactly as a real app would — a quick way to eyeball the palette without the full Storybook.

Run `bun run lint && bun run typecheck && bun run test && bun run build` before opening a PR. Any PR that touches `src/` should refresh the committed `dist/` (`bun run build`) — it's the token-free fallback for `bun add github:...`. See [ARCHITECTURE.md](ARCHITECTURE.md) for the token layering and repo layout.

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

The Storybook playground deploys to **Railway** from the `Dockerfile` (Bun install → Storybook build → a tiny zero-dependency Node static server binding `$PORT` on `0.0.0.0`). `railway.json` selects the Dockerfile builder, runs `node server.mjs`, and health-checks `/` (restart on failure). Node ≥ 20.16 (Storybook 10). Point a Railway service at this repo and it builds and serves the playground with no extra config.

| Variable | Default | Effect                                                        |
| -------- | ------- | ------------------------------------------------------------- |
| `PORT`   | `8080`  | Port the playground static server binds (Railway injects it). |

## Security

Security and supply-chain integrity are gated in CI, with results in the repo's Security tab: **CodeQL** on every PR, **Dependency Review** + **Dependabot** (npm / actions / docker), SHA-pinned Actions with **`step-security/harden-runner`** and **`zizmor`**, and **Storybook a11y** (axe, WCAG 2.1 A/AA) failing the build on any violation. Report vulnerabilities per [SECURITY.md](SECURITY.md).
