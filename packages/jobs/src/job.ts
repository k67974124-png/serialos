import type { JobId, RequestId, WorkspaceId } from "@serialos/domain";

export const JOB_STATUSES = [
  "queued",
  "running",
  "retry_scheduled",
  "succeeded",
  "failed",
  "dead_letter",
  "canceled",
] as const;

export type JobStatus = (typeof JOB_STATUSES)[number];

export interface JobReference {
  readonly id: JobId;
  readonly status: JobStatus;
  readonly workspaceId: WorkspaceId;
}

export interface JobCorrelation {
  readonly requestId: RequestId;
  readonly traceId: string;
}

export interface JobCheckpoint {
  readonly completedSteps: readonly string[];
  readonly providerRequestIds: Readonly<Record<string, string>>;
  readonly resultIds: Readonly<Record<string, string>>;
}

export interface MinimalJobPayload {
  readonly [key: string]: number | string;
}

export interface JobLease extends JobReference, JobCorrelation {
  readonly attempt: number;
  readonly checkpoint: JobCheckpoint;
  readonly currentStep: string | null;
  readonly lockedBy: string;
  readonly maxAttempts: number;
  readonly payload: MinimalJobPayload;
  readonly progress: number;
  readonly type: string;
}

export interface EnqueueJobInput extends JobCorrelation {
  readonly availableAt?: Date;
  readonly dedupeKey?: string;
  readonly maxAttempts?: number;
  readonly payload: MinimalJobPayload;
  readonly priority?: number;
  readonly type: string;
  readonly workspaceId: WorkspaceId;
}

export interface SafeJobError {
  readonly code: string;
  readonly retryable: boolean;
}

export interface RetryResult {
  readonly availableAt: Date | null;
  readonly status: "canceled" | "dead_letter" | "retry_scheduled";
}

export class JobStateConflictError extends Error {
  public constructor() {
    super("The job lease or state no longer permits this transition");
    this.name = "JobStateConflictError";
  }
}

export class JobExecutionError extends Error {
  public readonly safeError: SafeJobError;

  public constructor(safeError: SafeJobError) {
    super("Job execution failed with a classified error");
    this.name = "JobExecutionError";
    this.safeError = safeError;
  }
}

export function emptyCheckpoint(): JobCheckpoint {
  return { completedSteps: [], providerRequestIds: {}, resultIds: {} };
}

export function isCheckpointStepComplete(checkpoint: JobCheckpoint, step: string): boolean {
  return checkpoint.completedSteps.includes(step);
}
