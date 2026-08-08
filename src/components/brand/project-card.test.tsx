import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProjectCard } from "./project-card";

const project = {
  title: "aurora",
  description: "The northern-lights forecast app.",
  tags: ["React", "Workers"],
  href: "/projects/aurora",
};

describe("ProjectCard", () => {
  it("renders as a named article", () => {
    render(<ProjectCard {...project} />);
    expect(screen.getByRole("article", { name: /aurora/i })).toBeInTheDocument();
  });

  it("shows the description and tags", () => {
    render(<ProjectCard {...project} />);
    expect(screen.getByText("The northern-lights forecast app.")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Workers")).toBeInTheDocument();
  });

  // The whole card is the target, but there must be exactly one link — a second
  // one inside the same card gives a keyboard user two stops to the same place.
  it("exposes exactly one link, to the project", () => {
    render(<ProjectCard {...project} />);
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(1);
    expect(links[0]).toHaveAttribute("href", "/projects/aurora");
  });

  it("names that link from the title rather than the CTA alone", () => {
    render(<ProjectCard {...project} />);
    // "View project" repeated across a grid tells a screen-reader user nothing
    // about which project.
    expect(screen.getByRole("link")).toHaveAccessibleName(/aurora/i);
  });

  it("goes horizontal when featured", () => {
    const { container, rerender } = render(<ProjectCard {...project} />);
    const plain = container.firstElementChild?.className ?? "";
    rerender(<ProjectCard {...project} featured />);
    expect(container.firstElementChild?.className).not.toBe(plain);
  });
});
