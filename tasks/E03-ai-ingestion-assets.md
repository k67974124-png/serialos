# E03 AI 入库与观点资产

状态：`not_started`  
依赖：E02 accepted  
关联需求：FR-AI-001、FR-AI-002、FR-AI-003、FR-AI-004、FR-AI-005、FR-AI-006、FR-AI-007、FR-AI-008、FR-OPS-001、FR-OPS-002、FR-OPS-006

## 1. 用户结果

用户提交的素材被可靠地转写、解析、分块、嵌入，并抽取为可核对的观点、故事、案例、事实、框架、比喻、问题、引用和反直觉点。每项资产都能回到原始位置，用户可以确认、编辑、合并或拒绝；系统永远不把推测出的个人经历伪装成事实。

## 2. 输入文档

- `docs/04-user-flows.md`：F-002、F-003
- `docs/05-information-architecture.md`：P-005、P-006
- `docs/06-functional-spec.md`：D、L
- `docs/07-ai-pipeline.md`
- `docs/08-content-quality-and-safety.md`
- `docs/09-data-model.md`
- `docs/13-analytics-evals.md`
- `docs/14-security-privacy.md`
- `schemas/material-item.schema.json`
- `schemas/insight-asset.schema.json`

## 3. 范围

### 包含

- 文档正文提取、音频转写、图片上下文提取；
- normalization version；
- language detection、chunking、hash、embeddings；
- AI gateway、model router、prompt registry；
- structured output validation 和一次 repair；
- 观点资产抽取、provenance、confidence、privacy；
- asset list/detail/edit/confirm/reject/merge；
- source preview；
- AI call ledger、token/cost/budget；
- deterministic fakes、eval fixtures、回归集。

### 不包含

- 完整创作者画像建议，E04；
- 选题生成，E05；
- 外部网络事实研究；
- 自动微调；
- 将未确认资产自动认定为创作者立场；
- 对用户音频做声音克隆。

## 4. 入库流水线

```text
validate input
 -> normalize/transcribe/extract
 -> redact/preflight
 -> chunk
 -> embed
 -> retrieve local context
 -> extract assets with Structured Output
 -> schema validate
 -> deterministic semantic validate
 -> persist provenance and suggestions
 -> mark material ready | needs_review | failed
```

每步必须：持久 checkpoint、input hash、prompt/schema version、provider request ID、attempt、usage 和 error。重试从最后安全点开始。

## 5. 垂直切片

### E03-S01 AI 网关与模型路由

验收：

- route key 而不是业务代码直接选 model；
- 默认 Luna/Terra/Sol 配置符合 `.env.example`；
- timeout、retry、429/5xx、cancel、hard budget；
- structured output 使用版本化 schema；
- provider raw output 不直接传 UI；
- 每次调用记录 model、reasoning、input/output token、latency、provider ID、status、estimated/actual cost；
- fake 可按 fixture 精确重放；
- live smoke 仅显式 flag 开启。

### E03-S02 标准化与转写

验收：

- text/markdown 保留段落与字符 offset；
- PDF/DOCX 保存页/段定位；
- 音频保存 segment start/end、speaker label（仅 provider 可用时，不承诺识别身份）；
- 图片提取描述/文本存为 editable draft，并标记来源方式；
- unsupported/low-quality 有 needs_review；
- 用户修正转写生成新 version，旧资产不被静默覆盖；
- PII/secret preflight 记录 redaction map，不把 raw 内容写日志。

### E03-S03 分块、embedding 与去重

验收：

- chunk 保留 material/version/offset；
- chunk 策略按媒体类型配置并版本化；
- embedding model/version 记录；
- 重新 embedding 可并行迁移，不破坏旧搜索；
- exact hash 与 semantic similarity 分开；
- workspace scope 写入所有 vector query；
- unit test 覆盖中英文、长段、时间戳和边界。

### E03-S04 资产抽取

支持类型：

