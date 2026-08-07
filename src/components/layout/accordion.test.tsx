import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import type { ComponentProps } from "react";
import { describe, expect, it } from "vitest";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion";

function Fixture(props: ComponentProps<typeof Accordion>) {
  return (
    <Accordion {...props}>
      <AccordionItem value="a">
        <AccordionTrigger>Trigger A</AccordionTrigger>
        <AccordionContent>Panel A</AccordionContent>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger>Trigger B</AccordionTrigger>
        <AccordionContent>Panel B</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

describe("Accordion", () => {
  it("starts closed and opens the item on click", async () => {
    const user = userEvent.setup();
    render(<Fixture type="single" collapsible />);
    const triggerA = screen.getByRole("button", { name: "Trigger A" });
    expect(triggerA).toHaveAttribute("aria-expanded", "false");
    await user.click(triggerA);
    expect(triggerA).toHaveAttribute("aria-expanded", "true");
  });

  it("single mode closes the previous item when a new one opens", async () => {
    const user = userEvent.setup();
    render(<Fixture type="single" />);
    const triggerA = screen.getByRole("button", { name: "Trigger A" });
    const triggerB = screen.getByRole("button", { name: "Trigger B" });
    await user.click(triggerA);
    await user.click(triggerB);
    expect(triggerA).toHaveAttribute("aria-expanded", "false");
    expect(triggerB).toHaveAttribute("aria-expanded", "true");
  });

  it("respects defaultValue", () => {
    render(<Fixture type="single" defaultValue="b" />);
    expect(screen.getByRole("button", { name: "Trigger B" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  });

  it("wires aria-controls to the content region", () => {
    render(<Fixture type="single" defaultValue="a" />);
    const triggerA = screen.getByRole("button", { name: "Trigger A" });
    const region = screen.getByRole("region", { name: "Trigger A" });
    expect(triggerA.getAttribute("aria-controls")).toBe(region.id);
  });
});
