import * as React from "react";

export interface UseCopyToClipboard {
  /** True from a successful copy until `resetMs` has passed. */
  copied: boolean;
  /** Writes `text` to the clipboard. Resolves to whether it landed. */
  copy: (text: string) => Promise<boolean>;
}

/**
 * Clipboard copy with a self-clearing confirmation flag — the "Copied ✓" that
 * fades back to "Copy" on its own.
 *
 * `navigator.clipboard` needs a secure context and can be refused outright, so
 * `copy` reports whether it worked rather than throwing: a failed copy leaves the
 * label alone, which is honest, and the content is still selectable by hand. The
 * reset timer is cancelled on unmount, so a component that disappears mid-flash
 * doesn't set state afterwards.
 *
 * ```tsx
 * const { copied, copy } = useCopyToClipboard();
 * <button onClick={() => copy(value)}>{copied ? "Copied" : "Copy"}</button>
 * ```
 */
export function useCopyToClipboard(resetMs = 2000): UseCopyToClipboard {
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), resetMs);
    return () => clearTimeout(timer);
  }, [copied, resetMs]);

  const copy = React.useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      return true;
    } catch {
      // Insecure context, or permission refused. Nothing useful to say — the
      // value is selectable, which is the fallback the user already knows.
      return false;
    }
  }, []);

  return { copied, copy };
}
