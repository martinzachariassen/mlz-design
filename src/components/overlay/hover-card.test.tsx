import "@testing-library/jest-dom/vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card";

describe("HoverCard", () => {
  it("stays closed until something opens it", () => {
    render(
      <HoverCard>
        <HoverCardTrigger>@martin</HoverCardTrigger>
        <HoverCardContent>Martin Zachariassen</HoverCardContent>
      </HoverCard>,
    );
    expect(screen.queryByText("Martin Zachariassen")).not.toBeInTheDocument();
  });

  it("renders its content when open", async () => {
    render(
      <HoverCard open>
        <HoverCardTrigger>@martin</HoverCardTrigger>
        <HoverCardContent>Martin Zachariassen</HoverCardContent>
      </HoverCard>,
    );
    expect(await screen.findByText("Martin Zachariassen")).toBeInTheDocument();
  });

  // 700ms is a deliberate override of Radix's own default — anything faster and
  // cards flash open as the pointer crosses a paragraph of links. Worth pinning
  // precisely because it's a judgement call someone might "tidy away".
  it("waits 700ms before opening on hover", async () => {
    vi.useFakeTimers();
    try {
      render(
        <HoverCard>
          <HoverCardTrigger>@martin</HoverCardTrigger>
          <HoverCardContent>Martin Zachariassen</HoverCardContent>
        </HoverCard>,
      );
      fireEvent.pointerEnter(screen.getByText("@martin"), { pointerType: "mouse" });

      await act(async () => {
        vi.advanceTimersByTime(650);
      });
      expect(screen.queryByText("Martin Zachariassen")).not.toBeInTheDocument();

      await act(async () => {
        vi.advanceTimersByTime(100);
      });
      expect(screen.getByText("Martin Zachariassen")).toBeInTheDocument();
    } finally {
      vi.useRealTimers();
    }
  });

  it("lets the delays be overridden", async () => {
    render(
      <HoverCard open openDelay={0} closeDelay={0}>
        <HoverCardTrigger>@martin</HoverCardTrigger>
        <HoverCardContent>Martin Zachariassen</HoverCardContent>
      </HoverCard>,
    );
    expect(await screen.findByText("Martin Zachariassen")).toBeInTheDocument();
  });

  it("keeps the trigger a real link with asChild", () => {
    render(
      <HoverCard>
        <HoverCardTrigger asChild>
          <a href="/martin">@martin</a>
        </HoverCardTrigger>
        <HoverCardContent>Martin Zachariassen</HoverCardContent>
      </HoverCard>,
    );
    expect(screen.getByRole("link", { name: "@martin" })).toHaveAttribute("href", "/martin");
  });
});
