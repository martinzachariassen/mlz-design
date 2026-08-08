import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/cn";

const emptyStateVariants = cva(
  "flex flex-col items-center justify-center gap-4 rounded-[var(--radius-lg)] text-center",
  {
    variants: {
      variant: {
        /** A dashed outline — reads as a slot waiting to be filled. */
        dashed: "border border-dashed border-border",
        /** A plain hairline panel, for a list that is empty rather than unstarted. */
        outline: "border border-border",
        /** No container at all, for an empty state already inside a `Card`. */
        plain: "",
      },
      size: {
        sm: "px-6 py-8",
        default: "px-6 py-16",
      },
    },
    defaultVariants: { variant: "dashed", size: "default" },
  },
);

export interface EmptyStateProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof emptyStateVariants> {}

/**
 * What a list, table or panel shows when it has nothing in it.
 *
 * An empty state is not an error, and it is not decoration — it is the one
 * moment where you can tell someone what this thing is *for*. Say what would be
 * here, then give them the action that puts something here.
 *
 * **Use it for zero results and unstarted work.** **Reach for `Alert`** when
 * something went wrong — an empty state that says "Couldn't load" is a failure
 * wearing the wrong clothes, and it hides the retry. **Reach for `Skeleton`**
 * while data is still arriving: showing "No projects yet" during a fetch is a
 * lie that lasts just long enough to be believed.
 *
 * ```tsx
 * <EmptyState>
 *   <EmptyStateMedia>
 *     <BrandMark variant="glyph" size={28} className="text-accent" />
 *   </EmptyStateMedia>
 *   <EmptyStateTitle>No projects yet</EmptyStateTitle>
 *   <EmptyStateDescription>
 *     Spin one up from a template, or import an existing repo.
 *   </EmptyStateDescription>
 *   <EmptyStateActions>
 *     <Button variant="solid">New project</Button>
 *     <Button>Import</Button>
 *   </EmptyStateActions>
 * </EmptyState>
 * ```
 */
export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, variant, size, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="empty-state"
      className={cn(emptyStateVariants({ variant, size }), className)}
      {...props}
    />
  ),
);
EmptyState.displayName = "EmptyState";

/**
 * The tile that holds an icon or brand mark. Decorative by definition — whatever
 * goes inside should be `aria-hidden`, because the title already carries the
 * meaning.
 */
export const EmptyStateMedia = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    aria-hidden="true"
    data-slot="empty-state-media"
    className={cn(
      "flex size-14 items-center justify-center rounded-[var(--radius-lg)] border border-border bg-accent-subtle",
      className,
    )}
    {...props}
  />
));
EmptyStateMedia.displayName = "EmptyStateMedia";

export interface EmptyStateTitleProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /** Render as a real heading when the empty state owns a region of the page. */
  as?: "p" | "h2" | "h3" | "h4";
}

/**
 * The headline. Name what is missing, not the fact that something is.
 *
 * Renders a `<p>` by default, because an empty state is usually *inside* a
 * region that already has a heading. Set `as` when it owns the region itself —
 * a whole-page empty state should be an `h2`, not a paragraph in disguise.
 */
export const EmptyStateTitle = React.forwardRef<HTMLParagraphElement, EmptyStateTitleProps>(
  ({ as: Comp = "p", className, ...props }, ref) => (
    <Comp
      ref={ref}
      data-slot="empty-state-title"
      className={cn(
        "font-mono text-sm font-bold uppercase tracking-[0.1em] text-foreground",
        className,
      )}
      {...props}
    />
  ),
);
EmptyStateTitle.displayName = "EmptyStateTitle";

/** One or two sentences: what would live here, and how it gets here. */
export const EmptyStateDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    data-slot="empty-state-description"
    className={cn("max-w-xs text-sm leading-relaxed text-muted-foreground", className)}
    {...props}
  />
));
EmptyStateDescription.displayName = "EmptyStateDescription";

/** The action row. One primary way out, at most one secondary beside it. */
export const EmptyStateActions = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="empty-state-actions"
    className={cn("flex flex-wrap items-center justify-center gap-3", className)}
    {...props}
  />
));
EmptyStateActions.displayName = "EmptyStateActions";

export { emptyStateVariants };
