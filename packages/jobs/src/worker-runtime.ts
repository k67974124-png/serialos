import type { JobLease } from "./job.js";
import type { JobQueue } from "./postgres-job-queue.js";

export type JobHandler = (lease: JobLease, signal: AbortSignal) => Promise<void>;

interface ActiveJob {
  readonly controller: AbortController;
  forcedReleased: boolean;
  readonly lease: JobLease;
  promise: Promise<void>;
}

export class GracefulWorkerRuntime {
  readonly #active = new Map<string, ActiveJob>();
  #acceptingClaims = true;
  readonly #handler: JobHandler;
  readonly #leaseDurationMs: number;
  readonly #queue: JobQueue;
  readonly #workerId: string;

  public constructor(
    queue: JobQueue,
    workerId: string,
    leaseDurationMs: number,
    handler: JobHandler,
  ) {
    this.#queue = queue;
    this.#workerId = workerId;
    this.#leaseDurationMs = leaseDurationMs;
    this.#handler = handler;
  }

  public get acceptingClaims(): boolean {
    return this.#acceptingClaims;
  }

  public get activeCount(): number {
    return this.#active.size;
  }

  #canAcceptClaims(): boolean {
    return this.#acceptingClaims;
  }

  public async processNext(): Promise<boolean> {
    if (!this.#canAcceptClaims()) {
      return false;
    }
    const lease = await this.#queue.claim(this.#workerId, this.#leaseDurationMs);
    if (lease === undefined) {
      return false;
    }
    if (!this.#canAcceptClaims()) {
      await this.#queue.releaseLease(lease);
      return false;
    }

    const controller = new AbortController();
    const active: ActiveJob = {
      controller,
      forcedReleased: false,
      lease,
      promise: Promise.resolve(),
    };
    active.promise = this.#execute(active);
    this.#active.set(lease.id, active);
    try {
      await active.promise;
      return true;
    } finally {
      this.#active.delete(lease.id);
    }
  }

  async #execute(active: ActiveJob): Promise<void> {
    try {
      await this.#handler(active.lease, active.controller.signal);
      if (active.forcedReleased) {
        return;
      }
      if (active.controller.signal.aborted) {
        await this.#queue.releaseLease(active.lease);
        return;
      }
      await this.#queue.succeed(active.lease);
    } catch (error) {
      if (active.forcedReleased) {
        return;
      }
      if (active.controller.signal.aborted) {
        await this.#queue.releaseLease(active.lease);
        return;
      }
      await this.#queue.retry(active.lease, { code: "JOB_HANDLER_FAILED", retryable: true });
      if (error instanceof Error && error.name === "JobStateConflictError") {
        throw error;
      }
    }
  }

  public async shutdown(drainTimeoutMs: number): Promise<boolean> {
    if (!Number.isInteger(drainTimeoutMs) || drainTimeoutMs < 0) {
      throw new RangeError("Drain timeout is invalid");
    }
    this.#acceptingClaims = false;
    const activeJobs = [...this.#active.values()];
    for (const active of activeJobs) {
      active.controller.abort();
    }
    if (activeJobs.length === 0) {
      return true;
    }

    let timer: ReturnType<typeof setTimeout> | undefined;
    const drained = await Promise.race([
      Promise.allSettled(activeJobs.map((active) => active.promise)).then(() => true),
      new Promise<boolean>((resolve) => {
        timer = setTimeout(() => {
          resolve(false);
        }, drainTimeoutMs);
      }),
    ]);
    if (timer !== undefined) {
      clearTimeout(timer);
    }
    if (!drained) {
      for (const active of activeJobs) {
        active.forcedReleased = true;
        await this.#queue.releaseLease(active.lease);
      }
    }
    return drained;
  }
}
