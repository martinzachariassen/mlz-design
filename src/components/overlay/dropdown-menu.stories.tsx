import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { expect, userEvent, within } from "storybook/test";
import { ThemeSplit } from "../../foundations/theme-split";
import { Button } from "../forms/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./dropdown-menu";

const meta = {
  title: "Components/Overlay/DropdownMenu",
  component: DropdownMenu,
  subcomponents: {
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuCheckboxItem,
    DropdownMenuRadioItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent,
    DropdownMenuShortcut,
  },
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    defaultOpen: { control: "boolean", description: "Start open — handy for screenshots." },
    modal: {
      control: "boolean",
      description: "Modal menus block scroll and outside interaction while open.",
    },
  },
  args: { modal: true },
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Every prop wired to a control. Open it and try the arrow keys, Home/End, and type-ahead. */
export const Playground: Story = {
  parameters: {
    a11y: {
      // A *modal* Radix overlay marks the rest of the page `aria-hidden` while
      // it's open (via the `aria-hidden` package), and axe then flags the
      // still-focusable trigger underneath as `aria-hidden-focus`. That is
      // Radix's modal strategy, not our markup — focus is moved into the
      // overlay, so screen readers behave correctly — and it fires only because
      // the `play` function audits the open state in isolation. Note the
      // `Dialog` story does *not* trip this: the native `<dialog>` element uses
      // the top layer and inerting instead of `aria-hidden`.
      config: { rules: [{ id: "aria-hidden-focus", enabled: false }] },
    },
  },
  // Opens the menu so the a11y run audits the rendered items, not just the
  // trigger. Everything portals out of #storybook-root, hence the `body` scope
  // in .storybook/test-runner.ts.
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: /Actions/ }));
    await expect(await within(document.body).findByRole("menu")).toBeInTheDocument();
  },
  render: (args) => (
    <DropdownMenu {...args}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">Actions</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Deployment</DropdownMenuLabel>
        <DropdownMenuItem>
          Redeploy
          <DropdownMenuShortcut>⌘R</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>View logs</DropdownMenuItem>
        <DropdownMenuItem disabled>Roll back — no previous build</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          Delete project
          <DropdownMenuShortcut>⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

/** Checkbox rows toggle view state — which columns to show — and stay open between clicks. */
export const CheckboxItems: Story = {
  render: function CheckboxItemsStory() {
    const [cols, setCols] = React.useState({ status: true, region: false });
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">Columns</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Visible columns</DropdownMenuLabel>
          <DropdownMenuCheckboxItem
            checked={cols.status}
            onCheckedChange={(v) => setCols((c) => ({ ...c, status: v === true }))}
            onSelect={(event) => event.preventDefault()}
          >
            Status
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={cols.region}
            onCheckedChange={(v) => setCols((c) => ({ ...c, region: v === true }))}
            onSelect={(event) => event.preventDefault()}
          >
            Region
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

/** Radio rows pick one of a few — a sort order, say. Note this is view state, not a form field. */
export const RadioItems: Story = {
  render: function RadioItemsStory() {
    const [sort, setSort] = React.useState("recent");
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">Sort</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Order by</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
            <DropdownMenuRadioItem value="recent">Most recent</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="name">Name</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="size">Size</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

/** A submenu for a secondary branch. One level deep is plenty — two is a sign the menu should be a page. */
export const Submenu: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">Project</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem>Open</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Move to</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Personal</DropdownMenuItem>
              <DropdownMenuItem>Work</DropdownMenuItem>
              <DropdownMenuItem>Archive</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const LightDark: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <ThemeSplit>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">Actions</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Deployment</DropdownMenuLabel>
          <DropdownMenuItem>Redeploy</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </ThemeSplit>
  ),
};
