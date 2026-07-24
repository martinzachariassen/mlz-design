/**
 * Generate the repository README banners under `assets/`.
 *
 * A static, self-contained mirror of the `RepoBanner` **standard** layout. Space
 * Mono / Space Grotesk are subset to just the glyphs each banner uses and embedded
 * as base64 `@font-face`, so the SVG renders identically everywhere (including
 * GitHub's `<img>` sandbox) with no external requests. The banner always renders
 * in the light palette, regardless of the viewer's GitHub theme.
 *
 * Emits two files:
 *   assets/banner.svg           — this repo's header (real copy).
 *   assets/banner-template.svg  — a placeholder layout reference for other repos:
 *                                 copy it, swap the copy in the SPECS block, re-run.
 *
 * React repos that consume this package skip the SVG entirely and render their own
 * from the `RepoBanner` component (see Foundations/Repo Banner in Storybook).
 *
 * Run:  bun run gen:banner   (needs network — pulls the font subsets from Google)
 */

import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ASSETS = join(HERE, "..", "assets");

/* ── the banners to emit ──────────────────────────────────────────────────── */
interface BannerSpec {
  file: string;
  eyebrow: string;
  project: string;
  description: string;
  install: string;
  footer: string;
  badges: string[];
}

const SPECS: BannerSpec[] = [
  {
    file: "banner.svg",
    eyebrow: "MLZ · DESIGN SYSTEM",
    project: "Design",
    description: "One canonical source of colour, type, style and motion for every project.",
    install: "bun add @martinzachariassen/design",
    footer: "GITHUB.COM/MARTINZACHARIASSEN/MLZ-DESIGN",
    badges: ["REACT", "TAILWIND V4", "SWIFTUI", "OKLCH"],
  },
  {
    file: "banner-template.svg",
    eyebrow: "MLZ · CATEGORY",
    project: "Project",
    description: "What this repository is, in one clear line — replace this copy.",
    install: "bun add @martinzachariassen/name",
    footer: "GITHUB.COM/MARTINZACHARIASSEN/REPO",
    badges: ["LABEL", "LABEL", "LABEL"],
  },
];

/* ── font subsetting via Google Fonts ─────────────────────────────────────── */
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36";

