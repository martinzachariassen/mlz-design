---
"@martinzachariassen/design": minor
---

Add `Table`.

`Table` (+ `Header`/`Body`/`Footer`/`Row`/`Head`/`Cell`/`Caption`) — the same
fields across many rows, in the mlz voice: mono column headers in the eyebrow
style matching what `Prose` already gives raw `<table>` markup, hairline row
rules, and a row tint on hover. **No new dependency** — this is styling on real
table elements, not a behavioural primitive.

It closes a gap the 0.4.x docs opened: `DataList`'s guidance told readers to
"reach for a `<table>`" that the system didn't style. That line now names
`Table`, and `Table` returns the favour — use it when fields repeat across rows,
use `DataList` for the facts about one thing.

Two accessibility details worth knowing:

- It wraps itself in a **focusable** horizontal scroll container, so a wide
  table scrolls inside its own box and a keyboard user can reach the far
  columns. Deliberately *not* a `role="region"` landmark, since an unnamed
  landmark is worse than none.
- `TableHead` defaults to `scope="col"`; pass `scope="row"` to make the first
  column row headers.
