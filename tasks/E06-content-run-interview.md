# E06 制作任务与补充采访

状态：`not_started`  
依赖：E05 accepted  
关联需求：FR-RUN-001、FR-RUN-002、FR-RUN-003、FR-RUN-004、FR-RUN-005、FR-RUN-006、FR-RUN-007、FR-OPS-001、FR-OPS-002

## 1. 用户结果

用户把选题配置为一项可预算、可暂停、可取消、可恢复的制作任务。系统先分析信息缺口，必要时提出最多 5 个精准采访问题，并在得到回答后继续，而不是用模型想象填满缺口。

## 2. 输入文档

- `docs/04-user-flows.md`：F-005
- `docs/05-information-architecture.md`：P-009、P-010
- `docs/06-functional-spec.md`：G
- `docs/07-ai-pipeline.md`：content run orchestrator
- `docs/08-content-quality-and-safety.md`
- `docs/09-data-model.md`
- `docs/11-system-architecture.md`：队列、幂等、恢复
- `schemas/content-brief.schema.json`

## 3. 范围

### 包含

- run 配置、snapshot、预算；
- state machine 和 step checkpoints；
- context collection；
- gap analysis；
- 0-5 采访问题；
- 文字/音频回答；
- 回答是否保存为长期资产的显式选择；
- start/pause/cancel/retry/resume；
- timeline、estimated/actual cost；
- concurrent run limit；
- brief 生成的准备阶段。

### 不包含

- 完整多平台内容生成，E07；
- 自动替用户回答；
- 将采访音频保存为声音模型；
- 无人工确认自动追加长期资产；
- 自动发布或排期。

## 4. Run 状态机

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
failed -> queued | canceled        # only when last_error.retryable = true
```

细粒度动作如 `analyzing_gaps`、`answers_processing`、`generating_brief` 和各内容格式生成保存在 `active_step` 与 `run_steps.step_name`，不膨胀顶层生命周期枚举。硬预算进入 `needs_budget_approval`；失败的 retryability 记录在最后错误与失败步骤中。

每个 transition 必须由 domain command 执行，验证当前状态和 version。UI 不直接写 status。

## 5. 垂直切片

### E06-S01 Run 配置与创建

字段：column、audience、formats、length targets、privacy exclusions、artifact preference、soft/hard budget、deadline label（仅提示）。

验收：

- 从 selected candidate 预填；
- 必选至少一个主格式；
- hard budget >= soft budget；
- 创建请求 idempotent；
- snapshot profile/column/candidate/assets/prompts/models；
- 创建后仍为 draft，用户点击 start 才入队；
- estimate 明确是估计而非承诺。

### E06-S02 Orchestrator 与 checkpoints

验收：

- 每一步有 input hash、output ref、attempt、started/finished、provider ID；
- 完成步骤重试不重复计费；
- checkpoint 与状态变更事务一致；
- worker crash 后从最后成功点恢复；
- 取消请求在安全点生效；
- late result 检查 run version/cancellation；
- 每 workspace 并发限制和公平领取；
- 用户可看到高层步骤，不暴露 chain-of-thought 或 provider raw data。

### E06-S03 Context collection

验收：

- 收集 selected candidate evidence、active snapshot、column context、historical similarity、user constraints；
- 每条 context 带 source/status/privacy；
- token budget 使用优先级和摘要策略；
- 被删除/降权来源触发 stale；
- 只有允许的素材进入模型；
- context manifest 可重放和导出供审计。

### E06-S04 Gap analysis 与采访问题

验收：

- 输出 0-5 个问题；
- 每问有 `purpose`、`required`、`supports_claim_or_section`、回答建议；
- 不得问已在确认资产中有答案的问题；
- 高风险个人经历缺失时必须提问或移除命题；
- 0 个问题时自动进入 brief；
- 必答问题可由用户选择“无法回答”，系统降级范围而非编造；
- schema 和 semantic validator 拒绝重复/诱导/无关问题。

### E06-S05 采访回答

验收：

- text/audio；
- 每题独立保存，刷新恢复；
- audio 走 E03 transcription pipeline；
- 用户显式选择是否存为长期 asset；默认否；
- 即使不长期保存，run snapshot 保留回答和 provenance；
- 删除回答需提示已生成内容失效；
- 个人/客户敏感信息提醒；
- 完成按钮验证必答或无法回答选择。

### E06-S06 Pause、cancel、retry、resume 与预算

验收：

- pause 阻止后续步骤，不强杀不可中断 provider call；
- cancel 明确不可逆，已生成中间结果按 retention 处理；
- retry 只对 retryable failure；
- resume 从 checkpoint；
- soft budget 提示并可继续；
- hard budget 进入 `needs_budget_approval`，需用户提高预算或缩小范围；
- actual usage 每步汇总；
- 所有动作 audit。

### E06-S07 Timeline UI

验收：

- 展示状态、步骤、时间、预算、失败原因和可用动作；
- 页面重连后恢复；
- job polling 有 backoff，完成后停止；
- 卡住超阈值显示诊断而非无限 spinner；
- 取消、重试、恢复有确认与结果；
- 不显示“正在思考”等不可验证拟人文案。

## 6. API 与事件

- `GET/POST /content-runs`；
- `GET /content-runs/{id}`；
- `POST /content-runs/{id}/start`；
- `POST /content-runs/{id}/cancel`；
- `POST /content-runs/{id}/retry`；
- `GET /content-runs/{id}/interview`；
- `POST /content-runs/{id}/interview/answers`；
- `POST /content-runs/{id}/resume`；
- `GET /content-runs/{id}/brief`；
- `GET /jobs/{id}`。

## 7. 异常与恢复矩阵

至少覆盖：

- duplicate start；
- two browser tabs version conflict；
- provider timeout/429；
- user cancels during response；
- worker restarts；
- answer audio fails transcription；
- source removed；
- hard budget reached；
- required answer unavailable；
- run snapshot incompatible after schema migration；
- queue delay；
- event delivered twice。

## 8. 自动化验收

- E2E-005 采访分支；
- E2E-014 预算；
- E2E-015 恢复；
- 0-question path；
- unable-to-answer scope downgrade；
- checkpoint crash test；
- concurrent limit；
- cancel late result；
- audio answer provenance；
- long-term asset opt-in only；
- state-machine property tests。

## 9. 完成门

- 用户总能知道 run 处于何处、为什么停、如何继续；
- 缺信息时系统提问或缩小范围，不填空；
- 预算与实际调用可核对；
- 任何重试不重复已提交副作用；
- E07 可读取稳定 brief/context snapshot。
