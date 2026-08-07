---
"@martinzachariassen/design": patch
---

Button: slower, smoother hover/focus lift. The signature raise + offset shadow
now travels over 260ms on a new, non-front-loaded easing instead of a snappy
200ms. Adds `--ease-glide`/`--dur-hover` motion tokens (mirrored in `tokens.ts`
as `motion.easeGlide`/`motion.durationHover`) so the tuned interaction feel is
reusable across components.
