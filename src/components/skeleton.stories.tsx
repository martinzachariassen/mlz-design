import type { Meta, StoryObj } from "@storybook/react-vite";
import { Skeleton } from "./skeleton";

const meta = {
  title: "Components/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => <Skeleton className="h-4 w-48" />,
};

export const Shapes: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Skeleton className="h-3 w-64" />
      <Skeleton className="h-3 w-52" />
      <Skeleton className="h-3 w-40" />
      <Skeleton className="size-12 rounded-full" />
    </div>
  ),
};

export const Card: Story = {
  render: () => (
    <div className="w-72 rounded-[var(--radius-lg)] border border-border bg-card p-5">
      <div className="flex items-center gap-3">
        <Skeleton className="size-10 rounded-full" />
        <div className="flex flex-1 flex-col gap-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-3/5" />
      </div>
    </div>
  ),
};
