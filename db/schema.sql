-- SerialOS MVP reference schema.
-- Executable history lives under packages/db/migrations; this file describes the head schema.
-- PostgreSQL 16+ recommended; exact supported version must be pinned in E00.

CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TYPE workspace_status AS ENUM ('active', 'deleting', 'deleted', 'suspended');
CREATE TYPE member_role AS ENUM ('owner');
CREATE TYPE material_type AS ENUM ('text', 'markdown', 'audio', 'pdf', 'docx', 'image', 'url', 'comments');
CREATE TYPE material_status AS ENUM ('uploaded', 'processing', 'ready_for_enrichment', 'ready', 'needs_review', 'failed', 'archived', 'deleting', 'deleted');
CREATE TYPE privacy_level AS ENUM ('public_usable', 'internal_reference', 'do_not_quote');
CREATE TYPE confirmation_status AS ENUM ('suggested', 'confirmed', 'rejected', 'needs_review');
CREATE TYPE lifecycle_status AS ENUM ('active', 'hidden', 'merged', 'archived', 'deleted');
CREATE TYPE insight_asset_type AS ENUM (
  'opinion', 'story', 'case', 'fact', 'framework',
  'metaphor', 'audience_question', 'quote', 'contrarian_point'
);
CREATE TYPE topic_status AS ENUM ('candidate', 'shortlisted', 'selected', 'in_production', 'completed', 'archived');
CREATE TYPE run_status AS ENUM (
  'draft', 'queued', 'collecting_context', 'needs_input', 'needs_budget_approval',
  'briefing', 'generating', 'building_artifact', 'quality_check',
  'in_review', 'approved', 'exported', 'paused', 'cancel_requested', 'failed', 'canceled'
);
CREATE TYPE step_status AS ENUM ('pending', 'queued', 'running', 'succeeded', 'failed', 'canceled', 'skipped');
CREATE TYPE job_status AS ENUM ('queued', 'running', 'retry_scheduled', 'succeeded', 'failed', 'dead_letter', 'canceled');
CREATE TYPE content_asset_type AS ENUM (
  'master_article', 'video_script', 'carousel',
  'short_video', 'micro_post', 'shot_list'
);
CREATE TYPE content_asset_status AS ENUM ('draft', 'needs_review', 'approved', 'exported', 'published_recorded', 'deleted');
CREATE TYPE claim_type AS ENUM ('external_fact', 'personal_experience', 'opinion', 'inference', 'recommendation', 'quote');
CREATE TYPE support_status AS ENUM ('supported', 'weak', 'conflicting', 'unsupported', 'not_applicable');
CREATE TYPE finding_severity AS ENUM ('blocker', 'warning', 'info');
CREATE TYPE finding_status AS ENUM ('open', 'resolved', 'accepted_risk', 'dismissed');
CREATE TYPE artifact_type AS ENUM ('calculator', 'quiz', 'checklist');
CREATE TYPE artifact_status AS ENUM ('draft', 'validating', 'invalid', 'ready', 'building', 'built', 'failed', 'approved');
CREATE TYPE export_status AS ENUM ('queued', 'building', 'ready', 'failed', 'expired', 'deleted');
CREATE TYPE source_document_type AS ENUM (
  'user_direct', 'user_confirmed_history', 'interview_answer',
  'uploaded_document', 'web_primary', 'web_secondary',
  'comment', 'model_suggestion', 'system_calculation'
);
CREATE TYPE ai_call_status AS ENUM ('queued', 'running', 'succeeded', 'failed', 'canceled', 'cached');
CREATE TYPE deletion_status AS ENUM ('requested', 'reauth_required', 'queued', 'deleting', 'failed', 'completed', 'canceled');

CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  display_name text,
  status text NOT NULL DEFAULT 'active',
  last_login_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT users_email_normalized CHECK (email = lower(email))
);
CREATE UNIQUE INDEX users_email_unique ON users (email);

CREATE TABLE auth_magic_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  token_hash text NOT NULL,
  return_to text,
  expires_at timestamptz NOT NULL,
  used_at timestamptz,
  revoked_at timestamptz,
  request_ip_hash text,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT auth_magic_link_email_normalized CHECK (email = lower(email)),
  CONSTRAINT auth_magic_link_expiry CHECK (expires_at > created_at),
  UNIQUE (token_hash)
);
CREATE INDEX auth_magic_link_email_created_idx ON auth_magic_links(email, created_at DESC);

CREATE TABLE user_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash text NOT NULL,
  expires_at timestamptz NOT NULL,
  last_seen_at timestamptz,
  rotated_from_id uuid,
  revoked_at timestamptz,
  ip_hash text,
  user_agent_hash text,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT user_session_expiry CHECK (expires_at > created_at),
  UNIQUE (token_hash)
);
ALTER TABLE user_sessions
  ADD CONSTRAINT user_session_rotated_from_fk
  FOREIGN KEY (rotated_from_id) REFERENCES user_sessions(id) ON DELETE SET NULL;
CREATE INDEX user_sessions_active_user_idx
  ON user_sessions(user_id, expires_at DESC)
  WHERE revoked_at IS NULL;

CREATE TABLE workspaces (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL,
  locale text NOT NULL DEFAULT 'zh-CN',
  timezone text NOT NULL DEFAULT 'Asia/Shanghai',
  onboarding_status text NOT NULL DEFAULT 'not_started',
  status workspace_status NOT NULL DEFAULT 'active',
  settings jsonb NOT NULL DEFAULT '{}'::jsonb,
  version integer NOT NULL DEFAULT 1,
  deletion_requested_at timestamptz,
  deleted_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT workspaces_name_length CHECK (char_length(name) BETWEEN 1 AND 100),
  CONSTRAINT workspaces_slug_format CHECK (slug ~ '^[a-z0-9][a-z0-9-]{1,62}$')
);
CREATE UNIQUE INDEX workspaces_slug_unique ON workspaces (slug) WHERE deleted_at IS NULL;

