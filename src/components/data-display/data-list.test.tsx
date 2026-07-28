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
});
