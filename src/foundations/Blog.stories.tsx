import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar, AvatarFallback } from "../components/avatar";
import { Badge } from "../components/badge";
import { BrandLockup } from "../components/brand-mark";
import { Button } from "../components/button";
import { Container, Grid } from "../components/layout";
import { Prose } from "../components/prose";
import { Separator } from "../components/separator";

const meta = {
  title: "Templates/Blog",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const POSTS = [
  {
    title: "Designing a system, not a screen",
    excerpt:
      "A design system earns its keep the day you stop building screens and start building the vocabulary screens are made from.",
    category: "Systems",
    date: "Jul 2026",
    read: "6 min",
  },
  {
    title: "OKLCH, and why your palette should live in it",
    excerpt: "Perceptual lightness means every tint and shade behaves — across themes and accents.",
    category: "Colour",
    date: "Jun 2026",
    read: "8 min",
  },
  {
    title: "One source of truth, two platforms",
    excerpt: "Generating a SwiftUI token layer from the same tokens the web uses — no drift.",
    category: "Native",
    date: "May 2026",
    read: "5 min",
  },
] as const;

function Byline({ size = "sm" }: { size?: "sm" | "default" }) {
  return (
    <div className="flex items-center gap-2.5">
      <Avatar size={size} status="online">
        <AvatarFallback tone="accent">MZ</AvatarFallback>
      </Avatar>
      <div className="font-mono text-[11px] leading-tight text-muted-foreground">
        <p className="text-foreground">Martin Zachariassen</p>
        <p>Jul 23, 2026 · 6 min read</p>
      </div>
    </div>
  );
}

function BlogHeader() {
  return (
    <header className="border-b border-border">
      <Container size="lg" className="flex items-center justify-between py-3">
        <BrandLockup size={28} tagline="" />
        <nav className="hidden items-center gap-1 sm:flex">
          {["Writing", "Work", "About"].map((item, i) => (
            <Button key={item} variant={i === 0 ? "ghost" : "link"} size="sm">
              {item}
            </Button>
          ))}
        </nav>
      </Container>
    </header>
  );
}

function PostCard({ post }: { post: (typeof POSTS)[number] }) {
  return (
    <article className="group relative flex flex-col gap-3 rounded-[var(--radius-lg)] border border-border bg-card p-5 transition-[transform,box-shadow,border-color] duration-200 ease-[var(--ease-out)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:border-accent hover:shadow-[6px_6px_0_0_var(--accent)]">
      <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
        <Badge variant="muted">{post.category}</Badge>
        <span>
          {post.date} · {post.read}
        </span>
      </div>
      <h3 className="font-grotesk text-xl font-bold leading-tight tracking-tight text-foreground">
        <a href="#article" className="outline-none after:absolute focus-visible:underline">
          {post.title}
        </a>
      </h3>
      <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
    </article>
  );
}

/**
 * A blog index — a large featured lead, then an auto-fitting card grid. Stacks to
 * a single column on mobile. Click through to the Article story for the reading
 * view.
 */
export const Index: Story = {
  render: () => (
    <div className="min-h-screen bg-background text-foreground">
      <BlogHeader />

      <Container size="lg" className="py-14">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
          Writing
        </p>
        <h1 className="mt-3 font-hand text-5xl sm:text-6xl">Notes on building the system</h1>

        {/* Featured lead — horizontal on desktop */}
        <div className="mt-10 grid gap-6 rounded-[var(--radius-lg)] border border-border bg-secondary/30 p-6 md:grid-cols-[1.4fr_1fr] md:items-center md:p-8">
          <div>
            <Badge variant="accent">{POSTS[0].category}</Badge>
            <h2 className="mt-3 font-grotesk text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
              {POSTS[0].title}
            </h2>
            <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
              {POSTS[0].excerpt}
            </p>
            <div className="mt-5">
              <Byline />
            </div>
          </div>
          <div className="hidden aspect-[4/3] rounded-[var(--radius-md)] border border-border bg-[color-mix(in_oklch,var(--accent)_10%,var(--card))] md:block" />
        </div>

        <Separator className="my-12" />

        <Grid min="17rem" gap="lg">
          {POSTS.map((post) => (
            <PostCard key={post.title} post={post} />
          ))}
        </Grid>
      </Container>
    </div>
  ),
};

/**
 * The reading view — a single, measure-capped column built on `Prose`, with an
 * article header, byline, tags, and a "more writing" grid. The deliberate
 * alternate layout to the index grid: text-first, one column, generous rhythm.
 */
export const Article: Story = {
  render: () => (
    <div className="min-h-screen bg-background text-foreground">
      <BlogHeader />

      <Container size="lg" className="py-14">
        <Button variant="link" size="sm" className="mb-8 px-0">
          ← All writing
        </Button>

        <div className="mx-auto max-w-prose">
          <Badge variant="accent">Systems</Badge>
          <h1 className="mt-4 font-hand text-4xl leading-[1.05] sm:text-6xl">
            Designing a system, not a screen
          </h1>
          <div className="mt-6 flex items-center justify-between">
            <Byline size="default" />
            <div className="hidden gap-1.5 sm:flex">
              <Badge variant="outline">tokens</Badge>
              <Badge variant="outline">process</Badge>
            </div>
          </div>
          <Separator className="my-8" />
        </div>

        <Prose className="mx-auto">
          <p>
            A design system earns its keep the day you stop building screens and start building the
            vocabulary screens are made from. Here's the shape it takes, and why each layer exists.
          </p>
          <h2>Tokens first</h2>
          <p>
            Every colour, size and easing lives as a <code>--token</code>. Components read only the{" "}
            <em>semantic</em> layer — <code>--primary</code>, <code>--accent</code>,{" "}
            <code>--border</code> — so a single change ripples everywhere and no app drifts from the
            brand.
          </p>
          <blockquote>
            Restyle once, everywhere. The token is the contract; the component is just a consumer.
          </blockquote>
          <h3>What the layers buy you</h3>
          <ul>
            <li>Primitives stay faithful to the brand values.</li>
            <li>Semantic roles map them to intent you can safely override.</li>
            <li>Utilities and tokens become the same thing.</li>
          </ul>
          <h2>Then components</h2>
          <p>
            With the vocabulary settled, components are small: a button is a few token-driven
            utilities and a couple of variants. The interesting work moved down a layer, where it
            compounds.
          </p>
          <pre>
            <code>{`.card {\n  background: var(--card);\n  border: 1px solid var(--border);\n}`}</code>
          </pre>
          <p>
            The payoff: an app inherits the whole look for free, and when the system moves, every
            app moves with it.
          </p>
        </Prose>

        <div className="mx-auto mt-14 max-w-prose">
          <Separator className="mb-8" />
          <h2 className="mb-5 font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground">
            More writing
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {POSTS.slice(1).map((post) => (
              <PostCard key={post.title} post={post} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  ),
};
