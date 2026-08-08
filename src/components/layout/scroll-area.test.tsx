import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ScrollArea } from "./scroll-area";

describe("ScrollArea", () => {
  it("renders its children in the viewport", () => {
    render(
      <ScrollArea>
        <p>Long content</p>
      </ScrollArea>,
    );
    expect(screen.getByText("Long content")).toBeInTheDocument();
  });

  // The whole point of the component is that scrolling stays native — the
  // viewport is an ordinary overflow container, and only the bar is restyled.
  it("keeps the content inside a real scrolling viewport", () => {
    const { container } = render(
      <ScrollArea>
        <p>Long content</p>
      </ScrollArea>,
    );
    const viewport = container.querySelector('[data-slot="scroll-area-viewport"]');
    expect(viewport).toBeTruthy();
    expect(viewport).toContainElement(screen.getByText("Long content"));
  });

  // Not asserted here: how many scrollbars render. Radix only mounts a bar once
  // the viewport actually overflows, and jsdom has no layout to overflow with —
  // so it is always zero regardless of `orientation`. That behaviour is only
  // observable in a browser, which is where the stories and the axe run exercise
  // it.

  it("takes classes on the box and the viewport separately", () => {
    const { container } = render(
      <ScrollArea className="h-64" viewportClassName="p-4">
        x
      </ScrollArea>,
    );
    expect(container.querySelector('[data-slot="scroll-area"]')?.className).toContain("h-64");
    expect(container.querySelector('[data-slot="scroll-area-viewport"]')?.className).toContain(
      "p-4",
    );
  });
});
