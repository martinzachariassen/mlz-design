---
"@martinzachariassen/design": minor
---

Make the package tree-shakeable. Importing a single helper used to pull in 413 kB — every component, all of Radix, `sonner` and `cmdk`. It is now 59 kB, and a real consuming app dropped from 513 kB to 264 kB.

Two constructs were defeating every consumer's bundler, and neither looked wrong in the source:

- **`Component.displayName = "…"` as a statement.** A property write on a module-level binding is an unconditional side effect, so the assignment had to be kept, which kept the component, which kept everything it imported — 139 times over. The name is now attached by a `named()` helper inside a single `/* @__PURE__ */`-annotated expression, so DevTools still shows it and the declaration can be dropped when unused.
- **Un-annotated top-level calls.** Every `const X = React.forwardRef(…)`, `cva(…)` and `createContext(…)` is now annotated — including the *inner* call, since dropping a pure call still preserves its arguments' side effects.

A new `treeshaking.test.ts` gate fails the build if either construct comes back.

**Breaking:** `Toaster` and `toast` have moved from the root entry to `@martinzachariassen/design/toaster`.

```diff
-import { Toaster, toast } from "@martinzachariassen/design";
+import { Toaster, toast } from "@martinzachariassen/design/toaster";
```

`sonner` declares no `sideEffects: false` and injects its stylesheet with `document.createElement("style")` at module scope, so no consumer could shake it out. Re-exporting it from the root made every app ship it and run that injection — including apps with a strict `style-src`, which refuse the injected `<style>` and log a CSP violation on every page load. Behind a subpath, only apps that actually want toasts pay for it.

Also in this release:

- `BrandLockup` accepts `markProps` and `wordmarkProps`, so the inner `BrandMark` and `BrandWordmark` can be animated or styled without giving up the lockup's fixed proportions. Previously adopting the lockup meant losing any per-mark treatment.
- `GridBackground`'s spotlight glow blends through a new `--glow-blend` token — `multiply` on paper, `screen` on ink. It was hard-coded to `multiply`, which darkened the dark theme instead of glowing.
