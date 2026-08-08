/**
 * Test-only. jsdom ships the `<dialog>` element but not its modal methods, so
 * the top-layer behaviour `Dialog`, `Sheet` and `AlertDialog` lean on has to be
 * stubbed before any of them renders.
 *
 * **Focus-trapping, Esc and inerting are deliberately not simulated.** They are
 * the platform's job, this stub would only be re-implementing them badly, and
 * the axe run in a real browser is where they actually get exercised. What the
 * unit tests check is the part that is ours: open/close state, the generated
 * `aria-labelledby` / `aria-describedby` wiring, and what dismisses.
 *
 * Never imported from `src/index.ts`, so it never ships.
 */
export function stubNativeDialog(): void {
  // TypeScript types `showModal` as always present because it's in lib.dom;
  // jsdom is the environment where that isn't true, so the check has to look
  // past the type.
  const proto = HTMLDialogElement.prototype as Partial<HTMLDialogElement>;
  if (proto.showModal) return;

  HTMLDialogElement.prototype.showModal = function showModal(this: HTMLDialogElement) {
    this.setAttribute("open", "");
  };
  HTMLDialogElement.prototype.close = function close(this: HTMLDialogElement) {
    this.removeAttribute("open");
    this.dispatchEvent(new Event("close"));
  };
}
