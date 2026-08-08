---
"@martinzachariassen/design": minor
---

Four new components, one granular Radix dependency each.

- **`Slider`** — single or range. Takes `thumbLabels`, which a range needs: the
  element carrying `role="slider"` is the *thumb*, so an `aria-label` on the
  root never reaches it, and two thumbs with the same name are
  indistinguishable to a screen reader. A single-thumb slider gets its root
  label copied down automatically.
- **`Collapsible`** — one thing that opens and closes. Reach for `Accordion`
  the moment several belong together.
- **`HoverCard`** — a rich preview on hover, with a deliberate 700ms open delay.
  Always an enhancement: it never opens on click or touch.
- **`ScrollArea`** — a bounded scrolling panel with a scrollbar that matches the
  system. Scrolling stays native; only the bar is restyled.

`Link variant="subtle"` is now documented as unsuitable inside running text —
without an underline the link is distinguishable only by colour, which fails
WCAG 1.4.1. Use `default` there. No behaviour change.
