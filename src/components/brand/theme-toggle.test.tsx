import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { ThemeProvider } from "../../lib/theme";
import { installThemeTestEnv } from "../../lib/theme-test-env";
import { AccentPicker, ThemeToggle } from "./theme-toggle";

function renderWithProvider(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

const env = installThemeTestEnv();
beforeEach(() => env.reset());

describe("ThemeToggle", () => {
  it("offers all three choices and marks the active one", () => {
    renderWithProvider(<ThemeToggle />);
    expect(screen.getByRole("radio", { name: "Light" })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "Dark" })).toBeInTheDocument();
    // `system` is the provider's default, so it starts selected.
    expect(screen.getByRole("radio", { name: "System" })).toBeChecked();
  });

  it("applies the chosen theme to the document", () => {
    renderWithProvider(<ThemeToggle />);
    fireEvent.click(screen.getByRole("radio", { name: "Dark" }));
    expect(document.documentElement).toHaveClass("dark");
    fireEvent.click(screen.getByRole("radio", { name: "Light" }));
    expect(document.documentElement).not.toHaveClass("dark");
  });

  // Re-pressing the active item in a single-select group would otherwise clear
  // it, leaving the app with no theme at all.
  it("cannot be emptied by re-pressing the active choice", () => {
    renderWithProvider(<ThemeToggle />);
    const dark = screen.getByRole("radio", { name: "Dark" });
    fireEvent.click(dark);
    fireEvent.click(dark);
    expect(dark).toBeChecked();
  });

  it("drops System when asked", () => {
    renderWithProvider(<ThemeToggle hideSystem />);
    expect(screen.queryByRole("radio", { name: "System" })).not.toBeInTheDocument();
    expect(screen.getAllByRole("radio")).toHaveLength(2);
  });

  it("keeps every button named when icon-only", () => {
    renderWithProvider(<ThemeToggle iconOnly />);
    for (const name of ["Light", "Dark", "System"]) {
      expect(screen.getByRole("radio", { name })).toBeInTheDocument();
    }
  });
});

describe("AccentPicker", () => {
  it("names every swatch, so colour never carries the meaning alone", () => {
    renderWithProvider(<AccentPicker />);
    for (const name of ["cyan", "blue", "green", "rust", "ink"]) {
      expect(screen.getByRole("radio", { name })).toBeInTheDocument();
    }
  });

  it("applies the chosen accent to the document", () => {
    renderWithProvider(<AccentPicker />);
    fireEvent.click(screen.getByRole("radio", { name: "rust" }));
    expect(document.documentElement).toHaveAttribute("data-accent", "rust");
  });

  it("can be narrowed to a subset of families", () => {
    renderWithProvider(<AccentPicker families={["cyan", "ink"]} />);
    expect(screen.getAllByRole("radio")).toHaveLength(2);
  });

  // One tab stop for the whole group, arrows within it — the WAI-ARIA radio
  // pattern, inherited by building on RadioGroup rather than raw buttons.
  it("is a single tab stop", () => {
    renderWithProvider(<AccentPicker />);
    const tabbable = screen.getAllByRole("radio").filter((r) => r.getAttribute("tabindex") === "0");
    expect(tabbable).toHaveLength(0);
    expect(screen.getByRole("radiogroup")).toHaveAttribute("tabindex", "0");
  });
});

describe("ThemeToggle under enableSystem={false}", () => {
  // Offering "System" when the provider coerces it to light is a lie in the UI;
  // the control follows the provider unless explicitly overridden.
  it("hides the System option automatically", () => {
    render(
      <ThemeProvider enableSystem={false} defaultTheme="light">
        <ThemeToggle />
      </ThemeProvider>,
    );
    expect(screen.queryByRole("radio", { name: "System" })).not.toBeInTheDocument();
    expect(screen.queryByText("System")).not.toBeInTheDocument();
  });
});
