# E00 工程基座

状态：`planning`  
负责人：待指定  
依赖：无  
建议模型：规划与审查使用 `gpt-5.6-sol`，明确实现使用 `gpt-5.6-terra`

## 1. 用户结果

建立一个能在干净机器上重复启动、迁移、测试和构建的 SerialOS 单仓库。此 Epic 不交付业务功能，但它必须为后续每个垂直切片提供真实数据库、对象存储、持久任务、可替换 AI 适配器、类型化合约、日志与 CI，而不是一组会被推翻的临时脚手架。

## 2. 关联规格

- `AGENTS.md`
- `docs/11-system-architecture.md`
- `docs/14-security-privacy.md`
- `docs/15-test-and-acceptance.md`
- `contracts/openapi.yaml`
- `db/schema.sql`
- `schemas/*.json` 与 `examples/*.example.json`
- FR-OPS-001、FR-OPS-002、FR-OPS-003、FR-OPS-004、FR-OPS-005、FR-OPS-006 的基础部分

## 3. 范围

### 包含

- pnpm TypeScript monorepo；
- Next.js Web、Node Worker、共享 packages；
- PostgreSQL + pgvector、S3 兼容对象存储、开发邮件捕获；
- 版本化 migration 与 seed 框架；
- PostgreSQL durable jobs + outbox 的最小可运行实现；
- OpenAI、对象存储、邮件、时钟和 ID 生成接口及 deterministic fakes；
- JSON Schema 与 OpenAPI 校验；
- 统一错误、请求 ID、结构化日志、tracing/metrics 接口；
- 环境变量校验、secret redaction、基础 rate-limit 接口；
- CI、Docker Compose、health/readiness；
- 测试金字塔和最小 smoke path；
- ADR 目录与首批决策。

### 不包含

- 可用登录流程；
- 任何素材、选题、内容或 artifact 业务页面；
- 真实 OpenAI 生产调用；
- Redis、Kafka、Kubernetes 或微服务；
- 自动部署到某个特定云厂商；
- 为未来多租户计费预建复杂权限系统。

## 4. 垂直切片

### E00-S01 Monorepo 与命令合同

交付：

- `apps/web`、`apps/worker`；
- `packages/domain`、`application`、`db`、`contracts`、`ai`、`storage`、`jobs`、`observability`、`ui`、`config`、`testkit`；
- root `package.json`、workspace、TypeScript 配置、ESLint、formatter；
- `AGENTS.md` 中要求的全部命令有真实实现；
- 共享包不能依赖 Web 框架。

验收：

- 干净 checkout 后 `pnpm install && pnpm build` 成功；
- `pnpm lint`、`format:check`、`typecheck`、`test` 均执行真实检查；
- package dependency graph 无循环；
- lockfile 已提交。

### E00-S02 本地基础设施与配置

交付：

- Docker Compose：PostgreSQL/pgvector、MinIO、Mailpit 或等价开发服务；
- `.env.example` 与启动时类型校验；
- dev/test 环境隔离；
- `/health/live` 与 `/health/ready`；
- 对象存储 bucket bootstrap；
- 一条命令启动依赖并提供清理方式。

异常：

- 数据库不可达时 readiness 失败但进程不伪装健康；
- 缺少必填配置时启动立即失败，错误不得打印 secret；
- bucket 初始化可重入。

### E00-S03 数据库、迁移与工作区作用域基元

交付：

- 将 `db/schema.sql` 转成所选 migration 工具可执行的首批 migration；
- migration checksum 与向前升级测试；
- typed repository transaction boundary；
- workspace-scoped repository helper；
- UTC 时间、ID、version 字段约定；
- seed framework，仅含非敏感开发数据。

验收：

- 空数据库 migrate、seed、重新 migrate 均成功；
- migration 在 test database 中运行；
- repository helper 无 workspace ID 时不允许查询业务表；
- schema 与 `docs/09-data-model.md` 不一致处有 ADR。

