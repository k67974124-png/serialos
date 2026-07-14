# 09. 数据模型与状态机

完整 SQL 草案见 `db/schema.sql`。本文件定义领域含义与关键约束。

## 1. ID、时间与租户

- 主键使用 UUID。
- 所有时间为 UTC `timestamptz`。
- 所有业务表直接或间接属于 `workspace_id`。
- URL 中的 ID 不作为授权依据。
- 可编辑对象包含 `version` 整数用于乐观并发。
- 软删除字段为 `deleted_at`，但敏感原始文件删除必须最终物理执行。
- JSONB 只用于模型输出、灵活元数据和版本快照，不替代核心可查询字段。

## 2. 核心实体

### users

- id；
- email；
- display_name；
- status；
- created_at；
- last_login_at。

### workspaces

- id；
- name；
- slug；
- locale；
- timezone；
- onboarding_status；
- status；
- settings；
- deletion_requested_at；
- deleted_at。

### workspace_members

MVP 只有 owner，但保留：

- workspace_id；
- user_id；
- role；
- status。

### auth_magic_links 与 user_sessions

认证支撑实体：

- `auth_magic_links` 保存邮箱、token hash、过期时间、消费时间、撤销时间和请求摘要；
- `user_sessions` 保存 session token hash、用户、当前工作区、轮换链、过期时间和撤销时间；
- 原始 token 不入库，不进入日志，也不通过 API 返回；
- 同一 magic link 只能原子消费一次。

### onboarding_progress

- workspace_id；
- current_step；
- status：not_started/in_progress/completed；
- draft_data；
- postponed_column；
- version；
- completed_at。

### feature_flags 与 prompt_versions

- `feature_flags` 保存服务端强制执行的工作区或全局开关、变更人和版本；
- `prompt_versions` 保存 prompt ID、版本、内容 hash、schema 引用、评测状态、发布时间和归档时间；
- 两者的生产变更必须可审计，Prompt 版本不得覆盖历史记录。

### creator_profiles

版本化：

- workspace_id；
- version；
- positioning；
- goals；
- domains；
- audiences JSON；
- voice JSON；
- boundaries JSON；
- confidence；
- status：draft/active/archived；
- confirmed_at。

同一工作区只能有一个 active 版本。

### columns

- workspace_id；
- name；
- promise；
- audience；
- topics；
- excluded_topics；
- default_formats；
- structure_template；
- cadence；
- status。

### profile_suggestions、terminology_rules 与 content_boundaries

- `profile_suggestions` 保存模型建议、证据引用、置信度和用户接受/拒绝状态；
- `terminology_rules` 保存推荐词、禁用词、替代词和适用范围；
- `content_boundaries` 保存不可公开、需确认和允许范围；
- 模型建议和用户确认值必须分表或分字段保存，不得在 UI 中混淆。

### column_versions 与 column_context_snapshots

- 栏目每次修改生成不可变版本；
- 创建制作任务时保存栏目上下文快照；
- 后续编辑栏目不静默改变正在运行或已批准的内容任务。

### material_items

- workspace_id；
- type；
- title；
- origin；
- status；
- privacy_level；
- is_personal_experience；
- current_version_id；
- source_url；
- metadata；
- processing_summary；
- created_by；
- deleted_at。

### material_blobs

- material_id；
- object_key；
- media_type；
- size_bytes；
- sha256；
- duration_ms；
- scan_status；
- storage_status。

### material_versions

- material_id；
- version；
- normalized_text；
- text_sha256；
- language；
- edited_by；
- created_at。

### material_chunks

- material_version_id；
- ordinal；
- text；
- start_offset/end_offset；
- start_ms/end_ms；
- text_sha256；
- embedding；
- search_vector；
- metadata。

### material_processing_steps

- material_id/material_version_id；
- step_name；
- status；
- attempt；
- input_hash；
- output_reference；
- model_call_id；
- last_error；
- started_at/completed_at。

唯一约束 `(material_id, step_name, input_hash)` 保证同一输入的处理步骤幂等。

### comment_batches 与 comments

- 评论导入先创建批次，再保存单条评论；
- 批次可关联发布记录，但允许在发布记录不存在时作为普通素材导入；
- 评论正文遵守与其他素材相同的隐私、删除和模型发送规则。

### material_duplicate_candidates

保存文本 hash、文件 hash、语义相似度、候选素材和用户处理结果。系统只建议合并或忽略，不自动删除原素材。

### insight_assets

- workspace_id；
- type；
- title；
- statement；
- context；
- audience；
- confidence；
- privacy_level；
- confirmation_status；
- lifecycle_status；
- usage_count；
- current_version；
- embedding；
- search_vector。

