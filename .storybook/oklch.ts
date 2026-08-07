/**
 * OKLCH → sRGB hex.
 *
 * Storybook's manager theme runs every colour through `polished`, which only
 * understands hex / rgb() / hsl() — hand it an `oklch()` string and the whole
 * manager fails to render. The MLZ accents are authored in OKLCH, so they have
 * to be converted before they reach the theme.
 *
 * Converting rather than hardcoding hex keeps `src/tokens.ts` the single source
 * of truth: change an accent there and the Storybook chrome follows.
 */

/** Matches `oklch(L C H)` with optional commas, percentage L, and `/ alpha`. */
const OKLCH = /^oklch\(\s*([\d.]+%?)\s*,?\s*([\d.]+)\s*,?\s*([\d.]+)/i;

function gammaEncode(channel: number): number {
  return channel <= 0.0031308 ? 12.92 * channel : 1.055 * channel ** (1 / 2.4) - 0.055;
}

function toHexPair(channel: number): string {
  const clamped = Math.min(255, Math.max(0, Math.round(channel * 255)));
  return clamped.toString(16).padStart(2, "0");
}

/**
 * Convert an `oklch(L C H)` string to `#rrggbb`. Values outside the sRGB gamut
 * are clipped per channel — fine for chrome accents, which sit well inside it.
 * Anything that isn't an OKLCH string is returned untouched, so hex tokens can
 * be passed through this safely.
 */
export function oklchToHex(color: string): string {
  const match = OKLCH.exec(color.trim());
  if (!match) return color;

  const [, rawL, rawC, rawH] = match;
  const L = rawL.endsWith("%") ? Number.parseFloat(rawL) / 100 : Number.parseFloat(rawL);
  const C = Number.parseFloat(rawC);
  const hRad = (Number.parseFloat(rawH) * Math.PI) / 180;

  const a = C * Math.cos(hRad);
  const b = C * Math.sin(hRad);

  // OKLab → LMS (cube of the non-linear intermediate), then LMS → linear sRGB.
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;

  const r = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const bl = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;

  return `#${toHexPair(gammaEncode(r))}${toHexPair(gammaEncode(g))}${toHexPair(gammaEncode(bl))}`;
}
