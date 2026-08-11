"use client";
import { cn } from './chunk-7EOSDFS3.js';
export { cn } from './chunk-7EOSDFS3.js';
import { accents } from './chunk-7IUMZ2OS.js';
export { accentFill, accents, animations, breakpoints, colors, fonts, motion, onDark, radius, signalFill, signals, signalsDeep, tokens } from './chunk-7IUMZ2OS.js';
import { cva } from 'class-variance-authority';
import * as React36 from 'react';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { Slot } from '@radix-ui/react-slot';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { Command as Command$1 } from 'cmdk';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as LabelPrimitive from '@radix-ui/react-label';
import * as SelectPrimitive from '@radix-ui/react-select';
import * as SliderPrimitive from '@radix-ui/react-slider';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

// src/lib/named.ts
function named(component, displayName) {
  component.displayName = displayName;
  return component;
}
var M_POINTS = "7,25 7,7 12,7 16,14.5 20,7 25,7 25,25 20.6,25 20.6,13.6 17.4,19.4 14.6,19.4 11.4,13.6 11.4,25";
var brandMarkVariants = /* @__PURE__ */ cva("inline-block shrink-0 align-middle", {
  variants: {
    variant: {
      /** Ink tile + inset letter — the app/favicon icon. */
      tile: "",
      /** Just the letterform in `currentColor` — for inline use. */
      glyph: ""
    }
  },
  defaultVariants: { variant: "tile" }
});
var BrandMark = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ variant = "tile", size = 32, tile = "var(--foreground)", glyph, className, ...props }, ref) => {
      const isTile = variant === "tile";
      const letter = glyph ?? (isTile ? "var(--background)" : "currentColor");
      return /* @__PURE__ */ jsxs(
        "svg",
        {
          ref,
          width: size,
          height: size,
          viewBox: "0 0 32 32",
          fill: "none",
          role: "img",
          "aria-label": "MLZ",
          className: cn(brandMarkVariants({ variant }), className),
          ...props,
          children: [
            isTile && /* @__PURE__ */ jsx("rect", { x: "1", y: "1", width: "30", height: "30", rx: "6", fill: tile }),
            /* @__PURE__ */ jsx("polygon", { points: M_POINTS, fill: letter })
          ]
        }
      );
    }
  ),
  "BrandMark"
);
var BrandWordmark = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ size = 24, period, className, style, ...props }, ref) => /* @__PURE__ */ jsxs(
      "span",
      {
        ref,
        className: cn("font-mono font-bold lowercase leading-none tracking-[-0.03em]", className),
        style: { fontSize: size, ...style },
        ...props,
        children: [
          "mlz",
          /* @__PURE__ */ jsx(
            "span",
            {
              className: period ? void 0 : "text-brand-period",
              style: period ? { color: period } : void 0,
              children: "."
            }
          )
        ]
      }
    )
  ),
  "BrandWordmark"
);
var BrandLockup = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({
      tagline = "",
      size = 40,
      orientation = "horizontal",
      markProps,
      wordmarkProps,
      className,
      ...props
    }, ref) => {
      const stacked = orientation === "stacked";
      const wordmarkSize = size / 1.45;
      const gap = wordmarkSize * 0.5;
      const showTagline = Boolean(tagline) && size >= 40;
      return /* @__PURE__ */ jsxs(
        "div",
        {
          ref,
          className: cn(
            "inline-flex text-foreground",
            stacked ? "flex-col items-center text-center" : "items-center",
            className
          ),
          style: { gap },
          ...props,
          children: [
            /* @__PURE__ */ jsx(BrandMark, { size, ...markProps }),
            /* @__PURE__ */ jsxs("div", { className: cn("flex flex-col leading-none", stacked && "items-center"), children: [
              /* @__PURE__ */ jsx(BrandWordmark, { size: wordmarkSize, ...wordmarkProps }),
              showTagline ? /* @__PURE__ */ jsx(
                "span",
                {
                  className: "mt-1 font-mono text-[0.5em] uppercase tracking-[0.22em] text-muted-foreground",
                  style: { fontSize: Math.max(9, wordmarkSize * 0.32) },
                  children: tagline
                }
              ) : null
            ] })
          ]
        }
      );
    }
  ),
  "BrandLockup"
);
var SHAPES = ["square", "filled", "plus", "line", "angle"];
function rand(seed) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}
function Mark({ shape, size }) {
  const s = { width: size, height: size };
  switch (shape) {
    case "filled":
      return /* @__PURE__ */ jsx("span", { className: "block bg-current", style: s });
    case "line":
      return /* @__PURE__ */ jsx("span", { className: "block bg-current", style: { width: size, height: 1.5 } });
    case "angle":
      return /* @__PURE__ */ jsx("span", { className: "block border-current border-t border-l", style: s });
    case "plus":
      return /* @__PURE__ */ jsxs("span", { className: "relative block", style: s, children: [
        /* @__PURE__ */ jsx(
          "span",
          {
            className: "-translate-y-1/2 absolute top-1/2 left-0 w-full bg-current",
            style: { height: 1.5 }
          }
        ),
        /* @__PURE__ */ jsx(
          "span",
          {
            className: "-translate-x-1/2 absolute top-0 left-1/2 h-full bg-current",
            style: { width: 1.5 }
          }
        )
      ] });
    default:
      return /* @__PURE__ */ jsx("span", { className: "block border border-current", style: s });
  }
}
var FloatingMarks = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ count = 14, className, ...props }, ref) => {
      const marks = React36.useMemo(
        () => Array.from({ length: count }, (_, i) => {
          const a = rand(i + 1);
          const b = rand(i + 7);
          const c = rand(i + 13);
          return {
            key: `mark-${i}`,
            shape: SHAPES[i % SHAPES.length],
            size: 8 + Math.round(a * 14),
            // 8–22px
            left: `${Math.round(b * 96)}%`,
            accent: i % 4 === 0,
            style: {
              "--mk-dx": `${Math.round((c - 0.5) * 60)}px`,
              "--mk-rot": `${Math.round((a - 0.5) * 140)}deg`,
              "--mk-op": 0.12 + b * 0.16,
              // 0.12–0.28
              animationDuration: `${26 + Math.round(c * 24)}s`,
              // 26–50s
              animationDelay: `-${Math.round(a * 40)}s`
              // pre-seed mid-flight
            }
          };
        }),
        [count]
      );
      return /* @__PURE__ */ jsx(
        "div",
        {
          ref,
          "aria-hidden": "true",
          className: cn(
            "pointer-events-none absolute inset-0 overflow-hidden text-muted-foreground opacity-55",
            className
          ),
          ...props,
          children: marks.map((mark) => /* @__PURE__ */ jsx(
            "span",
            {
              className: cn(
                "absolute bottom-0 animate-float",
                mark.accent && "text-[var(--accent-deep)]"
              ),
              style: { left: mark.left, ...mark.style },
              children: /* @__PURE__ */ jsx(Mark, { shape: mark.shape, size: mark.size })
            },
            mark.key
          ))
        }
      );
    }
  ),
  "FloatingMarks"
);
var DEFAULT_INTERVAL = [900, 3600];
function prefersReducedMotion() {
  return typeof window !== "undefined" && typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
var GlitchText = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({
      text,
      trigger = "ambient",
      interval = DEFAULT_INTERVAL,
      burstRef,
      className,
      onPointerEnter,
      ...props
    }, ref) => {
      const containerRef = React36.useRef(null);
      const setRefs = React36.useCallback(
        (node) => {
          containerRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        },
        [ref]
      );
      const segments = React36.useMemo(
        () => Array.from(text).map((char, i) => ({ char, key: `${i} ${char}` })),
        [text]
      );
      const burst = React36.useCallback(() => {
        const root = containerRef.current;
        if (!root) return;
        const chars = root.querySelectorAll("[data-glitch-char]");
        if (chars.length === 0) return;
        const count = 1 + Math.floor(Math.random() * Math.min(4, chars.length));
        for (let i = 0; i < count; i++) {
          const el = chars[Math.floor(Math.random() * chars.length)];
          if (!el) continue;
          el.classList.remove("animate-glitch");
          void el.offsetWidth;
          el.classList.add("animate-glitch");
          el.addEventListener("animationend", () => el.classList.remove("animate-glitch"), {
            once: true
          });
        }
      }, []);
      React36.useImperativeHandle(
        burstRef,
        () => ({
          burst: () => {
            if (!prefersReducedMotion()) burst();
          }
        }),
        [burst]
      );
      const [minMs, maxMs] = interval;
      React36.useEffect(() => {
        if (trigger !== "ambient" || prefersReducedMotion()) return;
        let timer;
        const schedule = () => {
          timer = setTimeout(
            () => {
              if (!document.hidden) burst();
              schedule();
            },
            minMs + Math.random() * (maxMs - minMs)
          );
        };
        schedule();
        return () => clearTimeout(timer);
      }, [trigger, minMs, maxMs, burst]);
      const handlePointerEnter = (event) => {
        onPointerEnter?.(event);
        if (trigger === "hover" && !prefersReducedMotion()) burst();
      };
      return /* @__PURE__ */ jsxs(
        "span",
        {
          ref: setRefs,
          className: cn("inline-block", className),
          onPointerEnter: handlePointerEnter,
          ...props,
          children: [
            /* @__PURE__ */ jsx("span", { className: "sr-only", children: text }),
            /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: segments.map(
              ({ char, key }) => char === " " ? /* @__PURE__ */ jsx("span", { children: " " }, key) : /* @__PURE__ */ jsx("span", { "data-glitch-char": true, className: "inline-block will-change-transform", children: char }, key)
            ) })
          ]
        }
      );
    }
  ),
  "GlitchText"
);
var GridBackground = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ cell = 30, interactive = false, glow = true, spotlight = 340, className, style, ...props }, ref) => {
      const rootRef = React36.useRef(null);
      const setRefs = React36.useCallback(
        (node) => {
          rootRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        },
        [ref]
      );
      React36.useEffect(() => {
        if (!interactive) return;
        const move = (event) => {
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
        backgroundSize: "var(--cell) var(--cell), var(--cell) var(--cell), calc(var(--cell) * 5) calc(var(--cell) * 5), calc(var(--cell) * 5) calc(var(--cell) * 5)",
        ...interactive ? { WebkitMaskImage: mask, maskImage: mask } : null
      };
      const glowStyle = {
        background: `radial-gradient(${spotlight + 60}px ${spotlight + 60}px at var(--mx, 50%) var(--my, 50%), color-mix(in oklch, var(--accent) 16%, transparent), transparent 68%)`
      };
      return /* @__PURE__ */ jsxs(
        "div",
        {
          ref: setRefs,
          "aria-hidden": "true",
          "data-lit": "false",
          className: cn("group pointer-events-none absolute inset-0 overflow-hidden", className),
          style,
          ...props,
          children: [
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0", style: gridStyle }),
            interactive && glow && /* @__PURE__ */ jsx(
              "div",
              {
                className: "absolute inset-0 opacity-0 mix-blend-[var(--glow-blend,multiply)] transition-opacity duration-500 ease-out group-data-[lit=true]:opacity-100",
                style: glowStyle
              }
            )
          ]
        }
      );
    }
  ),
  "GridBackground"
);
var MarginNote = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ arrow = "none", as, className, children, ...props }, ref) => {
      const Component = as ?? "aside";
      const below = arrow === "down-left" || arrow === "down-right";
      const mirrored = arrow === "up-right" || arrow === "down-right";
      const sketch = arrow === "none" ? null : /* @__PURE__ */ jsxs(
        "svg",
        {
          viewBox: "0 0 96 54",
          "aria-hidden": "true",
          focusable: "false",
          className: cn(
            "block h-[54px] w-24 overflow-visible fill-none stroke-current [stroke-linecap:round] [stroke-width:1.4]",
            mirrored && "-scale-x-100",
            below && "-scale-y-100"
          ),
          children: [
            /* @__PURE__ */ jsx("path", { d: "M92 50 C 66 50, 40 42, 20 16" }),
            /* @__PURE__ */ jsx("path", { d: "M20 16 l 14 4" }),
            /* @__PURE__ */ jsx("path", { d: "M20 16 l 1 14" })
          ]
        }
      );
      return /* @__PURE__ */ jsxs(
        Component,
        {
          ref,
          "data-slot": "margin-note",
          className: cn(
            "flex flex-col gap-1 font-hand text-[15px] text-muted-foreground-2 leading-[1.45]",
            mirrored && "items-end text-right",
            className
          ),
          ...props,
          children: [
            below ? null : sketch,
            /* @__PURE__ */ jsx("p", { className: "m-0 max-w-[var(--mlz-note-measure,24ch)]", children }),
            below ? sketch : null
          ]
        }
      );
    }
  ),
  "MarginNote"
);
var badgeVariants = /* @__PURE__ */ cva(
  "inline-flex items-center rounded-[var(--radius-sm)] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        accent: "bg-accent text-accent-foreground",
        outline: "border border-border text-foreground",
        muted: "bg-muted text-muted-foreground",
        /** shadcn-vocabulary alias for `muted`, so pasted snippets compile. */
        secondary: "bg-muted text-muted-foreground",
        destructive: "bg-destructive text-destructive-foreground"
      }
    },
    defaultVariants: { variant: "default" }
  }
);
function Badge({ className, variant, asChild, ...props }) {
  const Comp = asChild ? Slot : "span";
  return /* @__PURE__ */ jsx(Comp, { className: cn(badgeVariants({ variant }), className), ...props });
}
function DefaultCover() {
  return /* @__PURE__ */ jsxs("div", { className: "relative flex size-full items-center justify-center overflow-hidden bg-[color-mix(in_oklch,var(--accent)_10%,var(--card))]", children: [
    /* @__PURE__ */ jsx(GridBackground, { cell: 22 }),
    /* @__PURE__ */ jsx(
      BrandMark,
      {
        variant: "glyph",
        size: 44,
        className: "relative text-[color-mix(in_oklch,var(--accent)_65%,var(--foreground))]"
      }
    )
  ] });
}
var ProjectCard = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({
      className,
      title,
      description,
      tags,
      meta,
      href,
      cover,
      featured = false,
      cta = "View project",
      ...props
    }, ref) => {
      const titleId = React36.useId();
      return /* @__PURE__ */ jsxs(
        "article",
        {
          ref,
          "data-slot": "project-card",
          "aria-labelledby": titleId,
          className: cn(
            "group relative flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-border bg-card text-card-foreground transition-[transform,box-shadow,border-color] duration-200 ease-[var(--ease-out)]",
            "hover:-translate-x-0.5 hover:-translate-y-0.5 hover:border-accent hover:shadow-[6px_6px_0_0_var(--accent)]",
            "focus-within:-translate-x-0.5 focus-within:-translate-y-0.5 focus-within:border-accent focus-within:shadow-[6px_6px_0_0_var(--accent)]",
            featured && "md:grid md:grid-cols-2 md:items-stretch",
            className
          ),
          ...props,
          children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                className: cn(
                  "relative shrink-0 border-b border-border",
                  featured ? "aspect-[16/10] md:aspect-auto md:border-r md:border-b-0" : "aspect-[16/10]"
                ),
                children: cover ?? /* @__PURE__ */ jsx(DefaultCover, {})
              }
            ),
            /* @__PURE__ */ jsxs(
              "div",
              {
                className: cn("flex flex-1 flex-col gap-3 p-5", featured && "md:justify-center md:p-8"),
                children: [
                  meta ? /* @__PURE__ */ jsx("p", { className: "font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground", children: meta }) : null,
                  /* @__PURE__ */ jsx(
                    "h3",
                    {
                      id: titleId,
                      className: cn(
                        "font-grotesk font-bold leading-tight tracking-tight text-foreground",
                        featured ? "text-2xl md:text-3xl" : "text-xl"
                      ),
                      children: href ? /* @__PURE__ */ jsx(
                        "a",
                        {
                          href,
                          className: "outline-none after:absolute after:inset-0 after:content-[''] focus-visible:underline focus-visible:decoration-accent-deep focus-visible:underline-offset-4",
                          children: title
                        }
                      ) : title
                    }
                  ),
                  description ? /* @__PURE__ */ jsx(
                    "p",
                    {
                      className: cn(
                        "text-sm leading-relaxed text-muted-foreground",
                        featured ? "md:max-w-prose md:text-[15px]" : "line-clamp-3"
                      ),
                      children: description
                    }
                  ) : null,
                  tags?.length ? /* @__PURE__ */ jsx("div", { className: "mt-1 flex flex-wrap gap-1.5", children: tags.map((tag) => /* @__PURE__ */ jsx(Badge, { variant: "outline", children: tag }, tag)) }) : null,
                  href ? /* @__PURE__ */ jsxs("span", { className: "mt-2 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-foreground transition-colors group-hover:text-accent-deep", children: [
                    cta,
                    /* @__PURE__ */ jsx(
                      "span",
                      {
                        "aria-hidden": true,
                        className: "transition-transform duration-200 ease-[var(--ease-out)] group-hover:translate-x-0.5",
                        children: "\u2192"
                      }
                    )
                  ] }) : null
                ]
              }
            )
          ]
        }
      );
    }
  ),
  "ProjectCard"
);
var BASE_W = 1280;
var BASE_H = 340;
function Badge2({ children }) {
  return /* @__PURE__ */ jsx("span", { className: "rounded-[var(--radius-sm)] border border-border bg-card/60 px-[0.7em] py-[0.35em] font-mono text-[0.62em] uppercase tracking-[0.16em] text-muted-foreground", children });
}
function Lockup({ size }) {
  return /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center", style: { gap: size * 0.32 }, children: [
    /* @__PURE__ */ jsx(BrandMark, { size }),
    /* @__PURE__ */ jsx(BrandWordmark, { size: size / 1.45 })
  ] });
}
var RepoBanner = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({
      project,
      eyebrow = "MLZ \xB7 Design System",
      description,
      badges,
      install,
      footer = "github.com/martinzachariassen",
      accent,
      layout = "standard",
      width = BASE_W,
      marks = true,
      className,
      style,
      ...props
    }, ref) => {
      const scale = width / BASE_W;
      const split = layout === "split";
      const cornerMark = (position) => /* @__PURE__ */ jsx("span", { "aria-hidden": true, className: cn("absolute h-[1.4em] w-[1.4em] border-accent", position) });
      const Name = ({ className: c }) => /* @__PURE__ */ jsx(
        "h1",
        {
          className: cn(
            "font-grotesk font-bold leading-[0.95] tracking-[-0.02em] text-foreground",
            c
          ),
          children: project
        }
      );
      return /* @__PURE__ */ jsxs(
        "div",
        {
          ref,
          "data-accent": accent,
          className: cn(
            "relative isolate flex overflow-hidden bg-background text-foreground",
            className
          ),
          style: { width, height: BASE_H * scale, fontSize: `${16 * scale}px`, ...style },
          ...props,
          children: [
            !split && /* @__PURE__ */ jsx(GridBackground, { cell: 38 }),
            !split && marks && layout !== "minimal" && /* @__PURE__ */ jsx(FloatingMarks, { count: 7, className: "opacity-35" }),
            !split && /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-[1.4em] border border-border/70" }),
              cornerMark("top-[1.4em] left-[1.4em] border-t-2 border-l-2"),
              cornerMark("top-[1.4em] right-[1.4em] border-t-2 border-r-2"),
              cornerMark("bottom-[1.4em] left-[1.4em] border-b-2 border-l-2"),
              cornerMark("bottom-[1.4em] right-[1.4em] border-b-2 border-r-2")
            ] }),
            layout === "standard" && /* @__PURE__ */ jsxs("div", { className: "relative flex h-full w-full flex-col justify-between p-[3.4em]", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
                /* @__PURE__ */ jsx(Lockup, { size: 2.6 * 16 }),
                badges?.length ? /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-end gap-[0.5em]", children: badges.map((b) => /* @__PURE__ */ jsx(Badge2, { children: b }, b)) }) : null
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "max-w-[78%]", children: [
                eyebrow ? /* @__PURE__ */ jsx("p", { className: "mb-[0.5em] font-mono text-[0.82em] uppercase tracking-[0.26em] text-muted-foreground", children: eyebrow }) : null,
                /* @__PURE__ */ jsx(Name, { className: "text-[3.4em]" }),
                description ? /* @__PURE__ */ jsx("p", { className: "mt-[0.7em] max-w-[85%] font-mono text-[1.02em] leading-relaxed text-muted-foreground", children: description }) : null
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between font-mono text-[0.8em]", children: [
                install ? /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-[0.6em] rounded-[var(--radius-sm)] border border-border bg-card px-[0.9em] py-[0.5em] text-foreground", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-brand-period", children: "$" }),
                  install
                ] }) : /* @__PURE__ */ jsx("span", {}),
                /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-[0.6em] uppercase tracking-[0.18em] text-muted-foreground", children: [
                  /* @__PURE__ */ jsx("span", { className: "inline-block size-[0.5em] bg-accent", "aria-hidden": true }),
                  footer
                ] })
              ] })
            ] }),
            layout === "minimal" && /* @__PURE__ */ jsxs("div", { className: "relative flex h-full w-full flex-col items-center justify-center gap-[0.9em] p-[3.4em] text-center", children: [
              /* @__PURE__ */ jsx(BrandMark, { size: 3.4 * 16 }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-[0.5em]", children: [
                /* @__PURE__ */ jsx(BrandWordmark, { size: 2.1 * 16 }),
                /* @__PURE__ */ jsx(Name, { className: "text-[2.3em]" })
              ] }),
              description ? /* @__PURE__ */ jsx("p", { className: "max-w-[70%] font-mono text-[0.95em] leading-relaxed text-muted-foreground", children: description }) : null,
              badges?.length ? /* @__PURE__ */ jsx("div", { className: "mt-[0.3em] flex flex-wrap justify-center gap-[0.5em]", children: badges.map((b) => /* @__PURE__ */ jsx(Badge2, { children: b }, b)) }) : null
            ] }),
            layout === "terminal" && /* @__PURE__ */ jsxs("div", { className: "relative flex h-full w-full items-center gap-[2.4em] p-[3.4em]", children: [
              /* @__PURE__ */ jsx(BrandMark, { size: 4.4 * 16, className: "shrink-0" }),
              /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1 font-mono text-[1em] leading-[1.9]", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-[0.5em]", children: [
                  /* @__PURE__ */ jsx(BrandWordmark, { size: 2.4 * 16 }),
                  /* @__PURE__ */ jsx(Name, { className: "text-[1.7em]" })
                ] }),
                /* @__PURE__ */ jsxs("p", { className: "mt-[0.4em] text-[0.95em] text-muted-foreground", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-brand-period", children: "~ %" }),
                  " ",
                  install ?? "bun add @martinzachariassen/design",
                  /* @__PURE__ */ jsx(
                    "span",
                    {
                      className: "ml-[0.15em] inline-block h-[1.05em] w-[0.55em] translate-y-[0.15em] animate-blink bg-accent align-middle",
                      "aria-hidden": true
                    }
                  )
                ] }),
                description ? /* @__PURE__ */ jsxs("p", { className: "text-[0.9em] text-muted-foreground", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-muted-foreground/60", children: "# " }),
                  description
                ] }) : null,
                badges?.length ? /* @__PURE__ */ jsx("div", { className: "mt-[0.5em] flex flex-wrap gap-[0.5em]", children: badges.map((b) => /* @__PURE__ */ jsx(Badge2, { children: b }, b)) }) : null
              ] })
            ] }),
            layout === "split" && /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "relative flex w-[36%] flex-col items-center justify-center gap-[1em]",
                  style: { background: "var(--foreground)", color: "var(--background)" },
                  children: [
                    /* @__PURE__ */ jsx(GridBackground, { cell: 30, className: "opacity-40" }),
                    /* @__PURE__ */ jsx(BrandMark, { size: 4.6 * 16, variant: "glyph", glyph: "var(--background)" }),
                    /* @__PURE__ */ jsx(
                      BrandWordmark,
                      {
                        size: 2.2 * 16,
                        period: "var(--accent)",
                        style: { color: "var(--background)" }
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "relative flex flex-1 flex-col justify-center gap-[0.6em] p-[3.2em]", children: [
                eyebrow ? /* @__PURE__ */ jsx("p", { className: "font-mono text-[0.8em] uppercase tracking-[0.26em] text-muted-foreground", children: eyebrow }) : null,
                /* @__PURE__ */ jsx(Name, { className: "text-[3em]" }),
                description ? /* @__PURE__ */ jsx("p", { className: "max-w-[92%] font-mono text-[0.98em] leading-relaxed text-muted-foreground", children: description }) : null,
                badges?.length ? /* @__PURE__ */ jsx("div", { className: "mt-[0.4em] flex flex-wrap gap-[0.5em]", children: badges.map((b) => /* @__PURE__ */ jsx(Badge2, { children: b }, b)) }) : null,
                install ? /* @__PURE__ */ jsxs("span", { className: "mt-[0.5em] inline-flex w-fit items-center gap-[0.6em] rounded-[var(--radius-sm)] border border-border bg-card px-[0.9em] py-[0.5em] font-mono text-[0.8em] text-foreground", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-brand-period", children: "$" }),
                  install
                ] }) : null
              ] })
            ] })
          ]
        }
      );
    }
  ),
  "RepoBanner"
);
var BASE_W2 = 1200;
var BASE_H2 = 630;
var SocialCard = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({
      title,
      eyebrow = "Martin Zachariassen",
      description,
      footer = "MLZ Design",
      tagline = "Design System",
      tag,
      accent,
      width = BASE_W2,
      marks = true,
      className,
      style,
      ...props
    }, ref) => {
      const scale = width / BASE_W2;
      const cornerMark = (position) => /* @__PURE__ */ jsx("span", { "aria-hidden": true, className: cn("absolute h-[1.5em] w-[1.5em] border-accent", position) });
      return /* @__PURE__ */ jsxs(
        "div",
        {
          ref,
          "data-accent": accent,
          className: cn(
            "relative isolate overflow-hidden bg-background text-foreground",
            className
          ),
          style: {
            width,
            height: BASE_H2 * scale,
            fontSize: `${16 * scale}px`,
            ...style
          },
          ...props,
          children: [
            /* @__PURE__ */ jsx(GridBackground, { cell: 40 }),
            marks && /* @__PURE__ */ jsx(FloatingMarks, { count: 10, className: "opacity-40" }),
            /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-[1.5em] border border-border/70" }),
            cornerMark("top-[1.5em] left-[1.5em] border-t-2 border-l-2"),
            cornerMark("top-[1.5em] right-[1.5em] border-t-2 border-r-2"),
            cornerMark("bottom-[1.5em] left-[1.5em] border-b-2 border-l-2"),
            cornerMark("bottom-[1.5em] right-[1.5em] border-b-2 border-r-2"),
            /* @__PURE__ */ jsxs("div", { className: "relative flex h-full flex-col justify-between p-[4.5em]", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
                /* @__PURE__ */ jsx(BrandLockup, { size: 3.2 * 16, tagline }),
                tag ? /* @__PURE__ */ jsx("span", { className: "rounded-[var(--radius-sm)] border border-border bg-card px-[0.9em] py-[0.4em] font-mono text-[0.72em] uppercase tracking-[0.16em] text-muted-foreground", children: tag }) : null
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "max-w-[85%]", children: [
                eyebrow ? /* @__PURE__ */ jsx("p", { className: "font-mono text-[0.9em] uppercase tracking-[0.28em] text-muted-foreground", children: eyebrow }) : null,
                /* @__PURE__ */ jsx("h1", { className: "mt-[0.5em] font-grotesk text-[4.6em] font-bold leading-[0.98] tracking-[-0.02em] text-foreground", children: title }),
                description ? /* @__PURE__ */ jsx("p", { className: "mt-[0.9em] max-w-[80%] font-mono text-[1.15em] leading-relaxed text-muted-foreground", children: description }) : null
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-t border-border pt-[1.4em]", children: [
                /* @__PURE__ */ jsx("span", { className: "font-mono text-[0.95em] uppercase tracking-[0.2em] text-foreground", children: footer }),
                /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-[0.6em] font-mono text-[0.8em] uppercase tracking-[0.16em] text-muted-foreground", children: [
                  /* @__PURE__ */ jsx("span", { className: "inline-block size-[0.6em] bg-accent", "aria-hidden": true }),
                  "open-graph \xB7 1200\xD7630"
                ] })
              ] })
            ] })
          ]
        }
      );
    }
  ),
  "SocialCard"
);
function strokeIcon(path, viewBox = "0 0 24 24") {
  return function Icon2({ className, ...props }) {
    return /* @__PURE__ */ jsx(
      "svg",
      {
        viewBox,
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 2,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        "aria-hidden": "true",
        className: cn("size-4 shrink-0", className),
        ...props,
        children: path
      }
    );
  };
}
var ChevronDownIcon = /* @__PURE__ */ strokeIcon(/* @__PURE__ */ jsx("path", { d: "m6 9 6 6 6-6" }));
var ChevronUpIcon = /* @__PURE__ */ strokeIcon(/* @__PURE__ */ jsx("path", { d: "m18 15-6-6-6 6" }));
var ChevronRightIcon = /* @__PURE__ */ strokeIcon(/* @__PURE__ */ jsx("path", { d: "m9 18 6-6-6-6" }));
var ChevronLeftIcon = /* @__PURE__ */ strokeIcon(/* @__PURE__ */ jsx("path", { d: "m15 18-6-6 6-6" }));
var CloseIcon = /* @__PURE__ */ strokeIcon(/* @__PURE__ */ jsx("path", { d: "M18 6 6 18M6 6l12 12" }));
var CheckIcon = /* @__PURE__ */ strokeIcon(/* @__PURE__ */ jsx("path", { d: "M3.5 8.5l3 3 6-7" }), "0 0 16 16");
var SearchIcon = /* @__PURE__ */ strokeIcon(
  /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("circle", { cx: "11", cy: "11", r: "7" }),
    /* @__PURE__ */ jsx("path", { d: "m20 20-3.5-3.5" })
  ] })
);
var SunIcon = /* @__PURE__ */ strokeIcon(
  /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "4" }),
    /* @__PURE__ */ jsx("path", { d: "M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" })
  ] })
);
var MoonIcon = /* @__PURE__ */ strokeIcon(
  /* @__PURE__ */ jsx("path", { d: "M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" })
);
var MonitorIcon = /* @__PURE__ */ strokeIcon(
  /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("rect", { x: "2", y: "4", width: "20", height: "13", rx: "2" }),
    /* @__PURE__ */ jsx("path", { d: "M8 21h8M12 17v4" })
  ] })
);
function DotIcon({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      viewBox: "0 0 8 8",
      fill: "currentColor",
      "aria-hidden": "true",
      className: cn("size-2 shrink-0", className),
      ...props,
      children: /* @__PURE__ */ jsx("circle", { cx: "4", cy: "4", r: "4" })
    }
  );
}
var THEMES = ["light", "dark", "system"];
var ACCENTS = ["cyan", "blue", "green", "rust", "ink"];
var ThemeContext = /* @__PURE__ */ React36.createContext(null);
var isBrowser = typeof window !== "undefined";
var useIsomorphicLayoutEffect = isBrowser ? React36.useLayoutEffect : React36.useEffect;
function readStored(key, fallback, allowed) {
  if (!isBrowser) return fallback;
  try {
    const value = window.localStorage.getItem(key);
    return value && allowed.includes(value) ? value : fallback;
  } catch {
    return fallback;
  }
}
function writeStored(key, value) {
  if (!isBrowser) return;
  try {
    window.localStorage.setItem(key, value);
  } catch {
  }
}
function applyToDocument(resolved, accent, attribute) {
  if (!isBrowser) return;
  const root = document.documentElement;
  if (attribute === "class") {
    root.classList.toggle("dark", resolved === "dark");
  } else {
    root.setAttribute("data-theme", resolved);
  }
  root.setAttribute("data-accent", accent);
}
function ThemeProvider({
  children,
  defaultTheme = "system",
  defaultAccent = "cyan",
  storageKey = "mlz-theme",
  accentStorageKey = "mlz-accent",
  enableSystem = true,
  attribute = "class"
}) {
  const [theme, setThemeState] = React36.useState(defaultTheme);
  const [accent, setAccentState] = React36.useState(defaultAccent);
  const [systemDark, setSystemDark] = React36.useState(false);
  const effectiveTheme = !enableSystem && theme === "system" ? "light" : theme;
  const resolvedTheme = effectiveTheme === "system" ? systemDark ? "dark" : "light" : effectiveTheme;
  useIsomorphicLayoutEffect(() => {
    setThemeState(readStored(storageKey, defaultTheme, THEMES));
    setAccentState(readStored(accentStorageKey, defaultAccent, ACCENTS));
  }, [storageKey, accentStorageKey, defaultTheme, defaultAccent]);
  useIsomorphicLayoutEffect(() => {
    if (!isBrowser || !enableSystem) return;
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => setSystemDark(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [enableSystem]);
  useIsomorphicLayoutEffect(() => {
    applyToDocument(resolvedTheme, accent, attribute);
  }, [resolvedTheme, accent, attribute]);
  const setTheme = React36.useCallback(
    (next) => {
      setThemeState(next);
      writeStored(storageKey, next);
    },
    [storageKey]
  );
  const setAccent = React36.useCallback(
    (next) => {
      setAccentState(next);
      writeStored(accentStorageKey, next);
    },
    [accentStorageKey]
  );
  const value = React36.useMemo(
    () => ({ theme, setTheme, resolvedTheme, accent, setAccent, enableSystem }),
    [theme, setTheme, resolvedTheme, accent, setAccent, enableSystem]
  );
  return /* @__PURE__ */ jsx(ThemeContext.Provider, { value, children });
}
function useTheme() {
  const ctx = React36.useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a <ThemeProvider>.");
  }
  return ctx;
}
function themeInitScript(options = {}) {
  const {
    storageKey = "mlz-theme",
    accentStorageKey = "mlz-accent",
    defaultTheme = "system",
    defaultAccent = "cyan",
    attribute = "class"
  } = options;
  const s = (value) => JSON.stringify(value).replace(/</g, "\\u003c").replace(/>/g, "\\u003e").replace(/&/g, "\\u0026").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  const write = attribute === "class" ? `d.classList.toggle("dark",r==="dark");` : `d.setAttribute("data-theme",r);`;
  return `(function(){try{var d=document.documentElement;var t=localStorage.getItem(${s(storageKey)})||${s(defaultTheme)};var a=localStorage.getItem(${s(accentStorageKey)})||${s(defaultAccent)};var r=t==="system"?(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"):t;${write}d.setAttribute("data-accent",a);}catch(e){}})();`;
}
var RadioGroup = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    RadioGroupPrimitive.Root,
    {
      ref,
      "data-slot": "radio-group",
      className: cn("grid gap-2.5", className),
      ...props
    }
  )),
  "RadioGroup"
);
var RadioGroupItem = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    RadioGroupPrimitive.Item,
    {
      ref,
      "data-slot": "radio-group-item",
      className: cn(
        // size-5 matches Checkbox — the two sit side by side in real forms.
        "flex size-5 shrink-0 items-center justify-center rounded-full border-[1.5px] border-input bg-background transition-colors duration-200 ease-[var(--ease-out)]",
        "data-[state=checked]:border-primary",
        "focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(RadioGroupPrimitive.Indicator, { className: "flex items-center justify-center", children: /* @__PURE__ */ jsx(DotIcon, { className: "size-2.5 text-primary" }) })
    }
  )),
  "RadioGroupItem"
);
var toggleVariants = /* @__PURE__ */ cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-sm)] font-mono text-xs uppercase tracking-[0.14em] transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        /** Text only until pressed — the quiet default, for a row of them. */
        default: "bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground data-[state=on]:bg-accent-subtle data-[state=on]:text-foreground",
        /**
         * Carries a hairline border, so a lone toggle still reads as a control.
         * Hover borders use `--ring` (the `-deep` rung), not the base accent —
         * the base is 1.83:1 on paper, *below* `border-input`, so hovering would
         * make the control's boundary fainter. The pressed border keeps the base
         * accent: there the state is carried by the tinted fill, not the border.
         */
        outline: "border-[1.5px] border-input bg-transparent text-muted-foreground hover:border-ring hover:text-foreground data-[state=on]:border-accent data-[state=on]:bg-accent-subtle data-[state=on]:text-foreground"
      },
      size: {
        sm: "h-9 px-3 text-[11px]",
        default: "h-11 px-4",
        lg: "h-12 px-5 text-sm",
        icon: "size-11 px-0"
      }
    },
    defaultVariants: { variant: "default", size: "default" }
  }
);
var Toggle = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ className, variant, size, ...props }, ref) => /* @__PURE__ */ jsx(
      TogglePrimitive.Root,
      {
        ref,
        "data-slot": "toggle",
        className: cn(toggleVariants({ variant, size }), className),
        ...props
      }
    )
  ),
  "Toggle"
);
var ToggleGroupContext = /* @__PURE__ */ React36.createContext({});
var ToggleGroup = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(({ className, variant, size, children, ...props }, ref) => {
    const context = React36.useMemo(() => ({ variant, size }), [variant, size]);
    return /* @__PURE__ */ jsx(
      ToggleGroupPrimitive.Root,
      {
        ref,
        "data-slot": "toggle-group",
        className: cn("flex items-center gap-1", className),
        ...props,
        children: /* @__PURE__ */ jsx(ToggleGroupContext.Provider, { value: context, children })
      }
    );
  }),
  "ToggleGroup"
);
var ToggleGroupItem = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(({ className, variant, size, ...props }, ref) => {
    const context = React36.useContext(ToggleGroupContext);
    return /* @__PURE__ */ jsx(
      ToggleGroupPrimitive.Item,
      {
        ref,
        "data-slot": "toggle-group-item",
        className: cn(
          toggleVariants({ variant: variant ?? context.variant, size: size ?? context.size }),
          className
        ),
        ...props
      }
    );
  }),
  "ToggleGroupItem"
);
var THEMES2 = [
  { value: "light", label: "Light", Icon: SunIcon },
  { value: "dark", label: "Dark", Icon: MoonIcon },
  { value: "system", label: "System", Icon: MonitorIcon }
];
var ThemeToggle = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ className, iconOnly, hideSystem, ...props }, ref) => {
      const { theme, setTheme, enableSystem } = useTheme();
      const showSystem = hideSystem === void 0 ? enableSystem : !hideSystem;
      const options = showSystem ? THEMES2 : THEMES2.filter((t) => t.value !== "system");
      return /* @__PURE__ */ jsx("div", { ref, "data-slot": "theme-toggle", className, ...props, children: /* @__PURE__ */ jsx(
        ToggleGroup,
        {
          type: "single",
          variant: "outline",
          size: "sm",
          value: theme,
          onValueChange: (next) => next && setTheme(next),
          "aria-label": "Colour theme",
          className: "gap-0 [&>*:not(:first-child)]:-ml-[1.5px]",
          children: options.map(({ value, label, Icon: Icon2 }) => /* @__PURE__ */ jsxs(
            ToggleGroupItem,
            {
              value,
              "aria-label": iconOnly ? label : void 0,
              className: "relative rounded-none first:rounded-l-[var(--radius-sm)] last:rounded-r-[var(--radius-sm)] hover:z-10 focus-visible:z-10 data-[state=on]:z-10",
              children: [
                /* @__PURE__ */ jsx(Icon2, {}),
                iconOnly ? null : label
              ]
            },
            value
          ))
        }
      ) });
    }
  ),
  "ThemeToggle"
);
var ALL_ACCENTS = /* @__PURE__ */ Object.keys(accents);
var AccentPicker = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ className, families = ALL_ACCENTS, ...props }, ref) => {
      const { accent, setAccent } = useTheme();
      return /* @__PURE__ */ jsx("div", { ref, "data-slot": "accent-picker", className, ...props, children: /* @__PURE__ */ jsx(
        RadioGroup,
        {
          value: accent,
          onValueChange: (next) => setAccent(next),
          "aria-label": "Accent family",
          className: "flex items-center gap-2",
          children: families.map((name) => /* @__PURE__ */ jsx(
            RadioGroupItem,
            {
              value: name,
              "aria-label": name,
              className: "size-6 transition-transform hover:scale-105 data-[state=checked]:scale-110 data-[state=checked]:border-foreground",
              style: { background: accents[name].base }
            },
            name
          ))
        }
      ) });
    }
  ),
  "AccentPicker"
);
var avatarVariants = /* @__PURE__ */ cva("relative inline-flex shrink-0", {
  variants: {
    size: {
      xs: "size-6 text-[9px]",
      sm: "size-8 text-[10px]",
      default: "size-10 text-xs",
      lg: "size-14 text-sm",
      xl: "size-20 text-lg"
    },
    shape: {
      circle: "",
      square: ""
    }
  },
  defaultVariants: { size: "default", shape: "circle" }
});
var frameShape = {
  circle: "rounded-full",
  square: "rounded-[var(--radius-md)]"
};
var statusColor = {
  online: "bg-success",
  away: "bg-warning",
  busy: "bg-destructive",
  offline: "bg-[var(--muted-foreground)]"
};
var Avatar = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ className, size, shape = "circle", status, children, ...props }, ref) => /* @__PURE__ */ jsxs(
      "span",
      {
        ref,
        "data-slot": "avatar",
        className: cn(avatarVariants({ size, shape }), className),
        ...props,
        children: [
          /* @__PURE__ */ jsx(
            AvatarPrimitive.Root,
            {
              "data-slot": "avatar-frame",
              className: cn(
                "flex size-full items-center justify-center overflow-hidden border border-border bg-secondary",
                frameShape[shape ?? "circle"]
              ),
              children
            }
          ),
          status ? /* @__PURE__ */ jsx(
            "span",
            {
              className: cn(
                "absolute right-0 bottom-0 block size-1/4 min-h-2 min-w-2 rounded-full ring-2 ring-background",
                statusColor[status]
              ),
              "aria-hidden": true
            }
          ) : null
        ]
      }
    )
  ),
  "Avatar"
);
var AvatarImage = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    AvatarPrimitive.Image,
    {
      ref,
      "data-slot": "avatar-image",
      className: cn("size-full object-cover", className),
      ...props
    }
  )),
  "AvatarImage"
);
var avatarFallbackVariants = /* @__PURE__ */ cva(
  "flex size-full items-center justify-center font-mono uppercase tracking-[0.08em]",
  {
    variants: {
      tone: {
        default: "text-secondary-foreground",
        accent: "bg-accent text-accent-foreground",
        muted: "bg-muted text-muted-foreground"
      }
    },
    defaultVariants: { tone: "default" }
  }
);
var AvatarFallback = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(({ className, tone, ...props }, ref) => /* @__PURE__ */ jsx(
    AvatarPrimitive.Fallback,
    {
      ref,
      "data-slot": "avatar-fallback",
      className: cn(avatarFallbackVariants({ tone }), className),
      ...props
    }
  )),
  "AvatarFallback"
);
var AvatarGroup = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ className, max, size = "default", children, ...props }, ref) => {
      const items = React36.Children.toArray(children).filter(React36.isValidElement);
      const shown = typeof max === "number" ? items.slice(0, max) : items;
      const overflow = items.length - shown.length;
      return /* @__PURE__ */ jsxs(
        "div",
        {
          ref,
          "data-slot": "avatar-group",
          className: cn(
            // Members are elevated on focus-within so that when a consumer makes
            // them focusable (avatars as links), the focus ring isn't painted
            // over by the next overlapping sibling.
            "flex items-center -space-x-2 [&>*]:relative [&>*:focus-within]:z-10 [&_[data-slot=avatar-frame]]:ring-2 [&_[data-slot=avatar-frame]]:ring-background",
            className
          ),
          ...props,
          children: [
            shown,
            overflow > 0 ? /* @__PURE__ */ jsx(Avatar, { size, "aria-label": `${overflow} more`, children: /* @__PURE__ */ jsxs(AvatarFallback, { tone: "muted", children: [
              "+",
              overflow
            ] }) }) : null
          ]
        }
      );
    }
  ),
  "AvatarGroup"
);
var fallbackVariants = avatarFallbackVariants;
function useCopyToClipboard(resetMs = 2e3) {
  const [copied, setCopied] = React36.useState(false);
  React36.useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), resetMs);
    return () => clearTimeout(timer);
  }, [copied, resetMs]);
  const copy = React36.useCallback(async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      return true;
    } catch {
      return false;
    }
  }, []);
  return { copied, copy };
}
var Code = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "code",
    {
      ref,
      "data-slot": "code",
      className: cn(
        "rounded-[var(--radius-sm)] bg-secondary px-1.5 py-0.5 font-mono text-[0.85em] text-foreground",
        className
      ),
      ...props
    }
  )),
  "Code"
);
var CodeBlock = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ children, filename, copyable, copyLabel = "Copy code", className, ...props }, ref) => {
      const { copied, copy } = useCopyToClipboard();
      return /* @__PURE__ */ jsxs(
        "div",
        {
          ref,
          "data-slot": "code-block",
          className: cn(
            "overflow-hidden rounded-[var(--radius-md)] border border-border bg-secondary",
            className
          ),
          ...props,
          children: [
            filename || copyable ? /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3 border-b border-border px-4 py-2", children: [
              /* @__PURE__ */ jsx("span", { className: "truncate font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground", children: filename }),
              copyable ? /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  "aria-label": copyLabel,
                  onClick: () => void copy(children),
                  className: "inline-flex shrink-0 items-center gap-1.5 rounded-[var(--radius-sm)] px-1.5 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30",
                  children: [
                    copied ? /* @__PURE__ */ jsx(CheckIcon, { className: "size-3.5 text-success-deep" }) : null,
                    copied ? "Copied" : "Copy"
                  ]
                }
              ) : null
            ] }) : null,
            /* @__PURE__ */ jsx(
              "pre",
              {
                tabIndex: 0,
                className: "overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-inset focus-visible:ring-ring/30",
                children: /* @__PURE__ */ jsx("code", { children })
              }
            )
          ]
        }
      );
    }
  ),
  "CodeBlock"
);
var DataListContext = /* @__PURE__ */ React36.createContext("justify");
var DataList = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ layout = "justify", className, ...props }, ref) => /* @__PURE__ */ jsx(DataListContext.Provider, { value: layout, children: /* @__PURE__ */ jsx(
      "dl",
      {
        ref,
        "data-slot": "data-list",
        "data-layout": layout,
        className: cn(
          "flex flex-col",
          layout === "ledger" && "border-border border-l",
          className
        ),
        ...props
      }
    ) })
  ),
  "DataList"
);
var DataRow = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ label, mono, layout, className, children, ...props }, ref) => {
      const inherited = React36.useContext(DataListContext);
      const resolved = layout ?? inherited;
      const ledger = resolved === "ledger";
      const grid = ledger || resolved === "grid";
      return /* @__PURE__ */ jsxs(
        "div",
        {
          ref,
          "data-slot": "data-row",
          "data-layout": resolved,
          className: cn(
            "py-1.5",
            // The ledger rules the *tops* of rows and lightens them, so the run
            // reads as one ruled block hanging off the list's left edge; the
            // other layouts close each row with a full-weight rule instead.
            ledger ? "border-[color-mix(in_oklch,var(--border)_45%,transparent)] border-t first:border-t-0" : "border-border border-b last:border-b-0",
            grid ? "grid grid-cols-[var(--mlz-data-label,8rem)_minmax(0,1fr)] items-baseline gap-x-4 gap-y-1 max-[560px]:grid-cols-1 max-[560px]:gap-y-0.5" : "flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5 border-dashed",
            // The rule and its padding are the gutter in a ledger; the grid gap
            // on top of them would open a visible gap beside the rule.
            ledger && "gap-x-0",
            className
          ),
          ...props,
          children: [
            /* @__PURE__ */ jsx(
              "dt",
              {
                className: cn(
                  grid ? "font-mono text-[10px] text-muted-foreground uppercase tracking-[0.14em]" : "text-muted-foreground text-sm",
                  ledger && "pl-3.5"
                ),
                children: label
              }
            ),
            /* @__PURE__ */ jsx(
              "dd",
              {
                className: cn(
                  "m-0 break-words text-foreground text-sm",
                  grid ? "min-w-0" : "max-w-[64%] text-right",
                  // The second rule only makes sense while there are two columns —
                  // once the grid collapses it would be a stray mark down the page.
                  ledger && "border-[color-mix(in_oklch,var(--border)_55%,transparent)] border-l pl-4 max-[560px]:border-l-0 max-[560px]:pl-3.5",
                  mono && "font-mono text-[0.9em]"
                ),
                children
              }
            )
          ]
        }
      );
    }
  ),
  "DataRow"
);
var Kbd = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "kbd",
    {
      ref,
      className: cn(
        "inline-flex min-w-6 items-center justify-center rounded-[var(--radius-sm)] border border-border bg-muted px-1.5 py-0.5 font-mono text-[11px] leading-none text-muted-foreground",
        className
      ),
      ...props
    }
  )),
  "Kbd"
);
var linkVariants = /* @__PURE__ */ cva(
  "rounded-[var(--radius-sm)] transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30",
  {
    variants: {
      variant: {
        /** Underlined in running text, where the underline is what marks it as a link. */
        default: "text-foreground underline decoration-border underline-offset-4 hover:decoration-accent-deep hover:text-accent-deep",
        /**
         * Accent-coloured, underline only on hover — **for links that stand
         * alone**, not for links inside a paragraph. In running text the
         * underline is the only thing distinguishing a link from its
         * surroundings, and colour alone fails WCAG 1.4.1 (axe flags it as
         * `link-in-text-block`). Use `default` there.
         *
         * Uses `--accent-deep`, not `--accent`: the plain accent is a
         * fill-and-border colour (cyan measures 1.8:1 on paper) and fails AA as
         * text. `Prose` colours its links the same way.
         */
        subtle: "text-[var(--accent-deep)] hover:underline hover:underline-offset-4",
        /** Muted until hovered, for footers and dense secondary navigation. */
        quiet: "text-muted-foreground hover:text-foreground"
      }
    },
    defaultVariants: { variant: "default" }
  }
);
var Link = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ className, variant, asChild, external, children, target, rel, ...props }, ref) => {
      const Comp = asChild ? Slot : "a";
      return /* @__PURE__ */ jsx(
        Comp,
        {
          ref,
          "data-slot": "link",
          target: external ? target ?? "_blank" : target,
          rel: external ? rel ?? "noopener noreferrer" : rel,
          className: cn(linkVariants({ variant }), className),
          ...props,
          children: asChild ? children : /* @__PURE__ */ jsxs(Fragment, { children: [
            children,
            external ? /* @__PURE__ */ jsxs(Fragment, { children: [
              " ",
              /* @__PURE__ */ jsx("span", { className: "sr-only", children: "(opens in a new tab)" })
            ] }) : null
          ] })
        }
      );
    }
  ),
  "Link"
);
var Prose = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      "data-slot": "prose",
      className: cn(
        "max-w-prose font-grotesk text-[15px] leading-[1.75] text-foreground",
        // vertical rhythm
        "[&>*+*]:mt-5",
        // headings
        "[&_h1]:mt-10 [&_h1]:mb-4 [&_h1]:font-hand [&_h1]:text-4xl [&_h1]:leading-tight [&_h1]:tracking-tight [&_h1]:text-foreground",
        "[&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:font-grotesk [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:leading-snug [&_h2]:tracking-tight [&_h2]:text-foreground",
        "[&_h3]:mt-8 [&_h3]:mb-2 [&_h3]:font-grotesk [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-foreground",
        "[&_h4]:mt-6 [&_h4]:mb-2 [&_h4]:font-mono [&_h4]:text-xs [&_h4]:font-bold [&_h4]:uppercase [&_h4]:tracking-[0.12em] [&_h4]:text-muted-foreground",
        // body
        "[&_p]:text-foreground/85",
        "[&_a]:font-medium [&_a]:text-[var(--accent-deep)] [&_a]:underline [&_a]:decoration-from-font [&_a]:underline-offset-[3px] hover:[&_a]:decoration-accent-deep",
        "[&_strong]:font-bold [&_strong]:text-foreground",
        "[&_em]:italic",
        // lists
        "[&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mt-1.5 [&_li]:pl-1 [&_li]:marker:text-accent-deep",
        // lead paragraph (first paragraph after an h1)
        "[&_h1+p]:text-lg [&_h1+p]:leading-relaxed [&_h1+p]:text-muted-foreground",
        // blockquote
        "[&_blockquote]:border-l-2 [&_blockquote]:border-accent [&_blockquote]:pl-4 [&_blockquote]:font-serif [&_blockquote]:text-lg [&_blockquote]:text-muted-foreground [&_blockquote]:italic",
        // code
        "[&_code]:rounded-[var(--radius-sm)] [&_code]:bg-secondary [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.85em] [&_code]:text-foreground",
        "[&_pre]:overflow-x-auto [&_pre]:rounded-[var(--radius-md)] [&_pre]:border [&_pre]:border-border [&_pre]:bg-secondary [&_pre]:p-4 [&_pre]:font-mono [&_pre]:text-[13px] [&_pre]:leading-relaxed",
        "[&_pre_code]:bg-transparent [&_pre_code]:p-0",
        // media & rules
        "[&_img]:rounded-[var(--radius-md)] [&_img]:border [&_img]:border-border",
        "[&_hr]:my-8 [&_hr]:border-border",
        // tables
        "[&_table]:w-full [&_table]:border-collapse [&_table]:text-sm",
        "[&_th]:border-b [&_th]:border-border [&_th]:py-2 [&_th]:pr-4 [&_th]:text-left [&_th]:font-mono [&_th]:text-[11px] [&_th]:uppercase [&_th]:tracking-[0.1em] [&_th]:text-muted-foreground",
        "[&_td]:border-b [&_td]:border-border [&_td]:py-2 [&_td]:pr-4",
        className
      ),
      ...props
    }
  )),
  "Prose"
);
var statusDotVariants = /* @__PURE__ */ cva("relative inline-flex size-2 shrink-0", {
  variants: {
    variant: {
      success: "text-success-deep",
      warning: "text-warning-deep",
      destructive: "text-destructive-deep",
      info: "text-info-deep",
      accent: "text-accent-deep",
      muted: "text-muted-foreground"
    }
  },
  defaultVariants: { variant: "muted" }
});
var StatusDot = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ variant, pulse, label, className, ...props }, ref) => {
      const a11y = label ? { role: "img", "aria-label": label } : { "aria-hidden": true };
      return /* @__PURE__ */ jsxs(
        "span",
        {
          ref,
          "data-slot": "status-dot",
          className: cn(statusDotVariants({ variant }), className),
          ...a11y,
          ...props,
          children: [
            pulse ? /* @__PURE__ */ jsx("span", { className: "absolute inline-flex size-full animate-ping rounded-full bg-current opacity-60 motion-reduce:hidden" }) : null,
            /* @__PURE__ */ jsx("span", { className: "relative inline-flex size-full rounded-full bg-current" })
          ]
        }
      );
    }
  ),
  "StatusDot"
);
var Readout = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
      "dl",
      {
        ref,
        "data-slot": "readout",
        className: cn(
          "m-0 grid grid-flow-col auto-cols-fr border-border border-y",
          // Narrow: one line still, but scrolled rather than stacked. The
          // scrollbar is hidden because the clipped cell at the edge is the
          // affordance, and a permanent bar would eat a third of a cell.
          "max-[720px]:auto-cols-[minmax(46%,auto)] max-[720px]:snap-x max-[720px]:snap-proximity max-[720px]:overflow-x-auto max-[720px]:[scrollbar-width:none] max-[720px]:[&::-webkit-scrollbar]:hidden",
          className
        ),
        ...props
      }
    )
  ),
  "Readout"
);
var ReadoutCell = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ label, dot, className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
      "div",
      {
        ref,
        "data-slot": "readout-cell",
        className: cn(
          // `relative` is load-bearing, not cosmetic. Below 720px the band is an
          // `overflow-x: auto` scroller, and an `sr-only` span (which is
          // `position: absolute`) inside a cell would otherwise resolve its
          // containing block to the page root: it escapes the clip, lands at its
          // static position hundreds of pixels to the right, and stretches the
          // document sideways. Positioning the cell keeps it inside.
          "relative min-w-0 border-border border-l px-4 py-3.5 first:border-l-0 first:pl-0 max-[720px]:snap-start",
          className
        ),
        ...props,
        children: [
          /* @__PURE__ */ jsx("dt", { className: "mb-1.5 font-mono text-[10px] text-muted-foreground uppercase tracking-[0.16em]", children: label }),
          /* @__PURE__ */ jsxs("dd", { className: "m-0 flex min-w-0 items-center gap-2 font-mono text-[13.5px] text-foreground", children: [
            dot ? /* @__PURE__ */ jsx(StatusDot, { variant: dot, className: "size-[7px]" }) : null,
            /* @__PURE__ */ jsx("span", { className: "truncate", children })
          ] })
        ]
      }
    )
  ),
  "ReadoutCell"
);
var deltaVariants = /* @__PURE__ */ cva("font-mono text-xs tabular-nums", {
  variants: {
    direction: {
      up: "text-[var(--success-deep)]",
      down: "text-[var(--destructive-deep)]",
      flat: "text-muted-foreground"
    }
  },
  defaultVariants: { direction: "flat" }
});
var Stat = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, "data-slot": "stat", className: cn("flex flex-col gap-1", className), ...props })
  ),
  "Stat"
);
var StatLabel = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "p",
    {
      ref,
      "data-slot": "stat-label",
      className: cn(
        "font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground",
        className
      ),
      ...props
    }
  )),
  "StatLabel"
);
var StatValue = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "p",
    {
      ref,
      "data-slot": "stat-value",
      className: cn("font-grotesk text-3xl font-bold tabular-nums tracking-tight", className),
      ...props
    }
  )),
  "StatValue"
);
var StatDelta = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ className, direction, ...props }, ref) => /* @__PURE__ */ jsx(
      "p",
      {
        ref,
        "data-slot": "stat-delta",
        className: cn(deltaVariants({ direction }), className),
        ...props
      }
    )
  ),
  "StatDelta"
);
var statusChipVariants = /* @__PURE__ */ cva(
  "inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-3 py-1.5 font-sans text-sm leading-none transition-colors",
  {
    variants: {
      variant: {
        success: "border-[color-mix(in_oklch,var(--success)_40%,transparent)] bg-success-subtle text-foreground",
        warning: "border-[color-mix(in_oklch,var(--warning)_46%,transparent)] bg-warning-subtle text-foreground",
        destructive: "border-[color-mix(in_oklch,var(--destructive)_40%,transparent)] bg-destructive-subtle text-foreground",
        info: "border-[color-mix(in_oklch,var(--info)_36%,transparent)] bg-info-subtle text-foreground",
        accent: "border-[color-mix(in_oklch,var(--accent)_40%,transparent)] bg-accent-subtle text-foreground",
        muted: "border-border bg-card text-muted-foreground"
      }
    },
    defaultVariants: { variant: "muted" }
  }
);
var StatusChip = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ variant, dot = true, pulse, className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
      "span",
      {
        ref,
        "data-slot": "status-chip",
        className: cn(statusChipVariants({ variant }), className),
        ...props,
        children: [
          dot ? /* @__PURE__ */ jsx(
            StatusDot,
            {
              variant,
              pulse,
              className: "size-1.5"
            }
          ) : null,
          children
        ]
      }
    )
  ),
  "StatusChip"
);
var Table = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ className, containerClassName, ...props }, ref) => (
      // A scrollable box must be reachable by keyboard (WCAG 2.1.1, and axe's
      // `scrollable-region-focusable`), or someone who can't drag horizontally
      // simply can't read the far columns. Deliberately no `role="region"`: that
      // would be a landmark, and a landmark with no accessible name is worse than
      // none. The table names itself, via `TableCaption` or `aria-label`.
      /* @__PURE__ */ jsx(
        "div",
        {
          "data-slot": "table-container",
          className: cn("relative w-full overflow-x-auto", containerClassName),
          tabIndex: 0,
          children: /* @__PURE__ */ jsx(
            "table",
            {
              ref,
              "data-slot": "table",
              className: cn("w-full caption-bottom border-collapse text-sm", className),
              ...props
            }
          )
        }
      )
    )
  ),
  "Table"
);
var TableHeader = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("thead", { ref, "data-slot": "table-header", className: cn(className), ...props })),
  "TableHeader"
);
var TableBody = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("tbody", { ref, "data-slot": "table-body", className: cn(className), ...props })),
  "TableBody"
);
var TableFooter = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "tfoot",
    {
      ref,
      "data-slot": "table-footer",
      className: cn("border-t border-border font-medium [&>tr]:border-0", className),
      ...props
    }
  )),
  "TableFooter"
);
var TableRow = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
      "tr",
      {
        ref,
        "data-slot": "table-row",
        className: cn(
          "border-b border-border transition-colors",
          "hover:bg-secondary/50 data-[state=selected]:bg-accent-subtle",
          className
        ),
        ...props
      }
    )
  ),
  "TableRow"
);
var TableHead = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ className, scope = "col", sort, ...props }, ref) => /* @__PURE__ */ jsx(
      "th",
      {
        ref,
        scope,
        "aria-sort": sort === "asc" ? "ascending" : sort === "desc" ? "descending" : void 0,
        "data-slot": "table-head",
        className: cn(
          "border-b border-border py-2 pr-4 text-left align-middle font-mono text-[11px] font-normal uppercase tracking-[0.1em] text-muted-foreground",
          "[&[align=right]]:text-right [&[align=center]]:text-center",
          className
        ),
        ...props
      }
    )
  ),
  "TableHead"
);
var TableSortButton = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ className, sort = "none", children, type, ...props }, ref) => /* @__PURE__ */ jsxs(
      "button",
      {
        ref,
        type: type ?? "button",
        "data-slot": "table-sort-button",
        className: cn(
          "-my-1 inline-flex items-center gap-1 rounded-[var(--radius-sm)] py-1 font-mono text-[11px] uppercase tracking-[0.1em] transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30",
          sort !== "none" ? "text-foreground" : "text-muted-foreground",
          className
        ),
        ...props,
        children: [
          children,
          /* @__PURE__ */ jsxs(
            "svg",
            {
              "aria-hidden": "true",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: 2.5,
              strokeLinecap: "round",
              strokeLinejoin: "round",
              className: "size-3 shrink-0",
              children: [
                /* @__PURE__ */ jsx("path", { d: "m7 10 5-5 5 5", className: sort === "asc" ? "" : "opacity-30" }),
                /* @__PURE__ */ jsx("path", { d: "m7 14 5 5 5-5", className: sort === "desc" ? "" : "opacity-30" })
              ]
            }
          )
        ]
      }
    )
  ),
  "TableSortButton"
);
var TableCell = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "td",
    {
      ref,
      "data-slot": "table-cell",
      className: cn(
        "py-2 pr-4 align-middle",
        "[&[align=right]]:text-right [&[align=center]]:text-center",
        className
      ),
      ...props
    }
  )),
  "TableCell"
);
var TableCaption = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "caption",
    {
      ref,
      "data-slot": "table-caption",
      className: cn("mt-3 text-left text-sm text-muted-foreground", className),
      ...props
    }
  )),
  "TableCaption"
);
var textVariants = /* @__PURE__ */ cva("", {
  variants: {
    variant: {
      body: "text-sm text-foreground",
      lead: "text-sm leading-relaxed text-muted-foreground",
      muted: "text-muted-foreground",
      mono: "font-mono text-[0.9em] text-foreground",
      eyebrow: "font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground"
    },
    size: {
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      /** Alias for `base`, so the control-scale word works here too. */
      default: "text-base",
      lg: "text-lg"
    }
  },
  defaultVariants: { variant: "body" }
});
var Text = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ as, variant, size, className, ...props }, ref) => {
      const Component = as ?? "span";
      return /* @__PURE__ */ jsx(
        Component,
        {
          ref,
          "data-slot": "text",
          className: cn(textVariants({ variant, size }), className),
          ...props
        }
      );
    }
  ),
  "Text"
);
var alertVariants = /* @__PURE__ */ cva(
  "relative grid w-full grid-cols-[0_1fr] items-start gap-y-1 rounded-[var(--radius-md)] border border-l-2 px-4 py-3 text-sm transition-colors has-[>svg]:grid-cols-[1rem_1fr] has-[>svg]:gap-x-3 [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "border-border bg-card text-card-foreground",
        info: "border-[var(--info)]/25 border-l-[var(--info)] bg-info-subtle text-info-deep",
        success: "border-[var(--success)]/25 border-l-[var(--success)] bg-success-subtle text-success-deep",
        warning: "border-[var(--warning)]/30 border-l-[var(--warning)] bg-warning-subtle text-warning-deep",
        destructive: "border-[var(--destructive)]/25 border-l-[var(--destructive)] bg-destructive-subtle text-destructive-deep"
      }
    },
    defaultVariants: { variant: "default" }
  }
);
var Alert = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ className, variant, ...props }, ref) => /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        role: "alert",
        "data-slot": "alert",
        className: cn(alertVariants({ variant }), className),
        ...props
      }
    )
  ),
  "Alert"
);
var AlertTitle = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "p",
    {
      ref,
      "data-slot": "alert-title",
      className: cn(
        "col-start-2 font-mono text-xs font-bold uppercase tracking-[0.1em] text-foreground",
        className
      ),
      ...props
    }
  )),
  "AlertTitle"
);
var AlertDescription = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "p",
    {
      ref,
      "data-slot": "alert-description",
      className: cn("col-start-2 text-sm text-muted-foreground [&_p]:leading-relaxed", className),
      ...props
    }
  )),
  "AlertDescription"
);
var calloutVariants = /* @__PURE__ */ cva("flex gap-2.5 text-sm text-muted-foreground", {
  variants: {
    variant: {
      success: "",
      warning: "",
      destructive: "",
      info: "",
      accent: "",
      muted: ""
    }
  },
  defaultVariants: { variant: "muted" }
});
var Callout = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ variant, title, description, pulse, className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
      "div",
      {
        ref,
        "data-slot": "callout",
        className: cn(calloutVariants({ variant }), className),
        ...props,
        children: [
          /* @__PURE__ */ jsx(StatusDot, { variant, pulse, className: "mt-1" }),
          /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsx("p", { className: "font-medium text-foreground", children: title }),
            description ? /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-[0.92em] text-muted-foreground", children: description }) : null,
            children
          ] })
        ]
      }
    )
  ),
  "Callout"
);
var emptyStateVariants = /* @__PURE__ */ cva(
  "flex flex-col items-center justify-center gap-4 rounded-[var(--radius-lg)] text-center",
  {
    variants: {
      variant: {
        /** A dashed outline — reads as a slot waiting to be filled. */
        dashed: "border border-dashed border-border",
        /** A plain hairline panel, for a list that is empty rather than unstarted. */
        outline: "border border-border",
        /** No container at all, for an empty state already inside a `Card`. */
        plain: ""
      },
      size: {
        sm: "px-6 py-8",
        default: "px-6 py-16"
      }
    },
    defaultVariants: { variant: "dashed", size: "default" }
  }
);
var EmptyState = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ className, variant, size, ...props }, ref) => /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        "data-slot": "empty-state",
        className: cn(emptyStateVariants({ variant, size }), className),
        ...props
      }
    )
  ),
  "EmptyState"
);
var EmptyStateMedia = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        "aria-hidden": "true",
        "data-slot": "empty-state-media",
        className: cn(
          "flex size-14 items-center justify-center rounded-[var(--radius-lg)] border border-border bg-accent-subtle",
          className
        ),
        ...props
      }
    )
  ),
  "EmptyStateMedia"
);
var EmptyStateTitle = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ as: Comp = "p", className, ...props }, ref) => /* @__PURE__ */ jsx(
      Comp,
      {
        ref,
        "data-slot": "empty-state-title",
        className: cn(
          "font-mono text-sm font-bold uppercase tracking-[0.1em] text-foreground",
          className
        ),
        ...props
      }
    )
  ),
  "EmptyStateTitle"
);
var EmptyStateDescription = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "p",
    {
      ref,
      "data-slot": "empty-state-description",
      className: cn("max-w-xs text-sm leading-relaxed text-muted-foreground", className),
      ...props
    }
  )),
  "EmptyStateDescription"
);
var EmptyStateActions = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        "data-slot": "empty-state-actions",
        className: cn("flex flex-wrap items-center justify-center gap-3", className),
        ...props
      }
    )
  ),
  "EmptyStateActions"
);
var FindingList = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
      "ul",
      {
        ref,
        "data-slot": "finding-list",
        className: cn("m-0 list-none border-border border-l p-0 pl-3.5", className),
        ...props
      }
    )
  ),
  "FindingList"
);
var FindingItem = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ title, variant, statusLabel, className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
      "li",
      {
        ref,
        "data-slot": "finding-item",
        className: cn(
          // A 45% mix, not the full border: the rules *between* findings are
          // lighter than the rule the list hangs on, so the group reads as one
          // block rather than a stack of separate rows.
          "border-[color-mix(in_oklch,var(--border)_45%,transparent)] border-t py-2.5 first:border-t-0 first:pt-0 last:pb-0",
          className
        ),
        ...props,
        children: [
          /* @__PURE__ */ jsxs("p", { className: "m-0 flex items-center gap-2.5 font-medium text-foreground text-sm", children: [
            /* @__PURE__ */ jsx(StatusDot, { variant, label: statusLabel }),
            title
          ] }),
          children ? (
            // Indented to clear the dot, so the explanation reads as belonging to
            // the line above it rather than as another finding.
            /* @__PURE__ */ jsx("p", { className: "mt-1 mb-0 ml-4 text-muted-foreground text-xs leading-relaxed", children })
          ) : null
        ]
      }
    )
  ),
  "FindingItem"
);
var progressIndicatorVariants = /* @__PURE__ */ cva(
  "h-full rounded-full transition-[width] duration-500 ease-[var(--ease-out)]",
  {
    variants: {
      variant: {
        default: "bg-primary",
        accent: "bg-accent"
      }
    },
    defaultVariants: { variant: "default" }
  }
);
var Progress = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(({ className, value = 0, variant, ...props }, ref) => {
    const pct = Math.min(100, Math.max(0, value));
    const hasLabel = props["aria-label"] != null || props["aria-labelledby"] != null;
    return /* @__PURE__ */ jsx(
      ProgressPrimitive.Root,
      {
        ref,
        "aria-label": hasLabel ? void 0 : "Progress",
        className: cn("h-2 w-full overflow-hidden rounded-full bg-muted", className),
        ...props,
        value: pct,
        max: 100,
        children: /* @__PURE__ */ jsx(
          ProgressPrimitive.Indicator,
          {
            className: cn(progressIndicatorVariants({ variant })),
            style: { width: `${pct}%` }
          }
        )
      }
    );
  }),
  "Progress"
);
var indicatorVariants = progressIndicatorVariants;
var Skeleton = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: cn("rounded-[var(--radius-sm)] bg-muted animate-pulse-soft", className),
        ...props
      }
    )
  ),
  "Skeleton"
);
var spinnerVariants = /* @__PURE__ */ cva(
  "inline-block animate-spin rounded-full border-current border-t-transparent text-accent-deep motion-reduce:animate-none",
  {
    variants: {
      size: {
        sm: "size-4 border-2",
        default: "size-6 border-2",
        lg: "size-8 border-[3px]"
      }
    },
    defaultVariants: { size: "default" }
  }
);
var Spinner = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ className, size, label = "Loading", ...props }, ref) => /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        role: "status",
        "aria-label": label,
        className: cn(spinnerVariants({ size }), className),
        ...props
      }
    )
  ),
  "Spinner"
);
var buttonVariants = /* @__PURE__ */ cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-sm)] font-mono text-xs uppercase tracking-[0.14em] transition-[transform,box-shadow,border-color,color] duration-[var(--dur-hover)] ease-[var(--ease-glide)] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-[var(--dur-hover)] [&_svg]:ease-[var(--ease-glide)] hover:[&_svg]:-translate-x-px hover:[&_svg]:-rotate-[4deg] focus-visible:[&_svg]:-translate-x-px focus-visible:[&_svg]:-rotate-[4deg]",
  {
    variants: {
      variant: {
        default: "border-[1.5px] border-primary bg-transparent text-foreground hover:-translate-x-0.5 hover:-translate-y-0.5 hover:border-accent hover:shadow-[5px_5px_0_0_var(--accent)] focus-visible:-translate-x-0.5 focus-visible:-translate-y-0.5 focus-visible:border-accent focus-visible:shadow-[5px_5px_0_0_var(--accent)]",
        solid: "border-[1.5px] border-primary bg-primary text-primary-foreground hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_var(--accent)] focus-visible:-translate-x-0.5 focus-visible:-translate-y-0.5 focus-visible:shadow-[5px_5px_0_0_var(--accent)]",
        accent: "bg-accent text-accent-foreground hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_var(--primary)] focus-visible:-translate-x-0.5 focus-visible:-translate-y-0.5 focus-visible:shadow-[5px_5px_0_0_var(--primary)]",
        /**
         * shadcn-vocabulary alias for `default`: MLZ's default *is* the outline
         * button, so pasted shadcn snippets and LLM-written call sites render
         * the intended look instead of failing to compile.
         */
        outline: "border-[1.5px] border-primary bg-transparent text-foreground hover:-translate-x-0.5 hover:-translate-y-0.5 hover:border-accent hover:shadow-[5px_5px_0_0_var(--accent)] focus-visible:-translate-x-0.5 focus-visible:-translate-y-0.5 focus-visible:border-accent focus-visible:shadow-[5px_5px_0_0_var(--accent)]",
        /** The quiet filled companion (shadcn's `secondary`): secondary surface, same lift. */
        secondary: "border-[1.5px] border-transparent bg-secondary text-foreground hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_var(--accent)] focus-visible:-translate-x-0.5 focus-visible:-translate-y-0.5 focus-visible:shadow-[5px_5px_0_0_var(--accent)]",
        ghost: "bg-transparent text-foreground hover:bg-muted",
        sketch: "border-[1.5px] border-dashed border-primary bg-transparent text-foreground hover:-translate-x-0.5 hover:-translate-y-0.5 hover:-rotate-[0.75deg] hover:border-accent hover:shadow-[4px_4px_0_0_var(--accent)] focus-visible:-translate-x-0.5 focus-visible:-translate-y-0.5 focus-visible:-rotate-[0.75deg] focus-visible:border-accent focus-visible:shadow-[4px_4px_0_0_var(--accent)]",
        destructive: "border-[1.5px] border-destructive bg-transparent text-destructive-deep hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_var(--destructive)] focus-visible:-translate-x-0.5 focus-visible:-translate-y-0.5 focus-visible:shadow-[5px_5px_0_0_var(--destructive)]",
        link: "text-foreground underline-offset-4 hover:text-[var(--accent-deep)] hover:underline"
      },
      size: {
        sm: "h-9 px-4 text-[11px]",
        default: "h-11 px-[22px]",
        lg: "h-12 px-7 text-sm",
        icon: "size-11"
      }
    },
    defaultVariants: { variant: "default", size: "default" }
  }
);
var Button = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ className, variant, size, asChild, type, ...props }, ref) => {
      const Comp = asChild ? Slot : "button";
      return /* @__PURE__ */ jsx(
        Comp,
        {
          ref,
          type: asChild ? type : type ?? "button",
          className: cn(buttonVariants({ variant, size }), className),
          ...props
        }
      );
    }
  ),
  "Button"
);
var Checkbox = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ className, id, ...props }, ref) => {
      const generatedId = React36.useId();
      const inputId = id ?? generatedId;
      return /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("input", { ref, id: inputId, type: "checkbox", className: "peer sr-only", ...props }),
        /* @__PURE__ */ jsx(
          "label",
          {
            htmlFor: inputId,
            className: cn(
              "flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-[var(--radius-sm)] border-[1.5px] border-input bg-background text-primary-foreground transition-colors duration-200 ease-[var(--ease-out)] peer-checked:border-primary peer-checked:bg-primary peer-checked:[&>svg]:scale-100 peer-checked:[&>svg]:opacity-100 peer-focus-visible:border-ring peer-focus-visible:ring-[3px] peer-focus-visible:ring-ring/30 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
              className
            ),
            children: /* @__PURE__ */ jsx(
              "svg",
              {
                className: "size-3.5 scale-0 opacity-0 transition-transform duration-200 ease-[var(--ease-out)]",
                viewBox: "0 0 16 16",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: 2.5,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                "aria-hidden": "true",
                children: /* @__PURE__ */ jsx("path", { d: "M3.5 8.5l3 3 6-7" })
              }
            )
          }
        )
      ] });
    }
  ),
  "Checkbox"
);
var ModalContext = /* @__PURE__ */ React36.createContext(null);
function useModal() {
  return React36.useContext(ModalContext);
}
function useModalPart(part) {
  const modal = useModal();
  const register = part === "title" ? modal?.setHasTitle : modal?.setHasDescription;
  React36.useEffect(() => {
    register?.(true);
    return () => register?.(false);
  }, [register]);
  return part === "title" ? modal?.titleId : modal?.descriptionId;
}
function ModalProvider({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  children
}) {
  const reactId = React36.useId();
  const titleId = `${reactId}-title`;
  const descriptionId = `${reactId}-description`;
  const [uncontrolledOpen, setUncontrolledOpen] = React36.useState(defaultOpen);
  const isControlled = openProp !== void 0;
  const open = isControlled ? openProp : uncontrolledOpen;
  const [hasTitle, setHasTitle] = React36.useState(false);
  const [hasDescription, setHasDescription] = React36.useState(false);
  const show = React36.useCallback(() => {
    if (!isControlled) setUncontrolledOpen(true);
    onOpenChange?.(true);
  }, [isControlled, onOpenChange]);
  const close = React36.useCallback(() => {
    if (!isControlled) setUncontrolledOpen(false);
    onOpenChange?.(false);
  }, [isControlled, onOpenChange]);
  const ctx = React36.useMemo(
    () => ({ open, show, close, titleId, descriptionId, setHasTitle, setHasDescription }),
    [open, show, close, titleId, descriptionId]
  );
  return /* @__PURE__ */ jsx(ModalContext.Provider, { value: ctx, children: /* @__PURE__ */ jsx(ModalPartsContext.Provider, { value: { hasTitle, hasDescription }, children }) });
}
var ModalPartsContext = /* @__PURE__ */ React36.createContext({ hasTitle: false, hasDescription: false });
function ModalDialog({
  className,
  slot,
  role,
  dismissOnBackdrop = true,
  children
}) {
  const ctx = useModal();
  const { hasTitle, hasDescription } = React36.useContext(ModalPartsContext);
  const ref = React36.useRef(null);
  const pressStartedOnBackdrop = React36.useRef(false);
  const open = ctx?.open ?? false;
  React36.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    else if (!open && el.open) el.close();
  }, [open]);
  const close = ctx?.close;
  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: backdrop dismissal is an enhancement; keyboard close (Esc) is handled natively by <dialog>
    /* @__PURE__ */ jsx(
      "dialog",
      {
        ref,
        role,
        "aria-labelledby": hasTitle ? ctx?.titleId : void 0,
        "aria-describedby": hasDescription ? ctx?.descriptionId : void 0,
        onClose: close,
        onMouseDown: (event) => {
          pressStartedOnBackdrop.current = dismissOnBackdrop && event.target === ref.current;
        },
        onClick: (event) => {
          if (dismissOnBackdrop && event.target === ref.current && pressStartedOnBackdrop.current) {
            close?.();
          }
          pressStartedOnBackdrop.current = false;
        },
        "data-slot": slot,
        className,
        children: open ? children : null
      }
    )
  );
}
var ModalTrigger = /* @__PURE__ */ React36.forwardRef(({ asChild, onClick, type, slot, ...props }, ref) => {
  const ctx = useModal();
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      ref,
      "data-slot": slot,
      type: asChild ? type : type ?? "button",
      onClick: (event) => {
        onClick?.(event);
        if (!event.defaultPrevented) ctx?.show();
      },
      ...props
    }
  );
});
var Command = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
      Command$1,
      {
        ref,
        "data-slot": "command",
        className: cn(
          "flex size-full flex-col overflow-hidden rounded-[var(--radius-lg)] bg-popover text-popover-foreground",
          className
        ),
        ...props
      }
    )
  ),
  "Command"
);
var CommandInput = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxs(
    "div",
    {
      className: "flex items-center gap-2.5 border-b border-border px-4",
      "data-slot": "command-input",
      children: [
        /* @__PURE__ */ jsx(SearchIcon, { className: "size-4 shrink-0 text-muted-foreground" }),
        /* @__PURE__ */ jsx(
          Command$1.Input,
          {
            ref,
            className: cn(
              "h-12 w-full bg-transparent font-mono text-sm text-foreground outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
              className
            ),
            ...props
          }
        )
      ]
    }
  )),
  "CommandInput"
);
var CommandList = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(({ className, ...props }, ref) => {
    const markSizerPresentational = React36.useCallback((node) => {
      node?.querySelector("[cmdk-list-sizer]")?.setAttribute("role", "presentation");
    }, []);
    return /* @__PURE__ */ jsx(
      Command$1.List,
      {
        ref: (node) => {
          markSizerPresentational(node);
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        },
        "data-slot": "command-list",
        className: cn("max-h-72 overflow-y-auto overflow-x-hidden p-1.5", className),
        ...props
      }
    );
  }),
  "CommandList"
);
var CommandEmpty = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    Command$1.Empty,
    {
      ref,
      "data-slot": "command-empty",
      className: cn("py-8 text-center text-sm text-muted-foreground", className),
      ...props
    }
  )),
  "CommandEmpty"
);
var CommandGroup = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    Command$1.Group,
    {
      ref,
      "data-slot": "command-group",
      className: cn(
        "overflow-hidden p-1 text-foreground",
        "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.14em] [&_[cmdk-group-heading]]:text-muted-foreground",
        className
      ),
      ...props
    }
  )),
  "CommandGroup"
);
var CommandItem = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    Command$1.Item,
    {
      ref,
      "data-slot": "command-item",
      className: cn(
        "relative flex cursor-default select-none items-center gap-2.5 rounded-[var(--radius-sm)] px-2.5 py-2 text-sm outline-none",
        "data-[selected=true]:bg-accent-subtle data-[selected=true]:text-foreground",
        "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
        className
      ),
      ...props
    }
  )),
  "CommandItem"
);
var CommandSeparator = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    Command$1.Separator,
    {
      ref: (node) => {
        node?.setAttribute("role", "presentation");
        node?.setAttribute("aria-hidden", "true");
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      "data-slot": "command-separator",
      className: cn("-mx-1.5 my-1 h-px bg-border", className),
      ...props
    }
  )),
  "CommandSeparator"
);
var CommandShortcut = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
      "span",
      {
        ref,
        "data-slot": "command-shortcut",
        className: cn(
          "ml-auto font-mono text-[11px] tracking-[0.1em] text-muted-foreground",
          className
        ),
        ...props
      }
    )
  ),
  "CommandShortcut"
);
function CommandDialog({
  open,
  defaultOpen,
  onOpenChange,
  label,
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(ModalProvider, { open, defaultOpen, onOpenChange, children: /* @__PURE__ */ jsx(
    ModalDialog,
    {
      slot: "command-dialog",
      className: "m-auto mt-[12vh] w-[calc(100%-2rem)] max-w-xl overflow-visible bg-transparent p-0 text-foreground backdrop:bg-[var(--overlay)] backdrop:backdrop-blur-[2px]",
      children: /* @__PURE__ */ jsx(
        Command,
        {
          "aria-label": label,
          className: cn(
            "border border-border shadow-[var(--shadow-lg)] motion-safe:animate-rise",
            className
          ),
          ...props,
          children
        }
      )
    }
  ) });
}
function Popover(props) {
  return /* @__PURE__ */ jsx(PopoverPrimitive.Root, { ...props });
}
var PopoverTrigger = PopoverPrimitive.Trigger;
var PopoverAnchor = PopoverPrimitive.Anchor;
var PopoverClose = PopoverPrimitive.Close;
var PopoverContent = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(({ className, align = "center", side = "bottom", sideOffset = 8, ...props }, ref) => /* @__PURE__ */ jsx(PopoverPrimitive.Portal, { children: /* @__PURE__ */ jsx(
    PopoverPrimitive.Content,
    {
      ref,
      align,
      side,
      sideOffset,
      collisionPadding: 8,
      "data-slot": "popover-content",
      className: cn(
        "z-50 w-72 max-w-[calc(100vw-1rem)] rounded-[var(--radius-lg)] border border-border bg-popover p-4 text-popover-foreground shadow-[var(--shadow-lg)] outline-none motion-safe:animate-rise",
        className
      ),
      ...props
    }
  ) })),
  "PopoverContent"
);
var Label = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
      LabelPrimitive.Root,
      {
        ref,
        className: cn(
          "font-mono text-xs uppercase tracking-[0.1em] text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
          className
        ),
        ...props
      }
    )
  ),
  "Label"
);
var FieldContext = /* @__PURE__ */ React36.createContext(null);
function useField() {
  return React36.useContext(FieldContext);
}
function useFieldControlProps() {
  const field = useField();
  if (!field) return {};
  const describedBy = [field.hasDescription && field.descriptionId, field.hasError && field.errorId].filter(Boolean).join(" ") || void 0;
  return {
    id: field.controlId,
    "aria-describedby": describedBy,
    "aria-invalid": field.invalid || void 0,
    disabled: field.disabled || void 0
  };
}
var Field = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ id, invalid = false, disabled = false, className, children, ...props }, ref) => {
      const reactId = React36.useId();
      const controlId = id ?? `${reactId}-control`;
      const [hasDescription, setHasDescription] = React36.useState(false);
      const [hasError, setHasError] = React36.useState(false);
      const register = React36.useCallback((part, present) => {
        if (part === "description") setHasDescription(present);
        else setHasError(present);
      }, []);
      const ctx = React36.useMemo(
        () => ({
          controlId,
          descriptionId: `${reactId}-description`,
          errorId: `${reactId}-error`,
          invalid,
          disabled,
          hasDescription,
          hasError,
          register
        }),
        [controlId, reactId, invalid, disabled, hasDescription, hasError, register]
      );
      return /* @__PURE__ */ jsx(FieldContext.Provider, { value: ctx, children: /* @__PURE__ */ jsx(
        "div",
        {
          ref,
          "data-slot": "field",
          "data-invalid": invalid || void 0,
          "data-disabled": disabled || void 0,
          className: cn("flex flex-col gap-1.5", className),
          ...props,
          children
        }
      ) });
    }
  ),
  "Field"
);
var FieldLabel = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ htmlFor, className, ...props }, ref) => {
      const field = useField();
      return /* @__PURE__ */ jsx(
        Label,
        {
          ref,
          htmlFor: htmlFor ?? field?.controlId,
          "data-slot": "field-label",
          className: cn(field?.disabled && "cursor-not-allowed opacity-50", className),
          ...props
        }
      );
    }
  ),
  "FieldLabel"
);
var FieldDescription = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(({ className, ...props }, ref) => {
    const field = useField();
    const register = field?.register;
    React36.useEffect(() => {
      register?.("description", true);
      return () => register?.("description", false);
    }, [register]);
    return /* @__PURE__ */ jsx(
      "p",
      {
        ref,
        id: field?.descriptionId,
        "data-slot": "field-description",
        className: cn("text-[13px] leading-relaxed text-muted-foreground", className),
        ...props
      }
    );
  }),
  "FieldDescription"
);
var FieldError = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(({ className, children, ...props }, ref) => {
    const field = useField();
    const register = field?.register;
    const present = children !== void 0 && children !== null && children !== false;
    React36.useEffect(() => {
      register?.("error", present);
      return () => register?.("error", false);
    }, [register, present]);
    if (!present) return null;
    return /* @__PURE__ */ jsx(
      "p",
      {
        ref,
        id: field?.errorId,
        role: "alert",
        "data-slot": "field-error",
        className: cn("text-[13px] leading-relaxed text-destructive-deep", className),
        ...props,
        children
      }
    );
  }),
  "FieldError"
);
var Combobox = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({
      options,
      value: valueProp,
      defaultValue,
      onValueChange,
      open: openProp,
      defaultOpen = false,
      onOpenChange,
      name,
      id,
      size = "default",
      placeholder = "Select\u2026",
      searchPlaceholder = "Search\u2026",
      emptyMessage = "No results.",
      disabled,
      className,
      contentClassName,
      "aria-label": ariaLabel
    }, ref) => {
      const [uncontrolledOpen, setUncontrolledOpen] = React36.useState(defaultOpen);
      const isOpenControlled = openProp !== void 0;
      const open = isOpenControlled ? openProp : uncontrolledOpen;
      const setOpen = (next) => {
        if (!isOpenControlled) setUncontrolledOpen(next);
        onOpenChange?.(next);
      };
      const [uncontrolled, setUncontrolled] = React36.useState(defaultValue ?? "");
      const isControlled = valueProp !== void 0;
      const value = isControlled ? valueProp : uncontrolled;
      const fieldProps = useFieldControlProps();
      const selected = options.find((option) => option.value === value);
      const select = (next) => {
        const resolved = next === value ? "" : next;
        if (!isControlled) setUncontrolled(resolved);
        onValueChange?.(resolved);
        setOpen(false);
      };
      return /* @__PURE__ */ jsxs(Popover, { open, onOpenChange: setOpen, children: [
        name ? /* @__PURE__ */ jsx("input", { type: "hidden", name, value }) : null,
        /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
          "button",
          {
            ref,
            type: "button",
            role: "combobox",
            "aria-expanded": open,
            "aria-label": ariaLabel,
            "data-slot": "combobox",
            className: cn(
              "flex w-full items-center justify-between gap-2 rounded-[var(--radius-sm)] border-[1.5px] border-input bg-background px-3 py-2 font-mono text-sm transition-colors",
              size === "sm" ? "h-9 text-[13px]" : "h-11",
              "focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive/30",
              !selected && "text-muted-foreground",
              className
            ),
            ...fieldProps,
            id: id ?? fieldProps.id,
            disabled: disabled ?? fieldProps.disabled,
            children: [
              /* @__PURE__ */ jsx("span", { className: "truncate", children: selected?.label ?? placeholder }),
              /* @__PURE__ */ jsx(ChevronDownIcon, { className: "size-4 shrink-0 opacity-60" })
            ]
          }
        ) }),
        /* @__PURE__ */ jsx(
          PopoverContent,
          {
            align: "start",
            sideOffset: 4,
            className: cn("w-[var(--radix-popover-trigger-width)] p-0", contentClassName),
            children: /* @__PURE__ */ jsxs(Command, { children: [
              /* @__PURE__ */ jsx(CommandInput, { placeholder: searchPlaceholder }),
              /* @__PURE__ */ jsxs(CommandList, { children: [
                /* @__PURE__ */ jsx(CommandEmpty, { children: emptyMessage }),
                options.map((option) => /* @__PURE__ */ jsxs(
                  CommandItem,
                  {
                    value: option.label,
                    disabled: option.disabled,
                    onSelect: () => select(option.value),
                    children: [
                      /* @__PURE__ */ jsx("span", { className: "flex-1 truncate", children: option.label }),
                      option.value === value ? /* @__PURE__ */ jsx(CheckIcon, { className: "size-4 shrink-0 text-accent-deep" }) : null
                    ]
                  },
                  option.value
                ))
              ] })
            ] })
          }
        )
      ] });
    }
  ),
  "Combobox"
);
var CopyButton = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ value, label = "Copy", copiedLabel = "Copied", resetMs, onCopied, className, ...props }, ref) => {
      const { copied, copy } = useCopyToClipboard(resetMs);
      return /* @__PURE__ */ jsxs(
        Button,
        {
          ref,
          "data-slot": "copy-button",
          "data-copied": copied || void 0,
          className: cn(className),
          onClick: async () => {
            const ok = await copy(value);
            onCopied?.(ok);
          },
          ...props,
          children: [
            copied ? /* @__PURE__ */ jsx(CheckIcon, { className: "text-success-deep" }) : null,
            /* @__PURE__ */ jsx("span", { "aria-live": "polite", children: copied ? copiedLabel : label })
          ]
        }
      );
    }
  ),
  "CopyButton"
);
var Input = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ className, type, size = "default", prefix, suffix, ...props }, ref) => {
      const input = /* @__PURE__ */ jsx(
        "input",
        {
          ref,
          type,
          className: cn(
            "flex w-full rounded-[var(--radius-sm)] border-[1.5px] border-input bg-background px-3 py-2 font-mono text-sm text-foreground transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive/30",
            size === "sm" ? "h-9 text-[13px]" : "h-11",
            prefix != null && "pl-9",
            suffix != null && "pr-9",
            className
          ),
          ...useFieldControlProps(),
          ...props
        }
      );
      if (prefix == null && suffix == null) return input;
      return /* @__PURE__ */ jsxs("div", { "data-slot": "input-group", className: "relative w-full", children: [
        prefix != null ? /* @__PURE__ */ jsx(
          "span",
          {
            "data-slot": "input-prefix",
            className: "pointer-events-none absolute top-1/2 left-3 flex -translate-y-1/2 items-center text-muted-foreground [&>a]:pointer-events-auto [&>button]:pointer-events-auto [&_svg]:size-4",
            children: prefix
          }
        ) : null,
        input,
        suffix != null ? /* @__PURE__ */ jsx(
          "span",
          {
            "data-slot": "input-suffix",
            className: "pointer-events-none absolute top-1/2 right-3 flex -translate-y-1/2 items-center text-muted-foreground [&>a]:pointer-events-auto [&>button]:pointer-events-auto [&_svg]:size-4",
            children: suffix
          }
        ) : null
      ] });
    }
  ),
  "Input"
);
function Select(props) {
  return /* @__PURE__ */ jsx(SelectPrimitive.Root, { ...props });
}
var SelectValue = SelectPrimitive.Value;
var SelectGroup = SelectPrimitive.Group;
var SelectTrigger = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(({ className, children, size = "default", ...props }, ref) => /* @__PURE__ */ jsxs(
    SelectPrimitive.Trigger,
    {
      ref,
      "data-slot": "select-trigger",
      className: cn(
        "flex w-full items-center justify-between gap-2 rounded-[var(--radius-sm)] border-[1.5px] border-input bg-background px-3 py-2 font-mono text-sm text-foreground transition-colors",
        size === "sm" ? "h-9 text-[13px]" : "h-11",
        "data-[placeholder]:text-muted-foreground",
        "focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "[&>span]:truncate",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx(ChevronDownIcon, { className: "text-muted-foreground transition-transform duration-200 ease-[var(--ease-out)] motion-reduce:transition-none" }) })
      ]
    }
  )),
  "SelectTrigger"
);
var SelectContent = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(({ className, children, position = "popper", sideOffset = 6, ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
    SelectPrimitive.Content,
    {
      ref,
      position,
      sideOffset,
      collisionPadding: 8,
      "data-slot": "select-content",
      className: cn(
        "relative z-50 max-h-[var(--radix-select-content-available-height)] min-w-[8rem] overflow-hidden rounded-[var(--radius-lg)] border border-border bg-popover text-popover-foreground shadow-[var(--shadow-lg)]",
        "motion-safe:animate-rise",
        position === "popper" && "w-full min-w-[var(--radix-select-trigger-width)]",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx(SelectPrimitive.ScrollUpButton, { className: "flex h-6 items-center justify-center text-muted-foreground", children: /* @__PURE__ */ jsx(ChevronUpIcon, {}) }),
        /* @__PURE__ */ jsx(SelectPrimitive.Viewport, { className: "p-1", children }),
        /* @__PURE__ */ jsx(SelectPrimitive.ScrollDownButton, { className: "flex h-6 items-center justify-center text-muted-foreground", children: /* @__PURE__ */ jsx(ChevronDownIcon, {}) })
      ]
    }
  ) })),
  "SelectContent"
);
var SelectItem = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
    SelectPrimitive.Item,
    {
      ref,
      "data-slot": "select-item",
      className: cn(
        "relative flex cursor-pointer select-none items-center rounded-[var(--radius-sm)] py-1.5 pr-2 pl-8 text-sm outline-none transition-colors",
        "focus:bg-accent-subtle focus:text-foreground data-[highlighted]:bg-accent-subtle data-[highlighted]:text-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex size-4 items-center justify-center", children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(CheckIcon, { className: "size-3.5 text-accent-deep" }) }) }),
        /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })
      ]
    }
  )),
  "SelectItem"
);
var SelectLabel = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    SelectPrimitive.Label,
    {
      ref,
      "data-slot": "select-label",
      className: cn(
        "px-2 py-1.5 pl-8 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground",
        className
      ),
      ...props
    }
  )),
  "SelectLabel"
);
var SelectSeparator = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    SelectPrimitive.Separator,
    {
      ref,
      "data-slot": "select-separator",
      className: cn("-mx-1 my-1 h-px bg-border", className),
      ...props
    }
  )),
  "SelectSeparator"
);
var Slider = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ className, thumbLabels, ...props }, ref) => {
      const thumbCount = (props.value ?? props.defaultValue)?.length ?? 1;
      const rootLabel = props["aria-label"];
      return /* @__PURE__ */ jsxs(
        SliderPrimitive.Root,
        {
          ref,
          "data-slot": "slider",
          className: cn(
            "relative flex w-full touch-none select-none items-center data-[orientation=vertical]:h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
            "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
            className
          ),
          ...props,
          children: [
            /* @__PURE__ */ jsx(
              SliderPrimitive.Track,
              {
                "data-slot": "slider-track",
                className: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-secondary data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5",
                children: /* @__PURE__ */ jsx(
                  SliderPrimitive.Range,
                  {
                    "data-slot": "slider-range",
                    className: "absolute h-full bg-accent data-[orientation=vertical]:w-full"
                  }
                )
              }
            ),
            Array.from({ length: thumbCount }, (_, i) => /* @__PURE__ */ jsx(
              SliderPrimitive.Thumb,
              {
                "aria-label": thumbLabels?.[i] ?? (thumbCount === 1 ? rootLabel : void 0),
                "data-slot": "slider-thumb",
                className: "block size-4 shrink-0 rounded-full border-[1.5px] border-accent-deep bg-background shadow-[var(--shadow-sm)] transition-[box-shadow,transform] hover:scale-110 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30 data-[disabled]:pointer-events-none"
              },
              i
            ))
          ]
        }
      );
    }
  ),
  "Slider"
);
var Switch = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ className, id, ...props }, ref) => {
      const generatedId = React36.useId();
      const inputId = id ?? generatedId;
      return /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("input", { ref, id: inputId, type: "checkbox", className: "peer sr-only", ...props }),
        /* @__PURE__ */ jsx(
          "label",
          {
            htmlFor: inputId,
            className: cn(
              "relative inline-flex h-6 w-10 shrink-0 cursor-pointer items-center rounded-full border-[1.5px] border-input bg-input p-0.5 transition-colors duration-200 ease-[var(--ease-out)] peer-checked:border-primary peer-checked:bg-primary peer-checked:[&>span]:translate-x-4 peer-focus-visible:border-ring peer-focus-visible:ring-[3px] peer-focus-visible:ring-ring/30 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
              className
            ),
            children: /* @__PURE__ */ jsx("span", { className: "size-4 rounded-full bg-background shadow-sm transition-transform duration-200 ease-[var(--ease-out)]" })
          }
        )
      ] });
    }
  ),
  "Switch"
);
var Textarea = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ className, size = "default", ...props }, ref) => /* @__PURE__ */ jsx(
      "textarea",
      {
        ref,
        className: cn(
          "flex w-full resize-y rounded-[var(--radius-sm)] border-[1.5px] border-input bg-background px-3 py-2 font-mono text-sm text-foreground transition-colors duration-200 ease-[var(--ease-out)] placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive/30",
          size === "sm" ? "min-h-16 text-[13px]" : "min-h-24",
          className
        ),
        ...useFieldControlProps(),
        ...props
      }
    )
  ),
  "Textarea"
);
var Accordion = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(({ className, type = "single", ...props }, ref) => /* @__PURE__ */ jsx(
    AccordionPrimitive.Root,
    {
      ref,
      "data-slot": "accordion",
      className: cn("flex flex-col", className),
      ...{ type, ...props }
    }
  )),
  "Accordion"
);
var AccordionItem = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    AccordionPrimitive.Item,
    {
      ref,
      "data-slot": "accordion-item",
      className: cn("border-b border-border", className),
      ...props
    }
  )),
  "AccordionItem"
);
var AccordionTrigger = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(({ className, children, hideIndicator, ...props }, ref) => /* @__PURE__ */ jsx(AccordionPrimitive.Header, { className: "m-0 flex", children: /* @__PURE__ */ jsxs(
    AccordionPrimitive.Trigger,
    {
      ref,
      "data-slot": "accordion-trigger",
      className: cn(
        "group flex w-full items-center gap-3 py-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30",
        className
      ),
      ...props,
      children: [
        children,
        hideIndicator ? null : /* @__PURE__ */ jsx(
          "svg",
          {
            "aria-hidden": "true",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            className: "ml-auto size-4 shrink-0 text-muted-foreground transition-transform duration-300 ease-[var(--ease-out)] group-data-[state=open]:rotate-180 group-data-[state=open]:text-accent-deep motion-reduce:transition-none",
            children: /* @__PURE__ */ jsx("path", { d: "m6 9 6 6 6-6" })
          }
        )
      ]
    }
  ) })),
  "AccordionTrigger"
);
var AccordionContent = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(
    AccordionPrimitive.Content,
    {
      forceMount: true,
      "data-slot": "accordion-content",
      className: cn(
        "grid transition-[grid-template-rows,visibility] duration-300 ease-[var(--ease-out)] motion-reduce:transition-none",
        "data-[state=open]:grid-rows-[1fr] data-[state=closed]:grid-rows-[0fr] data-[state=closed]:invisible"
      ),
      children: /* @__PURE__ */ jsx("div", { className: "min-h-0 overflow-hidden", children: /* @__PURE__ */ jsx("div", { ref, className: cn("pb-4 text-sm text-muted-foreground", className), ...props, children }) })
    }
  )),
  "AccordionContent"
);
var BreadcrumbSeparatorContext = /* @__PURE__ */ React36.createContext(void 0);
var Breadcrumb = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ className, separator, ...props }, ref) => /* @__PURE__ */ jsx(BreadcrumbSeparatorContext.Provider, { value: separator, children: /* @__PURE__ */ jsx(
      "nav",
      {
        ref,
        "aria-label": "Breadcrumb",
        "data-slot": "breadcrumb",
        className: cn(className),
        ...props
      }
    ) })
  ),
  "Breadcrumb"
);
var BreadcrumbList = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
      "ol",
      {
        ref,
        "data-slot": "breadcrumb-list",
        className: cn(
          "flex flex-wrap items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground",
          className
        ),
        ...props
      }
    )
  ),
  "BreadcrumbList"
);
var BreadcrumbItem = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
      "li",
      {
        ref,
        "data-slot": "breadcrumb-item",
        className: cn("inline-flex items-center gap-1.5", className),
        ...props
      }
    )
  ),
  "BreadcrumbItem"
);
var BreadcrumbLink = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ className, asChild, ...props }, ref) => {
      const Comp = asChild ? Slot : "a";
      return /* @__PURE__ */ jsx(
        Comp,
        {
          ref,
          "data-slot": "breadcrumb-link",
          className: cn(
            "rounded-[var(--radius-sm)] transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30",
            className
          ),
          ...props
        }
      );
    }
  ),
  "BreadcrumbLink"
);
var BreadcrumbPage = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
      "span",
      {
        ref,
        "aria-current": "page",
        "data-slot": "breadcrumb-page",
        className: cn("text-foreground", className),
        ...props
      }
    )
  ),
  "BreadcrumbPage"
);
function BreadcrumbSeparator({
  children,
  className,
  ...props
}) {
  const separator = React36.useContext(BreadcrumbSeparatorContext);
  return /* @__PURE__ */ jsx(
    "li",
    {
      "aria-hidden": "true",
      "data-slot": "breadcrumb-separator",
      className: cn("[&>svg]:size-3 text-muted-foreground-2", className),
      ...props,
      children: children ?? separator ?? /* @__PURE__ */ jsx(ChevronRightIcon, {})
    }
  );
}
function BreadcrumbEllipsis({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    "span",
    {
      "data-slot": "breadcrumb-ellipsis",
      className: cn("flex size-5 items-center justify-center", className),
      ...props,
      children: [
        /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "\u2026" }),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "More" })
      ]
    }
  );
}
var cardVariants = /* @__PURE__ */ cva(
  "rounded-[var(--radius-lg)] text-card-foreground transition-[transform,box-shadow,border-color] duration-200 ease-[var(--ease-out)]",
  {
    variants: {
      variant: {
        default: "border border-border bg-card",
        elevated: "border border-border bg-card shadow-[var(--shadow-md)]",
        interactive: "border border-border bg-card hover:-translate-x-0.5 hover:-translate-y-0.5 hover:border-accent hover:shadow-[6px_6px_0_0_var(--accent)] focus-within:-translate-x-0.5 focus-within:-translate-y-0.5 focus-within:border-accent focus-within:shadow-[6px_6px_0_0_var(--accent)]",
        accent: "border border-[color-mix(in_oklch,var(--accent)_45%,var(--border))] bg-accent-subtle",
        ghost: "border border-transparent bg-transparent"
      }
    },
    defaultVariants: { variant: "default" }
  }
);
var Card = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ className, variant, asChild, ...props }, ref) => {
      const Comp = asChild ? Slot : "div";
      return /* @__PURE__ */ jsx(
        Comp,
        {
          ref,
          "data-slot": "card",
          className: cn(cardVariants({ variant }), className),
          ...props
        }
      );
    }
  ),
  "Card"
);
var CardHeader = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        "data-slot": "card-header",
        className: cn(
          "grid auto-rows-min items-start gap-1.5 p-5 has-[[data-slot=card-action]]:grid-cols-[1fr_auto]",
          className
        ),
        ...props
      }
    )
  ),
  "CardHeader"
);
var CardTitle = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        "data-slot": "card-title",
        className: cn(
          "font-mono text-sm font-bold uppercase tracking-[0.1em] text-foreground",
          className
        ),
        ...props
      }
    )
  ),
  "CardTitle"
);
var CardDescription = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "p",
    {
      ref,
      "data-slot": "card-description",
      className: cn("text-sm leading-relaxed text-muted-foreground", className),
      ...props
    }
  )),
  "CardDescription"
);
var CardAction = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        "data-slot": "card-action",
        className: cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className),
        ...props
      }
    )
  ),
  "CardAction"
);
var CardContent = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, "data-slot": "card-content", className: cn("p-5 pt-0", className), ...props })
  ),
  "CardContent"
);
var CardFooter = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        "data-slot": "card-footer",
        className: cn("flex items-center p-5 pt-0", className),
        ...props
      }
    )
  ),
  "CardFooter"
);
function Collapsible(props) {
  return /* @__PURE__ */ jsx(CollapsiblePrimitive.Root, { "data-slot": "collapsible", ...props });
}
var CollapsibleTrigger = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    CollapsiblePrimitive.Trigger,
    {
      ref,
      "data-slot": "collapsible-trigger",
      className: cn(
        "flex w-full items-center justify-between gap-2 rounded-[var(--radius-sm)] py-2 text-left font-mono text-xs uppercase tracking-[0.1em] text-foreground transition-colors hover:text-accent-deep focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30",
        className
      ),
      ...props
    }
  )),
  "CollapsibleTrigger"
);
var CollapsibleContent = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(
    CollapsiblePrimitive.Content,
    {
      forceMount: true,
      ref,
      "data-slot": "collapsible-content",
      className: cn(
        "grid transition-[grid-template-rows,visibility] duration-[var(--dur-base)] ease-[var(--ease-out)] motion-reduce:transition-none",
        "grid-rows-[0fr] data-[state=open]:grid-rows-[1fr] data-[state=closed]:invisible",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx("div", { className: "min-h-0 overflow-hidden", children })
    }
  )),
  "CollapsibleContent"
);
var containerVariants = /* @__PURE__ */ cva("mx-auto w-full", {
  variants: {
    /** Max content width. `prose` is measure-optimised for reading. */
    size: {
      sm: "max-w-[40rem]",
      md: "max-w-[48rem]",
      lg: "max-w-[64rem]",
      xl: "max-w-[80rem]",
      prose: "max-w-[65ch]",
      full: "max-w-none"
    },
    /** Responsive side gutters. `none` for edge-to-edge (mobile sheets, hero). */
    gutter: {
      none: "px-0",
      sm: "px-3 sm:px-4",
      md: "px-4 sm:px-6 lg:px-8",
      lg: "px-5 sm:px-8 lg:px-12"
    }
  },
  defaultVariants: { size: "lg", gutter: "md" }
});
var Container = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ className, size, gutter, ...props }, ref) => /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        "data-slot": "container",
        className: cn(containerVariants({ size, gutter }), className),
        ...props
      }
    )
  ),
  "Container"
);
var stackVariants = /* @__PURE__ */ cva("flex", {
  variants: {
    /** `responsive` = column on mobile, row from `sm` up (the common card→row flip). */
    direction: {
      col: "flex-col",
      row: "flex-row",
      responsive: "flex-col sm:flex-row"
    },
    gap: {
      none: "gap-0",
      xs: "gap-1.5",
      sm: "gap-2.5",
      md: "gap-4",
      lg: "gap-6",
      xl: "gap-10"
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
      baseline: "items-baseline"
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around"
    },
    wrap: {
      true: "flex-wrap",
      false: "flex-nowrap"
    }
  },
  defaultVariants: { direction: "col", gap: "md", align: "stretch", justify: "start" }
});
var Stack = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ className, direction, gap, align, justify, wrap, ...props }, ref) => /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        "data-slot": "stack",
        className: cn(stackVariants({ direction, gap, align, justify, wrap }), className),
        ...props
      }
    )
  ),
  "Stack"
);
var colsMap = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  5: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5",
  6: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6"
};
var gapMap = {
  none: "gap-0",
  xs: "gap-1.5",
  sm: "gap-2.5",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-10"
};
var Grid = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ className, min, cols = 3, gap = "md", style, ...props }, ref) => {
      const auto = min != null;
      const minW = typeof min === "number" ? `${min}px` : min;
      return /* @__PURE__ */ jsx(
        "div",
        {
          ref,
          "data-slot": "grid",
          className: cn("grid", gapMap[gap], !auto && colsMap[cols], className),
          style: auto ? {
            gridTemplateColumns: `repeat(auto-fill, minmax(min(100%, ${minW}), 1fr))`,
            ...style
          } : style,
          ...props
        }
      );
    }
  ),
  "Grid"
);
var paginationLinkVariants = /* @__PURE__ */ cva(
  "inline-flex h-9 min-w-9 items-center justify-center gap-1.5 rounded-[var(--radius-sm)] px-2.5 font-mono text-[11px] uppercase tracking-[0.1em] transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30 [&_svg]:size-3.5",
  {
    variants: {
      active: {
        true: "border-[1.5px] border-accent bg-accent-subtle text-foreground",
        false: "border-[1.5px] border-transparent text-muted-foreground hover:text-foreground"
      }
    },
    defaultVariants: { active: false }
  }
);
function Pagination({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "nav",
    {
      "aria-label": "Pagination",
      "data-slot": "pagination",
      className: cn("mx-auto flex w-full justify-center", className),
      ...props
    }
  );
}
var PaginationContent = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
      "ul",
      {
        ref,
        "data-slot": "pagination-content",
        className: cn("flex flex-wrap items-center gap-1", className),
        ...props
      }
    )
  ),
  "PaginationContent"
);
var PaginationItem = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ className, ...props }, ref) => /* @__PURE__ */ jsx("li", { ref, "data-slot": "pagination-item", className: cn(className), ...props })
  ),
  "PaginationItem"
);
var PaginationLink = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ className, isActive, asChild, ...props }, ref) => {
      const Comp = asChild ? Slot : "a";
      return /* @__PURE__ */ jsx(
        Comp,
        {
          ref,
          "aria-current": isActive ? "page" : void 0,
          "data-slot": "pagination-link",
          className: cn(paginationLinkVariants({ active: Boolean(isActive) }), className),
          ...props
        }
      );
    }
  ),
  "PaginationLink"
);
function PaginationPrevious({
  className,
  children = "Prev",
  ...props
}) {
  return /* @__PURE__ */ jsxs(PaginationLink, { "aria-label": "Go to previous page", className: cn("px-3", className), ...props, children: [
    /* @__PURE__ */ jsx(ChevronLeftIcon, {}),
    children
  ] });
}
function PaginationNext({ className, children = "Next", ...props }) {
  return /* @__PURE__ */ jsxs(PaginationLink, { "aria-label": "Go to next page", className: cn("px-3", className), ...props, children: [
    children,
    /* @__PURE__ */ jsx(ChevronRightIcon, {})
  ] });
}
function PaginationEllipsis({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    "span",
    {
      "data-slot": "pagination-ellipsis",
      className: cn("flex h-9 w-9 items-center justify-center text-muted-foreground-2", className),
      ...props,
      children: [
        /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "\u2026" }),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "More pages" })
      ]
    }
  );
}
var ScrollArea = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(({ className, viewportClassName, orientation = "vertical", children, ...props }, ref) => /* @__PURE__ */ jsxs(
    ScrollAreaPrimitive.Root,
    {
      ref,
      "data-slot": "scroll-area",
      className: cn("relative overflow-hidden", className),
      ...props,
      children: [
        /* @__PURE__ */ jsx(
          ScrollAreaPrimitive.Viewport,
          {
            "data-slot": "scroll-area-viewport",
            tabIndex: 0,
            className: cn(
              // The ring is inset because the root's `overflow-hidden` would clip
              // anything painted outside the viewport, which fills it exactly.
              "size-full rounded-[inherit] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-inset focus-visible:ring-ring/30",
              viewportClassName
            ),
            children
          }
        ),
        orientation !== "horizontal" ? /* @__PURE__ */ jsx(ScrollBar, { orientation: "vertical" }) : null,
        orientation !== "vertical" ? /* @__PURE__ */ jsx(ScrollBar, { orientation: "horizontal" }) : null,
        /* @__PURE__ */ jsx(ScrollAreaPrimitive.Corner, {})
      ]
    }
  )),
  "ScrollArea"
);
var ScrollBar = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(({ className, orientation = "vertical", ...props }, ref) => /* @__PURE__ */ jsx(
    ScrollAreaPrimitive.ScrollAreaScrollbar,
    {
      ref,
      orientation,
      "data-slot": "scroll-bar",
      className: cn(
        "flex touch-none select-none p-0.5 transition-colors",
        orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent",
        orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(
        ScrollAreaPrimitive.ScrollAreaThumb,
        {
          "data-slot": "scroll-bar-thumb",
          className: "relative flex-1 rounded-full bg-border transition-colors hover:bg-muted-foreground"
        }
      )
    }
  )),
  "ScrollBar"
);
var Separator2 = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(({ className, orientation = "horizontal", decorative = true, label, ...props }, ref) => {
    if (label != null && orientation === "horizontal") {
      return /* @__PURE__ */ jsxs(
        SeparatorPrimitive.Root,
        {
          ref,
          orientation,
          decorative,
          "aria-hidden": decorative || void 0,
          className: cn("flex w-full items-center gap-3", className),
          ...props,
          children: [
            /* @__PURE__ */ jsx("span", { className: "h-px flex-1 bg-border" }),
            /* @__PURE__ */ jsx("span", { className: "shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground", children: label }),
            /* @__PURE__ */ jsx("span", { className: "h-px flex-1 bg-border" })
          ]
        }
      );
    }
    return /* @__PURE__ */ jsx(
      SeparatorPrimitive.Root,
      {
        ref,
        orientation,
        decorative,
        className: cn(
          "shrink-0 bg-border",
          orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
          className
        ),
        ...props
      }
    );
  }),
  "Separator"
);
var SectionHeading = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ as: Comp = "h2", rule = true, actions, className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
      "div",
      {
        ref,
        "data-slot": "section-heading",
        className: cn("flex items-center gap-3.5", className),
        ...props,
        children: [
          /* @__PURE__ */ jsx(Comp, { className: "m-0 font-bold font-mono text-[11px] text-foreground uppercase tracking-[0.18em]", children }),
          rule ? /* @__PURE__ */ jsx(Separator2, { className: "flex-1" }) : null,
          actions
        ]
      }
    )
  ),
  "SectionHeading"
);
var Tabs = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
      TabsPrimitive.Root,
      {
        ref,
        className: cn("flex flex-col gap-4 data-[orientation=vertical]:flex-row", className),
        ...props
      }
    )
  ),
  "Tabs"
);
var TabsList = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    TabsPrimitive.List,
    {
      ref,
      className: cn(
        "flex gap-1 border-b border-border",
        "data-[orientation=vertical]:flex-col data-[orientation=vertical]:border-b-0 data-[orientation=vertical]:border-r",
        className
      ),
      ...props
    }
  )),
  "TabsList"
);
var TabsTrigger = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    TabsPrimitive.Trigger,
    {
      ref,
      className: cn(
        "-mb-px border-b-2 border-transparent px-3 pb-2 font-mono text-xs uppercase tracking-[0.1em] transition-colors duration-200 ease-[var(--ease-out)] hover:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30 disabled:pointer-events-none disabled:opacity-50",
        "text-muted-foreground data-[state=active]:border-accent data-[state=active]:text-foreground",
        "data-[orientation=vertical]:-mr-px data-[orientation=vertical]:mb-0 data-[orientation=vertical]:border-b-0 data-[orientation=vertical]:border-r-2 data-[orientation=vertical]:pb-1.5 data-[orientation=vertical]:pr-3 data-[orientation=vertical]:text-left",
        className
      ),
      ...props
    }
  )),
  "TabsTrigger"
);
var TabsContent = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    TabsPrimitive.Content,
    {
      ref,
      className: cn(
        "rounded-[var(--radius-sm)] text-sm text-muted-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30",
        className
      ),
      ...props
    }
  )),
  "TabsContent"
);
function AlertDialog({
  open,
  defaultOpen = false,
  onOpenChange,
  children
}) {
  return /* @__PURE__ */ jsx(ModalProvider, { open, defaultOpen, onOpenChange, children });
}
var AlertDialogTrigger = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef((props, ref) => /* @__PURE__ */ jsx(ModalTrigger, { ref, slot: "alert-dialog-trigger", ...props })),
  "AlertDialogTrigger"
);
var AlertDialogContent = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
      ModalDialog,
      {
        slot: "alert-dialog",
        role: "alertdialog",
        dismissOnBackdrop: false,
        className: "m-auto w-[calc(100%-2rem)] overflow-visible bg-transparent p-0 text-foreground backdrop:bg-[var(--overlay)] backdrop:backdrop-blur-[2px]",
        children: /* @__PURE__ */ jsx(
          "div",
          {
            ref,
            "data-slot": "alert-dialog-content",
            className: cn(
              "relative mx-auto w-full max-w-md rounded-[var(--radius-lg)] border border-border bg-card p-6 text-card-foreground shadow-[var(--shadow-lg)] motion-safe:animate-rise",
              className
            ),
            ...props
          }
        )
      }
    )
  ),
  "AlertDialogContent"
);
var AlertDialogHeader = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        "data-slot": "alert-dialog-header",
        className: cn("mb-4 flex flex-col gap-1.5", className),
        ...props
      }
    )
  ),
  "AlertDialogHeader"
);
var AlertDialogTitle = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ className, ...props }, ref) => {
      const titleId = useModalPart("title");
      return /* @__PURE__ */ jsx(
        "h2",
        {
          ref,
          id: titleId,
          "data-slot": "alert-dialog-title",
          className: cn(
            "font-mono text-sm font-bold uppercase tracking-[0.1em] text-foreground",
            className
          ),
          ...props
        }
      );
    }
  ),
  "AlertDialogTitle"
);
var AlertDialogDescription = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(({ className, ...props }, ref) => {
    const descriptionId = useModalPart("description");
    return /* @__PURE__ */ jsx(
      "p",
      {
        ref,
        id: descriptionId,
        "data-slot": "alert-dialog-description",
        className: cn("text-sm leading-relaxed text-muted-foreground", className),
        ...props
      }
    );
  }),
  "AlertDialogDescription"
);
var AlertDialogFooter = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        "data-slot": "alert-dialog-footer",
        className: cn(
          "mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-3",
          className
        ),
        ...props
      }
    )
  ),
  "AlertDialogFooter"
);
var AlertDialogCancel = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ asChild, onClick, type, ...props }, ref) => {
      const ctx = useModal();
      const localRef = React36.useRef(null);
      React36.useImperativeHandle(ref, () => localRef.current);
      React36.useEffect(() => {
        localRef.current?.setAttribute("autofocus", "");
      }, []);
      const Comp = asChild ? Slot : "button";
      return /* @__PURE__ */ jsx(
        Comp,
        {
          ref: localRef,
          "data-slot": "alert-dialog-cancel",
          type: asChild ? type : type ?? "button",
          onClick: (event) => {
            onClick?.(event);
            if (!event.defaultPrevented) ctx?.close();
          },
          ...props
        }
      );
    }
  ),
  "AlertDialogCancel"
);
var AlertDialogAction = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ asChild, onClick, type, ...props }, ref) => {
      const ctx = useModal();
      const Comp = asChild ? Slot : "button";
      return /* @__PURE__ */ jsx(
        Comp,
        {
          ref,
          "data-slot": "alert-dialog-action",
          type: asChild ? type : type ?? "button",
          onClick: (event) => {
            onClick?.(event);
            if (!event.defaultPrevented) ctx?.close();
          },
          ...props
        }
      );
    }
  ),
  "AlertDialogAction"
);
function Dialog({ open, defaultOpen = false, onOpenChange, children }) {
  return /* @__PURE__ */ jsx(ModalProvider, { open, defaultOpen, onOpenChange, children });
}
var DialogTrigger = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef((props, ref) => /* @__PURE__ */ jsx(ModalTrigger, { ref, slot: "dialog-trigger", ...props })),
  "DialogTrigger"
);
var DialogContent = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ className, children, ...props }, ref) => {
      const ctx = useModal();
      return /* @__PURE__ */ jsx(
        ModalDialog,
        {
          slot: "dialog",
          className: "m-auto w-[calc(100%-2rem)] overflow-visible bg-transparent p-0 text-foreground backdrop:bg-[var(--overlay)] backdrop:backdrop-blur-[2px]",
          children: /* @__PURE__ */ jsxs(
            "div",
            {
              ref,
              "data-slot": "dialog-content",
              className: cn(
                "relative mx-auto max-h-[85dvh] w-full max-w-lg overflow-y-auto rounded-[var(--radius-lg)] border border-border bg-card p-6 text-card-foreground shadow-[var(--shadow-lg)] motion-safe:animate-rise",
                className
              ),
              ...props,
              children: [
                children,
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => ctx?.close(),
                    className: "absolute top-4 right-4 inline-flex size-7 items-center justify-center rounded-[var(--radius-sm)] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30",
                    children: [
                      /* @__PURE__ */ jsx("span", { "aria-hidden": true, className: "text-base leading-none", children: "\u2715" }),
                      /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
                    ]
                  }
                )
              ]
            }
          )
        }
      );
    }
  ),
  "DialogContent"
);
var DialogHeader = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        "data-slot": "dialog-header",
        className: cn("mb-4 flex flex-col gap-1.5 pr-8", className),
        ...props
      }
    )
  ),
  "DialogHeader"
);
var DialogTitle = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ className, ...props }, ref) => {
      const titleId = useModalPart("title");
      return /* @__PURE__ */ jsx(
        "h2",
        {
          ref,
          id: titleId,
          "data-slot": "dialog-title",
          className: cn(
            "font-mono text-sm font-bold uppercase tracking-[0.1em] text-foreground",
            className
          ),
          ...props
        }
      );
    }
  ),
  "DialogTitle"
);
var DialogDescription = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(({ className, ...props }, ref) => {
    const descriptionId = useModalPart("description");
    return /* @__PURE__ */ jsx(
      "p",
      {
        ref,
        id: descriptionId,
        "data-slot": "dialog-description",
        className: cn("text-sm leading-relaxed text-muted-foreground", className),
        ...props
      }
    );
  }),
  "DialogDescription"
);
var DialogFooter = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        "data-slot": "dialog-footer",
        className: cn(
          "mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-3",
          className
        ),
        ...props
      }
    )
  ),
  "DialogFooter"
);
var DialogClose = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ asChild, onClick, type, ...props }, ref) => {
      const ctx = useModal();
      const Comp = asChild ? Slot : "button";
      return /* @__PURE__ */ jsx(
        Comp,
        {
          ref,
          type: asChild ? type : type ?? "button",
          onClick: (event) => {
            onClick?.(event);
            if (!event.defaultPrevented) ctx?.close();
          },
          ...props
        }
      );
    }
  ),
  "DialogClose"
);
var surface = /* @__PURE__ */ cn(
  "z-50 min-w-[10rem] overflow-hidden rounded-[var(--radius-lg)] border border-border bg-popover p-1 text-popover-foreground shadow-[var(--shadow-lg)]",
  "motion-safe:animate-rise"
);
var row = /* @__PURE__ */ cn(
  "relative flex cursor-pointer select-none items-center gap-2 rounded-[var(--radius-sm)] px-2 py-1.5 text-sm outline-none transition-colors",
  "focus:bg-accent-subtle focus:text-foreground data-[highlighted]:bg-accent-subtle data-[highlighted]:text-foreground",
  "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
  "[&_svg]:size-4 [&_svg]:shrink-0"
);
function DropdownMenu(props) {
  return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Root, { ...props });
}
var DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
var DropdownMenuGroup = DropdownMenuPrimitive.Group;
var DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;
var DropdownMenuContent = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(({ className, sideOffset = 6, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Content,
    {
      ref,
      sideOffset,
      collisionPadding: 8,
      "data-slot": "dropdown-menu-content",
      className: cn(surface, className),
      ...props
    }
  ) })),
  "DropdownMenuContent"
);
var DropdownMenuItem = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(({ className, variant = "default", inset, ...props }, ref) => /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Item,
    {
      ref,
      "data-slot": "dropdown-menu-item",
      "data-variant": variant,
      className: cn(
        row,
        inset && "pl-8",
        variant === "destructive" && "text-destructive-deep focus:bg-destructive-subtle focus:text-destructive-deep data-[highlighted]:bg-destructive-subtle data-[highlighted]:text-destructive-deep",
        className
      ),
      ...props
    }
  )),
  "DropdownMenuItem"
);
var DropdownMenuCheckboxItem = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
    DropdownMenuPrimitive.CheckboxItem,
    {
      ref,
      "data-slot": "dropdown-menu-checkbox-item",
      className: cn(row, "pl-8", className),
      ...props,
      children: [
        /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex size-4 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(CheckIcon, { className: "size-3.5 text-accent-deep" }) }) }),
        children
      ]
    }
  )),
  "DropdownMenuCheckboxItem"
);
var DropdownMenuRadioItem = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
    DropdownMenuPrimitive.RadioItem,
    {
      ref,
      "data-slot": "dropdown-menu-radio-item",
      className: cn(row, "pl-8", className),
      ...props,
      children: [
        /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex size-4 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(DotIcon, { className: "text-accent-deep" }) }) }),
        children
      ]
    }
  )),
  "DropdownMenuRadioItem"
);
var DropdownMenuLabel = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Label,
    {
      ref,
      "data-slot": "dropdown-menu-label",
      className: cn(
        "px-2 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground",
        inset && "pl-8",
        className
      ),
      ...props
    }
  )),
  "DropdownMenuLabel"
);
var DropdownMenuSeparator = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Separator,
    {
      ref,
      "data-slot": "dropdown-menu-separator",
      className: cn("-mx-1 my-1 h-px bg-border", className),
      ...props
    }
  )),
  "DropdownMenuSeparator"
);
function DropdownMenuShortcut({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "span",
    {
      "aria-hidden": "true",
      "data-slot": "dropdown-menu-shortcut",
      className: cn(
        "ml-auto pl-4 font-mono text-[10px] tracking-[0.14em] text-muted-foreground",
        className
      ),
      ...props
    }
  );
}
var DropdownMenuSub = DropdownMenuPrimitive.Sub;
var DropdownMenuSubTrigger = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs(
    DropdownMenuPrimitive.SubTrigger,
    {
      ref,
      "data-slot": "dropdown-menu-sub-trigger",
      className: cn(row, "data-[state=open]:bg-accent-subtle", inset && "pl-8", className),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx(ChevronRightIcon, { className: "ml-auto text-muted-foreground" })
      ]
    }
  )),
  "DropdownMenuSubTrigger"
);
var DropdownMenuSubContent = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.SubContent,
    {
      ref,
      collisionPadding: 8,
      "data-slot": "dropdown-menu-sub-content",
      className: cn(surface, className),
      ...props
    }
  ) })),
  "DropdownMenuSubContent"
);
function HoverCard({ openDelay = 700, closeDelay = 200, ...props }) {
  return /* @__PURE__ */ jsx(HoverCardPrimitive.Root, { openDelay, closeDelay, ...props });
}
var HoverCardTrigger = HoverCardPrimitive.Trigger;
var HoverCardContent = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(({ className, align = "center", side = "bottom", sideOffset = 8, ...props }, ref) => /* @__PURE__ */ jsx(HoverCardPrimitive.Portal, { children: /* @__PURE__ */ jsx(
    HoverCardPrimitive.Content,
    {
      ref,
      align,
      side,
      sideOffset,
      collisionPadding: 8,
      "data-slot": "hover-card-content",
      className: cn(
        "z-50 w-72 max-w-[calc(100vw-1rem)] rounded-[var(--radius-lg)] border border-border bg-popover p-4 text-popover-foreground shadow-[var(--shadow-lg)] outline-none motion-safe:animate-rise",
        className
      ),
      ...props
    }
  ) })),
  "HoverCardContent"
);
var GAP = 8;
var MARGIN = 8;
function InfoTip({
  label,
  title,
  children,
  side = "auto",
  open,
  defaultOpen,
  onOpenChange,
  className,
  contentClassName
}) {
  const titleId = React36.useId();
  return /* @__PURE__ */ jsxs(PopoverPrimitive.Root, { open, defaultOpen, onOpenChange, children: [
    /* @__PURE__ */ jsx(
      PopoverPrimitive.Trigger,
      {
        "data-slot": "info-tip-trigger",
        "aria-label": label,
        className: cn(
          "inline-flex size-[1.15em] shrink-0 cursor-help items-center justify-center rounded-full align-[-0.15em] text-muted-foreground transition-colors",
          "hover:text-accent-deep focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30",
          "data-[state=open]:text-accent-deep",
          className
        ),
        children: /* @__PURE__ */ jsxs(
          "svg",
          {
            "aria-hidden": "true",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            className: "size-[0.95em]",
            children: [
              /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "10" }),
              /* @__PURE__ */ jsx("path", { d: "M12 16v-4" }),
              /* @__PURE__ */ jsx("path", { d: "M12 8h.01" })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsx(PopoverPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
      PopoverPrimitive.Content,
      {
        side: side === "auto" ? "bottom" : side,
        sideOffset: GAP,
        collisionPadding: MARGIN,
        "aria-labelledby": title ? titleId : void 0,
        "aria-label": title ? void 0 : label,
        "data-slot": "info-tip-content",
        className: cn(
          "z-50 w-[min(20rem,calc(100vw-1rem))] rounded-[var(--radius-lg)] border border-border bg-popover p-3.5 text-popover-foreground shadow-[var(--shadow-lg)] outline-none motion-safe:animate-rise",
          contentClassName
        ),
        children: [
          title ? /* @__PURE__ */ jsx(
            "p",
            {
              id: titleId,
              className: "mb-1.5 font-mono text-xs font-bold uppercase tracking-[0.08em] text-foreground",
              children: title
            }
          ) : null,
          /* @__PURE__ */ jsx("div", { className: "text-[13px] leading-relaxed text-muted-foreground", children })
        ]
      }
    ) })
  ] });
}
var sheetVariants = /* @__PURE__ */ cva(
  [
    "m-0 max-h-none border-border bg-card p-0 text-card-foreground shadow-[var(--shadow-lg)]",
    "backdrop:bg-[var(--overlay)] backdrop:backdrop-blur-[2px]",
    // The slide is progressive enhancement: `@starting-style` and
    // `transition-behavior: allow-discrete` are current-browser-only, and where
    // they're missing the sheet simply appears in place, fully usable.
    "transition-[transform,opacity,overlay,display] duration-[var(--dur-base)] ease-[var(--ease-out)]",
    "[transition-behavior:allow-discrete] opacity-0 open:opacity-100",
    "motion-reduce:transition-none motion-reduce:translate-x-0 motion-reduce:translate-y-0"
  ].join(" "),
  {
    variants: {
      side: {
        right: "ml-auto mr-0 h-[100dvh] w-[min(24rem,100vw-3rem)] border-l translate-x-full open:translate-x-0 [@starting-style]:open:translate-x-full",
        left: "ml-0 mr-auto h-[100dvh] w-[min(24rem,100vw-3rem)] border-r -translate-x-full open:translate-x-0 [@starting-style]:open:-translate-x-full",
        top: "mt-0 mb-auto max-h-[85dvh] w-full border-b -translate-y-full open:translate-y-0 [@starting-style]:open:-translate-y-full",
        bottom: "mt-auto mb-0 max-h-[85dvh] w-full border-t translate-y-full open:translate-y-0 [@starting-style]:open:translate-y-full"
      }
    },
    defaultVariants: { side: "right" }
  }
);
function Sheet({
  open,
  defaultOpen = false,
  onOpenChange,
  side,
  className,
  children
}) {
  const config = React36.useMemo(() => ({ side, panelClassName: className }), [side, className]);
  return /* @__PURE__ */ jsx(ModalProvider, { open, defaultOpen, onOpenChange, children: /* @__PURE__ */ jsx(SheetConfigContext.Provider, { value: config, children }) });
}
var SheetConfigContext = /* @__PURE__ */ React36.createContext({});
var SheetTrigger = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef((props, ref) => /* @__PURE__ */ jsx(ModalTrigger, { ref, slot: "sheet-trigger", ...props })),
  "SheetTrigger"
);
var SheetContent = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ className, children, ...props }, ref) => {
      const ctx = useModal();
      const { side, panelClassName } = React36.useContext(SheetConfigContext);
      return /* @__PURE__ */ jsx(ModalDialog, { slot: "sheet", className: cn(sheetVariants({ side }), panelClassName), children: /* @__PURE__ */ jsxs(
        "div",
        {
          ref,
          "data-slot": "sheet-content",
          className: cn("relative flex h-full flex-col overflow-y-auto p-6", className),
          ...props,
          children: [
            children,
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: () => ctx?.close(),
                className: "absolute top-4 right-4 inline-flex size-7 items-center justify-center rounded-[var(--radius-sm)] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30",
                children: [
                  /* @__PURE__ */ jsx(CloseIcon, { className: "size-4" }),
                  /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
                ]
              }
            )
          ]
        }
      ) });
    }
  ),
  "SheetContent"
);
var SheetHeader = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        "data-slot": "sheet-header",
        className: cn("mb-5 flex flex-col gap-1.5 pr-8", className),
        ...props
      }
    )
  ),
  "SheetHeader"
);
var SheetTitle = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ className, ...props }, ref) => {
      const titleId = useModalPart("title");
      return /* @__PURE__ */ jsx(
        "h2",
        {
          ref,
          id: titleId,
          "data-slot": "sheet-title",
          className: cn(
            "font-mono text-sm font-bold uppercase tracking-[0.1em] text-foreground",
            className
          ),
          ...props
        }
      );
    }
  ),
  "SheetTitle"
);
var SheetDescription = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(({ className, ...props }, ref) => {
    const descriptionId = useModalPart("description");
    return /* @__PURE__ */ jsx(
      "p",
      {
        ref,
        id: descriptionId,
        "data-slot": "sheet-description",
        className: cn("text-sm leading-relaxed text-muted-foreground", className),
        ...props
      }
    );
  }),
  "SheetDescription"
);
var SheetFooter = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        "data-slot": "sheet-footer",
        className: cn(
          "mt-auto flex flex-col-reverse gap-2 pt-6 sm:flex-row sm:justify-end",
          className
        ),
        ...props
      }
    )
  ),
  "SheetFooter"
);
var SheetClose = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(
    ({ asChild, onClick, type, ...props }, ref) => {
      const ctx = useModal();
      const Comp = asChild ? Slot : "button";
      return /* @__PURE__ */ jsx(
        Comp,
        {
          ref,
          type: asChild ? type : type ?? "button",
          onClick: (event) => {
            onClick?.(event);
            if (!event.defaultPrevented) ctx?.close();
          },
          ...props
        }
      );
    }
  ),
  "SheetClose"
);
var TooltipProvider = TooltipPrimitive.Provider;
function Tooltip(props) {
  return /* @__PURE__ */ jsx(TooltipPrimitive.Root, { ...props });
}
var TooltipTrigger = TooltipPrimitive.Trigger;
var TooltipContent = /* @__PURE__ */ named(
  /* @__PURE__ */ React36.forwardRef(({ className, sideOffset = 6, ...props }, ref) => /* @__PURE__ */ jsx(TooltipPrimitive.Portal, { children: /* @__PURE__ */ jsx(
    TooltipPrimitive.Content,
    {
      ref,
      sideOffset,
      collisionPadding: 8,
      "data-slot": "tooltip-content",
      className: cn(
        "z-50 max-w-xs rounded-[var(--radius-sm)] bg-primary px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-primary-foreground shadow-[var(--shadow-md)]",
        "motion-safe:animate-rise",
        className
      ),
      ...props
    }
  ) })),
  "TooltipContent"
);

