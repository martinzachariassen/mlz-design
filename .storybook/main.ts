import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-a11y", "@storybook/addon-docs"],
  framework: { name: "@storybook/react-vite", options: {} },
  core: { disableTelemetry: true },
  docs: { defaultName: "Docs" },
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
