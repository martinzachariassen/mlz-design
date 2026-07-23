import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { Badge } from "../components/badge";
import { BrandLockup } from "../components/brand-mark";
import { Button } from "../components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/dialog";
import { Input } from "../components/input";
import { Label } from "../components/label";
import { Container, Grid } from "../components/layout";
import { ProjectCard } from "../components/project-card";
import { Separator } from "../components/separator";
import { Textarea } from "../components/textarea";

const meta = {
  title: "Templates/Portfolio",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const PROJECTS = [
  {
    title: "MLZ Design",
    meta: "2026 · Design system",
    description:
      "A token-driven React + Tailwind design system — colour, type and components every app inherits, now with a generated SwiftUI layer.",
    tags: ["React", "Tailwind", "SwiftUI"],
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
  {
    title: "Aurora",
    meta: "2025 · Data viz",
    description: "Real-time telemetry dashboards for a satellite ground station.",
    tags: ["D3", "WebGL"],
    href: "#",
  },
] as const;

function PortfolioPage() {
  const [contactOpen, setContactOpen] = React.useState(false);
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur">
        <Container size="xl" className="flex items-center justify-between py-3">
          <BrandLockup size={28} tagline="" />
          <nav className="hidden items-center gap-1 sm:flex">
            {["Work", "About", "Writing"].map((item) => (
              <Button key={item} variant="link" size="sm">
                {item}
              </Button>
            ))}
          </nav>
          <Button variant="solid" size="sm" onClick={() => setContactOpen(true)}>
            Get in touch
          </Button>
        </Container>
      </header>

      {/* Hero */}
      <Container size="xl" className="py-16 sm:py-24">
        <Badge variant="accent" className="gap-1.5">
          <span className="inline-block size-1.5 rounded-full bg-current" /> Available for work
        </Badge>
        <h1 className="mt-5 max-w-4xl font-hand text-5xl leading-[1.05] sm:text-7xl">
          Martin builds calm, technical software with a hand-drawn edge.
        </h1>
        <p className="mt-6 max-w-2xl font-mono text-sm leading-relaxed text-muted-foreground sm:text-base">
          Designer-engineer. I make design systems, products and the occasional brand — paper-warm,
          keyboard-first, and built to last.
        </p>
      </Container>

      {/* Featured */}
      <Container size="xl" className="pb-4">
        <div className="mb-5 flex items-baseline justify-between">
          <h2 className="font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground">
            Featured
          </h2>
        </div>
        <ProjectCard {...PROJECTS[0]} featured />
      </Container>

      {/* Grid */}
      <Container size="xl" className="py-14">
        <div className="mb-5 flex items-baseline justify-between">
          <h2 className="font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground">
            Selected work
          </h2>
          <Button variant="link" size="sm">
            All projects →
          </Button>
        </div>
        <Grid min="17rem" gap="lg">
          {PROJECTS.slice(1).map((p) => (
            <ProjectCard key={p.title} {...p} />
          ))}
        </Grid>
      </Container>

      {/* Capabilities strip */}
      <Container size="xl" className="pb-16">
        <Separator className="mb-10" />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Design systems", "Tokens, components, docs — the whole pipeline."],
            ["Product design", "From flows to pixels to the shipped build."],
            ["Frontend", "React, Tailwind, TypeScript — accessible by default."],
            ["Native", "SwiftUI apps that share the same design language."],
          ].map(([title, body]) => (
            <div key={title}>
              <h3 className="font-mono text-sm font-bold uppercase tracking-[0.1em]">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </Container>

      {/* Contact CTA */}
      <div className="border-t border-border bg-secondary/40">
        <Container size="md" className="py-16 text-center">
          <h2 className="font-hand text-4xl sm:text-5xl">Have something in mind?</h2>
          <p className="mx-auto mt-4 max-w-md font-mono text-sm leading-relaxed text-muted-foreground">
            I take on a couple of projects a quarter. Tell me what you're building.
          </p>
          <Button variant="solid" size="lg" className="mt-7" onClick={() => setContactOpen(true)}>
            Start a conversation
          </Button>
        </Container>
      </div>

      <Dialog open={contactOpen} onOpenChange={setContactOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Get in touch</DialogTitle>
            <DialogDescription>
              A line about the project and I'll reply within a day.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="c-email">Email</Label>
              <Input id="c-email" type="email" placeholder="you@company.com" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="c-brief">Project</Label>
              <Textarea id="c-brief" rows={4} placeholder="What are you building?" />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="solid"
              className="w-full sm:w-auto"
              onClick={() => setContactOpen(false)}
            >
              Send
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

/**
 * An entire portfolio view assembled only from system components — nav, hero,
 * featured project (horizontal on desktop, stacked on mobile), an auto-fitting
 * project grid, a capabilities strip and a contact dialog. Resize to watch the
 * layout adapt; flip Theme/Accent in the toolbar.
 */
export const Overview: Story = {
  render: () => <PortfolioPage />,
};
