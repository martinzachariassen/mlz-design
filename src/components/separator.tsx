import * as React from "react";
import { cn } from "../lib/cn";

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
  label?: React.ReactNode;
}

/**
 * A hairline rule. Purely decorative by default (`aria-hidden`); pass
 * `decorative={false}` for a real `role="separator"`. A horizontal rule can
 * carry a centered mono label that splits the line.
 */
export const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  ({ className, orientation = "horizontal", decorative = true, label, ...props }, ref) => {
    const semantics = decorative
      ? { "aria-hidden": true }
      : { role: "separator", "aria-orientation": orientation };

    if (label != null && orientation === "horizontal") {
      return (
        <div
          ref={ref}
          {...semantics}
          className={cn("flex w-full items-center gap-3", className)}
          {...props}
        >
          <span className="h-px flex-1 bg-border" />
          <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            {label}
          </span>
          <span className="h-px flex-1 bg-border" />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        {...semantics}
        className={cn(
          "shrink-0 bg-border",
          orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
          className,
        )}
        {...props}
      />
    );
  },
);
Separator.displayName = "Separator";
