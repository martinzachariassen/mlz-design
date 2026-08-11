---
"@martinzachariassen/design": minor
---

Two new component families, closing the audit's top gaps:

- **NavigationMenu** (`@radix-ui/react-navigation-menu`, granular per the
  dependency policy): primary app-shell navigation with hover/focus panels and
  the full Radix keyboard pattern, styled from semantic tokens.
  `navigationMenuTriggerStyle()` keeps bare links flush with real triggers.
  The application-shell pattern story now uses it instead of a hand-rolled nav.
- **Calendar** (`react-day-picker`, side-effect-free JS so it tree-shakes when
  unused) restyled entirely from tokens — single/multiple/range modes, both
  themes, all five accent families. **DatePicker** wraps it in a `Popover`
  behind a `Select`-shaped trigger: controlled/uncontrolled value and open
  state, `Field` integration, `size="sm"`, and a `name` prop that posts
  `yyyy-mm-dd` like `<input type="date">` would.
