import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { ThemeSplit } from "../../foundations/theme-split";
import { Field, FieldDescription, FieldLabel } from "./field";
import { Input } from "./input";
import { Slider } from "./slider";

const meta = {
  title: "Components/Forms/Slider",
  component: Slider,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    min: { control: "number" },
    max: { control: "number" },
    step: { control: "number" },
    disabled: { control: "boolean" },
    orientation: { control: "inline-radio", options: ["horizontal", "vertical"] },
  },
  args: { defaultValue: [40], min: 0, max: 100, step: 1, "aria-label": "Volume" },
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Arrows step by `step`, PageUp/PageDown by ten, Home and End jump to the ends. */
export const Playground: Story = {};

/**
 * Two or more values render a thumb each, and every thumb is its own tab stop.
 *
 * **A range needs `thumbLabels`.** The element carrying `role="slider"` is the
 * thumb, so a name on the root never reaches it — and two thumbs both called
 * "Price" are indistinguishable to a screen reader. The axe gate fails the story
 * without them, which is how this ended up documented rather than assumed.
 */
export const Range: Story = {
  args: {
    defaultValue: [20, 80],
    "aria-label": "Price range",
    thumbLabels: ["Minimum price", "Maximum price"],
  },
};

/**
 * **The shape to prefer.** A slider alone makes "37" take ten seconds and a steady
 * hand; a number field alone loses the feel of where the value sits. Together they
 * cost nothing, and the field is the accessible route for anyone who can't drag.
 */
export const WithANumberField: Story = {
  render: function WithANumberFieldStory() {
    const [value, setValue] = React.useState(40);
    return (
      <Field>
        <FieldLabel>Bundle budget</FieldLabel>
        <div className="flex items-center gap-4">
          <Slider
            value={[value]}
            onValueChange={([next]) => setValue(next ?? 0)}
            max={200}
            aria-label="Bundle budget"
            className="flex-1"
          />
          <Input
            type="number"
            value={value}
            onChange={(event) => setValue(Number(event.target.value))}
            className="w-20 tabular-nums"
            aria-label="Bundle budget in kilobytes"
          />
        </div>
        <FieldDescription>Kilobytes. Builds over this fail the size check.</FieldDescription>
      </Field>
    );
  },
};

/** Vertical for anything spatial — a volume column, an equaliser band. */
export const Vertical: Story = {
  args: { orientation: "vertical", "aria-label": "Gain" },
  decorators: [
    (Story) => (
      <div className="flex h-44 items-center">
        <Story />
      </div>
    ),
  ],
};

/** Disabled drops the whole control to 50% and stops the keyboard as well as the pointer. */
export const Disabled: Story = {
  args: { disabled: true },
};

export const LightDark: Story = {
  parameters: { layout: "fullscreen" },
  decorators: [],
  render: () => (
    <ThemeSplit>
      <div className="w-56">
        <Slider defaultValue={[40]} aria-label="Volume" />
      </div>
    </ThemeSplit>
  ),
};
