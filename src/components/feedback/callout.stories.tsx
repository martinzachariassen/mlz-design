import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeSplit } from "../../foundations/theme-split";
import { Callout } from "./callout";

const meta = {
  title: "Components/Feedback/Callout",
  component: Callout,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    variant: {
      description: "Severity — it colours the leading `StatusDot`, nothing else.",
      control: "select",
      options: ["success", "warning", "destructive", "info", "accent", "muted"],
    },
    pulse: { description: "Give the leading dot a soft breathing ring.", control: "boolean" },
  },
  args: {
    variant: "warning",
    title: "VPN likely",
    description: "The connection exits through a hosting provider's ASN.",
  },
} satisfies Meta<typeof Callout>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A single callout — a dot, a bold title, and an optional muted line under it. */
export const Playground: Story = {};

/** What `Callout` is for: a run of checks where an `Alert` panel per row would drown the page. The `description` is optional per row. */
export const Stack: Story = {
  render: () => (
    <div className="flex max-w-md flex-col gap-3">
      <Callout variant="success" title="No DNS leak detected" />
      <Callout
        variant="warning"
        title="VPN likely"
        description="The connection exits through a hosting provider's ASN."
      />
      <Callout
        variant="destructive"
        title="On a blocklist"
        description="This IP appears on 2 DNS blocklists."
      />
      <Callout variant="muted" title="Tor not detected" />
    </div>
  ),
};

/** The dot colours come from the semantic signal tokens, so they hold up on both papers. */
export const LightDark: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <ThemeSplit>
      <div className="flex flex-col gap-3">
        <Callout variant="success" title="No DNS leak detected" />
        <Callout variant="destructive" title="On a blocklist" description="2 hits." />
      </div>
    </ThemeSplit>
  ),
};
