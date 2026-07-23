// src/tokens.ts
var colors = {
  paper: "#ecebe4",
  paper2: "#e4e2da",
  paper3: "#dcdad1",
  ink: "#1a1a18",
  ink2: "#4a4a45",
  muted: "#6e6c64",
  line: "#cbc9be",
  glitchRed: "oklch(0.53 0.22 18)"
};
var signals = {
  danger: "oklch(0.53 0.22 18)",
  success: "oklch(0.60 0.13 150)",
  warning: "oklch(0.80 0.15 78)",
  info: "oklch(0.62 0.15 250)"
};
var accents = {
  cyan: { base: "oklch(0.74 0.13 195)", deep: "oklch(0.48 0.10 200)" },
  blue: { base: "oklch(0.62 0.15 250)", deep: "oklch(0.46 0.13 255)" },
  green: { base: "oklch(0.70 0.13 155)", deep: "oklch(0.48 0.11 158)" },
  rust: { base: "oklch(0.66 0.15 45)", deep: "oklch(0.48 0.13 42)" },
  ink: { base: "oklch(0.32 0.02 250)", deep: "oklch(0.24 0.015 250)" }
};
var fonts = {
  hand: '"Architects Daughter", "Comic Sans MS", cursive',
  mono: '"Space Mono", ui-monospace, "SFMono-Regular", "SF Mono", Menlo, Consolas, monospace',
  grotesk: '"Space Grotesk", ui-sans-serif, system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  serif: '"Instrument Serif", ui-serif, Georgia, "Times New Roman", serif'
};
var motion = {
  easeOut: "cubic-bezier(.22, .61, .36, 1)",
  easeInOut: "cubic-bezier(.65, 0, .35, 1)",
  durationFast: "0.15s",
  durationBase: "0.3s",
  durationSlow: "0.9s"
};
var animations = {
  rise: "rise 0.9s cubic-bezier(.22, .61, .36, 1) backwards",
  pulseSoft: "pulse-soft 5.2s cubic-bezier(.65, 0, .35, 1) infinite",
  blink: "blink 1.4s steps(1, end) infinite",
  float: "float linear infinite",
  glitch: "glitch 0.4s steps(1, end) both"
};
var radius = {
  base: "0.25rem"
};
var breakpoints = {
  sm: "40rem",
  md: "48rem",
  lg: "64rem",
  xl: "80rem",
  "2xl": "96rem"
};
var tokens = {
  colors,
  signals,
  accents,
  fonts,
  motion,
  animations,
  radius,
  breakpoints
};

export { accents, animations, breakpoints, colors, fonts, motion, radius, signals, tokens };
//# sourceMappingURL=chunk-WDGGZ5QK.js.map
//# sourceMappingURL=chunk-WDGGZ5QK.js.map