import * as React from "react";
import { cn } from "../lib/cn";

/**
 * The MLZ "engineering notebook" grid: a two-scale ruled background (a fine
 * minor grid plus a 5× major grid) drawn purely from layered gradients — no image.
 * Colours are `color-mix`ed off `--foreground`, so it adapts to light/dark.
 *
 * - Static by default: a faint, always-on grid to sit behind content.
 * - `interactive`: the grid is revealed only through a soft disc that follows the
 *   pointer (the signature MLZ effect), optionally with an accent `glow`.
 *
 * Render it as the first child of a `relative` container; it fills that box.
 */
export interface GridBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Minor grid cell size in px (major grid is 5×). */
  cell?: number;
  /** Reveal the grid through a pointer-following spotlight instead of showing all. */
  interactive?: boolean;
  /** Pool accent light under the spotlight (only meaningful with `interactive`). */
  glow?: boolean;
  /** Spotlight diameter in px. */
  spotlight?: number;
}

export const GridBackground = React.forwardRef<HTMLDivElement, GridBackgroundProps>(
  (
    { cell = 30, interactive = false, glow = true, spotlight = 340, className, style, ...props },
    ref,
  ) => {
    const rootRef = React.useRef<HTMLDivElement | null>(null);
    const setRefs = React.useCallback(
      (node: HTMLDivElement | null) => {
        rootRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      },
      [ref],
    );

    // The layer is click-through, so track the cursor globally rather than via
    // element handlers that pointer-events-none would swallow.
    React.useEffect(() => {
      if (!interactive) return;
      const move = (event: PointerEvent) => {
        const root = rootRef.current;
        if (!root) return;
        const rect = root.getBoundingClientRect();
        root.style.setProperty("--mx", `${event.clientX - rect.left}px`);
        root.style.setProperty("--my", `${event.clientY - rect.top}px`);
        root.dataset.lit = "true";
      };
      const clear = () => {
        if (rootRef.current) rootRef.current.dataset.lit = "false";
      };
      window.addEventListener("pointermove", move, { passive: true });
      window.addEventListener("pointerleave", clear);
      return () => {
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerleave", clear);
      };
    }, [interactive]);

    const line = "color-mix(in oklch, var(--foreground) 6%, transparent)";
    const lineMajor = "color-mix(in oklch, var(--foreground) 9%, transparent)";
    const mask = `radial-gradient(${spotlight}px ${spotlight}px at var(--mx, 50%) var(--my, 50%), #000 30%, transparent 72%)`;

    const gridStyle = {
      "--cell": `${cell}px`,
      backgroundImage: `linear-gradient(to right, ${line} 1px, transparent 1px), linear-gradient(to bottom, ${line} 1px, transparent 1px), linear-gradient(to right, ${lineMajor} 1px, transparent 1px), linear-gradient(to bottom, ${lineMajor} 1px, transparent 1px)`,
      backgroundSize:
        "var(--cell) var(--cell), var(--cell) var(--cell), calc(var(--cell) * 5) calc(var(--cell) * 5), calc(var(--cell) * 5) calc(var(--cell) * 5)",
      ...(interactive ? { WebkitMaskImage: mask, maskImage: mask } : null),
    } as React.CSSProperties;

    const glowStyle = {
      background: `radial-gradient(${spotlight + 60}px ${spotlight + 60}px at var(--mx, 50%) var(--my, 50%), color-mix(in oklch, var(--accent) 16%, transparent), transparent 68%)`,
      mixBlendMode: "multiply",
    } as React.CSSProperties;

    return (
      <div
        ref={setRefs}
        aria-hidden="true"
        data-lit="false"
        className={cn("group pointer-events-none absolute inset-0 overflow-hidden", className)}
        style={style}
        {...props}
      >
        <div className="absolute inset-0" style={gridStyle} />
        {interactive && glow && (
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-500 ease-out group-data-[lit=true]:opacity-100"
            style={glowStyle}
          />
        )}
      </div>
    );
  },
);
GridBackground.displayName = "GridBackground";
