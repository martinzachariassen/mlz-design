import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeSplit } from "../../foundations/theme-split";
import { Text } from "./text";

const meta = {
  title: "Components/Data display/Text",
  component: Text,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    variant: {
      description:
        "The type role. `body` for everyday copy, `lead` for a muted intro, `mono` for values, `eyebrow` for the tracked-out label above a section.",
      control: "select",
      options: ["body", "lead", "muted", "mono", "eyebrow"],
    },
    size: {
      description: "Overrides just the font-size, leaving the rest of the variant intact.",
      control: "select",
      options: [undefined, "xs", "sm", "base", "lg"],
    },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

/** One span, one variant. Switch `variant` in the controls to hear each voice. */
export const Playground: Story = {
  args: { variant: "body", children: "The quick brown fox." },
};

/** All five roles together. Note the `as` prop on the block-level ones — a lead is a paragraph, not a span. */
export const Variants: Story = {
  render: () => (
    <div className="flex max-w-sm flex-col gap-3">
      <Text variant="eyebrow" as="div">
        Connection details
      </Text>
      <Text variant="body" as="p">
        Body copy — the everyday text role for values and prose fragments.
      </Text>
      <Text variant="lead" as="p">
        Lead — a muted intro that sits above a denser block of detail.
      </Text>
      <Text variant="mono">203.0.113.7</Text>
      <Text variant="muted">Muted aside text.</Text>
    </div>
  ),
};

/** Foreground and muted-foreground pairs across both themes. */
export const LightDark: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <ThemeSplit>
      <div className="flex flex-col gap-3">
        <Text variant="eyebrow" as="div">
          Eyebrow
        </Text>
        <Text variant="mono">203.0.113.7</Text>
        <Text variant="lead" as="p">
          A muted lead paragraph.
        </Text>
      </div>
    </ThemeSplit>
  ),
};
