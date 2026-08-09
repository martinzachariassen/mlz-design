import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/cn";
import { named } from "../../lib/named";
import { StatusDot, type StatusDotProps } from "./status-dot";

/**
 * The wash and the hairline are both drawn from the same fill role: `bg-*-subtle`
 * is a ~12–16% mix over the page, and the border is a 40% mix that reads as a
 * tinted hairline rather than an outline. Both are surface positions, so the fill
 * rung is the right one here — the dot inside takes `-deep` via `StatusDot`.
 */
const statusChipVariants = /* @__PURE__ */ cva(
  "inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-3 py-1.5 font-sans text-sm leading-none transition-colors",
  {
    variants: {
      variant: {
        success:
          "border-[color-mix(in_oklch,var(--success)_40%,transparent)] bg-success-subtle text-foreground",
        warning:
          "border-[color-mix(in_oklch,var(--warning)_46%,transparent)] bg-warning-subtle text-foreground",
        destructive:
          "border-[color-mix(in_oklch,var(--destructive)_40%,transparent)] bg-destructive-subtle text-foreground",
        info: "border-[color-mix(in_oklch,var(--info)_36%,transparent)] bg-info-subtle text-foreground",
        accent:
          "border-[color-mix(in_oklch,var(--accent)_40%,transparent)] bg-accent-subtle text-foreground",
        muted: "border-border bg-card text-muted-foreground",
      },
    },
    defaultVariants: { variant: "muted" },
  },
);

export interface StatusChipProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusChipVariants> {
  /** Show the leading `StatusDot`. Turn it off for a chip that is pure label. */
  dot?: boolean;
  /** Pulse the leading dot, for a state that is being measured right now. */
  pulse?: boolean;
}

/**
 * A dot-led pill for one live finding, written the way you'd say it: sentence
 * case, in the reading face, on a tinted wash. The status stripe across the top
 * of a diagnostic page is a row of these.
 *
 * **Reach for `Badge` instead** when the value is a stable attribute of the thing
 * beside it — a category, a version, a tag. A badge is tracked-out uppercase mono
 * because it's a *label*; a chip is a short sentence about state, so it stays in
 * `--font-sans` and normal case. **Reach for `StatusDot`** when the dot alone is
 * the whole message next to existing text, and for **`Callout` or `Alert`** when
 * the reader has to do something about it — a chip reports, it doesn't instruct.
 *
 * Colour never carries the meaning on its own: the wash is a tint of the same
 * role as the dot, and the text says which it is.
 *
 * There is no `asChild` here on purpose. A chip reports a reading; it is not a
 * control, and the dot it injects has nowhere to go inside someone else's
 * element. If you want a pill the reader can press — a filter, a toggle — that's
 * `Toggle`, which is built to be one.
 *
 * ```tsx
 * <StatusChip variant="success">No proxy or VPN detected</StatusChip>
 * <StatusChip variant="warning">Timezone differs from your IP</StatusChip>
 * <StatusChip variant="accent" pulse>Measuring…</StatusChip>
 * ```
 */
export const StatusChip = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<HTMLSpanElement, StatusChipProps>(
    ({ variant, dot = true, pulse, className, children, ...props }, ref) => (
      <span
        ref={ref}
        data-slot="status-chip"
        className={cn(statusChipVariants({ variant }), className)}
        {...props}
      >
        {dot ? (
          <StatusDot
            variant={variant as StatusDotProps["variant"]}
            pulse={pulse}
            className="size-1.5"
          />
        ) : null}
        {children}
      </span>
    ),
  ),
  "StatusChip",
);

export { statusChipVariants };
