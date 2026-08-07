# Design system

The heart of the package: a three-layer token system, runtime theming, and a component set that reads only semantic tokens — so everything re-themes together. Browse it all live in [Storybook](https://github.com/martinzachariassen/mlz-design#playground).

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
| `Input` · `Textarea` | accent focus ring, technical mono field         |
| `Label`    | mono, uppercase field label with `peer-disabled` states |
| `Checkbox` · `Switch` | accessible native controls with styled indicators |
| `RadioGroup` (+ `Item`) | two to five exclusive choices, all visible; one tab stop, arrows move within it |
| `Select` (+ `Trigger`/`Value`/`Content`/`Item`/`Label`/`Separator`/`Group`) | one value from many (~6+ options); grouped, collision-aware listbox. Pass `name` inside a `<form>` for a native submit value |

### Surfaces & data

| Component  | Notes                                                |
| ---------- | ---------------------------------------------------- |
| `Card` (+ `Header`/`Title`/`Description`/`Action`/`Content`/`Footer`) | `default` · `elevated` · `interactive` (hover-lift) · `accent` · `ghost` |
| `Badge`    | `default` · `accent` · `outline` · `muted` · `destructive` |
| `Alert` (+ `Title`/`Description`) | `default` · `info` · `success` · `warning` · `destructive` signal panels |
| `Callout`  | compact, dot-led inline note (lighter than `Alert`) for dense lists of findings/checks; semantic `tone` |
| `StatusDot` | semantic status dot (`success`/`warning`/`destructive`/`info`/`accent`/`muted`) with an optional pulsing ring |
| `Avatar` (+ `Image`/`Fallback`/`Group`) | initials-first; `xs`–`xl`, circle/square, presence `status`, overlap group with `+N` |
| `ProjectCard` | portfolio card — on-brand cover, tags, whole-card link, `featured` horizontal layout |
| `Dialog` (+ `Content`/`Header`/`Title`/`Description`/`Footer`/`Close`) | modal on the native `<dialog>` — focus-trap, Esc, no dependency |
| `InfoTip`  | accessible inline help popover (glossary/hints) — Radix-positioned, keyboard + Esc, collision-aware |
| `Tooltip` (+ `Provider`/`Trigger`/`Content`) | short hover/focus hint. Attaches as the trigger's *description*, so an icon button still needs its own `aria-label` |
| `DropdownMenu` (+ `Trigger`/`Content`/`Item`/`CheckboxItem`/`RadioItem`/`Label`/`Separator`/`Shortcut`/`Sub*`) | a menu of **actions**; `variant="destructive"`, submenus, type-ahead |
| `Prose` | token-styled long-form typography (blog/article) — no plugin |
| `Text`     | inline typography primitive — `body`/`lead`/`muted`/`mono`/`eyebrow` for the small everyday type roles |
| `DataList` (+ `DataRow`) | definition list for key/value facts; `layout="justify"` (dashed rows, right-aligned value) or `layout="grid"` (eyebrow-label column, collapses below 560px), optional `mono` value |
| `Accordion` (+ `Item`/`Trigger`/`Content`) | disclosure on Radix — WAI-ARIA keyboard pattern, `type="single"`/`"multiple"`, `collapsible`, fluid `grid-rows` open/close |
| `Tabs` (+ `List`/`Trigger`/`Content`) | tabs on Radix — roving focus, arrows + Home/End, `orientation`-aware |
| `Progress` · `Skeleton` · `Spinner` | determinate bar · loading placeholder · reduced-motion-aware ring |
| `Separator` · `Kbd` | hairline rule (optional label) · keyboard key   |

### Layout & responsive

| Component  | Notes                                                |
| ---------- | ---------------------------------------------------- |
| `Container` | centred max-width page frame with responsive gutters (`sm`…`xl`/`prose`/`full`) |
| `Stack`    | flex row/column with a token gap; `direction="responsive"` stacks on mobile, flows to a row at `sm` |
| `Grid`     | responsive grid — auto-fitting (`min`) or fixed responsive `cols` (1–6) |

### Brand & marketing

| Component  | Notes                                                |
| ---------- | ---------------------------------------------------- |
| `BrandMark` · `BrandWordmark` · `BrandLockup` | the logo — the solid Block-M mark (`tile`/`glyph`), the `mlz.` wordmark (accent period), and their `horizontal`/`stacked` lockup — backs favicons; see Brand → Logo |
| `RepoBanner` | the README header banner — `standard` · `minimal` · `terminal` · `split` layouts, sized for GitHub's README width; one structure, per-project copy |
| `SocialCard` | a 1200×630 Open-Graph template, ready for Satori / `@vercel/og` |
| `GridBackground` · `FloatingMarks` · `GlitchText` | the signature decorative layers |

Storybook also ships composed references — the top-level **Patterns** section (dashboard, forms, alerts…) — showing how to build real UIs in the system's voice, responsive by default. `cn()` (clsx + tailwind-merge) is exported for your own composition.

## Tokens in JS

For the times you need the values outside CSS (charts, canvas, email, framer-motion):

```ts
import { tokens, accents, colors, signals, fonts, motion, radius, breakpoints } from "@martinzachariassen/design/tokens";

accents.rust.base; // "oklch(0.66 0.15 45)"
signals.warning;   // "oklch(0.80 0.15 78)"
fonts.hand;        // '"Architects Daughter", "Comic Sans MS", cursive'
motion.easeOut;    // "cubic-bezier(.22, .61, .36, 1)"
radius.base;       // "0.25rem"
breakpoints.lg;    // "64rem" — the min-width ladder, for matchMedia etc.
```

These mirror `theme.css` value-for-value. One naming quirk: the signal role called `--destructive` in CSS is exported as `signals.danger` in JS (same colour).

## Fonts

Space Grotesk (`sans`/`grotesk`, the body/UI/prose **reading face** — the default mapped to `--font-sans`), Space Mono (`mono`, data/code/IDs & tracked eyebrows), Instrument Serif (`serif`, editorial accent) and Architects Daughter (`hand`, wordmark / one personality moment).

Typography in one rule: **sans for reading, mono for data.** `font-serif` and `font-hand` are opt-in, never body copy. Text tones step down `text-foreground` → `text-muted-foreground` → `text-muted-foreground-2` while all clearing WCAG AA.

`styles/fonts.css` (bundled into `index.css`) loads fonts from Google Fonts for convenience; for production, self-host with Fontsource + Fontaine metric-matched fallbacks (see the header comment in that file), or use the `index-self-hosted.css` bundle. The `--font-*` stacks carry robust system fallbacks either way. For the full role map, do's & don'ts and the legibility/a11y rules, see the **Foundations → Typography** story.
