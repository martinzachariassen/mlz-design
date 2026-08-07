# Brand assets

Every repo I build wears the same graphics — README banner, social share cards, and the full favicon / app-icon set — and they all come **out of the real design-system components**, not redrawn per project. A consuming repo supplies only the *copy*; every visual decision (the frame, ruled grid, type, colour, the `mlz.` lockup) is inherited from the tokens and can't drift. One command renders the whole set; a `--check` mode fails CI the moment a committed asset falls out of sync.

## 1. Drop a `brand.config.ts` at the repo root

It's just strings — fully typed and autocompleted via the `defineBrandAssets` helper:

```ts
import { defineBrandAssets } from "@martinzachariassen/design/brand-assets";

export default defineBrandAssets({
  banner: {
    project: "mlz.no",
    eyebrow: "MLZ · Personal Site",
    description: "Personal homepage — a small Vite + React + TypeScript app.",
    badges: ["React", "Vite", "Bun", "TypeScript"],
    install: "bun run dev",
    footer: "github.com/martinzachariassen/mlz-no",
  },
  social: {
    title: "Senior Software Developer",
    eyebrow: "Martin Zachariassen",
    description: "Backend systems, distributed architecture, APIs.",
    footer: "mlz.no",
    tag: "Oslo, Norway",
    tagline: "Personal Site",   // the mono kicker under the wordmark
  },
});
```

Only `banner.project` and `social.title` are required; everything else is optional. Add `favicons: false` to skip the icon set, or a `paths` object to redirect any group (see the table below).

## 2. Generate the set

The generator lives in *this* repo — run it here, pointed at the other repo's config and root:

```bash
bun run gen:assets --config ../mlz-no/brand.config.ts --out ../mlz-no
```

It writes eight files to their conventional locations (override any group with the matching `paths` key):

| File(s)                                                        | Size     | Default dir (`paths` key)          |
| ------------------------------------------------------------- | -------- | ---------------------------------- |
| `banner.png`                                                  | 1280×340 | `assets/` (`banner`)               |
| `og.png` · `twitter-card.png`                                 | 1200×630 | `public/assets/social/` (`social`) |
| `favicon.svg` · `favicon-32.png` · `favicon-192.png` · `apple-touch-icon.png` | 32/192/180 | `public/assets/icons/` (`icons`) |
| `favicon.ico`                                                 | 16 + 32  | `public/` (`ico`)                  |

## 3. Guard against drift in CI

Use `--check` — it re-renders everything and byte-compares against what's committed, exiting non-zero (and listing the stale files) if a banner or card is out of date. No writes:

```bash
bun run gen:assets --config ../mlz-no/brand.config.ts --out ../mlz-no --check
```

## How it works

The generator boots **Vite + headless Chromium** (Playwright), injects the config as `window.__BRAND__`, and screenshots the actual `<RepoBanner>` / `<SocialCard>` / `<BrandMark>` components at 2× DPI downsampled to canonical size — pixel-identical to what Storybook renders, gradients and `color-mix` and all. The favicon `.ico` is packed by hand as 16 + 32 PNG-in-ICO (no extra dependency). Captures are made deterministic — animations frozen and the drifting `FloatingMarks` disabled — so `--check` is byte-stable across runs on the same toolchain (a Chromium bump can shift antialiasing, so run the check with the toolchain that wrote the assets).

The generator itself is **not published**: it needs the source, Vite and Playwright, so it runs from this repo against sibling repo configs rather than via `bunx` in a consumer. What *is* exported is the config contract — `defineBrandAssets` and the `BrandAssetsConfig` type — at the `@martinzachariassen/design/brand-assets` subpath, so every repo's `brand.config.ts` is typed against the same source of truth.

The README header banner at the top of this repo is a self-contained, light-palette `assets/banner.svg` rendered from `RepoBanner` (standard layout) by `bun run gen:banner`. That script also emits **`assets/banner-template.svg`** — a placeholder any repo can copy as its layout starting point.
