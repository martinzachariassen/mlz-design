import * as React from "react";
import { cn } from "../lib/cn";

/**
 * Placeholder shimmer for loading states. The `animate-pulse-soft` token is
 * already `prefers-reduced-motion` guarded, so motion needs no extra handling.
 */
export const Skeleton = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("rounded-[var(--radius-sm)] bg-muted animate-pulse-soft", className)}
      {...props}
    />
  ),
);
Skeleton.displayName = "Skeleton";
