import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeSplit } from "../../foundations/theme-split";
import { Progress } from "./progress";

const meta = {
  title: "Components/Feedback/Progress",
  component: Progress,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    value: {
      description: "Completion percentage. Values outside 0–100 are clamped.",
      control: { type: "range", min: 0, max: 100, step: 1 },
    },
    variant: {
      description: "Fill colour — `default` is ink, `accent` the active accent family.",
      control: "select",
      options: ["default", "accent"],
    },
  },
  args: { value: 60, variant: "default" },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Drag `value` and watch the fill ease to its new width over 500ms. */
export const Playground: Story = {
  render: (args) => (
    <div className="w-72">
      <Progress {...args} />
    </div>
  ),
};

/** The two fills at the same value. Reach for `accent` when the bar is the thing the page is about. */
export const Variants: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-4">
      <Progress value={40} variant="default" />
      <Progress value={40} variant="accent" />
    </div>
  ),
};

/** The recommended pairing: a mono eyebrow and a percentage above the bar. Give the bar an `aria-label` too, or point `aria-labelledby` at that text. */
export const Labelled: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-2">
      <div className="flex items-baseline justify-between font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">
        <span>Deploying</span>
        <span>72%</span>
      </div>
      <Progress value={72} variant="accent" />
    </div>
  ),
};

/** 0 through 100 — the empty and full ends both keep the track's rounded cap. */
export const Steps: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-4">
      {[0, 25, 50, 75, 100].map((value) => (
        <Progress key={value} value={value} />
      ))}
    </div>
  ),
};

/** Track and fill in both themes. */
export const LightDark: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <ThemeSplit>
      <div className="flex w-72 flex-col gap-4">
        <Progress value={60} variant="default" />
        <Progress value={40} variant="accent" />
      </div>
    </ThemeSplit>
  ),
};