CREATE TABLE workspace_members (
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role member_role NOT NULL DEFAULT 'owner',
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (workspace_id, user_id)
);
CREATE UNIQUE INDEX one_active_owner_per_workspace
  ON workspace_members (workspace_id)
  WHERE role = 'owner' AND status = 'active';

CREATE TABLE onboarding_progress (
  workspace_id uuid PRIMARY KEY REFERENCES workspaces(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'not_started',
  current_step integer NOT NULL DEFAULT 1,
  data jsonb NOT NULL DEFAULT '{}'::jsonb,
  postponed_column boolean NOT NULL DEFAULT false,
  version integer NOT NULL DEFAULT 1,
  completed_at timestamptz,
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT onboarding_status_check CHECK (status IN ('not_started', 'in_progress', 'completed')),
  CONSTRAINT onboarding_step_check CHECK (current_step BETWEEN 1 AND 6)
);

CREATE TABLE feature_flags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid REFERENCES workspaces(id) ON DELETE CASCADE,
  key text NOT NULL,
  enabled boolean NOT NULL DEFAULT false,
  config jsonb NOT NULL DEFAULT '{}'::jsonb,
  version integer NOT NULL DEFAULT 1,
  updated_by uuid REFERENCES users(id) ON DELETE SET NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX feature_flags_global_unique
  ON feature_flags(key) WHERE workspace_id IS NULL;
CREATE UNIQUE INDEX feature_flags_workspace_unique
  ON feature_flags(workspace_id, key) WHERE workspace_id IS NOT NULL;

CREATE TABLE creator_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  version integer NOT NULL,
  display_name text NOT NULL,
  positioning text NOT NULL,
  goals jsonb NOT NULL DEFAULT '[]'::jsonb,
  domains jsonb NOT NULL DEFAULT '[]'::jsonb,
  audiences jsonb NOT NULL DEFAULT '[]'::jsonb,
  voice jsonb NOT NULL DEFAULT '{}'::jsonb,
  boundaries jsonb NOT NULL DEFAULT '{}'::jsonb,
  confidence numeric(5,4) NOT NULL DEFAULT 0,
  evidence jsonb NOT NULL DEFAULT '[]'::jsonb,
  status text NOT NULL DEFAULT 'draft',
  confirmed_at timestamptz,
  created_by uuid REFERENCES users(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT creator_profile_confidence CHECK (confidence >= 0 AND confidence <= 1),
  UNIQUE (workspace_id, version)
);
CREATE UNIQUE INDEX one_active_creator_profile
  ON creator_profiles(workspace_id)
  WHERE status = 'active';

CREATE TABLE profile_suggestions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  base_profile_version integer,
  schema_version text NOT NULL,
  data jsonb NOT NULL,
  evidence jsonb NOT NULL DEFAULT '[]'::jsonb,
  confidence numeric(5,4) NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'ready',
  model_call_id uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT profile_suggestion_confidence CHECK (confidence >= 0 AND confidence <= 1)
);
CREATE INDEX profile_suggestions_workspace_created_idx
  ON profile_suggestions(workspace_id, created_at DESC);

CREATE TABLE terminology_rules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  canonical_term text NOT NULL,
  aliases jsonb NOT NULL DEFAULT '[]'::jsonb,
  usage_note text,
  status text NOT NULL DEFAULT 'active',
  version integer NOT NULL DEFAULT 1,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX terminology_rules_workspace_idx ON terminology_rules(workspace_id, status);

CREATE TABLE content_boundaries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  boundary_type text NOT NULL,
  pattern text NOT NULL,
  action text NOT NULL,
  replacement text,
  reason text,
  status text NOT NULL DEFAULT 'active',
  version integer NOT NULL DEFAULT 1,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT content_boundary_action CHECK (action IN ('block', 'require_confirmation', 'warn', 'replace'))
);
CREATE INDEX content_boundaries_workspace_idx ON content_boundaries(workspace_id, status, boundary_type);

CREATE TABLE columns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  name text NOT NULL,
  promise text NOT NULL,
  audience jsonb NOT NULL,
  topics jsonb NOT NULL DEFAULT '[]'::jsonb,
  excluded_topics jsonb NOT NULL DEFAULT '[]'::jsonb,
  default_formats jsonb NOT NULL DEFAULT '[]'::jsonb,
  structure_template jsonb NOT NULL DEFAULT '[]'::jsonb,
  cadence text,
  status text NOT NULL DEFAULT 'active',
  version integer NOT NULL DEFAULT 1,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  archived_at timestamptz,
  CONSTRAINT columns_name_length CHECK (char_length(name) BETWEEN 1 AND 100)
);
CREATE INDEX columns_workspace_status_idx ON columns(workspace_id, status);

CREATE TABLE column_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  column_id uuid NOT NULL REFERENCES columns(id) ON DELETE CASCADE,
  version integer NOT NULL,
  snapshot jsonb NOT NULL,
  checksum text NOT NULL,
  created_by uuid REFERENCES users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT column_version_checksum CHECK (checksum ~ '^[a-f0-9]{64}$'),
  UNIQUE (column_id, version)
);

CREATE TABLE column_context_snapshots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  column_id uuid NOT NULL REFERENCES columns(id) ON DELETE CASCADE,
  column_version integer NOT NULL,
  input_hash text NOT NULL,
  data jsonb NOT NULL,
  status text NOT NULL DEFAULT 'ready',
  model_call_id uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT column_context_input_hash CHECK (input_hash ~ '^[a-f0-9]{64}$')
);
CREATE INDEX column_context_latest_idx ON column_context_snapshots(column_id, created_at DESC);

