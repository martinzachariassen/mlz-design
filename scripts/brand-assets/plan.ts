/**
 * The pure planning half of the brand-asset generator: given one repo's config,
 * decide which files to write, where, and at what capture size. No Vite, no
 * Playwright, no filesystem — so it stays fast to unit-test. generate.ts owns the
 * rendering and I/O; this owns the "what".
 */
import { join } from "node:path";
import { type BrandAssetsConfig, DEFAULT_PATHS } from "../../src/brand-assets";

/** The `mlz.` mark, as the polygon points for a 32×32 favicon glyph. */
export const M_POINTS =
  "7,25 7,7 12,7 16,14.5 20,7 25,7 25,25 20.6,25 20.6,13.6 17.4,19.4 14.6,19.4 11.4,13.6 11.4,25";

/** The one static asset: a hand-written favicon SVG (everything else is rendered). */
export const FAVICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
  <rect x="1" y="1" width="30" height="30" rx="6" fill="#1a1a18"/>
  <polygon fill="#ecebe4" points="${M_POINTS}"/>
</svg>
`;

export interface Target {
  /** Absolute output path. */
  file: string;
  /** Query string for the capture page (omit for the static SVG). */
  query?: string;
  /** Capture box in CSS px. */
  w?: number;
  h?: number;
  /** Transparent background (icons with rounded corners). */
  alpha?: boolean;
  /** Literal contents instead of a screenshot (favicon.svg). */
  svg?: string;
}

/**
 * The full write-list for a config, rooted at `root`. Banner + social cards
 * always; the favicon/app-icon set unless `favicons` is explicitly `false`.
 */
export function targets(cfg: BrandAssetsConfig, root: string): Target[] {
  const p = { ...DEFAULT_PATHS, ...cfg.paths };
  const at = (dir: string, name: string) => join(root, dir, name);

  const list: Target[] = [
    { file: at(p.banner, "banner.png"), query: "a=banner", w: 1280, h: 340 },
    { file: at(p.social, "og.png"), query: "a=og", w: 1200, h: 630 },
    { file: at(p.social, "twitter-card.png"), query: "a=twitter", w: 1200, h: 630 },
  ];

  if (cfg.favicons !== false) {
    list.push(
      { file: at(p.icons, "favicon.svg"), svg: FAVICON_SVG },
      { file: at(p.icons, "favicon-32.png"), query: "a=icon&size=32", w: 32, h: 32, alpha: true },
      {
        file: at(p.icons, "favicon-192.png"),
        query: "a=icon&size=192",
        w: 192,
        h: 192,
        alpha: true,
      },
      {
        file: at(p.icons, "apple-touch-icon.png"),
        query: "a=icon&size=180&variant=bleed&pad=3",
        w: 180,
        h: 180,
      },
    );
  }
  return list;
}

/** Absolute path for the packed favicon.ico, honouring a `paths.ico` override. */
export function icoPath(cfg: BrandAssetsConfig, root: string): string {
  const p = { ...DEFAULT_PATHS, ...cfg.paths };
  return join(root, p.ico, "favicon.ico");
}
