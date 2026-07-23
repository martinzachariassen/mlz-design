import type { Meta, StoryObj } from "@storybook/react-vite";
import { Alert, AlertDescription, AlertTitle } from "./alert";

const meta = {
  title: "Components/Alert",
  component: Alert,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "info", "success", "warning", "destructive"],
    },
  },
  args: { variant: "default" },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

const InfoIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 7.25v3.5M8 5.25v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const Playground: Story = {
  render: (args) => (
    <Alert {...args} className="max-w-md">
      <AlertTitle>Build complete</AlertTitle>
      <AlertDescription>The package compiled cleanly and the tokens are in sync.</AlertDescription>
    </Alert>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Alert variant="default">
        <AlertTitle>Heads up</AlertTitle>
        <AlertDescription>A neutral, card-like notice.</AlertDescription>
      </Alert>
      <Alert variant="info">
        <AlertTitle>For your info</AlertTitle>
        <AlertDescription>Storybook is running on port 6006.</AlertDescription>
      </Alert>
      <Alert variant="success">
        <AlertTitle>Deployed</AlertTitle>
        <AlertDescription>Release v0.1.0 shipped to production.</AlertDescription>
      </Alert>
      <Alert variant="warning">
        <AlertTitle>Token drift</AlertTitle>
        <AlertDescription>tokens.ts no longer matches theme.css.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertTitle>Build failed</AlertTitle>
        <AlertDescription>Typecheck reported 3 errors in dist.</AlertDescription>
      </Alert>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <Alert variant="info" className="max-w-md">
      <InfoIcon />
      <AlertTitle>Heads up</AlertTitle>
      <AlertDescription>
        Consumers must add an <code>@source</code> directive so Tailwind emits the component
        classes.
      </AlertDescription>
    </Alert>
  ),
};
