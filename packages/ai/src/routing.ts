export type ModelPurpose = "draft" | "edit" | "embed" | "extract" | "transcribe" | "web_research";

export interface ModelPricing {
  readonly inputMicrosUsdPerMillionTokens: bigint;
  readonly outputMicrosUsdPerMillionTokens: bigint;
}

export interface ModelRoute {
  readonly modelId: string;
  readonly pricing: ModelPricing;
  readonly provider: string;
  readonly reasoningLevel: string;
}

export interface ModelRoutingPolicy {
  route(purpose: ModelPurpose): ModelRoute;
}

export class MissingModelRouteError extends Error {
  public constructor(purpose: ModelPurpose) {
    super(`No configured model route for ${purpose}`);
    this.name = "MissingModelRouteError";
  }
}

export class ConfiguredModelRoutingPolicy implements ModelRoutingPolicy {
  readonly #routes: Readonly<Partial<Record<ModelPurpose, ModelRoute>>>;

  public constructor(routes: Readonly<Partial<Record<ModelPurpose, ModelRoute>>>) {
    this.#routes = routes;
  }

  public route(purpose: ModelPurpose): ModelRoute {
    const route = this.#routes[purpose];
    if (route === undefined) {
      throw new MissingModelRouteError(purpose);
    }
    if (
      route.modelId.length === 0 ||
      route.provider.length === 0 ||
      route.reasoningLevel.length === 0 ||
      route.pricing.inputMicrosUsdPerMillionTokens < 0n ||
      route.pricing.outputMicrosUsdPerMillionTokens < 0n
    ) {
      throw new RangeError("Configured model route is invalid");
    }
    return route;
  }
}
