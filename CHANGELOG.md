# @martinzachariassen/design

## 0.6.0

### Minor Changes

- 90269e8: Add **`StatusChip`**, **`CopyButton`** and **`MarginNote`**, self-host the two display faces, and give `GlitchText` an on-demand burst.

  **`StatusChip`** — one live finding as a dot-led pill: a `StatusDot` in the role's colour, a sentence-case label in the reading face, on a `*-subtle` wash inside a tinted hairline. The gap it fills is specific. `Badge` is tracked-out uppercase mono because it labels _what something is_ — a version, a category. `StatusDot` is the dot alone. `Callout` and `Alert` are block-level and imply the reader has to act. Nothing covered "how this is right now", which is what a status stripe across the top of a diagnostic page is made of. There is deliberately no `asChild`: a chip reports a reading rather than being a control, and the dot it injects has nowhere to go inside someone else's element — press-able pills are `Toggle`.

  **`CopyButton`** and **`useCopyToClipboard`** — a `Button` that puts a string on the clipboard and says so, the label swapping to a check plus "Copied" and returning on its own. The hook is the same behaviour without the button. `CodeBlock`'s `copyable` path now runs on it too, so the system has one implementation of the `writeText` + reset-timer pair instead of two that could drift. A refused copy (insecure context, denied permission) leaves the label alone rather than claiming success — the value is still selectable, which is the fallback people already know.

  **`MarginNote`** — the hand-written aside, set in `--font-hand`, optionally with a sketched arrow pointing at whatever it annotates. The arrow is authored once pointing up-left and mirrored for the other three directions, so every variant stays the same hand rather than four drawings that almost match. It's `aria-hidden`: the sentence carries the whole message.

  **`GlitchText` gains `trigger="manual"`** plus a `burstRef` handle, for when the glitch is _feedback_ — a value just hit the clipboard — rather than atmosphere. `burstRef` is separate from `ref`, which still hands back the wrapper element, so reaching for one never costs you the other. `prefers-reduced-motion` and the `data-motion="off"` kill-switch make `burst()` a no-op, same as the other triggers.

  **`fonts-self-hosted.css` now ships all four families.** It carried Space Grotesk and Space Mono only, and said in its own header that the display faces "are not bundled here yet" — which meant `--font-hand` and `--font-serif` silently fell back to Comic Sans and Georgia in exactly the apps that need the self-hosted bundle: the ones under a strict `font-src 'self'`, where the Google Fonts route isn't available at all. Architects Daughter (400) and Instrument Serif (400 + a real italic cut, so numerals don't get a synthesised oblique) are now bundled as WOFF2 alongside the other two, all `latin` subsets to match. No token values change.

## 0.5.0

### Minor Changes

- 9f84bbb: Make the package tree-shakeable. Importing a single helper used to pull in 413 kB — every component, all of Radix, `sonner` and `cmdk`. It is now 59 kB, and a real consuming app dropped from 513 kB to 264 kB.

  Two constructs were defeating every consumer's bundler, and neither looked wrong in the source:

  - **`Component.displayName = "…"` as a statement.** A property write on a module-level binding is an unconditional side effect, so the assignment had to be kept, which kept the component, which kept everything it imported — 139 times over. The name is now attached by a `named()` helper inside a single `/* @__PURE__ */`-annotated expression, so DevTools still shows it and the declaration can be dropped when unused.
  - **Un-annotated top-level calls.** Every `const X = React.forwardRef(…)`, `cva(…)` and `createContext(…)` is now annotated — including the _inner_ call, since dropping a pure call still preserves its arguments' side effects.

  A new `treeshaking.test.ts` gate fails the build if either construct comes back.

  **Breaking:** `Toaster` and `toast` have moved from the root entry to `@martinzachariassen/design/toaster`.

  ```diff
  -import { Toaster, toast } from "@martinzachariassen/design";
  +import { Toaster, toast } from "@martinzachariassen/design/toaster";
  ```

  `sonner` declares no `sideEffects: false` and injects its stylesheet with `document.createElement("style")` at module scope, so no consumer could shake it out. Re-exporting it from the root made every app ship it and run that injection — including apps with a strict `style-src`, which refuse the injected `<style>` and log a CSP violation on every page load. Behind a subpath, only apps that actually want toasts pay for it.

  Also in this release:

  - `BrandLockup` accepts `markProps` and `wordmarkProps`, so the inner `BrandMark` and `BrandWordmark` can be animated or styled without giving up the lockup's fixed proportions. Previously adopting the lockup meant losing any per-mark treatment.
  - `GridBackground`'s spotlight glow blends through a new `--glow-blend` token — `multiply` on paper, `screen` on ink. It was hard-coded to `multiply`, which darkened the dark theme instead of glowing.

## 0.4.0

### Minor Changes

