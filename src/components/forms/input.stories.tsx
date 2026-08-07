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
