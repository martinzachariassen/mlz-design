import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./badge";
import { Button } from "./button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";

const meta = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Deploy</CardTitle>
        <CardDescription>
          Ship the design system playground to Railway. Elevation is a hairline border, never a drop
          shadow — true to the paper look.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center gap-3">
        <Badge variant="accent">ready</Badge>
        <span className="text-sm text-muted-foreground">3 checks passed</span>
      </CardContent>
      <CardFooter className="gap-3">
        <Button variant="solid" size="sm">
          Ship it
        </Button>
        <Button variant="ghost" size="sm">
          Preview
        </Button>
      </CardFooter>
    </Card>
  ),
};