- ce65967: feat(tokens): rebuild the palette on a contrast-anchored OKLCH ladder

  Every chromatic token is regularised onto three rungs, and the rung — not the
  hue — now decides what a colour may be used for. Lightness is fixed per rung, so
  switching `data-accent` changes hue without changing perceived weight: all four
  tint accents carry ink text between 7.2:1 and 8.0:1.

  This fixes contrast failures that were shipping:

  - **Focus rings.** `--ring` was the base accent, measuring **1.82:1** against
    paper — short of the 3:1 WCAG 2.1 SC 1.4.11 requires of a focus indicator, and
    not something axe checks. It now takes the `-deep` rung (5.49:1).
  - **Filled controls.** Paper text on the `rust` (2.75:1), `blue`/`info` (3.04:1)
    and `success` (3.12:1) solids was below AA. Those solids sat in the
    mid-lightness dead zone where _neither_ ink nor paper text reaches 4.5:1; they
    move to the tint rung and pair with ink.
  - **Icons and status dots.** Components coloured check marks, dots and toast
    icons with fill values (`text-accent`, `text-success`, …), which measure about
    1.9:1 on paper. They now use the `-deep` rung, which maps back to the fill in
    dark mode and so is correct in both themes.
  - **Gamut.** Five values (including the house cyan and `--warning-deep`) sat
    outside sRGB and were silently clipped, so they did not measure what they
    claimed on every display. All values are now inside sRGB.
  - **`data-accent` in dark mode.** The accent rules and the `.dark` block had
    equal specificity, and the accent rules came later — so a dark page with a
    non-default accent got the paper-tuned rung. Restated at higher specificity.

  Two gates now hold the palette together. `src/tokens.contrast.test.ts` asserts
  the ladder's shape against the JS mirror; `src/theme-css.test.ts` parses
  `theme.css` itself — resolving `var()` and `color-mix()` — checks the mirror
  against it value-for-value, fails on any colour primitive the mirror does not
  know about, and re-runs the contracts on the resolved semantic roles in both
  themes and all five accent families. The second is what makes theme/mirror drift
  impossible rather than merely discouraged.

  `--muted-foreground` and the `--overlay` mix move to OKLCH (losslessly:
  `--muted-foreground` still resolves to `#63615a`), leaving the seven neutral
  brand primitives as the only hex in `theme.css` — now asserted.

  Adds `@types/node` as a devDependency: the drift gate reads `theme.css` from
  disk, because Vitest's `css: false` stubs any `.css` import — `?raw` included —
  to an empty string, which would make every assertion pass vacuously.

  **Visible changes.** `blue`, `info` and `success` shift most (they were deepest
  in the dead zone); `rust` and `warning` shift moderately; the house `cyan` and
  `danger` are near-identical to before. `danger` and the `ink` accent stay bold
  fills — a destructive action must not read as decorative.

  **New exports.** `accentFill`, `signalFill` and `onDark`, plus the `FillMode`
  type, describing which foreground a fill pairs with and how the bold roles flip
  on dark surfaces. Foundations → Colour model documents the whole ladder.

- 1f5e647: Add **`Command`** (+ `CommandDialog`) and **`Combobox`**, backed by `cmdk`.

  `CommandDialog` runs on this system's **native `<dialog>`**, not on cmdk's own
  `Command.Dialog` — that one wraps Radix Dialog, which would put two modal
  implementations with different focus-trap and top-layer behaviour in one
  package. It shares the engine `Dialog`, `Sheet` and `AlertDialog` already use.

  `Combobox` is `Command` inside a `Popover`, and joins a surrounding `Field`
  automatically. Re-picking the current value clears it — a combobox has no
  "none" row, so that is the only route back to empty.

  Two accessibility fixes to cmdk's markup, both of which a screen reader would
  otherwise notice. Its internal `[cmdk-list-sizer]` wrapper carries no role and
  was the listbox's only child, which severs the groups and options from it
  entirely; it is now presentational. And its separator defaults to
  `role="separator"`, which a `listbox` may not own — that is presentational too,
  since the group headings already carry the structure.

  `cmdk` is the second non-Radix runtime dependency after `sonner`. It adds
  exactly one package to a consumer's tree that wasn't already there
  (`@radix-ui/react-dialog`, 120 KB); everything else it needs, the existing Radix
  components already pull in.

- 13e9763: Add **`AlertDialog`** — a confirmation before something irreversible.

  It runs the same native `<dialog>` engine as `Dialog` and `Sheet`, with three
  deliberate differences: `role="alertdialog"` so assistive tech announces it as a
  decision and reads the description on open, **no backdrop dismissal** so a stray
  click can't answer a question about deleting something, and **no ✕** so the two
  ways out are both in the footer. Cancel takes focus, which makes Enter safe on a
  dialog nobody has read yet. Esc still cancels — that is the platform's, and
  removing it would trap someone who opened the dialog by mistake.

  Internally, the `<dialog>` engine that `Dialog` and `Sheet` each carried a
  character-for-character copy of is now one implementation
  (`overlay/modal-root.tsx`, internal, never exported). Behaviour of both is
  unchanged — their tests pass untouched.

- 08a4a19: Add `Breadcrumb`, `Pagination` and `Sheet`.

  The site-and-blog set. **No new dependency** — `Breadcrumb` and `Pagination` are
  plain markup, and `Sheet` reuses the platform.

  - **`Breadcrumb`** (+ `List`/`Item`/`Link`/`Page`/`Separator`/`Ellipsis`) — a
    `<nav>` around an `<ol>`, because the order _is_ the meaning. The current page
    is marked with `aria-current="page"`, never linked to itself. `asChild` on the
    links hands off to a router.
  - **`Pagination`** (+ `Content`/`Item`/`Link`/`Previous`/`Next`/`Ellipsis`) —
    every page is a real URL, which is the whole reason to prefer it over "load
    more": infinite scroll has no address for page 4. The current page stays a
    link; `aria-current` is what distinguishes it.
  - **`Sheet`** (+ `Content`/`Header`/`Title`/`Description`/`Footer`/`Close`) — a
    panel sliding in from any of the four edges, for mobile navigation or a filter
    drawer.

  `Sheet` is built on the **native `<dialog>` element**, the same as `Dialog`,
  rather than adding `@radix-ui/react-dialog`. That keeps one modal implementation
  instead of two, and focus-trapping, Esc, background inerting and the top layer
  all come from the platform.

  Its slide-in is **progressive enhancement**: it needs `@starting-style` and
  `transition-behavior: allow-discrete`, both current-browser-only. Where they're
  missing the sheet simply appears in place, fully usable — and
  `prefers-reduced-motion` skips the movement too.

