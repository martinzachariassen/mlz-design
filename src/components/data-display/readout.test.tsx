import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Readout, ReadoutCell } from "./readout";

describe("Readout", () => {
  it("renders a definition list of label/value pairs", () => {
    const { container } = render(
      <Readout>
        <ReadoutCell label="Exit">203.0.113.7</ReadoutCell>
      </Readout>,
    );
    expect(container.querySelector('[data-slot="readout"]')?.tagName).toBe("DL");
    expect(container.querySelector("dt")).toHaveTextContent("Exit");
    expect(container.querySelector("dd")).toHaveTextContent("203.0.113.7");
  });

  it("shares the width equally between cells", () => {
    const { container } = render(
      <Readout>
        <ReadoutCell label="A">1</ReadoutCell>
        <ReadoutCell label="B">2</ReadoutCell>
      </Readout>,
    );
    expect(container.querySelector('[data-slot="readout"]')?.className).toContain("auto-cols-fr");
  });

  it("leads the value with a dot only when a role is given", () => {
    const { container, rerender } = render(
      <Readout>
        <ReadoutCell label="WebRTC">IP exposed</ReadoutCell>
      </Readout>,
    );
    expect(container.querySelector('[data-slot="status-dot"]')).not.toBeInTheDocument();

    rerender(
      <Readout>
        <ReadoutCell label="WebRTC" dot="warning">
          IP exposed
        </ReadoutCell>
      </Readout>,
    );
    const dot = container.querySelector('[data-slot="status-dot"]');
    expect(dot?.className).toContain("text-warning-deep");
    // Decorative: the value beside it already says "IP exposed".
    expect(dot).toHaveAttribute("aria-hidden", "true");
  });

  it("clips a long value rather than wrapping it", () => {
    render(
      <Readout>
        <ReadoutCell label="Exit">2001:0db8:85a3:0000:0000:8a2e:0370:7334</ReadoutCell>
      </Readout>,
    );
    expect(screen.getByText("2001:0db8:85a3:0000:0000:8a2e:0370:7334").className).toContain(
      "truncate",
    );
  });

  it("positions each cell so an sr-only note can't escape the scroller", () => {
    // Regression guard: `sr-only` is position:absolute, and without a positioned
    // ancestor inside the overflow-x scroller its containing block becomes the
    // page root — it then stretches the document sideways on a phone.
    const { container } = render(
      <Readout>
        <ReadoutCell label="WebRTC" dot="warning">
          <span className="sr-only">Warning: </span>IP exposed
        </ReadoutCell>
      </Readout>,
    );
    expect(container.querySelector('[data-slot="readout-cell"]')?.className).toContain("relative");
  });

  it("keeps the first cell flush so the band aligns with the column above it", () => {
    const { container } = render(
      <Readout>
        <ReadoutCell label="A">1</ReadoutCell>
      </Readout>,
    );
    expect(container.querySelector('[data-slot="readout-cell"]')?.className).toContain(
      "first:pl-0",
    );
  });
});