### insight_asset_sources

- asset_id；
- material_id；
- material_version_id；
- chunk_id；
- start/end；
- excerpt；
- support_type；
- created_by_model_call。

### insight_asset_relations

- from_asset_id；
- to_asset_id；
- relation_type：similar/supports/contradicts/derived_from/merged_into；
- score；
- metadata。

### topic_sessions

一次选题会：

- workspace_id；
- column_id；
- configuration；
- status；
- started_at/completed_at；
- model metadata。

### topic_candidates

- topic_session_id；
- title；
- thesis；
- audience；
- rationale；
- scores；
- overall_score；
- gaps；
- risks；
- artifact_suggestion；
- status；
- selected_at；
- embedding。

### topic_candidate_sources

连接候选与资产、历史内容或研究来源。

### content_runs

- workspace_id；
- topic_candidate_id；
- column_id；
- status；
- active_step；
- config；
- budget；
- estimated_cost；
- actual_cost；
- current_brief_id；
- created_by；
- canceled_at；
- completed_at；
- version。

### run_steps

- run_id；
- step_name；
- status；
- attempt；
- input_hash；
- output_reference；
- checkpoint；
- started_at/completed_at；
- last_error；
- model_call_id。

唯一约束 `(run_id, step_name, input_hash)` 支持幂等。

### interview_questions

- run_id；
- ordinal；
- question；
- rationale；
- target_gap；
- required；
- status。

### interview_answers

- question_id；
- text；
- material_id（音频回答可关联）；
- save_as_asset；
- created_at。

### content_briefs

- run_id；
- version；
- schema_version；
- data JSONB；
- status；
- created_by_model_call。

### content_assets

- workspace_id；
- run_id；
- type；
- title；
- status；
- current_version_id；
- approved_version_id；
- published_record_count；
- embedding；
- metadata。

### content_asset_versions

- content_asset_id；
- version；
- body；
- structured_body JSONB；
- source_map JSONB；
- created_by：model/user/system；
- prompt/model references；
- checksum；
- created_at。

### source_documents

统一表示外部研究和可引用来源：

- workspace_id；
- type；
- title；
- url；
- publisher；
- published_at；
- retrieved_at；
- excerpt；
- content_hash；
- trust_metadata；
- material_id 可选。

### claims

- workspace_id；
- content_asset_version_id；
- claim_text；
- claim_type；
- support_status；
- start_offset/end_offset；
- risk_level；
- stale；
- metadata。

### claim_sources

- claim_id；
- source_document_id 或 material/asset source；
- relationship；
- excerpt；
- support_strength。

应通过约束确保至少一种 source reference 非空。

### review_runs

- content_run_id；
- content_version_set_hash；
- status；
- scores；
- gate；
- prompt/model；
- completed_at。

### review_findings

- review_run_id；
- content_asset_version_id；
- category；
- severity；
- rule_id；
- message；
- location；
- suggested_fix；
- status；
- accepted_reason；
- stale。

### approvals

- content_run_id；
- approver_id；
- version_set；
- quality_report_id；
- warnings；
- checksum；
- invalidated_at；
- created_at。

### artifact_specs

- content_run_id；
- type；
- version；
- schema_version；
- spec JSONB；
- status；
- current_build_id。

### artifact_builds

由于模板化，build 主要是编译和验证：

- artifact_spec_id；
- status；
- renderer_version；
- output_object_key；
- validation_results；
- checksum；
- created_at。

### exports

- workspace_id；
- content_run_id；
- format；
- status；
- object_key；
- expires_at；
- checksum；
- created_by。

### publishing_records

- content_asset_id；
- version_id；
- platform；
- url；
- published_at；
- title；
- notes；
- created_by。

### performance_snapshots

- publishing_record_id；
- captured_at；
- source：manual/import/integration；
- metrics JSONB；
- notes。

### topic_candidate_feedback

保存用户对候选选题的喜欢、不喜欢、原因和可选标签，用于后续排序评估；不得把单次反馈直接当作稳定画像事实。

### content_run_snapshots

在任务创建、恢复、批准和导出等关键节点保存输入版本集合、预算、模型路由和上下文 hash，支持重放与问题定位。

### regeneration_requests

保存局部重生成的选区、指令、保留约束、源版本、结果版本、状态和模型调用。接受结果必须显式生成新的内容版本。

### jobs 与 outbox_events

- `jobs` 是异步执行的持久化事实，保存 attempt、锁、heartbeat、progress、current_step、checkpoint、取消请求、dead-letter 时间和资源引用；
- `outbox_events` 与业务事务一起写入，由 Worker 至少一次投递；
- 消费者必须通过 event ID 或业务幂等键去重。

### ai_calls

