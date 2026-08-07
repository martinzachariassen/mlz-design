import * as React from "react";
import { cn } from "../../lib/cn";

interface TabsContextValue {
  value: string | undefined;
  setValue: (value: string) => void;
  register: (value: string) => void;
  focusRelative: (from: string, direction: 1 | -1) => void;
}

const TabsContext = React.createContext<TabsContextValue | null>(null);

function useTabsContext(component: string) {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error(`<${component}> must be used within <Tabs>`);
  }
  return context;
}

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Controlled active tab. Use `onValueChange` alongside it. */
  value?: string;
  /** Uncontrolled initial tab. */
  defaultValue?: string;
  /** Fired with the newly selected tab's value. */
  onValueChange?: (value: string) => void;
}

/**
 * A tiny Radix-free tabs implementation: the root owns the active value (either
 * controlled via `value`/`onValueChange` or uncontrolled via `defaultValue`)
 * and shares it through context. Triggers register themselves so arrow keys can
 * roam between them.
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
 */
export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ className, value, defaultValue, onValueChange, children, ...props }, ref) => {
    const [uncontrolled, setUncontrolled] = React.useState(defaultValue);
    const isControlled = value !== undefined;
    const active = isControlled ? value : uncontrolled;
    const order = React.useRef<string[]>([]);

    const setValue = React.useCallback(
      (next: string) => {
        if (!isControlled) setUncontrolled(next);
        onValueChange?.(next);
      },
      [isControlled, onValueChange],
    );

    const register = React.useCallback((triggerValue: string) => {
      if (!order.current.includes(triggerValue)) order.current.push(triggerValue);
    }, []);

    const focusRelative = React.useCallback((from: string, direction: 1 | -1) => {
      const items = order.current;
      const index = items.indexOf(from);
      if (index === -1) return;
      const next = items[(index + direction + items.length) % items.length];
      document.querySelector<HTMLButtonElement>(`[role="tab"][data-value="${next}"]`)?.focus();
    }, []);

    const context = React.useMemo<TabsContextValue>(
      () => ({ value: active, setValue, register, focusRelative }),
      [active, setValue, register, focusRelative],
    );

    return (
      <TabsContext.Provider value={context}>
        <div ref={ref} className={cn("flex flex-col gap-4", className)} {...props}>
          {children}
        </div>
      </TabsContext.Provider>
    );
  },
);
Tabs.displayName = "Tabs";

/** The `role="tablist"` rail the triggers sit on, ruled off from the panel below. */
export const TabsList = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      role="tablist"
      className={cn("flex gap-1 border-b border-border", className)}
      {...props}
    />
  ),
);
TabsList.displayName = "TabsList";

export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Identifies this tab and the `TabsContent` it reveals. Unique within the `Tabs`. */
  value: string;
}

/**
 * One tab. Its `value` selects the matching `TabsContent`. Only the selected tab
 * is in the tab order — arrow keys move between the rest, per the WAI-ARIA tabs
 * pattern — and the active one is marked by an accent underline.
 */
export const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, onKeyDown, ...props }, ref) => {
    const { value: active, setValue, register, focusRelative } = useTabsContext("TabsTrigger");
    React.useEffect(() => register(value), [register, value]);
    const selected = active === value;
    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        data-value={value}
        aria-selected={selected}
        tabIndex={selected ? 0 : -1}
        onClick={() => setValue(value)}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight" || event.key === "ArrowDown") {
            event.preventDefault();
            focusRelative(value, 1);
          } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
            event.preventDefault();
            focusRelative(value, -1);
          }
          onKeyDown?.(event);
        }}
        className={cn(
          "-mb-px border-b-2 border-transparent px-3 pb-2 font-mono text-xs uppercase tracking-[0.1em] transition-colors duration-200 ease-[var(--ease-out)] hover:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30 disabled:pointer-events-none disabled:opacity-50",
          selected ? "border-accent text-foreground" : "text-muted-foreground",
          className,
        )}
        {...props}
      />
    );
  },
);
TabsTrigger.displayName = "TabsTrigger";

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The `TabsTrigger` value this panel belongs to. */
  value: string;
}

/**
 * The panel for one tab. Inactive panels unmount rather than hide, so keep any
 * state you need to survive a tab switch in the parent.
 */
export const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, ...props }, ref) => {
    const { value: active } = useTabsContext("TabsContent");
    if (active !== value) return null;
    return (
      <div
        ref={ref}
        role="tabpanel"
        className={cn("text-sm text-muted-foreground focus-visible:outline-none", className)}
        {...props}
      />
    );
  },
);
TabsContent.displayName = "TabsContent";
