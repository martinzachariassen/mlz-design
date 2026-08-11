// src/tokens.ts
var colors = {
  paper: "#ecebe4",
  paper2: "#e4e2da",
  paper3: "#dcdad1",
  ink: "#1a1a18",
  ink2: "#4a4a45",
  muted: "#6e6c64",
  line: "#cbc9be",
  glitchRed: "oklch(0.52 0.158 25)"
};
var signals = {
  danger: "oklch(0.52 0.158 25)",
  success: "oklch(0.74 0.138 148)",
  warning: "oklch(0.74 0.138 75)",
  info: "oklch(0.74 0.137 250)"
};
var signalFill = {
  danger: "bold",
  success: "tint",
  warning: "tint",
  info: "tint"
};
var signalsDeep = {
  danger: "oklch(0.50 0.158 25)",
  success: "oklch(0.47 0.134 148)",
  warning: "oklch(0.49 0.102 75)",
  info: "oklch(0.48 0.134 250)"
};
var onDark = {
  danger: "oklch(0.67 0.158 25)",
  ink: "oklch(0.65 0.023 250)"
};
var accents = {
  cyan: { base: "oklch(0.74 0.124 195)", deep: "oklch(0.47 0.078 195)" },
  blue: { base: "oklch(0.74 0.137 250)", deep: "oklch(0.48 0.134 250)" },
  green: { base: "oklch(0.74 0.138 155)", deep: "oklch(0.47 0.114 155)" },
  rust: { base: "oklch(0.74 0.138 45)", deep: "oklch(0.50 0.138 45)" },
  ink: { base: "oklch(0.32 0.020 250)", deep: "oklch(0.24 0.015 250)" }
};
var accentFill = {
  cyan: "tint",
  blue: "tint",
  green: "tint",
  rust: "tint",
  ink: "bold"
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
  easeGlide: "cubic-bezier(.2, .7, .2, 1)",
  durationFast: "0.15s",
  durationHover: "0.26s",
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
  signalFill,
  signalsDeep,
  onDark,
  accents,
  accentFill,
  fonts,
  motion,
  animations,
  radius,
  breakpoints
};

export { accentFill, accents, animations, breakpoints, colors, fonts, motion, onDark, radius, signalFill, signals, signalsDeep, tokens };
