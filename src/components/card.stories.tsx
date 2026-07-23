import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./badge";
import { BrandMark } from "./brand-mark";
import { Button } from "./button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";

const meta = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["default", "elevated", "interactive", "accent", "ghost"],
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { variant: "default" },
  render: (args) => (
    <Card {...args} className="w-80">
      <CardHeader>
        <CardTitle>Deploy</CardTitle>
        <CardDescription>
          Ship the design system playground to Railway. Elevation is a hairline border, never a drop
          shadow — true to the paper look.
        </CardDescription>
        <CardAction>
          <Badge variant="accent">ready</Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="flex items-center gap-3">
        <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
          3 checks passed
        </span>
      </CardContent>
      <CardFooter className="gap-3">
        <Button variant="solid" size="sm">
          Ship it
        </Button>
        <Button variant="ghost" size="sm">
          Preview
        </Button>
      </CardFooter>
    </Card>
  ),
};

/** Every surface variant side by side — swap Theme / Accent in the toolbar. */
export const Variants: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <div className="min-h-screen bg-background p-10">
      <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {(["default", "elevated", "interactive", "accent", "ghost"] as const).map((variant) => (
          <Card key={variant} variant={variant}>
            <CardHeader>
              <CardTitle>{variant}</CardTitle>
              <CardDescription>
                {variant === "interactive"
                  ? "Lifts on hover with an offset accent shadow — for whole-card links."
                  : `The ${variant} surface, styled purely from semantic tokens.`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-16 rounded-[var(--radius-md)] border border-dashed border-border" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  ),
};

/** A metric tile — the atom of any dashboard. */
export const Stat: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      {[
        ["Deploys", "1,284", "+12.4%", "accent"],
        ["p95 latency", "82ms", "-8ms", "muted"],
        ["Error rate", "0.03%", "steady", "muted"],
        ["Uptime", "99.98%", "30d", "muted"],
      ].map(([label, value, delta, tone]) => (
        <Card key={label} className="w-48">
          <CardContent className="p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              {label}
            </p>
            <p className="mt-2 font-grotesk text-3xl font-bold tracking-tight text-foreground">
              {value}
            </p>
            <Badge variant={tone === "accent" ? "accent" : "muted"} className="mt-3">
              {delta}
            </Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  ),
};

/** A feature card with a brand mark and a call to action. */
export const Feature: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <div className="mb-2 flex size-11 items-center justify-center rounded-[var(--radius-md)] border border-border bg-accent-subtle">
          <BrandMark variant="glyph" size={22} className="text-accent" />
        </div>
        <CardTitle>Token-driven</CardTitle>
        <CardDescription>
          One semantic layer feeds Tailwind utilities, JS tokens and runtime theme swaps — restyle
          once, everything follows.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button variant="link" size="sm" className="px-0">
          Read the architecture →
        </Button>
      </CardFooter>
    </Card>
  ),
};

/** Whole-card link — the interactive variant with a stretched hit target. */
export const Interactive: Story = {
  render: () => (
    <Card variant="interactive" className="relative w-80">
      <CardHeader>
        <CardTitle>Changelog</CardTitle>
        <CardDescription>
          v0.2.0 — brand assets, social cards and a dozen new components. The whole card is one
          focusable link.
        </CardDescription>
        <CardAction>
          <Badge variant="outline">new</Badge>
        </CardAction>
      </CardHeader>
      <CardContent>
        <a
          href="#changelog"
          className="font-mono text-xs uppercase tracking-[0.14em] text-foreground after:absolute after:inset-0 focus-visible:outline-none"
        >
          <span className="sr-only">Read the changelog</span>
        </a>
        <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
          2 days ago · 5 min read
        </span>
      </CardContent>
    </Card>
  ),
};

/** A pricing card built from the accent variant. */
export const Pricing: Story = {
  render: () => (
    <Card variant="accent" className="w-72">
      <CardHeader>
        <CardTitle>Studio</CardTitle>
        <CardAction>
          <Badge variant="accent">popular</Badge>
        </CardAction>
        <CardDescription>For teams standardising on one system.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="font-grotesk text-4xl font-bold text-foreground">
          $0
          <span className="ml-1 font-mono text-sm font-normal text-muted-foreground">/forever</span>
        </p>
        <ul className="mt-4 space-y-2 font-mono text-xs text-muted-foreground">
          {["Every token & component", "Light · dark · 5 accents", "MIT licensed"].map((f) => (
            <li key={f} className="flex items-center gap-2">
              <span className="size-1.5 bg-accent" aria-hidden />
              {f}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button variant="solid" size="sm" className="w-full">
          Install
        </Button>
      </CardFooter>
    </Card>
  ),
};
