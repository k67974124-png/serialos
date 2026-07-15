# `@serialos/jobs`

This package implements the accepted ADR-0003 PostgreSQL queue and transactional outbox over the database transaction boundary. It intentionally adds no Redis, broker, timer-backed in-memory queue or provider SDK.

Job payloads accept only resource IDs and versions. Mutable recovery state, completed-step IDs and opaque provider request IDs live in the separately validated checkpoint.

New outbox events and jobs require a persisted request ID and trace ID. The production Worker dispatches outbox rows and claims PostgreSQL jobs with bounded concurrency; registered handlers receive the restored correlation context. An unknown job type is classified as non-retryable and dead-lettered, never treated as a successful no-op.
