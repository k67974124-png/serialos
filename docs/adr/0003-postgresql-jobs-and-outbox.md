# ADR-0003: PostgreSQL durable jobs and transactional outbox

- Status: accepted
- Date: 2026-07-12
- Owners: TBD
- Related requirements: E00-S04, FR-OPS-002, NFR-002, NFR-003

## Context

SerialOS requires durable, idempotent and retryable work with heartbeat, checkpoint, cancellation and crash recovery, while PostgreSQL is the single source of truth and Redis/Temporal are out of scope. The supplied schema already defines `jobs` and `outbox_events`, but `jobs` lacks fields needed by the E00 task and OpenAPI job representation.

## Decision

- Implement a small custom PostgreSQL queue over `jobs` and `outbox_events`.
- Claim available jobs with a short transaction using `FOR UPDATE SKIP LOCKED`, recording lease owner, lock time, heartbeat and incremented attempt.
- Add typed `progress`, `current_step`, `checkpoint`, `cancel_requested_at`, and `dead_lettered_at` fields through migration `0002_foundation_runtime` and reflect them in `db/schema.sql` and `docs/09-data-model.md`.
- Require lease-owner predicates for heartbeat, checkpoint, retry and success updates.
- Treat cancellation as cooperative for running jobs and immediate for unclaimed jobs. A success update must fail if cancellation was requested or lease ownership changed.
- Use exponential backoff with deterministic jitter derived from job ID and attempt.
- Dispatch outbox events by inserting/deduplicating the target job and marking the event published in the same PostgreSQL transaction.
- Keep payloads minimal and ID-based; do not store raw creator content in job/outbox payloads.
- Use event IDs and explicit business idempotency keys to suppress duplicate local side effects.

## Alternatives considered

- **pg-boss:** mature, but introduces a second queue schema/state model alongside the supplied `jobs` contract and makes the specified checkpoint/API fields indirect.
- **Redis/BullMQ:** rejected by architecture constraints and would add another source of truth.
- **Temporal or a separate service:** rejected as premature distributed infrastructure.
- **Use `payload` as mutable checkpoint:** rejected because immutable input and mutable execution state must not be conflated.

## Consequences

- Queue behavior remains transparent and transactionally aligned with business state.
- The team owns concurrency and recovery correctness; the implementation must stay deliberately small.
- Handlers must poll cancellation and persist checkpoint at safe boundaries.
- At-least-once delivery remains the transport guarantee; exactly-once external effects require provider IDs and reconciliation in later Epics.
- Queue replacement remains possible behind `JobQueue`, but requires an ADR and migration strategy.

## Validation

- two workers cannot both commit success for one job;
- an expired lease is reclaimed and resumes from checkpoint;
- stale owners cannot heartbeat or complete;
- cancellation wins over a late result;
- poison jobs enter dead letter without blocking the queue;
- duplicate outbox delivery produces one active job/local effect;
- worker graceful shutdown stops claims and persists/relinquishes work safely;
- payload/log fixtures contain no raw creator content.

