/**
 * Pack PNG buffers into a single `.ico`. Uses the PNG-in-ICO encoding (each
 * directory entry points at a whole PNG), which every current browser and OS
 * reads — no BMP fiddling, no extra dependency.
 */
export function encodeIco(pngs: { size: number; data: Uint8Array }[]): Uint8Array {
  const count = pngs.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: 1 = icon
  header.writeUInt16LE(count, 4);

  const entries: Buffer[] = [];
  let offset = 6 + count * 16;
  for (const { size, data } of pngs) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // width (0 => 256)
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
    entry.writeUInt8(0, 2); // palette count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // colour planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(data.length, 8); // image byte size
    entry.writeUInt32LE(offset, 12); // image offset
    entries.push(entry);
    offset += data.length;
  }

  return Buffer.concat([header, ...entries, ...pngs.map((p) => Buffer.from(p.data))]);
}
