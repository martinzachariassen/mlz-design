import { Command as CommandPrimitive } from "cmdk";
import * as React from "react";
import { cn } from "../../lib/cn";
import { SearchIcon } from "../../lib/icons";
import { named } from "../../lib/named";
import { ModalRoot } from "./modal-root";

export type CommandProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive>;

/**
 * A filterable list of commands — the ⌘K palette, and the engine behind
 * `Combobox`.
 *
 * `cmdk` owns the behaviour: typing filters and re-ranks by fuzzy score, the
 * arrow keys move through *visible* items only, Enter runs the highlighted one,
 * and the whole thing is a `role="listbox"` with the input as its
 * `combobox`. Selection follows the highlight, so there is no separate
 * "confirm" step.
 *
 * **Use it when the list is long enough that scanning beats scrolling** —
 * roughly fifteen options upward, or any list the reader knows the name of but
 * not the position. **Reach for `Select`** below that: a combobox costs a
 * keystroke and a mental "what is this called?" that a visible list doesn't.
 * **Reach for `DropdownMenu`** when the entries are a handful of actions.
 *
 * This is the raw list. `CommandDialog` puts it in a modal for a ⌘K palette;
 * `Combobox` puts it in a popover for a form field.
 *
 * ```tsx
 * <Command>
 *   <CommandInput placeholder="Search…" />
 *   <CommandList>
 *     <CommandEmpty>No results.</CommandEmpty>
 *     <CommandGroup heading="Projects">
 *       <CommandItem onSelect={open}>aurora</CommandItem>
 *     </CommandGroup>
 *   </CommandList>
 * </Command>
 * ```
 */
export const Command = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<React.ComponentRef<typeof CommandPrimitive>, CommandProps>(
    ({ className, ...props }, ref) => (
      <CommandPrimitive
        ref={ref}
        data-slot="command"
        className={cn(
          "flex size-full flex-col overflow-hidden rounded-[var(--radius-lg)] bg-popover text-popover-foreground",
          className,
        )}
        {...props}
      />
    ),
  ),
  "Command",
);

export type CommandInputProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>;

/**
 * The search field. It is the `combobox` the list is attached to, so it should
 * be the only focusable thing above the list — anything else here steals the
 * arrow keys.
 */
export const CommandInput = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<
    React.ComponentRef<typeof CommandPrimitive.Input>,
    CommandInputProps
  >(({ className, ...props }, ref) => (
    <div
      className="flex items-center gap-2.5 border-b border-border px-4"
      data-slot="command-input"
    >
      <SearchIcon className="size-4 shrink-0 text-muted-foreground" />
      <CommandPrimitive.Input
        ref={ref}
        className={cn(
          "h-12 w-full bg-transparent font-mono text-sm text-foreground outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />
    </div>
  )),
  "CommandInput",
);

export type CommandListProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>;

/**
 * The scrolling results. Capped so a long list can't push the palette past the
 * fold; `cmdk` keeps the highlighted item scrolled into view.
 */
export const CommandList = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<
    React.ComponentRef<typeof CommandPrimitive.List>,
    CommandListProps
  >(({ className, ...props }, ref) => {
    // cmdk wraps the list's children in an internal `[cmdk-list-sizer]` div that
    // carries no role. That div is then the *only* child of the `role="listbox"`,
    // which breaks the listbox's required-children contract: the groups and
    // options below it stop being seen as its children at all, so a screen reader
    // announces an empty listbox. Marking the sizer presentational lets the real
    // roles through. (axe: `aria-required-children`, critical.)
    const markSizerPresentational = React.useCallback((node: HTMLDivElement | null) => {
      node?.querySelector("[cmdk-list-sizer]")?.setAttribute("role", "presentation");
    }, []);

    return (
      <CommandPrimitive.List
        ref={(node) => {
          markSizerPresentational(node);
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        data-slot="command-list"
        className={cn("max-h-72 overflow-y-auto overflow-x-hidden p-1.5", className)}
        {...props}
      />
    );
  }),
  "CommandList",
);

export type CommandEmptyProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>;

/**
 * Shown when nothing matches. **Not optional** — an empty palette with no
 * message reads as broken. Say what was searched for if you can.
 */
export const CommandEmpty = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<
    React.ComponentRef<typeof CommandPrimitive.Empty>,
    CommandEmptyProps
  >(({ className, ...props }, ref) => (
    <CommandPrimitive.Empty
      ref={ref}
      data-slot="command-empty"
      className={cn("py-8 text-center text-sm text-muted-foreground", className)}
      {...props}
    />
  )),
  "CommandEmpty",
);

export type CommandGroupProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>;

/**
 * A labelled section. Groups hide themselves when everything inside is filtered
 * out, so the heading never survives its own contents.
 */
export const CommandGroup = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<
    React.ComponentRef<typeof CommandPrimitive.Group>,
    CommandGroupProps
  >(({ className, ...props }, ref) => (
    <CommandPrimitive.Group
      ref={ref}
      data-slot="command-group"
      className={cn(
        "overflow-hidden p-1 text-foreground",
        "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.14em] [&_[cmdk-group-heading]]:text-muted-foreground",
        className,
      )}
      {...props}
    />
  )),
  "CommandGroup",
);

