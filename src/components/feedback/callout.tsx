import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/cn";
import { named } from "../../lib/named";
import { StatusDot, type StatusDotProps } from "../data-display/status-dot";

const calloutVariants = /* @__PURE__ */ cva("flex gap-2.5 text-sm text-muted-foreground", {
  variants: {
    variant: {
      success: "",
      warning: "",
      destructive: "",
      info: "",
      accent: "",
      muted: "",
    },
  },
  defaultVariants: { variant: "muted" },
});

export interface CalloutProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof calloutVariants> {
  /** The headline — the finding itself, in full-strength foreground. */
  title: React.ReactNode;
  /** Optional muted line under the title with the detail. */
  description?: React.ReactNode;
  /** Add a pulsing ring to the leading dot. */
  pulse?: boolean;
}

/**
 * A compact, dot-led inline note — lighter than `Alert`. A leading `StatusDot`
 * carries the severity colour, followed by a bold title and an optional muted
 * description. Ideal for dense lists of findings/checks where a full bordered
 * `Alert` panel per row would be too heavy.
 *
 * ```tsx
 * <Callout variant="success" title="No DNS leak detected" />
 * <Callout variant="warning" title="VPN likely" description="Hosting ASN in use." />
 * ```
 */
export const Callout = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<HTMLDivElement, CalloutProps>(
    ({ variant, title, description, pulse, className, children, ...props }, ref) => (
      <div
        ref={ref}
        data-slot="callout"
        className={cn(calloutVariants({ variant }), className)}
        {...props}
      >
        <StatusDot variant={variant as StatusDotProps["variant"]} pulse={pulse} className="mt-1" />
        <div className="min-w-0">
          <p className="font-medium text-foreground">{title}</p>
          {description ? (
            <p className="mt-0.5 text-[0.92em] text-muted-foreground">{description}</p>
          ) : null}
          {children}
        </div>
      </div>
    ),
  ),
  "Callout",
);

export { calloutVariants };