- d8f9fa3: Adopt Radix as the behaviour backbone, and retire the Templates stories.

  Interaction behaviour now comes from Radix primitives — the same backbone
  shadcn/ui uses — while all styling stays MLZ. Public APIs are unchanged.

  - **`Tabs`, `Accordion`, `InfoTip`** rebuilt on Radix, removing ~700 lines of
    hand-rolled WAI-ARIA code and two real defects: both `Tabs` and `Accordion`
    located sibling elements with a _global_ `document.querySelector`, so two
    instances sharing a `value` on one page cross-talked. `Tabs` also gains
    Home/End and now respects `orientation` (vertical arrows no longer drive a
    horizontal tablist). The accordion keeps its fluid `grid-template-rows`
    open/close animation.
  - **`Avatar`, `Progress`, `Separator`, `Label`** adopt the matching primitives.
    `Avatar` gains Radix's image loading states and a `delayMs` on the fallback;
    `Label` no longer selects its own text on double-click.
  - **`asChild`** (via `@radix-ui/react-slot`) added to `Button`, `Badge` and
    `Card`, and `DialogClose` now uses `Slot` instead of `cloneElement` — so
    `<Button asChild><a href="…">…</a></Button>` works.
  - **`Dialog`** stays on the native `<dialog>` element, where focus-trapping, Esc,
    inerting and the top layer are free. Two fixes: `DialogTitle` and
    `DialogDescription` are now wired to the dialog via `aria-labelledby` /
    `aria-describedby` (they previously named nothing), and `defaultOpen` allows
    uncontrolled use. A backdrop press that starts inside the dialog no longer
    dismisses it, so releasing a text selection is safe.
  - `Checkbox` and `Switch` deliberately stay native, zero-JS inputs; no icon
    library was added.
  - **Removed** the `Templates/Portfolio` and `Templates/Blog` Storybook stories.
    They were never exported from the package.

- 92c8fc9: Add `Tooltip`, `DropdownMenu`, `Select` and `RadioGroup`.

  The four primitives the system was missing, all on the Radix backbone adopted in
  0.4.0 and styled from semantic tokens only — so they re-theme with the
  `class="dark"` / `data-accent` switches like everything else.

  - **`Tooltip`** (+ `Provider`/`Trigger`/`Content`) — a short hover/focus hint in
    inverted chrome. It attaches as the trigger's **description**
    (`aria-describedby`), not its name, so an icon-only button still needs its own
    `aria-label`.
  - **`DropdownMenu`** (+ `Trigger`/`Content`/`Item`/`CheckboxItem`/`RadioItem`/
    `Label`/`Separator`/`Shortcut`/`Group`/`Sub*`) — a menu of actions, with
    `variant="destructive"`, submenus, type-ahead and full keyboard support.
  - **`Select`** (+ `Trigger`/`Value`/`Content`/`Item`/`Label`/`Separator`/`Group`)
    — one value from many, wearing `Input`'s border, height and focus ring. It's a
    custom listbox rather than a native `<select>`: pass `name` inside a `<form>`
    to get a hidden native control that submits.
  - **`RadioGroup`** (+ `Item`) — two to five exclusive choices, sized to match
    `Checkbox`. The group is one tab stop with the arrows moving inside it, per the
    WAI-ARIA pattern.

  Each component's JSDoc says when to reach for a sibling instead — `Select` vs
  `RadioGroup` vs `DropdownMenu`, and `Tooltip` vs `InfoTip` vs `Dialog`.

  No icon library was added. The few glyphs these need live in `src/lib/icons.tsx`,
  which is internal and deliberately not exported; consumers still bring their own.

- f22dad7: Remove the icon system, the SwiftUI native token layer, and the brand-assets generator — trimming the package to the web component/token system.

  **Breaking:**

  - Removed `Icon`, `IconProps`, `iconVariants`, `houseIcons`, `IconName`, `iconNames`, and the re-exported `addCollection`/`addIcon`/`IconifyIcon` Iconify helpers.
  - Removed `InfoTip`'s `icon` prop — its trigger now renders a single fixed glyph.
  - Removed the `./brand-assets` subpath export (`defineBrandAssets`, `BrandAssetsConfig`) and the `gen:assets`/`gen:banner`/`gen:icons`/`gen:swift` scripts.
  - Removed the generated `swift/` SwiftPM package (`MLZDesign`) — no more native iOS/macOS token layer.
  - Removed this repo's own generated brand assets (`assets/banner.svg`, `public/assets/*`, `public/favicon.ico`); the README and Storybook playground no longer ship a custom banner/favicon.

  `Accordion`'s chevron and `InfoTip`'s trigger glyph are now inline SVG, so neither depends on the icon set anymore.

- 58e3804: Add `Table`.

  `Table` (+ `Header`/`Body`/`Footer`/`Row`/`Head`/`Cell`/`Caption`) — the same
  fields across many rows, in the mlz voice: mono column headers in the eyebrow
  style matching what `Prose` already gives raw `<table>` markup, hairline row
  rules, and a row tint on hover. **No new dependency** — this is styling on real
  table elements, not a behavioural primitive.

  It closes a gap the 0.4.x docs opened: `DataList`'s guidance told readers to
  "reach for a `<table>`" that the system didn't style. That line now names
  `Table`, and `Table` returns the favour — use it when fields repeat across rows,
  use `DataList` for the facts about one thing.

  Two accessibility details worth knowing:

  - It wraps itself in a **focusable** horizontal scroll container, so a wide
    table scrolls inside its own box and a keyboard user can reach the far
    columns. Deliberately _not_ a `role="region"` landmark, since an unnamed
    landmark is worse than none.
  - `TableHead` defaults to `scope="col"`; pass `scope="row"` to make the first
    column row headers.

