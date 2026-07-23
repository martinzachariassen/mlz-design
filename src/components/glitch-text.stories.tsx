import type { Meta, StoryObj } from "@storybook/react-vite";
import { GlitchText } from "./glitch-text";

const meta = {
  title: "Components/GlitchText",
  component: GlitchText,
  tags: ["autodocs"],
  argTypes: {
    text: { control: "text" },
    trigger: { control: "inline-radio", options: ["ambient", "hover"] },
  },
  args: { text: "MARTIN ZACHARIASSEN", trigger: "ambient" },
  render: (args) => (
    <GlitchText {...args} className="font-mono text-3xl uppercase tracking-[0.18em]" />
  ),
} satisfies Meta<typeof GlitchText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ambient: Story = {};

export const OnHover: Story = {
  args: { trigger: "hover", text: "HOVER ME" },
};

export const InHeadline: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-2">
      <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-muted-foreground">
        Backend systems <span className="text-[var(--accent-deep)]">/</span> APIs
      </span>
      <GlitchText text="mlz" className="font-hand text-6xl" />
    </div>
  ),
};
