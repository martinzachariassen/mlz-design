import type * as React from "react";
import { Toaster as SonnerToaster, toast } from "sonner";
import { cn } from "../../lib/cn";

export type ToasterProps = React.ComponentProps<typeof SonnerToaster>;

/**
 * The mount point for toasts. Render it **once**, near the root of the app;
 * `toast()` from anywhere then finds it.
 *
 * A toast is a transient, low-stakes confirmation — "Copied", "Saved",
 * "Deployment queued". It disappears on its own, so **nothing that requires
 * action belongs in one**: a reader may never see it, may not be able to reach
 * it before it goes, and can't get it back. **Reach for `Alert`** when the
 * message must persist and be acted on, `Callout` for an inline finding, and a
 * `Dialog` when the app genuinely needs an answer.
 *
 * Errors are the common mistake. "Failed to save" in a toast means the user's
 * work is gone and the notice has already faded — put that next to the thing
 * that failed.
 *
 * Styling is MLZ throughout: Sonner's own CSS is switched off (`unstyled`) and
 * every part is re-dressed from semantic tokens, so toasts re-theme with the
 * `class="dark"` / `data-accent` switches like everything else.
 *
 * ```tsx
 * // once, at the root
 * <Toaster />
 *
 * // anywhere
 * import { toast } from "@martinzachariassen/design/toaster";
 * toast.success("Deployment queued");
 * ```
 */
export function Toaster({ className, toastOptions, ...props }: ToasterProps) {
  return (
    <SonnerToaster
      // Sonner's default theme is a different design system; drop it entirely
      // and dress every slot from ours instead.
      toastOptions={{
        unstyled: true,
        ...toastOptions,
        classNames: {
          toast: cn(
            "flex w-full items-start gap-3 rounded-[var(--radius-lg)] border border-border bg-popover p-4 text-popover-foreground shadow-[var(--shadow-lg)]",
            "font-sans text-sm",
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
          actionButton:
            "ml-auto shrink-0 rounded-[var(--radius-sm)] bg-primary px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-primary-foreground",
          cancelButton:
            "shrink-0 rounded-[var(--radius-sm)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground",
          closeButton:
            "rounded-[var(--radius-sm)] border border-border bg-popover text-muted-foreground hover:text-foreground",
          ...toastOptions?.classNames,
        },
      }}
      className={cn("font-sans", className)}
      {...props}
    />
  );
}

/**
 * Raise a toast from anywhere. Requires a `<Toaster />` mounted somewhere in the
 * tree.
 *
 * `toast.success` / `.error` / `.warning` / `.info` carry the matching signal
 * colour; `toast.promise` swaps a loading toast for a result. Keep the title to
 * a few words and put any detail in `description`.
 *
 * ```ts
 * toast.success("Deployment queued", { description: "mlz-design · main" });
 * ```
 */
export { toast };
