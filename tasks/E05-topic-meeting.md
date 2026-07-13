# E05 AI 选题会

状态：`not_started`  
依赖：E04 accepted  
关联需求：FR-TOP-001、FR-TOP-002、FR-TOP-003、FR-TOP-004、FR-TOP-005、FR-TOP-006、FR-TOP-007、FR-COL-003、FR-OPS-001、FR-OPS-002

## 1. 用户结果

用户选择栏目和素材范围后，得到 3 至 5 个彼此不同、带证据和六维评分的候选选题。用户能比较、编辑、拒绝、反馈并选择一个候选创建制作任务，而不是面对一百个空泛标题。

## 2. 输入文档

- `docs/04-user-flows.md`：F-004
- `docs/05-information-architecture.md`：P-007、P-008
- `docs/06-functional-spec.md`：E、F
- `docs/07-ai-pipeline.md`：选题会
- `docs/08-content-quality-and-safety.md`
- `docs/09-data-model.md`
- `docs/13-analytics-evals.md`
- `schemas/topic-candidate.schema.json`

## 3. 范围

### 包含

- topic session 配置；
- workspace/column/profile snapshot；
- asset retrieval 和 filter；
- candidate generation、去重、editorial rank；
- 六维分数与 deterministic overall；
- historical similarity；
- evidence 和 gap；
- candidate cards、compare、edit、archive、feedback、select；
- cost/progress/retry；
- 选中后创建 content run draft。

### 不包含

- 互联网热点抓取；
- 自动选择并启动内容生产；
- 以平台爆款数据作为唯一评分；
- 自动排期；
- 生成正文；
- 把用户拒绝原因变成不可逆黑名单。

## 4. 六维评分合同

每项 0-100：

- `personal_relevance`：是否有本人真实观点、经历或案例；
- `novelty`：与历史批准内容的差异；
- `audience_value`：是否解决明确受众任务；
- `evidence_strength`：来源数量、类型与确认状态；
- `seriality`：是否推进栏目并产生后续方向；
- `artifact_potential`：是否适合安全互动作品。

`overall` 使用版本化确定性权重计算，模型只提供分项建议和理由。用户可看到权重说明，MVP 不开放任意自定义权重。

## 5. 垂直切片

### E05-S01 选题会配置

验收：

- 选择 active column、audience、时间范围、tags、privacy、published status、excluded topics；
- 默认值来自 active profile/column；
- 显示预计可用资产数和预算；
- 无足够素材时可继续，但明确可能不足；
- 保存 session draft，刷新可恢复；
- start 请求 idempotent；
- 运行 snapshot 后配置不可被静默改写。

### E05-S02 Retrieval 与 context assembly

验收：

- workspace filter 强制；
- 只使用允许状态和 privacy 的资产；
- 混合 exact filters、embedding retrieval、diversity selection；
- token budget 截断可解释；
- 每个输入资产记录为何被选中；
- prompt injection 内容作为数据封装，不执行其指令；
- confirmed 优先，但可含 needs_review 并明确标识。

### E05-S03 候选生成与去重

验收：

- 第一阶段生成多于展示数的 structured candidates；
- schema validate，非法 ID/分数拒绝；
- title/claim/audience/evidence/extension/artifact idea 完整；
- exact 和 semantic 去重；
- 低于 3 个独特候选时不复制凑数，显示不足原因；
- 候选不能声称创作者做过未确认的事；
- 生成模型/版本/usage 可追踪。

### E05-S04 评分、历史相似度与 editorial rank

验收：

- deterministic features 与模型评分分开存储；
- evidence 不足强制上限；
- personal relevance 不可仅因第一人称关键词给高分；
- 每个候选显示前三个历史相似内容和 similarity；
- Sol 负责处理冲突和最终排序，但不得改变来源事实；
- overall 由版本化公式复算；
- 同一 fixture 的 deterministic 部分稳定。

### E05-S05 候选 UI 与反馈

验收：

- 默认 3-5 卡片，支持 compare；
- 展示命题、受众、六分、evidence、gap、相似内容、后续连载、artifact idea；
- 可编辑 title/core claim/audience，原版本保留；
- “不像我”反馈原因符合 FR-TOP-007；
- archive/feedback 不影响其他候选；
- 键盘可比较和选择；
- AI 理由不伪装成客观概率。

### E05-S06 选择并创建 run draft

验收：

- select 使用事务：锁定 candidate version、创建 content run draft、记录 source snapshot；
- 重复点击不创建重复 run；
- 已 archive/过期 candidate 不可选择；
- 用户可在下一页调整格式和预算；
- 原 topic session 保留；
- audit 包含编辑后的选择内容。

## 6. API 与事件

- `POST /topic-sessions`；
- `GET /topic-sessions/{id}`；
- `PATCH /topic-candidates/{id}`；
- `POST /topic-candidates/{id}/feedback`；
- `POST /topic-candidates/{id}/select`；
- `GET /jobs/{id}`。

事件：`topic_session.started`、`topic_context.ready`、`topic_candidates.generated`、`topic_session.completed`、`topic_candidate.edited`、`topic_feedback.recorded`、`topic_candidate.selected`。

## 7. 异常与恢复

- 可用资产少于 2；
- 所有候选重复；
- schema invalid；
- historical similarity index unavailable；
- budget hard stop；
- 用户改变栏目状态；
- source asset 被删除；
- run 已完成但页面断线；
- 同时选择两个候选；
- provider 超时后晚到结果。

## 8. 自动化验收

- E2E-004；
- 3-5 候选和不足 3 个分支；
- six-score range/formula；
- evidence score cap；
- duplicate suppression；
- history similarity；
- feedback persistence；
- idempotent select；
- privacy/workspace isolation；
- eval：genericness、personal grounding、topic diversity、fabricated evidence。

## 9. 完成门

- 不以标题数量冒充质量；
- 每个候选至少 2 项资产，或明确不足并降分；
- 六维评分可解释、可复算；
- 用户选择前不会自动启动生成；
- 选中候选的上下文可完整重放。
