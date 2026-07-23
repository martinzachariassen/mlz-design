import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./badge";

const meta = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "accent", "outline", "muted", "destructive"],
    },
    children: { control: "text" },
  },
  args: { children: "v0.1.0", variant: "default" },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge variant="default">Default</Badge>
      <Badge variant="accent">Accent</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="muted">Muted</Badge>
      <Badge variant="destructive">Destructive</Badge>
    </div>
  ),
};