CREATE TABLE material_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  type material_type NOT NULL,
  title text NOT NULL,
  origin text NOT NULL DEFAULT 'user',
  status material_status NOT NULL DEFAULT 'uploaded',
  privacy privacy_level NOT NULL DEFAULT 'internal_reference',
  is_personal_experience boolean NOT NULL DEFAULT false,
  source_url text,
  current_version_id uuid,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  processing_summary jsonb NOT NULL DEFAULT '{}'::jsonb,
  version integer NOT NULL DEFAULT 1,
  created_by uuid NOT NULL REFERENCES users(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  archived_at timestamptz,
  deleted_at timestamptz,
  CONSTRAINT material_title_length CHECK (char_length(title) BETWEEN 1 AND 200)
);
CREATE INDEX material_workspace_status_created_idx
  ON material_items(workspace_id, status, created_at DESC)
  WHERE deleted_at IS NULL;
CREATE INDEX material_source_url_idx
  ON material_items(workspace_id, source_url)
  WHERE source_url IS NOT NULL AND deleted_at IS NULL;

CREATE TABLE material_blobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  material_id uuid NOT NULL REFERENCES material_items(id) ON DELETE CASCADE,
  object_key text NOT NULL,
  original_filename text,
  media_type text NOT NULL,
  size_bytes bigint NOT NULL,
  sha256 text NOT NULL,
  duration_ms bigint,
  scan_status text NOT NULL DEFAULT 'pending',
  storage_status text NOT NULL DEFAULT 'quarantined',
  created_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz,
  CONSTRAINT material_blob_size CHECK (size_bytes >= 0),
  CONSTRAINT material_blob_sha256 CHECK (sha256 ~ '^[a-f0-9]{64}$'),
  UNIQUE (workspace_id, object_key)
);
CREATE INDEX material_blob_hash_idx ON material_blobs(workspace_id, sha256);

CREATE TABLE material_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  material_id uuid NOT NULL REFERENCES material_items(id) ON DELETE CASCADE,
  version integer NOT NULL,
  normalized_text text NOT NULL,
  text_sha256 text NOT NULL,
  language text,
  edited_by uuid REFERENCES users(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT material_version_sha256 CHECK (text_sha256 ~ '^[a-f0-9]{64}$'),
  UNIQUE (material_id, version)
);
ALTER TABLE material_items
  ADD CONSTRAINT material_current_version_fk
  FOREIGN KEY (current_version_id) REFERENCES material_versions(id);

CREATE TABLE material_chunks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  material_version_id uuid NOT NULL REFERENCES material_versions(id) ON DELETE CASCADE,
  ordinal integer NOT NULL,
  text text NOT NULL,
  start_offset integer,
  end_offset integer,
  start_ms bigint,
  end_ms bigint,
  text_sha256 text NOT NULL,
  embedding vector(1536),
  search_vector tsvector GENERATED ALWAYS AS (to_tsvector('simple', coalesce(text, ''))) STORED,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT material_chunk_ordinal CHECK (ordinal >= 0),
  CONSTRAINT material_chunk_offsets CHECK (
    (start_offset IS NULL AND end_offset IS NULL)
    OR (start_offset >= 0 AND end_offset >= start_offset)
  ),
  CONSTRAINT material_chunk_times CHECK (
    (start_ms IS NULL AND end_ms IS NULL)
    OR (start_ms >= 0 AND end_ms >= start_ms)
  ),
  UNIQUE (material_version_id, ordinal)
);
CREATE INDEX material_chunk_workspace_idx ON material_chunks(workspace_id, material_version_id);
CREATE INDEX material_chunk_search_idx ON material_chunks USING gin(search_vector);
-- Select HNSW/IVFFlat index after measuring dataset and PostgreSQL/pgvector version.

CREATE TABLE material_processing_steps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  material_id uuid NOT NULL REFERENCES material_items(id) ON DELETE CASCADE,
  material_version_id uuid REFERENCES material_versions(id) ON DELETE SET NULL,
  step_name text NOT NULL,
  status step_status NOT NULL DEFAULT 'pending',
  attempt integer NOT NULL DEFAULT 0,
  retryable boolean,
  input_hash text NOT NULL,
  checkpoint jsonb NOT NULL DEFAULT '{}'::jsonb,
  last_error jsonb,
  model_call_id uuid,
  started_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT material_processing_attempt CHECK (attempt >= 0),
  CONSTRAINT material_processing_input_hash CHECK (input_hash ~ '^[a-f0-9]{64}$'),
  UNIQUE (material_id, step_name, input_hash)
);
CREATE INDEX material_processing_material_idx
  ON material_processing_steps(material_id, created_at DESC);

CREATE TABLE comment_batches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  material_id uuid NOT NULL REFERENCES material_items(id) ON DELETE CASCADE,
  publishing_record_id uuid,
  mode text NOT NULL,
  platform text,
  mapping jsonb NOT NULL DEFAULT '{}'::jsonb,
  total_rows integer NOT NULL DEFAULT 0,
  accepted_rows integer NOT NULL DEFAULT 0,
  rejected_rows integer NOT NULL DEFAULT 0,
  status step_status NOT NULL DEFAULT 'pending',
  created_by uuid NOT NULL REFERENCES users(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT comment_batch_counts CHECK (
    total_rows >= 0 AND accepted_rows >= 0 AND rejected_rows >= 0
    AND accepted_rows + rejected_rows <= total_rows
  )
);

