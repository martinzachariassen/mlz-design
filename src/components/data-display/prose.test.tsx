import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Prose } from "./prose";

describe("Prose", () => {
  it("renders its children untouched", () => {
    render(
      <Prose>
        <h1>Title</h1>
        <p>Body copy.</p>
      </Prose>,
    );
    expect(screen.getByRole("heading", { level: 1, name: "Title" })).toBeInTheDocument();
    expect(screen.getByText("Body copy.")).toBeInTheDocument();
  });

  // Prose styles by descendant selector rather than by wrapping each child, so
  // markdown or a CMS payload can be dropped in as-is. If the selectors ever
  // move onto the children, that stops being true.
  it("styles descendants from the wrapper", () => {
    const { container } = render(
      <Prose>
        <p>Body copy.</p>
      </Prose>,
    );
    const wrapper = container.firstElementChild;
    expect(wrapper?.className).toContain("[&_p]:");
    expect(screen.getByText("Body copy.").className).toBe("");
  });

  // Links inside long-form copy read at --accent-deep, not --accent: the plain
  // accent measures 1.8:1 as text on paper and fails AA.
  it("colours links with the text-safe accent", () => {
    const { container } = render(
      <Prose>
        <p>
          <a href="/architecture">the architecture notes</a>
        </p>
      </Prose>,
    );
    expect(container.firstElementChild?.className).toContain("var(--accent-deep)");
  });

  it("caps the measure", () => {
    const { container } = render(<Prose>x</Prose>);
    expect(container.firstElementChild?.className).toMatch(/max-w-/);
  });
});
