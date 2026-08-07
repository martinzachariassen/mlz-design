import * as React from "react";
import { cn } from "../../lib/cn";
import { Icon } from "../data-display/icon";

/**
 * A Radix-free, context-driven accordion. The root owns the open set (controlled
 * via `value`/`onValueChange` or uncontrolled via `defaultValue`) and shares it
 * through context; triggers register so the Up/Down/Home/End keys roam between
 * them (WAI-ARIA accordion pattern). Content animates open/closed with the
 * `grid-template-rows: 0fr → 1fr` technique, so height is fluid with no JS
 * measuring and no fixed max-height.
 *
 * ```tsx
 * <Accordion type="single" collapsible>
 *   <AccordionItem value="a">
 *     <AccordionTrigger>Section A</AccordionTrigger>
 *     <AccordionContent>…</AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 * ```
 */

type AccordionType = "single" | "multiple";

interface AccordionContextValue {
  isOpen: (value: string) => boolean;
  toggle: (value: string) => void;
  register: (value: string) => void;
  focusRelative: (from: string, direction: 1 | -1 | "first" | "last") => void;
}

const AccordionContext = React.createContext<AccordionContextValue | null>(null);

function useAccordionContext(component: string) {
  const context = React.useContext(AccordionContext);
  if (!context) throw new Error(`<${component}> must be used within <Accordion>`);
  return context;
}

interface ItemContextValue {
  value: string;
  open: boolean;
  triggerId: string;
  contentId: string;
}

const ItemContext = React.createContext<ItemContextValue | null>(null);

function useItemContext(component: string) {
  const context = React.useContext(ItemContext);
  if (!context) throw new Error(`<${component}> must be used within <AccordionItem>`);
  return context;
}

function toArray(value: string | string[] | undefined): string[] {
  if (value === undefined) return [];
  return Array.isArray(value) ? value : [value];
}

export interface AccordionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** `single` allows one open item at a time; `multiple` allows many. */
  type?: AccordionType;
  /** Controlled open value(s). Use `onValueChange` alongside it. */
  value?: string | string[];
  /** Uncontrolled initial open value(s). */
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  /** For `type="single"`, allow closing the open item by clicking it again. */
  collapsible?: boolean;
}

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      type = "single",
      value,
      defaultValue,
      onValueChange,
      collapsible = false,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const [uncontrolled, setUncontrolled] = React.useState<string[]>(() => toArray(defaultValue));
    const isControlled = value !== undefined;
    const open = isControlled ? toArray(value) : uncontrolled;
    const order = React.useRef<string[]>([]);

    const commit = React.useCallback(
      (next: string[]) => {
        if (!isControlled) setUncontrolled(next);
        onValueChange?.(type === "single" ? (next[0] ?? "") : next);
      },
      [isControlled, onValueChange, type],
    );

    const toggle = React.useCallback(
      (item: string) => {
        const isItemOpen = open.includes(item);
        if (type === "single") {
          commit(isItemOpen ? (collapsible ? [] : open) : [item]);
        } else {
          commit(isItemOpen ? open.filter((v) => v !== item) : [...open, item]);
        }
      },
      [open, type, collapsible, commit],
    );

    const isOpen = React.useCallback((item: string) => open.includes(item), [open]);

    const register = React.useCallback((item: string) => {
      if (!order.current.includes(item)) order.current.push(item);
    }, []);

    const focusRelative = React.useCallback(
      (from: string, direction: 1 | -1 | "first" | "last") => {
        const items = order.current;
        if (items.length === 0) return;
        let nextValue: string | undefined;
        if (direction === "first") nextValue = items[0];
        else if (direction === "last") nextValue = items[items.length - 1];
        else {
          const index = items.indexOf(from);
          if (index === -1) return;
          nextValue = items[(index + direction + items.length) % items.length];
        }
        if (nextValue == null) return;
        document
          .querySelector<HTMLButtonElement>(
            `[data-slot="accordion-trigger"][data-value="${nextValue}"]`,
          )
          ?.focus();
      },
      [],
    );

    const context = React.useMemo<AccordionContextValue>(
      () => ({ isOpen, toggle, register, focusRelative }),
      [isOpen, toggle, register, focusRelative],
    );

    return (
      <AccordionContext.Provider value={context}>
        <div ref={ref} data-slot="accordion" className={cn("flex flex-col", className)} {...props}>
          {children}
        </div>
      </AccordionContext.Provider>
    );
  },
);
Accordion.displayName = "Accordion";

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ value, className, children, ...props }, ref) => {
    const { isOpen } = useAccordionContext("AccordionItem");
    const reactId = React.useId();
    const open = isOpen(value);
    const item = React.useMemo<ItemContextValue>(
      () => ({
        value,
        open,
        triggerId: `${reactId}-trigger`,
        contentId: `${reactId}-content`,
      }),
      [value, open, reactId],
    );
    return (
      <ItemContext.Provider value={item}>
        <div
          ref={ref}
          data-slot="accordion-item"
          data-state={open ? "open" : "closed"}
          className={cn("border-b border-border", className)}
          {...props}
        >
          {children}
        </div>
      </ItemContext.Provider>
    );
  },
);
AccordionItem.displayName = "AccordionItem";

export interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Hide the default rotating chevron indicator. */
  hideIndicator?: boolean;
}

export const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ className, children, hideIndicator, onKeyDown, ...props }, ref) => {
    const { toggle, register, focusRelative } = useAccordionContext("AccordionTrigger");
    const { value, open, triggerId, contentId } = useItemContext("AccordionTrigger");
    React.useEffect(() => register(value), [register, value]);

    return (
      <h3 className="m-0 flex">
        <button
          ref={ref}
          type="button"
          id={triggerId}
          data-slot="accordion-trigger"
          data-value={value}
          data-state={open ? "open" : "closed"}
          aria-expanded={open}
          aria-controls={contentId}
          onClick={() => toggle(value)}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              focusRelative(value, 1);
            } else if (event.key === "ArrowUp") {
              event.preventDefault();
              focusRelative(value, -1);
            } else if (event.key === "Home") {
              event.preventDefault();
              focusRelative(value, "first");
            } else if (event.key === "End") {
              event.preventDefault();
              focusRelative(value, "last");
            }
            onKeyDown?.(event);
          }}
          className={cn(
            "flex w-full items-center gap-3 py-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30",
            className,
          )}
          {...props}
        >
          {children}
          {hideIndicator ? null : (
            <Icon
              name="chevron-down"
              size="sm"
              className={cn(
                "ml-auto shrink-0 text-muted-foreground transition-transform duration-300 ease-[var(--ease-out)] motion-reduce:transition-none",
                open && "rotate-180 text-accent",
              )}
            />
          )}
        </button>
      </h3>
    );
  },
);
AccordionTrigger.displayName = "AccordionTrigger";

export const AccordionContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { open, triggerId, contentId } = useItemContext("AccordionContent");
  return (
    // A `<section>` with an accessible name is an implicit `region` landmark.
    <section
      id={contentId}
      aria-labelledby={triggerId}
      data-slot="accordion-content"
      data-state={open ? "open" : "closed"}
      aria-hidden={!open}
      className={cn(
        "grid transition-[grid-template-rows] duration-300 ease-[var(--ease-out)] motion-reduce:transition-none",
        open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
      )}
    >
      {/* min-h-0 + overflow-hidden lets the 0fr track fully collapse. */}
      <div className="min-h-0 overflow-hidden">
        <div ref={ref} className={cn("pb-4 text-sm text-muted-foreground", className)} {...props}>
          {children}
        </div>
      </div>
    </section>
  );
});
AccordionContent.displayName = "AccordionContent";
