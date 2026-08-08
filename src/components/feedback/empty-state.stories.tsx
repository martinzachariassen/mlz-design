import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeSplit } from "../../foundations/theme-split";
import { BrandMark } from "../brand/brand-mark";
import { Button } from "../forms/button";
import { Card, CardContent } from "../layout/card";
import {
  EmptyState,
  EmptyStateActions,
  EmptyStateDescription,
  EmptyStateMedia,
  EmptyStateTitle,
} from "./empty-state";

const meta = {
  title: "Components/Feedback/EmptyState",
  component: EmptyState,
  subcomponents: {
    EmptyStateMedia,
    EmptyStateTitle,
    EmptyStateDescription,
    EmptyStateActions,
  },
  tags: ["autodocs", "status:new"],
  parameters: { layout: "padded" },
  args: { children: null },
  argTypes: {
    children: { table: { disable: true } },
    variant: { control: "inline-radio", options: ["dashed", "outline", "plain"] },
    size: { control: "inline-radio", options: ["sm", "default"] },
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The shape to copy: what would be here, then the action that puts something here. */
export const Playground: Story = {
  render: (args) => (
    <EmptyState {...args} className="mx-auto max-w-xl">
      <EmptyStateMedia>
        <BrandMark variant="glyph" size={28} className="text-accent" />
      </EmptyStateMedia>
      <EmptyStateTitle>No projects yet</EmptyStateTitle>
      <EmptyStateDescription>
        Spin one up from a template, or import an existing repo to get started.
      </EmptyStateDescription>
      <EmptyStateActions>
        <Button variant="solid" size="sm">
          New project
        </Button>
        <Button size="sm">Import</Button>
      </EmptyStateActions>
    </EmptyState>
  ),
};

/**
 * `dashed` reads as a slot waiting to be filled; `outline` suits a list that is empty
 * rather than unstarted; `plain` drops the container when it's already inside a `Card`.
 */
export const Variants: Story = {
  render: () => (
    <div className="mx-auto flex max-w-xl flex-col gap-6">
      {(["dashed", "outline"] as const).map((variant) => (
        <EmptyState key={variant} variant={variant} size="sm">
          <EmptyStateTitle>{variant}</EmptyStateTitle>
          <EmptyStateDescription>Nothing here yet.</EmptyStateDescription>
        </EmptyState>
      ))}
      <Card>
        <CardContent className="p-0">
          <EmptyState variant="plain" size="sm">
            <EmptyStateTitle>plain, inside a Card</EmptyStateTitle>
            <EmptyStateDescription>The card is already the container.</EmptyStateDescription>
          </EmptyState>
        </CardContent>
      </Card>
    </div>
  ),
};

/** No results is a different message from nothing exists — offer the way back, not a way to create. */
export const NoResults: Story = {
  render: () => (
    <EmptyState variant="outline" className="mx-auto max-w-xl">
      <EmptyStateTitle>No matches for "aurora"</EmptyStateTitle>
      <EmptyStateDescription>
        Try a shorter search, or clear the filters you have on.
      </EmptyStateDescription>
      <EmptyStateActions>
        <Button size="sm">Clear filters</Button>
      </EmptyStateActions>
    </EmptyState>
  ),
};

/**
 * When the empty state owns a whole page it should carry a real heading. Set `as` — the
 * default `<p>` exists because most empty states sit inside a region that already has one.
 */
export const AsAPageHeading: Story = {
  render: () => (
    <EmptyState className="mx-auto max-w-xl">
      <EmptyStateTitle as="h2">Your inbox is clear</EmptyStateTitle>
      <EmptyStateDescription>Nothing needs you right now.</EmptyStateDescription>
    </EmptyState>
  ),
};

export const LightDark: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <ThemeSplit>
      <EmptyState size="sm" className="w-full max-w-xs">
        <EmptyStateTitle>No projects yet</EmptyStateTitle>
        <EmptyStateDescription>Spin one up from a template.</EmptyStateDescription>
      </EmptyState>
    </ThemeSplit>
  ),
};
