import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "../../lib/cn";

const badgeVariants = /* @__PURE__ */ cva(
  "inline-flex items-center rounded-[var(--radius-sm)] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        accent: "bg-accent text-accent-foreground",
        outline: "border border-border text-foreground",
        muted: "bg-muted text-muted-foreground",
        destructive: "bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  /** Render the single child instead of a `<span>` — e.g. a link for a tag chip. */
  asChild?: boolean;
}

/**
 * A small mono chip for status, versions and categories — the tracked-out
 * uppercase label that sits next to a title. It's a plain `<span>` with no
 * semantics of its own, so put the meaning in the text, not the colour alone.
 *
 * **Use a badge** for a stable attribute of the thing beside it — a category, a
 * version, a tag. **Reach for `StatusDot`** when the value is live and changes
 * (online/offline, build state), and for `Callout` or `Alert` when it's
 * something the reader has to act on. A badge is a label, not a notification.
 */
export function Badge({ className, variant, asChild, ...props }: BadgeProps) {
  const Comp = asChild ? Slot : "span";
  return <Comp className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { badgeVariants };
