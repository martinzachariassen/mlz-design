import type * as React from "react";
import { cn } from "./cn";

/**
 * The handful of glyphs the interactive components need to render themselves —
 * a select's chevron, a menu item's tick, a submenu's caret.
 *
 * **Internal only. These are deliberately not exported from the package.** The
 * system ships no icon library and doesn't intend to: consumers should install
 * `lucide-react` (what shadcn/ui uses) or whatever they prefer. These exist so a
 * `Select` isn't silently unusable without one, and so porting a shadcn
 * component doesn't drag `lucide-react` in as a runtime dependency by the back
 * door. Keep the set minimal — if a new component needs a decorative icon, it
 * belongs in the consumer's markup, not here.
 *
 * All of them inherit `currentColor` and default to `size-4`.
 */
type IconProps = React.SVGProps<SVGSVGElement>;

function strokeIcon(path: React.ReactNode, viewBox = "0 0 24 24") {
  return function Icon({ className, ...props }: IconProps) {
    return (
      <svg
        viewBox={viewBox}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={cn("size-4 shrink-0", className)}
        {...props}
      >
        {path}
      </svg>
    );
  };
}

export const ChevronDownIcon = strokeIcon(<path d="m6 9 6 6 6-6" />);
export const ChevronUpIcon = strokeIcon(<path d="m18 15-6-6-6 6" />);
export const ChevronRightIcon = strokeIcon(<path d="m9 18 6-6-6-6" />);

/** The same tick the `Checkbox` draws, so selection reads identically everywhere. */
export const CheckIcon = strokeIcon(<path d="M3.5 8.5l3 3 6-7" />, "0 0 16 16");

/** The three theme choices, for `ThemeToggle`. */
export const SunIcon = strokeIcon(
  <>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </>,
);
export const MoonIcon = strokeIcon(<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />);
export const MonitorIcon = strokeIcon(
  <>
    <rect x="2" y="4" width="20" height="13" rx="2" />
    <path d="M8 21h8M12 17v4" />
  </>,
);

/** A filled dot — the selected marker for radio items. */
export function DotIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 8 8"
      fill="currentColor"
      aria-hidden="true"
      className={cn("size-2 shrink-0", className)}
      {...props}
    >
      <circle cx="4" cy="4" r="4" />
    </svg>
  );
}
