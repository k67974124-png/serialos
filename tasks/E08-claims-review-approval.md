# E08 声明账本、质量门与批准

状态：`not_started`  
依赖：E07 accepted  
关联需求：FR-CLAIM-001、FR-CLAIM-002、FR-CLAIM-003、FR-CLAIM-004、FR-CLAIM-005、FR-CLAIM-006、FR-CLAIM-007、FR-CONT-010、FR-OPS-001、FR-OPS-004、FR-OPS-006

## 1. 用户结果

用户能看到内容中每一项事实、数据、引语、个人经历和意见属于什么类型、由什么支持、有哪些风险。系统用确定性检查与模型审校发现问题，任何 blocker 可靠阻止批准；用户修复后重新检查并显式批准一个不可变版本。

## 2. 输入文档

- `docs/04-user-flows.md`：F-007
- `docs/05-information-architecture.md`：P-011 审核区
- `docs/06-functional-spec.md`：I
- `docs/07-ai-pipeline.md`：review pipeline
- `docs/08-content-quality-and-safety.md`
- `docs/09-data-model.md`
- `docs/13-analytics-evals.md`
- `docs/14-security-privacy.md`
- `docs/15-test-and-acceptance.md`：E2E-007、008、009
- `schemas/source-claim.schema.json`
- `schemas/review-result.schema.json`

## 3. 范围

### 包含

- claim extraction；
- claim taxonomy 与 source mapping；
- supported/weak/conflicting/unsupported/not_applicable；
- deterministic QA；
- Sol editorial review；
- moderation/privacy checks；
- finding lifecycle；
- stale/re-run；
- reviewer sidebar；
- risk acceptance policy；
- immutable approval snapshot；
- approval invalidation；
- quality report 和 audit。

### 不包含

- 法律、医疗或财务专业认证；
- 自动替用户决定争议事实；
- 自动发布；
- 将搜索结果不经核对直接当真；
- 隐藏 blocker 的“强制通过”；
- 对模型 chain-of-thought 的展示。

## 4. 声明类型与支持规则

类型严格采用功能规格与 Schema 中的六类：

- `external_fact`；
- `personal_experience`；
- `opinion`；
- `inference`；
- `recommendation`；
- `quote`。

统计数字和案例中的可验证陈述归入 `external_fact`，预测归入 `inference`，操作建议归入 `recommendation`；可在 metadata 中细分，但不得创造第七种核心类型。

规则：

- external_fact 和 quote 必须有可用 source；
- personal_experience 必须来自已确认本人素材或采访回答；
- opinion 可不需外部 source，但必须与画像/资产不冲突或标记冲突；
- inference 必须标明推断和不确定性，不能伪装成事实；
- recommendation 要区分一般经验建议和高风险专业建议。

## 5. 垂直切片

### E08-S01 Claim extraction 与 mapping

验收：

- 按内容块提取 atomic claims；
- 保存 exact span、normalized statement、type、source IDs、support status、confidence；
- source ID 必须属于 run snapshot/workspace；
- claim 变更后旧 review stale；
- 用户可合并/拆分/重分类并保留审计；
- 0 claims 对纯观点短文本是合法，但须说明；
- schema invalid 不进入 review。

### E08-S02 确定性质量检查

至少检查：

- 无来源事实/数据/引语；
- personal experience 无确认来源；
- broken source；
- banned terms、preferred terminology；
- length/required sections；
- duplicate blocks；
- title promise mismatch；
- placeholder/模板残留；
- secret/PII patterns；
- unsafe links/HTML；
- stale content/source；
- artifact references（后续）。

验收：

- 规则版本化且 unit tested；
- finding 有 severity、code、location、evidence、repair guidance；
- blocker 由规则明确产生，不靠 UI 判断；
- false-positive 可标记但不删除审计；
- 扫描幂等、可复现。

### E08-S03 模型审校

检查：

- 是否像创作者；
- 论证跳跃；
- 过度承诺；
- 不必要重复；
- 平台适配；
- 反例和限制；
- 多渠道一致性；
- 可能事实声明遗漏。

验收：

- Sol 仅消费必要文本和 source manifest；
- 输出符合 review schema；
- 模型 finding 与 deterministic finding 分开；
- 模型不能把 unsupported 改成 supported；
- 每条建议提供位置和理由，不展示私有推理；
- provider failure 不得默认通过。

### E08-S04 Review UI 与 finding lifecycle

状态：`open -> resolved | accepted_risk | dismissed`，任何内容变化可转 `stale`；`dismissed` 必须记录 `false_positive` 等原因。

验收：

- 按 blocker/warning/info 筛选；
- 点击跳到文本位置；
- 支持用户修复、重新检查；
- blocker 不出现接受风险按钮；
- warning 接受风险需理由；
- false positive 需理由并进入 eval；
- 内容编辑后受影响 finding/claims stale；
- UI 明确“检查完成”不等于“内容真实无误”。

### E08-S05 批准

验收：

- 仅 owner 可批准；
- 所有 required asset 有当前 review；
- 0 open blocker；
- stale review/claim/source 阻止；
- warning 按 policy 处理；
- 批准创建 immutable snapshot：asset versions、brief、claims、review、artifact version（若有）、profile/column snapshot；
- 记录 approver/time/version/hash；
- 重复请求 idempotent；
- UI 用清晰确认，不使用暗示已发布的文案。

### E08-S06 批准失效

以下变化使批准失效或要求新版本：

- 已批准正文编辑；
- source 删除/降级；
- claim mapping 改变；
- blocker rule 新发现（对当前草稿）；
- artifact 变化；
- 关键 brief 变化。

验收：

- 旧 approval 历史保留；
- 新编辑产生 draft version，不篡改批准快照；
- 导出默认使用最新有效批准版本；
- 用户明确看到“已批准版本”和“当前草稿”差异；
- 失效有 reason 和 audit。

### E08-S07 质量报告

报告包含：

- coverage；
- claim counts/status；
- open/resolved findings；
- source availability；
- style/terminology；
- moderation/privacy；
- model/rule versions；
- approver；
- accepted risks。

报告不得输出内部 chain-of-thought 或 provider raw response。

## 6. API 与事件

- `GET/POST /content-runs/{id}/review`；
- `PATCH /review-findings/{id}`；
- `POST /content-runs/{id}/approve`；
- `GET /jobs/{id}`。

事件：`review.requested`、`claims.extracted`、`deterministic_checks.completed`、`editorial_review.completed`、`finding.updated`、`review.stale`、`content_run.approved`、`approval.invalidated`。

## 7. 异常与边界

- review 运行中用户编辑；
- source URL 失效；
- same sentence 多 claim；
- quote 被截断；
- personal opinion 含可验证数字；
- provider failure；
- warning accepted 后规则升级 blocker；
- two-tab approve；
- late review overwrites newer version；
- markdown offset changed；
- 不同渠道互相矛盾。

## 8. 自动化验收

- E2E-007 blocker 阻止；
- E2E-008 修复批准；
- E2E-009 批准失效；
- deterministic rule unit matrix；
- claim/source referential integrity；
- model cannot upgrade support；
- risk acceptance policy；
- immutable snapshot hash；
- concurrent approve；
- stale late result；
- moderation failure closed；
- eval：unsupported claim recall、false blockers、voice drift。

## 9. 完成门

- blocker 在 API/domain/UI 三层都无法绕过；
- 批准版本不可变；
- 当前草稿与批准版本永不混淆；
- 所有高风险声明可追溯；
- 规则和模型审查可重放；
- 质量报告不夸大保证。
