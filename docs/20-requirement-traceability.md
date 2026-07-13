# 20. 需求追踪矩阵

本矩阵把功能需求与负责 Epic、页面、API、数据/Schema 和验收证据绑定。它用于 Codex 规划、实现审查和发布验收，不替代原始需求文字。若实现改变任一合同，必须同步更新本矩阵、对应规格和测试。

## 1. 使用规则

- 每个需求只能有一个主要交付 Epic，可以有后续硬化 Epic。
- Codex 计划必须引用本表中的需求 ID，并把验收列落到具体测试。
- API 尚未列入 `contracts/openapi.yaml` 的能力，必须先更新合同再实现。
- “数据/Schema”列是主要落点，不表示可跳过 workspace scope、版本、审计和删除。
- E11 只能硬化既有需求，不能把漏做的核心产品能力包装成运维工作。

## 2. 功能需求

| ID | 标题 | 主要 Epic | 页面 | API | 数据 / Schema | 主要验收证据 |
|---|---|---|---|---|---|---|
| FR-AUTH-001 | 登录 | E01（AUTH-004 同时由 E11 硬化） | P-001、P-002、P-015 | `/auth/magic-links`、`/auth/magic-links/verify`、`/auth/session`、`/auth/logout`、`/workspaces`、`/workspace`、`/workspace/deletion` | users、auth_magic_links、user_sessions、workspaces、workspace_members、deletion_requests | E2E-001、E2E-013、E2E-016；认证安全集成测试 |
| FR-AUTH-002 | 工作区创建 | E01（AUTH-004 同时由 E11 硬化） | P-001、P-002、P-015 | `/auth/magic-links`、`/auth/magic-links/verify`、`/auth/session`、`/auth/logout`、`/workspaces`、`/workspace`、`/workspace/deletion` | users、auth_magic_links、user_sessions、workspaces、workspace_members、deletion_requests | E2E-001、E2E-013、E2E-016；认证安全集成测试 |
| FR-AUTH-003 | 工作区隔离 | E01（AUTH-004 同时由 E11 硬化） | P-001、P-002、P-015 | `/auth/magic-links`、`/auth/magic-links/verify`、`/auth/session`、`/auth/logout`、`/workspaces`、`/workspace`、`/workspace/deletion` | users、auth_magic_links、user_sessions、workspaces、workspace_members、deletion_requests | E2E-001、E2E-013、E2E-016；认证安全集成测试 |
| FR-AUTH-004 | 删除工作区 | E01（AUTH-004 同时由 E11 硬化） | P-001、P-002、P-015 | `/auth/magic-links`、`/auth/magic-links/verify`、`/auth/session`、`/auth/logout`、`/workspaces`、`/workspace`、`/workspace/deletion` | users、auth_magic_links、user_sessions、workspaces、workspace_members、deletion_requests | E2E-001、E2E-013、E2E-016；认证安全集成测试 |
| FR-ONB-001 | 草稿保存 | E01；画像建议与版本完善在 E04 | P-002、P-015 | `/creator-profile`、`/creator-profile/suggestions`、`/creator-profile/activate`、`/columns` | creator profiles/versions、onboarding progress、columns；`creator-profile.schema.json` | E2E-001；autosave race；profile activation/version tests |
| FR-ONB-002 | 画像字段 | E01；画像建议与版本完善在 E04 | P-002、P-015 | `/creator-profile`、`/creator-profile/suggestions`、`/creator-profile/activate`、`/columns` | creator profiles/versions、onboarding progress、columns；`creator-profile.schema.json` | E2E-001；autosave race；profile activation/version tests |
| FR-ONB-003 | AI 画像建议 | E01；画像建议与版本完善在 E04 | P-002、P-015 | `/creator-profile`、`/creator-profile/suggestions`、`/creator-profile/activate`、`/columns` | creator profiles/versions、onboarding progress、columns；`creator-profile.schema.json` | E2E-001；autosave race；profile activation/version tests |
| FR-ONB-004 | 用户确认 | E01；画像建议与版本完善在 E04 | P-002、P-015 | `/creator-profile`、`/creator-profile/suggestions`、`/creator-profile/activate`、`/columns` | creator profiles/versions、onboarding progress、columns；`creator-profile.schema.json` | E2E-001；autosave race；profile activation/version tests |
| FR-ONB-005 | 栏目最小要求 | E01；画像建议与版本完善在 E04 | P-002、P-015 | `/creator-profile`、`/creator-profile/suggestions`、`/creator-profile/activate`、`/columns` | creator profiles/versions、onboarding progress、columns；`creator-profile.schema.json` | E2E-001；autosave race；profile activation/version tests |
| FR-MAT-001 | 文本素材 | E02 | P-003、P-004 | `/materials/*`、`/jobs/{jobId}` | material_items、blobs、versions、processing steps、comments；`material-item.schema.json` | E2E-002/003 捕获段；Upload Tests；SSRF Tests；删除与重复测试 |
| FR-MAT-002 | 文件素材 | E02 | P-003、P-004 | `/materials/*`、`/jobs/{jobId}` | material_items、blobs、versions、processing steps、comments；`material-item.schema.json` | E2E-002/003 捕获段；Upload Tests；SSRF Tests；删除与重复测试 |
| FR-MAT-003 | 音频 | E02 | P-003、P-004 | `/materials/*`、`/jobs/{jobId}` | material_items、blobs、versions、processing steps、comments；`material-item.schema.json` | E2E-002/003 捕获段；Upload Tests；SSRF Tests；删除与重复测试 |
| FR-MAT-004 | URL | E02 | P-003、P-004 | `/materials/*`、`/jobs/{jobId}` | material_items、blobs、versions、processing steps、comments；`material-item.schema.json` | E2E-002/003 捕获段；Upload Tests；SSRF Tests；删除与重复测试 |
| FR-MAT-005 | 图片 | E02 | P-003、P-004 | `/materials/*`、`/jobs/{jobId}` | material_items、blobs、versions、processing steps、comments；`material-item.schema.json` | E2E-002/003 捕获段；Upload Tests；SSRF Tests；删除与重复测试 |
| FR-MAT-006 | 评论批次 | E02 | P-003、P-004 | `/materials/*`、`/jobs/{jobId}` | material_items、blobs、versions、processing steps、comments；`material-item.schema.json` | E2E-002/003 捕获段；Upload Tests；SSRF Tests；删除与重复测试 |
| FR-MAT-007 | 状态 | E02 | P-003、P-004 | `/materials/*`、`/jobs/{jobId}` | material_items、blobs、versions、processing steps、comments；`material-item.schema.json` | E2E-002/003 捕获段；Upload Tests；SSRF Tests；删除与重复测试 |
| FR-MAT-008 | 原文与版本 | E02 | P-003、P-004 | `/materials/*`、`/jobs/{jobId}` | material_items、blobs、versions、processing steps、comments；`material-item.schema.json` | E2E-002/003 捕获段；Upload Tests；SSRF Tests；删除与重复测试 |
| FR-MAT-009 | 删除影响 | E02 | P-003、P-004 | `/materials/*`、`/jobs/{jobId}` | material_items、blobs、versions、processing steps、comments；`material-item.schema.json` | E2E-002/003 捕获段；Upload Tests；SSRF Tests；删除与重复测试 |
| FR-MAT-010 | 内容指纹 | E02 | P-003、P-004 | `/materials/*`、`/jobs/{jobId}` | material_items、blobs、versions、processing steps、comments；`material-item.schema.json` | E2E-002/003 捕获段；Upload Tests；SSRF Tests；删除与重复测试 |
| FR-AI-001 | 结构化输出 | E03；AI 画像消费在 E04 | P-004、P-005、P-006 | `/materials/{id}/reprocess`、`/assets/*`、`/jobs/{jobId}` | chunks、embeddings、insight assets/versions/sources、ai_calls；`insight-asset.schema.json` | E2E-002、E2E-003；Schema/Eval；provider failure；provenance/privacy tests |
| FR-AI-002 | 模型路由 | E03；AI 画像消费在 E04 | P-004、P-005、P-006 | `/materials/{id}/reprocess`、`/assets/*`、`/jobs/{jobId}` | chunks、embeddings、insight assets/versions/sources、ai_calls；`insight-asset.schema.json` | E2E-002、E2E-003；Schema/Eval；provider failure；provenance/privacy tests |
| FR-AI-003 | 资产类型 | E03；AI 画像消费在 E04 | P-004、P-005、P-006 | `/materials/{id}/reprocess`、`/assets/*`、`/jobs/{jobId}` | chunks、embeddings、insight assets/versions/sources、ai_calls；`insight-asset.schema.json` | E2E-002、E2E-003；Schema/Eval；provider failure；provenance/privacy tests |
| FR-AI-004 | 个人经历保护 | E03；AI 画像消费在 E04 | P-004、P-005、P-006 | `/materials/{id}/reprocess`、`/assets/*`、`/jobs/{jobId}` | chunks、embeddings、insight assets/versions/sources、ai_calls；`insight-asset.schema.json` | E2E-002、E2E-003；Schema/Eval；provider failure；provenance/privacy tests |
| FR-AI-005 | 来源定位 | E03；AI 画像消费在 E04 | P-004、P-005、P-006 | `/materials/{id}/reprocess`、`/assets/*`、`/jobs/{jobId}` | chunks、embeddings、insight assets/versions/sources、ai_calls；`insight-asset.schema.json` | E2E-002、E2E-003；Schema/Eval；provider failure；provenance/privacy tests |
| FR-AI-006 | 用户确认 | E03；AI 画像消费在 E04 | P-004、P-005、P-006 | `/materials/{id}/reprocess`、`/assets/*`、`/jobs/{jobId}` | chunks、embeddings、insight assets/versions/sources、ai_calls；`insight-asset.schema.json` | E2E-002、E2E-003；Schema/Eval；provider failure；provenance/privacy tests |
| FR-AI-007 | 合并和重定向 | E03；AI 画像消费在 E04 | P-004、P-005、P-006 | `/materials/{id}/reprocess`、`/assets/*`、`/jobs/{jobId}` | chunks、embeddings、insight assets/versions/sources、ai_calls；`insight-asset.schema.json` | E2E-002、E2E-003；Schema/Eval；provider failure；provenance/privacy tests |
| FR-AI-008 | 隐私 | E03；AI 画像消费在 E04 | P-004、P-005、P-006 | `/materials/{id}/reprocess`、`/assets/*`、`/jobs/{jobId}` | chunks、embeddings、insight assets/versions/sources、ai_calls；`insight-asset.schema.json` | E2E-002、E2E-003；Schema/Eval；provider failure；provenance/privacy tests |
| FR-COL-001 | CRUD | E01 最小创建；E04 完整能力 | P-002、P-015 | `/columns`、`/columns/{columnId}` | columns、column versions/context snapshots | E2E-001；CRUD/version/archive/seriality tests |
| FR-COL-002 | 栏目结构 | E01 最小创建；E04 完整能力 | P-002、P-015 | `/columns`、`/columns/{columnId}` | columns、column versions/context snapshots | E2E-001；CRUD/version/archive/seriality tests |
| FR-COL-003 | 连载性评分 | E01 最小创建；E04 完整能力 | P-002、P-015 | `/columns`、`/columns/{columnId}` | columns、column versions/context snapshots | E2E-001；CRUD/version/archive/seriality tests |
| FR-TOP-001 | 输入范围 | E05 | P-007、P-008 | `/topic-sessions/*`、`/topic-candidates/*` | topic sessions/candidates/sources/feedback；`topic-candidate.schema.json` | E2E-004；评分/去重/相似度/不足候选/eval tests |
| FR-TOP-002 | 候选数量 | E05 | P-007、P-008 | `/topic-sessions/*`、`/topic-candidates/*` | topic sessions/candidates/sources/feedback；`topic-candidate.schema.json` | E2E-004；评分/去重/相似度/不足候选/eval tests |
| FR-TOP-003 | 六维评分 | E05 | P-007、P-008 | `/topic-sessions/*`、`/topic-candidates/*` | topic sessions/candidates/sources/feedback；`topic-candidate.schema.json` | E2E-004；评分/去重/相似度/不足候选/eval tests |
| FR-TOP-004 | 重复检查 | E05 | P-007、P-008 | `/topic-sessions/*`、`/topic-candidates/*` | topic sessions/candidates/sources/feedback；`topic-candidate.schema.json` | E2E-004；评分/去重/相似度/不足候选/eval tests |
| FR-TOP-005 | 证据 | E05 | P-007、P-008 | `/topic-sessions/*`、`/topic-candidates/*` | topic sessions/candidates/sources/feedback；`topic-candidate.schema.json` | E2E-004；评分/去重/相似度/不足候选/eval tests |
| FR-TOP-006 | 编辑与选择 | E05 | P-007、P-008 | `/topic-sessions/*`、`/topic-candidates/*` | topic sessions/candidates/sources/feedback；`topic-candidate.schema.json` | E2E-004；评分/去重/相似度/不足候选/eval tests |
| FR-TOP-007 | “不像我”反馈 | E05 | P-007、P-008 | `/topic-sessions/*`、`/topic-candidates/*` | topic sessions/candidates/sources/feedback；`topic-candidate.schema.json` | E2E-004；评分/去重/相似度/不足候选/eval tests |
| FR-RUN-001 | 创建 | E06 | P-009、P-010、P-011 时间线 | `/content-runs/*`、`/jobs/{jobId}` | content_runs、run_steps、interview questions/answers；`content-brief.schema.json` | E2E-005、E2E-014、E2E-015；状态机/property/idempotency tests |
| FR-RUN-002 | 状态持久化 | E06 | P-009、P-010、P-011 时间线 | `/content-runs/*`、`/jobs/{jobId}` | content_runs、run_steps、interview questions/answers；`content-brief.schema.json` | E2E-005、E2E-014、E2E-015；状态机/property/idempotency tests |
| FR-RUN-003 | 采访缺口 | E06 | P-009、P-010、P-011 时间线 | `/content-runs/*`、`/jobs/{jobId}` | content_runs、run_steps、interview questions/answers；`content-brief.schema.json` | E2E-005、E2E-014、E2E-015；状态机/property/idempotency tests |
| FR-RUN-004 | 回答 | E06 | P-009、P-010、P-011 时间线 | `/content-runs/*`、`/jobs/{jobId}` | content_runs、run_steps、interview questions/answers；`content-brief.schema.json` | E2E-005、E2E-014、E2E-015；状态机/property/idempotency tests |
| FR-RUN-005 | 暂停、取消、恢复 | E06 | P-009、P-010、P-011 时间线 | `/content-runs/*`、`/jobs/{jobId}` | content_runs、run_steps、interview questions/answers；`content-brief.schema.json` | E2E-005、E2E-014、E2E-015；状态机/property/idempotency tests |
| FR-RUN-006 | 预算 | E06 | P-009、P-010、P-011 时间线 | `/content-runs/*`、`/jobs/{jobId}` | content_runs、run_steps、interview questions/answers；`content-brief.schema.json` | E2E-005、E2E-014、E2E-015；状态机/property/idempotency tests |
| FR-RUN-007 | 并发 | E06 | P-009、P-010、P-011 时间线 | `/content-runs/*`、`/jobs/{jobId}` | content_runs、run_steps、interview questions/answers；`content-brief.schema.json` | E2E-005、E2E-014、E2E-015；状态机/property/idempotency tests |
| FR-CONT-001 | 内容简报 | E07 | P-011 | `/content-runs/{id}/brief`、`/content-runs/{id}/assets`、`/content-assets/*` | content briefs/assets/versions/source maps；`content-brief.schema.json`、`content-pack.schema.json` | E2E-006；autosave/version/partial generation/regen/source stale tests |
| FR-CONT-002 | 母内容 | E07 | P-011 | `/content-runs/{id}/brief`、`/content-runs/{id}/assets`、`/content-assets/*` | content briefs/assets/versions/source maps；`content-brief.schema.json`、`content-pack.schema.json` | E2E-006；autosave/version/partial generation/regen/source stale tests |
| FR-CONT-003 | 视频脚本 | E07 | P-011 | `/content-runs/{id}/brief`、`/content-runs/{id}/assets`、`/content-assets/*` | content briefs/assets/versions/source maps；`content-brief.schema.json`、`content-pack.schema.json` | E2E-006；autosave/version/partial generation/regen/source stale tests |
| FR-CONT-004 | 图文卡片 | E07 | P-011 | `/content-runs/{id}/brief`、`/content-runs/{id}/assets`、`/content-assets/*` | content briefs/assets/versions/source maps；`content-brief.schema.json`、`content-pack.schema.json` | E2E-006；autosave/version/partial generation/regen/source stale tests |
| FR-CONT-005 | 短视频 | E07 | P-011 | `/content-runs/{id}/brief`、`/content-runs/{id}/assets`、`/content-assets/*` | content briefs/assets/versions/source maps；`content-brief.schema.json`、`content-pack.schema.json` | E2E-006；autosave/version/partial generation/regen/source stale tests |
| FR-CONT-006 | 短观点 | E07 | P-011 | `/content-runs/{id}/brief`、`/content-runs/{id}/assets`、`/content-assets/*` | content briefs/assets/versions/source maps；`content-brief.schema.json`、`content-pack.schema.json` | E2E-006；autosave/version/partial generation/regen/source stale tests |
| FR-CONT-007 | 拍摄清单 | E07 | P-011 | `/content-runs/{id}/brief`、`/content-runs/{id}/assets`、`/content-assets/*` | content briefs/assets/versions/source maps；`content-brief.schema.json`、`content-pack.schema.json` | E2E-006；autosave/version/partial generation/regen/source stale tests |
| FR-CONT-008 | 版本 | E07 | P-011 | `/content-runs/{id}/brief`、`/content-runs/{id}/assets`、`/content-assets/*` | content briefs/assets/versions/source maps；`content-brief.schema.json`、`content-pack.schema.json` | E2E-006；autosave/version/partial generation/regen/source stale tests |
| FR-CONT-009 | 局部重生成 | E07 | P-011 | `/content-runs/{id}/brief`、`/content-runs/{id}/assets`、`/content-assets/*` | content briefs/assets/versions/source maps；`content-brief.schema.json`、`content-pack.schema.json` | E2E-006；autosave/version/partial generation/regen/source stale tests |
| FR-CONT-010 | 来源使用 | E07 | P-011 | `/content-runs/{id}/brief`、`/content-runs/{id}/assets`、`/content-assets/*` | content briefs/assets/versions/source maps；`content-brief.schema.json`、`content-pack.schema.json` | E2E-006；autosave/version/partial generation/regen/source stale tests |
| FR-CLAIM-001 | 声明类型 | E08 | P-011 审核面板 | `/content-runs/{id}/review`、`/review-findings/{id}`、`/content-runs/{id}/approve` | claims/claim_sources/review_runs/findings/approvals；`source-claim.schema.json`、`review-result.schema.json` | E2E-007、008、009；rule matrix；approval immutability/stale/eval tests |
| FR-CLAIM-002 | 支持状态 | E08 | P-011 审核面板 | `/content-runs/{id}/review`、`/review-findings/{id}`、`/content-runs/{id}/approve` | claims/claim_sources/review_runs/findings/approvals；`source-claim.schema.json`、`review-result.schema.json` | E2E-007、008、009；rule matrix；approval immutability/stale/eval tests |
| FR-CLAIM-003 | 阻断 | E08 | P-011 审核面板 | `/content-runs/{id}/review`、`/review-findings/{id}`、`/content-runs/{id}/approve` | claims/claim_sources/review_runs/findings/approvals；`source-claim.schema.json`、`review-result.schema.json` | E2E-007、008、009；rule matrix；approval immutability/stale/eval tests |
| FR-CLAIM-004 | 质量检查 | E08 | P-011 审核面板 | `/content-runs/{id}/review`、`/review-findings/{id}`、`/content-runs/{id}/approve` | claims/claim_sources/review_runs/findings/approvals；`source-claim.schema.json`、`review-result.schema.json` | E2E-007、008、009；rule matrix；approval immutability/stale/eval tests |
| FR-CLAIM-005 | 再检查 | E08 | P-011 审核面板 | `/content-runs/{id}/review`、`/review-findings/{id}`、`/content-runs/{id}/approve` | claims/claim_sources/review_runs/findings/approvals；`source-claim.schema.json`、`review-result.schema.json` | E2E-007、008、009；rule matrix；approval immutability/stale/eval tests |
| FR-CLAIM-006 | 接受风险 | E08 | P-011 审核面板 | `/content-runs/{id}/review`、`/review-findings/{id}`、`/content-runs/{id}/approve` | claims/claim_sources/review_runs/findings/approvals；`source-claim.schema.json`、`review-result.schema.json` | E2E-007、008、009；rule matrix；approval immutability/stale/eval tests |
| FR-CLAIM-007 | 审批失效 | E08 | P-011 审核面板 | `/content-runs/{id}/review`、`/review-findings/{id}`、`/content-runs/{id}/approve` | claims/claim_sources/review_runs/findings/approvals；`source-claim.schema.json`、`review-result.schema.json` | E2E-007、008、009；rule matrix；approval immutability/stale/eval tests |
| FR-ART-001 | 模板类型 | E09 | P-012 | `/content-runs/{id}/artifact*`、`/artifacts/{id}*` | artifact_specs/builds；`interactive-artifact.schema.json` | E2E-010；formula fuzz；XSS/CSP/iframe/no-network/ZIP/a11y tests |
| FR-ART-002 | 生成方式 | E09 | P-012 | `/content-runs/{id}/artifact*`、`/artifacts/{id}*` | artifact_specs/builds；`interactive-artifact.schema.json` | E2E-010；formula fuzz；XSS/CSP/iframe/no-network/ZIP/a11y tests |
| FR-ART-003 | Calculator | E09 | P-012 | `/content-runs/{id}/artifact*`、`/artifacts/{id}*` | artifact_specs/builds；`interactive-artifact.schema.json` | E2E-010；formula fuzz；XSS/CSP/iframe/no-network/ZIP/a11y tests |
| FR-ART-004 | Quiz | E09 | P-012 | `/content-runs/{id}/artifact*`、`/artifacts/{id}*` | artifact_specs/builds；`interactive-artifact.schema.json` | E2E-010；formula fuzz；XSS/CSP/iframe/no-network/ZIP/a11y tests |
| FR-ART-005 | Checklist | E09 | P-012 | `/content-runs/{id}/artifact*`、`/artifacts/{id}*` | artifact_specs/builds；`interactive-artifact.schema.json` | E2E-010；formula fuzz；XSS/CSP/iframe/no-network/ZIP/a11y tests |
| FR-ART-006 | 安全 | E09 | P-012 | `/content-runs/{id}/artifact*`、`/artifacts/{id}*` | artifact_specs/builds；`interactive-artifact.schema.json` | E2E-010；formula fuzz；XSS/CSP/iframe/no-network/ZIP/a11y tests |
| FR-ART-007 | 导出 | E09 | P-012 | `/content-runs/{id}/artifact*`、`/artifacts/{id}*` | artifact_specs/builds；`interactive-artifact.schema.json` | E2E-010；formula fuzz；XSS/CSP/iframe/no-network/ZIP/a11y tests |
| FR-EXP-001 | 导出权限 | E10 | P-013、P-014 | `/exports*`、`/content-assets/{id}/publishing-records`、`/publishing-records/{id}/metrics` | exports/files、publishing records、performance snapshots、feedback links | E2E-011、012；snapshot/watermark/signed URL/metrics/comments tests |
| FR-EXP-002 | 格式 | E10 | P-013、P-014 | `/exports*`、`/content-assets/{id}/publishing-records`、`/publishing-records/{id}/metrics` | exports/files、publishing records、performance snapshots、feedback links | E2E-011、012；snapshot/watermark/signed URL/metrics/comments tests |
| FR-EXP-003 | 下载 | E10 | P-013、P-014 | `/exports*`、`/content-assets/{id}/publishing-records`、`/publishing-records/{id}/metrics` | exports/files、publishing records、performance snapshots、feedback links | E2E-011、012；snapshot/watermark/signed URL/metrics/comments tests |
| FR-EXP-004 | 发布记录 | E10 | P-013、P-014 | `/exports*`、`/content-assets/{id}/publishing-records`、`/publishing-records/{id}/metrics` | exports/files、publishing records、performance snapshots、feedback links | E2E-011、012；snapshot/watermark/signed URL/metrics/comments tests |
| FR-EXP-005 | 表现数据 | E10 | P-013、P-014 | `/exports*`、`/content-assets/{id}/publishing-records`、`/publishing-records/{id}/metrics` | exports/files、publishing records、performance snapshots、feedback links | E2E-011、012；snapshot/watermark/signed URL/metrics/comments tests |
| FR-EXP-006 | 反馈入库 | E10 | P-013、P-014 | `/exports*`、`/content-assets/{id}/publishing-records`、`/publishing-records/{id}/metrics` | exports/files、publishing records、performance snapshots、feedback links | E2E-011、012；snapshot/watermark/signed URL/metrics/comments tests |
| FR-OPS-001 | AI 调用日志 | E00 基座；E03 记录；E11 发布硬化 | 全局管理和错误状态 | `/jobs/{jobId}`、`/health/live`、`/health/ready`、`/usage/*`、`/audit-logs`；Feature Flag 与 Prompt 版本无公开写接口 | ai_calls、jobs、outbox、audit、feature_flags、prompt_versions | contract/schema/migration；recovery；observability；release checklist |
| FR-OPS-002 | Job 状态 | E00 基座；E03 记录；E11 发布硬化 | 全局管理和错误状态 | `/jobs/{jobId}`、`/health/live`、`/health/ready`、`/usage/*`、`/audit-logs`；Feature Flag 与 Prompt 版本无公开写接口 | ai_calls、jobs、outbox、audit、feature_flags、prompt_versions | contract/schema/migration；recovery；observability；release checklist |
| FR-OPS-003 | 健康检查 | E00 基座；E03 记录；E11 发布硬化 | 全局管理和错误状态 | `/jobs/{jobId}`、`/health/live`、`/health/ready`、`/usage/*`、`/audit-logs`；Feature Flag 与 Prompt 版本无公开写接口 | ai_calls、jobs、outbox、audit、feature_flags、prompt_versions | contract/schema/migration；recovery；observability；release checklist |
| FR-OPS-004 | 审计 | E00 基座；E03 记录；E11 发布硬化 | 全局管理和错误状态 | `/jobs/{jobId}`、`/health/live`、`/health/ready`、`/usage/*`、`/audit-logs`；Feature Flag 与 Prompt 版本无公开写接口 | ai_calls、jobs、outbox、audit、feature_flags、prompt_versions | contract/schema/migration；recovery；observability；release checklist |
| FR-OPS-005 | Feature Flag | E00 基座；E03 记录；E11 发布硬化 | 全局管理和错误状态 | `/jobs/{jobId}`、`/health/live`、`/health/ready`、`/usage/*`、`/audit-logs`；Feature Flag 与 Prompt 版本无公开写接口 | ai_calls、jobs、outbox、audit、feature_flags、prompt_versions | contract/schema/migration；recovery；observability；release checklist |
| FR-OPS-006 | Prompt 版本 | E00 基座；E03 记录；E11 发布硬化 | 全局管理和错误状态 | `/jobs/{jobId}`、`/health/live`、`/health/ready`、`/usage/*`、`/audit-logs`；Feature Flag 与 Prompt 版本无公开写接口 | ai_calls、jobs、outbox、audit、feature_flags、prompt_versions | contract/schema/migration；recovery；observability；release checklist |
| NFR-001 | 页面 | E00 基座；各 Epic 持续验证；E11 发布门 | 全部关键页面 | 所有 API 的性能、状态与兼容性合同 | 索引、队列、缓存、审计、配置 | Performance Tests；Accessibility；browser matrix；E2E-001~016 |
| NFR-002 | 异步反馈 | E00 基座；各 Epic 持续验证；E11 发布门 | 全部关键页面 | 所有 API 的性能、状态与兼容性合同 | 索引、队列、缓存、审计、配置 | Performance Tests；Accessibility；browser matrix；E2E-001~016 |
| NFR-003 | 可恢复 | E00 基座；各 Epic 持续验证；E11 发布门 | 全部关键页面 | 所有 API 的性能、状态与兼容性合同 | 索引、队列、缓存、审计、配置 | Performance Tests；Accessibility；browser matrix；E2E-001~016 |
| NFR-004 | 规模假设 | E00 基座；各 Epic 持续验证；E11 发布门 | 全部关键页面 | 所有 API 的性能、状态与兼容性合同 | 索引、队列、缓存、审计、配置 | Performance Tests；Accessibility；browser matrix；E2E-001~016 |
| NFR-005 | 可访问性 | E00 基座；各 Epic 持续验证；E11 发布门 | 全部关键页面 | 所有 API 的性能、状态与兼容性合同 | 索引、队列、缓存、审计、配置 | Performance Tests；Accessibility；browser matrix；E2E-001~016 |
| NFR-006 | 浏览器 | E00 基座；各 Epic 持续验证；E11 发布门 | 全部关键页面 | 所有 API 的性能、状态与兼容性合同 | 索引、队列、缓存、审计、配置 | Performance Tests；Accessibility；browser matrix；E2E-001~016 |
| NFR-007 | 国际化 | E00 基座；各 Epic 持续验证；E11 发布门 | 全部关键页面 | 所有 API 的性能、状态与兼容性合同 | 索引、队列、缓存、审计、配置 | Performance Tests；Accessibility；browser matrix；E2E-001~016 |

