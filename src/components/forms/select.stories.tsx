import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { ThemeSplit } from "../../foundations/theme-split";
import { Label } from "./label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./select";

const meta = {
  title: "Components/Forms/Select",
  component: Select,
  subcomponents: { SelectTrigger, SelectContent, SelectItem, SelectLabel, SelectSeparator },
  tags: ["autodocs", "status:new"],
  parameters: { layout: "centered" },
  argTypes: {
    defaultValue: { control: "text", description: "Uncontrolled initial value." },
    disabled: { control: "boolean", description: "Disables the trigger." },
  },
  args: { defaultValue: "oslo" },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Every prop wired to a control. Open it and use the arrow keys, or type to jump to an option. */
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("combobox", { name: "City" }));
    await expect(await within(document.body).findByRole("listbox")).toBeInTheDocument();
  },
  render: (args) => (
    <Select {...args}>
      <SelectTrigger className="w-64" aria-label="City">
        <SelectValue placeholder="Pick a city" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="oslo">Oslo</SelectItem>
        <SelectItem value="bergen">Bergen</SelectItem>
        <SelectItem value="trondheim">Trondheim</SelectItem>
        <SelectItem value="tromso">Tromsø</SelectItem>
      </SelectContent>
    </Select>
  ),
};

/** Always pair it with a visible `Label` — the trigger has no accessible name of its own. */
export const WithLabel: Story = {
  render: (args) => (
    <div className="flex w-64 flex-col gap-2">
      <Label htmlFor="city">Deploy region</Label>
      <Select {...args}>
        <SelectTrigger id="city">
          <SelectValue placeholder="Pick a region" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="oslo">Oslo</SelectItem>
          <SelectItem value="bergen">Bergen</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};

/** With nothing chosen, the placeholder sits in muted type so an empty field reads as empty. */
export const Placeholder: Story = {
  args: { defaultValue: undefined },
  render: (args) => (
    <Select {...args}>
      <SelectTrigger className="w-64" aria-label="City">
        <SelectValue placeholder="Pick a city" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="oslo">Oslo</SelectItem>
        <SelectItem value="bergen">Bergen</SelectItem>
      </SelectContent>
    </Select>
  ),
};

/** `SelectGroup` + `SelectLabel` section a long list; `SelectSeparator` rules between them. */
export const Grouped: Story = {
  args: { defaultValue: "oslo" },
  render: (args) => (
    <Select {...args}>
      <SelectTrigger className="w-64" aria-label="City">
        <SelectValue placeholder="Pick a city" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Norway</SelectLabel>
          <SelectItem value="oslo">Oslo</SelectItem>
          <SelectItem value="bergen">Bergen</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Sweden</SelectLabel>
          <SelectItem value="stockholm">Stockholm</SelectItem>
          <SelectItem value="malmo">Malmö</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

/** The whole field can be disabled, or a single option held back. */
export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Select defaultValue="oslo" disabled>
        <SelectTrigger className="w-64" aria-label="Disabled select">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="oslo">Oslo</SelectItem>
        </SelectContent>
      </Select>
      <Select defaultValue="oslo">
        <SelectTrigger className="w-64" aria-label="Select with a disabled option">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="oslo">Oslo</SelectItem>
          <SelectItem value="svalbard" disabled>
            Svalbard — no capacity
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};

export const LightDark: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <ThemeSplit>
      <Select defaultValue="oslo">
        <SelectTrigger className="w-56" aria-label="City">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="oslo">Oslo</SelectItem>
          <SelectItem value="bergen">Bergen</SelectItem>
        </SelectContent>
      </Select>
    </ThemeSplit>
  ),
};