- b83ec29: Six new components, none of which needs a new dependency.

  - **`Field`** (+ `FieldLabel` / `FieldDescription` / `FieldError`) — a labelled
    control with its description and error, wired together. One generated id
    becomes the control's `id`, the label's `htmlFor` and the `aria-describedby`
    target, and only the parts actually rendered are advertised. `Input` and
    `Textarea` join automatically through the exported `useFieldControlProps`.
  - **`Popover`** — the general non-modal panel. `@radix-ui/react-popover` was
    already a dependency; only `InfoTip` could reach it.
  - **`EmptyState`**, **`Stat`**, **`Link`**, **`Code`** / **`CodeBlock`**.

  Adds the **`-deep` signal roles** to the token layer: `--success-deep`,
  `--warning-deep`, `--info-deep`, `--destructive-deep`, mirroring the existing
  `--accent-deep`, plus a `signalsDeep` export from `./tokens`. The solids are
  fill colours — as small text on paper, `--warning` measures 1.6:1 and
  `--success` 3.1:1, both short of AA. The deep variants are the same hues
  darkened until they clear 4.5:1, and in dark mode they map straight back to the
  solids, which already pass there.

  `Link variant="subtle"` reads from `--accent-deep` rather than `--accent` for
  the same reason (cyan is 1.8:1 as text), matching how `Prose` colours links.

- 83e7bf2: Four new components, one granular Radix dependency each.

  - **`Slider`** — single or range. Takes `thumbLabels`, which a range needs: the
    element carrying `role="slider"` is the _thumb_, so an `aria-label` on the
    root never reaches it, and two thumbs with the same name are
    indistinguishable to a screen reader. A single-thumb slider gets its root
    label copied down automatically.
  - **`Collapsible`** — one thing that opens and closes. Reach for `Accordion`
    the moment several belong together.
  - **`HoverCard`** — a rich preview on hover, with a deliberate 700ms open delay.
    Always an enhancement: it never opens on click or touch.
  - **`ScrollArea`** — a bounded scrolling panel with a scrollbar that matches the
    system. Scrolling stays native; only the bar is restyled.

  `Link variant="subtle"` is now documented as unsuitable inside running text —
  without an underline the link is distinguishable only by colour, which fails
  WCAG 1.4.1. Use `default` there. No behaviour change.

- dd5b237: Add `Toaster` and `toast()`.

  Transient confirmations — "Copied", "Deployment queued" — backed by Sonner.

  **This adds `sonner`, the only non-Radix third-party runtime dependency in the
  system.** It's kept in its own component so the trade stays reversible: Sonner's
  own styling is switched off (`unstyled`) and every slot re-dressed from semantic
  tokens, so toasts re-theme with the `class="dark"` / `data-accent` switches like
  everything else, and the signal colours are the same tokens `Alert` and
  `Callout` use.

  Mount `<Toaster />` once near the root; call `toast()` from anywhere.

  The JSDoc is explicit about when _not_ to use it. A toast disappears on its own,
  so nothing requiring action belongs in one — a reader may never see it, may not
  reach it in time, and can't get it back. Errors are the common mistake: "Failed
  to save" in a toast means the work is gone and the notice has already faded.
  That's an `Alert`, next to the thing that failed.

- 51a78f0: Add `Toggle`, `ToggleGroup` and `ThemeToggle` / `AccentPicker`.

  Adds one dependency, `@radix-ui/react-toggle-group`.

  - **`Toggle`** — a button that stays pressed, reporting state through
    `aria-pressed` so the label can stay constant. `default` and `outline`
    variants, `sm`/`default`/`icon` sizes.
  - **`ToggleGroup`** (+ `Item`) — `type="single"` is a segmented control,
    `type="multiple"` a filter bar. The group sets `variant`/`size` once through
    context, and Radix owns the roving focus, so it's one tab stop.
  - **`ThemeToggle`** and **`AccentPicker`** — the light/dark/system switch and
    the five accent swatches, built on the existing `useTheme()`. The system's
    headline feature is runtime theming, but until now every consuming app had to
    rebuild the control for it; these make `ThemeProvider` turnkey.

  `AccentPicker` is built on the system's own `RadioGroup`, so arrow-key
  navigation and the single tab stop come from Radix rather than being
  hand-rolled. Every swatch is named — colour never carries the meaning alone.

  `ThemeToggle` also guards against a single-select group being emptied by
  re-pressing the active item, which would otherwise leave the app with no theme.

### Patch Changes

- 1e05639: Pin `playwright` to the version `@storybook/test-runner` drives (1.61.1) so the
  a11y gate installs a browser from the lockfile rather than whatever the registry
  serves that day.

  No runtime change — the rest of this bump is workflow hardening (pinned Bun,
  bounded job runtimes, concurrency groups) and repository templates.

- f06c2e1: Tests only — no behaviour change. Every component in the library now has
  coverage.

  The gaps closed were `Container`/`Stack`/`Grid` (three exported primitives with
  zero tests), `Textarea`, `Label`, `Kbd`, `Prose`, `Skeleton`, `Spinner`, and the
  `brand/` components. The ones worth having: `Grid`'s auto-fitting track
  expression including the `min(100%, …)` cap that stops a wide track overflowing
  a phone, `FloatingMarks` rendering identically across mounts (it hashes each
  mark's index rather than calling `Math.random`, which is what keeps it
  SSR-safe), and the locked aspect ratios of `RepoBanner` and `SocialCard`, which
  are export templates where the ratio is the contract.

