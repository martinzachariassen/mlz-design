import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination";

function Sample() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="/blog?page=1" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="/blog?page=1">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="/blog?page=2" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="/blog?page=3" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

describe("Pagination", () => {
  it("is a named navigation landmark", () => {
    render(<Sample />);
    expect(screen.getByRole("navigation", { name: "Pagination" })).toBeInTheDocument();
  });

  // Real URLs are the point: bookmarkable, shareable, openable in a new tab.
  it("renders every page as a real link", () => {
    render(<Sample />);
    expect(screen.getByRole("link", { name: "1" })).toHaveAttribute("href", "/blog?page=1");
    expect(screen.getByRole("link", { name: "2" })).toHaveAttribute("href", "/blog?page=2");
  });

  // The current page stays a link; aria-current is what distinguishes it.
  it("marks the current page with aria-current", () => {
    render(<Sample />);
    expect(screen.getByRole("link", { name: "2" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "1" })).not.toHaveAttribute("aria-current");
  });

  it("names the arrows for screen readers", () => {
    render(<Sample />);
    expect(screen.getByRole("link", { name: "Go to previous page" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Go to next page" })).toBeInTheDocument();
  });

  it("keeps the ellipsis announced but the glyph hidden", () => {
    render(<Sample />);
    expect(screen.getByText("More pages")).toHaveClass("sr-only");
  });
});
