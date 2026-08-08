import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Textarea } from "./textarea";

describe("Textarea", () => {
  it("renders a real textarea and takes native attributes", () => {
    render(<Textarea rows={3} placeholder="Notes" aria-label="Notes" />);
    const el = screen.getByRole("textbox", { name: "Notes" });
    expect(el.tagName).toBe("TEXTAREA");
    expect(el).toHaveAttribute("rows", "3");
  });

  it("types and reports changes", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Textarea aria-label="Notes" onChange={onChange} />);
    await user.type(screen.getByRole("textbox"), "hi");
    expect(onChange).toHaveBeenCalled();
    expect(screen.getByRole("textbox")).toHaveValue("hi");
  });

  it("honours disabled", () => {
    render(<Textarea aria-label="Notes" disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  // Vertical only: free horizontal resizing lets a reader drag the field out of
  // its own layout.
  it("resizes vertically only", () => {
    render(<Textarea aria-label="Notes" />);
    expect(screen.getByRole("textbox").className).toContain("resize-y");
  });

  it("stays controlled", async () => {
    const user = userEvent.setup();
    render(<Textarea aria-label="Notes" value="fixed" onChange={() => {}} />);
    await user.type(screen.getByRole("textbox"), "more");
    expect(screen.getByRole("textbox")).toHaveValue("fixed");
  });
});
