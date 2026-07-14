import { createHash } from "node:crypto";

export interface BackoffOptions {
  readonly initialDelayMs: number;
  readonly jitterRatio: number;
  readonly maximumDelayMs: number;
}

export const DEFAULT_BACKOFF_OPTIONS: BackoffOptions = {
  initialDelayMs: 1_000,
  jitterRatio: 0.2,
  maximumDelayMs: 300_000,
};

export function calculateRetryDelayMs(
  jobId: string,
  attempt: number,
  options: BackoffOptions = DEFAULT_BACKOFF_OPTIONS,
): number {
  if (!Number.isInteger(attempt) || attempt < 1) {
    throw new RangeError("Attempt must be a positive integer");
  }
  if (
    options.initialDelayMs < 1 ||
    options.maximumDelayMs < options.initialDelayMs ||
    options.jitterRatio < 0 ||
    options.jitterRatio > 1
  ) {
    throw new RangeError("Backoff options are invalid");
  }

  const exponential = Math.min(
    options.maximumDelayMs,
    options.initialDelayMs * 2 ** Math.min(attempt - 1, 30),
  );
  const digest = createHash("sha256")
    .update(`${jobId}:${String(attempt)}`)
    .digest();
  const unit = digest.readUInt32BE(0) / 0xffffffff;
  const jitter = 1 - options.jitterRatio + unit * options.jitterRatio * 2;
  return Math.max(1, Math.round(exponential * jitter));
}
