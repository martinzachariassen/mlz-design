import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import * as React from "react";
import { cn } from "../../lib/cn";
import { named } from "../../lib/named";

export type CollapsibleProps = React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Root>;

/**
 * One thing that opens and closes. A "show more", a nav section, an advanced
 * options block.
 *
 * **Reach for `Accordion`** the moment there are several of these that belong
 * together and should coordinate — Accordion adds the arrow-key pattern between
 * triggers and can enforce one-open-at-a-time. A row of independent
 * `Collapsible`s is an accordion with the keyboard support left out.
 *
 * **Reach for `Tabs`** when exactly one of the sections is relevant at a time
 * and they are alternative views of one subject.
 *
 * Radix wires `aria-expanded` on the trigger and `aria-controls` to the content,
 * and keeps the content out of the accessibility tree while closed.
 *
 * ```tsx
 * <Collapsible>
 *   <CollapsibleTrigger>Advanced options</CollapsibleTrigger>
 *   <CollapsibleContent>…</CollapsibleContent>
 * </Collapsible>
 * ```
 */
export function Collapsible(props: CollapsibleProps) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />;
}

export type CollapsibleTriggerProps = React.ComponentPropsWithoutRef<
  typeof CollapsiblePrimitive.Trigger
>;

/**
 * The control that opens it. Renders a `<button>`; use `asChild` to style your
 * own. Keep the label constant — the open state lives in `aria-expanded`, and a
 * label that flips between "Show" and "Hide" contradicts it.
 */
export const CollapsibleTrigger = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<
    React.ComponentRef<typeof CollapsiblePrimitive.Trigger>,
    CollapsibleTriggerProps
  >(({ className, ...props }, ref) => (
    <CollapsiblePrimitive.Trigger
      ref={ref}
      data-slot="collapsible-trigger"
      className={cn(
        "flex w-full items-center justify-between gap-2 rounded-[var(--radius-sm)] py-2 text-left font-mono text-xs uppercase tracking-[0.1em] text-foreground transition-colors hover:text-accent-deep focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30",
        className,
      )}
      {...props}
    />
  )),
  "CollapsibleTrigger",
);

export type CollapsibleContentProps = React.ComponentPropsWithoutRef<
  typeof CollapsiblePrimitive.Content
>;

/**
 * The part that opens. Animates with the `grid-template-rows: 0fr → 1fr`
 * technique, the same as `Accordion` — height stays fluid with no JS measuring
 * and no fixed `max-height` to outgrow. The trick needs the panel to stay
 * mounted, hence `forceMount`; `visibility` is transitioned alongside the grid
 * track so a closed panel still leaves the accessibility tree and the tab order.
 */
export const CollapsibleContent = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<
    React.ComponentRef<typeof CollapsiblePrimitive.Content>,
    CollapsibleContentProps
  >(({ className, children, ...props }, ref) => (
    <CollapsiblePrimitive.Content
      forceMount
      ref={ref}
      data-slot="collapsible-content"
      className={cn(
        "grid transition-[grid-template-rows,visibility] duration-[var(--dur-base)] ease-[var(--ease-out)] motion-reduce:transition-none",
        "grid-rows-[0fr] data-[state=open]:grid-rows-[1fr] data-[state=closed]:invisible",
        className,
      )}
      {...props}
    >
      {/* min-h-0 + overflow-hidden lets the 0fr track fully collapse. */}
      <div className="min-h-0 overflow-hidden">{children}</div>
    </CollapsiblePrimitive.Content>
  )),
  "CollapsibleContent",
);
