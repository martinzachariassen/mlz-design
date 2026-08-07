---
"@martinzachariassen/design": minor
---

feat: self-hosted fonts + Accordion, StatusDot, DataList, Callout and Text

Adds the components and font-delivery a strict-CSP, privacy-first consumer
(ip-speil) needs to be built entirely from the design system — all on the
semantic token layer, so nothing app-specific leaks into the system.

- **Self-hosted fonts** — ships Space Mono (400/700) and Space Grotesk
  (400/500/600/700) as bundled WOFF2 under `styles/fonts/`, plus two new CSS
  entry points:
  - `styles/fonts-self-hosted.css` — `@font-face` with relative urls, so a
    consumer's bundler fingerprints and serves them same-origin (no Google Fonts
    CDN, no visitor-IP leak). Works under `font-src 'self'` / `style-src 'self'`.
  - `styles/index-self-hosted.css` — the CSP-safe one-import bundle (theme +
    self-hosted fonts + base + `@source`). The Google-Fonts `fonts.css` /
    `index.css` remain for quick-start consumers.
- **`<Accordion />`** (+ `AccordionItem`, `AccordionTrigger`, `AccordionContent`)
  — a Radix-free, context-driven disclosure with the WAI-ARIA accordion keyboard
  pattern (Up/Down/Home/End) and a fluid `grid-template-rows: 0fr→1fr` open/close
  animation. `type="single" | "multiple"`, controlled or uncontrolled,
  `collapsible`.
- **`<StatusDot />`** — a semantic status dot (success/warning/destructive/info/
  accent/muted) with an optional pulsing ring; `bg-current` so the ring tracks the
  colour.
- **`<DataList />` / `<DataRow />`** — a definition list for key/value facts. The
  default `layout="justify"` gives hairline dashed row rules with a right-aligned,
  optionally `mono` value; `layout="grid"` (cascaded from the list, overridable
  per row) switches to a fixed eyebrow-label column plus a left-aligned value that
  collapses to one column below 560px — a scannable field list for longer values.
  The label column width is set via the `--mlz-data-label` CSS var (default
  `8rem`).
- **`<Callout />`** — a compact, dot-led inline note (lighter than `Alert`) for
  dense lists of findings/checks.
- **`<Text />`** — an inline typography primitive (body/lead/muted/mono/eyebrow)
  for the small everyday type roles that don't warrant a full `Prose` block.
- Stories + tests for every new component.
