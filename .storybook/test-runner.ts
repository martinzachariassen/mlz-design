import { getStoryContext, type TestRunnerConfig } from "@storybook/test-runner";
import { checkA11y, injectAxe } from "axe-playwright";

/**
 * Runs axe against every story in a real browser (via the Storybook test-runner).
 * Wired into CI as the `Storybook a11y` job — a story with a WCAG 2.1 A/AA
 * violation fails the build. Stories opt out or tune rules with the standard
 * `a11y` parameter: `parameters: { a11y: { disable: true } }`, or per-rule via
 * `parameters: { a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } } }`.
 */
const config: TestRunnerConfig = {
  async preVisit(page) {
    await injectAxe(page);
  },
  async postVisit(page, context) {
    const storyContext = await getStoryContext(page, context);
    const a11y = storyContext.parameters?.a11y ?? {};
    if (a11y.disable) return;

    // Translate the addon's `config.rules` array into axe run-option overrides.
    const rules: Record<string, { enabled: boolean }> = {};
    for (const rule of a11y.config?.rules ?? []) {
      if (rule?.id) rules[rule.id] = { enabled: rule.enabled !== false };
    }

    await checkA11y(page, a11y.element ?? "#storybook-root", {
      detailedReport: true,
      detailedReportOptions: { html: true },
      axeOptions: {
        runOnly: {
          type: "tag",
          values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"],
        },
        rules,
      },
    });
  },
};

export default config;
