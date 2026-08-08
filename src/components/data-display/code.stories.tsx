import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeSplit } from "../../foundations/theme-split";
import { Code, CodeBlock } from "./code";

const meta = {
  title: "Components/Data display/Code",
  component: CodeBlock,
  subcomponents: { Code },
  tags: ["autodocs", "status:new"],
  parameters: { layout: "padded" },
  argTypes: {
    children: { control: "text", description: "The code. A plain string, never parsed." },
    filename: { control: "text" },
    copyable: { control: "boolean" },
  },
  args: {
    children: '@import "tailwindcss";\n@import "@martinzachariassen/design/styles/index.css";',
    filename: "app.css",
    copyable: true,
  },
} satisfies Meta<typeof CodeBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Header, filename and copy button. Try Copy — it confirms for two seconds, then resets. */
export const Playground: Story = {};

/** Inline code sits in running text. For a key the reader should *press*, use `Kbd` instead. */
export const Inline: Story = {
  render: () => (
    <p className="max-w-prose text-sm leading-relaxed">
      Override the semantic layer, never the primitives: set <Code>--accent</Code> in your own
      stylesheet and every component follows. The raw brand values live under <Code>--mlz-*</Code>{" "}
      and are not part of the contract.
    </p>
  ),
};

/** With no filename and no copy button, the header bar disappears entirely. */
export const Bare: Story = {
  args: { filename: undefined, copyable: false, children: "bun add @martinzachariassen/design" },
};

/**
 * Wrapping is off and the block scrolls: a mid-token line break in a shell command is
 * worse than a scrollbar.
 */
export const Overflowing: Story = {
  args: {
    filename: "terminal",
    children:
      'bunx concurrently -k -s first -n "SB,A11Y" -c "magenta,blue" "bunx http-server storybook-static --port 6006 --silent" "bunx wait-on tcp:127.0.0.1:6006 && bun run test-storybook"',
  },
};

/**
 * **Deliberately unhighlighted.** A grammar bundle plus a colour scheme reconciled
 * against two themes and five accents is a lot of weight for decoration — one mono
 * voice suits the engineering-notebook feel.
 */
export const LightDark: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <ThemeSplit>
      <div className="w-full max-w-sm">
        <CodeBlock filename="app.css" copyable>
          {'@import "tailwindcss";'}
        </CodeBlock>
      </div>
    </ThemeSplit>
  ),
};
