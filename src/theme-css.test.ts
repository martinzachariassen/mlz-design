/**
 * Drift gate: `theme.css` is the source of truth, and this asserts that nothing
 * else disagrees with it.
 *
 * `tokens.contrast.test.ts` proves the ladder's promises hold. It cannot prove
 * they hold for what actually ships, because it reads `tokens.ts` — a
 * hand-maintained mirror. Change a value in `theme.css` alone and that test
 * still passes while the two files quietly disagree. So this file reads the CSS
 * and checks four things:
 *
 *   1. every chromatic primitive in `theme.css` has an identical mirror entry;
 *   2. no chromatic primitive exists that the mirror has never heard of (the
 *      case a value-by-value comparison misses — a token added to CSS only);
 *   3. the resolved semantic roles, in both themes and every accent family,
 *      meet the same contrast contract the ladder promises;
 *   4. no doc or story quotes a token value the palette no longer ships —
 *      prose is a mirror too, and drifts the same way.
 */

import { readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { contrastRatio, inSrgbGamut, toHex } from "./lib/contrast";
import { parseTheme, readFromRepo, resolveColour, resolvedScope, scopeFor } from "./theme-css";
import {
  accentFill,
  accents,
  colors,
  fonts,
  motion,
  onDark,
  signalFill,
  signals,
  signalsDeep,
} from "./tokens";

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");

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
      // The bug this whole ladder came from: --ring was a fill value, which
      // measured 1.82:1 against paper before the rungs existed.
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

  it.each(FAMILIES)("data-accent=%s takes the foreground its fill mode dictates", (family) => {
    // Ties `accentFill` in the mirror to the CSS. Contrast alone would catch a
    // wrong pairing, but only as a number — this says which of the two rules
    // was broken, and stops `accentFill` becoming decorative metadata that
    // nothing checks.
    const merged = scopeFor(blocks, LIGHT, new RegExp(`^\\[data-accent="${family}"\\]$`));
    const foreground = resolveColour("var(--accent-foreground)", merged);
    const mode = accentFill[family as keyof typeof accentFill];
    expect(foreground).toBe(mode === "tint" ? colors.ink : colors.paper);
  });

  it.each(Object.entries(signalFill))("--%s-foreground follows its %s fill mode", (role, mode) => {
    const name = role === "danger" ? "destructive" : role;
    expect(light.get(`--${name}-foreground`)).toBe(mode === "tint" ? colors.ink : colors.paper);
  });

  it.each(FAMILIES)("data-accent=%s stays legible in dark mode", (family) => {
    // `<html class="dark" data-accent="rust">` — the combination that was
    // broken: the accent rules sit after the `.dark` block at equal
    // specificity, so without the restatement below a dark page silently got
    // the paper-tuned rung. Build the scope the way the cascade does, then
    // measure, rather than trusting that the override exists.
    const merged = scopeFor(
      blocks,
      LIGHT,
      DARK,
      new RegExp(`^\\[data-accent="${family}"\\]$`),
      /^\.dark \[data-accent\](,|$)/,
      new RegExp(`^\\.dark \\[data-accent="${family}"\\](,|$)`),
    );

    const accent = resolveColour("var(--accent)", merged) as string;
    const foreground = resolveColour("var(--accent-foreground)", merged) as string;
    const deep = resolveColour("var(--accent-deep)", merged) as string;
    const ring = resolveColour("var(--ring)", merged) as string;
    const background = resolveColour("var(--background)", merged) as string;

    expect(
      contrastRatio(accent, foreground),
      `${family} fill vs foreground`,
    ).toBeGreaterThanOrEqual(AA);
    expect(contrastRatio(deep, background), `${family} deep as text on ink`).toBeGreaterThanOrEqual(
      AA,
    );
    expect(contrastRatio(ring, background), `${family} ring on ink`).toBeGreaterThanOrEqual(3);
  });

  it("restates the dark-mode flip at a specificity that actually wins", () => {
    const restated = blocks.filter((b) => /^\.dark \[data-accent\]/.test(b.selector));
    expect(restated.length).toBeGreaterThan(0);
    expect(restated[0]?.declarations.get("--accent-deep")).toBe("var(--accent)");
  });
});

