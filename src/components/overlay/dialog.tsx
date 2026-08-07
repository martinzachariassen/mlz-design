import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import { cn } from "../../lib/cn";

interface DialogContextValue {
  close: () => void;
  titleId: string;
  descriptionId: string;
  setHasTitle: (present: boolean) => void;
  setHasDescription: (present: boolean) => void;
}

const DialogContext = React.createContext<DialogContextValue | null>(null);

export interface DialogProps {
  /** Whether the dialog is showing. Pass it to control the dialog yourself. */
  open?: boolean;
  /** Initial open state when uncontrolled. Ignored if `open` is provided. */
  defaultOpen?: boolean;
  /** Called with `false` on Esc, the ✕ button, a `DialogClose`, or a backdrop click. */
  onOpenChange?: (open: boolean) => void;
  /** The dialog body — usually a single `DialogContent`. Only mounted while open. */
  children: React.ReactNode;
}

/**
 * A modal dialog built on the native `<dialog>` element — so focus-trapping, the
 * Esc key, background inerting and the top layer come from the platform, with no
 * dependency. Works controlled (`open` / `onOpenChange`) or uncontrolled
 * (`defaultOpen`). Children only mount while it's open, so a form inside starts
 * fresh each time. Clicking the backdrop dismisses it.
 *
 * A `DialogTitle` and `DialogDescription` name and describe the dialog
 * automatically — they're wired to it via `aria-labelledby` / `aria-describedby`,
 * so screen readers announce them on open.
 *
 * **Use a dialog** when the task genuinely blocks — a confirmation before
 * something irreversible, or a short focused form. It takes over the screen and
 * traps focus, so the cost is high: **reach for `InfoTip`** for optional
 * explanation, and put anything longer than a couple of fields on its own page.
 * Always give it a `DialogTitle`, or it reaches assistive tech unnamed.
 *
 * ```tsx
 * <Dialog open={open} onOpenChange={setOpen}>
 *   <DialogContent>
 *     <DialogHeader>
 *       <DialogTitle>Delete project</DialogTitle>
 *       <DialogDescription>This can't be undone.</DialogDescription>
 *     </DialogHeader>
 *     <DialogFooter>
 *       <DialogClose asChild><Button variant="ghost">Cancel</Button></DialogClose>
 *       <Button variant="destructive">Delete</Button>
 *     </DialogFooter>
 *   </DialogContent>
 * </Dialog>
 * ```
 */
export function Dialog({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  children,
}: DialogProps) {
  const ref = React.useRef<HTMLDialogElement>(null);
  const pressStartedOnBackdrop = React.useRef(false);
  const reactId = React.useId();
  const titleId = `${reactId}-title`;
  const descriptionId = `${reactId}-description`;

  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const isControlled = openProp !== undefined;
  const open = isControlled ? openProp : uncontrolledOpen;

  // Only advertise the label/description once the matching part actually renders,
  // so a dialog without a title doesn't point `aria-labelledby` at nothing.
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

  const ctx = React.useMemo<DialogContextValue>(
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
      // text selection that began inside the dialog doesn't dismiss it.
      onMouseDown={(event) => {
        pressStartedOnBackdrop.current = event.target === ref.current;
      }}
      onClick={(event) => {
        if (event.target === ref.current && pressStartedOnBackdrop.current) close();
        pressStartedOnBackdrop.current = false;
      }}
      className="m-auto w-[calc(100%-2rem)] max-w-lg overflow-visible bg-transparent p-0 text-foreground backdrop:bg-[var(--overlay)] backdrop:backdrop-blur-[2px]"
    >
      {open ? <DialogContext.Provider value={ctx}>{children}</DialogContext.Provider> : null}
    </dialog>
  );
}

/**
 * The card surface inside the dialog, and where the ✕ close button lives. Caps at
 * 85% of the viewport height and scrolls its own overflow.
 */
export const DialogContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const ctx = React.useContext(DialogContext);
    return (
      <div
        ref={ref}
        data-slot="dialog-content"
        className={cn(
          "relative mx-auto max-h-[85dvh] w-full overflow-y-auto rounded-[var(--radius-lg)] border border-border bg-card p-6 text-card-foreground shadow-[var(--shadow-lg)] motion-safe:animate-rise",
          className,
        )}
        {...props}
      >
        {children}
        <button
          type="button"
          onClick={() => ctx?.close()}
          className="absolute top-4 right-4 inline-flex size-7 items-center justify-center rounded-[var(--radius-sm)] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30"
        >
          <span aria-hidden className="text-base leading-none">
            ✕
          </span>
          <span className="sr-only">Close</span>
        </button>
      </div>
    );
  },
);
DialogContent.displayName = "DialogContent";

/** Title + description block, inset on the right to clear the close button. */
export const DialogHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="dialog-header"
      className={cn("mb-4 flex flex-col gap-1.5 pr-8", className)}
      {...props}
    />
  ),
);
DialogHeader.displayName = "DialogHeader";

/** The dialog's `<h2>` heading, in tracked-out mono. Names the dialog for AT. */
export const DialogTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  const ctx = React.useContext(DialogContext);
  const setHasTitle = ctx?.setHasTitle;
  React.useEffect(() => {
    setHasTitle?.(true);
    return () => setHasTitle?.(false);
  }, [setHasTitle]);
  return (
    <h2
      ref={ref}
      id={ctx?.titleId}
      data-slot="dialog-title"
      className={cn(
        "font-mono text-sm font-bold uppercase tracking-[0.1em] text-foreground",
        className,
      )}
      {...props}
    />
  );
});
DialogTitle.displayName = "DialogTitle";

/** The muted sentence under the title — say what's about to happen. */
export const DialogDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const ctx = React.useContext(DialogContext);
  const setHasDescription = ctx?.setHasDescription;
  React.useEffect(() => {
    setHasDescription?.(true);
    return () => setHasDescription?.(false);
  }, [setHasDescription]);
  return (
    <p
      ref={ref}
      id={ctx?.descriptionId}
      data-slot="dialog-description"
      className={cn("text-sm leading-relaxed text-muted-foreground", className)}
      {...props}
    />
  );
});
DialogDescription.displayName = "DialogDescription";

/**
 * The action row. Write the buttons in reading order (cancel first, confirm
 * last): it reverses to a full-width column on mobile so the confirm lands on
 * top, then flows right-aligned from `sm` up.
 */
export const DialogFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="dialog-footer"
      className={cn(
        "mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-3",
        className,
      )}
      {...props}
    />
  ),
);
DialogFooter.displayName = "DialogFooter";

export interface DialogCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Render the single child as the trigger (forwarding the close handler) instead of a <button>. */
  asChild?: boolean;
}

/** Closes the dialog. Wrap your own control with `asChild`. */
export const DialogClose = React.forwardRef<HTMLButtonElement, DialogCloseProps>(
  ({ asChild, onClick, type, ...props }, ref) => {
    const ctx = React.useContext(DialogContext);
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
DialogClose.displayName = "DialogClose";
