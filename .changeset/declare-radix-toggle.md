---
"@martinzachariassen/design": patch
---

Declare `@radix-ui/react-toggle` as a direct dependency.

`Toggle` imported it while only `@radix-ui/react-toggle-group` was declared, so
it resolved transitively. Two things followed from that: tsup externalises
exactly `dependencies` + `peerDependencies`, so the Radix toggle runtime was
**bundled into `dist/index.js`** instead of imported — while `dist/index.d.ts`
still referenced the package by name, breaking typecheck for consumers on
pnpm's strict layout or Yarn PnP. And because `ToggleGroupItem` loaded the
primitive from its own copy, `Toggle` and `ToggleGroupItem` were running two
separate module instances of the same code.

Declaring it externalises the runtime and de-duplicates the primitive.
