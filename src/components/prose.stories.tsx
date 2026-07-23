import type { Meta, StoryObj } from "@storybook/react-vite";
import { Prose } from "./prose";

const meta = {
  title: "Components/Prose",
  component: Prose,
  parameters: { layout: "padded" },
} satisfies Meta<typeof Prose>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Article: Story = {
  render: () => (
    <Prose>
      <h1>Designing a system, not a screen</h1>
      <p>
        A design system earns its keep the day you stop building screens and start building the
        vocabulary screens are made from. This is how the pieces fit together.
      </p>
      <h2>Tokens first</h2>
      <p>
        Every colour, size and easing lives as a <code>--token</code>. Components read only the{" "}
        <em>semantic</em> layer, so a single change ripples everywhere — no per-app drift. The{" "}
        <a href="#tokens">token reference</a> has the full map.
      </p>
      <blockquote>
        Restyle once, everywhere. The token is the contract; the component is just a consumer.
      </blockquote>
      <h3>What the layers buy you</h3>
      <ul>
        <li>Primitives stay faithful to the brand values.</li>
        <li>Semantic roles map them to intent you can safely override.</li>
        <li>Tailwind utilities and tokens become the same thing.</li>
      </ul>
      <h4>A quick example</h4>
      <pre>
        <code>{`.card {\n  background: var(--card);\n  border: 1px solid var(--border);\n}`}</code>
      </pre>
      <hr />
      <p>
        The result: an app inherits the whole look for free, and when the system moves, the app
        moves with it.
      </p>
    </Prose>
  ),
};
