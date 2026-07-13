# 15. 测试策略与总体验收

## 1. 测试金字塔

### Unit

覆盖领域规则：

- 状态机；
- 预算；
- 声明；
- 审批；
- privacy；
- source support；
- artifact formula；
- schema；
- URL/IP；
- filename；
- cost；
- diff；
- similarity decisions。

### Integration

覆盖：

- PostgreSQL repositories；
- migrations；
- pgvector 查询；
- queue locking/idempotency；
- outbox；
- S3/MinIO；
- email；
- OpenAI adapter fake/fixture；
- document parsers；
- export bundle；
- deletion。

### E2E

覆盖用户可见垂直路径。

### Eval

覆盖非确定性 AI 质量。

### Security

覆盖攻击面。

## 2. 测试环境

默认 CI：

- 无真实 OpenAI Key；
- 使用 deterministic fake；
- Postgres + pgvector；
- MinIO；
- Mailpit fake 或捕获；
- 固定时间和 ID；
- 随机工作区；
- 可并行；
- 清理数据。

Live-provider：

- 显式 feature flag；
- 独立测试项目和预算；
- 不使用真实用户数据；
- 手动或定时；
- 不阻塞普通 PR，发布前运行基线。

## 3. Critical Path E2E

### E2E-001 首次引导

Given 新用户  
When 登录、创建工作区、填写画像、创建栏目  
Then 进入今日页且工作区隔离。

### E2E-002 文本素材到资产

Given 已引导用户  
When 创建文本素材  
Then Worker 处理完成，资产可见，来源能回到原文。

### E2E-003 音频到资产

使用 fixture 音频和 fake transcript。  
Then 转写可编辑，资产来源包含时间范围。

### E2E-004 选题会

Given 至少 8 个确认资产和 1 个栏目  
When 生成选题  
Then 3 至 5 个候选可见，来源与六维评分存在。

### E2E-005 采访分支

Given 选题缺核心经历  
When 启动任务  
Then 进入 needs_input；回答后恢复并生成简报。

### E2E-006 内容包

Given 完整简报  
When 生成  
Then 必选资产存在、版本可编辑、任务进入 quality_check/in_review。

### E2E-007 Blocker 阻止批准

Given 母内容包含无来源数字  
When 运行审校  
Then blocker 出现，批准 disabled。

### E2E-008 修复并批准

When 用户删除或补来源并重跑  
Then blocker 解决，批准成功且记录 version set。

### E2E-009 批准失效

Given 已批准  
When 编辑任一批准版本  
Then approval invalidated，正式导出不可用。

### E2E-010 Artifact

Given calculator spec  
When validate/build  
Then 预览正确，非法公式被拒绝，静态包无网络请求。

### E2E-011 导出

Given approved run  
When 请求 ZIP  
Then 下载包含定义文件，checksum 一致，路径安全。

### E2E-012 发布数据回流

When 创建发布记录、录入指标、导入评论  
Then 评论成为素材并可处理。

### E2E-013 跨租户

Given workspace A/B  
When A 请求 B 的素材、资产、任务、导出、signed URL  
Then 全部不可见。

### E2E-014 预算

Given hard budget 很低  
When 运行达到上限  
Then 暂停，确认后才继续。

### E2E-015 恢复

Given Worker 在步骤完成后崩溃  
When 重新启动  
Then 从 checkpoint 恢复，不重复创建内容版本和计费记录。

### E2E-016 删除工作区

When 发起删除  
Then 新写入被拒绝，文件与派生数据清理，状态可见。

## 4. API Contract Tests

- OpenAPI 与 handler 一致；
- request/response schema；
- error codes；
- pagination；
- idempotency；
- optimistic version；
- auth；
- content type；
- rate limit。

## 5. Schema Tests

对 `schemas/`：

- JSON 有效；
- Draft 版本一致；
- example 通过；
- negative fixtures 失败；
- no extra properties（适用处）；
- schema 与 TypeScript 类型一致；
- AI fake 输出通过；
- OpenAPI 引用可解析。

## 6. Migration Tests

- 空库 migrate；
- 前一版本 upgrade；
- rollback（若支持）；
- seed；
- constraints；
- indexes；
- workspace scoping；
- migration idempotency；
- no destructive data loss without ADR。

## 7. Artifact Security Tests

- 禁止动态执行 API；
- 公式深度限制；
- 超长表达式；
- 除零；
- NaN/Infinity；
- prototype pollution tokens；
- property access；
- function injection；
- XSS in labels/results；
- CSP；
- iframe sandbox；
- network request blocked；
- URL payload；
- localStorage；
- fuzz 10,000 expressions；
- all score ranges covered。

## 8. SSRF Tests

- localhost；
- 127.0.0.1；
- ::1；
- RFC1918；
- link-local；
- metadata；
- decimal/octal IP；
- redirect to private；
- DNS rebinding fixture；
- non-http scheme；
- huge body；
- slow response；
- invalid content type。

## 9. Upload Tests

- extension mismatch；
- MIME mismatch；
- executable；
- SVG；
- oversized；
- duplicate hash；
- interrupted upload；
- signed URL replay；
- key traversal；
- macro document；
- malformed PDF；
- image bomb；
- filename unicode/traversal。

## 10. Accessibility

自动：

- axe critical pages；
- labels；
- contrast；
- landmarks；
- heading；
- dialog；
- iframe title。

人工：

- keyboard onboarding；
- capture；
- topic selection；
- interview；
- Studio claim/finding；
- approval；
- export；
- 200% zoom；
- screen reader smoke。

## 11. AI Eval Acceptance

发布前：

- Schema 100%；
- fabricated personal experience 0；
- invalid source ID 0；
- blocker recall threshold；
- no prompt injection tool action；
- artifact safety 100%；
- no significant regression；
- cost within configured budget for baseline；
- human review of representative samples。

## 12. Performance Tests

- 10k assets in one workspace list/search；
- 1k material jobs/day simulated；
- 20 concurrent AI step fakes；
- 100 MB audio upload path；
- export bundle；
- Studio autosave；
- vector query tenant filter；
- queue recovery；
- DB pool exhaustion behavior。

不追求虚假高规模，但关键交互应满足 NFR。

## 13. Release Acceptance Checklist

### Product

- 核心旅程完整；
- 无 out-of-scope 自动发布；
- 中文文案；
- 失败可恢复；
- 预算可见；
- 删除可用。

### Engineering

- build；
- lint；
- format；
- typecheck；
- unit/integration/E2E；
- migrations；
- specs；
- no TODO business logic；
- health；
- observability；
- backup docs。

### AI

- prompt versions；
- schemas；
- eval；
- provider fake；
- usage/cost；
- source ledger；
- personal experience rules。

### Security

- tenant；
- upload；
- SSRF；
- XSS；
- CSRF；
- session；
- artifact；
- secrets；
- deletion；
- dependency scans。

### Operations

- runbook；
- queue dashboard/query；
- dead-letter recovery；
- budget alert；
- provider outage behavior；
- data deletion；
- support code；
- rollback。

## 14. Bug Severity

- S0：数据泄露、跨租户、任意代码、不可逆数据丢失；
- S1：核心旅程不可用、错误批准、虚构经历未阻断；
- S2：重要功能错误但有绕行；
- S3：非阻塞体验或文案问题。

S0/S1 阻止发布。
