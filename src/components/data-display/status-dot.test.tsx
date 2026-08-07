import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StatusDot } from "./status-dot";

describe("StatusDot", () => {
  it("is decorative (aria-hidden) by default", () => {
    const { container } = render(<StatusDot variant="success" />);
    const dot = container.querySelector('[data-slot="status-dot"]');
    expect(dot).toHaveAttribute("aria-hidden", "true");
  });

  it("exposes a label to assistive tech when provided", () => {
    render(<StatusDot variant="destructive" label="offline" />);
    expect(screen.getByRole("img", { name: "offline" })).toBeInTheDocument();
  });

  it("applies the variant colour class", () => {
    const { container } = render(<StatusDot variant="warning" />);
    expect(container.querySelector('[data-slot="status-dot"]')?.className).toContain(
      "text-warning",
    );
  });

  it("renders a pulsing ring when pulse is set", () => {
    const { container } = render(<StatusDot variant="accent" pulse />);
    expect(container.querySelector(".animate-ping")).toBeInTheDocument();
  });
});
