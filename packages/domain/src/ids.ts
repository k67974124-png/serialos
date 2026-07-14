declare const serialOsIdBrand: unique symbol;

type BrandedId<Name extends string> = string & {
  readonly [serialOsIdBrand]: Name;
};

export type WorkspaceId = BrandedId<"WorkspaceId">;
export type RequestId = BrandedId<"RequestId">;
export type JobId = BrandedId<"JobId">;

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu;

export class InvalidIdentifierError extends Error {
  public constructor(kind: string) {
    super(`${kind} must be a UUID`);
    this.name = "InvalidIdentifierError";
  }
}

function asId<Name extends string>(value: string, kind: Name): BrandedId<Name> {
  if (!UUID_PATTERN.test(value)) {
    throw new InvalidIdentifierError(kind);
  }

  return value as BrandedId<Name>;
}

export function asWorkspaceId(value: string): WorkspaceId {
  return asId(value, "WorkspaceId");
}

export function asRequestId(value: string): RequestId {
  return asId(value, "RequestId");
}

export function asJobId(value: string): JobId {
  return asId(value, "JobId");
}
