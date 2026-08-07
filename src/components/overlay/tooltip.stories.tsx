import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeSplit } from "../../foundations/theme-split";
import { Button } from "../forms/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

const meta = {
  title: "Components/Overlay/Tooltip",
  component: Tooltip,
  subcomponents: { TooltipTrigger, TooltipContent },
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    defaultOpen: { control: "boolean", description: "Start open — handy for screenshots." },
    delayDuration: {
      control: { type: "number", min: 0, max: 1500, step: 100 },
      description: "Hover delay in ms before it opens.",
    },
  },
  args: { delayDuration: 300 },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Hover or tab to the button. Everything sits inside one `TooltipProvider`, which shares the timing. */
export const Playground: Story = {
  render: (args) => (
    <TooltipProvider>
      <Tooltip {...args}>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Redeploy">
            ↻
          </Button>
        </TooltipTrigger>
        <TooltipContent>Redeploy</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};

/** `side` is a preference — collision detection still flips it when there's no room. */
export const Sides: Story = {
  render: () => (
    <TooltipProvider delayDuration={0}>
      <div className="flex gap-3">
        {(["top", "right", "bottom", "left"] as const).map((side) => (
          <Tooltip key={side}>
            <TooltipTrigger asChild>
              <Button variant="ghost">{side}</Button>
            </TooltipTrigger>
            <TooltipContent side={side}>Opens {side}</TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  ),
};

/**
 * The trigger has to be focusable, and a disabled `<button>` isn't — so a tooltip
 * on one never opens by keyboard. Wrap it in a focusable span when a disabled
 * control needs an explanation.
 */
export const OnADisabledControl: Story = {
  render: () => (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          {/* biome-ignore lint/a11y/noNoninteractiveTabindex: making the wrapper focusable is the point — a disabled <button> can't be, so this is the only way the tooltip is reachable by keyboard */}
          <span tabIndex={0} className="inline-flex rounded-[var(--radius-sm)]">
            <Button disabled className="pointer-events-none">
              Deploy
            </Button>
          </span>
        </TooltipTrigger>
        <TooltipContent>Connect a repo first</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};

export const LightDark: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <ThemeSplit>
      <TooltipProvider delayDuration={0}>
        <Tooltip defaultOpen={false}>
          <TooltipTrigger asChild>
            <Button variant="ghost">Hover me</Button>
          </TooltipTrigger>
          <TooltipContent>Inverted chrome</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </ThemeSplit>
  ),
};
