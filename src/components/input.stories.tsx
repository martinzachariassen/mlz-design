import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "./input";

const meta = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    type: { control: "select", options: ["text", "email", "password", "search", "number"] },
  },
  args: { placeholder: "hi@mlz.no", type: "email" },
  parameters: { layout: "padded" },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <div className="w-72">
      <Input {...args} />
    </div>
  ),
};

export const Disabled: Story = {
  args: { disabled: true, placeholder: "Unavailable" },
  render: (args) => (
    <div className="w-72">
      <Input {...args} />
    </div>
  ),
};
