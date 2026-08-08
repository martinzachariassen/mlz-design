import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { Button } from "../../components/forms/button";
import { Checkbox } from "../../components/forms/checkbox";
import { Combobox } from "../../components/forms/combobox";
import { Field, FieldDescription, FieldError, FieldLabel } from "../../components/forms/field";
import { Input } from "../../components/forms/input";
import { Label } from "../../components/forms/label";
import { Slider } from "../../components/forms/slider";
import { Switch } from "../../components/forms/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/layout/card";
import { Separator } from "../../components/layout/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/layout/tabs";

const meta = {
  title: "Patterns/Forms",
  tags: ["!autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const regions = [
  { value: "eu-north-1", label: "Europe (Stockholm)" },
  { value: "eu-west-1", label: "Europe (Ireland)" },
  { value: "us-east-1", label: "US East (N. Virginia)" },
  { value: "ap-northeast-1", label: "Asia Pacific (Tokyo)" },
  { value: "sa-east-1", label: "South America (São Paulo)" },
];

/** Settings that apply immediately. A `Switch` implies no Save button — if there is one, these should be checkboxes. */
export const Settings: Story = {
  render: () => (
    <Card className="w-[26rem]">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>Choose what reaches you and where.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        {(
          [
            ["Deploy status", "When a build finishes or fails.", true],
            ["Weekly digest", "A Monday summary of activity.", false],
            ["Security alerts", "Critical advisories, always on.", true],
          ] as const
        ).map(([title, description, on], i) => {
          const id = `setting-${i}`;
          return (
            <div key={title}>
              {i > 0 && <Separator className="mb-5" />}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Label htmlFor={id}>{title}</Label>
                  <p className="mt-1 text-sm text-muted-foreground">{description}</p>
                </div>
                <Switch id={id} defaultChecked={on} />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  ),
};

/** Two ways in, one card. Tabs are right here because both panels are the same subject. */
export const SignIn: Story = {
  render: () => (
    <Card className="w-[24rem]">
      <CardContent className="p-6">
        <Tabs defaultValue="signin">
          <TabsList>
            <TabsTrigger value="signin">Sign in</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="signin" className="mt-5 space-y-4">
            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input type="email" placeholder="you@example.com" />
            </Field>
            <Field>
              <FieldLabel>Password</FieldLabel>
              <Input type="password" placeholder="••••••••" />
            </Field>
            <div className="flex items-center gap-2.5">
              <Checkbox id="keep" defaultChecked />
              <Label
                htmlFor="keep"
                className="text-sm normal-case tracking-normal text-muted-foreground"
              >
                Keep me signed in
              </Label>
            </div>
            <Button variant="solid" size="sm" className="w-full">
              Continue
            </Button>
          </TabsContent>
          <TabsContent value="register" className="mt-5">
            <p className="text-sm text-muted-foreground">
              Registration is invite-only while the system is in beta.
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  ),
};

/**
 * **The case `Field` exists for.** Every control here is labelled, described and —
 * when wrong — has its error wired to `aria-describedby` and `aria-invalid`,
 * without a single `id` in the markup. Submit it empty and watch the errors
 * announce themselves.
 *
 * Note which control each field uses: `Combobox` for the long list where the
 * reader knows the name, `Slider` paired with a number field so an exact value
 * doesn't need a steady hand.
 */
export const Validation: Story = {
  render: function ValidationStory() {
    const [name, setName] = React.useState("");
    const [region, setRegion] = React.useState("");
    const [budget, setBudget] = React.useState(80);
    const [submitted, setSubmitted] = React.useState(false);

    const nameError = submitted && !name ? "Give the project a name." : null;
    const regionError = submitted && !region ? "Pick where the workers run." : null;

    return (
      <form
        className="flex w-[26rem] flex-col gap-6"
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(true);
        }}
      >
        <Field invalid={!!nameError}>
          <FieldLabel>Project name</FieldLabel>
          <Input value={name} onChange={(event) => setName(event.target.value)} />
          <FieldDescription>Lowercase, no spaces. This becomes the URL.</FieldDescription>
          <FieldError>{nameError}</FieldError>
        </Field>

        <Field invalid={!!regionError}>
          <FieldLabel>Region</FieldLabel>
          <Combobox options={regions} value={region} onValueChange={setRegion} />
          <FieldDescription>Can't be changed after the first deploy.</FieldDescription>
          <FieldError>{regionError}</FieldError>
        </Field>

        <Field>
          <FieldLabel>Bundle budget</FieldLabel>
          <div className="flex items-center gap-4">
            <Slider
              value={[budget]}
              onValueChange={([next]) => setBudget(next ?? 0)}
              max={200}
              aria-label="Bundle budget"
              className="flex-1"
            />
            <Input
              type="number"
              value={budget}
              onChange={(event) => setBudget(Number(event.target.value))}
              className="w-20 tabular-nums"
              aria-label="Bundle budget in kilobytes"
            />
          </div>
          <FieldDescription>Kilobytes. Builds over this fail the size check.</FieldDescription>
        </Field>

        <Button type="submit" variant="solid" size="sm">
          Create project
        </Button>
      </form>
    );
  },
};
