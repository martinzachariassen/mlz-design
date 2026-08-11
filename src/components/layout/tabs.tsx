import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as React from "react";
import { cn } from "../../lib/cn";
import { named } from "../../lib/named";

export interface TabsProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {}

/**
 * Tabs on the Radix primitive: the root owns the active value (controlled via
 * `value`/`onValueChange` or uncontrolled via `defaultValue`) and Radix handles
 * the full WAI-ARIA keyboard pattern — roving tab order, arrow keys, Home/End,
 * and `orientation`-aware navigation.
 *
 * ```tsx
 * <Tabs defaultValue="overview">
 *   <TabsList>
 *     <TabsTrigger value="overview">Overview</TabsTrigger>
 *     <TabsTrigger value="activity">Activity</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="overview">…</TabsContent>
 *   <TabsContent value="activity">…</TabsContent>
 * </Tabs>
 * ```
 *
 * **Use tabs** for alternative views of the *same* subject, where exactly one is
 * relevant at a time and the labels are short enough to sit on one line —
 * Overview / Activity / Settings. **Reach for `Accordion`** instead when the
 * sections are independent, when a reader might want several open at once, or
 * when the labels are full sentences: tabs collapse badly on narrow screens,
 * accordions don't. Inactive panels unmount, so don't put unsaved form state in
 * one without lifting it to the parent.
 */
export const Tabs = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<React.ComponentRef<typeof TabsPrimitive.Root>, TabsProps>(
    ({ className, ...props }, ref) => (
      <TabsPrimitive.Root
        ref={ref}
        className={cn("flex flex-col gap-4 data-[orientation=vertical]:flex-row", className)}
        {...props}
      />
    ),
  ),
  "Tabs",
);

/** The `role="tablist"` rail the triggers sit on, ruled off from the panel beside it. */
export const TabsList = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<
    React.ComponentRef<typeof TabsPrimitive.List>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
  >(({ className, ...props }, ref) => (
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        "flex gap-1 border-b border-border",
        "data-[orientation=vertical]:flex-col data-[orientation=vertical]:border-b-0 data-[orientation=vertical]:border-r",
        className,
      )}
      {...props}
    />
  )),
  "TabsList",
);

export interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
  /** Identifies this tab and the `TabsContent` it reveals. Unique within the `Tabs`. */
  value: string;
}

/**
 * One tab. Its `value` selects the matching `TabsContent`. Only the selected tab
 * is in the tab order — arrow keys and Home/End move between the rest, following
 * the list's `orientation` — and the active one is marked by an accent rule.
 */
export const TabsTrigger = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<
    React.ComponentRef<typeof TabsPrimitive.Trigger>,
    TabsTriggerProps
  >(({ className, ...props }, ref) => (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        "-mb-px border-b-2 border-transparent px-3 pb-2 font-mono text-xs uppercase tracking-[0.1em] transition-colors duration-200 ease-[var(--ease-out)] hover:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30 disabled:pointer-events-none disabled:opacity-50",
        "text-muted-foreground data-[state=active]:border-accent data-[state=active]:text-foreground",
        "data-[orientation=vertical]:-mr-px data-[orientation=vertical]:mb-0 data-[orientation=vertical]:border-b-0 data-[orientation=vertical]:border-r-2 data-[orientation=vertical]:pb-1.5 data-[orientation=vertical]:pr-3 data-[orientation=vertical]:text-left",
        className,
      )}
      {...props}
    />
  )),
  "TabsTrigger",
);

export interface TabsContentProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> {
  /** The `TabsTrigger` value this panel belongs to. */
  value: string;
}

/**
 * The panel for one tab. Inactive panels unmount rather than hide, so keep any
 * state you need to survive a tab switch in the parent.
 */
export const TabsContent = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<
    React.ComponentRef<typeof TabsPrimitive.Content>,
    TabsContentProps
  >(({ className, ...props }, ref) => (
    <TabsPrimitive.Content
      ref={ref}
      // Radix gives the panel tabIndex={0}, so it takes focus — suppressing the
      // outline needs a ring in its place or a keyboard user loses their spot.
      className={cn(
        "rounded-[var(--radius-sm)] text-sm text-muted-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30",
        className,
      )}
      {...props}
    />
  )),
  "TabsContent",
);
