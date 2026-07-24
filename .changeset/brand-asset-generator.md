---
"@martinzachariassen/design": minor
---

feat: one-command brand-asset generator

Add `gen:assets` — a generator that renders a repo's full graphical set (README
banner, OG/Twitter cards, and the favicon/app-icon set) from the real
design-system components in headless Chromium, so every project wears the
identical face from one `brand.config.ts`. Ships:

- `@martinzachariassen/design/brand-assets` — the `BrandAssetsConfig` contract and
  a `defineBrandAssets` helper for typed config files.
- `bun run gen:assets --config <path> --out <repoRoot>` to write the assets, and
  `--check` to fail CI when a committed asset has drifted from a fresh render.
- `SocialCard` now takes a `tagline` prop (was a hardcoded "Design System"), so a
  consuming site sets its own descriptor under the wordmark.
