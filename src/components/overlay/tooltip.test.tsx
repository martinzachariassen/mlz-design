import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

function Sample({ defaultOpen }: { defaultOpen?: boolean }) {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip defaultOpen={defaultOpen}>
        <TooltipTrigger>Redeploy</TooltipTrigger>
        <TooltipContent>Runs the last build again</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

describe("Tooltip", () => {
  it("stays closed until the trigger is hovered or focused", () => {
    render(<Sample />);
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("opens on keyboard focus, so it isn't mouse-only", async () => {
    render(<Sample />);
    fireEvent.focus(screen.getByRole("button", { name: /Redeploy/ }));
    await waitFor(() => expect(screen.getByRole("tooltip")).toBeInTheDocument());
  });

  it("closes again on blur", async () => {
    render(<Sample />);
    const trigger = screen.getByRole("button", { name: /Redeploy/ });
    fireEvent.focus(trigger);
    await waitFor(() => expect(screen.getByRole("tooltip")).toBeInTheDocument());
    fireEvent.blur(trigger);
    await waitFor(() => expect(screen.queryByRole("tooltip")).not.toBeInTheDocument());
  });

  // Radix links the tooltip with `aria-describedby`, so it *describes* the
  // trigger rather than naming it. An icon-only button therefore still needs its
  // own `aria-label` — a tooltip alone leaves it unnamed.
  it("describes its trigger without becoming its name", () => {
    render(<Sample defaultOpen />);
    const trigger = screen.getByRole("button", { name: "Redeploy" });
    expect(trigger).toHaveAccessibleDescription("Runs the last build again");
  });
});
