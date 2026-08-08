import "@testing-library/jest-dom/vitest";
import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Toaster, toast } from "./toaster";

/** Sonner renders on a timer; let it flush. */
async function flush() {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 60));
  });
}

afterEach(() => {
  toast.dismiss();
});

describe("Toaster", () => {
  it("renders nothing until a toast is raised", () => {
    render(<Toaster />);
    expect(screen.queryByText("Saved")).not.toBeInTheDocument();
  });

  it("shows a toast raised from anywhere", async () => {
    render(<Toaster />);
    act(() => {
      toast("Saved");
    });
    await flush();
    expect(await screen.findByText("Saved")).toBeInTheDocument();
  });

  it("renders a description alongside the title", async () => {
    render(<Toaster />);
    act(() => {
      toast.success("Deployment queued", { description: "mlz-design · main" });
    });
    await flush();
    expect(await screen.findByText("Deployment queued")).toBeInTheDocument();
    expect(screen.getByText("mlz-design · main")).toBeInTheDocument();
  });

  // The whole point of wrapping Sonner: its own styling is off, and every slot
  // is dressed from our semantic tokens instead.
  it("drops Sonner's styling in favour of MLZ tokens", async () => {
    render(<Toaster />);
    act(() => {
      toast("Saved");
    });
    await flush();
    const toastEl = document.querySelector("[data-sonner-toast]");
    expect(toastEl?.className).toContain("bg-popover");
    expect(toastEl?.className).toContain("border-border");
  });

  it("carries an action when one is given", async () => {
    render(<Toaster />);
    act(() => {
      toast("Project archived", { action: { label: "Undo", onClick: () => {} } });
    });
    await flush();
    expect(await screen.findByRole("button", { name: "Undo" })).toBeInTheDocument();
  });
});
