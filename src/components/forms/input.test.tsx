import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Input } from "./input";
import { Label } from "./label";
import { Textarea } from "./textarea";

describe("Input", () => {
  it("forwards native attributes untouched", () => {
    render(<Input aria-label="Email" type="email" required placeholder="you@example.com" />);
    const field = screen.getByRole("textbox", { name: "Email" });
    expect(field).toHaveAttribute("type", "email");
    expect(field).toBeRequired();
    expect(field).toHaveAttribute("placeholder", "you@example.com");
  });

  it("accepts typing and reports it", () => {
    const onChange = vi.fn();
    render(<Input aria-label="Email" onChange={onChange} />);
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "hi@mlz.no" } });
    expect(screen.getByRole("textbox")).toHaveValue("hi@mlz.no");
    expect(onChange).toHaveBeenCalled();
  });

  it("pairs with a Label through htmlFor", () => {
    render(
      <>
        <Label htmlFor="email">Email</Label>
        <Input id="email" />
      </>,
    );
    expect(screen.getByRole("textbox", { name: "Email" })).toBeInTheDocument();
  });

  it("honours disabled", () => {
    render(<Input aria-label="Email" disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("keeps caller classes alongside its own", () => {
    render(<Input aria-label="Email" className="w-64" />);
    expect(screen.getByRole("textbox").className).toContain("w-64");
  });
});

describe("Textarea", () => {
  it("renders a textarea that accepts input", () => {
    render(<Textarea aria-label="Notes" />);
    const field = screen.getByRole("textbox", { name: "Notes" });
    expect(field.tagName).toBe("TEXTAREA");
    fireEvent.change(field, { target: { value: "a note" } });
    expect(field).toHaveValue("a note");
  });

  it("takes a caller-supplied rows", () => {
    render(<Textarea aria-label="Notes" rows={3} />);
    expect(screen.getByRole("textbox")).toHaveAttribute("rows", "3");
  });

  it("honours disabled", () => {
    render(<Textarea aria-label="Notes" disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });
});

describe("Input slots and sizes", () => {
  it("renders prefix and suffix inside the frame", () => {
    const { container } = render(
      <Input aria-label="Price" prefix={<span aria-hidden>$</span>} suffix={<span>NOK</span>} />,
    );
    expect(container.querySelector('[data-slot="input-group"]')).toBeInTheDocument();
    expect(container.querySelector('[data-slot="input-prefix"]')).toHaveTextContent("$");
    expect(container.querySelector('[data-slot="input-suffix"]')).toHaveTextContent("NOK");
    // The input pads out of the slots' way.
    expect(screen.getByRole("textbox").className).toContain("pl-9");
    expect(screen.getByRole("textbox").className).toContain("pr-9");
  });

  it("stays a bare input without slots", () => {
    const { container } = render(<Input aria-label="Plain" />);
    expect(container.querySelector('[data-slot="input-group"]')).not.toBeInTheDocument();
  });

  it("lines up with small buttons at size=sm", () => {
    render(<Input aria-label="Compact" size="sm" />);
    expect(screen.getByRole("textbox").className).toContain("h-9");
  });
});
