"use client";
import { cn } from './chunk-7EOSDFS3.js';
import { Toaster as Toaster$1 } from 'sonner';
export { toast } from 'sonner';
import { jsx } from 'react/jsx-runtime';

function Toaster({ className, toastOptions, ...props }) {
  return /* @__PURE__ */ jsx(
    Toaster$1,
    {
      toastOptions: {
        unstyled: true,
        ...toastOptions,
        classNames: {
          toast: cn(
            "flex w-full items-start gap-3 rounded-[var(--radius-lg)] border border-border bg-popover p-4 text-popover-foreground shadow-[var(--shadow-lg)]",
            "font-sans text-sm"
          ),
          title: "font-mono text-xs font-bold uppercase tracking-[0.1em] text-foreground",
          description: "mt-1 text-[13px] leading-relaxed text-muted-foreground",
          icon: "mt-0.5 shrink-0",
          content: "flex-1",
          // The signal colours come from the same tokens Alert and Callout use,
          // so a success toast and a success alert are the same green.
          success: "[&_[data-icon]]:text-success-deep",
          error: "[&_[data-icon]]:text-destructive-deep",
          warning: "[&_[data-icon]]:text-warning-deep",
          info: "[&_[data-icon]]:text-info-deep",
          actionButton: "ml-auto shrink-0 rounded-[var(--radius-sm)] bg-primary px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-primary-foreground",
          cancelButton: "shrink-0 rounded-[var(--radius-sm)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground",
          closeButton: "rounded-[var(--radius-sm)] border border-border bg-popover text-muted-foreground hover:text-foreground",
          ...toastOptions?.classNames
        }
      },
      className: cn("font-sans", className),
      ...props
    }
  );
}

export { Toaster };
