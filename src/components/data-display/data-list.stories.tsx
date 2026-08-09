import type { Meta, StoryObj } from "@storybook/react-vite";
import type * as React from "react";
import { ThemeSplit } from "../../foundations/theme-split";
import { DataList, DataRow } from "./data-list";

const meta = {
  title: "Components/Data display/DataList",
  component: DataList,
  subcomponents: { DataRow },
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    layout: {
      description:
        "Cascaded to every `DataRow`. `justify` right-aligns short values against a dashed rule; `grid` gives each row a fixed eyebrow-label column; `ledger` is `grid` plus the ruled margin.",
      control: "inline-radio",
      options: ["justify", "grid", "ledger"],
    },
  },
} satisfies Meta<typeof DataList>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The default `justify` layout — term left, value right, one dashed rule per row. Best when values are short. */
export const Playground: Story = {
  render: () => (
    <DataList className="w-80">
      <DataRow label="Location">Oslo, Norway</DataRow>
      <DataRow label="Network">Telenor Norge AS</DataRow>
      <DataRow label="IP" mono>
        203.0.113.7
      </DataRow>
      <DataRow label="ASN" mono>
        AS2119
      </DataRow>
      <DataRow label="Reverse DNS" mono>
        no-ptr.example.net
      </DataRow>
    </DataList>
  ),
};

/**
 * `layout="grid"` swaps the justified rows for a fixed eyebrow-label column plus
 * a left-aligned value — a scannable field list for longer values (user agents,
 * headers, hashes). The label column width is the `--mlz-data-label` CSS var
 * (default `8rem`) and the whole thing collapses to one column below 560px.
 */
export const Grid: Story = {
  render: () => (
    <DataList layout="grid" className="w-96">
      <DataRow label="Location">Oslo, Norway</DataRow>
      <DataRow label="Network">Telenor Norge AS</DataRow>
      <DataRow label="IP" mono>
        203.0.113.7
      </DataRow>
      <DataRow label="User agent" mono>
        Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36
      </DataRow>
    </DataList>
  ),
};

/**
 * The label column can be widened per-list via the `--mlz-data-label` CSS var,
 * and a single row can opt out of the inherited layout with its own `layout`.
 */
export const GridWideLabels: Story = {
  render: () => (
    <DataList
      layout="grid"
      className="w-96"
      style={{ "--mlz-data-label": "11rem" } as React.CSSProperties}
    >
      <DataRow label="Route origin ASN" mono>
        AS2119
      </DataRow>
      <DataRow label="Reverse DNS" mono>
        no-ptr.example.net
      </DataRow>
    </DataList>
  ),
};

/**
 * `layout="ledger"` keeps the grid's columns and adds the rules: one down the
 * left edge of the list, one between label and value, and lighter hairlines
 * between rows. It's how several lists can sit straight on the page without
 * being boxed — the rules do the work the card borders would have done. Pair it
 * with `SectionHeading`, whose own rule closes the top of the block.
 */
export const Ledger: Story = {
  render: () => (
    <DataList layout="ledger" className="w-96">
      <DataRow label="IPv4 exit" mono>
        203.0.113.7
      </DataRow>
      <DataRow label="IPv6 exit">not detected — IPv4-only or blocked</DataRow>
      <DataRow label="Operator">Telenor Norge AS</DataRow>
      <DataRow label="ASN" mono>
        AS2119
      </DataRow>
      <DataRow label="Type">consumer line</DataRow>
    </DataList>
  ),
};

/** Rules and muted terms in both themes. */
export const LightDark: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <ThemeSplit>
      <DataList className="w-80">
        <DataRow label="Location">Oslo, Norway</DataRow>
        <DataRow label="IP" mono>
          203.0.113.7
        </DataRow>
        <DataRow label="ASN" mono>
          AS2119
        </DataRow>
      </DataList>
    </ThemeSplit>
  ),
};
