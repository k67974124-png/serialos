# E00 工程基座执行计划

- Status: accepted
- Date: 2026-07-12
- Last revised: 2026-07-13
- Task: `tasks/E00-foundation.md`
- Slices: E00-S01 through E00-S08
- Requirement review verdict: `ready_with_recorded_assumptions`

## 1. Objective

SerialOS 是面向中文知识型创作者的 AI 编辑操作系统。本计划在当前仓库根目录建立可在干净机器上重复安装、启动、迁移、测试和构建的工程基座。完成后，工程师能够启动 Web、Worker、PostgreSQL/pgvector、MinIO 与 Mailpit，看到真实的存活/就绪状态，并在没有真实 OpenAI Key、没有公网模型调用的默认 CI 中验证数据库、对象存储、队列、合同和安全基线。

本计划只覆盖 E00-S01 至 E00-S08，以及 FR-OPS-001 至 FR-OPS-006 和 NFR-001 至 NFR-007 中由 E00 负责的基础部分。它不开始 E01，也不交付登录、引导、素材、选题、内容生产、审校、互动作品或导出能力。

必须持续保持以下产品不变量：

1. SerialOS 服务中文知识型创作者，AI 是可审阅的编辑协作者，不是匿名枪手。
2. 不得伪造个人经历、客户故事、引用、统计或来源。
3. 每项外部可验证声明必须关联一个或多个存储来源，或者明确标记为 `unsupported`。
4. content run 存在未解决 blocker 时不得批准。
5. MVP 不自动发布到第三方平台。
6. MVP 不执行模型生成的任意代码。
7. 互动作品只能由获准的 JSON Schema 和安全模板渲染；E00 不实现 artifact engine。
8. 普通日志不得包含创作者原文、转写正文、完整 Prompt、凭证、Cookie、签名 URL 或明文邮箱。
9. 应用使用的每项 AI 输出都必须通过 Schema 校验。
10. 模型 ID、reasoning level、预算和价格元数据必须可配置。
11. 长时间 AI 与文件处理只能在独立 Worker 中运行，不依赖 Web 请求生命周期。
12. PostgreSQL 是事实源；任务必须持久、幂等、可重试、可取消并可从 checkpoint 恢复，且保存 provider request ID。
13. 默认 CI 只使用 deterministic fakes，不调用真实 OpenAI API 或其他第三方生产服务。
14. MVP 不引入 Redis、Kafka、Kubernetes 或微服务，除非后续有已批准 ADR。
15. E00 不交付登录、素材、选题、内容、审核、导出或互动作品业务能力。

## 2. Scope

### In scope

- pnpm strict TypeScript monorepo、Next.js Web、独立 Node.js Worker 和 E00 指定的共享 packages；
- 根命令合同、锁文件、依赖图检查、跨平台开发脚本和 GitHub Actions CI；
- PostgreSQL/pgvector、MinIO、Mailpit 的 dev/test 隔离环境；
- 完整 `db/schema.sql` 的版本化初始迁移、向前升级、checksum 和合成 seed；
- typed transaction/repository boundary 和 workspace-scoped query helper；
- 自有 PostgreSQL durable job/outbox 最小实现；
- AI、embedding、transcription、web research、storage、mail、clock 和 ID ports，以及 deterministic fakes；
- OpenAPI 3.1、JSON Schema Draft 2020-12、examples 和生成类型的一致性检查；
- 统一错误 envelope、request/correlation ID、结构化日志、redaction、trace/metrics 接口和 append-only audit sink；
- Web/Worker liveness/readiness、最小中文状态页、production build/image smoke；
- 单元、集成、合同、安全、E2E/smoke 测试骨架及真实执行；
- README、运行/清理说明和本计划引用的 ADR。

### Out of scope

- E01 的魔法链接/GitHub OAuth、真实 session 流程、可用工作区创建与引导；
- 任何素材、画像、栏目、选题、content run、review、artifact、export 的 handler、页面或领域用例；
- 真实 OpenAI SDK 适配器、live provider smoke、Web Research 和 Moderation 调用；
- artifact engine、富文本编辑器、社媒发布、多人权限、计费和云自动部署；
- Redis、Kafka、Temporal、Kubernetes、独立向量数据库或微服务；
- E11 的完整发布门、生产 SLO、完整安全扫描和 30 个以上 Golden Set。

## 3. Inputs reviewed

- Repository instructions: `START_HERE.md`, `AGENTS.md`, `README.md`, `PLANS.md`;
- Product and scope: `docs/00-project-charter.md`, `docs/01-prd.md`, `docs/03-scope-and-release-plan.md`;
- Active task: `tasks/README.md`, `tasks/E00-foundation.md`, `prompts/00-bootstrap.md`;
- Independent plan acceptance criteria: `prompts/00-e00-plan-acceptance.md`;
- Functional and traceability: FR-OPS-001 through FR-OPS-006 and NFR-001 through NFR-007 in `docs/06-functional-spec.md`, plus `docs/20-requirement-traceability.md`;
- Data and API: `docs/09-data-model.md`, `docs/10-api-contracts.md`, `contracts/openapi.yaml`, `contracts/error-codes.md`, `contracts/events.md`, `db/schema.sql`, `db/seed.md`;
- Architecture, security, and testing: `docs/11-system-architecture.md`, `docs/14-security-privacy.md`, `docs/15-test-and-acceptance.md`;
- Existing decisions: `docs/17-decisions-and-assumptions.md`, `docs/19-official-implementation-notes.md`, `docs/adr/README.md`, `docs/adr/0000-template.md`;
- Runtime contracts: all 9 files under `schemas/` and their 9 matching `examples/*.example.json` fixtures;
- Current config surface: `.env.example`;
- Static validation: `python scripts/validate_specs.py` on 2026-07-13, PASS with 0 errors and 0 warnings.

## 4. Current-state findings

### Repository state

- The current root is the correct `SerialOS-Codex-Project-Kit-v1.0` directory and is initialized as Git branch `main`, tracking `origin/main`.
- The repository remains a specification handoff: there is no root `package.json`, `pnpm-lock.yaml`, workspace definition, app/package tree, migration directory, Docker Compose file, or CI workflow.
- The specification inventory contains 87 requirements, 96 OpenAPI operations, 57 SQL tables, 24 SQL enums, 9 JSON Schemas and 9 matching examples.
- `db/schema.sql` is statically valid but has not been executed against PostgreSQL; this is an explicit E00 acceptance boundary.

### Requirements review findings