- `opinion`；
- `story`；
- `case`；
- `fact`；
- `framework`；
- `metaphor`；
- `audience_question`；
- `quote`；
- `contrarian_point`。

验收：

- 输出符合 `insight-asset.schema.json`；
- 每项至少有 source span/excerpt、confidence、privacy、support type；
- schema invalid 自动 repair 一次，仍失败进入用户可见重试；
- 不允许模型产生不存在的 material/chunk ID；
- duplicate candidate 由确定性相似度 + 模型解释生成，最终合并由用户决定；
- 低信息素材可返回 0 项，不强造内容。

### E03-S05 个人经历保护

验收：

- `personal_experience` 只在素材显式标记本人经历，或用户后续确认时成立；
- 第一人称不自动等于本人经历，引用和转述要区分；
- 低置信度保存为 `needs_review`；
- UI 显示系统为何认为是本人经历；
- 用户否认后记录负反馈并降级相关资产；
- 评测集必须包含“引用别人的第一人称”“虚构案例”“匿名客户案例”等陷阱。

### E03-S06 资产库 UI

列表：类型、状态、隐私、栏目、标签、来源、时间、confidence 筛选。

详情：

- canonical text；
- 类型与支持方式；
- source preview 与跳转；
- AI 建议 vs 用户确认；
- edit/confirm/reject/merge；
- history、privacy、downstream usage。

验收：

- 确认操作显式，不能通过查看即确认；
- 编辑产生版本并保留原始 suggestion；
- merge 旧 ID 保留 redirect；
- 已引用资产合并后引用仍可解析；
- reject 不删除原素材，可撤销；
- source unavailable 时标记 provenance degraded。

### E03-S07 隐私继承与审计

验收：

- 资产继承所有来源中最严格 privacy；
- 用户放宽时显示风险并 audit；
- private asset 不进入不允许的 topic/content context；
- 日志、trace、metrics 不含 excerpt；
- AI 请求记录 content hash 而非原文；
- provider retention 选项由配置控制并记录。

### E03-S08 Eval 基线

建立脱敏 fixtures：

- 明确观点；
- 隐含观点；
- 个人经历陷阱；
- 中英混合；
- 重复素材；
- 无内容素材；
- 多人评论；
- 错误引用。

门槛至少覆盖：schema pass、source span precision、fabricated source rate、personal experience false positive、duplicate quality。阈值见 `docs/13-analytics-evals.md`。

## 6. API 与事件

- `GET /assets`；
- `GET/PATCH /assets/{assetId}`；
- `POST /assets/{assetId}/confirm`；
- `POST /assets/merge`；
- `POST /materials/{id}/reprocess`；
- `GET /jobs/{id}`。

事件：`material.enrichment_requested`、`transcription.completed`、`chunks.created`、`embeddings.created`、`assets.extracted`、`asset.confirmed`、`assets.merged`、`material.ready`。

## 7. 异常与恢复

- provider 429/timeout/invalid schema；
- partial transcription；
- material version changed during run；
- user deletes material while processing；
- embedding succeeds, extraction fails；
- repair response仍 invalid；
- budget exhausted；
- cancellation after provider response but before commit；
- duplicate worker delivery。

每种情况必须定义 retryability、用户 copy、checkpoint、补偿和 audit。

## 8. 自动化验收

- E2E-002 文本到资产；
- E2E-003 音频到资产；
- schema mutation tests；
- fake provider error matrix；
- provenance offset roundtrip；
- personal experience false-positive regression；
- merge redirect；
- workspace vector isolation；
- cancel/retry/idempotency；
- eval thresholds。

## 9. 完成门

- 用户能从任一素材回溯资产，再回到准确原文位置；
- 0 个资产是合法结果；
- 未确认推测不会变成确认事实；
- 所有 AI 输出经过 schema + semantic validation；
- 默认测试不调用公网；
- 成本、模型、prompt、schema 可追踪；
- blocker 级隐私/经历错误为 0。
