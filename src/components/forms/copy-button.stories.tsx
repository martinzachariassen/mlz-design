import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeSplit } from "../../foundations/theme-split";
import { CopyButton } from "./copy-button";

const meta = {
  title: "Components/Forms/CopyButton",
  component: CopyButton,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    value: { description: "The text handed to the clipboard.", control: "text" },
    label: { description: "Resting label.", control: "text" },
    copiedLabel: { description: "Label shown after a successful copy.", control: "text" },
    resetMs: { description: "How long the confirmation stays up.", control: "number" },
    variant: {
      control: "select",
      options: ["default", "solid", "accent", "ghost", "sketch", "destructive", "link"],
    },
    size: { control: "select", options: ["sm", "default", "lg"] },
  },
  args: { value: "203.0.113.7", label: "Copy IP" },
} satisfies Meta<typeof CopyButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click it. The label swaps to a check plus "Copied" and comes back on its own. */
export const Playground: Story = {};

/** It's a `Button` underneath, so every variant and size is available. */
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <CopyButton value="203.0.113.7" label="Copy IP" />
      <CopyButton value="203.0.113.7" label="Copy IP" variant="solid" />
      <CopyButton value="203.0.113.7" label="Copy IP" variant="accent" />
      <CopyButton value="203.0.113.7" label="Copy IP" variant="ghost" size="sm" />
    </div>
  ),
};

/** `copiedLabel` carries the verb of whatever the copy was for. */
export const CustomLabels: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <CopyButton value="{}" label="Copy report" copiedLabel="Report copied" />
      <CopyButton value="https://example.test/#r=…" label="Share" copiedLabel="Link copied" />
    </div>
  ),
};

/** The confirmation check takes the `-deep` rung, so it reads on both papers. */
export const LightDark: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <ThemeSplit>
      <CopyButton value="203.0.113.7" label="Copy IP" />
    </ThemeSplit>
  ),
};
