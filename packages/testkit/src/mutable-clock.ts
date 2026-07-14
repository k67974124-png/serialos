import type { Clock } from "@serialos/application";

export class MutableClock implements Clock {
  #instant: Date;

  public constructor(instant: Date) {
    this.#instant = new Date(instant);
  }

  public advance(milliseconds: number): void {
    this.#instant = new Date(this.#instant.getTime() + milliseconds);
  }

  public now(): Date {
    return new Date(this.#instant);
  }
}
