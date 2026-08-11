import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Progress } from "./progress";

describe("Progress", () => {
  it("exposes the value through the progressbar role", () => {
    render(<Progress value={40} aria-label="Upload" />);
    const bar = screen.getByRole("progressbar", { name: "Upload" });
    expect(bar).toHaveAttribute("aria-valuenow", "40");
    expect(bar).toHaveAttribute("aria-valuemin", "0");
    expect(bar).toHaveAttribute("aria-valuemax", "100");
  });

  // A progressbar with no accessible name is an axe failure, so the component
  // supplies a generic one rather than letting a caller ship an unnamed bar.
  it("falls back to a generic name when none is given", () => {
    render(<Progress value={10} />);
    expect(screen.getByRole("progressbar", { name: "Progress" })).toBeInTheDocument();
  });

  it("defers to a caller-supplied name", () => {
    render(<Progress value={10} aria-label="Deploy" />);
    expect(screen.queryByRole("progressbar", { name: "Progress" })).not.toBeInTheDocument();
    expect(screen.getByRole("progressbar", { name: "Deploy" })).toBeInTheDocument();
  });

  // The clamp is the whole reason `value` isn't passed straight through: a stray
  // 120 would overflow the track, and Radix warns on out-of-range values.
  it("clamps out-of-range values instead of overflowing the track", () => {
    const { rerender } = render(<Progress value={120} aria-label="Over" />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "100");
    rerender(<Progress value={-20} aria-label="Under" />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "0");
  });

  it("defaults to zero", () => {
    render(<Progress aria-label="Idle" />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "0");
  });

  // `max` is fixed at 100: the bar is *drawn* from the clamped percentage, so a
  // caller-supplied max would make aria-valuemax disagree with the painted
  // width. The prop is omitted from the type; this guards the runtime path.
  it("ignores a smuggled max", () => {
    const smuggled = { max: 50 } as Record<string, unknown>;
    render(<Progress value={80} aria-label="Fixed" {...smuggled} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuemax", "100");
  });
});
