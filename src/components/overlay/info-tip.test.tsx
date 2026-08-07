import "@testing-library/jest-dom/vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { InfoTip } from "./info-tip";

/** A full pointer press: the down, then the click that completes it. */
function press(target: Element | Node) {
  fireEvent.pointerDown(target);
  fireEvent.click(target);
}

describe("InfoTip", () => {
  it("labels the trigger and hides the popover until opened", () => {
    render(
      <InfoTip label="What is an ASN?" title="ASN">
        The network that announces your IP.
      </InfoTip>,
    );
    const trigger = screen.getByRole("button", { name: "What is an ASN?" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens on click and shows the title + body", () => {
    render(
      <InfoTip label="What is an ASN?" title="ASN">
        The network that announces your IP.
      </InfoTip>,
    );
    fireEvent.click(screen.getByRole("button", { name: "What is an ASN?" }));
    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(screen.getByText("ASN")).toBeInTheDocument();
    expect(screen.getByText("The network that announces your IP.")).toBeInTheDocument();
  });

  it("labels the dialog by its title, or by `label` when titleless", () => {
    const { rerender } = render(
      <InfoTip label="What is an ASN?" title="ASN">
        body
      </InfoTip>,
    );
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByRole("dialog", { name: "ASN" })).toBeInTheDocument();

    // The panel stays open across the rerender; only its accessible name changes.
    rerender(<InfoTip label="About reverse DNS">body</InfoTip>);
    expect(screen.getByRole("dialog", { name: "About reverse DNS" })).toBeInTheDocument();
  });

  it("closes on Escape", () => {
    render(<InfoTip label="help">body</InfoTip>);
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes on an outside pointer press but not on an inside one", async () => {
    render(
      <InfoTip label="help" title="T">
        body
      </InfoTip>,
    );
    fireEvent.click(screen.getByRole("button"));
    // The popover registers its outside-press listener on the next tick, so that
    // the click which opened it can't immediately close it again.
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    // A primary-button press only dismisses once the matching `click` arrives —
    // that's what stops a drag or a text selection from closing the panel — so
    // each press below has to be a full press/release pair to be realistic.
    press(screen.getByText("body"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    press(document.body);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("supports controlled open state", () => {
    const { rerender } = render(
      <InfoTip label="help" open={false}>
        body
      </InfoTip>,
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    rerender(
      <InfoTip label="help" open={true}>
        body
      </InfoTip>,
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});
