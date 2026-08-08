import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/cn";
import { CloseIcon } from "../../lib/icons";

interface SheetContextValue {
  close: () => void;
  titleId: string;
  descriptionId: string;
  setHasTitle: (present: boolean) => void;
  setHasDescription: (present: boolean) => void;
}

const SheetContext = React.createContext<SheetContextValue | null>(null);

const sheetVariants = cva(
  [
    "m-0 max-h-none border-border bg-card p-0 text-card-foreground shadow-[var(--shadow-lg)]",
    "backdrop:bg-[var(--overlay)] backdrop:backdrop-blur-[2px]",
    // The slide is progressive enhancement: `@starting-style` and
    // `transition-behavior: allow-discrete` are current-browser-only, and where
    // they're missing the sheet simply appears in place, fully usable.
    "transition-[transform,opacity,overlay,display] duration-[var(--dur-base)] ease-[var(--ease-out)]",
    "[transition-behavior:allow-discrete] opacity-0 open:opacity-100",
    "motion-reduce:transition-none motion-reduce:translate-x-0 motion-reduce:translate-y-0",
  ].join(" "),
  {
    variants: {
      side: {
        right:
          "ml-auto mr-0 h-[100dvh] w-[min(24rem,100vw-3rem)] border-l translate-x-full open:translate-x-0 [@starting-style]:open:translate-x-full",
        left: "ml-0 mr-auto h-[100dvh] w-[min(24rem,100vw-3rem)] border-r -translate-x-full open:translate-x-0 [@starting-style]:open:-translate-x-full",
        top: "mt-0 mb-auto max-h-[85dvh] w-full border-b -translate-y-full open:translate-y-0 [@starting-style]:open:-translate-y-full",
        bottom:
          "mt-auto mb-0 max-h-[85dvh] w-full border-t translate-y-full open:translate-y-0 [@starting-style]:open:translate-y-full",
      },
    },
    defaultVariants: { side: "right" },
  },
);

export interface SheetProps extends VariantProps<typeof sheetVariants> {
  /** Whether the sheet is showing. Pass it to control the sheet yourself. */
  open?: boolean;
  /** Initial open state when uncontrolled. Ignored if `open` is provided. */
  defaultOpen?: boolean;
  /** Called with `false` on Esc, the ✕ button, a `SheetClose`, or a backdrop click. */
  onOpenChange?: (open: boolean) => void;
  /** Extra classes for the sheet panel itself. */
  className?: string;
  /** Usually a single `SheetContent`. Only mounted while open. */
  children: React.ReactNode;
}

/**
 * A panel that slides in from an edge — mobile navigation, a filter drawer, a
 * detail pane beside a list.
 *
 * Built on the **native `<dialog>` element**, the same as `Dialog`, so
 * focus-trapping, Esc, background inerting and the top layer come from the
 * platform rather than from JavaScript. One modal implementation, not two.
 *
 * **A sheet is a `Dialog` that came from the side.** Reach for it when the
 * content is a list to scan or navigate — it can be tall, and the edge anchoring
 * reads as "somewhere else in the app". Use `Dialog` when the content is a
 * decision to make; use a page when it's neither. **Don't** put a sheet inside a
 * sheet: on a phone that's a trapdoor with no visible way back.
 *
 * The slide-in is progressive enhancement (`@starting-style` +
 * `transition-behavior: allow-discrete`). Where a browser lacks them the sheet
 * appears in place, fully usable — and `prefers-reduced-motion` skips it too.
 *
 * ```tsx
 * <Sheet open={open} onOpenChange={setOpen} side="left">
 *   <SheetContent>
 *     <SheetHeader>
 *       <SheetTitle>Menu</SheetTitle>
 *     </SheetHeader>
 *     <nav>…</nav>
 *   </SheetContent>
 * </Sheet>
 * ```
 */
