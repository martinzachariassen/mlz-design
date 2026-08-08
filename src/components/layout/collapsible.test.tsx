import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./collapsible";

function Example(props: { defaultOpen?: boolean; onOpenChange?: (open: boolean) => void }) {
  return (
    <Collapsible {...props}>
      <CollapsibleTrigger>Advanced options</CollapsibleTrigger>
      <CollapsibleContent>
        <p>Region, retries, timeout.</p>
      </CollapsibleContent>
    </Collapsible>
  );
}

describe("Collapsible", () => {
  // aria-expanded is the contract: the label stays constant and the state lives
  // on the control.
  it("reports its state through aria-expanded", async () => {
    const user = userEvent.setup();
    render(<Example />);
    const trigger = screen.getByRole("button", { name: "Advanced options" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  it("points aria-controls at the content", async () => {
    const user = userEvent.setup();
    render(<Example />);
    const trigger = screen.getByRole("button");
    await user.click(trigger);
    const controls = trigger.getAttribute("aria-controls");
    expect(controls).toBeTruthy();
    expect(document.getElementById(controls as string)).toHaveTextContent(
      "Region, retries, timeout.",
    );
  });

  it("honours defaultOpen", () => {
    render(<Example defaultOpen />);
    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Region, retries, timeout.")).toBeInTheDocument();
  });

  it("reports changes to onOpenChange", async () => {
    const onOpenChange = vi.fn();
    const user = userEvent.setup();
    render(<Example onOpenChange={onOpenChange} />);
    await user.click(screen.getByRole("button"));
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  // The grid-rows animation needs the wrapper, or the content has nothing to
  // collapse against and snaps instead of sliding.
  it("wraps the content in an overflow-hidden track", async () => {
    const user = userEvent.setup();
    const { container } = render(<Example />);
    await user.click(screen.getByRole("button"));
    const content = container.querySelector('[data-slot="collapsible-content"]');
    expect(content?.className).toContain("grid-rows-[0fr]");
    expect(content?.firstElementChild?.className).toContain("overflow-hidden");
  });
});
