import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { Button } from "../forms/button";
import { stubNativeDialog } from "./modal-test-env";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "./sheet";

beforeAll(stubNativeDialog);

describe("Sheet", () => {
  it("names and describes itself from its title and description", () => {
    render(
      <Sheet defaultOpen>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Navigation</SheetTitle>
            <SheetDescription>Everywhere you can go.</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>,
    );
    const sheet = screen.getByRole("dialog", { name: "Navigation" });
    expect(sheet).toHaveAccessibleDescription("Everywhere you can go.");
  });

  it("leaves the label unset when there is no title to point at", () => {
    const { container } = render(
      <Sheet defaultOpen>
        <SheetContent>just a body</SheetContent>
      </Sheet>,
    );
    expect(container.querySelector("dialog")).not.toHaveAttribute("aria-labelledby");
  });

  it("opens uncontrolled from defaultOpen and closes via the ✕ button", () => {
    render(
      <Sheet defaultOpen>
        <SheetContent>
          <SheetTitle>Menu</SheetTitle>
        </SheetContent>
      </Sheet>,
    );
    expect(screen.getByText("Menu")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(screen.queryByText("Menu")).not.toBeInTheDocument();
  });

  it("stays controlled when `open` is provided", () => {
    const onOpenChange = vi.fn();
    render(
      <Sheet open onOpenChange={onOpenChange}>
        <SheetContent>
          <SheetTitle>Menu</SheetTitle>
        </SheetContent>
      </Sheet>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(screen.getByText("Menu")).toBeInTheDocument();
  });

  it("closes from a SheetClose rendered asChild", () => {
    const onOpenChange = vi.fn();
    render(
      <Sheet open onOpenChange={onOpenChange}>
        <SheetContent>
          <SheetTitle>Menu</SheetTitle>
          <SheetFooter>
            <SheetClose asChild>
              <Button variant="ghost">Cancel</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  // The side is what makes a sheet a sheet rather than a dialog.
  it("anchors to the requested edge", () => {
    const { container, rerender } = render(
      <Sheet defaultOpen side="left">
        <SheetContent>
          <SheetTitle>Menu</SheetTitle>
        </SheetContent>
      </Sheet>,
    );
    expect(container.querySelector("dialog")?.className).toContain("border-r");
    rerender(
      <Sheet defaultOpen side="bottom">
        <SheetContent>
          <SheetTitle>Menu</SheetTitle>
        </SheetContent>
      </Sheet>,
    );
    expect(container.querySelector("dialog")?.className).toContain("border-t");
  });

  it("only mounts its children while open, so a form inside starts fresh", () => {
    const { rerender } = render(
      <Sheet open={false}>
        <SheetContent>
          <SheetTitle>Menu</SheetTitle>
        </SheetContent>
      </Sheet>,
    );
    expect(screen.queryByText("Menu")).not.toBeInTheDocument();
    rerender(
      <Sheet open>
        <SheetContent>
          <SheetTitle>Menu</SheetTitle>
        </SheetContent>
      </Sheet>,
    );
    expect(screen.getByText("Menu")).toBeInTheDocument();
  });
});
