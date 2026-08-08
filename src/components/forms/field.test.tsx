import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Field, FieldDescription, FieldError, FieldLabel } from "./field";
import { Input } from "./input";
import { Textarea } from "./textarea";

describe("Field", () => {
  // The whole point: the caller never writes an id, and the label still lands
  // on the control.
  it("associates the label with the control without an explicit id", () => {
    render(
      <Field>
        <FieldLabel>Email</FieldLabel>
        <Input type="email" />
      </Field>,
    );
    expect(screen.getByLabelText("Email")).toBe(screen.getByRole("textbox"));
  });

  it("points aria-describedby at the description", () => {
    render(
      <Field>
        <FieldLabel>Email</FieldLabel>
        <Input />
        <FieldDescription>Work address only.</FieldDescription>
      </Field>,
    );
    const input = screen.getByRole("textbox");
    const describedBy = input.getAttribute("aria-describedby");
    expect(describedBy).toBeTruthy();
    expect(document.getElementById(describedBy as string)).toHaveTextContent("Work address only.");
  });

  // A field that advertises a description it never rendered sends a screen
  // reader to a dead id.
  it("does not advertise a description that isn't rendered", () => {
    render(
      <Field>
        <FieldLabel>Email</FieldLabel>
        <Input />
      </Field>,
    );
    expect(screen.getByRole("textbox")).not.toHaveAttribute("aria-describedby");
  });

  it("marks the control invalid and announces the error", () => {
    render(
      <Field invalid>
        <FieldLabel>Email</FieldLabel>
        <Input />
        <FieldError>Use your work address.</FieldError>
      </Field>,
    );
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("aria-invalid", "true");
    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent("Use your work address.");
    expect(input.getAttribute("aria-describedby")).toContain(alert.id);
  });

  // FieldError is meant to stay in the tree and be driven by state, so an empty
  // one must not leave an empty <p> behind or a dangling describedby.
  it("renders nothing when the error has no children", () => {
    render(
      <Field>
        <FieldLabel>Email</FieldLabel>
        <Input />
        <FieldError>{null}</FieldError>
      </Field>,
    );
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(screen.getByRole("textbox")).not.toHaveAttribute("aria-describedby");
  });

  it("lists description before error in aria-describedby", () => {
    render(
      <Field invalid>
        <FieldLabel>Email</FieldLabel>
        <Input />
        <FieldDescription>Work address only.</FieldDescription>
        <FieldError>Use your work address.</FieldError>
      </Field>,
    );
    const ids = screen.getByRole("textbox").getAttribute("aria-describedby")?.split(" ") ?? [];
    expect(ids).toHaveLength(2);
    expect(document.getElementById(ids[0] as string)).toHaveTextContent("Work address only.");
    expect(document.getElementById(ids[1] as string)).toHaveTextContent("Use your work address.");
  });

  it("disables the control through context", () => {
    render(
      <Field disabled>
        <FieldLabel>Email</FieldLabel>
        <Input />
      </Field>,
    );
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  // Field-derived props are spread first so the call site always wins.
  it("lets an explicit prop override the field", () => {
    render(
      <Field disabled>
        <FieldLabel>Email</FieldLabel>
        <Input id="my-own-id" disabled={false} />
      </Field>,
    );
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("id", "my-own-id");
    expect(input).not.toBeDisabled();
  });

  it("wires a Textarea the same way", () => {
    render(
      <Field invalid>
        <FieldLabel>Notes</FieldLabel>
        <Textarea />
        <FieldError>Say something.</FieldError>
      </Field>,
    );
    const textarea = screen.getByLabelText("Notes");
    expect(textarea.tagName).toBe("TEXTAREA");
    expect(textarea).toHaveAttribute("aria-invalid", "true");
  });

  // Controls must stay usable on their own — the hook returns {} outside a Field.
  it("leaves a control untouched outside a Field", () => {
    render(<Input aria-label="Loose" />);
    const input = screen.getByRole("textbox");
    expect(input).not.toHaveAttribute("aria-invalid");
    expect(input).not.toHaveAttribute("aria-describedby");
  });

  it("honours an explicit id on the Field itself", () => {
    render(
      <Field id="chosen">
        <FieldLabel>Email</FieldLabel>
        <Input />
      </Field>,
    );
    expect(screen.getByRole("textbox")).toHaveAttribute("id", "chosen");
    expect(screen.getByText("Email")).toHaveAttribute("for", "chosen");
  });
});
