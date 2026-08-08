import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { GridBackground } from "./grid-background";
import { RepoBanner } from "./repo-banner";
import { SocialCard } from "./social-card";

/**
 * `RepoBanner` and `SocialCard` are fixed-ratio export templates — they get
 * screenshotted or rendered through Satori at an exact size, so the aspect ratio
 * *is* the contract. A banner that quietly stops being 1280×340 produces a
 * README header that crops.
 */
describe("RepoBanner", () => {
  it("holds the 1280×340 ratio at its base width", () => {
    const { container } = render(<RepoBanner project="mlz-design" />);
    const el = container.firstElementChild as HTMLElement;
    expect(el.style.width).toBe("1280px");
    expect(el.style.height).toBe("340px");
  });

  it("scales as one piece", () => {
    const { container } = render(<RepoBanner project="mlz-design" width={640} />);
    const el = container.firstElementChild as HTMLElement;
    expect(el.style.width).toBe("640px");
    expect(el.style.height).toBe("170px");
    // Type scales with the frame rather than staying 16px in a half-size banner.
    expect(el.style.fontSize).toBe("8px");
  });

  it("renders the project name and badges", () => {
    render(<RepoBanner project="mlz-design" badges={["React", "OKLCH"]} />);
    expect(screen.getByText("mlz-design")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
  });

  // `RepoBannerProps` omits the native `title` on purpose: the headline prop is
  // `project`, and letting both exist would put the headline in a tooltip.
  it("does not accept a native title that could shadow the headline", () => {
    const { container } = render(<RepoBanner project="mlz-design" />);
    expect(container.firstElementChild).not.toHaveAttribute("title");
  });
});

describe("SocialCard", () => {
  it("holds the 1200×630 ratio at its base width", () => {
    const { container } = render(<SocialCard title="MLZ Design" />);
    const el = container.firstElementChild as HTMLElement;
    expect(el.style.width).toBe("1200px");
    expect(el.style.height).toBe("630px");
  });

  it("scales proportionally", () => {
    const { container } = render(<SocialCard title="MLZ Design" width={600} />);
    const el = container.firstElementChild as HTMLElement;
    expect(el.style.width).toBe("600px");
    expect(el.style.height).toBe("315px");
  });

  it("renders its copy", () => {
    render(
      <SocialCard
        eyebrow="Design system"
        title="Tokens, not guesses"
        description="Paper and ink."
      />,
    );
    expect(screen.getByText("Design system")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Tokens, not guesses" })).toBeInTheDocument();
    expect(screen.getByText("Paper and ink.")).toBeInTheDocument();
  });
});

describe("GridBackground", () => {
  // Purely decorative and sits under real content, so it must be invisible to
  // assistive tech and untouchable by the pointer.
  it("is hidden from assistive tech", () => {
    const { container } = render(<GridBackground />);
    expect(container.firstElementChild).toHaveAttribute("aria-hidden", "true");
  });

  // It is a layer, not a wrapper: absolutely positioned to fill a `relative`
  // parent, with the page's real content rendered as a sibling above it. Nothing
  // is meant to be nested inside.
  it("fills its parent and never intercepts the pointer", () => {
    const { container } = render(<GridBackground />);
    const className = container.firstElementChild?.className ?? "";
    expect(className).toContain("absolute");
    expect(className).toContain("inset-0");
    expect(className).toContain("pointer-events-none");
  });
});
