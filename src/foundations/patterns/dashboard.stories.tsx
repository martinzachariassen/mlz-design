import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar, AvatarFallback } from "../../components/data-display/avatar";
import { Badge } from "../../components/data-display/badge";
import { Stat, StatDelta, StatLabel, StatValue } from "../../components/data-display/stat";
import { StatusDot } from "../../components/data-display/status-dot";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/data-display/table";
import { Progress } from "../../components/feedback/progress";
import { Card, CardContent } from "../../components/layout/card";
import { Separator } from "../../components/layout/separator";

const meta = {
  title: "Patterns/Dashboard",
  tags: ["!autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      <h2 className="mb-5 font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
        {title}
      </h2>
      {children}
    </section>
  );
}

/**
 * The metrics row. Each cell is a `Stat`, so the label reads first to a screen
 * reader — "94%" means nothing until you know it is coverage — while the number
 * still dominates visually.
 *
 * `StatDelta` colours by direction, but the direction follows the *meaning*, not
 * the arithmetic: error rate falling is good news, so it reads as up.
 */
export const Metrics: Story = {
  render: () => (
    <div className="min-h-screen bg-background text-foreground">
      <Panel title="Dashboard · metrics">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {(
            [
              ["Deploys", "1,284", 82, "accent", "up", "+112 this week"],
              ["Coverage", "94%", 94, "default", "up", "+2.1 since last release"],
              ["Error rate", "0.4%", 12, "default", "up", "down from 1.1% — improving"],
              ["Uptime", "99.98%", 99, "default", "flat", "unchanged"],
            ] as const
          ).map(([label, value, pct, variant, direction, note]) => (
            <Card key={label}>
              <CardContent className="p-5">
                <Stat>
                  <StatLabel>{label}</StatLabel>
                  <StatValue>{value}</StatValue>
                  <StatDelta direction={direction}>{note}</StatDelta>
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
      </Panel>
    </div>
  ),
};

/** Who did what. The verb is in the sentence, not only in the badge's colour. */
export const ActivityFeed: Story = {
  render: () => (
    <div className="min-h-screen bg-background text-foreground">
      <Panel title="Data · activity">
        <Card>
          <CardContent className="p-0">
            {(
              [
                ["MZ", "Martin", "merged", "share the modal engine", "accent"],
                ["BOT", "dependabot", "opened", "bump vite to 8.2.2", "muted"],
                ["MZ", "Martin", "released", "v0.4.0", "outline"],
              ] as const
            ).map(([initials, who, verb, what, tone], i) => (
              <div key={what}>
                {i > 0 && <Separator />}
                <div className="flex items-center gap-3 px-5 py-3.5">
                  <Avatar size="sm">
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                  <p className="flex-1 text-sm">
                    <span className="font-mono text-xs uppercase tracking-[0.08em]">{who}</span>{" "}
                    <span className="text-muted-foreground">{verb}</span>{" "}
                    <span className="text-foreground">{what}</span>
                  </p>
                  <Badge variant={tone}>{verb}</Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </Panel>
    </div>
  ),
};

/**
 * The same fields across many rows. `StatusDot` carries a text label rather than
 * standing alone — a green dot with nothing beside it says nothing to anyone who
 * can't see it, or can't distinguish it from the red one.
 */
export const DataTable: Story = {
  render: () => (
    <div className="min-h-screen bg-background text-foreground">
      <Panel title="Data · deploys">
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Environment</TableHead>
                  <TableHead>Commit</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Duration</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(
                  [
                    ["production", "f9de8e5", "success", "Live", "1m 12s"],
                    ["preview", "2dbef02", "warning", "Building", "—"],
                    ["preview", "eb3ddaa", "destructive", "Failed", "0m 48s"],
                    ["staging", "53e0c87", "success", "Live", "1m 04s"],
                  ] as const
                ).map(([env, commit, tone, status, duration]) => (
                  <TableRow key={commit}>
                    <TableCell>{env}</TableCell>
                    <TableCell className="font-mono text-[13px]">{commit}</TableCell>
                    <TableCell>
                      <StatusDot variant={tone} label={status} />
                    </TableCell>
                    <TableCell className="text-right tabular-nums">{duration}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Panel>
    </div>
  ),
};
