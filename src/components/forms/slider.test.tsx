import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { stubResizeObserver } from "../../lib/dom-test-env";
import { Slider } from "./slider";

beforeAll(stubResizeObserver);

describe("Slider", () => {
  it("renders one thumb for a single value", () => {
    render(<Slider defaultValue={[40]} aria-label="Volume" />);
    expect(screen.getAllByRole("slider")).toHaveLength(1);
  });

  // The thumb count is derived from the value array — get that wrong and a
  // range slider silently loses an end.
  it("renders one thumb per value in a range", () => {
    render(<Slider defaultValue={[20, 80]} aria-label="Price" />);
    expect(screen.getAllByRole("slider")).toHaveLength(2);
  });

  it("derives thumbs from a controlled value too", () => {
    render(<Slider value={[10, 50, 90]} onValueChange={() => {}} aria-label="Bands" />);
    expect(screen.getAllByRole("slider")).toHaveLength(3);
  });

  it("exposes the value range to assistive tech", () => {
    render(<Slider defaultValue={[40]} min={0} max={200} aria-label="Volume" />);
    const thumb = screen.getByRole("slider");
    expect(thumb).toHaveAttribute("aria-valuenow", "40");
    expect(thumb).toHaveAttribute("aria-valuemin", "0");
    expect(thumb).toHaveAttribute("aria-valuemax", "200");
  });

  it("steps with the arrow keys", () => {
    const onValueChange = vi.fn();
    render(
      <Slider defaultValue={[40]} step={5} onValueChange={onValueChange} aria-label="Volume" />,
    );
    fireEvent.keyDown(screen.getByRole("slider"), { key: "ArrowRight" });
    expect(onValueChange).toHaveBeenCalledWith([45]);
  });

  it("jumps to the ends with Home and End", () => {
    const onValueChange = vi.fn();
    render(
      <Slider
        defaultValue={[40]}
        min={0}
        max={100}
        onValueChange={onValueChange}
        aria-label="Volume"
      />,
    );
    const thumb = screen.getByRole("slider");
    fireEvent.keyDown(thumb, { key: "Home" });
    expect(onValueChange).toHaveBeenCalledWith([0]);
    fireEvent.keyDown(thumb, { key: "End" });
    expect(onValueChange).toHaveBeenCalledWith([100]);
  });

  it("ignores the keyboard when disabled", () => {
    const onValueChange = vi.fn();
    render(
      <Slider defaultValue={[40]} disabled onValueChange={onValueChange} aria-label="Volume" />,
    );
    fireEvent.keyDown(screen.getByRole("slider"), { key: "ArrowRight" });
    expect(onValueChange).not.toHaveBeenCalled();
  });
});
