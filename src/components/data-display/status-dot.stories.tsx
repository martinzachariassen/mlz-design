import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeSplit } from "../../foundations/theme-split";
import { StatusDot } from "./status-dot";

const meta = {
  title: "Components/Data Display/StatusDot",
  component: StatusDot,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof StatusDot>;

export default meta;
type Story = StoryObj<typeof meta>;

const VARIANTS = ["success", "warning", "destructive", "info", "accent", "muted"] as const;

export const Playground: Story = {
  args: { variant: "success" },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      {VARIANTS.map((v) => (
        <span key={v} className="inline-flex items-center gap-2 font-mono text-xs">
          <StatusDot variant={v} />
          {v}
        </span>
      ))}
    </div>
  ),
};

export const Pulsing: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <StatusDot variant="success" pulse />
      <StatusDot variant="warning" pulse />
      <StatusDot variant="destructive" pulse />
    </div>
  ),
};

export const LightDark: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <ThemeSplit>
      <div className="flex items-center gap-4">
        {VARIANTS.map((v) => (
          <StatusDot key={v} variant={v} />
        ))}
      </div>
    </ThemeSplit>
  ),
};
