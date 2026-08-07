import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeSplit } from "../../foundations/theme-split";
import { StatusDot } from "./status-dot";

const meta = {
  title: "Components/Data Display/StatusDot",
  component: StatusDot,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    variant: {
      description: "Which semantic colour the dot carries.",
      control: "select",
      options: ["success", "warning", "destructive", "info", "accent", "muted"],
    },
    pulse: { description: "Add a soft breathing ring to signal a live state.", control: "boolean" },
    label: {
      description:
        'Accessible label. Setting it promotes the dot from decorative to a named `role="img"`.',
      control: "text",
    },
  },
} satisfies Meta<typeof StatusDot>;

export default meta;
type Story = StoryObj<typeof meta>;

const VARIANTS = ["success", "warning", "destructive", "info", "accent", "muted"] as const;

/** One dot. It's `aria-hidden` unless you give it a `label`, so pair it with text. */
export const Playground: Story = {
  args: { variant: "success" },
};

/** Every colour, each next to its name — how a status dot should actually be used. */
export const AllVariants: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      {VARIANTS.map((v) => (
        <span key={v} className="inline-flex items-center gap-2 font-mono text-xs">
          <StatusDot variant={v} />
          {v}
        </span>
      ))}
    </div>
  ),
};

/** `pulse` layers a `animate-ping` copy under the dot in the same colour. It hides itself under `prefers-reduced-motion`. */
export const Pulsing: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <StatusDot variant="success" pulse />
      <StatusDot variant="warning" pulse />
      <StatusDot variant="destructive" pulse />
    </div>
  ),
};

/** The signal tokens keep their identity on both papers. */
export const LightDark: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <ThemeSplit>
      <div className="flex items-center gap-4">
        {VARIANTS.map((v) => (
          <StatusDot key={v} variant={v} />
        ))}
      </div>
    </ThemeSplit>
  ),
};
