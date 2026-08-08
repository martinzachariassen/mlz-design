import * as React from "react";
import { cn } from "../../lib/cn";
import { named } from "../../lib/named";
import { Label } from "./label";

interface FieldContextValue {
  controlId: string;
  descriptionId: string;
  errorId: string;
  invalid: boolean;
  disabled: boolean;
  hasDescription: boolean;
  hasError: boolean;
  register: (part: "description" | "error", present: boolean) => void;
}

const FieldContext = /* @__PURE__ */ React.createContext<FieldContextValue | null>(null);

/**
 * Read the field a control is sitting in. Returns `null` outside a `Field`, so a
 * control can support both — this is what `useFieldControlProps` leans on.
 */
export function useField(): FieldContextValue | null {
  return React.useContext(FieldContext);
}

/**
 * The props a form control should spread to join its surrounding `Field`:
 * `id`, `aria-describedby`, `aria-invalid` and `disabled`, all derived.
 *
 * Returns an empty object outside a `Field`, so spreading it is always safe.
 *
 * ```tsx
 * function MyControl(props) {
 *   return <input {...useFieldControlProps()} {...props} />;
 * }
 * ```
 */
export function useFieldControlProps(): React.AriaAttributes & {
  id?: string;
  disabled?: boolean;
} {
  const field = useField();
  if (!field) return {};
  // Point at the description and the error together, in that order — a screen
  // reader should hear what the field wants before hearing what went wrong.
  const describedBy =
    [field.hasDescription && field.descriptionId, field.hasError && field.errorId]
      .filter(Boolean)
      .join(" ") || undefined;
  return {
    id: field.controlId,
    "aria-describedby": describedBy,
    "aria-invalid": field.invalid || undefined,
    disabled: field.disabled || undefined,
  };
}

export interface FieldProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "id"> {
  /** Override the generated control id — only needed to match an id you already own. */
  id?: string;
  /** Marks the control invalid and switches `FieldError` on. */
  invalid?: boolean;
  /** Disables the label and, through `useFieldControlProps`, the control. */
  disabled?: boolean;
}

/**
 * A labelled form control with its description and error message, wired together.
 *
 * The wiring is the point. `Field` generates one id and hands it to the control
 * as `id`, to `FieldLabel` as `htmlFor`, and to `FieldDescription` /
 * `FieldError` as `aria-describedby` — and it only points at the parts that are
 * actually rendered, so a field without a description never advertises one. Set
 * `invalid` and the control gets `aria-invalid` while the error announces itself
 * through `role="alert"`.
 *
 * **Use it for every labelled control in a form.** Doing this by hand means
 * inventing an id, threading it through three components, and remembering to
 * update `aria-describedby` when a message appears — which is exactly the step
 * that gets skipped. **Reach for a bare `Label` + control** only when there is
 * nothing else to associate, and for a group of controls that share one label
 * (a `RadioGroup`, a set of checkboxes) use a `<fieldset>` with a `<legend>`:
 * `Field` labels *one* control.
 *
 * The control goes in as an ordinary child. Any component that spreads
 * `useFieldControlProps()` joins automatically; the ones in this library already
 * do.
 *
 * ```tsx
 * <Field invalid={!!error}>
 *   <FieldLabel>Email</FieldLabel>
 *   <Input type="email" />
 *   <FieldDescription>We only use this for deploy notifications.</FieldDescription>
 *   <FieldError>{error}</FieldError>
 * </Field>
 * ```
 */
export const Field = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<HTMLDivElement, FieldProps>(
    ({ id, invalid = false, disabled = false, className, children, ...props }, ref) => {
      const reactId = React.useId();
      const controlId = id ?? `${reactId}-control`;

      const [hasDescription, setHasDescription] = React.useState(false);
      const [hasError, setHasError] = React.useState(false);

      const register = React.useCallback((part: "description" | "error", present: boolean) => {
        if (part === "description") setHasDescription(present);
        else setHasError(present);
      }, []);

      const ctx = React.useMemo<FieldContextValue>(
        () => ({
          controlId,
          descriptionId: `${reactId}-description`,
          errorId: `${reactId}-error`,
          invalid,
          disabled,
          hasDescription,
          hasError,
          register,
        }),
        [controlId, reactId, invalid, disabled, hasDescription, hasError, register],
      );

      return (
        <FieldContext.Provider value={ctx}>
          <div
            ref={ref}
            data-slot="field"
            data-invalid={invalid || undefined}
            data-disabled={disabled || undefined}
            className={cn("flex flex-col gap-1.5", className)}
            {...props}
          >
            {children}
          </div>
        </FieldContext.Provider>
      );
    },
  ),
  "Field",
);

export type FieldLabelProps = React.ComponentPropsWithoutRef<typeof Label>;

/**
 * The field's label. Picks up `htmlFor` from the surrounding `Field`, so you
 * never write an id. Outside a `Field` it is an ordinary `Label`.
 */
export const FieldLabel = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<React.ComponentRef<typeof Label>, FieldLabelProps>(
    ({ htmlFor, className, ...props }, ref) => {
      const field = useField();
      return (
        <Label
          ref={ref}
          htmlFor={htmlFor ?? field?.controlId}
          data-slot="field-label"
          className={cn(field?.disabled && "cursor-not-allowed opacity-50", className)}
          {...props}
        />
      );
    },
  ),
  "FieldLabel",
);

/**
 * The quiet sentence under the control — what the field wants, or why it is
 * asked for. Registers itself so `aria-describedby` only points at it when it
 * is really on the page.
 */
export const FieldDescription = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
  >(({ className, ...props }, ref) => {
    const field = useField();
    const register = field?.register;
    React.useEffect(() => {
      register?.("description", true);
      return () => register?.("description", false);
    }, [register]);
    return (
      <p
        ref={ref}
        id={field?.descriptionId}
        data-slot="field-description"
        className={cn("text-[13px] leading-relaxed text-muted-foreground", className)}
        {...props}
      />
    );
  }),
  "FieldDescription",
);

/**
 * The validation message. **Renders nothing when it has no children**, so you
 * can leave it in the tree and let the error state drive it.
 *
 * It carries `role="alert"`, so a message appearing after the user has moved on
 * is announced. Write what to do, not what failed: "Use your work address"
 * beats "Invalid email".
 */
export const FieldError = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
  >(({ className, children, ...props }, ref) => {
    const field = useField();
    const register = field?.register;
    const present = children !== undefined && children !== null && children !== false;

    React.useEffect(() => {
      register?.("error", present);
      return () => register?.("error", false);
    }, [register, present]);

    if (!present) return null;
    return (
      <p
        ref={ref}
        id={field?.errorId}
        role="alert"
        data-slot="field-error"
        className={cn("text-[13px] leading-relaxed text-destructive-deep", className)}
        {...props}
      >
        {children}
      </p>
    );
  }),
  "FieldError",
);
