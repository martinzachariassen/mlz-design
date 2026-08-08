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
 */
interface ModalContextValue {
  close: () => void;
  titleId: string;
  descriptionId: string;
  setHasTitle: (present: boolean) => void;
  setHasDescription: (present: boolean) => void;
}

const ModalContext = React.createContext<ModalContextValue | null>(null);

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

export interface ModalRootProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
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
 * The `<dialog>` shell. Children only mount while open, so a form inside starts
 * fresh each time it is used.
 */
export function ModalRoot({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  className,
  slot,
  role,
  dismissOnBackdrop = true,
  children,
}: ModalRootProps) {
  const ref = React.useRef<HTMLDialogElement>(null);
  const pressStartedOnBackdrop = React.useRef(false);
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

  const ctx = React.useMemo<ModalContextValue>(
    () => ({ close, titleId, descriptionId, setHasTitle, setHasDescription }),
    [close, titleId, descriptionId],
  );

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: backdrop dismissal is an enhancement; keyboard close (Esc) is handled natively by <dialog>
    <dialog
      ref={ref}
      role={role}
      aria-labelledby={hasTitle ? titleId : undefined}
      aria-describedby={hasDescription ? descriptionId : undefined}
      onClose={close}
      // Require the press to both start and end on the backdrop, so releasing a
      // text selection that began inside doesn't dismiss it.
      onMouseDown={(event) => {
        pressStartedOnBackdrop.current = dismissOnBackdrop && event.target === ref.current;
      }}
      onClick={(event) => {
        if (dismissOnBackdrop && event.target === ref.current && pressStartedOnBackdrop.current) {
          close();
        }
        pressStartedOnBackdrop.current = false;
      }}
      data-slot={slot}
      className={className}
    >
      {open ? <ModalContext.Provider value={ctx}>{children}</ModalContext.Provider> : null}
    </dialog>
  );
}
