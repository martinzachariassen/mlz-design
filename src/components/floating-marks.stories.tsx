import type { Meta, StoryObj } from "@storybook/react-vite";
import { FloatingMarks } from "./floating-marks";

const meta = {
  title: "Components/FloatingMarks",
  component: FloatingMarks,
  parameters: { layout: "fullscreen" },
  argTypes: {
    count: { control: { type: "range", min: 4, max: 40, step: 2 } },
  },
  args: { count: 14 },
  render: (args) => (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <FloatingMarks {...args} />
      <div className="relative flex min-h-screen items-center justify-center">
        <h1 className="font-hand text-6xl text-foreground">Drifting marks</h1>
      </div>
    </div>
  ),
} satisfies Meta<typeof FloatingMarks>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Dense: Story = {
  args: { count: 28 },
};
