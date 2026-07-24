import { describe, expect, it } from "vitest";
import { encodeIco } from "./ico";

/** Read the packed .ico back into its header + directory entries for assertions. */
function parseIco(bytes: Uint8Array) {
  const b = Buffer.from(bytes);
  const count = b.readUInt16LE(4);
  const entries = Array.from({ length: count }, (_, i) => {
    const o = 6 + i * 16;
    return {
      width: b.readUInt8(o),
      height: b.readUInt8(o + 1),
      planes: b.readUInt16LE(o + 4),
      bpp: b.readUInt16LE(o + 6),
      length: b.readUInt32LE(o + 8),
      offset: b.readUInt32LE(o + 12),
    };
  });
  return {
    reserved: b.readUInt16LE(0),
    type: b.readUInt16LE(2),
    count,
    entries,
    slice: (o: number, len: number) => b.subarray(o, o + len),
  };
}

describe("encodeIco", () => {
  const png16 = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 1, 2, 3]); // 7 bytes
  const png32 = new Uint8Array(Array.from({ length: 40 }, (_, i) => i)); // 40 bytes

  it("writes a well-formed ICONDIR header", () => {
    const ico = parseIco(encodeIco([{ size: 16, data: png16 }]));
    expect(ico.reserved).toBe(0);
    expect(ico.type).toBe(1); // 1 = icon
    expect(ico.count).toBe(1);
  });

  it("records each image's declared size, planes and bit depth", () => {
    const ico = parseIco(
      encodeIco([
        { size: 16, data: png16 },
        { size: 32, data: png32 },
      ]),
    );
    expect(ico.count).toBe(2);
    expect(ico.entries.map((e) => e.width)).toEqual([16, 32]);
    expect(ico.entries.map((e) => e.height)).toEqual([16, 32]);
    for (const e of ico.entries) {
      expect(e.planes).toBe(1);
      expect(e.bpp).toBe(32);
    }
  });

  it("lays out offsets after the directory and packs data contiguously", () => {
    const ico = parseIco(
      encodeIco([
        { size: 16, data: png16 },
        { size: 32, data: png32 },
      ]),
    );
    const dirEnd = 6 + 2 * 16;
    expect(ico.entries[0].offset).toBe(dirEnd);
    expect(ico.entries[0].length).toBe(png16.length);
    expect(ico.entries[1].offset).toBe(dirEnd + png16.length);
    expect(ico.entries[1].length).toBe(png32.length);
  });

  it("round-trips the embedded PNG bytes untouched", () => {
    const bytes = encodeIco([
      { size: 16, data: png16 },
      { size: 32, data: png32 },
    ]);
    const ico = parseIco(bytes);
    expect(ico.slice(ico.entries[0].offset, ico.entries[0].length)).toEqual(Buffer.from(png16));
    expect(ico.slice(ico.entries[1].offset, ico.entries[1].length)).toEqual(Buffer.from(png32));
    // Total size = header + directory + all image data.
    expect(bytes.length).toBe(6 + 2 * 16 + png16.length + png32.length);
  });

  it("encodes 256px as the 0 sentinel in the width/height bytes", () => {
    const ico = parseIco(encodeIco([{ size: 256, data: png32 }]));
    expect(ico.entries[0].width).toBe(0);
    expect(ico.entries[0].height).toBe(0);
  });
});
