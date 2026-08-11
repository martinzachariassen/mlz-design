# Decisions

The load-bearing choices, each with the reasoning and — the important part —
**what would have to be true to change it**. An entry here is a claim that
someone weighed the alternative, not a mute button on the question. Add a row
whenever a PR settles something a future change might "fix" by accident; the
Storybook workarounds in [architecture.md](architecture.md) follow the same
pattern with explicit removal conditions.

| Decision | Why | Change it when… |
| --- | --- | --- |
| **Radix is depended on granularly** (`@radix-ui/react-tabs`, …), never the `radix-ui` meta-package | This ships as a library; the meta-package would force ~40 primitives on every consumer to use one. `conventions.test.ts` asserts every Radix import is declared. | Radix ships a meta-package that tree-shakes to zero cost in consumers. |
| **No icon library** | Icons are app-level identity; the few glyphs components need live in `src/lib/icons.tsx` (internal). Consumers bring their own. Gated by `conventions.test.ts`. | The system itself starts needing tens of glyphs, not a handful. |
| **`Dialog`/`Sheet`/`AlertDialog` are the native `<dialog>`**, not Radix Dialog | Focus trap, Esc, inerting and top layer come from the platform for free; one modal engine (`ModalProvider`/`ModalDialog`) instead of two. | The platform dialog develops a gap Radix solves that we actually hit. |
| **`Checkbox`/`Switch` are native inputs** styled with `peer-checked:` | Zero JS for what the browser does; form semantics for free. | A needed feature (indeterminate visuals aside) genuinely requires JS state. |
| **`sonner` behind `./toaster`**, not in the root entry | It injects a stylesheet at module scope and ships no `sideEffects: false` — unshakeable, and a CSP violation for strict apps. `treeshaking.test.ts` gates it. | sonner becomes side-effect-free, or we replace it with a platform/own implementation. |
| **`react-day-picker` in the root entry** (unlike sonner) | Its JS is side-effect-clean (`sideEffects: ["**/*.css"]`) and we style from tokens without importing its CSS — unused, it tree-shakes away. | Its sideEffects field regresses (the smoke/treeshake gates would catch the symptom). |
| **Button's default variant is the MLZ outline**, not shadcn's filled | The outline *is* the brand signature. shadcn muscle memory is served by `outline`/`secondary` aliases instead. Decided 2026-08-11 over the breaking rename. | The brand itself moves to a filled-first look — that's a BREAKING default change per VERSIONING.md. |
| **Stay on 0.x with `~` pinning** rather than cutting 1.0 | Decided 2026-08-11: less ceremony while the API still moves monthly; the cost (no floating minors) is documented in VERSIONING.md. | The API is stable for a few cycles — then cut 1.0.0 and switch consumers to `^`. |
| **No sourcemaps in dist** | dist is committed but maps were gitignored, so the `bun add github:` path shipped dangling `sourceMappingURL`s. Readable ESM + d.ts is the debugging surface. | dist stops being committed, or a real debugging need appears. |
| **Biome is scoped to JS/TS; CSS is hand-formatted** | `theme.css` is hand-column-aligned documentation as much as code; a formatter would destroy it. | A CSS formatter can be configured to preserve the alignment. |
| **Storybook uses PostCSS**, not `@tailwindcss/vite` | Open export-compat bug between the Vite plugin and Storybook's builder. | The bug is fixed upstream — retest and drop `postcss.config.mjs`. |
| **Railway deployment removed** (Dockerfile, server.mjs) | Cloudflare Workers serves the static Storybook at design.mlz.no; two deploy targets is one too many. | Workers stops being able to serve it. |
| **Class strings are not consumer API**; `data-slot` attributes are | Lets styling evolve in minors. In-repo tests may assert classes (our own contract); consumers target `[data-slot="…"]`. | Never — this is the line that keeps styling changes non-breaking. |
