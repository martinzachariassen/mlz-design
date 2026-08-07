import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeSplit } from "../../foundations/theme-split";
import { Label } from "./label";
import { Switch } from "./switch";

const meta = {
  title: "Components/Forms/Switch",
  component: Switch,
  tags: ["autodocs"],
  argTypes: {
    checked: {
      description: "Controlled on/off state. Use `defaultChecked` to leave it uncontrolled.",
      control: "boolean",
    },
    disabled: { description: "Dim the switch and block interaction.", control: "boolean" },
  },
  parameters: { layout: "centered" },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Off. The track uses `--input`; the thumb is a `--background` disc that slides 16px on toggle. */
export const Default: Story = {
  render: (args) => <Switch aria-label="Example switch" {...args} />,
};

/** On — the track fills with `--primary` and the thumb travels right. */
export const Checked: Story = {
  args: { defaultChecked: true },
  render: (args) => <Switch aria-label="Example switch" {...args} />,
};

/** Disabled in both positions. */
export const Disabled: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Switch disabled aria-label="Disabled switch" />
      <Switch disabled defaultChecked aria-label="Disabled checked switch" />
    </div>
  ),
};

/** A settings row: label and hint on the left, switch on the right. Use a switch when the change applies immediately; use a checkbox when it needs a Save. */
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

/** Every state across both themes. */
export const LightDark: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <ThemeSplit>
      <div className="flex items-center gap-4">
        <Switch aria-label="Off switch" />
        <Switch defaultChecked aria-label="On switch" />
        <Switch disabled aria-label="Disabled switch" />
        <Switch disabled defaultChecked aria-label="Disabled checked switch" />
      </div>
    </ThemeSplit>
  ),
};
