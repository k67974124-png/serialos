# SerialOS 第二轮：E00 工程基座实施指令

版本：v1.0  
适用阶段：第一轮规划已经通过独立验收后  
执行对象：`tasks/E00-foundation.md` 中 E00-S01 至 E00-S08  
执行模式：实施、测试、自检；不得进入 E01

---

## 1. 你的角色

你是 **SerialOS E00 工程基座的首席实施工程师**。

你的任务是严格按照已经批准的 E00 执行计划，把仓库从“规格包”推进为一个能在干净机器上重复安装、启动、迁移、测试和构建的 TypeScript monorepo。

E00 不交付任何自媒体业务功能。它交付的是后续功能可信运行所依赖的工程地基，包括数据库、对象存储、持久任务、外部服务端口、合同校验、日志、安全基线和 CI。

本轮完成后必须停下，由新的独立 Codex 会话执行 E00 验收。你不能自行宣布最终验收通过。

---

## 2. 开工前置条件

开始修改代码前，必须逐项确认：

1. 存在一份符合 `PLANS.md` 的 E00 执行计划；
2. 第一轮规划验收报告的结论为 `ACCEPTED`；
3. 规划验收报告中 `BLOCKER = 0`、`MAJOR = 0`、`UNVERIFIED = 0`；
4. 当前仓库根目录正确；
5. 当前工作区不存在会被本轮覆盖的无关修改；
6. 已读取并理解本文件第 4 节列出的全部基准文件。

若验收结论为 `REJECTED`，或者仍存在 blocker、major、未验证的关键项，立即停止，不得实施。

若无法唯一定位被批准的 E00 计划，立即停止并在结果中报告 `PRECONDITION_FAILED`。

不得把“上一轮对话说已经通过”当作证据。只接受仓库中的验收报告、计划文件和实际 Git 状态。

---

## 3. 不可突破的边界

### 3.1 本轮允许实现

仅允许实现：

- E00-S01 Monorepo 与命令合同；
- E00-S02 本地基础设施与配置；
- E00-S03 数据库、迁移与工作区作用域基元；
- E00-S04 Durable Job、Outbox 与幂等；
- E00-S05 外部服务端口与确定性测试替身；
- E00-S06 API、错误与合同基座；
- E00-S07 可观测与安全基线；
- E00-S08 CI、最小 Smoke、README 和首批 ADR。

### 3.2 本轮禁止实现

不得实现或伪实现：

- 可用登录、注册、魔法链接或 OAuth；
- 用户、成员、复杂角色与计费；
- 素材收件箱；
- 语音转写业务；
- 创作者画像；
- 观点资产；
- AI 选题会；
- 内容任务、内容编辑器、审校、批准；
- 互动作品业务；
- 导出、发布平台连接器、运营数据；
- 真实 OpenAI 生产调用；
- Redis、Kafka、Kubernetes、微服务；
- 自动部署到某个云厂商；
- 为未来功能提前建立大而空的抽象层。

允许存在认证、工作区、分页、幂等等基础接口或中间件骨架，但不得形成可用业务流程，也不得返回伪造成功状态。

### 3.3 产品与安全不变量

实现过程中始终遵守：

- 不伪造个人经历、引用、统计、来源或发布状态；
- 原始创作者内容、密钥、Cookie、Authorization 和签名 URL 不进入日志；
- 所有 AI 输出都必须经过 Schema 校验，本轮只实现端口和 fake，不调用真实模型；
- 浏览器不得持有或调用任何模型供应商密钥；
- 外部 SDK 只能出现在 adapter 层；
- 长任务只在 Worker 中运行；
- PostgreSQL 是事实源；
- 工作区业务查询必须 fail closed；
- Job 必须持久化、可重试、幂等、可取消、可恢复；
- 不执行模型生成的任意代码或 HTML；
- 默认 CI 不访问公网，不调用真实 OpenAI；
- 不通过 Prompt 代替授权、状态机、Schema 或数据库约束。

---

## 4. 必须阅读的文件

按顺序读取并在最终报告中列出：

