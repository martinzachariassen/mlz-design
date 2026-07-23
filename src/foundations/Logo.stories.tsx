import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties } from "react";
import { BrandLockup, BrandMark, BrandWordmark } from "../components/brand-mark";
import { GridBackground } from "../components/grid-background";

const meta = {
  title: "Foundations/Logo",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const M_POINTS =
  "7,25 7,7 12,7 16,14.5 20,7 25,7 25,25 20.6,25 20.6,13.6 17.4,19.4 14.6,19.4 11.4,13.6 11.4,25";

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
      {children}
    </p>
  );
}

function Section({
  n,
  title,
  hint,
  children,
}: {
  n: string;
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-14">
      <h2 className="mb-1 font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground">
        {n} · {title}
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
          The MLZ identity is a two-part system: the{" "}
          <span className="text-foreground">Block&nbsp;M</span> mark for every icon duty and the{" "}
          <BrandWordmark size={13} className="align-baseline text-foreground" /> wordmark for every
          type duty. All three building blocks are the same token-driven components (
          <code className="text-foreground">BrandMark</code>,{" "}
          <code className="text-foreground">BrandWordmark</code>,{" "}
          <code className="text-foreground">BrandLockup</code>), so they re-theme with light/dark
          and the accent switch. Fixed — do not redraw, restyle or extend either part.
        </p>

        <Section
          n="01"
          title="The system"
          hint="Division of labour is absolute: the mark appears wherever an icon is needed; the wordmark wherever the name is set in type. The lockup pairs them when both roles meet."
        >
          <div className="grid gap-5 sm:grid-cols-3">
            <Tile label="The mark — Block M">
              <BrandMark size={88} />
            </Tile>
            <Tile label="The wordmark — mlz.">
              <BrandWordmark size={44} />
            </Tile>
            <Tile label="The lockup — mark + wordmark">
              <BrandLockup size={38} />
            </Tile>
          </div>
        </Section>

        <Section
          n="02"
          title="Construction"
          hint="The letter is a solid polygon on a 32×32 grid — no strokes, no rounding. The wordmark is Space Mono 700, lowercase, tracked −0.03em, and the period is never omitted."
        >
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="flex items-center justify-center gap-7 rounded-[var(--radius-lg)] border border-border p-6">
              <BrandMark size={140} />
              <svg width={140} height={140} viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <rect
                  x="1"
                  y="1"
                  width="30"
                  height="30"
                  rx="6"
                  fill="none"
                  stroke="var(--border)"
                  strokeWidth="0.5"
                  strokeDasharray="1.5 1.5"
                />
                <polygon
                  points={M_POINTS}
                  fill="none"
                  stroke="var(--foreground)"
                  strokeWidth="0.5"
                />
                <line
                  x1="7"
                  y1="28.5"
                  x2="11.4"
                  y2="28.5"
                  stroke="var(--accent)"
                  strokeWidth="0.5"
                />
                <text
                  x="9.2"
                  y="31.2"
                  fill="var(--accent)"
                  fontFamily="var(--font-mono)"
                  fontSize="2.4"
                  textAnchor="middle"
                >
                  4.4
                </text>
              </svg>
            </div>
            <ul className="flex flex-col justify-center gap-2 rounded-[var(--radius-lg)] border border-border px-6 py-5 font-mono text-[12px] leading-relaxed text-muted-foreground">
              <li>
                <span className="text-foreground">Grid</span> — 32×32 units, tile inset 1, radius 6
                (18.75%)
              </li>
              <li>
                <span className="text-foreground">Letter</span> — solid polygon, no strokes, no
                rounding
              </li>
              <li>
                <span className="text-foreground">Stems</span> — 4.4 units wide, flush to cap and
                baseline
              </li>
              <li>
                <span className="text-foreground">Apex</span> — outer V dips to 14.5, counter valley
                at 19.4
              </li>
              <li>
                <span className="text-foreground">Wordmark</span> — Space Mono 700, lowercase,
                tracking −0.03em
              </li>
              <li>
                <span className="text-foreground">Period</span> — always the accent colour; never
                omitted
              </li>
            </ul>
          </div>
          <pre className="mt-4 overflow-x-auto rounded-[var(--radius-lg)] border border-border px-5 py-4 font-mono text-[11px] leading-relaxed text-muted-foreground">
            <span className="text-foreground">polygon</span> {M_POINTS}
          </pre>
        </Section>

        <Section
          n="03"
          title="Lockups"
          hint="Mark height = 1.45 × wordmark size. Gap = 0.5 × wordmark size. Horizontal is primary; stacked suits square canvases; the tagline joins only at 40px+ marks."
        >
          <div className="grid gap-5 sm:grid-cols-3">
            <Tile label="Horizontal · primary">
              <BrandLockup size={40} />
            </Tile>
            <Tile label="Stacked">
              <BrandLockup orientation="stacked" size={48} />
            </Tile>
            <Tile label="With tagline · 40px+ only">
              <BrandLockup size={48} tagline="Martin Zachariassen" />
            </Tile>
          </div>
        </Section>

        <Section
          n="04"
          title="Colour"
          hint="The mark is always monochrome — ink and paper only, never the accent. Colour lives in exactly one place: the wordmark's period, which follows the active accent (deep on light for AA, base on dark)."
        >
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <Tile label="Primary — ink on paper" className="bg-background">
              <BrandMark size={56} />
            </Tile>
            <Tile label="Reversed — on ink" className="dark bg-background">
              <BrandMark size={56} />
            </Tile>
            <Tile label="Glyph — currentColor, inline">
              <BrandMark variant="glyph" size={56} className="text-foreground" />
            </Tile>
            <Tile label="Period — deep on light, base on dark">
              <div className="flex flex-col items-center gap-3">
                <BrandWordmark size={26} />
                <span className="dark rounded-[var(--radius-sm)] bg-background px-3 py-1.5">
                  <BrandWordmark size={26} className="text-foreground" />
                </span>
              </div>
            </Tile>
          </div>
        </Section>

        <Section
          n="05"
          title="Sizing & clear space"
          hint="Mark minimum 16px. Wordmark minimum 14px; below that, use the mark alone. Horizontal lockup minimum 96px wide. Clear space: 25% of mark height on every side — nothing intrudes."
        >
          <div className="flex flex-wrap items-end gap-8 rounded-[var(--radius-lg)] border border-border p-8">
            {[96, 64, 48, 32, 24, 16].map((s) => (
              <figure key={s} className="flex flex-col items-center gap-2">
                <BrandMark size={s} />
                <figcaption className="font-mono text-[10px] text-muted-foreground">
                  {s}
                  {s === 16 ? " · min" : ""}
                </figcaption>
              </figure>
            ))}
            <div className="ml-auto flex items-center">
              <div className="relative p-5">
                <div className="pointer-events-none absolute inset-0 rounded-[var(--radius-sm)] border border-dashed border-[color-mix(in_oklch,var(--accent)_60%,var(--border))]" />
                <BrandMark size={64} />
              </div>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap items-end gap-10 rounded-[var(--radius-lg)] border border-border p-8">
            {[64, 48, 40].map((s) => (
              <figure key={s} className="flex flex-col items-center gap-3">
                <BrandLockup size={s} tagline={s >= 40 ? "Martin Zachariassen" : ""} />
                <figcaption className="font-mono text-[11px] text-muted-foreground">
                  {s}px mark
                </figcaption>
              </figure>
            ))}
          </div>
        </Section>

        <Section
          n="06"
          title="Applications"
          hint="Header takes the full lockup; favicon, avatar and app icon take the mark alone; the wordmark signs the footer and the social card."
        >
          <div className="grid gap-5 lg:grid-cols-2">
            {/* Header — light */}
            <div className="flex flex-col gap-2.5">
              <div className="overflow-hidden rounded-[var(--radius-lg)] border border-border">
                <div className="flex items-center justify-between border-border border-b px-4 py-3">
                  <BrandLockup size={24} />
                  <div className="flex gap-4 font-mono text-[10px] uppercase tracking-[0.18em]">
                    <span>Work</span>
                    <span>Notes</span>
                    <span className="text-muted-foreground">About</span>
                  </div>
                </div>
                <div className="h-5" />
              </div>
              <figcaption className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                Header — full lockup
              </figcaption>
            </div>
            {/* Header — dark */}
            <div className="flex flex-col gap-2.5">
              <div className="dark overflow-hidden rounded-[var(--radius-lg)] border border-border bg-background text-foreground">
                <div className="flex items-center justify-between border-border border-b px-4 py-3">
                  <BrandLockup size={24} />
                  <div className="flex gap-4 font-mono text-[10px] uppercase tracking-[0.18em]">
                    <span>Work</span>
                    <span>Notes</span>
                    <span className="text-muted-foreground">About</span>
                  </div>
                </div>
                <div className="h-5" />
              </div>
              <figcaption className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                Header — dark · inverts
              </figcaption>
            </div>
            {/* Favicon */}
            <Tile label="Favicon — mark only, 16px" className="relative overflow-hidden">
              <GridBackground cell={16} />
              <div className="relative flex items-center gap-2 rounded-t-[var(--radius-md)] border border-border bg-card px-3 py-2">
                <BrandMark size={16} />
                <span className="font-mono text-[11px]">mlz.dev — Martin Zachariassen</span>
              </div>
            </Tile>
            {/* Avatar + app icon */}
            <Tile label="Avatar · app icon — mark only">
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-3">
                  <div className="flex size-12 items-center justify-center overflow-hidden rounded-full bg-foreground">
                    <BrandMark size={48} tile="transparent" glyph="var(--background)" />
                  </div>
                  <span className="font-grotesk text-sm font-bold">martinzachariassen</span>
                </div>
                <BrandMark size={52} className="rounded-[7px]" />
              </div>
            </Tile>
          </div>

          {/* OG / social card */}
          <div className="mt-5 flex flex-col gap-2.5">
            <div className="relative flex aspect-[1200/630] max-h-80 flex-col justify-center gap-4 overflow-hidden rounded-[var(--radius-lg)] border border-border p-12">
              <GridBackground cell={28} />
              <div className="relative flex flex-col gap-4">
                <BrandMark size={56} />
                <div className="flex items-baseline gap-4">
                  <BrandWordmark size={44} />
                  <span className="font-grotesk text-2xl font-bold">Martin Zachariassen</span>
                </div>
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  Backend engineer · builds it right
                </p>
              </div>
              <span className="absolute right-4 bottom-3 font-mono text-[11px] text-muted-foreground">
                mlz.dev
              </span>
            </div>
            <figcaption className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              OG / social card — 1200×630
            </figcaption>
          </div>
        </Section>

        <Section
          n="07"
          title="Misuse"
          hint="The mark and wordmark are fixed. Don't redraw, restyle or crowd them — and never bring back the retired caret."
        >
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {(
              [
                { label: "Don't stretch", style: { transform: "scaleX(1.5)" } },
                { label: "Don't rotate", style: { transform: "rotate(12deg)" } },
                {
                  label: "Don't add shadow",
                  style: { filter: "drop-shadow(4px 6px 3px rgba(0,0,0,0.4))" },
                },
                { label: "Don't recolour the mark", kind: "hue" },
                { label: "Don't swap the wordmark face", kind: "font" },
                { label: "Don't re-add the retired caret", kind: "caret" },
              ] as { label: string; style?: CSSProperties; kind?: string }[]
            ).map(({ label, style, kind }) => (
              <figure key={label} className="flex flex-col gap-2.5">
                <div className="relative flex min-h-32 items-center justify-center overflow-hidden rounded-[var(--radius-lg)] border border-[color-mix(in_oklch,var(--destructive)_35%,var(--border))] bg-destructive-subtle p-6">
                  {kind === "hue" ? (
                    <BrandMark size={52} tile="oklch(0.53 0.22 18)" glyph="var(--background)" />
                  ) : kind === "font" ? (
                    <span className="font-hand text-3xl lowercase">
                      mlz<span className="text-brand-period">.</span>
                    </span>
                  ) : kind === "caret" ? (
                    <svg width={52} height={52} viewBox="0 0 32 32" fill="none" aria-hidden="true">
                      <rect x="1" y="1" width="30" height="30" rx="6" fill="var(--foreground)" />
                      <polygon points={M_POINTS} fill="var(--background)" />
                      <rect x="24" y="19" width="3.4" height="3.4" rx="0.6" fill="var(--accent)" />
                    </svg>
                  ) : (
                    <div style={style}>
                      <BrandMark size={52} />
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

        <Section
          n="08"
          title="Hand-off"
          hint="Canonical SVG + wordmark CSS. Themed apps read the tile as --foreground and the letter as --background; static exports use the fixed brand values below."
        >
          <pre className="overflow-x-auto rounded-[var(--radius-lg)] border border-border bg-card p-5 font-mono text-[12px] leading-relaxed text-foreground">
            {`<svg viewBox="0 0 32 32" fill="none" role="img" aria-label="MLZ">
  <rect x="1" y="1" width="30" height="30" rx="6" fill="var(--foreground)" />  <!-- tile; omit for glyph -->
  <polygon fill="var(--background)"                                            <!-- glyph: currentColor -->
    points="7,25 7,7 12,7 16,14.5 20,7 25,7 25,25 20.6,25 20.6,13.6
            17.4,19.4 14.6,19.4 11.4,13.6 11.4,25" />
</svg>

/* wordmark — Space Mono Bold, lowercase "mlz" */
font: 700 1em/1 var(--font-mono);
letter-spacing: -0.03em;
.period { color: var(--brand-period); }   /* accent-deep on light · accent on dark */

/* lockup: mark = 1.45 × wordmark size · gap = 0.5 × wordmark size */

/* static exports (favicon.svg, PNGs 16/32/180/512, OG 1200×630) */
tile #1a1a18 · letter #ecebe4 · period oklch(0.48 0.10 200)`}
          </pre>
        </Section>
      </div>
    </div>
  ),
};
