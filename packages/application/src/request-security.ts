const SAFE_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);

export class UntrustedRequestOriginError extends Error {
  public constructor() {
    super("Request origin is not trusted");
    this.name = "UntrustedRequestOriginError";
  }
}

export function assertTrustedRequestOrigin(
  method: string,
  origin: string | null | undefined,
  applicationUrl: string,
): void {
  if (SAFE_METHODS.has(method.toUpperCase())) {
    return;
  }
  try {
    const expectedOrigin = new URL(applicationUrl).origin;
    if (origin === null || origin === undefined || new URL(origin).origin !== expectedOrigin) {
      throw new UntrustedRequestOriginError();
    }
  } catch (error) {
    if (error instanceof UntrustedRequestOriginError) {
      throw error;
    }
    throw new UntrustedRequestOriginError();
  }
}
