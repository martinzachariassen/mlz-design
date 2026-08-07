import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Icon } from "./icon";

describe("Icon", () => {
  it("renders an inline svg for a house icon name", () => {
    const { container } = render(<Icon name="check" />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg?.className.baseVal).toContain("inline-block");
  });

  it("is decorative (hidden from AT) by default", () => {
    const { container } = render(<Icon name="star" />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("aria-hidden", "true");
    // Iconify stamps role="img" on every svg; aria-hidden is what removes a
    // decorative icon from the accessibility tree.
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("exposes itself as a labelled image when given a label", () => {
    render(<Icon name="trash-2" label="Delete" />);
    const svg = screen.getByRole("img", { name: "Delete" });
    expect(svg).toBeInTheDocument();
    expect(svg).not.toHaveAttribute("aria-hidden");
  });

  it("applies the size variant and keeps a custom className", () => {
    const { container } = render(<Icon name="settings" size="lg" className="text-destructive" />);
    const svg = container.querySelector("svg");
    expect(svg?.className.baseVal).toContain("size-6");
    expect(svg?.className.baseVal).toContain("text-destructive");
  });

  it("accepts raw Iconify data via the `icon` prop", () => {
    const { container } = render(
      <Icon icon={{ body: '<path d="M0 0h24v24H0z" />', width: 24, height: 24 }} label="Custom" />,
    );
    expect(container.querySelector("svg")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Custom" })).toBeInTheDocument();
  });

  it("renders nothing and warns when neither name nor icon is provided", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const { container } = render(<Icon />);
    expect(container.querySelector("svg")).not.toBeInTheDocument();
    expect(warn).toHaveBeenCalled();
    warn.mockRestore();
  });
});
