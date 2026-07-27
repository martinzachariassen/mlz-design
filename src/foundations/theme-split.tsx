import type { ReactNode } from "react";

/**
 * Storybook-only helper (never shipped — not reachable from `src/index.ts`).
 *
 * Renders its children twice, side by side: once in a forced-light subtree and
 * once in a forced-dark one, each on its own `background`/`foreground` surface.
 * This proves a component reads only semantic tokens and adapts to both themes at
 * a glance — no toolbar flipping. The accent still inherits from the global
 * `html[data-accent]` toolbar knob, so both panes track the chosen accent.
 *
 * Forcing works because theme.css matches light on `[data-theme="light"]` and dark
 * on `[data-theme="dark"]`, so a nested pane overrides whatever the ancestor is.
 */
export function ThemeSplit({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-lg)] border border-border bg-border sm:grid-cols-2">
      <Pane theme="light">{children}</Pane>
      <Pane theme="dark">{children}</Pane>
    </div>
  );
}

function Pane({ theme, children }: { theme: "light" | "dark"; children: ReactNode }) {
  return (
    <div
      data-theme={theme}
      className="flex min-h-56 flex-col gap-6 bg-background p-8 text-foreground"
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
        {theme}
      </span>
      <div className="flex flex-1 flex-wrap items-center justify-center gap-6">{children}</div>
    </div>
  );
}
