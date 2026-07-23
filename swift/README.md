# MLZDesign (SwiftUI)

The native token layer for [MLZ Design](../README.md) — the same colour, type,
spacing, radius and motion that back the web components, generated as a small
dependency-free SwiftUI package so iOS/macOS apps inherit the exact MLZ look.

> **Generated, not hand-written.** The files under `Sources/MLZDesign/` are emitted
> from the web source of truth (`src/tokens.ts` + `src/styles/theme.css`) by
> `bun run gen:swift`. The web system authors colour in OKLCH; the generator
> converts every value to sRGB so SwiftUI's `Color` can consume it. Don't edit the
> generated files — change the tokens and re-run.

## Add it

Local path (while it lives in this repo):

```swift
.package(path: "../mlz-design/swift")
```

or point SwiftPM at the repo and the `swift/` subpath. Then `import MLZDesign`.

## Use it

```swift
import SwiftUI
import MLZDesign

struct Ship: View {
    var body: some View {
        VStack(alignment: .leading, spacing: MLZSpacing.md) {
            Text("DEPLOY")
                .font(MLZFont.mono(13))
                .foregroundStyle(MLZColor.foreground)
            Text("Ship it")
                .font(MLZFont.hand(28))
        }
        .padding(MLZSpacing.lg)
        .background(MLZColor.card)
        .clipShape(RoundedRectangle(cornerRadius: MLZRadius.lg))
        .overlay(
            RoundedRectangle(cornerRadius: MLZRadius.lg)
                .stroke(MLZColor.border, lineWidth: 1)
        )
        .animation(MLZMotion.standard, value: /* some state */ true)
    }
}
```

- **`MLZColor`** — brand primitives (`paper`, `ink`, `line`…) plus semantic roles
  (`background`, `foreground`, `primary`, `accent`, `border`, `destructive`,
  `success`, `warning`, `info`, each with a `-Foreground`). Semantic roles are
  **light/dark adaptive** automatically. Swap the accent family with
  `MLZColor.accent(.rust)` / `MLZColor.palette(.blue)`.
- **`MLZFont`** — `hand` · `mono` · `grotesk` · `serif`. These name the font
  *families*; bundle the fonts in your app (`.ttf` + `UIAppFonts`) so they resolve.
  `Font.custom` falls back to the system face if a family is missing.
- **`MLZSpacing`** — a 4pt grid (`xs`…`huge`, plus `step(_:)`).
- **`MLZRadius`** — `sm`/`md`/`lg`/`xl` (the brand stays tight/technical).
- **`MLZMotion`** — the house easing as ready `Animation`s (`easeOut`, `easeInOut`,
  `standard`).

## Keeping in sync

Whenever a token changes on the web side, re-run the generator from the repo root:

```bash
bun run gen:swift
```

Semantic light/dark values are mirrored inside the generator (the same discipline
`src/tokens.ts` uses for the JS mirror); primitives and accents are read straight
from `src/tokens.ts`.
