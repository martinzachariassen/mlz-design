import * as React from "react";
import { cn } from "../../lib/cn";
import { named } from "../../lib/named";

/** How a `DataRow` lays out its term/description pair. */
export type DataLayout = "justify" | "grid" | "ledger";

const DataListContext = /* @__PURE__ */ React.createContext<DataLayout>("justify");

export interface DataListProps extends React.HTMLAttributes<HTMLDListElement> {
  /**
   * How child rows lay out, cascaded to every `DataRow` (each row can still
   * override its own `layout`):
   * - `"justify"` (default) — term left, value right-aligned, dashed row rule.
   *   Best for compact fact pairs where the value is short-to-medium.
   * - `"grid"` — a fixed eyebrow label column + value, collapsing to a single
   *   column on narrow screens. Best for a scannable field list. Set the label
   *   column width with the `--mlz-data-label` CSS var (default `8rem`).
   * - `"ledger"` — `grid`, plus the ruled margin: a rule down the left edge of
   *   the list and another between label and value, with lighter hairlines
   *   between rows. Best when several lists sit on the bare page and the rules
   *   have to do the work cards would otherwise do.
   */
  layout?: DataLayout;
}

/**
 * A definition list for key/value facts. Renders a real `<dl>`; each `DataRow`
 * is a `<div>` grouping a `<dt>`/`<dd>` pair (valid HTML5), so it's accessible
 * and copy-pastable.
 *
 * **Use it** for the facts *about one thing* — a spec panel, a metadata block, a
 * receipt. **Reach for `Table`** the moment you have the same fields across
 * several rows: a definition list has no column headers and no row semantics, so
 * it can't express a grid of data accessibly.
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
export const DataList = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<HTMLDListElement, DataListProps>(
    ({ layout = "justify", className, ...props }, ref) => (
      <DataListContext.Provider value={layout}>
        <dl
          ref={ref}
          data-slot="data-list"
          data-layout={layout}
          className={cn(
            "flex flex-col",
            layout === "ledger" && "border-border border-l",
            className,
          )}
          {...props}
        />
      </DataListContext.Provider>
    ),
  ),
  "DataList",
);

export interface DataRowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The row's key/term. */
  label: React.ReactNode;
  /** Render the value in the mono type family (for IPs, hashes, headers…). */
  mono?: boolean;
  /** Override the layout inherited from the parent `DataList`. */
  layout?: DataLayout;
}

/**
 * One `<dt>`/`<dd>` pair inside a `DataList` — the label on the left, the value
 * as children.
 *
 * Layout is inherited from the parent `DataList`; set `layout` here only to
 * break one row out of it, typically because the value is long enough that
 * `justify` would crush it against the label. Set `mono` for values the reader
 * may need to compare character by character — IPs, hashes, headers, IDs.
 *
 * ```tsx
 * <DataRow label="IP" mono>203.0.113.7</DataRow>
 * <DataRow label="User agent" mono layout="grid">Mozilla/5.0 …</DataRow>
 * ```
 */
export const DataRow = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<HTMLDivElement, DataRowProps>(
    ({ label, mono, layout, className, children, ...props }, ref) => {
      const inherited = React.useContext(DataListContext);
      const resolved = layout ?? inherited;
      const ledger = resolved === "ledger";
      // `ledger` is `grid` with rules, so everything the grid layout does about
      // columns applies to both.
      const grid = ledger || resolved === "grid";
      return (
        <div
          ref={ref}
          data-slot="data-row"
          data-layout={resolved}
          className={cn(
            "py-1.5",
            // The ledger rules the *tops* of rows and lightens them, so the run
            // reads as one ruled block hanging off the list's left edge; the
            // other layouts close each row with a full-weight rule instead.
            ledger
              ? "border-[color-mix(in_oklch,var(--border)_45%,transparent)] border-t first:border-t-0"
              : "border-border border-b last:border-b-0",
            grid
              ? "grid grid-cols-[var(--mlz-data-label,8rem)_minmax(0,1fr)] items-baseline gap-x-4 gap-y-1 max-[560px]:grid-cols-1 max-[560px]:gap-y-0.5"
              : "flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5 border-dashed",
            // The rule and its padding are the gutter in a ledger; the grid gap
            // on top of them would open a visible gap beside the rule.
            ledger && "gap-x-0",
            className,
          )}
          {...props}
        >
          <dt
            className={cn(
              grid
                ? "font-mono text-[10px] text-muted-foreground uppercase tracking-[0.14em]"
                : "text-muted-foreground text-sm",
              ledger && "pl-3.5",
            )}
          >
            {label}
          </dt>
          <dd
            className={cn(
              "m-0 break-words text-foreground text-sm",
              grid ? "min-w-0" : "max-w-[64%] text-right",
              // The second rule only makes sense while there are two columns —
              // once the grid collapses it would be a stray mark down the page.
              ledger &&
                "border-[color-mix(in_oklch,var(--border)_55%,transparent)] border-l pl-4 max-[560px]:border-l-0 max-[560px]:pl-3.5",
              mono && "font-mono text-[0.9em]",
            )}
          >
            {children}
          </dd>
        </div>
      );
    },
  ),
  "DataRow",
);