1. **Major — E00 route scope versus full OpenAPI.** `tasks/E00-foundation.md` limits E00 APIs to health/readiness and internal authentication skeleton, while `contracts/openapi.yaml` already declares all MVP operations. Implementing fake handlers would violate scope; requiring all declared operations to exist would make E00 impossible. Resolution: parse and validate the full contract, but maintain an E00 implemented-operation manifest containing only `getLiveness` and `getReadiness`. Runtime contract tests require every registered route/response to be declared and valid; they do not fabricate later-Epic handlers.
2. **Major — durable-job contract is wider than the SQL table.** E00-S04 requires checkpoint data and cancellation safety, and the OpenAPI `Job` includes progress/currentStep, while `db/schema.sql` currently has no `checkpoint`, `progress`, `current_step`, `cancel_requested_at`, or explicit dead-letter timestamp. Resolution: ADR-0003 adds these fields in a forward migration, updates the canonical schema/data documentation, and guards late success writes with lock ownership plus cancellation state.
3. **Minor — package name mismatch.** The architecture example uses `packages/test-kit`; the active E00 acceptance uses `packages/testkit`. Resolution: use `packages/testkit`, because the architecture tree explicitly permits adjustments and the active task is more specific. Do not create `artifact-engine` before E09.
4. **Minor — E2E command/CI wording.** `AGENTS.md` requires a real `pnpm test:e2e`, while E00 calls the E2E CI job optional and omits the command from its completion snippet. Resolution: implement and run a real E00 Playwright health/status smoke. It is a separate CI job and part of E00 verification.
5. **Minor — first-version upgrade evidence.** The global test spec asks for upgrade from a prior migration, but the repository has no prior migration. Resolution: create `0001_baseline` from the existing SQL and `0002_foundation_runtime` for the required queue/audit refinements, then prove `0001 -> 0002` in integration tests.

### Requirement-to-contract gaps

- FR-OPS-002 and E00-S04 require checkpoint/cancel/progress persistence not represented by the current `jobs` SQL table; ADR-0003 closes this before implementation.
- FR-OPS-006 says prompt/schema versions are queryable, but E00 forbids public business APIs and the OpenAPI has no prompt-version read route. E00 will provide an application/repository query port and controlled CLI/test access only; a public route must be assigned and added to OpenAPI in its owning later Epic before exposure.
- E00-S06 asks for session/workspace/idempotency/pagination middleware while E00 has no usable auth flow. E00 will deliver typed, fail-closed middleware primitives and tests, not production authentication success.
- The 9 AI JSON Schemas are canonical runtime contracts, but generated TypeScript types do not yet exist. ADR-0004 defines generation and drift checking.

### Missing acceptance tests added by this plan

- Registered-but-undeclared operation and undeclared response status/schema failures;
- E00 operation-manifest test proving later business handlers are absent;
- cancellation-versus-late-success race and stale lock-owner update rejection;
- outbox duplicate delivery with exactly-once local effect through a business idempotency key;
- audit update/delete rejection at the database boundary;
- config error output and structured-log fixtures proving secret/raw-content redaction;
- test/dev database and bucket isolation;
- migration checksum tamper, `0001 -> 0002`, seed repeatability and no-op re-migrate;
- Web and Worker readiness degradation/recovery without calling a model provider.

Verdict: `ready_with_recorded_assumptions`. No blocker prevents E00 planning. Implementation must not begin until this plan and the proposed ADRs are accepted.

## 5. Decisions

| Decision | Reason | Alternatives considered | ADR |
|---|---|---|---|
| pnpm + Turborepo + strict TypeScript; Next.js App Router Web; Node Worker; GitHub Actions calling portable pnpm scripts | Matches the specified boundaries and keeps one reproducible command graph | npm workspaces, Nx, provider-specific scripts only | ADR-0001, proposed |
| Use the active-task package name `packages/testkit`; defer `artifact-engine` to E09 | Avoids task acceptance mismatch and scope creep | `test-kit`; empty artifact package | ADR-0001 |
| Drizzle ORM with `pg`, SQL migrations, full existing schema migrated up front | Matches default architecture while retaining PostgreSQL as source of truth | Kysely, Prisma, ORM-generated-only schema | ADR-0002, proposed |
| `0001_baseline` plus `0002_foundation_runtime`; canonical `db/schema.sql` represents head state | Provides real prior-version upgrade evidence and preserves the supplied SQL | One monolithic migration; rebuild schema from ORM | ADR-0002 |
| Custom PostgreSQL queue/outbox using `FOR UPDATE SKIP LOCKED` | Uses the supplied `jobs`/`outbox_events` model and avoids a second queue schema | pg-boss, Redis queue, Temporal | ADR-0003, proposed |
| JSON Schema/OpenAPI remain canonical; generate TS types; validate with Ajv 2020 | Prevents four hand-maintained definitions and supports OpenAPI 3.1 / Draft 2020-12 | Zod-first regeneration; manually duplicated types | ADR-0004, proposed |
| Pino-compatible JSON logger, OpenTelemetry API abstraction, in-process metrics registry | Meets E00 interfaces without requiring a production telemetry backend | Console text logs; mandatory collector/vendor | ADR-0001 |
| No OpenAI SDK/runtime adapter in E00; only typed ports and deterministic fakes | The task explicitly excludes real provider calls | Install SDK with disabled adapter | No ADR; direct scope requirement |

Dependency versions will be selected and pinned during E00-S01 from the then-current stable mutually compatible releases. Version selection must be verified against primary project documentation/registries and recorded in the lockfile; no model ID, price, context limit, or provider feature becomes a hard-coded product promise.

Planned production dependencies:

- Web/runtime: `next`, `react`, `react-dom`;
- config/validation: `zod`, `ajv`, `ajv-formats`;
- database: `drizzle-orm`, `pg`;
- object storage: AWS SDK S3 client and presigner packages;
- logging/tracing: `pino`, `@opentelemetry/api`.

Planned development dependencies:

- workspace/build: `typescript`, `pnpm`, `turbo`, `tsx`;
- quality: ESLint, Prettier, dependency graph checker;
- database/codegen: `drizzle-kit`, OpenAPI and JSON Schema TypeScript generators;
- tests: `vitest`, Testing Library, Playwright, accessibility smoke tooling;
- contract parsing: an OpenAPI 3.1 parser/dereferencer used only behind `packages/contracts`.

Every production dependency must be recorded in the relevant package README or ADR with its boundary purpose. Do not add auth, editor, queue-service, OpenAI, analytics-vendor, Redis, or artifact dependencies in E00.

## 6. Data changes

### Migration layout

- `packages/db/migrations/0001_baseline.sql`: immutable snapshot converted from the supplied `db/schema.sql` before foundation corrections;
- `packages/db/migrations/0002_foundation_runtime.sql`: queue checkpoint/progress/cancel/dead-letter fields, supporting indexes/constraints, and database protection against audit update/delete;
- `packages/db/migrations/meta/`: ordered journal and checksums managed by the chosen migration runner;
- `packages/db/src/schema/`: Drizzle typed projection used by repositories;
- `db/schema.sql`: updated to represent the final E00 head schema and checked against an empty migrated database.

The initial migration creates all specified tables, including later-Epic business tables, because E00-S03 explicitly requires converting the full supplied SQL. Their presence is inert infrastructure: E00 adds no business route, use case, or UI for them.

### Data rules

- Use PostgreSQL UUID and UTC `timestamptz` conventions already present in the schema;
- preserve pgcrypto and pgvector extensions;
- repository access to workspace-owned tables requires a non-empty typed `WorkspaceId` and adds a workspace predicate before resource ID predicates;
- transactions are exposed through an application `TransactionManager`, not through Next.js types;
- editable repository primitives require version predicates and return a typed conflict;
- no Row Level Security is introduced in E00 because it is not specified; application scoping remains mandatory and tested fail closed;
- audit rows are append-only via an insert-only port plus database trigger protection;
- seed data is deterministic, synthetic, and covers the two isolated workspaces and shapes required by `db/seed.md`; it is labeled development-only and contains no customer data.

