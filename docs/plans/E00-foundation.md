# E00 工程基座执行计划

- Status: proposed
- Date: 2026-07-12
- Task: `tasks/E00-foundation.md`
- Slices: E00-S01 through E00-S08
- Requirement review verdict: `ready_with_recorded_assumptions`

## 1. Objective

在当前 SerialOS 仓库根目录建立可在干净机器上重复安装、启动、迁移、测试和构建的工程基座。完成后，工程师能够启动 Web、Worker、PostgreSQL/pgvector、MinIO 与 Mailpit，看到真实的存活/就绪状态，并在没有真实 OpenAI Key、没有公网模型调用的默认 CI 中验证数据库、对象存储、队列、合同和安全基线。

本计划只覆盖 E00-S01 至 E00-S08，以及 FR-OPS-001 至 FR-OPS-006 和 NFR-001 至 NFR-007 中由 E00 负责的基础部分。它不开始 E01，也不交付登录、引导、素材、选题、内容生产、审校、互动作品或导出能力。

必须持续保持以下产品不变量：

- 普通日志不得包含创作者原文、转写正文、完整 Prompt、凭证、Cookie、签名 URL 或明文邮箱；
- 所有未来业务访问和后台任务默认按 workspace fail closed；
- 长任务必须持久、幂等、可重试、可取消并可从 checkpoint 恢复；
- AI 输出合同使用 JSON Schema，模型、reasoning、预算和价格元数据只从配置读取；
- 不自动发布、不执行模型生成代码、不引入 Redis、Kafka、Kubernetes 或微服务；
- 默认 CI 只使用 deterministic fakes，不调用 live provider。

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
- Functional and traceability: FR-OPS-001 through FR-OPS-006 and NFR-001 through NFR-007 in `docs/06-functional-spec.md`, plus `docs/20-requirement-traceability.md`;
- Data and API: `docs/09-data-model.md`, `docs/10-api-contracts.md`, `contracts/openapi.yaml`, `contracts/error-codes.md`, `contracts/events.md`, `db/schema.sql`, `db/seed.md`;
- Architecture, security, and testing: `docs/11-system-architecture.md`, `docs/14-security-privacy.md`, `docs/15-test-and-acceptance.md`;
- Existing decisions: `docs/17-decisions-and-assumptions.md`, `docs/19-official-implementation-notes.md`, `docs/adr/README.md`, `docs/adr/0000-template.md`;
- Runtime contracts: all 9 files under `schemas/` and their 9 matching `examples/*.example.json` fixtures;
- Current config surface: `.env.example`;
- Static validation: `python scripts/validate_specs.py` on 2026-07-12, PASS with 0 errors and 0 warnings.

## 4. Current-state findings

### Repository state

- The current root is the correct `SerialOS-Codex-Project-Kit-v1.0` directory, but it is a specification handoff rather than an initialized application repository.
- There is no `.git`, root `package.json`, `pnpm-lock.yaml`, workspace definition, app/package tree, migration directory, Docker Compose file, or CI workflow.
- The specification inventory contains 87 requirements, 96 OpenAPI operations, 57 SQL tables, 24 SQL enums, 9 JSON Schemas and 9 matching examples.
- `db/schema.sql` is statically valid but has not been executed against PostgreSQL; this is an explicit E00 acceptance boundary.

### Requirements review findings

1. **Major — E00 route scope versus full OpenAPI.** `tasks/E00-foundation.md` limits E00 APIs to health/readiness and internal authentication skeleton, while `contracts/openapi.yaml` already declares all MVP operations. Implementing fake handlers would violate scope; requiring all declared operations to exist would make E00 impossible. Resolution: parse and validate the full contract, but maintain an E00 implemented-operation manifest containing only `getLiveness` and `getReadiness`. Runtime contract tests require every registered route/response to be declared and valid; they do not fabricate later-Epic handlers.
2. **Major — durable-job contract is wider than the SQL table.** E00-S04 requires checkpoint data and cancellation safety, and the OpenAPI `Job` includes progress/currentStep, while `db/schema.sql` currently has no `checkpoint`, `progress`, `current_step`, `cancel_requested_at`, or explicit dead-letter timestamp. Resolution: ADR-0003 adds these fields in a forward migration, updates the canonical schema/data documentation, and guards late success writes with lock ownership plus cancellation state.
3. **Major — no Git repository metadata.** Clean-checkout, committed lockfile and CI evidence cannot be demonstrated until this extracted tree is placed under Git. Resolution: implementation step 1 runs `git init` only if `.git` is still absent; it does not configure a remote or push. If the project owner intends to import the tree into an existing remote instead, that import must happen before verification.
4. **Minor — package name mismatch.** The architecture example uses `packages/test-kit`; the active E00 acceptance uses `packages/testkit`. Resolution: use `packages/testkit`, because the architecture tree explicitly permits adjustments and the active task is more specific. Do not create `artifact-engine` before E09.
5. **Minor — E2E command/CI wording.** `AGENTS.md` requires a real `pnpm test:e2e`, while E00 calls the E2E CI job optional and omits the command from its completion snippet. Resolution: implement and run a real E00 Playwright health/status smoke. It may be a separate CI job, but it is part of E00 verification.
6. **Minor — first-version upgrade evidence.** The global test spec asks for upgrade from a prior migration, but the repository has no prior migration. Resolution: create `0001_baseline` from the existing SQL and `0002_foundation_runtime` for the required queue/audit refinements, then prove `0001 -> 0002` in integration tests.

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

## 12. Implementation sequence

Each step must leave the repository buildable and must not introduce later-Epic behavior.