export function Sheet({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  side,
  className,
  children,
}: SheetProps) {
  const ref = React.useRef<HTMLDialogElement>(null);
  const pressStartedOnBackdrop = React.useRef(false);
  const reactId = React.useId();
  const titleId = `${reactId}-title`;
  const descriptionId = `${reactId}-description`;

  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const isControlled = openProp !== undefined;
  const open = isControlled ? openProp : uncontrolledOpen;

  const [hasTitle, setHasTitle] = React.useState(false);
  const [hasDescription, setHasDescription] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    else if (!open && el.open) el.close();
  }, [open]);

  const close = React.useCallback(() => {
    if (!isControlled) setUncontrolledOpen(false);
    onOpenChange?.(false);
  }, [isControlled, onOpenChange]);

  const ctx = React.useMemo<SheetContextValue>(
    () => ({ close, titleId, descriptionId, setHasTitle, setHasDescription }),
    [close, titleId, descriptionId],
  );

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: backdrop dismissal is an enhancement; keyboard close (Esc) is handled natively by <dialog>
    <dialog
      ref={ref}
      aria-labelledby={hasTitle ? titleId : undefined}
      aria-describedby={hasDescription ? descriptionId : undefined}
      onClose={close}
      // Require the press to both start and end on the backdrop, so releasing a
      // text selection that began inside the sheet doesn't dismiss it.
      onMouseDown={(event) => {
        pressStartedOnBackdrop.current = event.target === ref.current;
      }}
      onClick={(event) => {
        if (event.target === ref.current && pressStartedOnBackdrop.current) close();
        pressStartedOnBackdrop.current = false;
      }}
      data-slot="sheet"
      className={cn(sheetVariants({ side }), className)}
    >
      {open ? <SheetContext.Provider value={ctx}>{children}</SheetContext.Provider> : null}
    </dialog>
  );
}

/** The scrolling body of the sheet, and where the ✕ button lives. */
export const SheetContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const ctx = React.useContext(SheetContext);
    return (
      <div
        ref={ref}
        data-slot="sheet-content"
        className={cn("relative flex h-full flex-col overflow-y-auto p-6", className)}
        {...props}
      >
        {children}
        <button
          type="button"
          onClick={() => ctx?.close()}
          className="absolute top-4 right-4 inline-flex size-7 items-center justify-center rounded-[var(--radius-sm)] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30"
        >
          <CloseIcon className="size-4" />
          <span className="sr-only">Close</span>
        </button>
      </div>
    );
  },
);
SheetContent.displayName = "SheetContent";

/** Title + description block, inset on the right to clear the close button. */
export const SheetHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="sheet-header"
      className={cn("mb-5 flex flex-col gap-1.5 pr-8", className)}
      {...props}
    />
  ),
);
SheetHeader.displayName = "SheetHeader";

/** The sheet's `<h2>`. Names the sheet for assistive tech — always include one. */
export const SheetTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  const ctx = React.useContext(SheetContext);
  const setHasTitle = ctx?.setHasTitle;
  React.useEffect(() => {
    setHasTitle?.(true);
    return () => setHasTitle?.(false);
  }, [setHasTitle]);
  return (
    <h2
      ref={ref}
      id={ctx?.titleId}
      data-slot="sheet-title"
      className={cn(
        "font-mono text-sm font-bold uppercase tracking-[0.1em] text-foreground",
        className,
      )}
      {...props}
    />
  );
});
SheetTitle.displayName = "SheetTitle";

/** The muted sentence under the title. */
export const SheetDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const ctx = React.useContext(SheetContext);
  const setHasDescription = ctx?.setHasDescription;
  React.useEffect(() => {
    setHasDescription?.(true);
    return () => setHasDescription?.(false);
  }, [setHasDescription]);
  return (
    <p
      ref={ref}
      id={ctx?.descriptionId}
      data-slot="sheet-description"
      className={cn("text-sm leading-relaxed text-muted-foreground", className)}
      {...props}
    />
  );
});
SheetDescription.displayName = "SheetDescription";

/** The action row, pinned to the bottom of the panel. */
export const SheetFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="sheet-footer"
      className={cn(
        "mt-auto flex flex-col-reverse gap-2 pt-6 sm:flex-row sm:justify-end",
        className,
      )}
      {...props}
    />
  ),
);
SheetFooter.displayName = "SheetFooter";

export interface SheetCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Render the single child as the trigger instead of a `<button>`. */
  asChild?: boolean;
}

/** Closes the sheet. Wrap your own control with `asChild`. */
export const SheetClose = React.forwardRef<HTMLButtonElement, SheetCloseProps>(
  ({ asChild, onClick, type, ...props }, ref) => {
    const ctx = React.useContext(SheetContext);
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        type={asChild ? type : (type ?? "button")}
        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
          onClick?.(event);
          if (!event.defaultPrevented) ctx?.close();
        }}
        {...props}
      />
    );
  },
);
SheetClose.displayName = "SheetClose";
