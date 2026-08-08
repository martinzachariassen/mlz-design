import { createElement, Fragment, type ReactNode } from "react";
import { addons } from "storybook/manager-api";
import { fonts, signals } from "../src/tokens";
import { oklchToHex } from "./oklch";
import { mlzTheme } from "./theme";

/**
 * Sidebar status badges.
 *
 * The vocabulary is **exceptions only**: a component with nothing to say carries
 * no tag and reads as stable, which is the common case and therefore the one
 * that must cost nothing to maintain. Tagging all ~45 metas `stable` would be a
 * wall of noise that goes stale the moment anyone forgets to update it.
 *
 * Tags are namespaced (`status:new`, not `new`) so they can't collide with
 * Storybook's own reserved tags — `autodocs`, `dev`, `test`, `docs-only`.
 *
 * `status:new` is the one that needs pruning: clear it when cutting a minor
 * release, or everything is permanently new. The other two describe an API
 * contract rather than a date and look after themselves.
 *
 * **Written with `createElement`, not JSX, on purpose.** The manager bundle is
 * compiled with the *classic* JSX transform, so JSX here emits bare
 * `React.createElement` calls and the built manager dies with "React is not
 * defined" — while `storybook dev` works fine, because the dev manager resolves
 * it. Importing `React` to satisfy that then trips Biome's `noUnusedImports`,
 * since `tsconfig` declares the automatic runtime. Calling `createElement`
 * directly sidesteps both, and this file is two elements long.
 */
const STATUS_BADGES = {
  "status:new": { label: "new", color: oklchToHex(signals.success) },
  "status:experimental": { label: "beta", color: oklchToHex(signals.warning) },
  "status:deprecated": { label: "deprecated", color: oklchToHex(signals.danger) },
} as const;

function badge(label: string, color: string): ReactNode {
  return createElement(
    "span",
    {
      key: "badge",
      style: {
        marginLeft: 6,
        padding: "1px 5px",
        borderRadius: 3,
        border: `1px solid ${color}`,
        color,
        fontFamily: fonts.mono,
        fontSize: 9,
        lineHeight: "14px",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        verticalAlign: "middle",
        whiteSpace: "nowrap",
      },
    },
    label,
  );
}

addons.setConfig({
  theme: mlzTheme,
  sidebar: {
    // Components are grouped by function, and the group names are the navigation
    // — showing them expanded is the whole point of the structure.
    showRoots: true,

    // Storybook 10.5.7 has no `tagBadges` config, but `renderLabel` receives the
    // entry with its tags, which is enough to draw them ourselves. Returning a
    // plain string for the untagged case keeps the default rendering path.
    //
    // Component nodes only. Tags inherit from the meta down to every story and
    // docs entry underneath it, so without this guard one tagged component paints
    // "NEW" on eight rows — the badge stops meaning anything.
    renderLabel: (item) => {
      const status =
        item.type === "component"
          ? item.tags?.find((tag): tag is keyof typeof STATUS_BADGES =>
              Object.hasOwn(STATUS_BADGES, tag),
            )
          : undefined;
      if (!status) return item.name;
      const { label, color } = STATUS_BADGES[status];
      return createElement(Fragment, null, item.name, badge(label, color));
    },
  },
});
