# 11. 系统架构与工程约束

## 1. 架构目标

MVP 需要：

- 单仓库可理解；
- 本地可完整运行；
- 长任务可恢复；
- 数据租户隔离；
- AI 调用可观测；
- 依赖数量克制；
- 可测试而不依赖真实模型；
- 互动作品有明确安全边界；
- 日后可扩展多成员和平台连接器，但不提前实现。

## 2. 建议 Monorepo

```text
serialos/
  apps/
    web/                 # Next.js UI + HTTP API
    worker/              # durable jobs and AI orchestration
  packages/
    domain/              # entities, policies, state machines
    application/         # use cases and ports
    db/                  # schema, migrations, repositories
    ai/                  # OpenAI adapter, prompts, schemas, eval hooks
    storage/             # S3-compatible adapter
    jobs/                # queue contracts, handlers, outbox
    contracts/           # Zod/JSON Schema/OpenAPI types
    artifact-engine/     # safe calculator/quiz/checklist renderer
    ui/                  # shared components and design tokens
    observability/       # logging, metrics, tracing
    test-kit/            # fixtures and provider fakes
  evals/
    datasets/
    graders/
    reports/
  infra/
    docker/
    scripts/
  docs/
  .agents/skills/
  AGENTS.md
  package.json
  pnpm-workspace.yaml
  turbo.json
```

工具可以调整，但边界必须保留。框架层不得直接包含全部领域规则。

## 3. 组件

### Web App

职责：

- SSR/交互 UI；
- 会话；
- 输入校验；
- HTTP API；
- 预签名上传；
- 查询任务状态；
- 编辑与版本；
- 安全 artifact preview host；
- 不执行长 AI 工作。

### Worker

职责：

- 素材处理；
- 转写；
- URL 抓取；
- 文档解析；
- chunk/embedding；
- 资产抽取；
- 画像建议；
- 选题会；
- 内容任务状态机；
- Web Research；
- 内容生成；
- 声明与质量；
- artifact 编译；
- 导出；
- 删除；
- outbox。

Worker 可横向扩展，但必须使用数据库锁、幂等键和 heartbeat。

### PostgreSQL

Source of truth：

- 业务数据；
- 版本；
- 状态；
- 队列；
- outbox；
- audit；
- AI 调用元数据；
- pgvector。

### Object Storage

保存：

- 原始上传；
- 解析中间文件；
- 加密调试包（默认关闭）；
- 导出；
- artifact build。

对象路径：

```text
workspaces/{workspaceId}/materials/{materialId}/...
workspaces/{workspaceId}/exports/{exportId}/...
```

不得使用用户文件名作为完整 key。

### OpenAI

通过 `AiGateway`：

- Responses；
- Structured Outputs；
- Web Search；
- Embeddings；
- Speech-to-Text；
- Moderation。

### Artifact Engine

- 解析 JSON spec；
- 验证；
- 安全公式 AST；
- React preview；
- 静态 build；
- 不使用 `eval`；
- 不运行模型代码；
- 无外网依赖。

## 4. 技术栈建议

以下是初始决策，具体版本在 E00 选择当前稳定兼容版并锁定：

- Node.js 当前 LTS；
- TypeScript strict；
- pnpm workspace；
- Turborepo 或等价轻量任务编排；
- Next.js App Router；
- React；
- PostgreSQL；
- Drizzle ORM 或等价类型安全 SQL 层；
- pgvector；
- PostgreSQL-backed queue，例如 pg-boss，或自有简洁 queue 表；
- S3 SDK；
- Zod + JSON Schema；
- OpenAI 官方 JS SDK；
- Vitest；
- Playwright；
- Testing Library；
- OpenTelemetry；
- Pino 或等价结构化日志；
- Docker Compose；
- 邮件本地使用 Mailpit；
- MinIO 本地对象存储。

若替换核心项，写 ADR。不得在未证明需要前引入 Redis、Kafka、Temporal、Kubernetes 或多语言后端。

## 5. Clean Boundaries

### Domain

不依赖：

- Next.js；
- ORM；
- OpenAI SDK；
- S3 SDK；
- Queue SDK。

包含：

- 状态机；
- 审批规则；
- 声明规则；
- 预算策略；
- 互动公式规则；
- 权限策略；
- 值对象。

### Application

定义 use case 和 ports：

- MaterialRepository；
- ContentRunRepository；
- AiGateway；
- ObjectStorage；
- JobQueue；
- Clock；
- IdGenerator；
- AuditSink；
- SearchIndex；
- TransactionManager。

### Adapters

实现 ports：

- PostgreSQL；
- OpenAI；
- S3；
- Queue；
- HTTP。

## 6. 数据和请求流

### 上传

```text
Browser
 -> POST upload session
 -> signed S3 upload
 -> complete-upload API
 -> DB transaction: material + outbox
 -> Worker: validate/scan/normalize/AI
 -> DB state updates
 -> UI polls or receives server event
```

### 选题会

```text
UI -> create topic session
 -> DB/outbox
 -> Worker retrieve
 -> AI generate
 -> deterministic filter
 -> AI editorial rank
 -> persist candidates
 -> UI displays
```

### 内容生产

```text
UI -> create/start run
 -> Worker checkpoint machine
 -> optional needs_input
 -> brief
 -> optional web research
 -> parallel format generation
 -> claim extraction
 -> deterministic QA
 -> model QA
 -> in_review
```

### 批准和导出

```text
UI approve
 -> transaction verifies version set + blockers
 -> approval
 -> export request
 -> Worker build bundle
 -> signed download
```

