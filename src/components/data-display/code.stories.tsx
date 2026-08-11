import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeSplit } from "../../foundations/theme-split";
import { Code } from "./code";

const meta = {
  title: "Components/Data display/Code",
  component: Code,
  tags: ["autodocs", "status:new"],
  parameters: { layout: "centered" },
  argTypes: {
    children: { control: "text", description: "The identifier, filename or value." },
  },
  args: { children: "--accent" },
} satisfies Meta<typeof Code>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Inline code on its own. For a key the reader should *press*, use `Kbd` instead. */
export const Playground: Story = {};

/** Where it earns its keep: identifiers and values inside running text. */
export const InRunningText: Story = {
  render: () => (
    <p className="max-w-prose text-sm leading-relaxed">
      Override the semantic layer, never the primitives: set <Code>--accent</Code> in your own
      stylesheet and every component follows. The raw brand values live under <Code>--mlz-*</Code>{" "}
      and are not part of the contract.
    </p>
  ),
};

export const LightDark: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <ThemeSplit>
      <p className="text-sm leading-relaxed">
        Set <Code>--accent</Code> and every component follows.
      </p>
    </ThemeSplit>
  ),
};
