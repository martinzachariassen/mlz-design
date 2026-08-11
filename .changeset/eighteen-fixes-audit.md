---
"@martinzachariassen/design": patch
---

Fix component bugs found in a full audit:

- **ThemeToggle**: the divider between segments no longer disappears — overlap now
  matches the 1.5px border and the pressed/hovered/focused segment is elevated so
  its accent edge isn't painted over by the next button. `className` now lands on
  the wrapper element (also for `AccentPicker`).
- **Alert**: `info`/`success`/`warning`/`destructive` text and icons use the
  `-deep` rung instead of the ~1.9:1 fill tokens (WCAG 1.4.3/1.4.11 in light mode).
- **Button**: every variant gets a real `ring-ring` focus indicator — `ghost` and
  `link` previously had none, and the other variants relied on the 1.83:1 accent
  shadow that was identical to hover.
- **CodeBlock / ScrollArea**: keyboard-focusable scroll regions had their focus
  ring fully clipped by `overflow-hidden` parents; rings are now inset. The
  CodeBlock copy button no longer announces a doubled name.
- **CollapsibleContent**: the documented `0fr → 1fr` grid animation actually runs
  now (`forceMount` + transitioned `visibility`, mirroring `Accordion`).
- **TabsContent**: focusable panel keeps a visible focus ring instead of
  suppressing the outline with no replacement.
- **AlertDialogCancel**: initial focus is claimed via the `autofocus` attribute so
  `showModal()`'s focusing steps respect it regardless of source order.
- **GlitchText**: the ambient timer survives parent re-renders, and a consumer's
  `onPointerEnter` composes with the hover trigger instead of replacing it.
- **Slider**: disabled thumbs use `data-[disabled]` (the `:disabled` selector
  never matched a `<span>`).
- **Progress**: `max` can no longer be overridden out from under the 0–100 clamp.
- **AvatarGroup**: members elevate on `focus-within` so focus rings survive the
  overlap. **DropdownMenu**: destructive items use `bg-destructive-subtle` instead
  of an off-system alpha tint. **Toggle**: outline-variant hover borders use the
  ring token so hovering no longer lowers the boundary below 3:1.
