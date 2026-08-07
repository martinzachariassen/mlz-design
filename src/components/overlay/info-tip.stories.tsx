import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeSplit } from "../../foundations/theme-split";
import { Text } from "../data-display/text";
import { InfoTip } from "./info-tip";

const meta = {
  title: "Components/Overlay/InfoTip",
  component: InfoTip,
  parameters: { layout: "centered" },
  args: {
    label: "What is an ASN?",
    title: "ASN — Autonomous System Number",
    children:
      "The network — usually an ISP or hosting provider — that announces your IP address to the rest of the internet.",
  },
} satisfies Meta<typeof InfoTip>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A bare trigger, click to open the popover. */
export const Default: Story = {};

/** The trigger sizes itself in `em`, so it tracks the text it sits inside. */
export const Inline: Story = {
  render: (args) => (
    <p className="max-w-sm text-base leading-relaxed text-foreground">
      Your connection resolves to an ASN <InfoTip {...args} /> in Oslo, Norway — which most sites
      can look up the moment you load a page.
    </p>
  ),
};

/** Without a `title`, the body carries the whole explanation and `label` names it for AT. */
export const NoTitle: Story = {
  args: {
    title: undefined,
    label: "About reverse DNS",
    children: "The hostname your IP maps back to — often revealing your ISP or region.",
  },
  render: (args) => (
    <span className="text-sm text-foreground">
      Reverse DNS <InfoTip {...args} />
    </span>
  ),
};

/** The `circle-help` glyph reads more like a classic "help" affordance. */
export const HelpIcon: Story = {
  args: { icon: "circle-help" },
  render: (args) => (
    <span className="text-sm text-foreground">
      Entropy <InfoTip {...args} />
    </span>
  ),
};

export const LightDark: Story = {
  parameters: { layout: "fullscreen" },
  render: (args) => (
    <ThemeSplit>
      <Text as="span">
        Reverse DNS <InfoTip {...args} />
      </Text>
    </ThemeSplit>
  ),
};
