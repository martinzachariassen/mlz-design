import * as React from "react";
import { createPortal } from "react-dom";
import type { IconName } from "../../icons/generated";
import { cn } from "../../lib/cn";
import { Icon } from "../data-display/icon";

/**
 * An inline "info tip": a small icon button that sits in the flow of text and,
 * on click, opens a little popover explaining a term. Built for glossary-style
 * help — pair a piece of jargon with a plain-language "what / why".
 *
 * It's Radix-free and leans on the platform where it can: the panel renders in a
 * portal (so no ancestor `overflow: hidden` can clip it) as a non-modal
 * `role="dialog"`, positions itself with `getBoundingClientRect` (flipping above
 * the trigger when there's no room below and clamping to the viewport), and light-
 * dismisses on outside-click, Esc, or a second click on the trigger. Focus moves
 * into the panel on open and returns to the trigger on close.
 *
 * The trigger sizes itself in `em`, so it tracks the font-size of whatever text
 * it's dropped into.
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
  /** House icon for the trigger. Defaults to `info`; `circle-help` is the other natural pick. */
  icon?: IconName;
  /** Preferred side to open on. `auto` (default) flips to wherever there's room. */
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

interface Position {
  top: number;
  left: number;
  placement: "top" | "bottom";
  ready: boolean;
}

export function InfoTip({
  label,
  title,
  children,
  icon = "info",
  side = "auto",
  open: controlledOpen,
  onOpenChange,
  className,
  contentClassName,
}: InfoTipProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const [mounted, setMounted] = React.useState(false);
  const [position, setPosition] = React.useState<Position>({
    top: 0,
    left: 0,
    placement: "bottom",
    ready: false,
  });

  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const reactId = React.useId();
  const titleId = `${reactId}-title`;

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (!isControlled) setUncontrolledOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  // Portals need a client DOM; defer until after mount so SSR stays inert.
  React.useEffect(() => setMounted(true), []);

  const reposition = React.useCallback(() => {
    const trigger = triggerRef.current;
    const panel = panelRef.current;
    if (!trigger || !panel) return;

    const t = trigger.getBoundingClientRect();
    const p = panel.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const spaceBelow = vh - t.bottom;
    const spaceAbove = t.top;
    const fitsBelow = spaceBelow >= p.height + GAP + MARGIN;
    const placement: "top" | "bottom" =
      side === "top"
        ? "top"
        : side === "bottom"
          ? "bottom"
          : fitsBelow || spaceBelow >= spaceAbove
            ? "bottom"
            : "top";

    const top = placement === "bottom" ? t.bottom + GAP : Math.max(MARGIN, t.top - p.height - GAP);

    // Centre on the trigger, then clamp so the panel never leaves the viewport.
    const centred = t.left + t.width / 2 - p.width / 2;
    const left = Math.min(Math.max(MARGIN, centred), Math.max(MARGIN, vw - p.width - MARGIN));

    setPosition({ top, left, placement, ready: true });
  }, [side]);

  // Measure + place before paint so the panel never flashes at 0,0.
  React.useLayoutEffect(() => {
    if (!open) {
      setPosition((prev) => (prev.ready ? { ...prev, ready: false } : prev));
      return;
    }
    reposition();
    const onScroll = () => reposition();
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onScroll);
    };
  }, [open, reposition]);

  // Move focus into the panel on open so screen readers land on the explanation.
  React.useEffect(() => {
    if (!open) return;
    panelRef.current?.focus();
  }, [open]);

  // Light dismiss: Esc, or a pointer press outside both the trigger and panel.
  // Esc hands focus back to the trigger (keyboard users expect it); an outside
  // click leaves focus wherever the user clicked, so we don't yank it back.
  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (triggerRef.current?.contains(target) || panelRef.current?.contains(target)) return;
      setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown, true);
    document.addEventListener("pointerdown", onPointerDown, true);
    return () => {
      document.removeEventListener("keydown", onKeyDown, true);
      document.removeEventListener("pointerdown", onPointerDown, true);
    };
  }, [open, setOpen]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        data-slot="info-tip-trigger"
        aria-label={label}
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen(!open)}
        className={cn(
          "inline-flex size-[1.15em] shrink-0 cursor-help items-center justify-center rounded-full align-[-0.15em] text-muted-foreground transition-colors",
          "hover:text-accent focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30",
          open && "text-accent",
          className,
        )}
      >
        <Icon name={icon} aria-hidden className="size-[0.95em]" />
      </button>
      {mounted && open
        ? createPortal(
            <div
              ref={panelRef}
              // Focusable so screen readers land on the explanation on open and
              // blur/Esc can dismiss it; role="dialog" keeps it a valid tab target.
              tabIndex={-1}
              role="dialog"
              aria-labelledby={title ? titleId : undefined}
              aria-label={title ? undefined : label}
              data-slot="info-tip-content"
              data-placement={position.placement}
              style={{
                position: "fixed",
                top: position.top,
                left: position.left,
                opacity: position.ready ? 1 : 0,
              }}
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
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
InfoTip.displayName = "InfoTip";