1. `AGENTS.md`
2. `README.md`
3. `START_HERE.md`
4. `PLANS.md`
5. `tasks/README.md`
6. `tasks/E00-foundation.md`
7. 被批准的 E00 执行计划
8. 第一轮规划验收报告
9. `docs/00-project-charter.md`
10. `docs/01-prd.md`
11. `docs/03-scope-and-release-plan.md`
12. `docs/09-data-model.md`
13. `docs/10-api-contracts.md`
14. `docs/11-system-architecture.md`
15. `docs/14-security-privacy.md`
16. `docs/15-test-and-acceptance.md`
17. `docs/17-decisions-and-assumptions.md`
18. `docs/18-codex-execution-guide.md`
19. `contracts/openapi.yaml`
20. `contracts/error-codes.md`
21. `contracts/events.md`
22. `db/schema.sql`
23. `db/seed.md`
24. `schemas/*.json`
25. `examples/*.example.json`
26. `.agents/skills/implement-vertical-slice/SKILL.md`
27. `.agents/skills/verify-release/SKILL.md`

若规格冲突，按以下优先级处理：

1. `AGENTS.md` 中的产品不变量；
2. 安全与隐私要求；
3. 带 ID 的功能需求；
4. `tasks/E00-foundation.md` 的验收条件；
5. 被批准的执行计划；
6. 架构文档；
7. UX 细节；
8. 示例。

无法安全消解的冲突必须停止，并报告 blocker。非阻塞歧义采用范围最小、风险最低的实现，并记录 ADR。

---

## 5. 权限与操作规则

- 在仓库根目录执行；
- 使用 workspace-write 权限；
- 审批策略使用 on-request 或更严格配置；
- 网络默认关闭；
- 仅在安装锁定依赖或核对当前官方文档时申请最小网络范围；
- 不访问任意博客作为关键技术决策依据；
- 不调用真实 OpenAI、邮件、S3 或其他生产服务；
- 不读取或输出本机私密凭证；
- 不执行 `git reset --hard`、`git clean -fd`、强制 checkout 或覆盖无关修改；
- 不自动 push、merge、发布、部署或创建远程资源；
- 除非用户明确要求，不创建 Git commit；
- 不修改已经发布的 migration；首次 migration 尚未发布时，也必须通过 ADR 说明生成策略；
- 不删除规格文件来让校验“变绿”。

---

## 6. 建立实施证据基线

先运行并保存结果：

```bash
git rev-parse --show-toplevel
git branch --show-current
git rev-parse HEAD
git status --short
git diff --name-status
git diff --stat
git diff --check
node --version || true
corepack --version || true
pnpm --version || true
docker --version || true
docker compose version || true
python --version || python3 --version || true
```

然后运行规格基线：

```bash
python scripts/validate_specs.py
```

预期必须为：

```text
Errors:   0
Warnings: 0
Verdict:  PASS
```

若规格基线失败，不得通过改弱校验器、删除 Schema 或跳过检查来继续。先判断是否为本轮前已存在的问题，并按 blocker 报告。

将当前基准提交、分支、工作区状态和环境版本写入本轮实施记录。

---

## 7. 执行方法

使用 `$implement-vertical-slice`，按 E00-S01 至 E00-S08 顺序实施。

每个切片都必须遵循以下循环：

1. 明确当前唯一目标和 out of scope；
2. 对照被批准计划列出本切片将修改的文件；
3. 先实现领域约束和接口，再接框架；
4. 同步添加单元、集成、合同或安全测试；
5. 运行本切片最小验证；
6. 检查 `git diff --check`；
7. 搜索 placeholder、skip、silent catch、fake success；
8. 更新执行计划中的进度和实际决策；
9. 当前切片验证失败时，不进入下一切片；
10. 每一步结束时仓库都必须保持可构建或明确处于尚未接线但可测试的状态。

不要先铺满八个空目录，最后才补行为。每个切片都要产生可被测试证明的工程能力。

---

## 8. E00-S01：Monorepo 与命令合同

### 必须交付

建议目录边界至少包括：

```text
apps/
  web/
  worker/
packages/
  domain/
  application/
  db/
  contracts/
  ai/
  storage/
  jobs/
  observability/
  ui/
  config/
  testkit/
```

