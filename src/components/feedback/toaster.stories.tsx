import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Button } from "../forms/button";
import { Toaster, toast } from "./toaster";

const meta = {
  title: "Components/Feedback/Toaster",
  component: Toaster,
  tags: ["autodocs", "status:new"],
  parameters: { layout: "centered" },
  argTypes: {
    position: {
      control: "select",
      options: [
        "top-left",
        "top-center",
        "top-right",
        "bottom-left",
        "bottom-center",
        "bottom-right",
      ],
    },
    closeButton: { control: "boolean" },
    richColors: { table: { disable: true } },
  },
  args: { position: "bottom-right" },
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Raise one and watch it go. `Toaster` is mounted once; `toast()` is called from anywhere. */
export const Playground: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: /Deploy/ }));
    await expect(await within(document.body).findByText("Deployment queued")).toBeInTheDocument();
  },
  render: (args) => (
    <>
      <Button
        variant="solid"
        onClick={() => toast.success("Deployment queued", { description: "mlz-design · main" })}
      >
        Deploy
      </Button>
      <Toaster {...args} />
    </>
  ),
};

/**
 * The four signals, using the same tokens `Alert` and `Callout` do — a success
 * toast and a success alert are the same green.
 */
export const Signals: Story = {
  render: (args) => (
    <>
      <div className="flex flex-wrap gap-3">
        <Button variant="ghost" onClick={() => toast("Saved")}>
          Default
        </Button>
        <Button variant="ghost" onClick={() => toast.success("Deployment queued")}>
          Success
        </Button>
        <Button variant="ghost" onClick={() => toast.info("Build started")}>
          Info
        </Button>
        <Button variant="ghost" onClick={() => toast.warning("Quota almost reached")}>
          Warning
        </Button>
        <Button variant="ghost" onClick={() => toast.error("Could not reach the registry")}>
          Error
        </Button>
      </div>
      <Toaster {...args} />
    </>
  ),
};

/** An action turns a toast into an undo affordance — the one case where a control belongs in one. */
export const WithAction: Story = {
  render: (args) => (
    <>
      <Button
        variant="solid"
        onClick={() =>
          toast("Project archived", {
            action: { label: "Undo", onClick: () => toast.success("Restored") },
          })
        }
      >
        Archive
      </Button>
      <Toaster {...args} />
    </>
  ),
};

/** `toast.promise` swaps a loading toast for the result when the work settles. */
export const PromiseToast: Story = {
  render: (args) => (
    <>
      <Button
        variant="solid"
        onClick={() =>
          toast.promise(new Promise((resolve) => setTimeout(resolve, 1200)), {
            loading: "Deploying…",
            success: "Deployed",
            error: "Deploy failed",
          })
        }
      >
        Deploy with progress
      </Button>
      <Toaster {...args} />
    </>
  ),
};
