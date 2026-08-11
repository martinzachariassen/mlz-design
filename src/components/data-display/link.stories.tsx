import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeSplit } from "../../foundations/theme-split";
import { Button } from "../forms/button";
import { Link } from "./link";

const meta = {
  title: "Components/Data display/Link",
  component: Link,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["default", "subtle", "quiet"],
      description: "How loudly it announces itself in the surrounding text.",
    },
    external: { control: "boolean" },
    children: { control: "text" },
  },
  args: { children: "Selected work", href: "#", variant: "default" },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Every prop wired up. Tab to it — the focus ring is the same one every control uses. */
export const Playground: Story = {};

/** Three weights. `default` is for running text, where the underline is what marks it as a link. */
export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 text-sm">
      <p>
        Read the <Link href="#">architecture notes</Link> before changing a token.
      </p>
      <p>
        Browse the <Link href="#">component catalogue</Link>.
      </p>
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
        `subtle` belongs on a standalone link, never inside a sentence — there the underline is what
        marks it as a link at all.
      </p>
      <div>
        <Link href="#" variant="subtle">
          Standalone subtle link
        </Link>
      </div>
      <p className="text-muted-foreground">
        <Link href="#" variant="quiet">
          Privacy
        </Link>{" "}
        ·{" "}
        <Link href="#" variant="quiet">
          Imprint
        </Link>
      </p>
    </div>
  ),
};

/**
 * `external` adds `target="_blank"` with `rel="noopener noreferrer"` and an
 * "(opens in a new tab)" note for screen readers — opening a tab unannounced is
 * disorienting for anyone who can't see it happen.
 */
export const External: Story = {
  render: () => (
    <p className="text-sm">
      Source lives on{" "}
      <Link href="https://github.com/martinzachariassen/mlz-design" external>
        GitHub
      </Link>
      .
    </p>
  ),
};

/**
 * **A link goes somewhere; a button does something.** That's not cosmetic — a link is
 * middle-clickable, bookmarkable and opens with Enter, a button responds to Space and
 * can't be opened in a new tab. If it changes a URL, it's a link.
 */
export const LinkVersusButton: Story = {
  render: () => (
    <div className="flex flex-col gap-6 text-sm">
      <div className="flex items-center gap-4">
        <Link href="#">Go to settings</Link>
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          navigates → Link
        </span>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="link" size="sm">
          Reset preferences
        </Button>
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          acts → Button
        </span>
      </div>
    </div>
  ),
};

/** `asChild` hands the styling to a router's link component without wrapping it in an extra anchor. */
export const AsChild: Story = {
  render: () => (
    <Link asChild>
      {/* Stand-in for a router link — it keeps its own href and props. */}
      <a href="/settings" data-router-link="true">
        Router link
      </a>
    </Link>
  ),
};

export const LightDark: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <ThemeSplit>
      <div className="flex flex-col gap-3 text-sm">
        <Link href="#">Default</Link>
        <Link href="#" variant="subtle">
          Subtle
        </Link>
        <Link href="#" variant="quiet">
          Quiet
        </Link>
      </div>
    </ThemeSplit>
  ),
};
