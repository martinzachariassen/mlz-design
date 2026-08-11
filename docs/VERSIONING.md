# Versioning

This package is the base of every MLZ project, so what "breaking" means is
defined here rather than left to instinct. The API of a design system is wider
than its TypeScript: it includes variant values, semantic token *names*, CSS
entry points and the exports map. It deliberately does **not** include token
*values* or class strings — see below.

## The 0.x contract

The package stays on **0.x** for now. Under semver, `^0.x` ranges do not float
across minors, so:

- **Consumers pin with a tilde range** — `"@martinzachariassen/design": "~0.8.0"`
  — and bump the minor deliberately, reading the release notes.
- A **minor** (0.7 → 0.8) may contain breaking changes, but only when the
  changeset says **BREAKING** and describes the migration. CI enforces the
  BREAKING marker on `major` changesets; treat it as required prose on any
  breaking minor too.
- A **patch** must never break anything in the table below.

## What counts as breaking

| Change | Bump | Notes |
| --- | --- | --- |
| Removing or renaming an export (component, hook, `*Variants`, type) | **breaking** | `src/api-surface.test.ts` turns this into a reviewable diff — update the inventory *and* write the BREAKING note. Prefer a deprecation cycle first. |
| Removing or renaming a prop, or a variant/size *value* (`Button variant="sketch"`) | **breaking** | Compile-time or render-time failure in consumers. |
| Renaming or removing a **semantic token** (`--accent`, `--paper-2`) or a CSS entry point (`./styles/*.css`) | **breaking** | Consumers override the semantic layer and import these paths by name. |
| Changing a default (`Button` default variant, `ThemeProvider` defaults) | **breaking** | Silently restyles or rebehaves every call site. |
| Narrowing peer ranges, Node/React floor | **breaking** | |
| **Changing a token's value** | **not breaking** | This is the product working as designed: "change a token, every app moves". Ship as minor with a note; contrast contracts in `theme-css.test.ts` gate the change. |
| Changing a component's class string | **not breaking** | Class strings are an implementation detail. In-repo tests may assert them (they are *our* styling contract), but consumers must not target them; `data-slot` attributes are the stable styling hooks. |
| Adding components, props, variants, tokens | minor | |
| Bug fixes, docs, dependency patches | patch | |

## Deprecation

Retire an export in two steps, never one:

1. Keep the old name working as an alias. Mark it `@deprecated` in JSDoc (the
   consumer's editor renders strikethrough) and add `status:deprecated` to its
   story meta if it has its own docs page. Record the replacement in both.
   Pattern: `fallbackVariants` → `avatarFallbackVariants` in
   `src/components/data-display/avatar.tsx`.
2. Remove it at the earliest in the **next** minor, as a BREAKING entry.

## Trying a change before it ships (canary)

There is no prerelease channel; the canary is a tarball install:

```bash
# in this repo
bun run build && npm pack        # → martinzachariassen-design-0.x.y.tgz

# in the consuming app
bun add ../mlz-design/martinzachariassen-design-0.x.y.tgz
bun run build                    # does the app still build?
```

Check after upgrading a consumer for real: the app builds, `@source` still picks
up the component classes (spot-check a styled component), the theme switch still
works, and anything the release notes flagged.

## Where the gates live

- Export removals: `src/api-surface.test.ts` (committed inventories under
  `src/__snapshots__/`).
- Token drift and contrast: `src/theme-css.test.ts`, `src/tokens.contrast.test.ts`.
- Usage rules: `src/colour-usage.test.ts`, `src/conventions.test.ts`.
- Packaging: `publint` + `attw` + `scripts/package-smoke.sh` in CI.
- Major-changeset guard: `.github/workflows/ci.yml` (`verify`).
