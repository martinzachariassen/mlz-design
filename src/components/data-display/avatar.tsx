import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/cn";
import { named } from "../../lib/named";

const avatarVariants = /* @__PURE__ */ cva("relative inline-flex shrink-0", {
  variants: {
    size: {
      xs: "size-6 text-[9px]",
      sm: "size-8 text-[10px]",
      default: "size-10 text-xs",
      lg: "size-14 text-sm",
      xl: "size-20 text-lg",
    },
    shape: {
      circle: "",
      square: "",
    },
  },
  defaultVariants: { size: "default", shape: "circle" },
});

const frameShape = {
  circle: "rounded-full",
  square: "rounded-[var(--radius-md)]",
} as const;

const statusColor = {
  online: "bg-success",
  away: "bg-warning",
  busy: "bg-destructive",
  offline: "bg-[var(--muted-foreground)]",
} as const;

export interface AvatarProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof avatarVariants> {
  /** Presence dot on the lower-right edge. */
  status?: keyof typeof statusColor;
}

/**
 * Identity, the mlz way: initials first. The frame is a hairline-bordered chip
 * (circle or square); an image drops in when there is one and falls back to the
 * initials the moment it fails. Compose `<Avatar><AvatarImage/><AvatarFallback/>`;
 * add a `status` dot, or stack several in an `AvatarGroup`.
 *
 * The root is an un-clipped wrapper so the status dot can sit on the edge; the
 * inner `avatar-frame` does the rounding/clipping (and is what `AvatarGroup` rings).
 *
 * ```tsx
 * <Avatar size="lg" status="online">
 *   <AvatarImage src={user.avatar} alt={user.name} />
 *   <AvatarFallback>MZ</AvatarFallback>
 * </Avatar>
 * ```
 */
export const Avatar = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<HTMLSpanElement, AvatarProps>(
    ({ className, size, shape = "circle", status, children, ...props }, ref) => (
      <span
        ref={ref}
        data-slot="avatar"
        className={cn(avatarVariants({ size, shape }), className)}
        {...props}
      >
        <AvatarPrimitive.Root
          data-slot="avatar-frame"
          className={cn(
            "flex size-full items-center justify-center overflow-hidden border border-border bg-secondary",
            frameShape[shape ?? "circle"],
          )}
        >
          {children}
        </AvatarPrimitive.Root>
        {status ? (
          <span
            className={cn(
              "absolute right-0 bottom-0 block size-1/4 min-h-2 min-w-2 rounded-full ring-2 ring-background",
              statusColor[status],
            )}
            aria-hidden
          />
        ) : null}
      </span>
    ),
  ),
  "Avatar",
);

export type AvatarImageProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>;

/**
 * The avatar's photo. It renders only once the image has actually loaded, so a
 * slow or broken `src` shows the `AvatarFallback` beside it instead — no
 * broken-image icon, no state to manage. Always pass an `alt`.
 */
export const AvatarImage = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<
    React.ComponentRef<typeof AvatarPrimitive.Image>,
    AvatarImageProps
  >(({ className, ...props }, ref) => (
    <AvatarPrimitive.Image
      ref={ref}
      data-slot="avatar-image"
      className={cn("size-full object-cover", className)}
      {...props}
    />
  )),
  "AvatarImage",
);

const fallbackVariants = /* @__PURE__ */ cva(
  "flex size-full items-center justify-center font-mono uppercase tracking-[0.08em]",
  {
    variants: {
      tone: {
        default: "text-secondary-foreground",
        accent: "bg-accent text-accent-foreground",
        muted: "bg-muted text-muted-foreground",
      },
    },
    defaultVariants: { tone: "default" },
  },
);

export interface AvatarFallbackProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>,
    VariantProps<typeof fallbackVariants> {}

/**
 * What fills the frame while there's no loaded image — initials, in tracked-out
 * mono. `tone` picks the chip colour; use `accent` sparingly to mark "you". Pass
 * `delayMs` to hold it back briefly, so a fast-loading image doesn't flash the
 * initials first.
 */
export const AvatarFallback = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<
    React.ComponentRef<typeof AvatarPrimitive.Fallback>,
    AvatarFallbackProps
  >(({ className, tone, ...props }, ref) => (
    <AvatarPrimitive.Fallback
      ref={ref}
      data-slot="avatar-fallback"
      className={cn(fallbackVariants({ tone }), className)}
      {...props}
    />
  )),
  "AvatarFallback",
);

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Show at most this many; the rest collapse into a `+N` chip. */
  max?: number;
  /** Size of the overflow chip (match the avatars you pass in). */
  size?: AvatarProps["size"];
}

/**
 * Overlapping avatars with a background ring between them. Pass `max` to cap how
 * many show; the remainder collapse into a `+N` chip.
 */
export const AvatarGroup = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<HTMLDivElement, AvatarGroupProps>(
    ({ className, max, size = "default", children, ...props }, ref) => {
      const items = React.Children.toArray(children).filter(React.isValidElement);
      const shown = typeof max === "number" ? items.slice(0, max) : items;
      const overflow = items.length - shown.length;
      return (
        <div
          ref={ref}
          data-slot="avatar-group"
          className={cn(
            "flex items-center -space-x-2 [&_[data-slot=avatar-frame]]:ring-2 [&_[data-slot=avatar-frame]]:ring-background",
            className,
          )}
          {...props}
        >
          {shown}
          {overflow > 0 ? (
            <Avatar size={size} aria-label={`${overflow} more`}>
              <AvatarFallback tone="muted">+{overflow}</AvatarFallback>
            </Avatar>
          ) : null}
        </div>
      );
    },
  ),
  "AvatarGroup",
);

export { avatarVariants, fallbackVariants };
