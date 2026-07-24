import { describe, expect, it } from "vitest";
import { type BrandAssetsConfig, DEFAULT_PATHS, defineBrandAssets } from "./brand-assets";

describe("defineBrandAssets", () => {
  it("returns the config unchanged (identity helper for typing)", () => {
    const cfg: BrandAssetsConfig = {
      banner: { project: "mlz.no" },
      social: { title: "Hello" },
    };
    expect(defineBrandAssets(cfg)).toBe(cfg);
  });
});

describe("DEFAULT_PATHS", () => {
  it("pins the canonical output locations each repo inherits", () => {
    expect(DEFAULT_PATHS).toEqual({
      banner: "assets",
      social: "public/assets/social",
      icons: "public/assets/icons",
      ico: "public",
    });
  });
});
