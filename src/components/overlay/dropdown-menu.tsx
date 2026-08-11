import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import * as React from "react";
import { cn } from "../../lib/cn";
import { CheckIcon, ChevronRightIcon, DotIcon } from "../../lib/icons";
import { named } from "../../lib/named";

/** Shared by the menu surface and its submenus so they can't drift apart. */
const surface = /* @__PURE__ */ cn(
  "z-50 min-w-[10rem] overflow-hidden rounded-[var(--radius-lg)] border border-border bg-popover p-1 text-popover-foreground shadow-[var(--shadow-lg)]",
  "motion-safe:animate-rise",
);

/** Shared by every row: item, checkbox item, radio item, submenu trigger. */
const row = /* @__PURE__ */ cn(
  "relative flex cursor-pointer select-none items-center gap-2 rounded-[var(--radius-sm)] px-2 py-1.5 text-sm outline-none transition-colors",
  "focus:bg-accent-subtle focus:text-foreground data-[highlighted]:bg-accent-subtle data-[highlighted]:text-foreground",
  "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
  "[&_svg]:size-4 [&_svg]:shrink-0",
);

export type DropdownMenuProps = React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Root>;

/**
 * A menu of **actions** hanging off a button — row actions, an overflow "…"
 * menu, an account menu.
 *
 * **It's for verbs, not values.** If the user is picking a value that stays
 * chosen and belongs to a form, that's `Select`; if they're choosing one of a
 * few visible options, that's `RadioGroup`. The checkbox and radio items here
 * are for view state you toggle *from* a menu (which columns to show, how to
 * sort), not for form fields.
 *
 * If a menu grows past roughly a dozen rows, or its items need descriptions, it
 * has outgrown the pattern — use a page or a dialog.
 *
 * ```tsx
 * <DropdownMenu>
 *   <DropdownMenuTrigger asChild>
 *     <Button variant="ghost">Actions</Button>
 *   </DropdownMenuTrigger>
 *   <DropdownMenuContent>
 *     <DropdownMenuLabel>Deployment</DropdownMenuLabel>
 *     <DropdownMenuItem onSelect={redeploy}>Redeploy</DropdownMenuItem>
 *     <DropdownMenuSeparator />
 *     <DropdownMenuItem variant="destructive" onSelect={remove}>Delete</DropdownMenuItem>
 *   </DropdownMenuContent>
 * </DropdownMenu>
 * ```
 */
export function DropdownMenu(props: DropdownMenuProps) {
  return <DropdownMenuPrimitive.Root {...props} />;
}

/** The control that opens the menu. Pass `asChild` to use a `Button`. */
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

/** Groups related rows. Pair with a `DropdownMenuLabel` to name the group. */
export const DropdownMenuGroup = DropdownMenuPrimitive.Group;

/** Wraps `DropdownMenuRadioItem`s and owns the chosen `value`. */
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

export interface DropdownMenuContentProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content> {}

/** The menu surface. Portalled, so no ancestor `overflow: hidden` can clip it. */
export const DropdownMenuContent = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<
    React.ComponentRef<typeof DropdownMenuPrimitive.Content>,
    DropdownMenuContentProps
  >(({ className, sideOffset = 6, ...props }, ref) => (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        collisionPadding={8}
        data-slot="dropdown-menu-content"
        className={cn(surface, className)}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )),
  "DropdownMenuContent",
);

export interface DropdownMenuItemProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> {
  /** `destructive` tints the row for actions that lose data. */
  variant?: "default" | "destructive";
  /** Indent to line up with rows that carry a tick or a dot. */
  inset?: boolean;
}

/** One action. Use `onSelect`, not `onClick` — it fires for Enter and Space too. */
export const DropdownMenuItem = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<
    React.ComponentRef<typeof DropdownMenuPrimitive.Item>,
    DropdownMenuItemProps
  >(({ className, variant = "default", inset, ...props }, ref) => (
    <DropdownMenuPrimitive.Item
      ref={ref}
      data-slot="dropdown-menu-item"
      data-variant={variant}
      className={cn(
        row,
        inset && "pl-8",
        variant === "destructive" &&
          "text-destructive-deep focus:bg-destructive-subtle focus:text-destructive-deep data-[highlighted]:bg-destructive-subtle data-[highlighted]:text-destructive-deep",
        className,
      )}
      {...props}
    />
  )),
  "DropdownMenuItem",
);

