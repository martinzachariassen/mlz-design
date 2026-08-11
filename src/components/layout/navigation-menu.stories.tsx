import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeSplit } from "../../foundations/theme-split";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./navigation-menu";

const meta = {
  title: "Components/Layout/NavigationMenu",
  component: NavigationMenu,
  tags: ["autodocs", "status:new"],
  // Panels open downward from the bar; give them room in the frame.
  parameters: { layout: "centered" },
  args: { children: null },
  argTypes: { children: { table: { disable: true } } },
} satisfies Meta<typeof NavigationMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

function Bar() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Projects</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-64 gap-1">
              <li>
                <NavigationMenuLink href="#aurora">
                  <span className="font-mono text-[11px] uppercase tracking-[0.1em]">aurora</span>
                  <span className="block text-sm text-muted-foreground">
                    Deploy dashboard for the home lab.
                  </span>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="#ip-speil">
                  <span className="font-mono text-[11px] uppercase tracking-[0.1em]">ip-speil</span>
                  <span className="block text-sm text-muted-foreground">
                    What the internet knows about your connection.
                  </span>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Writing</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-56 gap-1">
              <li>
                <NavigationMenuLink href="#notes">Notes</NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="#talks">Talks</NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#about" className={navigationMenuTriggerStyle()}>
            About
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

/**
 * Hover or focus a trigger to open its panel; arrow keys move along the bar.
 * The bare "About" entry shows `navigationMenuTriggerStyle()` keeping a plain
 * link flush with the real triggers.
 */
export const Playground: Story = {
  render: () => (
    <div className="flex min-h-72 items-start justify-center pt-2">
      <Bar />
    </div>
  ),
};

export const LightDark: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <ThemeSplit>
      <Bar />
    </ThemeSplit>
  ),
};
