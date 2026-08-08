import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import type { VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/cn";
import { named } from "../../lib/named";
import { toggleVariants } from "./toggle";

type ToggleGroupContextValue = VariantProps<typeof toggleVariants>;

/**
 * Lets the group set `variant`/`size` once instead of on every item — the items
 * have to agree, or the row looks ragged.
 */
const ToggleGroupContext = /* @__PURE__ */ React.createContext<ToggleGroupContextValue>({});

/**
 * A type alias, not `interface extends`: Radix's Root props are a discriminated
 * union on `type`, and an interface flattens that union so `children` and the
 * `type` discriminant both go missing.
 */
export type ToggleGroupProps = React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
  VariantProps<typeof toggleVariants>;

/**
 * A row of toggles that belong together — a view switcher, a text-alignment
 * picker, a filter bar.
 *
 * `type="single"` behaves like a segmented control: exactly one item on at a
 * time. `type="multiple"` lets several be on at once. Radix owns the roving
 * focus, so the whole group is one tab stop and the arrow keys move within it.
 *
 * **Use it for view state that applies immediately.** **Reach for `RadioGroup`**
 * when it's a form field whose value gets submitted, and for `Tabs` when
 * choosing also swaps a panel of content — a toggle group changes how something
 * looks, tabs change what you're looking at.
 *
 * Set `variant` and `size` here rather than on each item.
 *
 * ```tsx
 * <ToggleGroup type="single" defaultValue="grid" aria-label="Layout">
 *   <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
 *   <ToggleGroupItem value="list">List</ToggleGroupItem>
 * </ToggleGroup>
 * ```
 */
export const ToggleGroup = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<
    React.ComponentRef<typeof ToggleGroupPrimitive.Root>,
    ToggleGroupProps
  >(({ className, variant, size, children, ...props }, ref) => {
    const context = React.useMemo(() => ({ variant, size }), [variant, size]);
    return (
      <ToggleGroupPrimitive.Root
        ref={ref}
        data-slot="toggle-group"
        className={cn("flex items-center gap-1", className)}
        {...(props as React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root>)}
      >
        <ToggleGroupContext.Provider value={context}>{children}</ToggleGroupContext.Provider>
      </ToggleGroupPrimitive.Root>
    );
  }),
  "ToggleGroup",
);

export type ToggleGroupItemProps = React.ComponentPropsWithoutRef<
  typeof ToggleGroupPrimitive.Item
> &
  VariantProps<typeof toggleVariants>;

/** One choice in a `ToggleGroup`. Inherits the group's `variant` and `size`. */
export const ToggleGroupItem = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<
    React.ComponentRef<typeof ToggleGroupPrimitive.Item>,
    ToggleGroupItemProps
  >(({ className, variant, size, ...props }, ref) => {
    const context = React.useContext(ToggleGroupContext);
    return (
      <ToggleGroupPrimitive.Item
        ref={ref}
        data-slot="toggle-group-item"
        className={cn(
          toggleVariants({ variant: variant ?? context.variant, size: size ?? context.size }),
          className,
        )}
        {...props}
      />
    );
  }),
  "ToggleGroupItem",
);
