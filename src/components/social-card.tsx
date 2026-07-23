import * as React from "react";
import { cn } from "../lib/cn";
import type { AccentName } from "../tokens";
import { BrandLockup } from "./brand-mark";
import { FloatingMarks } from "./floating-marks";
import { GridBackground } from "./grid-background";

/**
 * A ready-to-screenshot social / Open-Graph card at the canonical 1200×630, built
 * entirely from tokens so every app renders shares in the same voice. Compose it
 * in a route (or a Satori / `@vercel/og` template) and snapshot at 2× for retina.
 *
 * Layout: an engineering-notebook frame — hairline inset border, corner
 * registration marks, a faint ruled grid and drifting marks behind a left brand
 * lockup, a large grotesk headline, and a footer rule carrying the domain.
 *
 * `width` scales the whole card proportionally (height is locked to the 1.91:1
 * OG ratio) so it previews at any size without breaking the internal rhythm.
 */
export interface SocialCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** Headline — the one thing the card is about. */
  title: React.ReactNode;
  /** Mono kicker above the headline. */
  eyebrow?: string;
  /** Supporting line under the headline. */
  description?: React.ReactNode;
  /** Footer-left meta (domain, author…). */
  footer?: string;
  /** Small badge in the top-right (e.g. a section or tag). */
  tag?: string;
  /** Pin the card to one accent family regardless of the ambient one. */
  accent?: AccentName;
  /** Rendered width in px; height follows the 1200×630 ratio. */
  width?: number;
  /** Show the drifting sketch marks. */
  marks?: boolean;
}

const BASE_W = 1200;
const BASE_H = 630;

export const SocialCard = React.forwardRef<HTMLDivElement, SocialCardProps>(
  (
    {
      title,
      eyebrow = "Martin Zachariassen",
      description,
      footer = "mlz.no",
      tag,
      accent,
      width = BASE_W,
      marks = true,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    // Scale the internal 1200-unit design down to `width` via a single font-size
    // anchor: everything below is sized in `em`, so the whole card scales as one.
    const scale = width / BASE_W;
    const cornerMark = (position: string) => (
      <span aria-hidden className={cn("absolute h-[1.5em] w-[1.5em] border-accent", position)} />
    );

    return (
      <div
        ref={ref}
        data-accent={accent}
        className={cn("relative isolate overflow-hidden bg-background text-foreground", className)}
        style={{
          width,
          height: BASE_H * scale,
          fontSize: `${16 * scale}px`,
          ...style,
        }}
        {...props}
      >
        <GridBackground cell={40} />
        {marks && <FloatingMarks count={10} className="opacity-40" />}

        {/* Inset engineering frame + corner registration marks */}
        <div className="pointer-events-none absolute inset-[1.5em] border border-border/70" />
        {cornerMark("top-[1.5em] left-[1.5em] border-t-2 border-l-2")}
        {cornerMark("top-[1.5em] right-[1.5em] border-t-2 border-r-2")}
        {cornerMark("bottom-[1.5em] left-[1.5em] border-b-2 border-l-2")}
        {cornerMark("bottom-[1.5em] right-[1.5em] border-b-2 border-r-2")}

        <div className="relative flex h-full flex-col justify-between p-[4.5em]">
          <div className="flex items-start justify-between">
            <BrandLockup size={3.2 * 16} tagline="Design System" />
            {tag ? (
              <span className="rounded-[var(--radius-sm)] border border-border bg-card px-[0.9em] py-[0.4em] font-mono text-[0.72em] uppercase tracking-[0.16em] text-muted-foreground">
                {tag}
              </span>
            ) : null}
          </div>

          <div className="max-w-[85%]">
            {eyebrow ? (
              <p className="font-mono text-[0.9em] uppercase tracking-[0.28em] text-muted-foreground">
                {eyebrow}
              </p>
            ) : null}
            <h1 className="mt-[0.5em] font-grotesk text-[4.6em] font-bold leading-[0.98] tracking-[-0.02em] text-foreground">
              {title}
            </h1>
            {description ? (
              <p className="mt-[0.9em] max-w-[80%] font-mono text-[1.15em] leading-relaxed text-muted-foreground">
                {description}
              </p>
            ) : null}
          </div>

          <div className="flex items-center justify-between border-t border-border pt-[1.4em]">
            <span className="font-mono text-[0.95em] uppercase tracking-[0.2em] text-foreground">
              {footer}
            </span>
            <span className="flex items-center gap-[0.6em] font-mono text-[0.8em] uppercase tracking-[0.16em] text-muted-foreground">
              <span className="inline-block size-[0.6em] bg-accent" aria-hidden />
              open-graph · 1200×630
            </span>
          </div>
        </div>
      </div>
    );
  },
);
SocialCard.displayName = "SocialCard";
