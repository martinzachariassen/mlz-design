import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeSplit } from "../../foundations/theme-split";
import { Container, Grid, Stack } from "./layout";

const meta = {
  title: "Components/Layout/Layout",
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function Box({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex min-h-12 items-center justify-center rounded-[var(--radius-md)] border border-dashed border-[color-mix(in_oklch,var(--accent)_50%,var(--border))] bg-accent-subtle px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
      {children}
    </div>
  );
}

export const ContainerSizes: Story = {
  render: () => (
    <div className="space-y-3 rounded-[var(--radius-lg)] bg-secondary/40 py-4">
      {(["sm", "md", "lg", "prose"] as const).map((size) => (
        <Container key={size} size={size} gutter="none">
          <Box>Container · {size}</Box>
        </Container>
      ))}
    </div>
  ),
};

export const StackResponsive: Story = {
  render: () => (
    <Stack direction="responsive" gap="md">
      <Box>First</Box>
      <Box>Second</Box>
      <Box>Third</Box>
    </Stack>
  ),
};

export const StackVertical: Story = {
  render: () => (
    <Stack gap="sm" className="max-w-xs">
      <Box>Row one</Box>
      <Box>Row two</Box>
      <Box>Row three</Box>
    </Stack>
  ),
};

export const GridAutoFit: Story = {
  render: () => (
    <Grid min="12rem" gap="md">
      {["one", "two", "three", "four", "five", "six"].map((n, i) => (
        <Box key={n}>Cell {i + 1}</Box>
      ))}
    </Grid>
  ),
};

export const GridFixedCols: Story = {
  render: () => (
    <Grid cols={4} gap="md">
      {["a", "b", "c", "d", "e", "f", "g", "h"].map((n, i) => (
        <Box key={n}>{i + 1}</Box>
      ))}
    </Grid>
  ),
};

function Plate({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex min-h-12 items-center justify-center rounded-[var(--radius-md)] border border-border bg-secondary px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
      {children}
    </div>
  );
}

export const LightDark: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <ThemeSplit>
      <Container size="sm" gutter="none" className="flex flex-col gap-4">
        <Stack direction="responsive" gap="md">
          <Plate>First</Plate>
          <Plate>Second</Plate>
          <Plate>Third</Plate>
        </Stack>
        <Grid cols={3} gap="md">
          {["a", "b", "c", "d", "e", "f"].map((n, i) => (
            <Plate key={n}>Cell {i + 1}</Plate>
          ))}
        </Grid>
      </Container>
    </ThemeSplit>
  ),
};
