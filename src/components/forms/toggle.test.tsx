import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Toggle } from "./toggle";
import { ToggleGroup, ToggleGroupItem } from "./toggle-group";

describe("Toggle", () => {
  // aria-pressed is the whole point: the state lives on the control, so the
  // label can stay constant.
  it("reports its state through aria-pressed", () => {
    render(<Toggle>Archived</Toggle>);
    const toggle = screen.getByRole("button", { name: "Archived" });
    expect(toggle).toHaveAttribute("aria-pressed", "false");
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-pressed", "true");
  });

  it("reports changes to onPressedChange", () => {
    const onPressedChange = vi.fn();
    render(<Toggle onPressedChange={onPressedChange}>Archived</Toggle>);
    fireEvent.click(screen.getByRole("button"));
    expect(onPressedChange).toHaveBeenCalledWith(true);
  });

  it("stays controlled when `pressed` is provided", () => {
    const onPressedChange = vi.fn();
    render(
      <Toggle pressed onPressedChange={onPressedChange}>
        Archived
      </Toggle>,
    );
    fireEvent.click(screen.getByRole("button"));
    expect(onPressedChange).toHaveBeenCalledWith(false);
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true");
  });

  it("honours disabled", () => {
    render(<Toggle disabled>Archived</Toggle>);
    expect(screen.getByRole("button")).toBeDisabled();
  });
});

describe("ToggleGroup", () => {
  it("behaves as a segmented control when type=single", () => {
    const onValueChange = vi.fn();
    render(
      <ToggleGroup
        type="single"
        defaultValue="grid"
        aria-label="Layout"
        onValueChange={onValueChange}
      >
        <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
        <ToggleGroupItem value="list">List</ToggleGroupItem>
      </ToggleGroup>,
    );
    expect(screen.getByRole("radio", { name: "Grid" })).toBeChecked();
    fireEvent.click(screen.getByRole("radio", { name: "List" }));
    expect(onValueChange).toHaveBeenCalledWith("list");
  });

  it("allows several at once when type=multiple", () => {
    render(
      <ToggleGroup type="multiple" defaultValue={["draft"]} aria-label="Filters">
        <ToggleGroupItem value="draft">Draft</ToggleGroupItem>
        <ToggleGroupItem value="mine">Mine</ToggleGroupItem>
      </ToggleGroup>,
    );
    const mine = screen.getByRole("button", { name: "Mine" });
    fireEvent.click(mine);
    expect(mine).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "Draft" })).toHaveAttribute("aria-pressed", "true");
  });

  // Items must not each set their own variant, or the row looks ragged — the
  // group supplies it through context.
  it("passes variant and size down to its items", () => {
    render(
      <ToggleGroup type="single" variant="outline" size="sm" aria-label="Layout">
        <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
      </ToggleGroup>,
    );
    const item = screen.getByRole("radio", { name: "Grid" });
    expect(item.className).toContain("border-input");
    expect(item.className).toContain("h-9");
  });
});
