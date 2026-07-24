/**
 * Generate (or verify) a repo's full brand-asset set from one `brand.config.ts`,
 * so every project wears the identical face. Everything is rendered from the real
 * design-system components in a headless Chromium and captured at 2× DPI,
 * downsampled to the canonical size — the same output Storybook shows.
 *
 * Usage:
 *   bun scripts/brand-assets/generate.ts --config <path> [--out <repoRoot>] [--check]
 *
 *   --config   path to the repo's brand.config.ts (default ./brand.config.ts)
 *   --out      repo root the paths resolve against (default: the config's dir)
 *   --check    render everything and fail if any committed file differs — no writes
 *
 * `--check` is drift detection for CI: it re-renders and byte-compares, so a stale
 * banner or card can't slip through. Run it with the same toolchain that wrote the
 * assets (a Chromium bump can change antialiasing).
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, isAbsolute, join, resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { type Browser, chromium, type Page } from "playwright";
import { createServer, type ViteDevServer } from "vite";
import { type BrandAssetsConfig, DEFAULT_PATHS } from "../../src/brand-assets";
import { encodeIco } from "./ico";

const HERE = dirname(new URL(import.meta.url).pathname);
const REPO_ROOT = resolve(HERE, "..", "..");

const M_POINTS =
  "7,25 7,7 12,7 16,14.5 20,7 25,7 25,25 20.6,25 20.6,13.6 17.4,19.4 14.6,19.4 11.4,13.6 11.4,25";
const FAVICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
  <rect x="1" y="1" width="30" height="30" rx="6" fill="#1a1a18"/>
  <polygon fill="#ecebe4" points="${M_POINTS}"/>
</svg>
`;

interface Target {
  /** Absolute output path. */
  file: string;
  /** Query string for the capture page (omit for the static SVG). */
  query?: string;
  /** Capture box in CSS px. */
  w?: number;
  h?: number;
  /** Transparent background (icons with rounded corners). */
  alpha?: boolean;
  /** Literal contents instead of a screenshot (favicon.svg). */
  svg?: string;
}

function parseArgs(argv: string[]) {
  const args: { config: string; out?: string; check: boolean } = {
    config: "brand.config.ts",
    check: false,
  };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--config") args.config = argv[++i];
    else if (argv[i] === "--out") args.out = argv[++i];
    else if (argv[i] === "--check") args.check = true;
  }
  return args;
}

function targets(cfg: BrandAssetsConfig, root: string): Target[] {
  const p = { ...DEFAULT_PATHS, ...cfg.paths };
  const at = (dir: string, name: string) => join(root, dir, name);

  const list: Target[] = [
    { file: at(p.banner, "banner.png"), query: "a=banner", w: 1280, h: 340 },
    { file: at(p.social, "og.png"), query: "a=og", w: 1200, h: 630 },
    { file: at(p.social, "twitter-card.png"), query: "a=twitter", w: 1200, h: 630 },
  ];

  if (cfg.favicons !== false) {
    list.push(
      { file: at(p.icons, "favicon.svg"), svg: FAVICON_SVG },
      { file: at(p.icons, "favicon-32.png"), query: "a=icon&size=32", w: 32, h: 32, alpha: true },
      {
        file: at(p.icons, "favicon-192.png"),
        query: "a=icon&size=192",
        w: 192,
        h: 192,
        alpha: true,
      },
      {
        file: at(p.icons, "apple-touch-icon.png"),
        query: "a=icon&size=180&variant=bleed&pad=3",
        w: 180,
        h: 180,
      },
    );
  }
  return list;
}

async function shoot(page: Page, base: string, t: Target): Promise<Buffer> {
  await page.setViewportSize({
    width: Math.max(t.w ?? 1280, 320),
    height: Math.max(t.h ?? 340, 320),
  });
  await page.goto(`${base}?${t.query}`, { waitUntil: "load" });
  await page.waitForSelector('body[data-ready="true"]', { timeout: 15_000 });
  // scale:"css" downsamples the 2×-DPI raster to the canonical CSS size — crisp.
  return page.locator("#asset").screenshot({
    omitBackground: t.alpha,
    scale: "css",
    animations: "disabled",
  });
}

async function main() {
  const { config, out, check } = parseArgs(process.argv.slice(2));
  const configPath = isAbsolute(config) ? config : resolve(process.cwd(), config);
  const root = out ? resolve(process.cwd(), out) : dirname(configPath);

  const mod = await import(configPath);
  const cfg: BrandAssetsConfig = mod.default ?? mod.config;
  if (!cfg?.banner || !cfg?.social) {
    throw new Error(`${configPath} must default-export a BrandAssetsConfig (banner + social).`);
  }

  const list = targets(cfg, root);

  let server: ViteDevServer | undefined;
  let browser: Browser | undefined;
  const drift: string[] = [];
  let written = 0;

  try {
    server = await createServer({
      root: HERE,
      configFile: false,
      plugins: [react()],
      css: { postcss: REPO_ROOT },
      server: { host: "127.0.0.1", fs: { allow: [REPO_ROOT] } },
      logLevel: "warn",
      optimizeDeps: { include: [] },
    });
    await server.listen();
    const base = server.resolvedUrls?.local[0];
    if (!base) throw new Error("Vite did not report a local URL");

    browser = await chromium.launch();
    const context = await browser.newContext({ deviceScaleFactor: 2 });
    await context.addInitScript(`window.__BRAND__ = ${JSON.stringify(cfg)};`);
    const page = await context.newPage();

    // 16px PNG is only needed inside the .ico.
    const ico16 =
      cfg.favicons !== false
        ? await shoot(page, base, { file: "", query: "a=icon&size=16", w: 16, h: 16, alpha: true })
        : null;

    const rel = (f: string) => f.slice(root.length + 1);
    // Either byte-compare against the committed file (--check) or write it.
    const emit = (file: string, buf: Buffer) => {
      if (check) {
        let prev: Buffer | null = null;
        try {
          prev = readFileSync(file);
        } catch {}
        if (!prev?.equals(buf)) drift.push(rel(file));
      } else {
        mkdirSync(dirname(file), { recursive: true });
        writeFileSync(file, buf);
        written++;
        console.log(`  ✓ ${rel(file)}`);
      }
    };

    for (const t of list) {
      emit(t.file, t.svg ? Buffer.from(t.svg) : await shoot(page, base, t));
    }

    if (cfg.favicons !== false && ico16) {
      const png32 = await shoot(page, base, {
        file: "",
        query: "a=icon&size=32",
        w: 32,
        h: 32,
        alpha: true,
      });
      const ico = Buffer.from(
        encodeIco([
          { size: 16, data: ico16 },
          { size: 32, data: png32 },
        ]),
      );
      const p = { ...DEFAULT_PATHS, ...cfg.paths };
      emit(join(root, p.ico, "favicon.ico"), ico);
    }
  } finally {
    await browser?.close();
    await server?.close();
  }

  if (check) {
    if (drift.length) {
      console.error(`\n✗ ${drift.length} brand asset(s) out of date — run gen:assets:\n`);
      for (const d of drift) console.error(`    ${d}`);
      process.exit(1);
    }
    console.log("✓ brand assets are up to date");
  } else {
    console.log(`\n✓ wrote ${written} file(s) to ${root}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
