import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties } from "react";
import { BrandLockup, BrandMark } from "../components/brand-mark";
import { GridBackground } from "../components/grid-background";

const meta = {
  title: "Foundations/Logo",
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

/** A framed specimen tile with a caption underneath. */
function Tile({
  label,
  children,
  className,
  style,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <figure className="flex flex-col gap-2.5">
      <div
        className={`flex min-h-36 items-center justify-center rounded-[var(--radius-lg)] border border-border p-6 ${className ?? ""}`}
        style={style}
      >
        {children}
      </div>
      <figcaption className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </figcaption>
    </figure>
  );
}

export const Overview: Story = {
  render: () => (
    <div className="min-h-screen bg-background px-8 py-14 text-foreground sm:px-16">
      <div className="mx-auto max-w-5xl">
        <Kicker>Foundations</Kicker>
        <h1 className="mt-3 font-hand text-5xl">Logo</h1>
        <p className="mt-4 max-w-2xl font-mono text-sm leading-relaxed text-muted-foreground">
          Three building blocks — the <span className="text-foreground">mark</span>, the{" "}
          <span className="text-foreground">wordmark</span>, and the{" "}
          <span className="text-foreground">lockup</span> that pairs them. All are the same
          token-driven components (<code className="text-foreground">BrandMark</code>,{" "}
          <code className="text-foreground">BrandLockup</code>), so they re-theme with light/dark
          and the accent switch. Pick the smallest lockup that still carries the wordmark; drop to
          the bare mark only when space is tight.
        </p>

        <Section
          title="Lockups"
          hint="Horizontal is primary (headers, footers, the OG card). Stacked suits square canvases — splash screens, avatars, stickers."
        >
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Tile label="Horizontal · primary">
              <BrandLockup size={44} />
            </Tile>
            <Tile label="Stacked">
              <BrandLockup orientation="stacked" size={52} />
            </Tile>
            <Tile label="Wordmark only">
              <span className="font-hand text-5xl lowercase leading-none">mlz</span>
            </Tile>
          </div>
        </Section>

        <Section
          title="Mark"
          hint="The app-icon / favicon atom. Tile carries its own contrast; glyph inherits currentColor for inline use."
        >
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Tile label="Tile">
              <BrandMark size={72} />
            </Tile>
            <Tile label="Glyph">
              <BrandMark variant="glyph" size={72} className="text-foreground" />
            </Tile>
            <Tile label="Glyph · no caret">
              <BrandMark variant="glyph" size={72} caret={false} className="text-foreground" />
            </Tile>
          </div>
        </Section>

        <Section
          title="Sizing"
          hint="The mark holds down to 16px (favicon). Keep the horizontal lockup at ≥ 112px wide so the wordmark stays legible; below that, use the mark alone."
        >
          <div className="flex flex-wrap items-end gap-10 rounded-[var(--radius-lg)] border border-border p-8">
            {[64, 44, 30, 20].map((s) => (
              <figure key={s} className="flex flex-col items-center gap-3">
                <BrandLockup size={s} tagline={s >= 40 ? "Design System" : ""} />
                <figcaption className="font-mono text-[11px] text-muted-foreground">
                  {s}px mark
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap items-end gap-8 rounded-[var(--radius-lg)] border border-border p-8">
            {[96, 64, 48, 32, 24, 16].map((s) => (
              <figure key={s} className="flex flex-col items-center gap-2">
                <BrandMark size={s} />
                <figcaption className="font-mono text-[10px] text-muted-foreground">{s}</figcaption>
              </figure>
            ))}
          </div>
        </Section>

        <Section
          title="Clear space"
          hint="Keep a margin of at least the mark's corner-radius on every side — roughly one grid square. Nothing (text, edges, other logos) intrudes into the dashed zone."
        >
          <div className="inline-flex rounded-[var(--radius-lg)] border border-border p-10">
            <div className="relative p-8">
              <div className="pointer-events-none absolute inset-0 rounded-[var(--radius-md)] border border-dashed border-[color-mix(in_oklch,var(--accent)_60%,var(--border))]" />
              <BrandLockup size={48} />
            </div>
          </div>
        </Section>

        <Section
          title="On backgrounds"
          hint="The tile gives the mark its own contrast, so it survives on paper, ink and busy surfaces. On a solid accent, use the reversed paper chip; on dark, the whole system inverts."
        >
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <Tile label="Paper" className="bg-background">
              <BrandLockup size={36} tagline="" />
            </Tile>
            <Tile label="Ink · inverts" className="dark bg-background">
              <BrandLockup size={36} tagline="" />
            </Tile>
            <Tile label="Accent · reversed" className="bg-accent">
              <BrandMark
                size={44}
                tile="var(--background)"
                glyph="var(--foreground)"
                accent="var(--foreground)"
              />
            </Tile>
            <Tile label="Busy · tile holds" className="relative overflow-hidden">
              <GridBackground cell={16} />
              <div className="relative">
                <BrandMark size={44} />
              </div>
            </Tile>
          </div>
        </Section>

        <Section title="Misuse" hint="The mark is fixed. Don't redraw, restyle or crowd it.">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {(
              [
                { label: "Don't stretch", style: { transform: "scaleX(1.5)" } },
                { label: "Don't rotate", style: { transform: "rotate(12deg)" } },
                {
                  label: "Don't add shadow",
                  style: { filter: "drop-shadow(4px 6px 3px rgba(0,0,0,0.4))" },
                },
                { label: "Don't recolour", kind: "hue" },
                { label: "Don't swap the wordmark font", kind: "font" },
                { label: "Don't crowd", kind: "crowd" },
              ] as { label: string; style?: CSSProperties; kind?: string }[]
            ).map(({ label, style, kind }) => (
              <figure key={label} className="flex flex-col gap-2.5">
                <div className="relative flex min-h-36 items-center justify-center overflow-hidden rounded-[var(--radius-lg)] border border-[color-mix(in_oklch,var(--destructive)_35%,var(--border))] bg-destructive-subtle p-6">
                  {kind === "hue" ? (
                    <BrandMark size={56} tile="oklch(0.62 0.22 18)" accent="oklch(0.8 0.15 78)" />
                  ) : kind === "font" ? (
                    <span className="font-mono text-3xl lowercase">mlz</span>
                  ) : kind === "crowd" ? (
                    <div className="flex items-center gap-1">
                      <span className="font-mono text-xs uppercase">app</span>
                      <BrandMark size={40} />
                      <span className="font-mono text-xs uppercase">beta</span>
                    </div>
                  ) : (
                    <div style={style}>
                      <BrandMark size={56} />
                    </div>
                  )}
                  <span
                    className="absolute top-2.5 right-2.5 flex size-5 items-center justify-center rounded-full bg-destructive font-mono text-[11px] text-destructive-foreground"
                    aria-hidden
                  >
                    ✕
                  </span>
                </div>
                <figcaption className="font-mono text-[11px] uppercase tracking-[0.14em] text-[color-mix(in_oklch,var(--destructive)_60%,var(--foreground))]">
                  {label}
                </figcaption>
              </figure>
            ))}
          </div>
        </Section>
      </div>
    </div>
  ),
};
