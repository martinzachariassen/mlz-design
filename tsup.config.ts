import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/tokens.ts", "src/brand-assets.ts"],
  format: ["esm"],
  dts: true,
  clean: true,
  sourcemap: true,
  treeshake: true,
  external: ["react", "react-dom"],
});
