export { accents, animations, breakpoints, colors, fonts, motion, radius, signals, tokens } from './chunk-AMCCIDMK.js';
import { Icon as Icon$1 } from '@iconify/react/offline';
export { addCollection, addIcon } from '@iconify/react/offline';
import { cva } from 'class-variance-authority';
import * as React25 from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { createPortal } from 'react-dom';

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
var BrandMark = React25.forwardRef(
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
var BrandWordmark = React25.forwardRef(
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
var BrandLockup = React25.forwardRef(
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
var FloatingMarks = React25.forwardRef(
  ({ count = 14, className, ...props }, ref) => {
    const marks = React25.useMemo(
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
var GlitchText = React25.forwardRef(
  ({ text, trigger = "ambient", interval = [900, 3600], className, ...props }, ref) => {
    const containerRef = React25.useRef(null);
    const setRefs = React25.useCallback(
      (node) => {
        containerRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      [ref]
    );
    const segments = React25.useMemo(
      () => Array.from(text).map((char, i) => ({ char, key: `${i} ${char}` })),
      [text]
    );
    const burst = React25.useCallback(() => {
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
    React25.useEffect(() => {
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
var GridBackground = React25.forwardRef(
  ({ cell = 30, interactive = false, glow = true, spotlight = 340, className, style, ...props }, ref) => {
    const rootRef = React25.useRef(null);
    const setRefs = React25.useCallback(
      (node) => {
        rootRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      [ref]
    );
    React25.useEffect(() => {
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
function Badge({ className, variant, ...props }) {
  return /* @__PURE__ */ jsx("span", { className: cn(badgeVariants({ variant }), className), ...props });
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
var ProjectCard = React25.forwardRef(
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
    const titleId = React25.useId();
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
var RepoBanner = React25.forwardRef(
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
var SocialCard = React25.forwardRef(
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
var Avatar = React25.forwardRef(
  ({ className, size, shape = "circle", status, children, ...props }, ref) => /* @__PURE__ */ jsxs(
    "span",
    {
      ref,
      "data-slot": "avatar",
      className: cn(avatarVariants({ size, shape }), className),
      ...props,
      children: [
        /* @__PURE__ */ jsx(
          "span",
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
var AvatarImage = React25.forwardRef(
  ({ className, onError, ...props }, ref) => {
    const [errored, setErrored] = React25.useState(false);
    if (errored) return null;
    return (
      // biome-ignore lint/a11y/useAltText: alt is forwarded via props
      /* @__PURE__ */ jsx(
        "img",
        {
          ref,
          "data-slot": "avatar-image",
          className: cn("size-full object-cover", className),
          onError: (event) => {
            setErrored(true);
            onError?.(event);
          },
          ...props
        }
      )
    );
  }
);
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
var AvatarFallback = React25.forwardRef(
  ({ className, tone, ...props }, ref) => /* @__PURE__ */ jsx(
    "span",
    {
      ref,
      "data-slot": "avatar-fallback",
      className: cn(fallbackVariants({ tone }), className),
      ...props
    }
  )
);
AvatarFallback.displayName = "AvatarFallback";
var AvatarGroup = React25.forwardRef(
  ({ className, max, size = "default", children, ...props }, ref) => {
    const items = React25.Children.toArray(children).filter(React25.isValidElement);
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
var DataListContext = React25.createContext("justify");
var DataList = React25.forwardRef(
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
var DataRow = React25.forwardRef(
  ({ label, mono, layout, className, children, ...props }, ref) => {
    const inherited = React25.useContext(DataListContext);
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

// src/icons/generated.ts
var houseIcons = {
  "arrow-down": { "body": '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v14m7-7l-7 7l-7-7"/>', "width": 24, "height": 24 },
  "arrow-left": { "body": '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m12 19l-7-7l7-7m7 7H5"/>', "width": 24, "height": 24 },
  "arrow-right": { "body": '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7-7l7 7l-7 7"/>', "width": 24, "height": 24 },
  "arrow-up": { "body": '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m5 12l7-7l7 7m-7 7V5"/>', "width": 24, "height": 24 },
  "arrow-up-right": { "body": '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h10v10M7 17L17 7"/>', "width": 24, "height": 24 },
  "bell": { "body": '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.268 21a2 2 0 0 0 3.464 0m-10.47-5.674A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/>', "width": 24, "height": 24 },
  "bookmark": { "body": '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"/>', "width": 24, "height": 24 },
  "calendar": { "body": '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M8 2v4m8-4v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></g>', "width": 24, "height": 24 },
  "check": { "body": '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 6L9 17l-5-5"/>', "width": 24, "height": 24 },
  "check-check": { "body": '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 6L7 17l-5-5m20-2l-7.5 7.5L13 16"/>', "width": 24, "height": 24 },
  "chevron-down": { "body": '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m6 9l6 6l6-6"/>', "width": 24, "height": 24 },
  "chevron-left": { "body": '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 18l-6-6l6-6"/>', "width": 24, "height": 24 },
  "chevron-right": { "body": '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 18l6-6l-6-6"/>', "width": 24, "height": 24 },
  "chevron-up": { "body": '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m18 15l-6-6l-6 6"/>', "width": 24, "height": 24 },
  "chevrons-up-down": { "body": '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 15l5 5l5-5M7 9l5-5l5 5"/>', "width": 24, "height": 24 },
  "circle": { "body": '<circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>', "width": 24, "height": 24 },
  "circle-alert": { "body": '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/></g>', "width": 24, "height": 24 },
  "circle-check": { "body": '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m9 12l2 2l4-4"/></g>', "width": 24, "height": 24 },
  "circle-help": { "body": '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3m.08 4h.01"/></g>', "width": 24, "height": 24 },
  "circle-x": { "body": '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m15 9l-6 6m0-6l6 6"/></g>', "width": 24, "height": 24 },
  "clipboard": { "body": '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></g>', "width": 24, "height": 24 },
  "clock": { "body": '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></g>', "width": 24, "height": 24 },
  "code": { "body": '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m16 18l6-6l-6-6M8 6l-6 6l6 6"/>', "width": 24, "height": 24 },
  "code-xml": { "body": '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m18 16l4-4l-4-4M6 8l-4 4l4 4m8.5-12l-5 16"/>', "width": 24, "height": 24 },
  "command": { "body": '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"/>', "width": 24, "height": 24 },
  "copy": { "body": '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></g>', "width": 24, "height": 24 },
  "dot": { "body": '<circle cx="12" cy="12" r="1" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>', "width": 24, "height": 24 },
  "download": { "body": '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M12 15V3m9 12v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10l5 5l5-5"/></g>', "width": 24, "height": 24 },
  "ellipsis": { "body": '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></g>', "width": 24, "height": 24 },
  "ellipsis-vertical": { "body": '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></g>', "width": 24, "height": 24 },
  "external-link": { "body": '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 3h6v6m-11 5L21 3m-3 10v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>', "width": 24, "height": 24 },
  "eye": { "body": '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M2.062 12.348a1 1 0 0 1 0-.696a10.75 10.75 0 0 1 19.876 0a1 1 0 0 1 0 .696a10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></g>', "width": 24, "height": 24 },
  "eye-off": { "body": '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575a1 1 0 0 1 0 .696a10.8 10.8 0 0 1-1.444 2.49m-6.41-.679a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151a1 1 0 0 1 0-.696a10.75 10.75 0 0 1 4.446-5.143M2 2l20 20"/></g>', "width": 24, "height": 24 },
  "file": { "body": '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/><path d="M14 2v5a1 1 0 0 0 1 1h5"/></g>', "width": 24, "height": 24 },
  "file-text": { "body": '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/><path d="M14 2v5a1 1 0 0 0 1 1h5M10 9H8m8 4H8m8 4H8"/></g>', "width": 24, "height": 24 },
  "filter": { "body": '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M22 3H2l8 9.46V19l4 2v-8.54z"/>', "width": 24, "height": 24 },
  "folder": { "body": '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>', "width": 24, "height": 24 },
  "github": { "body": '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5c.08-1.25-.27-2.48-1-3.5c.28-1.15.28-2.35 0-3.5c0 0-1 0-3 1.5c-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5c-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></g>', "width": 24, "height": 24 },
  "heart": { "body": '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676a.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/>', "width": 24, "height": 24 },
  "house": { "body": '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></g>', "width": 24, "height": 24 },
  "image": { "body": '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></g>', "width": 24, "height": 24 },
  "info": { "body": '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/></g>', "width": 24, "height": 24 },
  "layout-grid": { "body": '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></g>', "width": 24, "height": 24 },
  "link": { "body": '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></g>', "width": 24, "height": 24 },
  "loader-circle": { "body": '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 1 1-6.219-8.56"/>', "width": 24, "height": 24 },
  "lock": { "body": '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></g>', "width": 24, "height": 24 },
  "lock-open": { "body": '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></g>', "width": 24, "height": 24 },
  "log-in": { "body": '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m10 17l5-5l-5-5m5 5H3m12-9h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>', "width": 24, "height": 24 },
  "log-out": { "body": '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m16 17l5-5l-5-5m5 5H9m0 9H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>', "width": 24, "height": 24 },
  "mail": { "body": '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="m22 7l-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect width="20" height="16" x="2" y="4" rx="2"/></g>', "width": 24, "height": 24 },
  "menu": { "body": '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5h16M4 12h16M4 19h16"/>', "width": 24, "height": 24 },
  "minus": { "body": '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14"/>', "width": 24, "height": 24 },
  "moon": { "body": '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/>', "width": 24, "height": 24 },
  "panel-left": { "body": '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/></g>', "width": 24, "height": 24 },
  "pause": { "body": '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><rect width="5" height="18" x="14" y="3" rx="1"/><rect width="5" height="18" x="5" y="3" rx="1"/></g>', "width": 24, "height": 24 },
  "pencil": { "body": '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497zM15 5l4 4"/>', "width": 24, "height": 24 },
  "play": { "body": '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"/>', "width": 24, "height": 24 },
  "plus": { "body": '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7-7v14"/>', "width": 24, "height": 24 },
  "refresh-cw": { "body": '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M3 12a9 9 0 0 1 9-9a9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5m5 4a9 9 0 0 1-9 9a9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></g>', "width": 24, "height": 24 },
  "rotate-cw": { "body": '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></g>', "width": 24, "height": 24 },
  "save": { "body": '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7M7 3v4a1 1 0 0 0 1 1h7"/></g>', "width": 24, "height": 24 },
  "search": { "body": '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="m21 21l-4.34-4.34"/><circle cx="11" cy="11" r="8"/></g>', "width": 24, "height": 24 },
  "send": { "body": '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11zm7.318-19.539l-10.94 10.939"/>', "width": 24, "height": 24 },
  "settings": { "body": '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0a2.34 2.34 0 0 0 3.319 1.915a2.34 2.34 0 0 1 2.33 4.033a2.34 2.34 0 0 0 0 3.831a2.34 2.34 0 0 1-2.33 4.033a2.34 2.34 0 0 0-3.319 1.915a2.34 2.34 0 0 1-4.659 0a2.34 2.34 0 0 0-3.32-1.915a2.34 2.34 0 0 1-2.33-4.033a2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/></g>', "width": 24, "height": 24 },
  "share-2": { "body": '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.59 13.51l6.83 3.98m-.01-10.98l-6.82 3.98"/></g>', "width": 24, "height": 24 },
  "sparkles": { "body": '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594zM20 2v4m2-2h-4"/><circle cx="4" cy="20" r="2"/></g>', "width": 24, "height": 24 },
  "star": { "body": '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.12 2.12 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.12 2.12 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16z"/>', "width": 24, "height": 24 },
  "sun": { "body": '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></g>', "width": 24, "height": 24 },
  "terminal": { "body": '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19h8M4 17l6-6l-6-6"/>', "width": 24, "height": 24 },
  "trash-2": { "body": '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11v6m4-6v6m5-11v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>', "width": 24, "height": 24 },
  "triangle-alert": { "body": '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m21.73 18l-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3M12 9v4m0 4h.01"/>', "width": 24, "height": 24 },
  "upload": { "body": '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v12m5-7l-5-5l-5 5m14 7v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>', "width": 24, "height": 24 },
  "user": { "body": '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></g>', "width": 24, "height": 24 },
  "users": { "body": '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M16 3.128a4 4 0 0 1 0 7.744M22 21v-2a4 4 0 0 0-3-3.87"/><circle cx="9" cy="7" r="4"/></g>', "width": 24, "height": 24 },
  "x": { "body": '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 6L6 18M6 6l12 12"/>', "width": 24, "height": 24 },
  "zap": { "body": '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.914 4a1.5 1.5 0 0 0-2.474-1.561l-9 9A1.5 1.5 0 0 0 5.5 14h4.002a.5.5 0 0 1 .471.666L8.086 20a1.5 1.5 0 0 0 2.475 1.56l9-9A1.5 1.5 0 0 0 18.5 10h-3.997a.5.5 0 0 1-.472-.667z"/>', "width": 24, "height": 24 }
};
var iconNames = Object.keys(houseIcons);
var iconVariants = cva("inline-block shrink-0", {
  variants: {
    size: {
      xs: "size-3.5",
      sm: "size-4",
      default: "size-5",
      lg: "size-6",
      xl: "size-8"
    }
  },
  defaultVariants: { size: "default" }
});
function Icon({ name, icon, label, size, className, ...props }) {
  const data = icon ?? (name ? houseIcons[name] : void 0);
  if (!data) {
    console.warn("<Icon> requires either a `name` (house set) or an `icon` (raw data) prop.");
    return null;
  }
  const a11y = label ? { role: "img", "aria-label": label, "aria-hidden": false } : { "aria-hidden": true };
  return /* @__PURE__ */ jsx(
    Icon$1,
    {
      icon: data,
      className: cn(iconVariants({ size }), className),
      ...a11y,
      ...props
    }
  );
}
Icon.displayName = "Icon";
var Kbd = React25.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
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
var Prose = React25.forwardRef(
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
var StatusDot = React25.forwardRef(
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
var Text = React25.forwardRef(
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
var Alert = React25.forwardRef(
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
var AlertTitle = React25.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
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
var AlertDescription = React25.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
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
var Callout = React25.forwardRef(
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
var Progress = React25.forwardRef(
  ({ className, value = 0, variant, ...props }, ref) => {
    const pct = Math.min(100, Math.max(0, value));
    const hasLabel = props["aria-label"] != null || props["aria-labelledby"] != null;
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        role: "progressbar",
        "aria-label": hasLabel ? void 0 : "Progress",
        "aria-valuenow": pct,
        "aria-valuemin": 0,
        "aria-valuemax": 100,
        className: cn("h-2 w-full overflow-hidden rounded-full bg-muted", className),
        ...props,
        children: /* @__PURE__ */ jsx("div", { className: cn(indicatorVariants({ variant })), style: { width: `${pct}%` } })
      }
    );
  }
);
Progress.displayName = "Progress";
var Skeleton = React25.forwardRef(
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
var Spinner = React25.forwardRef(
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
var Button = React25.forwardRef(
  ({ className, variant, size, type = "button", ...props }, ref) => /* @__PURE__ */ jsx(
    "button",
    {
      ref,
      type,
      className: cn(buttonVariants({ variant, size }), className),
      ...props
    }
  )
);
Button.displayName = "Button";
var Checkbox = React25.forwardRef(
  ({ className, id, ...props }, ref) => {
    const generatedId = React25.useId();
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
var Input = React25.forwardRef(
  ({ className, type, ...props }, ref) => /* @__PURE__ */ jsx(
    "input",
    {
      ref,
      type,
      className: cn(
        "flex h-11 w-full rounded-[var(--radius-sm)] border-[1.5px] border-input bg-background px-3 py-2 font-mono text-sm text-foreground transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props
    }
  )
);
Input.displayName = "Input";
var Label = React25.forwardRef(
  ({ className, ...props }, ref) => (
    // biome-ignore lint/a11y/noLabelWithoutControl: label is associated via htmlFor by the consumer
    /* @__PURE__ */ jsx(
      "label",
      {
        ref,
        className: cn(
          "font-mono text-xs uppercase tracking-[0.1em] text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
          className
        ),
        ...props
      }
    )
  )
);
Label.displayName = "Label";
var Switch = React25.forwardRef(
  ({ className, id, ...props }, ref) => {
    const generatedId = React25.useId();
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
var Textarea = React25.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "textarea",
    {
      ref,
      className: cn(
        "flex min-h-24 w-full resize-y rounded-[var(--radius-sm)] border-[1.5px] border-input bg-background px-3 py-2 font-mono text-sm text-foreground transition-colors duration-200 ease-[var(--ease-out)] placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props
    }
  )
);
Textarea.displayName = "Textarea";
var AccordionContext = React25.createContext(null);
function useAccordionContext(component) {
  const context = React25.useContext(AccordionContext);
  if (!context) throw new Error(`<${component}> must be used within <Accordion>`);
  return context;
}
var ItemContext = React25.createContext(null);
function useItemContext(component) {
  const context = React25.useContext(ItemContext);
  if (!context) throw new Error(`<${component}> must be used within <AccordionItem>`);
  return context;
}
function toArray(value) {
  if (value === void 0) return [];
  return Array.isArray(value) ? value : [value];
}
var Accordion = React25.forwardRef(
  ({
    type = "single",
    value,
    defaultValue,
    onValueChange,
    collapsible = false,
    className,
    children,
    ...props
  }, ref) => {
    const [uncontrolled, setUncontrolled] = React25.useState(() => toArray(defaultValue));
    const isControlled = value !== void 0;
    const open = isControlled ? toArray(value) : uncontrolled;
    const order = React25.useRef([]);
    const commit = React25.useCallback(
      (next) => {
        if (!isControlled) setUncontrolled(next);
        onValueChange?.(type === "single" ? next[0] ?? "" : next);
      },
      [isControlled, onValueChange, type]
    );
    const toggle = React25.useCallback(
      (item) => {
        const isItemOpen = open.includes(item);
        if (type === "single") {
          commit(isItemOpen ? collapsible ? [] : open : [item]);
        } else {
          commit(isItemOpen ? open.filter((v) => v !== item) : [...open, item]);
        }
      },
      [open, type, collapsible, commit]
    );
    const isOpen = React25.useCallback((item) => open.includes(item), [open]);
    const register = React25.useCallback((item) => {
      if (!order.current.includes(item)) order.current.push(item);
    }, []);
    const focusRelative = React25.useCallback(
      (from, direction) => {
        const items = order.current;
        if (items.length === 0) return;
        let nextValue;
        if (direction === "first") nextValue = items[0];
        else if (direction === "last") nextValue = items[items.length - 1];
        else {
          const index = items.indexOf(from);
          if (index === -1) return;
          nextValue = items[(index + direction + items.length) % items.length];
        }
        if (nextValue == null) return;
        document.querySelector(
          `[data-slot="accordion-trigger"][data-value="${nextValue}"]`
        )?.focus();
      },
      []
    );
    const context = React25.useMemo(
      () => ({ isOpen, toggle, register, focusRelative }),
      [isOpen, toggle, register, focusRelative]
    );
    return /* @__PURE__ */ jsx(AccordionContext.Provider, { value: context, children: /* @__PURE__ */ jsx("div", { ref, "data-slot": "accordion", className: cn("flex flex-col", className), ...props, children }) });
  }
);
Accordion.displayName = "Accordion";
var AccordionItem = React25.forwardRef(
  ({ value, className, children, ...props }, ref) => {
    const { isOpen } = useAccordionContext("AccordionItem");
    const reactId = React25.useId();
    const open = isOpen(value);
    const item = React25.useMemo(
      () => ({
        value,
        open,
        triggerId: `${reactId}-trigger`,
        contentId: `${reactId}-content`
      }),
      [value, open, reactId]
    );
    return /* @__PURE__ */ jsx(ItemContext.Provider, { value: item, children: /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        "data-slot": "accordion-item",
        "data-state": open ? "open" : "closed",
        className: cn("border-b border-border", className),
        ...props,
        children
      }
    ) });
  }
);
AccordionItem.displayName = "AccordionItem";
var AccordionTrigger = React25.forwardRef(
  ({ className, children, hideIndicator, onKeyDown, ...props }, ref) => {
    const { toggle, register, focusRelative } = useAccordionContext("AccordionTrigger");
    const { value, open, triggerId, contentId } = useItemContext("AccordionTrigger");
    React25.useEffect(() => register(value), [register, value]);
    return /* @__PURE__ */ jsx("h3", { className: "m-0 flex", children: /* @__PURE__ */ jsxs(
      "button",
      {
        ref,
        type: "button",
        id: triggerId,
        "data-slot": "accordion-trigger",
        "data-value": value,
        "data-state": open ? "open" : "closed",
        "aria-expanded": open,
        "aria-controls": contentId,
        onClick: () => toggle(value),
        onKeyDown: (event) => {
          if (event.key === "ArrowDown") {
            event.preventDefault();
            focusRelative(value, 1);
          } else if (event.key === "ArrowUp") {
            event.preventDefault();
            focusRelative(value, -1);
          } else if (event.key === "Home") {
            event.preventDefault();
            focusRelative(value, "first");
          } else if (event.key === "End") {
            event.preventDefault();
            focusRelative(value, "last");
          }
          onKeyDown?.(event);
        },
        className: cn(
          "flex w-full items-center gap-3 py-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30",
          className
        ),
        ...props,
        children: [
          children,
          hideIndicator ? null : /* @__PURE__ */ jsx(
            Icon,
            {
              name: "chevron-down",
              size: "sm",
              className: cn(
                "ml-auto shrink-0 text-muted-foreground transition-transform duration-300 ease-[var(--ease-out)] motion-reduce:transition-none",
                open && "rotate-180 text-accent"
              )
            }
          )
        ]
      }
    ) });
  }
);
AccordionTrigger.displayName = "AccordionTrigger";
var AccordionContent = React25.forwardRef(({ className, children, ...props }, ref) => {
  const { open, triggerId, contentId } = useItemContext("AccordionContent");
  return (
    // A `<section>` with an accessible name is an implicit `region` landmark.
    /* @__PURE__ */ jsx(
      "section",
      {
        id: contentId,
        "aria-labelledby": triggerId,
        "data-slot": "accordion-content",
        "data-state": open ? "open" : "closed",
        "aria-hidden": !open,
        className: cn(
          "grid transition-[grid-template-rows] duration-300 ease-[var(--ease-out)] motion-reduce:transition-none",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        ),
        children: /* @__PURE__ */ jsx("div", { className: "min-h-0 overflow-hidden", children: /* @__PURE__ */ jsx("div", { ref, className: cn("pb-4 text-sm text-muted-foreground", className), ...props, children }) })
      }
    )
  );
});
AccordionContent.displayName = "AccordionContent";
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
var Card = React25.forwardRef(
  ({ className, variant, ...props }, ref) => /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      "data-slot": "card",
      className: cn(cardVariants({ variant }), className),
      ...props
    }
  )
);
Card.displayName = "Card";
var CardHeader = React25.forwardRef(
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
var CardTitle = React25.forwardRef(
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
var CardDescription = React25.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "p",
  {
    ref,
    "data-slot": "card-description",
    className: cn("text-sm leading-relaxed text-muted-foreground", className),
    ...props
  }
));
CardDescription.displayName = "CardDescription";
var CardAction = React25.forwardRef(
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
var CardContent = React25.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, "data-slot": "card-content", className: cn("p-5 pt-0", className), ...props })
);
CardContent.displayName = "CardContent";
var CardFooter = React25.forwardRef(
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
var Container = React25.forwardRef(
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
var Stack = React25.forwardRef(
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
var Grid = React25.forwardRef(
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
var Separator = React25.forwardRef(
  ({ className, orientation = "horizontal", decorative = true, label, ...props }, ref) => {
    const semantics = decorative ? { "aria-hidden": true } : { role: "separator", "aria-orientation": orientation };
    if (label != null && orientation === "horizontal") {
      return /* @__PURE__ */ jsxs(
        "div",
        {
          ref,
          ...semantics,
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
      "div",
      {
        ref,
        ...semantics,
        className: cn(
          "shrink-0 bg-border",
          orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
          className
        ),
        ...props
      }
    );
  }
);
Separator.displayName = "Separator";
var TabsContext = React25.createContext(null);
function useTabsContext(component) {
  const context = React25.useContext(TabsContext);
  if (!context) {
    throw new Error(`<${component}> must be used within <Tabs>`);
  }
  return context;
}
var Tabs = React25.forwardRef(
  ({ className, value, defaultValue, onValueChange, children, ...props }, ref) => {
    const [uncontrolled, setUncontrolled] = React25.useState(defaultValue);
    const isControlled = value !== void 0;
    const active = isControlled ? value : uncontrolled;
    const order = React25.useRef([]);
    const setValue = React25.useCallback(
      (next) => {
        if (!isControlled) setUncontrolled(next);
        onValueChange?.(next);
      },
      [isControlled, onValueChange]
    );
    const register = React25.useCallback((triggerValue) => {
      if (!order.current.includes(triggerValue)) order.current.push(triggerValue);
    }, []);
    const focusRelative = React25.useCallback((from, direction) => {
      const items = order.current;
      const index = items.indexOf(from);
      if (index === -1) return;
      const next = items[(index + direction + items.length) % items.length];
      document.querySelector(`[role="tab"][data-value="${next}"]`)?.focus();
    }, []);
    const context = React25.useMemo(
      () => ({ value: active, setValue, register, focusRelative }),
      [active, setValue, register, focusRelative]
    );
    return /* @__PURE__ */ jsx(TabsContext.Provider, { value: context, children: /* @__PURE__ */ jsx("div", { ref, className: cn("flex flex-col gap-4", className), ...props, children }) });
  }
);
Tabs.displayName = "Tabs";
var TabsList = React25.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      role: "tablist",
      className: cn("flex gap-1 border-b border-border", className),
      ...props
    }
  )
);
TabsList.displayName = "TabsList";
var TabsTrigger = React25.forwardRef(
  ({ className, value, onKeyDown, ...props }, ref) => {
    const { value: active, setValue, register, focusRelative } = useTabsContext("TabsTrigger");
    React25.useEffect(() => register(value), [register, value]);
    const selected = active === value;
    return /* @__PURE__ */ jsx(
      "button",
      {
        ref,
        type: "button",
        role: "tab",
        "data-value": value,
        "aria-selected": selected,
        tabIndex: selected ? 0 : -1,
        onClick: () => setValue(value),
        onKeyDown: (event) => {
          if (event.key === "ArrowRight" || event.key === "ArrowDown") {
            event.preventDefault();
            focusRelative(value, 1);
          } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
            event.preventDefault();
            focusRelative(value, -1);
          }
          onKeyDown?.(event);
        },
        className: cn(
          "-mb-px border-b-2 border-transparent px-3 pb-2 font-mono text-xs uppercase tracking-[0.1em] transition-colors duration-200 ease-[var(--ease-out)] hover:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30 disabled:pointer-events-none disabled:opacity-50",
          selected ? "border-accent text-foreground" : "text-muted-foreground",
          className
        ),
        ...props
      }
    );
  }
);
TabsTrigger.displayName = "TabsTrigger";
var TabsContent = React25.forwardRef(
  ({ className, value, ...props }, ref) => {
    const { value: active } = useTabsContext("TabsContent");
    if (active !== value) return null;
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        role: "tabpanel",
        className: cn("text-sm text-muted-foreground focus-visible:outline-none", className),
        ...props
      }
    );
  }
);
TabsContent.displayName = "TabsContent";
var DialogContext = React25.createContext(null);
function Dialog({ open, onOpenChange, children }) {
  const ref = React25.useRef(null);
  React25.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    else if (!open && el.open) el.close();
  }, [open]);
  const close = React25.useCallback(() => onOpenChange(false), [onOpenChange]);
  const ctx = React25.useMemo(() => ({ close }), [close]);
  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: backdrop dismissal is an enhancement; keyboard close (Esc) is handled natively by <dialog>
    /* @__PURE__ */ jsx(
      "dialog",
      {
        ref,
        onClose: close,
        onClick: (event) => {
          if (event.target === ref.current) close();
        },
        className: "m-auto w-[calc(100%-2rem)] max-w-lg overflow-visible bg-transparent p-0 text-foreground backdrop:bg-[var(--overlay)] backdrop:backdrop-blur-[2px]",
        children: open ? /* @__PURE__ */ jsx(DialogContext.Provider, { value: ctx, children }) : null
      }
    )
  );
}
var DialogContent = React25.forwardRef(
  ({ className, children, ...props }, ref) => {
    const ctx = React25.useContext(DialogContext);
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
var DialogHeader = React25.forwardRef(
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
var DialogTitle = React25.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "h2",
  {
    ref,
    "data-slot": "dialog-title",
    className: cn(
      "font-mono text-sm font-bold uppercase tracking-[0.1em] text-foreground",
      className
    ),
    ...props
  }
));
DialogTitle.displayName = "DialogTitle";
var DialogDescription = React25.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "p",
  {
    ref,
    "data-slot": "dialog-description",
    className: cn("text-sm leading-relaxed text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = "DialogDescription";
var DialogFooter = React25.forwardRef(
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
var DialogClose = React25.forwardRef(
  ({ asChild, onClick, children, ...props }, ref) => {
    const ctx = React25.useContext(DialogContext);
    const handle = (event) => {
      onClick?.(event);
      if (!event.defaultPrevented) ctx?.close();
    };
    if (asChild && React25.isValidElement(children)) {
      const child = children;
      return React25.cloneElement(child, {
        onClick: (event) => {
          child.props.onClick?.(event);
          handle(event);
        }
      });
    }
    return /* @__PURE__ */ jsx("button", { ref, type: "button", onClick: handle, ...props, children });
  }
);
DialogClose.displayName = "DialogClose";
var GAP = 8;
var MARGIN = 8;
function InfoTip({
  label,
  title,
  children,
  icon = "info",
  side = "auto",
  open: controlledOpen,
  onOpenChange,
  className,
  contentClassName
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = React25.useState(false);
  const isControlled = controlledOpen !== void 0;
  const open = isControlled ? controlledOpen : uncontrolledOpen;
  const [mounted, setMounted] = React25.useState(false);
  const [position, setPosition] = React25.useState({
    top: 0,
    left: 0,
    placement: "bottom",
    ready: false
  });
  const triggerRef = React25.useRef(null);
  const panelRef = React25.useRef(null);
  const reactId = React25.useId();
  const titleId = `${reactId}-title`;
  const setOpen = React25.useCallback(
    (next) => {
      if (!isControlled) setUncontrolledOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange]
  );
  React25.useEffect(() => setMounted(true), []);
  const reposition = React25.useCallback(() => {
    const trigger = triggerRef.current;
    const panel = panelRef.current;
    if (!trigger || !panel) return;
    const t = trigger.getBoundingClientRect();
    const p = panel.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const spaceBelow = vh - t.bottom;
    const spaceAbove = t.top;
    const fitsBelow = spaceBelow >= p.height + GAP + MARGIN;
    const placement = side === "top" ? "top" : side === "bottom" ? "bottom" : fitsBelow || spaceBelow >= spaceAbove ? "bottom" : "top";
    const top = placement === "bottom" ? t.bottom + GAP : Math.max(MARGIN, t.top - p.height - GAP);
    const centred = t.left + t.width / 2 - p.width / 2;
    const left = Math.min(Math.max(MARGIN, centred), Math.max(MARGIN, vw - p.width - MARGIN));
    setPosition({ top, left, placement, ready: true });
  }, [side]);
  React25.useLayoutEffect(() => {
    if (!open) {
      setPosition((prev) => prev.ready ? { ...prev, ready: false } : prev);
      return;
    }
    reposition();
    const onScroll = () => reposition();
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onScroll);
    };
  }, [open, reposition]);
  React25.useEffect(() => {
    if (!open) return;
    panelRef.current?.focus();
  }, [open]);
  React25.useEffect(() => {
    if (!open) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    const onPointerDown = (event) => {
      const target = event.target;
      if (triggerRef.current?.contains(target) || panelRef.current?.contains(target)) return;
      setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown, true);
    document.addEventListener("pointerdown", onPointerDown, true);
    return () => {
      document.removeEventListener("keydown", onKeyDown, true);
      document.removeEventListener("pointerdown", onPointerDown, true);
    };
  }, [open, setOpen]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        ref: triggerRef,
        type: "button",
        "data-slot": "info-tip-trigger",
        "aria-label": label,
        "aria-expanded": open,
        "aria-haspopup": "dialog",
        onClick: () => setOpen(!open),
        className: cn(
          "inline-flex size-[1.15em] shrink-0 cursor-help items-center justify-center rounded-full align-[-0.15em] text-muted-foreground transition-colors",
          "hover:text-accent focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30",
          open && "text-accent",
          className
        ),
        children: /* @__PURE__ */ jsx(Icon, { name: icon, "aria-hidden": true, className: "size-[0.95em]" })
      }
    ),
    mounted && open ? createPortal(
      /* @__PURE__ */ jsxs(
        "div",
        {
          ref: panelRef,
          tabIndex: -1,
          role: "dialog",
          "aria-labelledby": title ? titleId : void 0,
          "aria-label": title ? void 0 : label,
          "data-slot": "info-tip-content",
          "data-placement": position.placement,
          style: {
            position: "fixed",
            top: position.top,
            left: position.left,
            opacity: position.ready ? 1 : 0
          },
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
      ),
      document.body
    ) : null
  ] });
}
InfoTip.displayName = "InfoTip";
var THEMES = ["light", "dark", "system"];
var ACCENTS = ["cyan", "blue", "green", "rust", "ink"];
var ThemeContext = React25.createContext(null);
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
  const [theme, setThemeState] = React25.useState(
    () => readStored(storageKey, defaultTheme, THEMES)
  );
  const [accent, setAccentState] = React25.useState(
    () => readStored(accentStorageKey, defaultAccent, ACCENTS)
  );
  const [systemDark, setSystemDark] = React25.useState(() => prefersDark());
  const effectiveTheme = !enableSystem && theme === "system" ? "light" : theme;
  const resolvedTheme = effectiveTheme === "system" ? systemDark ? "dark" : "light" : effectiveTheme;
  React25.useEffect(() => {
    if (!isBrowser || !enableSystem) return;
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => setSystemDark(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [enableSystem]);
  React25.useEffect(() => {
    applyToDocument(resolvedTheme, accent, attribute);
  }, [resolvedTheme, accent, attribute]);
  const setTheme = React25.useCallback(
    (next) => {
      setThemeState(next);
      writeStored(storageKey, next);
    },
    [storageKey]
  );
  const setAccent = React25.useCallback(
    (next) => {
      setAccentState(next);
      writeStored(accentStorageKey, next);
    },
    [accentStorageKey]
  );
  const value = React25.useMemo(
    () => ({ theme, setTheme, resolvedTheme, accent, setAccent }),
    [theme, setTheme, resolvedTheme, accent, setAccent]
  );
  return /* @__PURE__ */ jsx(ThemeContext.Provider, { value, children });
}
function useTheme() {
  const ctx = React25.useContext(ThemeContext);
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

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Alert, AlertDescription, AlertTitle, Avatar, AvatarFallback, AvatarGroup, AvatarImage, Badge, BrandLockup, BrandMark, BrandWordmark, Button, Callout, Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Checkbox, Container, DataList, DataRow, Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, FloatingMarks, GlitchText, Grid, GridBackground, Icon, InfoTip, Input, Kbd, Label, Progress, ProjectCard, Prose, RepoBanner, Separator, Skeleton, SocialCard, Spinner, Stack, StatusDot, Switch, Tabs, TabsContent, TabsList, TabsTrigger, Text, Textarea, ThemeProvider, alertVariants, avatarVariants, badgeVariants, buttonVariants, calloutVariants, cardVariants, cn, containerVariants, fallbackVariants, houseIcons, iconNames, iconVariants, indicatorVariants, spinnerVariants, stackVariants, statusDotVariants, textVariants, themeInitScript, useTheme };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map