import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../lib/cn";

/**
 * The mlz.no signature button: a technical ghost outline that lifts on hover
 * with an offset accent shadow. `variant` and `size` are fully typed.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-sm)] font-mono text-xs uppercase tracking-[0.14em] transition-[transform,box-shadow,border-color,color] duration-200 ease-[var(--ease-out)] focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-200 [&_svg]:ease-[var(--ease-out)] hover:[&_svg]:-translate-x-px hover:[&_svg]:-rotate-[4deg] focus-visible:[&_svg]:-translate-x-px focus-visible:[&_svg]:-rotate-[4deg]",
  {
    variants: {
      variant: {
        default:
          "border-[1.5px] border-primary bg-transparent text-foreground hover:-translate-x-0.5 hover:-translate-y-0.5 hover:border-accent hover:shadow-[5px_5px_0_0_var(--accent)] focus-visible:-translate-x-0.5 focus-visible:-translate-y-0.5 focus-visible:border-accent focus-visible:shadow-[5px_5px_0_0_var(--accent)]",
        solid:
          "border-[1.5px] border-primary bg-primary text-primary-foreground hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_var(--accent)] focus-visible:-translate-x-0.5 focus-visible:-translate-y-0.5 focus-visible:shadow-[5px_5px_0_0_var(--accent)]",
        accent:
          "bg-accent text-accent-foreground hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_var(--primary)] focus-visible:-translate-x-0.5 focus-visible:-translate-y-0.5 focus-visible:shadow-[5px_5px_0_0_var(--primary)]",
        ghost: "bg-transparent text-foreground hover:bg-muted",
        sketch:
          "border-[1.5px] border-dashed border-primary bg-transparent text-foreground hover:-translate-x-0.5 hover:-translate-y-0.5 hover:-rotate-[0.75deg] hover:border-accent hover:shadow-[4px_4px_0_0_var(--accent)] focus-visible:-translate-x-0.5 focus-visible:-translate-y-0.5 focus-visible:-rotate-[0.75deg] focus-visible:border-accent focus-visible:shadow-[4px_4px_0_0_var(--accent)]",
        destructive:
          "border-[1.5px] border-destructive bg-transparent text-destructive hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_var(--destructive)] focus-visible:-translate-x-0.5 focus-visible:-translate-y-0.5 focus-visible:shadow-[5px_5px_0_0_var(--destructive)]",
        link: "text-foreground underline-offset-4 hover:text-[var(--accent-deep)] hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-[11px]",
        default: "h-11 px-[22px]",
        lg: "h-12 px-7 text-sm",
        icon: "size-11",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  ),
);
Button.displayName = "Button";

export { buttonVariants };
