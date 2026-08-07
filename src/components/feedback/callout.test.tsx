import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Callout } from "./callout";

describe("Callout", () => {
  it("renders the title", () => {
    render(<Callout variant="success" title="No leak detected" />);
    expect(screen.getByText("No leak detected")).toBeInTheDocument();
  });

  it("renders an optional description", () => {
    render(<Callout variant="warning" title="VPN likely" description="Hosting ASN in use." />);
    expect(screen.getByText("Hosting ASN in use.")).toBeInTheDocument();
  });

  it("renders a leading status dot", () => {
    const { container } = render(<Callout variant="destructive" title="x" />);
    expect(container.querySelector('[data-slot="status-dot"]')).toBeInTheDocument();
  });
});
