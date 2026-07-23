import * as React from "react";
import { cn } from "../lib/cn";
import type { AccentName } from "../tokens";
import { BrandMark, BrandWordmark } from "./brand-mark";
import { FloatingMarks } from "./floating-marks";
import { GridBackground } from "./grid-background";

/**
 * A repository README banner — the wide, short header image that tops every MLZ
 * project's `README.md`. Built entirely from tokens so every repo wears the same
 * face; only the copy (project name, description, stack, install) changes per
 * project. Locked to a **3.76:1** ratio (1280×340) that reads well at GitHub's
 * ~896px rendered README width; `width` scales the whole banner as one.
 *
 * Four layouts share the same engineering-notebook frame:
 * - `standard` — left-weighted lockup + statement + stack; the default.
 * - `minimal` — centred, symmetric; good for libraries and small repos.
 * - `terminal` — a mono command-prompt, the install line front and centre.
 * - `split` — an ink brand panel beside a paper content panel.
 *
 * Snapshot it (Satori / `@vercel/og`, or a 2× browser capture) to a PNG and drop
 * it at the top of the README. For light + dark, capture once plain and once
 * inside a `.dark` wrapper, then swap with a `<picture>` `prefers-color-scheme`.
 */
export interface RepoBannerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** The project name — the headline, paired with the `mlz.` wordmark. */
  project: React.ReactNode;
  /** Small kicker above/around the name. */
  eyebrow?: string;
  /** One-line description under the name. */
  description?: React.ReactNode;
  /** Stack / tag chips (e.g. `["React", "Tailwind v4", "SwiftUI"]`). */
  badges?: string[];
  /** Install / run command, shown mono (prominent in `terminal`). */
  install?: string;
  /** Footer-right meta — a repo path or domain. */
  footer?: string;
  /** Pin to one accent family regardless of the ambient one. */
  accent?: AccentName;
  /** Layout preset. */
  layout?: "standard" | "minimal" | "terminal" | "split";
  /** Rendered width in px; height follows the 1280×340 ratio. */
  width?: number;
  /** Show the drifting sketch marks. */
  marks?: boolean;
}

const BASE_W = 1280;
const BASE_H = 340;

/** Mono, wide-tracked stack chip. */
function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-[var(--radius-sm)] border border-border bg-card/60 px-[0.7em] py-[0.35em] font-mono text-[0.62em] uppercase tracking-[0.16em] text-muted-foreground">
      {children}
    </span>
  );
}

function Lockup({ size }: { size: number }) {
  return (
    <span className="inline-flex items-center" style={{ gap: size * 0.32 }}>
      <BrandMark size={size} />
      <BrandWordmark size={size / 1.45} />
    </span>
  );
}

