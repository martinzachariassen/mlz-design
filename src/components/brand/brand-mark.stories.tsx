import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeSplit } from "../../foundations/theme-split";
import { BrandLockup, BrandMark, BrandWordmark } from "./brand-mark";

const meta = {
  title: "Brand/BrandMark",
  component: BrandMark,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    variant: {
      description:
        "`tile` is the ink-square app icon; `glyph` is the bare letterform in `currentColor`.",
      control: "inline-radio",
      options: ["tile", "glyph"],
    },
    size: {
      description: "Rendered box in px (width = height).",
      control: { type: "range", min: 16, max: 160, step: 4 },
    },
    tile: {
      description: "Tile fill for static exports. Defaults to the theme's ink surface.",
      control: "color",
    },
    glyph: {
      description: "Letter colour for static exports. Defaults to the theme's paper surface.",
      control: "color",
    },
  },
} satisfies Meta<typeof BrandMark>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The mark on its own. Drag `size` — it's pure SVG, so it holds from a 16px favicon to a 1200px OG image. */
export const Playground: Story = {
  args: { variant: "tile", size: 96 },
};

/** `BrandWordmark` at two sizes, then knocked out on an ink plate. The period always carries the accent — it is never omitted. */
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

/** `BrandLockup` pairs the two. Proportions are fixed — mark = 1.45 × wordmark — and the tagline only joins at 40px+ marks. */
export const Lockup: StoryObj<typeof BrandLockup> = {
  render: () => (
    <div className="flex flex-col gap-6">
      <BrandLockup size={44} />
      <BrandLockup size={44} tagline="Martin Zachariassen" />
      <BrandLockup orientation="stacked" size={52} />
    </div>
  ),
};

/** All three read from `--foreground` / `--background`, so the identity inverts with the theme for free. */
export const LightDark: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <ThemeSplit>
      <div className="flex flex-col items-center gap-6">
        <BrandMark variant="tile" size={72} />
        <BrandWordmark size={36} />
        <BrandLockup size={44} tagline="Martin Zachariassen" />
      </div>
    </ThemeSplit>
  ),
};
