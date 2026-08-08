import * as React from "react";
import { cn } from "../../lib/cn";

export type KbdProps = React.HTMLAttributes<HTMLElement>;

/**
 * An inline keyboard key — a mono, hairline-bordered chip that sits in running
 * text: press <Kbd>⌘</Kbd><Kbd>K</Kbd> to search.
 *
 * **Use it for keys the reader is meant to press.** For a literal string they
 * should *type*, or for any other inline code, reach for a `<code>` element
 * inside `Prose` — `Kbd` renders a real `<kbd>`, and using it for non-keys tells
 * assistive tech the wrong thing.
 *
 * Write each key as its own `Kbd` rather than one chip holding a whole chord, so
 * the separator between them stays yours to style.
 *
 * ```tsx
 * <span className="flex items-center gap-1">
 *   <Kbd>⌘</Kbd>
 *   <Kbd>K</Kbd>
 * </span>
 * ```
 */
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
