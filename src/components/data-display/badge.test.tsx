import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Badge } from "./badge";

describe("Badge", () => {
  it("renders its children", () => {
    render(<Badge>stable</Badge>);
    expect(screen.getByText("stable")).toBeInTheDocument();
  });

  it("applies the accent variant classes", () => {
    render(<Badge variant="accent">accent</Badge>);
    expect(screen.getByText("accent").className).toContain("bg-accent");
  });

  it("keeps a custom className alongside variant classes", () => {
    render(<Badge className="ml-2">x</Badge>);
    const el = screen.getByText("x");
    expect(el).toHaveClass("ml-2");
    expect(el.className).toContain("bg-primary");
  });
});

describe("Badge shadcn-vocabulary aliases", () => {
  it("accepts secondary as an alias for muted", () => {
    render(<Badge variant="secondary">Beta</Badge>);
    expect(screen.getByText("Beta").className).toContain("bg-muted");
  });
});
