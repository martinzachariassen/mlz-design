# Design system

The heart of the package: a three-layer token system, runtime theming, and a component set that reads only semantic tokens — so everything re-themes together. Browse it all live in [Storybook](https://design.mlz.no).

See [architecture.md](architecture.md) for the token layering and repo layout.

## Theming at runtime

Swap by attribute on `<html>` — no rebuild:

| Attribute            | Effect                                                   |
| -------------------- | -------------------------------------------------------- |
| `class="dark"`       | Ink-surface dark mode (`data-theme="dark"` also works)   |
| `data-accent="rust"` | Accent + ring + glitch → another family                  |

Accent families: `cyan` (default), `blue`, `green`, `rust`, `ink`. Set them on the whole page or on any subtree — a local `<div class="dark">` becomes an inverted island, and `data-accent` re-tints just that branch.

## Making it your own

The point of the system is consistency *with room to adapt*. A consuming app never edits the brand primitives — it re-maps the **semantic layer** to taste, and every component follows:

```css
/* your app's stylesheet, after the MLZ import */
:root {
  --accent: oklch(0.70 0.15 300);   /* a different house accent for this app  */
  --radius: 0.5rem;                  /* softer corners than the sharp default  */
}
```

Because names match **shadcn/ui**, `npx shadcn@latest add <component>` also drops straight in and inherits this palette with no extra wiring.

## Components

Every component reads only semantic tokens, so all of them re-theme with the `class="dark"` / `data-accent` switches for free.

### Forms & actions

| Component  | Notes                                                |
| ---------- | ---------------------------------------------------- |
| `Button`   | `default` · `solid` · `accent` · `ghost` · `sketch` · `destructive` · `link`; sizes `sm`/`default`/`lg`/`icon`. The signature ghost that lifts on hover with an offset accent shadow. `asChild` renders a link (or anything else) with the button's styling. |
| `Field` (+ `Label`/`Description`/`Error`) | a labelled control with its description and error message, wired together — one generated id becomes the control's `id`, the label's `htmlFor` and the `aria-describedby` target, and only the parts actually rendered are advertised. `Input` and `Textarea` join automatically |
| `Input` · `Textarea` | accent focus ring, technical mono field         |
| `Label`    | mono, uppercase field label with `peer-disabled` states |
| `Checkbox` · `Switch` | accessible native controls with styled indicators |
| `Slider` | a value picked by dragging — pass an array of two or more for a range. Radix owns arrows / PageUp-Down / Home-End, and each thumb is its own tab stop. Pair it with a number field: a slider alone makes an exact value slow to reach |
| `Toggle` · `ToggleGroup` (+ `Item`) | a button that stays pressed (`aria-pressed`); the group is a segmented control (`single`) or a filter bar (`multiple`) |
| `CopyButton` | a `Button` that puts a string on the clipboard and says so — the label swaps to a check plus "Copied" and returns on its own. A refused copy leaves the label alone rather than claiming success. `useCopyToClipboard` is the same behaviour without the button |
| `RadioGroup` (+ `Item`) | two to five exclusive choices, all visible; one tab stop, arrows move within it |
| `Combobox` | a `Select` you can type into — one value from a list long enough that scrolling it is a hunt (~15 options up). `Command` inside a `Popover`; joins a `Field` automatically. Below that line, `Select` costs one click instead of a click plus recall |
| `Select` (+ `Trigger`/`Value`/`Content`/`Item`/`Label`/`Separator`/`Group`) | one value from many (~6+ options); grouped, collision-aware listbox. Pass `name` inside a `<form>` for a native submit value |

### Surfaces & data

| Component  | Notes                                                |
| ---------- | ---------------------------------------------------- |
| `Card` (+ `Header`/`Title`/`Description`/`Action`/`Content`/`Footer`) | `default` · `elevated` · `interactive` (hover-lift) · `accent` · `ghost` |
| `Badge`    | `default` · `accent` · `outline` · `muted` · `destructive` |
| `Alert` (+ `Title`/`Description`) | `default` · `info` · `success` · `warning` · `destructive` signal panels |
| `Callout`  | compact, dot-led inline note (lighter than `Alert`) for dense lists of findings/checks; semantic `tone` |
| `StatusDot` | semantic status dot (`success`/`warning`/`destructive`/`info`/`accent`/`muted`) with an optional pulsing ring |
| `StatusChip` | one live finding as a dot-led pill on a `*-subtle` wash, in sentence case and the reading face — a row of them is a status stripe. `Badge` labels what something *is*; a chip reports how it *is right now* |
| `Avatar` (+ `Image`/`Fallback`/`Group`) | initials-first; `xs`–`xl`, circle/square, presence `status`, overlap group with `+N` |
| `ProjectCard` | portfolio card — on-brand cover, tags, whole-card link, `featured` horizontal layout |
| `Dialog` (+ `Content`/`Header`/`Title`/`Description`/`Footer`/`Close`) | modal on the native `<dialog>` — focus-trap, Esc, no dependency |
| `AlertDialog` (+ `Content`/`Header`/`Title`/`Description`/`Footer`/`Cancel`/`Action`) | a confirmation before something irreversible. `role="alertdialog"`, no backdrop dismissal and no ✕ — the two ways out are both in the footer, and Cancel takes focus. Reach for `Dialog` for anything reversible |
| `Sheet` (+ `Content`/`Header`/`Title`/`Description`/`Footer`/`Close`) | a panel sliding in from any edge — mobile nav, filter drawer. Native `<dialog>` like `Dialog`, so one modal implementation, not two |
| `Popover` (+ `Trigger`/`Content`/`Anchor`/`Close`) | a non-modal panel anchored to its trigger — filter menus, small forms. Portals out, collision-aware, Esc-dismissing, and unlike `Dialog` it never traps focus or inerts the page |
| `InfoTip`  | accessible inline help popover (glossary/hints) — the same primitive with a fixed inline trigger and a narrower API |
| `HoverCard` (+ `Trigger`/`Content`) | a rich preview on hover — a user card behind an @mention. Opens on hover and focus but never on click or touch, so it is always an enhancement: nothing inside may be the only route to that information |
| `Tooltip` (+ `Provider`/`Trigger`/`Content`) | short hover/focus hint. Attaches as the trigger's *description*, so an icon button still needs its own `aria-label` |
| `Command` (+ `Input`/`List`/`Empty`/`Group`/`Item`/`Separator`/`Shortcut`/`Dialog`) | a filterable command list, and the ⌘K palette. Backed by `cmdk`; `CommandDialog` runs on this system's native `<dialog>` rather than cmdk's Radix-backed one, so there is one modal implementation, not two |
| `DropdownMenu` (+ `Trigger`/`Content`/`Item`/`CheckboxItem`/`RadioItem`/`Label`/`Separator`/`Shortcut`/`Sub*`) | a menu of **actions**; `variant="destructive"`, submenus, type-ahead |
| `Prose` | token-styled long-form typography (blog/article) — no plugin |
| `Text`     | inline typography primitive — `body`/`lead`/`muted`/`mono`/`eyebrow` for the small everyday type roles |
| `Code` · `CodeBlock` | inline `<code>`, and a `<pre>` block with an optional filename header and copy button. Deliberately unhighlighted — a grammar bundle plus a scheme reconciled against two themes and five accents is a lot of weight for decoration |
| `Link`     | a real anchor with the system focus ring — `default`/`subtle`/`quiet`, `external` for a new tab with `rel="noopener noreferrer"` and a screen-reader note. If it changes a URL it's a `Link`; if it *does* something it's `Button variant="link"` |
| `Stat` (+ `Label`/`Value`/`Delta`) | one headline measurement. The label reads first to assistive tech, the number dominates visually; `Delta` colours by direction on tabular figures |
| `Table` (+ `Header`/`Body`/`Footer`/`Row`/`Head`/`Cell`/`Caption`) | the same fields across many rows — mono column headers, hairline rules, hover tint; scrolls inside its own focusable box when wider than its container |
| `DataList` (+ `DataRow`) | definition list for key/value facts; `layout="justify"` (dashed rows, right-aligned value), `layout="grid"` (eyebrow-label column, collapses below 560px) or `layout="ledger"` (grid plus the ruled margin — rules down the left edge and between label and value, so several lists sit straight on the page unboxed), optional `mono` value |
| `Readout` (+ `ReadoutCell`) | the band of headline readings across the top of a page — a `<dl>` of equal, hairline-divided cells, ruled top and bottom, each an eyebrow label over a one-line value with an optional dot. It never wraps: below 720px it becomes a snap-scroller, and values clip rather than reflow. `DataList` is the detail it summarises; `Stat` is one number at display scale |
| `FindingList` (+ `FindingItem`) | a run of checks and their results — dot, finding, and a sentence explaining it, hanging off one rule. Sits between `Callout` (one thing, and you must act on it) and `StatusChip` (short enough to need no explanation) |
| `Collapsible` (+ `Trigger`/`Content`) | one thing that opens and closes — a "show more", a nav section. Reach for `Accordion` the moment there are several that belong together: a row of independent collapsibles is an accordion with the keyboard support left out |
| `ScrollArea` (+ `ScrollBar`) | a bounded scrolling panel with a scrollbar that matches the system. Scrolling stays native — only the bar is restyled — so use it where the bar is part of the design, never around the document |
| `Accordion` (+ `Item`/`Trigger`/`Content`) | disclosure on Radix — WAI-ARIA keyboard pattern, `type="single"`/`"multiple"`, `collapsible`, fluid `grid-rows` open/close |
| `Tabs` (+ `List`/`Trigger`/`Content`) | tabs on Radix — roving focus, arrows + Home/End, `orientation`-aware |
| `Toaster` (+ `toast()`) | transient confirmations, Sonner re-dressed in MLZ tokens. **Imported from `@martinzachariassen/design/toaster`, not the root** — sonner declares no `sideEffects: false` and injects a `<style>` at module scope, so behind a subpath only apps that want toasts ship it. Never for anything the reader must act on — that's `Alert` |
| `EmptyState` (+ `Media`/`Title`/`Description`/`Actions`) | what a list shows when it holds nothing — `dashed`/`outline`/`plain`. Not for errors (that's `Alert`) and not for pending data (that's `Skeleton`) |
| `Progress` · `Skeleton` · `Spinner` | determinate bar · loading placeholder · reduced-motion-aware ring |
| `Separator` · `Kbd` | hairline rule (optional label) · keyboard key   |
| `SectionHeading` | a tracked-out mono section label whose hairline runs from the words to the edge of the column, with optional `actions` past the rule. What lets a long page be legible without boxing every section |

### Layout & responsive

| Component  | Notes                                                |
| ---------- | ---------------------------------------------------- |
| `Container` | centred max-width page frame with responsive gutters (`sm`…`xl`/`prose`/`full`) |
| `Stack`    | flex row/column with a token gap; `direction="responsive"` stacks on mobile, flows to a row at `sm` |
| `Grid`     | responsive grid — auto-fitting (`min`) or fixed responsive `cols` (1–6) |
| `Breadcrumb` (+ `List`/`Item`/`Link`/`Page`/`Separator`/`Ellipsis`) | the trail back up — a `<nav>` around an `<ol>`; the current page is marked with `aria-current`, not linked |
| `Pagination` (+ `Content`/`Item`/`Link`/`Previous`/`Next`/`Ellipsis`) | page-by-page navigation where every page is a real, bookmarkable URL |

### Brand & marketing

| Component  | Notes                                                |
| ---------- | ---------------------------------------------------- |
| `BrandMark` · `BrandWordmark` · `BrandLockup` | the logo — the solid Block-M mark (`tile`/`glyph`), the `mlz.` wordmark (accent period), and their `horizontal`/`stacked` lockup — backs favicons; see Brand → Logo |
| `RepoBanner` | the README header banner — `standard` · `minimal` · `terminal` · `split` layouts, sized for GitHub's README width; one structure, per-project copy |
| `SocialCard` | a 1200×630 Open-Graph template, ready for Satori / `@vercel/og` |
| `ThemeToggle` · `AccentPicker` | the light/dark/system switch and the five accent swatches, wired to `ThemeProvider` — so an app gets the system's headline feature without rebuilding the control |
| `GridBackground` · `FloatingMarks` · `GlitchText` | the signature decorative layers. `GlitchText` bursts on `ambient`, on `hover`, or on demand via `burstRef` when `trigger="manual"` — for when the glitch is feedback rather than atmosphere |
| `MarginNote` | the hand-written aside, optionally with a sketched arrow pointing at what it annotates. Once per view: it's the remark you'd pencil next to a printout, never something the reader has to act on |

Storybook also ships composed references — the top-level **Patterns** section (application shell, dashboard, forms, feedback and states) — showing how to build real UIs in the system's voice, responsive by default. `cn()` (clsx + tailwind-merge) is exported for your own composition.

## Tokens in JS

For the times you need the values outside CSS (charts, canvas, email, framer-motion):

```ts
import { accents, accentFill, onDark, signals, fonts, motion, radius, breakpoints } from "@martinzachariassen/design/tokens";

accents.rust.base; // "oklch(0.74 0.138 45)"  — the fill rung
accents.rust.deep; // "oklch(0.50 0.138 45)"  — text/icons/rings on paper
accentFill.rust;   // "tint" — so it pairs with colors.ink, not colors.paper
signals.warning;   // "oklch(0.74 0.138 75)"
onDark.danger;     // "oklch(0.67 0.158 25)" — bold roles flip on ink surfaces
fonts.hand;        // '"Architects Daughter", "Comic Sans MS", cursive'
motion.easeOut;    // "cubic-bezier(.22, .61, .36, 1)"
radius.base;       // "0.25rem"
breakpoints.lg;    // "64rem" — the min-width ladder, for matchMedia etc.
```

These mirror `theme.css` value-for-value. One naming quirk: the signal role called `--destructive` in CSS is exported as `signals.danger` in JS (same colour).

Colour is authored in OKLCH and every chromatic value is held inside the sRGB
gamut, so the contrast figures hold on any display rather than only on wide-gamut
ones. Each value sits on a rung that decides its use — `base` fills, `deep`
colours text, icons and focus rings on paper — and `src/tokens.contrast.test.ts`
asserts each rung's promise, so a value edited in only one of the two files fails
CI. Foundations → Colour model documents the whole ladder.

## Fonts

Space Grotesk (`sans`/`grotesk`, the body/UI/prose **reading face** — the default mapped to `--font-sans`), Space Mono (`mono`, data/code/IDs & tracked eyebrows), Instrument Serif (`serif`, editorial accent) and Architects Daughter (`hand`, wordmark / one personality moment).

Typography in one rule: **sans for reading, mono for data.** `font-serif` and `font-hand` are opt-in, never body copy. Text tones step down `text-foreground` → `text-muted-foreground` → `text-muted-foreground-2` while all clearing WCAG AA.

`styles/fonts.css` (bundled into `index.css`) loads fonts from Google Fonts for convenience; for production, self-host with Fontsource + Fontaine metric-matched fallbacks (see the header comment in that file), or use the `index-self-hosted.css` bundle. The `--font-*` stacks carry robust system fallbacks either way. For the full role map, do's & don'ts and the legibility/a11y rules, see the **Foundations → Typography** story.
