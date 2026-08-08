---
"@martinzachariassen/design": patch
---

Bump dev dependencies, and stop hardcoding a version in the docs examples.

- `@biomejs/biome` 2.5.5 → 2.5.7 (plus the `biome migrate` schema bump),
  `vite` 8.1.5 → 8.2.1, `@types/react`, `@types/react-dom`,
  `@vitejs/plugin-react`, `concurrently`. All patch/minor.
- **TypeScript stays at 6.0.3.** 7.0.2 is available but a major compiler bump
  deserves its own PR rather than riding along with routine maintenance.
- `README.md` and the Storybook **Installation** page showed
  `<Badge variant="accent">v0.3.0</Badge>` in their example snippet, which goes
  stale on the next release — and would have, since several releases are pending.
  Now `Production`, which suits the surrounding Deploy / Ship it example better
  anyway.

No runtime dependency or API changes.
