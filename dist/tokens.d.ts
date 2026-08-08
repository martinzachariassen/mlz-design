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
    readonly glitchRed: "oklch(0.52 0.158 25)";
};
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
type FillMode = "tint" | "bold";
/**
 * Meaning-carrying signal colours, on the same ladder as {@link accents} so a
 * badge and a status dot read at the same weight. These are the **fills** —
 * backgrounds for their paired foreground, never text colours. On paper the
 * tints measure roughly 1.9:1; reach for {@link signalsDeep} to colour anything.
 */
declare const signals: {
    readonly danger: "oklch(0.52 0.158 25)";
    readonly success: "oklch(0.74 0.138 148)";
    readonly warning: "oklch(0.74 0.138 75)";
    readonly info: "oklch(0.74 0.137 250)";
};
/** The fill mode of each {@link signals} entry — which foreground it pairs with. */
declare const signalFill: {
    readonly danger: "bold";
    readonly success: "tint";
    readonly warning: "tint";
    readonly info: "tint";
};
/**
 * The on-light rung: the same hues, placed so they clear WCAG AA (4.5:1) against
 * **every** paper surface — `paper`, `paper2` and `paper3` alike, measuring
 * 5.32:1–5.49:1 on `paper` and never dropping below 4.54:1 on `paper3`.
 *
 * **Colour text, icons and focus rings with these; fill shapes with
 * {@link signals}.** Mirrors `--success-deep` and friends in `theme.css`, which
 * in dark mode map back to the fills — those are already light against ink.
 */
declare const signalsDeep: {
    readonly danger: "oklch(0.50 0.158 25)";
    readonly success: "oklch(0.47 0.134 148)";
    readonly warning: "oklch(0.49 0.102 75)";
    readonly info: "oklch(0.48 0.134 250)";
};
/**
 * The on-dark rung, for the `bold` roles only. A dark fill would sink into an
 * ink surface (1.5:1), so on dark it flips to a lighter value carrying ink text
 * at about 5.4:1. The `tint` roles need no entry here: a light fill with ink
 * text already works on both surfaces, which is why `theme.css` leaves them
 * untouched in the dark block.
 */
declare const onDark: {
    readonly danger: "oklch(0.67 0.158 25)";
    readonly ink: "oklch(0.65 0.023 250)";
};
type AccentName = "cyan" | "blue" | "green" | "rust" | "ink";
/**
 * The five accent families, each `{ base, deep }` — the fill and the on-light
 * rung. Lightness is fixed per rung, so swapping families changes hue without
 * changing perceived weight: all four tints carry ink text between 7.2:1 and
 * 8.0:1. `ink` is the neutral family and the one `bold` fill; it takes paper
 * text (10.6:1) and has an {@link onDark} entry.
 */
declare const accents: {
    readonly cyan: {
        readonly base: "oklch(0.74 0.124 195)";
        readonly deep: "oklch(0.47 0.078 195)";
    };
    readonly blue: {
        readonly base: "oklch(0.74 0.137 250)";
        readonly deep: "oklch(0.48 0.134 250)";
    };
    readonly green: {
        readonly base: "oklch(0.74 0.138 155)";
        readonly deep: "oklch(0.47 0.114 155)";
    };
    readonly rust: {
        readonly base: "oklch(0.74 0.138 45)";
        readonly deep: "oklch(0.50 0.138 45)";
    };
    readonly ink: {
        readonly base: "oklch(0.32 0.020 250)";
        readonly deep: "oklch(0.24 0.015 250)";
    };
};
/** The fill mode of each {@link accents} family — which foreground it pairs with. */
declare const accentFill: {
    readonly cyan: "tint";
    readonly blue: "tint";
    readonly green: "tint";
    readonly rust: "tint";
    readonly ink: "bold";
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
    readonly easeGlide: "cubic-bezier(.2, .7, .2, 1)";
    readonly durationFast: "0.15s";
    readonly durationHover: "0.26s";
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
        readonly glitchRed: "oklch(0.52 0.158 25)";
    };
    readonly signals: {
        readonly danger: "oklch(0.52 0.158 25)";
        readonly success: "oklch(0.74 0.138 148)";
        readonly warning: "oklch(0.74 0.138 75)";
        readonly info: "oklch(0.74 0.137 250)";
    };
    readonly signalFill: {
        readonly danger: "bold";
        readonly success: "tint";
        readonly warning: "tint";
        readonly info: "tint";
    };
    readonly signalsDeep: {
        readonly danger: "oklch(0.50 0.158 25)";
        readonly success: "oklch(0.47 0.134 148)";
        readonly warning: "oklch(0.49 0.102 75)";
        readonly info: "oklch(0.48 0.134 250)";
    };
    readonly onDark: {
        readonly danger: "oklch(0.67 0.158 25)";
        readonly ink: "oklch(0.65 0.023 250)";
    };
    readonly accents: {
        readonly cyan: {
            readonly base: "oklch(0.74 0.124 195)";
            readonly deep: "oklch(0.47 0.078 195)";
        };
        readonly blue: {
            readonly base: "oklch(0.74 0.137 250)";
            readonly deep: "oklch(0.48 0.134 250)";
        };
        readonly green: {
            readonly base: "oklch(0.74 0.138 155)";
            readonly deep: "oklch(0.47 0.114 155)";
        };
        readonly rust: {
            readonly base: "oklch(0.74 0.138 45)";
            readonly deep: "oklch(0.50 0.138 45)";
        };
        readonly ink: {
            readonly base: "oklch(0.32 0.020 250)";
            readonly deep: "oklch(0.24 0.015 250)";
        };
    };
    readonly accentFill: {
        readonly cyan: "tint";
        readonly blue: "tint";
        readonly green: "tint";
        readonly rust: "tint";
        readonly ink: "bold";
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
        readonly easeGlide: "cubic-bezier(.2, .7, .2, 1)";
        readonly durationFast: "0.15s";
        readonly durationHover: "0.26s";
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

export { type AccentName, type Breakpoint, type FillMode, type Tokens, accentFill, accents, animations, breakpoints, colors, fonts, motion, onDark, radius, signalFill, signals, signalsDeep, tokens };
