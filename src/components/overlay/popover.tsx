import * as PopoverPrimitive from "@radix-ui/react-popover";
import * as React from "react";
import { cn } from "../../lib/cn";

export type PopoverProps = React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Root>;

/**
 * A non-modal panel anchored to the thing that opened it — a filter menu, a
 * colour picker, a small form that would be too much for a tooltip and too
 * little for a dialog.
 *
 * Radix owns the behaviour: the panel portals out (so no ancestor
 * `overflow: hidden` can clip it), positions itself with collision detection,
 * light-dismisses on outside click or Esc, and returns focus to the trigger.
 * Unlike `Dialog` it does **not** trap focus or inert the page — the rest of the
 * app stays usable, which is the whole distinction.
 *
 * **Reach for `InfoTip`** when the content is a sentence of glossary help — it
 * is this primitive with a fixed inline trigger and a narrower API.
 * **Reach for `DropdownMenu`** when the contents are a list of actions; a menu
 * has roving focus and type-ahead that a popover deliberately doesn't.
 * **Reach for `Dialog`** when the task must be finished before anything else.
 *
 * Give `PopoverContent` an `aria-label`, or point it at a heading inside with
 * `aria-labelledby` — it renders as a `role="dialog"` and arrives unnamed
 * otherwise.
 *
 * ```tsx
 * <Popover>
 *   <PopoverTrigger asChild>
 *     <Button variant="ghost">Filters</Button>
 *   </PopoverTrigger>
 *   <PopoverContent aria-label="Filters">…</PopoverContent>
 * </Popover>
 * ```
 */
export function Popover(props: PopoverProps) {
  return <PopoverPrimitive.Root {...props} />;
}
Popover.displayName = "Popover";

/** The control that opens the popover. Use `asChild` to hand off to a `Button`. */
export const PopoverTrigger = PopoverPrimitive.Trigger;

/**
 * Anchor the panel to something other than the trigger — a whole input row, say,
 * while the trigger is only the little chevron at its end.
 */
export const PopoverAnchor = PopoverPrimitive.Anchor;

/** Closes the popover from inside it. `asChild` to wrap your own control. */
export const PopoverClose = PopoverPrimitive.Close;

export type PopoverContentProps = React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>;

/**
 * The floating panel. Defaults to opening below with an 8px gap and 8px of
 * viewport padding; `side` and `align` are *preferences* — collision handling
 * stays on, so it can never end up off-screen.
 */
export const PopoverContent = React.forwardRef<
  React.ComponentRef<typeof PopoverPrimitive.Content>,
  PopoverContentProps
>(({ className, align = "center", side = "bottom", sideOffset = 8, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      side={side}
      sideOffset={sideOffset}
      collisionPadding={8}
      data-slot="popover-content"
      className={cn(
        "z-50 w-72 max-w-[calc(100vw-1rem)] rounded-[var(--radius-lg)] border border-border bg-popover p-4 text-popover-foreground shadow-[var(--shadow-lg)] outline-none motion-safe:animate-rise",
        className,
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = "PopoverContent";
