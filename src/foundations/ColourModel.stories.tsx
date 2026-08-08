import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";
import { contrastRatio, inSrgbGamut, toHex } from "../lib/contrast";
import { accentFill, accents, colors, onDark, signalFill, signals, signalsDeep } from "../tokens";

const meta = {
  title: "Foundations/Colour model",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    // The dead-zone demo below deliberately shows unreadable text — that is the
    // teaching point. Running axe's contrast check over an intentional "don't"
    // would only assert that the counter-example is a counter-example.
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } },
  },
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
      {lead ? <div className="mt-4 max-w-2xl text-sm leading-relaxed">{lead}</div> : null}
      <div className="mt-6">{children}</div>
    </section>
  );
}

function Ratio({ value, min }: { value: number; min: number }) {
  const passes = value >= min;
  return (
    <span
      className={`font-mono text-[11px] ${passes ? "text-success-deep" : "text-destructive-deep"}`}
    >
      {value.toFixed(2)}:1 {passes ? "✓" : "✗"}
    </span>
  );
}

/** A rung of one family: the swatch, its source notation, and what it measures. */
function Rung({
  label,
  value,
  on,
  onLabel,
  min,
}: {
  label: string;
  value: string;
  on: string;
  onLabel: string;
  min: number;
}) {
  return (
    <div className="rounded-[var(--radius-md)] border border-border bg-card p-3">
      <div
        className="flex h-14 items-center justify-center rounded-[var(--radius-sm)]"
        style={{ background: value, color: on }}
      >
        <span className="font-mono text-[11px]">{onLabel}</span>
      </div>
      <div className="mt-2.5 font-mono text-[11px] uppercase tracking-[0.06em]">{label}</div>
      <div className="mt-1 font-mono text-[10px] text-muted-foreground">{value}</div>
      <div className="mt-0.5 flex items-center justify-between gap-2">
        <span className="font-mono text-[10px] text-muted-foreground-2">{toHex(value)}</span>
        <Ratio value={contrastRatio(value, on)} min={min} />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------- content */

const FAMILIES = [
  ...Object.entries(accents).map(([name, v]) => ({
    name,
    fill: v.base,
    deep: v.deep,
    mode: accentFill[name as keyof typeof accents],
    group: "accent" as const,
  })),
  ...Object.entries(signals).map(([name, fill]) => ({
    name,
    fill,
    deep: signalsDeep[name as keyof typeof signals],
    mode: signalFill[name as keyof typeof signals],
    group: "signal" as const,
  })),
];

/** Mid-lightness samples, to show the band no fill may occupy. */
const DEAD_ZONE = ["oklch(0.62 0.14 250)", "oklch(0.62 0.14 148)", "oklch(0.62 0.14 45)"];

export const ColourModel: Story = {
  render: () => (
    <div className="min-h-screen bg-background px-8 py-14 text-foreground">
      <div className="mx-auto max-w-5xl">
        <h1 className="font-hand text-5xl">Colour model</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Why the palette is written in OKLCH, why every value is held inside sRGB, and how the
          three rungs decide what a colour may be used for. Every figure on this page is computed
          from the tokens themselves — the same maths the test suite asserts against.
        </p>

        <Section
          title="Notation"
          lead={
            <>
              <p>
                Colour here is authored in <strong>OKLCH</strong> — lightness, chroma, hue — not
                hex. Hex and <code className="font-mono text-[13px]">rgb()</code> name a point in a
                display's colour space, which is fine for storage and useless for reasoning:
                <code className="font-mono text-[13px]"> #2f8adc</code> and
                <code className="font-mono text-[13px]"> #3b9555</code> tell you nothing about which
                is lighter, and lightening a hex value by "20%" shifts its hue.
              </p>
              <p className="mt-3">
                In OKLCH the first number is perceptual lightness, so it means the same thing across
                every hue. That is what lets a{" "}
                <code className="font-mono text-[13px]">data-accent</code> swap change the hue
                without changing weight — and it is why the contrast promises below can be
                structural rather than checked one pair at a time.
              </p>
              <p className="mt-3">
                CMYK is sometimes assumed to be the more modern option. It is the opposite: a
                subtractive <em>print</em> space, older than the web, with a smaller gamut than sRGB
                and no meaning on a screen. The genuinely newer thing is wide gamut — see below.
              </p>
            </>
          }
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[34rem] border-collapse text-left font-mono text-[11px]">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="py-2 pr-4 font-normal uppercase tracking-[0.1em]">Notation</th>
                  <th className="py-2 pr-4 font-normal uppercase tracking-[0.1em]">
                    Reasons about
                  </th>
                  <th className="py-2 font-normal uppercase tracking-[0.1em]">Used here</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border/60">
                  <td className="py-2 pr-4 text-foreground">oklch()</td>
                  <td className="py-2 pr-4">perceptual lightness, chroma, hue</td>
                  <td className="py-2 text-foreground">every chromatic value</td>
                </tr>
                <tr className="border-b border-border/60">
                  <td className="py-2 pr-4 text-foreground">#rrggbb</td>
                  <td className="py-2 pr-4">nothing — an sRGB coordinate</td>
                  <td className="py-2">the neutral paper/ink scale only</td>
                </tr>
                <tr className="border-b border-border/60">
                  <td className="py-2 pr-4 text-foreground">color(display-p3 …)</td>
                  <td className="py-2 pr-4">a wider gamut, same coordinate problem</td>
                  <td className="py-2">no — see Gamut</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 text-foreground">cmyk()</td>
                  <td className="py-2 pr-4">ink on paper, not light on glass</td>
                  <td className="py-2">no — not a screen space</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        <Section
          title="Gamut — why every value stays inside sRGB"
          lead={
            <>
              <p>
                OKLCH can express colours no sRGB screen can show. A browser handles those by
                clipping to the nearest displayable colour — silently, and differently depending on
                the display. That matters more than it sounds: a clipped value is{" "}
                <strong>not the value you measured</strong>, so its contrast figure would be true on
                a P3 laptop and false on an older monitor.
              </p>
              <p className="mt-3">
                So every chromatic token is held inside sRGB on purpose. The perceptual benefits of
                OKLCH are unaffected — they come from the coordinate system, not the gamut — and the
                numbers on this page hold on every screen. The cost is a fractionally less electric
                cyan on a wide-gamut display; the gain is that accessibility claims are not
                hardware-dependent.
              </p>
            </>
          }
        >
          <div className="rounded-[var(--radius-md)] border border-border bg-card p-4 font-mono text-[11px]">
            <div className="text-muted-foreground">Gamut check across every shipped value</div>
            <div className="mt-2 text-success-deep">
              {[
                ...Object.values(signals),
                ...Object.values(signalsDeep),
                ...Object.values(onDark),
                ...Object.values(accents).flatMap((a) => [a.base, a.deep]),
              ].every(inSrgbGamut)
                ? "✓ all inside sRGB — nothing gets clipped"
                : "✗ at least one value would be clipped"}
            </div>
          </div>
        </Section>

        <Section
          title="The ladder"
          lead={
            <>
              <p>
                Every chromatic value sits on one of three rungs, and the rung — not the hue —
                decides what it may be used for.
              </p>
              <ul className="mt-3 space-y-1.5 pl-5 [&>li]:list-disc">
                <li>
                  <strong>base</strong> — the fill rung. A background for its paired foreground.
                  Never a text colour.
                </li>
                <li>
                  <strong>-deep</strong> — the on-light rung. Text, icons and focus rings on a paper
                  surface; clears AA on <em>all three</em> paper tones.
                </li>
                <li>
                  <strong>on-dark</strong> — the same job on an ink surface. Only the two bold
                  families need one; the tints reuse their fill.
                </li>
              </ul>
              <p className="mt-3">
                Fills come in two modes, because no single lightness works for every hue — yellow
                cannot go dark and stay yellow, red cannot go light and stay emphatic.{" "}
                <strong>Tint</strong> fills are light and carry ink text; <strong>bold</strong>{" "}
                fills are dark and carry paper text. The pairing follows the mode, so it is not a
                per-role judgement call.
              </p>
            </>
          }
        >
          {(["accent", "signal"] as const).map((group) => (
            <div key={group} className="mt-8 first:mt-0">
              <h3 className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground-2">
                {group === "accent" ? "Accent families" : "Signals"}
              </h3>
              <div className="space-y-3">
                {FAMILIES.filter((f) => f.group === group).map((f) => {
                  const fg = f.mode === "tint" ? colors.ink : colors.paper;
                  const dark = onDark[f.name as keyof typeof onDark];
                  return (
                    <div key={f.name} className="grid gap-3 sm:grid-cols-[7rem_1fr]">
                      <div className="pt-3">
                        <div className="font-mono text-xs uppercase tracking-[0.1em]">{f.name}</div>
                        <div className="mt-0.5 font-mono text-[10px] text-muted-foreground">
                          {f.mode} fill
                        </div>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-3">
                        <Rung
                          label="base (fill)"
                          value={f.fill}
                          on={fg}
                          onLabel={f.mode === "tint" ? "ink text" : "paper text"}
                          min={4.5}
                        />
                        <Rung
                          label="-deep (on light)"
                          value={f.deep}
                          on={colors.paper}
                          onLabel="on paper"
                          min={4.5}
                        />
                        {dark ? (
                          <Rung
                            label="on dark"
                            value={dark}
                            on={colors.ink}
                            onLabel="ink text"
                            min={4.5}
                          />
                        ) : (
                          <div className="rounded-[var(--radius-md)] border border-dashed border-border p-3 text-[11px] leading-relaxed text-muted-foreground-2">
                            No on-dark rung needed — a tint fill is already light against ink, so{" "}
                            <span className="font-mono">-deep</span> maps back to the fill.
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </Section>

        <Section
          title="The dead zone"
          lead={
            <p>
              Between the two fill modes lies a band — roughly L 0.55 to 0.70 — where a fill can
              carry <em>neither</em> ink nor paper text at AA. Both top out around 4.3:1. There is
              no foreground that rescues a fill placed here; the only fix is to move the fill. This
              is not a rule of thumb, it is arithmetic, and it is exactly where the previous blue,
              rust and success solids sat.
            </p>
          }
        >
          <div className="grid gap-3 sm:grid-cols-3">
            {DEAD_ZONE.map((value) => (
              <div
                key={value}
                className="rounded-[var(--radius-md)] border border-destructive-deep/40 bg-card p-3"
              >
                <div
                  className="flex h-20 flex-col items-center justify-center gap-1 rounded-[var(--radius-sm)]"
                  style={{ background: value }}
                >
                  <span className="font-mono text-[11px]" style={{ color: colors.ink }}>
                    ink {contrastRatio(value, colors.ink).toFixed(2)}:1
                  </span>
                  <span className="font-mono text-[11px]" style={{ color: colors.paper }}>
                    paper {contrastRatio(value, colors.paper).toFixed(2)}:1
                  </span>
                </div>
                <div className="mt-2 font-mono text-[10px] text-muted-foreground">{value}</div>
                <div className="mt-1 font-mono text-[10px] text-destructive-deep">
                  ✗ both foregrounds fail
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section
          title="Reaching for the right rung"
          lead={
            <p>
              Nearly every colour mistake in a component is a rung mistake: a fill used as a text or
              icon colour. The base accent measures 1.82:1 against paper — invisible as text, and
              short of the 3:1 that WCAG 2.1 SC 1.4.11 asks of a focus indicator.
            </p>
          }
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[36rem] border-collapse text-left text-[13px]">
              <thead>
                <tr className="border-b border-border font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
                  <th className="py-2 pr-4 font-normal">You are colouring</th>
                  <th className="py-2 pr-4 font-normal">Reach for</th>
                  <th className="py-2 font-normal">Needs</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["A button or badge background", "bg-accent + text-accent-foreground", "4.5:1"],
                  ["Body text, labels, error messages", "text-*-deep", "4.5:1"],
                  ["An icon or status dot", "text-*-deep", "3:1"],
                  ["A focus ring", "ring-ring (already the deep rung)", "3:1"],
                  ["A tinted surface behind normal text", "bg-*-subtle", "—"],
                ].map(([what, use, needs]) => (
                  <tr key={what} className="border-b border-border/60">
                    <td className="py-2.5 pr-4">{what}</td>
                    <td className="py-2.5 pr-4 font-mono text-[11px] text-accent-deep">{use}</td>
                    <td className="py-2.5 font-mono text-[11px] text-muted-foreground">{needs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            In dark mode <span className="font-mono text-[12px]">-deep</span> maps back to the fill,
            so a component can reach for it unconditionally and be right in both themes. That is the
            whole reason the rung exists as a token rather than as advice.
          </p>
        </Section>
      </div>
    </div>
  ),
};
