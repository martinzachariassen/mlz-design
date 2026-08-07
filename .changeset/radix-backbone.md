---
"@martinzachariassen/design": minor
---

Adopt Radix as the behaviour backbone, and retire the Templates stories.

Interaction behaviour now comes from Radix primitives — the same backbone
shadcn/ui uses — while all styling stays MLZ. Public APIs are unchanged.

- **`Tabs`, `Accordion`, `InfoTip`** rebuilt on Radix, removing ~700 lines of
  hand-rolled WAI-ARIA code and two real defects: both `Tabs` and `Accordion`
  located sibling elements with a *global* `document.querySelector`, so two
  instances sharing a `value` on one page cross-talked. `Tabs` also gains
  Home/End and now respects `orientation` (vertical arrows no longer drive a
  horizontal tablist). The accordion keeps its fluid `grid-template-rows`
  open/close animation.
- **`Avatar`, `Progress`, `Separator`, `Label`** adopt the matching primitives.
  `Avatar` gains Radix's image loading states and a `delayMs` on the fallback;
  `Label` no longer selects its own text on double-click.
- **`asChild`** (via `@radix-ui/react-slot`) added to `Button`, `Badge` and
  `Card`, and `DialogClose` now uses `Slot` instead of `cloneElement` — so
  `<Button asChild><a href="…">…</a></Button>` works.
- **`Dialog`** stays on the native `<dialog>` element, where focus-trapping, Esc,
  inerting and the top layer are free. Two fixes: `DialogTitle` and
  `DialogDescription` are now wired to the dialog via `aria-labelledby` /
  `aria-describedby` (they previously named nothing), and `defaultOpen` allows
  uncontrolled use. A backdrop press that starts inside the dialog no longer
  dismisses it, so releasing a text selection is safe.
- `Checkbox` and `Switch` deliberately stay native, zero-JS inputs; no icon
  library was added.
- **Removed** the `Templates/Portfolio` and `Templates/Blog` Storybook stories.
  They were never exported from the package.
