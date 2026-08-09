import * as React from "react";
import { cn } from "../../lib/cn";
import { named } from "../../lib/named";
import { Separator } from "./separator";

export interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The heading element. Pick the level the document outline needs. Default `"h2"`. */
  as?: React.ElementType;
  /** Drop the rule, leaving the label on its own. */
  rule?: boolean;
  /** Pinned after the rule — a count, a toggle, a "clear" button. */
  actions?: React.ReactNode;
}

/**
 * A section label in the tracked-out mono voice, with a hairline that runs from
 * the end of the words to the edge of the column.
 *
 * The rule is what makes a long page legible without boxing every section: it
 * marks where each one starts and measures the column, so sections can sit
 * directly on the page instead of inside cards. Use it as the standing heading
 * for a run of `DataList` rows, a `FindingList`, or a table.
 *
 * It renders a wrapper `<div>` around a real heading, so pass `as` to place it
 * at the right level of the outline — the rule and any `actions` are decoration
 * and stay outside the heading text.
 *
 * **Reach for `Separator` alone** when you want a divider with no label, and for
 * **`CardHeader`** when the section really is a card — this is the flat
 * alternative to that, not a variant of it.
 *
 * ```tsx
 * <SectionHeading as="h2">Exit &amp; network</SectionHeading>
 * <SectionHeading as="h3" actions={<Badge>4</Badge>}>Leak checks</SectionHeading>
 * ```
 */
export const SectionHeading = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<HTMLDivElement, SectionHeadingProps>(
    ({ as: Comp = "h2", rule = true, actions, className, children, ...props }, ref) => (
      <div
        ref={ref}
        data-slot="section-heading"
        className={cn("flex items-center gap-3.5", className)}
        {...props}
      >
        <Comp className="m-0 font-bold font-mono text-[11px] text-foreground uppercase tracking-[0.18em]">
          {children}
        </Comp>
        {rule ? <Separator className="flex-1" /> : null}
        {actions}
      </div>
    ),
  ),
  "SectionHeading",
);
