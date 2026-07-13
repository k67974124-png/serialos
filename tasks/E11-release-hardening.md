# E11 设计伙伴发布硬化

状态：`not_started`  
依赖：E00-E10 核心路径 accepted  
关联需求：FR-AUTH-004、FR-OPS-001、FR-OPS-002、FR-OPS-003、FR-OPS-004、FR-OPS-005、FR-OPS-006、NFR-001、NFR-002、NFR-003、NFR-004、NFR-005、NFR-006、NFR-007，以及全部发布验收要求

## 1. 用户结果

SerialOS 达到可供首批设计伙伴真实使用的门槛：关键路径稳定、可恢复、可观测、可删除、可备份，AI 质量有回归门，安全与可访问性经过系统检查，部署与故障处理不依赖某位开发者脑内地图。

## 2. 输入文档

- 全部 `docs/`
- `docs/13-analytics-evals.md`
- `docs/14-security-privacy.md`
- `docs/15-test-and-acceptance.md`
- `contracts/error-codes.md`
- `contracts/events.md`
- 所有 Epic 验收记录与 ADR

## 3. 范围

### 包含

- Golden Set 和 eval runner；
- 全量 security/privacy verification；
- workspace deletion worker；
- retention 和 provider resource cleanup；
- rate limits、budget、abuse controls；
- dead-letter/replay/incident runbooks；
- provider outage/degradation；
- logs/metrics/traces/dashboards/alerts；
- backup/restore drill；
- accessibility、performance、compatibility；
- migration rollback/forward strategy；
- release checklist、seed/demo、operator docs；
- feature flags 与 safe rollout；
- design-partner readiness report。

### 不包含

- 新产品功能；
- 自动发布；
- 计费、多用户角色、原生 App；
- 为漂亮指标降低质量门；
- 未经验证的基础设施重写；
- 使用真实客户私密数据作为公开 eval fixture。

## 4. 垂直切片

### E11-S01 Golden Set 与 AI Eval Gate

建立脱敏、版本化的代表样本：

- 文字/音频/网页/评论；
- 观点资产；
- 画像建议；
- 选题；
- 采访；
- 内容包；
- claim/review；
- artifact spec。

验收：

- offline fixture eval 默认 CI 可运行；
- opt-in live eval 有预算和人工触发；
- 指标、阈值、baseline、允许波动记录；
- 模型/prompt/schema 更改触发相关 eval；
- fabricated personal experience、unsupported fact、invalid artifact 为 release blocker；
- 失败报告定位样本和阶段，不保存私密原文到公共 CI log。

### E11-S02 安全与隐私发布门

验收：

- cross-tenant 自动化覆盖每类资源；
- auth/session/CSRF/rate-limit；
- upload/MIME/archive bomb；
- SSRF；
- XSS/Markdown/sanitizer；
- artifact sandbox/fuzz；
- secret/log redaction；
- signed URL；
- dependency/container scan；
- threat model 更新；
- 至少一次人工安全 review；
- critical/high 未解决不得发布。

### E11-S03 完整删除与 retention

验收：

- workspace deletion 删除 DB、objects、vectors、exports、provider files/responses（按可用 API/配置）；
- 顺序和补偿可重试；
- tombstone 防 late jobs 复活；
- deletion status 对用户可见；
- retention jobs 对临时上传、失败 exports、logs、provider metadata 生效；
- legal hold 不在 MVP，若存在运营需求必须 ADR；
- E2E-016 在真实本地依赖通过；
- 完成证明不包含被删内容。

### E11-S04 可靠性与降级

验收：

- OpenAI 429/5xx/timeout：backoff、budget、可恢复 UI；
- transcription/embedding/web fetch 单服务故障隔离；
- DB/job worker restart；
- object storage outage；
- dead-letter 可检索、诊断、replay，replay idempotent；
- provider outage 时已有内容仍可浏览编辑；
- health/readiness 反映依赖；
- chaos/fault-injection tests 至少覆盖关键节点。

### E11-S05 可观测与运维

最低 dashboard：

- requests/error/latency；
- job queue depth/age/retry/dead letters；
- AI calls/model/latency/error/tokens/cost；
- run completion/failure/cancel/budget block；
- upload/transcription failures；
- review blocker rate；
- export build；
- deletion backlog。

验收：

- alerts 有可执行阈值和 runbook；
- correlation ID 可从用户错误追到 job/AI call；
- logs 无 raw content；
- metrics 无高基数私密 label；
- clock/timezone 一致；
- operator 能在不查数据库原文情况下诊断大多数失败。

### E11-S06 性能与可访问性

验收门以 `docs/15-test-and-acceptance.md` 为准，至少：

- 关键页面加载预算；
- 10k 素材/资产列表分页与搜索；
- 100 并发轻请求的 baseline；
- queue backpressure；
- Studio 大文本编辑；
- artifact 390 px/desktop；
- WCAG 2.2 AA critical flow；
- keyboard-only；
- reduced motion；
- screen-reader live status；
- Chrome/Safari/Firefox 当前支持矩阵记录。

### E11-S07 备份、恢复与 migration

验收：

- DB backup policy、object version/backup 策略；
- restore 到隔离环境并验证核心对象数量/hash；
- RPO/RTO 目标记录为运营假设；
- migration 在 production-like snapshot 前向演练；
- destructive migration 分阶段；
- rollback 不能造成批准 snapshot 丢失；
- runbook 可由未参与实现的人执行。

### E11-S08 发布与设计伙伴准备

交付：

- production config checklist；
- secrets/keys rotation；
- feature flag 默认；
- seed/demo workspace；
- operator guide；
- support triage；
- known limitations；
- privacy/data flow 说明；
- release notes；
- pilot feedback form；
- go/no-go report。

Go 条件：

- P0/P1 bugs 为 0；
- critical/high security 为 0；
- critical E2E 通过；
- eval gate 通过；
- deletion/restore drill 通过；
- open risks 有 owner 和 mitigation；
- 所有 out-of-scope 文案真实。

## 5. 统一回归套件

必须包含 E2E-001 至 E2E-016；OpenAPI contract；所有 JSON Schema；migration；artifact security；SSRF；upload；accessibility；eval；performance smoke；backup/restore smoke。

默认 CI 不调用 live OpenAI。候选发布前可在受控环境运行一次带预算 live smoke，结果与模型 ID、日期、配置归档。

## 6. 故障与支持分级

- P0：跨租户泄露、凭证泄露、不可恢复数据破坏、任意代码执行；
- P1：批准门可绕过、编造个人经历正式导出、删除失败无状态、核心路径全阻断；
- P2：可恢复功能错误、部分格式失败、错误指标；
- P3：非关键体验和视觉问题。

P0/P1 必须有回归测试和 incident retrospective。

## 7. 完成门

- `docs/15-test-and-acceptance.md` 发布清单全部有证据；
- `pnpm` 全套命令在 CI 和 production-like 环境通过；
- go/no-go 报告批准；
- 无静默降级、假健康或假成功；
- 首批设计伙伴能根据用户文档完成从登录到导出的全路径；
- 任何未完成项明确列为限制，不包装成已实现。
