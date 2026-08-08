import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeSplit } from "../../foundations/theme-split";
import { Badge } from "../data-display/badge";
import { ScrollArea, ScrollBar } from "./scroll-area";
import { Separator } from "./separator";

const meta = {
  title: "Components/Layout/ScrollArea",
  component: ScrollArea,
  subcomponents: { ScrollBar },
  tags: ["autodocs", "status:new"],
  parameters: { layout: "centered" },
  argTypes: {
    orientation: { control: "inline-radio", options: ["vertical", "horizontal", "both"] },
  },
  args: { orientation: "vertical" },
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

const releases = Array.from({ length: 24 }, (_, i) => ({
  version: `0.${24 - i}.0`,
  note: [
    "Add Field, Popover and EmptyState",
    "Share the modal engine",
    "Pin the toolchain",
    "Refresh the architecture map",
  ][i % 4] as string,
}));

/**
 * Scrolling itself is untouched — wheel, trackpad, touch, keyboard and
 * find-in-page all work natively. Only the bar is restyled.
 */
export const Playground: Story = {
  render: (args) => (
    <ScrollArea
      {...args}
      className="h-64 w-72 rounded-[var(--radius-md)] border border-border"
      viewportClassName="p-4"
    >
      <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
        Releases
      </p>
      {releases.map((release, i) => (
        <div key={release.version}>
          {i > 0 ? <Separator className="my-2.5" /> : null}
          <div className="flex items-baseline justify-between gap-3">
            <span className="font-mono text-[13px]">{release.version}</span>
            <span className="min-w-0 flex-1 truncate text-right text-[13px] text-muted-foreground">
              {release.note}
            </span>
          </div>
        </div>
      ))}
    </ScrollArea>
  ),
};

/** `orientation="horizontal"` for a row that runs off the side — a tag rail, a gallery. */
export const Horizontal: Story = {
  args: { orientation: "horizontal" },
  render: (args) => (
    <ScrollArea
      {...args}
      className="w-80 rounded-[var(--radius-md)] border border-border"
      viewportClassName="p-3"
    >
      <div className="flex gap-2 pb-1">
        {[
          "React",
          "Tailwind v4",
          "OKLCH",
          "Radix",
          "Storybook",
          "Vitest",
          "Biome",
          "Changesets",
          "Cloudflare",
        ].map((tag) => (
          <Badge key={tag} variant="muted" className="shrink-0">
            {tag}
          </Badge>
        ))}
      </div>
    </ScrollArea>
  ),
};

/**
 * **Where not to use it.** Don't wrap the page in one: the browser's own scrollbar
 * carries position and length the OS expects to provide, and taking it over on the
 * document breaks scroll restoration and overscroll behaviour. This is for bounded
 * panels — a list, a sidebar, a command palette — where the bar's absence would
 * leave a reader unaware there is more.
 */
export const WhenToReachForIt: Story = {
  render: () => (
    <div className="flex max-w-md flex-col gap-3 text-sm">
      <p className="text-muted-foreground">
        <span className="text-foreground">Yes:</span> a fixed-height panel inside a page.
      </p>
      <p className="text-muted-foreground">
        <span className="text-foreground">No:</span> the document itself, or anything whose height
        already fits.
      </p>
      <p className="text-muted-foreground">
        <span className="text-foreground">Also no:</span> hiding overflow you could have avoided. A
        scrollbar is not a substitute for a layout that fits.
      </p>
    </div>
  ),
};

export const LightDark: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <ThemeSplit>
      <ScrollArea
        className="h-40 w-48 rounded-[var(--radius-md)] border border-border"
        viewportClassName="p-3"
      >
        {releases.slice(0, 12).map((release) => (
          <p key={release.version} className="py-1 font-mono text-[13px]">
            {release.version}
          </p>
        ))}
      </ScrollArea>
    </ThemeSplit>
  ),
};
