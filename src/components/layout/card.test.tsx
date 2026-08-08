import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";

describe("Card", () => {
  it("renders its parts with targetable data-slots", () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <CardTitle>Deploy</CardTitle>
          <CardDescription>Ship the build.</CardDescription>
        </CardHeader>
        <CardContent>Body</CardContent>
      </Card>,
    );
    expect(container.querySelector('[data-slot="card"]')).toBeInTheDocument();
    expect(container.querySelector('[data-slot="card-header"]')).toBeInTheDocument();
    expect(screen.getByText("Deploy")).toBeInTheDocument();
    expect(screen.getByText("Ship the build.")).toBeInTheDocument();
  });

  // asChild lets a whole card become a link or an <article> without a wrapper
  // element swallowing the surface styling.
  it("renders as the child element with asChild", () => {
    render(
      <Card asChild>
        <article aria-label="Project">Body</article>
      </Card>,
    );
    const article = screen.getByRole("article", { name: "Project" });
    expect(article).toHaveAttribute("data-slot", "card");
  });
});
