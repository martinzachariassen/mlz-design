---
"@martinzachariassen/design": minor
---

Add a motion foundation and decorative effects distilled from mlz.no:

- **Motion tokens/utilities** — five signature animations as Tailwind `animate-*` utilities backed by `--animate-*` tokens (`rise`, `pulse-soft`, `blink`, `float`, `glitch`), mirrored in `tokens.ts` as `animations`. Includes a `data-motion="off"` kill-switch and a new Foundations/Motion Storybook page.
- **`GlitchText`** — per-character cyberpunk RGB-split effect using the `--glitch-1`/`--glitch-2` tokens, with ambient and hover triggers and an accessible (visually-hidden) text copy.
- **`GridBackground`** — the two-scale engineering/blueprint grid, static or revealed by a cursor-following spotlight with an accent glow.
- **`FloatingMarks`** — drifting, deterministically-placed CSS sketch glyphs as a decorative background layer.
- **`Button`** — new `sketch` variant (hand-drawn dashed outline that wobbles into an offset accent shadow on hover/focus), plus icons now tilt on hover/focus, matching the mlz.no contact-link interaction.
