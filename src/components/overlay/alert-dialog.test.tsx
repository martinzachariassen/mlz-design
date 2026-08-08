import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeAll, describe, expect, it, vi } from "vitest";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./alert-dialog";
import { stubNativeDialog } from "./modal-test-env";

// The stub gives us open/close; what these assert is the part that is ours —
// the role, the wiring, and what does and doesn't dismiss.
beforeAll(stubNativeDialog);
function Example({
  onOpenChange,
  onConfirm,
}: {
  onOpenChange?: (open: boolean) => void;
  onConfirm?: (event: React.MouseEvent<HTMLButtonElement>) => void;
} = {}) {
  return (
    <AlertDialog defaultOpen onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete aurora</AlertDialogTitle>
          <AlertDialogDescription>
            This removes the project and its deploy history.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

describe("AlertDialog", () => {
  // The role is the whole reason this isn't just a Dialog: it tells AT this is
  // a decision, and makes the description announce on open.
  it("renders as an alertdialog", () => {
    render(<Example />);
    expect(screen.getByRole("alertdialog")).toBeInTheDocument();
  });

  it("names and describes itself from its title and description", () => {
    render(<Example />);
    const dialog = screen.getByRole("alertdialog");
    expect(dialog).toHaveAccessibleName("Delete aurora");
    expect(dialog).toHaveAccessibleDescription("This removes the project and its deploy history.");
  });

  // Enter on a dialog nobody has read yet must not delete anything.
  it("focuses cancel, not the confirm", () => {
    render(<Example />);
    expect(screen.getByRole("button", { name: "Cancel" })).toHaveFocus();
  });

  it("closes on cancel", async () => {
    const onOpenChange = vi.fn();
    render(<Example onOpenChange={onOpenChange} />);
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("runs the action then closes", () => {
    const onOpenChange = vi.fn();
    const onConfirm = vi.fn();
    render(<Example onOpenChange={onOpenChange} onConfirm={onConfirm} />);
    fireEvent.click(screen.getByRole("button", { name: "Delete" }));
    expect(onConfirm).toHaveBeenCalled();
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  // For an action that can fail and wants to show an error in place.
  it("stays open when the action prevents default", () => {
    const onOpenChange = vi.fn();
    render(
      <Example
        onOpenChange={onOpenChange}
        onConfirm={(event) => {
          event.preventDefault();
        }}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Delete" }));
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  // A stray click must not answer a question about deleting something.
  it("does not dismiss on a backdrop click", () => {
    const onOpenChange = vi.fn();
    render(<Example onOpenChange={onOpenChange} />);
    const dialog = screen.getByRole("alertdialog");
    fireEvent.mouseDown(dialog);
    fireEvent.click(dialog);
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it("mounts nothing while closed", () => {
    render(
      <AlertDialog>
        <AlertDialogContent>
          <AlertDialogTitle>Delete aurora</AlertDialogTitle>
        </AlertDialogContent>
      </AlertDialog>,
    );
    expect(screen.queryByText("Delete aurora")).not.toBeInTheDocument();
  });

  it("can be controlled", async () => {
    const { rerender } = render(
      <AlertDialog open={false}>
        <AlertDialogContent>
          <AlertDialogTitle>Delete aurora</AlertDialogTitle>
        </AlertDialogContent>
      </AlertDialog>,
    );
    expect(screen.queryByText("Delete aurora")).not.toBeInTheDocument();
    rerender(
      <AlertDialog open>
        <AlertDialogContent>
          <AlertDialogTitle>Delete aurora</AlertDialogTitle>
        </AlertDialogContent>
      </AlertDialog>,
    );
    await waitFor(() => expect(screen.getByText("Delete aurora")).toBeInTheDocument());
  });
});
