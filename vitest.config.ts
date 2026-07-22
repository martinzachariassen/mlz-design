import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    // Needed so @testing-library/react's afterEach auto-cleanup registers and
    // the jsdom DOM is reset between tests.
    globals: true,
    environment: "jsdom",
    include: ["src/**/*.test.{ts,tsx}"],
    // Components are tested at the DOM/class level; skip CSS processing so tests
    // don't need the Tailwind/PostCSS pipeline.
    css: false,
    restoreMocks: true,
  },
});
