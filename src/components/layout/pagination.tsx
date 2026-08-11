import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/cn";
import { ChevronLeftIcon, ChevronRightIcon } from "../../lib/icons";
import { named } from "../../lib/named";

const paginationLinkVariants = /* @__PURE__ */ cva(
  "inline-flex h-9 min-w-9 items-center justify-center gap-1.5 rounded-[var(--radius-sm)] px-2.5 font-mono text-[11px] uppercase tracking-[0.1em] transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30 [&_svg]:size-3.5",
  {
    variants: {
      active: {
        true: "border-[1.5px] border-accent bg-accent-subtle text-foreground",
        false: "border-[1.5px] border-transparent text-muted-foreground hover:text-foreground",
      },
    },
    defaultVariants: { active: false },
  },
);

/**
 * Page-by-page navigation for a long list — a blog index, search results.
 *
 * It's a `<nav>` around a list of links, so each page is a real URL someone can
 * bookmark, share and open in a new tab. That's the whole reason to prefer it
 * over "load more": infinite scroll has no address for page 4, and no end.
 *
 * **Use it when the reader might want to come back to a position, or when the
 * total matters.** For a feed nobody returns to, "load more" is friendlier. For
 * a handful of items, don't paginate at all.
 *
 * Wire the arrows to real URLs too, and drop `href` on `PaginationPrevious` /
 * `PaginationNext` at the ends rather than rendering a dead link.
 *
 * ```tsx
 * <Pagination>
 *   <PaginationContent>
 *     <PaginationItem><PaginationPrevious href="/blog?page=1" /></PaginationItem>
 *     <PaginationItem><PaginationLink href="/blog?page=1">1</PaginationLink></PaginationItem>
 *     <PaginationItem><PaginationLink href="/blog?page=2" isActive>2</PaginationLink></PaginationItem>
 *     <PaginationItem><PaginationNext href="/blog?page=3" /></PaginationItem>
 *   </PaginationContent>
 * </Pagination>
 * ```
 */
export function Pagination({ className, ...props }: React.ComponentPropsWithoutRef<"nav">) {
  return (
    <nav
      aria-label="Pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

/** The list of pages. */
export const PaginationContent = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<HTMLUListElement, React.ComponentPropsWithoutRef<"ul">>(
    ({ className, ...props }, ref) => (
      <ul
        ref={ref}
        data-slot="pagination-content"
        className={cn("flex flex-wrap items-center gap-1", className)}
        {...props}
      />
    ),
  ),
  "PaginationContent",
);

/** One slot in the list — a page link, an arrow, or an ellipsis. */
export const PaginationItem = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<HTMLLIElement, React.ComponentPropsWithoutRef<"li">>(
    ({ className, ...props }, ref) => (
      <li ref={ref} data-slot="pagination-item" className={cn(className)} {...props} />
    ),
  ),
  "PaginationItem",
);

export interface PaginationLinkProps
  extends React.ComponentPropsWithoutRef<"a">,
    VariantProps<typeof paginationLinkVariants> {
  /** Marks the page you're on — sets `aria-current="page"`. */
  isActive?: boolean;
  /** Render your router's link component instead of an `<a>`. */
  asChild?: boolean;
}

/** A numbered page link. */
export const PaginationLink = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<HTMLAnchorElement, PaginationLinkProps>(
    ({ className, isActive, asChild, ...props }, ref) => {
      const Comp = asChild ? Slot : "a";
      return (
        <Comp
          ref={ref}
          // The current page still needs to be a link — it's where you are, and
          // `aria-current` is what distinguishes it, not a disabled state.
          aria-current={isActive ? "page" : undefined}
          data-slot="pagination-link"
          className={cn(paginationLinkVariants({ active: Boolean(isActive) }), className)}
          {...props}
        />
      );
    },
  ),
  "PaginationLink",
);

/**
 * The back arrow. Omit `href` on the first page — a link that goes nowhere is
 * worse than no link.
 */
export function PaginationPrevious({
  className,
  children = "Prev",
  ...props
}: PaginationLinkProps) {
  return (
    <PaginationLink aria-label="Go to previous page" className={cn("px-3", className)} {...props}>
      <ChevronLeftIcon />
      {children}
    </PaginationLink>
  );
}

/** The forward arrow. Omit `href` on the last page. */
export function PaginationNext({ className, children = "Next", ...props }: PaginationLinkProps) {
  return (
    <PaginationLink aria-label="Go to next page" className={cn("px-3", className)} {...props}>
      {children}
      <ChevronRightIcon />
    </PaginationLink>
  );
}

/** A gap in the page run. Decorative, but keeps a name for screen readers. */
export function PaginationEllipsis({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"span">) {
  return (
    <span
      data-slot="pagination-ellipsis"
      className={cn("flex h-9 w-9 items-center justify-center text-muted-foreground-2", className)}
      {...props}
    >
      <span aria-hidden="true">…</span>
      <span className="sr-only">More pages</span>
    </span>
  );
}

export { paginationLinkVariants };
