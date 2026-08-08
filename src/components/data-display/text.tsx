import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/cn";
import { named } from "../../lib/named";

const textVariants = /* @__PURE__ */ cva("", {
  variants: {
    variant: {
      body: "text-sm text-foreground",
      lead: "text-sm leading-relaxed text-muted-foreground",
      muted: "text-muted-foreground",
      mono: "font-mono text-[0.9em] text-foreground",
      eyebrow: "font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground",
    },
    size: {
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
    },
  },
  defaultVariants: { variant: "body" },
});

export interface TextProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof textVariants> {
  /** The element to render. Defaults to `<span>`. */
  as?: React.ElementType;
}

/**
 * Inline/text typography primitive — the small, everyday type roles that don't
 * warrant a full `Prose` block: mono values, muted asides, and the tracked-out
 * mono eyebrow used above sections. `variant` sets the whole look; `size`
 * optionally overrides just the font-size (tailwind-merge keeps the later win).
 *
 * Renders a `<span>` unless you point `as` at something else — reach for that
 * whenever the content is really a paragraph or a heading.
 *
 * ```tsx
 * <Text variant="eyebrow" as="div">Connection details</Text>
 * <Text variant="mono">203.0.113.7</Text>
 * <Text variant="lead">What sites can infer about your connection.</Text>
 * ```
 */
export const Text = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<HTMLElement, TextProps>(
    ({ as, variant, size, className, ...props }, ref) => {
      const Component = as ?? "span";
      return (
        <Component
          ref={ref}
          data-slot="text"
          className={cn(textVariants({ variant, size }), className)}
          {...props}
        />
      );
    },
  ),
  "Text",
);

export { textVariants };
