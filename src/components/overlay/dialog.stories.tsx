import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
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
} from "./dialog";

const meta = {
  title: "Components/Overlay/Dialog",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A modal dialog built on the native `<dialog>` element — focus trapping, the Esc key, " +
          "background inerting and the top layer all come from the platform, with no dependency. " +
          "It is controlled: drive `open` / `onOpenChange` yourself, and clicking the backdrop " +
          "closes it.\n\n" +
          "Compose it from `DialogContent` (the card surface and the ✕ button), `DialogHeader` " +
          "with `DialogTitle` + `DialogDescription`, and `DialogFooter` for actions. `DialogClose` " +
          "with `asChild` turns any control into a dismiss button. Children only mount while the " +
          "dialog is open, so a form inside starts fresh every time.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/** The everyday form dialog. `autoFocus` on the first field is what the native `<dialog>` focus trap picks up. */
export const Default: Story = {
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

/** A confirm step. Say what will be destroyed in the description, and keep Cancel first in the source — the footer reverses on mobile so the confirm lands on top. */
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
