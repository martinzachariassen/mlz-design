---
"@martinzachariassen/design": minor
---

Make the package consumable everywhere it's supposed to work:

- **Next.js App Router / RSC**: `dist/index.js` and `dist/toaster.js` now lead
  with `"use client"`, so `ThemeProvider`, `Dialog`, `Combobox` and every other
  client component can be imported from a server component tree without
  crashing. The `./tokens` entry stays directive-free — pure data, safe in
  server components.
- **CJS consumers**: every JS entry gains a `"default"` export condition, so
  `require("@martinzachariassen/design")` resolves (Node ≥ 22.12 `require(esm)`)
  instead of throwing `ERR_PACKAGE_PATH_NOT_EXPORTED`.
- **`dark:` utilities follow the theme switch**: `theme.css` now declares
  `@custom-variant dark`, binding Tailwind's `dark:` variant to the `.dark`
  class / `data-theme` attribute that `ThemeProvider` writes — previously a
  consumer's own `dark:*` classes followed the OS while the components followed
  the toggle.
- **SSR hydration**: `ThemeProvider` no longer reads `localStorage` during
  render; persisted choices are applied in a pre-paint effect, so server HTML
  and the client's first render always agree (pair with `themeInitScript()` as
  before — no flash).
- **Peer dependencies now tell the truth**: `tailwindcss >= 4` declared
  (optional, for tokens-only consumers), `react`/`react-dom` narrowed to `>= 19`
  (18 was claimed but never built or tested), `@types/react` optional peer.
- Releases run lint · typecheck · test · build · package-lint before
  `changeset publish`; CI gained `publint` + `@arethetypeswrong/cli` and a
  tarball-install smoke test covering every entry from ESM and CJS.
- Sourcemaps are no longer emitted (they were git-ignored, so the
  `bun add github:` install path shipped dangling `sourceMappingURL`s).
