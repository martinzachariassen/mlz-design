// Prepends `"use client";` to the client entry points after tsup runs.
//
// This is a post-build step, not a tsup `banner`, because the treeshake pass
// (rollup) rewrites the output and drops the esbuild banner — verified: with
// `banner: { js: '"use client";' }` configured, dist/index.js still began with
// a bare import. `dist/tokens.js` is deliberately left directive-free so pure
// token data stays importable from React server components.
// scripts/package-smoke.sh asserts all three outcomes on every build.
import { readFileSync, writeFileSync } from "node:fs";

for (const file of ["dist/index.js", "dist/toaster.js"]) {
  const source = readFileSync(file, "utf8");
  if (!source.startsWith('"use client";')) {
    writeFileSync(file, `"use client";\n${source}`);
  }
}
