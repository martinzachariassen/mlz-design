import "@testing-library/jest-dom/vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import * as React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { GlitchText, type GlitchTextHandle } from "./glitch-text";

afterEach(() => {
  vi.useRealTimers();
});

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

  // A ticking parent (a live readout next to the text) re-renders constantly;
  // the ambient timer must ride through instead of resetting each time — even
  // when `interval` is written inline and gets a new identity per render.
  it("keeps the ambient timer across parent re-renders", () => {
    vi.useFakeTimers();
    const { container, rerender } = render(<GlitchText text="mlz" interval={[100, 100]} />);
    act(() => vi.advanceTimersByTime(60));
    rerender(<GlitchText text="mlz" interval={[100, 100]} />);
    act(() => vi.advanceTimersByTime(60));
    expect(container.querySelector(".animate-glitch")).toBeInTheDocument();
  });

  // A consumer's own handler must compose with the hover trigger, not replace it.
  it("composes a consumer onPointerEnter with the hover burst", () => {
    const onPointerEnter = vi.fn();
    const { container } = render(
      <GlitchText text="ab" trigger="hover" onPointerEnter={onPointerEnter} />,
    );
    fireEvent.pointerEnter(container.firstChild as Element);
    expect(onPointerEnter).toHaveBeenCalledTimes(1);
    expect(container.querySelector(".animate-glitch")).toBeInTheDocument();
  });
});
