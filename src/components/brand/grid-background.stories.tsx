import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeSplit } from "../../foundations/theme-split";
import { GridBackground } from "./grid-background";

const meta = {
  title: "Components/Brand/Grid Background",
  component: GridBackground,
  parameters: { layout: "fullscreen" },
  argTypes: {
    cell: { control: { type: "range", min: 12, max: 60, step: 2 } },
    interactive: { control: "boolean" },
    glow: { control: "boolean" },
    spotlight: { control: { type: "range", min: 160, max: 600, step: 20 } },
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

export const CursorSpotlight: Story = {};

export const Static: Story = {
  args: { interactive: false },
};

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
