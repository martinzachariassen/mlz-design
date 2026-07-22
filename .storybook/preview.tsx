import type { Decorator, Preview } from "@storybook/react-vite";
import { useEffect } from "react";
import "./app.css";

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
    options: {
      storySort: {
        order: ["Introduction", "Foundations", ["Colours", "Typography"], "Components"],
      },
    },
  },
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
