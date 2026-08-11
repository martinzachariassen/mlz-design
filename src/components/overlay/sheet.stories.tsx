import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { expect, userEvent, within } from "storybook/test";
import { ThemeSplit } from "../../foundations/theme-split";
import { Button } from "../forms/button";
import { Input } from "../forms/input";
import { Label } from "../forms/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "./sheet";

const meta = {
  title: "Components/Overlay/Sheet",
  component: Sheet,
  subcomponents: {
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetFooter,
    SheetClose,
  },
  tags: ["autodocs"],
  args: { children: null },
  argTypes: {
    children: { table: { disable: true } },
    side: { control: "inline-radio", options: ["right", "left", "top", "bottom"] },
  },
  parameters: { layout: "centered" },
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The everyday shape. Open it and the sheet slides in; Esc, the ✕ or the backdrop close it. */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: /Open menu/ }));
    await expect(await within(document.body).findByRole("dialog")).toBeInTheDocument();
  },
  render: function DefaultStory(args) {
    const [open, setOpen] = React.useState(false);
    return (
      <>
        <Button variant="solid" onClick={() => setOpen(true)}>
          Open menu
        </Button>
        <Sheet {...args} open={open} onOpenChange={setOpen}>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Navigation</SheetTitle>
              <SheetDescription>Everywhere you can go from here.</SheetDescription>
            </SheetHeader>
            <nav className="flex flex-col gap-1">
              {[
                ["Work", "/work"],
                ["Writing", "/writing"],
                ["About", "/about"],
                ["Contact", "/contact"],
              ].map(([item, href]) => (
                <a
                  key={item}
                  href={href}
                  className="rounded-[var(--radius-sm)] px-2 py-2 text-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30"
                >
                  {item}
                </a>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </>
    );
  },
};

/** All four edges. `left` and `right` are full height; `top` and `bottom` cap at 85% and span the width. */
export const Sides: Story = {
  render: function SidesStory() {
    const [side, setSide] = React.useState<"right" | "left" | "top" | "bottom" | null>(null);
    return (
      <>
        <div className="flex flex-wrap gap-3">
          {(["left", "right", "top", "bottom"] as const).map((s) => (
            <Button key={s} variant="ghost" onClick={() => setSide(s)}>
              {s}
            </Button>
          ))}
        </div>
        <Sheet open={side !== null} onOpenChange={() => setSide(null)} side={side ?? "right"}>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>From the {side}</SheetTitle>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </>
    );
  },
};

/** A short form in a drawer. `SheetFooter` pins the actions to the bottom of the panel. */
export const WithForm: Story = {
  render: function WithFormStory() {
    const [open, setOpen] = React.useState(false);
    return (
      <>
        <Button variant="solid" onClick={() => setOpen(true)}>
          Filters
        </Button>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
              <SheetDescription>Narrow the list down.</SheetDescription>
            </SheetHeader>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="sheet-q">Search</Label>
                <Input id="sheet-q" placeholder="Project name" />
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button variant="ghost">Cancel</Button>
              </SheetClose>
              <Button variant="solid">Apply</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </>
    );
  },
};

/**
 * The panel surface across both themes. Like `Dialog`'s equivalent, the content
 * is rendered inline rather than as a live sheet — a real one lives in the top
 * layer, above everything, so it can't sit inside a split pane.
 */
export const LightDark: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <ThemeSplit>
      <div className="flex w-full max-w-xs flex-col gap-6">
        <Button variant="solid">Filters</Button>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
            <SheetDescription>Narrow the list down.</SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-2">
            <Label htmlFor="ld-sheet-q">Search</Label>
            <Input id="ld-sheet-q" placeholder="Project name" />
          </div>
          <SheetFooter>
            <Button variant="ghost">Cancel</Button>
            <Button variant="solid">Apply</Button>
          </SheetFooter>
        </SheetContent>
      </div>
    </ThemeSplit>
  ),
};
