---
name: mlz-design
description: The MLZ design system (@martinzachariassen/design) — OKLCH tokens, 60+ React components, five accent families, light/dark. This skill should be used whenever building or changing UI in an MLZ project (mlz.no, url-shortener, ip-speil, and anything else on the MLZ base), and whenever the user mentions colour, spacing, typography, tokens, theming, a component, or asks for something "in my style".
---

# Using the MLZ design system

**This system is the source of truth for how MLZ things look.** A consuming app
inherits colour, type, motion and components from it; it does not re-invent them.
If a page needs a look the system does not have, the fix is upstream in
`mlz-design`, not local CSS.

Read `references/components.md` before writing any component, and
`references/tokens.md` before writing any colour, spacing or type value. Both are
generated from source — they are current.

## The one rule everything else follows from

**No raw values in a consuming app.** No hex, no `rgb()`, no `oklch()`, no `px`
font sizes, no font stacks, no hand-rolled shadows. Every visual value comes from
a semantic token, which is also a Tailwind utility. A raw value is invisible in
light mode on your machine and broken in dark mode, or under one of the four
accent families you did not test.

Brand primitives (`--mlz-*`) are private to the system. If app code references
one, theming has been bypassed — reach for the semantic role instead.

## Before writing a component

1. Look it up in `references/components.md`. 60+ components ship, including
   things that look app-specific: `ProjectCard`, `SocialCard`, `RepoBanner`,
   `Readout`, `FindingList`, `EmptyState`, `GridBackground`.
2. If it exists, import it from `@martinzachariassen/design` and pass props.
   Do not copy its source into the app to tweak it.
3. If it *nearly* exists, say so and propose the upstream change — a new variant
   or prop on the existing component — before building a local one.
4. Only compose something new out of shipped primitives when the need is genuinely
   app-specific (a page layout, a route-level shell).

## The colour ladder — the most common bug

The rung decides the use, not the hue. The base accent is 1.83:1 against paper,
so it can never carry text.

| Colouring | Use | Needs |
| --- | --- | --- |
| Button/badge **background** | `bg-accent` + `text-accent-foreground` | 4.5:1 |
| **Text** — body, labels, errors | `text-*-deep` | 4.5:1 |
| **Icon** or status dot | `text-*-deep` | 3:1 |
| **Focus ring**, hover text | `ring-ring` / `*-deep`, never the base | 3:1 |
| Tinted **surface** behind text | `bg-*-subtle` | — |

`text-accent`, `text-success`, `hover:text-accent` are always bugs — use the
`-deep` rung, which maps back to the fill in dark mode and is therefore correct
in both themes. When auditing, grep both spellings: `text-success` **and**
`text-[var(--success)]`.

## Focus and interaction

- `focus-visible:outline-none` never ships alone. It suppresses the global
  outline in `base.css`, so the same class string must supply the replacement:
  `focus-visible:ring-[3px] focus-visible:ring-ring/30`. Inside an
  `overflow-hidden` parent, add `ring-inset` — Tailwind rings paint outside the
  border box and get clipped to nothing.
- Hover and focus must not look identical.
- **Two size scales, deliberately.** Controls use `sm / default / lg / icon`
  (h-9 / h-11 / h-12). Layout primitives (`Container`, `Stack`, `Grid`) use
  `sm / md / lg`. Never mix the vocabularies.

## Theming

`ThemeProvider` owns light/dark/system plus the accent, persists the choice and
writes it to `<html>`. `themeInitScript()` must be inlined in `<head>` ahead of
the stylesheet, or a returning dark-mode visitor gets a flash of light.
`ThemeToggle` and `AccentPicker` are the prebuilt controls — do not rebuild them.

Accent families: `blue · cyan · green · ink · rust`, set through the provider,
never hardcoded.

## Setting up a new app

```css
/* top of the app's main stylesheet, before any rule of your own */
@import "tailwindcss";
@import "@martinzachariassen/design/styles/index.css";
```

Requires React 19+ and **Tailwind v4** — the tokens ship as `@theme` layers,
which v3 cannot read. The package publishes to GitHub Packages, so the scope
needs an `.npmrc` registry entry and a `read:packages` token; pin with a tilde
range (`~0.8.0`) since 0.x minors are deliberate upgrades. Under a strict CSP,
swap `index.css` for `index-self-hosted.css`.

Full recipe: `docs/getting-started.md` in the mlz-design repo.

## Division of labour — do not blur these

| Concern | Source of truth |
| --- | --- |
| Colour, type, motion, spacing, components | **this system** |
| Logo, banners, social cards, brand assets, visual exploration | **Figma** (via the Figma MCP) |
| Page and route composition | the consuming app |

If asked for a logo variant, a banner or brand artwork, go to Figma. If asked how
something should *look and behave* in code, the answer is here.

## When working inside the mlz-design repo itself

This skill is the consumer's view. The repo's own `CLAUDE.md` is the working
brief for changing the system — three-layer token architecture, the contrast test
pair, the definition of done for a new component, Changesets. Read that instead.
