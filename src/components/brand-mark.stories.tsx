import type { Meta, StoryObj } from "@storybook/react-vite";
import { BrandLockup, BrandMark, BrandWordmark } from "./brand-mark";

const meta = {
  title: "Components/Brand Mark",
  component: BrandMark,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    variant: { control: "inline-radio", options: ["tile", "glyph"] },
    size: { control: { type: "range", min: 16, max: 160, step: 4 } },
  },
} satisfies Meta<typeof BrandMark>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: { variant: "tile", size: 96 },
};

export const Wordmark: StoryObj<typeof BrandWordmark> = {
  render: () => (
    <div className="flex flex-col items-start gap-6">
      <BrandWordmark size={48} />
      <BrandWordmark size={28} />
      <span className="rounded-[var(--radius-sm)] bg-foreground px-3 py-2">
        <BrandWordmark size={28} className="text-background" />
      </span>
    </div>
  ),
};

export const Lockup: StoryObj<typeof BrandLockup> = {
  render: () => (
    <div className="flex flex-col gap-6">
      <BrandLockup size={44} />
      <BrandLockup size={44} tagline="Martin Zachariassen" />
      <BrandLockup orientation="stacked" size={52} />
    </div>
  ),
};