CREATE TABLE comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  batch_id uuid NOT NULL REFERENCES comment_batches(id) ON DELETE CASCADE,
  body text NOT NULL,
  author_key_hash text,
  platform text,
  published_at timestamptz,
  engagement integer,
  normalized_hash text NOT NULL,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT comment_body_length CHECK (char_length(body) BETWEEN 1 AND 20000),
  CONSTRAINT comment_engagement_nonnegative CHECK (engagement IS NULL OR engagement >= 0)
);
CREATE INDEX comments_batch_idx ON comments(batch_id, created_at);
CREATE INDEX comments_hash_idx ON comments(workspace_id, normalized_hash);

CREATE TABLE material_duplicate_candidates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  material_id uuid NOT NULL REFERENCES material_items(id) ON DELETE CASCADE,
  duplicate_material_id uuid NOT NULL REFERENCES material_items(id) ON DELETE CASCADE,
  match_type text NOT NULL,
  score numeric(5,4),
  status text NOT NULL DEFAULT 'open',
  created_at timestamptz NOT NULL DEFAULT now(),
  resolved_at timestamptz,
  CONSTRAINT duplicate_not_self CHECK (material_id <> duplicate_material_id),
  CONSTRAINT duplicate_score CHECK (score IS NULL OR (score >= 0 AND score <= 1)),
  UNIQUE (material_id, duplicate_material_id, match_type)
);

CREATE TABLE insight_assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  type insight_asset_type NOT NULL,
  title text NOT NULL,
  statement text NOT NULL,
  context text NOT NULL DEFAULT '',
  audience jsonb NOT NULL DEFAULT '[]'::jsonb,
  confidence numeric(5,4) NOT NULL DEFAULT 0,
  privacy privacy_level NOT NULL DEFAULT 'internal_reference',
  confirmation confirmation_status NOT NULL DEFAULT 'suggested',
  lifecycle lifecycle_status NOT NULL DEFAULT 'active',
  usage_count integer NOT NULL DEFAULT 0,
  current_version integer NOT NULL DEFAULT 1,
  embedding vector(1536),
  search_vector tsvector GENERATED ALWAYS AS (
    to_tsvector('simple', coalesce(title, '') || ' ' || coalesce(statement, '') || ' ' || coalesce(context, ''))
  ) STORED,
  created_by_model_call uuid,
  confirmed_by uuid REFERENCES users(id),
  confirmed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz,
  CONSTRAINT insight_confidence CHECK (confidence >= 0 AND confidence <= 1),
  CONSTRAINT insight_usage_nonnegative CHECK (usage_count >= 0)
);
CREATE INDEX insight_workspace_type_status_idx
  ON insight_assets(workspace_id, type, lifecycle, updated_at DESC)
  WHERE deleted_at IS NULL;
CREATE INDEX insight_search_idx ON insight_assets USING gin(search_vector);

CREATE TABLE insight_asset_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  asset_id uuid NOT NULL REFERENCES insight_assets(id) ON DELETE CASCADE,
  version integer NOT NULL,
  title text NOT NULL,
  statement text NOT NULL,
  context text NOT NULL DEFAULT '',
  audience jsonb NOT NULL DEFAULT '[]'::jsonb,
  privacy privacy_level NOT NULL,
  created_by_kind text NOT NULL,
  created_by_user uuid REFERENCES users(id),
  model_call_id uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (asset_id, version)
);

CREATE TABLE insight_asset_sources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  asset_id uuid NOT NULL REFERENCES insight_assets(id) ON DELETE CASCADE,
  material_id uuid NOT NULL REFERENCES material_items(id) ON DELETE CASCADE,
  material_version_id uuid NOT NULL REFERENCES material_versions(id) ON DELETE CASCADE,
  chunk_id uuid NOT NULL REFERENCES material_chunks(id) ON DELETE CASCADE,
  start_offset integer,
  end_offset integer,
  start_ms bigint,
  end_ms bigint,
  excerpt text NOT NULL,
  support_type text NOT NULL,
  model_call_id uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX insight_source_asset_idx ON insight_asset_sources(asset_id);
CREATE INDEX insight_source_material_idx ON insight_asset_sources(material_id);

CREATE TABLE insight_asset_relations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  from_asset_id uuid NOT NULL REFERENCES insight_assets(id) ON DELETE CASCADE,
  to_asset_id uuid NOT NULL REFERENCES insight_assets(id) ON DELETE CASCADE,
  relation_type text NOT NULL,
  score numeric(5,4),
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT insight_relation_distinct CHECK (from_asset_id <> to_asset_id),
  CONSTRAINT insight_relation_score CHECK (score IS NULL OR (score >= 0 AND score <= 1)),
  UNIQUE (from_asset_id, to_asset_id, relation_type)
);

CREATE TABLE source_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  type source_document_type NOT NULL,
  title text NOT NULL,
  url text,
  publisher text,
  published_at timestamptz,
  retrieved_at timestamptz,
  excerpt text,
  content_hash text,
  material_id uuid REFERENCES material_items(id) ON DELETE SET NULL,
  trust_metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);
CREATE INDEX source_doc_workspace_url_idx ON source_documents(workspace_id, url) WHERE url IS NOT NULL;

CREATE TABLE topic_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  column_id uuid REFERENCES columns(id) ON DELETE SET NULL,
  configuration jsonb NOT NULL,
  status step_status NOT NULL DEFAULT 'queued',
  model_metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  error_code text,
  started_at timestamptz,
  completed_at timestamptz,
  created_by uuid NOT NULL REFERENCES users(id),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX topic_session_workspace_idx ON topic_sessions(workspace_id, created_at DESC);

