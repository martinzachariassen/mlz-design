import type { IconifyIcon, IconProps as IconifyProps } from "@iconify/react/offline";
import { Icon as IconifyIconComponent } from "@iconify/react/offline";
import { cva, type VariantProps } from "class-variance-authority";
import { houseIcons, type IconName } from "../../icons/generated";
import { cn } from "../../lib/cn";

/**
 * Icon sizing. Glyphs inherit `currentColor` (colour them with `text-*`
 * utilities), so these variants only set the box. Pass a Tailwind `size-*`
 * class to override with an arbitrary size.
 */
const iconVariants = cva("inline-block shrink-0", {
  variants: {
    size: {
      xs: "size-3.5",
      sm: "size-4",
      default: "size-5",
      lg: "size-6",
      xl: "size-8",
    },
  },
  defaultVariants: { size: "default" },
});

export interface IconProps
  extends Omit<IconifyProps, "icon" | "color">,
    VariantProps<typeof iconVariants> {
  /** A curated house-set icon name (autocompletes). Mutually exclusive with `icon`. */
  name?: IconName;
  /**
   * Raw Iconify icon data for a bring-your-own glyph — e.g. a name imported from
   * an `@iconify-json/*` set. Mutually exclusive with `name`.
   */
  icon?: IconifyIcon;
  /**
   * Accessible label. When set, the icon is exposed to assistive tech as an
   * image; when omitted (the default) it's decorative and hidden from AT.
   */
  label?: string;
}

/**
 * The MLZ house icon. Renders a curated Lucide glyph fully offline (no network),
 * inheriting `currentColor` and sized from the `size` scale. Decorative by
 * default — pass `label` to make it meaningful to assistive tech.
 *
 * ```tsx
 * <Icon name="settings" />                       // decorative
 * <Icon name="trash-2" label="Delete" size="sm" className="text-destructive" />
 * ```
 */
export function Icon({ name, icon, label, size, className, ...props }: IconProps) {
  const data = icon ?? (name ? houseIcons[name] : undefined);

  if (!data) {
    // Only reachable on developer misuse (neither prop supplied).
    console.warn("<Icon> requires either a `name` (house set) or an `icon` (raw data) prop.");
    return null;
  }

  // Iconify defaults every svg to `aria-hidden="true" role="img"`. A decorative
  // icon keeps that; a labelled one must un-hide itself so AT can read the label.
  const a11y = label
    ? ({ role: "img", "aria-label": label, "aria-hidden": false } as const)
    : ({ "aria-hidden": true } as const);

  return (
    <IconifyIconComponent
      icon={data}
      className={cn(iconVariants({ size }), className)}
      {...a11y}
      {...props}
    />
  );
}
Icon.displayName = "Icon";

export { iconVariants };
