import type { StorybookConfig } from "@storybook/react-vite";
import remarkGfm from "remark-gfm";

/** Set by the `build:storybook` script. See the `addons` note below. */
const isBuild = process.env.MLZ_STORYBOOK_BUILD === "1";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(ts|tsx)"],
  addons: [
    {
      name: "@storybook/addon-docs",
      // Storybook's MDX pipeline has no GFM by default, so a markdown table in
      // an `.mdx` page renders as literal `|` characters — silently, with no
      // build warning. `Theming.mdx` shipped broken this way.
      options: {
        mdxPluginOptions: { mdxCompileOptions: { remarkPlugins: [remarkGfm] } },
      },
    },
    // `@storybook/addon-a11y` is dev-only, and not by preference.
    //
    // On Storybook 10.5.7, a *built* manager renders blank (PolishedError #5 from
    // `parseToRgb`) when two addons are registered AND `.storybook/manager.ts`
    // exists. Bisected: either alone is fine, order is irrelevant, and it
    // reproduces with a manager.ts containing only `export {}`. `storybook dev`
    // is unaffected — only `storybook build` breaks.
    //
    // So the panel loads locally, and the deployed build drops it to keep the
    // branded chrome. Nothing is lost from the a11y *gate*: that's
    // `axe-playwright` in `test-runner.ts`, which reads `parameters.a11y`
    // directly and never imported this addon. Verified: the full axe suite passes either way.
    //
    // Revisit on the next Storybook upgrade — see docs/architecture.md.
    ...(isBuild ? [] : ["@storybook/addon-a11y"]),
  ],
  framework: { name: "@storybook/react-vite", options: {} },
  core: { disableTelemetry: true },
  docs: { defaultName: "Docs" },
  staticDirs: ["./public"],
  // The manager runs outside the preview iframe, so it never sees `fonts.css`.
  // Load the brand faces here too, or the themed chrome falls back to system-ui.
  managerHead: (head) => `
    ${head}
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Space+Mono:wght@400;700&display=swap"
    />
  `,
  typescript: {
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      // Union props (`variant`, `size`, `tone`…) render as a picker rather than a
      // free-text field.
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      // Components spread native element props, so without this every props table
      // is buried under ~250 inherited React HTML attributes. Keep only props
      // declared in this repo.
      propFilter: (prop) => !prop.parent?.fileName.includes("node_modules"),
    },
  },
};

export default config;
