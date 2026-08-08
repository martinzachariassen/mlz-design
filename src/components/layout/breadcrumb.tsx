import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import { cn } from "../../lib/cn";
import { ChevronRightIcon } from "../../lib/icons";
import { named } from "../../lib/named";

/**
 * The trail back up from where you are — an article to its section to the index.
 *
 * It's a `<nav>` wrapping an ordered list, because the order *is* the meaning.
 * The last item is the current page: mark it with `BreadcrumbPage`, not a link
 * to itself.
 *
 * **Use it when the hierarchy is real and more than two levels deep.** A
 * two-level trail is a back link wearing a costume, and on a flat site a
 * breadcrumb invents a structure that doesn't exist. It's orientation, not
 * navigation — it tells someone where they are, so it shouldn't be the only way
 * to reach a section.
 *
 * ```tsx
 * <Breadcrumb>
 *   <BreadcrumbList>
 *     <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbItem><BreadcrumbPage>Colour</BreadcrumbPage></BreadcrumbItem>
 *   </BreadcrumbList>
 * </Breadcrumb>
 * ```
 */
export const Breadcrumb = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<
    HTMLElement,
    React.ComponentPropsWithoutRef<"nav"> & { separator?: React.ReactNode }
  >(({ className, ...props }, ref) => (
    <nav
      ref={ref}
      aria-label="Breadcrumb"
      data-slot="breadcrumb"
      className={cn(className)}
      {...props}
    />
  )),
  "Breadcrumb",
);

/** The `<ol>`. Wraps onto a second line rather than overflowing on narrow screens. */
export const BreadcrumbList = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<HTMLOListElement, React.ComponentPropsWithoutRef<"ol">>(
    ({ className, ...props }, ref) => (
      <ol
        ref={ref}
        data-slot="breadcrumb-list"
        className={cn(
          "flex flex-wrap items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground",
          className,
        )}
        {...props}
      />
    ),
  ),
  "BreadcrumbList",
);

/** One step in the trail. */
export const BreadcrumbItem = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<HTMLLIElement, React.ComponentPropsWithoutRef<"li">>(
    ({ className, ...props }, ref) => (
      <li
        ref={ref}
        data-slot="breadcrumb-item"
        className={cn("inline-flex items-center gap-1.5", className)}
        {...props}
      />
    ),
  ),
  "BreadcrumbItem",
);

export interface BreadcrumbLinkProps extends React.ComponentPropsWithoutRef<"a"> {
  /** Render your router's link component instead of an `<a>`. */
  asChild?: boolean;
}

/** A link to an ancestor. Use `asChild` to hand off to a router link. */
export const BreadcrumbLink = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
    ({ className, asChild, ...props }, ref) => {
      const Comp = asChild ? Slot : "a";
      return (
        <Comp
          ref={ref}
          data-slot="breadcrumb-link"
          className={cn(
            "rounded-[var(--radius-sm)] transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30",
            className,
          )}
          {...props}
        />
      );
    },
  ),
  "BreadcrumbLink",
);

/**
 * The page you're on. Not a link — `aria-current="page"` is what tells assistive
 * tech this is the destination, and linking a page to itself is a dead end.
 */
export const BreadcrumbPage = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<HTMLSpanElement, React.ComponentPropsWithoutRef<"span">>(
    ({ className, ...props }, ref) => (
      <span
        ref={ref}
        // `role="link"` + `aria-disabled` is the shadcn idiom here; a plain span with
        // aria-current says the same thing without pretending to be a link.
        aria-current="page"
        data-slot="breadcrumb-page"
        className={cn("text-foreground", className)}
        {...props}
      />
    ),
  ),
  "BreadcrumbPage",
);

/**
 * The chevron between steps. Decorative — the list order already carries the
 * relationship, so it's hidden from assistive tech.
 */
export function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"li">) {
  return (
    <li
      aria-hidden="true"
      data-slot="breadcrumb-separator"
      className={cn("[&>svg]:size-3 text-muted-foreground-2", className)}
      {...props}
    >
      {children ?? <ChevronRightIcon />}
    </li>
  );
}

/**
 * A collapsed run of middle steps, for a deep trail on a narrow screen. Pair it
 * with a `DropdownMenu` if the hidden steps need to stay reachable.
 */
export function BreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"span">) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      className={cn("flex size-5 items-center justify-center", className)}
      {...props}
    >
      <span aria-hidden="true">…</span>
      <span className="sr-only">More</span>
    </span>
  );
}
