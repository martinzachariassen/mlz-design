import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FindingItem, FindingList } from "./finding-list";

describe("FindingList", () => {
  it("renders a real list of items", () => {
    render(
      <FindingList>
        <FindingItem variant="success" title="No DNS leak" />
        <FindingItem variant="warning" title="WebRTC exposes a different IP" />
      </FindingList>,
    );
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  it("shows the title and its explanation", () => {
    render(
      <FindingList>
        <FindingItem variant="success" title="No DNS leak">
          One resolver answered.
        </FindingItem>
      </FindingList>,
    );
    expect(screen.getByText("No DNS leak")).toBeInTheDocument();
    expect(screen.getByText("One resolver answered.")).toBeInTheDocument();
  });

  it("omits the explanation paragraph when there is none", () => {
    const { container } = render(
      <FindingList>
        <FindingItem variant="success" title="No DNS leak" />
      </FindingList>,
    );
    expect(container.querySelectorAll("p")).toHaveLength(1);
  });

  it("carries the severity on the dot", () => {
    const { container } = render(
      <FindingList>
        <FindingItem variant="destructive" title="Fingerprint is very distinctive" />
      </FindingList>,
    );
    expect(container.querySelector('[data-slot="status-dot"]')?.className).toContain(
      "text-destructive-deep",
    );
  });

  it("keeps the dot decorative unless the state is named", () => {
    const { container, rerender } = render(
      <FindingList>
        <FindingItem variant="warning" title="Timezone: Europe/Oslo" />
      </FindingList>,
    );
    expect(container.querySelector('[data-slot="status-dot"]')).toHaveAttribute(
      "aria-hidden",
      "true",
    );

    rerender(
      <FindingList>
        <FindingItem variant="warning" statusLabel="Warning" title="Timezone: Europe/Oslo" />
      </FindingList>,
    );
    expect(screen.getByRole("img", { name: "Warning" })).toBeInTheDocument();
  });
});
