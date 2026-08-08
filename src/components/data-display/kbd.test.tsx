import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Kbd } from "./kbd";

describe("Kbd", () => {
  // The element is the whole point: <kbd> and <code> mean different things, and
  // assistive tech can tell them apart.
  it("renders a real <kbd>", () => {
    render(<Kbd>K</Kbd>);
    expect(screen.getByText("K").tagName).toBe("KBD");
  });

  // A single-character key would otherwise be a few pixels wide next to its
  // neighbour, so the chip has a floor.
  it("keeps a minimum width so single keys stay chip-shaped", () => {
    render(<Kbd>K</Kbd>);
    expect(screen.getByText("K").className).toContain("min-w-6");
  });

  it("takes extra classes", () => {
    render(<Kbd className="uppercase">esc</Kbd>);
    expect(screen.getByText("esc").className).toContain("uppercase");
  });
});
