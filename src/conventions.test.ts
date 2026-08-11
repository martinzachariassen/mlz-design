/**
 * The "definition of done" rules from CLAUDE.md, run instead of remembered.
 *
 * Every rule here was prose first, and each had already failed silently at
 * least once before this file existed: components shipped without a docs page,
 * story titles missing from `storySort` sorted arbitrarily, an icon-library
 * import was one `npx shadcn add` away, and interaction contracts (focus rings)
 * regressed exactly where nothing asserted them. Same technique as
 * `colour-usage.test.ts`: scan the source, fail with the file and line.
 */

import { existsSync, readdirSync, readFileSync } from "node:fs";
import { basename, dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const SRC = dirname(fileURLToPath(import.meta.url));
const ROOT = join(SRC, "..");

function walk(dir: string, keep: (name: string) => boolean): string[] {
  return readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) => {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) return walk(full, keep);
      return keep(entry.name) ? [full] : [];
    })
    .sort();
}

const componentFiles = walk(
  join(SRC, "components"),
  (n) => n.endsWith(".tsx") && !n.includes(".stories.") && !n.includes(".test."),
);

const storyFiles = walk(SRC, (n) => n.endsWith(".stories.tsx"));

/** Internal component files that deliberately have no docs page of their own. */
const NO_STORY_ALLOWED: Record<string, string> = {
  "components/overlay/modal-root.tsx":
    "Internal engine behind Dialog/Sheet/AlertDialog — never exported, documented through them.",
  "components/overlay/modal-test-env.ts": "Test-only helper.",
};

describe("every component has a docs page", () => {
  it("scans a plausible number of component files", () => {
    expect(componentFiles.length).toBeGreaterThan(50);
  });

  it.each(componentFiles.map((f) => [relative(SRC, f), f] as const))(
    "%s has a colocated *.stories.tsx (or a recorded reason not to)",
    (rel, absolute) => {
      if (NO_STORY_ALLOWED[rel]) return;
      const stories = absolute.replace(/\.tsx$/, ".stories.tsx");
      const shared =
        // `code.tsx` documents its two exports through two story files.
        basename(absolute) === "code.tsx" &&
        existsSync(absolute.replace(/code\.tsx$/, "code-block.stories.tsx"));
      expect(
        existsSync(stories) || shared,
        `${rel} is shipped but has no stories file — an unstoried component is invisible in the docs and unaudited by axe.`,
      ).toBe(true);
    },
  );
});

describe("story metas follow the autodocs contract", () => {
  it.each(storyFiles.map((f) => [relative(SRC, f), f] as const))(
    "%s sets tags explicitly, and !autodocs when there is no component",
    (_rel, absolute) => {
      const source = readFileSync(absolute, "utf8");
      expect(source, "meta must set `tags` explicitly — never rely on the global").toMatch(
        /tags:\s*\[/,
      );
      const hasComponent = /^\s*component:\s*\w/m.test(source);
      if (!hasComponent) {
        expect(
          source.includes("!autodocs"),
          "a meta without `component` must opt out with !autodocs or it adds an empty docs page",
        ).toBe(true);
      }
    },
  );

  it("reserves docs.description.component for the allowlisted multi-component metas", () => {
    const ALLOWED = new Set(["components/layout/layout.stories.tsx"]);
    for (const file of storyFiles) {
      const rel = relative(SRC, file);
      const source = readFileSync(file, "utf8");
      const usesOverride = /description:\s*\{[^}]*component:/s.test(source);
      if (usesOverride) {
        expect(
          ALLOWED.has(rel),
          `${rel} sets parameters.docs.description.component, which silently REPLACES the component's JSDoc — use a story-level description instead`,
        ).toBe(true);
      }
    }
  });
});

describe("story titles are sorted deliberately", () => {
  it("every story title appears as a leaf in preview.tsx's storySort", () => {
    const preview = readFileSync(join(ROOT, ".storybook/preview.tsx"), "utf8");
    const missing: string[] = [];
    for (const file of storyFiles) {
      const title = readFileSync(file, "utf8").match(/title:\s*"([^"]+)"/)?.[1];
      if (!title) continue;
      const leaf = title.split("/").at(-1) as string;
      if (!preview.includes(`"${leaf}"`)) missing.push(`${relative(SRC, file)} → ${title}`);
    }
    expect(
      missing,
      `Unlisted titles sort in file-discovery order — add the leaf to storySort:\n${missing.join("\n")}`,
    ).toEqual([]);
  });
});

describe("dependency rules", () => {
  const sources = walk(SRC, (n) => /\.tsx?$/.test(n) && !n.includes(".test."));

  it("no icon library sneaks in", () => {
    for (const file of sources) {
      expect(
        readFileSync(file, "utf8").includes('from "lucide-react"'),
        `${relative(SRC, file)} imports lucide-react — the system deliberately ships no icon library (CLAUDE.md); inline the glyph or use src/lib/icons.tsx`,
      ).toBe(false);
    }
  });

  it("every @radix-ui import is a declared dependency", () => {
    const pkg = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8")) as {
      dependencies: Record<string, string>;
    };
    const missing = new Set<string>();
    for (const file of sources) {
      if (file.includes(".stories.") || file.includes(".test.")) continue;
      for (const match of readFileSync(file, "utf8").matchAll(/from "(@radix-ui\/[\w-]+)"/g)) {
        const name = match[1] as string;
        if (!pkg.dependencies[name]) missing.add(name);
      }
    }
    expect(
      [...missing],
      "Radix packages must be declared granular dependencies — this ships as a library, so an undeclared one breaks the consumer's install (architecture.md: it has bitten once).",
    ).toEqual([]);
  });
});

describe("interaction contracts", () => {
  const sources = walk(SRC, (n) => /\.tsx?$/.test(n) && !n.includes(".test."));

  it("focus-visible:outline-none never ships without its ring in the same class string", () => {
    const offences: string[] = [];
    for (const file of sources) {
      const lines = readFileSync(file, "utf8").split("\n");
      lines.forEach((line, i) => {
        // The replacement may sit behind a further variant (focus-visible:after:ring-…)
        // when the painted surface is a pseudo-element, as in a stretched card link.
        if (
          line.includes("focus-visible:outline-none") &&
          !/focus-visible:[^"'\s]*ring-/.test(line)
        ) {
          offences.push(`  ${relative(SRC, file)}:${i + 1}`);
        }
      });
    }
    expect(
      offences,
      `Suppressing the global outline needs the ring replacement in the same string, or keyboard focus goes invisible (CLAUDE.md, interaction contracts):\n${offences.join("\n")}`,
    ).toEqual([]);
  });
});
