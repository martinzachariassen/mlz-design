import * as React from "react";
import { cn } from "../lib/cn";

export type KbdProps = React.HTMLAttributes<HTMLElement>;

/** An inline keyboard key: mono, hairline-bordered, muted chip. */
export const Kbd = React.forwardRef<HTMLElement, KbdProps>(({ className, ...props }, ref) => (
  <kbd
    ref={ref}
    className={cn(
      "inline-flex min-w-6 items-center justify-center rounded-[var(--radius-sm)] border border-border bg-muted px-1.5 py-0.5 font-mono text-[11px] leading-none text-muted-foreground",
      className,
    )}
    {...props}
  />
));
Kbd.displayName = "Kbd";
