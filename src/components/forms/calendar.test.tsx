import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Calendar } from "./calendar";

describe("Calendar", () => {
  it("renders the month grid with an accessible day grid", () => {
    render(<Calendar mode="single" defaultMonth={new Date(2026, 7, 1)} />);
    expect(screen.getByRole("grid")).toBeInTheDocument();
    expect(screen.getByText("August 2026")).toBeInTheDocument();
  });

  it("reports a picked day through onSelect", async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(<Calendar mode="single" onSelect={onSelect} defaultMonth={new Date(2026, 7, 1)} />);
    await user.click(screen.getByRole("button", { name: /14th/ }));
    expect(onSelect).toHaveBeenCalled();
    const picked = onSelect.mock.calls[0]?.[0] as Date;
    expect(picked.getDate()).toBe(14);
    expect(picked.getMonth()).toBe(7);
  });

  it("marks the selected day for assistive tech", () => {
    render(
      <Calendar
        mode="single"
        selected={new Date(2026, 7, 14)}
        defaultMonth={new Date(2026, 7, 1)}
      />,
    );
    const selected = document.querySelector('[aria-selected="true"]');
    expect(selected).toHaveTextContent("14");
  });

  it("navigates months from the nav buttons", async () => {
    const user = userEvent.setup();
    render(<Calendar mode="single" defaultMonth={new Date(2026, 7, 1)} />);
    await user.click(screen.getByRole("button", { name: /next month/i }));
    expect(screen.getByText("September 2026")).toBeInTheDocument();
  });

  it("disables days matched by a matcher", () => {
    render(
      <Calendar
        mode="single"
        disabled={{ before: new Date(2026, 7, 10) }}
        defaultMonth={new Date(2026, 7, 1)}
      />,
    );
    expect(screen.getByRole("button", { name: /August 5th/ })).toBeDisabled();
    expect(screen.getByRole("button", { name: /August 15th/ })).toBeEnabled();
  });
});
