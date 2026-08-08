import { describe, expect, it } from "vitest";
import { accents, colors, fonts, signals, signalsDeep, tokens } from "./tokens";

describe("tokens", () => {
  it("exposes the five accent families, each with base + deep", () => {
    for (const name of ["cyan", "blue", "green", "rust", "ink"] as const) {
      expect(accents[name].base).toMatch(/^oklch\(/);
      expect(accents[name].deep).toMatch(/^oklch\(/);
    }
  });

  it("keeps the paper/ink neutrals as their exact source hex", () => {
    expect(colors.paper).toBe("#ecebe4");
    expect(colors.ink).toBe("#1a1a18");
  });

  it("carries the four signal colours", () => {
    expect(Object.keys(signals)).toEqual(["danger", "success", "warning", "info"]);
  });

  it("carries a text-safe deep partner for every signal", () => {
    expect(Object.keys(signalsDeep)).toEqual(Object.keys(signals));
    for (const value of Object.values(signalsDeep)) expect(value).toMatch(/^oklch\(/);
  });

  it("names the four typeface roles", () => {
    expect(fonts.hand).toContain("Architects Daughter");
    expect(fonts.mono).toContain("Space Mono");
  });

  it("bundles everything under the tokens barrel", () => {
    expect(tokens.colors).toBe(colors);
    expect(tokens.accents).toBe(accents);
    expect(tokens.signals).toBe(signals);
    expect(tokens.signalsDeep).toBe(signalsDeep);
  });
});
