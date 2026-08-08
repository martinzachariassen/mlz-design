import "@testing-library/jest-dom/vitest";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { stubResizeObserver, stubScrollIntoView } from "../../lib/dom-test-env";
import { Combobox } from "./combobox";
import { Field, FieldError, FieldLabel } from "./field";

beforeAll(() => {
  stubResizeObserver();
  stubScrollIntoView();
});

const regions = [
  { value: "eu-north-1", label: "Europe (Stockholm)" },
  { value: "eu-west-1", label: "Europe (Ireland)" },
  { value: "us-east-1", label: "US East (N. Virginia)" },
  { value: "ap-south-1", label: "Asia Pacific (Mumbai)", disabled: true },
];

describe("Combobox", () => {
  it("shows the placeholder until something is chosen", () => {
    render(<Combobox options={regions} placeholder="Pick a region" aria-label="Region" />);
    expect(screen.getByRole("combobox")).toHaveTextContent("Pick a region");
  });

  it("shows the chosen option's label", () => {
    render(<Combobox options={regions} defaultValue="eu-west-1" aria-label="Region" />);
    expect(screen.getByRole("combobox")).toHaveTextContent("Europe (Ireland)");
  });

  it("reports its open state", async () => {
    const user = userEvent.setup();
    render(<Combobox options={regions} aria-label="Region" />);
    const trigger = screen.getByRole("combobox");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  it("filters and selects", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(<Combobox options={regions} onValueChange={onValueChange} aria-label="Region" />);

    await user.click(screen.getByRole("combobox"));
    await user.type(await screen.findByPlaceholderText("Search…"), "mumbai");
    await waitFor(() => expect(screen.queryByText("Europe (Ireland)")).not.toBeInTheDocument());
  });

  it("hands back the value, not the label", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(<Combobox options={regions} onValueChange={onValueChange} aria-label="Region" />);
    await user.click(screen.getByRole("combobox"));
    await user.click(await screen.findByText("US East (N. Virginia)"));
    expect(onValueChange).toHaveBeenCalledWith("us-east-1");
  });

  // A combobox has no "none" row, so re-picking the current value is the only
  // way back to empty.
  it("clears when the current value is picked again", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(
      <Combobox
        options={regions}
        defaultValue="eu-west-1"
        onValueChange={onValueChange}
        aria-label="Region"
      />,
    );
    await user.click(screen.getByRole("combobox"));
    // The label is on the trigger as well as in the list, so scope to the list.
    const list = await screen.findByRole("listbox");
    await user.click(within(list).getByText("Europe (Ireland)"));
    expect(onValueChange).toHaveBeenCalledWith("");
  });

  it("stays controlled when value is provided", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(
      <Combobox
        options={regions}
        value="eu-west-1"
        onValueChange={onValueChange}
        aria-label="Region"
      />,
    );
    await user.click(screen.getByRole("combobox"));
    await user.click(await screen.findByText("US East (N. Virginia)"));
    expect(onValueChange).toHaveBeenCalledWith("us-east-1");
    // The trigger still shows the prop-driven value — the parent owns it.
    expect(screen.getByRole("combobox")).toHaveTextContent("Europe (Ireland)");
  });

  it("does not open when disabled", async () => {
    const user = userEvent.setup();
    render(<Combobox options={regions} disabled aria-label="Region" />);
    const trigger = screen.getByRole("combobox");
    expect(trigger).toBeDisabled();
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("joins a surrounding Field", () => {
    render(
      <Field invalid>
        <FieldLabel>Region</FieldLabel>
        <Combobox options={regions} />
        <FieldError>Pick one.</FieldError>
      </Field>,
    );
    const trigger = screen.getByRole("combobox");
    expect(trigger).toHaveAttribute("aria-invalid", "true");
    expect(trigger.getAttribute("aria-describedby")).toBeTruthy();
    expect(screen.getByText("Region")).toHaveAttribute("for", trigger.id);
  });
});