1. **Repository and decision baseline (E00-S01).** If `.git` is absent, initialize Git at this exact root without a remote. Accept/update ADR-0001 through ADR-0004. Add Node/pnpm pinning, root package scripts, workspace/Turbo/TypeScript/ESLint/Prettier configuration, `.gitignore`, package boundaries and dependency-cycle checks. Create `apps/web`, `apps/worker`, and exactly the E00 package set: `domain`, `application`, `db`, `contracts`, `ai`, `storage`, `jobs`, `observability`, `ui`, `config`, `testkit`.
2. **Contract-first compile path (E00-S01/S06).** Add OpenAPI/JSON Schema parsing, Ajv validators, generated types and drift checks. Establish the E00 operation manifest, error envelope, request ID and fail-closed middleware interfaces. Make every required root command invoke a real tool or test.
3. **Local infrastructure and config (E00-S02).** Add project-scoped Docker Compose for pgvector PostgreSQL, MinIO plus idempotent bucket bootstrap, and Mailpit. Add separate dev/test compose projects, typed Web/Worker config, startup failure behavior, safe cleanup command and local run documentation.
4. **Database baseline and repositories (E00-S03).** Snapshot `0001_baseline`, add `0002_foundation_runtime`, update head schema/typed projection, migration checksum journal, transaction manager, workspace-scoped helpers and deterministic seed. Run all migration/seed/scoping tests before proceeding.
5. **Durable jobs and outbox (E00-S04).** Implement enqueue/claim/heartbeat/checkpoint/success/retry/dead-letter/cancel, outbox dispatch, idempotency and bounded graceful shutdown. Add race, crash-recovery and concurrent-worker integration tests.
6. **External ports and fakes (E00-S05).** Implement gateway/storage/mail/clock/ID contracts, common provider metadata, schema-valid fixtures and deterministic failure modes. Add MinIO adapter and roundtrip; do not add a live OpenAI adapter.
7. **API and health/status vertical slice (E00-S02/S06).** Implement Web and internal Worker health probes, sanitized readiness checks, the minimal Chinese status page, error/validation boundaries and operation contract tests. Keep all later OpenAPI operations unregistered.
8. **Observability and security baseline (E00-S07).** Add structured logger/redaction, trace/span and metrics interfaces, correlation propagation, append-only audit sink, headers/CSP/CSRF strategy, local rate limiter and signed-URL boundary. Prove request-to-job correlation and redaction/security behavior.
9. **CI, production smoke and documentation (E00-S08).** Add portable CI scripts and GitHub Actions for specs, format, lint, typecheck, unit, integration, contract/security, build and E2E smoke; pin action revisions. Add production Web/Worker build/image smoke, README bootstrap/cleanup/troubleshooting, and dependency rationale.
10. **Release verification, still within E00.** Run every command in section 13 on a clean dependency/database state, inspect the diff, run review and `verify-release`, record evidence, and only then move E00 to `verification`. Do not mark accepted or start E01 without human acceptance.

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
```

`pnpm specs:validate` must invoke the repository validator rather than duplicate its logic. `pnpm infra:clean` may only remove resources labeled/named for this SerialOS compose project and must document that it deletes local development/test volumes.

## 14. Rollback

- Before E00 is used with real data, stop Web/Worker, revert the E00 code commit, and run only the documented project-scoped compose cleanup if local data deletion is intended.
- Never make cleanup the default behavior of `pnpm dev` or tests.
- Database migrations are forward-only after data exists. Reverting application code requires it to remain compatible with the current schema; otherwise ship a reviewed forward repair migration.
- Queue workers must be drained before deploying an incompatible job contract. Unknown job types fail safely and remain inspectable/dead-lettered rather than being discarded.
- Generated contract files are regenerated from canonical OpenAPI/JSON Schema; never hand-edit them during rollback.
- Feature flags are server-side and auditable, but E00 does not use them to hide incomplete business routes.
- E00 creates no provider-side AI files/resources, so provider cleanup is not part of this rollback.

## 15. Risks and open questions

### Risks with planned mitigation

- **Large initial schema:** all future business tables migrate in E00. Mitigation: treat them as inert, test the exact schema, and expose no later-Epic repositories/routes beyond scoped infrastructure helpers.
- **Schema/type duplication:** SQL, Drizzle types and generated contract types may drift. Mitigation: canonical-source ADRs, generation scripts, live-database introspection checks and CI drift failure.
- **Custom queue correctness:** lease/cancel/outbox races are easy to mishandle. Mitigation: a deliberately small queue surface, conditional SQL updates, deterministic clock/jitter and concurrency/crash tests before any AI job exists.
- **Local cleanup damage:** Docker volume cleanup can delete developer data. Mitigation: fixed project name/labels, explicit command, target validation and warning text.
- **In-memory rate limiter:** not safe for multiple production instances. Mitigation: label it local/test only; E01 must choose and test PostgreSQL-backed enforcement before auth endpoints are considered production-ready.
- **Missing remote CI context:** this ZIP has no Git remote. Mitigation: keep CI logic in portable pnpm scripts; GitHub Actions is a thin proposed adapter and can be replaced by ADR before acceptance.

### Human attention before implementation

1. Accept or revise ADR-0001 through ADR-0004, especially the custom PostgreSQL queue and full-schema migration approach.
2. Confirm whether this extracted directory should be initialized as a new Git repository or imported into an existing remote. No remote/push is part of E00 without separate instruction.

The deployment target, E01 login method and production object-storage provider are not E00 blockers. If not decided before E01, the documented defaults remain Docker self-hosting, email magic link, local MinIO and production S3-compatible storage.