### Forward and rollback strategy

- Production-style migration rollback is forward-fix by default; destructive down migrations are not automatically run.
- Tests create an empty database, apply `0001`, verify, apply `0002`, verify, seed, and re-run migrate/seed idempotently.
- A checksum mismatch halts startup/migration with no schema mutation.
- E00 rollback before external use may drop the project-scoped dev/test databases and volumes. After data exists, rollback means deploy the previous compatible code and apply a reviewed forward repair migration; never silently drop user data.

## 7. API changes

### Implemented public operations

- `GET /health/live`: always reports process liveness without dependency calls;
- `GET /health/ready`: checks PostgreSQL, the queue table/claim capability, and object storage/bucket; never calls a paid model; returns 503 with sanitized dependency states when unavailable.

The Web exposes these routes exactly as declared in `contracts/openapi.yaml`. The Worker exposes equivalent internal loopback probes using the same response schema for local/production health checks; they are not a new public product API.

### Foundations without usable E01 behavior

- Request ID creation/propagation and error mapping;
- typed `ActorContext`, session/workspace resolver interfaces, pagination parser and idempotency repository;
- fail-closed behavior when actor/workspace is absent;
- stable Simplified Chinese validation/dependency error messages;
- no stack traces, provider prompts, secrets or raw user content in responses.

### Contract policy

- Parse and dereference the full OpenAPI 3.1 file on every contract test;
- generate types into `packages/contracts/src/generated/openapi.ts` and fail CI on drift;
- E00 route manifest contains only `getLiveness` and `getReadiness`;
- registered routes and returned statuses/content types must exist in OpenAPI and validate against their response schema;
- absence of later-Epic operations from the running application is expected, not replaced with fake success;
- any future operation must update the manifest, handler, contract test and traceability in the owning Epic.

## 8. Worker and AI changes

### Durable job/outbox state

Job transitions:

```text
queued -> running -> succeeded
queued/running -> retry_scheduled -> running
queued/running/retry_scheduled -> canceled
running -> failed -> retry_scheduled | dead_letter
```

- enqueue stores workspace, job type, minimal ID-only payload, dedupe key, attempt/max attempts and available time;
- claim uses one transaction with `FOR UPDATE SKIP LOCKED`, lease owner, lock timestamp and heartbeat;
- progress/current step/checkpoint updates require the current lease owner;
- expired locks are reclaimable after the configured lease;
- success is conditional on current lease ownership and no pending cancellation;
- running cancellation sets `cancel_requested_at`; handlers poll at safe boundaries; late results cannot overwrite canceled state;
- retry delay is exponential with deterministic jitter derived from job ID and attempt so tests are reproducible;
- max attempts move poison jobs to dead letter without blocking other jobs;
- graceful shutdown stops claims, requests handler cancellation, allows a bounded drain, persists checkpoint, then releases/expires leases.

Outbox dispatch occurs transactionally: select unpublished events, insert/dedupe their jobs, and mark published in the same PostgreSQL transaction. Payloads contain resource IDs, versions and minimal state only. Consumers dedupe on event ID or a declared business idempotency key.

### External ports and fakes

- `AiGateway`, `EmbeddingGateway`, `TranscriptionGateway`, `WebResearchGateway`;
- `ObjectStorage`, `Mailer`, `Clock`, `IdGenerator`;
- shared provider result metadata: provider request ID, model, reasoning, usage, cost estimate, latency, status and schema version;
- deterministic fakes for success, invalid schema, 429, timeout, 5xx and cancellation;
- fake outputs must pass the same runtime schema validators as real adapters;
- business/domain packages cannot import provider SDKs;
- model names and reasoning levels are opaque configuration strings in E00.

No prompt executes and no provider adapter sends network traffic in E00. Prompt/schema registry directories and immutable naming conventions are created, but production prompt release workflow remains for the owning AI Epic.

## 9. UI changes

E00 adds no product workflow. The only page is a small, accessible Simplified Chinese engineering status page that reports that the SerialOS foundation process is running and can request sanitized readiness state.

States:

- loading: visible text and accessible busy state while readiness is queried;
- ready: Web, database/queue and object storage are available;
- degraded/error: name only the unavailable dependency category, never endpoint/credentials, and provide a retry control;
- offline: network failure with a retry action;
- empty/product state: explicitly states that E00 contains no login or content features.

The page must be keyboard operable, have visible focus, semantic headings/status text, pass axe smoke, and remain usable at 390 px and 200% zoom. It must not imply that login, AI generation, publication or any later feature exists.

## 10. Security and privacy

- Config schemas validate required values at process start; errors list variable names/reasons only, not values.
- `OPENAI_API_KEY` is optional while live-provider features are disabled and is never read by default tests.
- Redaction removes known sensitive keys (`authorization`, `cookie`, `set-cookie`, API keys, tokens, passwords, signed query parameters) and detects obvious secret patterns before logging.
- Raw material, transcript, prompt and provider body field names are denylisted from normal logs; tests inject sentinel strings and assert absence across nested errors.
- Request/job/call correlation IDs are allowed; workspace/user IDs are hashed or otherwise minimized in normal logs.
- Workspace scope is loaded from trusted context/database, never from a job payload or arbitrary request body.
- Health responses expose only `ok`, `unavailable`, or `not_checked` dependency categories and never return connection strings or provider errors.
- Object keys use `workspaces/{workspaceId}/...`; bucket bootstrap is idempotent; private files are available only through short-lived signed URL ports.
- The local rate limiter is an interface plus deterministic in-memory implementation. It is not represented as production multi-instance enforcement for E01.
- Security headers include CSP, content type protections, frame policy appropriate to the main app, referrer policy and a documented CSRF/origin strategy; E00 has no state-changing product routes.
- Audit has an append-only application port and database enforcement; summaries never contain full bodies.
- Default test/CI provider adapters deny unexpected network calls.

## 11. Test plan

### Unit

- config success/failure and conditional provider requirements;
- redaction of nested values, URLs, errors and sentinel raw content;
- error-code to HTTP/user message/retry/audit policy mapping;
- request/correlation IDs, UUID generation and fixed Clock;
- exponential backoff, deterministic jitter and retry exhaustion;
- budget/money value objects without floating-point arithmetic;
- workspace helper rejects missing/invalid scope;
- provider fakes cover success, invalid schema, 429, timeout, 5xx and cancellation;
- health aggregation does not call model gateways.

### Integration

- PostgreSQL extension availability, empty migrate, checksum tamper, `0001 -> 0002`, no-op re-migrate, deterministic/repeat seed;
- transaction rollback and business state + outbox atomic commit;
- queue claim concurrency, heartbeat, expired-lock recovery, poison dead letter and graceful drain;
- duplicate event/idempotency handling and cancellation/late-success race;
- workspace A cannot access workspace B through repository helpers;
- audit update/delete rejected;
- MinIO bucket bootstrap and object put/head/get/delete/signed-URL roundtrip using synthetic bytes;
- Mailpit availability check without sending real email;
- Web and Worker ready/unready transitions when DB/storage are unavailable.

### Contract/schema

