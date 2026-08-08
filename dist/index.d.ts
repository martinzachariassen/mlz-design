import * as class_variance_authority_types from 'class-variance-authority/types';
import { VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { AccentName } from './tokens.js';
export { Breakpoint, FillMode, Tokens, accentFill, accents, animations, breakpoints, colors, fonts, motion, onDark, radius, signalFill, signals, signalsDeep, tokens } from './tokens.js';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import * as LabelPrimitive from '@radix-ui/react-label';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import * as SelectPrimitive from '@radix-ui/react-select';
import * as SliderPrimitive from '@radix-ui/react-slider';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { Command as Command$1 } from 'cmdk';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { ClassValue } from 'clsx';

declare const brandMarkVariants: (props?: ({
    variant?: "tile" | "glyph" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface BrandMarkProps extends Omit<React.SVGProps<SVGSVGElement>, "opacity">, VariantProps<typeof brandMarkVariants> {
    /** Rendered box in px (width = height). */
    size?: number;
    /** Tile fill (tile variant). Defaults to the theme's ink surface. */
    tile?: string;
    /** Letter colour. Defaults to the theme's paper surface (tile) / currentColor (glyph). */
    glyph?: string;
}
/**
 * The MLZ **mark** — the Block M on a tight ink tile, the icon half of the
 * identity (favicon, avatar, app icon, stamp). Pure SVG, so it stays crisp from a
 * 16px favicon up to a 1200px OG image.
 *
 * The mark is always monochrome — ink tile, paper letter, never the accent. It
 * reads from semantic tokens by default (`--foreground` tile, `--background`
 * letter), so it inverts with the theme for free. For a *static* asset (a favicon
 * file, an email) pass fixed brand colours via `tile` / `glyph` — see the
 * Brand → Favicon story for the export recipe.
 */
declare const BrandMark: React.ForwardRefExoticComponent<Omit<BrandMarkProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
interface BrandWordmarkProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
    /** Font size in px. */
    size?: number;
    /** Period colour override (static exports). Defaults to the `--brand-period` token. */
    period?: string;
}
/**
 * The MLZ **wordmark** — `mlz.` set in Space Mono Bold, lowercase, tracked
 * −0.03em, the type half of the identity (header, footer, signature, title). The
 * period is the one spot of colour in the whole system: it follows the active
 * accent family via `--brand-period` (accent-deep on light for AA on paper, the
 * base accent on dark) and is never omitted. Pass `period` to override it for a
 * static export. Minimum size 14px; below that, use the mark alone.
 */
declare const BrandWordmark: React.ForwardRefExoticComponent<BrandWordmarkProps & React.RefAttributes<HTMLSpanElement>>;
interface BrandLockupProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Kicker line under the wordmark. Shown only when set and the mark is ≥ 40px. */
    tagline?: string;
    /** Mark size in px; the wordmark scales with it (mark = 1.45 × wordmark). */
    size?: number;
    /** Lockup layout. */
    orientation?: "horizontal" | "stacked";
    /**
     * Extra props for the inner `BrandMark` — the escape hatch for what the
     * lockup's own API doesn't cover, such as animating or rotating the mark on
     * hover. `size` stays owned by the lockup, which derives both sizes from
     * `size`, so the fixed proportions cannot drift.
     */
    markProps?: Omit<BrandMarkProps, "size">;
    /** Extra props for the inner `BrandWordmark`. `size` is likewise derived. */
    wordmarkProps?: Omit<BrandWordmarkProps, "size">;
}
/**
 * The **lockup** — the mark paired with the wordmark, the signature MLZ pairing.
 * Proportions are fixed: mark height = 1.45 × wordmark size, gap = 0.5 × wordmark
 * size. `horizontal` (mark beside wordmark) is primary for headers and the OG
 * card; `stacked` (mark above a centred wordmark) suits square/avatar contexts.
 * The mono, wide-tracked `tagline` joins only at 40px+ marks (guideline minimum).
 */
declare const BrandLockup: React.ForwardRefExoticComponent<BrandLockupProps & React.RefAttributes<HTMLDivElement>>;

interface FloatingMarksProps extends React.HTMLAttributes<HTMLDivElement> {
    /** How many marks to scatter. */
    count?: number;
}
/**
 * The MLZ drifting "sketch marks": small CSS-drawn engineering glyphs (square,
 * filled square, plus, line, angle) that float slowly up-screen, fading in and
 * out. A decorative background layer — `aria-hidden`, click-through, and disabled
 * by `prefers-reduced-motion` / `data-motion="off"` via the `animate-float` token.
 *
 * Positions, drift, rotation, timing and opacity are derived deterministically
 * from each mark's index (no `Math.random`), so it's SSR-safe and stable across
 * renders. Render inside a `relative` container; it fills that box.
 */
declare const FloatingMarks: React.ForwardRefExoticComponent<FloatingMarksProps & React.RefAttributes<HTMLDivElement>>;

type GlitchTrigger = "ambient" | "hover";
interface GlitchTextProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
    /** The text to render and glitch. */
    text: string;
    /** What drives the effect. */
    trigger?: GlitchTrigger;
    /** Ambient burst cadence, `[minMs, maxMs]`. */
    interval?: readonly [number, number];
}
/**
 * The MLZ cyberpunk text effect: text is split per character and random chars
 * flicker with an RGB-split (using the `--glitch-1` / `--glitch-2` tokens). The
 * visual spans are hidden from assistive tech; the full string is exposed once via
 * a visually-hidden copy so screen readers read clean text. Honours
 * `prefers-reduced-motion` and the `data-motion="off"` kill-switch (the CSS
 * `animate-glitch` becomes a no-op).
 *
 * - `trigger="ambient"` (default): random 1–4 char bursts on a self-scheduling
 *   loop, paused when the tab is hidden — its resting state.
 * - `trigger="hover"`: a single burst each time the pointer enters.
 *
 * Styling lives on the wrapper — pass a `className` with the type family, size
 * and tracking you want.
 */
declare const GlitchText: React.ForwardRefExoticComponent<GlitchTextProps & React.RefAttributes<HTMLSpanElement>>;

interface GridBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Minor grid cell size in px (major grid is 5×). */
    cell?: number;
    /** Reveal the grid through a pointer-following spotlight instead of showing all. */
    interactive?: boolean;
    /** Pool accent light under the spotlight (only meaningful with `interactive`). */
    glow?: boolean;
    /** Spotlight diameter in px. */
    spotlight?: number;
}
/**
 * The MLZ "engineering notebook" grid: a two-scale ruled background (a fine
 * minor grid plus a 5× major grid) drawn purely from layered gradients — no image.
 * Colours are `color-mix`ed off `--foreground`, so it adapts to light/dark.
 *
 * - Static by default: a faint, always-on grid to sit behind content.
 * - `interactive`: the grid is revealed only through a soft disc that follows the
 *   pointer (the signature MLZ effect), optionally with an accent `glow`.
 *
 * Render it as the first child of a `relative` container; it fills that box.
 */
declare const GridBackground: React.ForwardRefExoticComponent<GridBackgroundProps & React.RefAttributes<HTMLDivElement>>;

interface ProjectCardProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
    /** The project name — the card's heading. */
    title: React.ReactNode;
    /** One or two sentences on the work. Clamped to three lines unless `featured`. */
    description?: React.ReactNode;
    /** Short tag chips (stack, role, category). */
    tags?: readonly string[];
    /** A mono eyebrow line — e.g. "2024 · Design system". */
    meta?: string;
    /** Makes the whole card one link, with the title anchor stretched over it. */
    href?: string;
    /** Cover visual. Defaults to the brand grid + monogram placeholder. */
    cover?: React.ReactNode;
    /** Horizontal, larger layout from `md` up. */
    featured?: boolean;
    /** Link label. */
    cta?: string;
}
/**
 * A portfolio project card — the mlz signature applied to work: a hairline surface
 * that lifts on hover with an offset accent shadow, a cover band, a grotesk title,
 * mono metadata and tag chips. Pass a `cover` (image, canvas, anything) or let it
 * fall back to the on-brand ruled-grid + monogram placeholder — no stock imagery.
 *
 * - **default** — vertical: cover on top, body below. Drops into a `Grid`.
 * - **featured** — horizontal from `md` up (cover beside the body) and larger,
 *   for the hero project at the top of a portfolio. Stacks on mobile.
 *
 * With `href`, the whole card becomes one link (the title anchor stretches over it).
 */
declare const ProjectCard: React.ForwardRefExoticComponent<ProjectCardProps & React.RefAttributes<HTMLElement>>;

interface RepoBannerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
    /** The project name — the headline, paired with the `mlz.` wordmark. */
    project: React.ReactNode;
    /** Small kicker above/around the name. */
    eyebrow?: string;
    /** One-line description under the name. */
    description?: React.ReactNode;
    /** Stack / tag chips (e.g. `["React", "Tailwind v4", "SwiftUI"]`). */
    badges?: string[];
    /** Install / run command, shown mono (prominent in `terminal`). */
    install?: string;
    /** Footer-right meta — a repo path or domain. */
    footer?: string;
    /** Pin to one accent family regardless of the ambient one. */
    accent?: AccentName;
    /** Layout preset. */
    layout?: "standard" | "minimal" | "terminal" | "split";
    /** Rendered width in px; height follows the 1280×340 ratio. */
    width?: number;
    /** Show the drifting sketch marks. */
    marks?: boolean;
}
/**
 * A repository README banner — the wide, short header image that tops every MLZ
 * project's `README.md`. Built entirely from tokens so every repo wears the same
 * face; only the copy (project name, description, stack, install) changes per
 * project. Locked to a **3.76:1** ratio (1280×340) that reads well at GitHub's
 * ~896px rendered README width; `width` scales the whole banner as one.
 *
 * Four layouts share the same engineering-notebook frame:
 * - `standard` — left-weighted lockup + statement + stack; the default.
 * - `minimal` — centred, symmetric; good for libraries and small repos.
 * - `terminal` — a mono command-prompt, the install line front and centre.
 * - `split` — an ink brand panel beside a paper content panel.
 *
 * Snapshot it (Satori / `@vercel/og`, or a 2× browser capture) to a PNG and drop
 * it at the top of the README. For light + dark, capture once plain and once
 * inside a `.dark` wrapper, then swap with a `<picture>` `prefers-color-scheme`.
 */
declare const RepoBanner: React.ForwardRefExoticComponent<RepoBannerProps & React.RefAttributes<HTMLDivElement>>;

interface SocialCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
    /** Headline — the one thing the card is about. */
    title: React.ReactNode;
    /** Mono kicker above the headline. */
    eyebrow?: string;
    /** Supporting line under the headline. */
    description?: React.ReactNode;
    /** Footer-left meta (domain, author…). */
    footer?: string;
    /** Mono kicker under the wordmark in the lockup (shown at the OG card's 40px+ mark). */
    tagline?: string;
    /** Small badge in the top-right (e.g. a section or tag). */
    tag?: string;
    /** Pin the card to one accent family regardless of the ambient one. */
    accent?: AccentName;
    /** Rendered width in px; height follows the 1200×630 ratio. */
    width?: number;
    /** Show the drifting sketch marks. */
    marks?: boolean;
}
/**
 * A ready-to-screenshot social / Open-Graph card at the canonical 1200×630, built
 * entirely from tokens so every app renders shares in the same voice. Compose it
 * in a route (or a Satori / `@vercel/og` template) and snapshot at 2× for retina.
 *
 * Layout: an engineering-notebook frame — hairline inset border, corner
 * registration marks, a faint ruled grid and drifting marks behind a left brand
 * lockup, a large grotesk headline, and a footer rule carrying the domain.
 *
 * `width` scales the whole card proportionally (height is locked to the 1.91:1
 * OG ratio) so it previews at any size without breaking the internal rhythm.
 */
declare const SocialCard: React.ForwardRefExoticComponent<SocialCardProps & React.RefAttributes<HTMLDivElement>>;

interface ThemeToggleProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Drop the text labels and show only the icons. */
    iconOnly?: boolean;
    /** Hide "System", leaving a straight light/dark choice. */
    hideSystem?: boolean;
}
/**
 * The light / dark / system switch, wired to `ThemeProvider` — so an app gets the
 * system's headline feature without rebuilding the control.
 *
 * **Must be rendered under a `<ThemeProvider>`**; it reads and writes the same
 * state as `useTheme()`. Pair the provider with `themeInitScript()` in `<head>`,
 * or the page paints in the wrong theme before React hydrates and this control
 * appears to jump.
 *
 * Keep **System**. It's the option most people want and the only one that
 * follows the OS at dusk; drop it with `hideSystem` only when the app genuinely
 * has no use for it. Note the button reflects the *chosen* theme, so with
 * "System" selected it stays on System rather than jumping to Light or Dark.
 *
 * ```tsx
 * <ThemeProvider>
 *   <ThemeToggle iconOnly />
 * </ThemeProvider>
 * ```
 */
declare const ThemeToggle: React.ForwardRefExoticComponent<ThemeToggleProps & React.RefAttributes<HTMLDivElement>>;
interface AccentPickerProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Limit the choices; defaults to all five families. */
    families?: readonly AccentName[];
}
/**
 * Swatches for the five accent families, wired to `ThemeProvider`.
 *
 * Each swatch is a real radio in a group, so the whole picker is one tab stop
 * and the arrow keys move between families. Colour alone never carries the
 * meaning — every swatch is named.
 *
 * Accent is a *preference*, not a setting that changes what anything does. If an
 * app only ever ships one accent, don't render this; set `data-accent` once on
 * `<html>` and be done.
 */
declare const AccentPicker: React.ForwardRefExoticComponent<AccentPickerProps & React.RefAttributes<HTMLDivElement>>;

