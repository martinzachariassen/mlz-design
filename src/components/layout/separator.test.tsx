import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Separator } from "./separator";

describe("Separator", () => {
  // Decorative is the default: a rule that only divides visually must not add
  // noise to the accessibility tree.
  it("is hidden from assistive tech by default", () => {
    const { container } = render(<Separator />);
    expect(screen.queryByRole("separator")).not.toBeInTheDocument();
    expect(container.firstElementChild).toHaveAttribute("data-orientation", "horizontal");
  });

  it("becomes a real separator when it genuinely divides sections", () => {
    render(<Separator decorative={false} />);
    const rule = screen.getByRole("separator");
    expect(rule).toBeInTheDocument();
    // `horizontal` is the ARIA default for role="separator", so it is left
    // implicit rather than spelled out.
    expect(rule).not.toHaveAttribute("aria-orientation");
  });

  it("spells out a vertical orientation, which is not the default", () => {
    render(<Separator decorative={false} orientation="vertical" />);
    expect(screen.getByRole("separator")).toHaveAttribute("aria-orientation", "vertical");
  });

  it("renders a label that splits a horizontal rule", () => {
    render(<Separator label="or" />);
    expect(screen.getByText("or")).toBeInTheDocument();
  });

  // The label is part of the decoration, so a decorative labelled rule hides the
  // word too — otherwise a screen reader announces a stray "or".
  it("hides the label along with a decorative rule", () => {
    const { container } = render(<Separator label="or" />);
    expect(container.firstElementChild).toHaveAttribute("aria-hidden", "true");
  });

  it("keeps the label reachable when the rule is semantic", () => {
    render(<Separator label="or" decorative={false} />);
    expect(screen.getByRole("separator")).not.toHaveAttribute("aria-hidden", "true");
  });

  // A label only makes sense across a horizontal rule; a vertical one falls back
  // to the plain hairline rather than rendering unreadable sideways text.
  it("ignores a label on a vertical rule", () => {
    render(<Separator label="or" orientation="vertical" />);
    expect(screen.queryByText("or")).not.toBeInTheDocument();
  });
});
