import * as SelectPrimitive from "@radix-ui/react-select";
import * as React from "react";
import { cn } from "../../lib/cn";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "../../lib/icons";

export type SelectProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root>;

/**
 * A field for choosing **one value from many** — the form control, not a menu of
 * actions.
 *
 * Reach for it from about **six options upward**; below that a `RadioGroup`
 * shows every choice at once and costs one click instead of two. Above roughly
 * fifteen, a select becomes a scroll hunt — that wants a searchable combobox,
 * which this system doesn't ship yet. For *actions* rather than values, use
 * `DropdownMenu`.
 *
 * It renders a custom listbox rather than a native `<select>`, which buys
 * consistent styling and grouping but means it does **not** post a value with a
 * plain HTML form — pass `name` to get a hidden input, or read `onValueChange`.
 * Always give it a visible `Label`.
 *
 * ```tsx
 * <Select defaultValue="oslo" onValueChange={setCity}>
 *   <SelectTrigger><SelectValue placeholder="Pick a city" /></SelectTrigger>
 *   <SelectContent>
 *     <SelectItem value="oslo">Oslo</SelectItem>
 *     <SelectItem value="bergen">Bergen</SelectItem>
 *   </SelectContent>
 * </Select>
 * ```
 */
export function Select(props: SelectProps) {
  return <SelectPrimitive.Root {...props} />;
}
Select.displayName = "Select";

/** The chosen value, or the `placeholder` while nothing is chosen. */
export const SelectValue = SelectPrimitive.Value;

/** Groups related options. Pair with a `SelectLabel`. */
export const SelectGroup = SelectPrimitive.Group;

export interface SelectTriggerProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> {}

/** The closed field. Wears the same border, height and focus ring as `Input`. */
export const SelectTrigger = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    data-slot="select-trigger"
    className={cn(
      "flex h-11 w-full items-center justify-between gap-2 rounded-[var(--radius-sm)] border-[1.5px] border-input bg-background px-3 py-2 font-mono text-sm text-foreground transition-colors",
      "data-[placeholder]:text-muted-foreground",
      "focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "[&>span]:truncate",
      className,
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDownIcon className="text-muted-foreground transition-transform duration-200 ease-[var(--ease-out)] motion-reduce:transition-none" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = "SelectTrigger";

export interface SelectContentProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> {}

/**
 * The listbox. Defaults to `position="popper"` under the trigger and matches its
 * width, so the open list lines up with the closed field.
 */
export const SelectContent = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Content>,
  SelectContentProps
>(({ className, children, position = "popper", sideOffset = 6, ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      position={position}
      sideOffset={sideOffset}
      collisionPadding={8}
      data-slot="select-content"
      className={cn(
        "relative z-50 max-h-[var(--radix-select-content-available-height)] min-w-[8rem] overflow-hidden rounded-[var(--radius-lg)] border border-border bg-popover text-popover-foreground shadow-[var(--shadow-lg)]",
        "motion-safe:animate-rise",
        position === "popper" && "w-full min-w-[var(--radix-select-trigger-width)]",
        className,
      )}
      {...props}
    >
      <SelectPrimitive.ScrollUpButton className="flex h-6 items-center justify-center text-muted-foreground">
        <ChevronUpIcon />
      </SelectPrimitive.ScrollUpButton>
      <SelectPrimitive.Viewport className="p-1">{children}</SelectPrimitive.Viewport>
      <SelectPrimitive.ScrollDownButton className="flex h-6 items-center justify-center text-muted-foreground">
        <ChevronDownIcon />
      </SelectPrimitive.ScrollDownButton>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = "SelectContent";

/** One option. `value` must be unique and non-empty within the select. */
export const SelectItem = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    data-slot="select-item"
    className={cn(
      "relative flex cursor-pointer select-none items-center rounded-[var(--radius-sm)] py-1.5 pr-2 pl-8 text-sm outline-none transition-colors",
      "focus:bg-accent-subtle focus:text-foreground data-[highlighted]:bg-accent-subtle data-[highlighted]:text-foreground",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex size-4 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <CheckIcon className="size-3.5 text-accent" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = "SelectItem";

/** A group heading in the mlz eyebrow voice. Not selectable. */
export const SelectLabel = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    data-slot="select-label"
    className={cn(
      "px-2 py-1.5 pl-8 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground",
      className,
    )}
    {...props}
  />
));
SelectLabel.displayName = "SelectLabel";

/** A hairline rule between groups of options. */
export const SelectSeparator = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    data-slot="select-separator"
    className={cn("-mx-1 my-1 h-px bg-border", className)}
    {...props}
  />
));
SelectSeparator.displayName = "SelectSeparator";
