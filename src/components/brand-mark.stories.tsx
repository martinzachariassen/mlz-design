import type { Meta, StoryObj } from "@storybook/react-vite";
import { BrandLockup, BrandMark } from "./brand-mark";

const meta = {
  title: "Components/Brand Mark",
  component: BrandMark,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    variant: { control: "inline-radio", options: ["tile", "glyph"] },
    size: { control: { type: "range", min: 16, max: 160, step: 4 } },
    caret: { control: "boolean" },
  },
} satisfies Meta<typeof BrandMark>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: { variant: "tile", size: 96, caret: true },
};

export const Lockup: StoryObj<typeof BrandLockup> = {
  render: () => (
    <div className="flex flex-col gap-6">
      <BrandLockup />
      <BrandLockup tagline="mlz.no" size={32} />
      <BrandLockup tagline="" size={56} />
    </div>
  ),
};
