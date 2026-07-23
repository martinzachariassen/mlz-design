import type { Meta, StoryObj } from "@storybook/react-vite";
import { Alert, AlertDescription, AlertTitle } from "../components/alert";
import { Avatar, AvatarFallback } from "../components/avatar";
import { Badge } from "../components/badge";
import { BrandLockup, BrandMark } from "../components/brand-mark";
import { Button } from "../components/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/card";
import { Checkbox } from "../components/checkbox";
import { Input } from "../components/input";
import { Kbd } from "../components/kbd";
import { Label } from "../components/label";
import { Progress } from "../components/progress";
import { Separator } from "../components/separator";
import { Switch } from "../components/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/tabs";

const meta = {
  title: "Foundations/Patterns",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function Panel({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={className}>
      <h2 className="mb-4 font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
        {title}
      </h2>
      {children}
    </section>
  );
}

/**
 * Recipes, not components. This is the reference for how the parts go together —
 * spacing, hierarchy, and the technical/paper voice — so every app built on the
 * system reads the same. Flip Theme and Accent in the toolbar; nothing hardcodes.
 */
export const Overview: Story = {
  render: () => (
    <div className="min-h-screen bg-background text-foreground">
      {/* App bar */}
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background/80 px-6 py-3 backdrop-blur">
        <BrandLockup size={30} tagline="" />
        <nav className="hidden items-center gap-1 md:flex">
          {["Overview", "Components", "Tokens"].map((item, i) => (
            <Button key={item} variant={i === 0 ? "ghost" : "link"} size="sm">
              {item}
            </Button>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-1 font-mono text-[11px] text-muted-foreground sm:flex">
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
          </span>
          <Avatar size="sm" status="online">
            <AvatarFallback tone="accent">MZ</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex items-end justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
              Foundations
            </p>
            <h1 className="mt-2 font-hand text-5xl">Patterns</h1>
          </div>
          <Button variant="solid" size="sm">
            New project
          </Button>
        </div>

        <p className="mt-4 max-w-2xl font-mono text-sm leading-relaxed text-muted-foreground">
          Composed UIs built only from tokens and components — the working reference for how things
          should look and behave in any app that extends this system.
        </p>

        {/* Stat row */}
        <Panel title="Dashboard · metrics" className="mt-12">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Deploys", "1,284", 82, "accent"],
              ["Coverage", "94%", 94, "default"],
              ["Bundle", "36 KB", 40, "default"],
              ["Uptime", "99.98%", 99, "default"],
            ].map(([label, value, pct, variant]) => (
              <Card key={label as string}>
                <CardContent className="p-5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                    {label}
                  </p>
                  <p className="mt-2 font-grotesk text-3xl font-bold tracking-tight">{value}</p>
                  <Progress
                    value={pct as number}
                    variant={variant as "accent" | "default"}
                    aria-label={`${label} — ${pct}%`}
                    className="mt-4"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </Panel>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Settings panel */}
          <Panel title="Settings · a form">
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Choose what reaches you and where.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                {[
                  ["Deploy status", "When a build finishes or fails.", true],
                  ["Weekly digest", "A Monday summary of activity.", false],
                  ["Security alerts", "Critical advisories, always on.", true],
                ].map(([title, desc, on], i) => {
                  const id = `setting-${i}`;
                  return (
                    <div key={title as string}>
                      {i > 0 && <Separator className="mb-5" />}
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <Label htmlFor={id}>{title}</Label>
                          <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
                        </div>
                        <Switch id={id} defaultChecked={on as boolean} />
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </Panel>

          {/* Auth form + tabs */}
          <Panel title="Auth · tabbed form">
            <Card>
              <CardContent className="p-6">
                <Tabs defaultValue="signin">
                  <TabsList>
                    <TabsTrigger value="signin">Sign in</TabsTrigger>
                    <TabsTrigger value="register">Register</TabsTrigger>
                  </TabsList>
                  <TabsContent value="signin" className="mt-5 space-y-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="you@example.com" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="password">Password</Label>
                      <Input id="password" type="password" placeholder="••••••••" />
                    </div>
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
          </Panel>
        </div>

        {/* Feedback */}
        <Panel title="Feedback · alerts" className="mt-12">
          <div className="grid gap-4 md:grid-cols-2">
            <Alert variant="info">
              <AlertTitle>Heads up</AlertTitle>
              <AlertDescription>
                A new accent family shipped — try it in the toolbar.
              </AlertDescription>
            </Alert>
            <Alert variant="success">
              <AlertTitle>Deployed</AlertTitle>
              <AlertDescription>v0.2.0 is live on Railway. All checks green.</AlertDescription>
            </Alert>
            <Alert variant="warning">
              <AlertTitle>Approaching limit</AlertTitle>
              <AlertDescription>You've used 82% of the monthly build minutes.</AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <AlertTitle>Build failed</AlertTitle>
              <AlertDescription>Type error in social-card.tsx — see the run log.</AlertDescription>
            </Alert>
          </div>
        </Panel>

        {/* Activity list */}
        <Panel title="Data · activity list" className="mt-12">
          <Card>
            <CardContent className="p-0">
              {[
                ["MZ", "Martin", "merged", "brand-assets-and-component-library", "accent"],
                ["BOT", "dependabot", "opened", "bump vite to 8.1.5", "muted"],
                ["MZ", "Martin", "released", "v0.2.0", "outline"],
              ].map(([initials, who, verb, what, tone], i) => (
                <div key={what as string}>
                  {i > 0 && <Separator />}
                  <div className="flex items-center gap-3 px-5 py-3.5">
                    <Avatar size="sm">
                      <AvatarFallback>{initials as string}</AvatarFallback>
                    </Avatar>
                    <p className="flex-1 text-sm">
                      <span className="font-mono text-xs uppercase tracking-[0.08em]">{who}</span>{" "}
                      <span className="text-muted-foreground">{verb}</span>{" "}
                      <span className="text-foreground">{what}</span>
                    </p>
                    <Badge variant={tone as "accent" | "muted" | "outline"}>{verb}</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </Panel>

        {/* Empty state */}
        <Panel title="Empty state" className="mt-12">
          <Card variant="ghost">
            <CardContent className="flex flex-col items-center justify-center gap-4 border border-dashed border-border py-16 text-center">
              <div className="flex size-14 items-center justify-center rounded-[var(--radius-lg)] border border-border bg-accent-subtle">
                <BrandMark variant="glyph" size={28} className="text-accent" />
              </div>
              <div>
                <p className="font-mono text-sm font-bold uppercase tracking-[0.1em]">
                  No projects yet
                </p>
                <p className="mt-1 max-w-xs text-sm text-muted-foreground">
                  Spin one up from a template, or import an existing repo to get started.
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="solid" size="sm">
                  New project
                </Button>
                <Button variant="default" size="sm">
                  Import
                </Button>
              </div>
            </CardContent>
          </Card>
        </Panel>
      </div>
    </div>
  ),
};
