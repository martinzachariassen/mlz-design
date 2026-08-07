import * as class_variance_authority_types from 'class-variance-authority/types';
import { VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { AccentName } from './tokens.js';
export { Breakpoint, Tokens, accents, animations, breakpoints, colors, fonts, motion, radius, signals, tokens } from './tokens.js';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import * as LabelPrimitive from '@radix-ui/react-label';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import * as TabsPrimitive from '@radix-ui/react-tabs';
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

declare const avatarVariants: (props?: ({
    size?: "default" | "xs" | "sm" | "lg" | "xl" | null | undefined;
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
 * receipt. **Reach for a `<table>`** the moment you have the same fields across
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
declare const DataRow: React.ForwardRefExoticComponent<DataRowProps & React.RefAttributes<HTMLDivElement>>;

type KbdProps = React.HTMLAttributes<HTMLElement>;
/** An inline keyboard key: mono, hairline-bordered, muted chip. */
declare const Kbd: React.ForwardRefExoticComponent<KbdProps & React.RefAttributes<HTMLElement>>;

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

declare const textVariants: (props?: ({
    variant?: "body" | "muted" | "eyebrow" | "mono" | "lead" | null | undefined;
    size?: "base" | "xs" | "sm" | "lg" | null | undefined;
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

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;
/**
 * A single-line text field. Mono type, a 1.5px `--input` border that turns to the
 * ring colour on focus with a soft `ring/30` halo. Takes every native `<input>`
 * attribute, so `type`, `required` and the rest behave exactly as you expect.
 */
declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;

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
 */
declare const Textarea: React.ForwardRefExoticComponent<TextareaProps & React.RefAttributes<HTMLTextAreaElement>>;

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
    gap?: "none" | "xs" | "sm" | "lg" | "xl" | "md" | null | undefined;
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
declare function Dialog({ open: openProp, defaultOpen, onOpenChange, children, }: DialogProps): React.JSX.Element;
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
declare namespace InfoTip {
    var displayName: string;
}

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
 */
declare function themeInitScript(options?: ThemeInitScriptOptions): string;

export { AccentName, Accordion, AccordionContent, AccordionItem, type AccordionItemProps, type AccordionProps, AccordionTrigger, type AccordionTriggerProps, Alert, AlertDescription, type AlertProps, AlertTitle, Avatar, AvatarFallback, type AvatarFallbackProps, AvatarGroup, type AvatarGroupProps, AvatarImage, type AvatarImageProps, type AvatarProps, Badge, type BadgeProps, BrandLockup, type BrandLockupProps, BrandMark, type BrandMarkProps, BrandWordmark, type BrandWordmarkProps, Button, type ButtonProps, Callout, type CalloutProps, Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, type CardProps, CardTitle, Checkbox, type CheckboxProps, Container, type ContainerProps, type DataLayout, DataList, type DataListProps, DataRow, type DataRowProps, Dialog, DialogClose, type DialogCloseProps, DialogContent, DialogDescription, DialogFooter, DialogHeader, type DialogProps, DialogTitle, FloatingMarks, type FloatingMarksProps, GlitchText, type GlitchTextProps, type GlitchTrigger, Grid, GridBackground, type GridBackgroundProps, type GridProps, InfoTip, type InfoTipProps, Input, type InputProps, Kbd, type KbdProps, Label, type LabelProps, Progress, type ProgressProps, ProjectCard, type ProjectCardProps, Prose, type ProseProps, RepoBanner, type RepoBannerProps, type ResolvedTheme, Separator, type SeparatorProps, Skeleton, SocialCard, type SocialCardProps, Spinner, type SpinnerProps, Stack, type StackProps, StatusDot, type StatusDotProps, Switch, type SwitchProps, Tabs, TabsContent, type TabsContentProps, TabsList, type TabsProps, TabsTrigger, type TabsTriggerProps, Text, type TextProps, Textarea, type TextareaProps, type Theme, type ThemeInitScriptOptions, ThemeProvider, type ThemeProviderProps, alertVariants, avatarVariants, badgeVariants, buttonVariants, calloutVariants, cardVariants, cn, containerVariants, fallbackVariants, indicatorVariants, spinnerVariants, stackVariants, statusDotVariants, textVariants, themeInitScript, useTheme };
