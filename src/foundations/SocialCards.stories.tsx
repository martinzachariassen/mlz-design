import type { Meta, StoryObj } from "@storybook/react-vite";
import { SocialCard } from "../components/social-card";

const meta = {
  title: "Foundations/Social Cards",
  component: SocialCard,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: { title: "A design system, distilled from mlz.no" },
  argTypes: {
    accent: {
      control: "inline-radio",
      options: [undefined, "cyan", "blue", "green", "rust", "ink"],
    },
    width: { control: { type: "range", min: 480, max: 1200, step: 20 } },
  },
} satisfies Meta<typeof SocialCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The canonical share image. Drag `width` — the whole card scales as one. */
export const Default: Story = {
  args: {
    eyebrow: "Martin Zachariassen",
    title: "A design system, distilled from mlz.no",
    description:
      "Colour, type and motion as tokens — installable, themeable, and true to the brand.",
    footer: "mlz.no",
    tag: "design",
    width: 900,
  },
  render: (args) => (
    <div className="flex min-h-screen items-center justify-center bg-muted p-8">
      <div className="overflow-hidden rounded-[var(--radius-lg)] border border-border shadow-[var(--shadow-lg)]">
        <SocialCard {...args} />
      </div>
    </div>
  ),
};

/** One template, every accent family — pin per-card with the `accent` prop. */
export const Accents: Story = {
  render: () => (
    <div className="min-h-screen bg-muted p-8">
      <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
        {(
          [
            ["cyan", "Ship faster", "The house colour."],
            ["rust", "Field notes", "Warm, editorial."],
            ["blue", "Engineering log", "Cool, technical."],
            ["green", "Changelog", "Calm, additive."],
          ] as const
        ).map(([accent, title, description]) => (
          <div
            key={accent}
            className="overflow-hidden rounded-[var(--radius-lg)] border border-border"
          >
            <SocialCard
              accent={accent}
              eyebrow={`accent · ${accent}`}
              title={title}
              description={description}
              tag={accent}
              width={560}
              marks={false}
            />
          </div>
        ))}
      </div>
    </div>
  ),
};

/** How to render these to real PNGs at build/request time. */
export const GenerationRecipe: Story = {
  render: () => (
    <div className="min-h-screen bg-background px-8 py-14 text-foreground sm:px-16">
      <div className="mx-auto max-w-3xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
          Foundations
        </p>
        <h1 className="mt-3 font-hand text-5xl">Social cards</h1>
        <p className="mt-4 font-mono text-sm leading-relaxed text-muted-foreground">
          <code className="text-foreground">&lt;SocialCard /&gt;</code> is a real component at the
          canonical 1200×630. Render it in a route and snapshot it, or feed the same markup to
          Satori / <code className="text-foreground">@vercel/og</code> to emit a PNG per page.
        </p>

        <div className="mt-8 space-y-4 font-mono text-[12px] text-muted-foreground">
          <div className="rounded-[var(--radius-md)] border border-border p-4">
            <p className="mb-2 uppercase tracking-[0.14em] text-foreground">
              Next.js — app/og/route.tsx
            </p>
            <pre className="overflow-x-auto whitespace-pre leading-relaxed">{`import { ImageResponse } from "next/og";
import { SocialCard } from "@martinzachariassen/design";

export function GET(req: Request) {
  const title = new URL(req.url).searchParams.get("title") ?? "mlz.no";
  return new ImageResponse(<SocialCard title={title} width={1200} />, {
    width: 1200,
    height: 630,
  });
}`}</pre>
          </div>

          <div className="rounded-[var(--radius-md)] border border-border p-4">
            <p className="mb-2 uppercase tracking-[0.14em] text-foreground">Head tags</p>
            <pre className="overflow-x-auto whitespace-pre leading-relaxed">{`<meta property="og:image" content="https://mlz.no/og?title=Hello" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta name="twitter:card" content="summary_large_image" />`}</pre>
          </div>

          <p className="leading-relaxed">
            Note: the ruled grid and drifting marks use CSS gradients and keyframes — Satori renders
            static gradients but not animation, which is exactly right for a still image. Snapshot
            at 2× (2400×1260) for retina.
          </p>
        </div>
      </div>
    </div>
  ),
};