CREATE TABLE topic_candidates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  topic_session_id uuid NOT NULL REFERENCES topic_sessions(id) ON DELETE CASCADE,
  title text NOT NULL,
  thesis text NOT NULL,
  audience text NOT NULL,
  rationale text NOT NULL DEFAULT '',
  scores jsonb NOT NULL,
  overall_score integer NOT NULL,
  gaps jsonb NOT NULL DEFAULT '[]'::jsonb,
  risks jsonb NOT NULL DEFAULT '[]'::jsonb,
  artifact_suggestion text NOT NULL DEFAULT 'none',
  similar_content jsonb NOT NULL DEFAULT '[]'::jsonb,
  serial_directions jsonb NOT NULL DEFAULT '[]'::jsonb,
  status topic_status NOT NULL DEFAULT 'candidate',
  embedding vector(1536),
  version integer NOT NULL DEFAULT 1,
  selected_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT topic_overall_score CHECK (overall_score BETWEEN 0 AND 100)
);
CREATE INDEX topic_candidate_session_idx ON topic_candidates(topic_session_id, overall_score DESC);

CREATE TABLE topic_candidate_sources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  candidate_id uuid NOT NULL REFERENCES topic_candidates(id) ON DELETE CASCADE,
  asset_id uuid REFERENCES insight_assets(id) ON DELETE SET NULL,
  source_document_id uuid REFERENCES source_documents(id) ON DELETE SET NULL,
  content_asset_id uuid,
  relationship text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT topic_candidate_source_one_ref CHECK (
    num_nonnulls(asset_id, source_document_id, content_asset_id) = 1
  )
);

CREATE TABLE topic_candidate_feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  candidate_id uuid NOT NULL REFERENCES topic_candidates(id) ON DELETE CASCADE,
  reason text NOT NULL,
  detail text,
  created_by uuid NOT NULL REFERENCES users(id),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX topic_candidate_feedback_idx ON topic_candidate_feedback(candidate_id, created_at DESC);

CREATE TABLE content_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  topic_candidate_id uuid REFERENCES topic_candidates(id) ON DELETE SET NULL,
  column_id uuid REFERENCES columns(id) ON DELETE SET NULL,
  status run_status NOT NULL DEFAULT 'draft',
  active_step text,
  config jsonb NOT NULL,
  budget jsonb NOT NULL,
  estimated_cost numeric(12,6) NOT NULL DEFAULT 0,
  actual_cost numeric(12,6) NOT NULL DEFAULT 0,
  current_brief_id uuid,
  version integer NOT NULL DEFAULT 1,
  created_by uuid NOT NULL REFERENCES users(id),
  canceled_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz,
  CONSTRAINT content_run_cost_nonnegative CHECK (estimated_cost >= 0 AND actual_cost >= 0)
);
CREATE INDEX content_run_workspace_status_idx
  ON content_runs(workspace_id, status, updated_at DESC)
  WHERE deleted_at IS NULL;

CREATE TABLE content_run_snapshots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  run_id uuid NOT NULL REFERENCES content_runs(id) ON DELETE CASCADE,
  snapshot_type text NOT NULL,
  snapshot_version integer NOT NULL,
  data jsonb NOT NULL,
  checksum text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT run_snapshot_checksum CHECK (checksum ~ '^[a-f0-9]{64}$'),
  UNIQUE (run_id, snapshot_type, snapshot_version)
);

CREATE TABLE run_steps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  run_id uuid NOT NULL REFERENCES content_runs(id) ON DELETE CASCADE,
  step_name text NOT NULL,
  status step_status NOT NULL DEFAULT 'pending',
  attempt integer NOT NULL DEFAULT 0,
  input_hash text NOT NULL,
  output_reference jsonb,
  checkpoint jsonb NOT NULL DEFAULT '{}'::jsonb,
  model_call_id uuid,
  started_at timestamptz,
  completed_at timestamptz,
  last_error jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT run_step_attempt_nonnegative CHECK (attempt >= 0),
  UNIQUE (run_id, step_name, input_hash)
);
CREATE INDEX run_step_active_idx ON run_steps(status, updated_at) WHERE status IN ('queued', 'running', 'failed');

CREATE TABLE interview_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  run_id uuid NOT NULL REFERENCES content_runs(id) ON DELETE CASCADE,
  ordinal integer NOT NULL,
  question text NOT NULL,
  rationale text NOT NULL,
  target_gap text NOT NULL,
  required boolean NOT NULL DEFAULT false,
  status text NOT NULL DEFAULT 'open',
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (run_id, ordinal)
);

CREATE TABLE interview_answers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  question_id uuid NOT NULL REFERENCES interview_questions(id) ON DELETE CASCADE,
  answer_text text NOT NULL,
  material_id uuid REFERENCES material_items(id) ON DELETE SET NULL,
  save_as_asset boolean NOT NULL DEFAULT false,
  created_by uuid NOT NULL REFERENCES users(id),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE content_briefs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  run_id uuid NOT NULL REFERENCES content_runs(id) ON DELETE CASCADE,
  version integer NOT NULL,
  schema_version text NOT NULL,
  data jsonb NOT NULL,
  status text NOT NULL DEFAULT 'draft',
  model_call_id uuid,
  checksum text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT content_brief_checksum CHECK (checksum ~ '^[a-f0-9]{64}$'),
  UNIQUE (run_id, version)
);
ALTER TABLE content_runs
  ADD CONSTRAINT content_run_current_brief_fk
  FOREIGN KEY (current_brief_id) REFERENCES content_briefs(id);

