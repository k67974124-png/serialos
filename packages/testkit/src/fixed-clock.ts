import type { Clock } from "@serialos/application";

export class FixedClock implements Clock {
  readonly #instant: Date;

  public constructor(instant: Date) {
    this.#instant = new Date(instant);
  }

  public now(): Date {
    return new Date(this.#instant);
  }
}
