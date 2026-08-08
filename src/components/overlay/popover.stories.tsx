import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeSplit } from "../../foundations/theme-split";
import { Button } from "../forms/button";
import { Field, FieldDescription, FieldLabel } from "../forms/field";
import { Input } from "../forms/input";
import { Label } from "../forms/label";
import { Switch } from "../forms/switch";
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "./popover";

const meta = {
  title: "Components/Overlay/Popover",
  component: Popover,
  subcomponents: { PopoverTrigger, PopoverContent, PopoverClose },
  tags: ["autodocs", "status:new"],
  parameters: { layout: "centered" },
  args: { children: null },
  argTypes: { children: { table: { disable: true } } },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click the trigger. Esc or an outside click dismisses it, and focus goes back to the button. */
export const Playground: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm">
          Filters
        </Button>
      </PopoverTrigger>
      <PopoverContent aria-label="Filters">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.1em]">Filters</p>
        <div className="mt-4 flex flex-col gap-3">
          {[
            ["Archived", false],
            ["Only mine", true],
            ["Failing", false],
          ].map(([label, on]) => (
            <div key={label as string} className="flex items-center justify-between gap-4">
              <Label htmlFor={`f-${label}`} className="normal-case tracking-normal">
                {label}
              </Label>
              <Switch id={`f-${label}`} defaultChecked={on as boolean} />
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  ),
};

/** `side` and `align` are preferences — collision handling stays on, so it can't leave the viewport. */
export const Sides: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <Popover key={side}>
          <PopoverTrigger asChild>
            <Button size="sm">{side}</Button>
          </PopoverTrigger>
          <PopoverContent side={side} aria-label={`Opens on the ${side}`} className="w-48">
            <p className="text-sm text-muted-foreground">Preferred side: {side}.</p>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  ),
};

/**
 * A small form. The page stays live behind it — a popover doesn't trap focus or inert
 * the background, which is what separates it from `Dialog`.
 */
export const WithAForm: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="solid" size="sm">
          Rename
        </Button>
      </PopoverTrigger>
      <PopoverContent aria-label="Rename project" className="w-80">
        <Field>
          <FieldLabel>Project name</FieldLabel>
          <Input defaultValue="aurora" />
          <FieldDescription>Changing this doesn't change the slug.</FieldDescription>
        </Field>
        <div className="mt-4 flex justify-end gap-2">
          <PopoverClose asChild>
            <Button variant="ghost" size="sm">
              Cancel
            </Button>
          </PopoverClose>
          <PopoverClose asChild>
            <Button variant="solid" size="sm">
              Save
            </Button>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

/** Open from the start, so both themes show the panel rather than just the trigger. */
export const LightDark: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <ThemeSplit>
      <Popover open modal={false}>
        <PopoverTrigger asChild>
          <Button size="sm">Filters</Button>
        </PopoverTrigger>
        <PopoverContent aria-label="Filters" className="w-56">
          <p className="text-sm text-muted-foreground">Narrow the list down.</p>
        </PopoverContent>
      </Popover>
    </ThemeSplit>
  ),
};
