import * as React from "react";
import { cn } from "../../lib/cn";
import { named } from "../../lib/named";

export type GlitchTrigger = "ambient" | "hover" | "manual";

export interface GlitchTextHandle {
  /** Fire one burst now. A no-op under `prefers-reduced-motion`. */
  burst: () => void;
}

export interface GlitchTextProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  /** The text to render and glitch. */
  text: string;
  /** What drives the effect. */
  trigger?: GlitchTrigger;
  /** Ambient burst cadence, `[minMs, maxMs]`. */
  interval?: readonly [number, number];
  /**
   * A handle for firing bursts yourself, for `trigger="manual"`. Separate from
   * `ref`, which stays the wrapper element — so reaching for one never costs you
   * the other.
   */
  burstRef?: React.Ref<GlitchTextHandle>;
}

// Module-level so the default keeps one identity across renders — an inline
// default would re-trigger the ambient effect on every parent render.
const DEFAULT_INTERVAL: readonly [number, number] = [900, 3600];

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * The MLZ cyberpunk text effect: text is split per character and random chars
 * flicker with an RGB-split (using the `--glitch-1` / `--glitch-2` tokens). The
 * visual spans are hidden from assistive tech; the full string is exposed once via
 * a visually-hidden copy so screen readers read clean text. Honours
 * `prefers-reduced-motion` and the `data-motion="off"` kill-switch (the CSS
 * `animate-glitch` becomes a no-op).
 *
 * - `trigger="ambient"` (default): random 1–4 char bursts on a self-scheduling
 *   loop, paused when the tab is hidden — its resting state.
 * - `trigger="hover"`: a single burst each time the pointer enters.
 * - `trigger="manual"`: nothing fires on its own; you call `burst()` through
 *   `burstRef` when something happens worth marking — a value being copied, a
 *   reading coming back changed. Reach for it when the glitch is *feedback*
 *   rather than atmosphere.
 *
 * ```tsx
 * const glitch = React.useRef<GlitchTextHandle>(null);
 * <GlitchText text={ip} trigger="manual" burstRef={glitch} />;
 * // …later: glitch.current?.burst();
 * ```
 *
 * Styling lives on the wrapper — pass a `className` with the type family, size
 * and tracking you want.
 */
export const GlitchText = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<HTMLSpanElement, GlitchTextProps>(
    (
      {
        text,
        trigger = "ambient",
        interval = DEFAULT_INTERVAL,
        burstRef,
        className,
        onPointerEnter,
        ...props
      },
      ref,
    ) => {
      const containerRef = React.useRef<HTMLSpanElement | null>(null);

      const setRefs = React.useCallback(
        (node: HTMLSpanElement | null) => {
          containerRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLSpanElement | null>).current = node;
        },
        [ref],
      );

      // Stable keys (avoids array-index keys; text is static per render).
      const segments = React.useMemo(
        () => Array.from(text).map((char, i) => ({ char, key: `${i} ${char}` })),
        [text],
      );

      const burst = React.useCallback(() => {
        const root = containerRef.current;
        if (!root) return;
        const chars = root.querySelectorAll<HTMLElement>("[data-glitch-char]");
        if (chars.length === 0) return;
        const count = 1 + Math.floor(Math.random() * Math.min(4, chars.length));
        for (let i = 0; i < count; i++) {
          const el = chars[Math.floor(Math.random() * chars.length)];
          if (!el) continue;
          el.classList.remove("animate-glitch");
          void el.offsetWidth; // reflow so the animation restarts if re-picked
          el.classList.add("animate-glitch");
          el.addEventListener("animationend", () => el.classList.remove("animate-glitch"), {
            once: true,
          });
        }
      }, []);

      React.useImperativeHandle(
        burstRef,
        () => ({
          burst: () => {
            if (!prefersReducedMotion()) burst();
          },
        }),
        [burst],
      );

      // Depend on the two numbers, not the tuple — a caller writing
      // `interval={[500, 2000]}` inline would otherwise reset the timer on
      // every render, so the ambient burst never fires.
      const [minMs, maxMs] = interval;
      React.useEffect(() => {
        if (trigger !== "ambient" || prefersReducedMotion()) return;
        let timer: ReturnType<typeof setTimeout>;
        const schedule = () => {
          timer = setTimeout(
            () => {
              if (!document.hidden) burst();
              schedule();
            },
            minMs + Math.random() * (maxMs - minMs),
          );
        };
        schedule();
        return () => clearTimeout(timer);
      }, [trigger, minMs, maxMs, burst]);

      // Composed with the consumer's own handler — a caller's `onPointerEnter`
      // must not silently replace the hover trigger, or vice versa.
      const handlePointerEnter = (event: React.PointerEvent<HTMLSpanElement>) => {
        onPointerEnter?.(event);
        if (trigger === "hover" && !prefersReducedMotion()) burst();
      };

      return (
        <span
          ref={setRefs}
          className={cn("inline-block", className)}
          onPointerEnter={handlePointerEnter}
          {...props}
        >
          <span className="sr-only">{text}</span>
          <span aria-hidden="true">
            {segments.map(({ char, key }) =>
              char === " " ? (
                <span key={key}> </span>
              ) : (
                <span key={key} data-glitch-char className="inline-block will-change-transform">
                  {char}
                </span>
              ),
            )}
          </span>
        </span>
      );
    },
  ),
  "GlitchText",
);