允许在被批准计划中采用更清晰的等价命名，但共享包不得依赖 Next.js 或浏览器运行时。

必须实现：

- pnpm workspace；
- root `package.json`；
- 锁定 package manager 版本；
- 提交 lockfile；
- TypeScript strict；
- 共享 tsconfig；
- lint 和 formatter；
- 单测、集成测试、E2E 入口；
- package build 顺序；
- 循环依赖检查；
- `AGENTS.md` 规定的全部命令，且每个命令执行真实检查。

不得出现：

```json
"test": "echo passed"
"lint": "exit 0"
"typecheck": "true"
```

### 本切片最小验证

```bash
pnpm install --frozen-lockfile
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

同时验证 package graph 无循环。

---

## 9. E00-S02：本地基础设施与配置

### 必须交付

- Docker Compose；
- PostgreSQL + pgvector；
- MinIO 或等价 S3 兼容开发存储；
- Mailpit 或等价开发邮件捕获；
- dev/test 环境隔离；
- `.env.example`；
- 启动时环境变量 Schema 校验；
- `/health/live`；
- `/health/ready`；
- Web 与 Worker 独立健康语义；
- bucket bootstrap；
- 可重复执行的启动、等待、初始化和清理方式。

### 行为要求

- liveness 只证明进程在运行；
- readiness 必须检查关键依赖；
- PostgreSQL 不可用时 readiness 必须失败；
- 缺失必填配置时启动立即失败；
- 配置错误不能打印 secret；
- bucket bootstrap 重复执行不得失败；
- test 数据与 dev 数据不得共用同一数据库或 bucket。

### 本切片最小验证

按实际脚本运行基础设施启动和清理命令，并证明：

1. 所有容器健康；
2. Web liveness 成功；
3. Worker health 成功；
4. dependencies 正常时 readiness 成功；
5. 停止 PostgreSQL 后 readiness 非成功；
6. 恢复 PostgreSQL 后 readiness 恢复；
7. bucket bootstrap 连续执行两次均成功。

---

## 10. E00-S03：数据库、迁移与工作区作用域基元

### 必须交付

- 明确且版本化的 migration 工具；
- 从 `db/schema.sql` 转换出的首批正式 migration；
- migration checksum 或等价不可变保护；
- 空库迁移；
- seed framework；
- 重复 migrate；
- 前向升级测试框架；
- typed transaction boundary；
- workspace-scoped repository helper；
- UTC、ID、version 字段约定；
- 与 `docs/09-data-model.md` 的偏差记录。

### 工作区 fail-closed 要求

业务 repository 不得允许在缺少 workspace 上下文时读取或修改工作区数据。

禁止形成此类接口：

```ts
findMaterialById(materialId)
```

更接近预期的是：

```ts
findMaterialById({ workspaceId, materialId })
```

当前 E00 可以只实现用于验证该约束的最小测试实体或基础 helper，但不得借机实现素材业务。

### 本切片最小验证

在隔离测试数据库中证明：

- 空库 migrate 成功；
- seed 成功；
- 再次 migrate 成功；
- migration 在自动化测试中执行；
- 缺少 workspace ID 时 repository 拒绝查询；
- A workspace 无法读取 B workspace 测试数据；
- 时间、ID、version 约定有类型或数据库约束；
- migration 失败不会留下被错误标记为完成的版本。

---

## 11. E00-S04：Durable Job、Outbox 与幂等

### 必须交付

- enqueue；
- claim；
- lease 或锁；
- heartbeat；
- success；
- retry；
- exponential backoff + jitter；
- dead-letter；
- cancel；
- checkpoint；
- attempt；
- idempotency key；
- provider request ID 存储位置；
- transactional outbox；
- graceful shutdown；
- deterministic clock 和 ID。

### 必须证明的失败路径

- Worker 在 claim 后崩溃，lease 到期后任务可重领；
- 同一 idempotency key 重复提交不产生重复业务副作用；
- poison job 达到上限后进入 dead letter，不阻塞后续任务；
- 已取消任务不能被晚到结果覆盖成 succeeded；
- 两个 Worker 竞争同一任务时只有一个提交成功；
- outbox 与业务状态在同一事务中提交；
- outbox 发布失败不会丢失事件；
- graceful shutdown 停止领取新任务，并安全处理当前 lease；
- checkpoint 恢复不会重复记账或重复创建结果。

不得用内存数组、单进程 `setTimeout` 或测试专用捷径冒充持久队列。

### 本切片最小验证

运行针对上述每一条行为的数据库集成测试。测试名称和断言必须能体现行为，不接受只断言函数“被调用一次”的表面测试。

---

## 12. E00-S05：外部服务端口与确定性测试替身

### 必须交付

- `AiGateway`；
- `EmbeddingGateway`；
- `TranscriptionGateway`；
- `WebResearchGateway`；
- `ObjectStorage`；
- `Mailer`；
- `Clock`；
- `IdGenerator`；
- adapter、application、domain 的单向依赖；
- prompt/schema registry 和版本命名约定；
- provider request ID、usage、cost metadata 的统一类型；
- deterministic fake/fixture。

### Fake 必须模拟

- success；
- Schema invalid；
- HTTP 429 或等价 rate limit；
- timeout；
- 5xx；
- cancellation；
- malformed metadata；
- 可重复的固定输出。

### 行为要求

- domain/application 不 import OpenAI SDK；
- 客户端 bundle 不包含 provider SDK 或 key；
- model ID、reasoning level、预算与价格元数据来自配置或路由策略；
- 默认 CI 在所有 provider key 均缺失时仍可完成测试和构建；
- live-provider 测试只能在显式 flag 下运行，并且本轮不要求调用真实供应商。

---

## 13. E00-S06：API、错误与合同基座

### 必须交付

- OpenAPI 3.1 自动解析与校验；
- JSON Schema Draft 2020-12 校验；
- request/response validation boundary；
- 统一错误 envelope；
- 稳定 error code；
- request ID；
- session、workspace、idempotency、pagination 的基础中间件或可测试接口；
- contract test harness；
- 不泄露 stack trace；
- 404 与越权行为不可区分资源是否存在。

### 验收行为

- 未在 OpenAPI 中声明的响应导致合同测试失败；
- request validation error 返回稳定 code、field issues、request ID；
- content type 错误被拒绝；
- API handler 不能绕过工作区上下文；
- 服务器内部异常不会把 stack、SQL、secret 或原始输入返回客户端；
- 现阶段只暴露允许的 health/readiness 和必要内部 skeleton，不建立临时业务 API。

不得修改 `contracts/openapi.yaml` 来迎合一个超出 E00 的临时 handler。

---

## 14. E00-S07：可观测与安全基线

### 必须交付

- JSON structured logs；
- trace/span abstraction；
- metrics registry；
- request、job、provider call correlation；
- redaction processor；
- append-only audit event API；
- CSP 与基础安全 headers；
- CSRF 策略或明确的基础边界；
- rate limiter 接口与本地实现；
- private file signed URL 接口；
- 日志和审计的字段规范。

### Redaction 必须覆盖

- Authorization；
- Cookie；
- API key；
- access token；
- signed URL；
- 原始素材文本；
- 邮件正文或未来的采访回答；
- 常见嵌套对象、数组和异常对象。

### 验收行为

- 日志 fixture 证明敏感字段被删除或不可逆遮蔽；
- request ID 能关联到 job；
- job 能关联到 provider call；
- audit event 不允许通过普通 repository update/delete；
- security headers 有集成测试；
- rate limiter 行为可由 deterministic clock 测试；
- signed URL 短期、限定 key，且日志不记录完整 URL。

---

## 15. E00-S08：CI、最小 Smoke、README 与 ADR

### 必须交付

CI 至少包含：

- specs validation；
- format check；
- lint；
- typecheck；
- unit test；
- integration test；
- build；
- 可选或最小 E2E；
- 依赖缓存；
- 数据库和对象存储测试服务；
- 默认无真实 OpenAI Key；
- 失败日志不包含 secret。

最小 smoke 必须覆盖：

- Web health；
- Worker health；
- PostgreSQL roundtrip；
- Object storage put/get/delete roundtrip；
- production build 或容器启动 smoke。

README 必须让不熟悉项目的工程师完成：

1. 安装依赖；
2. 复制环境配置；
3. 启动本地依赖；
4. 迁移；
5. seed；
6. 启动 Web 和 Worker；
7. 运行测试；
8. 停止并清理；
9. 理解 live-provider 测试为何默认关闭。

至少创建一个正式 ADR，记录首项关键技术选择和替代方案。被批准计划中要求的其他 ADR 也必须完成。

### Mutation 证明

在临时副本或 CI 测试分支中证明：

- 故意破坏 JSON Schema 后，spec job 失败；
- 故意制造 TypeScript 类型错误后，typecheck 失败；
- 故意破坏 migration 后，migration/integration job 失败。

不得在最终工作树保留这些故意破坏。

---

## 16. 依赖与 ADR 规则

新增 production dependency 前，必须检查：

- 被批准计划是否已决定；
- 是否有标准库或现有依赖可替代；
- 维护状态、许可证、安全与 ESM/CJS 兼容性；
- 是否会把框架依赖渗入 domain/application；
- 是否会引入 Redis、常驻外部服务或云锁定；
- 是否有 deterministic test strategy。

以下选择必须写 ADR，除非已存在且仍适用：

- monorepo/build 工具；
- migration 和数据库访问方案；
- PostgreSQL durable queue/outbox 方案；
- OpenAPI/JSON Schema 校验方式；
- observability 抽象；
- 对象存储 adapter；
- 任何偏离 `db/schema.sql`、pgvector 或 PostgreSQL queue 的决定。

ADR 必须包含：Context、Decision、Alternatives、Consequences、Rollback 或替换路径。

---

## 17. 全量验证

完成所有切片后，先清理当前进程和测试数据，再运行：

```bash
pnpm specs:validate
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm test:integration
pnpm test:e2e
pnpm build
pnpm db:migrate
pnpm db:seed
```

再运行被批准计划和 README 中定义的：

- 基础设施启动；
- health/readiness smoke；
- Worker health；
- DB roundtrip；
- object storage roundtrip；
- production build 或容器 smoke；
- 清理命令。

所有命令必须记录：

- 命令全文；
- 退出码；
- 关键摘要；
- 运行环境；
- 是否使用网络；
- 是否使用真实 provider；
- 失败后采取了什么修复。

不得只写“测试均通过”。

若 Docker、pnpm、数据库或其他必要环境不可用，将对应项目标记为 `NOT_RUN`，说明原因，并且不得把 E00 标为完成。

---

## 18. 实施后自检

完成实现后执行：

1. `$verify-release`；
2. `/review`，选择审查 uncommitted changes 或当前 E00 commit；
3. 再次运行 `git diff --check`；
4. 检查任务状态、计划进度、README、ADR、OpenAPI、Schema、migration 和测试是否一致。

Review 优先检查：

1. cross-workspace data exposure；
2. fake success；
3. queue locking、idempotency、cancel、late result；
4. outbox 原子性；
5. migration 风险；
6. provider SDK 泄漏到业务层或浏览器；
7. raw content、credential、signed URL 进入日志；
8. readiness 永远成功；
9. 默认 CI 访问公网或 live provider；
10. 空测试、skip、silent catch、TODO 业务逻辑；
11. E01 或后续范围膨胀。

自检发现 blocker 或 major 时，允许在本轮修复，但修复后必须重跑受影响测试和全量验证。不得通过降低断言、跳过测试或修改需求来消除问题。

---

## 19. 完成状态规则

只有同时满足以下条件，才可以把 E00 实施状态标记为 `ready_for_independent_acceptance`：

- E00-S01 至 E00-S08 全部有实现和测试证据；
- 第 17 节全部必跑命令实际成功；
- 干净环境安装和构建成功；
- migration、seed、重复 migration 成功；
- health/readiness 语义正确；
- queue 崩溃恢复、幂等、取消、并发和 dead-letter 测试通过；
- workspace helper fail closed；
- 默认 CI 不依赖 live OpenAI 或公网；
- 无 placeholder、fake success、silent catch、关键 skip；
- `/review` 无 blocker 或 critical finding；
- 所有架构偏离均有 ADR；
- README 可复现；
- 未开始 E01。

本轮不得把状态直接改为 `accepted`。最终 `accepted` 只能由独立验收轮给出。

---

## 20. 停止条件

遇到以下任一情况立即停止，并输出 blocker 报告：

- 第一轮规划未被接受；
- 当前工作区无关修改会被覆盖；
- 规格存在无法安全消解的冲突；
- 必须获取真实生产凭证才能继续；
- 必须引入 E00 明确禁止的基础设施；
- migration 方案可能造成不可控数据破坏；
- 无法建立 workspace fail-closed；
- durable job 无法实现持久恢复或幂等；
- 必须降低安全校验或删除测试才能通过；
- 发现 E01 已混入当前差异且不能安全隔离。

停止时不要尝试“先做个能跑的版本”。报告已完成部分、未完成部分、证据和建议决策。

---

## 21. 最终交付报告格式

严格按以下格式输出：

```text
# SerialOS E00 Implementation Report

