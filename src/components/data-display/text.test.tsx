import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Text } from "./text";

describe("Text", () => {
  it("renders a span by default with its children", () => {
    render(<Text>hello</Text>);
    const el = screen.getByText("hello");
    expect(el.tagName).toBe("SPAN");
  });

  it("respects the `as` prop", () => {
    render(
      <Text as="p" variant="lead">
        intro
      </Text>,
    );
    expect(screen.getByText("intro").tagName).toBe("P");
  });

  it("applies the mono variant", () => {
    render(<Text variant="mono">203.0.113.7</Text>);
    expect(screen.getByText("203.0.113.7").className).toContain("font-mono");
  });

  it("keeps a custom className", () => {
    render(<Text className="ml-2">x</Text>);
    expect(screen.getByText("x")).toHaveClass("ml-2");
  });
});
