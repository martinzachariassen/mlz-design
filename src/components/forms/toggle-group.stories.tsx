import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeSplit } from "../../foundations/theme-split";
import { ToggleGroup, ToggleGroupItem } from "./toggle-group";

const meta = {
  title: "Components/Forms/ToggleGroup",
  component: ToggleGroup,
  subcomponents: { ToggleGroupItem },
  tags: ["autodocs", "status:new"],
  parameters: { layout: "centered" },
  // Every story renders its own items, so `args` are never read — but naming
  // `component` makes Storybook infer them as required. Supply the minimum and
  // keep the unused row out of the controls table.
  args: { type: "single", children: null },
  argTypes: {
    type: {
      control: "inline-radio",
      options: ["single", "multiple"],
      description: "`single` is a segmented control; `multiple` is a filter bar.",
    },
    children: { table: { disable: true } },
  },
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/** `type="single"` is a segmented control — exactly one on. The group is one tab stop; arrows move within it. */
export const Single: Story = {
  render: () => (
    <ToggleGroup type="single" defaultValue="grid" variant="outline" aria-label="Layout">
      <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
      <ToggleGroupItem value="list">List</ToggleGroupItem>
      <ToggleGroupItem value="table">Table</ToggleGroupItem>
    </ToggleGroup>
  ),
};

/** `type="multiple"` lets several be on at once — a filter bar rather than a switch. */
export const Multiple: Story = {
  render: () => (
    <ToggleGroup type="multiple" defaultValue={["draft"]} variant="outline" aria-label="Filters">
      <ToggleGroupItem value="draft">Draft</ToggleGroupItem>
      <ToggleGroupItem value="archived">Archived</ToggleGroupItem>
      <ToggleGroupItem value="mine">Mine</ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const LightDark: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <ThemeSplit>
      <ToggleGroup type="single" defaultValue="grid" variant="outline" aria-label="Layout">
        <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
        <ToggleGroupItem value="list">List</ToggleGroupItem>
      </ToggleGroup>
    </ThemeSplit>
  ),
};
