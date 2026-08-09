import * as React from "react";
import { cn } from "../../lib/cn";
import { CheckIcon } from "../../lib/icons";
import { named } from "../../lib/named";
import { useCopyToClipboard } from "../../lib/use-copy-to-clipboard";
import { Button, type ButtonProps } from "./button";

export interface CopyButtonProps extends Omit<ButtonProps, "children" | "onClick" | "asChild"> {
  /** The text handed to the clipboard, verbatim. */
  value: string;
  /** Resting label. */
  label?: React.ReactNode;
  /** Label shown for `resetMs` after a successful copy. */
  copiedLabel?: React.ReactNode;
  /** How long the confirmation stays up, in ms. */
  resetMs?: number;
  /** Called with whether the copy actually landed. */
  onCopied?: (ok: boolean) => void;
}

/**
 * A `Button` that puts a string on the clipboard and says so — the label swaps to
 * a check plus "Copied" and returns on its own.
 *
 * Reach for it any time the point of the control is "give me that value": an IP,
 * a token, a command, an ID. It exists because the alternative is every app
 * re-writing the same `writeText` + `setTimeout` pair, each with a slightly
 * different failure story. **Reach for `CodeBlock copyable`** when the thing being
 * copied is a visible block of code — that already has one of these in its header.
 *
 * The copy can be refused (insecure context, denied permission). When it is, the
 * label stays put rather than claiming success, and `onCopied(false)` fires — the
 * value is still selectable, which is the fallback people already know. The
 * button is otherwise a plain `Button`, so every `variant` and `size` applies.
 *
 * ```tsx
 * <CopyButton value={ip} label="Copy IP" />
 * <CopyButton value={report} variant="ghost" size="sm" copiedLabel="Saved" />
 * ```
 */
export const CopyButton = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<HTMLButtonElement, CopyButtonProps>(
    (
      { value, label = "Copy", copiedLabel = "Copied", resetMs, onCopied, className, ...props },
      ref,
    ) => {
      const { copied, copy } = useCopyToClipboard(resetMs);

      return (
        <Button
          ref={ref}
          data-slot="copy-button"
          data-copied={copied || undefined}
          className={cn(className)}
          onClick={async () => {
            // Deliberately two statements: `onCopied?.(await copy(value))` would
            // short-circuit the whole argument when no callback is passed, so the
            // copy itself would never happen.
            const ok = await copy(value);
            onCopied?.(ok);
          }}
          {...props}
        >
          {copied ? <CheckIcon className="text-success-deep" /> : null}
          {/* The label is swapped rather than duplicated, and the live region
              announces the change — otherwise a screen-reader user gets the
              visual confirmation and nothing else. */}
          <span aria-live="polite">{copied ? copiedLabel : label}</span>
        </Button>
      );
    },
  ),
  "CopyButton",
);
