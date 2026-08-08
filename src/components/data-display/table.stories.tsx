import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeSplit } from "../../foundations/theme-split";
import { Badge } from "./badge";
import { StatusDot } from "./status-dot";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

const meta = {
  title: "Components/Data display/Table",
  component: Table,
  subcomponents: {
    TableHeader,
    TableBody,
    TableFooter,
    TableRow,
    TableHead,
    TableCell,
    TableCaption,
  },
  tags: ["autodocs", "status:new"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const DEPLOYS = [
  { project: "mlz-design", status: "success", branch: "main", duration: "54s" },
  { project: "mlz-no", status: "success", branch: "main", duration: "1m 12s" },
  { project: "notes-api", status: "warning", branch: "feat/search", duration: "2m 04s" },
  { project: "scratch", status: "destructive", branch: "fix/build", duration: "8s" },
] as const;

/** The everyday shape: a caption naming the table, mono column headers, hairline rows. */
export const Playground: Story = {
  render: (args) => (
    <Table {...args}>
      <TableCaption>Deploys in the last 24 hours</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Project</TableHead>
          <TableHead>Branch</TableHead>
          <TableHead align="right">Duration</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {DEPLOYS.map((row) => (
          <TableRow key={row.project}>
            <TableCell>{row.project}</TableCell>
            <TableCell className="font-mono text-[13px] text-muted-foreground">
              {row.branch}
            </TableCell>
            <TableCell align="right" className="font-mono text-[13px]">
              {row.duration}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

/** Cells take any content — a `StatusDot` for live state, a `Badge` for a stable attribute. */
export const WithComponents: Story = {
  render: () => (
    <Table aria-label="Deploy status">
      <TableHeader>
        <TableRow>
          <TableHead>Project</TableHead>
          <TableHead>State</TableHead>
          <TableHead>Env</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {DEPLOYS.map((row) => (
          <TableRow key={row.project}>
            <TableCell>{row.project}</TableCell>
            <TableCell>
              <span className="inline-flex items-center gap-2">
                <StatusDot variant={row.status} />
                <span className="text-muted-foreground">{row.status}</span>
              </span>
            </TableCell>
            <TableCell>
              <Badge variant="muted">production</Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

/** `scope="row"` turns the first column into row headers, so each cell is announced with its row. */
export const RowHeaders: Story = {
  render: () => (
    <Table aria-label="Token scales">
      <TableHeader>
        <TableRow>
          <TableHead>Token</TableHead>
          <TableHead>Light</TableHead>
          <TableHead>Dark</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[
          ["--background", "paper", "ink"],
          ["--foreground", "ink", "paper"],
          ["--border", "line", "line-dark"],
        ].map(([token, light, dark]) => (
          <TableRow key={token}>
            <TableHead scope="row" className="border-0 normal-case tracking-normal text-foreground">
              {token}
            </TableHead>
            <TableCell>{light}</TableCell>
            <TableCell>{dark}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

/** A `TableFooter` for totals — ruled off, with the row borders dropped. */
export const WithFooter: Story = {
  render: () => (
    <Table aria-label="Build minutes">
      <TableHeader>
        <TableRow>
          <TableHead>Project</TableHead>
          <TableHead align="right">Minutes</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>mlz-design</TableCell>
          <TableCell align="right" className="font-mono text-[13px]">
            128
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>mlz-no</TableCell>
          <TableCell align="right" className="font-mono text-[13px]">
            64
          </TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell align="right" className="font-mono text-[13px]">
            192
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};

/**
 * A table wider than its container scrolls inside its own box rather than pushing
 * the page sideways — and the box is focusable, so it can be scrolled by keyboard.
 */
export const Overflowing: Story = {
  render: () => (
    <div className="max-w-md">
      <Table aria-label="Wide data">
        <TableHeader>
          <TableRow>
            {["Project", "Branch", "Commit", "Author", "Started", "Duration"].map((h) => (
              <TableHead key={h} className="whitespace-nowrap">
                {h}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            {["mlz-design", "main", "92c8fc9", "Martin", "09:14", "54s"].map((c) => (
              <TableCell key={c} className="whitespace-nowrap">
                {c}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ),
};

export const LightDark: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <ThemeSplit>
      <Table aria-label="Deploys">
        <TableHeader>
          <TableRow>
            <TableHead>Project</TableHead>
            <TableHead align="right">Duration</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>mlz-design</TableCell>
            <TableCell align="right" className="font-mono text-[13px]">
              54s
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>mlz-no</TableCell>
            <TableCell align="right" className="font-mono text-[13px]">
              1m 12s
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </ThemeSplit>
  ),
};
