import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

/**
 * The shared engine behind `Dialog`, `Sheet` and `AlertDialog`.
 *
 * **Internal — never exported from `src/index.ts`.** Consumers get the three
 * components; this is the thing they have in common.
 *
 * All three are the native `<dialog>` element driven by `showModal()`, which is
 * where the focus trap, Esc handling, background inerting and top-layer
 * placement come from. None of that is ours, and none of it costs a dependency.
 * What *is* ours — controlled/uncontrolled state, the generated
 * `aria-labelledby` / `aria-describedby` ids, and the backdrop-dismissal rule —
 * was duplicated character-for-character in `dialog.tsx` and `sheet.tsx` before
 * `AlertDialog` would have made it three copies.
 *
 * Split in two on purpose: `ModalProvider` owns the state and always renders
 * its children (so a `*Trigger` works while the modal is closed), while
 * `ModalDialog` is the `<dialog>` element and mounts *its* children only while
 * open (so a form inside starts fresh each time).
 */
interface ModalContextValue {
  open: boolean;
  show: () => void;
  close: () => void;
  titleId: string;
  descriptionId: string;
  setHasTitle: (present: boolean) => void;
  setHasDescription: (present: boolean) => void;
}

const ModalContext = /* @__PURE__ */ React.createContext<ModalContextValue | null>(null);

/** Read the modal a part is inside. `null` outside one. */
export function useModal(): ModalContextValue | null {
  return React.useContext(ModalContext);
}

/**
 * Registers a title or description with the surrounding modal and returns the
 * id to put on it, so `aria-labelledby` / `aria-describedby` only point at
 * elements that are really on the page.
 */
export function useModalPart(part: "title" | "description"): string | undefined {
  const modal = useModal();
  const register = part === "title" ? modal?.setHasTitle : modal?.setHasDescription;
  React.useEffect(() => {
    register?.(true);
    return () => register?.(false);
  }, [register]);
  return part === "title" ? modal?.titleId : modal?.descriptionId;
}

export interface ModalProviderProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

/** Owns open state (controlled or uncontrolled) and provides the modal context. */
export function ModalProvider({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  children,
}: ModalProviderProps) {
  const reactId = React.useId();
  const titleId = `${reactId}-title`;
  const descriptionId = `${reactId}-description`;

  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const isControlled = openProp !== undefined;
  const open = isControlled ? openProp : uncontrolledOpen;

  // Only advertise the label/description once the matching part actually
  // renders, so a modal without a title doesn't point `aria-labelledby` at
  // nothing.
  const [hasTitle, setHasTitle] = React.useState(false);
  const [hasDescription, setHasDescription] = React.useState(false);

  const show = React.useCallback(() => {
    if (!isControlled) setUncontrolledOpen(true);
    onOpenChange?.(true);
  }, [isControlled, onOpenChange]);

  const close = React.useCallback(() => {
    if (!isControlled) setUncontrolledOpen(false);
    onOpenChange?.(false);
  }, [isControlled, onOpenChange]);

  const ctx = React.useMemo<ModalContextValue>(
    () => ({ open, show, close, titleId, descriptionId, setHasTitle, setHasDescription }),
    [open, show, close, titleId, descriptionId],
  );

  return (
    <ModalContext.Provider value={ctx}>
      {/* hasTitle/hasDescription are read by ModalDialog through this second
          context rather than the public one, so consumer-facing context identity
          doesn't churn on part registration. */}
      <ModalPartsContext.Provider value={{ hasTitle, hasDescription }}>
        {children}
      </ModalPartsContext.Provider>
    </ModalContext.Provider>
  );
}

const ModalPartsContext = /* @__PURE__ */ React.createContext<{
  hasTitle: boolean;
  hasDescription: boolean;
}>({ hasTitle: false, hasDescription: false });

export interface ModalDialogProps {
  /** Classes for the `<dialog>` itself — this is where each variant differs. */
  className?: string;
  /** `data-slot` value, for styling hooks and test queries. */
  slot: string;
  /**
   * `alertdialog` for a destructive confirm, so assistive tech announces it as
   * something requiring a decision rather than as an ordinary dialog.
   */
  role?: "dialog" | "alertdialog";
  /**
   * Whether clicking the backdrop dismisses. **Off for `alertdialog`**: a stray
   * click must not be able to answer a question about deleting something.
   */
  dismissOnBackdrop?: boolean;
  children: React.ReactNode;
}

/**
 * The `<dialog>` shell. Must render under a `ModalProvider`. Children only
 * mount while open, so a form inside starts fresh each time it is used.
 */
export function ModalDialog({
  className,
  slot,
  role,
  dismissOnBackdrop = true,
  children,
}: ModalDialogProps) {
  const ctx = useModal();
  const { hasTitle, hasDescription } = React.useContext(ModalPartsContext);
  const ref = React.useRef<HTMLDialogElement>(null);
  const pressStartedOnBackdrop = React.useRef(false);
  const open = ctx?.open ?? false;

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    else if (!open && el.open) el.close();
  }, [open]);

  const close = ctx?.close;

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: backdrop dismissal is an enhancement; keyboard close (Esc) is handled natively by <dialog>
    <dialog
      ref={ref}
      role={role}
      aria-labelledby={hasTitle ? ctx?.titleId : undefined}
      aria-describedby={hasDescription ? ctx?.descriptionId : undefined}
      onClose={close}
      // Require the press to both start and end on the backdrop, so releasing a
      // text selection that began inside doesn't dismiss it.
      onMouseDown={(event) => {
        pressStartedOnBackdrop.current = dismissOnBackdrop && event.target === ref.current;
      }}
      onClick={(event) => {
        if (dismissOnBackdrop && event.target === ref.current && pressStartedOnBackdrop.current) {
          close?.();
        }
        pressStartedOnBackdrop.current = false;
      }}
      data-slot={slot}
      className={className}
    >
      {open ? children : null}
    </dialog>
  );
}

export interface ModalTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Render the single child as the trigger (forwarding the open handler) instead of a <button>. */
  asChild?: boolean;
}

/**
 * Opens the surrounding modal. The shared implementation behind
 * `DialogTrigger`, `SheetTrigger` and `AlertDialogTrigger` — same shape as the
 * matching `*Close` parts, in the opposite direction.
 */
export const ModalTrigger = /* @__PURE__ */ React.forwardRef<
  HTMLButtonElement,
  ModalTriggerProps & { slot: string }
>(({ asChild, onClick, type, slot, ...props }, ref) => {
  const ctx = useModal();
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      ref={ref}
      data-slot={slot}
      type={asChild ? type : (type ?? "button")}
      onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event);
        if (!event.defaultPrevented) ctx?.show();
      }}
      {...props}
    />
  );
});