- parse/dereference OpenAPI 3.1;
- all 9 JSON Schemas use Draft 2020-12 and all 9 examples validate;
- negative fixtures fail, extra properties fail where specified, generated types are current;
- health responses, error envelope and registered routes validate against OpenAPI;
- undeclared status/content-type/operation tests fail;
- E00 operation manifest proves later business operations are not registered.

### Security

- raw material, Authorization, Cookie, API key, signed URL and config values never appear in logs or startup errors;
- security headers and CSP integration tests;
- workspace fail-closed and cross-workspace randomized IDs;
- object keys and signed URLs stay in the active workspace prefix;
- job/outbox payload fixture contains no large/raw content;
- default CI has no OpenAI key and unexpected provider calls fail immediately.

### E2E/smoke

- start isolated dependencies, migrate and seed;
- start Web and Worker;
- Web status page loading/ready/degraded/retry behavior;
- Web `/health/live` and `/health/ready` contract;
- Worker liveness/readiness probe;
- DB roundtrip and object storage roundtrip;
- axe/keyboard/390 px status-page smoke;
- production build or container starts and serves health.

No live-provider eval is run in E00. `FEATURE_LIVE_PROVIDER_TESTS` remains false, and any future opt-in test must use synthetic data, a separate budget and official API documentation current at that time.

### Acceptance-to-test traceability

The paths below are required implementation targets, not files that already exist during planning.

| Acceptance object | Level and expected test path/name | Command | Success signal | Required failure signal |
|---|---|---|---|---|
| Monorepo command contract | build/static; planned script name scripts/ci/verify-command-contract.mjs, dependency graph test under `packages/testkit/test/package-boundaries.test.ts` | `pnpm install --frozen-lockfile && pnpm build && pnpm lint && pnpm typecheck && pnpm dependency:check` | all commands exit 0; frozen install leaves lockfile unchanged; graph has no cycle | missing/echo-only script, forbidden import, cycle, type or build error exits nonzero |
| Typed configuration | unit; `packages/config/src/config.test.ts` | `pnpm test` | valid dev/test fixtures parse; secrets are not returned | missing required variable and printed-secret sentinel are rejected; test exits nonzero on leakage |
| Liveness/readiness | integration/E2E; `apps/web/test/health.integration.test.ts`, `apps/worker/test/health.integration.test.ts`, `tests/e2e/foundation-health.spec.ts` | `pnpm test:integration && pnpm test:e2e` | live stays 200; ready is 200 only when DB/queue/storage are available | unavailable DB/storage produces sanitized 503 while live remains 200 |
| Migration and seed | integration; `packages/db/test/migrations.integration.test.ts` | `pnpm db:migrate && pnpm db:seed && pnpm test:integration` | empty DB reaches head; seed/re-migrate are repeatable; `0001 -> 0002` succeeds | modified checksum, invalid SQL or destructive drift fails before mutation |
| Workspace fail closed | unit/integration/security; `packages/db/test/workspace-scope.integration.test.ts` | `pnpm test:integration` | scoped actor reads only matching synthetic workspace | absent scope and workspace-B resource ID return typed rejection/no rows, never cross-tenant data |
| Queue recovery and cancellation | integration; `packages/jobs/test/queue-recovery.integration.test.ts`, `queue-concurrency.integration.test.ts` | `pnpm test:integration` | crash reclaim resumes checkpoint; one lease owner commits; cancel wins late result; poison job dead-letters | duplicate success, stale-owner update or canceled-to-succeeded transition fails the suite |
| Transactional outbox | integration; `packages/jobs/test/outbox.integration.test.ts` | `pnpm test:integration` | business write and outbox commit/rollback atomically; duplicate event creates one local effect | either half-commit or duplicate effect fails the suite |
| Provider ports/fakes | unit/contract; `packages/testkit/src/provider-fakes.test.ts`, `packages/ai/test/gateway-contract.test.ts` | `pnpm test && pnpm test:offline` | success result validates and metadata includes provider request ID/usage/cost | invalid schema, 429, timeout, 5xx and cancel take their typed failure paths; public network attempt fails immediately |
| API contract | contract; `packages/contracts/test/openapi.contract.test.ts`, `health-response.contract.test.ts` | `pnpm contracts:check` | OpenAPI resolves, generated types have no diff, E00 operations/responses validate | undeclared operation/status/content type or stale generated file exits nonzero |
| Logging/security | unit/integration; `packages/observability/test/redaction.test.ts`, `apps/web/test/security-headers.integration.test.ts`, `packages/storage/test/signed-url.integration.test.ts` | `pnpm test && pnpm test:integration` | sentinels absent, headers present, audit insert succeeds, signed URL stays scoped/short-lived | raw material/Authorization/Cookie/key leakage, audit update/delete or cross-scope object key fails |
| Foundation smoke | smoke/E2E; `tests/smoke/foundation-smoke.test.ts`, `tests/e2e/foundation-status.spec.ts` | `pnpm smoke && pnpm test:e2e` | Web, Worker, DB and storage roundtrips pass; page passes axe/keyboard/390px checks | any dependency or health assertion exits nonzero without fake success |
| CI negative-gate proof | isolated negative fixtures; planned script name scripts/ci/prove-negative-gates.mjs, `packages/contracts/test/fixtures/invalid/`, `packages/db/test/fixtures/bad-checksum/`, `packages/testkit/test/fixtures/type-error/` | `pnpm ci:prove-failures` | wrapper exits 0 only after schema, migration and type child checks each fail for the expected reason | any deliberately broken child check unexpectedly exits 0, or fails for a different reason, makes wrapper exit nonzero |

## 12. Implementation sequence

Each step must leave the repository buildable, add its tests with behavior, and must not introduce later-Epic behavior.

