import { accents } from './chunk-EYYGHWPE.js';
export { accents, animations, breakpoints, colors, fonts, motion, radius, signals, signalsDeep, tokens } from './chunk-EYYGHWPE.js';
import { cva } from 'class-variance-authority';
import * as React32 from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { Slot } from '@radix-ui/react-slot';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { Toaster as Toaster$1 } from 'sonner';
export { toast } from 'sonner';
import * as LabelPrimitive from '@radix-ui/react-label';
import * as SelectPrimitive from '@radix-ui/react-select';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import * as PopoverPrimitive2 from '@radix-ui/react-popover';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}
var M_POINTS = "7,25 7,7 12,7 16,14.5 20,7 25,7 25,25 20.6,25 20.6,13.6 17.4,19.4 14.6,19.4 11.4,13.6 11.4,25";
var brandMarkVariants = cva("inline-block shrink-0 align-middle", {
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
var BrandMark = React32.forwardRef(
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
);
BrandMark.displayName = "BrandMark";
var BrandWordmark = React32.forwardRef(
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
);
BrandWordmark.displayName = "BrandWordmark";
var BrandLockup = React32.forwardRef(
  ({ tagline = "", size = 40, orientation = "horizontal", className, ...props }, ref) => {
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
          /* @__PURE__ */ jsx(BrandMark, { size }),
          /* @__PURE__ */ jsxs("div", { className: cn("flex flex-col leading-none", stacked && "items-center"), children: [
            /* @__PURE__ */ jsx(BrandWordmark, { size: wordmarkSize }),
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
);
BrandLockup.displayName = "BrandLockup";
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
var FloatingMarks = React32.forwardRef(
  ({ count = 14, className, ...props }, ref) => {
    const marks = React32.useMemo(
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
);
FloatingMarks.displayName = "FloatingMarks";
function prefersReducedMotion() {
  return typeof window !== "undefined" && typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
var GlitchText = React32.forwardRef(
  ({ text, trigger = "ambient", interval = [900, 3600], className, ...props }, ref) => {
    const containerRef = React32.useRef(null);
    const setRefs = React32.useCallback(
      (node) => {
        containerRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      [ref]
    );
    const segments = React32.useMemo(
      () => Array.from(text).map((char, i) => ({ char, key: `${i} ${char}` })),
      [text]
    );
    const burst = React32.useCallback(() => {
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
    React32.useEffect(() => {
      if (trigger !== "ambient" || prefersReducedMotion()) return;
      const [min, max] = interval;
      let timer;
      const schedule = () => {
        timer = setTimeout(
          () => {
            if (!document.hidden) burst();
            schedule();
          },
          min + Math.random() * (max - min)
        );
      };
      schedule();
      return () => clearTimeout(timer);
    }, [trigger, interval, burst]);
    const handlePointerEnter = trigger === "hover" ? () => {
      if (!prefersReducedMotion()) burst();
    } : void 0;
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
);
GlitchText.displayName = "GlitchText";
var GridBackground = React32.forwardRef(
  ({ cell = 30, interactive = false, glow = true, spotlight = 340, className, style, ...props }, ref) => {
    const rootRef = React32.useRef(null);
    const setRefs = React32.useCallback(
      (node) => {
        rootRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      [ref]
    );
    React32.useEffect(() => {
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
      background: `radial-gradient(${spotlight + 60}px ${spotlight + 60}px at var(--mx, 50%) var(--my, 50%), color-mix(in oklch, var(--accent) 16%, transparent), transparent 68%)`,
      mixBlendMode: "multiply"
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
              className: "absolute inset-0 opacity-0 transition-opacity duration-500 ease-out group-data-[lit=true]:opacity-100",
              style: glowStyle
            }
          )
        ]
      }
    );
  }
);
GridBackground.displayName = "GridBackground";
var badgeVariants = cva(
  "inline-flex items-center rounded-[var(--radius-sm)] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        accent: "bg-accent text-accent-foreground",
        outline: "border border-border text-foreground",
        muted: "bg-muted text-muted-foreground",
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
var ProjectCard = React32.forwardRef(
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
    const titleId = React32.useId();
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
                        className: "outline-none after:absolute after:inset-0 after:content-[''] focus-visible:underline focus-visible:decoration-accent focus-visible:underline-offset-4",
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
);
ProjectCard.displayName = "ProjectCard";
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
var RepoBanner = React32.forwardRef(
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
);
RepoBanner.displayName = "RepoBanner";
var BASE_W2 = 1200;
var BASE_H2 = 630;
var SocialCard = React32.forwardRef(
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
        className: cn("relative isolate overflow-hidden bg-background text-foreground", className),
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
);
SocialCard.displayName = "SocialCard";
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
var ChevronDownIcon = strokeIcon(/* @__PURE__ */ jsx("path", { d: "m6 9 6 6 6-6" }));
var ChevronUpIcon = strokeIcon(/* @__PURE__ */ jsx("path", { d: "m18 15-6-6-6 6" }));
var ChevronRightIcon = strokeIcon(/* @__PURE__ */ jsx("path", { d: "m9 18 6-6-6-6" }));
var ChevronLeftIcon = strokeIcon(/* @__PURE__ */ jsx("path", { d: "m15 18-6-6 6-6" }));
var CloseIcon = strokeIcon(/* @__PURE__ */ jsx("path", { d: "M18 6 6 18M6 6l12 12" }));
var CheckIcon = strokeIcon(/* @__PURE__ */ jsx("path", { d: "M3.5 8.5l3 3 6-7" }), "0 0 16 16");
var SunIcon = strokeIcon(
  /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "4" }),
    /* @__PURE__ */ jsx("path", { d: "M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" })
  ] })
);
var MoonIcon = strokeIcon(/* @__PURE__ */ jsx("path", { d: "M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" }));
var MonitorIcon = strokeIcon(
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
var ThemeContext = React32.createContext(null);
var isBrowser = typeof window !== "undefined";
function prefersDark() {
  return isBrowser && window.matchMedia("(prefers-color-scheme: dark)").matches;
}
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
  const [theme, setThemeState] = React32.useState(
    () => readStored(storageKey, defaultTheme, THEMES)
  );
  const [accent, setAccentState] = React32.useState(
    () => readStored(accentStorageKey, defaultAccent, ACCENTS)
  );
  const [systemDark, setSystemDark] = React32.useState(() => prefersDark());
  const effectiveTheme = !enableSystem && theme === "system" ? "light" : theme;
  const resolvedTheme = effectiveTheme === "system" ? systemDark ? "dark" : "light" : effectiveTheme;
  React32.useEffect(() => {
    if (!isBrowser || !enableSystem) return;
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => setSystemDark(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [enableSystem]);
  React32.useEffect(() => {
    applyToDocument(resolvedTheme, accent, attribute);
  }, [resolvedTheme, accent, attribute]);
  const setTheme = React32.useCallback(
    (next) => {
      setThemeState(next);
      writeStored(storageKey, next);
    },
    [storageKey]
  );
  const setAccent = React32.useCallback(
    (next) => {
      setAccentState(next);
      writeStored(accentStorageKey, next);
    },
    [accentStorageKey]
  );
  const value = React32.useMemo(
    () => ({ theme, setTheme, resolvedTheme, accent, setAccent }),
    [theme, setTheme, resolvedTheme, accent, setAccent]
  );
  return /* @__PURE__ */ jsx(ThemeContext.Provider, { value, children });
}
function useTheme() {
  const ctx = React32.useContext(ThemeContext);
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
var RadioGroup = React32.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  RadioGroupPrimitive.Root,
  {
    ref,
    "data-slot": "radio-group",
    className: cn("grid gap-2.5", className),
    ...props
  }
));
RadioGroup.displayName = "RadioGroup";
var RadioGroupItem = React32.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
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
));
RadioGroupItem.displayName = "RadioGroupItem";
var toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-sm)] font-mono text-xs uppercase tracking-[0.14em] transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        /** Text only until pressed — the quiet default, for a row of them. */
        default: "bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground data-[state=on]:bg-accent-subtle data-[state=on]:text-foreground",
        /** Carries a hairline border, so a lone toggle still reads as a control. */
        outline: "border-[1.5px] border-input bg-transparent text-muted-foreground hover:border-accent hover:text-foreground data-[state=on]:border-accent data-[state=on]:bg-accent-subtle data-[state=on]:text-foreground"
      },
      size: {
        sm: "h-9 px-3 text-[11px]",
        default: "h-11 px-4",
        icon: "size-11 px-0"
      }
    },
    defaultVariants: { variant: "default", size: "default" }
  }
);
var Toggle = React32.forwardRef(({ className, variant, size, ...props }, ref) => /* @__PURE__ */ jsx(
  TogglePrimitive.Root,
  {
    ref,
    "data-slot": "toggle",
    className: cn(toggleVariants({ variant, size }), className),
    ...props
  }
));
Toggle.displayName = "Toggle";
var ToggleGroupContext = React32.createContext({});
var ToggleGroup = React32.forwardRef(({ className, variant, size, children, ...props }, ref) => {
  const context = React32.useMemo(() => ({ variant, size }), [variant, size]);
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
});
ToggleGroup.displayName = "ToggleGroup";
var ToggleGroupItem = React32.forwardRef(({ className, variant, size, ...props }, ref) => {
  const context = React32.useContext(ToggleGroupContext);
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
});
ToggleGroupItem.displayName = "ToggleGroupItem";
var THEMES2 = [
  { value: "light", label: "Light", Icon: SunIcon },
  { value: "dark", label: "Dark", Icon: MoonIcon },
  { value: "system", label: "System", Icon: MonitorIcon }
];
var ThemeToggle = React32.forwardRef(
  ({ className, iconOnly, hideSystem, ...props }, ref) => {
    const { theme, setTheme } = useTheme();
    const options = hideSystem ? THEMES2.filter((t) => t.value !== "system") : THEMES2;
    return /* @__PURE__ */ jsx("div", { ref, "data-slot": "theme-toggle", ...props, children: /* @__PURE__ */ jsx(
      ToggleGroup,
      {
        type: "single",
        variant: "outline",
        size: "sm",
        value: theme,
        onValueChange: (next) => next && setTheme(next),
        "aria-label": "Colour theme",
        className: cn("gap-0 [&>*:not(:first-child)]:-ml-px", className),
        children: options.map(({ value, label, Icon: Icon2 }) => /* @__PURE__ */ jsxs(
          ToggleGroupItem,
          {
            value,
            "aria-label": iconOnly ? label : void 0,
            className: "rounded-none first:rounded-l-[var(--radius-sm)] last:rounded-r-[var(--radius-sm)]",
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
);
ThemeToggle.displayName = "ThemeToggle";
var ALL_ACCENTS = Object.keys(accents);
var AccentPicker = React32.forwardRef(
  ({ className, families = ALL_ACCENTS, ...props }, ref) => {
    const { accent, setAccent } = useTheme();
    return /* @__PURE__ */ jsx("div", { ref, "data-slot": "accent-picker", ...props, children: /* @__PURE__ */ jsx(
      RadioGroup,
      {
        value: accent,
        onValueChange: (next) => setAccent(next),
        "aria-label": "Accent family",
        className: cn("flex items-center gap-2", className),
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
);
AccentPicker.displayName = "AccentPicker";
var avatarVariants = cva("relative inline-flex shrink-0", {
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
var Avatar = React32.forwardRef(
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
);
Avatar.displayName = "Avatar";
var AvatarImage = React32.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Image,
  {
    ref,
    "data-slot": "avatar-image",
    className: cn("size-full object-cover", className),
    ...props
  }
));
AvatarImage.displayName = "AvatarImage";
var fallbackVariants = cva(
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
var AvatarFallback = React32.forwardRef(({ className, tone, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Fallback,
  {
    ref,
    "data-slot": "avatar-fallback",
    className: cn(fallbackVariants({ tone }), className),
    ...props
  }
));
AvatarFallback.displayName = "AvatarFallback";
var AvatarGroup = React32.forwardRef(
  ({ className, max, size = "default", children, ...props }, ref) => {
    const items = React32.Children.toArray(children).filter(React32.isValidElement);
    const shown = typeof max === "number" ? items.slice(0, max) : items;
    const overflow = items.length - shown.length;
    return /* @__PURE__ */ jsxs(
      "div",
      {
        ref,
        "data-slot": "avatar-group",
        className: cn(
          "flex items-center -space-x-2 [&_[data-slot=avatar-frame]]:ring-2 [&_[data-slot=avatar-frame]]:ring-background",
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
);
AvatarGroup.displayName = "AvatarGroup";
var Code = React32.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
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
));
Code.displayName = "Code";
var CodeBlock = React32.forwardRef(
  ({ children, filename, copyable, copyLabel = "Copy code", className, ...props }, ref) => {
    const [copied, setCopied] = React32.useState(false);
    React32.useEffect(() => {
      if (!copied) return;
      const timer = setTimeout(() => setCopied(false), 2e3);
      return () => clearTimeout(timer);
    }, [copied]);
    const copy = async () => {
      try {
        await navigator.clipboard.writeText(children);
        setCopied(true);
      } catch {
      }
    };
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
                onClick: copy,
                className: "inline-flex shrink-0 items-center gap-1.5 rounded-[var(--radius-sm)] px-1.5 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30",
                children: [
                  copied ? /* @__PURE__ */ jsx(CheckIcon, { className: "size-3.5 text-success" }) : null,
                  copied ? "Copied" : "Copy",
                  /* @__PURE__ */ jsx("span", { className: "sr-only", children: copyLabel })
                ]
              }
            ) : null
          ] }) : null,
          /* @__PURE__ */ jsx(
            "pre",
            {
              tabIndex: 0,
              className: "overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30",
              children: /* @__PURE__ */ jsx("code", { children })
            }
          )
        ]
      }
    );
  }
);
CodeBlock.displayName = "CodeBlock";
var DataListContext = React32.createContext("justify");
var DataList = React32.forwardRef(
  ({ layout = "justify", className, ...props }, ref) => /* @__PURE__ */ jsx(DataListContext.Provider, { value: layout, children: /* @__PURE__ */ jsx(
    "dl",
    {
      ref,
      "data-slot": "data-list",
      "data-layout": layout,
      className: cn("flex flex-col", className),
      ...props
    }
  ) })
);
DataList.displayName = "DataList";
var DataRow = React32.forwardRef(
  ({ label, mono, layout, className, children, ...props }, ref) => {
    const inherited = React32.useContext(DataListContext);
    const resolved = layout ?? inherited;
    const grid = resolved === "grid";
    return /* @__PURE__ */ jsxs(
      "div",
      {
        ref,
        "data-slot": "data-row",
        "data-layout": resolved,
        className: cn(
          "border-b border-border py-1.5 last:border-b-0",
          grid ? "grid grid-cols-[var(--mlz-data-label,8rem)_minmax(0,1fr)] items-baseline gap-x-4 gap-y-1 max-[560px]:grid-cols-1 max-[560px]:gap-y-0.5" : "flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5 border-dashed",
          className
        ),
        ...props,
        children: [
          /* @__PURE__ */ jsx(
            "dt",
            {
              className: cn(
                grid ? "font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground" : "text-sm text-muted-foreground"
              ),
              children: label
            }
          ),
          /* @__PURE__ */ jsx(
            "dd",
            {
              className: cn(
                "m-0 break-words text-sm text-foreground",
                grid ? "min-w-0" : "max-w-[64%] text-right",
                mono && "font-mono text-[0.9em]"
              ),
              children
            }
          )
        ]
      }
    );
  }
);
DataRow.displayName = "DataRow";
var Kbd = React32.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "kbd",
  {
    ref,
    className: cn(
      "inline-flex min-w-6 items-center justify-center rounded-[var(--radius-sm)] border border-border bg-muted px-1.5 py-0.5 font-mono text-[11px] leading-none text-muted-foreground",
      className
    ),
    ...props
  }
));
Kbd.displayName = "Kbd";
var linkVariants = cva(
  "rounded-[var(--radius-sm)] transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30",
  {
    variants: {
      variant: {
        /** Underlined in running text, where the underline is what marks it as a link. */
        default: "text-foreground underline decoration-border underline-offset-4 hover:decoration-accent hover:text-accent",
        /**
         * Accent-coloured, underline only on hover — for links that already sit
         * apart. Uses `--accent-deep`, not `--accent`: the plain accent is a
         * fill-and-border colour (cyan measures 1.8:1 on paper) and fails AA as
         * text. `Prose` colours its links the same way.
         */
        subtle: "text-[var(--accent-deep)] hover:text-accent hover:underline hover:underline-offset-4",
        /** Muted until hovered, for footers and dense secondary navigation. */
        quiet: "text-muted-foreground hover:text-foreground"
      }
    },
    defaultVariants: { variant: "default" }
  }
);
var Link = React32.forwardRef(
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
);
Link.displayName = "Link";
var Prose = React32.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
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
        "[&_a]:font-medium [&_a]:text-[var(--accent-deep)] [&_a]:underline [&_a]:decoration-from-font [&_a]:underline-offset-[3px] hover:[&_a]:text-accent",
        "[&_strong]:font-bold [&_strong]:text-foreground",
        "[&_em]:italic",
        // lists
        "[&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mt-1.5 [&_li]:pl-1 [&_li]:marker:text-accent",
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
  )
);
Prose.displayName = "Prose";
var deltaVariants = cva("font-mono text-xs tabular-nums", {
  variants: {
    direction: {
      up: "text-[var(--success-deep)]",
      down: "text-[var(--destructive-deep)]",
      flat: "text-muted-foreground"
    }
  },
  defaultVariants: { direction: "flat" }
});
var Stat = React32.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, "data-slot": "stat", className: cn("flex flex-col gap-1", className), ...props })
);
Stat.displayName = "Stat";
var StatLabel = React32.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
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
));
StatLabel.displayName = "StatLabel";
var StatValue = React32.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "p",
  {
    ref,
    "data-slot": "stat-value",
    className: cn("font-grotesk text-3xl font-bold tabular-nums tracking-tight", className),
    ...props
  }
));
StatValue.displayName = "StatValue";
var StatDelta = React32.forwardRef(
  ({ className, direction, ...props }, ref) => /* @__PURE__ */ jsx(
    "p",
    {
      ref,
      "data-slot": "stat-delta",
      className: cn(deltaVariants({ direction }), className),
      ...props
    }
  )
);
StatDelta.displayName = "StatDelta";
var statusDotVariants = cva("relative inline-flex size-2 shrink-0", {
  variants: {
    variant: {
      success: "text-success",
      warning: "text-warning",
      destructive: "text-destructive",
      info: "text-info",
      accent: "text-accent",
      muted: "text-muted-foreground"
    }
  },
  defaultVariants: { variant: "muted" }
});
var StatusDot = React32.forwardRef(
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
);
StatusDot.displayName = "StatusDot";
var Table = React32.forwardRef(
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
);
Table.displayName = "Table";
var TableHeader = React32.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("thead", { ref, "data-slot": "table-header", className: cn(className), ...props }));
TableHeader.displayName = "TableHeader";
var TableBody = React32.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("tbody", { ref, "data-slot": "table-body", className: cn(className), ...props }));
TableBody.displayName = "TableBody";
var TableFooter = React32.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "tfoot",
  {
    ref,
    "data-slot": "table-footer",
    className: cn("border-t border-border font-medium [&>tr]:border-0", className),
    ...props
  }
));
TableFooter.displayName = "TableFooter";
var TableRow = React32.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
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
));
TableRow.displayName = "TableRow";
var TableHead = React32.forwardRef(({ className, scope = "col", ...props }, ref) => /* @__PURE__ */ jsx(
  "th",
  {
    ref,
    scope,
    "data-slot": "table-head",
    className: cn(
      "border-b border-border py-2 pr-4 text-left align-middle font-mono text-[11px] font-normal uppercase tracking-[0.1em] text-muted-foreground",
      "[&[align=right]]:text-right [&[align=center]]:text-center",
      className
    ),
    ...props
  }
));
TableHead.displayName = "TableHead";
var TableCell = React32.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
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
));
TableCell.displayName = "TableCell";
var TableCaption = React32.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "caption",
  {
    ref,
    "data-slot": "table-caption",
    className: cn("mt-3 text-left text-sm text-muted-foreground", className),
    ...props
  }
));
TableCaption.displayName = "TableCaption";
var textVariants = cva("", {
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
      lg: "text-lg"
    }
  },
  defaultVariants: { variant: "body" }
});
var Text = React32.forwardRef(
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
);
Text.displayName = "Text";
var alertVariants = cva(
  "relative grid w-full grid-cols-[0_1fr] items-start gap-y-1 rounded-[var(--radius-md)] border border-l-2 px-4 py-3 text-sm transition-colors has-[>svg]:grid-cols-[1rem_1fr] has-[>svg]:gap-x-3 [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "border-border bg-card text-card-foreground",
        info: "border-[var(--info)]/25 border-l-[var(--info)] bg-info-subtle text-[var(--info)]",
        success: "border-[var(--success)]/25 border-l-[var(--success)] bg-success-subtle text-[var(--success)]",
        warning: "border-[var(--warning)]/30 border-l-[var(--warning)] bg-warning-subtle text-[var(--warning)]",
        destructive: "border-[var(--destructive)]/25 border-l-[var(--destructive)] bg-destructive-subtle text-[var(--destructive)]"
      }
    },
    defaultVariants: { variant: "default" }
  }
);
var Alert = React32.forwardRef(
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
);
Alert.displayName = "Alert";
var AlertTitle = React32.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
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
));
AlertTitle.displayName = "AlertTitle";
var AlertDescription = React32.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "p",
  {
    ref,
    "data-slot": "alert-description",
    className: cn("col-start-2 text-sm text-muted-foreground [&_p]:leading-relaxed", className),
    ...props
  }
));
AlertDescription.displayName = "AlertDescription";
var calloutVariants = cva("flex gap-2.5 text-sm text-muted-foreground", {
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
var Callout = React32.forwardRef(
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
);
Callout.displayName = "Callout";
var emptyStateVariants = cva(
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
var EmptyState = React32.forwardRef(
  ({ className, variant, size, ...props }, ref) => /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      "data-slot": "empty-state",
      className: cn(emptyStateVariants({ variant, size }), className),
      ...props
    }
  )
);
EmptyState.displayName = "EmptyState";
var EmptyStateMedia = React32.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
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
));
EmptyStateMedia.displayName = "EmptyStateMedia";
var EmptyStateTitle = React32.forwardRef(
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
);
EmptyStateTitle.displayName = "EmptyStateTitle";
var EmptyStateDescription = React32.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "p",
  {
    ref,
    "data-slot": "empty-state-description",
    className: cn("max-w-xs text-sm leading-relaxed text-muted-foreground", className),
    ...props
  }
));
EmptyStateDescription.displayName = "EmptyStateDescription";
var EmptyStateActions = React32.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    "data-slot": "empty-state-actions",
    className: cn("flex flex-wrap items-center justify-center gap-3", className),
    ...props
  }
));
EmptyStateActions.displayName = "EmptyStateActions";
var indicatorVariants = cva(
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
var Progress = React32.forwardRef(({ className, value = 0, variant, ...props }, ref) => {
  const pct = Math.min(100, Math.max(0, value));
  const hasLabel = props["aria-label"] != null || props["aria-labelledby"] != null;
  return /* @__PURE__ */ jsx(
    ProgressPrimitive.Root,
    {
      ref,
      value: pct,
      max: 100,
      "aria-label": hasLabel ? void 0 : "Progress",
      className: cn("h-2 w-full overflow-hidden rounded-full bg-muted", className),
      ...props,
      children: /* @__PURE__ */ jsx(
        ProgressPrimitive.Indicator,
        {
          className: cn(indicatorVariants({ variant })),
          style: { width: `${pct}%` }
        }
      )
    }
  );
});
Progress.displayName = "Progress";
var Skeleton = React32.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn("rounded-[var(--radius-sm)] bg-muted animate-pulse-soft", className),
      ...props
    }
  )
);
Skeleton.displayName = "Skeleton";
var spinnerVariants = cva(
  "inline-block animate-spin rounded-full border-current border-t-transparent text-accent motion-reduce:animate-none",
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
var Spinner = React32.forwardRef(
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
);
Spinner.displayName = "Spinner";
function Toaster({ className, toastOptions, ...props }) {
  return /* @__PURE__ */ jsx(
    Toaster$1,
    {
      toastOptions: {
        unstyled: true,
        ...toastOptions,
        classNames: {
          toast: cn(
            "flex w-full items-start gap-3 rounded-[var(--radius-lg)] border border-border bg-popover p-4 text-popover-foreground shadow-[var(--shadow-lg)]",
            "font-sans text-sm"
          ),
          title: "font-mono text-xs font-bold uppercase tracking-[0.1em] text-foreground",
          description: "mt-1 text-[13px] leading-relaxed text-muted-foreground",
          icon: "mt-0.5 shrink-0",
          content: "flex-1",
          // The signal colours come from the same tokens Alert and Callout use,
          // so a success toast and a success alert are the same green.
          success: "[&_[data-icon]]:text-success",
          error: "[&_[data-icon]]:text-destructive",
          warning: "[&_[data-icon]]:text-warning",
          info: "[&_[data-icon]]:text-info",
          actionButton: "ml-auto shrink-0 rounded-[var(--radius-sm)] bg-primary px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-primary-foreground",
          cancelButton: "shrink-0 rounded-[var(--radius-sm)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground",
          closeButton: "rounded-[var(--radius-sm)] border border-border bg-popover text-muted-foreground hover:text-foreground",
          ...toastOptions?.classNames
        }
      },
      className: cn("font-sans", className),
      ...props
    }
  );
}
Toaster.displayName = "Toaster";
var buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-sm)] font-mono text-xs uppercase tracking-[0.14em] transition-[transform,box-shadow,border-color,color] duration-[var(--dur-hover)] ease-[var(--ease-glide)] focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-[var(--dur-hover)] [&_svg]:ease-[var(--ease-glide)] hover:[&_svg]:-translate-x-px hover:[&_svg]:-rotate-[4deg] focus-visible:[&_svg]:-translate-x-px focus-visible:[&_svg]:-rotate-[4deg]",
  {
    variants: {
      variant: {
        default: "border-[1.5px] border-primary bg-transparent text-foreground hover:-translate-x-0.5 hover:-translate-y-0.5 hover:border-accent hover:shadow-[5px_5px_0_0_var(--accent)] focus-visible:-translate-x-0.5 focus-visible:-translate-y-0.5 focus-visible:border-accent focus-visible:shadow-[5px_5px_0_0_var(--accent)]",
        solid: "border-[1.5px] border-primary bg-primary text-primary-foreground hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_var(--accent)] focus-visible:-translate-x-0.5 focus-visible:-translate-y-0.5 focus-visible:shadow-[5px_5px_0_0_var(--accent)]",
        accent: "bg-accent text-accent-foreground hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_var(--primary)] focus-visible:-translate-x-0.5 focus-visible:-translate-y-0.5 focus-visible:shadow-[5px_5px_0_0_var(--primary)]",
        ghost: "bg-transparent text-foreground hover:bg-muted",
        sketch: "border-[1.5px] border-dashed border-primary bg-transparent text-foreground hover:-translate-x-0.5 hover:-translate-y-0.5 hover:-rotate-[0.75deg] hover:border-accent hover:shadow-[4px_4px_0_0_var(--accent)] focus-visible:-translate-x-0.5 focus-visible:-translate-y-0.5 focus-visible:-rotate-[0.75deg] focus-visible:border-accent focus-visible:shadow-[4px_4px_0_0_var(--accent)]",
        destructive: "border-[1.5px] border-destructive bg-transparent text-destructive hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_var(--destructive)] focus-visible:-translate-x-0.5 focus-visible:-translate-y-0.5 focus-visible:shadow-[5px_5px_0_0_var(--destructive)]",
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
var Button = React32.forwardRef(
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
);
Button.displayName = "Button";
var Checkbox = React32.forwardRef(
  ({ className, id, ...props }, ref) => {
    const generatedId = React32.useId();
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
);
Checkbox.displayName = "Checkbox";
var Label = React32.forwardRef(
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
);
Label.displayName = "Label";
var FieldContext = React32.createContext(null);
function useField() {
  return React32.useContext(FieldContext);
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
var Field = React32.forwardRef(
  ({ id, invalid = false, disabled = false, className, children, ...props }, ref) => {
    const reactId = React32.useId();
    const controlId = id ?? `${reactId}-control`;
    const [hasDescription, setHasDescription] = React32.useState(false);
    const [hasError, setHasError] = React32.useState(false);
    const register = React32.useCallback((part, present) => {
      if (part === "description") setHasDescription(present);
      else setHasError(present);
    }, []);
    const ctx = React32.useMemo(
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
);
Field.displayName = "Field";
var FieldLabel = React32.forwardRef(
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
);
FieldLabel.displayName = "FieldLabel";
var FieldDescription = React32.forwardRef(({ className, ...props }, ref) => {
  const field = useField();
  const register = field?.register;
  React32.useEffect(() => {
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
});
FieldDescription.displayName = "FieldDescription";
var FieldError = React32.forwardRef(({ className, children, ...props }, ref) => {
  const field = useField();
  const register = field?.register;
  const present = children !== void 0 && children !== null && children !== false;
  React32.useEffect(() => {
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
      className: cn("text-[13px] leading-relaxed text-destructive", className),
      ...props,
      children
    }
  );
});
FieldError.displayName = "FieldError";
var Input = React32.forwardRef(
  ({ className, type, ...props }, ref) => /* @__PURE__ */ jsx(
    "input",
    {
      ref,
      type,
      className: cn(
        "flex h-11 w-full rounded-[var(--radius-sm)] border-[1.5px] border-input bg-background px-3 py-2 font-mono text-sm text-foreground transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive/30",
        className
      ),
      ...useFieldControlProps(),
      ...props
    }
  )
);
Input.displayName = "Input";
function Select(props) {
  return /* @__PURE__ */ jsx(SelectPrimitive.Root, { ...props });
}
Select.displayName = "Select";
var SelectValue = SelectPrimitive.Value;
var SelectGroup = SelectPrimitive.Group;
var SelectTrigger = React32.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Trigger,
  {
    ref,
    "data-slot": "select-trigger",
    className: cn(
      "flex h-11 w-full items-center justify-between gap-2 rounded-[var(--radius-sm)] border-[1.5px] border-input bg-background px-3 py-2 font-mono text-sm text-foreground transition-colors",
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
));
SelectTrigger.displayName = "SelectTrigger";
var SelectContent = React32.forwardRef(({ className, children, position = "popper", sideOffset = 6, ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
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
) }));
SelectContent.displayName = "SelectContent";
var SelectItem = React32.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
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
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex size-4 items-center justify-center", children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(CheckIcon, { className: "size-3.5 text-accent" }) }) }),
      /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })
    ]
  }
));
SelectItem.displayName = "SelectItem";
var SelectLabel = React32.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
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
));
SelectLabel.displayName = "SelectLabel";
var SelectSeparator = React32.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.Separator,
  {
    ref,
    "data-slot": "select-separator",
    className: cn("-mx-1 my-1 h-px bg-border", className),
    ...props
  }
));
SelectSeparator.displayName = "SelectSeparator";
var Switch = React32.forwardRef(
  ({ className, id, ...props }, ref) => {
    const generatedId = React32.useId();
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
);
Switch.displayName = "Switch";
var Textarea = React32.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "textarea",
    {
      ref,
      className: cn(
        "flex min-h-24 w-full resize-y rounded-[var(--radius-sm)] border-[1.5px] border-input bg-background px-3 py-2 font-mono text-sm text-foreground transition-colors duration-200 ease-[var(--ease-out)] placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive/30",
        className
      ),
      ...useFieldControlProps(),
      ...props
    }
  )
);
Textarea.displayName = "Textarea";
var Accordion = React32.forwardRef(({ className, type = "single", ...props }, ref) => /* @__PURE__ */ jsx(
  AccordionPrimitive.Root,
  {
    ref,
    "data-slot": "accordion",
    className: cn("flex flex-col", className),
    ...{ type, ...props }
  }
));
Accordion.displayName = "Accordion";
var AccordionItem = React32.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AccordionPrimitive.Item,
  {
    ref,
    "data-slot": "accordion-item",
    className: cn("border-b border-border", className),
    ...props
  }
));
AccordionItem.displayName = "AccordionItem";
var AccordionTrigger = React32.forwardRef(({ className, children, hideIndicator, ...props }, ref) => /* @__PURE__ */ jsx(AccordionPrimitive.Header, { className: "m-0 flex", children: /* @__PURE__ */ jsxs(
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
          className: "ml-auto size-4 shrink-0 text-muted-foreground transition-transform duration-300 ease-[var(--ease-out)] group-data-[state=open]:rotate-180 group-data-[state=open]:text-accent motion-reduce:transition-none",
          children: /* @__PURE__ */ jsx("path", { d: "m6 9 6 6 6-6" })
        }
      )
    ]
  }
) }));
AccordionTrigger.displayName = "AccordionTrigger";
var AccordionContent = React32.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(
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
));
AccordionContent.displayName = "AccordionContent";
var Breadcrumb = React32.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "nav",
  {
    ref,
    "aria-label": "Breadcrumb",
    "data-slot": "breadcrumb",
    className: cn(className),
    ...props
  }
));
Breadcrumb.displayName = "Breadcrumb";
var BreadcrumbList = React32.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
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
));
BreadcrumbList.displayName = "BreadcrumbList";
var BreadcrumbItem = React32.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "li",
    {
      ref,
      "data-slot": "breadcrumb-item",
      className: cn("inline-flex items-center gap-1.5", className),
      ...props
    }
  )
);
BreadcrumbItem.displayName = "BreadcrumbItem";
var BreadcrumbLink = React32.forwardRef(
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
);
BreadcrumbLink.displayName = "BreadcrumbLink";
var BreadcrumbPage = React32.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "span",
  {
    ref,
    "aria-current": "page",
    "data-slot": "breadcrumb-page",
    className: cn("text-foreground", className),
    ...props
  }
));
BreadcrumbPage.displayName = "BreadcrumbPage";
function BreadcrumbSeparator({
  children,
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "li",
    {
      "aria-hidden": "true",
      "data-slot": "breadcrumb-separator",
      className: cn("[&>svg]:size-3 text-muted-foreground-2", className),
      ...props,
      children: children ?? /* @__PURE__ */ jsx(ChevronRightIcon, {})
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
var cardVariants = cva(
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
var Card = React32.forwardRef(
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
);
Card.displayName = "Card";
var CardHeader = React32.forwardRef(
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
);
CardHeader.displayName = "CardHeader";
var CardTitle = React32.forwardRef(
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
);
CardTitle.displayName = "CardTitle";
var CardDescription = React32.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "p",
  {
    ref,
    "data-slot": "card-description",
    className: cn("text-sm leading-relaxed text-muted-foreground", className),
    ...props
  }
));
CardDescription.displayName = "CardDescription";
var CardAction = React32.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      "data-slot": "card-action",
      className: cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className),
      ...props
    }
  )
);
CardAction.displayName = "CardAction";
var CardContent = React32.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, "data-slot": "card-content", className: cn("p-5 pt-0", className), ...props })
);
CardContent.displayName = "CardContent";
var CardFooter = React32.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      "data-slot": "card-footer",
      className: cn("flex items-center p-5 pt-0", className),
      ...props
    }
  )
);
CardFooter.displayName = "CardFooter";
var containerVariants = cva("mx-auto w-full", {
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
var Container = React32.forwardRef(
  ({ className, size, gutter, ...props }, ref) => /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      "data-slot": "container",
      className: cn(containerVariants({ size, gutter }), className),
      ...props
    }
  )
);
Container.displayName = "Container";
var stackVariants = cva("flex", {
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
var Stack = React32.forwardRef(
  ({ className, direction, gap, align, justify, wrap, ...props }, ref) => /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      "data-slot": "stack",
      className: cn(stackVariants({ direction, gap, align, justify, wrap }), className),
      ...props
    }
  )
);
Stack.displayName = "Stack";
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
var Grid = React32.forwardRef(
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
);
Grid.displayName = "Grid";
var pageVariants = cva(
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
var PaginationContent = React32.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "ul",
  {
    ref,
    "data-slot": "pagination-content",
    className: cn("flex flex-wrap items-center gap-1", className),
    ...props
  }
));
PaginationContent.displayName = "PaginationContent";
var PaginationItem = React32.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("li", { ref, "data-slot": "pagination-item", className: cn(className), ...props })
);
PaginationItem.displayName = "PaginationItem";
var PaginationLink = React32.forwardRef(
  ({ className, isActive, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "a";
    return /* @__PURE__ */ jsx(
      Comp,
      {
        ref,
        "aria-current": isActive ? "page" : void 0,
        "data-slot": "pagination-link",
        className: cn(pageVariants({ active: Boolean(isActive) }), className),
        ...props
      }
    );
  }
);
PaginationLink.displayName = "PaginationLink";
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
var Separator2 = React32.forwardRef(({ className, orientation = "horizontal", decorative = true, label, ...props }, ref) => {
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
});
Separator2.displayName = "Separator";
var Tabs = React32.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    TabsPrimitive.Root,
    {
      ref,
      className: cn("flex flex-col gap-4 data-[orientation=vertical]:flex-row", className),
      ...props
    }
  )
);
Tabs.displayName = "Tabs";
var TabsList = React32.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
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
));
TabsList.displayName = "TabsList";
var TabsTrigger = React32.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
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
));
TabsTrigger.displayName = "TabsTrigger";
var TabsContent = React32.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Content,
  {
    ref,
    className: cn("text-sm text-muted-foreground focus-visible:outline-none", className),
    ...props
  }
));
TabsContent.displayName = "TabsContent";
var ModalContext = React32.createContext(null);
function useModal() {
  return React32.useContext(ModalContext);
}
function useModalPart(part) {
  const modal = useModal();
  const register = part === "title" ? modal?.setHasTitle : modal?.setHasDescription;
  React32.useEffect(() => {
    register?.(true);
    return () => register?.(false);
  }, [register]);
  return part === "title" ? modal?.titleId : modal?.descriptionId;
}
function ModalRoot({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  className,
  slot,
  role,
  dismissOnBackdrop = true,
  children
}) {
  const ref = React32.useRef(null);
  const pressStartedOnBackdrop = React32.useRef(false);
  const reactId = React32.useId();
  const titleId = `${reactId}-title`;
  const descriptionId = `${reactId}-description`;
  const [uncontrolledOpen, setUncontrolledOpen] = React32.useState(defaultOpen);
  const isControlled = openProp !== void 0;
  const open = isControlled ? openProp : uncontrolledOpen;
  const [hasTitle, setHasTitle] = React32.useState(false);
  const [hasDescription, setHasDescription] = React32.useState(false);
  React32.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    else if (!open && el.open) el.close();
  }, [open]);
  const close = React32.useCallback(() => {
    if (!isControlled) setUncontrolledOpen(false);
    onOpenChange?.(false);
  }, [isControlled, onOpenChange]);
  const ctx = React32.useMemo(
    () => ({ close, titleId, descriptionId, setHasTitle, setHasDescription }),
    [close, titleId, descriptionId]
  );
  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: backdrop dismissal is an enhancement; keyboard close (Esc) is handled natively by <dialog>
    /* @__PURE__ */ jsx(
      "dialog",
      {
        ref,
        role,
        "aria-labelledby": hasTitle ? titleId : void 0,
        "aria-describedby": hasDescription ? descriptionId : void 0,
        onClose: close,
        onMouseDown: (event) => {
          pressStartedOnBackdrop.current = dismissOnBackdrop && event.target === ref.current;
        },
        onClick: (event) => {
          if (dismissOnBackdrop && event.target === ref.current && pressStartedOnBackdrop.current) {
            close();
          }
          pressStartedOnBackdrop.current = false;
        },
        "data-slot": slot,
        className,
        children: open ? /* @__PURE__ */ jsx(ModalContext.Provider, { value: ctx, children }) : null
      }
    )
  );
}
function AlertDialog({
  open,
  defaultOpen = false,
  onOpenChange,
  children
}) {
  return /* @__PURE__ */ jsx(
    ModalRoot,
    {
      open,
      defaultOpen,
      onOpenChange,
      slot: "alert-dialog",
      role: "alertdialog",
      dismissOnBackdrop: false,
      className: "m-auto w-[calc(100%-2rem)] max-w-md overflow-visible bg-transparent p-0 text-foreground backdrop:bg-[var(--overlay)] backdrop:backdrop-blur-[2px]",
      children
    }
  );
}
var AlertDialogContent = React32.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    "data-slot": "alert-dialog-content",
    className: cn(
      "relative mx-auto w-full rounded-[var(--radius-lg)] border border-border bg-card p-6 text-card-foreground shadow-[var(--shadow-lg)] motion-safe:animate-rise",
      className
    ),
    ...props
  }
));
AlertDialogContent.displayName = "AlertDialogContent";
var AlertDialogHeader = React32.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    "data-slot": "alert-dialog-header",
    className: cn("mb-4 flex flex-col gap-1.5", className),
    ...props
  }
));
AlertDialogHeader.displayName = "AlertDialogHeader";
var AlertDialogTitle = React32.forwardRef(({ className, ...props }, ref) => {
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
});
AlertDialogTitle.displayName = "AlertDialogTitle";
var AlertDialogDescription = React32.forwardRef(({ className, ...props }, ref) => {
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
});
AlertDialogDescription.displayName = "AlertDialogDescription";
var AlertDialogFooter = React32.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
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
));
AlertDialogFooter.displayName = "AlertDialogFooter";
var AlertDialogCancel = React32.forwardRef(
  ({ asChild, onClick, type, ...props }, ref) => {
    const ctx = useModal();
    const localRef = React32.useRef(null);
    React32.useImperativeHandle(ref, () => localRef.current);
    React32.useEffect(() => {
      localRef.current?.focus();
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
);
AlertDialogCancel.displayName = "AlertDialogCancel";
var AlertDialogAction = React32.forwardRef(
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
);
AlertDialogAction.displayName = "AlertDialogAction";
function Dialog({ open, defaultOpen = false, onOpenChange, children }) {
  return /* @__PURE__ */ jsx(
    ModalRoot,
    {
      open,
      defaultOpen,
      onOpenChange,
      slot: "dialog",
      className: "m-auto w-[calc(100%-2rem)] max-w-lg overflow-visible bg-transparent p-0 text-foreground backdrop:bg-[var(--overlay)] backdrop:backdrop-blur-[2px]",
      children
    }
  );
}
var DialogContent = React32.forwardRef(
  ({ className, children, ...props }, ref) => {
    const ctx = useModal();
    return /* @__PURE__ */ jsxs(
      "div",
      {
        ref,
        "data-slot": "dialog-content",
        className: cn(
          "relative mx-auto max-h-[85dvh] w-full overflow-y-auto rounded-[var(--radius-lg)] border border-border bg-card p-6 text-card-foreground shadow-[var(--shadow-lg)] motion-safe:animate-rise",
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
    );
  }
);
DialogContent.displayName = "DialogContent";
var DialogHeader = React32.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      "data-slot": "dialog-header",
      className: cn("mb-4 flex flex-col gap-1.5 pr-8", className),
      ...props
    }
  )
);
DialogHeader.displayName = "DialogHeader";
var DialogTitle = React32.forwardRef(({ className, ...props }, ref) => {
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
});
DialogTitle.displayName = "DialogTitle";
var DialogDescription = React32.forwardRef(({ className, ...props }, ref) => {
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
});
DialogDescription.displayName = "DialogDescription";
var DialogFooter = React32.forwardRef(
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
);
DialogFooter.displayName = "DialogFooter";
var DialogClose = React32.forwardRef(
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
);
DialogClose.displayName = "DialogClose";
var surface = cn(
  "z-50 min-w-[10rem] overflow-hidden rounded-[var(--radius-lg)] border border-border bg-popover p-1 text-popover-foreground shadow-[var(--shadow-lg)]",
  "motion-safe:animate-rise"
);
var row = cn(
  "relative flex cursor-pointer select-none items-center gap-2 rounded-[var(--radius-sm)] px-2 py-1.5 text-sm outline-none transition-colors",
  "focus:bg-accent-subtle focus:text-foreground data-[highlighted]:bg-accent-subtle data-[highlighted]:text-foreground",
  "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
  "[&_svg]:size-4 [&_svg]:shrink-0"
);
function DropdownMenu(props) {
  return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Root, { ...props });
}
DropdownMenu.displayName = "DropdownMenu";
var DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
var DropdownMenuGroup = DropdownMenuPrimitive.Group;
var DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;
var DropdownMenuContent = React32.forwardRef(({ className, sideOffset = 6, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Content,
  {
    ref,
    sideOffset,
    collisionPadding: 8,
    "data-slot": "dropdown-menu-content",
    className: cn(surface, className),
    ...props
  }
) }));
DropdownMenuContent.displayName = "DropdownMenuContent";
var DropdownMenuItem = React32.forwardRef(({ className, variant = "default", inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Item,
  {
    ref,
    "data-slot": "dropdown-menu-item",
    "data-variant": variant,
    className: cn(
      row,
      inset && "pl-8",
      variant === "destructive" && "text-destructive focus:bg-destructive/10 focus:text-destructive data-[highlighted]:bg-destructive/10 data-[highlighted]:text-destructive",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = "DropdownMenuItem";
var DropdownMenuCheckboxItem = React32.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.CheckboxItem,
  {
    ref,
    "data-slot": "dropdown-menu-checkbox-item",
    className: cn(row, "pl-8", className),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex size-4 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(CheckIcon, { className: "size-3.5 text-accent" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem";
var DropdownMenuRadioItem = React32.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.RadioItem,
  {
    ref,
    "data-slot": "dropdown-menu-radio-item",
    className: cn(row, "pl-8", className),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex size-4 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(DotIcon, { className: "text-accent" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem";
var DropdownMenuLabel = React32.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
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
));
DropdownMenuLabel.displayName = "DropdownMenuLabel";
var DropdownMenuSeparator = React32.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Separator,
  {
    ref,
    "data-slot": "dropdown-menu-separator",
    className: cn("-mx-1 my-1 h-px bg-border", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";
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
var DropdownMenuSubTrigger = React32.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs(
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
));
DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger";
var DropdownMenuSubContent = React32.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.SubContent,
  {
    ref,
    collisionPadding: 8,
    "data-slot": "dropdown-menu-sub-content",
    className: cn(surface, className),
    ...props
  }
) }));
DropdownMenuSubContent.displayName = "DropdownMenuSubContent";
var GAP = 8;
var MARGIN = 8;
function InfoTip({
  label,
  title,
  children,
  side = "auto",
  open,
  onOpenChange,
  className,
  contentClassName
}) {
  const titleId = React32.useId();
  return /* @__PURE__ */ jsxs(PopoverPrimitive2.Root, { open, onOpenChange, children: [
    /* @__PURE__ */ jsx(
      PopoverPrimitive2.Trigger,
      {
        "data-slot": "info-tip-trigger",
        "aria-label": label,
        className: cn(
          "inline-flex size-[1.15em] shrink-0 cursor-help items-center justify-center rounded-full align-[-0.15em] text-muted-foreground transition-colors",
          "hover:text-accent focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30",
          "data-[state=open]:text-accent",
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
    /* @__PURE__ */ jsx(PopoverPrimitive2.Portal, { children: /* @__PURE__ */ jsxs(
      PopoverPrimitive2.Content,
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
InfoTip.displayName = "InfoTip";
function Popover(props) {
  return /* @__PURE__ */ jsx(PopoverPrimitive2.Root, { ...props });
}
Popover.displayName = "Popover";
var PopoverTrigger = PopoverPrimitive2.Trigger;
var PopoverAnchor = PopoverPrimitive2.Anchor;
var PopoverClose = PopoverPrimitive2.Close;
var PopoverContent = React32.forwardRef(({ className, align = "center", side = "bottom", sideOffset = 8, ...props }, ref) => /* @__PURE__ */ jsx(PopoverPrimitive2.Portal, { children: /* @__PURE__ */ jsx(
  PopoverPrimitive2.Content,
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
) }));
PopoverContent.displayName = "PopoverContent";
var sheetVariants = cva(
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
  return /* @__PURE__ */ jsx(
    ModalRoot,
    {
      open,
      defaultOpen,
      onOpenChange,
      slot: "sheet",
      className: cn(sheetVariants({ side }), className),
      children
    }
  );
}
var SheetContent = React32.forwardRef(
  ({ className, children, ...props }, ref) => {
    const ctx = useModal();
    return /* @__PURE__ */ jsxs(
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
    );
  }
);
SheetContent.displayName = "SheetContent";
var SheetHeader = React32.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      "data-slot": "sheet-header",
      className: cn("mb-5 flex flex-col gap-1.5 pr-8", className),
      ...props
    }
  )
);
SheetHeader.displayName = "SheetHeader";
var SheetTitle = React32.forwardRef(({ className, ...props }, ref) => {
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
});
SheetTitle.displayName = "SheetTitle";
var SheetDescription = React32.forwardRef(({ className, ...props }, ref) => {
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
});
SheetDescription.displayName = "SheetDescription";
var SheetFooter = React32.forwardRef(
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
);
SheetFooter.displayName = "SheetFooter";
var SheetClose = React32.forwardRef(
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
);
SheetClose.displayName = "SheetClose";
var TooltipProvider = TooltipPrimitive.Provider;
function Tooltip(props) {
  return /* @__PURE__ */ jsx(TooltipPrimitive.Root, { ...props });
}
Tooltip.displayName = "Tooltip";
var TooltipTrigger = TooltipPrimitive.Trigger;
var TooltipContent = React32.forwardRef(({ className, sideOffset = 6, ...props }, ref) => /* @__PURE__ */ jsx(TooltipPrimitive.Portal, { children: /* @__PURE__ */ jsx(
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
) }));
TooltipContent.displayName = "TooltipContent";

export { AccentPicker, Accordion, AccordionContent, AccordionItem, AccordionTrigger, Alert, AlertDescription, AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertTitle, Avatar, AvatarFallback, AvatarGroup, AvatarImage, Badge, BrandLockup, BrandMark, BrandWordmark, Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, Button, Callout, Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Checkbox, Code, CodeBlock, Container, DataList, DataRow, Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger, EmptyState, EmptyStateActions, EmptyStateDescription, EmptyStateMedia, EmptyStateTitle, Field, FieldDescription, FieldError, FieldLabel, FloatingMarks, GlitchText, Grid, GridBackground, InfoTip, Input, Kbd, Label, Link, Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, Popover, PopoverAnchor, PopoverClose, PopoverContent, PopoverTrigger, Progress, ProjectCard, Prose, RadioGroup, RadioGroupItem, RepoBanner, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue, Separator2 as Separator, Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, Skeleton, SocialCard, Spinner, Stack, Stat, StatDelta, StatLabel, StatValue, StatusDot, Switch, Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow, Tabs, TabsContent, TabsList, TabsTrigger, Text, Textarea, ThemeProvider, ThemeToggle, Toaster, Toggle, ToggleGroup, ToggleGroupItem, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, alertVariants, avatarVariants, badgeVariants, buttonVariants, calloutVariants, cardVariants, cn, containerVariants, emptyStateVariants, fallbackVariants, indicatorVariants, linkVariants, spinnerVariants, stackVariants, deltaVariants as statDeltaVariants, statusDotVariants, textVariants, themeInitScript, toggleVariants, useField, useFieldControlProps, useTheme };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map