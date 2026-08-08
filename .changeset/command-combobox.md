---
"@martinzachariassen/design": minor
---

Add **`Command`** (+ `CommandDialog`) and **`Combobox`**, backed by `cmdk`.

`CommandDialog` runs on this system's **native `<dialog>`**, not on cmdk's own
`Command.Dialog` — that one wraps Radix Dialog, which would put two modal
implementations with different focus-trap and top-layer behaviour in one
package. It shares the engine `Dialog`, `Sheet` and `AlertDialog` already use.

`Combobox` is `Command` inside a `Popover`, and joins a surrounding `Field`
automatically. Re-picking the current value clears it — a combobox has no
"none" row, so that is the only route back to empty.

Two accessibility fixes to cmdk's markup, both of which a screen reader would
otherwise notice. Its internal `[cmdk-list-sizer]` wrapper carries no role and
was the listbox's only child, which severs the groups and options from it
entirely; it is now presentational. And its separator defaults to
`role="separator"`, which a `listbox` may not own — that is presentational too,
since the group headings already carry the structure.

`cmdk` is the second non-Radix runtime dependency after `sonner`. It adds
exactly one package to a consumer's tree that wasn't already there
(`@radix-ui/react-dialog`, 120 KB); everything else it needs, the existing Radix
components already pull in.