CREATE TABLE content_assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  run_id uuid NOT NULL REFERENCES content_runs(id) ON DELETE CASCADE,
  type content_asset_type NOT NULL,
  title text NOT NULL,
  status content_asset_status NOT NULL DEFAULT 'draft',
  current_version_id uuid,
  approved_version_id uuid,
  published_record_count integer NOT NULL DEFAULT 0,
  embedding vector(1536),
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  version integer NOT NULL DEFAULT 1,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz,
  CONSTRAINT content_asset_published_nonnegative CHECK (published_record_count >= 0)
);
CREATE INDEX content_asset_run_idx ON content_assets(run_id, type);
CREATE INDEX content_asset_library_idx
  ON content_assets(workspace_id, status, updated_at DESC)
  WHERE deleted_at IS NULL;

ALTER TABLE topic_candidate_sources
  ADD CONSTRAINT topic_candidate_content_asset_fk
  FOREIGN KEY (content_asset_id) REFERENCES content_assets(id) ON DELETE SET NULL;

CREATE TABLE content_asset_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  content_asset_id uuid NOT NULL REFERENCES content_assets(id) ON DELETE CASCADE,
  version integer NOT NULL,
  body text NOT NULL,
  structured_body jsonb NOT NULL DEFAULT '{}'::jsonb,
  source_map jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_by_kind text NOT NULL,
  created_by_user uuid REFERENCES users(id),
  model_call_id uuid,
  prompt_reference jsonb,
  checksum text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT content_version_checksum CHECK (checksum ~ '^[a-f0-9]{64}$'),
  UNIQUE (content_asset_id, version)
);
ALTER TABLE content_assets
  ADD CONSTRAINT content_asset_current_version_fk
  FOREIGN KEY (current_version_id) REFERENCES content_asset_versions(id);
ALTER TABLE content_assets
  ADD CONSTRAINT content_asset_approved_version_fk
  FOREIGN KEY (approved_version_id) REFERENCES content_asset_versions(id);

CREATE TABLE regeneration_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  content_asset_id uuid NOT NULL REFERENCES content_assets(id) ON DELETE CASCADE,
  source_version_id uuid NOT NULL REFERENCES content_asset_versions(id) ON DELETE CASCADE,
  selection jsonb NOT NULL,
  instruction text NOT NULL,
  preserve jsonb NOT NULL,
  status step_status NOT NULL DEFAULT 'queued',
  output_version_id uuid REFERENCES content_asset_versions(id) ON DELETE SET NULL,
  model_call_id uuid,
  created_by uuid NOT NULL REFERENCES users(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz
);
CREATE INDEX regeneration_asset_idx ON regeneration_requests(content_asset_id, created_at DESC);

CREATE TABLE claims (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  content_asset_version_id uuid NOT NULL REFERENCES content_asset_versions(id) ON DELETE CASCADE,
  claim_text text NOT NULL,
  type claim_type NOT NULL,
  support support_status NOT NULL,
  start_offset integer NOT NULL,
  end_offset integer NOT NULL,
  risk_level text NOT NULL,
  stale boolean NOT NULL DEFAULT false,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT claim_offsets CHECK (start_offset >= 0 AND end_offset > start_offset)
);
CREATE INDEX claims_content_version_idx ON claims(content_asset_version_id, start_offset);

CREATE TABLE claim_sources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  claim_id uuid NOT NULL REFERENCES claims(id) ON DELETE CASCADE,
  source_document_id uuid REFERENCES source_documents(id) ON DELETE SET NULL,
  material_id uuid REFERENCES material_items(id) ON DELETE SET NULL,
  insight_asset_id uuid REFERENCES insight_assets(id) ON DELETE SET NULL,
  interview_answer_id uuid REFERENCES interview_answers(id) ON DELETE SET NULL,
  relationship text NOT NULL,
  excerpt text NOT NULL DEFAULT '',
  support_strength numeric(5,4),
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT claim_source_one_ref CHECK (
    num_nonnulls(source_document_id, material_id, insight_asset_id, interview_answer_id) = 1
  ),
  CONSTRAINT claim_source_strength CHECK (
    support_strength IS NULL OR (support_strength >= 0 AND support_strength <= 1)
  )
);

CREATE TABLE review_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  content_run_id uuid NOT NULL REFERENCES content_runs(id) ON DELETE CASCADE,
  content_version_set_hash text NOT NULL,
  status step_status NOT NULL DEFAULT 'queued',
  scores jsonb NOT NULL DEFAULT '{}'::jsonb,
  gate text,
  prompt_reference jsonb,
  model_call_id uuid,
  completed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT review_version_hash CHECK (content_version_set_hash ~ '^[a-f0-9]{64}$')
);
CREATE INDEX review_run_content_idx ON review_runs(content_run_id, created_at DESC);

CREATE TABLE review_findings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  review_run_id uuid NOT NULL REFERENCES review_runs(id) ON DELETE CASCADE,
  content_asset_version_id uuid REFERENCES content_asset_versions(id) ON DELETE CASCADE,
  category text NOT NULL,
  severity finding_severity NOT NULL,
  rule_id text NOT NULL,
  message text NOT NULL,
  location jsonb,
  suggested_fix text,
  status finding_status NOT NULL DEFAULT 'open',
  accepted_reason text,
  stale boolean NOT NULL DEFAULT false,
  resolved_by uuid REFERENCES users(id),
  resolved_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT blocker_not_accepted CHECK (
    NOT (severity = 'blocker' AND status = 'accepted_risk')
  )
);
CREATE INDEX unresolved_blockers_idx
  ON review_findings(workspace_id, review_run_id)
  WHERE severity = 'blocker' AND status = 'open' AND stale = false;

