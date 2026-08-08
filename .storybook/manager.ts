import { addons } from "storybook/manager-api";
import { mlzTheme } from "./theme";

addons.setConfig({
  theme: mlzTheme,
  sidebar: {
    // Components are grouped by function, and the group names are the navigation
    // — showing them expanded is the whole point of the structure.
    showRoots: true,
  },
});
