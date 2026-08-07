---
"@martinzachariassen/design": patch
---

Extend test coverage, and make the a11y gate audit open components.

Three changes, all to tests and Storybook config — no runtime code touched.

- **Unit tests for nine previously untested components**: `Progress`,
  `Separator`, `Checkbox`, `Switch`, `Input`, `Textarea`, `Alert`, `Avatar` and
  `Card`. 92 → 129 tests. `Progress` and `Separator` were the priority: 0.4.0
  swapped both to Radix internals with nothing standing guard.
- **The a11y gate now sees open components.** `play` functions open the
  dropdown menu, select listbox, dialog and tooltip, and exercise the accordion
  and tabs — and axe is scoped to the preview `body` rather than
  `#storybook-root`, because every overlay portals outside that root. Until now
  the gate had only ever audited *closed* menus and dialogs.
- **Storybook viewports are generated from `tokens.breakpoints`**, so responsive
  checks happen at the widths the components actually switch at.

One rule, `aria-hidden-focus`, is disabled on the two stories that open a
**modal** Radix overlay. Radix marks the rest of the page `aria-hidden` while
one is open and axe flags the still-focusable trigger beneath it; focus is moved
into the overlay, so screen readers behave correctly. Notably the `Dialog` story
does not trip it — the native `<dialog>` element uses the top layer and inerting
instead.