- workspace_id；
- content_run_id/material_id；
- step；
- provider；
- model；
- reasoning；
- prompt_id/version；
- schema_id/version；
- input_hash/output_hash；
- provider_request_id；
- usage JSONB；
- tool_calls JSONB；
- estimated_cost；
- latency_ms；
- status；
- error_code；
- encrypted_debug_ref 可选；
- created_at。

### audit_logs

- workspace_id；
- actor；
- action；
- resource_type/id；
- before/after 摘要；
- ip_hash；
- user_agent_hash；
- created_at。

`audit_logs` 是 append-only 事实：应用只允许插入，数据库触发器拒绝 UPDATE 和 DELETE。

## 3. 状态转换约束

### material_items

允许：

```text
uploaded -> processing
processing -> ready_for_enrichment | ready | needs_review | failed
ready_for_enrichment -> processing | archived | deleting
needs_review -> processing | ready | archived | deleting
failed -> processing | archived | deleting
ready -> processing | archived | deleting
uploaded | processing | archived -> deleting
deleting -> deleted
```

`material_items.status` 表示粗粒度生命周期；上传、校验、标准化、转写、嵌入和资产抽取等细节保存在 processing step。失败是否可重试属于错误分类。任何 late worker result 都不能把 deleting/deleted 素材恢复。MVP 不提供从 deleted 恢复原文件。

### content_runs

```text
draft -> queued
queued -> collecting_context | paused | cancel_requested
collecting_context -> needs_input | briefing | needs_budget_approval | paused | failed | cancel_requested
needs_input -> briefing | paused | cancel_requested
needs_budget_approval -> queued | paused | cancel_requested
briefing -> generating | needs_input | needs_budget_approval | paused | failed | cancel_requested
generating -> building_artifact | quality_check | needs_input | needs_budget_approval | paused | failed | cancel_requested
building_artifact -> quality_check | needs_budget_approval | paused | failed | cancel_requested
quality_check -> in_review | generating | failed | cancel_requested
in_review -> approved | generating | cancel_requested
approved -> exported | in_review
cancel_requested -> canceled
paused -> queued | canceled
failed -> queued | canceled    # 仅 last_error.retryable=true
exported -> exported
```

`active_step` 和 `run_steps.step_name` 保存 gap analysis、answer processing、brief generation 和各格式生成等细节。批准后内容编辑会使 run 回到 `in_review`，并使当前 approval 失效。

### content_assets

```text
draft -> needs_review
needs_review -> approved
approved -> needs_review | exported
exported -> needs_review | published_recorded
published_recorded -> needs_review
```

### findings

```text
open -> resolved | dismissed | accepted_risk
```

约束：

- blocker 不允许 accepted_risk；
- 编辑使相关 finding stale；
- stale finding 不可用于批准。

## 4. 数据完整性

- 工作区删除时所有对象通过 `workspace_id` 可定位。
- `current_version_id` 必须属于同一父对象。
- `approved_version_id` 必须属于同一内容资产。
- claim offset 必须在对应正文范围内。
- source excerpt 必须限制长度。
- 一个 active creator profile。
- 一个 run 同一 step/input_hash 至多一个成功结果。
- 导出只引用同一工作区批准版本。
- 发布记录绑定明确版本，而不是“当前版本”。
- 互动 spec 类型与 JSON Schema 一致。

## 5. 搜索与索引

建议：

- `workspace_id, created_at`；
- 状态和工作区复合索引；
- GIN tsvector；
- pgvector HNSW 或 IVFFlat，按规模和版本选择；
- URL/hash 唯一或条件索引；
- active job partial index；
- unresolved blocker partial index；
- soft delete partial index；
- audit logs append-only index。

所有 vector 查询先以 workspace_id 过滤，防止跨租户近邻。

## 6. 保留策略

默认建议，可配置：

- 原始素材：直到用户删除；
- 原始音频：用户可设置 30/90 天或永久，默认 90 天；
- 标准化文本和确认资产：直到用户删除；
- 临时调试原文：默认关闭；开启时不超过 7 天；
- 导出文件：30 天后清理，可重新生成；
- AI 调用元数据：至少 180 天；
- provider 原始响应引用：按最小化原则；
- 审计日志：至少 1 年，工作区删除后仅保留法律允许的最小记录；
- 删除任务失败记录：直到修复。

## 7. 数据迁移原则

- 迁移前向兼容；
- 不在请求路径做大规模 backfill；
- 新字段先 nullable，后台填充，再加约束；
- Prompt/Schema 版本变更不改写历史结果；
- embedding 模型变更使用新列或模型版本字段分批重建；
- 所有破坏性迁移需要回滚或恢复方案。
