import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { expect, userEvent, within } from "storybook/test";
import { ThemeSplit } from "../../foundations/theme-split";
import { Button } from "../forms/button";
import { Input } from "../forms/input";
import { Label } from "../forms/label";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";

const meta = {
  title: "Components/Overlay/Dialog",
  component: Dialog,
  // The description comes from the component's own JSDoc via docgen — one source
  // of truth, so it can't drift from the implementation the way a copy here did.
  subcomponents: {
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
  },
  tags: ["autodocs"],
  // Every story here renders its own trigger + dialog pair, so `args` are never
  // read — but naming `component` makes Storybook infer them as required. Supply
  // the empty case and keep it out of the controls table.
  args: { children: null },
  argTypes: { children: { table: { disable: true } } },
  parameters: { layout: "centered" },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The everyday form dialog. `autoFocus` on the first field is what the native `<dialog>` focus trap picks up. */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: /New project/ }));
    await expect(await within(document.body).findByRole("dialog")).toBeInTheDocument();
  },
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <>
        <Button variant="solid" onClick={() => setOpen(true)}>
          New project
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New project</DialogTitle>
              <DialogDescription>
                Give it a name — you can change everything later.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-1.5">
              <Label htmlFor="project-name">Name</Label>
              <Input id="project-name" placeholder="aurora" autoFocus />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="ghost">Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button variant="solid">Create</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
  },
};

/** A confirm step. Say what will be destroyed in the description, and keep Cancel first in the source — the footer reverses on mobile so the confirm lands on top. */
/**
 * The self-contained form: `DialogTrigger` opens it, `DialogClose`/Esc close
 * it, and no consumer state is involved. Reach for the controlled form only
 * when something else needs to know the dialog is open.
 */
export const Uncontrolled: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Show details</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Details</DialogTitle>
          <DialogDescription>Opened without any useState on the call site.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Done</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const Destructive: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <>
        <Button variant="destructive" onClick={() => setOpen(true)}>
          Delete
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Delete project</DialogTitle>
              <DialogDescription>
                This permanently removes <span className="text-foreground">aurora</span> and its
                history. This can't be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="ghost">Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button variant="destructive">Delete</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
  },
};

/**
 * The trigger and dialog surface across both themes. The content is rendered
 * inline (not as a live modal) so both panes show the card styling at a glance.
 */
export const LightDark: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <ThemeSplit>
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Button variant="solid">New project</Button>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New project</DialogTitle>
            <DialogDescription>Give it a name — you can change everything later.</DialogDescription>
          </DialogHeader>
          <div className="space-y-1.5">
            <Label htmlFor="ld-project-name">Name</Label>
            <Input id="ld-project-name" placeholder="aurora" />
          </div>
          <DialogFooter>
            <Button variant="ghost">Cancel</Button>
            <Button variant="solid">Create</Button>
          </DialogFooter>
        </DialogContent>
      </div>
    </ThemeSplit>
  ),
};
