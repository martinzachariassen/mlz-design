---
"@martinzachariassen/design": minor
---

Three components and a layout for pages built from rules rather than boxes.

- **`Readout` / `ReadoutCell`** — the band of headline readings across the top of
  a page. A real `<dl>` of equal, hairline-divided cells, ruled top and bottom,
  each an eyebrow label over a one-line value with an optional `StatusDot`. It
  never wraps: below 720px the cells become a snap-scroller rather than stacking,
  because a band that reflows into six rows stops being a glance.
- **`FindingList` / `FindingItem`** — a run of checks and their results, each a
  dot, a finding, and a sentence explaining it, hanging off one rule. It fills
  the gap between `Callout` (one thing, and you have to act on it — wrong
  repeated eight times) and `StatusChip` (short enough to need no explanation).
- **`SectionHeading`** — a section label in the tracked-out mono voice whose
  hairline runs from the end of the words to the edge of the column, with
  optional `actions` past the rule. This is what makes a long page legible
  without boxing every section.
- **`DataList layout="ledger"`** — the grid layout plus the ruled margin: a rule
  down the left edge of the list and another between label and value, with
  lighter hairlines between rows. Additive; `justify` and `grid` are unchanged.
