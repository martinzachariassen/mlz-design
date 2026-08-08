/**
 * Toasts, behind their own entry point.
 *
 * `Toaster` is the one component backed by a dependency that cannot be tree-
 * shaken away: `sonner` does not declare `sideEffects: false`, and it injects
 * its stylesheet with a `document.createElement("style")` call at module scope.
 * Re-exporting it from the root entry therefore forced every consuming app to
 * ship sonner and run that injection — even an app that never renders a toast,
 * and even one whose Content-Security-Policy refuses the injected `<style>`.
 *
 * Importing from this subpath is the opt-in:
 *
 * ```tsx
 * import { Toaster, toast } from "@martinzachariassen/design/toaster";
 * ```
 */
export {
  Toaster,
  type ToasterProps,
  toast,
} from "./components/feedback/toaster";
