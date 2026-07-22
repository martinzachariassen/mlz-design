import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Introduction",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Welcome: Story = {
  render: () => (
    <div className="min-h-screen bg-background px-8 py-16 text-foreground sm:px-16">
      <div className="mx-auto max-w-3xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
          Martin Zachariassen · Design System
        </p>
        <h1 className="mt-4 font-hand text-6xl leading-[0.9] sm:text-7xl">MLZ Design</h1>
        <p className="mt-8 max-w-2xl font-mono text-sm leading-relaxed text-muted-foreground">
          The shared foundation for everything I build — colour, type and style, distilled from{" "}
          <span className="text-foreground">mlz.no</span> into one resilient, installable system. A
          warm paper/ink palette, a house cyan accent, four typefaces, and the technical, hand-drawn
          engineering-notebook feel. Restyle the system here and every app that consumes it follows.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {[
            ["Foundations", "Colours & type — the tokens, live and switchable."],
            ["Components", "Button, Input, Card, Badge — styled purely from tokens."],
            ["Themes", "Toggle light/dark and the five accents in the toolbar."],
          ].map(([title, body]) => (
            <div key={title} className="rounded-[var(--radius-lg)] border border-border p-5">
              <h2 className="font-mono text-xs font-bold uppercase tracking-[0.14em]">{title}</h2>
              <p className="mt-2 font-mono text-[13px] leading-relaxed text-muted-foreground">
                {body}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-12 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          Use the <span className="text-foreground">Theme</span> and{" "}
          <span className="text-foreground">Accent</span> switches in the toolbar ↑
        </p>
      </div>
    </div>
  ),
};
