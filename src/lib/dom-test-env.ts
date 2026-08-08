/**
 * Test-only stubs for browser APIs jsdom doesn't implement.
 *
 * Never imported from `src/index.ts`, so none of this ships.
 */

/**
 * jsdom has no layout engine and therefore no `ResizeObserver`. Several
 * dependencies construct one on mount and crash without it — Radix's slider
 * measures its thumb through `react-use-size`, and `cmdk` watches its list.
 *
 * A no-op is the honest stub: it never fires, so anything that genuinely
 * depends on a measurement is untestable here by construction, and pretending
 * otherwise would only produce tests that pass on fiction. What *is* testable —
 * markup, wiring, keyboard behaviour, filtering — doesn't need a size.
 */
export function stubResizeObserver(): void {
  globalThis.ResizeObserver ??= class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver;
}

/**
 * `Element.scrollIntoView` is likewise absent — jsdom has nothing to scroll.
 * `cmdk` calls it on every highlight change to keep the active item visible.
 *
 * A no-op again: whether the item is *actually* brought into view depends on
 * layout, so it is only observable in a browser. The tests here assert which
 * item is highlighted, not where it ended up on screen.
 */
export function stubScrollIntoView(): void {
  Element.prototype.scrollIntoView ??= function scrollIntoView() {};
}
