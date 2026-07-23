import * as React from "react";
import { cn } from "../lib/cn";

export type CheckboxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">;

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    return (
      <>
        <input ref={ref} id={inputId} type="checkbox" className="peer sr-only" {...props} />
        <label
          htmlFor={inputId}
          className={cn(
            "flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-[var(--radius-sm)] border-[1.5px] border-input bg-background text-primary-foreground transition-colors duration-200 ease-[var(--ease-out)] peer-checked:border-primary peer-checked:bg-primary peer-checked:[&>svg]:scale-100 peer-checked:[&>svg]:opacity-100 peer-focus-visible:border-ring peer-focus-visible:ring-[3px] peer-focus-visible:ring-ring/30 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
            className,
          )}
        >
          <svg
            className="size-3.5 scale-0 opacity-0 transition-transform duration-200 ease-[var(--ease-out)]"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M3.5 8.5l3 3 6-7" />
          </svg>
        </label>
      </>
    );
  },
);
Checkbox.displayName = "Checkbox";
