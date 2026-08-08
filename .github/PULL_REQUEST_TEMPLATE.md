<!--
PR title must be a Conventional Commit — it becomes the squash-merge subject.
  <type>(<scope>): <subject>     imperative, <= 72 chars
  feat · fix · docs · refactor · test · chore · perf · build · ci · style
-->

## What

<!-- One or two sentences. What changes, and what it looks like from the outside. -->

## Why

<!-- The reason, not the diff. Link the issue if there is one. -->

## Checklist

- [ ] `bun run lint` · `bun run typecheck` · `bun run test` pass
- [ ] Touched `src/`? Ran `bun run build` and **committed `dist/`** — it is the
      fallback for `bun add github:martinzachariassen/mlz-design`, and CI fails
      the `verify` job if it is stale
- [ ] Added a changeset (`bun run changeset`) — or this genuinely needs no
      release note (CI-only, docs-only)
- [ ] New or changed component? It has a story **and** a test, its prose lives
      in the component's JSDoc (not `parameters.docs.description.component`),
      and its `meta` sets `tags` explicitly
- [ ] Touched a token? Light, dark and all five `data-accent` families stay in
      sync, and `src/tokens.ts` still mirrors `src/styles/theme.css`
      value-for-value
- [ ] Ran the a11y gate if the change is visual or interactive
      (`mise run a11y`, or `bun run build:storybook` → serve → `bun run test-storybook`)
