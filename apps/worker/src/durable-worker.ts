import { randomUUID } from "node:crypto";

import type { Clock, IdGenerator } from "@serialos/application";
import { PostgresTransactionManager } from "@serialos/db";
import {
  GracefulWorkerRuntime,
  JobExecutionError,
  PostgresJobQueue,
  PostgresOutboxDispatcher,
  type JobHandler,
  type JobLease,
} from "@serialos/jobs";
import {
  InMemoryMetricsRegistry,
  OpenTelemetryTracer,
  StructuredLogger,
  type TracerPort,
} from "@serialos/observability";
import { Pool } from "pg";

const DEFAULT_POLL_INTERVAL_MS = 250;

export interface WorkerRuntimeController {
  close(): Promise<void>;
  shutdown(drainTimeoutMs: number): Promise<boolean>;
  start(): void;
}

export interface PostgresWorkerRuntimeOptions {
  readonly concurrency: number;
  readonly databaseUrl: string;
  readonly handlers?: ReadonlyMap<string, JobHandler>;
  readonly leaseDurationMs: number;
  readonly logger?: StructuredLogger;
  readonly metrics?: InMemoryMetricsRegistry;
  readonly pollIntervalMs?: number;
  readonly tracer?: TracerPort;
  readonly workerId?: string;
}

interface OutboxDispatcher {
  dispatchNext(): Promise<
    | Readonly<{
        jobId: string;
        requestId: string;
        traceId: string;
        workspaceId: string;
      }>
    | undefined
  >;
}

interface PoolErrorEmitter {
  on(event: "error", listener: (error: Error) => void): unknown;
}

export function observeWorkerPoolErrors(
  pool: PoolErrorEmitter,
  logger: StructuredLogger,
  metrics: InMemoryMetricsRegistry,
): void {
  pool.on("error", () => {
    metrics.increment("worker_database_pool_total", 1, { result: "failed" });
    logger.log("error", "worker.database_pool_error", { result: "QUEUE_OPERATION_FAILED" });
  });
}

function waitForPoll(signal: AbortSignal, milliseconds: number): Promise<void> {
  if (signal.aborted) {
    return Promise.resolve();
  }
  return new Promise((resolve) => {
    const finish = (): void => {
      clearTimeout(timer);
      signal.removeEventListener("abort", finish);
      resolve();
    };
    const timer = setTimeout(finish, milliseconds);
    signal.addEventListener("abort", finish, { once: true });
  });
}

function instrumentHandler(
  handlers: ReadonlyMap<string, JobHandler>,
  logger: StructuredLogger,
  metrics: InMemoryMetricsRegistry,
  tracer: TracerPort,
): JobHandler {
  return async (lease: JobLease, signal: AbortSignal): Promise<void> => {
    const correlation = {
      jobId: lease.id,
      requestId: lease.requestId,
      traceId: lease.traceId,
    };
    const span = tracer.startSpan("job.handler", correlation);
    logger.log("info", "job.handler_started", correlation);
    try {
      const handler = handlers.get(lease.type);
      if (handler === undefined) {
        const classified = new JobExecutionError({
          code: "JOB_TYPE_UNSUPPORTED",
          retryable: false,
        });
        span.fail(classified.safeError.code);
        metrics.increment("jobs_handler_total", 1, { result: "unsupported" });
        logger.log("warn", "job.handler_rejected", {
          ...correlation,
          result: classified.safeError.code,
        });
        throw classified;
      }
      await handler(lease, signal);
      metrics.increment("jobs_handler_total", 1, { result: "completed" });
      logger.log("info", "job.handler_completed", { ...correlation, result: "completed" });
    } catch (error) {
      const code = error instanceof JobExecutionError ? error.safeError.code : "JOB_HANDLER_FAILED";
      span.fail(code);
      metrics.increment("jobs_handler_total", 1, { result: "failed" });
      logger.log("error", "job.handler_failed", { ...correlation, result: code });
      throw error;
    } finally {
      span.end();
    }
  };
}

class DurableWorkerLoop implements WorkerRuntimeController {
  readonly #abort = new AbortController();
  readonly #concurrency: number;
  #loops: readonly Promise<void>[] = [];
  readonly #logger: StructuredLogger;
  readonly #metrics: InMemoryMetricsRegistry;
  readonly #outbox: OutboxDispatcher;
  readonly #pollIntervalMs: number;
  readonly #pool: Pool;
  readonly #runtime: GracefulWorkerRuntime;
  #started = false;

