import { create } from "storybook/theming/create";
import { accents, colors, fonts } from "../src/tokens";
import { oklchToHex } from "./oklch";

/**
 * The Storybook manager chrome, dressed in MLZ. Every value is read from
 * `src/tokens.ts` rather than typed out, so the sidebar can't drift from the
 * system it documents — change a token and the chrome follows.
 *
 * Two constraints the manager imposes, both of which bite silently:
 *
 * 1. It runs outside the preview iframe and never sees `theme.css`, so these
 *    must be resolved values, not `var(--…)` references.
 * 2. Storybook pipes theme colours through `polished`, which only parses
 *    hex/rgb/hsl. An `oklch()` string here throws and the **entire manager
 *    renders blank** — hence `oklchToHex` on every accent.
 */
export const mlzTheme = create({
  base: "light",

  brandTitle: "MLZ Design",
  brandUrl: "https://design.mlz.no",
  brandTarget: "_self",

  colorPrimary: colors.ink,
  colorSecondary: oklchToHex(accents.cyan.deep),

  appBg: colors.paper2,
  appContentBg: colors.paper,
  appPreviewBg: colors.paper,
  appBorderColor: colors.line,
  appBorderRadius: 4,

  textColor: colors.ink,
  textInverseColor: colors.paper,
  textMutedColor: colors.muted,

  barBg: colors.paper2,
  barTextColor: colors.muted,
  barSelectedColor: oklchToHex(accents.cyan.deep),
  barHoverColor: colors.ink,

  inputBg: colors.paper,
  inputBorder: colors.line,
  inputTextColor: colors.ink,
  inputBorderRadius: 4,

  fontBase: fonts.grotesk,
  fontCode: fonts.mono,
});
