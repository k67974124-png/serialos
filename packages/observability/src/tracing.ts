import { SpanStatusCode, trace, type Span, type Tracer } from "@opentelemetry/api";

import type { CorrelationContext } from "./correlation.js";

export interface SpanHandle {
  end(): void;
  fail(code: string): void;
  setAttribute(name: string, value: boolean | number | string): void;
}

export interface TracerPort {
  startSpan(name: string, correlation: CorrelationContext): SpanHandle;
}

class OpenTelemetrySpanHandle implements SpanHandle {
  readonly #span: Span;

  public constructor(span: Span) {
    this.#span = span;
  }

  public end(): void {
    this.#span.end();
  }

  public fail(code: string): void {
    this.#span.setAttribute("error.code", code);
    this.#span.setStatus({ code: SpanStatusCode.ERROR });
  }

  public setAttribute(name: string, value: boolean | number | string): void {
    this.#span.setAttribute(name, value);
  }
}

export class OpenTelemetryTracer implements TracerPort {
  readonly #tracer: Tracer;

  public constructor(name = "serialos", version = "0.0.0") {
    this.#tracer = trace.getTracer(name, version);
  }

  public startSpan(name: string, correlation: CorrelationContext): SpanHandle {
    const span = this.#tracer.startSpan(name, {
      attributes: {
        "serialos.request.id": correlation.requestId,
        "serialos.trace.id": correlation.traceId,
        ...(correlation.jobId === undefined ? {} : { "serialos.job.id": correlation.jobId }),
        ...(correlation.providerRequestId === undefined
          ? {}
          : { "serialos.provider.request_id": correlation.providerRequestId }),
      },
    });
    return new OpenTelemetrySpanHandle(span);
  }
}
