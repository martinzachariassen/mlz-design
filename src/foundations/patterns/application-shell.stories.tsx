import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { BrandLockup } from "../../components/brand/brand-mark";
import { Avatar, AvatarFallback } from "../../components/data-display/avatar";
import { Kbd } from "../../components/data-display/kbd";
import { Button } from "../../components/forms/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../components/layout/breadcrumb";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../components/layout/collapsible";
import { Separator } from "../../components/layout/separator";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "../../components/overlay/command";
import { ChevronDownIcon } from "../../lib/icons";

const meta = {
  title: "Patterns/Application shell",
  tags: ["!autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function TopBar({ onOpenPalette }: { onOpenPalette?: () => void }) {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background/80 px-6 py-3 backdrop-blur">
      <BrandLockup size={30} tagline="" />
      <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
        {["Overview", "Components", "Tokens"].map((item, i) => (
          <Button key={item} variant={i === 0 ? "ghost" : "link"} size="sm">
            {item}
          </Button>
        ))}
      </nav>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenPalette}
          className="hidden items-center gap-1 rounded-[var(--radius-sm)] px-1.5 py-1 font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30 sm:flex"
        >
          <span className="sr-only">Open command palette</span>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </button>
        <Avatar size="sm" status="online">
          <AvatarFallback tone="accent">MZ</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}

/**
 * The bar every page in an app sits under. Brand lockup, one nav landmark, the
 * palette shortcut, and the account avatar — nothing else earns the space.
 *
 * The ⌘K chip is a real button, not decoration: on a touch device there is no
 * keyboard to press, so the only affordance has to be tappable.
 */
export const TopNav: Story = {
  render: function TopNavStory() {
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
      <div className="min-h-screen bg-background text-foreground">
        <TopBar onOpenPalette={() => setOpen(true)} />
        <div className="mx-auto max-w-6xl px-6 py-10">
          <p className="max-w-2xl font-mono text-sm leading-relaxed text-muted-foreground">
            Press <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>, or tap the chip in the bar. Both routes matter — a keyboard shortcut with
            no visible control is invisible to anyone who doesn't already know it exists.
          </p>
        </div>
        <CommandDialog open={open} onOpenChange={setOpen} label="Command palette">
          <CommandInput placeholder="Type a command or search…" />
          <CommandList>
            <CommandEmpty>Nothing matches that.</CommandEmpty>
            <CommandGroup heading="Go to">
              <CommandItem>Overview</CommandItem>
              <CommandItem>Components</CommandItem>
              <CommandItem>Tokens</CommandItem>
            </CommandGroup>
            <CommandGroup heading="Actions">
              <CommandItem>
                Deploy to production
                <CommandShortcut>⌘D</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </div>
    );
  },
};

/**
 * A sidebar of collapsible sections. **`Collapsible` is the right call here only
 * because the sections are independent** — if choosing one should close the
 * others, or the arrow keys should move between their headers, that is
 * `Accordion` and this shape is an accordion missing its keyboard support.
 */
export const SidebarNav: Story = {
  render: () => (
    <div className="min-h-screen bg-background text-foreground">
      <TopBar />
      <div className="mx-auto flex max-w-6xl gap-10 px-6 py-8">
        <nav aria-label="Sections" className="w-56 shrink-0">
          {[
            ["Get started", ["Introduction", "Installation", "Theming"]],
            ["Components", ["Button", "Card", "Dialog", "Command"]],
            ["Foundations", ["Colour", "Typography", "Motion"]],
          ].map(([section, items]) => (
            <Collapsible key={section as string} defaultOpen>
              <CollapsibleTrigger className="group">
                {section}
                <ChevronDownIcon className="transition-transform group-data-[state=open]:rotate-180" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <ul className="flex flex-col pb-2">
                  {(items as string[]).map((item) => (
                    <li key={item}>
                      <a
                        href={`#${item}`}
                        className="block rounded-[var(--radius-sm)] px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </nav>
        <Separator orientation="vertical" className="hidden sm:block" />
        <main className="min-w-0 flex-1">
          <h1 className="font-hand text-4xl">Command</h1>
          <p className="mt-4 max-w-prose text-sm leading-relaxed text-muted-foreground">
            A filterable list of commands — the ⌘K palette, and the engine behind Combobox.
          </p>
        </main>
      </div>
    </div>
  ),
};

/**
 * Where the reader is, and the way back up. `BreadcrumbPage` marks the current
 * page with `aria-current` and deliberately isn't a link — a link to where you
 * already are is a dead end that still takes a tab stop.
 */
export const BreadcrumbedPage: Story = {
  render: () => (
    <div className="min-h-screen bg-background text-foreground">
      <TopBar />
      <div className="mx-auto max-w-6xl px-6 py-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Components</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Overlay</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Command</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="mt-6 font-hand text-5xl">Command</h1>
        <div className="mt-8 max-w-xl">
          <Command
            aria-label="Commands"
            className="rounded-[var(--radius-lg)] border border-border"
          >
            <CommandInput placeholder="Search…" />
            <CommandList>
              <CommandGroup heading="Projects">
                <CommandItem>aurora</CommandItem>
                <CommandItem>borealis</CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      </div>
    </div>
  ),
};
