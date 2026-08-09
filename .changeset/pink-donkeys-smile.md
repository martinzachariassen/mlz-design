---
"@martinzachariassen/design": minor
---

Add **`StatusChip`**, **`CopyButton`** and **`MarginNote`**, self-host the two display faces, and give `GlitchText` an on-demand burst.

**`StatusChip`** — one live finding as a dot-led pill: a `StatusDot` in the role's colour, a sentence-case label in the reading face, on a `*-subtle` wash inside a tinted hairline. The gap it fills is specific. `Badge` is tracked-out uppercase mono because it labels *what something is* — a version, a category. `StatusDot` is the dot alone. `Callout` and `Alert` are block-level and imply the reader has to act. Nothing covered "how this is right now", which is what a status stripe across the top of a diagnostic page is made of. There is deliberately no `asChild`: a chip reports a reading rather than being a control, and the dot it injects has nowhere to go inside someone else's element — press-able pills are `Toggle`.

**`CopyButton`** and **`useCopyToClipboard`** — a `Button` that puts a string on the clipboard and says so, the label swapping to a check plus "Copied" and returning on its own. The hook is the same behaviour without the button. `CodeBlock`'s `copyable` path now runs on it too, so the system has one implementation of the `writeText` + reset-timer pair instead of two that could drift. A refused copy (insecure context, denied permission) leaves the label alone rather than claiming success — the value is still selectable, which is the fallback people already know.

**`MarginNote`** — the hand-written aside, set in `--font-hand`, optionally with a sketched arrow pointing at whatever it annotates. The arrow is authored once pointing up-left and mirrored for the other three directions, so every variant stays the same hand rather than four drawings that almost match. It's `aria-hidden`: the sentence carries the whole message.

**`GlitchText` gains `trigger="manual"`** plus a `burstRef` handle, for when the glitch is *feedback* — a value just hit the clipboard — rather than atmosphere. `burstRef` is separate from `ref`, which still hands back the wrapper element, so reaching for one never costs you the other. `prefers-reduced-motion` and the `data-motion="off"` kill-switch make `burst()` a no-op, same as the other triggers.

**`fonts-self-hosted.css` now ships all four families.** It carried Space Grotesk and Space Mono only, and said in its own header that the display faces "are not bundled here yet" — which meant `--font-hand` and `--font-serif` silently fell back to Comic Sans and Georgia in exactly the apps that need the self-hosted bundle: the ones under a strict `font-src 'self'`, where the Google Fonts route isn't available at all. Architects Daughter (400) and Instrument Serif (400 + a real italic cut, so numerals don't get a synthesised oblique) are now bundled as WOFF2 alongside the other two, all `latin` subsets to match. No token values change.
