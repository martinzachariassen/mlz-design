import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Checkbox } from "./checkbox";
import { Label } from "./label";

describe("Checkbox", () => {
  it("renders a real checkbox input", () => {
    render(<Checkbox aria-label="Ship it" />);
    const box = screen.getByRole("checkbox", { name: "Ship it" });
    expect(box).toHaveAttribute("type", "checkbox");
    expect(box).not.toBeChecked();
  });

  it("toggles and reports the change", () => {
    const onChange = vi.fn();
    render(<Checkbox aria-label="Ship it" onChange={onChange} />);
    const box = screen.getByRole("checkbox");
    fireEvent.click(box);
    expect(box).toBeChecked();
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  // The visible box is a styled <label>, so the generated id is what connects it
  // to the input — without it, clicking the box would do nothing.
  it("generates an id so its own label targets it", () => {
    render(<Checkbox aria-label="Ship it" />);
    const box = screen.getByRole("checkbox");
    expect(box.id).toBeTruthy();
  });

  it("pairs with an external Label via a caller-supplied id", () => {
    render(
      <>
        <Checkbox id="tos" />
        <Label htmlFor="tos">Accept terms</Label>
      </>,
    );
    expect(screen.getByRole("checkbox", { name: "Accept terms" })).toBeInTheDocument();
  });

  it("honours disabled", () => {
    render(<Checkbox aria-label="Ship it" disabled />);
    expect(screen.getByRole("checkbox")).toBeDisabled();
  });
});
