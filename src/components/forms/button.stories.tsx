import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeSplit } from "../../foundations/theme-split";
import { Button } from "./button";

const meta = {
  title: "Components/Actions/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      description: "Visual weight, from hairline outline through solid fill.",
      control: "select",
      options: ["default", "solid", "accent", "ghost", "sketch", "destructive", "link"],
    },
    size: {
      description: "Control height and padding. `icon` renders a square button.",
      control: "select",
      options: ["sm", "default", "lg", "icon"],
    },
    disabled: { control: "boolean" },
    children: { control: "text" },
  },
  args: { children: "Deploy", variant: "default", size: "default" },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Every prop wired to a control — change `variant`, `size` and the label and watch the button react. */
export const Playground: Story = {};

/** Every variant side by side. `default` is the workhorse; reserve `accent` for the single primary action on a view. */
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="default">Default</Button>
      <Button variant="solid">Solid</Button>
      <Button variant="accent">Accent</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="sketch">Sketch</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

/** Three heights on the same 11px-tracked mono label. `icon` (not shown) is a square button for a lone glyph. */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

/** Disabled buttons drop to 50% opacity and stop receiving pointer events — the hover lift never fires. */
export const Disabled: Story = {
  args: { disabled: true },
};

/** The same set in both themes. Nothing here is hard-coded: every colour resolves through the semantic layer. */
export const LightDark: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <ThemeSplit>
      <div className="flex flex-wrap items-center gap-4">
        <Button variant="default">Default</Button>
        <Button variant="solid">Solid</Button>
        <Button variant="accent">Accent</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
      </div>
    </ThemeSplit>
  ),
};
