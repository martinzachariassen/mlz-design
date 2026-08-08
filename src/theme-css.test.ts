/**
 * Drift gate: `theme.css` is the source of truth, and this asserts that nothing
 * else disagrees with it.
 *
 * `tokens.contrast.test.ts` proves the ladder's promises hold. It cannot prove
 * they hold for what actually ships, because it reads `tokens.ts` — a
 * hand-maintained mirror. Change a value in `theme.css` alone and that test
 * still passes while the two files quietly disagree. So this file reads the CSS
 * and checks three things:
 *
 *   1. every chromatic primitive in `theme.css` has an identical mirror entry;
 *   2. no chromatic primitive exists that the mirror has never heard of (the
 *      case a value-by-value comparison misses — a token added to CSS only);
 *   3. the resolved semantic roles, in both themes, meet the same contrast
 *      contract the ladder promises.
 */

import { describe, expect, it } from "vitest";
import { contrastRatio, inSrgbGamut, toHex } from "./lib/contrast";
import { parseTheme, resolveColour, resolvedScope, scopeFor } from "./theme-css";
import { accents, colors, onDark, signals, signalsDeep } from "./tokens";

const blocks = parseTheme();

const LIGHT = /^(:root|:root, \[data-theme="light"\])$/;
const DARK = /^\.dark, \[data-theme="dark"\]$/;

const primitives = scopeFor(blocks, /^:root$/);
const light = resolvedScope(blocks, LIGHT);
// Layered, not read alone — `.dark` only overrides what changes.
const dark = resolvedScope(blocks, LIGHT, DARK);

const AA = 4.5;

/** How each `--mlz-*` chromatic primitive should appear in the JS mirror. */
const MIRROR: Record<string, string> = {
  "--mlz-cyan": accents.cyan.base,
  "--mlz-cyan-deep": accents.cyan.deep,
  "--mlz-blue": accents.blue.base,
  "--mlz-blue-deep": accents.blue.deep,
  "--mlz-green": accents.green.base,
  "--mlz-green-deep": accents.green.deep,
  "--mlz-rust": accents.rust.base,
  "--mlz-rust-deep": accents.rust.deep,
  "--mlz-slate": accents.ink.base,
  "--mlz-slate-deep": accents.ink.deep,
  "--mlz-slate-dark": onDark.ink,
  "--mlz-danger": signals.danger,
  "--mlz-danger-deep": signalsDeep.danger,
  "--mlz-danger-dark": onDark.danger,
  "--mlz-success": signals.success,
  "--mlz-success-deep": signalsDeep.success,
  "--mlz-warning": signals.warning,
  "--mlz-warning-deep": signalsDeep.warning,
  "--mlz-info": signals.info,
  "--mlz-info-deep": signalsDeep.info,
  "--mlz-paper": colors.paper,
  "--mlz-paper-2": colors.paper2,
  "--mlz-paper-3": colors.paper3,
  "--mlz-ink": colors.ink,
  "--mlz-ink-2": colors.ink2,
  "--mlz-muted": colors.muted,
  "--mlz-line": colors.line,
};

/** Primitives that are deliberately not colours, so not mirrored as such. */
const NON_COLOUR = /^--mlz-(font|ease|dur)-/;

