import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { ThemeSplit } from "../../foundations/theme-split";
import { Kbd } from "../data-display/kbd";
import { Button } from "../forms/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "./command";

const meta = {
  title: "Components/Overlay/Command",
  component: Command,
  subcomponents: {
    CommandInput,
    CommandList,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandSeparator,
    CommandShortcut,
    CommandDialog,
  },
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: { children: null },
  argTypes: { children: { table: { disable: true } } },
} satisfies Meta<typeof Command>;

export default meta;
type Story = StoryObj<typeof meta>;

function Entries() {
  return (
    <CommandList>
      <CommandEmpty>Nothing matches that.</CommandEmpty>
      <CommandGroup heading="Projects">
        <CommandItem>aurora</CommandItem>
        <CommandItem>borealis</CommandItem>
        <CommandItem>meridian</CommandItem>
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading="Actions">
        <CommandItem>
          Deploy to production
          <CommandShortcut>⌘D</CommandShortcut>
        </CommandItem>
        <CommandItem>
          Open settings
          <CommandShortcut>⌘,</CommandShortcut>
        </CommandItem>
        <CommandItem disabled>Rotate deploy key</CommandItem>
      </CommandGroup>
    </CommandList>
  );
}

/**
 * The raw list. Type to filter — the arrow keys move through visible items only,
 * and a group whose items are all filtered out hides its own heading.
 */
export const Playground: Story = {
  render: () => (
    <Command
      aria-label="Commands"
      className="w-96 rounded-[var(--radius-lg)] border border-border shadow-[var(--shadow-md)]"
    >
      <CommandInput placeholder="Search projects and actions…" />
      <Entries />
    </Command>
  ),
};

/**
 * The ⌘K palette. **Binding the shortcut is yours** — a component shouldn't take
 * a global key listener on your behalf. It's four lines, and they're in the source
 * of this story.
 */
export const Palette: Story = {
  render: function PaletteStory() {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
      const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
          event.preventDefault();
          setOpen((previous) => !previous);
        }
      };
      document.addEventListener("keydown", onKeyDown);
      return () => document.removeEventListener("keydown", onKeyDown);
    }, []);

    return (
      <div className="flex flex-col items-center gap-5">
        <Button variant="ghost" size="sm" onClick={() => setOpen(true)}>
          <span className="flex items-center gap-2">
            Open palette
            <span className="flex items-center gap-1">
              <Kbd>⌘</Kbd>
              <Kbd>K</Kbd>
            </span>
          </span>
        </Button>
        <p className="max-w-xs text-center text-[13px] leading-relaxed text-muted-foreground">
          The shortcut works anywhere on this canvas. Esc closes it, and focus returns to wherever
          it was.
        </p>
        <CommandDialog open={open} onOpenChange={setOpen} label="Command palette">
          <CommandInput placeholder="Type a command or search…" />
          <Entries />
        </CommandDialog>
      </div>
    );
  },
};

/**
 * `CommandEmpty` is not optional — a palette that goes blank on a bad search reads
 * as broken rather than as empty.
 */
export const NoResults: Story = {
  render: () => (
    <Command
      aria-label="Commands"
      className="w-96 rounded-[var(--radius-lg)] border border-border"
      // `value` is cmdk's *highlighted item*; the search term is `search`.
      defaultValue=""
    >
      <CommandInput placeholder="Search…" defaultValue="quantum" />
      <CommandList>
        <CommandEmpty>
          Nothing matches <span className="text-foreground">quantum</span>.
        </CommandEmpty>
        <CommandGroup heading="Projects">
          <CommandItem>aurora</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};

/**
 * **Built on this system's native `<dialog>`, not cmdk's own `Command.Dialog`.**
 * That one wraps Radix Dialog, which would put two modal implementations in one
 * package with different focus-trap and top-layer behaviour. This shares the engine
 * `Dialog`, `Sheet` and `AlertDialog` use, so Esc and inerting behave identically
 * everywhere.
 */
export const LightDark: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <ThemeSplit>
      <Command
        aria-label="Commands"
        className="w-full max-w-xs rounded-[var(--radius-lg)] border border-border"
      >
        <CommandInput placeholder="Search…" />
        <CommandList>
          <CommandGroup heading="Projects">
            <CommandItem>aurora</CommandItem>
            <CommandItem>borealis</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </ThemeSplit>
  ),
};
