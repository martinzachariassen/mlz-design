import "@testing-library/jest-dom/vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "./popover";

function Example() {
  return (
    <Popover>
      <PopoverTrigger>Filters</PopoverTrigger>
      <PopoverContent aria-label="Filters">
        <p>Narrow the list down.</p>
        <PopoverClose>Done</PopoverClose>
      </PopoverContent>
    </Popover>
  );
}

describe("Popover", () => {
  it("stays closed until the trigger is used", () => {
    render(<Example />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens on click and names itself", async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.click(screen.getByRole("button", { name: "Filters" }));
    const panel = await screen.findByRole("dialog");
    expect(panel).toHaveAccessibleName("Filters");
    expect(panel).toHaveTextContent("Narrow the list down.");
  });

  // Esc dismissal and focus return are the two behaviours that separate this
  // from a div that appears — they're why it's on the Radix primitive.
  it("closes on Escape and returns focus to the trigger", async () => {
    const user = userEvent.setup();
    render(<Example />);
    const trigger = screen.getByRole("button", { name: "Filters" });
    await user.click(trigger);
    await screen.findByRole("dialog");

    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(trigger).toHaveFocus();
  });

  it("closes from a PopoverClose inside", async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.click(screen.getByRole("button", { name: "Filters" }));
    await screen.findByRole("dialog");

    await user.click(screen.getByRole("button", { name: "Done" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });

  it("can be controlled", async () => {
    render(
      <Popover open>
        <PopoverTrigger>Filters</PopoverTrigger>
        <PopoverContent aria-label="Filters">Open from the start.</PopoverContent>
      </Popover>,
    );
    expect(await screen.findByRole("dialog")).toHaveTextContent("Open from the start.");
  });
});
