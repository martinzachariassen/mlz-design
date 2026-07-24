import * as class_variance_authority_types from 'class-variance-authority/types';
import { VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { AccentName } from './tokens.js';
export { Breakpoint, Tokens, accents, animations, breakpoints, colors, fonts, motion, radius, signals, tokens } from './tokens.js';
import { ClassValue } from 'clsx';

/**
 * A signal panel: a subtle-tinted fill, a left accent rail and a colour-matched
 * title. Drop an svg as the first child and it slots into the icon column
 * (shadcn grid idiom); text flows in the second column.
 */
declare const alertVariants: (props?: ({
    variant?: "default" | "info" | "success" | "warning" | "destructive" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface AlertProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {
}
declare const Alert: React.ForwardRefExoticComponent<AlertProps & React.RefAttributes<HTMLDivElement>>;
declare const AlertTitle: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;
declare const AlertDescription: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;

/**
 * Identity, the mlz way: initials first. The frame is a hairline-bordered chip
 * (circle or square); an image drops in when there is one and falls back to the
 * initials the moment it fails. Compose `<Avatar><AvatarImage/><AvatarFallback/>`;
 * add a `status` dot, or stack several in an `AvatarGroup`.
 *
 * The root is an un-clipped wrapper so the status dot can sit on the edge; the
 * inner `avatar-frame` does the rounding/clipping (and is what `AvatarGroup` rings).
 */
declare const avatarVariants: (props?: ({
    size?: "default" | "xs" | "sm" | "lg" | "xl" | null | undefined;
    shape?: "circle" | "square" | null | undefined;
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
declare const Avatar: React.ForwardRefExoticComponent<AvatarProps & React.RefAttributes<HTMLSpanElement>>;
type AvatarImageProps = React.ImgHTMLAttributes<HTMLImageElement>;
declare const AvatarImage: React.ForwardRefExoticComponent<AvatarImageProps & React.RefAttributes<HTMLImageElement>>;
declare const fallbackVariants: (props?: ({
    tone?: "default" | "accent" | "muted" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface AvatarFallbackProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof fallbackVariants> {
}
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
    variant?: "default" | "destructive" | "accent" | "muted" | "outline" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
}
declare function Badge({ className, variant, ...props }: BadgeProps): React.JSX.Element;

/**
 * The MLZ **mark** — the Block M on a tight ink tile, the icon half of the
 * identity (favicon, avatar, app icon, stamp). Pure SVG, so it stays crisp from a
 * 16px favicon up to a 1200px OG image.
 *
 * The mark is always monochrome — ink tile, paper letter, never the accent. It
 * reads from semantic tokens by default (`--foreground` tile, `--background`
 * letter), so it inverts with the theme for free. For a *static* asset (a favicon
 * file, an email) pass fixed brand colours via `tile` / `glyph` — see the
 * Foundations → Brand & Favicon story for the export recipe.
 */
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
declare const BrandMark: React.ForwardRefExoticComponent<Omit<BrandMarkProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
/**
 * The MLZ **wordmark** — `mlz.` set in Space Mono Bold, lowercase, tracked
 * −0.03em, the type half of the identity (header, footer, signature, title). The
 * period is the one spot of colour in the whole system: it follows the active
 * accent family via `--brand-period` (accent-deep on light for AA on paper, the
 * base accent on dark) and is never omitted. Pass `period` to override it for a
 * static export. Minimum size 14px; below that, use the mark alone.
 */
interface BrandWordmarkProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
    /** Font size in px. */
    size?: number;
    /** Period colour override (static exports). Defaults to the `--brand-period` token. */
    period?: string;
}
declare const BrandWordmark: React.ForwardRefExoticComponent<BrandWordmarkProps & React.RefAttributes<HTMLSpanElement>>;
/**
 * The **lockup** — the mark paired with the wordmark, the signature MLZ pairing.
 * Proportions are fixed: mark height = 1.45 × wordmark size, gap = 0.5 × wordmark
 * size. `horizontal` (mark beside wordmark) is primary for headers and the OG
 * card; `stacked` (mark above a centred wordmark) suits square/avatar contexts.
 * The mono, wide-tracked `tagline` joins only at 40px+ marks (guideline minimum).
 */
interface BrandLockupProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Kicker line under the wordmark. Shown only when set and the mark is ≥ 40px. */
    tagline?: string;
    /** Mark size in px; the wordmark scales with it (mark = 1.45 × wordmark). */
    size?: number;
    /** Lockup layout. */
    orientation?: "horizontal" | "stacked";
}
declare const BrandLockup: React.ForwardRefExoticComponent<BrandLockupProps & React.RefAttributes<HTMLDivElement>>;

/**
 * The signature MLZ button: a technical ghost outline that lifts on hover
 * with an offset accent shadow. `variant` and `size` are fully typed.
 */
declare const buttonVariants: (props?: ({
    variant?: "default" | "destructive" | "link" | "accent" | "solid" | "ghost" | "sketch" | null | undefined;
    size?: "default" | "sm" | "lg" | "icon" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
}
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;

/**
 * Paper-look surfaces: elevation is a hairline border, never a heavy drop shadow.
 * Composed the shadcn way — Card + Header/Title/Description/Action/Content/Footer,
 * each tagged with a `data-slot` so consumers can target parts.
 *
 * `variant` covers the common surfaces:
 *   default      hairline border on card paper — the workhorse.
 *   elevated     adds the soft, warm-tinted shadow token (a hint, not a lift).
 *   interactive  the mlz signature: lifts on hover with an offset accent shadow.
 *                Use for whole-card links/buttons (pass `asChild`-style wrappers
 *                or an inner <a> that stretches with `after:absolute after:inset-0`).
 *   accent       an accent-subtle wash inside an accent-tinted border — callouts.
 *   ghost        no border/background — for nesting inside another surface.
 */
declare const cardVariants: (props?: ({
    variant?: "default" | "accent" | "ghost" | "elevated" | "interactive" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface CardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
}
declare const Card: React.ForwardRefExoticComponent<CardProps & React.RefAttributes<HTMLDivElement>>;
declare const CardHeader: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const CardTitle: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const CardDescription: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;
/** Top-right slot in the header (menu button, badge, switch…). */
declare const CardAction: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const CardContent: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const CardFooter: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;

type CheckboxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">;
declare const Checkbox: React.ForwardRefExoticComponent<CheckboxProps & React.RefAttributes<HTMLInputElement>>;

interface DialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    children: React.ReactNode;
}
declare function Dialog({ open, onOpenChange, children }: DialogProps): React.JSX.Element;
declare const DialogContent: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const DialogHeader: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const DialogTitle: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLHeadingElement> & React.RefAttributes<HTMLHeadingElement>>;
declare const DialogDescription: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;
declare const DialogFooter: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
interface DialogCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Render the single child as the trigger (forwarding the close handler) instead of a <button>. */
    asChild?: boolean;
}
/** Closes the dialog. Wrap your own control with `asChild`. */
declare const DialogClose: React.ForwardRefExoticComponent<DialogCloseProps & React.RefAttributes<HTMLButtonElement>>;

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
interface FloatingMarksProps extends React.HTMLAttributes<HTMLDivElement> {
    /** How many marks to scatter. */
    count?: number;
}
declare const FloatingMarks: React.ForwardRefExoticComponent<FloatingMarksProps & React.RefAttributes<HTMLDivElement>>;

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
 */
type GlitchTrigger = "ambient" | "hover";
interface GlitchTextProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
    /** The text to render and glitch. */
    text: string;
    /** What drives the effect. */
    trigger?: GlitchTrigger;
    /** Ambient burst cadence, `[minMs, maxMs]`. */
    interval?: readonly [number, number];
}
declare const GlitchText: React.ForwardRefExoticComponent<GlitchTextProps & React.RefAttributes<HTMLSpanElement>>;

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
declare const GridBackground: React.ForwardRefExoticComponent<GridBackgroundProps & React.RefAttributes<HTMLDivElement>>;

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;
declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;

type KbdProps = React.HTMLAttributes<HTMLElement>;
/** An inline keyboard key: mono, hairline-bordered, muted chip. */
declare const Kbd: React.ForwardRefExoticComponent<KbdProps & React.RefAttributes<HTMLElement>>;

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;
declare const Label: React.ForwardRefExoticComponent<LabelProps & React.RefAttributes<HTMLLabelElement>>;

/**
 * Layout primitives — the structural spine for responsive, mobile-first web UIs.
 * They carry no brand paint (no colour, no border); they only lay things out on
 * the token breakpoint ladder so pages read the same from a 360px phone to a wide
 * desktop. Compose the painted components (Card, Button…) inside them.
 *
 *   Container  a centred, max-width column with responsive gutters — the page frame.
 *   Stack      a flex row/column with a token gap; `responsive` stacks on mobile,
 *              flows to a row at `sm`.
 *   Grid       a responsive grid — either an auto-fitting track (`min`) that needs
 *              no breakpoints, or a fixed `cols` count that steps up with width.
 */
declare const containerVariants: (props?: ({
    size?: "sm" | "lg" | "xl" | "md" | "prose" | "full" | null | undefined;
    gutter?: "none" | "sm" | "lg" | "md" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface ContainerProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof containerVariants> {
}
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
    gap?: keyof typeof gapMap;
}
declare const Grid: React.ForwardRefExoticComponent<GridProps & React.RefAttributes<HTMLDivElement>>;

declare const indicatorVariants: (props?: ({
    variant?: "default" | "accent" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface ProgressProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof indicatorVariants> {
    /** Completion as a percentage, clamped to 0–100. */
    value?: number;
}
declare const Progress: React.ForwardRefExoticComponent<ProgressProps & React.RefAttributes<HTMLDivElement>>;

/**
 * A portfolio project card — the mlz signature applied to work: a hairline surface
 * that lifts on hover with an offset accent shadow, a cover band, a grotesk title,
 * mono metadata and tag chips. Pass a `cover` (image, canvas, anything) or let it
 * fall back to the on-brand ruled-grid + monogram placeholder — no stock imagery.
 *
 *   default   vertical: cover on top, body below — drops into a `Grid`.
 *   featured   horizontal from `md` up (cover beside the body), larger — for the
 *              hero project at the top of a portfolio. Stacks on mobile.
 *
 * With `href`, the whole card becomes one link (the title anchor stretches over it).
 */
interface ProjectCardProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
    title: React.ReactNode;
    description?: React.ReactNode;
    /** Short tag chips (stack, role, category). */
    tags?: readonly string[];
    /** A mono eyebrow line — e.g. "2024 · Design system". */
    meta?: string;
    href?: string;
    /** Cover visual. Defaults to the brand grid + monogram placeholder. */
    cover?: React.ReactNode;
    /** Horizontal, larger layout from `md` up. */
    featured?: boolean;
    /** Link label. */
    cta?: string;
}
declare const ProjectCard: React.ForwardRefExoticComponent<ProjectCardProps & React.RefAttributes<HTMLElement>>;

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
type ProseProps = React.HTMLAttributes<HTMLDivElement>;
declare const Prose: React.ForwardRefExoticComponent<ProseProps & React.RefAttributes<HTMLDivElement>>;

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
declare const RepoBanner: React.ForwardRefExoticComponent<RepoBannerProps & React.RefAttributes<HTMLDivElement>>;

interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
    orientation?: "horizontal" | "vertical";
    decorative?: boolean;
    label?: React.ReactNode;
}
/**
 * A hairline rule. Purely decorative by default (`aria-hidden`); pass
 * `decorative={false}` for a real `role="separator"`. A horizontal rule can
 * carry a centered mono label that splits the line.
 */
declare const Separator: React.ForwardRefExoticComponent<SeparatorProps & React.RefAttributes<HTMLDivElement>>;

/**
 * Placeholder shimmer for loading states. The `animate-pulse-soft` token is
 * already `prefers-reduced-motion` guarded, so motion needs no extra handling.
 */
declare const Skeleton: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;

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
declare const SocialCard: React.ForwardRefExoticComponent<SocialCardProps & React.RefAttributes<HTMLDivElement>>;

/**
 * A rotating ring built from a bordered circle with a transparent top segment.
 * Inherits `currentColor` (accent by default); stops spinning under
 * `prefers-reduced-motion`.
 */
declare const spinnerVariants: (props?: ({
    size?: "default" | "sm" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof spinnerVariants> {
    label?: string;
}
declare const Spinner: React.ForwardRefExoticComponent<SpinnerProps & React.RefAttributes<HTMLDivElement>>;

type SwitchProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">;
declare const Switch: React.ForwardRefExoticComponent<SwitchProps & React.RefAttributes<HTMLInputElement>>;

interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
}
declare const Tabs: React.ForwardRefExoticComponent<TabsProps & React.RefAttributes<HTMLDivElement>>;
declare const TabsList: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    value: string;
}
declare const TabsTrigger: React.ForwardRefExoticComponent<TabsTriggerProps & React.RefAttributes<HTMLButtonElement>>;
interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
    value: string;
}
declare const TabsContent: React.ForwardRefExoticComponent<TabsContentProps & React.RefAttributes<HTMLDivElement>>;

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;
declare const Textarea: React.ForwardRefExoticComponent<TextareaProps & React.RefAttributes<HTMLTextAreaElement>>;

/**
 * Merge class names with Tailwind conflict resolution.
 * Later classes win — `cn("px-2", "px-4")` → `"px-4"`.
 */
declare function cn(...inputs: ClassValue[]): string;

export { AccentName, Alert, AlertDescription, type AlertProps, AlertTitle, Avatar, AvatarFallback, type AvatarFallbackProps, AvatarGroup, type AvatarGroupProps, AvatarImage, type AvatarImageProps, type AvatarProps, Badge, type BadgeProps, BrandLockup, type BrandLockupProps, BrandMark, type BrandMarkProps, BrandWordmark, type BrandWordmarkProps, Button, type ButtonProps, Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, type CardProps, CardTitle, Checkbox, type CheckboxProps, Container, type ContainerProps, Dialog, DialogClose, type DialogCloseProps, DialogContent, DialogDescription, DialogFooter, DialogHeader, type DialogProps, DialogTitle, FloatingMarks, type FloatingMarksProps, GlitchText, type GlitchTextProps, type GlitchTrigger, Grid, GridBackground, type GridBackgroundProps, type GridProps, Input, type InputProps, Kbd, type KbdProps, Label, type LabelProps, Progress, type ProgressProps, ProjectCard, type ProjectCardProps, Prose, type ProseProps, RepoBanner, type RepoBannerProps, Separator, type SeparatorProps, Skeleton, SocialCard, type SocialCardProps, Spinner, type SpinnerProps, Stack, type StackProps, Switch, type SwitchProps, Tabs, TabsContent, type TabsContentProps, TabsList, type TabsProps, TabsTrigger, type TabsTriggerProps, Textarea, type TextareaProps, alertVariants, avatarVariants, badgeVariants, buttonVariants, cardVariants, cn, containerVariants, fallbackVariants, indicatorVariants, spinnerVariants, stackVariants };
