# 13. 产品分析、AI 评测与实验

## 1. 目标

分析系统要区分三类问题：

1. 用户是否持续完成创作；
2. 工作流哪里卡住；
3. AI 的哪一步质量或成本不达标。

不得只追踪生成次数，因为生成而未批准可能只是更快地产生废稿。

## 2. 北极星与分解指标

### 北极星

`approved_and_exported_content_packs_per_active_workspace_per_month`

### 激活

用户在 7 天内完成：

- onboarding_completed；
- 至少 3 条素材 ready；
- 至少 5 个 confirmed assets；
- 至少 1 个 active column；
- 至少 1 次 topic_session_completed；
- 至少 1 个 content_run 进入 in_review。

### 价值

- content_pack_approval_rate；
- median_review_time；
- creator_material_coverage；
- claim_source_coverage；
- content_edit_distance；
- local_regeneration_acceptance；
- artifact_build_success；
- export_rate。

### 留存

- W1、W4 active；
- 连续周完成内容包；
- 每周新增素材；
- 每周回到 Studio。

### 质量

- blocker_count_per_pack；
- unsupported_personal_claim_rate；
- unsupported_external_fact_rate；
- duplicate_topic_rate；
- high_voice_deviation_rate；
- approval_invalidations；
- post_export_corrections。

### 成本与性能

- cost_per_in_review_pack；
- cost_per_approved_pack；
- tokens_by_step/model；
- retry_rate；
- schema_repair_rate；
- queue_wait；
- run_duration；
- cancellation；
- budget_pause。

## 3. 事件规范

所有事件包含：

- event_id；
- event_name；
- occurred_at；
- workspace_id；
- user_id（内部 pseudonymous）；
- session_id；
- request_id；
- app_version；
- properties；
- consent/context。

核心事件：

### Onboarding

- onboarding_started；
- onboarding_step_completed；
- onboarding_completed；
- profile_suggestion_requested；
- profile_suggestion_confirmed；
- column_created。

### Materials

- material_capture_opened；
- material_created；
- upload_completed；
- material_processing_started；
- material_ready；
- material_needs_review；
- material_failed；
- transcript_edited；
- material_deleted。

### Assets

- asset_extracted；
- asset_confirmed；
- asset_rejected；
- asset_edited；
- assets_merged；
- privacy_changed；
- asset_saved_from_content。

### Topics

- topic_session_created；
- topic_session_completed；
- topic_candidate_viewed；
- topic_candidate_selected；
- topic_candidate_feedback；
- candidate_regenerated。

### Runs

- content_run_created；
- content_run_started；
- content_run_needs_input；
- interview_answered；
- run_resumed；
- run_step_started/completed/failed；
- budget_soft_reached；
- budget_hard_reached；
- run_canceled；
- run_in_review。

### Editing and review

- content_asset_opened；
- content_asset_edited；
- regeneration_requested；
- regeneration_accepted/rejected；
- claim_opened；
- claim_fixed；
- finding_resolved；
- warning_accepted；
- review_rerun；
- content_pack_approved；
- approval_invalidated。

### Artifact

- artifact_recommended；
- artifact_generated；
- artifact_edited；
- artifact_validation_failed；
- artifact_built；
- artifact_previewed。

### Export and performance

- export_requested；
- export_ready；
- export_downloaded；
- publishing_record_created；
- metrics_recorded；
- comments_imported。

## 4. 隐私

- 不把正文、Prompt、URL query、邮箱、文件名原文放进分析事件；
- workspace/user 使用内部 ID；
- 可配置完全关闭产品分析；
- 运营分析与审计分开；
- 不把分析 SDK 默认加载到公开 artifact；
- 公共 artifact 不采集读者答案，除非未来明确设计同意机制。

## 5. Golden Set

设计伙伴发布前至少建立 30 个案例，覆盖：

- 5 种创作者声音；
- 4 个垂直领域；
- 文本、音频、PDF、URL 和评论；
- 素材充足/不足；
- 个人经历；
- 冲突来源；
- 隐私实体；
- 重复选题；
- 高风险内容；
- 三种 artifact；
- 中文口语和书面语。

数据必须脱敏或使用合成数据。未经许可不得将真实客户内容提交到仓库。

