import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import * as React from "react";
import { cn } from "../../lib/cn";
import { DotIcon } from "../../lib/icons";
import { named } from "../../lib/named";

export interface RadioGroupProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {}

/**
 * A set of mutually exclusive choices, all visible at once.
 *
 * **Use it for two to five options** where seeing them side by side helps the
 * reader decide — and where exactly one must be chosen. Past about six, the list
 * costs more space than it earns: switch to `Select`. If the choices aren't
 * exclusive, that's a `Checkbox` each; if it's a single on/off that applies
 * immediately, that's a `Switch`.
 *
 * There's no "none" state once a choice is made, so include an explicit "None"
 * or "Any" option if the reader must be able to back out.
 *
 * Radix owns the roving focus: Tab moves *into* the group, then the arrow keys
 * move between options — so the whole group is one tab stop, as the WAI-ARIA
 * pattern requires. Wrap it in a `<fieldset>` with a `<legend>`, or give it an
 * `aria-labelledby`, so the group itself is named.
 *
 * ```tsx
 * <RadioGroup defaultValue="cyan" onValueChange={setAccent}>
 *   <div className="flex items-center gap-2">
 *     <RadioGroupItem value="cyan" id="a-cyan" />
 *     <Label htmlFor="a-cyan">Cyan</Label>
 *   </div>
 * </RadioGroup>
 * ```
 */
export const RadioGroup = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<
    React.ComponentRef<typeof RadioGroupPrimitive.Root>,
    RadioGroupProps
  >(({ className, ...props }, ref) => (
    <RadioGroupPrimitive.Root
      ref={ref}
      data-slot="radio-group"
      className={cn("grid gap-2.5", className)}
      {...props}
    />
  )),
  "RadioGroup",
);

export interface RadioGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {}

/**
 * One choice. Give it an `id` and point a `Label`'s `htmlFor` at it — the dot
 * alone is a 16px target, and the label makes the whole phrase clickable.
 */
export const RadioGroupItem = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<
    React.ComponentRef<typeof RadioGroupPrimitive.Item>,
    RadioGroupItemProps
  >(({ className, ...props }, ref) => (
    <RadioGroupPrimitive.Item
      ref={ref}
      data-slot="radio-group-item"
      className={cn(
        // size-5 matches Checkbox — the two sit side by side in real forms.
        "flex size-5 shrink-0 items-center justify-center rounded-full border-[1.5px] border-input bg-background transition-colors duration-200 ease-[var(--ease-out)]",
        "data-[state=checked]:border-primary",
        "focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <DotIcon className="size-2.5 text-primary" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )),
  "RadioGroupItem",
);
