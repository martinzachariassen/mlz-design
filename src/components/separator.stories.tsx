import type { Meta, StoryObj } from "@storybook/react-vite";
import { Separator } from "./separator";

const meta = {
  title: "Components/Separator",
  component: Separator,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    orientation: { control: "inline-radio", options: ["horizontal", "vertical"] },
    decorative: { control: "boolean" },
    label: { control: "text" },
  },
  args: { orientation: "horizontal", decorative: true },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: (args) => (
    <div className="w-80 font-mono text-sm text-muted-foreground">
      <p>Primitives</p>
      <Separator {...args} className="my-4" />
      <p>Semantic tokens</p>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-6 items-center gap-4 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
      <span>Docs</span>
      <Separator orientation="vertical" />
      <span>Source</span>
      <Separator orientation="vertical" />
      <span>Tokens</span>
    </div>
  ),
};

export const WithLabel: Story = {
  args: { label: "or" },
  render: (args) => (
    <div className="w-80">
      <Separator {...args} />
    </div>
  ),
};
