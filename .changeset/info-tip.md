---
"@martinzachariassen/design": minor
---

feat: add `InfoTip` — an inline glossary popover

A small icon button that sits in the flow of text and, on click, opens a compact
popover explaining a term — built for glossary-style "what / why" help. Radix-free:
the panel renders in a portal (so no ancestor `overflow: hidden` can clip it) as a
non-modal `role="dialog"`, positions itself with `getBoundingClientRect` (flipping
above the trigger when there's no room below and clamping to the viewport), and
light-dismisses on outside-click, Esc, or a second click on the trigger. Focus moves
into the panel on open and returns to the trigger on close. The trigger sizes itself
in `em`, so it tracks the font-size of the text it's dropped into. Supports both
controlled (`open`/`onOpenChange`) and uncontrolled use.
