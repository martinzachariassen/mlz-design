import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Stat, StatDelta, StatLabel, StatValue } from "./stat";

describe("Stat", () => {
  // The label reads first because "94%" is meaningless until you know what it
  // measures — the visual hierarchy is inverted, the DOM order is not.
  it("puts the label before the value in the DOM", () => {
    const { container } = render(
      <Stat>
        <StatLabel>Coverage</StatLabel>
        <StatValue>94%</StatValue>
      </Stat>,
    );
    const text = container.textContent ?? "";
    expect(text.indexOf("Coverage")).toBeLessThan(text.indexOf("94%"));
  });

  // `-deep`, not the plain signal: these are 12px, and `--success` measures
  // 3.1:1 on paper. The solids are fill colours.
  it("colours the delta with the text-safe deep signal", () => {
    render(<StatDelta direction="up">+2.1</StatDelta>);
    expect(screen.getByText("+2.1").className).toContain("var(--success-deep)");
  });

  it("uses the deep destructive for a downward delta", () => {
    render(<StatDelta direction="down">-4</StatDelta>);
    expect(screen.getByText("-4").className).toContain("var(--destructive-deep)");
  });

  it("falls back to the flat direction", () => {
    render(<StatDelta>no change</StatDelta>);
    expect(screen.getByText("no change").className).toContain("text-muted-foreground");
  });

  // A live-updating value must not make the row jitter as digit widths change.
  it("keeps the value on tabular figures", () => {
    render(<StatValue>1,284</StatValue>);
    expect(screen.getByText("1,284").className).toContain("tabular-nums");
  });
});
