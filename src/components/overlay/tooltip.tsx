import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as React from "react";
import { cn } from "../../lib/cn";

/**
 * Wraps the part of the app that uses tooltips and shares their open/close
 * timing, so moving between neighbouring triggers doesn't re-run the delay.
 * Mount it once, high up. `Tooltip` falls back to its own provider if you
 * forget, but then each tooltip times independently.
 */
export const TooltipProvider = TooltipPrimitive.Provider;

export type TooltipProps = React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Root>;

/**
 * A small label that appears on hover or keyboard focus — the name of an icon
 * button, or a truncated value in full.
 *
 * **A tooltip is a hint, never content.** It can't be reached on touch and
 * vanishes on the way to it, so anything a reader *needs* belongs on the page.
 * Never put a control inside one. **Reach for `InfoTip`** when the explanation
 * is a sentence the reader should be able to click into and keep open, and for
 * `Dialog` when it needs actions.
 *
 * It attaches as the trigger's **description** (`aria-describedby`), not its
 * name — so an icon-only button still needs its own `aria-label`. A tooltip
 * alone leaves it unnamed.
 *
 * The trigger must also be focusable. A disabled `<button>` isn't, so wrap it in
 * a focusable span if a disabled control needs an explanation.
 *
 * ```tsx
 * <TooltipProvider>
 *   <Tooltip>
 *     <TooltipTrigger asChild>
 *       <Button size="icon" aria-label="Redeploy">↻</Button>
 *     </TooltipTrigger>
 *     <TooltipContent>Redeploy</TooltipContent>
 *   </Tooltip>
 * </TooltipProvider>
 * ```
 */
export function Tooltip(props: TooltipProps) {
  return <TooltipPrimitive.Root {...props} />;
}
Tooltip.displayName = "Tooltip";

/** The element the tooltip describes. Pass `asChild` to use your own control. */
export const TooltipTrigger = TooltipPrimitive.Trigger;

export interface TooltipContentProps
  extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> {}

/**
 * The label panel — ink-on-paper inverted, mono and tracked out, so it reads as
 * chrome rather than as page content. Keep it to a few words.
 */
export const TooltipContent = React.forwardRef<
  React.ComponentRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>(({ className, sideOffset = 6, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      collisionPadding={8}
      data-slot="tooltip-content"
      className={cn(
        "z-50 max-w-xs rounded-[var(--radius-sm)] bg-primary px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-primary-foreground shadow-[var(--shadow-md)]",
        "motion-safe:animate-rise",
        className,
      )}
      {...props}
    />
  </TooltipPrimitive.Portal>
));
TooltipContent.displayName = "TooltipContent";
