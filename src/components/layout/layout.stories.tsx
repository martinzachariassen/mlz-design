import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeSplit } from "../../foundations/theme-split";
import { Container, Grid, Stack } from "./layout";

const meta = {
  title: "Components/Layout/Container",
  component: Container,
  subcomponents: { Stack, Grid },
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "The three layout primitives, in the order you reach for them: `Container` frames the page, " +
          "`Stack` flows one axis, `Grid` lays out two.\n\n" +
          "**Use `Container`** for the outer page frame — it centres content at a max width and handles the " +
          "responsive gutters. **Use `Stack`** for a row or column of siblings with one token gap; " +
          '`direction="responsive"` stacks on mobile and flows to a row at `sm`, which covers most ' +
          "toolbars and button rows. **Use `Grid`** when items should wrap into columns — `min` auto-fits " +
          "as many as fit, `cols` pins a responsive 1–6 column count.\n\n" +
          "**Don't** nest a `Container` inside another; the gutters compound. And don't reach for `Grid` " +
          "for a single row — `Stack` says what you mean.",
      },
    },
  },
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

/** The four content widths against a tinted page. `prose` is measure-optimised for reading; the rest step up for app layouts. */
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

/** `direction="responsive"` — a column on mobile that flows to a row at `sm`. Narrow the viewport to see it flip. */
export const StackResponsive: Story = {
  render: () => (
    <Stack direction="responsive" gap="md">
      <Box>First</Box>
      <Box>Second</Box>
      <Box>Third</Box>
    </Stack>
  ),
};

/** The default column direction, with the `sm` gap token. */
export const StackVertical: Story = {
  render: () => (
    <Stack gap="sm" className="max-w-xs">
      <Box>Row one</Box>
      <Box>Row two</Box>
      <Box>Row three</Box>
    </Stack>
  ),
};

/** `min` sets a minimum track width and lets the browser decide the column count — responsive with no breakpoints at all. */
export const GridAutoFit: Story = {
  render: () => (
    <Grid min="12rem" gap="md">
      {["one", "two", "three", "four", "five", "six"].map((n, i) => (
        <Box key={n}>Cell {i + 1}</Box>
      ))}
    </Grid>
  ),
};

/** `cols` when the column count is the design. Each step already carries its own `sm`/`lg` ladder down to one column on mobile. */
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

/** The primitives carry no paint of their own — only the plates inside them change with the theme. */
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
