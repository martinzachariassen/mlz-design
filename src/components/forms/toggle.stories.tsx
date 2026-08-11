import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeSplit } from "../../foundations/theme-split";
import { Toggle } from "./toggle";

const meta = {
  title: "Components/Forms/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["default", "outline"],
      description: "`outline` carries a border, so a lone toggle still reads as a control.",
    },
    size: { control: "inline-radio", options: ["sm", "default", "icon"] },
    pressed: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: { children: "Archived", variant: "outline", size: "default" },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A single toggle. It reports state through `aria-pressed`, not through a changing label. */
export const Playground: Story = {};

/** Both variants, on and off. `default` stays quiet until pressed; `outline` always reads as a control. */
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Toggle variant="default">Off</Toggle>
      <Toggle variant="default" defaultPressed>
        On
      </Toggle>
      <Toggle variant="outline">Off</Toggle>
      <Toggle variant="outline" defaultPressed>
        On
      </Toggle>
    </div>
  ),
};

/** An icon-only toggle needs an `aria-label` — the glyph is not a name. */
export const IconOnly: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Toggle size="icon" variant="outline" aria-label="Bold" defaultPressed>
        <span className="font-bold">B</span>
      </Toggle>
      <Toggle size="icon" variant="outline" aria-label="Italic">
        <span className="italic">I</span>
      </Toggle>
    </div>
  ),
};

export const LightDark: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <ThemeSplit>
      <div className="flex items-center gap-4">
        <Toggle variant="outline" defaultPressed>
          Archived
        </Toggle>
        <Toggle variant="outline">Archived</Toggle>
      </div>
    </ThemeSplit>
  ),
};
