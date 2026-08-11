import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/cn";
import { named } from "../../lib/named";

const toggleVariants = /* @__PURE__ */ cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-sm)] font-mono text-xs uppercase tracking-[0.14em] transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        /** Text only until pressed — the quiet default, for a row of them. */
        default:
          "bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground data-[state=on]:bg-accent-subtle data-[state=on]:text-foreground",
        /**
         * Carries a hairline border, so a lone toggle still reads as a control.
         * Hover borders use `--ring` (the `-deep` rung), not the base accent —
         * the base is 1.83:1 on paper, *below* `border-input`, so hovering would
         * make the control's boundary fainter. The pressed border keeps the base
         * accent: there the state is carried by the tinted fill, not the border.
         */
        outline:
          "border-[1.5px] border-input bg-transparent text-muted-foreground hover:border-ring hover:text-foreground data-[state=on]:border-accent data-[state=on]:bg-accent-subtle data-[state=on]:text-foreground",
      },
      size: {
        sm: "h-9 px-3 text-[11px]",
        default: "h-11 px-4",
        lg: "h-12 px-5 text-sm",
        icon: "size-11 px-0",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export interface ToggleProps
  extends React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root>,
    VariantProps<typeof toggleVariants> {}

/**
 * A button that stays pressed — bold in an editor toolbar, "show archived" on a
 * list. It reports itself with `aria-pressed`, so screen readers announce the
 * state on the control itself.
 *
 * **Use it when the label describes a state the button turns on**, and the
 * change applies immediately. **Reach for `Checkbox`** when the value is part of
 * a form that gets submitted, and for `Switch` when it reads as a setting rather
 * than an action. A toggle whose label changes when pressed ("Show" → "Hide") is
 * a plain `Button`, not this — `aria-pressed` would then contradict the label.
 *
 * An icon-only toggle needs an `aria-label`.
 *
 * ```tsx
 * <Toggle aria-label="Bold" size="icon" pressed={bold} onPressedChange={setBold}>B</Toggle>
 * ```
 */
export const Toggle = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<React.ComponentRef<typeof TogglePrimitive.Root>, ToggleProps>(
    ({ className, variant, size, ...props }, ref) => (
      <TogglePrimitive.Root
        ref={ref}
        data-slot="toggle"
        className={cn(toggleVariants({ variant, size }), className)}
        {...props}
      />
    ),
  ),
  "Toggle",
);

export { toggleVariants };
