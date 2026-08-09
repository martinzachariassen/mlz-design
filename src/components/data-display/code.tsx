import * as React from "react";
import { cn } from "../../lib/cn";
import { CheckIcon } from "../../lib/icons";
import { named } from "../../lib/named";
import { useCopyToClipboard } from "../../lib/use-copy-to-clipboard";

export type CodeProps = React.HTMLAttributes<HTMLElement>;

/**
 * Inline code — an identifier, a filename, a value, in running text.
 *
 * **Reach for `Kbd`** when it is a key the reader should press: `<kbd>` and
 * `<code>` mean different things, and a screen reader can distinguish them.
 *
 * Inside `Prose`, plain `<code>` elements are already styled by the descendant
 * rules there — this is for code outside long-form copy, where nothing else
 * would style it. Using it inside `Prose` is harmless: the classes are the same
 * shape and `tailwind-merge` keeps the later win.
 */
export const Code = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<HTMLElement, CodeProps>(({ className, ...props }, ref) => (
    <code
      ref={ref}
      data-slot="code"
      className={cn(
        "rounded-[var(--radius-sm)] bg-secondary px-1.5 py-0.5 font-mono text-[0.85em] text-foreground",
        className,
      )}
      {...props}
    />
  )),
  "Code",
);

export interface CodeBlockProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** The code. A plain string — this component does not highlight or parse it. */
  children: string;
  /** Shown in the header bar. A filename, or a language, or a shell prompt. */
  filename?: React.ReactNode;
  /** Adds a copy button. Needs a secure context; falls back to doing nothing. */
  copyable?: boolean;
  /** Accessible name for the copy button. */
  copyLabel?: string;
}

/**
 * A block of code, with an optional filename header and copy button.
 *
 * **Deliberately unhighlighted.** Syntax highlighting means shipping a grammar
 * bundle and a colour scheme that has to be reconciled with the token layer in
 * both themes and five accents — a large dependency for decoration. The
 * engineering-notebook voice reads fine in one mono weight. If you need
 * highlighting in a consuming app, render your own `<pre>` inside this shell.
 *
 * The code is a `string`, not arbitrary children, so it can be handed to the
 * clipboard as-is. Wrapping is off and the block scrolls horizontally: a
 * mid-token line break in a shell command is worse than a scrollbar.
 *
 * ```tsx
 * <CodeBlock filename="app.css" copyable>{`@import "tailwindcss";`}</CodeBlock>
 * ```
 */
export const CodeBlock = /* @__PURE__ */ named(
  /* @__PURE__ */ React.forwardRef<HTMLDivElement, CodeBlockProps>(
    ({ children, filename, copyable, copyLabel = "Copy code", className, ...props }, ref) => {
      const { copied, copy } = useCopyToClipboard();

      return (
        <div
          ref={ref}
          data-slot="code-block"
          className={cn(
            "overflow-hidden rounded-[var(--radius-md)] border border-border bg-secondary",
            className,
          )}
          {...props}
        >
          {filename || copyable ? (
            <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-2">
              <span className="truncate font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                {filename}
              </span>
              {copyable ? (
                <button
                  type="button"
                  onClick={() => void copy(children)}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-[var(--radius-sm)] px-1.5 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30"
                >
                  {copied ? <CheckIcon className="size-3.5 text-success-deep" /> : null}
                  {copied ? "Copied" : "Copy"}
                  <span className="sr-only">{copyLabel}</span>
                </button>
              ) : null}
            </div>
          ) : null}
          {/* A scrollable box must be reachable by keyboard (WCAG 2.1.1, and axe's
            `scrollable-region-focusable`) — the same reasoning as `Table`'s
            container. Deliberately no `role="region"`: an unnamed landmark is
            worse than none, and `filename` is not always there to name it. */}
          <pre
            // biome-ignore lint/a11y/noNoninteractiveTabindex: making the scroll container focusable is the point — it's how a keyboard user reads a long line
            tabIndex={0}
            className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30"
          >
            <code>{children}</code>
          </pre>
        </div>
      );
    },
  ),
  "CodeBlock",
);
