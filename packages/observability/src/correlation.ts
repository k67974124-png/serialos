import type { JobId, RequestId } from "@serialos/domain";

export interface CorrelationContext {
  readonly jobId?: JobId;
  readonly providerRequestId?: string;
  readonly requestId: RequestId;
  readonly traceId: string;
}

export interface RequestCorrelation {
  readonly requestId: RequestId;
  readonly traceId: string;
}

export interface JobCorrelation extends RequestCorrelation {
  readonly jobId: JobId;
}

export interface ProviderCallCorrelation extends JobCorrelation {
  readonly providerRequestId: string;
}

export function correlateJob(request: RequestCorrelation, jobId: JobId): JobCorrelation {
  return { ...request, jobId };
}

export function correlateProviderCall(
  job: JobCorrelation,
  providerRequestId: string,
): ProviderCallCorrelation {
  if (providerRequestId.length === 0 || providerRequestId.length > 200) {
    throw new RangeError("Provider request ID is invalid");
  }
  return { ...job, providerRequestId };
}
