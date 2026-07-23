import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../lib/cn";

/** The canonical Block-M letterform: a solid polygon, no strokes, no rounding.
 * Drawn on the 32×32 grid — stems 4.4u wide, apex dipping to 14.5, counter valley
 * at 19.4. Fixed — do not redraw. */
const M_POINTS =
  "7,25 7,7 12,7 16,14.5 20,7 25,7 25,25 20.6,25 20.6,13.6 17.4,19.4 14.6,19.4 11.4,13.6 11.4,25";

/**
 * The MLZ **mark** — the Block M on a tight ink tile, the icon half of the
 * identity (favicon, avatar, app icon, stamp). Pure SVG, so it stays crisp from a
 * 16px favicon up to a 1200px OG image.
 *
 * The mark is always monochrome — ink tile, paper letter, never the accent. It
 * reads from semantic tokens by default (`--foreground` tile, `--background`
 * letter), so it inverts with the theme for free. For a *static* asset (a favicon
 * file, an email) pass fixed brand colours via `tile` / `glyph` — see the
 * Foundations → Brand & Favicon story for the export recipe.
 */
const brandMarkVariants = cva("inline-block shrink-0 align-middle", {
  variants: {
    variant: {
      /** Ink tile + inset letter — the app/favicon icon. */
      tile: "",
      /** Just the letterform in `currentColor` — for inline use. */
      glyph: "",
    },
  },
  defaultVariants: { variant: "tile" },
});

export interface BrandMarkProps
  extends Omit<React.SVGProps<SVGSVGElement>, "opacity">,
    VariantProps<typeof brandMarkVariants> {
  /** Rendered box in px (width = height). */
  size?: number;
  /** Tile fill (tile variant). Defaults to the theme's ink surface. */
  tile?: string;
  /** Letter colour. Defaults to the theme's paper surface (tile) / currentColor (glyph). */
  glyph?: string;
}

export const BrandMark = React.forwardRef<SVGSVGElement, BrandMarkProps>(
  (
    { variant = "tile", size = 32, tile = "var(--foreground)", glyph, className, ...props },
    ref,
  ) => {
    const isTile = variant === "tile";
    const letter = glyph ?? (isTile ? "var(--background)" : "currentColor");

    return (
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        role="img"
        aria-label="MLZ"
        className={cn(brandMarkVariants({ variant }), className)}
        {...props}
      >
        {isTile && <rect x="1" y="1" width="30" height="30" rx="6" fill={tile} />}
        <polygon points={M_POINTS} fill={letter} />
      </svg>
    );
  },
);
BrandMark.displayName = "BrandMark";

/**
 * The MLZ **wordmark** — `mlz.` set in Space Mono Bold, lowercase, tracked
 * −0.03em, the type half of the identity (header, footer, signature, title). The
 * period is the one spot of colour in the whole system: it follows the active
 * accent family via `--brand-period` (accent-deep on light for AA on paper, the
 * base accent on dark) and is never omitted. Pass `period` to override it for a
 * static export. Minimum size 14px; below that, use the mark alone.
 */
export interface BrandWordmarkProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  /** Font size in px. */
  size?: number;
  /** Period colour override (static exports). Defaults to the `--brand-period` token. */
  period?: string;
}

export const BrandWordmark = React.forwardRef<HTMLSpanElement, BrandWordmarkProps>(
  ({ size = 24, period, className, style, ...props }, ref) => (
    <span
      ref={ref}
      className={cn("font-mono font-bold lowercase leading-none tracking-[-0.03em]", className)}
      style={{ fontSize: size, ...style }}
      {...props}
    >
      mlz
      <span
        className={period ? undefined : "text-brand-period"}
        style={period ? { color: period } : undefined}
      >
        .
      </span>
    </span>
  ),
);
BrandWordmark.displayName = "BrandWordmark";

/**
 * The **lockup** — the mark paired with the wordmark, the signature MLZ pairing.
 * Proportions are fixed: mark height = 1.45 × wordmark size, gap = 0.5 × wordmark
 * size. `horizontal` (mark beside wordmark) is primary for headers and the OG
 * card; `stacked` (mark above a centred wordmark) suits square/avatar contexts.
 * The mono, wide-tracked `tagline` joins only at 40px+ marks (guideline minimum).
 */
export interface BrandLockupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Kicker line under the wordmark. Shown only when set and the mark is ≥ 40px. */
  tagline?: string;
  /** Mark size in px; the wordmark scales with it (mark = 1.45 × wordmark). */
  size?: number;
  /** Lockup layout. */
  orientation?: "horizontal" | "stacked";
}

export const BrandLockup = React.forwardRef<HTMLDivElement, BrandLockupProps>(
  ({ tagline = "", size = 40, orientation = "horizontal", className, ...props }, ref) => {
    const stacked = orientation === "stacked";
    const wordmarkSize = size / 1.45;
    const gap = wordmarkSize * 0.5;
    const showTagline = Boolean(tagline) && size >= 40;

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex text-foreground",
          stacked ? "flex-col items-center text-center" : "items-center",
          className,
        )}
        style={{ gap }}
        {...props}
      >
        <BrandMark size={size} />
        <div className={cn("flex flex-col leading-none", stacked && "items-center")}>
          <BrandWordmark size={wordmarkSize} />
          {showTagline ? (
            <span
              className="mt-1 font-mono text-[0.5em] uppercase tracking-[0.22em] text-muted-foreground"
              style={{ fontSize: Math.max(9, wordmarkSize * 0.32) }}
            >
              {tagline}
            </span>
          ) : null}
        </div>
      </div>
    );
  },
);
BrandLockup.displayName = "BrandLockup";
