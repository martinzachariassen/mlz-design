import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties, ReactNode } from "react";

const meta = {
  title: "Foundations/Colour Usage",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/* ---------------------------------------------------------------- primitives */

function Section({
  title,
  lead,
  children,
}: {
  title: string;
  lead?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="mt-14">
      <h2 className="border-b border-border pb-2.5 font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground">
        {title}
      </h2>
      {lead ? (
        <p className="mt-4 max-w-2xl font-mono text-sm text-muted-foreground">{lead}</p>
      ) : null}
      <div className="mt-6">{children}</div>
    </section>
  );
}

/** A do / don't verdict chip. */
function Verdict({ ok, children }: { ok: boolean; children: ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.08em]"
      style={{ color: `var(--${ok ? "success" : "destructive"})` }}
    >
      <span aria-hidden>{ok ? "✓" : "✗"}</span>
      {children}
    </span>
  );
}

/**
 * A surface tile that paints `bg`/`fg` from tokens and shows body + secondary
 * text on it, so the pairing's legibility is visible, not asserted.
 */
function Pairing({
  bg,
  fg,
  secondary,
  title,
  note,
}: {
  bg: string;
  fg: string;
  secondary?: string;
  title: string;
  note?: string;
}) {
  return (
    <div className="overflow-hidden rounded-[var(--radius-md)] border border-border">
      <div
        className="p-4"
        style={{ background: `var(--${bg})`, color: `var(--${fg})` } as CSSProperties}
      >
        <div className="text-sm font-medium">The quick brown fox</div>
        {secondary ? (
          <div className="mt-1 text-xs" style={{ color: `var(--${secondary})` } as CSSProperties}>
            jumps over the lazy dog
          </div>
        ) : null}
      </div>
      <div className="bg-card p-2.5">
        <div className="font-mono text-[11px] text-foreground">{title}</div>
        {note ? (
          <div className="mt-0.5 font-mono text-[10px] text-muted-foreground">{note}</div>
        ) : null}
      </div>
    </div>
  );
}

/** A theme-locked panel (forces light or dark regardless of the toolbar). */
function ThemePanel({
  theme,
  title,
  children,
}: {
  theme: "light" | "dark";
  title: string;
  children: ReactNode;
}) {
  return (
    <div
      data-theme={theme}
      className="rounded-[var(--radius-lg)] border border-border bg-background p-6 text-foreground"
    >
      <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
        {title}
      </div>
      {children}
    </div>
  );
}

/* --------------------------------------------------------------------- story */