### E00-S04 Durable job、outbox 与幂等

交付：

- job enqueue、claim、heartbeat、success、retry、dead-letter、cancel；
- outbox 与业务事务同提交；
- worker graceful shutdown；
- exponential backoff + jitter；
- idempotency key、attempt 和 checkpoint 数据；
- deterministic test clock。

验收：

- worker 在处理中崩溃后任务可被重新领取；
-同一 idempotency key 不产生重复副作用；
- poison job 进入 dead letter，不阻塞队列；
- 取消状态不可被晚到结果覆盖；
- 并发测试证明单一任务不会被两个 worker 同时提交成功。

### E00-S05 外部服务端口与测试替身

交付：

- `AiGateway`、`EmbeddingGateway`、`TranscriptionGateway`、`WebResearchGateway`；
- `ObjectStorage`、`Mailer`、`Clock`、`IdGenerator`；
- fake/fixture 适配器；
- provider request ID、usage、cost metadata 的统一返回类型；
- prompt/schema registry 目录与版本命名约定。

验收：

- 默认 CI 不访问公网；
- fake 可模拟成功、schema invalid、429、超时、5xx、取消；
- 业务层不 import OpenAI SDK；
- model ID 和 reasoning level 只从配置或路由策略读取。

### E00-S06 API、错误与合同基座

交付：

- `contracts/openapi.yaml` 自动校验；
- request/response validation 边界；
- `contracts/error-codes.md` 的统一 envelope；
- session、workspace、idempotency、pagination 的基础中间件；
- contract test harness。

验收：

- 未声明响应会使合同测试失败；
- validation error 返回稳定 code、field issues、request ID；
- 内部 stack trace 不返回客户端；
- 404 与越权不可通过差异泄露资源存在性。

### E00-S07 可观测与安全基线

交付：

- JSON logs、trace/span abstraction、metrics registry；
- request/job/call correlation ID；
- redaction processor；
- audit event append API；
- CSP、安全 headers、CSRF 策略；
- rate limiter 接口与本地实现；
- private file signed URL 接口。

验收：

- 日志 fixture 证明原始素材、Authorization、cookie、API key 被清除；
- 每个 job 可从 request 追踪到 worker；
- audit log 不可通过普通 repository 更新；
- security headers 有集成测试。

### E00-S08 CI 与最小 smoke

交付：

- CI jobs：spec validation、format、lint、typecheck、unit、integration、build；
- 可选 E2E job；
- dependency cache；
- Docker image 或 production build smoke；
- README 本地启动步骤；
- 使用 `docs/adr/0000-template.md` 创建首个 `0001` ADR。

验收：

- CI 在全新环境执行；
- 故意破坏一个 JSON Schema、migration 或 type 时对应 job 失败；
- Web health、Worker health、DB roundtrip、object storage roundtrip 的 smoke 测试通过。

## 5. 数据与 API

本 Epic 允许创建基础表与 migration，但不得通过 UI 暴露业务资源。API 仅包含 health/readiness 和实现认证所需的内部 skeleton。任何与 `openapi.yaml` 不一致的临时 API 都禁止进入主分支。

## 6. 测试要求

- Unit：配置、redaction、error mapping、job backoff、ID、budget 类型；
- Integration：migration、transactional outbox、queue recovery、S3 adapter、health；
- Contract：OpenAPI parse、所有 JSON Schema Draft 2020-12 校验；
- Security：secret/log redaction、headers、workspace helper fail-closed；
- Smoke：Web、Worker、DB、storage 全链路。

## 7. 完成门

必须实际运行并记录：

```bash
pnpm specs:validate
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm test:integration
pnpm build
pnpm db:migrate
pnpm db:seed
```

同时满足：

- 任务文档中的切片全部通过；
- 无 live provider dependency；
- 没有占位成功响应；
- 没有未记录的技术栈偏离；
- `README.md` 可供不熟悉项目的工程师在一台干净机器上启动；
- `/review` 无 blocker/critical finding。
