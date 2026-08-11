import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cva } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/cn";
import { ChevronDownIcon } from "../../lib/icons";
import { named } from "../../lib/named";

export type NavigationMenuProps = React.ComponentPropsWithoutRef<
  typeof NavigationMenuPrimitive.Root
>;

/**
 * Top-level app navigation on the Radix primitive: a horizontal bar of links
 * and hover/focus-opened panels, with the full keyboard pattern (arrows between
 * triggers, Esc closes, focus wraps into the panel) supplied by Radix.
 *
 * **Use it for the primary nav of an app shell** — the place the application
 * shell pattern used to hand-roll out of `Button`s. **Reach for `Tabs`** when
 * the "navigation" switches content in place rather than routes, for
 * `DropdownMenu` when the entries are actions, and for `Breadcrumb` for the
 * trail back up. Simple link rows don't need panels at all: use
 * `NavigationMenuLink` alone with `navigationMenuTriggerStyle()`.
 *
 * ```tsx
 * <NavigationMenu>
 *   <NavigationMenuList>
 *     <NavigationMenuItem>
 *       <NavigationMenuTrigger>Projects</NavigationMenuTrigger>
 *       <NavigationMenuContent>…panel…</NavigationMenuContent>
 *     </NavigationMenuItem>
 *     <NavigationMenuItem>
 *       <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
 *         <a href="/about">About</a>
 *       </NavigationMenuLink>
 *     </NavigationMenuItem>
 *   </NavigationMenuList>
 * </NavigationMenu>
 * ```
 */
export const NavigationMenu = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<
    React.ComponentRef<typeof NavigationMenuPrimitive.Root>,
    NavigationMenuProps
  >(({ className, children, ...props }, ref) => (
    <NavigationMenuPrimitive.Root
      ref={ref}
      data-slot="navigation-menu"
      className={cn("relative z-10 flex max-w-max flex-1 items-center justify-center", className)}
      {...props}
    >
      {children}
      <NavigationMenuViewport />
    </NavigationMenuPrimitive.Root>
  )),
  "NavigationMenu",
);

/** The horizontal row of items. */
export const NavigationMenuList = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<
    React.ComponentRef<typeof NavigationMenuPrimitive.List>,
    React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
  >(({ className, ...props }, ref) => (
    <NavigationMenuPrimitive.List
      ref={ref}
      data-slot="navigation-menu-list"
      className={cn("group flex flex-1 list-none items-center justify-center gap-1", className)}
      {...props}
    />
  )),
  "NavigationMenuList",
);

/** One slot in the bar — holds a trigger + content pair, or a bare link. */
export const NavigationMenuItem = NavigationMenuPrimitive.Item;

/**
 * The shared look of a bar entry, exported so a plain `NavigationMenuLink`
 * (no panel) sits flush beside real triggers.
 */
export const navigationMenuTriggerStyle = /* @__PURE__ */ cva(
  "group inline-flex h-9 w-max items-center justify-center gap-1 rounded-[var(--radius-sm)] px-3 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-muted data-[state=open]:text-foreground",
);

/** Opens this item's panel. The chevron flips while open. */
export const NavigationMenuTrigger = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<
    React.ComponentRef<typeof NavigationMenuPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
  >(({ className, children, ...props }, ref) => (
    <NavigationMenuPrimitive.Trigger
      ref={ref}
      data-slot="navigation-menu-trigger"
      className={cn(navigationMenuTriggerStyle(), className)}
      {...props}
    >
      {children}
      <ChevronDownIcon
        aria-hidden="true"
        className="size-3 transition-transform duration-200 ease-[var(--ease-out)] group-data-[state=open]:rotate-180 motion-reduce:transition-none"
      />
    </NavigationMenuPrimitive.Trigger>
  )),
  "NavigationMenuTrigger",
);

/** The panel a trigger opens. Size it with width utilities on your inner layout. */
export const NavigationMenuContent = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<
    React.ComponentRef<typeof NavigationMenuPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
  >(({ className, ...props }, ref) => (
    <NavigationMenuPrimitive.Content
      ref={ref}
      data-slot="navigation-menu-content"
      className={cn("p-2 md:absolute md:w-auto", className)}
      {...props}
    />
  )),
  "NavigationMenuContent",
);

/**
 * A link in the bar or inside a panel. Radix wires `aria-current`-style
 * highlighting through the `active` prop; pass `asChild` to hand navigation to
 * your router's Link.
 */
export const NavigationMenuLink = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<
    React.ComponentRef<typeof NavigationMenuPrimitive.Link>,
    React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Link>
  >(({ className, ...props }, ref) => (
    <NavigationMenuPrimitive.Link
      ref={ref}
      data-slot="navigation-menu-link"
      className={cn(
        "block rounded-[var(--radius-sm)] px-3 py-2 text-sm text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30 data-[active=true]:bg-accent-subtle data-[active=true]:text-foreground",
        className,
      )}
      {...props}
    />
  )),
  "NavigationMenuLink",
);

/** Where open panels render, centred under the bar. Included by `NavigationMenu`. */
const NavigationMenuViewport = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<
    React.ComponentRef<typeof NavigationMenuPrimitive.Viewport>,
    React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
  >(({ className, ...props }, ref) => (
    <div className="absolute top-full left-0 isolate z-50 flex w-full justify-center">
      <NavigationMenuPrimitive.Viewport
        ref={ref}
        data-slot="navigation-menu-viewport"
        className={cn(
          "relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full origin-top-center overflow-hidden rounded-[var(--radius-lg)] border border-border bg-popover text-popover-foreground shadow-[var(--shadow-lg)] md:w-[var(--radix-navigation-menu-viewport-width)]",
          "motion-safe:animate-rise",
          className,
        )}
        {...props}
      />
    </div>
  )),
  "NavigationMenuViewport",
);
