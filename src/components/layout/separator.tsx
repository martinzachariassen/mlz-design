import * as SeparatorPrimitive from "@radix-ui/react-separator";
import * as React from "react";
import { cn } from "../../lib/cn";

export interface SeparatorProps
  extends React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> {
  /** Horizontal fills its container's width; vertical fills its height (give the parent one). */
  orientation?: "horizontal" | "vertical";
  /** `true` (default) hides the rule from assistive tech. Set `false` when it genuinely divides sections. */
  decorative?: boolean;
  /** Optional mono label that splits a horizontal rule down the middle. */
  label?: React.ReactNode;
}

/**
 * A hairline rule on the Radix primitive. Purely decorative by default; pass
 * `decorative={false}` for a real `role="separator"` with the right
 * `aria-orientation`. A horizontal rule can carry a centered mono label that
 * splits the line.
 */
export const Separator = React.forwardRef<
  React.ComponentRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>(({ className, orientation = "horizontal", decorative = true, label, ...props }, ref) => {
  if (label != null && orientation === "horizontal") {
    return (
      <SeparatorPrimitive.Root
        ref={ref}
        orientation={orientation}
        decorative={decorative}
        // The label is part of the decoration, so a decorative rule hides it too.
        aria-hidden={decorative || undefined}
        className={cn("flex w-full items-center gap-3", className)}
        {...props}
      >
        <span className="h-px flex-1 bg-border" />
        <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
          {label}
        </span>
        <span className="h-px flex-1 bg-border" />
      </SeparatorPrimitive.Root>
    );
  }

  return (
    <SeparatorPrimitive.Root
      ref={ref}
      orientation={orientation}
      decorative={decorative}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className,
      )}
      {...props}
    />
  );
});
Separator.displayName = "Separator";