declare const avatarVariants: (props?: ({
    size?: "default" | "sm" | "xs" | "lg" | "xl" | null | undefined;
    shape?: "square" | "circle" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const statusColor: {
    readonly online: "bg-success";
    readonly away: "bg-warning";
    readonly busy: "bg-destructive";
    readonly offline: "bg-[var(--muted-foreground)]";
};
interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof avatarVariants> {
    /** Presence dot on the lower-right edge. */
    status?: keyof typeof statusColor;
}
/**
 * Identity, the mlz way: initials first. The frame is a hairline-bordered chip
 * (circle or square); an image drops in when there is one and falls back to the
 * initials the moment it fails. Compose `<Avatar><AvatarImage/><AvatarFallback/>`;
 * add a `status` dot, or stack several in an `AvatarGroup`.
 *
 * The root is an un-clipped wrapper so the status dot can sit on the edge; the
 * inner `avatar-frame` does the rounding/clipping (and is what `AvatarGroup` rings).
 *
 * ```tsx
 * <Avatar size="lg" status="online">
 *   <AvatarImage src={user.avatar} alt={user.name} />
 *   <AvatarFallback>MZ</AvatarFallback>
 * </Avatar>
 * ```
 */
declare const Avatar: React.ForwardRefExoticComponent<AvatarProps & React.RefAttributes<HTMLSpanElement>>;
type AvatarImageProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>;
/**
 * The avatar's photo. It renders only once the image has actually loaded, so a
 * slow or broken `src` shows the `AvatarFallback` beside it instead — no
 * broken-image icon, no state to manage. Always pass an `alt`.
 */
declare const AvatarImage: React.ForwardRefExoticComponent<Omit<AvatarPrimitive.AvatarImageProps & React.RefAttributes<HTMLImageElement>, "ref"> & React.RefAttributes<HTMLImageElement>>;
declare const fallbackVariants: (props?: ({
    tone?: "default" | "accent" | "muted" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface AvatarFallbackProps extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>, VariantProps<typeof fallbackVariants> {
}
/**
 * What fills the frame while there's no loaded image — initials, in tracked-out
 * mono. `tone` picks the chip colour; use `accent` sparingly to mark "you". Pass
 * `delayMs` to hold it back briefly, so a fast-loading image doesn't flash the
 * initials first.
 */
declare const AvatarFallback: React.ForwardRefExoticComponent<AvatarFallbackProps & React.RefAttributes<HTMLSpanElement>>;
interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Show at most this many; the rest collapse into a `+N` chip. */
    max?: number;
    /** Size of the overflow chip (match the avatars you pass in). */
    size?: AvatarProps["size"];
}
/**
 * Overlapping avatars with a background ring between them. Pass `max` to cap how
 * many show; the remainder collapse into a `+N` chip.
 */
declare const AvatarGroup: React.ForwardRefExoticComponent<AvatarGroupProps & React.RefAttributes<HTMLDivElement>>;

declare const badgeVariants: (props?: ({
    variant?: "default" | "accent" | "outline" | "muted" | "destructive" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
    /** Render the single child instead of a `<span>` — e.g. a link for a tag chip. */
    asChild?: boolean;
}
/**
 * A small mono chip for status, versions and categories — the tracked-out
 * uppercase label that sits next to a title. It's a plain `<span>` with no
 * semantics of its own, so put the meaning in the text, not the colour alone.
 *
 * **Use a badge** for a stable attribute of the thing beside it — a category, a
 * version, a tag. **Reach for `StatusDot`** when the value is live and changes
 * (online/offline, build state), and for `Callout` or `Alert` when it's
 * something the reader has to act on. A badge is a label, not a notification.
 */
declare function Badge({ className, variant, asChild, ...props }: BadgeProps): React.JSX.Element;

type CodeProps = React.HTMLAttributes<HTMLElement>;
/**
 * Inline code — an identifier, a filename, a value, in running text.
 *
 * **Reach for `Kbd`** when it is a key the reader should press: `<kbd>` and
 * `<code>` mean different things, and a screen reader can distinguish them.
 *
 * Inside `Prose`, plain `<code>` elements are already styled by the descendant
 * rules there — this is for code outside long-form copy, where nothing else
 * would style it. Using it inside `Prose` is harmless: the classes are the same
 * shape and `tailwind-merge` keeps the later win.
 */
declare const Code: React.ForwardRefExoticComponent<CodeProps & React.RefAttributes<HTMLElement>>;
interface CodeBlockProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
    /** The code. A plain string — this component does not highlight or parse it. */
    children: string;
    /** Shown in the header bar. A filename, or a language, or a shell prompt. */
    filename?: React.ReactNode;
    /** Adds a copy button. Needs a secure context; falls back to doing nothing. */
    copyable?: boolean;
    /** Accessible name for the copy button. */
    copyLabel?: string;
}
/**
 * A block of code, with an optional filename header and copy button.
 *
 * **Deliberately unhighlighted.** Syntax highlighting means shipping a grammar
 * bundle and a colour scheme that has to be reconciled with the token layer in
 * both themes and five accents — a large dependency for decoration. The
 * engineering-notebook voice reads fine in one mono weight. If you need
 * highlighting in a consuming app, render your own `<pre>` inside this shell.
 *
 * The code is a `string`, not arbitrary children, so it can be handed to the
 * clipboard as-is. Wrapping is off and the block scrolls horizontally: a
 * mid-token line break in a shell command is worse than a scrollbar.
 *
 * ```tsx
 * <CodeBlock filename="app.css" copyable>{`@import "tailwindcss";`}</CodeBlock>
 * ```
 */
declare const CodeBlock: React.ForwardRefExoticComponent<CodeBlockProps & React.RefAttributes<HTMLDivElement>>;

/** How a `DataRow` lays out its term/description pair. */
type DataLayout = "justify" | "grid";
interface DataListProps extends React.HTMLAttributes<HTMLDListElement> {
    /**
     * How child rows lay out, cascaded to every `DataRow` (each row can still
     * override its own `layout`):
     * - `"justify"` (default) — term left, value right-aligned, dashed row rule.
     *   Best for compact fact pairs where the value is short-to-medium.
     * - `"grid"` — a fixed eyebrow label column + value, collapsing to a single
     *   column on narrow screens. Best for a scannable field list. Set the label
     *   column width with the `--mlz-data-label` CSS var (default `8rem`).
     */
    layout?: DataLayout;
}
/**
 * A definition list for key/value facts. Renders a real `<dl>`; each `DataRow`
 * is a `<div>` grouping a `<dt>`/`<dd>` pair (valid HTML5), so it's accessible
 * and copy-pastable.
 *
 * **Use it** for the facts *about one thing* — a spec panel, a metadata block, a
 * receipt. **Reach for `Table`** the moment you have the same fields across
 * several rows: a definition list has no column headers and no row semantics, so
 * it can't express a grid of data accessibly.
 *
 * ```tsx
 * <DataList>
 *   <DataRow label="Location">Oslo, Norway</DataRow>
 *   <DataRow label="IP" mono>203.0.113.7</DataRow>
 * </DataList>
 *
 * <DataList layout="grid">
 *   <DataRow label="User agent" mono>Mozilla/5.0 …</DataRow>
 * </DataList>
 * ```
 */
declare const DataList: React.ForwardRefExoticComponent<DataListProps & React.RefAttributes<HTMLDListElement>>;
interface DataRowProps extends React.HTMLAttributes<HTMLDivElement> {
    /** The row's key/term. */
    label: React.ReactNode;
    /** Render the value in the mono type family (for IPs, hashes, headers…). */
    mono?: boolean;
    /** Override the layout inherited from the parent `DataList`. */
    layout?: DataLayout;
}
/**
 * One `<dt>`/`<dd>` pair inside a `DataList` — the label on the left, the value
 * as children.
 *
 * Layout is inherited from the parent `DataList`; set `layout` here only to
 * break one row out of it, typically because the value is long enough that
 * `justify` would crush it against the label. Set `mono` for values the reader
 * may need to compare character by character — IPs, hashes, headers, IDs.
 *
 * ```tsx
 * <DataRow label="IP" mono>203.0.113.7</DataRow>
 * <DataRow label="User agent" mono layout="grid">Mozilla/5.0 …</DataRow>
 * ```
 */
declare const DataRow: React.ForwardRefExoticComponent<DataRowProps & React.RefAttributes<HTMLDivElement>>;

type KbdProps = React.HTMLAttributes<HTMLElement>;
/**
 * An inline keyboard key — a mono, hairline-bordered chip that sits in running
 * text: press <Kbd>⌘</Kbd><Kbd>K</Kbd> to search.
 *
 * **Use it for keys the reader is meant to press.** For a literal string they
 * should *type*, or for any other inline code, reach for a `<code>` element
 * inside `Prose` — `Kbd` renders a real `<kbd>`, and using it for non-keys tells
 * assistive tech the wrong thing.
 *
 * Write each key as its own `Kbd` rather than one chip holding a whole chord, so
 * the separator between them stays yours to style.
 *
 * ```tsx
 * <span className="flex items-center gap-1">
 *   <Kbd>⌘</Kbd>
 *   <Kbd>K</Kbd>
 * </span>
 * ```
 */
declare const Kbd: React.ForwardRefExoticComponent<KbdProps & React.RefAttributes<HTMLElement>>;

declare const linkVariants: (props?: ({
    variant?: "default" | "subtle" | "quiet" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement>, VariantProps<typeof linkVariants> {
    /** Hand off to a router's link component while keeping these styles. */
    asChild?: boolean;
    /** Opens in a new tab, with `rel="noopener noreferrer"` and a note for screen readers. */
    external?: boolean;
}
/**
 * A real anchor — navigation, with the system focus ring.
 *
 * **Reach for `Button variant="link"`** when activating it *does* something
 * rather than goes somewhere. That distinction is not cosmetic: a link is
 * middle-clickable, bookmarkable and reachable with Enter, a button responds to
 * Space and can't be opened in a new tab. Users notice when the two are swapped
 * even if they can't say why. If it changes a URL, it is a link.
 *
 * `external` adds `target="_blank"` with `rel="noopener noreferrer"` and an
 * "(opens in a new tab)" note for screen readers — opening a new tab without
 * warning is disorienting for anyone who can't see it happen.
 *
 * Inside `Prose`, ordinary `<a>` elements are already styled; use this for links
 * outside long-form copy.
 *
 * ```tsx
 * <Link href="/work">Selected work</Link>
 * <Link href="https://github.com/…" external variant="subtle">Source</Link>
 * <Link asChild><RouterLink to="/about">About</RouterLink></Link>
 * ```
 */
declare const Link: React.ForwardRefExoticComponent<LinkProps & React.RefAttributes<HTMLAnchorElement>>;

type ProseProps = React.HTMLAttributes<HTMLDivElement>;
/**
 * Long-form typography — the "blog with a lot of text" surface. Wrap raw article
 * markup (a CMS/MDX render, or plain elements) and every child is styled in the
 * mlz voice without per-element classes: a readable grotesk body, hand/grotesk
 * headings, accent links, a ruled blockquote, mono code. Measure is capped for
 * comfortable reading; pass `max-w-none` to fill a column you control.
 *
 * It's a descendant-styled container (the `@tailwindcss/typography` idea, done
 * with tokens), so it needs no plugin and re-themes with light/dark and accent.
 */
declare const Prose: React.ForwardRefExoticComponent<ProseProps & React.RefAttributes<HTMLDivElement>>;

declare const deltaVariants: (props?: ({
    direction?: "flat" | "up" | "down" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
/**
 * A single headline number with its label — the unit a metrics row is built
 * from. Deploys, coverage, uptime, revenue.
 *
 * The label comes first in the DOM and reads first to a screen reader, which is
 * the right order: "94%" means nothing until you know it is coverage. Visually
 * the number still dominates.
 *
 * **Use it for one measurement.** **Reach for `DataList`** when you have several
 * facts about *one* thing — a `<dl>` of key/value rows is the honest markup for
 * that, and stacking eight `Stat`s makes everything look equally important.
 * **Reach for `Progress`** when the number is a fraction of a known whole and
 * the bar is the point; the two compose well, with the bar under the number.
 *
 * ```tsx
 * <Stat>
 *   <StatLabel>Coverage</StatLabel>
 *   <StatValue>94%</StatValue>
 *   <StatDelta direction="up">+2.1 since last release</StatDelta>
 * </Stat>
 * ```
 */
declare const Stat: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
/** What is being measured, in the tracked-out mono eyebrow voice. */
declare const StatLabel: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;
/**
 * The number itself. `tabular-nums` is on, so a value that ticks live doesn't
 * make the row jitter as digit widths change.
 */
declare const StatValue: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;
interface StatDeltaProps extends React.HTMLAttributes<HTMLParagraphElement>, VariantProps<typeof deltaVariants> {
}
/**
 * The change since last time. **`direction` is about the number, not about
 * whether the news is good** — but the colours say good and bad, so for a metric
 * where falling is a win (error rate, latency, bundle size) pass the direction
 * that matches the *meaning*, and put the arrow in your own text.
 *
 * Never let the colour carry the message on its own: write the change out.
 */
declare const StatDelta: React.ForwardRefExoticComponent<StatDeltaProps & React.RefAttributes<HTMLParagraphElement>>;

declare const statusDotVariants: (props?: ({
    variant?: "accent" | "muted" | "destructive" | "success" | "warning" | "info" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface StatusDotProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof statusDotVariants> {
    /** Add a soft pulsing ring in the dot's colour to signal live/active state. */
    pulse?: boolean;
    /** Accessible label. When set, the dot is exposed to assistive tech. */
    label?: string;
}
/**
 * A small status dot — a filled circle that carries a semantic colour and, when
 * `pulse` is set, a soft breathing ring in the same colour (via `animate-ping`
 * on a matched overlay). The fill uses `bg-current` so the colour is set once by
 * the variant's `text-*` and the ring tracks it automatically.
 *
 * Decorative by default (`aria-hidden`) — colour alone never carries meaning, so
 * pair it with text. When the dot *is* the whole message, give it a `label` and
 * it becomes a named `role="img"`.
 *
 * ```tsx
 * <StatusDot variant="success" />
 * <StatusDot variant="destructive" pulse />
 * ```
 */
declare const StatusDot: React.ForwardRefExoticComponent<StatusDotProps & React.RefAttributes<HTMLSpanElement>>;

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
    /** Extra classes for the scroll container that wraps the table. */
    containerClassName?: string;
}
/**
 * A real `<table>` in the mlz voice: mono column headers in the eyebrow style,
 * hairline row rules, and a row tint on hover. It wraps itself in a horizontal
 * scroll container, so a wide table scrolls inside its own box instead of
 * pushing the page sideways.
 *
 * **Use a table when the same fields repeat across many rows** — that's what
 * column headers and row semantics are for, and it's how screen readers announce
 * "column X, row Y" while navigating. **Reach for `DataList`** when you're
 * showing the facts *about one thing*: a spec panel or a metadata block is a
 * definition list, not a one-row grid.
 *
 * Give it a `TableCaption` unless a heading right above it already names it — a
 * table with no accessible name is hard to place when tabbing through a page.
 * For long-form article content, `Prose` already styles raw `<table>` markup, so
 * don't nest this inside it.
 *
 * ```tsx
 * <Table>
 *   <TableCaption>Deploys this week</TableCaption>
 *   <TableHeader>
 *     <TableRow>
 *       <TableHead>Project</TableHead>
 *       <TableHead align="right">Duration</TableHead>
 *     </TableRow>
 *   </TableHeader>
 *   <TableBody>
 *     <TableRow>
 *       <TableCell>mlz-design</TableCell>
 *       <TableCell align="right">54s</TableCell>
 *     </TableRow>
 *   </TableBody>
 * </Table>
 * ```
 */
declare const Table: React.ForwardRefExoticComponent<TableProps & React.RefAttributes<HTMLTableElement>>;
/** The `<thead>`. Holds one `TableRow` of `TableHead` cells. */
declare const TableHeader: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableSectionElement> & React.RefAttributes<HTMLTableSectionElement>>;
/** The `<tbody>` — the data rows. */
declare const TableBody: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableSectionElement> & React.RefAttributes<HTMLTableSectionElement>>;
/** The `<tfoot>` — totals and summaries. Muted, with the top rule carrying the weight. */
declare const TableFooter: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableSectionElement> & React.RefAttributes<HTMLTableSectionElement>>;
/** One row. Tints on hover, and marks itself when `data-state="selected"`. */
declare const TableRow: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableRowElement> & React.RefAttributes<HTMLTableRowElement>>;
/**
 * A column header. Mono, uppercase and tracked out, matching the eyebrow voice
 * `Prose` already gives raw `<th>` markup. Pass `scope="row"` for a row header.
 */
declare const TableHead: React.ForwardRefExoticComponent<React.ThHTMLAttributes<HTMLTableCellElement> & React.RefAttributes<HTMLTableCellElement>>;
/** A data cell. */
declare const TableCell: React.ForwardRefExoticComponent<React.TdHTMLAttributes<HTMLTableCellElement> & React.RefAttributes<HTMLTableCellElement>>;
/**
 * The table's name, rendered under it. This is what makes the table findable —
 * prefer it over a bare paragraph above the table, which isn't associated.
 */
declare const TableCaption: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableCaptionElement> & React.RefAttributes<HTMLTableCaptionElement>>;

declare const textVariants: (props?: ({
    variant?: "body" | "muted" | "eyebrow" | "mono" | "lead" | null | undefined;
    size?: "base" | "sm" | "xs" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface TextProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof textVariants> {
    /** The element to render. Defaults to `<span>`. */
    as?: React.ElementType;
}
/**
 * Inline/text typography primitive — the small, everyday type roles that don't
 * warrant a full `Prose` block: mono values, muted asides, and the tracked-out
 * mono eyebrow used above sections. `variant` sets the whole look; `size`
 * optionally overrides just the font-size (tailwind-merge keeps the later win).
 *
 * Renders a `<span>` unless you point `as` at something else — reach for that
 * whenever the content is really a paragraph or a heading.
 *
 * ```tsx
 * <Text variant="eyebrow" as="div">Connection details</Text>
 * <Text variant="mono">203.0.113.7</Text>
 * <Text variant="lead">What sites can infer about your connection.</Text>
 * ```
 */
declare const Text: React.ForwardRefExoticComponent<TextProps & React.RefAttributes<HTMLElement>>;

declare const alertVariants: (props?: ({
    variant?: "default" | "destructive" | "success" | "warning" | "info" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface AlertProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {
}
/**
 * A signal panel: a subtle-tinted fill, a left accent rail and a colour-matched
 * title. Drop an svg as the first child and it slots into the icon column
 * (shadcn grid idiom); text flows in the second column.
 *
 * Compose it with `AlertTitle` + `AlertDescription`. It carries `role="alert"`,
 * so reserve it for things worth interrupting a screen-reader user for — for a
 * dense list of findings reach for `Callout` instead.
 *
 * ```tsx
 * <Alert variant="warning">
 *   <AlertTitle>Token drift</AlertTitle>
 *   <AlertDescription>tokens.ts no longer matches theme.css.</AlertDescription>
 * </Alert>
 * ```
 */
declare const Alert: React.ForwardRefExoticComponent<AlertProps & React.RefAttributes<HTMLDivElement>>;
/** The alert's headline — mono, uppercase, in the full-strength foreground. */
declare const AlertTitle: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;
/** The supporting sentence under the title, set in muted body type. */
declare const AlertDescription: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;

declare const calloutVariants: (props?: ({
    variant?: "accent" | "muted" | "destructive" | "success" | "warning" | "info" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface CalloutProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">, VariantProps<typeof calloutVariants> {
    /** The headline — the finding itself, in full-strength foreground. */
    title: React.ReactNode;
    /** Optional muted line under the title with the detail. */
    description?: React.ReactNode;
    /** Add a pulsing ring to the leading dot. */
    pulse?: boolean;
}
/**
 * A compact, dot-led inline note — lighter than `Alert`. A leading `StatusDot`
 * carries the severity colour, followed by a bold title and an optional muted
 * description. Ideal for dense lists of findings/checks where a full bordered
 * `Alert` panel per row would be too heavy.
 *
 * ```tsx
 * <Callout variant="success" title="No DNS leak detected" />
 * <Callout variant="warning" title="VPN likely" description="Hosting ASN in use." />
 * ```
 */
declare const Callout: React.ForwardRefExoticComponent<CalloutProps & React.RefAttributes<HTMLDivElement>>;

declare const emptyStateVariants: (props?: ({
    variant?: "dashed" | "outline" | "plain" | null | undefined;
    size?: "default" | "sm" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof emptyStateVariants> {
}
/**
 * What a list, table or panel shows when it has nothing in it.
 *
 * An empty state is not an error, and it is not decoration — it is the one
 * moment where you can tell someone what this thing is *for*. Say what would be
 * here, then give them the action that puts something here.
 *
 * **Use it for zero results and unstarted work.** **Reach for `Alert`** when
 * something went wrong — an empty state that says "Couldn't load" is a failure
 * wearing the wrong clothes, and it hides the retry. **Reach for `Skeleton`**
 * while data is still arriving: showing "No projects yet" during a fetch is a
 * lie that lasts just long enough to be believed.
 *
 * ```tsx
 * <EmptyState>
 *   <EmptyStateMedia>
 *     <BrandMark variant="glyph" size={28} className="text-accent-deep" />
 *   </EmptyStateMedia>
 *   <EmptyStateTitle>No projects yet</EmptyStateTitle>
 *   <EmptyStateDescription>
 *     Spin one up from a template, or import an existing repo.
 *   </EmptyStateDescription>
 *   <EmptyStateActions>
 *     <Button variant="solid">New project</Button>
 *     <Button>Import</Button>
 *   </EmptyStateActions>
 * </EmptyState>
 * ```
 */
declare const EmptyState: React.ForwardRefExoticComponent<EmptyStateProps & React.RefAttributes<HTMLDivElement>>;
/**
 * The tile that holds an icon or brand mark. Decorative by definition — whatever
 * goes inside should be `aria-hidden`, because the title already carries the
 * meaning.
 */
declare const EmptyStateMedia: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
interface EmptyStateTitleProps extends React.HTMLAttributes<HTMLParagraphElement> {
    /** Render as a real heading when the empty state owns a region of the page. */
    as?: "p" | "h2" | "h3" | "h4";
}
/**
 * The headline. Name what is missing, not the fact that something is.
 *
 * Renders a `<p>` by default, because an empty state is usually *inside* a
 * region that already has a heading. Set `as` when it owns the region itself —
 * a whole-page empty state should be an `h2`, not a paragraph in disguise.
 */
declare const EmptyStateTitle: React.ForwardRefExoticComponent<EmptyStateTitleProps & React.RefAttributes<HTMLParagraphElement>>;
/** One or two sentences: what would live here, and how it gets here. */
declare const EmptyStateDescription: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;
/** The action row. One primary way out, at most one secondary beside it. */
declare const EmptyStateActions: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;

declare const indicatorVariants: (props?: ({
    variant?: "default" | "accent" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface ProgressProps extends Omit<React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>, "value">, VariantProps<typeof indicatorVariants> {
    /** Completion as a percentage, clamped to 0–100. */
    value?: number;
}
/**
 * A determinate progress bar: a muted track with a fill that eases to its new
 * width over 500ms. `value` is a percentage and is clamped to 0–100, so a stray
 * `120` can't overflow the track. Built on the Radix primitive, so it renders as
 * a `role="progressbar"` with the ARIA value attributes wired up — pass
 * `aria-label` (or `aria-labelledby`) when you have a real label, otherwise it
 * falls back to a generic "Progress".
 */
declare const Progress: React.ForwardRefExoticComponent<ProgressProps & React.RefAttributes<HTMLDivElement>>;

/**
 * Placeholder shimmer for loading states. The `animate-pulse-soft` token is
 * already `prefers-reduced-motion` guarded, so motion needs no extra handling.
 *
 * Three components cover loading; pick by what you know:
 *
 * - **`Skeleton`** — you know the *shape* of what's coming. Mirror the real
 *   layout so nothing jumps when content lands. Best for first page loads.
 * - **`Spinner`** — you know neither shape nor duration. Best inside a button
 *   or a small region after a user action.
 * - **`Progress`** — you know how far along it is. Anything else is a spinner
 *   wearing a bar.
 *
 * **Don't** animate a skeleton for sub-200ms waits; the flash reads as a glitch.
 */
declare const Skeleton: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;

declare const spinnerVariants: (props?: ({
    size?: "default" | "sm" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof spinnerVariants> {
    /** Accessible name announced by screen readers. */
    label?: string;
}
/**
 * An indeterminate loading ring — a bordered circle with a transparent top
 * segment, spun with `animate-spin`. Inherits `currentColor` (accent by default)
 * so it recolours by dropping a `text-*` class on it, and stops spinning under
 * `prefers-reduced-motion`. It's a live `role="status"`; reach for `Progress`
 * instead when you know how far along the work is.
 */
declare const Spinner: React.ForwardRefExoticComponent<SpinnerProps & React.RefAttributes<HTMLDivElement>>;

declare const buttonVariants: (props?: ({
    variant?: "link" | "solid" | "default" | "accent" | "destructive" | "ghost" | "sketch" | null | undefined;
    size?: "default" | "icon" | "sm" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    /**
     * Render the single child instead of a `<button>`, passing the button's styling
     * and props down to it. Use it when the control has to be something else — most
     * often a link: `<Button asChild><a href="/work">Work</a></Button>`.
     */
    asChild?: boolean;
}
/**
 * The signature MLZ button: a technical ghost outline that lifts up and to the
 * left on hover, dropping an offset accent shadow behind it.
 *
 * **A button does something; a link goes somewhere.** If it navigates, render an
 * anchor — `<Button asChild><a href="…">…</a></Button>` keeps the styling while
 * giving the user a real link they can middle-click, copy and open in a new tab.
 * The `link` variant is the reverse case: an anchor that should *look* like text.
 *
 * At most one `accent` or `solid` button per view — the emphasis only reads if
 * it's scarce. Everything secondary is `default` or `ghost`, and `destructive`
 * is reserved for actions that lose data.
 */
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;

type CheckboxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">;
/**
 * A checkbox with a real `<input type="checkbox">` underneath — the box you see
 * is a `peer`-styled label, so keyboard focus, form submission and validation are
 * the platform's. Pass an `id` to pair it with a `Label`, or let it generate one.
 *
 * **Use a checkbox** when the change is *staged* — it takes effect on submit,
 * and several may be selected together. **Reach for `Switch`** when the change
 * applies the moment it's flipped, with no Save button. If the options are
 * mutually exclusive, neither is right — that's a radio group.
 */
declare const Checkbox: React.ForwardRefExoticComponent<CheckboxProps & React.RefAttributes<HTMLInputElement>>;

interface ComboboxOption {
    /** The value handed back to `onValueChange`. */
    value: string;
    /** What the reader sees and searches. */
    label: string;
    disabled?: boolean;
}
interface ComboboxProps {
    options: ComboboxOption[];
    /** Controlled value. Provide `onValueChange` alongside it. */
    value?: string;
    /** Initial value when uncontrolled. */
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    /** Shown on the trigger when nothing is chosen. */
    placeholder?: string;
    /** Placeholder inside the search field. */
    searchPlaceholder?: string;
    /** Shown when the search matches nothing. */
    emptyMessage?: React.ReactNode;
    disabled?: boolean;
    /** Extra classes for the trigger button. */
    className?: string;
    /** Extra classes for the dropdown panel. */
    contentClassName?: string;
    /** Names the control when there is no visible `FieldLabel`. */
    "aria-label"?: string;
}
/**
 * A `Select` you can type into — one value from a list long enough that
 * scrolling it is a hunt.
 *
 * **Reach for `Select` below roughly fifteen options.** A combobox costs a
 * keystroke and, worse, requires the reader to know what the thing is *called*;
 * a visible list only requires them to recognise it. **Reach for `Command`**
 * when the entries are actions rather than a value, and for `CommandDialog`
 * when it is the app-wide ⌘K palette.
 *
 * Inside a `Field` it picks up the generated id, `aria-describedby` and
 * `aria-invalid` automatically. Outside one, give it an `aria-label`.
 *
 * The list is filtered by `cmdk`: typing re-ranks by fuzzy score, arrows move
 * through visible items only, Enter selects, Esc closes and returns focus to
 * the trigger.
 *
 * ```tsx
 * <Field>
 *   <FieldLabel>Region</FieldLabel>
 *   <Combobox options={regions} placeholder="Pick a region" />
 * </Field>
 * ```
 */
declare const Combobox: React.ForwardRefExoticComponent<ComboboxProps & React.RefAttributes<HTMLButtonElement>>;

type LabelProps = React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>;
/**
 * A field label in the mlz eyebrow voice — mono, uppercase, wide-tracked. Wire it
 * to its control with `htmlFor`; when the control is a `peer`, the label dims
 * along with it as the field goes disabled.
 *
 * Built on the Radix label primitive, which stops a double-click on the label
 * from selecting its text — the browser default that makes rapid checkbox
 * toggling highlight everything instead.
 */
declare const Label: React.ForwardRefExoticComponent<Omit<LabelPrimitive.LabelProps & React.RefAttributes<HTMLLabelElement>, "ref"> & React.RefAttributes<HTMLLabelElement>>;

interface FieldContextValue {
    controlId: string;
    descriptionId: string;
    errorId: string;
    invalid: boolean;
    disabled: boolean;
    hasDescription: boolean;
    hasError: boolean;
    register: (part: "description" | "error", present: boolean) => void;
}
/**
 * Read the field a control is sitting in. Returns `null` outside a `Field`, so a
 * control can support both — this is what `useFieldControlProps` leans on.
 */
declare function useField(): FieldContextValue | null;
/**
 * The props a form control should spread to join its surrounding `Field`:
 * `id`, `aria-describedby`, `aria-invalid` and `disabled`, all derived.
 *
 * Returns an empty object outside a `Field`, so spreading it is always safe.
 *
 * ```tsx
 * function MyControl(props) {
 *   return <input {...useFieldControlProps()} {...props} />;
 * }
 * ```
 */
declare function useFieldControlProps(): React.AriaAttributes & {
    id?: string;
    disabled?: boolean;
};
interface FieldProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "id"> {
    /** Override the generated control id — only needed to match an id you already own. */
    id?: string;
    /** Marks the control invalid and switches `FieldError` on. */
    invalid?: boolean;
    /** Disables the label and, through `useFieldControlProps`, the control. */
    disabled?: boolean;
}
/**
 * A labelled form control with its description and error message, wired together.
 *
 * The wiring is the point. `Field` generates one id and hands it to the control
 * as `id`, to `FieldLabel` as `htmlFor`, and to `FieldDescription` /
 * `FieldError` as `aria-describedby` — and it only points at the parts that are
 * actually rendered, so a field without a description never advertises one. Set
 * `invalid` and the control gets `aria-invalid` while the error announces itself
 * through `role="alert"`.
 *
 * **Use it for every labelled control in a form.** Doing this by hand means
 * inventing an id, threading it through three components, and remembering to
 * update `aria-describedby` when a message appears — which is exactly the step
 * that gets skipped. **Reach for a bare `Label` + control** only when there is
 * nothing else to associate, and for a group of controls that share one label
 * (a `RadioGroup`, a set of checkboxes) use a `<fieldset>` with a `<legend>`:
 * `Field` labels *one* control.
 *
 * The control goes in as an ordinary child. Any component that spreads
 * `useFieldControlProps()` joins automatically; the ones in this library already
 * do.
 *
 * ```tsx
 * <Field invalid={!!error}>
 *   <FieldLabel>Email</FieldLabel>
 *   <Input type="email" />
 *   <FieldDescription>We only use this for deploy notifications.</FieldDescription>
 *   <FieldError>{error}</FieldError>
 * </Field>
 * ```
 */
declare const Field: React.ForwardRefExoticComponent<FieldProps & React.RefAttributes<HTMLDivElement>>;
type FieldLabelProps = React.ComponentPropsWithoutRef<typeof Label>;
/**
 * The field's label. Picks up `htmlFor` from the surrounding `Field`, so you
 * never write an id. Outside a `Field` it is an ordinary `Label`.
 */
declare const FieldLabel: React.ForwardRefExoticComponent<Omit<Omit<LabelPrimitive.LabelProps & React.RefAttributes<HTMLLabelElement>, "ref"> & React.RefAttributes<HTMLLabelElement>, "ref"> & React.RefAttributes<HTMLLabelElement>>;
/**
 * The quiet sentence under the control — what the field wants, or why it is
 * asked for. Registers itself so `aria-describedby` only points at it when it
 * is really on the page.
 */
declare const FieldDescription: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;
/**
 * The validation message. **Renders nothing when it has no children**, so you
 * can leave it in the tree and let the error state drive it.
 *
 * It carries `role="alert"`, so a message appearing after the user has moved on
 * is announced. Write what to do, not what failed: "Use your work address"
 * beats "Invalid email".
 */
declare const FieldError: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;
/**
 * A single-line text field. Mono type, a 1.5px `--input` border that turns to the
 * ring colour on focus with a soft `ring/30` halo. Takes every native `<input>`
 * attribute, so `type`, `required` and the rest behave exactly as you expect.
 *
 * Inside a `Field` it picks up its `id`, `aria-describedby`, `aria-invalid` and
 * `disabled` automatically; an explicit prop still wins. Outside one it is a
 * plain input.
 */
declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;

interface RadioGroupProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
}
/**
 * A set of mutually exclusive choices, all visible at once.
 *
 * **Use it for two to five options** where seeing them side by side helps the
 * reader decide — and where exactly one must be chosen. Past about six, the list
 * costs more space than it earns: switch to `Select`. If the choices aren't
 * exclusive, that's a `Checkbox` each; if it's a single on/off that applies
 * immediately, that's a `Switch`.
 *
 * There's no "none" state once a choice is made, so include an explicit "None"
 * or "Any" option if the reader must be able to back out.
 *
 * Radix owns the roving focus: Tab moves *into* the group, then the arrow keys
 * move between options — so the whole group is one tab stop, as the WAI-ARIA
 * pattern requires. Wrap it in a `<fieldset>` with a `<legend>`, or give it an
 * `aria-labelledby`, so the group itself is named.
 *
 * ```tsx
 * <RadioGroup defaultValue="cyan" onValueChange={setAccent}>
 *   <div className="flex items-center gap-2">
 *     <RadioGroupItem value="cyan" id="a-cyan" />
 *     <Label htmlFor="a-cyan">Cyan</Label>
 *   </div>
 * </RadioGroup>
 * ```
 */
declare const RadioGroup: React.ForwardRefExoticComponent<RadioGroupProps & React.RefAttributes<HTMLDivElement>>;
interface RadioGroupItemProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
}
/**
 * One choice. Give it an `id` and point a `Label`'s `htmlFor` at it — the dot
 * alone is a 16px target, and the label makes the whole phrase clickable.
 */
declare const RadioGroupItem: React.ForwardRefExoticComponent<RadioGroupItemProps & React.RefAttributes<HTMLButtonElement>>;

type SelectProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root>;
/**
 * A field for choosing **one value from many** — the form control, not a menu of
 * actions.
 *
 * Reach for it from about **six options upward**; below that a `RadioGroup`
 * shows every choice at once and costs one click instead of two. Above roughly
 * fifteen, a select becomes a scroll hunt — that wants a searchable combobox,
 * which this system doesn't ship yet. For *actions* rather than values, use
 * `DropdownMenu`.
 *
 * It renders a custom listbox rather than a native `<select>`, which buys
 * consistent styling and grouping but means it does **not** post a value with a
 * plain HTML form — pass `name` to get a hidden input, or read `onValueChange`.
 * Always give it a visible `Label`.
 *
 * ```tsx
 * <Select defaultValue="oslo" onValueChange={setCity}>
 *   <SelectTrigger><SelectValue placeholder="Pick a city" /></SelectTrigger>
 *   <SelectContent>
 *     <SelectItem value="oslo">Oslo</SelectItem>
 *     <SelectItem value="bergen">Bergen</SelectItem>
 *   </SelectContent>
 * </Select>
 * ```
 */
declare function Select(props: SelectProps): React.JSX.Element;
/** The chosen value, or the `placeholder` while nothing is chosen. */
declare const SelectValue: React.ForwardRefExoticComponent<SelectPrimitive.SelectValueProps & React.RefAttributes<HTMLSpanElement>>;
/** Groups related options. Pair with a `SelectLabel`. */
declare const SelectGroup: React.ForwardRefExoticComponent<SelectPrimitive.SelectGroupProps & React.RefAttributes<HTMLDivElement>>;
interface SelectTriggerProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> {
}
/** The closed field. Wears the same border, height and focus ring as `Input`. */
declare const SelectTrigger: React.ForwardRefExoticComponent<SelectTriggerProps & React.RefAttributes<HTMLButtonElement>>;
interface SelectContentProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> {
}
/**
 * The listbox. Defaults to `position="popper"` under the trigger and matches its
 * width, so the open list lines up with the closed field.
 */
declare const SelectContent: React.ForwardRefExoticComponent<SelectContentProps & React.RefAttributes<HTMLDivElement>>;
/** One option. `value` must be unique and non-empty within the select. */
declare const SelectItem: React.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectItemProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
/** A group heading in the mlz eyebrow voice. Not selectable. */
declare const SelectLabel: React.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectLabelProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
/** A hairline rule between groups of options. */
declare const SelectSeparator: React.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectSeparatorProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;

interface SliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
    /**
     * One accessible name per thumb, in order. **Required for a range** — two
     * thumbs both called "Price" are indistinguishable to a screen reader.
     *
     * A single-thumb slider can just use `aria-label` on the root; it is copied
     * down automatically, because the element carrying `role="slider"` is the
     * thumb, not the root, and a name on the root never reaches it.
     */
    thumbLabels?: string[];
}
/**
 * A value picked by dragging along a track — volume, opacity, a price ceiling.
 * Pass an array of two or more values for a range.
 *
 * **Use it when the approximate position matters more than the exact number**
 * and the reader wants to feel their way to an answer. **Reach for `Input
 * type="number"`** when they already know the value they want: a slider makes
 * "37" take ten seconds and a steady hand. Best of both is a slider with the
 * number shown beside it, which is what the stories do.
 *
 * Radix owns the keyboard pattern — arrows step by `step`, `PageUp`/`PageDown`
 * by ten steps, `Home`/`End` to the ends — and each thumb is its own tab stop
 * in a range.
 *
 * **Every thumb needs a name**, and this is the part that catches people out:
 * the element carrying `role="slider"` is the *thumb*, so an `aria-label` on
 * the root never reaches it. For one thumb, `aria-label` on the root is copied
 * down for you. For a range, pass `thumbLabels` — two thumbs both called
 * "Price" are indistinguishable to a screen reader.
 *
 * ```tsx
 * <Slider defaultValue={[40]} max={100} step={1} aria-label="Volume" />
 * <Slider defaultValue={[20, 80]} max={100} thumbLabels={["Minimum price", "Maximum price"]} />
 * ```
 */
declare const Slider: React.ForwardRefExoticComponent<SliderProps & React.RefAttributes<HTMLSpanElement>>;

type SwitchProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">;
/**
 * An on/off toggle for settings that apply immediately — no Save button. Like
 * `Checkbox` it's a real `<input type="checkbox">` styled through a `peer` label,
 * so it submits with the form and is reachable by keyboard for free.
 */
declare const Switch: React.ForwardRefExoticComponent<SwitchProps & React.RefAttributes<HTMLInputElement>>;

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;
/**
 * A multi-line text field — `Input`'s longer sibling, sharing its border, focus
 * ring and mono type. Starts at six lines' worth of height and resizes
 * vertically; set `rows` for a different starting height.
 *
 * Inside a `Field` it picks up its `id`, `aria-describedby`, `aria-invalid` and
 * `disabled` automatically; an explicit prop still wins.
 */
declare const Textarea: React.ForwardRefExoticComponent<TextareaProps & React.RefAttributes<HTMLTextAreaElement>>;

declare const toggleVariants: (props?: ({
    variant?: "default" | "outline" | null | undefined;
    size?: "default" | "icon" | "sm" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface ToggleProps extends React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root>, VariantProps<typeof toggleVariants> {
}
/**
 * A button that stays pressed — bold in an editor toolbar, "show archived" on a
 * list. It reports itself with `aria-pressed`, so screen readers announce the
 * state on the control itself.
 *
 * **Use it when the label describes a state the button turns on**, and the
 * change applies immediately. **Reach for `Checkbox`** when the value is part of
 * a form that gets submitted, and for `Switch` when it reads as a setting rather
 * than an action. A toggle whose label changes when pressed ("Show" → "Hide") is
 * a plain `Button`, not this — `aria-pressed` would then contradict the label.
 *
 * An icon-only toggle needs an `aria-label`.
 *
 * ```tsx
 * <Toggle aria-label="Bold" size="icon" pressed={bold} onPressedChange={setBold}>B</Toggle>
 * ```
 */
declare const Toggle: React.ForwardRefExoticComponent<ToggleProps & React.RefAttributes<HTMLButtonElement>>;

/**
 * A type alias, not `interface extends`: Radix's Root props are a discriminated
 * union on `type`, and an interface flattens that union so `children` and the
 * `type` discriminant both go missing.
 */
type ToggleGroupProps = React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> & VariantProps<typeof toggleVariants>;
/**
 * A row of toggles that belong together — a view switcher, a text-alignment
 * picker, a filter bar.
 *
 * `type="single"` behaves like a segmented control: exactly one item on at a
 * time. `type="multiple"` lets several be on at once. Radix owns the roving
 * focus, so the whole group is one tab stop and the arrow keys move within it.
 *
 * **Use it for view state that applies immediately.** **Reach for `RadioGroup`**
 * when it's a form field whose value gets submitted, and for `Tabs` when
 * choosing also swaps a panel of content — a toggle group changes how something
 * looks, tabs change what you're looking at.
 *
 * Set `variant` and `size` here rather than on each item.
 *
 * ```tsx
 * <ToggleGroup type="single" defaultValue="grid" aria-label="Layout">
 *   <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
 *   <ToggleGroupItem value="list">List</ToggleGroupItem>
 * </ToggleGroup>
 * ```
 */
declare const ToggleGroup: React.ForwardRefExoticComponent<ToggleGroupProps & React.RefAttributes<HTMLDivElement>>;
type ToggleGroupItemProps = React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> & VariantProps<typeof toggleVariants>;
/** One choice in a `ToggleGroup`. Inherits the group's `variant` and `size`. */
declare const ToggleGroupItem: React.ForwardRefExoticComponent<Omit<ToggleGroupPrimitive.ToggleGroupItemProps & React.RefAttributes<HTMLButtonElement>, "ref"> & VariantProps<(props?: ({
    variant?: "default" | "outline" | null | undefined;
    size?: "default" | "icon" | "sm" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string> & React.RefAttributes<HTMLButtonElement>>;

type SingleProps = Omit<React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root> & {
    type: "single";
}, "type"> & {
    /** `single` allows one open item at a time; `multiple` allows many. Defaults to `single`. */
    type?: "single";
};
type MultipleProps = Omit<React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root> & {
    type: "multiple";
}, "type"> & {
    /** `single` allows one open item at a time; `multiple` allows many. */
    type: "multiple";
};
type AccordionProps = SingleProps | MultipleProps;
/**
 * An accordion on the Radix primitive. The root owns the open set (controlled via
 * `value`/`onValueChange` or uncontrolled via `defaultValue`) and Radix handles the
 * WAI-ARIA keyboard pattern — Up/Down between triggers, Home/End to the ends, and
 * `orientation` awareness. `type="single"` opens one item at a time (add
 * `collapsible` to let it close again); `type="multiple"` opens many.
 *
 * Content animates open and closed with the `grid-template-rows: 0fr → 1fr`
 * technique, so height is fluid with no JS measuring and no fixed max-height.
 *
 * ```tsx
 * <Accordion type="single" collapsible>
 *   <AccordionItem value="a">
 *     <AccordionTrigger>Section A</AccordionTrigger>
 *     <AccordionContent>…</AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 * ```
 *
 * **Use an accordion** for independent sections a reader dips into — FAQs, long
 * forms broken into steps, dense reference material — especially when the labels
 * are full sentences or the content is long. **Reach for `Tabs`** instead when
 * the sections are alternative views of one subject and exactly one is relevant
 * at a time. **Don't** hide anything a reader needs in order to act: an
 * accordion is for progressive disclosure, not for tidying away required
 * information.
 */
declare const Accordion: React.ForwardRefExoticComponent<AccordionProps & React.RefAttributes<HTMLDivElement>>;
interface AccordionItemProps extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> {
    /** Identifies this item to the root. Unique within the `Accordion`. */
    value: string;
}
/**
 * One section of the accordion — a trigger plus its content, rule-separated from
 * the next. Its `value` is the identity the root opens and closes by, so it must
 * be unique within the accordion.
 */
declare const AccordionItem: React.ForwardRefExoticComponent<AccordionItemProps & React.RefAttributes<HTMLDivElement>>;
interface AccordionTriggerProps extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> {
    /** Hide the default rotating chevron indicator. */
    hideIndicator?: boolean;
}
/**
 * The clickable header of an `AccordionItem`. Renders a real `<button>` inside an
 * `<h3>` with `aria-expanded`/`aria-controls` wired up by Radix. Children are laid
 * out in a flex row, so a trigger can carry a number, a subtitle and a badge as
 * easily as a single line of text.
 */
declare const AccordionTrigger: React.ForwardRefExoticComponent<AccordionTriggerProps & React.RefAttributes<HTMLButtonElement>>;
/**
 * The panel an `AccordionTrigger` reveals, named by its trigger. It animates its
 * height via the `0fr → 1fr` grid-row trick, which needs the panel to stay
 * mounted — hence `forceMount`. `visibility` is transitioned alongside the grid
 * track so a closed panel leaves the accessibility tree and the tab order once
 * the collapse finishes, rather than lingering as reachable-but-invisible content.
 */
declare const AccordionContent: React.ForwardRefExoticComponent<Omit<AccordionPrimitive.AccordionContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;

/**
 * The trail back up from where you are — an article to its section to the index.
 *
 * It's a `<nav>` wrapping an ordered list, because the order *is* the meaning.
 * The last item is the current page: mark it with `BreadcrumbPage`, not a link
 * to itself.
 *
 * **Use it when the hierarchy is real and more than two levels deep.** A
 * two-level trail is a back link wearing a costume, and on a flat site a
 * breadcrumb invents a structure that doesn't exist. It's orientation, not
 * navigation — it tells someone where they are, so it shouldn't be the only way
 * to reach a section.
 *
 * ```tsx
 * <Breadcrumb>
 *   <BreadcrumbList>
 *     <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbItem><BreadcrumbPage>Colour</BreadcrumbPage></BreadcrumbItem>
 *   </BreadcrumbList>
 * </Breadcrumb>
 * ```
 */
declare const Breadcrumb: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>, "ref"> & {
    separator?: React.ReactNode;
} & React.RefAttributes<HTMLElement>>;
/** The `<ol>`. Wraps onto a second line rather than overflowing on narrow screens. */
declare const BreadcrumbList: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.OlHTMLAttributes<HTMLOListElement>, HTMLOListElement>, "ref"> & React.RefAttributes<HTMLOListElement>>;
/** One step in the trail. */
declare const BreadcrumbItem: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>, "ref"> & React.RefAttributes<HTMLLIElement>>;
interface BreadcrumbLinkProps extends React.ComponentPropsWithoutRef<"a"> {
    /** Render your router's link component instead of an `<a>`. */
    asChild?: boolean;
}
/** A link to an ancestor. Use `asChild` to hand off to a router link. */
declare const BreadcrumbLink: React.ForwardRefExoticComponent<BreadcrumbLinkProps & React.RefAttributes<HTMLAnchorElement>>;
/**
 * The page you're on. Not a link — `aria-current="page"` is what tells assistive
 * tech this is the destination, and linking a page to itself is a dead end.
 */
declare const BreadcrumbPage: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "ref"> & React.RefAttributes<HTMLSpanElement>>;
/**
 * The chevron between steps. Decorative — the list order already carries the
 * relationship, so it's hidden from assistive tech.
 */
declare function BreadcrumbSeparator({ children, className, ...props }: React.ComponentPropsWithoutRef<"li">): React.JSX.Element;
/**
 * A collapsed run of middle steps, for a deep trail on a narrow screen. Pair it
 * with a `DropdownMenu` if the hidden steps need to stay reachable.
 */
declare function BreadcrumbEllipsis({ className, ...props }: React.ComponentPropsWithoutRef<"span">): React.JSX.Element;

declare const cardVariants: (props?: ({
    variant?: "default" | "interactive" | "accent" | "ghost" | "elevated" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface CardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
    /**
     * Render the single child instead of a `<div>`. Handy for a whole-card link or
     * an `<article>`/`<section>` that should carry the card's surface styling.
     */
    asChild?: boolean;
}
/**
 * Paper-look surfaces: elevation is a hairline border, never a heavy drop shadow.
 * Composed the shadcn way — Card + Header/Title/Description/Action/Content/Footer,
 * each tagged with a `data-slot` so consumers can target parts.
 *
 * `variant` covers the common surfaces:
 *
 * - **default** — hairline border on card paper; the workhorse.
 * - **elevated** — adds the soft, warm-tinted shadow token (a hint, not a lift).
 * - **interactive** — the mlz signature: lifts on hover with an offset accent
 *   shadow. Use for whole-card links/buttons, with an inner `<a>` that stretches
 *   over the card via `after:absolute after:inset-0`.
 * - **accent** — an accent-subtle wash inside an accent-tinted border, for callouts.
 * - **ghost** — no border or background, for nesting inside another surface.
 */
declare const Card: React.ForwardRefExoticComponent<CardProps & React.RefAttributes<HTMLDivElement>>;
/**
 * The card's top block — title, description, and an optional `CardAction`. It's a
 * grid that grows a second column the moment a `CardAction` is present.
 */
declare const CardHeader: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
/**
 * The card's heading in tracked-out mono. It's an unopinionated `<div>` — wrap it
 * in (or render it as) the right heading level for the page's outline.
 */
declare const CardTitle: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
/** The muted supporting paragraph under `CardTitle`. */
declare const CardDescription: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;
/** Top-right slot in the header (menu button, badge, switch…). */
declare const CardAction: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
/** The card's body — padded to match the header, with the top padding removed. */
declare const CardContent: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
/** The bottom row, for actions. A flex row — set your own `gap`. */
declare const CardFooter: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;

type CollapsibleProps = React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Root>;
/**
 * One thing that opens and closes. A "show more", a nav section, an advanced
 * options block.
 *
 * **Reach for `Accordion`** the moment there are several of these that belong
 * together and should coordinate — Accordion adds the arrow-key pattern between
 * triggers and can enforce one-open-at-a-time. A row of independent
 * `Collapsible`s is an accordion with the keyboard support left out.
 *
 * **Reach for `Tabs`** when exactly one of the sections is relevant at a time
 * and they are alternative views of one subject.
 *
 * Radix wires `aria-expanded` on the trigger and `aria-controls` to the content,
 * and keeps the content out of the accessibility tree while closed.
 *
 * ```tsx
 * <Collapsible>
 *   <CollapsibleTrigger>Advanced options</CollapsibleTrigger>
 *   <CollapsibleContent>…</CollapsibleContent>
 * </Collapsible>
 * ```
 */
declare function Collapsible(props: CollapsibleProps): React.JSX.Element;
type CollapsibleTriggerProps = React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Trigger>;
/**
 * The control that opens it. Renders a `<button>`; use `asChild` to style your
 * own. Keep the label constant — the open state lives in `aria-expanded`, and a
 * label that flips between "Show" and "Hide" contradicts it.
 */
declare const CollapsibleTrigger: React.ForwardRefExoticComponent<Omit<CollapsiblePrimitive.CollapsibleTriggerProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
type CollapsibleContentProps = React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Content>;
/**
 * The part that opens. Animates with the `grid-template-rows: 0fr → 1fr`
 * technique, the same as `Accordion` — height stays fluid with no JS measuring
 * and no fixed `max-height` to outgrow.
 */
declare const CollapsibleContent: React.ForwardRefExoticComponent<Omit<CollapsiblePrimitive.CollapsibleContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;

declare const containerVariants: (props?: ({
    size?: "sm" | "lg" | "xl" | "prose" | "md" | "full" | null | undefined;
    gutter?: "none" | "sm" | "lg" | "md" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface ContainerProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof containerVariants> {
}
/**
 * The page frame — a centred, max-width column with responsive side gutters.
 *
 * One of three layout primitives (with `Stack` and `Grid`) that form the
 * structural spine for responsive, mobile-first UIs. They carry no brand paint —
 * no colour, no border — and only lay things out on the token breakpoint ladder,
 * so pages read the same from a 360px phone to a wide desktop. Compose the
 * painted components (Card, Button…) inside them.
 */
declare const Container: React.ForwardRefExoticComponent<ContainerProps & React.RefAttributes<HTMLDivElement>>;
declare const stackVariants: (props?: ({
    direction?: "row" | "col" | "responsive" | null | undefined;
    gap?: "none" | "sm" | "xs" | "lg" | "xl" | "md" | null | undefined;
    align?: "end" | "baseline" | "start" | "stretch" | "center" | null | undefined;
    justify?: "end" | "start" | "center" | "between" | "around" | null | undefined;
    wrap?: boolean | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface StackProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof stackVariants> {
}
/**
 * A flex row or column with a token gap. `direction="responsive"` is the common
 * card→row flip: a column on mobile, a row from `sm` up.
 */
declare const Stack: React.ForwardRefExoticComponent<StackProps & React.RefAttributes<HTMLDivElement>>;
/** Fixed column counts that step up with viewport width (mobile-first). */
declare const colsMap: {
    readonly 1: "grid-cols-1";
    readonly 2: "grid-cols-1 sm:grid-cols-2";
    readonly 3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
    readonly 4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
    readonly 5: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5";
    readonly 6: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6";
};
declare const gapMap: {
    readonly none: "gap-0";
    readonly xs: "gap-1.5";
    readonly sm: "gap-2.5";
    readonly md: "gap-4";
    readonly lg: "gap-6";
    readonly xl: "gap-10";
};
interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Auto-fitting mode: the minimum track width (e.g. `"16rem"`, `240`). Columns
     * fill in automatically as the container grows — responsive with no breakpoints.
     * Wins over `cols` when both are set.
     */
    min?: string | number;
    /** Fixed responsive column count (1–6) that steps up at `sm`/`lg`. */
    cols?: keyof typeof colsMap;
    /** Gutter between cells, from the spacing token ladder. */
    gap?: keyof typeof gapMap;
}
/**
 * A responsive grid, in two modes. Pass `min` for an auto-fitting track that
 * reflows with the container and needs no breakpoints at all — the better default
 * for card lists. Pass `cols` when the column count itself is the design, and it
 * steps up at `sm`/`lg`. `min` wins if you set both.
 */
declare const Grid: React.ForwardRefExoticComponent<GridProps & React.RefAttributes<HTMLDivElement>>;

declare const pageVariants: (props?: ({
    active?: boolean | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
/**
 * Page-by-page navigation for a long list — a blog index, search results.
 *
 * It's a `<nav>` around a list of links, so each page is a real URL someone can
 * bookmark, share and open in a new tab. That's the whole reason to prefer it
 * over "load more": infinite scroll has no address for page 4, and no end.
 *
 * **Use it when the reader might want to come back to a position, or when the
 * total matters.** For a feed nobody returns to, "load more" is friendlier. For
 * a handful of items, don't paginate at all.
 *
 * Wire the arrows to real URLs too, and drop `href` on `PaginationPrevious` /
 * `PaginationNext` at the ends rather than rendering a dead link.
 *
 * ```tsx
 * <Pagination>
 *   <PaginationContent>
 *     <PaginationItem><PaginationPrevious href="/blog?page=1" /></PaginationItem>
 *     <PaginationItem><PaginationLink href="/blog?page=1">1</PaginationLink></PaginationItem>
 *     <PaginationItem><PaginationLink href="/blog?page=2" isActive>2</PaginationLink></PaginationItem>
 *     <PaginationItem><PaginationNext href="/blog?page=3" /></PaginationItem>
 *   </PaginationContent>
 * </Pagination>
 * ```
 */
declare function Pagination({ className, ...props }: React.ComponentPropsWithoutRef<"nav">): React.JSX.Element;
/** The list of pages. */
declare const PaginationContent: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>, "ref"> & React.RefAttributes<HTMLUListElement>>;
/** One slot in the list — a page link, an arrow, or an ellipsis. */
declare const PaginationItem: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>, "ref"> & React.RefAttributes<HTMLLIElement>>;
interface PaginationLinkProps extends React.ComponentPropsWithoutRef<"a">, VariantProps<typeof pageVariants> {
    /** Marks the page you're on — sets `aria-current="page"`. */
    isActive?: boolean;
    /** Render your router's link component instead of an `<a>`. */
    asChild?: boolean;
}
/** A numbered page link. */
declare const PaginationLink: React.ForwardRefExoticComponent<PaginationLinkProps & React.RefAttributes<HTMLAnchorElement>>;
/**
 * The back arrow. Omit `href` on the first page — a link that goes nowhere is
 * worse than no link.
 */
declare function PaginationPrevious({ className, children, ...props }: PaginationLinkProps): React.JSX.Element;
/** The forward arrow. Omit `href` on the last page. */
declare function PaginationNext({ className, children, ...props }: PaginationLinkProps): React.JSX.Element;
/** A gap in the page run. Decorative, but keeps a name for screen readers. */
declare function PaginationEllipsis({ className, ...props }: React.ComponentPropsWithoutRef<"span">): React.JSX.Element;

interface ScrollAreaProps extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> {
    /** Which axis gets a scrollbar. `vertical` by default. */
    orientation?: "vertical" | "horizontal" | "both";
    /** Classes for the scrolling viewport rather than the outer box. */
    viewportClassName?: string;
}
/**
 * A scrolling box with a scrollbar that matches the system instead of the OS.
 *
 * **This is the one Radix primitive here that overlaps something the browser
 * already does**, so the reasoning matters. It does not replace scrolling —
 * the viewport underneath is ordinary `overflow: auto`, so wheel, trackpad,
 * touch, keyboard, scroll-anchoring and find-in-page all behave natively. What
 * it replaces is the *scrollbar's appearance*, which otherwise ranges from a
 * heavy grey slab on Windows to nothing at all on macOS until you scroll.
 *
 * **So use it only where the scrollbar itself is part of the design** — a
 * bounded panel, a command list, a sidebar — and where its absence would leave
 * a reader unaware there is more. **Don't wrap the page in one**: the browser's
 * own scrollbar carries position and length information the OS expects to
 * provide, and taking it over on the document breaks scroll-restoration and
 * overscroll behaviour.
 *
 * ```tsx
 * <ScrollArea className="h-64 rounded-[var(--radius-md)] border border-border">
 *   <div className="p-4">…</div>
 * </ScrollArea>
 * ```
 */
declare const ScrollArea: React.ForwardRefExoticComponent<ScrollAreaProps & React.RefAttributes<HTMLDivElement>>;
type ScrollBarProps = React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>;
/**
 * The bar itself. `ScrollArea` renders these for you from `orientation`; reach
 * for it directly only when you need a differently styled bar on one axis.
 */
declare const ScrollBar: React.ForwardRefExoticComponent<Omit<ScrollAreaPrimitive.ScrollAreaScrollbarProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;

interface SeparatorProps extends React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> {
    /** Horizontal fills its container's width; vertical fills its height (give the parent one). */
    orientation?: "horizontal" | "vertical";
    /** `true` (default) hides the rule from assistive tech. Set `false` when it genuinely divides sections. */
    decorative?: boolean;
    /** Optional mono label that splits a horizontal rule down the middle. */
    label?: React.ReactNode;
}
/**
 * A hairline rule on the Radix primitive. Purely decorative by default; pass
 * `decorative={false}` for a real `role="separator"` with the right
 * `aria-orientation`. A horizontal rule can carry a centered mono label that
 * splits the line.
 */
declare const Separator: React.ForwardRefExoticComponent<SeparatorProps & React.RefAttributes<HTMLDivElement>>;

interface TabsProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {
}
/**
 * Tabs on the Radix primitive: the root owns the active value (controlled via
 * `value`/`onValueChange` or uncontrolled via `defaultValue`) and Radix handles
 * the full WAI-ARIA keyboard pattern — roving tab order, arrow keys, Home/End,
 * and `orientation`-aware navigation.
 *
 * ```tsx
 * <Tabs defaultValue="overview">
 *   <TabsList>
 *     <TabsTrigger value="overview">Overview</TabsTrigger>
 *     <TabsTrigger value="activity">Activity</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="overview">…</TabsContent>
 *   <TabsContent value="activity">…</TabsContent>
 * </Tabs>
 * ```
 *
 * **Use tabs** for alternative views of the *same* subject, where exactly one is
 * relevant at a time and the labels are short enough to sit on one line —
 * Overview / Activity / Settings. **Reach for `Accordion`** instead when the
 * sections are independent, when a reader might want several open at once, or
 * when the labels are full sentences: tabs collapse badly on narrow screens,
 * accordions don't. Inactive panels unmount, so don't put unsaved form state in
 * one without lifting it to the parent.
 */
declare const Tabs: React.ForwardRefExoticComponent<TabsProps & React.RefAttributes<HTMLDivElement>>;
/** The `role="tablist"` rail the triggers sit on, ruled off from the panel beside it. */
declare const TabsList: React.ForwardRefExoticComponent<Omit<TabsPrimitive.TabsListProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
interface TabsTriggerProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
    /** Identifies this tab and the `TabsContent` it reveals. Unique within the `Tabs`. */
    value: string;
}
/**
 * One tab. Its `value` selects the matching `TabsContent`. Only the selected tab
 * is in the tab order — arrow keys and Home/End move between the rest, following
 * the list's `orientation` — and the active one is marked by an accent rule.
 */
declare const TabsTrigger: React.ForwardRefExoticComponent<TabsTriggerProps & React.RefAttributes<HTMLButtonElement>>;
interface TabsContentProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> {
    /** The `TabsTrigger` value this panel belongs to. */
    value: string;
}
/**
 * The panel for one tab. Inactive panels unmount rather than hide, so keep any
 * state you need to survive a tab switch in the parent.
 */
declare const TabsContent: React.ForwardRefExoticComponent<TabsContentProps & React.RefAttributes<HTMLDivElement>>;

interface AlertDialogProps {
    /** Whether the dialog is showing. Pass it to control the dialog yourself. */
    open?: boolean;
    /** Initial open state when uncontrolled. Ignored if `open` is provided. */
    defaultOpen?: boolean;
    /** Called with `false` on Esc or an `AlertDialogCancel`. Never on a backdrop click. */
    onOpenChange?: (open: boolean) => void;
    /** Usually a single `AlertDialogContent`. Only mounted while open. */
    children: React.ReactNode;
}
/**
 * A confirmation before something irreversible — deleting a project, revoking a
 * key, discarding unsaved work.
 *
 * The same native `<dialog>` engine as `Dialog` and `Sheet`, so focus-trapping,
 * Esc, background inerting and the top layer come from the platform. Three
 * things are deliberately different, and all three exist because the answer
 * matters:
 *
 * - `role="alertdialog"`, so assistive tech announces it as a decision to make
 *   rather than as an ordinary panel, and reads the description on open.
 * - **The backdrop does not dismiss.** A stray click must not be able to answer
 *   a question about deleting something.
 * - **No ✕ button.** There are exactly two ways out, and both are in the
 *   footer, so neither can be taken by accident.
 *
 * Esc still cancels — that is the platform's, it is unambiguous, and removing
 * it would trap someone who opened the dialog by mistake.
 *
 * **Use it only when the action can't be undone.** **Reach for `Dialog`** for a
 * short form or anything reversible: if every delete raises a confirm, people
 * stop reading them, and the one that mattered gets dismissed with the rest.
 * The better answer is often no dialog at all — do it, and offer an undo.
 *
 * `AlertDialogDescription` is not optional here the way it is on `Dialog`. Say
 * what will be destroyed, by name.
 *
 * ```tsx
 * <AlertDialog open={open} onOpenChange={setOpen}>
 *   <AlertDialogContent>
 *     <AlertDialogHeader>
 *       <AlertDialogTitle>Delete aurora</AlertDialogTitle>
 *       <AlertDialogDescription>
 *         This removes the project and its deploy history. It can't be undone.
 *       </AlertDialogDescription>
 *     </AlertDialogHeader>
 *     <AlertDialogFooter>
 *       <AlertDialogCancel asChild><Button variant="ghost">Cancel</Button></AlertDialogCancel>
 *       <AlertDialogAction asChild>
 *         <Button variant="destructive" onClick={remove}>Delete</Button>
 *       </AlertDialogAction>
 *     </AlertDialogFooter>
 *   </AlertDialogContent>
 * </AlertDialog>
 * ```
 */
declare function AlertDialog({ open, defaultOpen, onOpenChange, children, }: AlertDialogProps): React.JSX.Element;
/** The card surface. Narrower than `DialogContent` — a confirm is two sentences. */
declare const AlertDialogContent: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
/** Title + description block. No close button to clear, so no right inset. */
declare const AlertDialogHeader: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
/** Names the dialog. Say what is about to happen, and to what. */
declare const AlertDialogTitle: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLHeadingElement> & React.RefAttributes<HTMLHeadingElement>>;
/**
 * The consequence, spelled out. `role="alertdialog"` means this is read on
 * open, so it is the sentence that does the work — name the thing being
 * destroyed and say that it can't be undone.
 */
declare const AlertDialogDescription: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;
/**
 * The action row. Write cancel first in the source: it reverses to a full-width
 * column on mobile so the confirm lands on top, then flows right-aligned from
 * `sm` up.
 */
declare const AlertDialogFooter: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
interface AlertDialogActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Render the single child instead of a `<button>`, forwarding the close handler. */
    asChild?: boolean;
}
/**
 * The way out that does nothing. **Receives focus when the dialog opens**, so
 * Enter on a dialog someone hasn't read yet is safe.
 */
declare const AlertDialogCancel: React.ForwardRefExoticComponent<AlertDialogActionProps & React.RefAttributes<HTMLButtonElement>>;
/**
 * The confirm. Closes the dialog after your `onClick` runs — call
 * `event.preventDefault()` in the handler to keep it open (a failed request
 * that wants to show an error, say).
 */
declare const AlertDialogAction: React.ForwardRefExoticComponent<AlertDialogActionProps & React.RefAttributes<HTMLButtonElement>>;

type CommandProps = React.ComponentPropsWithoutRef<typeof Command$1>;
/**
 * A filterable list of commands — the ⌘K palette, and the engine behind
 * `Combobox`.
 *
 * `cmdk` owns the behaviour: typing filters and re-ranks by fuzzy score, the
 * arrow keys move through *visible* items only, Enter runs the highlighted one,
 * and the whole thing is a `role="listbox"` with the input as its
 * `combobox`. Selection follows the highlight, so there is no separate
 * "confirm" step.
 *
 * **Use it when the list is long enough that scanning beats scrolling** —
 * roughly fifteen options upward, or any list the reader knows the name of but
 * not the position. **Reach for `Select`** below that: a combobox costs a
 * keystroke and a mental "what is this called?" that a visible list doesn't.
 * **Reach for `DropdownMenu`** when the entries are a handful of actions.
 *
 * This is the raw list. `CommandDialog` puts it in a modal for a ⌘K palette;
 * `Combobox` puts it in a popover for a form field.
 *
 * ```tsx
 * <Command>
 *   <CommandInput placeholder="Search…" />
 *   <CommandList>
 *     <CommandEmpty>No results.</CommandEmpty>
 *     <CommandGroup heading="Projects">
 *       <CommandItem onSelect={open}>aurora</CommandItem>
 *     </CommandGroup>
 *   </CommandList>
 * </Command>
 * ```
 */
declare const Command: React.ForwardRefExoticComponent<Omit<{
    children?: React.ReactNode;
} & Pick<Pick<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof React.HTMLAttributes<HTMLDivElement>> & {
    ref?: React.Ref<HTMLDivElement>;
} & {
    asChild?: boolean;
}, "key" | "asChild" | keyof React.HTMLAttributes<HTMLDivElement>> & {
    label?: string;
    shouldFilter?: boolean;
    filter?: (value: string, search: string, keywords?: string[]) => number;
    defaultValue?: string;
    value?: string;
    onValueChange?: (value: string) => void;
    loop?: boolean;
    disablePointerSelection?: boolean;
    vimBindings?: boolean;
} & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
type CommandInputProps = React.ComponentPropsWithoutRef<typeof Command$1.Input>;
/**
 * The search field. It is the `combobox` the list is attached to, so it should
 * be the only focusable thing above the list — anything else here steals the
 * arrow keys.
 */
declare const CommandInput: React.ForwardRefExoticComponent<Omit<Omit<Pick<Pick<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "key" | keyof React.InputHTMLAttributes<HTMLInputElement>> & {
    ref?: React.Ref<HTMLInputElement>;
} & {
    asChild?: boolean;
}, "key" | "asChild" | keyof React.InputHTMLAttributes<HTMLInputElement>>, "type" | "onChange" | "value"> & {
    value?: string;
    onValueChange?: (search: string) => void;
} & React.RefAttributes<HTMLInputElement>, "ref"> & React.RefAttributes<HTMLInputElement>>;
type CommandListProps = React.ComponentPropsWithoutRef<typeof Command$1.List>;
/**
 * The scrolling results. Capped so a long list can't push the palette past the
 * fold; `cmdk` keeps the highlighted item scrolled into view.
 */
declare const CommandList: React.ForwardRefExoticComponent<Omit<{
    children?: React.ReactNode;
} & Pick<Pick<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof React.HTMLAttributes<HTMLDivElement>> & {
    ref?: React.Ref<HTMLDivElement>;
} & {
    asChild?: boolean;
}, "key" | "asChild" | keyof React.HTMLAttributes<HTMLDivElement>> & {
    label?: string;
} & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
type CommandEmptyProps = React.ComponentPropsWithoutRef<typeof Command$1.Empty>;
/**
 * Shown when nothing matches. **Not optional** — an empty palette with no
 * message reads as broken. Say what was searched for if you can.
 */
declare const CommandEmpty: React.ForwardRefExoticComponent<Omit<{
    children?: React.ReactNode;
} & Pick<Pick<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof React.HTMLAttributes<HTMLDivElement>> & {
    ref?: React.Ref<HTMLDivElement>;
} & {
    asChild?: boolean;
}, "key" | "asChild" | keyof React.HTMLAttributes<HTMLDivElement>> & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
type CommandGroupProps = React.ComponentPropsWithoutRef<typeof Command$1.Group>;
/**
 * A labelled section. Groups hide themselves when everything inside is filtered
 * out, so the heading never survives its own contents.
 */
declare const CommandGroup: React.ForwardRefExoticComponent<Omit<{
    children?: React.ReactNode;
} & Omit<Pick<Pick<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof React.HTMLAttributes<HTMLDivElement>> & {
    ref?: React.Ref<HTMLDivElement>;
} & {
    asChild?: boolean;
}, "key" | "asChild" | keyof React.HTMLAttributes<HTMLDivElement>>, "heading" | "value"> & {
    heading?: React.ReactNode;
    value?: string;
    forceMount?: boolean;
} & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
type CommandItemProps = React.ComponentPropsWithoutRef<typeof Command$1.Item>;
/**
 * One command. `onSelect` fires on Enter and on click alike.
 *
 * Give it a `value` when the visible label isn't what you want searched — the
 * filter matches on `value`, falling back to the text content.
 */
declare const CommandItem: React.ForwardRefExoticComponent<Omit<{
    children?: React.ReactNode;
} & Omit<Pick<Pick<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof React.HTMLAttributes<HTMLDivElement>> & {
    ref?: React.Ref<HTMLDivElement>;
} & {
    asChild?: boolean;
}, "key" | "asChild" | keyof React.HTMLAttributes<HTMLDivElement>>, "onSelect" | "disabled" | "value"> & {
    disabled?: boolean;
    onSelect?: (value: string) => void;
    value?: string;
    keywords?: string[];
    forceMount?: boolean;
} & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
type CommandSeparatorProps = React.ComponentPropsWithoutRef<typeof Command$1.Separator>;
/**
 * A hairline between groups.
 *
 * Presentational on purpose. cmdk gives it `role="separator"`, but a `listbox`
 * owns only `option` and `group` — a separator among its children breaks the
 * required-children contract (axe: `aria-required-children`, critical). Nothing
 * is lost: the group headings already carry the structure a screen reader needs,
 * and this line only draws it.
 */
declare const CommandSeparator: React.ForwardRefExoticComponent<Omit<Pick<Pick<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof React.HTMLAttributes<HTMLDivElement>> & {
    ref?: React.Ref<HTMLDivElement>;
} & {
    asChild?: boolean;
}, "key" | "asChild" | keyof React.HTMLAttributes<HTMLDivElement>> & {
    alwaysRender?: boolean;
} & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
/**
 * The shortcut hint at the right of an item. Decorative — the keystroke has to
 * be bound somewhere real, and this only says so.
 */
declare const CommandShortcut: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLSpanElement> & React.RefAttributes<HTMLSpanElement>>;
interface CommandDialogProps extends CommandProps {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    /** Names the dialog for assistive tech. Required — the palette has no visible title. */
    label: string;
}
/**
 * The ⌘K palette: a `Command` in a modal.
 *
 * **Built on this system's native `<dialog>`, not on cmdk's own `Command.Dialog`.**
 * That one wraps Radix Dialog, which would mean two modal implementations in one
 * package with different focus-trap and top-layer behaviour. This shares the
 * engine `Dialog`, `Sheet` and `AlertDialog` already use, so Esc, focus
 * trapping and inerting behave identically everywhere.
 *
 * Binding the shortcut is yours — the palette shouldn't grab a global key
 * listener on your behalf. The stories show the four lines it takes.
 *
 * ```tsx
 * <CommandDialog open={open} onOpenChange={setOpen} label="Command palette">
 *   <CommandInput placeholder="Type a command…" />
 *   <CommandList>…</CommandList>
 * </CommandDialog>
 * ```
 */
declare function CommandDialog({ open, defaultOpen, onOpenChange, label, className, children, ...props }: CommandDialogProps): React.JSX.Element;

interface DialogProps {
    /** Whether the dialog is showing. Pass it to control the dialog yourself. */
    open?: boolean;
    /** Initial open state when uncontrolled. Ignored if `open` is provided. */
    defaultOpen?: boolean;
    /** Called with `false` on Esc, the ✕ button, a `DialogClose`, or a backdrop click. */
    onOpenChange?: (open: boolean) => void;
    /** The dialog body — usually a single `DialogContent`. Only mounted while open. */
    children: React.ReactNode;
}
/**
 * A modal dialog built on the native `<dialog>` element — so focus-trapping, the
 * Esc key, background inerting and the top layer come from the platform, with no
 * dependency. Works controlled (`open` / `onOpenChange`) or uncontrolled
 * (`defaultOpen`). Children only mount while it's open, so a form inside starts
 * fresh each time. Clicking the backdrop dismisses it.
 *
 * A `DialogTitle` and `DialogDescription` name and describe the dialog
 * automatically — they're wired to it via `aria-labelledby` / `aria-describedby`,
 * so screen readers announce them on open.
 *
 * **Use a dialog** when the task genuinely blocks — a confirmation before
 * something irreversible, or a short focused form. It takes over the screen and
 * traps focus, so the cost is high: **reach for `InfoTip`** for optional
 * explanation, and put anything longer than a couple of fields on its own page.
 * Always give it a `DialogTitle`, or it reaches assistive tech unnamed.
 *
 * ```tsx
 * <Dialog open={open} onOpenChange={setOpen}>
 *   <DialogContent>
 *     <DialogHeader>
 *       <DialogTitle>Delete project</DialogTitle>
 *       <DialogDescription>This can't be undone.</DialogDescription>
 *     </DialogHeader>
 *     <DialogFooter>
 *       <DialogClose asChild><Button variant="ghost">Cancel</Button></DialogClose>
 *       <Button variant="destructive">Delete</Button>
 *     </DialogFooter>
 *   </DialogContent>
 * </Dialog>
 * ```
 */
declare function Dialog({ open, defaultOpen, onOpenChange, children }: DialogProps): React.JSX.Element;
/**
 * The card surface inside the dialog, and where the ✕ close button lives. Caps at
 * 85% of the viewport height and scrolls its own overflow.
 */
declare const DialogContent: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
/** Title + description block, inset on the right to clear the close button. */
declare const DialogHeader: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
/** The dialog's `<h2>` heading, in tracked-out mono. Names the dialog for AT. */
declare const DialogTitle: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLHeadingElement> & React.RefAttributes<HTMLHeadingElement>>;
/** The muted sentence under the title — say what's about to happen. */
declare const DialogDescription: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;
/**
 * The action row. Write the buttons in reading order (cancel first, confirm
 * last): it reverses to a full-width column on mobile so the confirm lands on
 * top, then flows right-aligned from `sm` up.
 */
declare const DialogFooter: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
interface DialogCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Render the single child as the trigger (forwarding the close handler) instead of a <button>. */
    asChild?: boolean;
}
/** Closes the dialog. Wrap your own control with `asChild`. */
declare const DialogClose: React.ForwardRefExoticComponent<DialogCloseProps & React.RefAttributes<HTMLButtonElement>>;

type DropdownMenuProps = React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Root>;
/**
 * A menu of **actions** hanging off a button — row actions, an overflow "…"
 * menu, an account menu.
 *
 * **It's for verbs, not values.** If the user is picking a value that stays
 * chosen and belongs to a form, that's `Select`; if they're choosing one of a
 * few visible options, that's `RadioGroup`. The checkbox and radio items here
 * are for view state you toggle *from* a menu (which columns to show, how to
 * sort), not for form fields.
 *
 * If a menu grows past roughly a dozen rows, or its items need descriptions, it
 * has outgrown the pattern — use a page or a dialog.
 *
 * ```tsx
 * <DropdownMenu>
 *   <DropdownMenuTrigger asChild>
 *     <Button variant="ghost">Actions</Button>
 *   </DropdownMenuTrigger>
 *   <DropdownMenuContent>
 *     <DropdownMenuLabel>Deployment</DropdownMenuLabel>
 *     <DropdownMenuItem onSelect={redeploy}>Redeploy</DropdownMenuItem>
 *     <DropdownMenuSeparator />
 *     <DropdownMenuItem variant="destructive" onSelect={remove}>Delete</DropdownMenuItem>
 *   </DropdownMenuContent>
 * </DropdownMenu>
 * ```
 */
declare function DropdownMenu(props: DropdownMenuProps): React.JSX.Element;
/** The control that opens the menu. Pass `asChild` to use a `Button`. */
declare const DropdownMenuTrigger: React.ForwardRefExoticComponent<DropdownMenuPrimitive.DropdownMenuTriggerProps & React.RefAttributes<HTMLButtonElement>>;
/** Groups related rows. Pair with a `DropdownMenuLabel` to name the group. */
declare const DropdownMenuGroup: React.ForwardRefExoticComponent<DropdownMenuPrimitive.DropdownMenuGroupProps & React.RefAttributes<HTMLDivElement>>;
/** Wraps `DropdownMenuRadioItem`s and owns the chosen `value`. */
declare const DropdownMenuRadioGroup: React.ForwardRefExoticComponent<DropdownMenuPrimitive.DropdownMenuRadioGroupProps & React.RefAttributes<HTMLDivElement>>;
interface DropdownMenuContentProps extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content> {
}
/** The menu surface. Portalled, so no ancestor `overflow: hidden` can clip it. */
declare const DropdownMenuContent: React.ForwardRefExoticComponent<DropdownMenuContentProps & React.RefAttributes<HTMLDivElement>>;
interface DropdownMenuItemProps extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> {
    /** `destructive` tints the row for actions that lose data. */
    variant?: "default" | "destructive";
    /** Indent to line up with rows that carry a tick or a dot. */
    inset?: boolean;
}
/** One action. Use `onSelect`, not `onClick` — it fires for Enter and Space too. */
declare const DropdownMenuItem: React.ForwardRefExoticComponent<DropdownMenuItemProps & React.RefAttributes<HTMLDivElement>>;
/** A row that toggles. The tick occupies a reserved column, so rows stay aligned. */
declare const DropdownMenuCheckboxItem: React.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuCheckboxItemProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
/** One choice within a `DropdownMenuRadioGroup`. */
declare const DropdownMenuRadioItem: React.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuRadioItemProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
interface DropdownMenuLabelProps extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> {
    /** Indent to line up with rows that carry a tick or a dot. */
    inset?: boolean;
}
/** A section heading in the mlz eyebrow voice. Not selectable. */
declare const DropdownMenuLabel: React.ForwardRefExoticComponent<DropdownMenuLabelProps & React.RefAttributes<HTMLDivElement>>;
/** A hairline rule between groups of rows. */
declare const DropdownMenuSeparator: React.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuSeparatorProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
/**
 * The keyboard hint pushed to the right of a row — purely decorative, so it's
 * hidden from assistive tech. It labels the shortcut, it doesn't bind it.
 */
declare function DropdownMenuShortcut({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>): React.JSX.Element;
/** Wraps a submenu — a `DropdownMenuSubTrigger` plus a `DropdownMenuSubContent`. */
declare const DropdownMenuSub: React.FC<DropdownMenuPrimitive.DropdownMenuSubProps>;
/** The row that opens a submenu. Carries its own caret. */
declare const DropdownMenuSubTrigger: React.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuSubTriggerProps & React.RefAttributes<HTMLDivElement>, "ref"> & {
    inset?: boolean;
} & React.RefAttributes<HTMLDivElement>>;
/** The submenu surface. */
declare const DropdownMenuSubContent: React.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuSubContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;

type HoverCardProps = React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Root>;
/**
 * A rich preview that appears on hover — a user card behind an @mention, a
 * repository summary behind a link.
 *
 * **It is an enhancement, never the only route to the information.** It opens
 * on hover and focus but not on click or touch, so anything only reachable this
 * way is unreachable on a phone. Everything inside must exist somewhere the
 * trigger leads.
 *
 * **Reach for `Tooltip`** when the content is a short line of text — a tooltip
 * attaches as the trigger's *description* and costs nothing. **Reach for
 * `Popover`** when the content has controls or the reader needs to keep it
 * open: a hover card closes the moment the pointer leaves, which makes it a
 * poor place to put a button.
 *
 * The default 700ms open delay is deliberate. Anything faster and cards flash
 * open as the pointer crosses a paragraph of links.
 *
 * ```tsx
 * <HoverCard>
 *   <HoverCardTrigger asChild><Link href="/martin">@martin</Link></HoverCardTrigger>
 *   <HoverCardContent>…</HoverCardContent>
 * </HoverCard>
 * ```
 */
declare function HoverCard({ openDelay, closeDelay, ...props }: HoverCardProps): React.JSX.Element;
/** What the card hangs off. Use `asChild` to keep it a real link. */
declare const HoverCardTrigger: React.ForwardRefExoticComponent<HoverCardPrimitive.HoverCardTriggerProps & React.RefAttributes<HTMLAnchorElement>>;
type HoverCardContentProps = React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>;
/**
 * The floating card. Portals out and positions with collision detection, so no
 * ancestor `overflow: hidden` can clip it and it can't leave the viewport.
 */
declare const HoverCardContent: React.ForwardRefExoticComponent<Omit<HoverCardPrimitive.HoverCardContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;

interface InfoTipProps {
    /**
     * Accessible name for the trigger button and, when no `title` is given, the
     * popover's label. Required — a bare icon button is meaningless to AT.
     */
    label: string;
    /** Optional bold heading shown at the top of the popover. */
    title?: React.ReactNode;
    /** The explanation. Plain text or rich content (a link, `<code>`, …). */
    children: React.ReactNode;
    /** Preferred side to open on. `auto` (default) prefers below, and flips when there's no room. */
    side?: "top" | "bottom" | "auto";
    /** Controlled open state. Provide `onOpenChange` alongside it. */
    open?: boolean;
    /** Notified whenever the open state should change (controlled or not). */
    onOpenChange?: (open: boolean) => void;
    /** Extra classes for the trigger button. */
    className?: string;
    /** Extra classes for the popover panel. */
    contentClassName?: string;
}
/**
 * An inline "info tip": a small icon button that sits in the flow of text and,
 * on click, opens a little popover explaining a term. Built for glossary-style
 * help — pair a piece of jargon with a plain-language "what / why".
 *
 * Built on the Radix popover primitive, so the panel renders in a portal (no
 * ancestor `overflow: hidden` can clip it) as a non-modal `role="dialog"`,
 * positions itself with collision detection — flipping and clamping to stay in
 * the viewport — and light-dismisses on outside-click, Esc, or a second click on
 * the trigger. Focus moves into the panel on open and returns to the trigger on
 * close.
 *
 * The trigger sizes itself in `em`, so it tracks the font-size of whatever text
 * it's dropped into.
 *
 * **Use it** for optional context a reader can ignore — defining jargon, or
 * explaining why a field is asked for. **Reach for `Dialog`** when the content
 * needs a decision or its own actions, and just write the sentence inline when
 * it's short enough: an info tip that everyone has to open is a sign the text
 * belonged on the page. Never hide *required* instructions behind one.
 *
 * ```tsx
 * <p>
 *   Your ASN
 *   <InfoTip label="What is an ASN?" title="ASN — Autonomous System Number">
 *     The network (usually an ISP or host) that announces your IP to the internet.
 *   </InfoTip>
 * </p>
 * ```
 */
declare function InfoTip({ label, title, children, side, open, onOpenChange, className, contentClassName, }: InfoTipProps): React.JSX.Element;

type PopoverProps = React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Root>;
/**
 * A non-modal panel anchored to the thing that opened it — a filter menu, a
 * colour picker, a small form that would be too much for a tooltip and too
 * little for a dialog.
 *
 * Radix owns the behaviour: the panel portals out (so no ancestor
 * `overflow: hidden` can clip it), positions itself with collision detection,
 * light-dismisses on outside click or Esc, and returns focus to the trigger.
 * Unlike `Dialog` it does **not** trap focus or inert the page — the rest of the
 * app stays usable, which is the whole distinction.
 *
 * **Reach for `InfoTip`** when the content is a sentence of glossary help — it
 * is this primitive with a fixed inline trigger and a narrower API.
 * **Reach for `DropdownMenu`** when the contents are a list of actions; a menu
 * has roving focus and type-ahead that a popover deliberately doesn't.
 * **Reach for `Dialog`** when the task must be finished before anything else.
 *
 * Give `PopoverContent` an `aria-label`, or point it at a heading inside with
 * `aria-labelledby` — it renders as a `role="dialog"` and arrives unnamed
 * otherwise.
 *
 * ```tsx
 * <Popover>
 *   <PopoverTrigger asChild>
 *     <Button variant="ghost">Filters</Button>
 *   </PopoverTrigger>
 *   <PopoverContent aria-label="Filters">…</PopoverContent>
 * </Popover>
 * ```
 */
declare function Popover(props: PopoverProps): React.JSX.Element;
/** The control that opens the popover. Use `asChild` to hand off to a `Button`. */
declare const PopoverTrigger: React.ForwardRefExoticComponent<PopoverPrimitive.PopoverTriggerProps & React.RefAttributes<HTMLButtonElement>>;
/**
 * Anchor the panel to something other than the trigger — a whole input row, say,
 * while the trigger is only the little chevron at its end.
 */
declare const PopoverAnchor: React.ForwardRefExoticComponent<PopoverPrimitive.PopoverAnchorProps & React.RefAttributes<HTMLDivElement>>;
/** Closes the popover from inside it. `asChild` to wrap your own control. */
declare const PopoverClose: React.ForwardRefExoticComponent<PopoverPrimitive.PopoverCloseProps & React.RefAttributes<HTMLButtonElement>>;
type PopoverContentProps = React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>;
/**
 * The floating panel. Defaults to opening below with an 8px gap and 8px of
 * viewport padding; `side` and `align` are *preferences* — collision handling
 * stays on, so it can never end up off-screen.
 */
declare const PopoverContent: React.ForwardRefExoticComponent<Omit<PopoverPrimitive.PopoverContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;

declare const sheetVariants: (props?: ({
    side?: "left" | "right" | "bottom" | "top" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface SheetProps extends VariantProps<typeof sheetVariants> {
    /** Whether the sheet is showing. Pass it to control the sheet yourself. */
    open?: boolean;
    /** Initial open state when uncontrolled. Ignored if `open` is provided. */
    defaultOpen?: boolean;
    /** Called with `false` on Esc, the ✕ button, a `SheetClose`, or a backdrop click. */
    onOpenChange?: (open: boolean) => void;
    /** Extra classes for the sheet panel itself. */
    className?: string;
    /** Usually a single `SheetContent`. Only mounted while open. */
    children: React.ReactNode;
}
/**
 * A panel that slides in from an edge — mobile navigation, a filter drawer, a
 * detail pane beside a list.
 *
 * Built on the **native `<dialog>` element**, the same as `Dialog`, so
 * focus-trapping, Esc, background inerting and the top layer come from the
 * platform rather than from JavaScript. One modal implementation, not two.
 *
 * **A sheet is a `Dialog` that came from the side.** Reach for it when the
 * content is a list to scan or navigate — it can be tall, and the edge anchoring
 * reads as "somewhere else in the app". Use `Dialog` when the content is a
 * decision to make; use a page when it's neither. **Don't** put a sheet inside a
 * sheet: on a phone that's a trapdoor with no visible way back.
 *
 * The slide-in is progressive enhancement (`@starting-style` +
 * `transition-behavior: allow-discrete`). Where a browser lacks them the sheet
 * appears in place, fully usable — and `prefers-reduced-motion` skips it too.
 *
 * ```tsx
 * <Sheet open={open} onOpenChange={setOpen} side="left">
 *   <SheetContent>
 *     <SheetHeader>
 *       <SheetTitle>Menu</SheetTitle>
 *     </SheetHeader>
 *     <nav>…</nav>
 *   </SheetContent>
 * </Sheet>
 * ```
 */
declare function Sheet({ open, defaultOpen, onOpenChange, side, className, children, }: SheetProps): React.JSX.Element;
/**
 * The scrolling body of a `Sheet` — every sheet needs exactly one, wrapping all
 * of its content.
 *
 * `Sheet` itself is the panel and owns the edge anchoring and the slide-in;
 * this is the column inside it that scrolls when the content outgrows the
 * viewport. Keeping them separate is what lets `SheetHeader` stay put while a
 * long list moves underneath it.
 */
declare const SheetContent: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
/** Title + description block, inset on the right to clear the close button. */
declare const SheetHeader: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
/** The sheet's `<h2>`. Names the sheet for assistive tech — always include one. */
declare const SheetTitle: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLHeadingElement> & React.RefAttributes<HTMLHeadingElement>>;
/** The muted sentence under the title. */
declare const SheetDescription: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;
/** The action row, pinned to the bottom of the panel. */
declare const SheetFooter: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
interface SheetCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Render the single child as the trigger instead of a `<button>`. */
    asChild?: boolean;
}
/** Closes the sheet. Wrap your own control with `asChild`. */
declare const SheetClose: React.ForwardRefExoticComponent<SheetCloseProps & React.RefAttributes<HTMLButtonElement>>;

/**
 * Wraps the part of the app that uses tooltips and shares their open/close
 * timing, so moving between neighbouring triggers doesn't re-run the delay.
 * Mount it once, high up. `Tooltip` falls back to its own provider if you
 * forget, but then each tooltip times independently.
 */
declare const TooltipProvider: React.FC<TooltipPrimitive.TooltipProviderProps>;
type TooltipProps = React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Root>;
/**
 * A small label that appears on hover or keyboard focus — the name of an icon
 * button, or a truncated value in full.
 *
 * **A tooltip is a hint, never content.** It can't be reached on touch and
 * vanishes on the way to it, so anything a reader *needs* belongs on the page.
 * Never put a control inside one. **Reach for `InfoTip`** when the explanation
 * is a sentence the reader should be able to click into and keep open, and for
 * `Dialog` when it needs actions.
 *
 * It attaches as the trigger's **description** (`aria-describedby`), not its
 * name — so an icon-only button still needs its own `aria-label`. A tooltip
 * alone leaves it unnamed.
 *
 * The trigger must also be focusable. A disabled `<button>` isn't, so wrap it in
 * a focusable span if a disabled control needs an explanation.
 *
 * ```tsx
 * <TooltipProvider>
 *   <Tooltip>
 *     <TooltipTrigger asChild>
 *       <Button size="icon" aria-label="Redeploy">↻</Button>
 *     </TooltipTrigger>
 *     <TooltipContent>Redeploy</TooltipContent>
 *   </Tooltip>
 * </TooltipProvider>
 * ```
 */
declare function Tooltip(props: TooltipProps): React.JSX.Element;
/** The element the tooltip describes. Pass `asChild` to use your own control. */
declare const TooltipTrigger: React.ForwardRefExoticComponent<TooltipPrimitive.TooltipTriggerProps & React.RefAttributes<HTMLButtonElement>>;
interface TooltipContentProps extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> {
}
/**
 * The label panel — ink-on-paper inverted, mono and tracked out, so it reads as
 * chrome rather than as page content. Keep it to a few words.
 */
declare const TooltipContent: React.ForwardRefExoticComponent<TooltipContentProps & React.RefAttributes<HTMLDivElement>>;

/**
 * Merge class names with Tailwind conflict resolution.
 * Later classes win — `cn("px-2", "px-4")` → `"px-4"`.
 */
declare function cn(...inputs: ClassValue[]): string;

/**
 * MLZ Design — theme runtime.
 *
 * The tokens in `styles/theme.css` already carry a full light + dark palette and
 * five `data-accent` families; all a consuming app needs is something to flip the
 * `.dark` class (and `data-accent`) on `<html>`, remember the choice, and follow
 * the OS when asked. That's this file — a tiny, zero-dependency, framework-agnostic
 * provider (next-themes-shaped) so downstream apps get real light/dark + accent
 * switching without hand-rolling it.
 *
 * Pair `<ThemeProvider>` with {@link themeInitScript} inlined in `<head>` to set
 * the class before first paint (no flash of the wrong theme on load / SSR).
 */
type Theme = "light" | "dark" | "system";
type ResolvedTheme = "light" | "dark";
interface ThemeProviderProps {
    children: React.ReactNode;
    /** Initial theme when nothing is stored. Default `"system"`. */
    defaultTheme?: Theme;
    /** Initial accent family when nothing is stored. Default `"cyan"`. */
    defaultAccent?: AccentName;
    /** localStorage key for the theme. Default `"mlz-theme"`. */
    storageKey?: string;
    /** localStorage key for the accent. Default `"mlz-accent"`. */
    accentStorageKey?: string;
    /** Whether `"system"` is honoured (follows `prefers-color-scheme`). Default `true`. */
    enableSystem?: boolean;
    /**
     * How the resolved theme is written to `<html>`. `"class"` toggles the `.dark`
     * class (matches theme.css and the Storybook toolbar); `"data-theme"` sets
     * `data-theme="light|dark"`. Default `"class"`.
     */
    attribute?: "class" | "data-theme";
}
interface ThemeContextValue {
    /** The chosen theme, including `"system"`. */
    theme: Theme;
    setTheme: (theme: Theme) => void;
    /** The concrete theme actually applied (`"system"` resolved to light/dark). */
    resolvedTheme: ResolvedTheme;
    accent: AccentName;
    setAccent: (accent: AccentName) => void;
}
/**
 * Owns the theme + accent state and writes both to `<html>`, so every semantic
 * token below it re-resolves. Put it once at the root of the app.
 *
 * It persists each choice to `localStorage` and, while the theme is `"system"`,
 * follows `prefers-color-scheme` live. State is read on mount, not during
 * render, so it is safe under SSR — but that also means the first paint uses
 * the defaults. **Pair it with `themeInitScript()`** in your document head to
 * apply the stored values before paint; without that, a returning dark-mode
 * reader gets a flash of light.
 *
 * `ThemeToggle` and `AccentPicker` are prebuilt controls that drive it, and
 * `useTheme` reads it from anywhere underneath.
 *
 * ```tsx
 * <ThemeProvider defaultTheme="system" defaultAccent="cyan">
 *   <App />
 * </ThemeProvider>
 * ```
 */
declare function ThemeProvider({ children, defaultTheme, defaultAccent, storageKey, accentStorageKey, enableSystem, attribute, }: ThemeProviderProps): React.JSX.Element;
/** Read + control the current theme and accent. Must be used under `<ThemeProvider>`. */
declare function useTheme(): ThemeContextValue;
interface ThemeInitScriptOptions {
    storageKey?: string;
    accentStorageKey?: string;
    defaultTheme?: Theme;
    defaultAccent?: AccentName;
    attribute?: "class" | "data-theme";
}
/**
 * A blocking `<script>` body that applies the stored (or default) theme + accent
 * to `<html>` *before first paint*, so there's no flash of the wrong theme on
 * load. Inline the returned string in `<head>`, ahead of your styles:
 *
 * ```tsx
 * <script dangerouslySetInnerHTML={{ __html: themeInitScript() }} />
 * ```
 *
 * Keep the options identical to the matching `<ThemeProvider>` props.
 *
 * **Under a strict `script-src`** — no `'unsafe-inline'`, and no server to mint
 * a nonce or hash — that inline tag is refused and the theme flashes on every
 * load. Emit this string as a hashed same-origin asset at build time instead;
 * the recipe is in `docs/architecture.md`, "Pre-paint theming under a strict
 * CSP".
 */
declare function themeInitScript(options?: ThemeInitScriptOptions): string;

export { AccentName, AccentPicker, type AccentPickerProps, Accordion, AccordionContent, AccordionItem, type AccordionItemProps, type AccordionProps, AccordionTrigger, type AccordionTriggerProps, Alert, AlertDescription, AlertDialog, AlertDialogAction, type AlertDialogActionProps, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, type AlertDialogProps, AlertDialogTitle, type AlertProps, AlertTitle, Avatar, AvatarFallback, type AvatarFallbackProps, AvatarGroup, type AvatarGroupProps, AvatarImage, type AvatarImageProps, type AvatarProps, Badge, type BadgeProps, BrandLockup, type BrandLockupProps, BrandMark, type BrandMarkProps, BrandWordmark, type BrandWordmarkProps, Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, type BreadcrumbLinkProps, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, Button, type ButtonProps, Callout, type CalloutProps, Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, type CardProps, CardTitle, Checkbox, type CheckboxProps, Code, CodeBlock, type CodeBlockProps, type CodeProps, Collapsible, CollapsibleContent, type CollapsibleContentProps, type CollapsibleProps, CollapsibleTrigger, type CollapsibleTriggerProps, Combobox, type ComboboxOption, type ComboboxProps, Command, CommandDialog, type CommandDialogProps, CommandEmpty, type CommandEmptyProps, CommandGroup, type CommandGroupProps, CommandInput, type CommandInputProps, CommandItem, type CommandItemProps, CommandList, type CommandListProps, type CommandProps, CommandSeparator, type CommandSeparatorProps, CommandShortcut, Container, type ContainerProps, type DataLayout, DataList, type DataListProps, DataRow, type DataRowProps, Dialog, DialogClose, type DialogCloseProps, DialogContent, DialogDescription, DialogFooter, DialogHeader, type DialogProps, DialogTitle, DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, type DropdownMenuContentProps, DropdownMenuGroup, DropdownMenuItem, type DropdownMenuItemProps, DropdownMenuLabel, type DropdownMenuLabelProps, type DropdownMenuProps, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger, EmptyState, EmptyStateActions, EmptyStateDescription, EmptyStateMedia, type EmptyStateProps, EmptyStateTitle, type EmptyStateTitleProps, Field, FieldDescription, FieldError, FieldLabel, type FieldLabelProps, type FieldProps, FloatingMarks, type FloatingMarksProps, GlitchText, type GlitchTextProps, type GlitchTrigger, Grid, GridBackground, type GridBackgroundProps, type GridProps, HoverCard, HoverCardContent, type HoverCardContentProps, type HoverCardProps, HoverCardTrigger, InfoTip, type InfoTipProps, Input, type InputProps, Kbd, type KbdProps, Label, type LabelProps, Link, type LinkProps, Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, type PaginationLinkProps, PaginationNext, PaginationPrevious, Popover, PopoverAnchor, PopoverClose, PopoverContent, type PopoverContentProps, type PopoverProps, PopoverTrigger, Progress, type ProgressProps, ProjectCard, type ProjectCardProps, Prose, type ProseProps, RadioGroup, RadioGroupItem, type RadioGroupItemProps, type RadioGroupProps, RepoBanner, type RepoBannerProps, type ResolvedTheme, ScrollArea, type ScrollAreaProps, ScrollBar, type ScrollBarProps, Select, SelectContent, type SelectContentProps, SelectGroup, SelectItem, SelectLabel, type SelectProps, SelectSeparator, SelectTrigger, type SelectTriggerProps, SelectValue, Separator, type SeparatorProps, Sheet, SheetClose, type SheetCloseProps, SheetContent, SheetDescription, SheetFooter, SheetHeader, type SheetProps, SheetTitle, Skeleton, Slider, type SliderProps, SocialCard, type SocialCardProps, Spinner, type SpinnerProps, Stack, type StackProps, Stat, StatDelta, type StatDeltaProps, StatLabel, StatValue, StatusDot, type StatusDotProps, Switch, type SwitchProps, Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, type TableProps, TableRow, Tabs, TabsContent, type TabsContentProps, TabsList, type TabsProps, TabsTrigger, type TabsTriggerProps, Text, type TextProps, Textarea, type TextareaProps, type Theme, type ThemeInitScriptOptions, ThemeProvider, type ThemeProviderProps, ThemeToggle, type ThemeToggleProps, Toggle, ToggleGroup, ToggleGroupItem, type ToggleGroupItemProps, type ToggleGroupProps, type ToggleProps, Tooltip, TooltipContent, type TooltipContentProps, type TooltipProps, TooltipProvider, TooltipTrigger, alertVariants, avatarVariants, badgeVariants, buttonVariants, calloutVariants, cardVariants, cn, containerVariants, emptyStateVariants, fallbackVariants, indicatorVariants, linkVariants, spinnerVariants, stackVariants, deltaVariants as statDeltaVariants, statusDotVariants, textVariants, themeInitScript, toggleVariants, useField, useFieldControlProps, useTheme };
