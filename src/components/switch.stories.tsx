import type { Meta, StoryObj } from "@storybook/react-vite";
import { Label } from "./label";
import { Switch } from "./switch";

const meta = {
  title: "Components/Switch",
  component: Switch,
  tags: ["autodocs"],
  argTypes: {
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  parameters: { layout: "centered" },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <Switch {...args} />,
};

export const Checked: Story = {
  args: { defaultChecked: true },
  render: (args) => <Switch {...args} />,
};

export const Disabled: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Switch disabled />
      <Switch disabled defaultChecked />
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center justify-between gap-6">
      <div className="grid gap-1 leading-none">
        <Label htmlFor="motion" className="cursor-pointer">
          Reduced motion
        </Label>
        <p className="font-mono text-xs text-muted-foreground">Tone down decorative animations.</p>
      </div>
      <Switch id="motion" defaultChecked />
    </div>
  ),
};
