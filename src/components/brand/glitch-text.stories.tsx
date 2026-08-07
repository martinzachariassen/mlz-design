import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeSplit } from "../../foundations/theme-split";
import { GlitchText } from "./glitch-text";

const meta = {
  title: "Brand/GlitchText",
  component: GlitchText,
  tags: ["autodocs"],
  argTypes: {
    text: { description: "The string to render and glitch.", control: "text" },
    trigger: {
      description:
        "`ambient` bursts on a self-scheduling loop; `hover` fires one burst per pointer entry.",
      control: "inline-radio",
      options: ["ambient", "hover"],
    },
    interval: { description: "Ambient burst cadence as `[minMs, maxMs]`.", control: "object" },
  },
  args: { text: "MARTIN ZACHARIASSEN", trigger: "ambient" },
  render: (args) => (
    <GlitchText {...args} className="font-mono text-3xl uppercase tracking-[0.18em]" />
  ),
} satisfies Meta<typeof GlitchText>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The resting state: 1–4 characters flicker at random intervals, pausing whenever the tab is hidden. */
export const Ambient: Story = {};

/** One burst per pointer entry — the restrained option for text that has to stay readable. */
export const OnHover: Story = {
  args: { trigger: "hover", text: "HOVER ME" },
};

/** In place: the effect carries no type styling of its own, so the wrapper's `className` decides the family and size. */
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

/** The RGB split uses the `--glitch-1` / `--glitch-2` tokens, which are tuned separately per theme. */
export const LightDark: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <ThemeSplit>
      <GlitchText
        text="HOVER ME"
        trigger="hover"
        className="font-mono text-3xl uppercase tracking-[0.18em]"
      />
    </ThemeSplit>
  ),
};
