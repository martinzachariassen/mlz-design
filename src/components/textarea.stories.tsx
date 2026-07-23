import type { Meta, StoryObj } from "@storybook/react-vite";
import { Label } from "./label";
import { Textarea } from "./textarea";

const meta = {
  title: "Components/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  argTypes: {
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    rows: { control: "number" },
  },
  args: { placeholder: "Tell me about the project…" },
  parameters: { layout: "centered" },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-80">
      <Textarea {...args} />
    </div>
  ),
};

export const Disabled: Story = {
  args: { disabled: true, placeholder: "Unavailable" },
  render: (args) => (
    <div className="w-80">
      <Textarea {...args} />
    </div>
  ),
};

export const WithField: Story = {
  render: () => (
    <div className="grid w-80 gap-2">
      <Label htmlFor="brief">Project brief</Label>
      <Textarea id="brief" rows={4} placeholder="Tell me about the project…" />
      <p className="font-mono text-xs text-muted-foreground">Markdown is welcome.</p>
    </div>
  ),
};
