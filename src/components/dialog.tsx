import * as React from "react";
import { cn } from "../lib/cn";

/**
 * A modal dialog built on the native `<dialog>` element — so focus-trapping, the
 * Esc key, background inerting and the top layer come from the platform, with no
 * dependency. Controlled: drive `open` / `onOpenChange` yourself.
 *
 *   <Dialog open={open} onOpenChange={setOpen}>
 *     <DialogContent>
 *       <DialogHeader>
 *         <DialogTitle>Delete project</DialogTitle>
 *         <DialogDescription>This can't be undone.</DialogDescription>
 *       </DialogHeader>
 *       <DialogFooter>
 *         <DialogClose asChild><Button variant="ghost">Cancel</Button></DialogClose>
 *         <Button variant="destructive">Delete</Button>
 *       </DialogFooter>
 *     </DialogContent>
 *   </Dialog>
 */
const DialogContext = React.createContext<{ close: () => void } | null>(null);

export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  const ref = React.useRef<HTMLDialogElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    else if (!open && el.open) el.close();
  }, [open]);

  const close = React.useCallback(() => onOpenChange(false), [onOpenChange]);
  const ctx = React.useMemo(() => ({ close }), [close]);

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: backdrop dismissal is an enhancement; keyboard close (Esc) is handled natively by <dialog>
    <dialog
      ref={ref}
      onClose={close}
      onClick={(event) => {
        if (event.target === ref.current) close();
      }}
      className="m-auto w-[calc(100%-2rem)] max-w-lg overflow-visible bg-transparent p-0 text-foreground backdrop:bg-[var(--overlay)] backdrop:backdrop-blur-[2px]"
    >
      {open ? <DialogContext.Provider value={ctx}>{children}</DialogContext.Provider> : null}
    </dialog>
  );
}

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

export const DialogTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    data-slot="dialog-title"
    className={cn(
      "font-mono text-sm font-bold uppercase tracking-[0.1em] text-foreground",
      className,
    )}
    {...props}
  />
));
DialogTitle.displayName = "DialogTitle";

export const DialogDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    data-slot="dialog-description"
    className={cn("text-sm leading-relaxed text-muted-foreground", className)}
    {...props}
  />
));
DialogDescription.displayName = "DialogDescription";

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
  ({ asChild, onClick, children, ...props }, ref) => {
    const ctx = React.useContext(DialogContext);
    const handle = (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      if (!event.defaultPrevented) ctx?.close();
    };
    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<{ onClick?: React.MouseEventHandler }>;
      return React.cloneElement(child, {
        onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
          child.props.onClick?.(event);
          handle(event);
        },
      });
    }
    return (
      <button ref={ref} type="button" onClick={handle} {...props}>
        {children}
      </button>
    );
  },
);
DialogClose.displayName = "DialogClose";
