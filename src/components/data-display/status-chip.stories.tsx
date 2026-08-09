import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeSplit } from "../../foundations/theme-split";
import { Badge } from "./badge";
import { StatusChip } from "./status-chip";

const meta = {
  title: "Components/Data display/StatusChip",
  component: StatusChip,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    variant: {
      description: "Which semantic role the wash and the dot carry.",
      control: "select",
      options: ["success", "warning", "destructive", "info", "accent", "muted"],
    },
    dot: { description: "Show the leading status dot.", control: "boolean" },
    pulse: { description: "Pulse the dot, for a reading being taken now.", control: "boolean" },
    children: { description: "The finding, in sentence case.", control: "text" },
  },
} satisfies Meta<typeof StatusChip>;

export default meta;
type Story = StoryObj<typeof meta>;

const VARIANTS = ["success", "warning", "destructive", "info", "accent", "muted"] as const;

/** One finding, said plainly. The wash tints the same role the dot carries. */
export const Playground: Story = {
  args: { variant: "success", children: "No proxy or VPN detected" },
};

/** Every role. The text carries the meaning; the colour only agrees with it. */
export const Variants: Story = {
  render: () => (
    <div className="flex max-w-xl flex-wrap gap-2">
      <StatusChip variant="success">No proxy or VPN detected</StatusChip>
      <StatusChip variant="warning">Timezone differs from your IP</StatusChip>
      <StatusChip variant="destructive">WebRTC is leaking your address</StatusChip>
      <StatusChip variant="info">HTTP/3 · TLS 1.3</StatusChip>
      <StatusChip variant="accent">IPv6 is working</StatusChip>
      <StatusChip variant="muted">Not applicable</StatusChip>
    </div>
  ),
};

/** `pulse` marks a reading still being taken; `dot={false}` makes it a plain pill. */
export const States: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <StatusChip variant="accent" pulse>
        Measuring…
      </StatusChip>
      <StatusChip variant="info" dot={false}>
        HTTP/3 · TLS 1.3
      </StatusChip>
    </div>
  ),
};

/**
 * The distinction worth internalising: a `Badge` labels *what something is* and
 * is tracked-out uppercase mono; a `StatusChip` reports *how something is right
 * now* and reads as a short sentence.
 */
export const AgainstBadge: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Badge variant="outline">v0.6.0</Badge>
      <StatusChip variant="success">Build passing</StatusChip>
    </div>
  ),
};

/** The washes are mixed against the page, so they hold their weight on both papers. */
export const LightDark: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <ThemeSplit>
      <div className="flex max-w-sm flex-wrap gap-2">
        {VARIANTS.map((v) => (
          <StatusChip key={v} variant={v}>
            {v}
          </StatusChip>
        ))}
      </div>
    </ThemeSplit>
  ),
};