| Step | Slice and inputs | Required outputs | Completion condition | Immediate verification |
|---|---|---|---|---|
| 1 | E00-S01; accepted ADR-0001..0004, current specification tree | Node/Corepack/pnpm pins; root/workspace/Turbo/TS/ESLint/Prettier config; `.gitignore`; `apps/web`, `apps/worker`; exact E00 package directories; real root scripts; lockfile | frozen install succeeds; every required script resolves to a real tool/test; shared packages do not import Next.js; dependency graph has no cycle | `pnpm install --frozen-lockfile && pnpm format:check && pnpm lint && pnpm typecheck && pnpm dependency:check && pnpm build` |
| 2 | E00-S01/S06; OpenAPI, 9 JSON Schemas/examples, ADR-0004 | Ajv validators; generated OpenAPI/schema types; generation-diff check; E00 operation manifest; error envelope/request ID/fail-closed middleware contracts | all sources resolve; examples pass; negative fixtures fail; only health operations are registered | `pnpm specs:validate && pnpm contracts:check && pnpm test` |
| 3 | E00-S02; `.env.example`, architecture/security specs | project-scoped dev/test Compose; pgvector Postgres, MinIO bootstrap, Mailpit; typed Web/Worker config; `infra:up/down/clean`; README commands | dev/test names, ports, DBs and buckets are isolated; missing required config fails without secret; bucket bootstrap is reentrant | `pnpm infra:up && pnpm test && pnpm test:integration && pnpm infra:down` |
| 4 | E00-S03; `db/schema.sql`, `db/seed.md`, ADR-0002 | `0001_baseline`, `0002_foundation_runtime`, journal/checksums, Drizzle projection, transaction manager, scoped helpers, deterministic seed | empty/repeat/upgrade/checksum/scoping/audit tests pass; canonical SQL matches migrated head | `pnpm infra:up && pnpm db:migrate && pnpm db:seed && pnpm db:migrate && pnpm db:seed && pnpm test:integration` |
| 5 | E00-S04; migrated jobs/outbox, ADR-0003 | enqueue/claim/lease/heartbeat/checkpoint/success/retry/dead-letter/cancel; provider request ID persistence in `ai_calls`/checkpoint; transactional dispatcher; graceful shutdown | crash, concurrency, duplicate, poison, cancel/late result, stale owner and outbox atomicity tests pass | `pnpm test:integration --filter jobs` (root script must forward the filter) |
| 6 | E00-S05; application ports, schemas, synthetic fixtures | all gateway/storage/mail/clock/ID ports; deterministic fakes; common metadata; MinIO adapter; prompt/schema registry naming | application/domain import no provider SDK; every fake failure mode is typed; default public network guard rejects calls | `pnpm test && pnpm test:offline && pnpm test:integration --filter adapters` |
| 7 | E00-S02/S06; health OpenAPI operations and config/adapters | Web public and Worker loopback probes; sanitized readiness; Chinese status page; request/response validation and contract tests | liveness remains independent; readiness degrades/retries correctly; no later route exists; page passes accessibility smoke | terminal A `pnpm dev`; terminal B `pnpm contracts:check && pnpm test:e2e --filter foundation-health && pnpm smoke` |
| 8 | E00-S07; request/job/provider contexts and security baseline | JSON logger/redaction; trace/metrics; correlation; append-only audit; CSP/headers/CSRF strategy; local limiter; scoped signed URL | sentinel leakage, missing headers, audit mutation and cross-scope URL tests all fail closed; request-to-job trace is provable | `pnpm test && pnpm test:integration --filter security` |
| 9 | E00-S08; all prior commands/tests | portable CI scripts; `.github/workflows/ci.yml`; pnpm dependency cache keyed by lockfile; pinned actions; negative-gate proof; production build/image smoke; clean-machine README | CI declares specs/format/lint/type/unit/integration/contract/security/build/E2E; schema/type/migration breaks are detected; Web/Worker/DB/storage smoke passes | `pnpm ci:prove-failures && pnpm build && pnpm smoke && pnpm test:e2e` |
| 10 | E00 full verification; clean dependency and Docker state | recorded command evidence, diff review, release verification report; task moves only to `verification` | every section 13 command succeeds; no blocker/critical review finding; no E01 files/behavior; human acceptance still pending | execute section 13 exactly, `/review`, then `$verify-release`; stop before E01 |

## 13. Verification commands

Prerequisites: Git, the pinned Node LTS, Corepack/pnpm, Docker Engine with Compose, and free project-local ports documented in README. No OpenAI key is required.

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm infra:up
pnpm specs:validate
pnpm contracts:check
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm test:integration
pnpm test:e2e
pnpm build
pnpm db:migrate
pnpm db:seed
pnpm smoke
pnpm dependency:check
pnpm ci:prove-failures
```

Default offline proof permits only loopback and declared Docker service hosts; its test bootstrap disables public connections and throws on unexpected network access:

```bash
pnpm test:offline
```

Run Web and Worker in terminal A, then health and roundtrip checks in terminal B:

```bash
# terminal A
pnpm dev

