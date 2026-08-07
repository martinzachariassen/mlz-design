import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "./avatar";

describe("Avatar", () => {
  // Radix only renders the image once it has loaded, which never happens in
  // jsdom — so the fallback is what a test (and a broken src) always sees.
  it("shows the fallback while no image has loaded", () => {
    render(
      <Avatar>
        <AvatarImage src="/nope.png" alt="Martin" />
        <AvatarFallback>MZ</AvatarFallback>
      </Avatar>,
    );
    expect(screen.getByText("MZ")).toBeInTheDocument();
    expect(screen.queryByRole("img", { name: "Martin" })).not.toBeInTheDocument();
  });

  it("renders a presence dot without announcing it", () => {
    const { container } = render(
      <Avatar status="online">
        <AvatarFallback>MZ</AvatarFallback>
      </Avatar>,
    );
    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
  });
});

describe("AvatarGroup", () => {
  it("caps the visible avatars and counts the rest", () => {
    render(
      <AvatarGroup max={2}>
        <Avatar>
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>B</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>C</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>D</AvatarFallback>
        </Avatar>
      </AvatarGroup>,
    );
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("B")).toBeInTheDocument();
    expect(screen.queryByText("C")).not.toBeInTheDocument();
    expect(screen.getByText("+2")).toBeInTheDocument();
  });

  it("shows everything when under the cap", () => {
    render(
      <AvatarGroup max={4}>
        <Avatar>
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>B</AvatarFallback>
        </Avatar>
      </AvatarGroup>,
    );
    expect(screen.queryByText(/^\+/)).not.toBeInTheDocument();
  });
});
