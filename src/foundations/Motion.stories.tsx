import type { Meta, StoryObj } from "@storybook/react-vite";
import { GlitchText } from "../components/glitch-text";

const meta = {
  title: "Foundations/Motion",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function Row({
  token,
  utility,
  note,
  children,
}: {
  token: string;
  utility: string;
  note: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 items-center gap-4 border-b border-border py-8 sm:grid-cols-[1fr_2fr]">
      <div>
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          {token}
        </div>
        <div className="mt-1 font-mono text-sm text-foreground">{utility}</div>
        <p className="mt-1 max-w-xs font-mono text-[11px] text-muted-foreground">{note}</p>
      </div>
      <div className="flex min-h-24 items-center justify-center rounded-[var(--radius)] bg-card p-6">
        {children}
      </div>
    </div>
  );
}

export const Tokens: Story = {
  render: () => (
    <div className="min-h-screen bg-background px-8 py-14 text-foreground">
      <div className="mx-auto max-w-4xl">
        <h1 className="font-hand text-5xl">Motion</h1>
        <p className="mt-3 max-w-2xl font-mono text-sm text-muted-foreground">
          Five signature animations from mlz.no, each a Tailwind{" "}
          <span className="text-foreground">animate-*</span> utility backed by an{" "}
          <span className="text-foreground">--animate-*</span> token. All respect{" "}
          <span className="text-foreground">prefers-reduced-motion</span> and can be killed on any
          subtree with <span className="text-foreground">data-motion="off"</span>.
        </p>

        <Row
          token="--animate-rise"
          utility="animate-rise"
          note="Staggered fade + lift entrance. opacity:0 lives in the keyframe (backwards fill) to stay FCP-safe."
        >
          <div className="flex gap-3">
            {["build", "ship", "iterate"].map((word, i) => (
              <span
                key={word}
                className="animate-rise rounded-[var(--radius)] border border-border bg-background px-3 py-2 font-mono text-xs uppercase tracking-[0.14em]"
                style={{
                  animationDelay: `${i * 0.12}s`,
                  animationIterationCount: "infinite",
                  animationDuration: "2.4s",
                }}
              >
                {word}
              </span>
            ))}
          </div>
        </Row>

        <Row
          token="--animate-pulse-soft"
          utility="animate-pulse-soft"
          note="Slow breathing opacity loop — brand marks, vignettes."
        >
          <span className="size-3 animate-pulse-soft bg-accent" />
        </Row>

        <Row
          token="--animate-blink"
          utility="animate-blink"
          note="Hard on/off terminal cursor (steps(1,end)), not a fade."
        >
          <span className="font-mono text-sm">
            Building since 2017 <span className="animate-blink text-[var(--accent-deep)]">▮</span>
          </span>
        </Row>

        <Row
          token="--animate-float"
          utility="animate-float"
          note="Marks drift up-screen with per-mark --mk-* vars. See the FloatingMarks component."
        >
          <span
            className="animate-float block size-3 border border-current text-muted-foreground"
            style={{ animationDuration: "6s" }}
          />
        </Row>

        <Row
          token="--animate-glitch"
          utility="animate-glitch"
          note="One-shot per-char RGB split (--glitch-1/2). Driven by the GlitchText component."
        >
          <GlitchText
            text="GLITCH"
            trigger="ambient"
            className="font-mono text-2xl uppercase tracking-[0.2em]"
          />
        </Row>
      </div>
    </div>
  ),
};
