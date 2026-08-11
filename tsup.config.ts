import { defineConfig } from "tsup";

// The RSC boundary: `index` and `toaster` ship client components (hooks,
// context, DOM access) and must lead with `"use client"` — without it,
// importing e.g. `ThemeProvider` in a Next.js App Router server component
// crashes at runtime (`react-server` builds of React export no `useState` /
// `createContext`). `tokens` is pure data and deliberately stays
// directive-free so it remains importable from server components. The
// directive is added by `scripts/use-client-banner.mjs` in the build script —
// tsup's `banner` option does not survive the treeshake (rollup) pass.
//
// No sourcemaps: dist/ is committed (the `bun add github:` fallback) but maps
// are gitignored, so shipping a `sourceMappingURL` would dangle for that install
// path. Readable ESM output + d.ts is the debugging surface for a library.
export default defineConfig({
  entry: ["src/index.ts", "src/tokens.ts", "src/toaster.ts"],
  format: ["esm"],
  dts: true,
  treeshake: true,
  external: ["react", "react-dom"],
});