## 6. Eval 套件

### EVAL-MATERIAL-001 资产抽取

检查：

- Schema；
- 来源定位；
- 类型；
- 个人经历标记；
- 资产遗漏/误报；
- 隐私。

### EVAL-PROFILE-001 画像建议

检查：

- 是否引用代表内容；
- 是否把模型判断冒充用户确认；
- 是否过度刻板；
- 禁用规则遵守；
- 证据覆盖。

### EVAL-TOPIC-001 选题候选

检查：

- 3 至 5 个；
- 不重复；
- 至少 2 个来源；
- 六维评分可解释；
- 与栏目相关；
- 不触及排除主题；
- 能指出缺口；
- 非标题农场。

### EVAL-BRIEF-001 简报

检查：

- 命题明确；
- 结构；
- 必用资产；
- 禁止内容；
- claims；
- formats；
- 缺口没有被虚构填充。

### EVAL-CONTENT-001 内容包

检查：

- 个人素材覆盖；
- 无编造；
- 跨格式差异；
- 中文自然度；
- 结构完整；
- 来源一致；
- 禁用词；
- 长度。

### EVAL-CLAIM-001 声明

检查：

- 召回；
- 类型；
- 来源映射；
- unsupported 检出；
- 冲突；
- offset。

### EVAL-REVIEW-001 审校

检查：

- blocker 召回；
- false positive；
- 修复建议具体；
- 不直接改稿；
- 不把主观风格当 blocker。

### EVAL-ARTIFACT-001 互动作品

检查：

- Schema；
- 公式；
- 结果覆盖；
- 极端值；
- 无任意代码；
- 可访问性；
- 文案与主题一致。

## 7. Graders

结合：

- 确定性 grader；
- model grader；
- 人工双人评审；
- 用户实际编辑差异。

确定性优先用于：

- Schema；
- 来源 ID；
- 长度；
- 禁用词；
- 公式；
- 版本；
- 权限。

Model grader 只用于：

- 声音；
- 论证；
- 过度承诺；
- 格式适配；
- 内容空泛。

高风险指标不能只由同一模型自评。

## 8. 基线阈值

发布门建议：

- schema_validity = 100%；
- cross_workspace_source_reference = 0；
- fabricated_personal_experience = 0；
- invalid_source_id = 0；
- unsupported_external_fact blocker recall >= 0.95；
- topic_duplicate_rate <= 0.10；
- artifact_schema_validity = 100%；
- artifact_security_test = 100%；
- critical E2E = 100%；
- Golden Set 总体不得显著低于前一生产版本。

声音和编辑质量使用人工均分与置信区间，不用虚假的单点精确度。

## 9. Prompt/模型发布

每次变化：

1. 创建实验版本；
2. 跑固定 Eval；
3. 与 production 比较；
4. 检查成本和延迟；
5. 人工抽样；
6. 小比例 feature rollout；
7. 监控 blocker、编辑距离和失败；
8. 扩大或回滚；
9. 记录 model/prompt/schema 组合。

## 10. A/B 实验限制

MVP 不优先做增长实验。可以测试：

- 选题卡布局；
- 采访问题数量；
- 内容包默认格式；
- 质量报告呈现。

不能在用户不知情时测试：

- 放宽事实规则；
- 自动新增个人经历；
- 不同隐私策略；
- 关闭 blocker；
- 发送更多用户数据；
- 自动发布。

## 11. 编辑差异

计算：

- 字符级/词级 edit distance；
- 段落删除率；
- 新增率；
- 结构移动；
- 标题变化；
- claims 增删；
- 来源变化；
- AI 建议接受率。

数据用于改进工作流，不把“改动少”绝对视为质量高。用户可能因为信任不足而整篇不用，也可能对好稿进行个人润色。

## 12. 运营看板

设计伙伴阶段只需要：

- 活跃工作区；
- 当前任务状态；
- 失败步骤；
- 预算；
- blocker；
- 审阅时间；
- 导出；
- 留存；
- provider 错误；
- 删除任务。

禁止运营人员默认查看用户正文。需要支持时通过用户授权的临时访问流程，MVP 可先使用受控数据库运维流程并写审计。
