import * as React from "react";
import { cn } from "../../lib/cn";

/** How a `DataRow` lays out its term/description pair. */
export type DataLayout = "justify" | "grid";

const DataListContext = React.createContext<DataLayout>("justify");

export interface DataListProps extends React.HTMLAttributes<HTMLDListElement> {
  /**
   * How child rows lay out, cascaded to every `DataRow` (each row can still
   * override its own `layout`):
   * - `"justify"` (default) — term left, value right-aligned, dashed row rule.
   *   Best for compact fact pairs where the value is short-to-medium.
   * - `"grid"` — a fixed eyebrow label column + value, collapsing to a single
   *   column on narrow screens. Best for a scannable field list. Set the label
   *   column width with the `--mlz-data-label` CSS var (default `8rem`).
   */
  layout?: DataLayout;
}

/**
 * A definition list for key/value facts. Renders a real `<dl>`; each `DataRow`
 * is a `<div>` grouping a `<dt>`/`<dd>` pair (valid HTML5), so it's accessible
 * and copy-pastable.
 *
 * ```tsx
 * <DataList>
 *   <DataRow label="Location">Oslo, Norway</DataRow>
 *   <DataRow label="IP" mono>203.0.113.7</DataRow>
 * </DataList>
 *
 * <DataList layout="grid">
 *   <DataRow label="User agent" mono>Mozilla/5.0 …</DataRow>
 * </DataList>
 * ```
 */
export const DataList = React.forwardRef<HTMLDListElement, DataListProps>(
  ({ layout = "justify", className, ...props }, ref) => (
    <DataListContext.Provider value={layout}>
      <dl
        ref={ref}
        data-slot="data-list"
        data-layout={layout}
        className={cn("flex flex-col", className)}
        {...props}
      />
    </DataListContext.Provider>
  ),
);
DataList.displayName = "DataList";

export interface DataRowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The row's key/term. */
  label: React.ReactNode;
  /** Render the value in the mono type family (for IPs, hashes, headers…). */
  mono?: boolean;
  /** Override the layout inherited from the parent `DataList`. */
  layout?: DataLayout;
}

export const DataRow = React.forwardRef<HTMLDivElement, DataRowProps>(
  ({ label, mono, layout, className, children, ...props }, ref) => {
    const inherited = React.useContext(DataListContext);
    const resolved = layout ?? inherited;
    const grid = resolved === "grid";
    return (
      <div
        ref={ref}
        data-slot="data-row"
        data-layout={resolved}
        className={cn(
          "border-b border-border py-1.5 last:border-b-0",
          grid
            ? "grid grid-cols-[var(--mlz-data-label,8rem)_minmax(0,1fr)] items-baseline gap-x-4 gap-y-1 max-[560px]:grid-cols-1 max-[560px]:gap-y-0.5"
            : "flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5 border-dashed",
          className,
        )}
        {...props}
      >
        <dt
          className={cn(
            grid
              ? "font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground"
              : "text-sm text-muted-foreground",
          )}
        >
          {label}
        </dt>
        <dd
          className={cn(
            "m-0 break-words text-sm text-foreground",
            grid ? "min-w-0" : "max-w-[64%] text-right",
            mono && "font-mono text-[0.9em]",
          )}
        >
          {children}
        </dd>
      </div>
    );
  },
);
DataRow.displayName = "DataRow";