- 2c2ace1: fix(components): put every ink-position colour on the `-deep` rung, and gate it

  `StatusDot`, `Toaster`, `FieldError`, `DropdownMenuItem` and the destructive
  `Button` painted `text-destructive` — a fill token in a text position. It passed
  AA by luck (destructive is the one bold signal, so it lands at 5.00:1 on paper),
  but it left `destructive` as the only signal in the set not on the `-deep` rung:
  `StatusDot` used `-deep` for success, warning, info and accent, and the base fill
  for destructive. All five now use `-deep`, which is the documented rule and
  raises the light-mode figure to 5.45:1. Dark mode is unchanged — `-deep` maps
  back to the fill there.

  Four `BrandMark` glyphs and a Typography label were genuinely below the bar:
  `text-accent`/`text-success` on paper is 1.83:1, under even the 3:1 icon
  threshold. Those move to `-deep` (5.38–5.49:1). One of them was inside
  `EmptyState`'s JSDoc example, so the wrong rung was being taught to consumers.

  `Slider`'s thumb moves to `border-accent-deep` for a different reason: the thumb
  _is_ the control, so its outline is the only thing marking where it sits. On the
  filled half of the track an accent border sat on an accent range — 1.00:1, an
  invisible edge — and the thumb's paper fill is only 1.83:1 against that same
  range, so in light mode neither channel reached the 3:1 of SC 1.4.11. The deep
  border now carries it at 3.00:1. Dark mode was never affected: the border is
  equally invisible there, but the thumb's dark fill separates from the light
  accent range at 8.26:1.

  Adds `src/colour-usage.test.ts`, which fails the build if a chromatic fill
  appears in a text, icon, ring or underline position anywhere in `src/`. The
  existing contrast tests read _tokens_ and so could never catch this — the
  palette was correct the whole time; the call sites were not.

- 46e16f6: Declare `@radix-ui/react-toggle` as a direct dependency.

  `Toggle` imported it while only `@radix-ui/react-toggle-group` was declared, so
  it resolved transitively. Two things followed from that: tsup externalises
  exactly `dependencies` + `peerDependencies`, so the Radix toggle runtime was
  **bundled into `dist/index.js`** instead of imported — while `dist/index.d.ts`
  still referenced the package by name, breaking typecheck for consumers on
  pnpm's strict layout or Yarn PnP. And because `ToggleGroupItem` loaded the
  primitive from its own copy, `Toggle` and `ToggleGroupItem` were running two
  separate module instances of the same code.

  Declaring it externalises the runtime and de-duplicates the primitive.

- 879387a: Bump dev dependencies, and stop hardcoding a version in the docs examples.

  - `@biomejs/biome` 2.5.5 → 2.5.7 (plus the `biome migrate` schema bump),
    `vite` 8.1.5 → 8.2.1, `@types/react`, `@types/react-dom`,
    `@vitejs/plugin-react`, `concurrently`. All patch/minor.
  - **TypeScript stays at 6.0.3.** 7.0.2 is available but a major compiler bump
    deserves its own PR rather than riding along with routine maintenance.
  - `README.md` and the Storybook **Installation** page showed
    `<Badge variant="accent">v0.3.0</Badge>` in their example snippet, which goes
    stale on the next release — and would have, since several releases are pending.
    Now `Production`, which suits the surrounding Deploy / Ship it example better
    anyway.

  No runtime dependency or API changes.

- 0e80c4b: Give `Kbd` the component prose every other component already has — what it is,
  and when a `<code>` element is the right call instead. Docgen lifts it into the
  docs page and the consumer's editor tooltip.

  Documentation only otherwise: two new playground pages (**Get started →
  Accessibility**, **Reference → Tokens**, **Reference → Changelog**) and a
  corrected architecture map.

- 2357f61: Fill in the Storybook Docs page for every component.

  Component JSDoc was attached to the `cva` variants object or the props interface rather than the exported component, so `react-docgen-typescript` never picked it up and each autodocs page rendered with a blank description. The comments now sit directly above the components they describe — which also means editors show them on hover for consumers — and every sub-component (`CardHeader`, `TabsTrigger`, `DialogFooter`, `AvatarFallback`, …) gained one too.

  Alongside that: every remaining prop on an exported `*Props` interface is documented, `argTypes` carry descriptions for the CVA-driven props (`variant`, `size`, `tone`) that the docgen prop filter drops, and each story has a line explaining what it demonstrates. The Dialog and Project Card stories previously produced empty docs pages — Dialog now sets an explicit `docs.description.component` and Project Card declares its `component`, so it renders a props table.

  No runtime or API change.

- b52fc14: Storybook only — no package change. The single `Patterns/Overview` story is now
  four named recipes: **Application shell**, **Dashboard**, **Forms**, and
  **Feedback and states**, thirteen stories between them.

  Each one is individually linkable, and the odd `Patterns → Overview → Overview`
  nesting is gone. The recipes now use the components that were extracted from
  them — `Stat`, `EmptyState`, `Field`, `Command`, `Collapsible`, `AlertDialog` —
  rather than hand-rolling the same shapes inline.

