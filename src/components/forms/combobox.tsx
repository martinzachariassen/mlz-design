import * as React from "react";
import { cn } from "../../lib/cn";
import { CheckIcon, ChevronDownIcon } from "../../lib/icons";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "../overlay/command";
import { Popover, PopoverContent, PopoverTrigger } from "../overlay/popover";
import { useFieldControlProps } from "./field";

export interface ComboboxOption {
  /** The value handed back to `onValueChange`. */
  value: string;
  /** What the reader sees and searches. */
  label: string;
  disabled?: boolean;
}

export interface ComboboxProps {
  options: ComboboxOption[];
  /** Controlled value. Provide `onValueChange` alongside it. */
  value?: string;
  /** Initial value when uncontrolled. */
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Shown on the trigger when nothing is chosen. */
  placeholder?: string;
  /** Placeholder inside the search field. */
  searchPlaceholder?: string;
  /** Shown when the search matches nothing. */
  emptyMessage?: React.ReactNode;
  disabled?: boolean;
  /** Extra classes for the trigger button. */
  className?: string;
  /** Extra classes for the dropdown panel. */
  contentClassName?: string;
  /** Names the control when there is no visible `FieldLabel`. */
  "aria-label"?: string;
}

/**
 * A `Select` you can type into — one value from a list long enough that
 * scrolling it is a hunt.
 *
 * **Reach for `Select` below roughly fifteen options.** A combobox costs a
 * keystroke and, worse, requires the reader to know what the thing is *called*;
 * a visible list only requires them to recognise it. **Reach for `Command`**
 * when the entries are actions rather than a value, and for `CommandDialog`
 * when it is the app-wide ⌘K palette.
 *
 * Inside a `Field` it picks up the generated id, `aria-describedby` and
 * `aria-invalid` automatically. Outside one, give it an `aria-label`.
 *
 * The list is filtered by `cmdk`: typing re-ranks by fuzzy score, arrows move
 * through visible items only, Enter selects, Esc closes and returns focus to
 * the trigger.
 *
 * ```tsx
 * <Field>
 *   <FieldLabel>Region</FieldLabel>
 *   <Combobox options={regions} placeholder="Pick a region" />
 * </Field>
 * ```
 */
export const Combobox = React.forwardRef<HTMLButtonElement, ComboboxProps>(
  (
    {
      options,
      value: valueProp,
      defaultValue,
      onValueChange,
      placeholder = "Select…",
      searchPlaceholder = "Search…",
      emptyMessage = "No results.",
      disabled,
      className,
      contentClassName,
      "aria-label": ariaLabel,
    },
    ref,
  ) => {
    const [open, setOpen] = React.useState(false);
    const [uncontrolled, setUncontrolled] = React.useState(defaultValue ?? "");
    const isControlled = valueProp !== undefined;
    const value = isControlled ? valueProp : uncontrolled;

    const fieldProps = useFieldControlProps();
    const selected = options.find((option) => option.value === value);

    const select = (next: string) => {
      // Selecting the current value again clears it — the escape hatch a
      // combobox otherwise lacks, since there is no "none" row.
      const resolved = next === value ? "" : next;
      if (!isControlled) setUncontrolled(resolved);
      onValueChange?.(resolved);
      setOpen(false);
    };

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            ref={ref}
            type="button"
            role="combobox"
            aria-expanded={open}
            aria-label={ariaLabel}
            data-slot="combobox"
            className={cn(
              "flex h-11 w-full items-center justify-between gap-2 rounded-[var(--radius-sm)] border-[1.5px] border-input bg-background px-3 py-2 font-mono text-sm transition-colors",
              "focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive/30",
              !selected && "text-muted-foreground",
              className,
            )}
            {...fieldProps}
            disabled={disabled ?? fieldProps.disabled}
          >
            <span className="truncate">{selected?.label ?? placeholder}</span>
            <ChevronDownIcon className="size-4 shrink-0 opacity-60" />
          </button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          sideOffset={4}
          className={cn("w-[var(--radix-popover-trigger-width)] p-0", contentClassName)}
        >
          <Command>
            <CommandInput placeholder={searchPlaceholder} />
            <CommandList>
              <CommandEmpty>{emptyMessage}</CommandEmpty>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.label}
                  disabled={option.disabled}
                  onSelect={() => select(option.value)}
                >
                  <span className="flex-1 truncate">{option.label}</span>
                  {option.value === value ? (
                    <CheckIcon className="size-4 shrink-0 text-accent" />
                  ) : null}
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  },
);
Combobox.displayName = "Combobox";
