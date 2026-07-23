import * as React from "react";
import { cn } from "../lib/cn";

/**
 * The MLZ drifting "sketch marks": small CSS-drawn engineering glyphs (square,
 * filled square, plus, line, angle) that float slowly up-screen, fading in and
 * out. A decorative background layer — `aria-hidden`, click-through, and disabled
 * by `prefers-reduced-motion` / `data-motion="off"` via the `animate-float` token.
 *
 * Positions, drift, rotation, timing and opacity are derived deterministically
 * from each mark's index (no `Math.random`), so it's SSR-safe and stable across
 * renders. Render inside a `relative` container; it fills that box.
 */
export interface FloatingMarksProps extends React.HTMLAttributes<HTMLDivElement> {
  /** How many marks to scatter. */
  count?: number;
}

const SHAPES = ["square", "filled", "plus", "line", "angle"] as const;
type Shape = (typeof SHAPES)[number];

// Deterministic pseudo-random in [0, 1) — stable per seed, no global state.
function rand(seed: number): number {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

function Mark({ shape, size }: { shape: Shape; size: number }) {
  const s = { width: size, height: size } as React.CSSProperties;
  switch (shape) {
    case "filled":
      return <span className="block bg-current" style={s} />;
    case "line":
      return <span className="block bg-current" style={{ width: size, height: 1.5 }} />;
    case "angle":
      return <span className="block border-current border-t border-l" style={s} />;
    case "plus":
      return (
        <span className="relative block" style={s}>
          <span
            className="-translate-y-1/2 absolute top-1/2 left-0 w-full bg-current"
            style={{ height: 1.5 }}
          />
          <span
            className="-translate-x-1/2 absolute top-0 left-1/2 h-full bg-current"
            style={{ width: 1.5 }}
          />
        </span>
      );
    default:
      return <span className="block border border-current" style={s} />;
  }
}

export const FloatingMarks = React.forwardRef<HTMLDivElement, FloatingMarksProps>(
  ({ count = 14, className, ...props }, ref) => {
    const marks = React.useMemo(
      () =>
        Array.from({ length: count }, (_, i) => {
          const a = rand(i + 1);
          const b = rand(i + 7);
          const c = rand(i + 13);
          return {
            key: `mark-${i}`,
            shape: SHAPES[i % SHAPES.length] as Shape,
            size: 8 + Math.round(a * 14), // 8–22px
            left: `${Math.round(b * 96)}%`,
            accent: i % 4 === 0,
            style: {
              "--mk-dx": `${Math.round((c - 0.5) * 60)}px`,
              "--mk-rot": `${Math.round((a - 0.5) * 140)}deg`,
              "--mk-op": 0.12 + b * 0.16, // 0.12–0.28
              animationDuration: `${26 + Math.round(c * 24)}s`, // 26–50s
              animationDelay: `-${Math.round(a * 40)}s`, // pre-seed mid-flight
            } as React.CSSProperties,
          };
        }),
      [count],
    );

    return (
      <div
        ref={ref}
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 overflow-hidden text-muted-foreground opacity-55",
          className,
        )}
        {...props}
      >
        {marks.map((mark) => (
          <span
            key={mark.key}
            className={cn(
              "absolute bottom-0 animate-float",
              mark.accent && "text-[var(--accent-deep)]",
            )}
            style={{ left: mark.left, ...mark.style }}
          >
            <Mark shape={mark.shape} size={mark.size} />
          </span>
        ))}
      </div>
    );
  },
);
FloatingMarks.displayName = "FloatingMarks";
