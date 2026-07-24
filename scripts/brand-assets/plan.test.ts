import { join } from "node:path";
import { describe, expect, it } from "vitest";
import type { BrandAssetsConfig } from "../../src/brand-assets";
import { FAVICON_SVG, icoPath, M_POINTS, targets } from "./plan";

const ROOT = "/repo";

const base: BrandAssetsConfig = {
  banner: { project: "mlz.no" },
  social: { title: "Hello" },
};

/** Map a target back to its root-relative path for readable assertions. */
const rel = (t: { file: string }) => t.file.slice(ROOT.length + 1);

describe("targets", () => {
  it("always plans the banner and both social cards at canonical sizes", () => {
    const list = targets(base, ROOT);
    const byRel = Object.fromEntries(list.map((t) => [rel(t), t]));

    expect(byRel["assets/banner.png"]).toMatchObject({ query: "a=banner", w: 1280, h: 340 });
    expect(byRel["public/assets/social/og.png"]).toMatchObject({ w: 1200, h: 630 });
    expect(byRel["public/assets/social/twitter-card.png"]).toMatchObject({ w: 1200, h: 630 });
  });

  it("plans the full favicon/app-icon set by default", () => {
    const paths = targets(base, ROOT).map(rel);
    expect(paths).toEqual(
      expect.arrayContaining([
        "public/assets/icons/favicon.svg",
        "public/assets/icons/favicon-32.png",
        "public/assets/icons/favicon-192.png",
        "public/assets/icons/apple-touch-icon.png",
      ]),
    );
  });

  it("emits favicon.svg as literal contents, not a screenshot", () => {
    const svg = targets(base, ROOT).find((t) => rel(t) === "public/assets/icons/favicon.svg");
    expect(svg?.svg).toBe(FAVICON_SVG);
    expect(svg?.query).toBeUndefined();
  });

  it("captures rounded icons on a transparent background, the apple icon on a filled one", () => {
    const byRel = Object.fromEntries(targets(base, ROOT).map((t) => [rel(t), t]));
    expect(byRel["public/assets/icons/favicon-32.png"].alpha).toBe(true);
    expect(byRel["public/assets/icons/favicon-192.png"].alpha).toBe(true);
    // apple-touch-icon bleeds to the edges, so no transparency.
    expect(byRel["public/assets/icons/apple-touch-icon.png"].alpha).toBeUndefined();
  });

  it("drops the whole icon set when favicons is false", () => {
    const list = targets({ ...base, favicons: false }, ROOT);
    expect(list).toHaveLength(3);
    expect(list.every((t) => !rel(t).includes("icon"))).toBe(true);
  });

  it("honours per-group path overrides", () => {
    const cfg: BrandAssetsConfig = { ...base, paths: { banner: "media", social: "og" } };
    const paths = targets(cfg, ROOT).map(rel);
    expect(paths).toContain("media/banner.png");
    expect(paths).toContain("og/og.png");
    // Un-overridden groups keep their defaults.
    expect(paths).toContain("public/assets/icons/favicon.svg");
  });

  it("roots every path at the given repo root", () => {
    for (const t of targets(base, ROOT)) {
      expect(t.file.startsWith(`${ROOT}/`)).toBe(true);
    }
  });
});

describe("icoPath", () => {
  it("defaults favicon.ico to the repo's public dir", () => {
    expect(icoPath(base, ROOT)).toBe(join(ROOT, "public/favicon.ico"));
  });

  it("honours a paths.ico override", () => {
    expect(icoPath({ ...base, paths: { ico: "static" } }, ROOT)).toBe(
      join(ROOT, "static/favicon.ico"),
    );
  });
});

describe("FAVICON_SVG", () => {
  it("is a well-formed 32×32 SVG with the mlz. mark", () => {
    const doc = new DOMParser().parseFromString(FAVICON_SVG, "image/svg+xml");
    expect(doc.querySelector("parsererror")).toBeNull();

    const svg = doc.documentElement;
    expect(svg.tagName.toLowerCase()).toBe("svg");
    expect(svg.getAttribute("viewBox")).toBe("0 0 32 32");

    // A rounded ink tile behind a paper-coloured glyph.
    expect(doc.querySelector("rect")?.getAttribute("fill")).toBe("#1a1a18");
    const glyph = doc.querySelector("polygon");
    expect(glyph?.getAttribute("fill")).toBe("#ecebe4");
    expect(glyph?.getAttribute("points")).toBe(M_POINTS);
  });
});
