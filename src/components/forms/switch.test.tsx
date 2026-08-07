import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Switch } from "./switch";

describe("Switch", () => {
  // It stays a native checkbox rather than role="switch" so it submits with a
  // plain form; the switch reading comes from its label, not a role swap.
  it("renders a real checkbox input", () => {
    render(<Switch aria-label="Auto-deploy" />);
    const control = screen.getByRole("checkbox", { name: "Auto-deploy" });
    expect(control).toHaveAttribute("type", "checkbox");
  });

  it("toggles and reports the change", () => {
    const onChange = vi.fn();
    render(<Switch aria-label="Auto-deploy" onChange={onChange} />);
    const control = screen.getByRole("checkbox");
    fireEvent.click(control);
    expect(control).toBeChecked();
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("respects a controlled checked state", () => {
    const { rerender } = render(<Switch aria-label="Auto-deploy" checked readOnly />);
    expect(screen.getByRole("checkbox")).toBeChecked();
    rerender(<Switch aria-label="Auto-deploy" checked={false} readOnly />);
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  it("honours disabled", () => {
    render(<Switch aria-label="Auto-deploy" disabled />);
    expect(screen.getByRole("checkbox")).toBeDisabled();
  });
});
