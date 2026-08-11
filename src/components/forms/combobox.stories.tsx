import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { ThemeSplit } from "../../foundations/theme-split";
import { Combobox } from "./combobox";
import { Field, FieldDescription, FieldError, FieldLabel } from "./field";

const regions = [
  { value: "eu-north-1", label: "Europe (Stockholm)" },
  { value: "eu-west-1", label: "Europe (Ireland)" },
  { value: "eu-central-1", label: "Europe (Frankfurt)" },
  { value: "us-east-1", label: "US East (N. Virginia)" },
  { value: "us-west-2", label: "US West (Oregon)" },
  { value: "ap-south-1", label: "Asia Pacific (Mumbai)" },
  { value: "ap-northeast-1", label: "Asia Pacific (Tokyo)" },
  { value: "sa-east-1", label: "South America (São Paulo)" },
  { value: "af-south-1", label: "Africa (Cape Town)" },
  { value: "me-central-1", label: "Middle East (UAE)", disabled: true },
];

const meta = {
  title: "Components/Forms/Combobox",
  component: Combobox,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    placeholder: { control: "text" },
    searchPlaceholder: { control: "text" },
    disabled: { control: "boolean" },
  },
  args: { options: regions, placeholder: "Pick a region", "aria-label": "Region" },
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Type to filter. Enter selects, Esc closes and focus returns to the trigger. */
export const Playground: Story = {};

/** Inside a `Field` it picks up the label, description and error wiring with no ids. */
export const InAField: Story = {
  decorators: [],
  render: (args) => (
    <div className="w-80">
      <Field>
        <FieldLabel>Region</FieldLabel>
        <Combobox {...args} aria-label={undefined} />
        <FieldDescription>Where the workers run. Can't be changed later.</FieldDescription>
      </Field>
    </div>
  ),
};

/** `invalid` reaches the trigger through the same context every other control uses. */
export const Invalid: Story = {
  decorators: [],
  render: (args) => (
    <div className="w-80">
      <Field invalid>
        <FieldLabel>Region</FieldLabel>
        <Combobox {...args} aria-label={undefined} />
        <FieldError>Pick a region before continuing.</FieldError>
      </Field>
    </div>
  ),
};

/**
 * **Picking the current value again clears it.** A combobox has no "none" row, so
 * without this there is no way back to empty once something is chosen.
 */
export const ClearingTheValue: Story = {
  decorators: [],
  render: function ClearingStory(args) {
    const [value, setValue] = React.useState("eu-west-1");
    return (
      <div className="flex w-80 flex-col gap-3">
        <Combobox {...args} value={value} onValueChange={setValue} aria-label="Region" />
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          value: {value || "—"}
        </p>
      </div>
    );
  },
};

/**
 * **The line where this stops being the right component.** Below roughly fifteen
 * options, `Select` shows every choice at once and costs one click instead of a
 * click plus a guess at what the thing is called. Recognition beats recall.
 */
export const WhenToUseSelectInstead: Story = {
  decorators: [],
  render: () => (
    <div className="flex max-w-md flex-col gap-3 text-sm">
      <p className="text-muted-foreground">
        <span className="text-foreground">Combobox:</span> regions, timezones, country codes,
        repositories — long, and the reader knows the name.
      </p>
      <p className="text-muted-foreground">
        <span className="text-foreground">Select:</span> six to fifteen options the reader will
        recognise but not recall.
      </p>
      <p className="text-muted-foreground">
        <span className="text-foreground">RadioGroup:</span> two to five, where seeing them side by
        side is what helps.
      </p>
    </div>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const LightDark: Story = {
  parameters: { layout: "fullscreen" },
  decorators: [],
  render: (args) => (
    <ThemeSplit>
      <div className="w-56">
        <Combobox {...args} defaultValue="eu-north-1" />
      </div>
    </ThemeSplit>
  ),
};