CREATE TABLE approvals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  content_run_id uuid NOT NULL REFERENCES content_runs(id) ON DELETE CASCADE,
  approver_id uuid NOT NULL REFERENCES users(id),
  version_set jsonb NOT NULL,
  quality_report_id uuid NOT NULL REFERENCES review_runs(id),
  unresolved_warnings jsonb NOT NULL DEFAULT '[]'::jsonb,
  checksum text NOT NULL,
  invalidated_at timestamptz,
  invalidation_reason text,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT approval_checksum CHECK (checksum ~ '^[a-f0-9]{64}$')
);
CREATE UNIQUE INDEX one_valid_approval_per_run
  ON approvals(content_run_id)
  WHERE invalidated_at IS NULL;

CREATE TABLE artifact_specs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  content_run_id uuid NOT NULL REFERENCES content_runs(id) ON DELETE CASCADE,
  type artifact_type NOT NULL,
  version integer NOT NULL,
  schema_version text NOT NULL,
  spec jsonb NOT NULL,
  status artifact_status NOT NULL DEFAULT 'draft',
  current_build_id uuid,
  checksum text NOT NULL,
  created_by_kind text NOT NULL,
  created_by_user uuid REFERENCES users(id),
  model_call_id uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT artifact_spec_checksum CHECK (checksum ~ '^[a-f0-9]{64}$'),
  UNIQUE (content_run_id, version)
);

CREATE TABLE artifact_builds (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  artifact_spec_id uuid NOT NULL REFERENCES artifact_specs(id) ON DELETE CASCADE,
  status artifact_status NOT NULL DEFAULT 'building',
  renderer_version text NOT NULL,
  output_object_key text,
  validation_results jsonb NOT NULL DEFAULT '{}'::jsonb,
  checksum text,
  error_code text,
  created_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz,
  CONSTRAINT artifact_build_checksum CHECK (
    checksum IS NULL OR checksum ~ '^[a-f0-9]{64}$'
  )
);
ALTER TABLE artifact_specs
  ADD CONSTRAINT artifact_current_build_fk
  FOREIGN KEY (current_build_id) REFERENCES artifact_builds(id);

CREATE TABLE exports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  content_run_id uuid NOT NULL REFERENCES content_runs(id) ON DELETE CASCADE,
  approval_id uuid REFERENCES approvals(id) ON DELETE SET NULL,
  format text NOT NULL,
  options jsonb NOT NULL DEFAULT '{}'::jsonb,
  manifest jsonb,
  draft boolean NOT NULL DEFAULT false,
  status export_status NOT NULL DEFAULT 'queued',
  object_key text,
  checksum text,
  expires_at timestamptz,
  created_by uuid NOT NULL REFERENCES users(id),
  error_code text,
  created_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz,
  deleted_at timestamptz,
  CONSTRAINT export_checksum CHECK (checksum IS NULL OR checksum ~ '^[a-f0-9]{64}$')
);
CREATE INDEX exports_workspace_idx ON exports(workspace_id, created_at DESC);

CREATE TABLE publishing_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  content_asset_id uuid NOT NULL REFERENCES content_assets(id) ON DELETE CASCADE,
  content_asset_version_id uuid NOT NULL REFERENCES content_asset_versions(id),
  platform text NOT NULL,
  url text NOT NULL,
  title text NOT NULL,
  published_at timestamptz NOT NULL,
  notes text,
  created_by uuid NOT NULL REFERENCES users(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX publishing_record_asset_idx ON publishing_records(content_asset_id, published_at DESC);

CREATE TABLE performance_snapshots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  publishing_record_id uuid NOT NULL REFERENCES publishing_records(id) ON DELETE CASCADE,
  captured_at timestamptz NOT NULL,
  source text NOT NULL DEFAULT 'manual',
  metrics jsonb NOT NULL,
  notes text,
  created_by uuid NOT NULL REFERENCES users(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (publishing_record_id, captured_at, source)
);

CREATE TABLE prompt_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt_id text NOT NULL,
  version text NOT NULL,
  purpose text NOT NULL,
  content_hash text NOT NULL,
  schema_id text,
  schema_version text,
  status text NOT NULL DEFAULT 'draft',
  eval_report_ref text,
  released_at timestamptz,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT prompt_content_hash CHECK (content_hash ~ '^[a-f0-9]{64}$'),
  UNIQUE (prompt_id, version)
);

CREATE TABLE ai_calls (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  content_run_id uuid REFERENCES content_runs(id) ON DELETE SET NULL,
  material_id uuid REFERENCES material_items(id) ON DELETE SET NULL,
  step text NOT NULL,
  provider text NOT NULL DEFAULT 'openai',
  model text NOT NULL,
  reasoning text,
  prompt_id text NOT NULL,
  prompt_version text NOT NULL,
  schema_id text,
  schema_version text,
  input_hash text NOT NULL,
  output_hash text,
  provider_request_id text,
  usage jsonb NOT NULL DEFAULT '{}'::jsonb,
  tool_calls jsonb NOT NULL DEFAULT '[]'::jsonb,
  estimated_cost numeric(12,6) NOT NULL DEFAULT 0,
  latency_ms integer,
  status ai_call_status NOT NULL,
  error_code text,
  encrypted_debug_ref text,
  created_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz,
  CONSTRAINT ai_call_cost_nonnegative CHECK (estimated_cost >= 0),
  CONSTRAINT ai_call_one_parent CHECK (num_nonnulls(content_run_id, material_id) <= 1)
);
CREATE INDEX ai_calls_run_idx ON ai_calls(content_run_id, created_at);
CREATE INDEX ai_calls_material_idx ON ai_calls(material_id, created_at);
CREATE INDEX ai_calls_cache_idx
  ON ai_calls(workspace_id, step, model, prompt_id, prompt_version, input_hash)
  WHERE status IN ('succeeded', 'cached');

