---
"@martinzachariassen/design": minor
---

Add `Toaster` and `toast()`.

Transient confirmations — "Copied", "Deployment queued" — backed by Sonner.

**This adds `sonner`, the only non-Radix third-party runtime dependency in the
system.** It's kept in its own component so the trade stays reversible: Sonner's
own styling is switched off (`unstyled`) and every slot re-dressed from semantic
tokens, so toasts re-theme with the `class="dark"` / `data-accent` switches like
everything else, and the signal colours are the same tokens `Alert` and
`Callout` use.

Mount `<Toaster />` once near the root; call `toast()` from anywhere.

The JSDoc is explicit about when *not* to use it. A toast disappears on its own,
so nothing requiring action belongs in one — a reader may never see it, may not
reach it in time, and can't get it back. Errors are the common mistake: "Failed
to save" in a toast means the work is gone and the notice has already faded.
That's an `Alert`, next to the thing that failed.
