import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeSplit } from "../../foundations/theme-split";
import { DatePicker } from "./date-picker";
import { Field, FieldDescription, FieldLabel } from "./field";

const meta = {
  title: "Components/Forms/DatePicker",
  component: DatePicker,
  tags: ["autodocs", "status:new"],
  parameters: { layout: "centered" },
  args: { placeholder: "Pick a date" },
  argTypes: {
    placeholder: { control: "text" },
    size: {
      control: "inline-radio",
      options: ["sm", "default"],
      description: '`sm` (h-9) lines up with `Button size="sm"`.',
    },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Uncontrolled: pick a day and the panel closes, the trigger reads the date. */
export const Playground: Story = {
  render: (args) => (
    <div className="w-64">
      <DatePicker {...args} aria-label="Date" />
    </div>
  ),
};

/** Inside a `Field` it inherits the id, description wiring and invalid state. */
export const InField: Story = {
  render: () => (
    <Field className="w-64">
      <FieldLabel>Deploy date</FieldLabel>
      <DatePicker placeholder="Pick a date" />
      <FieldDescription>Rollouts happen at 06:00 UTC.</FieldDescription>
    </Field>
  ),
};

/** `sm` next to `default` — the same scale as the other field controls. */
export const Sizes: Story = {
  render: () => (
    <div className="flex w-64 flex-col gap-3">
      <DatePicker size="sm" placeholder="size=sm" aria-label="Compact date" />
      <DatePicker placeholder="size=default" aria-label="Regular date" />
    </div>
  ),
};

/** Closed triggers in both themes; the open panel is `Calendar`'s LightDark story. */
export const LightDark: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <ThemeSplit>
      <div className="w-64">
        <DatePicker defaultValue={new Date(2026, 7, 11)} aria-label="Date" />
      </div>
    </ThemeSplit>
  ),
};
