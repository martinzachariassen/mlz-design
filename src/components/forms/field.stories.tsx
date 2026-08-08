import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { ThemeSplit } from "../../foundations/theme-split";
import { Button } from "./button";
import { Field, FieldDescription, FieldError, FieldLabel } from "./field";
import { Input } from "./input";
import { Textarea } from "./textarea";

const meta = {
  title: "Components/Forms/Field",
  component: Field,
  subcomponents: { FieldLabel, FieldDescription, FieldError },
  tags: ["autodocs", "status:new"],
  parameters: { layout: "centered" },
  args: { children: null },
  argTypes: {
    children: { table: { disable: true } },
    invalid: { control: "boolean" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Flip `invalid` and `disabled` and watch the control follow — no ids anywhere in the markup. */
export const Playground: Story = {
  render: (args) => (
    <div className="w-80">
      <Field {...args}>
        <FieldLabel>Email</FieldLabel>
        <Input type="email" placeholder="you@example.com" />
        <FieldDescription>We only use this for deploy notifications.</FieldDescription>
        <FieldError>{args.invalid ? "Use your work address." : null}</FieldError>
      </Field>
    </div>
  ),
};

/** The minimum: a label and a control. Nothing extra is advertised to assistive tech. */
export const Minimal: Story = {
  render: () => (
    <div className="w-80">
      <Field>
        <FieldLabel>Project name</FieldLabel>
        <Input placeholder="aurora" />
      </Field>
    </div>
  ),
};

/** A description says what the field wants. It's wired through `aria-describedby` automatically. */
export const WithDescription: Story = {
  render: () => (
    <div className="w-80">
      <Field>
        <FieldLabel>Slug</FieldLabel>
        <Input placeholder="aurora" defaultValue="aurora" />
        <FieldDescription>Lowercase, no spaces. This becomes the URL.</FieldDescription>
      </Field>
    </div>
  ),
};

/**
 * The error carries `role="alert"`, so it's announced when it appears. Write what to
 * do, not what failed.
 */
export const Invalid: Story = {
  render: () => (
    <div className="w-80">
      <Field invalid>
        <FieldLabel>Email</FieldLabel>
        <Input type="email" defaultValue="martin@" />
        <FieldDescription>We only use this for deploy notifications.</FieldDescription>
        <FieldError>Add the part after the @.</FieldError>
      </Field>
    </div>
  ),
};

/** `disabled` on the field dims the label and disables the control in one place. */
export const Disabled: Story = {
  render: () => (
    <div className="w-80">
      <Field disabled>
        <FieldLabel>Region</FieldLabel>
        <Input defaultValue="eu-north-1" />
        <FieldDescription>Locked for this plan.</FieldDescription>
      </Field>
    </div>
  ),
};

/**
 * A real form. `FieldError` renders nothing while its children are empty, so it can
 * stay in the tree and be driven straight from state.
 */
export const LiveValidation: Story = {
  render: function LiveValidationStory() {
    const [email, setEmail] = React.useState("");
    const [submitted, setSubmitted] = React.useState(false);
    const error = submitted && !email.includes("@") ? "Add the part after the @." : null;

    return (
      <form
        className="flex w-80 flex-col gap-5"
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(true);
        }}
      >
        <Field invalid={!!error}>
          <FieldLabel>Email</FieldLabel>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <FieldDescription>Where deploy failures go.</FieldDescription>
          <FieldError>{error}</FieldError>
        </Field>
        <Field>
          <FieldLabel>Notes</FieldLabel>
          <Textarea rows={3} placeholder="Anything the team should know" />
        </Field>
        <Button type="submit" variant="solid" size="sm">
          Save
        </Button>
      </form>
    );
  },
};

export const LightDark: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <ThemeSplit>
      <div className="w-72">
        <Field invalid>
          <FieldLabel>Email</FieldLabel>
          <Input type="email" defaultValue="martin@" />
          <FieldError>Add the part after the @.</FieldError>
        </Field>
      </div>
    </ThemeSplit>
  ),
};
