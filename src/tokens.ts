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
  glitchRed: "oklch(0.62 0.22 18)",
} as const;

/** Meaning-carrying signal colours, harmonised with the palette. */
export const signals = {
  danger: "oklch(0.62 0.22 18)",
  success: "oklch(0.60 0.13 150)",
  warning: "oklch(0.80 0.15 78)",
  info: "oklch(0.62 0.15 250)",
} as const;

export type AccentName = "cyan" | "blue" | "green" | "rust" | "ink";

export const accents = {
  cyan: { base: "oklch(0.74 0.13 195)", deep: "oklch(0.52 0.10 200)" },
  blue: { base: "oklch(0.62 0.15 250)", deep: "oklch(0.46 0.13 255)" },
  green: { base: "oklch(0.70 0.13 155)", deep: "oklch(0.48 0.11 158)" },
  rust: { base: "oklch(0.66 0.15 45)", deep: "oklch(0.48 0.13 42)" },
  ink: { base: "oklch(0.32 0.02 250)", deep: "oklch(0.24 0.015 250)" },
} as const satisfies Record<AccentName, { base: string; deep: string }>;

export const fonts = {
  hand: '"Architects Daughter", cursive',
  mono: '"Space Mono", ui-monospace, "SFMono-Regular", monospace',
  grotesk: '"Space Grotesk", ui-sans-serif, system-ui, sans-serif',
  serif: '"Instrument Serif", ui-serif, Georgia, serif',
} as const;

export const motion = {
  easeOut: "cubic-bezier(.22, .61, .36, 1)",
  durationFast: "0.2s",
  durationBase: "0.3s",
  durationSlow: "0.9s",
} as const;

export const radius = {
  base: "0.25rem",
} as const;

export const tokens = { colors, signals, accents, fonts, motion, radius } as const;

export type Tokens = typeof tokens;