export { AccentPicker, Accordion, AccordionContent, AccordionItem, AccordionTrigger, Alert, AlertDescription, AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, AlertTitle, Avatar, AvatarFallback, AvatarGroup, AvatarImage, Badge, BrandLockup, BrandMark, BrandWordmark, Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, Button, Callout, Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Checkbox, Code, CodeBlock, Collapsible, CollapsibleContent, CollapsibleTrigger, Combobox, Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut, Container, CopyButton, DataList, DataRow, Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger, EmptyState, EmptyStateActions, EmptyStateDescription, EmptyStateMedia, EmptyStateTitle, Field, FieldDescription, FieldError, FieldLabel, FindingItem, FindingList, FloatingMarks, GlitchText, Grid, GridBackground, HoverCard, HoverCardContent, HoverCardTrigger, InfoTip, Input, Kbd, Label, Link, MarginNote, Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, Popover, PopoverAnchor, PopoverClose, PopoverContent, PopoverTrigger, Progress, ProjectCard, Prose, RadioGroup, RadioGroupItem, Readout, ReadoutCell, RepoBanner, ScrollArea, ScrollBar, SectionHeading, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue, Separator2 as Separator, Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger, Skeleton, Slider, SocialCard, Spinner, Stack, Stat, StatDelta, StatLabel, StatValue, StatusChip, StatusDot, Switch, Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow, TableSortButton, Tabs, TabsContent, TabsList, TabsTrigger, Text, Textarea, ThemeProvider, ThemeToggle, Toggle, ToggleGroup, ToggleGroupItem, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, alertVariants, avatarFallbackVariants, avatarVariants, badgeVariants, buttonVariants, calloutVariants, cardVariants, containerVariants, emptyStateVariants, fallbackVariants, indicatorVariants, linkVariants, paginationLinkVariants, progressIndicatorVariants, sheetVariants, spinnerVariants, stackVariants, deltaVariants as statDeltaVariants, statusChipVariants, statusDotVariants, textVariants, themeInitScript, toggleVariants, useCopyToClipboard, useField, useFieldControlProps, useTheme };
