import * as React from "react";
import { cn } from "../../lib/cn";
import { named } from "../../lib/named";
import { StatusDot, type StatusDotProps } from "./status-dot";

/**
 * A band of headline readings across the top of a page — the five or six facts
 * you want answered before anyone scrolls.
 *
 * It is a real `<dl>`: each cell is a `<dt>`/`<dd>` pair, so the label/value
 * relationship survives being read aloud, and the whole band copy-pastes as
 * pairs. Cells share the width equally and are divided by hairlines; the band
 * itself is ruled top and bottom, which is what makes it read as an instrument
 * panel rather than a row of cards.
 *
 * **It never wraps.** Below ~720px the cells become a horizontal snap-scroller
 * instead of stacking, because a band that reflows into six rows stops being a
 * glance and pushes the page below the fold. Values are single-line and clip
 * with an ellipsis, so put the long form in the section below, not here.
 *
 * **Reach for `DataList`** for the facts *about one thing*, stacked and read in
 * order — that's the detail this band summarises. **Reach for `Stat`** when one
 * number is the headline and deserves display-scale type; a readout cell is
 * deliberately quiet, sized to sit five-across. **Reach for `StatusChip`** when
 * the findings are a variable-length list rather than a fixed set of slots.
 *
 * The first cell is flush left so the band lines up with the text column above
 * it. Bleed it past the container's gutter with negative margins if you want the
 * rules to run to the screen edge.
 *
 * ```tsx
 * <Readout>
 *   <ReadoutCell label="Exit" dot="success">203.0.113.7</ReadoutCell>
 *   <ReadoutCell label="Location" dot="info">Oslo, NO</ReadoutCell>
 *   <ReadoutCell label="VPN / proxy" dot="success">none detected</ReadoutCell>
 * </Readout>
 * ```
 */
export const Readout = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<HTMLDListElement, React.HTMLAttributes<HTMLDListElement>>(
    ({ className, ...props }, ref) => (
      <dl
        ref={ref}
        data-slot="readout"
        className={cn(
          "m-0 grid grid-flow-col auto-cols-fr border-border border-y",
          // Narrow: one line still, but scrolled rather than stacked. The
          // scrollbar is hidden because the clipped cell at the edge is the
          // affordance, and a permanent bar would eat a third of a cell.
          "max-[720px]:auto-cols-[minmax(46%,auto)] max-[720px]:snap-x max-[720px]:snap-proximity max-[720px]:overflow-x-auto max-[720px]:[scrollbar-width:none] max-[720px]:[&::-webkit-scrollbar]:hidden",
          className,
        )}
        {...props}
      />
    ),
  ),
  "Readout",
);

export interface ReadoutCellProps extends React.HTMLAttributes<HTMLDivElement> {
  /** What is being read — the eyebrow above the value. */
  label: React.ReactNode;
  /**
   * Lead the value with a `StatusDot` in this role. Colour is never the message:
   * the value itself still has to say which state it is ("none detected", "IP
   * exposed"), and the dot only agrees with it.
   */
  dot?: StatusDotProps["variant"];
}

/**
 * One reading in a `Readout` — a `<dt>`/`<dd>` pair in a hairline-divided cell.
 *
 * The value is clipped to a single line, so pass something short. If it needs a
 * qualifier, that belongs in the detail section this band summarises.
 */
export const ReadoutCell = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<HTMLDivElement, ReadoutCellProps>(
    ({ label, dot, className, children, ...props }, ref) => (
      <div
        ref={ref}
        data-slot="readout-cell"
        className={cn(
          // `relative` is load-bearing, not cosmetic. Below 720px the band is an
          // `overflow-x: auto` scroller, and an `sr-only` span (which is
          // `position: absolute`) inside a cell would otherwise resolve its
          // containing block to the page root: it escapes the clip, lands at its
          // static position hundreds of pixels to the right, and stretches the
          // document sideways. Positioning the cell keeps it inside.
          "relative min-w-0 border-border border-l px-4 py-3.5 first:border-l-0 first:pl-0 max-[720px]:snap-start",
          className,
        )}
        {...props}
      >
        <dt className="mb-1.5 font-mono text-[10px] text-muted-foreground uppercase tracking-[0.16em]">
          {label}
        </dt>
        <dd className="m-0 flex min-w-0 items-center gap-2 font-mono text-[13.5px] text-foreground">
          {dot ? <StatusDot variant={dot} className="size-[7px]" /> : null}
          <span className="truncate">{children}</span>
        </dd>
      </div>
    ),
  ),
  "ReadoutCell",
);
