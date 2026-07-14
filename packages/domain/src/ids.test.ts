import { describe, expect, it } from "vitest";

import { InvalidIdentifierError, asWorkspaceId } from "./ids.js";

describe("workspace identifiers", () => {
  it("accepts UUID values", () => {
    expect(asWorkspaceId("11111111-1111-4111-8111-111111111111")).toBe(
      "11111111-1111-4111-8111-111111111111",
    );
  });

  it("rejects values that cannot provide a workspace boundary", () => {
    expect(() => asWorkspaceId("")).toThrow(InvalidIdentifierError);
  });
});
