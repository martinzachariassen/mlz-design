import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeSplit } from "../../foundations/theme-split";
import { Text } from "./text";

const meta = {
  title: "Components/Data Display/Text",
  component: Text,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: { variant: "body", children: "The quick brown fox." },
};

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
