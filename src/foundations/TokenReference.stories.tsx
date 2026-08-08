import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  accents,
  animations,
  breakpoints,
  colors,
  fonts,
  motion,
  radius,
  signals,
} from "../tokens";

const meta = {
  title: "Reference/Tokens",
  tags: ["!autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Rendered straight from `src/tokens.ts`, so this page cannot drift from the
 * values it documents — if a token changes, the table changes with it.
 *
 * These are the **primitives**: the raw MLZ brand values, exported at
 * `@martinzachariassen/design/tokens` for the times you need them outside CSS
 * (charts, canvas, email, framer-motion). Components never read them directly —
 * they read the semantic layer. See **Foundations → Colour** for that map, and
 * **Get started → Theming** for how to override it.
 */
export const Tokens: Story = {
  render: () => (
    <div className="min-h-screen bg-background px-8 py-14 text-foreground">
      <div className="mx-auto max-w-4xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
          Reference
        </p>
        <h1 className="mt-3 font-hand text-5xl">Tokens</h1>
        <p className="mt-5 max-w-2xl font-mono text-sm leading-relaxed text-muted-foreground">
          Every value on this page is read from <Mono>src/tokens.ts</Mono> at render time — the same
          object exported as <Mono>@martinzachariassen/design/tokens</Mono>. It is the JS mirror of{" "}
          <Mono>styles/theme.css</Mono>, kept in sync by hand.
        </p>

        <Section title="Colour · paper & ink">
          <Swatches entries={Object.entries(colors)} />
        </Section>

        <Section title="Colour · signals">
          <Swatches entries={Object.entries(signals)} />
          <Note>
            The CSS role for <Mono>danger</Mono> is named <Mono>--destructive</Mono>. That rename is
            the one place the JS mirror and the stylesheet deliberately disagree.
          </Note>
        </Section>

        <Section title="Colour · accent families">
          <Swatches
            entries={Object.entries(accents).flatMap(([name, pair]) => [
              [name, pair.base] as const,
              [`${name} · deep`, pair.deep] as const,
            ])}
          />
          <Note>
            Switch families at runtime with <Mono>data-accent</Mono> on any element — try the Accent
            control in the toolbar.
          </Note>
        </Section>

        <Section title="Type">
          <Table
            head={["Token", "Stack", "Sample"]}
            rows={Object.entries(fonts).map(([name, stack]) => [
              <Mono key="n">fonts.{name}</Mono>,
              <span key="s" className="text-[11px] text-muted-foreground">
                {stack}
              </span>,
              <span key="p" style={{ fontFamily: stack }} className="text-lg">
                Handled with care
              </span>,
            ])}
          />
        </Section>

        <Section title="Motion">
          <Table
            head={["Token", "Value"]}
            rows={Object.entries(motion).map(([name, value]) => [
              <Mono key="n">motion.{name}</Mono>,
              <Mono key="v">{value}</Mono>,
            ])}
          />
          <Note>
            Every animation collapses under <Mono>prefers-reduced-motion</Mono>, and{" "}
            <Mono>data-motion="off"</Mono> stops them outright — the Motion control in the toolbar
            drives that attribute.
          </Note>
        </Section>

        <Section title="Animations">
          <Table
            head={["Token", "Shorthand"]}
            rows={Object.entries(animations).map(([name, value]) => [
              <Mono key="n">animations.{name}</Mono>,
              <Mono key="v">{value}</Mono>,
            ])}
          />
        </Section>

        <Section title="Radius & breakpoints">
          <Table
            head={["Token", "Value"]}
            rows={[
              ...Object.entries(radius).map(([name, value]) => [
                <Mono key="n">radius.{name}</Mono>,
                <Mono key="v">{value}</Mono>,
              ]),
              ...Object.entries(breakpoints).map(([name, value]) => [
                <Mono key="n">breakpoints.{name}</Mono>,
                <Mono key="v">{value}</Mono>,
              ]),
            ]}
          />
          <Note>
            The breakpoint ladder mirrors Tailwind v4's defaults, so <Mono>md:</Mono> in a class and{" "}
            <Mono>breakpoints.md</Mono> in JS name the same threshold. This Storybook's viewport
            presets are generated from it.
          </Note>
        </Section>
      </div>
    </div>
  ),
};

/* ── page-local presentation helpers ──────────────────────────────────────── */

function Mono({ children }: { children: React.ReactNode }) {
  return <code className="font-mono text-[13px] text-foreground">{children}</code>;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-14">
      <h2 className="mb-5 font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-4 max-w-2xl font-mono text-[13px] leading-relaxed text-muted-foreground">
      {children}
    </p>
  );
}

function Swatches({ entries }: { entries: ReadonlyArray<readonly [string, string]> }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {entries.map(([name, value]) => (
        <div
          key={name}
          className="flex items-center gap-3 rounded-[var(--radius-md)] border border-border p-3"
        >
          <span
            aria-hidden="true"
            className="size-10 shrink-0 rounded-[var(--radius-sm)] border border-border"
            style={{ background: value }}
          />
          <span className="min-w-0">
            <span className="block font-mono text-xs font-bold uppercase tracking-[0.1em]">
              {name}
            </span>
            <span className="block truncate font-mono text-[11px] text-muted-foreground">
              {value}
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}

function Table({ head, rows }: { head: string[]; rows: React.ReactNode[][] }) {
  return (
    <div className="overflow-x-auto rounded-[var(--radius-md)] border border-border">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-border">
            {head.map((cell) => (
              <th
                key={cell}
                scope="col"
                className="px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground"
              >
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            // Row order is the token object's key order and never reorders, so the
            // index is a stable identity here.
            // biome-ignore lint/suspicious/noArrayIndexKey: static, never-reordered rows
            <tr key={i} className="border-b border-border last:border-0">
              {row.map((cell, j) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: static, never-reordered cells
                <td key={j} className="px-4 py-2.5 align-middle">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
