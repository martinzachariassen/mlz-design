import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeSplit } from "../../foundations/theme-split";
import { iconNames } from "../../icons/generated";
import { Button } from "../forms/button";
import { Icon } from "./icon";

const meta = {
  title: "Components/Data Display/Icon",
  component: Icon,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    name: { control: "select", options: iconNames },
    size: { control: "select", options: ["xs", "sm", "default", "lg", "xl"] },
    label: { control: "text" },
  },
  args: { name: "sparkles", size: "default" },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-6 text-foreground">
      <Icon name="sparkles" size="xs" />
      <Icon name="sparkles" size="sm" />
      <Icon name="sparkles" size="default" />
      <Icon name="sparkles" size="lg" />
      <Icon name="sparkles" size="xl" />
    </div>
  ),
};

export const Colour: Story = {
  name: "Colour (currentColor)",
  render: () => (
    <div className="flex items-center gap-6">
      <Icon name="circle-check" size="lg" className="text-primary" />
      <Icon name="triangle-alert" size="lg" className="text-destructive" />
      <Icon name="info" size="lg" className="text-accent" />
      <Icon name="star" size="lg" className="text-muted-foreground" />
    </div>
  ),
};

export const InButtons: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button>
        <Icon name="plus" size="sm" />
        New project
      </Button>
      <Button variant="sketch">
        <Icon name="download" size="sm" />
        Export
      </Button>
      <Button variant="ghost" size="icon" aria-label="Settings">
        <Icon name="settings" size="sm" />
      </Button>
    </div>
  ),
};

export const Gallery: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(6rem,1fr))] gap-px overflow-hidden rounded-[var(--radius)] border border-border bg-border">
      {iconNames.map((name) => (
        <div
          key={name}
          className="flex flex-col items-center gap-2 bg-background p-4 text-muted-foreground"
        >
          <Icon name={name} size="lg" className="text-foreground" />
          <span className="text-center font-mono text-[10px] leading-tight">{name}</span>
        </div>
      ))}
    </div>
  ),
};

export const LightDark: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <ThemeSplit>
      <div className="flex items-center gap-4 text-foreground">
        <Icon name="sun" size="lg" />
        <Icon name="moon" size="lg" />
        <Icon name="github" size="lg" />
        <Icon name="sparkles" size="lg" className="text-accent" />
      </div>
    </ThemeSplit>
  ),
};
