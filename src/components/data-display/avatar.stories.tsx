import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeSplit } from "../../foundations/theme-split";
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "./avatar";

const meta = {
  title: "Components/Data display/Avatar",
  component: Avatar,
  subcomponents: { AvatarImage, AvatarFallback, AvatarGroup },
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    size: {
      description: "Frame size. The initials scale with it.",
      control: "select",
      options: ["xs", "sm", "default", "lg", "xl"],
    },
    shape: {
      description: "Circle for people, square for orgs and projects.",
      control: "inline-radio",
      options: ["circle", "square"],
    },
    status: {
      description: "Presence dot on the lower-right edge. Decorative — name the state in text too.",
      control: "select",
      options: [undefined, "online", "away", "busy", "offline"],
    },
  },
  args: { size: "default", shape: "circle" },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Initials only — the resting state of every avatar in the system. */
export const Playground: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarFallback>MZ</AvatarFallback>
    </Avatar>
  ),
};

/** An image drops into the frame; when it fails, the initials take over. */
export const ImageWithFallback: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="/does-not-exist.png" alt="Martin Zachariassen" />
      <AvatarFallback>MZ</AvatarFallback>
    </Avatar>
  ),
};

/** `xs` through `xl`. Below `default` the initials get tight — prefer two characters. */
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      {(["xs", "sm", "default", "lg", "xl"] as const).map((size) => (
        <Avatar key={size} size={size}>
          <AvatarFallback>MZ</AvatarFallback>
        </Avatar>
      ))}
    </div>
  ),
};

/** The frame rounds fully or to `--radius-md`; the clipping happens on the inner frame, not the root. */
export const Shapes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar shape="circle" size="lg">
        <AvatarFallback>MZ</AvatarFallback>
      </Avatar>
      <Avatar shape="square" size="lg">
        <AvatarFallback>MZ</AvatarFallback>
      </Avatar>
    </div>
  ),
};

/** `tone` colours the fallback chip. Use `accent` to mark one avatar out of a set — the current user, say. */
export const Tones: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar size="lg">
        <AvatarFallback tone="default">DE</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback tone="accent">AC</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback tone="muted">MU</AvatarFallback>
      </Avatar>
    </div>
  ),
};

/** The presence dot sits outside the clipped frame and rings itself in `--background` so it reads on any surface. */
export const Status: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      {(["online", "away", "busy", "offline"] as const).map((status) => (
        <Avatar key={status} size="lg" status={status}>
          <AvatarFallback>MZ</AvatarFallback>
        </Avatar>
      ))}
    </div>
  ),
};

/** `AvatarGroup` overlaps its children and rings each frame. Past `max`, the remainder collapses into a `+N` chip. */
export const Group: Story = {
  render: () => (
    <AvatarGroup max={4}>
      {["MZ", "AL", "JR", "KP", "TS", "BW"].map((initials, i) => (
        <Avatar key={initials}>
          <AvatarFallback tone={i === 0 ? "accent" : "default"}>{initials}</AvatarFallback>
        </Avatar>
      ))}
    </AvatarGroup>
  ),
};

/** Frames, tones and the group ring across both themes. */
export const LightDark: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <ThemeSplit>
      <Avatar size="lg" status="online">
        <AvatarFallback>MZ</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback tone="accent">AC</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback tone="muted">MU</AvatarFallback>
      </Avatar>
      <AvatarGroup max={3}>
        {["MZ", "AL", "JR", "KP", "TS"].map((initials, i) => (
          <Avatar key={initials}>
            <AvatarFallback tone={i === 0 ? "accent" : "default"}>{initials}</AvatarFallback>
          </Avatar>
        ))}
      </AvatarGroup>
    </ThemeSplit>
  ),
};
