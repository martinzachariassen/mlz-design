import * as React from "react";
import { cn } from "../../lib/cn";
import { named } from "../../lib/named";
import { useFieldControlProps } from "./field";

export interface InputProps
  // `size` (native: character width, virtually unused) is reclaimed for the
  // control-height scale shared with Button/Select/Combobox; `prefix` (an RDFa
  // string attribute nothing sets on inputs) is reclaimed as the leading slot.
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "prefix"> {
  /** Control height. `sm` (h-9) lines up with `Button size="sm"`. */
  size?: "sm" | "default";
  /**
   * Leading slot inside the frame — a search icon, a currency sign. Rendered
   * decorative; mark icons `aria-hidden`. Interactive children stay clickable.
   */
  prefix?: React.ReactNode;
  /** Trailing slot inside the frame — a unit, a reveal button, a spinner. */
  suffix?: React.ReactNode;
}

/**
 * A single-line text field. Mono type, a 1.5px `--input` border that turns to the
 * ring colour on focus with a soft `ring/30` halo. Takes every native `<input>`
 * attribute, so `type`, `required` and the rest behave exactly as you expect.
 *
 * `prefix`/`suffix` render *inside* the frame, so a search icon or a unit
 * doesn't force you to rebuild the border and focus styling around your own
 * wrapper. With a slot present the input gains a positioning wrapper — size the
 * field from its parent in that case, not via `className` width utilities.
 *
 * Inside a `Field` it picks up its `id`, `aria-describedby`, `aria-invalid` and
 * `disabled` automatically; an explicit prop still wins. Outside one it is a
 * plain input.
 */
export const Input = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, size = "default", prefix, suffix, ...props }, ref) => {
      const input = (
        <input
          ref={ref}
          type={type}
          className={cn(
            "flex w-full rounded-[var(--radius-sm)] border-[1.5px] border-input bg-background px-3 py-2 font-mono text-sm text-foreground transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive/30",
            size === "sm" ? "h-9 text-[13px]" : "h-11",
            prefix != null && "pl-9",
            suffix != null && "pr-9",
            className,
          )}
          // Field-derived first so an explicit prop on the call site always wins.
          {...useFieldControlProps()}
          {...props}
        />
      );

      if (prefix == null && suffix == null) return input;

      return (
        <div data-slot="input-group" className="relative w-full">
          {prefix != null ? (
            <span
              data-slot="input-prefix"
              className="pointer-events-none absolute top-1/2 left-3 flex -translate-y-1/2 items-center text-muted-foreground [&>a]:pointer-events-auto [&>button]:pointer-events-auto [&_svg]:size-4"
            >
              {prefix}
            </span>
          ) : null}
          {input}
          {suffix != null ? (
            <span
              data-slot="input-suffix"
              className="pointer-events-none absolute top-1/2 right-3 flex -translate-y-1/2 items-center text-muted-foreground [&>a]:pointer-events-auto [&>button]:pointer-events-auto [&_svg]:size-4"
            >
              {suffix}
            </span>
          ) : null}
        </div>
      );
    },
  ),
  "Input",
);
