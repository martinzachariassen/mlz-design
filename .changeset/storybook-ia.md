---
"@martinzachariassen/design": patch
---

Restructure Storybook and deepen the component docs.

No runtime API changes — the only `src/` edits are JSDoc, which now also reaches
consumers' editor tooltips.

- **New information architecture:** `Get started` (Introduction, Installation,
  Theming) · `Foundations` · `Brand` · `Components` · `Patterns`. `Brand` is
  promoted to its own top-level section, and `src/foundations/` stops being a
  junk drawer — `RepoBanner` and `SocialCard` stories now colocate with their
  source in `src/components/brand/`.
- **New Installation and Theming pages** covering the GitHub Packages registry
  setup, the two-line CSS import, `ThemeProvider` / `useTheme`, and
  `themeInitScript()` for avoiding the theme flash.
- **`storySort` now enumerates every level.** It previously listed four of ten
  `Foundations` children, so the rest fell through to definition order.
- **Component docs gained "when to reach for a sibling instead"** — Tabs↔
  Accordion, Checkbox↔Switch, Badge↔StatusDot, Dialog↔InfoTip,
  Skeleton↔Spinner↔Progress, DataList↔`<table>`, and button-vs-link.
- **`subcomponents`** on the compound APIs (Card, Dialog, Tabs, Accordion,
  Avatar, Alert, DataList, Container) so each part gets its own props table.
- Every story meta now sets `tags` explicitly instead of relying on the global
  default, and the Dialog docs page no longer carries a hand-copied description
  that had already gone stale.
- Added a Storybook favicon built from the Block-M mark.

Manager chrome theming is **not** included: on Storybook 10.5.7 the mere
presence of a `.storybook/manager.ts` crashes the manager, even when empty. See
`docs/architecture.md` for the bisect and what to retry after an upgrade.
