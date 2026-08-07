import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeSplit } from "../../foundations/theme-split";
import { Label } from "./label";
import { Textarea } from "./textarea";

const meta = {
  title: "Components/Forms/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  argTypes: {
    placeholder: { description: "Hint text shown while the field is empty.", control: "text" },
    disabled: { description: "Dim the field and block interaction.", control: "boolean" },
    rows: {
      description: "Starting height in lines. The user can still drag it taller.",
      control: "number",
    },
  },
  args: { placeholder: "Tell me about the project…" },
  parameters: { layout: "centered" },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The default six-line box. The bottom-right grip resizes it vertically only — horizontal resize would break the layout. */
export const Default: Story = {
  render: (args) => (
    <div className="w-80">
      <Textarea {...args} />
    </div>
  ),
};

/** Disabled dims the field and blocks the resize grip. */
export const Disabled: Story = {
  args: { disabled: true, placeholder: "Unavailable" },
  render: (args) => (
    <div className="w-80">
      <Textarea {...args} />
    </div>
  ),
};

/** Label, textarea and hint as one unit, with `rows` setting the starting height. */
export const WithField: Story = {
  render: () => (
    <div className="grid w-80 gap-2">
      <Label htmlFor="brief">Project brief</Label>
      <Textarea id="brief" rows={4} placeholder="Tell me about the project…" />
      <p className="font-mono text-xs text-muted-foreground">Markdown is welcome.</p>
    </div>
  ),
};

/** The field unit in both themes. */
export const LightDark: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <ThemeSplit>
      <div className="grid w-64 gap-2">
        <Label htmlFor="brief-split">Project brief</Label>
        <Textarea id="brief-split" rows={4} placeholder="Tell me about the project…" />
      </div>
    </ThemeSplit>
  ),
};
