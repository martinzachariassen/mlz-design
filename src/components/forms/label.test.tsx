import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Input } from "./input";
import { Label } from "./label";

describe("Label", () => {
  it("associates with a control through htmlFor", () => {
    render(
      <>
        <Label htmlFor="email">Email</Label>
        <input id="email" />
      </>,
    );
    expect(screen.getByLabelText("Email")).toBe(screen.getByRole("textbox"));
  });

  it("moves focus to its control when clicked", async () => {
    const user = userEvent.setup();
    render(
      <>
        <Label htmlFor="email">Email</Label>
        <Input id="email" />
      </>,
    );
    await user.click(screen.getByText("Email"));
    expect(screen.getByRole("textbox")).toHaveFocus();
  });

  // Radix's label primitive is here for one reason: it stops a double-click
  // from selecting the label text, which is what makes rapid checkbox toggling
  // highlight half the form.
  it("does not select its own text on double-click", async () => {
    const user = userEvent.setup();
    render(
      <>
        <Label htmlFor="agree">Keep me signed in</Label>
        <input id="agree" type="checkbox" />
      </>,
    );
    await user.dblClick(screen.getByText("Keep me signed in"));
    expect(window.getSelection()?.toString()).toBe("");
  });

  it("dims alongside a disabled peer", () => {
    render(<Label>Region</Label>);
    expect(screen.getByText("Region").className).toContain("peer-disabled:opacity-50");
  });
});
