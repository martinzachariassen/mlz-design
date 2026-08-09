import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeSplit } from "../../foundations/theme-split";
import { Readout, ReadoutCell } from "./readout";

const meta = {
  title: "Components/Data display/Readout",
  component: Readout,
  subcomponents: { ReadoutCell },
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    children: { control: false, table: { disable: true } },
  },
  args: { children: null },
} satisfies Meta<typeof Readout>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The band a diagnostic page opens with: everything answered in one line. */
export const Playground: Story = {
  render: () => (
    <Readout>
      <ReadoutCell label="Exit" dot="success">
        203.0.113.7
      </ReadoutCell>
      <ReadoutCell label="Location" dot="info">
        Oslo, NO
      </ReadoutCell>
      <ReadoutCell label="VPN / proxy" dot="success">
        none detected
      </ReadoutCell>
      <ReadoutCell label="WebRTC" dot="warning">
        IP exposed
      </ReadoutCell>
      <ReadoutCell label="Fingerprint" dot="destructive">
        ~30 bits
      </ReadoutCell>
    </Readout>
  ),
};

/** The dot is optional — leave it off for a reading that has no state to be in. */
export const WithoutDots: Story = {
  render: () => (
    <Readout>
      <ReadoutCell label="Uptime">99.98%</ReadoutCell>
      <ReadoutCell label="Build">v2.14.0</ReadoutCell>
      <ReadoutCell label="Region">eu-north-1</ReadoutCell>
    </Readout>
  ),
};

/**
 * Values are clipped rather than wrapped: the band is a fixed-height instrument
 * panel, and one long value must not be allowed to set the height of the rest.
 */
export const LongValues: Story = {
  render: () => (
    <Readout>
      <ReadoutCell label="Exit" dot="success">
        2001:0db8:85a3:0000:0000:8a2e:0370:7334
      </ReadoutCell>
      <ReadoutCell label="Network">Telenor Norge AS · AS2119</ReadoutCell>
      <ReadoutCell label="Reverse DNS">cm-84-215-33-11.telecustomer.example.net</ReadoutCell>
    </Readout>
  ),
};

/**
 * Resize below ~720px: the cells keep their single line and scroll with snap
 * points instead of stacking into a six-row block.
 */
export const Narrow: Story = {
  render: () => (
    <div className="max-w-[380px] border border-border border-dashed p-3">
      <Readout>
        <ReadoutCell label="Exit" dot="success">
          203.0.113.7
        </ReadoutCell>
        <ReadoutCell label="Location" dot="info">
          Oslo, NO
        </ReadoutCell>
        <ReadoutCell label="VPN / proxy" dot="success">
          none detected
        </ReadoutCell>
        <ReadoutCell label="WebRTC" dot="warning">
          IP exposed
        </ReadoutCell>
      </Readout>
    </div>
  ),
};

/** The hairlines and the dots both track the theme. */
export const LightDark: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <ThemeSplit>
      <Readout>
        <ReadoutCell label="Exit" dot="success">
          203.0.113.7
        </ReadoutCell>
        <ReadoutCell label="WebRTC" dot="warning">
          IP exposed
        </ReadoutCell>
        <ReadoutCell label="Fingerprint" dot="destructive">
          ~30 bits
        </ReadoutCell>
      </Readout>
    </ThemeSplit>
  ),
};
