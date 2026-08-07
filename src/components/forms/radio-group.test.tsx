import "@testing-library/jest-dom/vitest";
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { RadioGroup, RadioGroupItem } from "./radio-group";

/** Roving focus moves on the next macrotask, so keyboard assertions have to wait. */
async function tick() {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
}

function Sample(props: React.ComponentProps<typeof RadioGroup>) {
  return (
    <RadioGroup aria-label="Accent" {...props}>
      <RadioGroupItem value="cyan" aria-label="Cyan" />
      <RadioGroupItem value="rust" aria-label="Rust" />
      <RadioGroupItem value="green" aria-label="Green" />
    </RadioGroup>
  );
}

describe("RadioGroup", () => {
  it("marks the default choice checked", () => {
    render(<Sample defaultValue="rust" />);
    expect(screen.getByRole("radio", { name: "Rust" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "Cyan" })).not.toBeChecked();
  });

  it("reports the new value on click", () => {
    const onValueChange = vi.fn();
    render(<Sample defaultValue="cyan" onValueChange={onValueChange} />);
    fireEvent.click(screen.getByRole("radio", { name: "Green" }));
    expect(onValueChange).toHaveBeenCalledWith("green");
    expect(screen.getByRole("radio", { name: "Green" })).toBeChecked();
  });

  // The WAI-ARIA pattern wants the whole group to be a single tab stop, with the
  // arrows moving inside it — so no individual option may sit in the tab order.
  it("is a single tab stop rather than one per option", () => {
    render(<Sample defaultValue="rust" />);
    const tabbable = screen
      .getAllByRole("radio")
      .filter((radio) => radio.getAttribute("tabindex") === "0");
    expect(tabbable).toHaveLength(0);
    expect(screen.getByRole("radiogroup")).toHaveAttribute("tabindex", "0");
  });

  it("moves and selects with the arrow keys", async () => {
    render(<Sample defaultValue="cyan" />);
    const cyan = screen.getByRole("radio", { name: "Cyan" });
    cyan.focus();
    fireEvent.keyDown(cyan, { key: "ArrowDown" });
    await tick();
    const rust = screen.getByRole("radio", { name: "Rust" });
    expect(rust).toHaveFocus();
    expect(rust).toBeChecked();
  });

  it("keeps two groups sharing option values independent", () => {
    render(
      <>
        <div data-testid="first">
          <Sample defaultValue="cyan" />
        </div>
        <div data-testid="second">
          <Sample defaultValue="cyan" />
        </div>
      </>,
    );
    const first = within(screen.getByTestId("first"));
    const second = within(screen.getByTestId("second"));
    fireEvent.click(first.getByRole("radio", { name: "Green" }));
    expect(first.getByRole("radio", { name: "Green" })).toBeChecked();
    expect(second.getByRole("radio", { name: "Green" })).not.toBeChecked();
  });

  it("disables every option when the group is disabled", () => {
    render(<Sample defaultValue="cyan" disabled />);
    for (const name of ["Cyan", "Rust", "Green"]) {
      expect(screen.getByRole("radio", { name })).toBeDisabled();
    }
  });
});
