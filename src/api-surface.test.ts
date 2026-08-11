/**
 * The public API surface, pinned.
 *
 * This is the one class of change that can break every downstream project at
 * once with no other gate noticing: deleting or renaming an export. The dist
 * staleness check only proves dist was rebuilt — a removal rebuilds cleanly.
 * Here, every entry point's runtime exports are compared against a committed
 * inventory, so a removal (or an accidental addition) becomes a reviewable
 * diff in the PR instead of a surprise in a consumer's build.
 *
 * When the diff is intentional: re-run with `vitest -u` to update the
 * snapshot, and pick the changeset bump per docs/VERSIONING.md — removals and
 * renames are breaking.
 *
 * Type-only exports don't exist at runtime, so they are not covered here; the
 * d.ts diff in the PR is their review surface.
 */

import { describe, expect, it } from "vitest";

describe("public API surface", () => {
  it("root entry matches the committed inventory", async () => {
    const api = await import("./index");
    await expect(`${Object.keys(api).sort().join("\n")}\n`).toMatchFileSnapshot(
      "__snapshots__/api-surface-index.txt",
    );
  });

  it("./tokens matches the committed inventory", async () => {
    const api = await import("./tokens");
    await expect(`${Object.keys(api).sort().join("\n")}\n`).toMatchFileSnapshot(
      "__snapshots__/api-surface-tokens.txt",
    );
  });

  it("./toaster matches the committed inventory", async () => {
    const api = await import("./toaster");
    await expect(`${Object.keys(api).sort().join("\n")}\n`).toMatchFileSnapshot(
      "__snapshots__/api-surface-toaster.txt",
    );
  });

  it("package.json exports every entry the inventories cover", async () => {
    const pkg = (await import("../package.json")) as {
      exports: Record<string, unknown>;
    };
    for (const entry of [".", "./tokens", "./toaster"]) {
      expect(pkg.exports[entry], `${entry} missing from package.json exports`).toBeDefined();
    }
  });
});
