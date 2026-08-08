/**
 * Attaches a `displayName` to a component and returns it, as a single
 * expression.
 *
 * Why this exists rather than a plain `Component.displayName = "…"` statement:
 * that statement is a property write on a module-level binding, and every
 * bundler has to treat it as an unconditional side effect. It pins the
 * component — and transitively everything the component imports — into the
 * consuming app's bundle even when nothing there references it. With ~140
 * components in one entry file, that made the package impossible to tree-shake:
 * importing a single helper pulled in the entire library, Radix, `sonner` and
 * `cmdk` included.
 *
 * Folding the assignment into one `/* @__PURE__ *␘/`-annotated call keeps the
 * name React DevTools shows while letting the whole declaration be dropped when
 * it is unused. Always call it annotated:
 *
 * ```tsx
 * export const Thing = /* @__PURE__ *␘/ named(
 *   React.forwardRef<HTMLDivElement, ThingProps>((props, ref) => …),
 *   "Thing",
 * );
 * ```
 */
export function named<T extends { displayName?: string }>(component: T, displayName: string): T {
  component.displayName = displayName;
  return component;
}
