import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeSplit } from "../../foundations/theme-split";
import { Kbd } from "./kbd";

const meta = {
  title: "Components/Data display/Kbd",
  component: Kbd,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    children: {
      description: "The key legend — a letter, a word like `Esc`, or a glyph.",
      control: "text",
    },
  },
  args: { children: "K" },
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A single key. Renders a real `<kbd>`, so assistive tech announces it as keyboard input. */
export const Playground: Story = {};

/** Words and glyphs alike — `min-w-6` keeps narrow keys from collapsing into slivers. */
export const Keys: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Kbd>Esc</Kbd>
      <Kbd>Tab</Kbd>
      <Kbd>⏎</Kbd>
      <Kbd>⌘</Kbd>
      <Kbd>⇧</Kbd>
    </div>
  ),
};

/** A shortcut written out. One `Kbd` per key with a literal `+` between them reads better than cramming `⌘K` into one chip. */
export const Combination: Story = {
  render: () => (
    <p className="flex items-center gap-1.5 font-mono text-sm text-muted-foreground">
      Open the palette with <Kbd>⌘</Kbd>
      <span>+</span>
      <Kbd>K</Kbd>
    </p>
  ),
};

/** The chip sits on `--muted` inside a `--border` hairline, so it stays a step off the page in both themes. */
export const LightDark: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <ThemeSplit>
      <div className="flex flex-wrap items-center gap-2">
        <Kbd>Esc</Kbd>
        <Kbd>Tab</Kbd>
        <Kbd>⏎</Kbd>
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </div>
    </ThemeSplit>
  ),
};
