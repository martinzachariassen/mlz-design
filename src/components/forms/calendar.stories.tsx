import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import type { DateRange } from "react-day-picker";
import { ThemeSplit } from "../../foundations/theme-split";
import { Calendar } from "./calendar";

const meta = {
  title: "Components/Forms/Calendar",
  component: Calendar,
  tags: ["autodocs", "status:new"],
  parameters: { layout: "centered" },
  // Every story owns its selection state, so args are never read — but naming
  // `component` makes Storybook infer them as required.
  args: { mode: "single" },
  argTypes: {
    mode: {
      control: "inline-radio",
      options: ["single", "multiple", "range"],
      description: "DayPicker's selection mode.",
    },
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A single-date grid. Arrow keys move through days; Enter picks. */
export const Playground: Story = {
  render: function PlaygroundStory() {
    const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 7, 11));
    return <Calendar mode="single" selected={date} onSelect={setDate} />;
  },
};

/** `mode="range"`: endpoints keep the filled look, the middle is a tint wash. */
export const Range: Story = {
  render: function RangeStory() {
    const [range, setRange] = React.useState<DateRange | undefined>({
      from: new Date(2026, 7, 4),
      to: new Date(2026, 7, 14),
    });
    return <Calendar mode="range" selected={range} onSelect={setRange} numberOfMonths={2} />;
  },
};

/** `disabled` matchers grey days out — here, weekends and everything before today. */
export const DisabledDays: Story = {
  render: function DisabledStory() {
    const [date, setDate] = React.useState<Date | undefined>();
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        disabled={[{ dayOfWeek: [0, 6] }, { before: new Date(2026, 7, 11) }]}
        defaultMonth={new Date(2026, 7, 1)}
      />
    );
  },
};

export const LightDark: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <ThemeSplit>
      <Calendar
        mode="single"
        selected={new Date(2026, 7, 11)}
        defaultMonth={new Date(2026, 7, 1)}
      />
    </ThemeSplit>
  ),
};