export const Usage: Story = {
  render: () => (
    <div className="min-h-screen bg-background px-8 py-14 text-foreground">
      <div className="mx-auto max-w-5xl">
        <h1 className="font-hand text-5xl">Colour usage</h1>
        <p className="mt-3 max-w-2xl font-mono text-sm text-muted-foreground">
          How to pick colours so text stays legible in both themes. The rule of thumb: read only the
          semantic layer, always pair a surface with its <code>-foreground</code>, and let the
          accent go deep on light and stay bright on dark. Flip the toolbar Theme/Accent — nothing
          here should break.
        </p>

        {/* ---------------------------------------------------------------- */}
        <Section
          title="Surface → foreground pairings"
          lead="Every surface role ships a matching -foreground tuned to clear WCAG AA for body copy. Put a surface's own foreground on it — never mix a foreground meant for another surface."
        >
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            <Pairing
              bg="background"
              fg="foreground"
              secondary="muted-foreground"
              title="background → foreground"
              note="body + muted-foreground"
            />
            <Pairing
              bg="card"
              fg="card-foreground"
              secondary="muted-foreground"
              title="card → card-foreground"
            />
            <Pairing
              bg="primary"
              fg="primary-foreground"
              title="primary → primary-foreground"
              note="ink emphasis / solid buttons"
            />
            <Pairing
              bg="secondary"
              fg="secondary-foreground"
              title="secondary → secondary-foreground"
            />
            <Pairing
              bg="muted"
              fg="muted-foreground"
              title="muted → muted-foreground"
              note="quiet panels"
            />
            <Pairing
              bg="accent"
              fg="accent-foreground"
              title="accent → accent-foreground"
              note="solid accent fills"
            />
            <Pairing
              bg="destructive"
              fg="destructive-foreground"
              title="destructive → *-foreground"
            />
            <Pairing bg="info" fg="info-foreground" title="info → info-foreground" />
          </div>
        </Section>

        {/* ---------------------------------------------------------------- */}
        <Section
          title="Text on dark backgrounds"
          lead="On ink surfaces the palette lifts: body text is bright, and the base accent is legible for links. Keep long-form text on foreground / muted-foreground — solid signal fills are for chips and buttons, not paragraphs."
        >
          <ThemePanel theme="dark" title="Dark surface">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-3">
                <p className="text-sm text-foreground">
                  <span className="font-medium">Body copy</span> uses{" "}
                  <code className="text-accent">foreground</code>.
                </p>
                <p className="text-sm text-muted-foreground">
                  Secondary copy uses <code>muted-foreground</code>.
                </p>
                <p className="text-sm text-foreground">
                  This{" "}
                  <a href="#dark" className="text-accent underline underline-offset-2">
                    accent-coloured link
                  </a>{" "}
                  uses the base <code>accent</code> — bright enough on ink.
                </p>
                <Verdict ok>Do — foreground / muted-foreground / accent link</Verdict>
              </div>
              <div className="space-y-3">
                <p className="text-sm" style={{ color: "var(--accent-deep)" } as CSSProperties}>
                  Don't set body or links in <code>accent-deep</code> — it's tuned for light and
                  goes murky on ink.
                </p>
                <div className="rounded-[var(--radius-sm)] bg-destructive p-3 text-sm text-destructive-foreground">
                  Don't wrap paragraphs in a solid signal fill — reserve solids for badges/buttons.
                </div>
                <Verdict ok={false}>Don't — accent-deep text / solid fills behind prose</Verdict>
              </div>
            </div>
          </ThemePanel>
        </Section>

        {/* ---------------------------------------------------------------- */}
        <Section
          title="Text on white / paper (light) backgrounds"
          lead="On paper the accent must go deep for text-weight use: the bright base cyan fails AA as small text on a light surface. Use accent-deep for links, and the AA-tuned muted-foreground (a hair darker than the raw --mlz-muted primitive) for secondary copy."
        >
          <ThemePanel theme="light" title="Light surface">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-3">
                <p className="text-sm text-foreground">
                  <span className="font-medium">Body copy</span> uses <code>foreground</code> (ink).
                </p>
                <p className="text-sm text-muted-foreground">
                  Secondary copy uses <code>muted-foreground</code> (AA on paper).
                </p>
                <p className="text-sm text-foreground">
                  This{" "}
                  <a
                    href="#light"
                    className="underline underline-offset-2"
                    style={{ color: "var(--accent-deep)" } as CSSProperties}
                  >
                    accent-deep link
                  </a>{" "}
                  uses <code>accent-deep</code> for contrast.
                </p>
                <Verdict ok>Do — foreground / muted-foreground / accent-deep link</Verdict>
              </div>
              <div className="space-y-3">
                <p className="text-sm" style={{ color: "var(--accent)" } as CSSProperties}>
                  Don't set text in the base <code>accent</code> on paper — bright cyan on off-white
                  misses AA.
                </p>
                <p className="text-sm" style={{ color: "var(--mlz-muted)" } as CSSProperties}>
                  Don't reach for the raw <code>--mlz-muted</code> primitive for text — it's lighter
                  and clears only ~4:1.
                </p>
                <Verdict ok={false}>Don't — base accent as text / raw primitives</Verdict>
              </div>
            </div>
          </ThemePanel>
        </Section>

        {/* ---------------------------------------------------------------- */}
        <Section
          title="Solid fills vs. subtle tints"
          lead="Each accent/signal has a solid (emphasis) and a *-subtle tint (calm tinted panels that recompute against the current background). Solids carry short labels; subtle tints host readable prose with the normal foreground on top."
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-[var(--radius-sm)] bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground">
                  accent
                </span>
                <span className="rounded-[var(--radius-sm)] bg-destructive px-2.5 py-1 text-xs font-medium text-destructive-foreground">
                  destructive
                </span>
                <span className="rounded-[var(--radius-sm)] bg-success px-2.5 py-1 text-xs font-medium text-success-foreground">
                  success
                </span>
              </div>
              <Verdict ok>Solid = short emphasis (badges, buttons)</Verdict>
            </div>
            <div className="space-y-3">
              <div className="rounded-[var(--radius-md)] border border-border bg-info-subtle p-4 text-sm text-foreground">
                A <code>*-subtle</code> panel keeps the normal <code>foreground</code> on top and
                stays readable — the right home for tinted callouts and long text.
              </div>
              <Verdict ok>Subtle tint = readable tinted surface</Verdict>
            </div>
          </div>
        </Section>

        {/* ---------------------------------------------------------------- */}
        <Section
          title="Read the semantic layer only"
          lead="Primitives (--mlz-*) are the source of truth but do not adapt to theme — they hold their one value. Components and consumers read the semantic roles (background, foreground, primary, accent, border, ring, signals) and their Tailwind utilities. That single indirection is what makes light/dark and the five accents 'just work'."
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-[var(--radius-md)] border border-border bg-card p-4">
              <Verdict ok>Do</Verdict>
              <pre className="mt-2 overflow-x-auto font-mono text-xs text-foreground">
                {`<div className="bg-card text-card-foreground border-border" />
color: var(--foreground);`}
              </pre>
            </div>
            <div className="rounded-[var(--radius-md)] border border-border bg-card p-4">
              <Verdict ok={false}>Don't</Verdict>
              <pre className="mt-2 overflow-x-auto font-mono text-xs text-foreground">
                {`<div className="bg-[#ecebe4] text-[#1a1a18]" />
color: var(--mlz-ink);  /* frozen — won't invert */`}
              </pre>
            </div>
          </div>
        </Section>

        {/* ---------------------------------------------------------------- */}
        <Section
          title="Theming your app"
          lead="The package ships a runtime so a consumer gets light/dark + accent switching with persistence and no flash. Wrap the app in <ThemeProvider>, drive it with useTheme(), and inline themeInitScript() in <head> before your styles."
        >
          <div className="rounded-[var(--radius-md)] border border-border bg-card p-4">
            <pre className="overflow-x-auto font-mono text-xs text-foreground">
              {`import { ThemeProvider, useTheme, themeInitScript } from "@martinzachariassen/design";

// 1. No-flash: run before paint (e.g. Next.js <head>, or index.html).
<script dangerouslySetInnerHTML={{ __html: themeInitScript() }} />

// 2. Provide the context once at the root.
<ThemeProvider defaultTheme="system" defaultAccent="cyan">
  <App />
</ThemeProvider>

// 3. Read + set it anywhere.
function ThemeToggle() {
  const { resolvedTheme, setTheme, accent, setAccent } = useTheme();
  return (
    <button onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>
      {resolvedTheme}
    </button>
  );
}`}
            </pre>
          </div>
        </Section>
      </div>
    </div>
  ),
};