  public constructor(
    pool: Pool,
    runtime: GracefulWorkerRuntime,
    outbox: OutboxDispatcher,
    logger: StructuredLogger,
    metrics: InMemoryMetricsRegistry,
    concurrency: number,
    pollIntervalMs: number,
  ) {
    this.#pool = pool;
    this.#runtime = runtime;
    this.#outbox = outbox;
    this.#logger = logger;
    this.#metrics = metrics;
    this.#concurrency = concurrency;
    this.#pollIntervalMs = pollIntervalMs;
  }

  public start(): void {
    if (this.#started) {
      throw new Error("Durable Worker runtime has already started");
    }
    this.#started = true;
    this.#loops = Array.from({ length: this.#concurrency }, () => this.#runLoop());
  }

  async #runLoop(): Promise<void> {
    while (!this.#abort.signal.aborted) {
      let didWork = false;
      try {
        const dispatched = await this.#outbox.dispatchNext();
        if (dispatched !== undefined) {
          didWork = true;
          this.#metrics.increment("outbox_dispatched_total", 1, { result: "queued" });
          this.#logger.log("info", "outbox.dispatched", {
            jobId: dispatched.jobId,
            requestId: dispatched.requestId,
            result: "queued",
            traceId: dispatched.traceId,
            workspaceId: dispatched.workspaceId,
          });
        }
        didWork = (await this.#runtime.processNext()) || didWork;
      } catch {
        this.#metrics.increment("worker_loop_total", 1, { result: "failed" });
        this.#logger.log("error", "worker.loop_failed", { result: "QUEUE_OPERATION_FAILED" });
      }
      if (!didWork) {
        await waitForPoll(this.#abort.signal, this.#pollIntervalMs);
      }
    }
  }

  public async shutdown(drainTimeoutMs: number): Promise<boolean> {
    this.#abort.abort();
    const drained = await this.#runtime.shutdown(drainTimeoutMs);
    await Promise.all(this.#loops);
    this.#logger.log(drained ? "info" : "warn", "worker.drain_completed", {
      result: drained ? "drained" : "lease_released",
    });
    return drained;
  }

  public async close(): Promise<void> {
    await this.#pool.end();
  }
}

export function createPostgresWorkerRuntime(
  options: PostgresWorkerRuntimeOptions,
): WorkerRuntimeController {
  if (
    !Number.isInteger(options.concurrency) ||
    options.concurrency < 1 ||
    options.concurrency > 64
  ) {
    throw new RangeError("Worker concurrency is invalid");
  }
  const pollIntervalMs = options.pollIntervalMs ?? DEFAULT_POLL_INTERVAL_MS;
  if (!Number.isInteger(pollIntervalMs) || pollIntervalMs < 10 || pollIntervalMs > 60_000) {
    throw new RangeError("Worker poll interval is invalid");
  }
  const clock: Clock = { now: () => new Date() };
  const ids: IdGenerator = { generate: () => randomUUID() };
  const logger = options.logger ?? new StructuredLogger(process.stdout, clock, "info");
  const metrics = options.metrics ?? new InMemoryMetricsRegistry();
  const tracer = options.tracer ?? new OpenTelemetryTracer("serialos-worker");
  const pool = new Pool({
    connectionString: options.databaseUrl,
    connectionTimeoutMillis: 2_000,
    max: Math.min(20, Math.max(4, options.concurrency * 2)),
    query_timeout: 5_000,
    statement_timeout: 5_000,
  });
  observeWorkerPoolErrors(pool, logger, metrics);
  const transactions = new PostgresTransactionManager(pool);
  const queue = new PostgresJobQueue(transactions, clock, ids);
  const handler = instrumentHandler(options.handlers ?? new Map(), logger, metrics, tracer);
  const runtime = new GracefulWorkerRuntime(
    queue,
    options.workerId ?? `worker-${String(process.pid)}-${randomUUID()}`,
    options.leaseDurationMs,
    handler,
  );
  const outbox = new PostgresOutboxDispatcher(transactions, clock, ids);
  return new DurableWorkerLoop(
    pool,
    runtime,
    outbox,
    logger,
    metrics,
    options.concurrency,
    pollIntervalMs,
  );
}
