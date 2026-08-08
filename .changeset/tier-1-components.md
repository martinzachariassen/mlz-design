---
"@martinzachariassen/design": minor
---

Six new components, none of which needs a new dependency.

- **`Field`** (+ `FieldLabel` / `FieldDescription` / `FieldError`) — a labelled
  control with its description and error, wired together. One generated id
  becomes the control's `id`, the label's `htmlFor` and the `aria-describedby`
  target, and only the parts actually rendered are advertised. `Input` and
  `Textarea` join automatically through the exported `useFieldControlProps`.
- **`Popover`** — the general non-modal panel. `@radix-ui/react-popover` was
  already a dependency; only `InfoTip` could reach it.
- **`EmptyState`**, **`Stat`**, **`Link`**, **`Code`** / **`CodeBlock`**.

Adds the **`-deep` signal roles** to the token layer: `--success-deep`,
`--warning-deep`, `--info-deep`, `--destructive-deep`, mirroring the existing
`--accent-deep`, plus a `signalsDeep` export from `./tokens`. The solids are
fill colours — as small text on paper, `--warning` measures 1.6:1 and
`--success` 3.1:1, both short of AA. The deep variants are the same hues
darkened until they clear 4.5:1, and in dark mode they map straight back to the
solids, which already pass there.

`Link variant="subtle"` reads from `--accent-deep` rather than `--accent` for
the same reason (cyan is 1.8:1 as text), matching how `Prose` colours links.