## 3. Epic 发布门

| Epic | 进入条件 | 退出条件 | 禁止带入下一 Epic 的债务 |
|---|---|---|---|
| E00 | 规格校验通过 | 工程命令、基础设施、迁移、队列、fakes、CI 可重复 | 假命令、live API 依赖、无恢复队列 |
| E01 | E00 accepted | 登录、隔离、引导、栏目最小流、删除状态真实 | 越权、autosave 覆盖、假删除 |
| E02 | E01 accepted | 全部素材入口、安全校验、状态与删除影响 | SSRF/MIME 缺口、假进度、原文可变 |
| E03 | E02 accepted | 可追溯资产、确认/合并、AI 调用账本与 Eval | 未校验模型输出、虚构个人经历、无 provenance |
| E04 | E03 accepted | 画像/术语/栏目版本可确认并形成稳定 snapshot | 模型自动激活、栏目历史丢失 |
| E05 | E04 accepted | 3-5 个独特候选或诚实不足，评分可复算 | 复制凑数、无证据高分、自动选择 |
| E06 | E05 accepted | 任务可恢复，缺口先采访，预算/取消真实 | 重复计费、丢 checkpoint、自动保存采访资产 |
| E07 | E06 accepted | 完整内容包、编辑版本、局部 diff、source map | AI 覆盖用户稿、机械裁剪、假批准 |
| E08 | E07 accepted | blocker 门、不可变批准、失效机制 | 可绕过 blocker、unsupported 被升级、旧审查批准新稿 |
| E09 | E08 accepted | 三种安全模板、无任意代码、静态构建 | eval/new Function、外部网络、未隔离预览 |
| E10 | E08；artifact 导出需 E09 | 批准/草稿导出、人工发布记录、指标/评论回流 | 导出冒充发布、浮动版本、无水印草稿 |
| E11 | E00-E10 accepted | E2E/Eval/安全/删除/恢复/运维 go | P0/P1、critical/high、无证据的通过声明 |

## 4. 变更控制

新增或修改需求时必须同时检查：`docs/06-functional-spec.md`、本矩阵、对应 `tasks/`、OpenAPI、JSON Schema、SQL/迁移、E2E 与 Eval。核心枚举和状态机只允许在一个 ADR 解释迁移与兼容方案后改变。
