import type { IdGenerator } from "@serialos/application";

export class SequenceIdGenerator implements IdGenerator {
  readonly #ids: readonly string[];
  #index = 0;

  public constructor(ids: readonly string[]) {
    this.#ids = ids;
  }

  public generate(): string {
    const id = this.#ids[this.#index];
    if (id === undefined) {
      throw new Error("Deterministic ID sequence is exhausted");
    }
    this.#index += 1;
    return id;
  }
}
