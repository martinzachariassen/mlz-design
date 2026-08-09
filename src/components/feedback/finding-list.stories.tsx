import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeSplit } from "../../foundations/theme-split";
import { FindingItem, FindingList } from "./finding-list";

const meta = {
  title: "Components/Feedback/FindingList",
  component: FindingList,
  subcomponents: { FindingItem },
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    children: { control: false, table: { disable: true } },
  },
  args: { children: null },
} satisfies Meta<typeof FindingList>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The result of a scan: each check, how it went, and what that means. */
export const Playground: Story = {
  render: () => (
    <div className="max-w-lg">
      <FindingList>
        <FindingItem variant="warning" title="WebRTC exposes a different public IP">
          A site can read an address that doesn't match the one your requests come from — split
          routing or a proxy.
        </FindingItem>
        <FindingItem variant="success" title="No DNS leak">
          One resolver answered, and it's the one you'd expect.
        </FindingItem>
        <FindingItem variant="success" title="DNSSEC validated">
          Your resolver refused a deliberately broken signature, so forged answers would be
          rejected.
        </FindingItem>
        <FindingItem variant="destructive" title="Fingerprint is very distinctive">
          Roughly 30 bits of entropy — enough to pick this browser out of a billion.
        </FindingItem>
      </FindingList>
    </div>
  ),
};

/** The explanation is optional; a finding that speaks for itself can stand alone. */
export const TitlesOnly: Story = {
  render: () => (
    <div className="max-w-lg">
      <FindingList>
        <FindingItem variant="success" title="No proxy or VPN detected" />
        <FindingItem variant="success" title="Not listed in any reputation database" />
        <FindingItem variant="muted" title="Mobile network — not applicable" />
      </FindingList>
    </div>
  ),
};

/**
 * When the title doesn't say which way the finding went, name the state with
 * `statusLabel` so the dot stops being the only carrier.
 */
export const NamedStates: Story = {
  render: () => (
    <div className="max-w-lg">
      <FindingList>
        <FindingItem variant="warning" statusLabel="Warning" title="Timezone: Europe/Oslo">
          Your browser's timezone doesn't match the one your IP resolves to.
        </FindingItem>
        <FindingItem variant="success" statusLabel="OK" title="Cookies: first-party only" />
      </FindingList>
    </div>
  ),
};

/** The rules lighten between items so the group reads as one block. */
export const LightDark: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <ThemeSplit>
      <FindingList>
        <FindingItem variant="warning" title="WebRTC exposes a different public IP">
          A site can read an address that doesn't match your requests.
        </FindingItem>
        <FindingItem variant="success" title="No DNS leak">
          One resolver answered, and it's the one you'd expect.
        </FindingItem>
      </FindingList>
    </ThemeSplit>
  ),
};
