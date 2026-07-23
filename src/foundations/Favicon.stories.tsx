import type { Meta, StoryObj } from "@storybook/react-vite";
import { BrandLockup, BrandMark } from "../components/brand-mark";

const meta = {
  title: "Foundations/Brand & Favicon",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const FAVICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
  <rect x="1" y="1" width="30" height="30" rx="6" fill="#1a1a18"/>
  <path d="M9 22.5 V10 L16 18.5 L23 10 V22.5" fill="none"
        stroke="#ecebe4" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
  <rect x="24" y="19" width="3.4" height="3.4" rx="0.6" fill="#5ec6cf"/>
</svg>`;

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
    <section className="mt-12">
      <h2 className="mb-1 font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground">
        {title}
      </h2>
      {hint ? (
        <p className="mb-4 max-w-2xl font-mono text-[13px] text-muted-foreground">{hint}</p>
      ) : null}
      {children}
    </section>
  );
}

export const Brand: Story = {
  render: () => (
    <div className="min-h-screen bg-background px-8 py-14 text-foreground sm:px-16">
      <div className="mx-auto max-w-5xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
          Foundations
        </p>
        <h1 className="mt-3 font-hand text-5xl">Brand & Favicon</h1>
        <p className="mt-4 max-w-2xl font-mono text-sm leading-relaxed text-muted-foreground">
          The <span className="text-foreground">MLZ monogram</span> — a geometric{" "}
          <span className="text-foreground">M</span> with a terminal caret on a tight ink tile.
          Built from tokens, so it inverts with the theme and adopts the active accent. Everything
          below is the same <code className="text-foreground">&lt;BrandMark /&gt;</code> component.
        </p>

        <Section
          title="The mark"
          hint="Tile for app icons & favicons; glyph for inline / wordmark use."
        >
          <div className="flex flex-wrap items-end gap-10">
            <figure className="flex flex-col items-center gap-3">
              <BrandMark size={96} />
              <figcaption className="font-mono text-[11px] text-muted-foreground">tile</figcaption>
            </figure>
            <figure className="flex flex-col items-center gap-3">
              <BrandMark variant="glyph" size={96} className="text-foreground" />
              <figcaption className="font-mono text-[11px] text-muted-foreground">glyph</figcaption>
            </figure>
            <figure className="flex flex-col items-center gap-3">
              <BrandLockup />
              <figcaption className="font-mono text-[11px] text-muted-foreground">
                lockup
              </figcaption>
            </figure>
          </div>
        </Section>

        <Section
          title="Favicon sizes"
          hint="The glyph holds down to 16px. Ship an SVG favicon + a 180px apple-touch-icon + a 512px maskable PNG."
        >
          <div className="flex flex-wrap items-end gap-8">
            {[16, 32, 48, 64, 180].map((s) => (
              <figure key={s} className="flex flex-col items-center gap-2">
                <div className="flex size-[192px] items-center justify-center rounded-[var(--radius-md)] border border-dashed border-border">
                  <BrandMark size={s} />
                </div>
                <figcaption className="font-mono text-[11px] text-muted-foreground">
                  {s}×{s}
                </figcaption>
              </figure>
            ))}
          </div>
        </Section>

        <Section
          title="On browser chrome"
          hint="How it reads in a tab, dark and light — the caret survives, the M anchors."
        >
          <div className="flex flex-wrap gap-4">
            {[
              ["#ecebe4", "#1a1a18", "light tab"],
              ["#232320", "#ecebe4", "dark tab"],
            ].map(([bg, fg, label]) => (
              <div
                key={label}
                className="flex items-center gap-2 rounded-t-[var(--radius-md)] border border-border px-3 py-2"
                style={{ background: bg }}
              >
                <BrandMark size={16} />
                <span className="font-mono text-[11px]" style={{ color: fg }}>
                  mlz.design — {label}
                </span>
              </div>
            ))}
          </div>
        </Section>

        <Section
          title="Export recipe"
          hint="Fixed brand hex (no theme vars) for a portable static asset. Generate PNGs / .ico from this SVG."
        >
          <pre className="overflow-x-auto rounded-[var(--radius-md)] border border-border bg-card p-4 font-mono text-[12px] leading-relaxed text-foreground">
            {FAVICON_SVG}
          </pre>
          <div className="mt-4 grid gap-3 font-mono text-[12px] text-muted-foreground sm:grid-cols-2">
            <div className="rounded-[var(--radius-md)] border border-border p-4">
              <p className="mb-2 uppercase tracking-[0.14em] text-foreground">Files to emit</p>
              <ul className="space-y-1">
                <li>favicon.svg — the source above</li>
                <li>favicon.ico — 32 + 16 (bundled)</li>
                <li>apple-touch-icon.png — 180×180</li>
                <li>icon-512-maskable.png — 512, ~12% safe padding</li>
              </ul>
            </div>
            <div className="rounded-[var(--radius-md)] border border-border p-4">
              <p className="mb-2 uppercase tracking-[0.14em] text-foreground">Head tags</p>
              <pre className="whitespace-pre-wrap leading-relaxed">{`<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
<link rel="icon" href="/favicon.ico" sizes="32x32" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
<meta name="theme-color" content="#1a1a18" />`}</pre>
            </div>
          </div>
        </Section>
      </div>
    </div>
  ),
};
