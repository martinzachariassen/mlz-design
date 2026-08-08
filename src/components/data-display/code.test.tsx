import "@testing-library/jest-dom/vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Code, CodeBlock } from "./code";

/**
 * jsdom exposes `navigator.clipboard` as a getter-only property, and
 * `userEvent.setup()` installs a stub of its own — so this has to redefine the
 * property, and it has to run *after* setup or user-event overwrites it.
 */
function stubClipboard(writeText: ReturnType<typeof vi.fn>) {
  Object.defineProperty(navigator, "clipboard", { value: { writeText }, configurable: true });
  return writeText;
}

describe("Code", () => {
  it("renders a <code> element", () => {
    render(<Code>npm i</Code>);
    expect(screen.getByText("npm i").tagName).toBe("CODE");
  });
});

describe("CodeBlock", () => {
  it("renders the code inside a pre > code", () => {
    render(<CodeBlock>{'@import "tailwindcss";'}</CodeBlock>);
    const code = screen.getByText('@import "tailwindcss";');
    expect(code.tagName).toBe("CODE");
    expect(code.parentElement?.tagName).toBe("PRE");
  });

  it("omits the header bar when there's nothing to put in it", () => {
    const { container } = render(<CodeBlock>x</CodeBlock>);
    expect(container.querySelector("button")).toBeNull();
    expect(screen.queryByText("Copy")).not.toBeInTheDocument();
  });

  it("shows the filename", () => {
    render(<CodeBlock filename="app.css">x</CodeBlock>);
    expect(screen.getByText("app.css")).toBeInTheDocument();
  });

  it("copies the raw string and confirms", async () => {
    const user = userEvent.setup();
    const writeText = stubClipboard(vi.fn().mockResolvedValue(undefined));

    render(<CodeBlock copyable>{"bun add @martinzachariassen/design"}</CodeBlock>);
    await user.click(screen.getByRole("button"));

    expect(writeText).toHaveBeenCalledWith("bun add @martinzachariassen/design");
    await waitFor(() => expect(screen.getByText("Copied")).toBeInTheDocument());
  });

  // An insecure context rejects writeText. The code is still selectable, so
  // there is nothing to say — but it must not throw or wrongly claim success.
  it("survives a rejected clipboard write without claiming success", async () => {
    const user = userEvent.setup();
    const writeText = stubClipboard(vi.fn().mockRejectedValue(new Error("denied")));

    render(<CodeBlock copyable>x</CodeBlock>);
    await user.click(screen.getByRole("button"));

    await waitFor(() => expect(writeText).toHaveBeenCalled());
    expect(screen.queryByText("Copied")).not.toBeInTheDocument();
  });

  it("names the copy button for assistive tech", () => {
    render(
      <CodeBlock copyable copyLabel="Copy the install command">
        x
      </CodeBlock>,
    );
    expect(screen.getByRole("button")).toHaveAccessibleName(/Copy the install command/);
  });
});
