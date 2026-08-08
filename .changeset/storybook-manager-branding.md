---
"@martinzachariassen/design": patch
---

Brand the Storybook manager chrome, and fix silently-broken MDX tables.

Both were blocked by bugs that a successful build reported nothing about.

- **The manager is now MLZ-branded** — brand title, paper/ink palette and Space
  Grotesk, every value read from `src/tokens.ts` so the chrome can't drift from
  the system it documents. This was previously abandoned as an unfixable
  Storybook bug; it turned out to be narrower than it looked. A *built* manager
  goes blank only when **two addons and a `manager.ts` both exist** — one addon
  is fine, either order is fine, and `storybook dev` is unaffected.
  `@storybook/addon-a11y` is therefore registered outside the build only. The
  a11y **gate** is untouched: it runs on `axe-playwright`, never the addon, and
  all 161 checks still pass.
- **Markdown tables in `.mdx` pages now render.** Storybook's MDX pipeline ships
  no GFM, so the tables on the Theming page were displaying as literal `|`
  characters with no build warning. `remark-gfm` is now wired through
  `addon-docs`.

Storybook-only; no runtime API change.
