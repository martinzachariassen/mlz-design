import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/cn";

const indicatorVariants = cva(
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
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof indicatorVariants> {
  /** Completion as a percentage, clamped to 0–100. */
  value?: number;
}

/**
 * A determinate progress bar: a muted track with a fill that eases to its new
 * width over 500ms. `value` is a percentage and is clamped to 0–100, so a stray
 * `120` can't overflow the track. It renders as a `role="progressbar"` with the
 * ARIA value attributes wired up — pass `aria-label` (or `aria-labelledby`) when
 * you have a real label, otherwise it falls back to a generic "Progress".
 */
export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, variant, ...props }, ref) => {
    const pct = Math.min(100, Math.max(0, value));
    // A progressbar must carry an accessible name; fall back to a generic one
    // when the consumer hasn't supplied aria-label / aria-labelledby.
    const hasLabel = props["aria-label"] != null || props["aria-labelledby"] != null;
    return (
      <div
        ref={ref}
        role="progressbar"
        aria-label={hasLabel ? undefined : "Progress"}
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        className={cn("h-2 w-full overflow-hidden rounded-full bg-muted", className)}
        {...props}
      >
        <div className={cn(indicatorVariants({ variant }))} style={{ width: `${pct}%` }} />
      </div>
    );
  },
);
Progress.displayName = "Progress";

export { indicatorVariants };
