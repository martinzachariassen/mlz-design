import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../lib/cn";

/**
 * A rotating ring built from a bordered circle with a transparent top segment.
 * Inherits `currentColor` (accent by default); stops spinning under
 * `prefers-reduced-motion`.
 */
const spinnerVariants = cva(
  "inline-block animate-spin rounded-full border-current border-t-transparent text-accent motion-reduce:animate-none",
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
  label?: string;
}

export const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size, label = "Loading", ...props }, ref) => (
    <div
      ref={ref}
      role="status"
      aria-label={label}
      className={cn(spinnerVariants({ size }), className)}
      {...props}
    />
  ),
);
Spinner.displayName = "Spinner";

export { spinnerVariants };
