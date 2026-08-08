import * as LabelPrimitive from "@radix-ui/react-label";
import * as React from "react";
import { cn } from "../../lib/cn";
import { named } from "../../lib/named";

export type LabelProps = React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>;

/**
 * A field label in the mlz eyebrow voice — mono, uppercase, wide-tracked. Wire it
 * to its control with `htmlFor`; when the control is a `peer`, the label dims
 * along with it as the field goes disabled.
 *
 * Built on the Radix label primitive, which stops a double-click on the label
 * from selecting its text — the browser default that makes rapid checkbox
 * toggling highlight everything instead.
 */
export const Label = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<React.ComponentRef<typeof LabelPrimitive.Root>, LabelProps>(
    ({ className, ...props }, ref) => (
      <LabelPrimitive.Root
        ref={ref}
        className={cn(
          "font-mono text-xs uppercase tracking-[0.1em] text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
          className,
        )}
        {...props}
      />
    ),
  ),
  "Label",
);
