# Getting started — a new project on the MLZ base

The end-to-end path from an empty app to a fully themed one. This is the one
place the whole recipe lives; the README's Quickstart is the short form of
steps 1–2, and [design-system.md](design-system.md) is the reference for what
you then have.

**Prerequisites:** React 19+, Tailwind **v4** (the tokens ship as `@theme`
layers, which v3 can't read), Node 22.12+ or Bun.

## 1. Install

Install from the public repo — no registry setup, no token:

```bash
bun add github:martinzachariassen/mlz-design#v0.8.0 react react-dom
```

This resolves the committed `dist/` (CI fails if it is stale), so nothing has
to be built on install.

**Pin the tag, and treat bumping it as deliberate.** A git ref carries no
semver range, so the tilde-range contract in [VERSIONING.md](VERSIONING.md)
becomes something you apply by hand: the package is on 0.x, where minors may
break you. Read the CHANGELOG before moving the tag.

<details>
<summary>Installing from GitHub Packages instead</summary>

Releases are also published to GitHub Packages, which does support real semver
ranges (`"~0.8.0"`). The cost is authentication: GitHub Packages requires a
token even for public packages, and only classic PATs work — a fine-grained
token has no packages permission. You need a PAT with `read:packages` plus a
registry entry for the scope in your consuming project.

Be aware this also affects Dependabot in the consuming repo: it runs in its own
credential context and needs a `registries:` block, which currently trips two
open upstream bugs ([dependabot-core#16107](https://github.com/dependabot/dependabot-core/issues/16107),
[#15415](https://github.com/dependabot/dependabot-core/issues/15415)) that can
rewrite unrelated packages' lockfile URLs to `npm.pkg.github.com`.

</details>

## 2. Inherit the system — two CSS lines

At the **top** of your app's main stylesheet, before any rule of your own:

```css
@import "tailwindcss";
@import "@martinzachariassen/design/styles/index.css";
```

That pulls in the tokens, fonts, base layer and every component's classes (the
bundle declares its own `@source`). Two variants when you need them:

- **Strict CSP / no CDN:** swap `index.css` for `index-self-hosted.css` — all
  four font families load from bundled WOFF2 same-origin.
- **Fine control:** import `styles/theme.css` (required) + `styles/fonts.css` +
  `styles/base.css` individually, and add
  `@source "../node_modules/@martinzachariassen/design/dist";` yourself (the
  path is relative to *your stylesheet*).

## 3. Wire the theme runtime

`ThemeProvider` owns light/dark/system + accent, persists the choice, and
writes it to `<html>`. `themeInitScript()` applies the stored choice *before
first paint*, so a returning dark-mode visitor never sees a flash:

```tsx
import { ThemeProvider } from "@martinzachariassen/design";

// index.html / document head — ahead of your styles:
// <script>{themeInitScript()}</script>   (inline the returned string)

export function App() {
  return (
    <ThemeProvider defaultTheme="system" defaultAccent="cyan">
      <YourApp />
    </ThemeProvider>
  );
}
```

Drop `ThemeToggle` / `AccentPicker` anywhere below the provider for prebuilt
controls. Under a strict CSP where the inline script is refused, emit the
string as a hashed build-time asset instead — the recipe is in
[architecture.md](architecture.md), "Pre-paint theming under a strict CSP".

Your own `dark:*` utilities follow the toggle automatically — `theme.css`
binds Tailwind's `dark:` variant to the `.dark` class, not the OS setting.

## 4. Next.js / React Server Components

The root entry and `./toaster` ship with `"use client"`, so importing
`ThemeProvider`, `Dialog` or any other component from a Server Component tree
just works — React draws the client boundary for you. `./tokens` is plain data
with no directive; it stays importable inside Server Components.

For the pre-paint script in the App Router:

```tsx
// app/layout.tsx
import { themeInitScript } from "@martinzachariassen/design";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript() }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

(`suppressHydrationWarning` on `<html>` because the script sets `class`/
`data-accent` before React hydrates — the standard next-themes pattern.)

## 5. Toasts (optional)

`Toaster`/`toast` live behind a subpath so their dependency (`sonner`, which
injects a stylesheet at import time) never lands in apps that don't use them:

```tsx
import { Toaster, toast } from "@martinzachariassen/design/toaster";
```

Render `<Toaster />` once at the root; call `toast(...)` anywhere.

## 6. Make it yours (optional)

Override **semantic** tokens only — never the `--mlz-*` primitives:

```css
:root {
  --accent: oklch(0.70 0.15 300);      /* your house accent (the fill rung) */
  --accent-deep: oklch(0.45 0.14 300); /* its readable rung — keep ≥4.5:1 on paper */
}
```

The full role list and the contrast rules each role must keep are in
[design-system.md → Making it your own](design-system.md#making-it-your-own).

## shadcn/ui compatibility

Semantic token names match shadcn's, and the interactive components share the
same Radix backbone — `npx shadcn add <thing>` drops in and inherits the
palette. Strip any `lucide-react` imports it generates (this system ships no
icon library; inline the SVG instead). `Button` also accepts shadcn's
`outline`/`secondary` variant names.
