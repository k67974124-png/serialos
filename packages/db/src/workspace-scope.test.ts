import { asWorkspaceId } from "@serialos/domain";
import { describe, expect, it } from "vitest";

import { MissingWorkspaceScopeError, createWorkspaceScope } from "./workspace-scope.js";

describe("workspace scope", () => {
  it("fails closed when a workspace identifier is absent", () => {
    expect(() => createWorkspaceScope(undefined)).toThrow(MissingWorkspaceScopeError);
    expect(() => createWorkspaceScope(null)).toThrow(MissingWorkspaceScopeError);
  });

  it("retains a validated branded workspace identifier", () => {
    const workspaceId = asWorkspaceId("20000000-0000-4000-8000-000000000001");
    expect(createWorkspaceScope(workspaceId)).toEqual({ workspaceId });
  });
});
