import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/cn";
import { named } from "../../lib/named";

const indicatorVariants = /* @__PURE__ */ cva(
  "h-full rounded-full transition-[width] duration-500 ease-[var(--ease-out)]",
  {
    variants: {
      variant: {
        default: "bg-primary",
        accent: "bg-accent",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface ProgressProps
  // `max` is omitted along with `value`: the bar is drawn from the clamped
  // percentage, so a caller-supplied `max` would make aria-valuemax disagree
  // with what's painted.
  extends Omit<React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>, "value" | "max">,
    VariantProps<typeof indicatorVariants> {
  /** Completion as a percentage, clamped to 0–100. */
  value?: number;
}

/**
 * A determinate progress bar: a muted track with a fill that eases to its new
 * width over 500ms. `value` is a percentage and is clamped to 0–100, so a stray
 * `120` can't overflow the track. Built on the Radix primitive, so it renders as
 * a `role="progressbar"` with the ARIA value attributes wired up — pass
 * `aria-label` (or `aria-labelledby`) when you have a real label, otherwise it
 * falls back to a generic "Progress".
 */
export const Progress = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<
    React.ComponentRef<typeof ProgressPrimitive.Root>,
    ProgressProps
  >(({ className, value = 0, variant, ...props }, ref) => {
    const pct = Math.min(100, Math.max(0, value));
    // A progressbar must carry an accessible name; fall back to a generic one
    // when the consumer hasn't supplied aria-label / aria-labelledby.
    const hasLabel = props["aria-label"] != null || props["aria-labelledby"] != null;
    return (
      <ProgressPrimitive.Root
        ref={ref}
        aria-label={hasLabel ? undefined : "Progress"}
        className={cn("h-2 w-full overflow-hidden rounded-full bg-muted", className)}
        {...props}
        // After the spread: the drawn width comes from the clamped percentage,
        // so value/max must not be overridable or ARIA and paint disagree.
        value={pct}
        max={100}
      >
        <ProgressPrimitive.Indicator
          className={cn(indicatorVariants({ variant }))}
          style={{ width: `${pct}%` }}
        />
      </ProgressPrimitive.Root>
    );
  }),
  "Progress",
);

export { indicatorVariants };
