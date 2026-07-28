import * as React from "react";
import { cn } from "../../lib/cn";

/**
 * A definition list for key/value facts. Rows are separated by hairline dashed
 * rules (the last row's rule is dropped). Renders a real `<dl>`; each `DataRow`
 * is a `<div>` grouping a `<dt>`/`<dd>` pair (valid HTML5), so it's accessible
 * and copy-pastable.
 *
 * ```tsx
 * <DataList>
 *   <DataRow label="Location">Oslo, Norway</DataRow>
 *   <DataRow label="IP" mono>203.0.113.7</DataRow>
 * </DataList>
 * ```
 */
export const DataList = React.forwardRef<HTMLDListElement, React.HTMLAttributes<HTMLDListElement>>(
  ({ className, ...props }, ref) => (
    <dl ref={ref} data-slot="data-list" className={cn("flex flex-col", className)} {...props} />
  ),
);
DataList.displayName = "DataList";

export interface DataRowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The row's key/term. */
  label: React.ReactNode;
  /** Render the value in the mono type family (for IPs, hashes, headers…). */
  mono?: boolean;
}

export const DataRow = React.forwardRef<HTMLDivElement, DataRowProps>(
  ({ label, mono, className, children, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="data-row"
      className={cn(
        "flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5 border-b border-dashed border-border py-1.5 last:border-b-0",
        className,
      )}
      {...props}
    >
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd
        className={cn(
          "m-0 max-w-[64%] break-words text-right text-sm text-foreground",
          mono && "font-mono text-[0.9em]",
        )}
      >
        {children}
      </dd>
    </div>
  ),
);
DataRow.displayName = "DataRow";
