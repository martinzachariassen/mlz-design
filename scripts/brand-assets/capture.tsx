import type { ReactNode } from "react";
import { createRoot } from "react-dom/client";
import type { BrandAssetsConfig } from "../../src/brand-assets";
import { BrandMark } from "../../src/components/brand-mark";
import { RepoBanner } from "../../src/components/repo-banner";
import { SocialCard } from "../../src/components/social-card";
import "./capture.css";

/**
 * Renders exactly one asset, selected by the `a` query param, at its true base
 * size at (0,0) so a viewport-sized screenshot is a pixel-perfect crop. The repo
 * config arrives on `window.__BRAND__` (injected by the generator before load).
 */
declare global {
  interface Window {
    __BRAND__?: BrandAssetsConfig;
  }
}

const BANNER_W = 1280;
const BANNER_H = 340;
const CARD_W = 1200;
const CARD_H = 630;

/** Fixed brand ink/paper — favicons are static exports, never theme vars. */
const INK = "#1a1a18";
const PAPER = "#ecebe4";
const M_POINTS =
  "7,25 7,7 12,7 16,14.5 20,7 25,7 25,25 20.6,25 20.6,13.6 17.4,19.4 14.6,19.4 11.4,13.6 11.4,25";

/** Full-bleed ink square + paper M — for apple-touch / maskable icons (no alpha). */
function IconBleed({ size, pad = 0 }: { size: number; pad?: number }) {
  const inner = 32 - pad * 2;
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" role="img" aria-label="MLZ">
      <rect width="32" height="32" fill={INK} />
      <g transform={`translate(${pad},${pad}) scale(${inner / 32})`}>
        <polygon points={M_POINTS} fill={PAPER} />
      </g>
    </svg>
  );
}

function render() {
  const cfg = window.__BRAND__;
  const params = new URLSearchParams(location.search);
  const which = params.get("a") ?? "banner";

  let node: ReactNode = null;
  let width = BANNER_W;
  let height = BANNER_H;
  let dark = false;

  if (which === "banner" || which === "banner-dark") {
    if (!cfg) throw new Error("window.__BRAND__ not set");
    dark = which === "banner-dark";
    // Marks off for capture: they drift on an infinite animation (non-deterministic
    // snapshot), and a still frame pins them in an ugly row at the bottom edge. The
    // canonical static banner has none either — grid + frame carry the look.
    node = <RepoBanner width={BANNER_W} marks={false} {...cfg.banner} />;
  } else if (which === "og" || which === "twitter") {
    if (!cfg) throw new Error("window.__BRAND__ not set");
    width = CARD_W;
    height = CARD_H;
    node = <SocialCard width={CARD_W} marks={false} {...cfg.social} />;
  } else if (which === "icon") {
    const size = Number(params.get("size") ?? 32);
    const variant = params.get("variant") ?? "rounded";
    width = size;
    height = size;
    node =
      variant === "bleed" ? (
        <IconBleed size={size} pad={Number(params.get("pad") ?? 0)} />
      ) : (
        <BrandMark size={size} tile={INK} glyph={PAPER} />
      );
  }

  const root = document.getElementById("root");
  if (!root) throw new Error("#root not found");
  createRoot(root).render(
    <div id="asset" className={dark ? "dark" : undefined} style={{ width, height }}>
      {node}
    </div>,
  );

  // Signal the generator once type is loaded and a frame has painted.
  document.fonts.ready.then(() => {
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        document.body.dataset.ready = "true";
      }),
    );
  });
}

render();
