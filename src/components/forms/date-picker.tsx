import * as React from "react";
import type { PropsBase } from "react-day-picker";
import { cn } from "../../lib/cn";
import { ChevronDownIcon } from "../../lib/icons";
import { named } from "../../lib/named";
import { Popover, PopoverContent, PopoverTrigger } from "../overlay/popover";
import { Calendar } from "./calendar";
import { useFieldControlProps } from "./field";

export interface DatePickerProps {
  /** Controlled value. Provide `onValueChange` alongside it. */
  value?: Date;
  /** Initial value when uncontrolled. */
  defaultValue?: Date;
  /** Called with the picked date, or `undefined` when the pick is cleared. */
  onValueChange?: (date: Date | undefined) => void;
  /** Controlled open state. Provide `onOpenChange` alongside it. */
  open?: boolean;
  /** Initial open state when uncontrolled. */
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /**
   * Submits the value with a surrounding `<form>` via a hidden input, as
   * `yyyy-mm-dd` — the same wire format `<input type="date">` posts.
   */
  name?: string;
  /** Id for the trigger, when you label it yourself outside a `Field`. */
  id?: string;
  /** Trigger height. `sm` (h-9) lines up with `Button size="sm"`. */
  size?: "sm" | "default";
  /** Shown on the trigger while no date is chosen. */
  placeholder?: string;
  /** How the chosen date reads on the trigger. Defaults to the reader's locale. */
  formatDate?: (date: Date) => string;
  /** Extra DayPicker props for the panel — `disabled` matchers, `startMonth`… */
  calendarProps?: Partial<Omit<PropsBase, "className" | "classNames">>;
  disabled?: boolean;
  /** Extra classes for the trigger button. */
  className?: string;
  /** Extra classes for the popover panel. */
  contentClassName?: string;
  /** Names the control when there is no visible `FieldLabel`. */
  "aria-label"?: string;
}

function toWireFormat(date: Date): string {
  const y = date.getFullYear();
  const m = `${date.getMonth() + 1}`.padStart(2, "0");
  const d = `${date.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/**
 * A date in a form field: a `Select`-shaped trigger that opens a `Calendar` in
 * a `Popover`. Picking a day closes the panel and returns focus to the trigger.
 *
 * Inside a `Field` it picks up the generated id, `aria-describedby` and
 * `aria-invalid` automatically; outside one, give it an `aria-label`. With
 * `name` it posts `yyyy-mm-dd` through a hidden input, like `<input
 * type="date">` would.
 *
 * **Reach for `Calendar`** when the grid belongs in the page rather than
 * behind a field, and for a plain `<Input type="date">` when the reader knows
 * the date and typing beats clicking (birthdays, document dates).
 *
 * ```tsx
 * <Field>
 *   <FieldLabel>Deploy date</FieldLabel>
 *   <DatePicker placeholder="Pick a date" />
 * </Field>
 * ```
 */
export const DatePicker = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<HTMLButtonElement, DatePickerProps>(
    (
      {
        value: valueProp,
        defaultValue,
        onValueChange,
        open: openProp,
        defaultOpen = false,
        onOpenChange,
        name,
        id,
        size = "default",
        placeholder = "Pick a date",
        formatDate,
        calendarProps,
        disabled,
        className,
        contentClassName,
        "aria-label": ariaLabel,
      },
      ref,
    ) => {
      const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
      const isOpenControlled = openProp !== undefined;
      const open = isOpenControlled ? openProp : uncontrolledOpen;
      const setOpen = (next: boolean) => {
        if (!isOpenControlled) setUncontrolledOpen(next);
        onOpenChange?.(next);
      };

      const [uncontrolled, setUncontrolled] = React.useState<Date | undefined>(defaultValue);
      const isControlled = valueProp !== undefined;
      const value = isControlled ? valueProp : uncontrolled;

      const fieldProps = useFieldControlProps();

      const select = (next: Date | undefined) => {
        if (!isControlled) setUncontrolled(next);
        onValueChange?.(next);
        if (next) setOpen(false);
      };

      const label = value
        ? (formatDate?.(value) ??
          new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(value))
        : placeholder;

      return (
        <Popover open={open} onOpenChange={setOpen}>
          {name ? (
            <input type="hidden" name={name} value={value ? toWireFormat(value) : ""} />
          ) : null}
          <PopoverTrigger asChild>
            <button
              ref={ref}
              type="button"
              aria-label={ariaLabel}
              data-slot="date-picker"
              className={cn(
                "flex w-full items-center justify-between gap-2 rounded-[var(--radius-sm)] border-[1.5px] border-input bg-background px-3 py-2 font-mono text-sm transition-colors",
                size === "sm" ? "h-9 text-[13px]" : "h-11",
                "focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30",
                "disabled:cursor-not-allowed disabled:opacity-50",
                "aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive/30",
                !value && "text-muted-foreground",
                className,
              )}
              {...fieldProps}
              id={id ?? fieldProps.id}
              disabled={disabled ?? fieldProps.disabled}
            >
              <span className="truncate">{label}</span>
              <ChevronDownIcon className="size-4 shrink-0 opacity-60" />
            </button>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            sideOffset={4}
            className={cn("w-auto p-0", contentClassName)}
          >
            <Calendar
              defaultMonth={value}
              {...calendarProps}
              mode="single"
              selected={value}
              onSelect={select}
            />
          </PopoverContent>
        </Popover>
      );
    },
  ),
  "DatePicker",
);
