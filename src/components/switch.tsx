import * as React from "react";
import { cn } from "../lib/cn";

export type SwitchProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">;

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    return (
      <>
        <input ref={ref} id={inputId} type="checkbox" className="peer sr-only" {...props} />
        <label
          htmlFor={inputId}
          className={cn(
            "relative inline-flex h-6 w-10 shrink-0 cursor-pointer items-center rounded-full border-[1.5px] border-input bg-input p-0.5 transition-colors duration-200 ease-[var(--ease-out)] peer-checked:border-primary peer-checked:bg-primary peer-checked:[&>span]:translate-x-4 peer-focus-visible:border-ring peer-focus-visible:ring-[3px] peer-focus-visible:ring-ring/30 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
            className,
          )}
        >
          <span className="size-4 rounded-full bg-background shadow-sm transition-transform duration-200 ease-[var(--ease-out)]" />
        </label>
      </>
    );
  },
);
Switch.displayName = "Switch";
