import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { stubResizeObserver, stubScrollIntoView } from "../../lib/dom-test-env";
import { DatePicker } from "./date-picker";
import { Field, FieldLabel } from "./field";

beforeAll(() => {
  stubResizeObserver();
  stubScrollIntoView();
});

describe("DatePicker", () => {
  it("shows the placeholder until a date is picked", () => {
    render(<DatePicker aria-label="Date" placeholder="Pick a date" />);
    expect(screen.getByRole("button", { name: "Date" })).toHaveTextContent("Pick a date");
  });

  it("opens, picks a day, closes and reports the value", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(
      <DatePicker
        aria-label="Date"
        onValueChange={onValueChange}
        calendarProps={{ defaultMonth: new Date(2026, 7, 1) }}
      />,
    );
    await user.click(screen.getByRole("button", { name: "Date" }));
    await user.click(screen.getByRole("button", { name: /14th/ }));
    expect(onValueChange).toHaveBeenCalled();
    const picked = onValueChange.mock.calls[0]?.[0] as Date | undefined;
    expect(picked?.getDate()).toBe(14);
    // Panel closed again; the trigger reads the pick.
    expect(screen.queryByRole("grid")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Date" })).not.toHaveTextContent("Pick a date");
  });

  // The wire format matches what <input type="date"> would post.
  it("submits yyyy-mm-dd through a hidden input when named", () => {
    const { container } = render(
      <DatePicker aria-label="Date" name="deploy" defaultValue={new Date(2026, 7, 14)} />,
    );
    expect(container.querySelector('input[type="hidden"][name="deploy"]')).toHaveValue(
      "2026-08-14",
    );
  });

  it("joins a surrounding Field", () => {
    render(
      <Field>
        <FieldLabel>Deploy date</FieldLabel>
        <DatePicker />
      </Field>,
    );
    expect(screen.getByRole("button", { name: "Deploy date" })).toBeInTheDocument();
  });

  it("lines up with small buttons at size=sm", () => {
    render(<DatePicker aria-label="Compact" size="sm" />);
    expect(screen.getByRole("button", { name: "Compact" }).className).toContain("h-9");
  });
});
