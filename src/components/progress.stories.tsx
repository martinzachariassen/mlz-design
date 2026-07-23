import type { Meta, StoryObj } from "@storybook/react-vite";
import { Progress } from "./progress";

const meta = {
  title: "Components/Progress",
  component: Progress,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100, step: 1 } },
    variant: { control: "select", options: ["default", "accent"] },
  },
  args: { value: 60, variant: "default" },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <div className="w-72">
      <Progress {...args} />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-4">
      <Progress value={40} variant="default" />
      <Progress value={40} variant="accent" />
    </div>
  ),
};

export const Labelled: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-2">
      <div className="flex items-baseline justify-between font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">
        <span>Deploying</span>
        <span>72%</span>
      </div>
      <Progress value={72} variant="accent" />
    </div>
  ),
};

export const Steps: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-4">
      {[0, 25, 50, 75, 100].map((value) => (
        <Progress key={value} value={value} />
      ))}
    </div>
  ),
};
