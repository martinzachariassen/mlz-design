---
"@martinzachariassen/design": patch
---

fix(components): put every ink-position colour on the `-deep` rung, and gate it

`StatusDot`, `Toaster`, `FieldError`, `DropdownMenuItem` and the destructive
`Button` painted `text-destructive` — a fill token in a text position. It passed
AA by luck (destructive is the one bold signal, so it lands at 5.00:1 on paper),
but it left `destructive` as the only signal in the set not on the `-deep` rung:
`StatusDot` used `-deep` for success, warning, info and accent, and the base fill
for destructive. All five now use `-deep`, which is the documented rule and
raises the light-mode figure to 5.45:1. Dark mode is unchanged — `-deep` maps
back to the fill there.

Four `BrandMark` glyphs and a Typography label were genuinely below the bar:
`text-accent`/`text-success` on paper is 1.83:1, under even the 3:1 icon
threshold. Those move to `-deep` (5.38–5.49:1). One of them was inside
`EmptyState`'s JSDoc example, so the wrong rung was being taught to consumers.

`Slider`'s thumb moves to `border-accent-deep` for a different reason: the thumb
*is* the control, so its outline is the only thing marking where it sits. On the
filled half of the track an accent border sat on an accent range — 1.00:1, an
invisible edge — and the thumb's paper fill is only 1.83:1 against that same
range, so in light mode neither channel reached the 3:1 of SC 1.4.11. The deep
border now carries it at 3.00:1. Dark mode was never affected: the border is
equally invisible there, but the thumb's dark fill separates from the light
accent range at 8.26:1.

Adds `src/colour-usage.test.ts`, which fails the build if a chromatic fill
appears in a text, icon, ring or underline position anywhere in `src/`. The
existing contrast tests read *tokens* and so could never catch this — the
palette was correct the whole time; the call sites were not.
