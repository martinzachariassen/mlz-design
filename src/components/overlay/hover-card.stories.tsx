import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeSplit } from "../../foundations/theme-split";
import { Avatar, AvatarFallback } from "../data-display/avatar";
import { Badge } from "../data-display/badge";
import { Link } from "../data-display/link";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card";

const meta = {
  title: "Components/Overlay/HoverCard",
  component: HoverCard,
  subcomponents: { HoverCardTrigger, HoverCardContent },
  tags: ["autodocs", "status:new"],
  parameters: { layout: "centered" },
  args: { children: null },
  argTypes: {
    children: { table: { disable: true } },
    openDelay: { control: "number" },
    closeDelay: { control: "number" },
  },
} satisfies Meta<typeof HoverCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Hover the mention and wait — the 700ms delay is deliberate. Focus opens it too. */
export const Playground: Story = {
  render: (args) => (
    <p className="max-w-sm text-sm leading-relaxed">
      Merged by{" "}
      <HoverCard {...args}>
        <HoverCardTrigger asChild>
          <Link href="#">@martin</Link>
        </HoverCardTrigger>
        <HoverCardContent>
          <div className="flex gap-3">
            <Avatar>
              <AvatarFallback tone="accent">MZ</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.1em]">
                Martin Zachariassen
              </p>
              <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
                Builds design systems and the tools around them.
              </p>
              <p className="mt-2 font-mono text-[11px] text-muted-foreground">Joined 2019 · Oslo</p>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>{" "}
      about an hour ago.
    </p>
  ),
};

/**
 * **The rule that matters.** A hover card opens on hover and focus, never on click
 * or touch — so nothing inside it may be the only route to that information. Here
 * the trigger is a real link to the same profile, which is what makes the card safe
 * to add.
 */
export const AlwaysAnEnhancement: Story = {
  render: () => (
    <div className="flex max-w-sm flex-col gap-4 text-sm">
      <p>
        <HoverCard>
          <HoverCardTrigger asChild>
            <Link href="/projects/aurora">aurora</Link>
          </HoverCardTrigger>
          <HoverCardContent>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.1em]">aurora</p>
            <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
              The northern-lights forecast app. React, Tailwind, Cloudflare.
            </p>
            <div className="mt-3 flex gap-1.5">
              <Badge variant="muted">React</Badge>
              <Badge variant="muted">Workers</Badge>
            </div>
          </HoverCardContent>
        </HoverCard>{" "}
        went out this morning.
      </p>
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
        On a phone there is no hover — the link still gets you there.
      </p>
    </div>
  ),
};

/**
 * Delays are tunable, but shortening the open delay is usually a mistake: cards
 * flash open as the pointer crosses a paragraph of links.
 */
export const Immediate: Story = {
  render: () => (
    <p className="text-sm">
      <HoverCard openDelay={0} closeDelay={0}>
        <HoverCardTrigger asChild>
          <Link href="#">No delay</Link>
        </HoverCardTrigger>
        <HoverCardContent className="w-56">
          <p className="text-[13px] text-muted-foreground">
            Opens instantly. Notice how twitchy it feels.
          </p>
        </HoverCardContent>
      </HoverCard>
    </p>
  ),
};

/** Open in both themes, so the card surface is visible rather than just the trigger. */
export const LightDark: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <ThemeSplit>
      <HoverCard open>
        <HoverCardTrigger asChild>
          <Link href="#">@martin</Link>
        </HoverCardTrigger>
        <HoverCardContent className="w-56">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.1em]">
            Martin Zachariassen
          </p>
          <p className="mt-1 text-[13px] text-muted-foreground">Oslo</p>
        </HoverCardContent>
      </HoverCard>
    </ThemeSplit>
  ),
};
