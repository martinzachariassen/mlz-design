import type { Meta, StoryObj } from "@storybook/react-vite";
import { Kbd } from "./kbd";

const meta = {
  title: "Components/Kbd",
  component: Kbd,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: { children: "K" },
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

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

export const Combination: Story = {
  render: () => (
    <p className="flex items-center gap-1.5 font-mono text-sm text-muted-foreground">
      Open the palette with <Kbd>⌘</Kbd>
      <span>+</span>
      <Kbd>K</Kbd>
    </p>
  ),
};