ALTER TABLE insight_assets
  ADD CONSTRAINT insight_model_call_fk
  FOREIGN KEY (created_by_model_call) REFERENCES ai_calls(id);
ALTER TABLE insight_asset_versions
  ADD CONSTRAINT insight_version_model_call_fk
  FOREIGN KEY (model_call_id) REFERENCES ai_calls(id);
ALTER TABLE insight_asset_sources
  ADD CONSTRAINT insight_source_model_call_fk
  FOREIGN KEY (model_call_id) REFERENCES ai_calls(id);
ALTER TABLE run_steps
  ADD CONSTRAINT run_step_model_call_fk
  FOREIGN KEY (model_call_id) REFERENCES ai_calls(id);
ALTER TABLE content_briefs
  ADD CONSTRAINT content_brief_model_call_fk
  FOREIGN KEY (model_call_id) REFERENCES ai_calls(id);
ALTER TABLE content_asset_versions
  ADD CONSTRAINT content_version_model_call_fk
  FOREIGN KEY (model_call_id) REFERENCES ai_calls(id);
ALTER TABLE review_runs
  ADD CONSTRAINT review_model_call_fk
  FOREIGN KEY (model_call_id) REFERENCES ai_calls(id);
ALTER TABLE artifact_specs
  ADD CONSTRAINT artifact_model_call_fk
  FOREIGN KEY (model_call_id) REFERENCES ai_calls(id);

ALTER TABLE profile_suggestions
  ADD CONSTRAINT profile_suggestion_model_call_fk
  FOREIGN KEY (model_call_id) REFERENCES ai_calls(id);
ALTER TABLE column_context_snapshots
  ADD CONSTRAINT column_context_model_call_fk
  FOREIGN KEY (model_call_id) REFERENCES ai_calls(id);
ALTER TABLE material_processing_steps
  ADD CONSTRAINT material_processing_model_call_fk
  FOREIGN KEY (model_call_id) REFERENCES ai_calls(id);
ALTER TABLE regeneration_requests
  ADD CONSTRAINT regeneration_model_call_fk
  FOREIGN KEY (model_call_id) REFERENCES ai_calls(id);
ALTER TABLE comment_batches
  ADD CONSTRAINT comment_batch_publishing_record_fk
  FOREIGN KEY (publishing_record_id) REFERENCES publishing_records(id) ON DELETE SET NULL;

CREATE TABLE idempotency_keys (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  key text NOT NULL,
  route text NOT NULL,
  request_hash text NOT NULL,
  response_status integer,
  response_body jsonb,
  resource_type text,
  resource_id uuid,
  expires_at timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (workspace_id, key, route)
);

CREATE TABLE outbox_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  event_type text NOT NULL,
  aggregate_type text NOT NULL,
  aggregate_id uuid NOT NULL,
  aggregate_version integer NOT NULL,
  payload_version integer NOT NULL DEFAULT 1,
  payload jsonb NOT NULL,
  occurred_at timestamptz NOT NULL DEFAULT now(),
  published_at timestamptz,
  attempts integer NOT NULL DEFAULT 0,
  last_error text
);
CREATE INDEX outbox_unpublished_idx ON outbox_events(occurred_at) WHERE published_at IS NULL;

CREATE TABLE jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  type text NOT NULL,
  dedupe_key text,
  payload jsonb NOT NULL,
  status job_status NOT NULL DEFAULT 'queued',
  priority integer NOT NULL DEFAULT 0,
  attempt integer NOT NULL DEFAULT 0,
  max_attempts integer NOT NULL DEFAULT 5,
  available_at timestamptz NOT NULL DEFAULT now(),
  locked_at timestamptz,
  locked_by text,
  heartbeat_at timestamptz,
  progress numeric(5,4) NOT NULL DEFAULT 0,
  current_step text,
  checkpoint jsonb NOT NULL DEFAULT '{}'::jsonb,
  cancel_requested_at timestamptz,
  dead_lettered_at timestamptz,
  last_error jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz,
  CONSTRAINT job_attempts CHECK (attempt >= 0 AND max_attempts > 0),
  CONSTRAINT jobs_progress_range CHECK (progress >= 0 AND progress <= 1)
);
CREATE UNIQUE INDEX jobs_dedupe_active_unique
  ON jobs(workspace_id, type, dedupe_key)
  WHERE dedupe_key IS NOT NULL AND status IN ('queued', 'running', 'retry_scheduled');
CREATE INDEX jobs_available_idx
  ON jobs(priority DESC, available_at, created_at)
  WHERE status IN ('queued', 'retry_scheduled');

CREATE TABLE workspace_deletions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  status deletion_status NOT NULL DEFAULT 'requested',
  requested_by uuid NOT NULL REFERENCES users(id),
  steps jsonb NOT NULL DEFAULT '{}'::jsonb,
  error_code text,
  requested_at timestamptz NOT NULL DEFAULT now(),
  started_at timestamptz,
  completed_at timestamptz,
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid REFERENCES workspaces(id) ON DELETE SET NULL,
  actor_user_id uuid REFERENCES users(id) ON DELETE SET NULL,
  actor_type text NOT NULL DEFAULT 'user',
  action text NOT NULL,
  resource_type text NOT NULL,
  resource_id uuid,
  before_summary jsonb,
  after_summary jsonb,
  request_id text,
  ip_hash text,
  user_agent_hash text,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX audit_workspace_created_idx ON audit_logs(workspace_id, created_at DESC);

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

-- All application queries must scope by workspace_id even where FK chains imply it.
-- Consider PostgreSQL row-level security only if the team commits to testing and
-- operating it correctly; application-level tenant guards remain required.