export type CommandItemProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>;

/**
 * One command. `onSelect` fires on Enter and on click alike.
 *
 * Give it a `value` when the visible label isn't what you want searched — the
 * filter matches on `value`, falling back to the text content.
 */
export const CommandItem = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<
    React.ComponentRef<typeof CommandPrimitive.Item>,
    CommandItemProps
  >(({ className, ...props }, ref) => (
    <CommandPrimitive.Item
      ref={ref}
      data-slot="command-item"
      className={cn(
        "relative flex cursor-default select-none items-center gap-2.5 rounded-[var(--radius-sm)] px-2.5 py-2 text-sm outline-none",
        "data-[selected=true]:bg-accent-subtle data-[selected=true]:text-foreground",
        "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
        className,
      )}
      {...props}
    />
  )),
  "CommandItem",
);

export type CommandSeparatorProps = React.ComponentPropsWithoutRef<
  typeof CommandPrimitive.Separator
>;

/**
 * A hairline between groups.
 *
 * Presentational on purpose. cmdk gives it `role="separator"`, but a `listbox`
 * owns only `option` and `group` — a separator among its children breaks the
 * required-children contract (axe: `aria-required-children`, critical). Nothing
 * is lost: the group headings already carry the structure a screen reader needs,
 * and this line only draws it.
 */
export const CommandSeparator = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<
    React.ComponentRef<typeof CommandPrimitive.Separator>,
    CommandSeparatorProps
  >(({ className, ...props }, ref) => (
    <CommandPrimitive.Separator
      // Set on the node rather than as a prop: cmdk writes `role="separator"`
      // *after* its own prop spread, so passing `role` has no effect. Going
      // through the ref also keeps cmdk's behaviour of hiding the rule while a
      // search is active, which re-implementing the element would lose.
      ref={(node: HTMLDivElement | null) => {
        node?.setAttribute("role", "presentation");
        node?.setAttribute("aria-hidden", "true");
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      }}
      data-slot="command-separator"
      className={cn("-mx-1.5 my-1 h-px bg-border", className)}
      {...props}
    />
  )),
  "CommandSeparator",
);

/**
 * The shortcut hint at the right of an item. Decorative — the keystroke has to
 * be bound somewhere real, and this only says so.
 */
export const CommandShortcut = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
    ({ className, ...props }, ref) => (
      <span
        ref={ref}
        data-slot="command-shortcut"
        className={cn(
          "ml-auto font-mono text-[11px] tracking-[0.1em] text-muted-foreground",
          className,
        )}
        {...props}
      />
    ),
  ),
  "CommandShortcut",
);

export interface CommandDialogProps extends CommandProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Names the dialog for assistive tech. Required — the palette has no visible title. */
  label: string;
}

/**
 * The ⌘K palette: a `Command` in a modal.
 *
 * **Built on this system's native `<dialog>`, not on cmdk's own `Command.Dialog`.**
 * That one wraps Radix Dialog, which would mean two modal implementations in one
 * package with different focus-trap and top-layer behaviour. This shares the
 * engine `Dialog`, `Sheet` and `AlertDialog` already use, so Esc, focus
 * trapping and inerting behave identically everywhere.
 *
 * Binding the shortcut is yours — the palette shouldn't grab a global key
 * listener on your behalf. The stories show the four lines it takes.
 *
 * ```tsx
 * <CommandDialog open={open} onOpenChange={setOpen} label="Command palette">
 *   <CommandInput placeholder="Type a command…" />
 *   <CommandList>…</CommandList>
 * </CommandDialog>
 * ```
 */
export function CommandDialog({
  open,
  defaultOpen,
  onOpenChange,
  label,
  className,
  children,
  ...props
}: CommandDialogProps) {
  return (
    <ModalRoot
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      slot="command-dialog"
      className="m-auto mt-[12vh] w-[calc(100%-2rem)] max-w-xl overflow-visible bg-transparent p-0 text-foreground backdrop:bg-[var(--overlay)] backdrop:backdrop-blur-[2px]"
    >
      <Command
        aria-label={label}
        className={cn(
          "border border-border shadow-[var(--shadow-lg)] motion-safe:animate-rise",
          className,
        )}
        {...props}
      >
        {children}
      </Command>
    </ModalRoot>
  );
}
