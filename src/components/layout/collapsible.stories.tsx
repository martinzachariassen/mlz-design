import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeSplit } from "../../foundations/theme-split";
import { ChevronDownIcon } from "../../lib/icons";
import { Field, FieldLabel } from "../forms/field";
import { Input } from "../forms/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./collapsible";

const meta = {
  title: "Components/Layout/Collapsible",
  component: Collapsible,
  subcomponents: { CollapsibleTrigger, CollapsibleContent },
  tags: ["autodocs", "status:new"],
  parameters: { layout: "centered" },
  args: { children: null },
  argTypes: { children: { table: { disable: true } } },
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

/** One thing that opens. The label stays constant — the state lives in `aria-expanded`. */
export const Playground: Story = {
  render: () => (
    <Collapsible className="w-80">
      <CollapsibleTrigger className="group">
        Advanced options
        <ChevronDownIcon className="transition-transform group-data-[state=open]:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="flex flex-col gap-4 pt-2 pb-1">
          <Field>
            <FieldLabel>Region</FieldLabel>
            <Input defaultValue="eu-north-1" />
          </Field>
          <Field>
            <FieldLabel>Retries</FieldLabel>
            <Input type="number" defaultValue={3} />
          </Field>
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
};

/** `defaultOpen` for a section that should start expanded. */
export const OpenByDefault: Story = {
  render: () => (
    <Collapsible defaultOpen className="w-80">
      <CollapsibleTrigger className="group">
        What's included
        <ChevronDownIcon className="transition-transform group-data-[state=open]:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <p className="pt-2 text-sm leading-relaxed text-muted-foreground">
          Tokens, components, the Tailwind bridge and the fonts — one import.
        </p>
      </CollapsibleContent>
    </Collapsible>
  ),
};

/**
 * A sidebar of sections. **This is also the case where you should stop and reach
 * for `Accordion`** — several disclosures that belong together want arrow-key
 * navigation between their triggers, and a row of independent `Collapsible`s is
 * an accordion with the keyboard support left out. Use this shape only when the
 * sections genuinely have nothing to do with each other.
 */
export const SidebarSections: Story = {
  render: () => (
    <nav className="w-64 rounded-[var(--radius-md)] border border-border p-3">
      {[
        ["Components", ["Button", "Card", "Dialog"]],
        ["Foundations", ["Colour", "Typography", "Motion"]],
      ].map(([section, items]) => (
        <Collapsible key={section as string} defaultOpen>
          <CollapsibleTrigger className="group">
            {section}
            <ChevronDownIcon className="transition-transform group-data-[state=open]:rotate-180" />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <ul className="flex flex-col pb-2">
              {(items as string[]).map((item) => (
                <li key={item}>
                  <a
                    href={`#${item}`}
                    className="block rounded-[var(--radius-sm)] px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </nav>
  ),
};

export const LightDark: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <ThemeSplit>
      <Collapsible defaultOpen className="w-56">
        <CollapsibleTrigger>Advanced options</CollapsibleTrigger>
        <CollapsibleContent>
          <p className="pt-2 text-sm text-muted-foreground">Region, retries, timeout.</p>
        </CollapsibleContent>
      </Collapsible>
    </ThemeSplit>
  ),
};
