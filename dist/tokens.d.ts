/**
 * MLZ Design tokens as typed values, for the times you need them in JS/TS
 * (charts, canvas, email templates, framer-motion) rather than CSS. These are
 * the same primitives that back the CSS custom properties in `styles/theme.css`
 * — keep the two in sync.
 */
declare const colors: {
    readonly paper: "#ecebe4";
    readonly paper2: "#e4e2da";
    readonly paper3: "#dcdad1";
    readonly ink: "#1a1a18";
    readonly ink2: "#4a4a45";
    readonly muted: "#6e6c64";
    readonly line: "#cbc9be";
    readonly glitchRed: "oklch(0.53 0.22 18)";
};
/** Meaning-carrying signal colours, harmonised with the palette. */
declare const signals: {
    readonly danger: "oklch(0.53 0.22 18)";
    readonly success: "oklch(0.60 0.13 150)";
    readonly warning: "oklch(0.80 0.15 78)";
    readonly info: "oklch(0.62 0.15 250)";
};
type AccentName = "cyan" | "blue" | "green" | "rust" | "ink";
declare const accents: {
    readonly cyan: {
        readonly base: "oklch(0.74 0.13 195)";
        readonly deep: "oklch(0.48 0.10 200)";
    };
    readonly blue: {
        readonly base: "oklch(0.62 0.15 250)";
        readonly deep: "oklch(0.46 0.13 255)";
    };
    readonly green: {
        readonly base: "oklch(0.70 0.13 155)";
        readonly deep: "oklch(0.48 0.11 158)";
    };
    readonly rust: {
        readonly base: "oklch(0.66 0.15 45)";
        readonly deep: "oklch(0.48 0.13 42)";
    };
    readonly ink: {
        readonly base: "oklch(0.32 0.02 250)";
        readonly deep: "oklch(0.24 0.015 250)";
    };
};
declare const fonts: {
    readonly hand: "\"Architects Daughter\", \"Comic Sans MS\", cursive";
    readonly mono: "\"Space Mono\", ui-monospace, \"SFMono-Regular\", \"SF Mono\", Menlo, Consolas, monospace";
    readonly grotesk: "\"Space Grotesk\", ui-sans-serif, system-ui, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif";
    readonly serif: "\"Instrument Serif\", ui-serif, Georgia, \"Times New Roman\", serif";
};
declare const motion: {
    readonly easeOut: "cubic-bezier(.22, .61, .36, 1)";
    readonly easeInOut: "cubic-bezier(.65, 0, .35, 1)";
    readonly durationFast: "0.15s";
    readonly durationBase: "0.3s";
    readonly durationSlow: "0.9s";
};
/**
 * Named animation shorthands, mirroring the `--animate-*` tokens in theme.css
 * (Tailwind emits these as `animate-rise`, `animate-blink`, … utilities). Kept
 * here for JS consumers (e.g. framer-motion, canvas) that want the same feel;
 * easings are expanded from the motion tokens so they resolve outside CSS.
 */
declare const animations: {
    readonly rise: "rise 0.9s cubic-bezier(.22, .61, .36, 1) backwards";
    readonly pulseSoft: "pulse-soft 5.2s cubic-bezier(.65, 0, .35, 1) infinite";
    readonly blink: "blink 1.4s steps(1, end) infinite";
    readonly float: "float linear infinite";
    readonly glitch: "glitch 0.4s steps(1, end) both";
};
declare const radius: {
    readonly base: "0.25rem";
};
/**
 * Breakpoint scale — mirrors Tailwind v4's defaults (min-width, mobile-first), so
 * `sm:`/`md:`/`lg:` utilities and these JS values name the same thresholds. Use
 * them for JS-driven layout (matchMedia, virtualisation, canvas) that has to agree
 * with the CSS. The layout primitives (`Container`, `Stack`, `Grid`) are built on
 * this same ladder.
 */
declare const breakpoints: {
    readonly sm: "40rem";
    readonly md: "48rem";
    readonly lg: "64rem";
    readonly xl: "80rem";
    readonly "2xl": "96rem";
};
type Breakpoint = keyof typeof breakpoints;
declare const tokens: {
    readonly colors: {
        readonly paper: "#ecebe4";
        readonly paper2: "#e4e2da";
        readonly paper3: "#dcdad1";
        readonly ink: "#1a1a18";
        readonly ink2: "#4a4a45";
        readonly muted: "#6e6c64";
        readonly line: "#cbc9be";
        readonly glitchRed: "oklch(0.53 0.22 18)";
    };
    readonly signals: {
        readonly danger: "oklch(0.53 0.22 18)";
        readonly success: "oklch(0.60 0.13 150)";
        readonly warning: "oklch(0.80 0.15 78)";
        readonly info: "oklch(0.62 0.15 250)";
    };
    readonly accents: {
        readonly cyan: {
            readonly base: "oklch(0.74 0.13 195)";
            readonly deep: "oklch(0.48 0.10 200)";
        };
        readonly blue: {
            readonly base: "oklch(0.62 0.15 250)";
            readonly deep: "oklch(0.46 0.13 255)";
        };
        readonly green: {
            readonly base: "oklch(0.70 0.13 155)";
            readonly deep: "oklch(0.48 0.11 158)";
        };
        readonly rust: {
            readonly base: "oklch(0.66 0.15 45)";
            readonly deep: "oklch(0.48 0.13 42)";
        };
        readonly ink: {
            readonly base: "oklch(0.32 0.02 250)";
            readonly deep: "oklch(0.24 0.015 250)";
        };
    };
    readonly fonts: {
        readonly hand: "\"Architects Daughter\", \"Comic Sans MS\", cursive";
        readonly mono: "\"Space Mono\", ui-monospace, \"SFMono-Regular\", \"SF Mono\", Menlo, Consolas, monospace";
        readonly grotesk: "\"Space Grotesk\", ui-sans-serif, system-ui, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif";
        readonly serif: "\"Instrument Serif\", ui-serif, Georgia, \"Times New Roman\", serif";
    };
    readonly motion: {
        readonly easeOut: "cubic-bezier(.22, .61, .36, 1)";
        readonly easeInOut: "cubic-bezier(.65, 0, .35, 1)";
        readonly durationFast: "0.15s";
        readonly durationBase: "0.3s";
        readonly durationSlow: "0.9s";
    };
    readonly animations: {
        readonly rise: "rise 0.9s cubic-bezier(.22, .61, .36, 1) backwards";
        readonly pulseSoft: "pulse-soft 5.2s cubic-bezier(.65, 0, .35, 1) infinite";
        readonly blink: "blink 1.4s steps(1, end) infinite";
        readonly float: "float linear infinite";
        readonly glitch: "glitch 0.4s steps(1, end) both";
    };
    readonly radius: {
        readonly base: "0.25rem";
    };
    readonly breakpoints: {
        readonly sm: "40rem";
        readonly md: "48rem";
        readonly lg: "64rem";
        readonly xl: "80rem";
        readonly "2xl": "96rem";
    };
};
type Tokens = typeof tokens;

export { type AccentName, type Breakpoint, type Tokens, accents, animations, breakpoints, colors, fonts, motion, radius, signals, tokens };
