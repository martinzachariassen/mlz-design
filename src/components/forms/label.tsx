import * as React from "react";
import { cn } from "../../lib/cn";

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

/**
 * A field label in the mlz eyebrow voice — mono, uppercase, wide-tracked. Wire it
 * to its control with `htmlFor`; when the control is a `peer`, the label dims
 * along with it as the field goes disabled.
 */
export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => (
    // biome-ignore lint/a11y/noLabelWithoutControl: label is associated via htmlFor by the consumer
    <label
      ref={ref}
      className={cn(
        "font-mono text-xs uppercase tracking-[0.1em] text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className,
      )}
      {...props}
    />
  ),
);
Label.displayName = "Label";
