import "@testing-library/jest-dom/vitest";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FloatingMarks } from "./floating-marks";

describe("FloatingMarks", () => {
  // The invariant worth pinning. Positions come from a sine hash of each mark's
  // index, not `Math.random`, so the server and the client agree and React
  // doesn't blow up hydration. A refactor to `Math.random` would look harmless
  // and break SSR silently.
  it("renders identically across mounts", () => {
    const first = render(<FloatingMarks count={8} />).container.innerHTML;
    const second = render(<FloatingMarks count={8} />).container.innerHTML;
    expect(second).toBe(first);
  });

  it("is hidden from assistive tech and click-through", () => {
    const { container } = render(<FloatingMarks count={4} />);
    const layer = container.firstElementChild;
    expect(layer).toHaveAttribute("aria-hidden", "true");
    expect(layer?.className).toContain("pointer-events-none");
  });

  it("renders the requested number of marks", () => {
    const { container } = render(<FloatingMarks count={6} />);
    expect(container.firstElementChild?.children).toHaveLength(6);
  });

  it("renders nothing when asked for none", () => {
    const { container } = render(<FloatingMarks count={0} />);
    expect(container.firstElementChild?.children).toHaveLength(0);
  });
});
