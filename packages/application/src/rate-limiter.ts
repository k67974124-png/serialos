import type { Clock } from "./system-ports.js";

export interface RateLimitPolicy {
  readonly limit: number;
  readonly windowMs: number;
}

export interface RateLimitDecision {
  readonly allowed: boolean;
  readonly limit: number;
  readonly remaining: number;
  readonly resetAt: Date;
  readonly retryAfterMs: number;
}

export interface RateLimiter {
  consume(key: string, policy: RateLimitPolicy): RateLimitDecision;
}

interface WindowState {
  count: number;
  startedAtMs: number;
}

export class InMemoryRateLimiter implements RateLimiter {
  readonly #clock: Clock;
  readonly #windows = new Map<string, WindowState>();

  public constructor(clock: Clock) {
    this.#clock = clock;
  }

  public consume(key: string, policy: RateLimitPolicy): RateLimitDecision {
    if (!/^[A-Za-z0-9:_-]{1,200}$/u.test(key)) {
      throw new RangeError("Rate-limit keys must be opaque non-PII identifiers");
    }
    if (
      !Number.isInteger(policy.limit) ||
      policy.limit < 1 ||
      !Number.isInteger(policy.windowMs) ||
      policy.windowMs < 1_000
    ) {
      throw new RangeError("Rate-limit policy is invalid");
    }

    const nowMs = this.#clock.now().getTime();
    const previous = this.#windows.get(key);
    const state =
      previous === undefined ||
      nowMs < previous.startedAtMs ||
      nowMs >= previous.startedAtMs + policy.windowMs
        ? { count: 0, startedAtMs: nowMs }
        : previous;
    const allowed = state.count < policy.limit;
    if (allowed) {
      state.count += 1;
    }
    this.#windows.set(key, state);
    const resetAtMs = state.startedAtMs + policy.windowMs;
    return {
      allowed,
      limit: policy.limit,
      remaining: Math.max(0, policy.limit - state.count),
      resetAt: new Date(resetAtMs),
      retryAfterMs: allowed ? 0 : Math.max(1, resetAtMs - nowMs),
    };
  }
}
