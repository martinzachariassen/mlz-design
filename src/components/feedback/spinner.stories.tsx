import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeSplit } from "../../foundations/theme-split";
import { Spinner } from "./spinner";

const meta = {
  title: "Components/Feedback/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    size: {
      description: "Diameter and ring thickness.",
      control: "select",
      options: ["sm", "default", "lg"],
    },
    label: {
      description: 'Accessible name announced by screen readers. Defaults to "Loading".',
      control: "text",
    },
  },
  args: { size: "default" },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The default ring, in the accent colour. */
export const Playground: Story = {};

/** Three sizes; the border scales with them so the ring never looks thin at `lg`. */
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <Spinner size="sm" />
      <Spinner size="default" />
      <Spinner size="lg" />
    </div>
  ),
};

/** Paired with a mono label — `sm` sits on the baseline of small text without pushing the line height. */
export const Inline: Story = {
  render: () => (
    <p className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
      <Spinner size="sm" />
      Building package
    </p>
  ),
};

/** The ring inherits `currentColor`, so it re-reads the accent token in both themes. */
export const LightDark: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <ThemeSplit>
      <Spinner size="sm" />
      <Spinner size="default" />
      <Spinner size="lg" />
    </ThemeSplit>
  ),
};
