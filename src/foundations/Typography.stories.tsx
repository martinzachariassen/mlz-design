import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties } from "react";

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
        <p className="mt-3 max-w-2xl font-mono text-sm text-muted-foreground">
          Four roles, four typefaces — reach for them with{" "}
          <span className="text-foreground">font-hand / font-grotesk / font-serif / font-mono</span>
          .
        </p>

        <Spec
          label="Architects Daughter — hand / display"
          font="font-hand"
          size="clamp(2.5rem, 8vw, 4rem)"
        >
          Martin Zachariassen
        </Spec>
        <Spec
          label="Space Grotesk — grotesk / alt display"
          font="font-grotesk"
          size="clamp(2rem, 6vw, 3.5rem)"
          style={{ fontWeight: 700, letterSpacing: "-0.02em" }}
        >
          Backend systems & APIs
        </Spec>
        <Spec
          label="Instrument Serif — serif / editorial"
          font="font-serif"
          size="clamp(2.25rem, 7vw, 4rem)"
        >
          Distributed architecture
        </Spec>
        <Spec
          label="Space Mono — mono / body & UI"
          font="font-mono"
          size="clamp(1.25rem, 4vw, 2.25rem)"
          style={{ fontWeight: 700, letterSpacing: "-0.01em" }}
        >
          const you = build(great, things);
        </Spec>
      </div>
    </div>
  ),
};
