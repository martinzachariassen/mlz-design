import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/cn";
import { named } from "../../lib/named";

const statusDotVariants = /* @__PURE__ */ cva("relative inline-flex size-2 shrink-0", {
  variants: {
    variant: {
      success: "text-success-deep",
      warning: "text-warning-deep",
      destructive: "text-destructive-deep",
      info: "text-info-deep",
      accent: "text-accent-deep",
      muted: "text-muted-foreground",
    },
  },
  defaultVariants: { variant: "muted" },
});

export interface StatusDotProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusDotVariants> {
  /** Add a soft pulsing ring in the dot's colour to signal live/active state. */
  pulse?: boolean;
  /** Accessible label. When set, the dot is exposed to assistive tech. */
  label?: string;
}

/**
 * A small status dot — a filled circle that carries a semantic colour and, when
 * `pulse` is set, a soft breathing ring in the same colour (via `animate-ping`
 * on a matched overlay). The fill uses `bg-current` so the colour is set once by
 * the variant's `text-*` and the ring tracks it automatically.
 *
 * Decorative by default (`aria-hidden`) — colour alone never carries meaning, so
 * pair it with text. When the dot *is* the whole message, give it a `label` and
 * it becomes a named `role="img"`.
 *
 * ```tsx
 * <StatusDot variant="success" />
 * <StatusDot variant="destructive" pulse />
 * ```
 */
export const StatusDot = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<HTMLSpanElement, StatusDotProps>(
    ({ variant, pulse, label, className, ...props }, ref) => {
      const a11y = label
        ? ({ role: "img", "aria-label": label } as const)
        : ({ "aria-hidden": true } as const);
      return (
        <span
          ref={ref}
          data-slot="status-dot"
          className={cn(statusDotVariants({ variant }), className)}
          {...a11y}
          {...props}
        >
          {pulse ? (
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-current opacity-60 motion-reduce:hidden" />
          ) : null}
          <span className="relative inline-flex size-full rounded-full bg-current" />
        </span>
      );
    },
  ),
  "StatusDot",
);

export { statusDotVariants };
