import * as React from "react";
import { cn } from "../lib/cn";

/**
 * Long-form typography — the "blog with a lot of text" surface. Wrap raw article
 * markup (a CMS/MDX render, or plain elements) and every child is styled in the
 * mlz voice without per-element classes: a readable grotesk body, hand/grotesk
 * headings, accent links, a ruled blockquote, mono code. Measure is capped for
 * comfortable reading; pass `max-w-none` to fill a column you control.
 *
 * It's a descendant-styled container (the `@tailwindcss/typography` idea, done
 * with tokens), so it needs no plugin and re-themes with light/dark and accent.
 */
export type ProseProps = React.HTMLAttributes<HTMLDivElement>;

export const Prose = React.forwardRef<HTMLDivElement, ProseProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="prose"
      className={cn(
        "max-w-prose font-grotesk text-[15px] leading-[1.75] text-foreground",
        // vertical rhythm
        "[&>*+*]:mt-5",
        // headings
        "[&_h1]:mt-10 [&_h1]:mb-4 [&_h1]:font-hand [&_h1]:text-4xl [&_h1]:leading-tight [&_h1]:tracking-tight [&_h1]:text-foreground",
        "[&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:font-grotesk [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:leading-snug [&_h2]:tracking-tight [&_h2]:text-foreground",
        "[&_h3]:mt-8 [&_h3]:mb-2 [&_h3]:font-grotesk [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-foreground",
        "[&_h4]:mt-6 [&_h4]:mb-2 [&_h4]:font-mono [&_h4]:text-xs [&_h4]:font-bold [&_h4]:uppercase [&_h4]:tracking-[0.12em] [&_h4]:text-muted-foreground",
        // body
        "[&_p]:text-foreground/85",
        "[&_a]:font-medium [&_a]:text-accent [&_a]:underline [&_a]:decoration-from-font [&_a]:underline-offset-[3px] hover:[&_a]:text-[var(--accent-deep)]",
        "[&_strong]:font-bold [&_strong]:text-foreground",
        "[&_em]:italic",
        // lists
        "[&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mt-1.5 [&_li]:pl-1 [&_li]:marker:text-accent",
        // lead paragraph (first paragraph after an h1)
        "[&_h1+p]:text-lg [&_h1+p]:leading-relaxed [&_h1+p]:text-muted-foreground",
        // blockquote
        "[&_blockquote]:border-l-2 [&_blockquote]:border-accent [&_blockquote]:pl-4 [&_blockquote]:font-serif [&_blockquote]:text-lg [&_blockquote]:text-muted-foreground [&_blockquote]:italic",
        // code
        "[&_code]:rounded-[var(--radius-sm)] [&_code]:bg-secondary [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.85em] [&_code]:text-foreground",
        "[&_pre]:overflow-x-auto [&_pre]:rounded-[var(--radius-md)] [&_pre]:border [&_pre]:border-border [&_pre]:bg-secondary [&_pre]:p-4 [&_pre]:font-mono [&_pre]:text-[13px] [&_pre]:leading-relaxed",
        "[&_pre_code]:bg-transparent [&_pre_code]:p-0",
        // media & rules
        "[&_img]:rounded-[var(--radius-md)] [&_img]:border [&_img]:border-border",
        "[&_hr]:my-8 [&_hr]:border-border",
        // tables
        "[&_table]:w-full [&_table]:border-collapse [&_table]:text-sm",
        "[&_th]:border-b [&_th]:border-border [&_th]:py-2 [&_th]:pr-4 [&_th]:text-left [&_th]:font-mono [&_th]:text-[11px] [&_th]:uppercase [&_th]:tracking-[0.1em] [&_th]:text-muted-foreground",
        "[&_td]:border-b [&_td]:border-border [&_td]:py-2 [&_td]:pr-4",
        className,
      )}
      {...props}
    />
  ),
);
Prose.displayName = "Prose";