- 67e601e: Restructure Storybook and deepen the component docs.

  No runtime API changes — the only `src/` edits are JSDoc, which now also reaches
  consumers' editor tooltips.

  - **New information architecture:** `Get started` (Introduction, Installation,
    Theming) · `Foundations` · `Brand` · `Components` · `Patterns`. `Brand` is
    promoted to its own top-level section, and `src/foundations/` stops being a
    junk drawer — `RepoBanner` and `SocialCard` stories now colocate with their
    source in `src/components/brand/`.
  - **New Installation and Theming pages** covering the GitHub Packages registry
    setup, the two-line CSS import, `ThemeProvider` / `useTheme`, and
    `themeInitScript()` for avoiding the theme flash.
  - **`storySort` now enumerates every level.** It previously listed four of ten
    `Foundations` children, so the rest fell through to definition order.
  - **Component docs gained "when to reach for a sibling instead"** — Tabs↔
    Accordion, Checkbox↔Switch, Badge↔StatusDot, Dialog↔InfoTip,
    Skeleton↔Spinner↔Progress, DataList↔`<table>`, and button-vs-link.
  - **`subcomponents`** on the compound APIs (Card, Dialog, Tabs, Accordion,
    Avatar, Alert, DataList, Container) so each part gets its own props table.
  - Every story meta now sets `tags` explicitly instead of relying on the global
    default, and the Dialog docs page no longer carries a hand-copied description
    that had already gone stale.
  - Added a Storybook favicon built from the Block-M mark.

  Manager chrome theming is **not** included: on Storybook 10.5.7 the mere
  presence of a `.storybook/manager.ts` crashes the manager, even when empty. See
  `docs/architecture.md` for the bisect and what to retry after an upgrade.

- da64d5c: Brand the Storybook manager chrome, and fix silently-broken MDX tables.

  Both were blocked by bugs that a successful build reported nothing about.

  - **The manager is now MLZ-branded** — brand title, paper/ink palette and Space
    Grotesk, every value read from `src/tokens.ts` so the chrome can't drift from
    the system it documents. This was previously abandoned as an unfixable
    Storybook bug; it turned out to be narrower than it looked. A _built_ manager
    goes blank only when **two addons and a `manager.ts` both exist** — one addon
    is fine, either order is fine, and `storybook dev` is unaffected.
    `@storybook/addon-a11y` is therefore registered outside the build only. The
    a11y **gate** is untouched: it runs on `axe-playwright`, never the addon, and
    all 161 checks still pass.
  - **Markdown tables in `.mdx` pages now render.** Storybook's MDX pipeline ships
    no GFM, so the tables on the Theming page were displaying as literal `|`
    characters with no build warning. `remark-gfm` is now wired through
    `addon-docs`.

  Storybook-only; no runtime API change.

- 78f585e: Extend test coverage, and make the a11y gate audit open components.

  Three changes, all to tests and Storybook config — no runtime code touched.

  - **Unit tests for nine previously untested components**: `Progress`,
    `Separator`, `Checkbox`, `Switch`, `Input`, `Textarea`, `Alert`, `Avatar` and
    `Card`. 92 → 129 tests. `Progress` and `Separator` were the priority: 0.4.0
    swapped both to Radix internals with nothing standing guard.
  - **The a11y gate now sees open components.** `play` functions open the
    dropdown menu, select listbox, dialog and tooltip, and exercise the accordion
    and tabs — and axe is scoped to the preview `body` rather than
    `#storybook-root`, because every overlay portals outside that root. Until now
    the gate had only ever audited _closed_ menus and dialogs.
  - **Storybook viewports are generated from `tokens.breakpoints`**, so responsive
    checks happen at the widths the components actually switch at.

  One rule, `aria-hidden-focus`, is disabled on the two stories that open a
  **modal** Radix overlay. Radix marks the rest of the page `aria-hidden` while
  one is open and axe flags the still-focusable trigger beneath it; focus is moved
  into the overlay, so screen readers behave correctly. Notably the `Dialog` story
  does not trip it — the native `<dialog>` element uses the top layer and inerting
  instead.

## 0.3.0

### Minor Changes

- c6d3884: feat: one-command brand-asset generator

  Add `gen:assets` — a generator that renders a repo's full graphical set (README
  banner, OG/Twitter cards, and the favicon/app-icon set) from the real
  design-system components in headless Chromium, so every project wears the
  identical face from one `brand.config.ts`. Ships:

  - `@martinzachariassen/design/brand-assets` — the `BrandAssetsConfig` contract and
    a `defineBrandAssets` helper for typed config files.
  - `bun run gen:assets --config <path> --out <repoRoot>` to write the assets, and
    `--check` to fail CI when a committed asset has drifted from a fresh render.
  - `SocialCard` now takes a `tagline` prop (was a hardcoded "Design System"), so a
    consuming site sets its own descriptor under the wordmark.

- 6de399a: feat: add an offline house icon set + `<Icon />` component

  Icons are now part of the canonical system, so every project draws from one
  curated vocabulary and nothing drifts. Built on Iconify (offline), so there is no
  runtime network call and glyphs are deterministic.

  - **`<Icon />`** (exported from the package root) — renders a curated Lucide glyph
    inline, inheriting `currentColor` (colour it with `text-*` utilities) and sized
    from a `size` scale (`xs`→`xl`, or any Tailwind `size-*` override). Decorative by
    default (`aria-hidden`); pass `label` to expose it to assistive tech as an image.
    Bring-your-own glyphs are supported via the raw `icon` data prop.
  - **The house set** — 76 curated Lucide icons frozen into the package as inline
    `IconifyIcon` data (`houseIcons`, `iconNames`, and the `IconName` union). Regenerate
    or extend with `bun run gen:icons` (`scripts/generate-icons.ts`).
  - **Iconify offline helpers re-exported** (`addCollection`, `addIcon`, the
    `IconifyIcon` type) so consumers can register their own offline glyphs without
    installing Iconify themselves.
  - **Storybook** — `Components/Data Display/Icon` with a full gallery of the set,
    size/colour/in-button examples, and a light/dark split.

