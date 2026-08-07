import "@testing-library/jest-dom/vitest";
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

function Sample({ testId, defaultValue = "one" }: { testId: string; defaultValue?: string }) {
  return (
    <Tabs defaultValue={defaultValue} data-testid={testId}>
      <TabsList>
        <TabsTrigger value="one">One</TabsTrigger>
        <TabsTrigger value="two">Two</TabsTrigger>
        <TabsTrigger value="three">Three</TabsTrigger>
      </TabsList>
      <TabsContent value="one">Panel one</TabsContent>
      <TabsContent value="two">Panel two</TabsContent>
      <TabsContent value="three">Panel three</TabsContent>
    </Tabs>
  );
}

/** Tabs activate on press, not on the trailing click — mirror a real mouse press. */
function selectTab(tab: HTMLElement) {
  fireEvent.mouseDown(tab);
  tab.focus();
}

/** Roving focus moves on the next macrotask, so keyboard assertions have to wait. */
async function tick() {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
}

describe("Tabs", () => {
  it("marks the default tab selected and shows only its panel", () => {
    render(<Sample testId="a" />);
    expect(screen.getByRole("tab", { name: "One" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tab", { name: "Two" })).toHaveAttribute("aria-selected", "false");
    expect(screen.getByText("Panel one")).toBeInTheDocument();
    expect(screen.queryByText("Panel two")).not.toBeInTheDocument();
  });

  it("selects a tab on click", () => {
    render(<Sample testId="a" />);
    selectTab(screen.getByRole("tab", { name: "Two" }));
    expect(screen.getByRole("tab", { name: "Two" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText("Panel two")).toBeInTheDocument();
  });

  // Two instances used to share a global `document.querySelector` lookup keyed on
  // the trigger value, so keyboard and selection state leaked between them.
  it("keeps two instances that share tab values independent", () => {
    render(
      <>
        <Sample testId="first" />
        <Sample testId="second" />
      </>,
    );
    const first = within(screen.getByTestId("first"));
    const second = within(screen.getByTestId("second"));

    selectTab(first.getByRole("tab", { name: "Three" }));

    expect(first.getByRole("tab", { name: "Three" })).toHaveAttribute("aria-selected", "true");
    expect(first.getByRole("tab", { name: "One" })).toHaveAttribute("aria-selected", "false");
    // The second instance must be untouched.
    expect(second.getByRole("tab", { name: "One" })).toHaveAttribute("aria-selected", "true");
    expect(second.getByRole("tab", { name: "Three" })).toHaveAttribute("aria-selected", "false");
  });

  it("moves focus between tabs with Home and End", async () => {
    render(<Sample testId="a" />);
    const one = screen.getByRole("tab", { name: "One" });
    const three = screen.getByRole("tab", { name: "Three" });

    one.focus();
    fireEvent.keyDown(one, { key: "End" });
    await tick();
    expect(three).toHaveFocus();

    fireEvent.keyDown(three, { key: "Home" });
    await tick();
    expect(one).toHaveFocus();
  });

  it("moves focus along the list with the arrow keys", async () => {
    render(<Sample testId="a" />);
    const one = screen.getByRole("tab", { name: "One" });
    const two = screen.getByRole("tab", { name: "Two" });

    one.focus();
    fireEvent.keyDown(one, { key: "ArrowRight" });
    await tick();
    expect(two).toHaveFocus();

    fireEvent.keyDown(two, { key: "ArrowLeft" });
    await tick();
    expect(one).toHaveFocus();
  });

  // A horizontal tablist used to respond to Up/Down as well, which fights any
  // vertical arrow-key handling on the page around it.
  it("ignores vertical arrows on a horizontal list", async () => {
    render(<Sample testId="a" />);
    const one = screen.getByRole("tab", { name: "One" });
    one.focus();
    fireEvent.keyDown(one, { key: "ArrowDown" });
    await tick();
    expect(one).toHaveFocus();
  });

  it("navigates a vertical list with the vertical arrows", async () => {
    render(
      <Tabs defaultValue="one" orientation="vertical">
        <TabsList>
          <TabsTrigger value="one">One</TabsTrigger>
          <TabsTrigger value="two">Two</TabsTrigger>
        </TabsList>
        <TabsContent value="one">Panel one</TabsContent>
        <TabsContent value="two">Panel two</TabsContent>
      </Tabs>,
    );
    const one = screen.getByRole("tab", { name: "One" });
    one.focus();
    fireEvent.keyDown(one, { key: "ArrowDown" });
    await tick();
    expect(screen.getByRole("tab", { name: "Two" })).toHaveFocus();
  });
});