describe("documentation quotes real token values", () => {
  /**
   * Prose that quotes a token value is a mirror too, and drifts the same way —
   * three files were still advertising pre-ladder values when this was written.
   * Every `oklch()` literal in the docs below must therefore be a value the
   * palette actually ships.
   */
  // Globbed, not hand-listed: a new doc that quotes a colour must not be born
  // outside the gate. CHANGELOG.md is excluded on purpose — history is allowed
  // to quote values the palette no longer ships.
  const DOCS = [
    "README.md",
    "CLAUDE.md",
    ...readdirSync(join(REPO, "docs"))
      .filter((f) => f.endsWith(".md"))
      .map((f) => `docs/${f}`),
    ...readdirSync(join(REPO, "src", "foundations"))
      .filter((f) => f.endsWith(".mdx") || f.endsWith(".stories.tsx"))
      .map((f) => `src/foundations/${f}`),
  ];

  /**
   * Literals that are deliberately *not* MLZ tokens. The override examples show
   * a consuming app picking its own house accent, and would be pointless if they
   * used ours; the dead-zone swatches in ColourModel are the counter-example the
   * page exists to draw — values no fill may ever take, so they must stay
   * un-shipped for that section to keep meaning what it says.
   */
  const ILLUSTRATIVE = new Set([
    "oklch(0.70 0.15 300)",
    "oklch(0.45 0.14 300)",
    "oklch(0.62 0.14 250)",
    "oklch(0.62 0.14 148)",
    "oklch(0.62 0.14 45)",
  ]);

  const shipped = new Set(
    [
      ...Object.values(signals),
      ...Object.values(signalsDeep),
      ...Object.values(onDark),
      ...Object.values(accents).flatMap((a) => [a.base, a.deep]),
      ...[...light.values(), ...dark.values()],
    ].map(normalise),
  );

  it.each(DOCS)("%s quotes no stale token value", (file) => {
    const literals = [...readFromRepo(file).matchAll(/oklch\(\s*[\d.]+[^)]*\)/g)].map((m) =>
      normalise(m[0]),
    );
    const stale = literals.filter((value) => !ILLUSTRATIVE.has(value) && !shipped.has(value));
    expect(stale).toEqual([]);
  });
});

describe("non-colour primitives mirror tokens.ts", () => {
  /**
   * The colour mirror above cannot see these — `NON_COLOUR` exempts fonts,
   * easings and durations from the value-for-value check, which left the exact
   * failure mode this file exists to prevent open for a different token class:
   * edit `--mlz-ease-out` alone and `motion.easeGlide` silently disagrees.
   */
  const NON_COLOUR_MIRROR: Record<string, string> = {
    "--mlz-font-hand": fonts.hand,
    "--mlz-font-mono": fonts.mono,
    "--mlz-font-grotesk": fonts.grotesk,
    "--mlz-font-serif": fonts.serif,
    "--mlz-ease-out": motion.easeOut,
    "--mlz-ease-in-out": motion.easeInOut,
    "--mlz-ease-glide": motion.easeGlide,
    "--mlz-dur-fast": motion.durationFast,
    "--mlz-dur-hover": motion.durationHover,
    "--mlz-dur-base": motion.durationBase,
    "--mlz-dur-slow": motion.durationSlow,
  };

  it.each(Object.entries(NON_COLOUR_MIRROR))("%s matches the JS mirror", (name, mirrored) => {
    const declared = primitives.get(name);
    expect(declared, `${name} is missing from theme.css`).toBeDefined();
    expect(normaliseNumeric(declared as string)).toBe(normaliseNumeric(mirrored));
  });

  it("mirrors every declared font/ease/dur primitive — no unmirrored stragglers", () => {
    for (const name of primitives.keys()) {
      if (NON_COLOUR.test(name)) {
        expect(
          NON_COLOUR_MIRROR[name],
          `${name} is declared in theme.css but missing from the non-colour mirror table (and likely from tokens.ts)`,
        ).toBeDefined();
      }
    }
  });
});

describe("accent families stay in sync", () => {
  /**
   * `data-accent` blocks are five hand-maintained restatements of the same
   * shape. A family missing one role falls back to cyan for that role only — a
   * mixed-family theme nothing would flag visually until someone switches
   * accent and squints.
   */
  const families = ["cyan", "blue", "green", "rust", "ink"];

  const keysFor = (family: string): string[] => {
    const keys = new Set<string>();
    for (const block of blocks) {
      if (block.selector.includes(`[data-accent="${family}"]`)) {
        for (const key of block.declarations.keys()) keys.add(key);
      }
    }
    return [...keys].sort();
  };

  const reference = keysFor("cyan");

  it("parses the cyan family as the reference shape", () => {
    expect(reference.length).toBeGreaterThan(3);
  });

  it.each(families.slice(1))("%s declares exactly the same roles as cyan", (family) => {
    expect(keysFor(family)).toEqual(reference);
  });
});

/** Whitespace-insensitive comparison, so formatting is not a false failure. */
function normalise(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

/**
 * Additionally tolerates `.15s` vs `0.15s` — the CSS drops the leading zero,
 * the JS mirror keeps it, and both are the same value.
 */
function normaliseNumeric(value: string): string {
  return normalise(value).replace(/(^|[\s(,])\./g, "$10.");
}