## 1. Status
- Result: READY_FOR_INDEPENDENT_ACCEPTANCE | BLOCKED | INCOMPLETE
- Base commit:
- Branch:
- Active plan:
- Planning acceptance report:
- E01 started: NO

## 2. Scope delivered
| Slice | Status | Main implementation evidence | Main test evidence |
|---|---|---|---|
| E00-S01 | PASS/FAIL/NOT_RUN | ... | ... |
...
| E00-S08 | PASS/FAIL/NOT_RUN | ... | ... |

## 3. Files changed
- Added:
- Modified:
- Deleted:

## 4. Architecture decisions
| ADR | Decision | Reason | Alternatives |
|---|---|---|---|

## 5. Data and migration
- Migration tool:
- Migration files:
- Empty DB result:
- Seed result:
- Re-run result:
- Rollback/roll-forward strategy:

## 6. Durable jobs and outbox
- Claim/lease:
- Heartbeat:
- Retry/backoff:
- Dead-letter:
- Cancellation:
- Idempotency:
- Checkpoint:
- Outbox atomicity:
- Concurrency evidence:
- Crash recovery evidence:

## 7. Security and observability
- Workspace fail-closed evidence:
- Redaction evidence:
- Headers evidence:
- Correlation evidence:
- Audit append-only evidence:
- Provider/browser isolation evidence:

