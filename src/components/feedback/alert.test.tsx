import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Alert, AlertDescription, AlertTitle } from "./alert";

describe("Alert", () => {
  // role="alert" is why the JSDoc reserves this for things worth interrupting a
  // screen-reader user for — it announces immediately.
  it("announces itself as an alert", () => {
    render(
      <Alert>
        <AlertTitle>Build failed</AlertTitle>
        <AlertDescription>Check the logs.</AlertDescription>
      </Alert>,
    );
    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent("Build failed");
    expect(alert).toHaveTextContent("Check the logs.");
  });

  it("carries its variant through to the rendered element", () => {
    render(
      <Alert variant="destructive">
        <AlertTitle>Gone</AlertTitle>
      </Alert>,
    );
    expect(screen.getByRole("alert").className).toContain("destructive");
  });

  // The colour ladder: signal *fills* are ~1.9:1 on paper and may never carry
  // text or icons — the root's currentColor feeds both bare text children and
  // the icon slot, so it has to sit on the `-deep` rung.
  it.each(["info", "success", "warning", "destructive"] as const)(
    "colours the %s variant's text with the -deep rung, not the fill",
    (variant) => {
      render(
        <Alert variant={variant}>
          <AlertTitle>Signal</AlertTitle>
        </Alert>,
      );
      const className = screen.getByRole("alert").className;
      expect(className).toContain(`text-${variant}-deep`);
      expect(className).not.toContain(`text-[var(--${variant})]`);
    },
  );
});
