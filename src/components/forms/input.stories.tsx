import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeSplit } from "../../foundations/theme-split";
import { Input } from "./input";

const meta = {
  title: "Components/Forms/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    placeholder: {
      description: "Hint text. A placeholder is not a label — keep a real `Label` alongside it.",
      control: "text",
    },
    disabled: { description: "Dim the field and block interaction.", control: "boolean" },
    type: {
      description: "Native input type — drives the mobile keyboard and built-in validation.",
      control: "select",
      options: ["text", "email", "password", "search", "number"],
    },
  },
  args: { placeholder: "you@example.com", type: "email" },
  parameters: { layout: "padded" },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Focus the field to see the border move to the ring colour with its soft halo. */
export const Playground: Story = {
  render: (args) => (
    <div className="w-72">
      <Input {...args} />
    </div>
  ),
};

/**
 * `prefix`/`suffix` render inside the frame — a search icon, a unit, a reveal
 * button — so the border and focus ring stay the component's problem.
 */
export const WithSlots: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-3">
      <Input
        aria-label="Search"
        placeholder="Search…"
        prefix={
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
        }
      />
      <Input aria-label="Price" placeholder="0.00" suffix={<span aria-hidden>NOK</span>} />
    </div>
  ),
};

/** `sm` (h-9) lines up with `Button size="sm"` in a toolbar row. */
export const Sizes: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-3">
      <Input aria-label="Compact" size="sm" placeholder="size=sm" />
      <Input aria-label="Regular" placeholder="size=default" />
    </div>
  ),
};

/** Disabled fields dim and take a not-allowed cursor. Use `readOnly` instead when the value still matters to the form. */
export const Disabled: Story = {
  args: { disabled: true, placeholder: "Unavailable" },
  render: (args) => (
    <div className="w-72">
      <Input {...args} />
    </div>
  ),
};

/** Default and disabled in both themes — the field paper follows `--background`, never a fixed white. */
export const LightDark: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <ThemeSplit>
      <div className="flex w-72 flex-col gap-4">
        <Input type="email" placeholder="you@example.com" />
        <Input disabled placeholder="Unavailable" />
      </div>
    </ThemeSplit>
  ),
};