# terminal B
curl --fail --silent http://localhost:3000/health/live
curl --fail --silent http://localhost:3000/health/ready
curl --fail --silent http://127.0.0.1:3001/health/live
curl --fail --silent http://127.0.0.1:3001/health/ready
pnpm smoke
pnpm test:e2e
```

Stop terminal A with an interrupt, then stop dependencies without deleting data:

```bash
pnpm infra:down
```

The opt-in live-provider command and CI job are defined behind an explicit flag and separate secret/budget, but E00 has no live adapter. In E00, enabling it must exit nonzero with `LIVE_PROVIDER_ADAPTER_NOT_IMPLEMENTED_IN_E00` before any network call. The owning later AI Epic may change that expected signal only when it implements the adapter and synthetic smoke fixture:

```bash
FEATURE_LIVE_PROVIDER_TESTS=true pnpm test:live
```

PowerShell equivalent:

```powershell
$env:FEATURE_LIVE_PROVIDER_TESTS = 'true'
pnpm test:live
Remove-Item Env:FEATURE_LIVE_PROVIDER_TESTS
```

Clean-machine/idempotency verification:

```bash
pnpm infra:clean
pnpm infra:up
pnpm db:migrate
pnpm db:seed
pnpm db:migrate
pnpm db:seed
pnpm test:integration
pnpm smoke
pnpm infra:down
```

`pnpm specs:validate` must invoke the repository validator rather than duplicate its logic. `pnpm ci:prove-failures` succeeds only when isolated broken Schema, type and migration fixtures fail for their expected reasons. `pnpm infra:down` preserves volumes. `pnpm infra:clean` may only remove resources labeled/named for this SerialOS compose project and must document that it deletes local development/test volumes.

## 14. Rollback

- **Code and dependencies:** stop Web/Worker, revert the E00 code/lockfile commit together, reinstall with `pnpm install --frozen-lockfile`, and rebuild. Do not mix a previous application build with a newer incompatible lockfile.
- **Configuration:** deploy the previous versioned non-secret config schema and restore the deployment environment from its protected prior revision. Validate before process start; never copy secret values into Git, logs or rollback notes. Feature flag rollback is server-side, versioned and audited.
- **Docker/local infrastructure:** use `pnpm infra:down` for normal rollback so volumes survive. Use `pnpm infra:clean` only for explicitly disposable project-scoped dev/test data after target validation and operator confirmation.
- **Database:** migrations are forward-only after data exists. Reverting application code requires schema compatibility; otherwise apply a reviewed forward repair migration. Never automatically run destructive down SQL or drop production data.
- **Claimed jobs and partial steps:** stop new claims, drain within a bound, persist checkpoint/provider request ID, and let remaining leases expire. The previous worker may resume only payload versions it declares compatible; otherwise jobs remain queued/dead-lettered for operator recovery, not discarded.
- **Outbox:** never delete unpublished events during rollback. The dispatcher pauses unknown event/payload versions, preserves attempts/errors, and replays after compatible code or a forward translator is deployed. Dedupe keys prevent replayed local effects.
- **Partially generated contracts/build artifacts:** generated files are regenerated from canonical OpenAPI/JSON Schema; never hand-edit them. Partial image/export-like smoke artifacts use project-scoped ephemeral storage and are deleted only by the explicit test cleanup path.
- **Provider state:** E00 creates no live provider files/resources. The live-test guard must fail before network access, so provider cleanup is not part of E00 rollback.

## 15. Risks and open questions

### Risks with planned mitigation

- **Large initial schema:** all future business tables migrate in E00. Mitigation: treat them as inert, test the exact schema, and expose no later-Epic repositories/routes beyond scoped infrastructure helpers.
- **Schema/type duplication:** SQL, Drizzle types and generated contract types may drift. Mitigation: canonical-source ADRs, generation scripts, live-database introspection checks and CI drift failure.
- **Custom queue correctness:** lease/cancel/outbox races are easy to mishandle. Mitigation: a deliberately small queue surface, conditional SQL updates, deterministic clock/jitter and concurrency/crash tests before any AI job exists.
- **Local cleanup damage:** Docker volume cleanup can delete developer data. Mitigation: fixed project name/labels, explicit command, target validation and warning text.
- **In-memory rate limiter:** not safe for multiple production instances. Mitigation: label it local/test only; E01 must choose and test PostgreSQL-backed enforcement before auth endpoints are considered production-ready.
- **Development/CI drift:** Windows development and Linux CI may differ in paths, line endings, Docker DNS and executable permissions. Mitigation: portable Node/pnpm scripts, checked line-ending policy, identical Compose service names, frozen lockfile and a clean Linux CI smoke.
- **Dependency and supply-chain risk:** selecting current packages can introduce vulnerable or untrusted transitive code. Mitigation: exact lockfile, primary registries, pinned GitHub Action SHAs, provenance policy, production dependency rationale, secret scan and dependency audit; do not use `curl | sh` installers.
- **CI cache correctness:** a stale pnpm cache can hide dependency drift. Mitigation: cache key includes OS, Node/pnpm pins and lockfile hash; frozen install remains authoritative and cache restore never skips validation.

### Human attention before implementation

1. Accept or revise ADR-0001 through ADR-0004, especially the custom PostgreSQL queue and full-schema migration approach.

The deployment target, E01 login method and production object-storage provider are not E00 blockers. If not decided before E01, the documented defaults remain Docker self-hosting, email magic link, local MinIO and production S3-compatible storage.

## 16. Implementation progress

### Baseline (2026-07-13)

- Base commit: `eb99c52f9aee53fccee921a2d3342243a477db4c`; branch: `main`.
- Existing dirty-tree changes are the accepted E00 planning, ADR, acceptance, prompt, manifest and handoff-generator changes. No pre-existing application, migration, Compose or CI implementation was present.
- Environment: Node `v24.12.0`, Corepack `0.34.5`, pnpm initially `10.32.1`, Docker `29.2.1`, Docker Compose `v5.1.0`, Python `3.10.11`.
- `python scripts/validate_specs.py`: exit `0`; Errors `0`; Warnings `0`; Verdict `PASS`.
- `git diff --check`: exit `0` after removing the Markdown line-break whitespace from the required task status transition.

### Slice evidence

| Slice | Status | Implementation evidence | Verification evidence | Actual decisions |
|---|---|---|---|---|
| E00-S01 | PASS | Root pnpm/Turbo/strict TypeScript/ESLint/Prettier/Vitest/Playwright configuration; Web and Worker applications; all 11 required shared packages; real root command contract; dependency and package-boundary checks; committed lockfile | `pnpm install --frozen-lockfile`, `pnpm format:check`, `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm dependency:check`, `pnpm build`, and `git diff --check` all exited `0`; 4 unit/boundary tests passed; 13 workspaces built with 0 dependency cycles | Pin Node 24 and pnpm `11.12.0`; TypeScript `6.0.3` is the newest release compatible with `typescript-eslint@8.63.0`; pnpm 11 supply-chain age policy remains enabled; only `esbuild` and `sharp` install scripts are allowlisted |
| E00-S02 | PASS | Project-scoped development/test Compose stacks for pgvector, MinIO and Mailpit; reentrant private-bucket bootstrap; typed startup config; public Web and loopback Worker liveness/readiness; safe infrastructure lifecycle scripts | Compose configuration passed; both stacks became healthy with no shared containers; invalid config exited `1` without the secret sentinel; Web/Worker returned `200/200`, then `200/503` while PostgreSQL was stopped, recovered to readiness `200`, and remained running; format, lint, typecheck, 10 unit tests, 1 integration test and build passed | Preserve unrelated host services by moving SerialOS to isolated host ports; use temporary 53000/53001 only for the occupied-port process drill; convert PostgreSQL pool background errors into readiness state and bound probes to 2 seconds |
| E00-S03 | PASS | Exact immutable `0001_baseline` snapshot; `0002_foundation_runtime`; official Drizzle SQL migrator with independent ordered checksum/history validation; canonical head schema and data-model update; Drizzle typed projection; PostgreSQL transaction manager; fail-closed workspace repository and optimistic version conflict; deterministic synthetic seed covering the documented shapes | Fresh test volume applied `0001` and `0002`, seed succeeded, and repeat migrate/seed were no-ops; integration tests proved empty/head canonical drift, `0001 -> 0002` data preservation, pre-mutation checksum rejection, seed counts/repeatability, cross-workspace denial, rollback, optimistic conflict and audit UPDATE/DELETE rejection; 5 integration tests, 12 unit tests, format, lint, typecheck, build and diff check passed; baseline Git blob hashes exactly match | Use Drizzle's official node-postgres migrator while adding a stricter immutable checksum journal; retain application-enforced workspace scoping rather than adding unspecified RLS; full later-Epic tables are inert, with only foundation projections exposed |
| E00-S04 | PASS | PostgreSQL queue enqueue/`SKIP LOCKED` claim/lease/heartbeat/checkpoint/success/retry/dead-letter/cancel/release; deterministic exponential jitter; minimal ID/version payload validation; provider request/result IDs in validated checkpoints; transactional outbox dispatcher; transactional idempotency executor; bounded graceful Worker runtime and configurable lease/drain settings | 8 named queue/outbox integration tests proved exclusive competing claims, stale-owner rejection, expired-lease recovery, checkpoint/provider-ID preservation, one-time side effects, max-attempt dead letter without blockage, queued/running cancellation and late-success rejection, business+outbox atomicity, failed publication durability without value leakage, dedupe, and graceful stop/release; full integration suite 13 tests, unit suite 14 tests, format, lint, typecheck, build, frozen install and diff check passed; temporary databases were verified cleaned | Keep the durable queue entirely in PostgreSQL; use clock/ID ports and deterministic test implementations; raw payload keys are rejected, recoverable mutable state is separate from immutable input, and graceful-drain timers bound shutdown only rather than acting as a queue |
| E00-S05 | PASS | Typed AI, embedding, transcription, web-research, object-storage, mail, clock and ID ports; validated provider metadata; injected model/reasoning/pricing routes; typed AI budgets; immutable prompt/schema registry; deterministic provider/service fakes; private S3-compatible adapter and deny-all offline provider transport | Unit tests covered success plus schema-invalid, 429, timeout, 5xx, cancellation and malformed metadata; offline tests rejected public provider transport without credentials; MinIO integration proved workspace isolation, private roundtrip, deletion and 60-second signed reads; 27 unit, 2 offline and 14 integration tests passed with lint, typecheck, build, format, frozen install, dependency boundaries and diff check | Keep E00 free of a real provider SDK/adapter; route model/reasoning/pricing metadata by injection, parse budgets as integer micro-USD, require all AI output through runtime schemas, and expose only workspace-prefixed object keys with signed reads capped at 900 seconds |
| E00-S06 | PASS | Full OpenAPI 3.1 parse/dereference and pinned generation; nine Draft 2020-12 runtime validators and generated type namespaces; byte-for-byte drift check; E00 operation/Web route manifests; response contract harness; stable Chinese error envelope and field issues; request ID, content-type, session, workspace, idempotency and pagination boundaries | `pnpm contracts:check` validated 81 paths/96 operations, nine examples, generated freshness, exactly two Web route files and 14 positive/negative contract cases; negative cases rejected undeclared operation/status/content type, malformed response, invalid request, missing/cross-user scope and internal stack/SQL/secret/raw-input leakage; specs validation, 27 unit and 14 integration tests, lint, typecheck, build, format, frozen install and diff check passed | Keep the full future OpenAPI canonical without fabricating handlers; register only `getLiveness` and `getReadiness`; use TypeScript-6-compatible Hey API generation and namespace AI-schema types to avoid duplicate names; prune dependency/build directories from specification traversal without relaxing repository validation |
| E00-S07 | PASS | Pino JSON logger behind recursive redaction; OpenTelemetry span adapter; bounded in-process metrics; typed request-to-job-to-provider correlation; append-only audit service/PostgreSQL writer; deterministic local rate limiter; same-origin unsafe-request guard; CSP and baseline security headers; documented log/audit/CSRF/signed-URL field rules | 35 unit tests proved nested Authorization/Cookie/key/token/signed-URL/raw-text/mail/interview/error redaction, deterministic JSON, correlation continuity, metrics labels, same-origin rejection, fixed-window reset and audit summary rejection; 16 integration tests included real audit insert plus database UPDATE/DELETE rejection and Next security/header behavior; 14 contract tests, lint, typecheck, build, format, frozen install, dependency graph and diff check passed | Redact before Pino serialization and omit raw exception messages/stacks; keep OpenTelemetry exporter-optional; expose audit append only; document the in-memory limiter as single-process; allow no unsafe E00 route and require Origin validation when later Epics add one; retain workspace-prefixed signed reads capped at 900 seconds |
| E00-S08 | PASS | Pinned-SHA GitHub Actions workflow with lockfile pnpm cache and isolated PostgreSQL/MinIO services; portable workflow self-check; temporary Schema/type/migration negative-gate proof; clean-machine Simplified Chinese README; production standalone Web/Worker/DB/object-storage smoke; minimal Chinese status page and Playwright/axe/keyboard/390px E2E | Frozen install, specs, format, lint, typecheck, 35 unit tests, 2 offline tests, 16 integration tests, 14 contract tests, 2 E2E tests, build, production smoke, dependency/command/workflow checks, disabled live-provider guard and all three expected negative failures exited `0`; smoke performed real health and write/read/delete roundtrips without provider credentials; tests passed after node_modules/build artifacts and Docker volumes were removed and recreated | Keep one portable CI job over root pnpm commands; pin checkout/setup-node/pnpm actions to full release commit SHAs; use Next standalone output for production smoke; pass declared runtime env through Turbo and honor configurable Web ports; alias Vitest to workspace source so tests do not need stale build output; use bundled Playwright Chromium when installed and system Chrome only as a local fallback; E00 live-provider enabling remains a pre-network hard failure |

### Release verification (2026-07-13)

- `$verify-release` implementation verdict: accepted for independent-acceptance handoff; this turn does not grant product acceptance.
- Full traceability, command evidence, resolved review findings and residual risks: `docs/acceptance/E00-implementation-report.md`.
- Open blocker/major/minor findings: 0/0/0.
- Final implementation state: `READY_FOR_INDEPENDENT_ACCEPTANCE`; E01 remains not started.

## 17. Independent-acceptance remediation addendum (2026-07-14)

### Objective and boundary

Close independent findings B-001, M-001 through M-004 and the repository-actionable portion of U-001 without changing the E00 task state or starting E01. No product route, business handler, real provider adapter or later-Epic UI is added.

### Finding-to-change map

| Finding | Remediation | Required proof |
|---|---|---|
| B-001 log leakage | Normalize key separators/case; cover provider-prefixed credential suffixes and raw `content`/`material`/`transcription`; replace unserializable objects with a fixed marker | Reported sentinels absent from processor/logger output; unknown proxy cannot crash logging |
| M-001 Windows contract drift | Add repository LF attributes for canonical/generated text assets | `core.autocrlf=true` Git archive and clone contain LF generated output; frozen install and contract drift gate pass |
| M-002 hosted CI bootstrap | Hosted runs `29383770894` and `29385424074` disproved both pnpm-action bootstrap paths; superseding section 21 installs pinned Node, installs exact `pnpm@11.12.0` with npm, then restores the pnpm store with a pinned cache action | Local workflow/regression checks passed; exact commit `2d575b56...` passed hosted run `29385757515`, including cleanup and post-actions |
| M-003 false readiness | Add a separate queue probe that validates the zero-row PostgreSQL claim/update path | Migrated database ready; reachable empty database returns queue unavailable/HTTP 503 while liveness remains 200 |
| M-004 Worker/correlation gap | Add forward `0003_job_correlation`; require correlation on new enqueue/outbox writes; compose PostgreSQL outbox/claim loops in the actual Worker; dead-letter unknown types | Real PostgreSQL integration proves outbox dispatch, supported success, unknown-type dead letter, bounded shutdown and persisted/logged request/job/trace IDs |
| U-001 global Corepack permission | Document and verify repository-local Corepack shims; hosted CI uses pinned setup actions and does not modify a global developer Corepack installation | Local shim enables pnpm 11.12.0 and frozen install without administrator access |

### Data, security and rollback

- `0003_job_correlation` is forward-only. It adds request/trace pairs, backfills legacy durable rows with an explicit `migration:<row-id>` trace plus generated migration request ID, and then applies `NOT NULL`, format constraints and a scoped request index. New typed application paths require both values.
- Worker logs contain correlation IDs, state and stable error codes only. Job payloads and exception messages are not logged. Unknown types are non-retryable and cannot become fake success.
- Rollback reverts application composition and readiness code. The additive columns/index may remain inert; removing them requires a separately reviewed forward migration once data exists. Existing 0001/0002 migrations are unchanged.

### Verification sequence

1. Redaction unit tests and contract drift check.
2. Empty/migrated queue readiness integration test.
3. Migration, queue/outbox and production Worker composition integration tests.
4. Windows clean Git materialization with frozen install and contract check.
5. Normal/empty-database Web and Worker runtime probes.
6. Full E00 specs, format, lint, typecheck, unit, offline, integration, contract, E2E, build, migration/seed/re-migrate, mutation and smoke gates.
7. `$verify-release`; keep the task in `verification` and request a new independent acceptance. Hosted CI cannot be declared fixed until the remediation commit is pushed and its current run succeeds.

## 18. Follow-up independent-acceptance remediation (2026-07-14)

### Objective and boundary

Close the two local E00-S08 majors reported after the first remediation: the clean test stack's integration suite must not depend on a previously migrated shared database, and the Windows E2E command must exit after Playwright finishes. This follow-up changes only test orchestration, regression coverage and reproduction documentation; it does not change migrations, product routes, runtime contracts or task status.

### Finding-to-change map

| Finding | Remediation | Required proof |
|---|---|---|
| Follow-up M-001 integration setup order | Make the PostgreSQL queue-readiness integration create an empty database and a separately migrated database for its own comparison | After deleting test volumes, `pnpm infra:test:up && pnpm test:integration` passes without a prior root migration or E2E run |
| Follow-up M-002 Windows E2E exit | Launch Playwright through the pnpm entrypoint that owns the locked toolchain instead of executing its CLI module directly; retain migration preparation in the wrapper | Process-runner unit regression passes and `pnpm test:e2e` returns exit 0 promptly after both Playwright cases pass |

### Verification sequence

1. Process-runner unit regression, lint and typecheck.
2. Delete the isolated test volumes, start a fresh test stack and run integration before any root test-database migration.
3. Run `pnpm test:e2e` through the root command and record its exit code and duration.
4. Recreate a tracked/untracked clean-room copy without `.git`, `.env`, `node_modules` or caches; run frozen install and the complete E00 gate sequence.
5. Run `$verify-release`; keep E00 in `verification` and E01 not started until a new independent acceptance and exact-commit hosted CI succeed.

## 19. Second follow-up independent-acceptance remediation (2026-07-15)

### Objective and boundary

Close E00-ACC-MAJ-001 and the repository-actionable E00-ACC-UNV-002 from the latest independent report. The E2E runner must own one production standalone Web process and deterministically stop it on both success and failure. Production smoke must execute a real PostgreSQL outage and recovery while Web/Worker liveness remains available and readiness fails closed. No E01 route, business behavior, provider integration or migration change is included.

### Finding-to-change map

| Finding | Remediation | Required proof |
|---|---|---|
| E00-ACC-MAJ-001 E2E teardown | Build Web, copy required standalone static assets, start the standalone Node server directly, run Playwright without its `webServer` process tree, and stop the direct child in `finally` | Process and asset unit regressions; root `pnpm test:e2e` returns 0 after both cases; failed assertions also return nonzero without hanging |
| E00-ACC-UNV-002 readiness fault/recovery | Handle errors from checked-out PostgreSQL transaction clients without an unhandled process event; extend production smoke to stop/start only the `serialos-test` PostgreSQL service and assert Web/Worker `200/503/200` behavior | Transaction regression test plus real Docker smoke output for baseline, outage and recovery |

### Rollback and verification

- Rollback restores Playwright-managed dev Web startup and removes the fault-injection phase; no data migration or persistent schema rollback is involved.
- The isolated PostgreSQL container is restarted in `finally` if a fault assertion fails, and normal cleanup still removes the project-scoped containers and volumes.
- Run E2E runner regressions, transaction failure regression, full unit/integration/E2E/build/smoke gates, then repeat from a new clean-room copy before independent acceptance.

## 20. Hosted-CI pnpm bootstrap remediation (2026-07-15)

### Objective and boundary

Repair E00-S08 after hosted run `29383770894` proved that `standalone: true` left
`@pnpm/exe@11.12.0` with its placeholder `pnpm` entrypoint. The push itself
succeeded, but `actions/setup-node` could not query pnpm for cache restoration and
the workflow stopped before dependency installation or any repository test. This
change remains limited to CI bootstrap order, its executable declaration check and
the corresponding README/acceptance evidence. It does not start E01 or change any
runtime, data, API, Worker or UI behavior.

### Decision

- Install the pinned Node version before pnpm so `pnpm/action-setup` can use the
  regular Node-backed `pnpm@11.12.0` package instead of `@pnpm/exe`.
- Move lockfile-based pnpm store caching to `pnpm/action-setup@v6`, whose pinned
  action already owns cache restore/save, and remove pnpm caching from the first
  `actions/setup-node` invocation.
- Keep every action pinned to the existing full release commit SHA. No dependency
  version, action version or ADR changes are required.

### Regression and verification

1. Extend `pnpm ci:verify-workflow` to require `setup-node` before
   `pnpm/action-setup`, reject `standalone: true`, require the pinned pnpm version,
   and require action-owned lockfile caching.
2. Run `pnpm ci:verify-workflow`, `pnpm format:check`, `pnpm lint`,
   `pnpm typecheck`, `pnpm test` and `pnpm build` locally.
3. Inspect `git diff --check` and the final scoped diff.
4. A new exact-commit hosted run remains mandatory after commit and push; local
   declaration checks cannot replace that evidence.

### Rollback

Revert the workflow, verifier and documentation changes together. No database,
object-storage, job, secret or generated artifact rollback is involved. Do not
restore the failed standalone bootstrap as an accepted baseline; if this ordering
also fails in hosted CI, keep E00 in `verification` and choose another reviewed,
pinned bootstrap path.

### Hosted outcome (superseded)

Hosted run `29385424074` for exact commit
`ff20ad857b13a2bb54045ba91f5af7d9ca0e9d5b` failed inside
`pnpm/action-setup@v6.0.8` before dependency installation. Reproducing the
action's self-update sequence locally (`pnpm@11.1.1` then
`pnpm self-update 11.12.0`) produced `Cannot use 'in' operator to search for
'integrity' in undefined` and exit code `1`. The Node-first ordering is valid,
but the action's self-installer is not a usable bootstrap for this repository.

## 21. Hosted-CI pnpm self-update remediation (2026-07-15)

### Objective and boundary

Remove the hosted-only self-update failure while retaining exact tool versions,
full-SHA action pinning and lockfile-keyed caching. This change is limited to the
E00-S08 workflow bootstrap, its executable contract tests and supporting
documentation. It does not change application/runtime behavior, start E01 or
alter the `verification` task state.

### Decision

- After pinned `actions/setup-node`, run
  `npm install --global pnpm@11.12.0`. npm is already supplied by the pinned Node
  runtime and installs the exact package without invoking pnpm's self-update.
- Resolve the store path with the installed pnpm and restore it using
  `actions/cache@v5.0.5`, pinned to full commit
  `27d5ce7f107fe9357f9df03efb73ab90386fccae`.
- Key the cache by runner OS, `.nvmrc`, pnpm `11.12.0` and
  `pnpm-lock.yaml`. Reject any reintroduction of `pnpm/action-setup` in the
  workflow contract.

### Regression and verification

1. The workflow contract must require Node -> exact pnpm install -> store-path
   resolution -> pinned cache ordering.
2. Regression tests must reject `pnpm/action-setup`, reversed Node/pnpm order
   and a cache step that loses the resolved store path.
3. Run format, lint, typecheck, unit, specification, contract and build gates
   locally, then inspect the final diff.
4. Commit and push the candidate, then require the exact-commit hosted run and
   cleanup step to finish successfully. Local evidence alone cannot close M-002.

### Rollback

Revert the workflow, verifier and documentation changes together. There is no
database, object-storage, job or product-state rollback. Do not restore either
failed pnpm-action bootstrap path; keep E00 in `verification` if the direct
installation path also fails in hosted CI.

### Hosted verification outcome

Exact commit `2d575b56b27f22e574783fe0aaa010f4377781b6` was pushed to
`main`. GitHub Actions run `29385757515` (`E00 foundation CI #4`) completed with
conclusion `success`. Pinned Node setup, direct pnpm installation, store caching,
frozen dependency installation, all E00 gates, browser/production smoke,
dependency cleanup and every post-action passed. M-002 is closed; the task remains
in `verification`, E01 remains not started, and a new independent acceptance is
still required before changing task state to `accepted`.
