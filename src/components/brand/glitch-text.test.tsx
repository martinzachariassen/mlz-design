import "@testing-library/jest-dom/vitest";
import { act, render, screen } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it } from "vitest";
import { GlitchText, type GlitchTextHandle } from "./glitch-text";

describe("GlitchText", () => {
  it("exposes the full text to assistive tech", () => {
    render(<GlitchText text="mlz" />);
    expect(screen.getByText("mlz")).toBeInTheDocument();
  });

  it("splits into per-character spans hidden from screen readers", () => {
    const { container } = render(<GlitchText text="ab" trigger="hover" />);
    const chars = container.querySelectorAll("[data-glitch-char]");
    expect(chars).toHaveLength(2);
    // The decorative layer is aria-hidden; the sr-only copy carries the text.
    const hidden = container.querySelector("[aria-hidden='true']");
    expect(hidden).toContainElement(chars[0] as HTMLElement);
  });

  it("keeps a custom className on the wrapper", () => {
    const { container } = render(<GlitchText text="x" className="font-hand" />);
    expect(container.firstChild).toHaveClass("font-hand");
  });

  it("fires a burst on demand through burstRef, and not before", () => {
    const handle = React.createRef<GlitchTextHandle>();
    const { container } = render(
      <GlitchText text="203.0.113.7" trigger="manual" burstRef={handle} />,
    );

    expect(container.querySelector(".animate-glitch")).not.toBeInTheDocument();

    act(() => handle.current?.burst());
    expect(container.querySelector(".animate-glitch")).toBeInTheDocument();
  });

  it("still hands the wrapper element to a plain ref", () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(<GlitchText text="x" trigger="manual" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });
});