## 8. Commands actually run
| Command | Exit code | Result summary | Network/live provider used |
|---|---:|---|---|

## 9. Review findings
| Severity | File:line | Finding | Resolution |
|---|---|---|---|

## 10. Not run or unverified
- None | details

## 11. Residual risks
- ...

## 12. Scope check
- E01 or later functionality added: NO
- Placeholder success states: NO
- Live provider dependency in default CI: NO
- Unrecorded architecture deviation: NO

## 13. Handoff
- Recommended next action: RUN_INDEPENDENT_E00_ACCEPTANCE
- Do not start E01.
```

若存在任一 `NOT_RUN` 关键验证、blocker 或 major，`Result` 不得为 `READY_FOR_INDEPENDENT_ACCEPTANCE`。

报告输出后立即停止，不开始 E01，不自动修复新的非 blocker 优化项。

---

## 22. 交给 Codex 的启动消息

将本文件放到仓库，例如：

```text
prompts/00-e00-implementation-runbook.md
```

然后在新的 Codex 实施会话中发送：

```text
你现在是 SerialOS E00 工程基座的首席实施工程师。

严格读取并执行：
prompts/00-e00-implementation-runbook.md

使用仓库内的 $implement-vertical-slice。
只实施 E00-S01 至 E00-S08，不开始 E01。

开工前必须验证：
- 第一轮规划报告已 ACCEPTED；
- BLOCKER、MAJOR、UNVERIFIED 均为 0；
- 已定位被批准的 E00 执行计划。

实施中一次完成一个切片，测试与行为同改。
完成后运行全部强制命令，使用 $verify-release 和 /review 自检。
不得把自检等同于最终验收。

严格按文档第 21 节输出实施报告，然后停止，等待独立验收。
```
