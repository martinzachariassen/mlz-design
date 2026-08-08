/**
 * A small reader for `styles/theme.css`, so tests can assert against the actual
 * source of truth instead of a transcription of it.
 *
 * This exists because the obvious setup does not catch drift. A test that reads
 * `tokens.ts` only proves the mirror is internally consistent: edit a value in
 * `theme.css` and forget the mirror, and every such test still passes while the
 * two files disagree. Reading the CSS closes that — the mirror is checked
 * *against* it, and the contrast contracts run on the values that actually ship.
 *
 * Test-only, and not exported from the package: nothing in `src/index.ts`
 * imports it, so `tsup` never bundles it.
 *
 * The stylesheet is read with `node:fs`, not Vite's `?raw`. That is not a
 * preference: `css: false` in the Vitest config stubs anything resolving to a
 * `.css` id — query string included — so a raw import arrives as an empty
 * string and every assertion below would pass vacuously. Reading from disk
 * sidesteps the test pipeline entirely, which is what we want from a gate whose
 * whole job is to check the file that actually ships.
 */

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { mixColours } from "./lib/contrast";

const SRC = dirname(fileURLToPath(import.meta.url));
const THEME_PATH = join(SRC, "styles", "theme.css");

/** Reads a file relative to the repo root, for the docs-drift check. */
export const readFromRepo = (...segments: string[]) =>
  readFileSync(join(SRC, "..", ...segments), "utf8");

export type Block = { selector: string; declarations: Map<string, string> };

/**
 * Every custom property declared before `@theme inline`, grouped by the selector
 * that declares it.
 *
 * The cut-off is deliberate: `@theme` blocks nest `@keyframes` inside them, and
 * a flat brace-matching parse would mis-associate everything after the first
 * nested block. Every semantic and primitive declaration lives above that line —
 * `@theme inline` only re-exports what is already parsed here — so nothing is
 * lost, and `parseTheme` throws if that assumption ever stops holding.
 */
export function parseTheme(css = readFileSync(THEME_PATH, "utf8")): Block[] {
  // Comments go first, deliberately: the file's own header comment *describes*
  // the `@theme inline` layer, so searching the raw text finds the prose rather
  // than the at-rule and truncates almost the whole file.
  const stripped = css.replace(/\/\*[\s\S]*?\*\//g, "");
  const marker = stripped.indexOf("@theme inline");
  if (marker === -1) {
    throw new Error("theme.css no longer contains `@theme inline` — update the parser's cut-off");
  }

  const head = stripped.slice(0, marker);
  const blocks: Block[] = [];

  for (const block of head.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const selector = block[1];
    const body = block[2];
    if (!selector || !body) continue;

    const declarations = new Map<string, string>();
    for (const declaration of body.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) {
      const name = declaration[1];
      const value = declaration[2];
      if (name && value) declarations.set(name, value.trim());
    }

    if (declarations.size > 0) {
      blocks.push({ selector: selector.trim().replace(/\s+/g, " "), declarations });
    }
  }

  return blocks;
}

/**
 * The declarations in effect for an element matching the given selectors, later
 * blocks winning — i.e. what a component actually sees.
 *
 * Pass the selectors in cascade order. Dark mode must be layered on top of the
 * light scope rather than read alone: `.dark` overrides only the roles that
 * change, and inherits the rest from `:root`. Reading it in isolation makes
 * every inherited role look absent — and any check over it silently vacuous.
 */
export function scopeFor(blocks: Block[], ...selectors: RegExp[]): Map<string, string> {
  const scope = new Map<string, string>();
  for (const selector of selectors) {
    for (const block of blocks) {
      if (!selector.test(block.selector)) continue;
      for (const [name, value] of block.declarations) scope.set(name, value);
    }
  }
  return scope;
}

const VAR = /^var\(\s*(--[\w-]+)\s*\)$/;
const MIX = /^color-mix\(\s*in\s+(\w+)\s*,\s*(.+?)\s+([\d.]+)%\s*,\s*(.+?)\s*\)$/;

/**
 * Follows `var()` and evaluates `color-mix()` until a literal colour falls out.
 *
 * Returns `null` for anything that is not a resolvable colour — a value mixing
 * with `transparent`, a font stack, an easing curve. Callers skip those
 * deliberately rather than the resolver guessing.
 */
export function resolveColour(value: string, scope: Map<string, string>, depth = 0): string | null {
  if (depth > 10) throw new Error(`var() cycle while resolving: ${value}`);

  const trimmed = value.trim();

  const reference = VAR.exec(trimmed);
  if (reference) {
    const target = scope.get(reference[1] as string);
    return target ? resolveColour(target, scope, depth + 1) : null;
  }

  const mix = MIX.exec(trimmed);
  if (mix) {
    const [, space, a, percent, b] = mix as unknown as [string, string, string, string, string];
    // Alpha compositing is out of scope — `--overlay` is a scrim, not a surface
    // anything is measured against.
    if (/transparent|none/.test(b)) return null;
    const left = resolveColour(a, scope, depth + 1);
    const right = resolveColour(b, scope, depth + 1);
    if (!left || !right) return null;
    return mixColours(space, left, Number(percent), right);
  }

  if (/^oklch\(/.test(trimmed) || /^#[0-9a-fA-F]{6}$/.test(trimmed)) return trimmed;
  return null;
}

/** Convenience: the fully-resolved colour roles for one theme. */
export function resolvedScope(blocks: Block[], ...selectors: RegExp[]): Map<string, string> {
  const raw = scopeFor(blocks, ...selectors);
  const resolved = new Map<string, string>();
  for (const [name] of raw) {
    const colour = resolveColour(`var(${name})`, raw);
    if (colour) resolved.set(name, colour);
  }
  return resolved;
}
