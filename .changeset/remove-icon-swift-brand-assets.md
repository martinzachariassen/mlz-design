---
"@martinzachariassen/design": minor
---

Remove the icon system, the SwiftUI native token layer, and the brand-assets generator — trimming the package to the web component/token system.

**Breaking:**

- Removed `Icon`, `IconProps`, `iconVariants`, `houseIcons`, `IconName`, `iconNames`, and the re-exported `addCollection`/`addIcon`/`IconifyIcon` Iconify helpers.
- Removed `InfoTip`'s `icon` prop — its trigger now renders a single fixed glyph.
- Removed the `./brand-assets` subpath export (`defineBrandAssets`, `BrandAssetsConfig`) and the `gen:assets`/`gen:banner`/`gen:icons`/`gen:swift` scripts.
- Removed the generated `swift/` SwiftPM package (`MLZDesign`) — no more native iOS/macOS token layer.
- Removed this repo's own generated brand assets (`assets/banner.svg`, `public/assets/*`, `public/favicon.ico`); the README and Storybook playground no longer ship a custom banner/favicon.

`Accordion`'s chevron and `InfoTip`'s trigger glyph are now inline SVG, so neither depends on the icon set anymore.
