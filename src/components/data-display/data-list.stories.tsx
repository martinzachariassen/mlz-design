import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeSplit } from "../../foundations/theme-split";
import { DataList, DataRow } from "./data-list";

const meta = {
  title: "Components/Data Display/DataList",
  component: DataList,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof DataList>;

export default meta;
type Story = StoryObj<typeof meta>;

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
