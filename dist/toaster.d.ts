import * as React from 'react';
import { Toaster as Toaster$1 } from 'sonner';
export { toast } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Toaster$1>;
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
 * import { toast } from "@martinzachariassen/design";
 * toast.success("Deployment queued");
 * ```
 */
declare function Toaster({ className, toastOptions, ...props }: ToasterProps): React.JSX.Element;

export { Toaster, type ToasterProps };
