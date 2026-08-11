import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { Button } from "../forms/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { stubNativeDialog } from "./modal-test-env";

beforeAll(stubNativeDialog);

describe("Dialog", () => {
  it("names and describes itself from its title and description", () => {
    render(
      <Dialog defaultOpen>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete project</DialogTitle>
            <DialogDescription>This can't be undone.</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>,
    );
    const dialog = screen.getByRole("dialog", { name: "Delete project" });
    expect(dialog).toHaveAccessibleDescription("This can't be undone.");
  });

  it("leaves the label unset when there is no title to point at", () => {
    const { container } = render(
      <Dialog defaultOpen>
        <DialogContent>just a body</DialogContent>
      </Dialog>,
    );
    const dialog = container.querySelector("dialog");
    expect(dialog).not.toHaveAttribute("aria-labelledby");
    expect(dialog).not.toHaveAttribute("aria-describedby");
  });

  it("opens uncontrolled from defaultOpen and closes via the ✕ button", () => {
    render(
      <Dialog defaultOpen>
        <DialogContent>
          <DialogTitle>Settings</DialogTitle>
        </DialogContent>
      </Dialog>,
    );
    expect(screen.getByText("Settings")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(screen.queryByText("Settings")).not.toBeInTheDocument();
  });

  it("stays controlled when `open` is provided", () => {
    const onOpenChange = vi.fn();
    render(
      <Dialog open onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogTitle>Settings</DialogTitle>
        </DialogContent>
      </Dialog>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
    // The consumer owns the state, so the content is still on screen.
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  it("closes from a DialogClose rendered asChild", () => {
    const onOpenChange = vi.fn();
    render(
      <Dialog open onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogTitle>Settings</DialogTitle>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});

describe("Button asChild", () => {
  it("renders the child element with the button's styling", () => {
    render(
      <Button asChild variant="solid">
        <a href="/work">Work</a>
      </Button>,
    );
    const link = screen.getByRole("link", { name: "Work" });
    expect(link).toHaveAttribute("href", "/work");
    expect(link).not.toHaveAttribute("type");
    expect(link.className).toContain("bg-primary");
  });

  it("still renders a real button by default", () => {
    render(<Button>Send</Button>);
    expect(screen.getByRole("button", { name: "Send" })).toHaveAttribute("type", "button");
  });
});

describe("DialogTrigger", () => {
  // The trigger is what makes the uncontrolled form self-contained — no
  // consumer useState just to open a modal.
  it("opens an uncontrolled dialog", () => {
    render(
      <Dialog>
        <DialogTrigger>New project</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New project</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>,
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "New project" }));
    expect(screen.getByRole("dialog", { name: "New project" })).toBeInTheDocument();
  });

  it("reports opening through onOpenChange and works asChild", () => {
    const onOpenChange = vi.fn();
    render(
      <Dialog onOpenChange={onOpenChange}>
        <DialogTrigger asChild>
          <Button>Open</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Title</DialogTitle>
        </DialogContent>
      </Dialog>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Open" }));
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });
});
