import { Pool } from "pg";

const DEVELOPMENT_SEED_SQL = `
INSERT INTO users (id, email, display_name)
VALUES
  ('10000000-0000-4000-8000-000000000001', 'seed-owner-a@example.test', '合成用户甲'),
  ('10000000-0000-4000-8000-000000000002', 'seed-owner-b@example.test', '合成用户乙')
ON CONFLICT (id) DO NOTHING;

INSERT INTO workspaces (id, name, slug, onboarding_status)
VALUES
  ('20000000-0000-4000-8000-000000000001', '合成工作区甲', 'synthetic-workspace-a', 'completed'),
  ('20000000-0000-4000-8000-000000000002', '合成工作区乙', 'synthetic-workspace-b', 'completed')
ON CONFLICT (id) DO NOTHING;

INSERT INTO workspace_members (workspace_id, user_id, role, status)
VALUES
  ('20000000-0000-4000-8000-000000000001', '10000000-0000-4000-8000-000000000001', 'owner', 'active'),
  ('20000000-0000-4000-8000-000000000002', '10000000-0000-4000-8000-000000000002', 'owner', 'active')
ON CONFLICT (workspace_id, user_id) DO NOTHING;

INSERT INTO creator_profiles (
  id, workspace_id, version, display_name, positioning, goals, domains, audiences,
  voice, boundaries, confidence, evidence, status, confirmed_at, created_by
)
VALUES
  (
    '30000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000001', 1,
    '合成创作者甲', '记录普通人的 AI 工作实验', '["分享可验证的工作方法"]', '["AI 工作流"]',
    '["独立创作者"]', '{"tone":"诚恳、具体"}', '{"never":["虚构个人经历"]}', 1,
    '[]', 'active', '2026-01-01T00:00:00Z', '10000000-0000-4000-8000-000000000001'
  ),
  (
    '30000000-0000-4000-8000-000000000002', '20000000-0000-4000-8000-000000000002', 1,
    '合成创作者乙', '记录普通人的 AI 工作实验', '["分享可验证的工作方法"]', '["AI 工作流"]',
    '["独立创作者"]', '{"tone":"诚恳、具体"}', '{"never":["虚构个人经历"]}', 1,
    '[]', 'active', '2026-01-01T00:00:00Z', '10000000-0000-4000-8000-000000000002'
  )
ON CONFLICT (id) DO NOTHING;

INSERT INTO columns (id, workspace_id, name, promise, audience, topics, default_formats, structure_template)
VALUES
  (
    '40000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000001',
    '普通人的 AI 工作实验室', '用可追溯的实验记录解释 AI 如何改变日常工作', '["独立创作者"]',
    '["工作流","注意力"]', '["master_article"]', '["现象","证据","反思"]'
  ),
  (
    '40000000-0000-4000-8000-000000000002', '20000000-0000-4000-8000-000000000002',
    '普通人的 AI 工作实验室', '用可追溯的实验记录解释 AI 如何改变日常工作', '["独立创作者"]',
    '["工作流","注意力"]', '["master_article"]', '["现象","证据","反思"]'
  )
ON CONFLICT (id) DO NOTHING;

INSERT INTO material_items (id, workspace_id, type, title, origin, status, privacy, created_by)
VALUES
  ('50000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000001', 'text', '合成素材甲-1', 'seed', 'ready', 'internal_reference', '10000000-0000-4000-8000-000000000001'),
  ('50000000-0000-4000-8000-000000000002', '20000000-0000-4000-8000-000000000001', 'text', '合成素材甲-2', 'seed', 'ready', 'internal_reference', '10000000-0000-4000-8000-000000000001'),
  ('50000000-0000-4000-8000-000000000003', '20000000-0000-4000-8000-000000000001', 'text', '合成素材甲-3', 'seed', 'ready', 'internal_reference', '10000000-0000-4000-8000-000000000001'),
  ('50000000-0000-4000-8000-000000000004', '20000000-0000-4000-8000-000000000001', 'text', '合成素材甲-4', 'seed', 'ready', 'internal_reference', '10000000-0000-4000-8000-000000000001'),
  ('50000000-0000-4000-8000-000000000005', '20000000-0000-4000-8000-000000000002', 'text', '合成素材乙-1', 'seed', 'ready', 'internal_reference', '10000000-0000-4000-8000-000000000002'),
  ('50000000-0000-4000-8000-000000000006', '20000000-0000-4000-8000-000000000002', 'text', '合成素材乙-2', 'seed', 'ready', 'internal_reference', '10000000-0000-4000-8000-000000000002'),
  ('50000000-0000-4000-8000-000000000007', '20000000-0000-4000-8000-000000000002', 'text', '合成素材乙-3', 'seed', 'ready', 'internal_reference', '10000000-0000-4000-8000-000000000002'),
  ('50000000-0000-4000-8000-000000000008', '20000000-0000-4000-8000-000000000002', 'text', '合成素材乙-4', 'seed', 'ready', 'internal_reference', '10000000-0000-4000-8000-000000000002')
ON CONFLICT (id) DO NOTHING;

INSERT INTO material_versions (id, workspace_id, material_id, version, normalized_text, text_sha256, language)
SELECT
  ('51000000-0000-4000-8000-' || lpad(sequence::text, 12, '0'))::uuid,
  CASE WHEN sequence <= 4
    THEN '20000000-0000-4000-8000-000000000001'::uuid
    ELSE '20000000-0000-4000-8000-000000000002'::uuid
  END,
  ('50000000-0000-4000-8000-' || lpad(sequence::text, 12, '0'))::uuid,
  1,
  '这是第 ' || sequence || ' 条完全虚构的开发素材，用于验证隔离与可追溯性。',
  encode(digest('synthetic-material-' || sequence, 'sha256'), 'hex'),
  'zh-CN'
FROM generate_series(1, 8) AS sequence
ON CONFLICT (id) DO NOTHING;

UPDATE material_items
SET current_version_id = ('51000000-0000-4000-8000-' || right(id::text, 12))::uuid
WHERE id::text LIKE '50000000-0000-4000-8000-%';

INSERT INTO insight_assets (
  id, workspace_id, type, title, statement, context, audience, confidence,
  privacy, confirmation, lifecycle, confirmed_by, confirmed_at
)
SELECT
  ('60000000-0000-4000-8000-' || lpad(sequence::text, 12, '0'))::uuid,
  CASE WHEN sequence <= 10
    THEN '20000000-0000-4000-8000-000000000001'::uuid
    ELSE '20000000-0000-4000-8000-000000000002'::uuid
  END,
  'opinion',
  '合成观点 ' || sequence,
  '这是用于开发测试的虚构观点 ' || sequence || '，不代表任何真实人物经历。',
  '仅用于 deterministic seed。',
  '["独立创作者"]',
  1,
  'internal_reference',
  'confirmed',
  'active',
  CASE WHEN sequence <= 10
    THEN '10000000-0000-4000-8000-000000000001'::uuid
    ELSE '10000000-0000-4000-8000-000000000002'::uuid
  END,
  '2026-01-01T00:00:00Z'
FROM generate_series(1, 20) AS sequence
ON CONFLICT (id) DO NOTHING;

INSERT INTO topic_sessions (
  id, workspace_id, column_id, configuration, status, started_at, completed_at, created_by
)
VALUES (
  '70000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000001',
  '40000000-0000-4000-8000-000000000001', '{"mode":"synthetic"}', 'succeeded',
  '2026-01-02T00:00:00Z', '2026-01-02T00:01:00Z', '10000000-0000-4000-8000-000000000001'
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO content_runs (id, workspace_id, column_id, status, active_step, config, budget, created_by)
VALUES
  ('71000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000001', '40000000-0000-4000-8000-000000000001', 'needs_input', 'interview', '{"synthetic":true}', '{"hardLimitUsd":"1.00"}', '10000000-0000-4000-8000-000000000001'),
  ('71000000-0000-4000-8000-000000000002', '20000000-0000-4000-8000-000000000001', '40000000-0000-4000-8000-000000000001', 'in_review', 'quality_check', '{"synthetic":true}', '{"hardLimitUsd":"1.00"}', '10000000-0000-4000-8000-000000000001'),
  ('71000000-0000-4000-8000-000000000003', '20000000-0000-4000-8000-000000000001', '40000000-0000-4000-8000-000000000001', 'approved', 'approved', '{"synthetic":true}', '{"hardLimitUsd":"1.00"}', '10000000-0000-4000-8000-000000000001')
ON CONFLICT (id) DO NOTHING;

INSERT INTO review_runs (id, workspace_id, content_run_id, content_version_set_hash, status, gate, completed_at)
VALUES
  ('72000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000001', '71000000-0000-4000-8000-000000000002', repeat('a', 64), 'succeeded', 'blocked', '2026-01-03T00:00:00Z'),
  ('72000000-0000-4000-8000-000000000002', '20000000-0000-4000-8000-000000000001', '71000000-0000-4000-8000-000000000003', repeat('b', 64), 'succeeded', 'passed', '2026-01-03T00:00:00Z')
ON CONFLICT (id) DO NOTHING;

INSERT INTO review_findings (
  id, workspace_id, review_run_id, category, severity, rule_id, message, status
)
VALUES (
  '73000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000001',
  '72000000-0000-4000-8000-000000000001', 'source_traceability', 'blocker',
  'SYNTHETIC-UNSUPPORTED-CLAIM', '合成阻断项：外部事实缺少来源。', 'open'
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO approvals (
  id, workspace_id, content_run_id, approver_id, version_set, quality_report_id, checksum
)
VALUES (
  '74000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000001',
  '71000000-0000-4000-8000-000000000003', '10000000-0000-4000-8000-000000000001',
  '{"syntheticVersion":1}', '72000000-0000-4000-8000-000000000002', repeat('c', 64)
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO content_assets (id, workspace_id, run_id, type, title, status)
VALUES (
  '75000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000001',
  '71000000-0000-4000-8000-000000000003', 'master_article',
  'AI 没让我更早下班，只是把工作切得更碎', 'approved'
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO content_asset_versions (
  id, workspace_id, content_asset_id, version, body, structured_body, source_map, created_by_kind, created_by_user, checksum
)
VALUES (
  '75100000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000001',
  '75000000-0000-4000-8000-000000000001', 1, '这是一篇完全虚构的开发文章。',
  '{"synthetic":true}', '{"sources":[]}', 'user', '10000000-0000-4000-8000-000000000001', repeat('d', 64)
)
ON CONFLICT (id) DO NOTHING;

UPDATE content_assets
SET current_version_id = '75100000-0000-4000-8000-000000000001',
    approved_version_id = '75100000-0000-4000-8000-000000000001'
WHERE id = '75000000-0000-4000-8000-000000000001';

INSERT INTO artifact_specs (
  id, workspace_id, content_run_id, type, version, schema_version, spec, status, checksum, created_by_kind, created_by_user
)
VALUES
  ('76000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000001', '71000000-0000-4000-8000-000000000003', 'calculator', 1, '1.0.0', '{"synthetic":true,"kind":"calculator"}', 'approved', repeat('a', 64), 'user', '10000000-0000-4000-8000-000000000001'),
  ('76000000-0000-4000-8000-000000000002', '20000000-0000-4000-8000-000000000001', '71000000-0000-4000-8000-000000000003', 'quiz', 2, '1.0.0', '{"synthetic":true,"kind":"quiz"}', 'approved', repeat('b', 64), 'user', '10000000-0000-4000-8000-000000000001'),
  ('76000000-0000-4000-8000-000000000003', '20000000-0000-4000-8000-000000000001', '71000000-0000-4000-8000-000000000003', 'checklist', 3, '1.0.0', '{"synthetic":true,"kind":"checklist"}', 'approved', repeat('c', 64), 'user', '10000000-0000-4000-8000-000000000001')
ON CONFLICT (id) DO NOTHING;

INSERT INTO artifact_builds (
  id, workspace_id, artifact_spec_id, status, renderer_version, validation_results, checksum, completed_at
)
SELECT
  ('76100000-0000-4000-8000-' || right(id::text, 12))::uuid,
  workspace_id,
  id,
  'built',
  'synthetic-renderer-1',
  '{"valid":true}',
  checksum,
  '2026-01-04T00:00:00Z'
FROM artifact_specs
WHERE id::text LIKE '76000000-0000-4000-8000-%'
ON CONFLICT (id) DO NOTHING;

UPDATE artifact_specs
SET current_build_id = ('76100000-0000-4000-8000-' || right(id::text, 12))::uuid
WHERE id::text LIKE '76000000-0000-4000-8000-%';

INSERT INTO exports (
  id, workspace_id, content_run_id, approval_id, format, manifest, status, object_key, checksum, created_by, completed_at
)
VALUES (
  '77000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000001',
  '71000000-0000-4000-8000-000000000003', '74000000-0000-4000-8000-000000000001',
  'markdown', '{"synthetic":true}', 'ready', 'seed/exports/synthetic.md', repeat('e', 64),
  '10000000-0000-4000-8000-000000000001', '2026-01-04T00:00:00Z'
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO publishing_records (
  id, workspace_id, content_asset_id, content_asset_version_id, platform, url, title, published_at, created_by
)
VALUES (
  '78000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000001',
  '75000000-0000-4000-8000-000000000001', '75100000-0000-4000-8000-000000000001',
  'manual-test', 'https://example.test/synthetic-publication', '合成发布记录', '2026-01-05T00:00:00Z',
  '10000000-0000-4000-8000-000000000001'
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO performance_snapshots (
  id, workspace_id, publishing_record_id, captured_at, source, metrics, notes, created_by
)
VALUES (
  '79000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000001',
  '78000000-0000-4000-8000-000000000001', '2026-01-06T00:00:00Z', 'manual',
  '{"views":42,"synthetic":true}', '完全虚构的开发指标', '10000000-0000-4000-8000-000000000001'
)
ON CONFLICT (id) DO NOTHING;
`;

export async function runDevelopmentSeed(connectionString: string): Promise<void> {
  const pool = new Pool({ connectionString, connectionTimeoutMillis: 5_000, max: 1 });
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query(DEVELOPMENT_SEED_SQL);
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}
