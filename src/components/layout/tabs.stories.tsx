import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeSplit } from "../../foundations/theme-split";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

const meta = {
  title: "Components/Layout/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    defaultValue: {
      description:
        "Uncontrolled initial tab. Pair `value` with `onValueChange` for controlled use.",
      control: "text",
    },
    onValueChange: { description: "Fired with the newly selected tab's value." },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Three tabs. Click one, then use the arrow keys — only the selected tab is in the tab order, per the WAI-ARIA pattern. */
export const Playground: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-80">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        A distilled snapshot of the project — status, owners, and the last deploy at a glance.
      </TabsContent>
      <TabsContent value="activity">
        Recent commits, reviews, and releases, newest first.
      </TabsContent>
      <TabsContent value="settings">
        Visibility, integrations, and danger-zone controls live here.
      </TabsContent>
    </Tabs>
  ),
};

/** The preview/code pairing. Inactive panels unmount, so keep anything that must survive a switch in the parent. */
export const TwoTabs: Story = {
  render: () => (
    <Tabs defaultValue="preview" className="w-80">
      <TabsList>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <TabsContent value="preview">The rendered component.</TabsContent>
      <TabsContent value="code">The source that produced it.</TabsContent>
    </Tabs>
  ),
};

/** The active tab is marked by an accent underline, which re-reads the accent token per theme. */
export const LightDark: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <ThemeSplit>
      <Tabs defaultValue="overview" className="w-72">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          A distilled snapshot of the project — status, owners, and the last deploy.
        </TabsContent>
        <TabsContent value="activity">Recent commits, reviews, and releases.</TabsContent>
        <TabsContent value="settings">
          Visibility, integrations, and danger-zone controls.
        </TabsContent>
      </Tabs>
    </ThemeSplit>
  ),
};
