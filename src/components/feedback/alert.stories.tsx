import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeSplit } from "../../foundations/theme-split";
import { Alert, AlertDescription, AlertTitle } from "./alert";

const meta = {
  title: "Components/Feedback/Alert",
  component: Alert,
  subcomponents: { AlertTitle, AlertDescription },
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    variant: {
      description:
        "Which signal the panel carries. `default` is a neutral card notice; the rest tint the fill, the left rail and the title with their semantic colour.",
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

/** Title plus description in the neutral variant — switch `variant` in the controls to see each signal. */
export const Playground: Story = {
  render: (args) => (
    <Alert {...args} className="max-w-md">
      <AlertTitle>Build complete</AlertTitle>
      <AlertDescription>The package compiled cleanly and the tokens are in sync.</AlertDescription>
    </Alert>
  ),
};

/** All five signals stacked. Pick by meaning, not by colour: `warning` for something to look at, `destructive` for something that failed. */
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

/** An `<svg>` as the *first* child opens the icon column — the grid switches to `1rem 1fr` and the text keeps its own column. */
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

/** The tinted `*-subtle` fills are token pairs, so each signal keeps its contrast in dark mode. */
export const LightDark: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <ThemeSplit>
      <div className="flex w-full max-w-md flex-col gap-4">
        <Alert variant="default">
          <AlertTitle>Heads up</AlertTitle>
          <AlertDescription>A neutral, card-like notice.</AlertDescription>
        </Alert>
        <Alert variant="success">
          <AlertTitle>Deployed</AlertTitle>
          <AlertDescription>Release v0.1.0 shipped to production.</AlertDescription>
        </Alert>
        <Alert variant="destructive">
          <AlertTitle>Build failed</AlertTitle>
          <AlertDescription>Typecheck reported 3 errors in dist.</AlertDescription>
        </Alert>
      </div>
    </ThemeSplit>
  ),
};
