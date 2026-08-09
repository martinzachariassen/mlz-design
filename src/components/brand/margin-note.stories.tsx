import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeSplit } from "../../foundations/theme-split";
import { MarginNote } from "./margin-note";

const meta = {
  title: "Components/Brand/MarginNote",
  component: MarginNote,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    arrow: {
      description: "Which way the sketched arrow points, if at all.",
      control: "select",
      options: ["none", "up-left", "up-right", "down-left", "down-right"],
    },
    children: { description: "The aside itself. One sentence.", control: "text" },
  },
} satisfies Meta<typeof MarginNote>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The pencil remark next to a printout — one sentence, in the hand. */
export const Playground: Story = {
  args: {
    arrow: "up-left",
    children: "this is the address every site you visit sees",
  },
};

/** Four directions, one stroke: the arrow is authored once and mirrored. */
export const Arrows: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-12">
      <MarginNote arrow="up-left">points up and to the left</MarginNote>
      <MarginNote arrow="up-right">points up and to the right</MarginNote>
      <MarginNote arrow="down-left">points down and to the left</MarginNote>
      <MarginNote arrow="down-right">points down and to the right</MarginNote>
    </div>
  ),
};

/** Without an arrow it's just the aside, for when position already says what it's about. */
export const NoArrow: Story = {
  args: { arrow: "none", children: "no logs, no cookies, nothing kept" },
};

/** In place: the note earns its name by sitting beside the thing it annotates. */
export const InContext: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="grid max-w-3xl grid-cols-[minmax(0,1fr)_210px] items-start gap-7">
      <div>
        <p className="m-0 font-mono text-[10px] text-muted-foreground uppercase tracking-[0.18em]">
          Your public IP address
        </p>
        <p className="m-0 font-bold font-mono text-5xl tracking-tight">203.0.113.7</p>
      </div>
      <MarginNote arrow="up-left">
        this is the address every site you visit sees — including the ones you never asked to be
        seen by
      </MarginNote>
    </div>
  ),
};

/** The hand sits on `muted-foreground-2` in both themes — present, never loud. */
export const LightDark: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <ThemeSplit>
      <MarginNote arrow="up-left">this is the address every site you visit sees</MarginNote>
    </ThemeSplit>
  ),
};
