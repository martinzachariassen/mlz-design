/**
 * MLZ Design tokens as typed values, for the times you need them in JS/TS
 * (charts, canvas, email templates, framer-motion) rather than CSS. These are
 * the same primitives that back the CSS custom properties in `styles/theme.css`
 * — keep the two in sync.
 */

export const colors = {
  paper: "#ecebe4",
  paper2: "#e4e2da",
  paper3: "#dcdad1",
  ink: "#1a1a18",
  ink2: "#4a4a45",
  muted: "#6e6c64",
  line: "#cbc9be",
  glitchRed: "oklch(0.52 0.158 25)",
} as const;

/**
 * How a fill behaves, and therefore which foreground it takes. No single
 * lightness works for every hue — yellow cannot go dark and stay yellow, red
 * cannot go light and stay emphatic — so the ladder has two fill modes instead
 * of pretending otherwise.
 *
 * - `tint` — light fill (L 0.74), carries `colors.ink` at 7.2:1–8.0:1.
 * - `bold` — dark fill, carries `colors.paper` at 4.6:1 or better.
 *
 * The band between them (L ≈ 0.55–0.70) is unusable for fills: there neither
 * ink nor paper text reaches 4.5:1, topping out near 4.3:1 either way.
 */
export type FillMode = "tint" | "bold";

/**
 * Meaning-carrying signal colours, on the same ladder as {@link accents} so a
 * badge and a status dot read at the same weight. These are the **fills** —
 * backgrounds for their paired foreground, never text colours. On paper the
 * tints measure roughly 1.9:1; reach for {@link signalsDeep} to colour anything.
 */
export const signals = {
  danger: "oklch(0.52 0.158 25)",
  success: "oklch(0.74 0.138 148)",
  warning: "oklch(0.74 0.138 75)",
  info: "oklch(0.74 0.137 250)",
} as const;

/** The fill mode of each {@link signals} entry — which foreground it pairs with. */
export const signalFill = {
  danger: "bold",
  success: "tint",
  warning: "tint",
  info: "tint",
} as const satisfies Record<keyof typeof signals, FillMode>;

/**
 * The on-light rung: the same hues, placed so they clear WCAG AA (4.5:1) against
 * **every** paper surface — `paper`, `paper2` and `paper3` alike, measuring
 * 5.32:1–5.49:1 on `paper` and never dropping below 4.54:1 on `paper3`.
 *
 * **Colour text, icons and focus rings with these; fill shapes with
 * {@link signals}.** Mirrors `--success-deep` and friends in `theme.css`, which
 * in dark mode map back to the fills — those are already light against ink.
 */
export const signalsDeep = {
  danger: "oklch(0.50 0.158 25)",
  success: "oklch(0.47 0.134 148)",
  warning: "oklch(0.49 0.102 75)",
  info: "oklch(0.48 0.134 250)",
} as const satisfies Record<keyof typeof signals, string>;

/**
 * The on-dark rung, for the `bold` roles only. A dark fill would sink into an
 * ink surface (1.5:1), so on dark it flips to a lighter value carrying ink text
 * at about 5.4:1. The `tint` roles need no entry here: a light fill with ink
 * text already works on both surfaces, which is why `theme.css` leaves them
 * untouched in the dark block.
 */
export const onDark = {
  danger: "oklch(0.67 0.158 25)",
  ink: "oklch(0.65 0.023 250)",
} as const;

export type AccentName = "cyan" | "blue" | "green" | "rust" | "ink";

/**
 * The five accent families, each `{ base, deep }` — the fill and the on-light
 * rung. Lightness is fixed per rung, so swapping families changes hue without
 * changing perceived weight: all four tints carry ink text between 7.2:1 and
 * 8.0:1. `ink` is the neutral family and the one `bold` fill; it takes paper
 * text (10.6:1) and has an {@link onDark} entry.
 */
export const accents = {
  cyan: { base: "oklch(0.74 0.124 195)", deep: "oklch(0.47 0.078 195)" },
  blue: { base: "oklch(0.74 0.137 250)", deep: "oklch(0.48 0.134 250)" },
  green: { base: "oklch(0.74 0.138 155)", deep: "oklch(0.47 0.114 155)" },
  rust: { base: "oklch(0.74 0.138 45)", deep: "oklch(0.50 0.138 45)" },
  ink: { base: "oklch(0.32 0.020 250)", deep: "oklch(0.24 0.015 250)" },
} as const satisfies Record<AccentName, { base: string; deep: string }>;

/** The fill mode of each {@link accents} family — which foreground it pairs with. */
export const accentFill = {
  cyan: "tint",
  blue: "tint",
  green: "tint",
  rust: "tint",
  ink: "bold",
} as const satisfies Record<AccentName, FillMode>;

export const fonts = {
  hand: '"Architects Daughter", "Comic Sans MS", cursive',
  mono: '"Space Mono", ui-monospace, "SFMono-Regular", "SF Mono", Menlo, Consolas, monospace',
  grotesk:
    '"Space Grotesk", ui-sans-serif, system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  serif: '"Instrument Serif", ui-serif, Georgia, "Times New Roman", serif',
} as const;

export const motion = {
  easeOut: "cubic-bezier(.22, .61, .36, 1)",
  easeInOut: "cubic-bezier(.65, 0, .35, 1)",
  easeGlide: "cubic-bezier(.2, .7, .2, 1)",
  durationFast: "0.15s",
  durationHover: "0.26s",
  durationBase: "0.3s",
  durationSlow: "0.9s",
} as const;

/**
 * Named animation shorthands, mirroring the `--animate-*` tokens in theme.css
 * (Tailwind emits these as `animate-rise`, `animate-blink`, … utilities). Kept
 * here for JS consumers (e.g. framer-motion, canvas) that want the same feel;
 * easings are expanded from the motion tokens so they resolve outside CSS.
 */
export const animations = {
  rise: "rise 0.9s cubic-bezier(.22, .61, .36, 1) backwards",
  pulseSoft: "pulse-soft 5.2s cubic-bezier(.65, 0, .35, 1) infinite",
  blink: "blink 1.4s steps(1, end) infinite",
  float: "float linear infinite",
  glitch: "glitch 0.4s steps(1, end) both",
} as const;

export const radius = {
  base: "0.25rem",
} as const;

/**
 * Breakpoint scale — mirrors Tailwind v4's defaults (min-width, mobile-first), so
 * `sm:`/`md:`/`lg:` utilities and these JS values name the same thresholds. Use
 * them for JS-driven layout (matchMedia, virtualisation, canvas) that has to agree
 * with the CSS. The layout primitives (`Container`, `Stack`, `Grid`) are built on
 * this same ladder.
 */
export const breakpoints = {
  sm: "40rem",
  md: "48rem",
  lg: "64rem",
  xl: "80rem",
  "2xl": "96rem",
} as const;

export type Breakpoint = keyof typeof breakpoints;

export const tokens = {
  colors,
  signals,
  signalFill,
  signalsDeep,
  onDark,
  accents,
  accentFill,
  fonts,
  motion,
  animations,
  radius,
  breakpoints,
} as const;

export type Tokens = typeof tokens;
