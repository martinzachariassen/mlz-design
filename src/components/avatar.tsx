import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../lib/cn";

/**
 * Identity, the mlz way: initials first. The frame is a hairline-bordered chip
 * (circle or square); an image drops in when there is one and falls back to the
 * initials the moment it fails. Compose `<Avatar><AvatarImage/><AvatarFallback/>`;
 * add a `status` dot, or stack several in an `AvatarGroup`.
 *
 * The root is an un-clipped wrapper so the status dot can sit on the edge; the
 * inner `avatar-frame` does the rounding/clipping (and is what `AvatarGroup` rings).
 */
const avatarVariants = cva("relative inline-flex shrink-0", {
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

export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ className, size, shape = "circle", status, children, ...props }, ref) => (
    <span
      ref={ref}
      data-slot="avatar"
      className={cn(avatarVariants({ size, shape }), className)}
      {...props}
    >
      <span
        data-slot="avatar-frame"
        className={cn(
          "flex size-full items-center justify-center overflow-hidden border border-border bg-secondary",
          frameShape[shape ?? "circle"],
        )}
      >
        {children}
      </span>
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
);
Avatar.displayName = "Avatar";

export type AvatarImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

export const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className, onError, ...props }, ref) => {
    const [errored, setErrored] = React.useState(false);
    if (errored) return null;
    return (
      // biome-ignore lint/a11y/useAltText: alt is forwarded via props
      <img
        ref={ref}
        data-slot="avatar-image"
        className={cn("size-full object-cover", className)}
        onError={(event) => {
          setErrored(true);
          onError?.(event);
        }}
        {...props}
      />
    );
  },
);
AvatarImage.displayName = "AvatarImage";

const fallbackVariants = cva(
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
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof fallbackVariants> {}

export const AvatarFallback = React.forwardRef<HTMLSpanElement, AvatarFallbackProps>(
  ({ className, tone, ...props }, ref) => (
    <span
      ref={ref}
      data-slot="avatar-fallback"
      className={cn(fallbackVariants({ tone }), className)}
      {...props}
    />
  ),
);
AvatarFallback.displayName = "AvatarFallback";

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
export const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
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
);
AvatarGroup.displayName = "AvatarGroup";

export { avatarVariants, fallbackVariants };
