import "@testing-library/jest-dom/vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { stubResizeObserver, stubScrollIntoView } from "../../lib/dom-test-env";
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
import { stubNativeDialog } from "./modal-test-env";

beforeAll(() => {
  stubNativeDialog();
  stubResizeObserver();
  stubScrollIntoView();
});

function List({ onSelect }: { onSelect?: (value: string) => void } = {}) {
  return (
    <Command aria-label="Commands">
      <CommandInput placeholder="Search…" />
      <CommandList>
        <CommandEmpty>No results.</CommandEmpty>
        <CommandGroup heading="Projects">
          <CommandItem onSelect={() => onSelect?.("aurora")}>aurora</CommandItem>
          <CommandItem onSelect={() => onSelect?.("borealis")}>borealis</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Actions">
          <CommandItem onSelect={() => onSelect?.("deploy")}>
            Deploy
            <CommandShortcut>⌘D</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

describe("Command", () => {
  it("lists everything before anything is typed", () => {
    render(<List />);
    expect(screen.getByText("aurora")).toBeInTheDocument();
    expect(screen.getByText("borealis")).toBeInTheDocument();
    expect(screen.getByText("Deploy")).toBeInTheDocument();
  });

  it("filters as you type", async () => {
    const user = userEvent.setup();
    render(<List />);
    await user.type(screen.getByPlaceholderText("Search…"), "aur");
    await waitFor(() => expect(screen.queryByText("borealis")).not.toBeInTheDocument());
    expect(screen.getByText("aurora")).toBeInTheDocument();
  });

  // A group heading that outlives its own items is a dangling label. cmdk keeps
  // the element and sets `hidden` on it rather than unmounting, so that — not
  // absence from the DOM — is the contract to assert.
  it("hides a group once everything in it is filtered out", async () => {
    const user = userEvent.setup();
    const { container } = render(<List />);
    await user.type(screen.getByPlaceholderText("Search…"), "deploy");

    await waitFor(() => {
      const groups = [...container.querySelectorAll('[data-slot="command-group"]')];
      const byHeading = Object.fromEntries(
        groups.map((g) => [g.textContent?.startsWith("Projects") ? "Projects" : "Actions", g]),
      );
      expect(byHeading.Projects).toHaveAttribute("hidden");
      expect(byHeading.Actions).not.toHaveAttribute("hidden");
    });
  });

  it("shows the empty state when nothing matches", async () => {
    const user = userEvent.setup();
    render(<List />);
    await user.type(screen.getByPlaceholderText("Search…"), "zzzz");
    expect(await screen.findByText("No results.")).toBeInTheDocument();
  });

  it("runs the highlighted item on Enter", async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(<List onSelect={onSelect} />);
    const input = screen.getByPlaceholderText("Search…");
    await user.type(input, "bore");
    await waitFor(() => expect(screen.getByText("borealis")).toBeInTheDocument());
    await user.keyboard("{Enter}");
    expect(onSelect).toHaveBeenCalledWith("borealis");
  });

  // cmdk's internal sizer div sits between the listbox and its groups with no
  // role, which makes a screen reader announce an empty listbox. Marking it
  // presentational lets the real roles through — axe flags this as critical.
  it("keeps the listbox's groups visible in the accessibility tree", () => {
    const { container } = render(<List />);
    const listbox = container.querySelector('[role="listbox"]');
    const sizer = listbox?.querySelector("[cmdk-list-sizer]");
    expect(sizer).toHaveAttribute("role", "presentation");
  });

  // A listbox owns only `option` and `group`; cmdk's separator defaults to
  // role="separator", which breaks that contract. The group headings already
  // carry the structure, so the line is purely visual.
  it("keeps the separator out of the accessibility tree", () => {
    const { container } = render(<List />);
    const separator = container.querySelector('[data-slot="command-separator"]');
    expect(separator).toHaveAttribute("role", "presentation");
    expect(separator).toHaveAttribute("aria-hidden", "true");
  });

  it("selects on click too", async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(<List onSelect={onSelect} />);
    await user.click(screen.getByText("aurora"));
    expect(onSelect).toHaveBeenCalledWith("aurora");
  });
});

describe("CommandDialog", () => {
  it("mounts nothing while closed", () => {
    render(
      <CommandDialog label="Command palette">
        <CommandInput placeholder="Type a command…" />
        <CommandList>
          <CommandItem>aurora</CommandItem>
        </CommandList>
      </CommandDialog>,
    );
    expect(screen.queryByPlaceholderText("Type a command…")).not.toBeInTheDocument();
  });

  // The palette has no visible title, so `label` is the only thing naming it.
  it("names itself from label", () => {
    render(
      <CommandDialog defaultOpen label="Command palette">
        <CommandInput placeholder="Type a command…" />
        <CommandList>
          <CommandItem>aurora</CommandItem>
        </CommandList>
      </CommandDialog>,
    );
    expect(screen.getByLabelText("Command palette")).toBeInTheDocument();
  });

  // It runs on this system's native <dialog>, not cmdk's Radix-backed one — so
  // there is exactly one modal implementation in the package.
  it("renders in a native dialog element", () => {
    const { container } = render(
      <CommandDialog defaultOpen label="Command palette">
        <CommandInput placeholder="Type a command…" />
        <CommandList>
          <CommandItem>aurora</CommandItem>
        </CommandList>
      </CommandDialog>,
    );
    const dialog = container.querySelector('[data-slot="command-dialog"]');
    expect(dialog?.tagName).toBe("DIALOG");
  });
});
