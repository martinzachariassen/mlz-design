import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { BrandMark } from "../../components/brand/brand-mark";
import { Alert, AlertDescription, AlertTitle } from "../../components/feedback/alert";
import {
  EmptyState,
  EmptyStateActions,
  EmptyStateDescription,
  EmptyStateMedia,
  EmptyStateTitle,
} from "../../components/feedback/empty-state";
import { Skeleton } from "../../components/feedback/skeleton";
import { Toaster, toast } from "../../components/feedback/toaster";
import { Button } from "../../components/forms/button";
import { Card, CardContent } from "../../components/layout/card";
import { Separator } from "../../components/layout/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../components/overlay/alert-dialog";

const meta = {
  title: "Patterns/Feedback and states",
  tags: ["!autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/** The four signals, each with a title that says what happened and a line that says what to do. */
export const Alerts: Story = {
  render: () => (
    <div className="grid max-w-3xl gap-4 md:grid-cols-2">
      <Alert variant="info">
        <AlertTitle>Heads up</AlertTitle>
        <AlertDescription>A new accent family shipped — try it in the toolbar.</AlertDescription>
      </Alert>
      <Alert variant="success">
        <AlertTitle>Deployed</AlertTitle>
        <AlertDescription>v0.4.0 is live on Cloudflare. All checks green.</AlertDescription>
      </Alert>
      <Alert variant="warning">
        <AlertTitle>Approaching limit</AlertTitle>
        <AlertDescription>You've used 82% of the monthly build minutes.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertTitle>Build failed</AlertTitle>
        <AlertDescription>Type error in social-card.tsx — see the run log.</AlertDescription>
      </Alert>
    </div>
  ),
};

/**
 * Nothing here yet. **An empty state is the one moment where you can say what
 * this thing is for** — name what would be here, then give the action that puts
 * something here.
 *
 * "No matches" is a different message from "nothing exists": it offers the way
 * back, not a way to create.
 */
export const EmptyStates: Story = {
  render: () => (
    <div className="flex w-full max-w-xl flex-col gap-8">
      <EmptyState>
        <EmptyStateMedia>
          <BrandMark variant="glyph" size={28} className="text-accent-deep" />
        </EmptyStateMedia>
        <EmptyStateTitle>No projects yet</EmptyStateTitle>
        <EmptyStateDescription>
          Spin one up from a template, or import an existing repo to get started.
        </EmptyStateDescription>
        <EmptyStateActions>
          <Button variant="solid" size="sm">
            New project
          </Button>
          <Button size="sm">Import</Button>
        </EmptyStateActions>
      </EmptyState>

      <EmptyState variant="outline" size="sm">
        <EmptyStateTitle>No matches for "aurora"</EmptyStateTitle>
        <EmptyStateDescription>
          Try a shorter search, or clear the filters you have on.
        </EmptyStateDescription>
        <EmptyStateActions>
          <Button size="sm">Clear filters</Button>
        </EmptyStateActions>
      </EmptyState>
    </div>
  ),
};

/**
 * While the data is on its way. **Skeletons mirror the shape of what is coming**,
 * so the layout doesn't jump when it lands — and they say nothing to assistive
 * tech, because reading out a wall of grey boxes helps nobody. Announce the
 * loading state on the region instead — `role="status"` plus `aria-busy`, as
 * here. An `aria-label` on a bare `<div>` does nothing: with no role, there is
 * nothing for the name to attach to.
 *
 * Showing "No projects yet" during a fetch is a lie that lasts just long enough
 * to be believed.
 */
export const LoadingSkeletons: Story = {
  render: () => (
    // `role="status"` is what makes this announceable: `aria-label` on a bare
    // <div> is prohibited (axe: aria-prohibited-attr) because there is no role
    // for the name to attach to. The role also makes it a polite live region,
    // so the arrival of the real content is announced too.
    <Card role="status" aria-busy="true" aria-label="Loading activity" className="w-[26rem]">
      <CardContent className="p-0">
        {[0, 1, 2].map((i) => (
          <div key={i}>
            {i > 0 && <Separator />}
            <div className="flex items-center gap-3 px-5 py-3.5">
              <Skeleton className="size-8 shrink-0 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-3 w-32" />
                <Skeleton className="h-3 w-48" />
              </div>
              <Skeleton className="h-5 w-16" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  ),
};

/**
 * The confirm before something irreversible. Try clicking outside it — nothing
 * happens, and there is no ✕. Cancel holds focus, so Enter on a dialog you
 * haven't read is safe.
 *
 * **Reach for this rarely.** If every delete raises a confirm, people stop
 * reading them and dismiss the one that mattered along with the rest. The better
 * answer is usually to do it and offer an undo — which is what the toast here is.
 */
export const ConfirmDestructive: Story = {
  render: function ConfirmStory() {
    const [open, setOpen] = React.useState(false);
    return (
      <div className="flex flex-col items-center gap-5">
        <Button variant="destructive" size="sm" onClick={() => setOpen(true)}>
          Delete project
        </Button>
        <p className="max-w-xs text-center text-[13px] leading-relaxed text-muted-foreground">
          Deleting is irreversible, so it asks. Renaming wouldn't — that one would just happen, with
          an undo.
        </p>

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
        <Toaster />
      </div>
    );
  },
};
