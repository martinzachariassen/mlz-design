import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeSplit } from "../../foundations/theme-split";
import { Grid } from "../layout/layout";
import { ProjectCard } from "./project-card";

const meta = {
  title: "Components/Brand/Project Card",
  component: ProjectCard,
  parameters: { layout: "padded" },
  argTypes: {
    title: { description: "The project name — the card's heading.", control: "text" },
    description: {
      description: "One or two sentences on the work. Clamped to three lines unless `featured`.",
      control: "text",
    },
    meta: {
      description: 'Mono eyebrow above the title — e.g. `"2024 · Design system"`.',
      control: "text",
    },
    tags: { description: "Short chips for stack, role or category.", control: "object" },
    href: {
      description: "Makes the whole card one link, with the title anchor stretched over it.",
      control: "text",
    },
    cover: {
      description: "Cover visual. Defaults to the brand grid + monogram placeholder.",
      control: false,
    },
    featured: {
      description: "Horizontal, larger layout from `md` up — for the hero project.",
      control: "boolean",
    },
    cta: { description: "Label on the link affordance under the body.", control: "text" },
  },
  args: { title: "MLZ Design" },
} satisfies Meta<typeof ProjectCard>;

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

/** The standard vertical card, with the on-brand placeholder cover — no stock imagery anywhere in the system. */
export const Default: Story = {
  render: () => (
    <div className="max-w-sm">
      <ProjectCard {...PROJECTS[0]} />
    </div>
  ),
};

/** `featured` turns the card horizontal from `md` up and lets the description breathe. Reserve it for the one project at the top. */
export const Featured: Story = {
  render: () => <ProjectCard {...PROJECTS[0]} featured />,
};

/** What the card is built for: dropped into an auto-fitting `Grid`, three cards reflow to one column on a phone with no breakpoints. */
export const PortfolioGrid: Story = {
  render: () => (
    <Grid min="18rem" gap="lg">
      {PROJECTS.map((p) => (
        <ProjectCard key={p.title} {...p} />
      ))}
    </Grid>
  ),
};

/** Pass anything as `cover` — an image, a canvas, or here a flat accent panel with a hand-set monogram. */
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

/** Surface, border and the hover accent shadow across both themes. */
export const LightDark: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <ThemeSplit>
      <div className="w-full max-w-sm">
        <ProjectCard {...PROJECTS[0]} />
      </div>
    </ThemeSplit>
  ),
};
