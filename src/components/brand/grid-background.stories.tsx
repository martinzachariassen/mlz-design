import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeSplit } from "../../foundations/theme-split";
import { GridBackground } from "./grid-background";

const meta = {
  title: "Brand/GridBackground",
  tags: ["autodocs"],
  component: GridBackground,
  parameters: { layout: "fullscreen" },
  argTypes: {
    cell: {
      description: "Minor grid cell size in px. The major grid is always 5× this.",
      control: { type: "range", min: 12, max: 60, step: 2 },
    },
    interactive: {
      description:
        "Reveal the grid only through a pointer-following spotlight instead of showing all of it.",
      control: "boolean",
    },
    glow: {
      description: "Pool accent light under the spotlight. Only meaningful with `interactive`.",
      control: "boolean",
    },
    spotlight: {
      description: "Spotlight diameter in px.",
      control: { type: "range", min: 160, max: 600, step: 20 },
    },
  },
  args: { cell: 30, interactive: true, glow: true, spotlight: 340 },
  render: (args) => (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <GridBackground {...args} />
      <div className="relative flex min-h-screen flex-col items-center justify-center gap-3 text-center">
        <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-muted-foreground">
          Move your cursor
        </span>
        <h1 className="font-hand text-6xl text-foreground">Engineering grid</h1>
      </div>
    </div>
  ),
} satisfies Meta<typeof GridBackground>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The signature effect — move the cursor and the grid is revealed through a soft disc, with accent light pooled under it. */
export const CursorSpotlight: Story = {};

/** `interactive={false}` — a faint, always-on grid to sit behind content. This is the version to use in print-like contexts and exports. */
export const Static: Story = {
  args: { interactive: false },
};

/** Both rulings are `color-mix`ed off `--foreground`, so the grid stays a whisper on either paper. */
export const LightDark: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <ThemeSplit>
      <div className="relative h-40 w-full overflow-hidden rounded-[var(--radius-md)] border border-border">
        <GridBackground interactive={false} />
        <div className="relative flex h-full items-center justify-center">
          <span className="font-hand text-2xl text-foreground">Engineering grid</span>
        </div>
      </div>
    </ThemeSplit>
  ),
};
