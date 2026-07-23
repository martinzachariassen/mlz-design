import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "../components/badge";
import { BrandLockup, BrandMark } from "../components/brand-mark";
import { Button } from "../components/button";
import { Card, CardContent } from "../components/card";
import { Container, Grid, Stack } from "../components/layout";
import { Separator } from "../components/separator";
import { breakpoints } from "../tokens";

const meta = {
  title: "Foundations/Responsive",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
      {children}
    </p>
  );
}

function Section({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-14">
      <h2 className="mb-1 font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground">
        {title}
      </h2>
      {hint ? (
        <p className="mb-5 max-w-2xl font-mono text-[13px] leading-relaxed text-muted-foreground">
          {hint}
        </p>
      ) : null}
      {children}
    </section>
  );
}

/** A dotted demo box so layout primitives are visible without brand paint. */
function Box({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex min-h-14 items-center justify-center rounded-[var(--radius-md)] border border-dashed border-[color-mix(in_oklch,var(--accent)_50%,var(--border))] bg-accent-subtle px-4 py-3 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
      {children}
    </div>
  );
}

/* ── the shared app content, rendered inside both a phone and a desktop frame ── */

const NAV = ["Home", "Projects", "Activity", "Settings"];

function StatCards() {
  return (
    <Grid min="9rem" gap="sm">
      {[
        ["Deploys", "1,284"],
        ["Coverage", "94%"],
        ["Uptime", "99.9%"],
        ["Bundle", "36 KB"],
      ].map(([label, value]) => (
        <Card key={label}>
          <CardContent className="p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              {label}
            </p>
            <p className="mt-1.5 font-grotesk text-2xl font-bold tracking-tight">{value}</p>
          </CardContent>
        </Card>
      ))}
    </Grid>
  );
}

/** Phone: a stacked column with a top bar and a bottom tab bar. */
function MobileShell() {
  return (
    <div className="mx-auto w-[300px] overflow-hidden rounded-[var(--radius-xl)] border border-border bg-background shadow-[var(--shadow-lg)]">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <BrandLockup size={22} tagline="" />
        <BrandMark variant="glyph" size={20} className="text-muted-foreground" />
      </div>
      <div className="space-y-4 px-4 py-5">
        <div>
          <Kicker>Dashboard</Kicker>
          <h3 className="mt-1 font-hand text-2xl">Overview</h3>
        </div>
        <StatCards />
        <Button variant="solid" size="sm" className="w-full">
          New project
        </Button>
      </div>
      <nav className="grid grid-cols-4 border-t border-border">
        {NAV.map((item, i) => (
          <button
            key={item}
            type="button"
            className={`flex flex-col items-center gap-1 py-2.5 font-mono text-[9px] uppercase tracking-[0.1em] ${
              i === 0 ? "text-accent" : "text-muted-foreground"
            }`}
          >
            <span className="size-4 rounded-[3px] border border-current" />
            {item}
          </button>
        ))}
      </nav>
    </div>
  );
}

