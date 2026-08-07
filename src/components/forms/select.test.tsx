import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";

function Sample(props: React.ComponentProps<typeof Select>) {
  return (
    <Select {...props}>
      <SelectTrigger aria-label="City">
        <SelectValue placeholder="Pick a city" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="oslo">Oslo</SelectItem>
        <SelectItem value="bergen">Bergen</SelectItem>
        <SelectItem value="svalbard" disabled>
          Svalbard
        </SelectItem>
      </SelectContent>
    </Select>
  );
}

/** Radix opens the listbox on the press, not the trailing click. */
function openSelect() {
  fireEvent.pointerDown(screen.getByRole("combobox", { name: "City" }), {
    button: 0,
    ctrlKey: false,
    pointerType: "mouse",
  });
}

// Radix's Select measures and scrolls its listbox, which needs browser APIs jsdom
// doesn't implement. Stubbing them is what makes the popup testable here at all;
// the real positioning is exercised by the Storybook axe run in Chromium.
beforeAll(() => {
  globalThis.ResizeObserver ??= class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver;
  Element.prototype.hasPointerCapture ??= () => false;
  Element.prototype.setPointerCapture ??= () => {};
  Element.prototype.releasePointerCapture ??= () => {};
  Element.prototype.scrollIntoView ??= () => {};
});

describe("Select", () => {
  it("shows the placeholder while nothing is chosen", () => {
    render(<Sample />);
    expect(screen.getByRole("combobox", { name: "City" })).toHaveTextContent("Pick a city");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("shows the chosen value on the closed trigger", () => {
    render(<Sample defaultValue="bergen" />);
    expect(screen.getByRole("combobox", { name: "City" })).toHaveTextContent("Bergen");
  });

  it("opens the listbox and reports the picked value", () => {
    const onValueChange = vi.fn();
    render(<Sample onValueChange={onValueChange} />);
    openSelect();
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("option", { name: "Oslo" }));
    expect(onValueChange).toHaveBeenCalledWith("oslo");
  });

  it("marks a disabled option as unavailable", () => {
    render(<Sample />);
    openSelect();
    expect(screen.getByRole("option", { name: "Svalbard" })).toHaveAttribute(
      "aria-disabled",
      "true",
    );
  });

  // `name` renders a visually hidden native <select>, which is what lets the value
  // reach a plain HTML form submission.
  it("posts a value with a plain form when given a name", () => {
    const { container } = render(
      <form>
        <Sample name="city" defaultValue="oslo" />
      </form>,
    );
    expect(container.querySelector('select[name="city"]')).toHaveValue("oslo");
  });

  it("disables the trigger when the select is disabled", () => {
    render(<Sample disabled />);
    expect(screen.getByRole("combobox", { name: "City" })).toBeDisabled();
  });
});
