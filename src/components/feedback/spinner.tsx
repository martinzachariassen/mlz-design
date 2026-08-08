import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/cn";
import { named } from "../../lib/named";

const spinnerVariants = /* @__PURE__ */ cva(
  "inline-block animate-spin rounded-full border-current border-t-transparent text-accent-deep motion-reduce:animate-none",
  {
    variants: {
      size: {
        sm: "size-4 border-2",
        default: "size-6 border-2",
        lg: "size-8 border-[3px]",
      },
    },
    defaultVariants: { size: "default" },
  },
);

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {
  /** Accessible name announced by screen readers. */
  label?: string;
}

/**
 * An indeterminate loading ring — a bordered circle with a transparent top
 * segment, spun with `animate-spin`. Inherits `currentColor` (accent by default)
 * so it recolours by dropping a `text-*` class on it, and stops spinning under
 * `prefers-reduced-motion`. It's a live `role="status"`; reach for `Progress`
 * instead when you know how far along the work is.
 */
export const Spinner = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<HTMLDivElement, SpinnerProps>(
    ({ className, size, label = "Loading", ...props }, ref) => (
      <div
        ref={ref}
        role="status"
        aria-label={label}
        className={cn(spinnerVariants({ size }), className)}
        {...props}
      />
    ),
  ),
  "Spinner",
);

export { spinnerVariants };