/** Desktop: a fixed sidebar beside the main column — the same content, more room. */
function DesktopShell() {
  return (
    <div className="overflow-hidden rounded-[var(--radius-xl)] border border-border bg-background shadow-[var(--shadow-lg)]">
      <div className="flex min-h-[320px]">
        <aside className="hidden w-52 shrink-0 flex-col justify-between border-r border-border p-4 sm:flex">
          <div className="space-y-5">
            <BrandLockup size={24} tagline="" />
            <nav className="flex flex-col gap-1">
              {NAV.map((item, i) => (
                <button
                  key={item}
                  type="button"
                  className={`rounded-[var(--radius-md)] px-3 py-2 text-left font-mono text-[11px] uppercase tracking-[0.1em] ${
                    i === 0
                      ? "bg-accent-subtle text-accent"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>
          <p className="font-mono text-[10px] text-muted-foreground">v0.2.0</p>
        </aside>
        <main className="flex-1 space-y-5 p-6">
          <div className="flex items-end justify-between">
            <div>
              <Kicker>Dashboard</Kicker>
              <h3 className="mt-1 font-hand text-3xl">Overview</h3>
            </div>
            <Button variant="solid" size="sm">
              New project
            </Button>
          </div>
          <StatCards />
        </main>
      </div>
    </div>
  );
}

/**
 * Mobile-first, one system. Layouts are built on the token breakpoint ladder and
 * three unstyled primitives — Container, Stack, Grid — so a page reads the same
 * from a 360px phone to a wide desktop. Everything below re-themes with the
 * toolbar; resize the frame (or use the viewport toolbar) to watch it adapt.
 */
export const Overview: Story = {
  render: () => (
    <div className="min-h-screen bg-background px-8 py-14 text-foreground sm:px-16">
      <div className="mx-auto max-w-5xl">
        <Kicker>Foundations</Kicker>
        <h1 className="mt-3 font-hand text-5xl">Responsive</h1>
        <p className="mt-4 max-w-2xl font-mono text-sm leading-relaxed text-muted-foreground">
          One codebase, every screen. Design mobile-first, then let the layout open up at each
          breakpoint. The primitives carry no colour — they only lay things out — so you compose the
          painted components inside them.
        </p>

        <Section
          title="Breakpoints"
          hint="The min-width ladder (mirrors Tailwind's defaults). Also exported from ./tokens as `breakpoints` for JS-driven layout (matchMedia, virtualisation) that must agree with the CSS."
        >
          <div className="overflow-hidden rounded-[var(--radius-lg)] border border-border">
            {Object.entries(breakpoints).map(([name, rem], i) => {
              const px = Number.parseFloat(rem) * 16;
              return (
                <div key={name}>
                  {i > 0 && <Separator />}
                  <div className="flex items-center gap-4 px-5 py-3">
                    <code className="w-16 font-mono text-sm font-bold text-foreground">
                      {name}:
                    </code>
                    <code className="w-24 font-mono text-sm text-muted-foreground">{rem}</code>
                    <code className="w-20 font-mono text-sm text-muted-foreground">{px}px</code>
                    <div className="hidden flex-1 sm:block">
                      <div
                        className="h-1.5 rounded-full bg-accent"
                        style={{ width: `${(px / 1536) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Section>

        <Section
          title="Container"
          hint="A centred column with a max width and responsive gutters — the page frame. Sizes sm · md · lg · xl · prose · full."
        >
          <div className="space-y-3 rounded-[var(--radius-lg)] border border-border bg-secondary/40 py-4">
            {(["sm", "md", "prose"] as const).map((size) => (
              <Container key={size} size={size} gutter="none">
                <Box>Container · {size}</Box>
              </Container>
            ))}
          </div>
        </Section>

        <Section
          title="Stack"
          hint="Flex row or column with a token gap. `direction=responsive` stacks on mobile and flows to a row from sm up — the common card→row flip. Resize to see it."
        >
          <Stack direction="responsive" gap="md">
            <Box>First</Box>
            <Box>Second</Box>
            <Box>Third</Box>
          </Stack>
        </Section>

        <Section
          title="Grid"
          hint="Two modes. `min` auto-fits as many equal tracks as fit (no breakpoints needed); `cols` steps a fixed count up at sm/lg. Below: an auto-fitting 12rem grid."
        >
          <Grid min="12rem" gap="md">
            {["one", "two", "three", "four", "five", "six"].map((n, i) => (
              <Box key={n}>Cell {i + 1}</Box>
            ))}
          </Grid>
        </Section>

        <Section
          title="Adaptive app shell"
          hint="The same dashboard, two form factors: a phone with a bottom tab bar, and a desktop with a persistent sidebar. Both share the StatCards grid (auto-fit) and re-theme with the toolbar."
        >
          <div className="grid gap-8 lg:grid-cols-[auto_1fr] lg:items-start">
            <div>
              <p className="mb-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                <Badge variant="muted">≤ sm</Badge> Phone
              </p>
              <MobileShell />
            </div>
            <div>
              <p className="mb-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                <Badge variant="accent">sm +</Badge> Desktop
              </p>
              <DesktopShell />
            </div>
          </div>
        </Section>
      </div>
    </div>
  ),
};
