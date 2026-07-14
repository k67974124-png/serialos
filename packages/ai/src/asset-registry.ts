const ASSET_ID_PATTERN = /^[a-z][a-z0-9_.-]{1,99}$/u;
const VERSION_PATTERN = /^\d+\.\d+\.\d+$/u;

export interface VersionedAssetReference {
  readonly contentHash: string;
  readonly id: string;
  readonly version: string;
}

export class InvalidAssetReferenceError extends Error {
  public constructor() {
    super("Versioned prompt/schema reference is invalid");
    this.name = "InvalidAssetReferenceError";
  }
}

export class ImmutableAssetRegistry {
  readonly #assets = new Map<string, VersionedAssetReference>();

  public register(reference: VersionedAssetReference): void {
    if (
      !ASSET_ID_PATTERN.test(reference.id) ||
      !VERSION_PATTERN.test(reference.version) ||
      !/^[a-f0-9]{64}$/u.test(reference.contentHash)
    ) {
      throw new InvalidAssetReferenceError();
    }
    const key = `${reference.id}@${reference.version}`;
    const existing = this.#assets.get(key);
    if (existing !== undefined && existing.contentHash !== reference.contentHash) {
      throw new InvalidAssetReferenceError();
    }
    this.#assets.set(key, Object.freeze({ ...reference }));
  }

  public get(id: string, version: string): VersionedAssetReference | undefined {
    return this.#assets.get(`${id}@${version}`);
  }
}