describe("theme.css ↔ tokens.ts", () => {
  it("parses the primitives block", () => {
    // A silent parse failure would make every assertion below vacuously pass.
    expect(primitives.size).toBeGreaterThan(20);
    expect(light.size).toBeGreaterThan(15);
    expect(dark.size).toBeGreaterThan(15);
  });

  it.each(Object.entries(MIRROR))("%s matches the JS mirror exactly", (name, mirrored) => {
    const declared = primitives.get(name);
    expect(declared, `${name} is missing from theme.css`).toBeDefined();
    expect(normalise(declared as string)).toBe(normalise(mirrored));
  });

  it("has no colour primitive the mirror does not know about", () => {
    // The assertion the pairwise checks above cannot make: a token added to
    // theme.css and never mirrored would otherwise ship unnoticed.
    const unmirrored = [...primitives.keys()].filter(
      (name) => !NON_COLOUR.test(name) && !(name in MIRROR),
    );
    expect(unmirrored).toEqual([]);
  });

  it("keeps --muted-foreground losslessly equal to its documented hex", () => {
    // Written in OKLCH so tuned values share one notation, but it must still be
    // the exact colour the comment beside it names.
    expect(toHex(light.get("--muted-foreground") as string)).toBe("#63615a");
  });

  it("pins the dark surfaces its sibling test transcribes", () => {
    // `tokens.contrast.test.ts` hard-codes these as INK_SURFACES to check the
    // ladder's shape. Asserting them here means that transcription cannot drift
    // away from the CSS without something failing.
    expect(light.get("--background")).toBe("#ecebe4");
    expect(dark.get("--background")).toBe("oklch(0.20 0.004 110)");
    expect(dark.get("--card")).toBe("oklch(0.23 0.004 110)");
    expect(dark.get("--muted")).toBe("oklch(0.27 0.004 110)");
  });

  it("keeps hex confined to the seven neutral brand primitives", () => {
    const hex = [...primitives.entries()]
      .filter(([, value]) => /#[0-9a-fA-F]{3,8}/.test(value))
      .map(([name]) => name);
    expect(hex.sort()).toEqual([
      "--mlz-ink",
      "--mlz-ink-2",
      "--mlz-line",
      "--mlz-muted",
      "--mlz-paper",
      "--mlz-paper-2",
      "--mlz-paper-3",
    ]);
  });
});

describe("theme.css — resolved semantic roles", () => {
  /** Surface / foreground pairs the ladder promises are readable, per theme. */
  const PAIRS = [
    ["foreground", "background"],
    ["foreground", "card"],
    ["foreground", "popover"],
    ["card-foreground", "card"],
    ["popover-foreground", "popover"],
    ["primary-foreground", "primary"],
    ["secondary-foreground", "secondary"],
    ["muted-foreground", "background"],
    ["muted-foreground", "muted"],
    ["muted-foreground-2", "background"],
    ["muted-foreground-2", "muted"],
    ["accent-foreground", "accent"],
    ["destructive-foreground", "destructive"],
    ["success-foreground", "success"],
    ["warning-foreground", "warning"],
    ["info-foreground", "info"],
  ] as const;

  for (const [themeName, scope] of [
    ["light", light],
    ["dark", dark],
  ] as const) {
    it.each(PAIRS)(`${themeName}: --%s reads on --%s`, (fg, bg) => {
      const foreground = scope.get(`--${fg}`);
      const background = scope.get(`--${bg}`);
      expect(foreground, `--${fg} missing in ${themeName}`).toBeDefined();
      expect(background, `--${bg} missing in ${themeName}`).toBeDefined();
      expect(contrastRatio(foreground as string, background as string)).toBeGreaterThanOrEqual(AA);
    });

    it(`${themeName}: --ring clears the 3:1 SC 1.4.11 asks of a focus indicator`, () => {
      // The bug this whole ladder came from: --ring was a fill value, 1.82:1.
      const ring = scope.get("--ring") as string;
      const background = scope.get("--background") as string;
      expect(contrastRatio(ring, background)).toBeGreaterThanOrEqual(3);
    });

    it(`${themeName}: every resolved role stays inside sRGB`, () => {
      const clipped = [...scope.entries()]
        .filter(([, value]) => !inSrgbGamut(value))
        .map(([name]) => name);
      expect(clipped).toEqual([]);
    });

    it(`${themeName}: -deep roles read as text on their own background`, () => {
      for (const role of ["accent", "destructive", "success", "warning", "info"]) {
        const deep = scope.get(`--${role}-deep`);
        const background = scope.get("--background") as string;
        expect(deep, `--${role}-deep missing in ${themeName}`).toBeDefined();
        expect(
          contrastRatio(deep as string, background),
          `--${role}-deep on --background in ${themeName}`,
        ).toBeGreaterThanOrEqual(AA);
      }
    });
  }
});

describe("theme.css — accent families swap without changing weight", () => {
  const FAMILIES = ["cyan", "blue", "green", "rust", "ink"];

  it.each(FAMILIES)("data-accent=%s pairs its fill with a readable foreground", (family) => {
    const scope = scopeFor(blocks, new RegExp(`^\\[data-accent="${family}"\\]$`));
    const base = scopeFor(blocks, LIGHT);
    const merged = new Map([...base, ...scope]);

    const accent = resolveColour("var(--accent)", merged) as string;
    const foreground = resolveColour("var(--accent-foreground)", merged) as string;
    const ring = resolveColour("var(--ring)", merged) as string;
    const background = resolveColour("var(--background)", merged) as string;

    expect(
      contrastRatio(accent, foreground),
      `${family} fill vs its foreground`,
    ).toBeGreaterThanOrEqual(AA);
    expect(contrastRatio(ring, background), `${family} ring vs paper`).toBeGreaterThanOrEqual(3);
  });

  it("restates the dark-mode flip at a specificity that actually wins", () => {
    // The accent rules sit after the .dark block with equal specificity, so
    // without this restatement a dark page with a non-default accent silently
    // gets the paper-tuned rung. Assert the override exists and is more specific.
    const restated = blocks.filter((b) => /^\.dark \[data-accent\]/.test(b.selector));
    expect(restated.length).toBeGreaterThan(0);
    expect(restated[0]?.declarations.get("--accent-deep")).toBe("var(--accent)");
  });
});

/** Whitespace-insensitive comparison, so formatting is not a false failure. */
function normalise(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}
