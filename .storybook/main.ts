import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-a11y"],
  // Serve the generated brand assets (favicons, social cards) at the web root,
  // so the playground wears the same face it produces. See scripts/brand-assets.
  staticDirs: ["../public"],
  framework: { name: "@storybook/react-vite", options: {} },
  core: { disableTelemetry: true },
  typescript: {
    reactDocgen: "react-docgen-typescript",
  },
};

export default config;
