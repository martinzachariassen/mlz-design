import * as SliderPrimitive from "@radix-ui/react-slider";
import * as React from "react";
import { cn } from "../../lib/cn";
import { named } from "../../lib/named";

export interface SliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  /**
   * One accessible name per thumb, in order. **Required for a range** — two
   * thumbs both called "Price" are indistinguishable to a screen reader.
   *
   * A single-thumb slider can just use `aria-label` on the root; it is copied
   * down automatically, because the element carrying `role="slider"` is the
   * thumb, not the root, and a name on the root never reaches it.
   */
  thumbLabels?: string[];
}

/**
 * A value picked by dragging along a track — volume, opacity, a price ceiling.
 * Pass an array of two or more values for a range.
 *
 * **Use it when the approximate position matters more than the exact number**
 * and the reader wants to feel their way to an answer. **Reach for `Input
 * type="number"`** when they already know the value they want: a slider makes
 * "37" take ten seconds and a steady hand. Best of both is a slider with the
 * number shown beside it, which is what the stories do.
 *
 * Radix owns the keyboard pattern — arrows step by `step`, `PageUp`/`PageDown`
 * by ten steps, `Home`/`End` to the ends — and each thumb is its own tab stop
 * in a range.
 *
 * **Every thumb needs a name**, and this is the part that catches people out:
 * the element carrying `role="slider"` is the *thumb*, so an `aria-label` on
 * the root never reaches it. For one thumb, `aria-label` on the root is copied
 * down for you. For a range, pass `thumbLabels` — two thumbs both called
 * "Price" are indistinguishable to a screen reader.
 *
 * ```tsx
 * <Slider defaultValue={[40]} max={100} step={1} aria-label="Volume" />
 * <Slider defaultValue={[20, 80]} max={100} thumbLabels={["Minimum price", "Maximum price"]} />
 * ```
 */
export const Slider = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<React.ComponentRef<typeof SliderPrimitive.Root>, SliderProps>(
    ({ className, thumbLabels, ...props }, ref) => {
      // One thumb per value. Uncontrolled sliders carry `defaultValue`, controlled
      // ones `value`; falling back to a single thumb matches Radix's own default.
      const thumbCount = (props.value ?? props.defaultValue)?.length ?? 1;
      const rootLabel = props["aria-label"];

      return (
        <SliderPrimitive.Root
          ref={ref}
          data-slot="slider"
          className={cn(
            "relative flex w-full touch-none select-none items-center data-[orientation=vertical]:h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
            "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
            className,
          )}
          {...props}
        >
          <SliderPrimitive.Track
            data-slot="slider-track"
            className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-secondary data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
          >
            <SliderPrimitive.Range
              data-slot="slider-range"
              className="absolute h-full bg-accent data-[orientation=vertical]:w-full"
            />
          </SliderPrimitive.Track>
          {Array.from({ length: thumbCount }, (_, i) => (
            <SliderPrimitive.Thumb
              // Thumb count is driven by the value array, whose length is the
              // identity — there is nothing else to key on.
              // biome-ignore lint/suspicious/noArrayIndexKey: the index is the thumb's identity
              key={i}
              // The thumb is what carries `role="slider"`, so this is the element
              // that has to be named — a label on the root is not inherited.
              aria-label={thumbLabels?.[i] ?? (thumbCount === 1 ? rootLabel : undefined)}
              data-slot="slider-thumb"
              // `-deep`, not the base accent: the thumb *is* the control, so its
              // outline is the only thing marking where it sits. The base fill is
              // 1.83:1 on paper — under SC 1.4.11 — and, worse, identical to the
              // range it slides over, so the border vanished on the filled half.
              className="block size-4 shrink-0 rounded-full border-[1.5px] border-accent-deep bg-background shadow-[var(--shadow-sm)] transition-[box-shadow,transform] hover:scale-110 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30 data-[disabled]:pointer-events-none"
            />
          ))}
        </SliderPrimitive.Root>
      );
    },
  ),
  "Slider",
);
