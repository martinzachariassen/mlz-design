import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/cn";

const cardVariants = cva(
  "rounded-[var(--radius-lg)] text-card-foreground transition-[transform,box-shadow,border-color] duration-200 ease-[var(--ease-out)]",
  {
    variants: {
      variant: {
        default: "border border-border bg-card",
        elevated: "border border-border bg-card shadow-[var(--shadow-md)]",
        interactive:
          "border border-border bg-card hover:-translate-x-0.5 hover:-translate-y-0.5 hover:border-accent hover:shadow-[6px_6px_0_0_var(--accent)] focus-within:-translate-x-0.5 focus-within:-translate-y-0.5 focus-within:border-accent focus-within:shadow-[6px_6px_0_0_var(--accent)]",
        accent:
          "border border-[color-mix(in_oklch,var(--accent)_45%,var(--border))] bg-accent-subtle",
        ghost: "border border-transparent bg-transparent",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  /**
   * Render the single child instead of a `<div>`. Handy for a whole-card link or
   * an `<article>`/`<section>` that should carry the card's surface styling.
   */
  asChild?: boolean;
}

/**
 * Paper-look surfaces: elevation is a hairline border, never a heavy drop shadow.
 * Composed the shadcn way — Card + Header/Title/Description/Action/Content/Footer,
 * each tagged with a `data-slot` so consumers can target parts.
 *
 * `variant` covers the common surfaces:
 *
 * - **default** — hairline border on card paper; the workhorse.
 * - **elevated** — adds the soft, warm-tinted shadow token (a hint, not a lift).
 * - **interactive** — the mlz signature: lifts on hover with an offset accent
 *   shadow. Use for whole-card links/buttons, with an inner `<a>` that stretches
 *   over the card via `after:absolute after:inset-0`.
 * - **accent** — an accent-subtle wash inside an accent-tinted border, for callouts.
 * - **ghost** — no border or background, for nesting inside another surface.
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        ref={ref}
        data-slot="card"
        className={cn(cardVariants({ variant }), className)}
        {...props}
      />
    );
  },
);
Card.displayName = "Card";

/**
 * The card's top block — title, description, and an optional `CardAction`. It's a
 * grid that grows a second column the moment a `CardAction` is present.
 */
export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card-header"
      className={cn(
        "grid auto-rows-min items-start gap-1.5 p-5 has-[[data-slot=card-action]]:grid-cols-[1fr_auto]",
        className,
      )}
      {...props}
    />
  ),
);
CardHeader.displayName = "CardHeader";

/**
 * The card's heading in tracked-out mono. It's an unopinionated `<div>` — wrap it
 * in (or render it as) the right heading level for the page's outline.
 */
export const CardTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card-title"
      className={cn(
        "font-mono text-sm font-bold uppercase tracking-[0.1em] text-foreground",
        className,
      )}
      {...props}
    />
  ),
);
CardTitle.displayName = "CardTitle";

/** The muted supporting paragraph under `CardTitle`. */
export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    data-slot="card-description"
    className={cn("text-sm leading-relaxed text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

/** Top-right slot in the header (menu button, badge, switch…). */
export const CardAction = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card-action"
      className={cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className)}
      {...props}
    />
  ),
);
CardAction.displayName = "CardAction";

/** The card's body — padded to match the header, with the top padding removed. */
export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} data-slot="card-content" className={cn("p-5 pt-0", className)} {...props} />
  ),
);
CardContent.displayName = "CardContent";

/** The bottom row, for actions. A flex row — set your own `gap`. */
export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card-footer"
      className={cn("flex items-center p-5 pt-0", className)}
      {...props}
    />
  ),
);
CardFooter.displayName = "CardFooter";

export { cardVariants };
