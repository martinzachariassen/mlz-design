import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/cn";
import { named } from "../../lib/named";

// `-deep`, not the plain signals: these are 12px text, and on paper `--success`
// measures 3.1:1 — the solids are fill colours. See the signal block in
// theme.css.
const deltaVariants = /* @__PURE__ */ cva("font-mono text-xs tabular-nums", {
  variants: {
    direction: {
      up: "text-[var(--success-deep)]",
      down: "text-[var(--destructive-deep)]",
      flat: "text-muted-foreground",
    },
  },
  defaultVariants: { direction: "flat" },
});

/**
 * A single headline number with its label — the unit a metrics row is built
 * from. Deploys, coverage, uptime, revenue.
 *
 * The label comes first in the DOM and reads first to a screen reader, which is
 * the right order: "94%" means nothing until you know it is coverage. Visually
 * the number still dominates.
 *
 * **Use it for one measurement.** **Reach for `DataList`** when you have several
 * facts about *one* thing — a `<dl>` of key/value rows is the honest markup for
 * that, and stacking eight `Stat`s makes everything look equally important.
 * **Reach for `Progress`** when the number is a fraction of a known whole and
 * the bar is the point; the two compose well, with the bar under the number.
 *
 * ```tsx
 * <Stat>
 *   <StatLabel>Coverage</StatLabel>
 *   <StatValue>94%</StatValue>
 *   <StatDelta direction="up">+2.1 since last release</StatDelta>
 * </Stat>
 * ```
 */
export const Stat = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
      <div ref={ref} data-slot="stat" className={cn("flex flex-col gap-1", className)} {...props} />
    ),
  ),
  "Stat",
);

/** What is being measured, in the tracked-out mono eyebrow voice. */
export const StatLabel = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
  >(({ className, ...props }, ref) => (
    <p
      ref={ref}
      data-slot="stat-label"
      className={cn(
        "font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground",
        className,
      )}
      {...props}
    />
  )),
  "StatLabel",
);

/**
 * The number itself. `tabular-nums` is on, so a value that ticks live doesn't
 * make the row jitter as digit widths change.
 */
export const StatValue = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
  >(({ className, ...props }, ref) => (
    <p
      ref={ref}
      data-slot="stat-value"
      className={cn("font-grotesk text-3xl font-bold tabular-nums tracking-tight", className)}
      {...props}
    />
  )),
  "StatValue",
);

export interface StatDeltaProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof deltaVariants> {}

/**
 * The change since last time. **`direction` is about the number, not about
 * whether the news is good** — but the colours say good and bad, so for a metric
 * where falling is a win (error rate, latency, bundle size) pass the direction
 * that matches the *meaning*, and put the arrow in your own text.
 *
 * Never let the colour carry the message on its own: write the change out.
 */
export const StatDelta = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<HTMLParagraphElement, StatDeltaProps>(
    ({ className, direction, ...props }, ref) => (
      <p
        ref={ref}
        data-slot="stat-delta"
        className={cn(deltaVariants({ direction }), className)}
        {...props}
      />
    ),
  ),
  "StatDelta",
);

export { deltaVariants as statDeltaVariants };
