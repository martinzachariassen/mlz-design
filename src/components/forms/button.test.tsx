import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { Button } from "./button";

describe("Button", () => {
  it("renders its children", () => {
    render(<Button>Deploy</Button>);
    expect(screen.getByRole("button", { name: "Deploy" })).toBeInTheDocument();
  });

  it("defaults to type=button so it never submits a form by accident", () => {
    render(<Button>Go</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });

  it("applies variant + size classes", () => {
    render(
      <Button variant="destructive" size="lg">
        Delete
      </Button>,
    );
    const btn = screen.getByRole("button");
    expect(btn.className).toContain("border-destructive");
    expect(btn.className).toContain("h-12");
  });

  it("merges a custom className without dropping variant classes", () => {
    render(<Button className="w-full">Wide</Button>);
    const btn = screen.getByRole("button");
    expect(btn).toHaveClass("w-full");
    expect(btn.className).toContain("border-primary");
  });

  it("forwards the ref to the underlying button element", () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Ref</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("honours the disabled attribute", () => {
    render(<Button disabled>Nope</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  // The base suppresses the global outline, so every variant — including the
  // shadow-less ghost and link — must get the ring replacement from the base,
  // or keyboard focus becomes invisible (WCAG 2.4.7).
  it.each(["default", "solid", "accent", "ghost", "sketch", "destructive", "link"] as const)(
    "gives the %s variant a visible focus ring",
    (variant) => {
      render(<Button variant={variant}>Focusable</Button>);
      const className = screen.getByRole("button").className;
      expect(className).toContain("focus-visible:ring-[3px]");
      expect(className).toContain("focus-visible:ring-ring/30");
    },
  );
});

describe("Button shadcn-vocabulary aliases", () => {
  // Pasted shadcn snippets and LLM-written call sites use these names; they
  // must compile and render the intended look.
  it("renders outline as the MLZ outline (same as default)", () => {
    render(<Button variant="outline">Ghosted</Button>);
    const className = screen.getByRole("button").className;
    expect(className).toContain("border-primary");
    expect(className).toContain("bg-transparent");
  });

  it("renders secondary as the quiet filled companion", () => {
    render(<Button variant="secondary">Quiet</Button>);
    expect(screen.getByRole("button").className).toContain("bg-secondary");
  });
});
