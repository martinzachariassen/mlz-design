---
"@martinzachariassen/design": minor
---

feat(tokens): rebuild the palette on a contrast-anchored OKLCH ladder

Every chromatic token is regularised onto three rungs, and the rung — not the
hue — now decides what a colour may be used for. Lightness is fixed per rung, so
switching `data-accent` changes hue without changing perceived weight: all four
tint accents carry ink text between 7.2:1 and 8.0:1.

This fixes contrast failures that were shipping:

- **Focus rings.** `--ring` was the base accent, measuring **1.82:1** against
  paper — short of the 3:1 WCAG 2.1 SC 1.4.11 requires of a focus indicator, and
  not something axe checks. It now takes the `-deep` rung (5.49:1).
- **Filled controls.** Paper text on the `rust` (2.75:1), `blue`/`info` (3.04:1)
  and `success` (3.12:1) solids was below AA. Those solids sat in the
  mid-lightness dead zone where *neither* ink nor paper text reaches 4.5:1; they
  move to the tint rung and pair with ink.
- **Icons and status dots.** Components coloured check marks, dots and toast
  icons with fill values (`text-accent`, `text-success`, …), which measure about
  1.9:1 on paper. They now use the `-deep` rung, which maps back to the fill in
  dark mode and so is correct in both themes.
- **Gamut.** Five values (including the house cyan and `--warning-deep`) sat
  outside sRGB and were silently clipped, so they did not measure what they
  claimed on every display. All values are now inside sRGB.
- **`data-accent` in dark mode.** The accent rules and the `.dark` block had
  equal specificity, and the accent rules came later — so a dark page with a
  non-default accent got the paper-tuned rung. Restated at higher specificity.

Two gates now hold the palette together. `src/tokens.contrast.test.ts` asserts
the ladder's shape against the JS mirror; `src/theme-css.test.ts` parses
`theme.css` itself — resolving `var()` and `color-mix()` — checks the mirror
against it value-for-value, fails on any colour primitive the mirror does not
know about, and re-runs the contracts on the resolved semantic roles in both
themes and all five accent families. The second is what makes theme/mirror drift
impossible rather than merely discouraged.

`--muted-foreground` and the `--overlay` mix move to OKLCH (losslessly:
`--muted-foreground` still resolves to `#63615a`), leaving the seven neutral
brand primitives as the only hex in `theme.css` — now asserted.

Adds `@types/node` as a devDependency: the drift gate reads `theme.css` from
disk, because Vitest's `css: false` stubs any `.css` import — `?raw` included —
to an empty string, which would make every assertion pass vacuously.

**Visible changes.** `blue`, `info` and `success` shift most (they were deepest
in the dead zone); `rust` and `warning` shift moderately; the house `cyan` and
`danger` are near-identical to before. `danger` and the `ink` accent stay bold
fills — a destructive action must not read as decorative.

**New exports.** `accentFill`, `signalFill` and `onDark`, plus the `FillMode`
type, describing which foreground a fill pairs with and how the bold roles flip
on dark surfaces. Foundations → Colour model documents the whole ladder.
