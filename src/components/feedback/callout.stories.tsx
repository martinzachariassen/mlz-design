import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeSplit } from "../../foundations/theme-split";
import { Callout } from "./callout";

const meta = {
  title: "Components/Feedback/Callout",
  component: Callout,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: {
    variant: "warning",
    title: "VPN likely",
    description: "The connection exits through a hosting provider's ASN.",
  },
} satisfies Meta<typeof Callout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

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
