import "@testing-library/jest-dom/vitest";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Skeleton } from "./skeleton";

describe("Skeleton", () => {
  it("pulses", () => {
    const { container } = render(<Skeleton className="h-4 w-24" />);
    expect(container.firstElementChild?.className).toContain("animate-pulse-soft");
  });

  // Shape comes from the caller — the component is a tinted box and nothing
  // else, so a caller's class has to win.
  it("takes its shape from the caller", () => {
    const { container } = render(<Skeleton className="size-10 rounded-full" />);
    const className = container.firstElementChild?.className ?? "";
    expect(className).toContain("size-10");
    expect(className).toContain("rounded-full");
  });

  // It stands in for content that isn't there yet; announcing it would read out
  // a wall of nothing. The surrounding region carries the loading state.
  it("says nothing to assistive tech", () => {
    const { container } = render(<Skeleton />);
    const el = container.firstElementChild;
    expect(el).not.toHaveAttribute("role");
    expect(el).not.toHaveAttribute("aria-label");
  });
});
