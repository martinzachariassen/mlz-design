import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../lib/cn";

/**
 * Composed the shadcn way — Avatar root frames the image and fallback, which
 * simply overlap inside it. Elevation stays a hairline border, never a shadow.
 */
const avatarVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-muted",
  {
    variants: {
      size: {
        sm: "size-8 text-[10px]",
        default: "size-10 text-xs",
        lg: "size-14 text-sm",
      },
    },
    defaultVariants: { size: "default" },
  },
);

export interface AvatarProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof avatarVariants> {}

export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ className, size, ...props }, ref) => (
    <span ref={ref} className={cn(avatarVariants({ size }), className)} {...props} />
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

export type AvatarFallbackProps = React.HTMLAttributes<HTMLSpanElement>;

export const AvatarFallback = React.forwardRef<HTMLSpanElement, AvatarFallbackProps>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "flex size-full items-center justify-center font-mono uppercase tracking-[0.08em] text-muted-foreground",
        className,
      )}
      {...props}
    />
  ),
);
AvatarFallback.displayName = "AvatarFallback";

export { avatarVariants };