- 46e364a: feat: add `InfoTip` — an inline glossary popover

  A small icon button that sits in the flow of text and, on click, opens a compact
  popover explaining a term — built for glossary-style "what / why" help. Radix-free:
  the panel renders in a portal (so no ancestor `overflow: hidden` can clip it) as a
  non-modal `role="dialog"`, positions itself with `getBoundingClientRect` (flipping
  above the trigger when there's no room below and clamping to the viewport), and
  light-dismisses on outside-click, Esc, or a second click on the trigger. Focus moves
  into the panel on open and returns to the trigger on close. The trigger sizes itself
  in `em`, so it tracks the font-size of the text it's dropped into. Supports both
  controlled (`open`/`onOpenChange`) and uncontrolled use.

- 46e364a: feat: self-hosted fonts + Accordion, StatusDot, DataList, Callout and Text

  Adds the components and font-delivery a strict-CSP, privacy-first consumer
  (ip-speil) needs to be built entirely from the design system — all on the
  semantic token layer, so nothing app-specific leaks into the system.

  - **Self-hosted fonts** — ships Space Mono (400/700) and Space Grotesk
    (400/500/600/700) as bundled WOFF2 under `styles/fonts/`, plus two new CSS
    entry points:
    - `styles/fonts-self-hosted.css` — `@font-face` with relative urls, so a
      consumer's bundler fingerprints and serves them same-origin (no Google Fonts
      CDN, no visitor-IP leak). Works under `font-src 'self'` / `style-src 'self'`.
    - `styles/index-self-hosted.css` — the CSP-safe one-import bundle (theme +
      self-hosted fonts + base + `@source`). The Google-Fonts `fonts.css` /
      `index.css` remain for quick-start consumers.
  - **`<Accordion />`** (+ `AccordionItem`, `AccordionTrigger`, `AccordionContent`)
    — a Radix-free, context-driven disclosure with the WAI-ARIA accordion keyboard
    pattern (Up/Down/Home/End) and a fluid `grid-template-rows: 0fr→1fr` open/close
    animation. `type="single" | "multiple"`, controlled or uncontrolled,
    `collapsible`.
  - **`<StatusDot />`** — a semantic status dot (success/warning/destructive/info/
    accent/muted) with an optional pulsing ring; `bg-current` so the ring tracks the
    colour.
  - **`<DataList />` / `<DataRow />`** — a definition list for key/value facts. The
    default `layout="justify"` gives hairline dashed row rules with a right-aligned,
    optionally `mono` value; `layout="grid"` (cascaded from the list, overridable
    per row) switches to a fixed eyebrow-label column plus a left-aligned value that
    collapses to one column below 560px — a scannable field list for longer values.
    The label column width is set via the `--mlz-data-label` CSS var (default
    `8rem`).
  - **`<Callout />`** — a compact, dot-led inline note (lighter than `Alert`) for
    dense lists of findings/checks.
  - **`<Text />`** — an inline typography primitive (body/lead/muted/mono/eyebrow)
    for the small everyday type roles that don't warrant a full `Prose` block.
  - Stories + tests for every new component.

- 6de399a: feat: ship a theme runtime + light/dark usage guidance

  Make the system turnkey for a consumer that needs light/dark. The tokens already
  carried a full light + dark palette and five accents; this adds the runtime and the
  docs so a downstream app can flip and use them correctly.

  - **`ThemeProvider` / `useTheme` / `themeInitScript`** (exported from the package
    root) — a zero-dependency, framework-agnostic runtime that toggles `.dark` and
    `data-accent` on `<html>`, follows `prefers-color-scheme` under `"system"`,
    persists the choice, and (via the inline `themeInitScript`) applies it before
    first paint so there's no flash.
  - **Forced-theme subtrees** — the light semantic layer now also matches
    `[data-theme="light"]`, so a subtree can force light even inside a `.dark`
    ancestor (mirrors the existing `[data-theme="dark"]`). Enables side-by-side
    light/dark and always-light/always-dark widgets. No token values changed.
  - **`Foundations/Colour Usage`** — a new Storybook page documenting surface →
    foreground pairings and which colours to use as text on dark vs. light
    backgrounds (accent goes deep on light, stays bright on dark), solids vs. subtle
    tints, and the "read the semantic layer only" rule.
  - **Per-component `LightDark` stories** — every component now has a story that
    renders it in forced light and dark side by side, proving both themes at a glance.
  - **Dark-mode contrast fixes (surfaced by the new axe-over-every-story CI gate)** —
    the `*-subtle` tints are now declared inside each theme scope instead of once on
    `:root`. A custom property substitutes its inner `var()`s at its declaring element,
    so the single `:root` definition had frozen the tints to the light `--background`,
    leaving `foreground`/`muted-foreground` unreadable on them in dark (Alert, Card…).
    Dark `--destructive` is also retuned (`oklch(0.64 0.19 20)` with a dark
    `--destructive-foreground`) to match how success/warning/info already lift in dark,
    so the outline destructive Button clears WCAG AA. Light values are unchanged.

### Patch Changes

- 46e364a: Button: slower, smoother hover/focus lift. The signature raise + offset shadow
  now travels over 260ms on a new, non-front-loaded easing instead of a snappy
  200ms. Adds `--ease-glide`/`--dur-hover` motion tokens (mirrored in `tokens.ts`
  as `motion.easeGlide`/`motion.durationHover`) so the tuned interaction feel is
  reusable across components.

## 0.2.0

### Minor Changes

