/**
 * The ladder, enforced against *usage* rather than against the tokens.
 *
 * `tokens.contrast.test.ts` and `theme-css.test.ts` both prove the palette is
 * sound: every `-deep` rung clears 4.5:1, no fill sits in the dead zone. Neither
 * one can tell you whether a component actually *reached* for the right rung —
 * they read tokens, not JSX. So a component could paint `text-accent` (1.83:1 on
 * paper) and the whole suite would stay green, which is exactly what happened to
 * four `BrandMark` glyphs and a Typography label before this file existed.
 *
 * The rule being enforced is the one in CLAUDE.md: a chromatic **fill** token is
 * for backgrounds only. In a text, icon, ring or underline position you use the
 * `-deep` rung, which is anchored to 4.5:1 on the darkest paper tone and maps
 * back to the fill in dark mode — so it is correct in both themes.
 *
 * Neutral roles (`primary`, `foreground`, `muted-foreground`) are deliberately
 * not covered: they are ink/paper values around 14:1, not rungs on the
 * chromatic ladder.
 */

import { readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const SRC = dirname(fileURLToPath(import.meta.url));

/** The chromatic fills. Each has a `-deep` sibling that belongs in ink positions. */
const FILLS = ["accent", "success", "warning", "info", "destructive"].join("|");

/**
 * Properties that paint ink rather than a surface. `bg-*` and `border-*` are
 * absent on purpose — a fill is exactly what those want.
 */
const INK_PROPERTIES = ["text", "ring", "decoration", "fill", "stroke", "caret", "outline"].join(
  "|",
);

/**
 * Matches `text-accent`, `hover:text-success`, `data-[state=open]:ring-info` …
 * but not `text-accent-deep`, `text-accent-foreground` or `bg-accent`.
 *
 * Alpha-modified utilities (`ring-destructive/30`) are excluded: those are the
 * soft focus halo, always drawn behind a solid `border-*` that carries the 3:1
 * affordance on its own.
 */
const VIOLATION = new RegExp(
  String.raw`(?<![-\w])(?:[\w[\]=&|<>.-]+:)*(?:${INK_PROPERTIES})-(?:${FILLS})(?![-\w/])`,
  "g",
);

/**
 * Lines that name a fill in an ink position and are still correct, because the
 * surface underneath them is dark. Keyed by file, with the reason — an entry
 * here is a claim that someone checked the number, not a mute button.
 */
const ALLOWED: Record<string, string> = {
  "foundations/ColourUsage.stories.tsx":
    "Inside <ThemePanel theme='dark'>, where base accent is 8.26:1 — the page is " +
    "demonstrating that `accent` and `accent-deep` are the same value on ink.",
};

/** Every source and story file — stories included, since the docs teach by example. */
function walk(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) => {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) return walk(full);
      return /\.tsx?$/.test(entry.name) && !entry.name.includes(".test.") ? [full] : [];
    })
    .sort();
}

const files = walk(SRC);

describe("colour ladder — components reach for the -deep rung, not the fill", () => {
  it("scans a plausible number of files", () => {
    // Guards the glob: a broken pattern would make every assertion below vacuous.
    expect(files.length).toBeGreaterThan(80);
  });

  it.each(files.map((f) => [relative(SRC, f), f] as const))(
    "%s uses no fill token as text, icon, ring or underline",
    (rel, absolute) => {
      const offences = readFileSync(absolute, "utf8")
        .split("\n")
        .flatMap((line, i) => {
          const hits = line.match(VIOLATION);
          return hits ? [`  ${rel}:${i + 1}  ${hits.join(", ")}`] : [];
        });

      if (ALLOWED[rel] && offences.length > 0) return;

      expect(
        offences,
        offences.length
          ? `Fill token used in an ink position — swap it for the '-deep' rung ` +
              `(a fill is 1.8–2.0:1 on paper, well under the 4.5:1 body-text bar):\n${offences.join("\n")}`
          : "",
      ).toEqual([]);
    },
  );

  it("keeps the allowlist honest — every entry still has a violation to excuse", () => {
    for (const rel of Object.keys(ALLOWED)) {
      const source = readFileSync(join(SRC, rel), "utf8");
      expect(source.match(VIOLATION), `${rel} is allowlisted but no longer needs to be`).not.toBe(
        null,
      );
    }
  });
});
