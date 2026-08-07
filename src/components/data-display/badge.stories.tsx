import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeSplit } from "../../foundations/theme-split";
import { Badge } from "./badge";

const meta = {
  title: "Components/Data display/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      description:
        "Chip colour. `default` is the ink chip; `outline` and `muted` recede into a dense row; `destructive` is reserved for real failures.",
      control: "select",
      options: ["default", "accent", "outline", "muted", "destructive"],
    },
    children: { description: "The label. Keep it to a word or two.", control: "text" },
  },
  args: { children: "v0.1.0", variant: "default" },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A version chip — the everyday use. */
export const Playground: Story = {};

/** All five chips. They carry no semantics of their own, so the word has to say what the colour implies. */
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge variant="default">Default</Badge>
      <Badge variant="accent">Accent</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="muted">Muted</Badge>
      <Badge variant="destructive">Destructive</Badge>
    </div>
  ),
};

/** Each variant is a token pair (`bg-*` + its `-foreground`), so contrast survives the theme flip. */
export const LightDark: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <ThemeSplit>
      <div className="flex flex-wrap items-center gap-3">
        <Badge variant="default">Default</Badge>
        <Badge variant="accent">Accent</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="muted">Muted</Badge>
        <Badge variant="destructive">Destructive</Badge>
      </div>
    </ThemeSplit>
  ),
};
