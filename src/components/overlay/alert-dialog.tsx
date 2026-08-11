import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import { cn } from "../../lib/cn";
import { named } from "../../lib/named";
import {
  ModalDialog,
  ModalProvider,
  ModalTrigger,
  type ModalTriggerProps,
  useModal,
  useModalPart,
} from "./modal-root";

export interface AlertDialogProps {
  /** Whether the dialog is showing. Pass it to control the dialog yourself. */
  open?: boolean;
  /** Initial open state when uncontrolled. Ignored if `open` is provided. */
  defaultOpen?: boolean;
  /** Called with `false` on Esc or an `AlertDialogCancel`. Never on a backdrop click. */
  onOpenChange?: (open: boolean) => void;
  /** Usually a single `AlertDialogContent`. Only mounted while open. */
  children: React.ReactNode;
}

/**
 * A confirmation before something irreversible — deleting a project, revoking a
 * key, discarding unsaved work.
 *
 * The same native `<dialog>` engine as `Dialog` and `Sheet`, so focus-trapping,
 * Esc, background inerting and the top layer come from the platform. Three
 * things are deliberately different, and all three exist because the answer
 * matters:
 *
 * - `role="alertdialog"`, so assistive tech announces it as a decision to make
 *   rather than as an ordinary panel, and reads the description on open.
 * - **The backdrop does not dismiss.** A stray click must not be able to answer
 *   a question about deleting something.
 * - **No ✕ button.** There are exactly two ways out, and both are in the
 *   footer, so neither can be taken by accident.
 *
 * Esc still cancels — that is the platform's, it is unambiguous, and removing
 * it would trap someone who opened the dialog by mistake.
 *
 * **Use it only when the action can't be undone.** **Reach for `Dialog`** for a
 * short form or anything reversible: if every delete raises a confirm, people
 * stop reading them, and the one that mattered gets dismissed with the rest.
 * The better answer is often no dialog at all — do it, and offer an undo.
 *
 * `AlertDialogDescription` is not optional here the way it is on `Dialog`. Say
 * what will be destroyed, by name.
 *
 * ```tsx
 * <AlertDialog open={open} onOpenChange={setOpen}>
 *   <AlertDialogContent>
 *     <AlertDialogHeader>
 *       <AlertDialogTitle>Delete aurora</AlertDialogTitle>
 *       <AlertDialogDescription>
 *         This removes the project and its deploy history. It can't be undone.
 *       </AlertDialogDescription>
 *     </AlertDialogHeader>
 *     <AlertDialogFooter>
 *       <AlertDialogCancel asChild><Button variant="ghost">Cancel</Button></AlertDialogCancel>
 *       <AlertDialogAction asChild>
 *         <Button variant="destructive" onClick={remove}>Delete</Button>
 *       </AlertDialogAction>
 *     </AlertDialogFooter>
 *   </AlertDialogContent>
 * </AlertDialog>
 * ```
 */
export function AlertDialog({
  open,
  defaultOpen = false,
  onOpenChange,
  children,
}: AlertDialogProps) {
  return (
    <ModalProvider open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      {children}
    </ModalProvider>
  );
}

export type AlertDialogTriggerProps = ModalTriggerProps;

/** Opens the alert dialog. Wrap the provoking control with `asChild`. */
export const AlertDialogTrigger = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<HTMLButtonElement, AlertDialogTriggerProps>((props, ref) => (
    <ModalTrigger ref={ref} slot="alert-dialog-trigger" {...props} />
  )),
  "AlertDialogTrigger",
);

/** The card surface. Narrower than `DialogContent` — a confirm is two sentences. */
export const AlertDialogContent = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
      <ModalDialog
        slot="alert-dialog"
        role="alertdialog"
        dismissOnBackdrop={false}
        // Width lives on the card below so a consumer's `max-w-*` can widen it.
        className="m-auto w-[calc(100%-2rem)] overflow-visible bg-transparent p-0 text-foreground backdrop:bg-[var(--overlay)] backdrop:backdrop-blur-[2px]"
      >
        <div
          ref={ref}
          data-slot="alert-dialog-content"
          className={cn(
            "relative mx-auto w-full max-w-md rounded-[var(--radius-lg)] border border-border bg-card p-6 text-card-foreground shadow-[var(--shadow-lg)] motion-safe:animate-rise",
            className,
          )}
          {...props}
        />
      </ModalDialog>
    ),
  ),
  "AlertDialogContent",
);