- 0935e0b: Expand the system into a broad component kit plus brand/marketing assets, all
  styled purely from semantic tokens (so they re-theme with `dark` / `data-accent`
  for free):

  - **Brand assets (the logo)** — a fixed two-part identity: `BrandMark`
    (the solid **Block M** on an ink tile, always monochrome, `tile`/`glyph`
    variants) and `BrandWordmark` (`mlz.` in Space Mono Bold, the accent period
    driven by the new `--brand-period` token — deep on light for AA, base on dark),
    paired by `BrandLockup` (`horizontal` or `stacked`, mark = 1.45× wordmark, an
    optional 40px+ tagline). New Foundations/Logo page (system, construction,
    lockups, colour, sizing/clear-space, applications, misuse, hand-off) and a
    Brand & Favicon page with sizes, browser-chrome previews and an export recipe.
    The earlier stroked-`M`-plus-caret mark is retired.
  - **`SocialCard`** — a ready-to-screenshot 1200×630 Open-Graph template built from
    tokens (engineering frame, ruled grid, brand lockup, grotesk headline), with a
    `width` prop that scales the whole card as one and a Next.js / `@vercel/og`
    generation recipe.
  - **`RepoBanner`** — the README header banner, sized for GitHub's ~896px README
    width (1280×340), with four shared-structure layouts (`standard` · `minimal` ·
    `terminal` · `split`) driven only by per-project copy. A Foundations/Repo Banner
    page shows all four, light/dark capture and the `<picture>` export recipe; a
    `bun run gen:banner` script renders this repo's `assets/banner.svg` with the brand
    fonts subset and embedded, so it renders self-contained and theme-adaptive.
  - **New components** — `Alert` (+ `Title`/`Description`), `Avatar`
    (+ `Image`/`Fallback`), `Checkbox`, `Switch`, `Label`, `Textarea`, `Tabs`
    (Radix-free, keyboard-navigable), `Progress`, `Skeleton`, `Spinner`,
    `Separator`, and `Kbd` — each accessible and colocated with stories.
  - **`Card`** — now variant-driven: `default` · `elevated` · `interactive`
    (signature hover-lift with an offset accent shadow) · `accent` · `ghost`, plus a
    `CardAction` header slot and `data-slot` hooks. Richer stories (stat, feature,
    pricing, interactive).
  - **Foundations/Patterns** — a composed reference (app shell, dashboard, settings
    form, tabbed auth, alerts, activity list, empty state) documenting how to build
    UIs in the system's voice.
  - **One-import setup** — a new `styles/index.css` bundles the tokens, fonts and
    base layer _and self-declares the package's Tailwind `@source`_, so a consuming
    app inherits the whole system (including every component's classes) in two lines:
    `@import "tailwindcss"` then `@import "@martinzachariassen/design/styles/index.css"`
    — no manual `@source`, no separate imports. The granular `theme.css`/`fonts.css`/
    `base.css` exports remain for finer control.
  - **Portfolio & long-form** — `ProjectCard` (portfolio card with an on-brand
    grid+monogram cover, a `featured` horizontal layout, tags and a whole-card link),
    a native-`<dialog>` `Dialog` (focus-trap, Esc and inert background for free —
    no dependency), and `Prose` (token-styled long-form typography for blog/article
    text). Two full-page Templates stories — Portfolio and Blog (index + reading
    view) — each with a deliberate responsive alternate layout.
  - **Avatar** — reworked initials-first: `xs`–`xl` sizes, `circle`/`square` shapes,
    presence `status` dots, fallback `tone`s, and an `AvatarGroup` (overlap + `+N`).
    All stock/placeholder imagery removed from the stories and patterns.
  - **Layout & responsive** — new unstyled primitives `Container`, `Stack` and
    `Grid` (auto-fit or fixed responsive columns), a `breakpoints` token scale
    exported from `./tokens` (mirrors Tailwind's ladder), and a Foundations/Responsive
    page showing the mobile→desktop app shell.
  - **SwiftUI token layer (iOS/macOS)** — a generated, dependency-free Swift package
    under `swift/` (`MLZColor`, `MLZFont`, `MLZSpacing`, `MLZRadius`, `MLZMotion`).
    `bun run gen:swift` converts the OKLCH tokens to sRGB and emits it from the same
    source of truth, so native apps inherit the exact palette (light/dark adaptive,
    five accent families). A Platforms/SwiftUI page documents the web→Swift mapping.
  - **Accessibility** — the palette is tuned to clear WCAG AA (4.5:1) for small text
    with no per-story exceptions: the light `--muted-foreground` role is a hair darker
    (`#63615a`); the house **`--mlz-cyan-deep`** (which backs `--accent-deep` and the
    wordmark period) is deepened to `oklch(0.48 0.10 200)` so it reads ~5.1:1 on paper;
    and the **destructive** signal is deepened in both themes (`oklch(0.53 0.22 18)`
    light / `oklch(0.55 0.21 20)` dark) so its light foreground clears ~4.8:1. `Alert`
    titles render in high-contrast ink with the signal carried by the rail and icon;
    `Progress` carries a default accessible name (`aria-label`) when none is supplied;
    `Prose` links use the deeper accent. Every story is checked against axe
    (WCAG 2.1 A/AA) in CI — unscoped.

- 3dcad2d: Add a motion foundation and decorative effects distilled from mlz.no:

  - **Motion tokens/utilities** — five signature animations as Tailwind `animate-*` utilities backed by `--animate-*` tokens (`rise`, `pulse-soft`, `blink`, `float`, `glitch`), mirrored in `tokens.ts` as `animations`. Includes a `data-motion="off"` kill-switch and a new Foundations/Motion Storybook page.
  - **`GlitchText`** — per-character cyberpunk RGB-split effect using the `--glitch-1`/`--glitch-2` tokens, with ambient and hover triggers and an accessible (visually-hidden) text copy.
  - **`GridBackground`** — the two-scale engineering/blueprint grid, static or revealed by a cursor-following spotlight with an accent glow.
  - **`FloatingMarks`** — drifting, deterministically-placed CSS sketch glyphs as a decorative background layer.
  - **`Button`** — new `sketch` variant (hand-drawn dashed outline that wobbles into an offset accent shadow on hover/focus), plus icons now tilt on hover/focus, matching the mlz.no contact-link interaction.
