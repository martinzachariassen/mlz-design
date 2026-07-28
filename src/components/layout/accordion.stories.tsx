import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeSplit } from "../../foundations/theme-split";
import { Text } from "../data-display/text";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion";

const meta = {
  title: "Components/Layout/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => (
    <Accordion type="single" collapsible defaultValue="a" className="max-w-lg">
      <AccordionItem value="a">
        <AccordionTrigger>What can sites see?</AccordionTrigger>
        <AccordionContent>
          Your public IP, coarse geolocation, ISP/ASN, and request headers.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger>Is anything stored?</AccordionTrigger>
        <AccordionContent>No. There is no database, no logs, and no cookies.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="c">
        <AccordionTrigger>How is my browser fingerprinted?</AccordionTrigger>
        <AccordionContent>
          Entirely client-side; only a coarse entropy estimate is shared.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Accordion type="multiple" defaultValue={["a", "b"]} className="max-w-lg">
      <AccordionItem value="a">
        <AccordionTrigger>First</AccordionTrigger>
        <AccordionContent>Both items can be open at once.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger>Second</AccordionTrigger>
        <AccordionContent>No item closes another.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

// The numbered "deeper look" pattern: a custom trigger layout with an eyebrow
// number, title, subtitle and an optional badge.
export const Numbered: Story = {
  render: () => (
    <Accordion type="single" collapsible className="max-w-lg">
      {[
        { n: "01", title: "Privacy checks", sub: "Tor, VPN, blocklists, DNS leak" },
        { n: "02", title: "Your browser", sub: "Timezone, locale, DNT/GPC" },
        { n: "03", title: "Browser fingerprint", sub: "Entropy estimate", badge: "1 notice" },
      ].map(({ n, title, sub, badge }) => (
        <AccordionItem key={n} value={n}>
          <AccordionTrigger>
            <Text variant="mono" size="sm" className="text-muted-foreground">
              {n}
            </Text>
            <span className="flex min-w-0 flex-col">
              <span className="font-semibold text-foreground">{title}</span>
              <span className="text-xs text-muted-foreground">{sub}</span>
            </span>
            {badge ? (
              <span className="ml-2 rounded-full border border-warning/40 px-2 py-0.5 font-mono text-[10px] text-warning">
                {badge}
              </span>
            ) : null}
          </AccordionTrigger>
          <AccordionContent>Details for {title.toLowerCase()} go here.</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  ),
};

export const LightDark: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <ThemeSplit>
      <Accordion type="single" collapsible defaultValue="a" className="w-80">
        <AccordionItem value="a">
          <AccordionTrigger>Open by default</AccordionTrigger>
          <AccordionContent>Content in both themes.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="b">
          <AccordionTrigger>Closed</AccordionTrigger>
          <AccordionContent>Hidden until opened.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </ThemeSplit>
  ),
};
