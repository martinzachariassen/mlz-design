import "@testing-library/jest-dom/vitest";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./breadcrumb";

function Sample() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Colour</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

describe("Breadcrumb", () => {
  it("is a named navigation landmark", () => {
    render(<Sample />);
    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument();
  });

  // An ordered list, because the order is the meaning.
  it("renders an ordered list of steps", () => {
    render(<Sample />);
    const list = screen.getByRole("list");
    expect(list.tagName).toBe("OL");
    expect(within(list).getAllByRole("listitem").length).toBeGreaterThanOrEqual(2);
  });

  it("links the ancestors", () => {
    render(<Sample />);
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
  });

  // The current page is marked, not linked — a link to itself is a dead end.
  it("marks the current page instead of linking it", () => {
    render(<Sample />);
    expect(screen.queryByRole("link", { name: "Colour" })).not.toBeInTheDocument();
    expect(screen.getByText("Colour")).toHaveAttribute("aria-current", "page");
  });

  it("hides the separator from assistive tech", () => {
    const { container } = render(<Sample />);
    expect(container.querySelector('[data-slot="breadcrumb-separator"]')).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  it("hands off to a router link with asChild", () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <a href="/work" data-router="true">
                Work
              </a>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>,
    );
    expect(screen.getByRole("link", { name: "Work" })).toHaveAttribute("data-router", "true");
  });
});
