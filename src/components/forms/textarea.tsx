import * as React from "react";
import { cn } from "../../lib/cn";
import { useFieldControlProps } from "./field";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

/**
 * A multi-line text field — `Input`'s longer sibling, sharing its border, focus
 * ring and mono type. Starts at six lines' worth of height and resizes
 * vertically; set `rows` for a different starting height.
 *
 * Inside a `Field` it picks up its `id`, `aria-describedby`, `aria-invalid` and
 * `disabled` automatically; an explicit prop still wins.
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-24 w-full resize-y rounded-[var(--radius-sm)] border-[1.5px] border-input bg-background px-3 py-2 font-mono text-sm text-foreground transition-colors duration-200 ease-[var(--ease-out)] placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive/30",
        className,
      )}
      // Field-derived first so an explicit prop on the call site always wins.
      {...useFieldControlProps()}
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";
