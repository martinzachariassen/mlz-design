/**
 * Tree-shaking gate.
 *
 * The whole library lives in one entry file, so a consuming app only ships the
 * components it imports if every top-level declaration in that file is free of
 * side effects. Two constructs quietly break that, and both are easy to
 * reintroduce without noticing — nothing about the source looks wrong, the
 * package still builds, and the damage only shows up as a consumer's bundle
 * size:
 *
 *   1. `Component.displayName = "…"` as a statement. A property write on a
 *      module-level binding is an unconditional side effect: the bundler must
 *      keep the assignment, which keeps the component, which keeps everything
 *      it imports. Use `named()` instead — see src/lib/named.ts.
 *
 *   2. A top-level `const X = someCall(…)` without a `/* @__PURE__ *␘/`
 *      annotation. Both the outer and any nested call need one: dropping an
 *      annotated call still preserves its arguments' side effects, so
 *      `named(React.forwardRef(…), "X")` has to annotate *both* or the
 *      forwardRef call — and its imports — survive on its own.
 *
 * Before this was fixed, importing nothing but `cn` pulled in 413 kB: every
 * component, all of Radix, `sonner` and `cmdk`. It is now 59 kB.
 */

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = readFileSync(join(repoRoot, "dist/index.js"), "utf8");

/** Lines at column 0 are top level; anything indented is inside a function. */
const topLevel = dist.split("\n").filter((l) => l && !/^[\s})\]]/.test(l));

describe("the published entry has no top-level side effects", () => {
  it("assigns no displayName as a bare statement", () => {
    const writes = topLevel.filter((l) => /^[A-Za-z_$][\w$]*\.displayName\s*=/.test(l));
    expect(writes).toEqual([]);
  });

  it("annotates every top-level call as pure", () => {
    const unannotated = topLevel.filter(
      (l) =>
        /^var [A-Za-z_$][\w$]* = [A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*)?\(/.test(l) &&
        !l.includes("@__PURE__"),
    );
    expect(unannotated).toEqual([]);
  });

  it("contains no bare expression statements", () => {
    // The `"use client"` directive is exempt: it's a directive prologue, not an
    // expression — bundlers treat it as metadata and it cannot pin anything.
    const bare = topLevel.filter(
      (l) => !/^(import|export|var |const |let |function |class |\/\/|\/\*|\*|"use \w+";$)/.test(l),
    );
    expect(bare).toEqual([]);
  });
});

describe("dependencies that are not side-effect-free stay out of the root entry", () => {
  // sonner injects its stylesheet with document.createElement("style") at module
  // scope and ships no `sideEffects: false`, so nothing can shake it out. It
  // lives behind the ./toaster subpath; importing it here would put that
  // injection — and a CSP violation, for apps with a strict style-src — into
  // every consuming app whether or not it renders a toast.
  it("does not import sonner", () => {
    expect(dist).not.toContain("sonner");
  });

  it("keeps sonner reachable from the ./toaster entry", () => {
    const toaster = readFileSync(join(repoRoot, "dist/toaster.js"), "utf8");
    expect(toaster).toContain("sonner");
  });
});
