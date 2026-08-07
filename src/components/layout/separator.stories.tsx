import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeSplit } from "../../foundations/theme-split";
import { Separator } from "./separator";

const meta = {
  title: "Components/Layout/Separator",
  component: Separator,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    orientation: {
      description:
        "Horizontal fills its container's width; vertical fills its height (give the parent one).",
      control: "inline-radio",
      options: ["horizontal", "vertical"],
    },
    decorative: {
      description:
        "`true` (default) hides the rule from assistive tech. Set `false` when the rule genuinely divides content into sections.",
      control: "boolean",
    },
    label: {
      description: "Optional mono label that splits a horizontal rule down the middle.",
      control: "text",
    },
  },
  args: { orientation: "horizontal", decorative: true },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A hairline rule between two blocks. */
export const Horizontal: Story = {
  render: (args) => (
    <div className="w-80 font-mono text-sm text-muted-foreground">
      <p>Primitives</p>
      <Separator {...args} className="my-4" />
      <p>Semantic tokens</p>
    </div>
  ),
};

/** Vertical rules between inline items. They fill their parent's height, so give the row one — here `h-6`. */
export const Vertical: Story = {
  render: () => (
    <div className="flex h-6 items-center gap-4 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
      <span>Docs</span>
      <Separator orientation="vertical" />
      <span>Source</span>
      <Separator orientation="vertical" />
      <span>Tokens</span>
    </div>
  ),
};

/** A labelled rule — the "or" divider between two paths. Only horizontal rules take a label. */
export const WithLabel: Story = {
  args: { label: "or" },
  render: (args) => (
    <div className="w-80">
      <Separator {...args} />
    </div>
  ),
};

/** The rule is `--border` in both themes, never a fixed grey. */
export const LightDark: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <ThemeSplit>
      <div className="w-64 font-mono text-sm text-muted-foreground">
        <p>Primitives</p>
        <Separator className="my-4" />
        <p>Semantic tokens</p>
        <Separator label="or" className="my-4" />
        <p>Tailwind utilities</p>
      </div>
    </ThemeSplit>
  ),
};