/** Title + description block. No close button to clear, so no right inset. */
export const AlertDialogHeader = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
      <div
        ref={ref}
        data-slot="alert-dialog-header"
        className={cn("mb-4 flex flex-col gap-1.5", className)}
        {...props}
      />
    ),
  ),
  "AlertDialogHeader",
);

/** Names the dialog. Say what is about to happen, and to what. */
export const AlertDialogTitle = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
    ({ className, ...props }, ref) => {
      const titleId = useModalPart("title");
      return (
        <h2
          ref={ref}
          id={titleId}
          data-slot="alert-dialog-title"
          className={cn(
            "font-mono text-sm font-bold uppercase tracking-[0.1em] text-foreground",
            className,
          )}
          {...props}
        />
      );
    },
  ),
  "AlertDialogTitle",
);

/**
 * The consequence, spelled out. `role="alertdialog"` means this is read on
 * open, so it is the sentence that does the work — name the thing being
 * destroyed and say that it can't be undone.
 */
export const AlertDialogDescription = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
  >(({ className, ...props }, ref) => {
    const descriptionId = useModalPart("description");
    return (
      <p
        ref={ref}
        id={descriptionId}
        data-slot="alert-dialog-description"
        className={cn("text-sm leading-relaxed text-muted-foreground", className)}
        {...props}
      />
    );
  }),
  "AlertDialogDescription",
);

/**
 * The action row. Write cancel first in the source: it reverses to a full-width
 * column on mobile so the confirm lands on top, then flows right-aligned from
 * `sm` up.
 */
export const AlertDialogFooter = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
      <div
        ref={ref}
        data-slot="alert-dialog-footer"
        className={cn(
          "mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-3",
          className,
        )}
        {...props}
      />
    ),
  ),
  "AlertDialogFooter",
);

export interface AlertDialogActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Render the single child instead of a `<button>`, forwarding the close handler. */
  asChild?: boolean;
}

/**
 * The way out that does nothing. **Receives focus when the dialog opens**, so
 * Enter on a dialog someone hasn't read yet is safe.
 */
export const AlertDialogCancel = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<HTMLButtonElement, AlertDialogActionProps>(
    ({ asChild, onClick, type, ...props }, ref) => {
      const ctx = useModal();
      const localRef = React.useRef<HTMLButtonElement>(null);
      React.useImperativeHandle(ref, () => localRef.current as HTMLButtonElement);

      // Cancel comes first in source (that's what puts confirm on top on mobile),
      // but initial focus must not depend on source order staying that way — so
      // mark this button `autofocus` and let `showModal()`'s dialog focusing
      // steps pick it. The attribute is set imperatively because this effect runs
      // before ModalRoot's `showModal()` (child effects flush first): a plain
      // `.focus()` here — or React's `autoFocus`, which also just calls
      // `.focus()` — would be discarded by those same focusing steps.
      React.useEffect(() => {
        localRef.current?.setAttribute("autofocus", "");
      }, []);

      const Comp = asChild ? Slot : "button";
      return (
        <Comp
          ref={localRef}
          data-slot="alert-dialog-cancel"
          type={asChild ? type : (type ?? "button")}
          onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
            onClick?.(event);
            if (!event.defaultPrevented) ctx?.close();
          }}
          {...props}
        />
      );
    },
  ),
  "AlertDialogCancel",
);

/**
 * The confirm. Closes the dialog after your `onClick` runs — call
 * `event.preventDefault()` in the handler to keep it open (a failed request
 * that wants to show an error, say).
 */
export const AlertDialogAction = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<HTMLButtonElement, AlertDialogActionProps>(
    ({ asChild, onClick, type, ...props }, ref) => {
      const ctx = useModal();
      const Comp = asChild ? Slot : "button";
      return (
        <Comp
          ref={ref}
          data-slot="alert-dialog-action"
          type={asChild ? type : (type ?? "button")}
          onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
            onClick?.(event);
            if (!event.defaultPrevented) ctx?.close();
          }}
          {...props}
        />
      );
    },
  ),
  "AlertDialogAction",
);
