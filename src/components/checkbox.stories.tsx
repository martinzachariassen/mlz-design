import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox } from "./checkbox";
import { Label } from "./label";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  parameters: { layout: "centered" },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <Checkbox aria-label="Example checkbox" {...args} />,
};

export const Checked: Story = {
  args: { defaultChecked: true },
  render: (args) => <Checkbox aria-label="Example checkbox" {...args} />,
};

export const Disabled: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Checkbox disabled aria-label="Disabled checkbox" />
      <Checkbox disabled defaultChecked aria-label="Disabled checked checkbox" />
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-start gap-3">
      <Checkbox id="ship" defaultChecked />
      <div className="grid gap-1 leading-none">
        <Label htmlFor="ship" className="cursor-pointer">
          Ship it
        </Label>
        <p className="font-mono text-xs text-muted-foreground">Deploy to production on merge.</p>
      </div>
    </div>
  ),
};
