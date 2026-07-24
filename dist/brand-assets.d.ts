import { AccentName } from './tokens.js';

/**
 * One repo's brand-asset copy. Everything visual — the frame, grid, marks, type,
 * colour — comes from the design system; a repo only supplies these strings, then
 * runs `gen-assets` to emit an identical-looking banner, social cards and
 * favicons. See scripts/brand-assets/generate.ts.
 */
interface BrandAssetsConfig {
    /** README header banner — the wide 1280×340 image. */
    banner: {
        /** Project name — the headline paired with the `mlz.` wordmark. */
        project: string;
        /** Category kicker above the name (e.g. "MLZ · Personal Site"). */
        eyebrow?: string;
        /** One-line description under the name. */
        description?: string;
        /** Stack / tag chips. */
        badges?: string[];
        /** Install / run command, shown mono. */
        install?: string;
        /** Footer-right meta — a repo path or domain. */
        footer?: string;
        layout?: "standard" | "minimal" | "terminal" | "split";
        accent?: AccentName;
    };
    /** Open-Graph / Twitter share card — the 1200×630 image. */
    social: {
        /** Headline — the one thing the card is about. */
        title: string;
        /** Mono kicker above the headline (e.g. the author). */
        eyebrow?: string;
        /** Supporting line under the headline. */
        description?: string;
        /** Footer-left meta (domain, author…). */
        footer?: string;
        /** Mono kicker under the wordmark in the lockup. */
        tagline?: string;
        /** Small badge in the top-right (e.g. a location or section). */
        tag?: string;
        accent?: AccentName;
    };
    /** Emit the favicon / app-icon set. Default true. */
    favicons?: boolean;
    /** Where each asset group is written, relative to the repo root. */
    paths?: {
        /** README banner. Default "assets". */
        banner?: string;
        /** OG + Twitter cards. Default "public/assets/social". */
        social?: string;
        /** favicon.svg + PNG icons. Default "public/assets/icons". */
        icons?: string;
        /** favicon.ico. Default "public". */
        ico?: string;
    };
}
declare const DEFAULT_PATHS: {
    readonly banner: "assets";
    readonly social: "public/assets/social";
    readonly icons: "public/assets/icons";
    readonly ico: "public";
};
/** Identity helper for typed, autocompleted config files. */
declare function defineBrandAssets(config: BrandAssetsConfig): BrandAssetsConfig;

export { type BrandAssetsConfig, DEFAULT_PATHS, defineBrandAssets };
