import type { Meta, StoryObj } from "@storybook/react-vite";
import { RepoBanner } from "../components/repo-banner";

const meta = {
  title: "Foundations/Repo Banner",
  component: RepoBanner,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    project: "Design",
    eyebrow: "MLZ · Design System",
    description: "One canonical source of colour, type, style and motion for every project.",
    badges: ["React", "Tailwind v4", "SwiftUI", "OKLCH"],
    install: "bun add @martinzachariassen/design",
    footer: "github.com/martinzachariassen/mlz-design",
  },
  argTypes: {
    layout: { control: "inline-radio", options: ["standard", "minimal", "terminal", "split"] },
    accent: {
      control: "inline-radio",
      options: [undefined, "cyan", "blue", "green", "rust", "ink"],
    },
    width: { control: { type: "range", min: 640, max: 1280, step: 20 } },
    marks: { control: "boolean" },
  },
} satisfies Meta<typeof RepoBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A framed banner specimen at a fixed 896px — GitHub's rendered README width. */
function Frame({
  label,
  dark,
  children,
}: {
  label: string;
  dark?: boolean;
  children: React.ReactNode;
}) {
  return (
    <figure className="flex flex-col gap-2.5">
      <div
        className={`${dark ? "dark " : ""}overflow-hidden rounded-[var(--radius-lg)] border border-border shadow-[var(--shadow-md)]`}
      >
        {children}
      </div>
      <figcaption className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </figcaption>
    </figure>
  );
}

/** Live playground — drag `width`, flip `layout`/`accent`, toggle the toolbar theme. */
export const Playground: Story = {
  args: { layout: "standard", width: 896 },
  render: (args) => (
    <div className="flex min-h-screen items-center justify-center bg-muted p-8">
      <div className="overflow-hidden rounded-[var(--radius-lg)] border border-border shadow-[var(--shadow-lg)]">
        <RepoBanner {...args} />
      </div>
    </div>
  ),
};

/** Pristine light asset for capture — banner alone, no wrapper. */
export const Asset: Story = {
  args: { layout: "standard", width: 1200 },
  render: (args) => <RepoBanner {...args} />,
};

/** Pristine dark asset for capture — banner alone inside a `.dark` surface. */
export const AssetDark: Story = {
  args: { layout: "standard", width: 1200 },
  render: (args) => (
    <div className="dark inline-block bg-background">
      <RepoBanner {...args} />
    </div>
  ),
};

/** All four layouts at README width, so you can pick the house standard. */
export const Layouts: Story = {
  render: (args) => (
    <div className="min-h-screen bg-background px-8 py-14 text-foreground sm:px-16">
      <div className="mx-auto max-w-4xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
          Foundations
        </p>
        <h1 className="mt-3 font-hand text-5xl">Repo Banner</h1>
        <p className="mt-4 max-w-2xl font-mono text-sm leading-relaxed text-muted-foreground">
          The wide, short header image that tops every project's <code>README.md</code>. Locked to a{" "}
          <span className="text-foreground">1280×340</span> (≈3.76:1) ratio that reads well at
          GitHub's ~896px rendered README width. One structure, four layouts — only the copy changes
          per repo. Pick one as the house standard and reuse it everywhere.
        </p>

        <div className="mt-12 flex flex-col gap-9">
          <Frame label="standard — left-weighted lockup + statement (default)">
            <RepoBanner {...args} layout="standard" width={896} />
          </Frame>
          <Frame label="minimal — centred, symmetric">
            <RepoBanner {...args} layout="minimal" width={896} />
          </Frame>
          <Frame label="terminal — command-prompt, install front and centre">
            <RepoBanner {...args} layout="terminal" width={896} />
          </Frame>
          <Frame label="split — ink brand panel + paper content">
            <RepoBanner {...args} layout="split" width={896} />
          </Frame>
        </div>

        <h2 className="mt-16 mb-1 font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground">
          Light / dark
        </h2>
        <p className="mb-5 max-w-2xl font-mono text-[13px] leading-relaxed text-muted-foreground">
          Capture each banner twice — plain for light, inside a <code>.dark</code> wrapper for dark
          — and serve both with a <code>&lt;picture&gt;</code> and a{" "}
          <code>prefers-color-scheme</code> media query so the README reads on either GitHub theme.
        </p>
        <div className="grid gap-6 lg:grid-cols-2">
          <Frame label="light">
            <RepoBanner {...args} layout="standard" width={640} />
          </Frame>
          <Frame label="dark" dark>
            <RepoBanner {...args} layout="standard" width={640} />
          </Frame>
        </div>

        <h2 className="mt-16 mb-1 font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground">
          Same structure, any project
        </h2>
        <p className="mb-5 max-w-2xl font-mono text-[13px] leading-relaxed text-muted-foreground">
          Every repo wears the same face; only <code>project</code>, <code>description</code>,{" "}
          <code>badges</code> and <code>install</code> change. Swap <code>accent</code> to tint a
          repo without redrawing anything.
        </p>
        <div className="flex flex-col gap-6">
          <Frame label="another repo · rust accent">
            <RepoBanner
              layout="standard"
              width={896}
              accent="rust"
              project="Portfolio"
              eyebrow="MLZ · Web"
              description="My personal site and writing — built on the MLZ design system."
              badges={["Next.js", "React", "MDX"]}
              install="git clone mlz/portfolio"
              footer="martinzachariassen.com"
            />
          </Frame>
          <Frame label="another repo · green accent · terminal">
            <RepoBanner
              layout="terminal"
              width={896}
              accent="green"
              project="CLI"
              eyebrow="MLZ · Tooling"
              description="A tiny, fast command-line companion."
              badges={["Bun", "TypeScript"]}
              install="bun add -g @martinzachariassen/cli"
              footer="github.com/martinzachariassen/cli"
            />
          </Frame>
        </div>

        <h2 className="mt-16 mb-1 font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground">
          Export recipe
        </h2>
        <p className="mb-4 max-w-2xl font-mono text-[13px] leading-relaxed text-muted-foreground">
          <span className="text-foreground">This repo</span> ships a self-contained, theme-adaptive
          SVG — <code>bun run gen:banner</code> renders the standard layout with the brand fonts
          subset + embedded, so one file covers light and dark with no external requests. It also
          emits <code>assets/banner-template.svg</code>: a placeholder layout reference — copy it
          into any repo (even non-React ones) and swap the copy. Then top the README with a single
          tag:
        </p>
        <pre className="mb-4 overflow-x-auto rounded-[var(--radius-lg)] border border-border bg-card p-5 font-mono text-[12px] leading-relaxed text-foreground">
          {`<img alt="MLZ · Design" src="assets/banner.svg" width="100%" />`}
        </pre>
        <p className="max-w-2xl font-mono text-[13px] leading-relaxed text-muted-foreground">
          <span className="text-foreground">React repos</span> that consume the package skip the SVG
          and render this component directly — snapshot at 2× via Satori / <code>@vercel/og</code>,
          or serve light + dark PNGs behind a <code>&lt;picture&gt;</code>{" "}
          <code>prefers-color-scheme</code> switch.
        </p>
      </div>
    </div>
  ),
};
