import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { ThemeSplit } from "../../foundations/theme-split";
import { toast } from "../feedback/toaster";
import { Button } from "../forms/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./alert-dialog";

const meta = {
  title: "Components/Overlay/AlertDialog",
  component: AlertDialog,
  subcomponents: {
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
  },
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: { children: null },
  argTypes: { children: { table: { disable: true } } },
} satisfies Meta<typeof AlertDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Open it and try to click outside — nothing happens. There is no ✕ either. The
 * two ways out are both in the footer, and Cancel has focus, so Enter is safe.
 */
export const Default: Story = {
  render: function DefaultStory() {
    const [open, setOpen] = React.useState(false);
    return (
      <>
        <Button variant="destructive" size="sm" onClick={() => setOpen(true)}>
          Delete project
        </Button>
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete aurora</AlertDialogTitle>
              <AlertDialogDescription>
                This removes the project and its entire deploy history. It can't be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel asChild>
                <Button variant="ghost" size="sm">
                  Cancel
                </Button>
              </AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => toast.success("Project deleted")}
                >
                  Delete
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
  },
};

/**
 * **The comparison worth reading.** `Dialog` is for a task — it has a ✕, the
 * backdrop dismisses, and getting out costs nothing. `AlertDialog` is for an
 * answer, so both of those are removed. Reach for it only when the action can't
 * be undone; if every delete raises a confirm, people stop reading them.
 */
export const VersusDialog: Story = {
  render: () => (
    <div className="max-w-md">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              &nbsp;
            </th>
            <th className="py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              Dialog
            </th>
            <th className="py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              AlertDialog
            </th>
          </tr>
        </thead>
        <tbody className="text-muted-foreground">
          {[
            ["role", "dialog", "alertdialog"],
            ["Backdrop click", "dismisses", "does nothing"],
            ["Close ✕", "yes", "no"],
            ["Esc", "closes", "cancels"],
            ["Initial focus", "platform default", "Cancel"],
          ].map(([label, dialog, alert]) => (
            <tr key={label} className="border-b border-border last:border-0">
              <td className="py-2 pr-4 text-foreground">{label}</td>
              <td className="py-2 pr-4 font-mono text-[13px]">{dialog}</td>
              <td className="py-2 font-mono text-[13px] text-foreground">{alert}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
};

/**
 * An action that can fail. `event.preventDefault()` in the handler keeps the
 * dialog open so the error has somewhere to appear.
 */
export const ActionThatCanFail: Story = {
  render: function ActionThatCanFailStory() {
    const [open, setOpen] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    return (
      <>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => {
            setError(null);
            setOpen(true);
          }}
        >
          Revoke key
        </Button>
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Revoke deploy key</AlertDialogTitle>
              <AlertDialogDescription>
                Any pipeline using this key stops working immediately.
              </AlertDialogDescription>
            </AlertDialogHeader>
            {error ? (
              <p role="alert" className="mt-3 text-[13px] text-[var(--destructive-deep)]">
                {error}
              </p>
            ) : null}
            <AlertDialogFooter>
              <AlertDialogCancel asChild>
                <Button variant="ghost" size="sm">
                  Cancel
                </Button>
              </AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={(event) => {
                    event.preventDefault();
                    setError("The key is in use by 2 running deploys. Stop them first.");
                  }}
                >
                  Revoke
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
  },
};

/**
 * The panel across both themes. Rendered inline rather than as a live dialog —
 * a real one sits in the top layer, above everything, so it can't be contained
 * by a split pane. Same technique as `Dialog` and `Sheet`.
 */
export const LightDark: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <ThemeSplit>
      <div className="w-full max-w-sm">
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete aurora</AlertDialogTitle>
            <AlertDialogDescription>
              This removes the project and its deploy history.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button variant="ghost" size="sm">
              Cancel
            </Button>
            <Button variant="destructive" size="sm">
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </div>
    </ThemeSplit>
  ),
};
