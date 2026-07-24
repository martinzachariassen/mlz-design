import { defineBrandAssets } from "./src/brand-assets";

/** This repo's own brand assets — the reference config every other repo copies. */
export default defineBrandAssets({
  banner: {
    project: "Design",
    eyebrow: "MLZ · Design System",
    description: "One canonical source of colour, type, style and motion for every project.",
    badges: ["React", "Tailwind v4", "SwiftUI", "OKLCH"],
    install: "bun add @martinzachariassen/design",
    footer: "github.com/martinzachariassen/mlz-design",
  },
  social: {
    title: "One design system, every project.",
    eyebrow: "Martin Zachariassen",
    description:
      "Colour, type and motion as tokens — installable, themeable, and true to the brand.",
    footer: "MLZ Design",
    tag: "design",
    tagline: "Design System",
  },
});
