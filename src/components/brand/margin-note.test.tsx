import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MarginNote } from "./margin-note";

describe("MarginNote", () => {
  it("renders an <aside> in the hand by default", () => {
    const { container } = render(<MarginNote>a pencilled remark</MarginNote>);
    const note = container.querySelector('[data-slot="margin-note"]');
    expect(note?.tagName).toBe("ASIDE");
    expect(note?.className).toContain("font-hand");
    expect(screen.getByText("a pencilled remark")).toBeInTheDocument();
  });

  it("draws no arrow by default", () => {
    const { container } = render(<MarginNote>x</MarginNote>);
    expect(container.querySelector("svg")).not.toBeInTheDocument();
  });

  it("hides the arrow from assistive tech — the sentence carries the message", () => {
    const { container } = render(<MarginNote arrow="up-left">x</MarginNote>);
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });

  it("mirrors the stroke rather than redrawing it", () => {
    const { container: left } = render(<MarginNote arrow="up-left">x</MarginNote>);
    const { container: right } = render(<MarginNote arrow="up-right">x</MarginNote>);
    const { container: down } = render(<MarginNote arrow="down-left">x</MarginNote>);

    expect(left.querySelector("svg")?.className.baseVal).not.toContain("-scale-x-100");
    expect(right.querySelector("svg")?.className.baseVal).toContain("-scale-x-100");
    expect(down.querySelector("svg")?.className.baseVal).toContain("-scale-y-100");
  });

  it("puts a downward arrow after the text and an upward one before it", () => {
    const { container: up } = render(<MarginNote arrow="up-left">x</MarginNote>);
    const { container: down } = render(<MarginNote arrow="down-left">x</MarginNote>);

    expect(up.querySelector('[data-slot="margin-note"]')?.firstElementChild?.tagName).toBe("svg");
    expect(down.querySelector('[data-slot="margin-note"]')?.lastElementChild?.tagName).toBe("svg");
  });

  it("renders a different element with `as`", () => {
    const { container } = render(<MarginNote as="figcaption">x</MarginNote>);
    expect(container.querySelector('[data-slot="margin-note"]')?.tagName).toBe("FIGCAPTION");
  });
});
