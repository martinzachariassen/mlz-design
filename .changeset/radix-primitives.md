---
"@martinzachariassen/design": minor
---

Add `Tooltip`, `DropdownMenu`, `Select` and `RadioGroup`.

The four primitives the system was missing, all on the Radix backbone adopted in
0.4.0 and styled from semantic tokens only — so they re-theme with the
`class="dark"` / `data-accent` switches like everything else.

- **`Tooltip`** (+ `Provider`/`Trigger`/`Content`) — a short hover/focus hint in
  inverted chrome. It attaches as the trigger's **description**
  (`aria-describedby`), not its name, so an icon-only button still needs its own
  `aria-label`.
- **`DropdownMenu`** (+ `Trigger`/`Content`/`Item`/`CheckboxItem`/`RadioItem`/
  `Label`/`Separator`/`Shortcut`/`Group`/`Sub*`) — a menu of actions, with
  `variant="destructive"`, submenus, type-ahead and full keyboard support.
- **`Select`** (+ `Trigger`/`Value`/`Content`/`Item`/`Label`/`Separator`/`Group`)
  — one value from many, wearing `Input`'s border, height and focus ring. It's a
  custom listbox rather than a native `<select>`: pass `name` inside a `<form>`
  to get a hidden native control that submits.
- **`RadioGroup`** (+ `Item`) — two to five exclusive choices, sized to match
  `Checkbox`. The group is one tab stop with the arrows moving inside it, per the
  WAI-ARIA pattern.

Each component's JSDoc says when to reach for a sibling instead — `Select` vs
`RadioGroup` vs `DropdownMenu`, and `Tooltip` vs `InfoTip` vs `Dialog`.

No icon library was added. The few glyphs these need live in `src/lib/icons.tsx`,
which is internal and deliberately not exported; consumers still bring their own.
