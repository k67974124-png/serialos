ALTER TABLE outbox_events
  ADD COLUMN request_id uuid,
  ADD COLUMN trace_id text;

UPDATE outbox_events
SET request_id = gen_random_uuid(),
    trace_id = 'migration:' || id::text;

ALTER TABLE outbox_events
  ALTER COLUMN request_id SET NOT NULL,
  ALTER COLUMN trace_id SET NOT NULL,
  ADD CONSTRAINT outbox_correlation_pair CHECK (num_nonnulls(request_id, trace_id) IN (0, 2)),
  ADD CONSTRAINT outbox_trace_id_format CHECK (
    trace_id ~ '^[A-Za-z0-9][A-Za-z0-9_.:-]{0,127}$'
  );

ALTER TABLE jobs
  ADD COLUMN request_id uuid,
  ADD COLUMN trace_id text;

UPDATE jobs
SET request_id = gen_random_uuid(),
    trace_id = 'migration:' || id::text;

ALTER TABLE jobs
  ALTER COLUMN request_id SET NOT NULL,
  ALTER COLUMN trace_id SET NOT NULL,
  ADD CONSTRAINT jobs_correlation_pair CHECK (num_nonnulls(request_id, trace_id) IN (0, 2)),
  ADD CONSTRAINT jobs_trace_id_format CHECK (
    trace_id ~ '^[A-Za-z0-9][A-Za-z0-9_.:-]{0,127}$'
  );

CREATE INDEX jobs_request_idx
  ON jobs(workspace_id, request_id, created_at)
  WHERE request_id IS NOT NULL;
