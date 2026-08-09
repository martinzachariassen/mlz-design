import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeSplit } from "../../foundations/theme-split";
import { Badge } from "../data-display/badge";
import { DataList, DataRow } from "../data-display/data-list";
import { SectionHeading } from "./section-heading";

const meta = {
  title: "Components/Layout/SectionHeading",
  component: SectionHeading,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    as: { control: false, description: "The heading element — pick the outline level." },
    rule: { control: "boolean", description: "Draw the hairline after the label." },
    actions: { control: false, description: "Pinned after the rule." },
    children: { control: "text", description: "The label." },
  },
  args: { children: "Exit & network" },
} satisfies Meta<typeof SectionHeading>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The label measures the column; the rule carries it to the edge. */
export const Playground: Story = {};

/** Without the rule it's just the eyebrow — for a heading inside a card. */
export const WithoutRule: Story = {
  args: { rule: false },
};

/** `actions` sits past the rule, pinned right. */
export const WithActions: Story = {
  args: { children: "Leak checks", actions: <Badge variant="outline">4</Badge> },
};

/** What it's for: several sections on the bare page, no boxes. */
export const OverASection: Story = {
  render: () => (
    <div className="max-w-md">
      <SectionHeading as="h2" className="mb-3">
        Exit &amp; network
      </SectionHeading>
      <DataList layout="ledger">
        <DataRow label="IPv4 exit" mono>
          203.0.113.7
        </DataRow>
        <DataRow label="Operator">Telenor Norge AS</DataRow>
        <DataRow label="Reverse DNS" mono>
          none
        </DataRow>
      </DataList>
    </div>
  ),
};

/** The rule is `--border`, so it holds its weight on both papers. */
export const LightDark: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <ThemeSplit>
      <SectionHeading as="h2">Where they place you</SectionHeading>
    </ThemeSplit>
  ),
};
