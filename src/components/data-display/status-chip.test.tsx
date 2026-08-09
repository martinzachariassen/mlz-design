import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StatusChip } from "./status-chip";

describe("StatusChip", () => {
  it("renders its text", () => {
    render(<StatusChip variant="success">No proxy or VPN detected</StatusChip>);
    expect(screen.getByText("No proxy or VPN detected")).toBeInTheDocument();
  });

  it("leads with a decorative status dot by default", () => {
    const { container } = render(<StatusChip variant="warning">Timezone differs</StatusChip>);
    const dot = container.querySelector('[data-slot="status-dot"]');
    expect(dot).toBeInTheDocument();
    expect(dot).toHaveAttribute("aria-hidden", "true");
    expect(dot?.className).toContain("text-warning-deep");
  });

  it("omits the dot when dot={false}", () => {
    const { container } = render(<StatusChip dot={false}>HTTP/3</StatusChip>);
    expect(container.querySelector('[data-slot="status-dot"]')).not.toBeInTheDocument();
  });

  it("forwards pulse to the dot", () => {
    const { container } = render(
      <StatusChip variant="accent" pulse>
        Measuring
      </StatusChip>,
    );
    expect(container.querySelector(".animate-ping")).toBeInTheDocument();
  });

  it("applies the variant wash", () => {
    const { container } = render(<StatusChip variant="destructive">Leaking</StatusChip>);
    expect(container.querySelector('[data-slot="status-chip"]')?.className).toContain(
      "bg-destructive-subtle",
    );
  });

  it("stays a plain span — it reports, it isn't a control", () => {
    const { container } = render(<StatusChip variant="info">HTTP/3</StatusChip>);
    expect(container.querySelector('[data-slot="status-chip"]')?.tagName).toBe("SPAN");
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
