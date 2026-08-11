---
"@martinzachariassen/design": minor
---

API consistency pass, from a consumer's perspective:

- **`DialogTrigger` / `SheetTrigger` / `AlertDialogTrigger`**: the dialog family
  finally opens itself — no more hand-rolled `useState` per modal. The native
  `<dialog>` element moved from the root into `*Content` to make room (existing
  controlled/uncontrolled usage is unchanged), and dialog width is now
  overridable via `className` on the content (`max-w-2xl` works).
- **shadcn vocabulary compiles**: `Button` gains `outline` (the MLZ default
  look) and `secondary`; `Badge` gains `secondary` (alias of `muted`). Pasted
  shadcn snippets and LLM-written call sites render the intended look.
- **Size axis on field controls**: `size="sm"` (h-9) on `Input`, `SelectTrigger`
  and `Combobox`, a `sm` scale on `Textarea`, and `lg` on `Toggle` — form
  controls finally line up with small/large buttons.
- **`Input` slots**: `prefix`/`suffix` render inside the frame, so a search
  icon or unit no longer means rebuilding the border and focus ring by hand.
- **`Combobox`**: controlled/uncontrolled `open`, a `name` prop (hidden input,
  so it submits with a `<form>`), and an `id` for external labelling.
- **`ThemeProvider enableSystem={false}`** now reaches `ThemeToggle`, which
  hides the System option automatically. `InfoTip` gains `defaultOpen`.
- **`Breadcrumb`'s `separator` prop actually works** (it used to leak to the
  DOM) and feeds every `BreadcrumbSeparator` via context.
- **Table sorting affordance**: `TableHead sort` sets `aria-sort`, and the new
  `TableSortButton` makes the header operable — ordering logic stays in the app.
- **Export hygiene**: `progressIndicatorVariants` and `avatarFallbackVariants`
  replace the unnamespaced `indicatorVariants`/`fallbackVariants` (old names
  remain as deprecated aliases); `sheetVariants` and `paginationLinkVariants`
  are now exported; `SkeletonProps`, `BreadcrumbProps`, `TableHeadProps` and
  the trigger prop types ship; `Text` accepts `size="default"`.
