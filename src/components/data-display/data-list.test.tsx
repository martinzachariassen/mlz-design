import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DataList, DataRow } from "./data-list";

describe("DataList", () => {
  it("renders term/description pairs", () => {
    render(
      <DataList>
        <DataRow label="Location">Oslo</DataRow>
      </DataList>,
    );
    expect(screen.getByText("Location")).toBeInTheDocument();
    expect(screen.getByText("Oslo")).toBeInTheDocument();
  });

  it("renders as a definition list", () => {
    const { container } = render(
      <DataList>
        <DataRow label="k">v</DataRow>
      </DataList>,
    );
    expect(container.querySelector("dl")).toBeInTheDocument();
    expect(container.querySelector("dt")).toHaveTextContent("k");
    expect(container.querySelector("dd")).toHaveTextContent("v");
  });

  it("applies mono to the value when requested", () => {
    const { container } = render(
      <DataList>
        <DataRow label="IP" mono>
          203.0.113.7
        </DataRow>
      </DataList>,
    );
    expect(container.querySelector("dd")?.className).toContain("font-mono");
  });

  it("defaults to the justify layout", () => {
    const { container } = render(
      <DataList>
        <DataRow label="k">v</DataRow>
      </DataList>,
    );
    expect(container.querySelector('[data-slot="data-list"]')).toHaveAttribute(
      "data-layout",
      "justify",
    );
    expect(container.querySelector('[data-slot="data-row"]')).toHaveAttribute(
      "data-layout",
      "justify",
    );
  });

  it("cascades the grid layout from the list to its rows", () => {
    const { container } = render(
      <DataList layout="grid">
        <DataRow label="k">v</DataRow>
      </DataList>,
    );
    const row = container.querySelector('[data-slot="data-row"]');
    expect(row).toHaveAttribute("data-layout", "grid");
    expect(row?.className).toContain("grid");
  });

  it("lets a row override the inherited layout", () => {
    const { container } = render(
      <DataList layout="grid">
        <DataRow label="k" layout="justify">
          v
        </DataRow>
      </DataList>,
    );
    expect(container.querySelector('[data-slot="data-row"]')).toHaveAttribute(
      "data-layout",
      "justify",
    );
  });

  it("draws the ruled margin in the ledger layout", () => {
    const { container } = render(
      <DataList layout="ledger">
        <DataRow label="k">v</DataRow>
      </DataList>,
    );
    expect(container.querySelector('[data-slot="data-list"]')?.className).toContain("border-l");
    const row = container.querySelector('[data-slot="data-row"]');
    // Ledger keeps the grid's columns …
    expect(row?.className).toContain("grid-cols-[var(--mlz-data-label,8rem)_minmax(0,1fr)]");
    // … but rules the top of each row instead of the bottom, so the run reads as
    // one block hanging off the list's edge.
    expect(row?.className).toContain("border-t");
    expect(row?.className).not.toContain("border-b");
    expect(container.querySelector("dd")?.className).toContain("border-l");
  });
});
