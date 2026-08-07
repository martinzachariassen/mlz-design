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
});
