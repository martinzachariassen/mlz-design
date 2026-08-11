import { DayPicker, type DayPickerProps } from "react-day-picker";
import { cn } from "../../lib/cn";
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon } from "../../lib/icons";

export type CalendarProps = DayPickerProps;

/**
 * A month grid for picking dates — `react-day-picker` re-dressed in the
 * engineering-notebook voice, styled purely from semantic tokens so it follows
 * both themes and every accent family. All of DayPicker's own props pass
 * through: `mode="single" | "multiple" | "range"`, `disabled` matchers,
 * `numberOfMonths`, `captionLayout="dropdown"` and the rest.
 *
 * **Reach for `DatePicker`** when the calendar belongs in a form field — it
 * wraps this in a `Popover` behind a `Select`-shaped trigger. Use `Calendar`
 * directly when the grid should be visible in the page (a booking view, a
 * range dashboard). And when the reader *knows* the date — a birthday — a
 * plain `<Input type="date">` is still the faster control.
 *
 * ```tsx
 * <Calendar mode="single" selected={date} onSelect={setDate} />
 * ```
 */
export function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("inline-block p-3", className)}
      classNames={{
        root: "relative",
        months: "relative flex flex-col gap-4 sm:flex-row",
        month: "flex flex-col gap-3",
        month_caption: "flex h-8 items-center justify-center",
        caption_label: "font-mono text-xs font-bold uppercase tracking-[0.12em] text-foreground",
        nav: "absolute inset-x-0 top-0 z-10 flex h-8 items-center justify-between",
        button_previous:
          "inline-flex size-8 items-center justify-center rounded-[var(--radius-sm)] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30 disabled:pointer-events-none disabled:opacity-40",
        button_next:
          "inline-flex size-8 items-center justify-center rounded-[var(--radius-sm)] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30 disabled:pointer-events-none disabled:opacity-40",
        month_grid: "border-separate border-spacing-0.5",
        weekday:
          "size-9 pb-1 text-center font-mono text-[10px] font-normal uppercase tracking-[0.12em] text-muted-foreground",
        day: "p-0 text-center",
        day_button: cn(
          "size-9 rounded-[var(--radius-sm)] font-mono text-[13px] text-foreground transition-colors",
          "hover:bg-muted focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30",
          "disabled:pointer-events-none",
        ),
        // `border-accent` is decorative here (today is also announced by AT);
        // selection itself uses the fill + paired foreground rungs.
        today: "[&>button]:border [&>button]:border-accent",
        selected:
          "[&>button]:bg-accent [&>button]:text-accent-foreground [&>button]:hover:bg-accent",
        range_start: "rounded-l-[var(--radius-sm)]",
        range_end: "rounded-r-[var(--radius-sm)]",
        range_middle:
          "[&>button]:rounded-none [&>button]:bg-accent-subtle [&>button]:text-foreground [&>button]:hover:bg-accent-subtle",
        outside: "[&>button]:text-muted-foreground-2",
        disabled: "[&>button]:opacity-40",
        hidden: "invisible",
        footer: "pt-2 text-sm text-muted-foreground",
        dropdowns: "flex items-center justify-center gap-2",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, className: chevronClassName }) => {
          const Icon =
            orientation === "left"
              ? ChevronLeftIcon
              : orientation === "right"
                ? ChevronRightIcon
                : orientation === "up"
                  ? ChevronUpIcon
                  : ChevronDownIcon;
          return <Icon className={cn("size-4", chevronClassName)} />;
        },
      }}
      {...props}
    />
  );
}
