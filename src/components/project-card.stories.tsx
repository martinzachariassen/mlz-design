import type { Meta, StoryObj } from "@storybook/react-vite";
import { Grid } from "./layout";
import { ProjectCard } from "./project-card";

const meta = {
  title: "Components/ProjectCard",
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const PROJECTS = [
  {
    title: "MLZ Design",
    meta: "2026 · Design system",
    description:
      "A token-driven React + Tailwind system — colour, type and components that every app inherits.",
    tags: ["React", "Tailwind", "Tokens"],
    href: "#",
  },
  {
    title: "Ledger",
    meta: "2025 · Product",
    description: "A keyboard-first finance tracker with an offline-first sync engine.",
    tags: ["SwiftUI", "CRDT"],
    href: "#",
  },
  {
    title: "Northwind",
    meta: "2024 · Brand + web",
    description: "Identity and marketing site for a renewable-energy startup.",
    tags: ["Brand", "Next.js"],
    href: "#",
  },
] as const;

export const Default: Story = {
  render: () => (
    <div className="max-w-sm">
      <ProjectCard {...PROJECTS[0]} />
    </div>
  ),
};

export const Featured: Story = {
  render: () => <ProjectCard {...PROJECTS[0]} featured />,
};

export const PortfolioGrid: Story = {
  render: () => (
    <Grid min="18rem" gap="lg">
      {PROJECTS.map((p) => (
        <ProjectCard key={p.title} {...p} />
      ))}
    </Grid>
  ),
};

export const CustomCover: Story = {
  render: () => (
    <div className="max-w-sm">
      <ProjectCard
        title="Aurora"
        meta="2025 · Data viz"
        description="Real-time telemetry dashboards for a satellite ground station."
        tags={["D3", "WebGL"]}
        href="#"
        cover={
          <div className="flex size-full items-center justify-center bg-accent">
            <span className="font-hand text-5xl lowercase text-accent-foreground">au</span>
          </div>
        }
      />
    </div>
  ),
};
