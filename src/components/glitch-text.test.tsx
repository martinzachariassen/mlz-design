import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { GlitchText } from "./glitch-text";

describe("GlitchText", () => {
  it("exposes the full text to assistive tech", () => {
    render(<GlitchText text="mlz.no" />);
    expect(screen.getByText("mlz.no")).toBeInTheDocument();
  });

  it("splits into per-character spans hidden from screen readers", () => {
    const { container } = render(<GlitchText text="ab" trigger="hover" />);
    const chars = container.querySelectorAll("[data-glitch-char]");
    expect(chars).toHaveLength(2);
    // The decorative layer is aria-hidden; the sr-only copy carries the text.
    const hidden = container.querySelector("[aria-hidden='true']");
    expect(hidden).toContainElement(chars[0] as HTMLElement);
  });

  it("keeps a custom className on the wrapper", () => {
    const { container } = render(<GlitchText text="x" className="font-hand" />);
    expect(container.firstChild).toHaveClass("font-hand");
  });
});
