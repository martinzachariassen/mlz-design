import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/cn";
import { named } from "../../lib/named";

const linkVariants = /* @__PURE__ */ cva(
  "rounded-[var(--radius-sm)] transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30",
  {
    variants: {
      variant: {
        /** Underlined in running text, where the underline is what marks it as a link. */
        default:
          "text-foreground underline decoration-border underline-offset-4 hover:decoration-accent-deep hover:text-accent-deep",
        /**
         * Accent-coloured, underline only on hover — **for links that stand
         * alone**, not for links inside a paragraph. In running text the
         * underline is the only thing distinguishing a link from its
         * surroundings, and colour alone fails WCAG 1.4.1 (axe flags it as
         * `link-in-text-block`). Use `default` there.
         *
         * Uses `--accent-deep`, not `--accent`: the plain accent is a
         * fill-and-border colour (cyan measures 1.8:1 on paper) and fails AA as
         * text. `Prose` colours its links the same way.
         */
        subtle: "text-[var(--accent-deep)] hover:underline hover:underline-offset-4",
        /** Muted until hovered, for footers and dense secondary navigation. */
        quiet: "text-muted-foreground hover:text-foreground",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkVariants> {
  /** Hand off to a router's link component while keeping these styles. */
  asChild?: boolean;
  /** Opens in a new tab, with `rel="noopener noreferrer"` and a note for screen readers. */
  external?: boolean;
}

/**
 * A real anchor — navigation, with the system focus ring.
 *
 * **Reach for `Button variant="link"`** when activating it *does* something
 * rather than goes somewhere. That distinction is not cosmetic: a link is
 * middle-clickable, bookmarkable and reachable with Enter, a button responds to
 * Space and can't be opened in a new tab. Users notice when the two are swapped
 * even if they can't say why. If it changes a URL, it is a link.
 *
 * `external` adds `target="_blank"` with `rel="noopener noreferrer"` and an
 * "(opens in a new tab)" note for screen readers — opening a new tab without
 * warning is disorienting for anyone who can't see it happen.
 *
 * Inside `Prose`, ordinary `<a>` elements are already styled; use this for links
 * outside long-form copy.
 *
 * ```tsx
 * <Link href="/work">Selected work</Link>
 * <Link href="https://github.com/…" external variant="subtle">Source</Link>
 * <Link asChild><RouterLink to="/about">About</RouterLink></Link>
 * ```
 */
export const Link = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<HTMLAnchorElement, LinkProps>(
    ({ className, variant, asChild, external, children, target, rel, ...props }, ref) => {
      const Comp = asChild ? Slot : "a";
      return (
        <Comp
          ref={ref}
          data-slot="link"
          target={external ? (target ?? "_blank") : target}
          rel={external ? (rel ?? "noopener noreferrer") : rel}
          className={cn(linkVariants({ variant }), className)}
          {...props}
        >
          {/* `asChild` forwards a single child, so the note can't be appended there. */}
          {asChild ? (
            children
          ) : (
            <>
              {children}
              {/* The separating space is its own text node: a leading space inside
                the span is collapsed away by accessible-name computation, and
                the label comes out as "Sourceopens in a new tab". */}
              {external ? (
                <>
                  {" "}
                  <span className="sr-only">(opens in a new tab)</span>
                </>
              ) : null}
            </>
          )}
        </Comp>
      );
    },
  ),
  "Link",
);

export { linkVariants };
