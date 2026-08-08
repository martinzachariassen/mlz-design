import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeSplit } from "../../foundations/theme-split";
import { Progress } from "../feedback/progress";
import { Card, CardContent } from "../layout/card";
import { Stat, StatDelta, StatLabel, StatValue } from "./stat";

const meta = {
  title: "Components/Data display/Stat",
  component: Stat,
  subcomponents: { StatLabel, StatValue, StatDelta },
  tags: ["autodocs", "status:new"],
  parameters: { layout: "centered" },
  args: { children: null },
  argTypes: { children: { table: { disable: true } } },
} satisfies Meta<typeof Stat>;

export default meta;
type Story = StoryObj<typeof meta>;

/** One measurement. The label reads first to a screen reader — "94%" means nothing on its own. */
export const Playground: Story = {
  render: () => (
    <Stat>
      <StatLabel>Coverage</StatLabel>
      <StatValue>94%</StatValue>
      <StatDelta direction="up">+2.1 since last release</StatDelta>
    </Stat>
  ),
};

/**
 * The three directions. **Colour follows the number, not the news** — for a metric where
 * falling is a win, pass the direction that matches the meaning and say so in the text.
 */
export const Deltas: Story = {
  render: () => (
    <div className="flex flex-wrap gap-10">
      <Stat>
        <StatLabel>Deploys</StatLabel>
        <StatValue>1,284</StatValue>
        <StatDelta direction="up">+112 this week</StatDelta>
      </Stat>
      <Stat>
        <StatLabel>Error rate</StatLabel>
        <StatValue>0.4%</StatValue>
        <StatDelta direction="up">down from 1.1% — improving</StatDelta>
      </Stat>
      <Stat>
        <StatLabel>Open issues</StatLabel>
        <StatValue>37</StatValue>
        <StatDelta direction="down">+9 this week</StatDelta>
      </Stat>
      <Stat>
        <StatLabel>Uptime</StatLabel>
        <StatValue>99.98%</StatValue>
        <StatDelta>unchanged</StatDelta>
      </Stat>
    </div>
  ),
};

/** The metrics row a dashboard is built from — `Stat` in a `Card`, with a `Progress` under it. */
export const MetricsRow: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="grid w-full max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {(
        [
          ["Deploys", "1,284", 82, "accent"],
          ["Coverage", "94%", 94, "default"],
          ["Bundle", "36 KB", 40, "default"],
          ["Uptime", "99.98%", 99, "default"],
        ] as const
      ).map(([label, value, pct, variant]) => (
        <Card key={label}>
          <CardContent className="p-5">
            <Stat>
              <StatLabel>{label}</StatLabel>
              <StatValue>{value}</StatValue>
            </Stat>
            <Progress
              value={pct}
              variant={variant}
              aria-label={`${label} — ${pct}%`}
              className="mt-4"
            />
          </CardContent>
        </Card>
      ))}
    </div>
  ),
};

export const LightDark: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <ThemeSplit>
      <Stat>
        <StatLabel>Coverage</StatLabel>
        <StatValue>94%</StatValue>
        <StatDelta direction="up">+2.1</StatDelta>
      </Stat>
    </ThemeSplit>
  ),
};
