import * as React from "react";
import { cn } from "../../lib/cn";
import { named } from "../../lib/named";

export type MarginNoteArrow = "none" | "up-left" | "up-right" | "down-left" | "down-right";

export interface MarginNoteProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Draw a hand-sketched arrow pointing from the note at whatever it annotates.
   * The four directions are the same stroke mirrored, so they stay one hand.
   */
  arrow?: MarginNoteArrow;
  /** The element to render. Defaults to `<aside>`. */
  as?: React.ElementType;
}

/**
 * One stroke of the same pen: the hand-written note in the margin is where the
 * system stops explaining and starts talking. Set in `--font-hand` at a muted
 * weight, optionally with a sketched arrow pointing at what it's about.
 *
 * **Use it once per view, for an aside the interface can't say in its own voice**
 * — the remark you'd pencil next to a printout. It is decoration around meaning,
 * never the meaning itself: anything a reader must act on belongs in `Callout` or
 * `Alert`, and anything they must *read* belongs in `Text` or `Prose`, which are
 * set in the reading face. The hand is deliberately hard to skim, so a paragraph
 * of it is a bug.
 *
 * The arrow is inline SVG in `currentColor` and `aria-hidden`, so it inherits the
 * note's colour and says nothing to a screen reader — the sentence carries the
 * whole message.
 *
 * ```tsx
 * <MarginNote arrow="up-left">
 *   this is the address every site you visit sees
 * </MarginNote>
 * ```
 */
export const MarginNote = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<HTMLElement, MarginNoteProps>(
    ({ arrow = "none", as, className, children, ...props }, ref) => {
      const Component = as ?? "aside";
      const below = arrow === "down-left" || arrow === "down-right";
      const mirrored = arrow === "up-right" || arrow === "down-right";

      // One path, four directions. The stroke is authored pointing up-left; the
      // rest are reflections, which keeps every variant the same hand rather than
      // four drawings that almost match.
      const sketch =
        arrow === "none" ? null : (
          <svg
            viewBox="0 0 96 54"
            aria-hidden="true"
            focusable="false"
            className={cn(
              "block h-[54px] w-24 overflow-visible fill-none stroke-current [stroke-linecap:round] [stroke-width:1.4]",
              mirrored && "-scale-x-100",
              below && "-scale-y-100",
            )}
          >
            <path d="M92 50 C 66 50, 40 42, 20 16" />
            <path d="M20 16 l 14 4" />
            <path d="M20 16 l 1 14" />
          </svg>
        );

      return (
        <Component
          ref={ref}
          data-slot="margin-note"
          className={cn(
            "flex flex-col gap-1 font-hand text-[15px] text-muted-foreground-2 leading-[1.45]",
            mirrored && "items-end text-right",
            className,
          )}
          {...props}
        >
          {below ? null : sketch}
          <p className="m-0 max-w-[24ch]">{children}</p>
          {below ? sketch : null}
        </Component>
      );
    },
  ),
  "MarginNote",
);
