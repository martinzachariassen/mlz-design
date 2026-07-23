import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../lib/cn";

/**
 * The MLZ monogram: a tight ink tile carrying a geometric `M` with a terminal
 * caret — the engineering-notebook / cyberpunk-prompt nod that backs the favicon
 * and social cards. Drawn as pure SVG so it stays crisp from a 16px favicon up to
 * a 1200px OG image.
 *
 * Colours read from semantic tokens, so the mark inverts with the theme and
 * adopts the active `data-accent` family for free. For a *static* asset (a
 * favicon file, an email), pass fixed brand colours via `tile` / `glyph` /
 * `accent` — see the Foundations → Favicon story for the export recipe.
 */
const brandMarkVariants = cva("inline-block shrink-0 align-middle", {
  variants: {
    variant: {
      /** Ink tile + inset glyph — the app/favicon icon. */
      tile: "",
      /** Just the letterform in `currentColor` — for inline/wordmark use. */
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
  /** Caret colour. Defaults to the active accent. */
  accent?: string;
  /** Show the terminal caret block. */
  caret?: boolean;
}

export const BrandMark = React.forwardRef<SVGSVGElement, BrandMarkProps>(
  (
    {
      variant = "tile",
      size = 32,
      tile = "var(--foreground)",
      glyph,
      accent = "var(--accent)",
      caret = true,
      className,
      ...props
    },
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
        <path
          d="M9 22.5 V10 L16 18.5 L23 10 V22.5"
          stroke={letter}
          strokeWidth={2.6}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {caret && <rect x="24" y="19" width="3.4" height="3.4" rx="0.6" fill={accent} />}
      </svg>
    );
  },
);
BrandMark.displayName = "BrandMark";

/**
 * The horizontal logo lockup: the mark beside the wordmark. `mlz` sits in the
 * hand display face with a mono, wide-tracked kicker beneath — the mlz.no
 * signature pairing. Use it for app headers, docs, and the OG card.
 */
export interface BrandLockupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The kicker line under the wordmark. */
  tagline?: string;
  /** Mark size in px; the wordmark scales with it. */
  size?: number;
}

export const BrandLockup = React.forwardRef<HTMLDivElement, BrandLockupProps>(
  ({ tagline = "Design System", size = 40, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("inline-flex items-center gap-3 text-foreground", className)}
      {...props}
    >
      <BrandMark size={size} />
      <div className="flex flex-col leading-none">
        <span className="font-hand lowercase leading-none" style={{ fontSize: size * 0.72 }}>
          mlz
        </span>
        {tagline ? (
          <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            {tagline}
          </span>
        ) : null}
      </div>
    </div>
  ),
);
BrandLockup.displayName = "BrandLockup";