async function subset(family: string, text: string): Promise<string> {
  const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}&text=${encodeURIComponent(text)}`;
  const css = await fetch(url, { headers: { "User-Agent": UA } }).then((r) => r.text());
  const m = css.match(/url\((https:\/\/[^)]+)\)/);
  if (!m) throw new Error(`No font URL for ${family} / "${text}"`);
  const buf = await fetch(m[1], { headers: { "User-Agent": UA } }).then((r) => r.arrayBuffer());
  return Buffer.from(buf).toString("base64");
}

const face = (family: string, weight: number, b64: string) =>
  `@font-face{font-family:'${family}';font-weight:${weight};font-style:normal;src:url(data:font/woff2;base64,${b64}) format('woff2')}`;

/* ── monospace metrics (Space Mono advance = 0.6em) ───────────────────────── */
const monoW = (s: string, size: number, tracking = 0) => s.length * (size * 0.6 + tracking);

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/* ── layout ───────────────────────────────────────────────────────────────── */
const W = 1280;
const H = 340;
const PAD = 54;

function buildBadges(badges: string[]): string {
  const size = 11;
  const trk = size * 0.16;
  const padX = 12;
  const h = 26;
  const gap = 8;
  const y = 62;
  const widths = badges.map((b) => monoW(b, size, trk) + padX * 2);
  const total = widths.reduce((a, b) => a + b, 0) + gap * (badges.length - 1);
  let x = W - PAD - total;
  return badges
    .map((b, i) => {
      const w = widths[i];
      const cx = x + padX;
      const rect = `<rect x="${x.toFixed(1)}" y="${y}" width="${w.toFixed(1)}" height="${h}" rx="3" class="chip"/>`;
      const txt = `<text x="${cx.toFixed(1)}" y="${y + 17}" class="badge">${esc(b)}</text>`;
      x += w + gap;
      return rect + txt;
    })
    .join("");
}

async function build(spec: BannerSpec): Promise<string> {
  const { eyebrow: EYEBROW, project: PROJECT, description: DESC, install: INSTALL } = spec;
  const { footer: FOOTER, badges: BADGES } = spec;
  const [grotesk, mono700, mono400] = await Promise.all([
    subset("Space Grotesk:wght@700", PROJECT),
    subset("Space Mono:wght@700", "mlz."),
    subset("Space Mono:wght@400", `${EYEBROW}${DESC}$ ${INSTALL}${FOOTER}${BADGES.join(" ")}`),
  ]);

  const M =
    "7,25 7,7 12,7 16,14.5 20,7 25,7 25,25 20.6,25 20.6,13.6 17.4,19.4 14.6,19.4 11.4,13.6 11.4,25";

  // grid lines (minor 40u)
  let grid = "";
  for (let x = 40; x < W; x += 40) grid += `<line x1="${x}" y1="0" x2="${x}" y2="${H}"/>`;
  for (let y = 40; y < H; y += 40) grid += `<line x1="0" y1="${y}" x2="${W}" y2="${y}"/>`;

  // install chip
  const insSize = 14;
  const insText = `$ ${INSTALL}`;
  const insW = monoW(insText, insSize) + 30;
  const insY = 280;

  // footer (right-anchored) + accent square
  const ftSize = 13;
  const ftTrk = ftSize * 0.18;
  const ftW = monoW(FOOTER, ftSize, ftTrk);
  const sqX = W - PAD - ftW - 16;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" fill="none" role="img" aria-label="MLZ · Design — one design system, every project">
<style>
${face("Space Grotesk", 700, grotesk)}
${face("Space Mono", 700, mono700)}
${face("Space Mono", 400, mono400)}
:root{--bg:#ecebe4;--fg:#1a1a18;--muted:#63615a;--line:#cbc9be;--card:#f2f1ea;--accent:#00c4c4;--period:#006e74;--gridc:26,26,24}
text{font-family:'Space Mono',monospace}
.grid{stroke:rgb(var(--gridc));stroke-opacity:.05}
.frame{stroke:var(--line);stroke-opacity:.7}
.corner{stroke:var(--accent);stroke-width:2;fill:none}
.word{font-weight:700;font-size:29px;letter-spacing:-.9px;fill:var(--fg)}
.eyebrow{font-size:13px;letter-spacing:3.4px;fill:var(--muted)}
.head{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:54px;letter-spacing:-1.1px;fill:var(--fg)}
.desc{font-size:16px;fill:var(--muted)}
.ins{font-size:14px;fill:var(--fg)}
.foot{font-size:13px;letter-spacing:2.3px;fill:var(--muted)}
.badge{font-size:11px;letter-spacing:1.8px;fill:var(--muted)}
.chip{fill:var(--card);stroke:var(--line)}
</style>
<rect width="${W}" height="${H}" fill="var(--bg)"/>
<g class="grid">${grid}</g>
<rect x="22" y="22" width="${W - 44}" height="${H - 44}" class="frame"/>
<path class="corner" d="M22 44 V22 H44"/>
<path class="corner" d="M${W - 44} 22 H${W - 22} V44"/>
<path class="corner" d="M22 ${H - 44} V${H - 22} H44"/>
<path class="corner" d="M${W - 44} ${H - 22} H${W - 22} V${H - 44}"/>

<g transform="translate(${PAD},${PAD}) scale(1.3125)">
  <rect x="1" y="1" width="30" height="30" rx="6" fill="var(--fg)"/>
  <polygon points="${M}" fill="var(--bg)"/>
</g>
<text x="${PAD + 56}" y="85" class="word">mlz<tspan fill="var(--period)">.</tspan></text>
<text x="${PAD}" y="120" class="eyebrow">${esc(EYEBROW)}</text>

<text x="${PAD}" y="208" class="head">${esc(PROJECT)}</text>
<text x="${PAD}" y="256" class="desc">${esc(DESC)}</text>

<rect x="${PAD}" y="${insY}" width="${insW.toFixed(1)}" height="30" rx="3" class="chip"/>
<text x="${PAD + 15}" y="${insY + 20}" class="ins"><tspan fill="var(--period)">$</tspan>${esc(` ${INSTALL}`)}</text>

<rect x="${sqX.toFixed(1)}" y="291" width="7" height="7" fill="var(--accent)"/>
<text x="${W - PAD}" y="299" text-anchor="end" class="foot">${esc(FOOTER)}</text>

${buildBadges(BADGES)}
</svg>
`;
}

for (const spec of SPECS) {
  const svg = await build(spec);
  writeFileSync(join(ASSETS, spec.file), svg);
  console.log(`  ✓ assets/${spec.file}  (${(svg.length / 1024).toFixed(1)} KB)`);
}
