import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../lib/cn";

/**
 * A signal panel: a subtle-tinted fill, a left accent rail and a colour-matched
 * title. Drop an svg as the first child and it slots into the icon column
 * (shadcn grid idiom); text flows in the second column.
 */
const alertVariants = cva(
  "relative grid w-full grid-cols-[0_1fr] items-start gap-y-1 rounded-[var(--radius-md)] border border-l-2 px-4 py-3 text-sm transition-colors has-[>svg]:grid-cols-[1rem_1fr] has-[>svg]:gap-x-3 [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "border-border bg-card text-card-foreground",
        info: "border-[var(--info)]/25 border-l-[var(--info)] bg-info-subtle text-[var(--info)]",
        success:
          "border-[var(--success)]/25 border-l-[var(--success)] bg-success-subtle text-[var(--success)]",
        warning:
          "border-[var(--warning)]/30 border-l-[var(--warning)] bg-warning-subtle text-[var(--warning)]",
        destructive:
          "border-[var(--destructive)]/25 border-l-[var(--destructive)] bg-destructive-subtle text-[var(--destructive)]",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      data-slot="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  ),
);
Alert.displayName = "Alert";

export const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    data-slot="alert-title"
    className={cn("col-start-2 font-mono text-xs font-bold uppercase tracking-[0.1em]", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

export const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    data-slot="alert-description"
    className={cn("col-start-2 text-sm text-muted-foreground [&_p]:leading-relaxed", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { alertVariants };
