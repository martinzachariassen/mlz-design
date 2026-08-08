/**
 * The colour ladder as an executable contract.
 *
 * `theme.css` makes promises a comment cannot enforce:
 *
 *   1. a fill carries its paired foreground at WCAG AA (4.5:1);
 *   2. the `-deep` rung is readable on *every* paper surface, and clears the
 *      3:1 that SC 1.4.11 asks of a focus indicator;
 *   3. no value sits outside sRGB, so the browser never clips it into a colour
 *      other than the one measured here.
 *
 * These run against the JS mirror in `src/tokens.ts`, so they describe the
 * ladder's *shape*. They cannot tell you the shipped CSS agrees — that is
 * `theme-css.test.ts`, which reads `theme.css` itself, checks this mirror
 * against it, and re-runs the contracts on the resolved semantic roles
 * (neutrals included). The two are a pair: shape here, reality there.
 *
 * The colour maths lives in `lib/contrast.ts`, shared with the Foundations docs
 * page so the published figures and the asserted ones cannot disagree.
 */

import { describe, expect, it } from "vitest";
import { contrastRatio as contrast, inSrgbGamut } from "./lib/contrast";
import { accentFill, accents, colors, onDark, signalFill, signals, signalsDeep } from "./tokens";

/* ------------------------------------------------------------------ surfaces */

/** Every light surface a component may put a `-deep` colour on. */
const PAPER_SURFACES = {
  paper: colors.paper,
  "paper-2": colors.paper2,
  "paper-3": colors.paper3,
} as const;

/**
 * Every dark surface, mirroring the `.dark` block: `--background`, `--card` /
 * `--popover`, and `--muted` / `--secondary` (the lightest, so the worst case).
 */
const INK_SURFACES = {
  background: "oklch(0.20 0.004 110)",
  card: "oklch(0.23 0.004 110)",
  muted: "oklch(0.27 0.004 110)",
} as const;

const AA = 4.5;
const NON_TEXT = 3;

/** The foreground a fill takes, decided by its mode rather than per role. */
const foregroundFor = (mode: "tint" | "bold") => (mode === "tint" ? colors.ink : colors.paper);

/* --------------------------------------------------------------------- tests */

describe("colour ladder — gamut", () => {
  const everyValue = [
    ...Object.entries(signals).map(([n, v]) => [`signals.${n}`, v] as const),
    ...Object.entries(signalsDeep).map(([n, v]) => [`signalsDeep.${n}`, v] as const),
    ...Object.entries(onDark).map(([n, v]) => [`onDark.${n}`, v] as const),
    ...Object.entries(accents).flatMap(([n, v]) => [
      [`accents.${n}.base`, v.base] as const,
      [`accents.${n}.deep`, v.deep] as const,
    ]),
  ];

  it.each(everyValue)("%s stays inside sRGB", (_name, value) => {
    expect(inSrgbGamut(value)).toBe(true);
  });
});

describe("colour ladder — fills carry their paired foreground", () => {
  const fills = [
    ...Object.entries(signals).map(
      ([n, v]) => [`signals.${n}`, v, signalFill[n as keyof typeof signals]] as const,
    ),
    ...Object.entries(accents).map(
      ([n, v]) => [`accents.${n}`, v.base, accentFill[n as keyof typeof accents]] as const,
    ),
  ];

  it.each(fills)("%s (%s fill) clears AA against its foreground", (_name, fill, mode) => {
    expect(contrast(fill, foregroundFor(mode))).toBeGreaterThanOrEqual(AA);
  });

  it("keeps every fill out of the dead zone between the two modes", () => {
    // A fill whose best foreground manages under 4.5:1 has landed in the
    // mid-lightness band where neither ink nor paper is readable. That is the
    // failure the previous blue/rust/success solids had.
    for (const [name, fill] of [
      ...Object.entries(signals),
      ...Object.entries(accents).map(([n, v]) => [n, v.base] as const),
    ]) {
      const best = Math.max(contrast(fill, colors.ink), contrast(fill, colors.paper));
      expect(best, `${name} sits in the dead zone`).toBeGreaterThanOrEqual(AA);
    }
  });
});

describe("colour ladder — the -deep rung is safe on every paper surface", () => {
  const deeps = [
    ...Object.entries(signalsDeep).map(([n, v]) => [`signalsDeep.${n}`, v] as const),
    ...Object.entries(accents).map(([n, v]) => [`accents.${n}.deep`, v.deep] as const),
  ];

  for (const [surfaceName, surface] of Object.entries(PAPER_SURFACES)) {
    it.each(deeps)(`%s reads as body text on ${surfaceName}`, (_name, deep) => {
      expect(contrast(deep, surface)).toBeGreaterThanOrEqual(AA);
    });
  }

  it.each(deeps)("%s works as a focus ring on paper (SC 1.4.11)", (_name, deep) => {
    expect(contrast(deep, colors.paper)).toBeGreaterThanOrEqual(NON_TEXT);
  });
});

describe("colour ladder — dark mode", () => {
  const tintFills = [
    ...Object.entries(signals).filter(([n]) => signalFill[n as keyof typeof signals] === "tint"),
    ...Object.entries(accents)
      .filter(([n]) => accentFill[n as keyof typeof accents] === "tint")
      .map(([n, v]) => [n, v.base] as const),
  ];

  for (const [surfaceName, surface] of Object.entries(INK_SURFACES)) {
    it.each(tintFills)(`tint fill %s doubles as text on ${surfaceName}`, (_name, fill) => {
      // This is why the dark block leaves the tint families alone: a light fill
      // is already readable against ink, so `-deep` can map straight back to it.
      expect(contrast(fill, surface)).toBeGreaterThanOrEqual(AA);
    });
  }

  it.each(Object.entries(onDark))(
    "bold role %s flips to a value carrying ink text",
    (_name, value) => {
      expect(contrast(value, colors.ink)).toBeGreaterThanOrEqual(AA);
    },
  );

  it("only the bold roles need an on-dark value", () => {
    // If a tint family ever needed one, the fills above would have failed.
    expect(Object.keys(onDark).sort()).toEqual(["danger", "ink"]);
  });
});

describe("colour ladder — a family swap does not change weight", () => {
  it("keeps every tint accent within a narrow contrast band", () => {
    const ratios = Object.entries(accents)
      .filter(([n]) => accentFill[n as keyof typeof accents] === "tint")
      .map(([, v]) => contrast(v.base, colors.ink));

    // The point of fixing lightness per rung: switching data-accent should read
    // as a change of hue, not of emphasis.
    expect(Math.max(...ratios) - Math.min(...ratios)).toBeLessThan(1);
  });
});
