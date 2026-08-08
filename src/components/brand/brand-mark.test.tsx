import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BrandLockup, BrandMark, BrandWordmark } from "./brand-mark";

describe("BrandMark", () => {
  // It is the logo, not decoration — it has to arrive named.
  it("is an image named MLZ", () => {
    render(<BrandMark />);
    expect(screen.getByRole("img", { name: "MLZ" })).toBeInTheDocument();
  });

  it("draws the tile behind the letter by default", () => {
    const { container } = render(<BrandMark />);
    expect(container.querySelector("rect")).toBeInTheDocument();
    expect(container.querySelector("polygon")).toBeInTheDocument();
  });

  it("drops the tile in glyph mode", () => {
    const { container } = render(<BrandMark variant="glyph" />);
    expect(container.querySelector("rect")).not.toBeInTheDocument();
    expect(container.querySelector("polygon")).toBeInTheDocument();
  });

  it("takes a size", () => {
    render(<BrandMark size={48} />);
    const svg = screen.getByRole("img", { name: "MLZ" });
    expect(svg).toHaveAttribute("width", "48");
    expect(svg).toHaveAttribute("height", "48");
  });

  // The default colours are semantic tokens, which is what makes the mark
  // invert with the theme for free. Fixed colours are opt-in, for static assets.
  it("defaults to theme-following colours and accepts fixed ones", () => {
    const { container, rerender } = render(<BrandMark />);
    expect(container.querySelector("rect")).toHaveAttribute("fill", "var(--foreground)");

    rerender(<BrandMark tile="#1a1a18" glyph="#ecebe4" />);
    expect(container.querySelector("rect")).toHaveAttribute("fill", "#1a1a18");
    expect(container.querySelector("polygon")).toHaveAttribute("fill", "#ecebe4");
  });
});

describe("BrandWordmark", () => {
  it("renders the wordmark text", () => {
    render(<BrandWordmark />);
    expect(screen.getByText(/mlz/i)).toBeInTheDocument();
  });
});

describe("BrandLockup", () => {
  it("pairs the mark with the wordmark", () => {
    render(<BrandLockup />);
    expect(screen.getByRole("img", { name: "MLZ" })).toBeInTheDocument();
    expect(screen.getByText(/mlz/i)).toBeInTheDocument();
  });

  it("stacks when asked", () => {
    const { container } = render(<BrandLockup orientation="stacked" />);
    expect(container.firstElementChild?.className).toContain("flex-col");
  });
});
