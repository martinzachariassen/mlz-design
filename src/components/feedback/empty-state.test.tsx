import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  EmptyState,
  EmptyStateActions,
  EmptyStateDescription,
  EmptyStateMedia,
  EmptyStateTitle,
} from "./empty-state";

describe("EmptyState", () => {
  it("renders the title as a paragraph by default", () => {
    render(<EmptyStateTitle>No projects yet</EmptyStateTitle>);
    expect(screen.getByText("No projects yet").tagName).toBe("P");
  });

  // A whole-page empty state owns its region and needs a real heading; one
  // inside a card must not invent a level.
  it("renders a real heading when asked", () => {
    render(<EmptyStateTitle as="h2">No projects yet</EmptyStateTitle>);
    expect(screen.getByRole("heading", { level: 2, name: "No projects yet" })).toBeInTheDocument();
  });

  // The title carries the meaning; the glyph repeating it is noise to AT.
  it("hides the media tile from assistive tech", () => {
    const { container } = render(
      <EmptyStateMedia>
        <svg role="img" aria-label="decorative">
          <title>decorative</title>
        </svg>
      </EmptyStateMedia>,
    );
    expect(container.querySelector('[data-slot="empty-state-media"]')).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  it("carries the dashed variant by default and drops it for plain", () => {
    const { container, rerender } = render(<EmptyState />);
    expect(container.firstElementChild?.className).toContain("border-dashed");
    rerender(<EmptyState variant="plain" />);
    expect(container.firstElementChild?.className).not.toContain("border-dashed");
  });

  it("composes into a full empty state", () => {
    render(
      <EmptyState>
        <EmptyStateTitle>No projects yet</EmptyStateTitle>
        <EmptyStateDescription>Spin one up from a template.</EmptyStateDescription>
        <EmptyStateActions>
          <button type="button">New project</button>
        </EmptyStateActions>
      </EmptyState>,
    );
    expect(screen.getByText("No projects yet")).toBeInTheDocument();
    expect(screen.getByText("Spin one up from a template.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "New project" })).toBeInTheDocument();
  });
});
