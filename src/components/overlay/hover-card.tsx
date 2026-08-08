import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import * as React from "react";
import { cn } from "../../lib/cn";

export type HoverCardProps = React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Root>;

/**
 * A rich preview that appears on hover — a user card behind an @mention, a
 * repository summary behind a link.
 *
 * **It is an enhancement, never the only route to the information.** It opens
 * on hover and focus but not on click or touch, so anything only reachable this
 * way is unreachable on a phone. Everything inside must exist somewhere the
 * trigger leads.
 *
 * **Reach for `Tooltip`** when the content is a short line of text — a tooltip
 * attaches as the trigger's *description* and costs nothing. **Reach for
 * `Popover`** when the content has controls or the reader needs to keep it
 * open: a hover card closes the moment the pointer leaves, which makes it a
 * poor place to put a button.
 *
 * The default 700ms open delay is deliberate. Anything faster and cards flash
 * open as the pointer crosses a paragraph of links.
 *
 * ```tsx
 * <HoverCard>
 *   <HoverCardTrigger asChild><Link href="/martin">@martin</Link></HoverCardTrigger>
 *   <HoverCardContent>…</HoverCardContent>
 * </HoverCard>
 * ```
 */
export function HoverCard({ openDelay = 700, closeDelay = 200, ...props }: HoverCardProps) {
  return <HoverCardPrimitive.Root openDelay={openDelay} closeDelay={closeDelay} {...props} />;
}
HoverCard.displayName = "HoverCard";

/** What the card hangs off. Use `asChild` to keep it a real link. */
export const HoverCardTrigger = HoverCardPrimitive.Trigger;

export type HoverCardContentProps = React.ComponentPropsWithoutRef<
  typeof HoverCardPrimitive.Content
>;

/**
 * The floating card. Portals out and positions with collision detection, so no
 * ancestor `overflow: hidden` can clip it and it can't leave the viewport.
 */
export const HoverCardContent = React.forwardRef<
  React.ComponentRef<typeof HoverCardPrimitive.Content>,
  HoverCardContentProps
>(({ className, align = "center", side = "bottom", sideOffset = 8, ...props }, ref) => (
  <HoverCardPrimitive.Portal>
    <HoverCardPrimitive.Content
      ref={ref}
      align={align}
      side={side}
      sideOffset={sideOffset}
      collisionPadding={8}
      data-slot="hover-card-content"
      className={cn(
        "z-50 w-72 max-w-[calc(100vw-1rem)] rounded-[var(--radius-lg)] border border-border bg-popover p-4 text-popover-foreground shadow-[var(--shadow-lg)] outline-none motion-safe:animate-rise",
        className,
      )}
      {...props}
    />
  </HoverCardPrimitive.Portal>
));
HoverCardContent.displayName = "HoverCardContent";
