import * as React from "react";
import { cn } from "../../lib/cn";
import { named } from "../../lib/named";
import { StatusDot, type StatusDotProps } from "../data-display/status-dot";

/**
 * A run of checks that have been made and their results — the output of a scan,
 * an audit, a lint pass.
 *
 * Each item states its finding in a sentence and explains it underneath, led by
 * a status dot. The list hangs off a single rule down its left edge, so a page
 * can carry several of these without turning into a stack of boxes.
 *
 * **Reach for `Callout` or `Alert`** when there is *one* thing and the reader has
 * to act on it — those are block-level and demand attention, which is exactly
 * wrong repeated eight times. **Reach for `StatusChip`** when the findings are
 * short enough to sit in a row and need no explanation. This is the middle case:
 * many findings, each worth a sentence.
 *
 * ```tsx
 * <FindingList>
 *   <FindingItem variant="warning" title="WebRTC exposes a different public IP">
 *     A site can read an address that doesn't match the one your requests come from.
 *   </FindingItem>
 *   <FindingItem variant="success" title="No DNS leak">
 *     One resolver answered, and it's the one you'd expect.
 *   </FindingItem>
 * </FindingList>
 * ```
 */
export const FindingList = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>(
    ({ className, ...props }, ref) => (
      <ul
        ref={ref}
        data-slot="finding-list"
        className={cn("m-0 list-none border-border border-l p-0 pl-3.5", className)}
        {...props}
      />
    ),
  ),
  "FindingList",
);

// `title` is the finding, not the browser's tooltip attribute — same trade
// `Callout` makes.
export interface FindingItemProps extends Omit<React.HTMLAttributes<HTMLLIElement>, "title"> {
  /** The finding itself, in a sentence. */
  title: React.ReactNode;
  /** Which semantic role the dot carries. */
  variant?: StatusDotProps["variant"];
  /**
   * Names the state for assistive tech ("Warning", "OK"). Set it when the title
   * alone doesn't say which way the finding went — the dot is otherwise
   * decorative, and colour must never be the only carrier.
   */
  statusLabel?: string;
}

/**
 * One check and its result. `title` is the finding; the children explain what it
 * means in plain words, indented under it.
 */
export const FindingItem = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<HTMLLIElement, FindingItemProps>(
    ({ title, variant, statusLabel, className, children, ...props }, ref) => (
      <li
        ref={ref}
        data-slot="finding-item"
        className={cn(
          // A 45% mix, not the full border: the rules *between* findings are
          // lighter than the rule the list hangs on, so the group reads as one
          // block rather than a stack of separate rows.
          "border-[color-mix(in_oklch,var(--border)_45%,transparent)] border-t py-2.5 first:border-t-0 first:pt-0 last:pb-0",
          className,
        )}
        {...props}
      >
        <p className="m-0 flex items-center gap-2.5 font-medium text-foreground text-sm">
          <StatusDot variant={variant} label={statusLabel} />
          {title}
        </p>
        {children ? (
          // Indented to clear the dot, so the explanation reads as belonging to
          // the line above it rather than as another finding.
          <p className="mt-1 mb-0 ml-4 text-muted-foreground text-xs leading-relaxed">{children}</p>
        ) : null}
      </li>
    ),
  ),
  "FindingItem",
);
