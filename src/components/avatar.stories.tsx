import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "./avatar";

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "default", "lg", "xl"] },
    shape: { control: "inline-radio", options: ["circle", "square"] },
    status: { control: "select", options: [undefined, "online", "away", "busy", "offline"] },
  },
  args: { size: "default", shape: "circle" },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

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
