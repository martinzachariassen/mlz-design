import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeSplit } from "../../foundations/theme-split";
import { Input } from "./input";
import { Label } from "./label";

const meta = {
  title: "Components/Forms/Label",
  component: Label,
  tags: ["autodocs"],
  args: { children: "Email address" },
  parameters: { layout: "centered" },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <Label {...args} />,
};

export const WithField: Story = {
  render: () => (
    <div className="grid w-72 gap-2">
      <Label htmlFor="email">Email address</Label>
      <Input id="email" type="email" placeholder="you@example.com" />
      <p className="font-mono text-xs text-muted-foreground">We only use it to reply.</p>
    </div>
  ),
};

export const LightDark: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <ThemeSplit>
      <div className="grid w-72 gap-2">
        <Label htmlFor="email-ld">Email address</Label>
        <Input id="email-ld" type="email" placeholder="you@example.com" />
        <p className="font-mono text-xs text-muted-foreground">We only use it to reply.</p>
      </div>
    </ThemeSplit>
  ),
};
