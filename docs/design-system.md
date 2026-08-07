# Design system

The heart of the package: a three-layer token system, runtime theming, and a component set that reads only semantic tokens — so everything re-themes together. Browse it all live in [Storybook](https://github.com/martinzachariassen/mlz-design#playground).

See [ARCHITECTURE.md](../ARCHITECTURE.md) for the token layering and repo layout.

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
| `Button`   | `default` · `solid` · `accent` · `ghost` · `sketch` · `destructive` · `link`; sizes `sm`/`default`/`lg`/`icon`. The signature ghost that lifts on hover with an offset accent shadow. |
| `Input` · `Textarea` | accent focus ring, technical mono field         |
| `Label`    | mono, uppercase field label with `peer-disabled` states |
| `Checkbox` · `Switch` | accessible native controls with styled indicators |

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
| `InfoTip`  | accessible inline help popover (glossary/hints) — click or hover, keyboard + Esc, no dependency |
| `Prose` | token-styled long-form typography (blog/article) — no plugin |
| `Text`     | inline typography primitive — `body`/`lead`/`muted`/`mono`/`eyebrow` for the small everyday type roles |
| `DataList` (+ `DataRow`) | definition list for key/value facts; `layout="justify"` (dashed rows, right-aligned value) or `layout="grid"` (eyebrow-label column, collapses below 560px), optional `mono` value |
| `Accordion` (+ `Item`/`Trigger`/`Content`) | Radix-free disclosure — WAI-ARIA keyboard pattern, `type="single"`/`"multiple"`, `collapsible`, fluid `grid-rows` open/close |
| `Tabs` (+ `List`/`Trigger`/`Content`) | Radix-free, keyboard-navigable  |
| `Progress` · `Skeleton` · `Spinner` | determinate bar · loading placeholder · reduced-motion-aware ring |
| `Separator` · `Kbd` | hairline rule (optional label) · keyboard key   |
| `Icon`     | curated **Lucide** house set, shipped **offline** (no network); `currentColor`, `xs`–`xl` sizes, decorative by default / `label` for AT. Bring-your-own glyphs via `addCollection`. |

### Layout & responsive

| Component  | Notes                                                |
| ---------- | ---------------------------------------------------- |
| `Container` | centred max-width page frame with responsive gutters (`sm`…`xl`/`prose`/`full`) |
| `Stack`    | flex row/column with a token gap; `direction="responsive"` stacks on mobile, flows to a row at `sm` |
| `Grid`     | responsive grid — auto-fitting (`min`) or fixed responsive `cols` (1–6) |

### Brand & marketing

| Component  | Notes                                                |
| ---------- | ---------------------------------------------------- |
| `BrandMark` · `BrandWordmark` · `BrandLockup` | the logo — the solid Block-M mark (`tile`/`glyph`), the `mlz.` wordmark (accent period), and their `horizontal`/`stacked` lockup — backs favicons; see Foundations/Logo |
| `RepoBanner` | the README header banner — `standard` · `minimal` · `terminal` · `split` layouts, sized for GitHub's README width; one structure, per-project copy |
| `SocialCard` | a 1200×630 Open-Graph template, ready for Satori / `@vercel/og` |
| `GridBackground` · `FloatingMarks` · `GlitchText` | the signature decorative layers |

Storybook also ships composed references — **Foundations → Patterns** (dashboard, forms, alerts…) and full-page **Templates → Portfolio / Blog** — showing how to build real UIs in the system's voice, responsive by default. `cn()` (clsx + tailwind-merge) is exported for your own composition.

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

## Native (SwiftUI)

The same tokens, on iOS/macOS. `swift/` is a small **generated** SwiftPM package (`MLZDesign`) with no dependencies — colour, type, spacing, radius and motion emitted from `src/tokens.ts` + `theme.css` so native apps can't drift from the web system either.

```bash
bun run gen:swift   # OKLCH → sRGB, writes swift/Sources/MLZDesign/*.swift
```

```swift
import SwiftUI
import MLZDesign

Text("Ship it")
    .font(MLZFont.hand(28))
    .foregroundStyle(MLZColor.foreground)   // light/dark adaptive
    .padding(MLZSpacing.lg)
    .background(MLZColor.card)
    .tint(MLZColor.accent(.rust))           // swap the whole accent family
```

`MLZColor` (semantic roles + brand primitives + five accent families), `MLZFont`, `MLZSpacing` (4pt grid), `MLZRadius`, `MLZMotion`. See [`swift/README.md`](../swift/README.md).