/** A row that toggles. The tick occupies a reserved column, so rows stay aligned. */
export const DropdownMenuCheckboxItem = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<
    React.ComponentRef<typeof DropdownMenuPrimitive.CheckboxItem>,
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
  >(({ className, children, ...props }, ref) => (
    <DropdownMenuPrimitive.CheckboxItem
      ref={ref}
      data-slot="dropdown-menu-checkbox-item"
      className={cn(row, "pl-8", className)}
      {...props}
    >
      <span className="absolute left-2 flex size-4 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon className="size-3.5 text-accent-deep" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  )),
  "DropdownMenuCheckboxItem",
);

/** One choice within a `DropdownMenuRadioGroup`. */
export const DropdownMenuRadioItem = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<
    React.ComponentRef<typeof DropdownMenuPrimitive.RadioItem>,
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
  >(({ className, children, ...props }, ref) => (
    <DropdownMenuPrimitive.RadioItem
      ref={ref}
      data-slot="dropdown-menu-radio-item"
      className={cn(row, "pl-8", className)}
      {...props}
    >
      <span className="absolute left-2 flex size-4 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <DotIcon className="text-accent-deep" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  )),
  "DropdownMenuRadioItem",
);

export interface DropdownMenuLabelProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> {
  /** Indent to line up with rows that carry a tick or a dot. */
  inset?: boolean;
}

/** A section heading in the mlz eyebrow voice. Not selectable. */
export const DropdownMenuLabel = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<
    React.ComponentRef<typeof DropdownMenuPrimitive.Label>,
    DropdownMenuLabelProps
  >(({ className, inset, ...props }, ref) => (
    <DropdownMenuPrimitive.Label
      ref={ref}
      data-slot="dropdown-menu-label"
      className={cn(
        "px-2 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground",
        inset && "pl-8",
        className,
      )}
      {...props}
    />
  )),
  "DropdownMenuLabel",
);

/** A hairline rule between groups of rows. */
export const DropdownMenuSeparator = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<
    React.ComponentRef<typeof DropdownMenuPrimitive.Separator>,
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
  >(({ className, ...props }, ref) => (
    <DropdownMenuPrimitive.Separator
      ref={ref}
      data-slot="dropdown-menu-separator"
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  )),
  "DropdownMenuSeparator",
);

/**
 * The keyboard hint pushed to the right of a row — purely decorative, so it's
 * hidden from assistive tech. It labels the shortcut, it doesn't bind it.
 */
export function DropdownMenuShortcut({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      aria-hidden="true"
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "ml-auto pl-4 font-mono text-[10px] tracking-[0.14em] text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

/** Wraps a submenu — a `DropdownMenuSubTrigger` plus a `DropdownMenuSubContent`. */
export const DropdownMenuSub = DropdownMenuPrimitive.Sub;

/** The row that opens a submenu. Carries its own caret. */
export const DropdownMenuSubTrigger = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<
    React.ComponentRef<typeof DropdownMenuPrimitive.SubTrigger>,
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & { inset?: boolean }
  >(({ className, inset, children, ...props }, ref) => (
    <DropdownMenuPrimitive.SubTrigger
      ref={ref}
      data-slot="dropdown-menu-sub-trigger"
      className={cn(row, "data-[state=open]:bg-accent-subtle", inset && "pl-8", className)}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto text-muted-foreground" />
    </DropdownMenuPrimitive.SubTrigger>
  )),
  "DropdownMenuSubTrigger",
);

/** The submenu surface. */
export const DropdownMenuSubContent = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<
    React.ComponentRef<typeof DropdownMenuPrimitive.SubContent>,
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
  >(({ className, ...props }, ref) => (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.SubContent
        ref={ref}
        collisionPadding={8}
        data-slot="dropdown-menu-sub-content"
        className={cn(surface, className)}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )),
  "DropdownMenuSubContent",
);
