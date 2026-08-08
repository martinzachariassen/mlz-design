/**
 * Colour maths for the token ladder — parsing, sRGB gamut checks and WCAG
 * contrast ratios.
 *
 * Internal, like `lib/icons.tsx`: it backs `theme.contrast.test.ts` (the gate
 * that holds the ladder's promises) and the Foundations docs page (which shows
 * the measured numbers rather than transcribing them). Sharing one
 * implementation is the point — a docs page that computed contrast its own way
 * could disagree with the test and neither would be obviously wrong.
 *
 * Not exported from the package: consumers read tokens, not colour theory.
 */

type Rgb = [number, number, number];

/** OKLCH → linear sRGB (Björn Ottosson's matrices). */
function oklchToLinearRgb(L: number, C: number, h: number): Rgb {
  const hr = (h * Math.PI) / 180;
  const a = C * Math.cos(hr);
  const b = C * Math.sin(hr);

  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;

  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
}

function hexToLinearRgb(hex: string): Rgb {
  const n = Number.parseInt(hex.slice(1), 16);
  const srgb = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => v / 255);
  return srgb.map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)) as Rgb;
}

/**
 * Parses either notation the tokens use. Returns linear-light RGB, deliberately
 * unclamped — channels below 0 or above 1 are exactly how a value that has
 * strayed outside the sRGB gamut announces itself.
 */
export function parseColour(value: string): Rgb {
  const oklch = /^oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)$/.exec(value);
  if (oklch) return oklchToLinearRgb(Number(oklch[1]), Number(oklch[2]), Number(oklch[3]));
  if (/^#[0-9a-f]{6}$/i.test(value)) return hexToLinearRgb(value);
  throw new Error(`unrecognised colour notation: ${value}`);
}

const EPSILON = 1e-3;

/**
 * Whether a value survives the trip to a screen unchanged. A colour outside the
 * gamut gets clipped by the browser, which means the colour you measured is not
 * the colour anyone sees — so its contrast figure is fiction.
 */
export const inSrgbGamut = (value: string) =>
  parseColour(value).every((c) => c >= -EPSILON && c <= 1 + EPSILON);

const clamp01 = (c: number) => Math.min(1, Math.max(0, c));

function relativeLuminance(value: string): number {
  const [r, g, b] = parseColour(value);
  return 0.2126 * clamp01(r) + 0.7152 * clamp01(g) + 0.0722 * clamp01(b);
}

/** WCAG 2.1 contrast ratio, rounded to 2dp so failures read like the spec. */
export function contrastRatio(a: string, b: string): number {
  const la = relativeLuminance(a);
  const lb = relativeLuminance(b);
  const [hi, lo] = la >= lb ? [la, lb] : [lb, la];
  return Math.round(((hi + 0.05) / (lo + 0.05)) * 100) / 100;
}

/* ------------------------------------------------------------------ mixing */

/** Linear sRGB → OKLab, the inverse of the matrices above. */
function linearRgbToOklab([r, g, b]: Rgb): Rgb {
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ];
}

/** Any supported notation → OKLab. */
export function toOklab(value: string): Rgb {
  return linearRgbToOklab(parseColour(value));
}

/**
 * `color-mix()` in `oklab` or `oklch`, as CSS computes it: interpolate in the
 * named space, with `oklch` going the short way round the hue circle.
 *
 * Only the two polar/rectangular OKLab spaces are supported, which is all
 * `theme.css` uses — anything else throws rather than quietly returning a
 * plausible-but-wrong colour.
 */
export function mixColours(space: string, a: string, aPercent: number, b: string): string {
  const wa = aPercent / 100;
  const wb = 1 - wa;

  if (space === "oklab") {
    const [al, aa, ab] = toOklab(a);
    const [bl, ba, bb] = toOklab(b);
    const L = al * wa + bl * wb;
    const A = aa * wa + ba * wb;
    const B = ab * wa + bb * wb;
    const hue = (Math.atan2(B, A) * 180) / Math.PI;
    return `oklch(${L} ${Math.hypot(A, B)} ${hue < 0 ? hue + 360 : hue})`;
  }

  if (space === "oklch") {
    const [al, aa, ab] = toOklab(a);
    const [bl, ba, bb] = toOklab(b);
    const [aC, aH] = [Math.hypot(aa, ab), Math.atan2(ab, aa)];
    const [bC, bH] = [Math.hypot(ba, bb), Math.atan2(bb, ba)];
    // Shortest arc, matching CSS's default `shorter hue` interpolation.
    let delta = bH - aH;
    if (delta > Math.PI) delta -= 2 * Math.PI;
    if (delta < -Math.PI) delta += 2 * Math.PI;
    const H = aH + delta * wb;
    const L = al * wa + bl * wb;
    const C = aC * wa + bC * wb;
    const deg = (H * 180) / Math.PI;
    return `oklch(${L} ${C} ${deg < 0 ? deg + 360 : deg})`;
  }

  throw new Error(`unsupported color-mix space: ${space}`);
}

/** The sRGB hex a value resolves to, for showing alongside its OKLCH source. */
export function toHex(value: string): string {
  const encode = (c: number) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);
  return `#${parseColour(value)
    .map((c) =>
      Math.round(clamp01(encode(clamp01(c))) * 255)
        .toString(16)
        .padStart(2, "0"),
    )
    .join("")}`;
}
