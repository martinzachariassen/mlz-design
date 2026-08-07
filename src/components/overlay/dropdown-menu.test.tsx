import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./dropdown-menu";

function Sample({ onSelect }: { onSelect?: () => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Deployment</DropdownMenuLabel>
        <DropdownMenuItem onSelect={onSelect}>
          Redeploy
          <DropdownMenuShortcut>⌘R</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/** Radix menus open on the press, not the trailing click. */
function openMenu() {
  fireEvent.pointerDown(screen.getByRole("button", { name: /Actions/ }), {
    button: 0,
    ctrlKey: false,
    pointerType: "mouse",
  });
}

describe("DropdownMenu", () => {
  it("stays closed until the trigger is used", () => {
    render(<Sample />);
    expect(screen.getByRole("button", { name: /Actions/ })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("opens on the trigger press and renders its items", () => {
    render(<Sample />);
    openMenu();
    expect(screen.getByRole("menu")).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: /Redeploy/ })).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: /Delete/ })).toBeInTheDocument();
  });

  it("fires onSelect and closes", () => {
    const onSelect = vi.fn();
    render(<Sample onSelect={onSelect} />);
    openMenu();
    fireEvent.click(screen.getByRole("menuitem", { name: /Redeploy/ }));
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("closes on Escape", () => {
    render(<Sample />);
    openMenu();
    fireEvent.keyDown(screen.getByRole("menu"), { key: "Escape" });
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  // The shortcut hint labels a binding, it doesn't create one — so it must not
  // become part of the item's accessible name.
  it("hides the shortcut hint from assistive tech", () => {
    render(<Sample />);
    openMenu();
    const item = screen.getByRole("menuitem", { name: "Redeploy" });
    expect(item).toBeInTheDocument();
    expect(screen.getByText("⌘R")).toHaveAttribute("aria-hidden", "true");
  });

  it("marks a destructive item so styling and intent stay in sync", () => {
    render(<Sample />);
    openMenu();
    expect(screen.getByRole("menuitem", { name: /Delete/ })).toHaveAttribute(
      "data-variant",
      "destructive",
    );
  });
});
