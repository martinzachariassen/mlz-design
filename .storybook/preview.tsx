import type { Decorator, Preview } from "@storybook/react-vite";
import { useEffect } from "react";
import { breakpoints } from "../src/tokens";
import "./app.css";

// Viewport presets generated from the system's own breakpoint ladder, so
// responsive checks happen at the widths the components actually switch at
// rather than at some stock phone sizes. `mobile` is the one width below `sm`,
// where every `direction="responsive"` / `cols` utility is in its stacked state.
const viewports = {
  mobile: { name: "Mobile (below sm)", styles: { width: "23.4375rem", height: "60rem" } },
  ...Object.fromEntries(
    Object.entries(breakpoints).map(([name, width]) => [
      name,
      { name: `${name} (${width})`, styles: { width, height: "60rem" } },
    ]),
  ),
} as const;

// One decorator, two independent toolbar dimensions (Theme + Accent). Both are
// applied to the preview <html>, so every token in theme.css re-resolves live —
// exactly how a consuming app would swap them at runtime.
const withThemeAndAccent: Decorator = (Story, context) => {
  const { theme, accent } = context.globals;
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.setAttribute("data-accent", String(accent));
    root.style.background = "var(--background)";
  }, [theme, accent]);
  return <Story />;
};

const preview: Preview = {
  parameters: {
    layout: "centered",
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/i },
      expanded: true,
    },
    a11y: { test: "todo" },
    viewport: { options: viewports },
    docs: { toc: true },
    options: {
      // Enumerate every level: anything unlisted falls through to definition
      // order, which reads as random once a section grows.
      storySort: {
        order: [
          "Get started",
          ["Introduction", "Installation", "Theming"],
          "Foundations",
          ["Colour", "Colour usage", "Typography", "Motion", "Responsive"],
          "Brand",
          [
            "Logo",
            "Favicon",
            "BrandMark",
            "GlitchText",
            "GridBackground",
            "FloatingMarks",
            "ProjectCard",
            "RepoBanner",
            "SocialCard",
          ],
          "Components",
          ["Actions", "Forms", "Data display", "Feedback", "Layout", "Overlay"],
          "Patterns",
        ],
      },
    },
  },
  // Every component story gets a generated docs page (props table + variants).
  tags: ["autodocs"],
  globalTypes: {
    theme: {
      description: "Colour theme",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        dynamicTitle: true,
        items: [
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
        ],
      },
    },
    accent: {
      description: "Accent family",
      defaultValue: "cyan",
      toolbar: {
        title: "Accent",
        icon: "paintbrush",
        dynamicTitle: true,
        items: [
          { value: "cyan", title: "Cyan" },
          { value: "blue", title: "Blue" },
          { value: "green", title: "Green" },
          { value: "rust", title: "Rust" },
          { value: "ink", title: "Ink" },
        ],
      },
    },
  },
  decorators: [withThemeAndAccent],
};

export default preview;
