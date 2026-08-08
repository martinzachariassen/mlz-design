import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Container, Grid, Stack } from "./layout";

describe("Container", () => {
  it("centres and constrains at the default size", () => {
    render(<Container data-testid="c">page</Container>);
    const el = screen.getByTestId("c");
    expect(el.className).toContain("mx-auto");
    expect(el.className).toContain("max-w-[64rem]");
  });

  it("takes a size", () => {
    render(
      <Container size="prose" data-testid="c">
        article
      </Container>,
    );
    // `prose` is measure-optimised in ch, not a breakpoint width — the one size
    // that isn't part of the rem ladder.
    expect(screen.getByTestId("c").className).toContain("max-w-[65ch]");
  });

  it("drops the gutters entirely for edge-to-edge", () => {
    render(
      <Container gutter="none" data-testid="c">
        hero
      </Container>,
    );
    const className = screen.getByTestId("c").className;
    expect(className).toContain("px-0");
    expect(className).not.toContain("sm:px-6");
  });

  it("lets a caller's class win over the variant", () => {
    render(
      <Container size="sm" className="max-w-full" data-testid="c">
        x
      </Container>,
    );
    // tailwind-merge keeps the later declaration — this is the escape hatch
    // every component in the system relies on.
    const className = screen.getByTestId("c").className;
    expect(className).toContain("max-w-full");
    expect(className).not.toContain("max-w-[40rem]");
  });
});

describe("Stack", () => {
  it("is a column by default", () => {
    render(<Stack data-testid="s">x</Stack>);
    const className = screen.getByTestId("s").className;
    expect(className).toContain("flex");
    expect(className).toContain("flex-col");
  });

  // The card-to-row flip that would otherwise be hand-written on every layout.
  it("flips from column to row at sm when responsive", () => {
    render(
      <Stack direction="responsive" data-testid="s">
        x
      </Stack>,
    );
    const className = screen.getByTestId("s").className;
    expect(className).toContain("flex-col");
    expect(className).toContain("sm:flex-row");
  });

  it("applies alignment and justification independently", () => {
    render(
      <Stack direction="row" align="center" justify="between" data-testid="s">
        x
      </Stack>,
    );
    const className = screen.getByTestId("s").className;
    expect(className).toContain("items-center");
    expect(className).toContain("justify-between");
  });
});

describe("Grid", () => {
  it("uses fixed responsive columns by default", () => {
    render(<Grid data-testid="g">x</Grid>);
    const el = screen.getByTestId("g");
    expect(el.className).toContain("grid");
    expect(el.style.gridTemplateColumns).toBe("");
  });

  // The auto-fitting mode is the one that needs no breakpoints at all, so the
  // generated track expression is the actual contract.
  it("switches to an auto-fitting track when min is set", () => {
    render(
      <Grid min="16rem" data-testid="g">
        x
      </Grid>,
    );
    expect(screen.getByTestId("g").style.gridTemplateColumns).toBe(
      "repeat(auto-fill, minmax(min(100%, 16rem), 1fr))",
    );
  });

  it("treats a numeric min as pixels", () => {
    render(
      <Grid min={240} data-testid="g">
        x
      </Grid>,
    );
    expect(screen.getByTestId("g").style.gridTemplateColumns).toContain("240px");
  });

  // `min(100%, …)` is what stops a wide track overflowing a narrow container —
  // without it a 24rem minimum breaks the layout on a phone.
  it("caps the track at the container width", () => {
    render(
      <Grid min="24rem" data-testid="g">
        x
      </Grid>,
    );
    expect(screen.getByTestId("g").style.gridTemplateColumns).toContain("min(100%,");
  });

  it("lets min win over cols when both are given", () => {
    render(
      <Grid min="16rem" cols={4} data-testid="g">
        x
      </Grid>,
    );
    const el = screen.getByTestId("g");
    expect(el.style.gridTemplateColumns).toContain("auto-fill");
    expect(el.className).not.toContain("lg:grid-cols-4");
  });

  it("keeps a caller's inline style alongside the generated track", () => {
    render(
      <Grid min="16rem" style={{ marginTop: "8px" }} data-testid="g">
        x
      </Grid>,
    );
    const el = screen.getByTestId("g");
    expect(el.style.marginTop).toBe("8px");
    expect(el.style.gridTemplateColumns).toContain("auto-fill");
  });
});
