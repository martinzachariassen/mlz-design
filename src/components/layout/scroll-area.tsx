import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import * as React from "react";
import { cn } from "../../lib/cn";

export interface ScrollAreaProps
  extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> {
  /** Which axis gets a scrollbar. `vertical` by default. */
  orientation?: "vertical" | "horizontal" | "both";
  /** Classes for the scrolling viewport rather than the outer box. */
  viewportClassName?: string;
}

/**
 * A scrolling box with a scrollbar that matches the system instead of the OS.
 *
 * **This is the one Radix primitive here that overlaps something the browser
 * already does**, so the reasoning matters. It does not replace scrolling —
 * the viewport underneath is ordinary `overflow: auto`, so wheel, trackpad,
 * touch, keyboard, scroll-anchoring and find-in-page all behave natively. What
 * it replaces is the *scrollbar's appearance*, which otherwise ranges from a
 * heavy grey slab on Windows to nothing at all on macOS until you scroll.
 *
 * **So use it only where the scrollbar itself is part of the design** — a
 * bounded panel, a command list, a sidebar — and where its absence would leave
 * a reader unaware there is more. **Don't wrap the page in one**: the browser's
 * own scrollbar carries position and length information the OS expects to
 * provide, and taking it over on the document breaks scroll-restoration and
 * overscroll behaviour.
 *
 * ```tsx
 * <ScrollArea className="h-64 rounded-[var(--radius-md)] border border-border">
 *   <div className="p-4">…</div>
 * </ScrollArea>
 * ```
 */
export const ScrollArea = React.forwardRef<
  React.ComponentRef<typeof ScrollAreaPrimitive.Root>,
  ScrollAreaProps
>(({ className, viewportClassName, orientation = "vertical", children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    data-slot="scroll-area"
    className={cn("relative overflow-hidden", className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport
      data-slot="scroll-area-viewport"
      // A scrollable box must be reachable by keyboard (WCAG 2.1.1, axe's
      // `scrollable-region-focusable`), or someone who can't drag simply can't
      // reach the rest of the content. Radix does not add this itself. Same
      // reasoning — and the same deliberate absence of `role="region"`, which
      // would be an unnamed landmark — as `Table` and `CodeBlock`.
      tabIndex={0}
      className={cn(
        "size-full rounded-[inherit] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30",
        viewportClassName,
      )}
    >
      {children}
    </ScrollAreaPrimitive.Viewport>
    {orientation !== "horizontal" ? <ScrollBar orientation="vertical" /> : null}
    {orientation !== "vertical" ? <ScrollBar orientation="horizontal" /> : null}
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
));
ScrollArea.displayName = "ScrollArea";

export type ScrollBarProps = React.ComponentPropsWithoutRef<
  typeof ScrollAreaPrimitive.ScrollAreaScrollbar
>;

/**
 * The bar itself. `ScrollArea` renders these for you from `orientation`; reach
 * for it directly only when you need a differently styled bar on one axis.
 */
export const ScrollBar = React.forwardRef<
  React.ComponentRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  ScrollBarProps
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    data-slot="scroll-bar"
    className={cn(
      "flex touch-none select-none p-0.5 transition-colors",
      orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent",
      orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent",
      className,
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb
      data-slot="scroll-bar-thumb"
      className="relative flex-1 rounded-full bg-border transition-colors hover:bg-muted-foreground"
    />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
));
ScrollBar.displayName = "ScrollBar";
