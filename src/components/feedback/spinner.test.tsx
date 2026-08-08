import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Spinner } from "./spinner";

describe("Spinner", () => {
  // A spinner with no name is a rotating rectangle to a screen reader.
  it("announces itself as a named status", () => {
    render(<Spinner />);
    expect(screen.getByRole("status")).toHaveAccessibleName("Loading");
  });

  it("takes a more specific label", () => {
    render(<Spinner label="Deploying" />);
    expect(screen.getByRole("status")).toHaveAccessibleName("Deploying");
  });

  it("carries its size variant", () => {
    render(<Spinner size="lg" />);
    expect(screen.getByRole("status").className).toMatch(/size-|h-/);
  });

  // The one thing that must survive a refactor: a spinner is the component most
  // likely to make a reduced-motion user ill, and it spins forever.
  it("stops spinning under prefers-reduced-motion", () => {
    render(<Spinner />);
    expect(screen.getByRole("status").className).toContain("motion-reduce:animate-none");
  });
});
