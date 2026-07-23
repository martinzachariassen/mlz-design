import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../lib/cn";

/**
 * Layout primitives — the structural spine for responsive, mobile-first web UIs.
 * They carry no brand paint (no colour, no border); they only lay things out on
 * the token breakpoint ladder so pages read the same from a 360px phone to a wide
 * desktop. Compose the painted components (Card, Button…) inside them.
 *
 *   Container  a centred, max-width column with responsive gutters — the page frame.
 *   Stack      a flex row/column with a token gap; `responsive` stacks on mobile,
 *              flows to a row at `sm`.
 *   Grid       a responsive grid — either an auto-fitting track (`min`) that needs
 *              no breakpoints, or a fixed `cols` count that steps up with width.
 */

const containerVariants = cva("mx-auto w-full", {
  variants: {
    /** Max content width. `prose` is measure-optimised for reading. */
    size: {
      sm: "max-w-[40rem]",
      md: "max-w-[48rem]",
      lg: "max-w-[64rem]",
      xl: "max-w-[80rem]",
      prose: "max-w-[65ch]",
      full: "max-w-none",
    },
    /** Responsive side gutters. `none` for edge-to-edge (mobile sheets, hero). */
    gutter: {
      none: "px-0",
      sm: "px-3 sm:px-4",
      md: "px-4 sm:px-6 lg:px-8",
      lg: "px-5 sm:px-8 lg:px-12",
    },
  },
  defaultVariants: { size: "lg", gutter: "md" },
});

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, gutter, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="container"
      className={cn(containerVariants({ size, gutter }), className)}
      {...props}
    />
  ),
);
Container.displayName = "Container";

const stackVariants = cva("flex", {
  variants: {
    /** `responsive` = column on mobile, row from `sm` up (the common card→row flip). */
    direction: {
      col: "flex-col",
      row: "flex-row",
      responsive: "flex-col sm:flex-row",
    },
    gap: {
      none: "gap-0",
      xs: "gap-1.5",
      sm: "gap-2.5",
      md: "gap-4",
      lg: "gap-6",
      xl: "gap-10",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
      baseline: "items-baseline",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
    },
    wrap: {
      true: "flex-wrap",
      false: "flex-nowrap",
    },
  },
  defaultVariants: { direction: "col", gap: "md", align: "stretch", justify: "start" },
});

export interface StackProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stackVariants> {}

export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  ({ className, direction, gap, align, justify, wrap, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="stack"
      className={cn(stackVariants({ direction, gap, align, justify, wrap }), className)}
      {...props}
    />
  ),
);
Stack.displayName = "Stack";

/** Fixed column counts that step up with viewport width (mobile-first). */
const colsMap = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  5: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5",
  6: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6",
} as const;

const gapMap = {
  none: "gap-0",
  xs: "gap-1.5",
  sm: "gap-2.5",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-10",
} as const;

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Auto-fitting mode: the minimum track width (e.g. `"16rem"`, `240`). Columns
   * fill in automatically as the container grows — responsive with no breakpoints.
   * Wins over `cols` when both are set.
   */
  min?: string | number;
  /** Fixed responsive column count (1–6) that steps up at `sm`/`lg`. */
  cols?: keyof typeof colsMap;
  gap?: keyof typeof gapMap;
}

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, min, cols = 3, gap = "md", style, ...props }, ref) => {
    const auto = min != null;
    const minW = typeof min === "number" ? `${min}px` : min;
    return (
      <div
        ref={ref}
        data-slot="grid"
        className={cn("grid", gapMap[gap], !auto && colsMap[cols], className)}
        style={
          auto
            ? {
                gridTemplateColumns: `repeat(auto-fill, minmax(min(100%, ${minW}), 1fr))`,
                ...style,
              }
            : style
        }
        {...props}
      />
    );
  },
);
Grid.displayName = "Grid";

export { containerVariants, stackVariants };
