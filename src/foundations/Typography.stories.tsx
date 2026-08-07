import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties, ReactNode } from "react";

const meta = {
  title: "Foundations/Typography",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function Spec({
  label,
  font,
  size,
  children,
  style,
}: {
  label: string;
  font: string;
  size: string;
  children: string;
  style?: CSSProperties;
}) {
  return (
    <div className="border-b border-border py-8">
      <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </div>
      <div
        className="leading-[1.05] text-foreground"
        style={{ fontFamily: `var(--${font})`, fontSize: size, ...style }}
      >
        {children}
      </div>
    </div>
  );
}

export const Specimens: Story = {
  render: () => (
    <div className="min-h-screen bg-background px-8 py-14 text-foreground">
      <div className="mx-auto max-w-4xl">
        <h1 className="font-hand text-5xl">Typography</h1>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
          Two workhorse faces do the daily work — <b>Space Grotesk</b> for everything you read and{" "}
          <b>Space Mono</b> for data — with a hand and a serif face reserved for personality. Reach
          for a role with{" "}
          <span className="font-mono text-foreground">
            font-sans / font-mono / font-grotesk / font-serif / font-hand
          </span>
          .
        </p>

        <Spec
          label="Space Grotesk — sans / grotesk · the reading face (body, UI, prose, headings)"
          font="font-grotesk"
          size="clamp(2rem, 6vw, 3.5rem)"
          style={{ fontWeight: 700, letterSpacing: "-0.02em" }}
        >
          What sites can infer about you
        </Spec>
        <Spec
          label="Space Mono — mono · data, code, IDs & tracked eyebrows (never long prose)"
          font="font-mono"
          size="clamp(1.25rem, 4vw, 2.25rem)"
          style={{ fontWeight: 700, letterSpacing: "-0.01em" }}
        >
          203.0.113.7 · AS2119
        </Spec>
        <Spec
          label="Instrument Serif — serif · editorial / long-form accent (opt-in)"
          font="font-serif"
          size="clamp(2.25rem, 7vw, 4rem)"
        >
          Distributed architecture
        </Spec>
        <Spec
          label="Architects Daughter — hand · brand personality display only (never body)"
          font="font-hand"
          size="clamp(2.5rem, 8vw, 4rem)"
        >
          Martin Zachariassen
        </Spec>
      </div>
    </div>
  ),
};

/* --------------------------------------------------------------------------- */

function Row({
  role,
  use,
  avoid,
  className,
}: {
  role: ReactNode;
  use: string;
  avoid: string;
  className?: string;
}) {
  return (
    <div className="grid grid-cols-[9rem_1fr_1fr] gap-x-6 border-b border-border py-4 text-sm max-sm:grid-cols-1 max-sm:gap-y-1">
      <div className={className}>{role}</div>
      <div className="text-foreground">
        <span className="mr-2 font-mono text-[10px] uppercase tracking-[0.14em] text-success">
          Use for
        </span>
        {use}
      </div>
      <div className="text-muted-foreground">
        <span className="mr-2 font-mono text-[10px] uppercase tracking-[0.14em] text-destructive">
          Avoid for
        </span>
        {avoid}
      </div>
    </div>
  );
}

function DoDont({
  verdict,
  note,
  children,
}: {
  verdict: "do" | "dont";
  note: string;
  children: ReactNode;
}) {
  const ok = verdict === "do";
  return (
    <div
      className="rounded-md border p-4"
      style={{
        borderColor: ok ? "var(--success)" : "var(--destructive)",
        background: ok ? "var(--success-subtle)" : "var(--destructive-subtle)",
      }}
    >
      <div
        className="mb-3 font-mono text-[11px] font-bold uppercase tracking-[0.14em]"
        style={{ color: ok ? "var(--success)" : "var(--destructive)" }}
      >
        {ok ? "✓ Do" : "✗ Don’t"}
      </div>
      <div className="mb-3">{children}</div>
      <p className="text-xs text-muted-foreground">{note}</p>
    </div>
  );
}

export const Usage: Story = {
  name: "Usage — how & where",
  // This story deliberately renders one sub-AA "Don't" sample (the ad-hoc 40%
  // foreground mix below) to teach the contrast rule, so axe's color-contrast
  // check is turned off for this story only — every other tone shown here uses a
  // token that clears AA and is contrast-checked in the other stories.
  parameters: { a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } } },
  render: () => (
    <div className="min-h-screen bg-background px-8 py-14 text-foreground">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold tracking-[-0.02em]">Using the type system</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          One rule carries most of it: <b>sans for reading, mono for data.</b> Space Grotesk is the
          body/UI face because it is far more legible for running text; Space Mono earns its place
          where a fixed character advance actually helps — IP addresses, hashes, code, and the
          tracked-out eyebrows above sections. The serif and hand faces are accents, not body copy.
        </p>

        {/* Role map */}
        <h2 className="mt-12 mb-2 text-xl font-semibold">Role map</h2>
        <div className="mt-4">
          <Row
            role={<span className="font-grotesk font-semibold">font-sans / grotesk</span>}
            use="Body copy, paragraphs, UI labels, buttons, headings, verdicts, descriptions — anything a person reads as words."
            avoid="Aligning columns of numbers (use mono)."
          />
          <Row
            role={<span className="font-mono">font-mono</span>}
            use="IPs, ASNs, hashes, tokens, code, keyboard keys, and the uppercase tracked eyebrow above a section."
            avoid="Multi-sentence prose or long descriptions — mono is tiring to read in bulk."
          />
          <Row
            role={<span className="font-serif text-lg">font-serif</span>}
            use="Editorial pull quotes, a marketing hero subhead, long-form article intros where you want warmth."
            avoid="Dense UI, data, small sizes."
          />
          <Row
            role={<span className="font-hand text-lg">font-hand</span>}
            use="The wordmark, a signature, one personality moment per page."
            avoid="Anything functional — body, labels, or data. Never as running text."
          />
        </div>

        {/* Do / don't */}
        <h2 className="mt-14 mb-4 text-xl font-semibold">Do &amp; don’t</h2>
        <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
          <DoDont
            verdict="do"
            note="Prose in the sans reading face; the value stays mono so it aligns and reads as data."
          >
            <p className="text-sm leading-relaxed">Your connection looks like a residential ISP.</p>
            <p className="mt-1 font-mono text-sm">203.0.113.7</p>
          </DoDont>
          <DoDont
            verdict="dont"
            note="Monospace body copy is slower to read and cramped at UI sizes. Don’t set paragraphs in mono."
          >
            <p className="font-mono text-sm leading-relaxed">
              Your connection looks like a residential ISP.
            </p>
          </DoDont>

          <DoDont
            verdict="do"
            note="Eyebrow in tracked-out mono; heading in the sans face. Clear hierarchy, each face doing its job."
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              Connection details
            </div>
            <div className="mt-1 text-lg font-semibold tracking-[-0.01em]">
              Where you connect from
            </div>
          </DoDont>
          <DoDont
            verdict="dont"
            note="Don’t reach for the hand/display face as a section heading or label — keep it for the one brand moment."
          >
            <div className="font-hand text-2xl">Connection details</div>
          </DoDont>

          <DoDont
            verdict="do"
            note="AA contrast: body in --foreground, secondary in --muted-foreground, faint captions in --muted-foreground-2 (still ≥4.5:1)."
          >
            <p className="text-sm text-foreground">Primary reading text.</p>
            <p className="text-sm text-muted-foreground">Secondary supporting text.</p>
            <p className="text-sm text-muted-foreground-2">Faint caption / label.</p>
          </DoDont>
          <DoDont
            verdict="dont"
            note="Don’t invent an ad-hoc faint colour below AA (e.g. a 40% foreground mix). Use the --muted-foreground-2 token — it is tuned to stay legible."
          >
            <p
              className="text-sm"
              style={{ color: "color-mix(in oklab, var(--foreground) 40%, var(--background))" }}
            >
              Faint text that fails contrast.
            </p>
          </DoDont>
        </div>

        <p className="mt-10 text-xs text-muted-foreground">
          Contrast: every text tone above (foreground, muted-foreground, muted-foreground-2) clears
          WCAG AA (≥4.5:1) on the paper surfaces and in dark mode. Solid accent/signal fills are for
          badges and buttons, not long-form text.
        </p>
      </div>
    </div>
  ),
};