## 7. 队列与 Outbox

所有由 HTTP 触发的异步工作：

1. 同一数据库事务写业务状态与 outbox；
2. dispatcher 将 outbox 转为 job；
3. handler 获取 workspace-scoped data；
4. 执行幂等步骤；
5. 更新 checkpoint；
6. 发布下一个事件。

禁止：

- 在事务提交前发送不可回滚外部消息；
- 把完整用户原文放进 job payload；
- 仅凭队列消息体授权；
- 无 heartbeat 的长任务；
- 无限重试。

建议 Job 类型：

- material.process；
- material.delete；
- profile.suggest；
- topic.generate；
- content_run.advance；
- content_asset.regenerate；
- review.run；
- artifact.build；
- export.build；
- workspace.delete；
- usage.reconcile。

## 8. 幂等和恢复

每个 AI 步骤用输入 hash。成功输出存在且仍有效时复用。

外部副作用：

- 上传 complete；
- provider file create；
- export build；
- deletion；

必须保存 provider ID 和完成标志。

Worker 崩溃后：

- lock 到期；
- 另一个 Worker 领取；
- 从 checkpoint 恢复；
- 不重新生成已成功且输入未变的资产；
- 若外部状态未知，先 reconcile。

## 9. 配置

配置分层：

1. 代码默认；
2. 环境变量；
3. 系统动态配置；
4. 工作区设置；
5. 单次任务设置。

优先级越具体越高，但硬安全上限不可由工作区放宽。

动态配置：

- model role mapping；
- reasoning；
- price table；
- budgets；
- similarity thresholds；
- feature flags；
- upload limits；
- retention；
- prompt rollout。

## 10. AI Schema 共享

JSON Schema 是运行时合同。建议生成：

- TypeScript 类型；
- Zod validators；
- OpenAPI components；
- Eval validators。

不能分别手写四份容易漂移的定义。E00 应选择单一源并实现代码生成或一致性测试。

## 11. 内容编辑器

MVP 可选择 Markdown-first 编辑器，要求：

- 支持结构化段落；
- 可定位 claim offset 或 block ID；
- 自动保存；
- 版本；
- diff；
- 不允许任意 HTML；
- 导出稳定。

若选择富文本，应使用 block IDs 支持声明定位，写 ADR 说明复杂度。默认建议 Markdown + block metadata。

## 12. 互动作品安全架构

```text
Model -> JSON Schema
      -> semantic validator
      -> formula parser -> AST allowlist
      -> renderer
      -> accessibility tests
      -> static bundle
```

Calculator 公式允许：

- 数字；
- 变量；
- `+ - * / %`；
- 比较；
- 布尔；
- 条件；
- `min max round floor ceil abs clamp`。

禁止属性访问、函数定义、循环、字符串代码和动态调用。

Preview 使用 sandboxed iframe：

- 无 same-origin 权限；
- 无 top navigation；
- 无 forms 到外部；
- 无 downloads，除明确用户动作；
- CSP 禁止外网；
- postMessage 协议验证 origin 和 schema。

## 13. SSRF 与文件处理

URL fetch service：

- DNS 解析后校验；
- 重定向每次重新校验；
- 禁止私网；
- 超时；
- 下载限制；
- 内容类型 allowlist；
- HTML sanitizer；
- 不执行 JS；
- user-agent 标识；
- robots/条款由产品策略处理。

文件：

- quarantine bucket/prefix；
- hash；
- MIME sniff；
- 扫描 hook；
- 解析在低权限 Worker；
- PDF/DOCX 解析设置资源限制；
- 不运行宏；
- 图片去除不必要 EXIF，可配置保留。

## 14. 日志、Tracing 和 Metrics

日志字段：

- request_id；
- trace_id；
- workspace_id（可哈希）；
- user_id（可哈希）；
- resource_type/id；
- job_id；
- run_id；
- step；
- status；
- error_code；
- duration；
- model；
- usage；
- cost。

禁止：

- 原文；
- 转写正文；
- Prompt 全文；
- API keys；
- signed URLs；
- Session cookies；
- 用户邮箱明文（普通日志）。

Tracing：

- HTTP；
- DB；
- queue；
- worker step；
- provider call；
- storage；
- export。

Metrics：

- job latency/error；
- provider latency/error；
- schema failure；
- run completion；
- blocker frequency；
- approval；
- export；
- budget pause；
- deletion failures。

## 15. 部署

### Local

Docker Compose：

- Postgres + pgvector；
- MinIO；
- Mailpit；
- 可选 OpenTelemetry collector。

Web/Worker 本地 pnpm 运行。

### Production baseline

可部署为：

- Web service；
- Worker service；
- Managed PostgreSQL；
- S3-compatible storage；
- SMTP provider；
- OpenAI API。

Web 和 Worker 使用同一代码版本，迁移为单独 release step。需要 health checks、优雅退出和 job drain。

## 16. CI/CD

PR：

- install frozen lockfile；
- specs validate；
- format；
- lint；
- typecheck；
- unit；
- integration with containers；
- build；
- E2E critical subset；
- migration check；
- dependency/security scan；
- artifact engine security tests。

Main：

- 全量 E2E；
- eval baseline；
- image build；
- migration dry run；
- deploy staging；
- smoke；
- manual production approval。

## 17. 可替换性

未来可替换：

- AI provider；
- queue；
- storage；
- auth；
- deployment。

但 MVP 不需要做抽象宇宙。只在真正外部边界定义 ports，内部不要为假想需求增加层次。