export const RepoBanner = React.forwardRef<HTMLDivElement, RepoBannerProps>(
  (
    {
      project,
      eyebrow = "MLZ · Design System",
      description,
      badges,
      install,
      footer = "github.com/martinzachariassen",
      accent,
      layout = "standard",
      width = BASE_W,
      marks = true,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const scale = width / BASE_W;
    const split = layout === "split";

    const cornerMark = (position: string) => (
      <span aria-hidden className={cn("absolute h-[1.4em] w-[1.4em] border-accent", position)} />
    );

    const Name = ({ className: c }: { className?: string }) => (
      <h1
        className={cn(
          "font-grotesk font-bold leading-[0.95] tracking-[-0.02em] text-foreground",
          c,
        )}
      >
        {project}
      </h1>
    );

    return (
      <div
        ref={ref}
        data-accent={accent}
        className={cn(
          "relative isolate flex overflow-hidden bg-background text-foreground",
          className,
        )}
        style={{ width, height: BASE_H * scale, fontSize: `${16 * scale}px`, ...style }}
        {...props}
      >
        {!split && <GridBackground cell={38} />}
        {!split && marks && layout !== "minimal" && (
          <FloatingMarks count={7} className="opacity-35" />
        )}

        {/* Inset engineering frame + corner registration marks (all but split) */}
        {!split && (
          <>
            <div className="pointer-events-none absolute inset-[1.4em] border border-border/70" />
            {cornerMark("top-[1.4em] left-[1.4em] border-t-2 border-l-2")}
            {cornerMark("top-[1.4em] right-[1.4em] border-t-2 border-r-2")}
            {cornerMark("bottom-[1.4em] left-[1.4em] border-b-2 border-l-2")}
            {cornerMark("bottom-[1.4em] right-[1.4em] border-b-2 border-r-2")}
          </>
        )}

        {/* ── standard ──────────────────────────────────────────────── */}
        {layout === "standard" && (
          <div className="relative flex h-full w-full flex-col justify-between p-[3.4em]">
            <div className="flex items-start justify-between">
              <Lockup size={2.6 * 16} />
              {badges?.length ? (
                <div className="flex flex-wrap justify-end gap-[0.5em]">
                  {badges.map((b) => (
                    <Badge key={b}>{b}</Badge>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="max-w-[78%]">
              {eyebrow ? (
                <p className="mb-[0.5em] font-mono text-[0.82em] uppercase tracking-[0.26em] text-muted-foreground">
                  {eyebrow}
                </p>
              ) : null}
              <Name className="text-[3.4em]" />
              {description ? (
                <p className="mt-[0.7em] max-w-[85%] font-mono text-[1.02em] leading-relaxed text-muted-foreground">
                  {description}
                </p>
              ) : null}
            </div>

            <div className="flex items-center justify-between font-mono text-[0.8em]">
              {install ? (
                <span className="inline-flex items-center gap-[0.6em] rounded-[var(--radius-sm)] border border-border bg-card px-[0.9em] py-[0.5em] text-foreground">
                  <span className="text-brand-period">$</span>
                  {install}
                </span>
              ) : (
                <span />
              )}
              <span className="inline-flex items-center gap-[0.6em] uppercase tracking-[0.18em] text-muted-foreground">
                <span className="inline-block size-[0.5em] bg-accent" aria-hidden />
                {footer}
              </span>
            </div>
          </div>
        )}

        {/* ── minimal ───────────────────────────────────────────────── */}
        {layout === "minimal" && (
          <div className="relative flex h-full w-full flex-col items-center justify-center gap-[0.9em] p-[3.4em] text-center">
            <BrandMark size={3.4 * 16} />
            <div className="flex items-baseline gap-[0.5em]">
              <BrandWordmark size={2.1 * 16} />
              <Name className="text-[2.3em]" />
            </div>
            {description ? (
              <p className="max-w-[70%] font-mono text-[0.95em] leading-relaxed text-muted-foreground">
                {description}
              </p>
            ) : null}
            {badges?.length ? (
              <div className="mt-[0.3em] flex flex-wrap justify-center gap-[0.5em]">
                {badges.map((b) => (
                  <Badge key={b}>{b}</Badge>
                ))}
              </div>
            ) : null}
          </div>
        )}

        {/* ── terminal ──────────────────────────────────────────────── */}
        {layout === "terminal" && (
          <div className="relative flex h-full w-full items-center gap-[2.4em] p-[3.4em]">
            <BrandMark size={4.4 * 16} className="shrink-0" />
            <div className="min-w-0 flex-1 font-mono text-[1em] leading-[1.9]">
              <div className="flex items-baseline gap-[0.5em]">
                <BrandWordmark size={2.4 * 16} />
                <Name className="text-[1.7em]" />
              </div>
              <p className="mt-[0.4em] text-[0.95em] text-muted-foreground">
                <span className="text-brand-period">~ %</span>{" "}
                {install ?? "bun add @martinzachariassen/design"}
                <span
                  className="ml-[0.15em] inline-block h-[1.05em] w-[0.55em] translate-y-[0.15em] animate-blink bg-accent align-middle"
                  aria-hidden
                />
              </p>
              {description ? (
                <p className="text-[0.9em] text-muted-foreground">
                  <span className="text-muted-foreground/60"># </span>
                  {description}
                </p>
              ) : null}
              {badges?.length ? (
                <div className="mt-[0.5em] flex flex-wrap gap-[0.5em]">
                  {badges.map((b) => (
                    <Badge key={b}>{b}</Badge>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        )}

        {/* ── split ─────────────────────────────────────────────────── */}
        {layout === "split" && (
          <>
            <div
              className="relative flex w-[36%] flex-col items-center justify-center gap-[1em]"
              style={{ background: "var(--foreground)", color: "var(--background)" }}
            >
              <GridBackground cell={30} className="opacity-40" />
              <BrandMark size={4.6 * 16} variant="glyph" glyph="var(--background)" />
              <BrandWordmark
                size={2.2 * 16}
                period="var(--accent)"
                style={{ color: "var(--background)" }}
              />
            </div>
            <div className="relative flex flex-1 flex-col justify-center gap-[0.6em] p-[3.2em]">
              {eyebrow ? (
                <p className="font-mono text-[0.8em] uppercase tracking-[0.26em] text-muted-foreground">
                  {eyebrow}
                </p>
              ) : null}
              <Name className="text-[3em]" />
              {description ? (
                <p className="max-w-[92%] font-mono text-[0.98em] leading-relaxed text-muted-foreground">
                  {description}
                </p>
              ) : null}
              {badges?.length ? (
                <div className="mt-[0.4em] flex flex-wrap gap-[0.5em]">
                  {badges.map((b) => (
                    <Badge key={b}>{b}</Badge>
                  ))}
                </div>
              ) : null}
              {install ? (
                <span className="mt-[0.5em] inline-flex w-fit items-center gap-[0.6em] rounded-[var(--radius-sm)] border border-border bg-card px-[0.9em] py-[0.5em] font-mono text-[0.8em] text-foreground">
                  <span className="text-brand-period">$</span>
                  {install}
                </span>
              ) : null}
            </div>
          </>
        )}
      </div>
    );
  },
);
RepoBanner.displayName = "RepoBanner";
