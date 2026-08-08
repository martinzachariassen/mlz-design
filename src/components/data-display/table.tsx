import * as React from "react";
import { cn } from "../../lib/cn";
import { named } from "../../lib/named";

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  /** Extra classes for the scroll container that wraps the table. */
  containerClassName?: string;
}

/**
 * A real `<table>` in the mlz voice: mono column headers in the eyebrow style,
 * hairline row rules, and a row tint on hover. It wraps itself in a horizontal
 * scroll container, so a wide table scrolls inside its own box instead of
 * pushing the page sideways.
 *
 * **Use a table when the same fields repeat across many rows** — that's what
 * column headers and row semantics are for, and it's how screen readers announce
 * "column X, row Y" while navigating. **Reach for `DataList`** when you're
 * showing the facts *about one thing*: a spec panel or a metadata block is a
 * definition list, not a one-row grid.
 *
 * Give it a `TableCaption` unless a heading right above it already names it — a
 * table with no accessible name is hard to place when tabbing through a page.
 * For long-form article content, `Prose` already styles raw `<table>` markup, so
 * don't nest this inside it.
 *
 * ```tsx
 * <Table>
 *   <TableCaption>Deploys this week</TableCaption>
 *   <TableHeader>
 *     <TableRow>
 *       <TableHead>Project</TableHead>
 *       <TableHead align="right">Duration</TableHead>
 *     </TableRow>
 *   </TableHeader>
 *   <TableBody>
 *     <TableRow>
 *       <TableCell>mlz-design</TableCell>
 *       <TableCell align="right">54s</TableCell>
 *     </TableRow>
 *   </TableBody>
 * </Table>
 * ```
 */
export const Table = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<HTMLTableElement, TableProps>(
    ({ className, containerClassName, ...props }, ref) => (
      // A scrollable box must be reachable by keyboard (WCAG 2.1.1, and axe's
      // `scrollable-region-focusable`), or someone who can't drag horizontally
      // simply can't read the far columns. Deliberately no `role="region"`: that
      // would be a landmark, and a landmark with no accessible name is worse than
      // none. The table names itself, via `TableCaption` or `aria-label`.
      <div
        data-slot="table-container"
        className={cn("relative w-full overflow-x-auto", containerClassName)}
        // biome-ignore lint/a11y/noNoninteractiveTabindex: making the scroll container focusable is the point — it's how a keyboard user scrolls a wide table
        tabIndex={0}
      >
        <table
          ref={ref}
          data-slot="table"
          className={cn("w-full caption-bottom border-collapse text-sm", className)}
          {...props}
        />
      </div>
    ),
  ),
  "Table",
);

/** The `<thead>`. Holds one `TableRow` of `TableHead` cells. */
export const TableHeader = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<
    HTMLTableSectionElement,
    React.HTMLAttributes<HTMLTableSectionElement>
  >(({ className, ...props }, ref) => (
    <thead ref={ref} data-slot="table-header" className={cn(className)} {...props} />
  )),
  "TableHeader",
);

/** The `<tbody>` — the data rows. */
export const TableBody = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<
    HTMLTableSectionElement,
    React.HTMLAttributes<HTMLTableSectionElement>
  >(({ className, ...props }, ref) => (
    <tbody ref={ref} data-slot="table-body" className={cn(className)} {...props} />
  )),
  "TableBody",
);

/** The `<tfoot>` — totals and summaries. Muted, with the top rule carrying the weight. */
export const TableFooter = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<
    HTMLTableSectionElement,
    React.HTMLAttributes<HTMLTableSectionElement>
  >(({ className, ...props }, ref) => (
    <tfoot
      ref={ref}
      data-slot="table-footer"
      className={cn("border-t border-border font-medium [&>tr]:border-0", className)}
      {...props}
    />
  )),
  "TableFooter",
);

/** One row. Tints on hover, and marks itself when `data-state="selected"`. */
export const TableRow = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
    ({ className, ...props }, ref) => (
      <tr
        ref={ref}
        data-slot="table-row"
        className={cn(
          "border-b border-border transition-colors",
          "hover:bg-secondary/50 data-[state=selected]:bg-accent-subtle",
          className,
        )}
        {...props}
      />
    ),
  ),
  "TableRow",
);

/**
 * A column header. Mono, uppercase and tracked out, matching the eyebrow voice
 * `Prose` already gives raw `<th>` markup. Pass `scope="row"` for a row header.
 */
export const TableHead = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<
    HTMLTableCellElement,
    React.ThHTMLAttributes<HTMLTableCellElement>
  >(({ className, scope = "col", ...props }, ref) => (
    <th
      ref={ref}
      scope={scope}
      data-slot="table-head"
      className={cn(
        "border-b border-border py-2 pr-4 text-left align-middle font-mono text-[11px] font-normal uppercase tracking-[0.1em] text-muted-foreground",
        "[&[align=right]]:text-right [&[align=center]]:text-center",
        className,
      )}
      {...props}
    />
  )),
  "TableHead",
);

/** A data cell. */
export const TableCell = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<
    HTMLTableCellElement,
    React.TdHTMLAttributes<HTMLTableCellElement>
  >(({ className, ...props }, ref) => (
    <td
      ref={ref}
      data-slot="table-cell"
      className={cn(
        "py-2 pr-4 align-middle",
        "[&[align=right]]:text-right [&[align=center]]:text-center",
        className,
      )}
      {...props}
    />
  )),
  "TableCell",
);

/**
 * The table's name, rendered under it. This is what makes the table findable —
 * prefer it over a bare paragraph above the table, which isn't associated.
 */
export const TableCaption = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<
    HTMLTableCaptionElement,
    React.HTMLAttributes<HTMLTableCaptionElement>
  >(({ className, ...props }, ref) => (
    <caption
      ref={ref}
      data-slot="table-caption"
      className={cn("mt-3 text-left text-sm text-muted-foreground", className)}
      {...props}
    />
  )),
  "TableCaption",
);
