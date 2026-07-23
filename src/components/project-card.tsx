import * as React from "react";
import { cn } from "../lib/cn";
import { Badge } from "./badge";
import { BrandMark } from "./brand-mark";
import { GridBackground } from "./grid-background";

/**
 * A portfolio project card — the mlz signature applied to work: a hairline surface
 * that lifts on hover with an offset accent shadow, a cover band, a grotesk title,
 * mono metadata and tag chips. Pass a `cover` (image, canvas, anything) or let it
 * fall back to the on-brand ruled-grid + monogram placeholder — no stock imagery.
 *
 *   default   vertical: cover on top, body below — drops into a `Grid`.
 *   featured   horizontal from `md` up (cover beside the body), larger — for the
 *              hero project at the top of a portfolio. Stacks on mobile.
 *
 * With `href`, the whole card becomes one link (the title anchor stretches over it).
 */
export interface ProjectCardProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Short tag chips (stack, role, category). */
  tags?: readonly string[];
  /** A mono eyebrow line — e.g. "2024 · Design system". */
  meta?: string;
  href?: string;
  /** Cover visual. Defaults to the brand grid + monogram placeholder. */
  cover?: React.ReactNode;
  /** Horizontal, larger layout from `md` up. */
  featured?: boolean;
  /** Link label. */
  cta?: string;
}

function DefaultCover() {
  return (
    <div className="relative flex size-full items-center justify-center overflow-hidden bg-[color-mix(in_oklch,var(--accent)_10%,var(--card))]">
      <GridBackground cell={22} />
      <BrandMark
        variant="glyph"
        size={44}
        className="relative text-[color-mix(in_oklch,var(--accent)_65%,var(--foreground))]"
      />
    </div>
  );
}

export const ProjectCard = React.forwardRef<HTMLElement, ProjectCardProps>(
  (
    {
      className,
      title,
      description,
      tags,
      meta,
      href,
      cover,
      featured = false,
      cta = "View project",
      ...props
    },
    ref,
  ) => {
    const titleId = React.useId();
    return (
      <article
        ref={ref}
        data-slot="project-card"
        aria-labelledby={titleId}
        className={cn(
          "group relative flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-border bg-card text-card-foreground transition-[transform,box-shadow,border-color] duration-200 ease-[var(--ease-out)]",
          "hover:-translate-x-0.5 hover:-translate-y-0.5 hover:border-accent hover:shadow-[6px_6px_0_0_var(--accent)]",
          "focus-within:-translate-x-0.5 focus-within:-translate-y-0.5 focus-within:border-accent focus-within:shadow-[6px_6px_0_0_var(--accent)]",
          featured && "md:grid md:grid-cols-2 md:items-stretch",
          className,
        )}
        {...props}
      >
        <div
          className={cn(
            "relative shrink-0 border-b border-border",
            featured ? "aspect-[16/10] md:aspect-auto md:border-r md:border-b-0" : "aspect-[16/10]",
          )}
        >
          {cover ?? <DefaultCover />}
        </div>

        <div
          className={cn("flex flex-1 flex-col gap-3 p-5", featured && "md:justify-center md:p-8")}
        >
          {meta ? (
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              {meta}
            </p>
          ) : null}

          <h3
            id={titleId}
            className={cn(
              "font-grotesk font-bold leading-tight tracking-tight text-foreground",
              featured ? "text-2xl md:text-3xl" : "text-xl",
            )}
          >
            {href ? (
              <a
                href={href}
                className="outline-none after:absolute after:inset-0 after:content-[''] focus-visible:underline focus-visible:decoration-accent focus-visible:underline-offset-4"
              >
                {title}
              </a>
            ) : (
              title
            )}
          </h3>

          {description ? (
            <p
              className={cn(
                "text-sm leading-relaxed text-muted-foreground",
                featured ? "md:max-w-prose md:text-[15px]" : "line-clamp-3",
              )}
            >
              {description}
            </p>
          ) : null}

          {tags?.length ? (
            <div className="mt-1 flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          ) : null}

          {href ? (
            <span className="mt-2 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-foreground transition-colors group-hover:text-accent-deep">
              {cta}
              <span
                aria-hidden
                className="transition-transform duration-200 ease-[var(--ease-out)] group-hover:translate-x-0.5"
              >
                →
              </span>
            </span>
          ) : null}
        </div>
      </article>
    );
  },
);
ProjectCard.displayName = "ProjectCard";
