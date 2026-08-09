import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SectionHeading } from "./section-heading";

describe("SectionHeading", () => {
  it("renders a real heading at the default level", () => {
    render(<SectionHeading>Exit &amp; network</SectionHeading>);
    expect(screen.getByRole("heading", { level: 2, name: "Exit & network" })).toBeInTheDocument();
  });

  it("takes the level the outline needs", () => {
    render(<SectionHeading as="h3">Leak checks</SectionHeading>);
    expect(screen.getByRole("heading", { level: 3, name: "Leak checks" })).toBeInTheDocument();
  });

  it("draws a decorative rule that is hidden from assistive tech", () => {
    const { container } = render(<SectionHeading>Routing</SectionHeading>);
    const rule =
      container.querySelector('[data-slot="separator"]') ??
      container.querySelector("hr, [role='none']");
    expect(rule).toBeTruthy();
    // Decorative separators must not reach the accessibility tree.
    expect(screen.queryByRole("separator")).not.toBeInTheDocument();
  });

  it("omits the rule when asked", () => {
    const { container } = render(<SectionHeading rule={false}>Routing</SectionHeading>);
    expect(container.querySelectorAll("span, div").length).toBeLessThan(3);
  });

  it("renders actions after the rule", () => {
    render(
      <SectionHeading actions={<button type="button">Clear</button>}>Snapshot</SectionHeading>,
    );
    expect(screen.getByRole("button", { name: "Clear" })).toBeInTheDocument();
  });
});
