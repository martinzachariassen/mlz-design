import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-sm)] font-mono text-xs uppercase tracking-[0.14em] transition-[transform,box-shadow,border-color,color] duration-[var(--dur-hover)] ease-[var(--ease-glide)] focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-[var(--dur-hover)] [&_svg]:ease-[var(--ease-glide)] hover:[&_svg]:-translate-x-px hover:[&_svg]:-rotate-[4deg] focus-visible:[&_svg]:-translate-x-px focus-visible:[&_svg]:-rotate-[4deg]",
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
    VariantProps<typeof buttonVariants> {
  /**
   * Render the single child instead of a `<button>`, passing the button's styling
   * and props down to it. Use it when the control has to be something else — most
   * often a link: `<Button asChild><a href="/work">Work</a></Button>`.
   */
  asChild?: boolean;
}

/**
 * The signature MLZ button: a technical ghost outline that lifts up and to the
 * left on hover, dropping an offset accent shadow behind it.
 *
 * **A button does something; a link goes somewhere.** If it navigates, render an
 * anchor — `<Button asChild><a href="…">…</a></Button>` keeps the styling while
 * giving the user a real link they can middle-click, copy and open in a new tab.
 * The `link` variant is the reverse case: an anchor that should *look* like text.
 *
 * At most one `accent` or `solid` button per view — the emphasis only reads if
 * it's scarce. Everything secondary is `default` or `ghost`, and `destructive`
 * is reserved for actions that lose data.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, type, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        // `type` is only meaningful on a real <button>; forcing it onto an <a>
        // would emit an invalid attribute.
        type={asChild ? type : (type ?? "button")}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };
