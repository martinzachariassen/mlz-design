import "@testing-library/jest-dom/vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { CopyButton } from "./copy-button";

/**
 * Same dance as `code.test.tsx`: jsdom's `navigator.clipboard` is getter-only and
 * `userEvent.setup()` installs a stub of its own, so this must redefine the
 * property *after* setup or user-event overwrites it.
 */
function stubClipboard(writeText: ReturnType<typeof vi.fn>) {
  Object.defineProperty(navigator, "clipboard", { value: { writeText }, configurable: true });
  return writeText;
}

describe("CopyButton", () => {
  it("writes the value to the clipboard and confirms", async () => {
    const user = userEvent.setup();
    const writeText = stubClipboard(vi.fn().mockResolvedValue(undefined));
    const onCopied = vi.fn();

    render(<CopyButton value="203.0.113.7" label="Copy IP" onCopied={onCopied} />);
    await user.click(screen.getByRole("button"));

    expect(writeText).toHaveBeenCalledWith("203.0.113.7");
    await waitFor(() => expect(screen.getByText("Copied")).toBeInTheDocument());
    expect(onCopied).toHaveBeenCalledWith(true);
  });

  it("keeps the resting label and reports failure when the clipboard refuses", async () => {
    const user = userEvent.setup();
    stubClipboard(vi.fn().mockRejectedValue(new Error("denied")));
    const onCopied = vi.fn();

    render(<CopyButton value="203.0.113.7" label="Copy IP" onCopied={onCopied} />);
    await user.click(screen.getByRole("button"));

    await waitFor(() => expect(onCopied).toHaveBeenCalledWith(false));
    expect(screen.getByText("Copy IP")).toBeInTheDocument();
    expect(screen.queryByText("Copied")).not.toBeInTheDocument();
  });

  // Also the regression test for the no-`onCopied` path: an earlier version wrote
  // `onCopied?.(await copy(value))`, which skips evaluating the argument entirely
  // when the callback is absent — so the button copied nothing at all.
  it("copies without an onCopied callback, then returns to the resting label", async () => {
    const user = userEvent.setup();
    const writeText = stubClipboard(vi.fn().mockResolvedValue(undefined));

    render(<CopyButton value="x" label="Copy" resetMs={300} />);
    await user.click(screen.getByRole("button"));

    expect(writeText).toHaveBeenCalledWith("x");
    await waitFor(() => expect(screen.getByText("Copied")).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText("Copy")).toBeInTheDocument());
  });

  it("uses a custom copied label", async () => {
    const user = userEvent.setup();
    stubClipboard(vi.fn().mockResolvedValue(undefined));

    render(<CopyButton value="x" label="Share" copiedLabel="Link copied" />);
    await user.click(screen.getByRole("button"));

    await waitFor(() => expect(screen.getByText("Link copied")).toBeInTheDocument());
  });

  it("is a real button with the component's data-slot", async () => {
    render(<CopyButton value="x" label="Copy" />);
    const button = screen.getByRole("button");
    expect(button.tagName).toBe("BUTTON");
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveAttribute("data-slot", "copy-button");
  });
});
