import * as AccordionPrimitive from "@radix-ui/react-accordion";
import * as React from "react";
import { cn } from "../../lib/cn";

type SingleProps = Omit<
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root> & { type: "single" },
  "type"
> & {
  /** `single` allows one open item at a time; `multiple` allows many. Defaults to `single`. */
  type?: "single";
};

type MultipleProps = Omit<
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root> & { type: "multiple" },
  "type"
> & {
  /** `single` allows one open item at a time; `multiple` allows many. */
  type: "multiple";
};

export type AccordionProps = SingleProps | MultipleProps;

/**
 * An accordion on the Radix primitive. The root owns the open set (controlled via
 * `value`/`onValueChange` or uncontrolled via `defaultValue`) and Radix handles the
 * WAI-ARIA keyboard pattern — Up/Down between triggers, Home/End to the ends, and
 * `orientation` awareness. `type="single"` opens one item at a time (add
 * `collapsible` to let it close again); `type="multiple"` opens many.
 *
 * Content animates open and closed with the `grid-template-rows: 0fr → 1fr`
 * technique, so height is fluid with no JS measuring and no fixed max-height.
 *
 * ```tsx
 * <Accordion type="single" collapsible>
 *   <AccordionItem value="a">
 *     <AccordionTrigger>Section A</AccordionTrigger>
 *     <AccordionContent>…</AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 * ```
 *
 * **Use an accordion** for independent sections a reader dips into — FAQs, long
 * forms broken into steps, dense reference material — especially when the labels
 * are full sentences or the content is long. **Reach for `Tabs`** instead when
 * the sections are alternative views of one subject and exactly one is relevant
 * at a time. **Don't** hide anything a reader needs in order to act: an
 * accordion is for progressive disclosure, not for tidying away required
 * information.
 */
export const Accordion = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Root>,
  AccordionProps
>(({ className, type = "single", ...props }, ref) => (
  <AccordionPrimitive.Root
    ref={ref}
    data-slot="accordion"
    className={cn("flex flex-col", className)}
    // The `type` discriminant is resolved by the exported union above; Radix's own
    // union can't see through the default, so re-assert it here.
    {...({ type, ...props } as React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>)}
  />
));
Accordion.displayName = "Accordion";

export interface AccordionItemProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> {
  /** Identifies this item to the root. Unique within the `Accordion`. */
  value: string;
}

/**
 * One section of the accordion — a trigger plus its content, rule-separated from
 * the next. Its `value` is the identity the root opens and closes by, so it must
 * be unique within the accordion.
 */
export const AccordionItem = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Item>,
  AccordionItemProps
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    data-slot="accordion-item"
    className={cn("border-b border-border", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

export interface AccordionTriggerProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> {
  /** Hide the default rotating chevron indicator. */
  hideIndicator?: boolean;
}

/**
 * The clickable header of an `AccordionItem`. Renders a real `<button>` inside an
 * `<h3>` with `aria-expanded`/`aria-controls` wired up by Radix. Children are laid
 * out in a flex row, so a trigger can carry a number, a subtitle and a badge as
 * easily as a single line of text.
 */
export const AccordionTrigger = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Trigger>,
  AccordionTriggerProps
>(({ className, children, hideIndicator, ...props }, ref) => (
  <AccordionPrimitive.Header className="m-0 flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      data-slot="accordion-trigger"
      className={cn(
        "group flex w-full items-center gap-3 py-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30",
        className,
      )}
      {...props}
    >
      {children}
      {hideIndicator ? null : (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="ml-auto size-4 shrink-0 text-muted-foreground transition-transform duration-300 ease-[var(--ease-out)] group-data-[state=open]:rotate-180 group-data-[state=open]:text-accent motion-reduce:transition-none"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      )}
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = "AccordionTrigger";

/**
 * The panel an `AccordionTrigger` reveals, named by its trigger. It animates its
 * height via the `0fr → 1fr` grid-row trick, which needs the panel to stay
 * mounted — hence `forceMount`. `visibility` is transitioned alongside the grid
 * track so a closed panel leaves the accessibility tree and the tab order once
 * the collapse finishes, rather than lingering as reachable-but-invisible content.
 */
export const AccordionContent = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    forceMount
    data-slot="accordion-content"
    className={cn(
      "grid transition-[grid-template-rows,visibility] duration-300 ease-[var(--ease-out)] motion-reduce:transition-none",
      "data-[state=open]:grid-rows-[1fr] data-[state=closed]:grid-rows-[0fr] data-[state=closed]:invisible",
    )}
  >
    {/* min-h-0 + overflow-hidden lets the 0fr track fully collapse. */}
    <div className="min-h-0 overflow-hidden">
      <div ref={ref} className={cn("pb-4 text-sm text-muted-foreground", className)} {...props}>
        {children}
      </div>
    </div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = "AccordionContent";
