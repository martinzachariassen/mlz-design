import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeSplit } from "../../foundations/theme-split";
import { Label } from "./label";
import { RadioGroup, RadioGroupItem } from "./radio-group";

const meta = {
  title: "Components/Forms/RadioGroup",
  component: RadioGroup,
  subcomponents: { RadioGroupItem },
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    defaultValue: { control: "text", description: "Uncontrolled initial choice." },
    disabled: { control: "boolean", description: "Disables every option in the group." },
    orientation: {
      control: "inline-radio",
      options: ["vertical", "horizontal"],
      description: "Which arrow keys move between options.",
    },
  },
  args: { defaultValue: "cyan" },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const ACCENTS = [
  ["cyan", "Cyan"],
  ["rust", "Rust"],
  ["green", "Green"],
] as const;

function Choices({ idPrefix }: { idPrefix: string }) {
  return (
    <>
      {ACCENTS.map(([value, label]) => (
        <div key={value} className="flex items-center gap-2.5">
          <RadioGroupItem value={value} id={`${idPrefix}-${value}`} />
          <Label
            htmlFor={`${idPrefix}-${value}`}
            className="cursor-pointer normal-case tracking-normal"
          >
            {label}
          </Label>
        </div>
      ))}
    </>
  );
}

/** Every prop wired to a control. Tab into the group, then use the arrow keys — the whole group is one tab stop. */
export const Playground: Story = {
  render: (args) => (
    <RadioGroup {...args}>
      <Choices idPrefix="play" />
    </RadioGroup>
  ),
};

/** Wrap the group in a `<fieldset>` so the question itself is announced, not just the options. */
export const WithLegend: Story = {
  render: (args) => (
    <fieldset className="border-0 p-0">
      <legend className="mb-3 font-mono text-xs uppercase tracking-[0.1em] text-foreground">
        Accent family
      </legend>
      <RadioGroup {...args}>
        <Choices idPrefix="legend" />
      </RadioGroup>
    </fieldset>
  ),
};

/** `orientation="horizontal"` moves the arrow keys to left/right. Keep the labels short. */
export const Horizontal: Story = {
  args: { orientation: "horizontal" },
  render: (args) => (
    <RadioGroup {...args} className="flex gap-6">
      <Choices idPrefix="horizontal" />
    </RadioGroup>
  ),
};

/** A whole group can be disabled, or one option held back while the rest stay live. */
export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <RadioGroup defaultValue="cyan" disabled>
        <Choices idPrefix="disabled-all" />
      </RadioGroup>
      <RadioGroup defaultValue="cyan">
        <div className="flex items-center gap-2.5">
          <RadioGroupItem value="cyan" id="one-cyan" />
          <Label htmlFor="one-cyan" className="cursor-pointer normal-case tracking-normal">
            Cyan
          </Label>
        </div>
        <div className="flex items-center gap-2.5">
          <RadioGroupItem value="ink" id="one-ink" disabled />
          <Label htmlFor="one-ink" className="normal-case tracking-normal">
            Ink — coming soon
          </Label>
        </div>
      </RadioGroup>
    </div>
  ),
};

export const LightDark: Story = {
  parameters: { layout: "fullscreen" },
  // ThemeSplit renders its children twice, so this pane labels the items with
  // `aria-label` rather than `Label` + `htmlFor` — two copies of the same `id`
  // would be invalid markup and an axe failure.
  render: () => (
    <ThemeSplit>
      <RadioGroup defaultValue="cyan" aria-label="Accent family">
        {ACCENTS.map(([value, label]) => (
          <RadioGroupItem key={value} value={value} aria-label={label} />
        ))}
      </RadioGroup>
    </ThemeSplit>
  ),
};
