---
"@martinzachariassen/design": minor
---

Add `Breadcrumb`, `Pagination` and `Sheet`.

The site-and-blog set. **No new dependency** — `Breadcrumb` and `Pagination` are
plain markup, and `Sheet` reuses the platform.

- **`Breadcrumb`** (+ `List`/`Item`/`Link`/`Page`/`Separator`/`Ellipsis`) — a
  `<nav>` around an `<ol>`, because the order *is* the meaning. The current page
  is marked with `aria-current="page"`, never linked to itself. `asChild` on the
  links hands off to a router.
- **`Pagination`** (+ `Content`/`Item`/`Link`/`Previous`/`Next`/`Ellipsis`) —
  every page is a real URL, which is the whole reason to prefer it over "load
  more": infinite scroll has no address for page 4. The current page stays a
  link; `aria-current` is what distinguishes it.
- **`Sheet`** (+ `Content`/`Header`/`Title`/`Description`/`Footer`/`Close`) — a
  panel sliding in from any of the four edges, for mobile navigation or a filter
  drawer.

`Sheet` is built on the **native `<dialog>` element**, the same as `Dialog`,
rather than adding `@radix-ui/react-dialog`. That keeps one modal implementation
instead of two, and focus-trapping, Esc, background inerting and the top layer
all come from the platform.

Its slide-in is **progressive enhancement**: it needs `@starting-style` and
`transition-behavior: allow-discrete`, both current-browser-only. Where they're
missing the sheet simply appears in place, fully usable — and
`prefers-reduced-motion` skips the movement too.
