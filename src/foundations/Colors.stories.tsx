import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties, ReactNode } from "react";

const meta = {
  title: "Foundations/Colours",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function Swatch({ token, note }: { token: string; note?: string }) {
  return (
    <div className="overflow-hidden rounded-[var(--radius-md)] border border-border bg-card">
      <div className="h-16" style={{ background: `var(--${token})` } as CSSProperties} />
      <div className="p-2.5">
        <div className="font-mono text-[11px] uppercase tracking-[0.06em] text-foreground">
          {token}
        </div>
        {note ? (
          <div className="mt-0.5 font-mono text-[10px] text-muted-foreground">{note}</div>
        ) : null}
      </div>
    </div>
  );
}

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="mb-4 border-b border-border pb-2.5 font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground">
        {title}
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {children}
      </div>
    </section>
  );
}

export const Palette: Story = {
  render: () => (
    <div className="min-h-screen bg-background px-8 py-14 text-foreground">
      <div className="mx-auto max-w-5xl">
        <h1 className="font-hand text-5xl">Colours</h1>
        <p className="mt-3 max-w-2xl font-mono text-sm text-muted-foreground">
          Semantic tokens — the only layer components read. Switch theme and accent in the toolbar
          to watch every value re-resolve.
        </p>

        <Group title="Surfaces">
          <Swatch token="background" note="paper" />
          <Swatch token="foreground" note="ink" />
          <Swatch token="card" />
          <Swatch token="popover" />
          <Swatch token="muted" note="paper-2" />
          <Swatch token="muted-foreground" />
        </Group>

        <Group title="Emphasis">
          <Swatch token="primary" note="ink" />
          <Swatch token="primary-foreground" />
          <Swatch token="secondary" />
          <Swatch token="accent" note="house cyan" />
          <Swatch token="accent-deep" />
          <Swatch token="accent-subtle" />
        </Group>

        <Group title="Lines">
          <Swatch token="border" note="line" />
          <Swatch token="input" />
          <Swatch token="ring" note="accent" />
        </Group>

        <Group title="Signals">
          <Swatch token="destructive" />
          <Swatch token="destructive-subtle" />
          <Swatch token="success" />
          <Swatch token="warning" />
          <Swatch token="info" />
          <Swatch token="info-subtle" />
        </Group>
      </div>
    </div>
  ),
};