/* --------------------------------------------------------------------------- */

function Rule({ wcag, title, children }: { wcag: string; title: string; children: ReactNode }) {
  return (
    <div className="border-b border-border py-6">
      <div className="mb-1 flex items-baseline gap-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
          {wcag}
        </span>
        <h3 className="text-base font-semibold tracking-[-0.01em]">{title}</h3>
      </div>
      <div className="text-sm leading-relaxed text-muted-foreground">{children}</div>
    </div>
  );
}

export const Accessibility: Story = {
  name: "Accessibility — legibility rules",
  render: () => (
    <div className="min-h-screen bg-background px-8 py-14 text-foreground">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold tracking-[-0.02em]">Legible by default</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Readability is a system property, not a font choice. The roster is deliberately{" "}
          <b>four faces</b> — one reading face, one data face, two accents — because more typefaces
          cost legibility, layout stability and load time, not the other way around. The rules below
          keep text easy to read at any size; they map to specific WCAG success criteria so
          consuming apps stay compliant by inheriting the system.
        </p>

        <h2 className="mt-12 mb-2 text-xl font-semibold">The rules</h2>
        <div className="mt-4">
          <Rule wcag="WCAG 1.4.4 · Resize text" title="Size in rem, never px">
            Body copy is <b>≥ 1rem (16px)</b>; never take essential text below{" "}
            <span className="font-mono text-foreground">0.75rem</span>. Sizes are authored in{" "}
            <span className="font-mono text-foreground">rem</span> (and the fluid{" "}
            <span className="font-mono text-foreground">clamp()</span> specimens use{" "}
            <span className="font-mono text-foreground">rem</span> bounds) so a reader's browser
            zoom and default-size preference scale the whole UI to 200% without clipping.
          </Rule>
          <Rule wcag="WCAG 1.4.12 · Text spacing" title="Line-height ≥ 1.5, paragraphs ≥ 2× size">
            Running text uses <b>line-height ≥ 1.5</b> (the{" "}
            <span className="font-mono text-foreground">leading-relaxed</span> utility); space
            between paragraphs is <b>≥ 2× the font size</b>. Tight leading (
            <span className="font-mono text-foreground">leading-[1.05]</span>) is for large display
            headings only, where the type is big enough to stay readable.
          </Rule>
          <Rule wcag="Readability · Measure" title="Hold the line length to 45–75 characters">
            Cap reading columns at roughly <b>45–75 characters</b> per line (
            <span className="font-mono text-foreground">max-w-prose</span> ≈ 65ch, or the{" "}
            <span className="font-mono text-foreground">Prose</span> component). Full-width
            paragraphs are the most common readability regression on wide screens.
          </Rule>
          <Rule wcag="Legibility · Weight" title="Body 400–600; skip hairline weights">
            Set body between <b>400 and 600</b>. Space Grotesk ships 400/500/600/700 — don't
            synthesize a lighter weight or lean on 300 for body, and never rely on{" "}
            <span className="font-mono text-foreground">font-synthesis</span> for bold (it's
            disabled in <span className="font-mono text-foreground">base.css</span>). Reserve
            letter-spacing for the tracked-out mono eyebrows; never track out running prose.
          </Rule>
          <Rule wcag="WCAG 1.4.3 · Contrast" title="Use the tuned text tones, not ad-hoc mixes">
            <span className="font-mono text-foreground">text-foreground</span> →{" "}
            <span className="font-mono text-foreground">text-muted-foreground</span> →{" "}
            <span className="font-mono text-foreground">text-muted-foreground-2</span> step down in
            emphasis while all clearing AA (≥4.5:1) in light and dark. Don't invent a faint colour
            below AA — see the "Usage" story for the do/don't.
          </Rule>
          <Rule wcag="Face choice · Function" title="Reading in sans; accents stay accents">
            Long-form and UI text is always the sans reading face. The <b>hand</b> and <b>serif</b>{" "}
            faces are display-only — decorative low-legibility type must never carry body, labels or
            data. This keeps the one non-negotiable a11y rule intact: meaning never depends on a
            hard-to-read face.
          </Rule>
        </div>

        <p className="mt-10 text-xs text-muted-foreground">
          Do we need more fonts for accessibility? No — the opposite. The four roles cover every job
          (read, data, editorial, personality); adding faces would add cognitive load, layout shift
          (CLS) and download weight. Accessibility here comes from the sizing, spacing, contrast and
          face-discipline rules above, all of which apps inherit for free through{" "}
          <span className="font-mono text-foreground">index.css</span> + the semantic tokens.
        </p>
      </div>
    </div>
  ),
};
