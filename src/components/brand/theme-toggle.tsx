import * as React from "react";
import { MonitorIcon, MoonIcon, SunIcon } from "../../lib/icons";
import { named } from "../../lib/named";
import { type Theme, useTheme } from "../../lib/theme";
import { type AccentName, accents } from "../../tokens";
import { RadioGroup, RadioGroupItem } from "../forms/radio-group";
import { ToggleGroup, ToggleGroupItem } from "../forms/toggle-group";

const THEMES: ReadonlyArray<{ value: Theme; label: string; Icon: typeof SunIcon }> = [
  { value: "light", label: "Light", Icon: SunIcon },
  { value: "dark", label: "Dark", Icon: MoonIcon },
  { value: "system", label: "System", Icon: MonitorIcon },
];

export interface ThemeToggleProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Drop the text labels and show only the icons. */
  iconOnly?: boolean;
  /** Hide "System", leaving a straight light/dark choice. */
  hideSystem?: boolean;
}

/**
 * The light / dark / system switch, wired to `ThemeProvider` — so an app gets the
 * system's headline feature without rebuilding the control.
 *
 * **Must be rendered under a `<ThemeProvider>`**; it reads and writes the same
 * state as `useTheme()`. Pair the provider with `themeInitScript()` in `<head>`,
 * or the page paints in the wrong theme before React hydrates and this control
 * appears to jump.
 *
 * Keep **System**. It's the option most people want and the only one that
 * follows the OS at dusk; drop it with `hideSystem` only when the app genuinely
 * has no use for it. Note the button reflects the *chosen* theme, so with
 * "System" selected it stays on System rather than jumping to Light or Dark.
 *
 * ```tsx
 * <ThemeProvider>
 *   <ThemeToggle iconOnly />
 * </ThemeProvider>
 * ```
 */
export const ThemeToggle = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<HTMLDivElement, ThemeToggleProps>(
    ({ className, iconOnly, hideSystem, ...props }, ref) => {
      const { theme, setTheme } = useTheme();
      const options = hideSystem ? THEMES.filter((t) => t.value !== "system") : THEMES;

      return (
        <div ref={ref} data-slot="theme-toggle" className={className} {...props}>
          <ToggleGroup
            type="single"
            variant="outline"
            size="sm"
            // A single-select group can be emptied by re-pressing the active item;
            // ignore that so there's always a theme.
            value={theme}
            onValueChange={(next) => next && setTheme(next as Theme)}
            aria-label="Colour theme"
            // The overlap must equal the border width exactly, or the seam
            // between buttons doubles up (and rounds unevenly on fractional DPR).
            className="gap-0 [&>*:not(:first-child)]:-ml-[1.5px]"
          >
            {options.map(({ value, label, Icon }) => (
              <ToggleGroupItem
                key={value}
                value={value}
                aria-label={iconOnly ? label : undefined}
                // Overlapping siblings paint in DOM order, so the pressed /
                // hovered / focused item is lifted — without this the next
                // button's neutral border paints over the accent edge.
                className="relative rounded-none first:rounded-l-[var(--radius-sm)] last:rounded-r-[var(--radius-sm)] hover:z-10 focus-visible:z-10 data-[state=on]:z-10"
              >
                <Icon />
                {iconOnly ? null : label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      );
    },
  ),
  "ThemeToggle",
);

export interface AccentPickerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Limit the choices; defaults to all five families. */
  families?: readonly AccentName[];
}

const ALL_ACCENTS = /* @__PURE__ */ Object.keys(accents) as AccentName[];

/**
 * Swatches for the five accent families, wired to `ThemeProvider`.
 *
 * Each swatch is a real radio in a group, so the whole picker is one tab stop
 * and the arrow keys move between families. Colour alone never carries the
 * meaning — every swatch is named.
 *
 * Accent is a *preference*, not a setting that changes what anything does. If an
 * app only ever ships one accent, don't render this; set `data-accent` once on
 * `<html>` and be done.
 */
export const AccentPicker = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<HTMLDivElement, AccentPickerProps>(
    ({ className, families = ALL_ACCENTS, ...props }, ref) => {
      const { accent, setAccent } = useTheme();

      return (
        <div ref={ref} data-slot="accent-picker" className={className} {...props}>
          {/* Built on the system's own RadioGroup rather than hand-rolled buttons,
            so the roving focus and arrow-key navigation come from Radix. */}
          <RadioGroup
            value={accent}
            onValueChange={(next) => setAccent(next as AccentName)}
            aria-label="Accent family"
            className="flex items-center gap-2"
          >
            {families.map((name) => (
              <RadioGroupItem
                key={name}
                value={name}
                aria-label={name}
                className="size-6 transition-transform hover:scale-105 data-[state=checked]:scale-110 data-[state=checked]:border-foreground"
                style={{ background: accents[name].base }}
              />
            ))}
          </RadioGroup>
        </div>
      );
    },
  ),
  "AccentPicker",
);
