ALTER TABLE jobs
  ADD COLUMN progress numeric(5,4) NOT NULL DEFAULT 0,
  ADD COLUMN current_step text,
  ADD COLUMN checkpoint jsonb NOT NULL DEFAULT '{}'::jsonb,
  ADD COLUMN cancel_requested_at timestamptz,
  ADD COLUMN dead_lettered_at timestamptz,
  ADD CONSTRAINT jobs_progress_range CHECK (progress >= 0 AND progress <= 1);

DROP INDEX jobs_available_idx;
CREATE INDEX jobs_available_idx
  ON jobs(priority DESC, available_at, created_at)
  WHERE status IN ('queued', 'retry_scheduled');

CREATE FUNCTION reject_audit_log_mutation()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  RAISE EXCEPTION USING
    ERRCODE = '55000',
    MESSAGE = 'audit_logs are append-only';
END;
$$;

CREATE TRIGGER audit_logs_append_only
BEFORE UPDATE OR DELETE ON audit_logs
FOR EACH ROW
EXECUTE FUNCTION reject_audit_log_mutation();
