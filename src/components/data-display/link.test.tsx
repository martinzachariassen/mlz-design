import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Link } from "./link";

describe("Link", () => {
  it("renders a real anchor", () => {
    render(<Link href="/work">Selected work</Link>);
    const link = screen.getByRole("link", { name: "Selected work" });
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "/work");
  });

  // rel is the security-relevant half: target="_blank" without noopener hands
  // the opened page a window.opener reference back.
  it("adds target and rel when external", () => {
    render(
      <Link href="https://example.com" external>
        Source
      </Link>,
    );
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("warns screen readers that an external link opens a new tab", () => {
    render(
      <Link href="https://example.com" external>
        Source
      </Link>,
    );
    expect(screen.getByRole("link")).toHaveAccessibleName("Source (opens in a new tab)");
  });

  it("leaves target and rel alone when not external", () => {
    render(<Link href="/work">Work</Link>);
    const link = screen.getByRole("link");
    expect(link).not.toHaveAttribute("target");
    expect(link).not.toHaveAttribute("rel");
  });

  it("lets an explicit target and rel win", () => {
    render(
      <Link href="https://example.com" external target="_self" rel="me">
        Source
      </Link>,
    );
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("target", "_self");
    expect(link).toHaveAttribute("rel", "me");
  });

  it("carries variant classes", () => {
    render(
      <Link href="/x" variant="quiet">
        Quiet
      </Link>,
    );
    expect(screen.getByRole("link").className).toContain("text-muted-foreground");
  });

  // Slot forwards exactly one child, so the sr-only note must not be appended.
  it("hands off to a single child with asChild", () => {
    render(
      <Link asChild>
        <a href="/router" data-testid="router-link">
          Router link
        </a>
      </Link>,
    );
    const link = screen.getByTestId("router-link");
    expect(link).toHaveAccessibleName("Router link");
    expect(link.className).toContain("underline");
  });
});
