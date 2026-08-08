import * as React from "react";
import { cn } from "../../lib/cn";
import { named } from "../../lib/named";

/**
 * Placeholder shimmer for loading states. The `animate-pulse-soft` token is
 * already `prefers-reduced-motion` guarded, so motion needs no extra handling.
 *
 * Three components cover loading; pick by what you know:
 *
 * - **`Skeleton`** — you know the *shape* of what's coming. Mirror the real
 *   layout so nothing jumps when content lands. Best for first page loads.
 * - **`Spinner`** — you know neither shape nor duration. Best inside a button
 *   or a small region after a user action.
 * - **`Progress`** — you know how far along it is. Anything else is a spinner
 *   wearing a bar.
 *
 * **Don't** animate a skeleton for sub-200ms waits; the flash reads as a glitch.
 */
export const Skeleton = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
      <div
        ref={ref}
        className={cn("rounded-[var(--radius-sm)] bg-muted animate-pulse-soft", className)}
        {...props}
      />
    ),
  ),
  "Skeleton",
);
