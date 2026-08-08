import * as PopoverPrimitive from "@radix-ui/react-popover";
import * as React from "react";
import { cn } from "../../lib/cn";

export interface InfoTipProps {
  /**
   * Accessible name for the trigger button and, when no `title` is given, the
   * popover's label. Required — a bare icon button is meaningless to AT.
   */
  label: string;
  /** Optional bold heading shown at the top of the popover. */
  title?: React.ReactNode;
  /** The explanation. Plain text or rich content (a link, `<code>`, …). */
  children: React.ReactNode;
  /** Preferred side to open on. `auto` (default) prefers below, and flips when there's no room. */
  side?: "top" | "bottom" | "auto";
  /** Controlled open state. Provide `onOpenChange` alongside it. */
  open?: boolean;
  /** Notified whenever the open state should change (controlled or not). */
  onOpenChange?: (open: boolean) => void;
  /** Extra classes for the trigger button. */
  className?: string;
  /** Extra classes for the popover panel. */
  contentClassName?: string;
}

const GAP = 8; // space between trigger and panel
const MARGIN = 8; // min distance from the viewport edge

/**
 * An inline "info tip": a small icon button that sits in the flow of text and,
 * on click, opens a little popover explaining a term. Built for glossary-style
 * help — pair a piece of jargon with a plain-language "what / why".
 *
 * Built on the Radix popover primitive, so the panel renders in a portal (no
 * ancestor `overflow: hidden` can clip it) as a non-modal `role="dialog"`,
 * positions itself with collision detection — flipping and clamping to stay in
 * the viewport — and light-dismisses on outside-click, Esc, or a second click on
 * the trigger. Focus moves into the panel on open and returns to the trigger on
 * close.
 *
 * The trigger sizes itself in `em`, so it tracks the font-size of whatever text
 * it's dropped into.
 *
 * **Use it** for optional context a reader can ignore — defining jargon, or
 * explaining why a field is asked for. **Reach for `Dialog`** when the content
 * needs a decision or its own actions, and just write the sentence inline when
 * it's short enough: an info tip that everyone has to open is a sign the text
 * belonged on the page. Never hide *required* instructions behind one.
 *
 * ```tsx
 * <p>
 *   Your ASN
 *   <InfoTip label="What is an ASN?" title="ASN — Autonomous System Number">
 *     The network (usually an ISP or host) that announces your IP to the internet.
 *   </InfoTip>
 * </p>
 * ```
 */
export function InfoTip({
  label,
  title,
  children,
  side = "auto",
  open,
  onOpenChange,
  className,
  contentClassName,
}: InfoTipProps) {
  const titleId = React.useId();

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <PopoverPrimitive.Trigger
        data-slot="info-tip-trigger"
        aria-label={label}
        className={cn(
          "inline-flex size-[1.15em] shrink-0 cursor-help items-center justify-center rounded-full align-[-0.15em] text-muted-foreground transition-colors",
          "hover:text-accent-deep focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30",
          "data-[state=open]:text-accent-deep",
          className,
        )}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-[0.95em]"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          // `auto` is Radix's default behaviour: prefer below, flip when short of
          // room. An explicit side is a *preference* too — collision handling stays
          // on so the panel can never end up off-screen.
          side={side === "auto" ? "bottom" : side}
          sideOffset={GAP}
          collisionPadding={MARGIN}
          aria-labelledby={title ? titleId : undefined}
          aria-label={title ? undefined : label}
          data-slot="info-tip-content"
          className={cn(
            "z-50 w-[min(20rem,calc(100vw-1rem))] rounded-[var(--radius-lg)] border border-border bg-popover p-3.5 text-popover-foreground shadow-[var(--shadow-lg)] outline-none motion-safe:animate-rise",
            contentClassName,
          )}
        >
          {title ? (
            <p
              id={titleId}
              className="mb-1.5 font-mono text-xs font-bold uppercase tracking-[0.08em] text-foreground"
            >
              {title}
            </p>
          ) : null}
          <div className="text-[13px] leading-relaxed text-muted-foreground">{children}</div>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
InfoTip.displayName = "InfoTip";
