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

// One decorator, three independent toolbar dimensions (Theme + Accent + Motion).
// All are applied to the preview <html>, so every token in theme.css re-resolves
// live — exactly how a consuming app would swap them at runtime.
//
// Motion drives `data-motion`, the kill-switch theme.css already ships. It is a
// superset of the OS `prefers-reduced-motion` guard in base.css, so switching it
// off here is the only way to check the reduced-motion path without changing
// system settings.
const withThemeAndAccent: Decorator = (Story, context) => {
  const { theme, accent, motion } = context.globals;
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.setAttribute("data-accent", String(accent));
    // Only set the attribute when motion is off: `data-motion="on"` matches
    // nothing in theme.css, and leaving it unset keeps the default path honest.
    if (motion === "off") root.setAttribute("data-motion", "off");
    else root.removeAttribute("data-motion");
    root.style.background = "var(--background)";
  }, [theme, accent, motion]);
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
          ["Introduction", "Installation", "Theming", "Accessibility"],
          "Foundations",
          ["Colour", "Colour model", "Colour usage", "Typography", "Motion", "Responsive"],
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
            "ThemeToggle",
          ],
          // Every leaf is named, not just the six group headings. A group listed
          // without its children sorts its own children by definition order,
          // which is file-discovery order — i.e. arbitrary.
          "Components",
          [
            "Actions",
            ["Button"],
            "Forms",
            [
              "Field",
              "Input",
              "Textarea",
              "Label",
              "Checkbox",
              "RadioGroup",
              "Select",
              "Switch",
              "Slider",
              "Toggle",
            ],
            "Data display",
            [
              "Text",
              "Prose",
              "Code",
              "Link",
              "Badge",
              "Kbd",
              "StatusDot",
              "Stat",
              "Avatar",
              "Table",
              "DataList",
            ],
            "Feedback",
            ["Alert", "Callout", "Toaster", "EmptyState", "Progress", "Spinner", "Skeleton"],
            "Layout",
            [
              "Container",
              "Card",
              "Separator",
              "Tabs",
              "Accordion",
              "Collapsible",
              "ScrollArea",
              "Breadcrumb",
              "Pagination",
            ],
            "Overlay",
            [
              "Dialog",
              "AlertDialog",
              "Sheet",
              "Popover",
              "DropdownMenu",
              "Tooltip",
              "HoverCard",
              "InfoTip",
            ],
          ],
          "Patterns",
          ["Application shell", "Dashboard", "Forms", "Feedback and states"],
          "Reference",
          ["Tokens", "Changelog"],
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
    motion: {
      description: "Animation kill-switch (data-motion)",
      defaultValue: "on",
      toolbar: {
        title: "Motion",
        icon: "play",
        dynamicTitle: true,
        items: [
          { value: "on", title: "Motion on", icon: "play" },
          { value: "off", title: "Motion off", icon: "stop" },
        ],
      },
    },
  },
  decorators: [withThemeAndAccent],
};

export default preview;
