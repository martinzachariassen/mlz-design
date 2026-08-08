import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeProvider } from "../../lib/theme";
import { AccentPicker, ThemeToggle } from "./theme-toggle";

const meta = {
  title: "Brand/ThemeToggle",
  component: ThemeToggle,
  subcomponents: { AccentPicker },
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "**Heads up while you're in Storybook:** these controls and the toolbar's " +
          "Theme / Accent switches drive the *same* two attributes on `<html>`. " +
          "They will fight each other here — that's an artifact of the playground, " +
          "not of the components. In a real app only `ThemeProvider` is writing.",
      },
    },
  },
  argTypes: {
    iconOnly: { control: "boolean", description: "Drop the text labels." },
    hideSystem: { control: "boolean", description: "Offer only light and dark." },
  },
  args: { iconOnly: false, hideSystem: false },
  decorators: [
    (Story) => (
      // Required: both components read and write `useTheme()`.
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof ThemeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The default: light, dark and system, labelled. */
export const Playground: Story = {};

/** `iconOnly` for a header or a toolbar. Each button keeps an `aria-label`. */
export const IconOnly: Story = { args: { iconOnly: true } };

/** Drop System only when the app genuinely has no use for it — most people want it. */
export const WithoutSystem: Story = { args: { hideSystem: true } };

/** The five accent families. Real radios, so the group is one tab stop and arrows move between swatches. */
export const Accents: Story = {
  render: () => <AccentPicker />,
};

/** The pair as they'd sit in a settings panel. */
export const Together: Story = {
  render: () => (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
          Theme
        </span>
        <ThemeToggle />
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
          Accent
        </span>
        <AccentPicker />
      </div>
    </div>
  ),
};

// Deliberately no `LightDark` story. `<ThemeSplit>` forces a theme on each pane,
// while these components *set* the theme on `<html>` — the two would fight, and
// the result would show neither honestly. Use the toolbar's Theme switch to see
// them in dark instead.
