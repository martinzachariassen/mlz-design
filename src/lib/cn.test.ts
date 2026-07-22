import { describe, expect, it } from "vitest";
import { cn } from "./cn";

describe("cn", () => {
  it("joins truthy class names", () => {
    expect(cn("a", "b", false, null, undefined, "c")).toBe("a b c");
  });

  it("lets later Tailwind utilities win on conflict", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
    expect(cn("text-foreground", "text-accent")).toBe("text-accent");
  });

  it("merges conditional objects and arrays", () => {
    expect(cn(["a", { b: true, c: false }], "d")).toBe("a b d");
  });
});
