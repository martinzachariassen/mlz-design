import type { Meta, StoryObj } from "@storybook/react-vite";
import { accents } from "../tokens";

const meta = {
  title: "Platforms/SwiftUI",
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

/** One row: a live swatch, the CSS role it comes from, and the Swift accessor. */
function ColorRow({ swatch, css, swift }: { swatch: string; css: string; swift: string }) {
  return (
    <div className="flex items-center gap-4">
      <span
        className="size-10 shrink-0 rounded-[var(--radius-md)] border border-border"
        style={{ background: swatch }}
      />
      <code className="w-44 font-mono text-[13px] text-muted-foreground">{css}</code>
      <code className="font-mono text-[13px] text-foreground">{swift}</code>
    </div>
  );
}

const SEMANTIC: [string, string, string][] = [
  ["var(--background)", "background", "MLZColor.background"],
  ["var(--foreground)", "foreground", "MLZColor.foreground"],
  ["var(--primary)", "primary", "MLZColor.primary"],
  ["var(--accent)", "accent", "MLZColor.accent"],
  ["var(--muted-foreground)", "muted-foreground", "MLZColor.mutedForeground"],
  ["var(--border)", "border", "MLZColor.border"],
  ["var(--destructive)", "destructive", "MLZColor.destructive"],
  ["var(--success)", "success", "MLZColor.success"],
  ["var(--warning)", "warning", "MLZColor.warning"],
  ["var(--info)", "info", "MLZColor.info"],
];

const CODE = `import SwiftUI
import MLZDesign

struct DeployCard: View {
    var body: some View {
        VStack(alignment: .leading, spacing: MLZSpacing.md) {
            Text("DEPLOY")
                .font(MLZFont.mono(12))
                .foregroundStyle(MLZColor.mutedForeground)
            Text("Ship it")
                .font(MLZFont.hand(28))
                .foregroundStyle(MLZColor.foreground)
        }
        .padding(MLZSpacing.lg)
        .background(MLZColor.card)
        .clipShape(RoundedRectangle(cornerRadius: MLZRadius.lg))
        .overlay(
            RoundedRectangle(cornerRadius: MLZRadius.lg)
                .stroke(MLZColor.border, lineWidth: 1)
        )
        .tint(MLZColor.accent(.cyan))
        .animation(MLZMotion.standard, value: isHovered)
    }
}`;

function Code({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-[var(--radius-lg)] border border-border bg-secondary/50 p-5 font-mono text-[12.5px] leading-relaxed text-foreground">
      <code>{children}</code>
    </pre>
  );
}

/**
 * The native side of the system. Colour, type, spacing, radius and motion are
 * generated from the same tokens as the web package (`bun run gen:swift`) into a
 * small SwiftUI package, so iOS/macOS apps inherit the exact MLZ look. Swatches
 * below render the web (OKLCH) values; the generator converts each to sRGB for
 * `Color`. Flip Theme/Accent in the toolbar — the Swift semantic roles are
 * light/dark adaptive the same way.
 */
export const Overview: Story = {
  render: () => (
    <div className="min-h-screen bg-background px-8 py-14 text-foreground sm:px-16">
      <div className="mx-auto max-w-5xl">
        <Kicker>Platforms</Kicker>
        <h1 className="mt-3 font-hand text-5xl">SwiftUI · iOS</h1>
        <p className="mt-4 max-w-2xl font-mono text-sm leading-relaxed text-muted-foreground">
          One source of truth, two platforms. The <code className="text-foreground">MLZDesign</code>{" "}
          Swift package is <span className="text-foreground">generated</span> from{" "}
          <code className="text-foreground">src/tokens.ts</code> +{" "}
          <code className="text-foreground">theme.css</code> — no hand-copied hex, no drift. It
          ships as pure SwiftUI (no dependencies): <code className="text-foreground">MLZColor</code>
          , <code className="text-foreground">MLZFont</code>,{" "}
          <code className="text-foreground">MLZSpacing</code>,{" "}
          <code className="text-foreground">MLZRadius</code>,{" "}
          <code className="text-foreground">MLZMotion</code>.
        </p>

        <Section
          title="Consume it"
          hint="Add the swift/ package by path (or the repo subpath), then import MLZDesign. Semantic colours are already light/dark adaptive; bundle the four fonts and MLZFont resolves them."
        >
          <Code>{CODE}</Code>
        </Section>

        <Section
          title="Colour — semantic roles"
          hint="Every CSS role has a Swift twin. The web authors OKLCH; the generator emits an 8-bit sRGB Color and a light/dark dynamic pair for each."
        >
          <div className="space-y-3">
            {SEMANTIC.map(([swatch, css, swift]) => (
              <ColorRow key={css} swatch={swatch} css={css} swift={swift} />
            ))}
          </div>
        </Section>

        <Section
          title="Colour — accent families"
          hint="The five families ship as MLZColor.Accent. Swap the whole accent with MLZColor.accent(.rust) / MLZColor.palette(.blue) — the same swap data-accent does on the web."
        >
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {(Object.keys(accents) as (keyof typeof accents)[]).map((name) => (
              <div
                key={name}
                className="flex items-center gap-3 rounded-[var(--radius-md)] border border-border p-3"
              >
                <span
                  className="size-9 shrink-0 rounded-[var(--radius-sm)]"
                  style={{ background: accents[name].base }}
                />
                <span
                  className="size-9 shrink-0 rounded-[var(--radius-sm)]"
                  style={{ background: accents[name].deep }}
                />
                <code className="font-mono text-[13px] text-foreground">.accent(.{name})</code>
              </div>
            ))}
          </div>
        </Section>

        <Section
          title="Type"
          hint="Family names + Font helpers. Register the fonts in your app (bundle the .ttf + UIAppFonts); Font.custom falls back to the system face if one is missing."
        >
          <div className="space-y-4">
            {[
              ["font-hand", "MLZFont.hand(_:)", "Ship it faster"],
              ["font-mono", "MLZFont.mono(_:)", "DEPLOY / v0.2.0"],
              ["font-grotesk", "MLZFont.grotesk(_:)", "A design system"],
              ["font-serif", "MLZFont.serif(_:)", "Editorial, by design"],
            ].map(([cls, swift, sample]) => (
              <div key={swift} className="flex items-baseline gap-5">
                <code className="w-48 shrink-0 font-mono text-[13px] text-muted-foreground">
                  {swift}
                </code>
                <span className={`${cls} text-2xl text-foreground`}>{sample}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section
          title="Scale — spacing · radius · motion"
          hint="The rest of the token layer, native. Spacing is a 4pt grid; radius stays tight/technical; motion carries the house easing as ready Animations."
        >
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-[var(--radius-lg)] border border-border p-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                MLZSpacing
              </p>
              <p className="mt-3 font-mono text-[13px] text-foreground">xs 4 · sm 8 · md 12</p>
              <p className="font-mono text-[13px] text-foreground">base 16 · lg 24 · xl 32</p>
              <p className="mt-1 font-mono text-[12px] text-muted-foreground">
                step(_:) · 4pt grid
              </p>
            </div>
            <div className="rounded-[var(--radius-lg)] border border-border p-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                MLZRadius
              </p>
              <div className="mt-3 flex items-end gap-2">
                {(
                  [
                    ["sm", 2],
                    ["md", 4],
                    ["lg", 6],
                    ["xl", 10],
                  ] as const
                ).map(([label, r]) => (
                  <div key={label} className="flex flex-col items-center gap-1">
                    <span
                      className="size-10 border border-accent bg-accent-subtle"
                      style={{ borderRadius: r }}
                    />
                    <code className="font-mono text-[11px] text-muted-foreground">{label}</code>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[var(--radius-lg)] border border-border p-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                MLZMotion
              </p>
              <p className="mt-3 font-mono text-[13px] text-foreground">easeOut · easeInOut</p>
              <p className="font-mono text-[13px] text-foreground">standard</p>
              <p className="mt-1 font-mono text-[12px] text-muted-foreground">
                .15 / .3 / .9s durations
              </p>
            </div>
          </div>
        </Section>
      </div>
    </div>
  ),
};
