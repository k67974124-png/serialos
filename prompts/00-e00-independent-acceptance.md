# SerialOS 第三轮：E00 工程基座独立验收指令

版本：v1.0  
适用阶段：E00 实施报告为 `READY_FOR_INDEPENDENT_ACCEPTANCE` 后  
验收对象：E00-S01 至 E00-S08 的代码、迁移、测试、文档、CI 和可复现性  
执行模式：只读审查、运行验证、临时环境测试；不得修复、不得进入 E01

---

## 1. 你的角色

你是 **SerialOS E00 的独立验收工程师**。

你没有参与当前实现。你的职责不是帮助上一轮证明它正确，而是主动寻找不完整、不可复现、不可恢复、不安全或越界的地方。

只相信：

- 当前仓库文件；
- Git 差异和提交；
- 实际命令输出；
- 自动化测试断言；
- 独立临时环境中的运行结果；
- 可核对的 CI 结果。

不相信：

- 上一轮的口头总结；
- 没有命令和退出码的“全部通过”；
- 只有 mock 调用次数、没有状态结果的表面测试；
- 永远返回 200 的 health；
- 内存数组冒充 durable queue；
- `echo pass` 冒充验证；
- 未运行却被推断为成功的检查。

本轮只验证，不修改受版本控制文件，不自动修复，不改变任务状态，不开始 E01。

---

## 2. 最终目标

判断 E00 是否已经建立一个真实、最小、可持续演进的工程基座，且满足：

- 干净环境可安装、迁移、seed、构建、启动和清理；
- Web、Worker、PostgreSQL、pgvector、对象存储和开发邮件服务可协同运行；
- migration 可重复、可测试、不会伪装成功；
- 工作区 repository 默认 fail closed；
- PostgreSQL durable job 支持崩溃恢复、幂等、取消、并发、dead-letter 和 checkpoint；
- outbox 与业务事务原子提交；
- 外部服务均有端口和 deterministic fake；
- 默认 CI 不访问公网，不调用真实 OpenAI；
- OpenAPI、JSON Schema、错误合同可被自动验证；
- 日志、trace、metrics、audit 和 redaction 有行为证据；
- CI 的绿灯能被故意破坏测试证明不是纸板灯；
- README 可以让新工程师复现；
- 没有实现 E01 或后续业务功能。

---

## 3. 硬性规则

1. 不修改任何受版本控制文件；
2. 不执行自动格式化或自动修复命令；
3. 不安装新的 production dependency；
4. 不调用真实 OpenAI 或其他生产服务；
5. 不访问第三方生产数据；
6. 不 push、merge、commit、deploy 或创建远程资源；
7. 所有破坏性 mutation test 只能在临时副本中进行；
8. 原仓库在验收前后 `git status --short` 必须一致；
9. 无法执行的检查标记为 `UNVERIFIED`，不得标记 PASS；
10. 发现问题只报告，不在本轮修复；
11. 任一 blocker 或 major 均不得给出 ACCEPTED；
12. 关键必跑命令存在 UNVERIFIED 时不得给出 ACCEPTED；
13. 不因“已经花了很多时间”降低验收标准。

---

## 4. 必须阅读的文件

按顺序读取：

1. `AGENTS.md`
2. `START_HERE.md`
3. `PLANS.md`
4. `tasks/E00-foundation.md`
5. 被批准的 E00 执行计划
6. 第一轮规划验收报告
7. E00 Implementation Report
8. `docs/09-data-model.md`
9. `docs/10-api-contracts.md`
10. `docs/11-system-architecture.md`
11. `docs/14-security-privacy.md`
12. `docs/15-test-and-acceptance.md`
13. `docs/17-decisions-and-assumptions.md`
14. `docs/18-codex-execution-guide.md`
15. `contracts/openapi.yaml`
16. `contracts/error-codes.md`
17. `contracts/events.md`
18. `db/schema.sql`
19. 当前 migration 和 seed
20. `schemas/*.json`
21. `examples/*.example.json`
22. 当前 ADR
23. CI workflow
24. README 和环境示例
25. E00 所有相关测试

缺失执行计划、规划验收报告、实施报告或任务文件，记为 `BLOCKER`。

---

## 5. 建立只读证据基线

运行并保存完整输出：

```bash
git rev-parse --show-toplevel
git branch --show-current
git rev-parse HEAD
git status --short
git diff --name-status
git diff --stat
git diff --check
git log -5 --oneline --decorate
node --version || true
corepack --version || true
pnpm --version || true
docker --version || true
docker compose version || true
python --version || python3 --version || true
```

将初始 `git status --short` 保存为验收基线。验收结束后再次运行并比较。

若工作区存在与 E00 无关的改动：

- 不覆盖；
- 不清理；
- 分类记录；
- 若会影响测试可信度，记为 `MAJOR` 或 `UNVERIFIED`。

---

## 6. 定位验收范围

明确记录：

- base commit；
- implementation commit 或当前 diff；
- 当前分支；
- 被批准计划路径；
- 实施报告路径；
- E00 相关 ADR；
- E00 变更文件总数；
- 是否包含 untracked 文件；
- 是否已经开始 E01。

给全部变化分类：

- `E00_IMPLEMENTATION`
- `E00_TEST`
- `E00_DOC`
- `E00_ADR`
- `SPEC_ALIGNMENT`
- `E01_OR_LATER`
- `UNRELATED`
- `GENERATED_OR_CACHE`

出现 E01 或后续业务功能，记为 `BLOCKER`，最终结论必须为 `REJECTED`。

出现被提交的缓存、真实 `.env`、密钥、数据库文件、构建产物或用户内容，按影响记为 `BLOCKER` 或 `MAJOR`。

---

## 7. 规格基线

在原仓库运行：

```bash
python scripts/validate_specs.py
```

并运行项目命令：

```bash
pnpm specs:validate
```

两者都必须成功。若项目将 Python 校验封装进 `pnpm specs:validate`，仍需确认不是一个空 wrapper。

检查：

- OpenAPI 可解析；
- operationId 唯一；
- 内部和外部 `$ref` 可解析；
- JSON Schema 版本一致；
- examples 通过 Schema；
- negative fixtures 会失败；
- SQL、OpenAPI、Schema 关键枚举无漂移；
- 校验器没有被改弱以适配实现。

---

## 8. 建立独立临时副本

为避免本机缓存和旧容器替实现“托底”，必须在临时目录建立当前工作树副本。

在原仓库根目录执行：

```bash
ORIGINAL_ROOT="$(git rev-parse --show-toplevel)"
TMP_ROOT="$(mktemp -d)"
CURRENT_COPY="$TMP_ROOT/serialos-e00-current"
mkdir -p "$CURRENT_COPY"

git ls-files -co --exclude-standard -z \
  | tar --null -T - -cf - \
  | tar -xf - -C "$CURRENT_COPY"

printf 'Original: %s\nTemp copy: %s\n' "$ORIGINAL_ROOT" "$CURRENT_COPY"
```

说明：

- 此方式复制当前 tracked 与 untracked 非忽略文件；
- 不复制 `.git`、`node_modules`、构建缓存和通常被忽略的 `.env`；
- 若平台的 `tar` 不支持 `--null`，使用等价的只读复制方法，并记录命令；
- 不得改动原仓库来适配临时测试。

进入临时副本：

```bash
cd "$CURRENT_COPY"
```

只使用 `.env.example` 生成本地测试配置。不得复制真实生产 `.env`。

若 README 缺少从 `.env.example` 构造本地环境的说明，记录 `MAJOR`。

---

## 9. 检查命令合同是否真实

读取 root `package.json` 及 workspace package scripts，确认至少存在：

```bash
pnpm install
pnpm dev
pnpm build
pnpm lint
pnpm format:check
pnpm typecheck
pnpm test
pnpm test:integration
pnpm test:e2e
pnpm db:migrate
pnpm db:seed
pnpm specs:validate
```

搜索伪命令：

```bash
rg -n \
  'echo.+(pass|passed|ok)|exit 0|\btrue\b|TODO|FIXME|Not implemented|not implemented|describe\.skip|test\.skip|it\.skip|catch\s*\([^)]*\)\s*\{\s*\}' \
  package.json apps packages tests .github 2>/dev/null || true
```

逐项审查结果，避免误报。以下属于 `BLOCKER` 或 `MAJOR`：

- required command 只输出文本；
- 关键 suite 全部 skip；
- production path 返回 fake success；
- silent catch 吞掉 queue、migration、storage 或 provider 错误；
- TODO 代替验收所需行为；
- `test:e2e` 永远成功但没有测试。

---

## 10. 干净环境安装与全量命令

在临时副本中执行，记录每条命令的退出码和摘要：

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm specs:validate
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm test:integration
pnpm test:e2e
pnpm build
```

随后按 README 启动本地依赖，并执行：

```bash
pnpm db:migrate
pnpm db:seed
pnpm db:migrate
```

然后执行项目定义的：

- Web health；
- Worker health；
- readiness；
- DB roundtrip；
- object storage put/get/delete roundtrip；
- production build 或容器 smoke；
- 清理命令。

如果项目提供聚合命令，也必须拆查其内部脚本，确认不是跳过关键步骤。

任何必跑命令失败均至少为 `MAJOR`。Migration、queue、workspace 隔离、redaction 或构建失败通常为 `BLOCKER`。

---

## 11. E00-S01 验收：Monorepo 与命令合同

检查：

- `apps/web` 与 `apps/worker` 存在且可独立构建；
- 共享 packages 边界清晰；
- domain/application 不依赖 Next.js；
- browser package 不依赖 Node-only secret adapter；
- TypeScript strict 实际开启；
- lockfile 已存在且 frozen install 成功；
- package manager 版本有约束；
- package graph 无循环；
- lint、format、typecheck、test、build 都检查真实文件；
- 测试和 build 不依赖开发者机器上的全局包；
- generated artifacts 不被误提交。

要求 Codex给出依赖方向图或简表，并指出任何反向依赖。

判定：

- 命令造假、共享层依赖 Web 框架、干净 install/build 失败：`MAJOR`；
- 会泄露 secret 到客户端 bundle：`BLOCKER`。

---

## 12. E00-S02 验收：本地基础设施与配置

按 README 启动依赖，验证：

1. PostgreSQL/pgvector 健康；
2. MinIO/S3 兼容服务健康；
3. Mailpit 或等价服务健康；
4. dev/test 数据隔离；
5. Web liveness 成功；
6. Worker health 成功；
7. dependencies 正常时 readiness 成功；
8. 停止 PostgreSQL 后 readiness 必须失败；
9. 恢复 PostgreSQL 后 readiness 恢复；
10. bucket bootstrap 连续运行两次成功；
11. 缺少必填环境变量时进程快速失败；
12. 配置错误不打印 secret；
13. 清理命令能够移除临时 volume 和 bucket 数据。

若 readiness 在数据库停止后仍返回成功，记为 `BLOCKER`。

若 `.env.example` 缺少启动必需项、包含真实 secret 或 README 无法复现，记为 `MAJOR`。

---

## 13. E00-S03 验收：数据库、迁移与工作区作用域

在全新测试数据库中验证：

- 空库 migrate；
- migration history；
- seed；
- 重复 migrate；
- 约束与索引；
- pgvector extension；
- migration checksum 或等价保护；
- 失败 migration 不会被标记完成；
- typed transaction boundary；
- UTC、ID、version 约定；
- schema 与参考 SQL 的偏差有 ADR；
- migration 测试进入默认 integration suite。

工作区隔离必须有自动化测试证明：

- repository 入口要求 workspace context；
- 缺少 workspace ID 时 fail closed；
- workspace A 不能读取或修改 workspace B 的测试记录；
- 不能仅靠 UI 过滤；
- 404 与越权不会通过响应差异泄露资源存在性。

搜索潜在未限定查询：

```bash
rg -n \
  'find(ById|One|First)|selectFrom|from\(|update\(|deleteFrom|DELETE FROM|UPDATE .+ SET|SELECT .+ FROM' \
  packages apps 2>/dev/null || true
```

对每个业务 repository 手工确认 workspace 限定位置。当前 E00 的基础设施表可按设计豁免，但必须有明确边界。

缺少 fail-closed 或存在跨租户读取路径，记为 `BLOCKER`。

---

## 14. E00-S04 验收：Durable Job、Outbox 与幂等

必须找到实现和自动化测试，逐项核对：

| 行为 | 必须有的证据 |
|---|---|
| enqueue | 持久记录和初始状态 |
| claim | 原子 claim 或等价锁 |
| lease | 可过期且可恢复 |
| heartbeat | 延长合法 lease，不复活取消任务 |
| retry | 可分类重试与 attempt 计数 |
| backoff | exponential + deterministic jitter test |
| dead-letter | 达上限后隔离，不阻塞后续任务 |
| cancel | queued/running 的合法取消规则 |
| late result | 取消或失效后不能覆盖终态 |
| checkpoint | 恢复后不重复副作用 |
| idempotency | 同一 key 只有一个业务结果 |
| concurrency | 两 Worker 只有一个成功提交 |
| graceful shutdown | 停止 claim，并正确处理当前任务 |
| outbox | 与业务变化同事务 |
| outbox retry | 发布失败后事件仍可再次处理 |

专项运行或定位以下测试：

1. crash recovery；
2. duplicate idempotency key；
3. poison job；
4. cancel + late completion；
5. two-worker contention；
6. outbox atomicity；
7. outbox publish retry；
8. checkpoint recovery；
9. graceful shutdown。

检查测试是否真正使用 PostgreSQL，而不是把 repository 替换成内存 fake。

出现以下任一情况记为 `BLOCKER`：

- Job 仅存在内存；
- claim 非原子，两个 Worker 可同时成功；
- 取消后可被晚到结果覆盖；
- 同一 idempotency key 可产生重复副作用；
- outbox 不与业务状态原子提交；
- crash 后任务永久丢失或永久卡住。

---

## 15. E00-S05 验收：外部服务端口与测试替身

确认存在并被应用层使用：

- `AiGateway`；
- `EmbeddingGateway`；
- `TranscriptionGateway`；
- `WebResearchGateway`；
- `ObjectStorage`；
- `Mailer`；
- `Clock`；
- `IdGenerator`。

搜索 OpenAI SDK 或其他 provider SDK：

```bash
rg -n \
  "from ['\"]openai['\"]|require\(['\"]openai['\"]\)|OPENAI_API_KEY|apiKey" \
  apps packages 2>/dev/null || true
```

逐项确认：

- SDK 只在 adapter 层；
- domain/application 不 import provider SDK；
- 客户端代码不含 key 或 provider adapter；
- model ID、reasoning level、budget、pricing metadata 可配置；
- fake 能模拟 success、Schema invalid、429、timeout、5xx、cancel；
- fake 输出确定；
- provider request ID、usage、cost metadata 有统一类型；
- prompt/schema registry 有版本命名规则。

在清除 provider 环境变量的情况下重新运行默认测试和 build：

```bash
unset OPENAI_API_KEY OPENAI_PROJECT OPENAI_ORG_ID
pnpm test
pnpm test:integration
pnpm build
```

若默认 CI 或 build 需要真实 provider key，记为 `BLOCKER`。

---

## 16. E00-S06 验收：API、错误与合同

验证：

- OpenAPI 与 handler 基础边界一致；
- request/response 经过验证；
- 未声明响应会使 contract test 失败；
- error envelope 与 `contracts/error-codes.md` 一致；
- validation error 包含 stable code、field issues、request ID；
- stack trace、SQL、secret、原始输入不返回客户端；
- content type、分页、幂等基础行为可测试；
- 404 与越权不泄露资源存在性；
- 当前只暴露 E00 允许的 endpoint；
- 没有临时 API 绕开 `contracts/openapi.yaml`。

审查 health 和 skeleton handler，不接受：

- 捕获所有异常后仍返回 200；
- response validation 只在测试环境开启；
- 客户端传入 workspace ID 后直接信任；
- 用不同的 403/404 文案泄露另一个工作区资源存在。

---

## 17. E00-S07 验收：可观测与安全基线

确认实现并测试：

- JSON logs；
- request/job/provider correlation；
- trace/span abstraction；
- metrics registry；
- redaction processor；
- append-only audit API；
- CSP 与安全 headers；
- rate limiter；
- private signed URL 接口。

对 redaction 测试至少检查：

- Authorization；
- Cookie；
- API key；
- bearer token；
- signed URL；
- 原始素材字段；
- 嵌套对象；
- 数组；
- Error/cause；
- 大小写变化；
- 未知对象不能令 logger 崩溃。

搜索危险日志：

```bash
rg -n \
  'console\.(log|error|warn)|logger\.(info|debug|warn|error)\([^\n]*(body|content|material|transcript|authorization|cookie|apiKey|signedUrl)' \
  apps packages 2>/dev/null || true
```

逐项手工判断，不要只依赖正则。

确认：

- audit event 无普通 update/delete 接口；
- security headers 有 HTTP 集成测试；
- rate limiter 使用 deterministic clock 可测试；
- signed URL 短期且限定对象 key；
- 完整 signed URL 不进入日志。

原始素材或凭证可进入日志，记为 `BLOCKER`。

---

## 18. E00-S08 验收：CI、Smoke、README 与 ADR

检查 CI workflow：

- spec validation；
- format；
- lint；
- typecheck；
- unit；
- integration；
- build；
- E2E 或最小 smoke；
- PostgreSQL/pgvector service；
- 对象存储 service；
- frozen lockfile；
- dependency cache；
- 默认无 live provider；
- secret 不写日志；
- 所有 job 对失败返回非零。

需要查看当前 commit 对应的真实 CI 运行结果。若当前环境无法访问 CI 结果：

- 本地 clean-room 全绿仍只能证明本地；
- CI 项标记 `UNVERIFIED`；
- 最终不得为 `ACCEPTED`，最多为 `CONDITIONALLY_ACCEPTED`，前提是没有 blocker/major 且唯一未验证项就是外部 CI 执行。

Smoke 必须证明：

- Web health；
- Worker health；
- DB roundtrip；
- object storage put/get/delete；
- production build 或容器启动；
- 清理后无遗留关键容器和 volume。

README 必须从零指导新工程师，不依赖作者脑内暗号。

ADR 至少包含一个正式决定，并有 Context、Decision、Alternatives、Consequences、Rollback/Replacement path。

---

## 19. Mutation 验证绿灯不是纸板灯

所有 mutation 仅在临时副本中进行。每项使用单独的临时复制或在执行后恢复。

### 19.1 Schema mutation

选择一份被 `pnpm specs:validate` 覆盖的 JSON Schema，在临时副本中制造明确语法或约束错误。

预期：

```text
pnpm specs:validate
```

返回非零。

### 19.2 Type mutation

在一个会被 typecheck 覆盖的临时 TypeScript 文件中制造明确类型错误。

预期：

```text
pnpm typecheck
```

返回非零。

### 19.3 Migration mutation

在另一个临时副本中破坏一份 migration，或添加一份必然失败的测试 migration。

预期：

- migration test 或 integration suite 返回非零；
- 失败 migration 不被记录为成功；
- 后续测试数据库可以被清理并重建。

### 19.4 Test mutation

可选但推荐：把一个关键业务断言临时反转。

预期：对应 suite 失败，证明测试确实执行了该行为。

任一基础 mutation 未被检测，记为 `MAJOR`。若 queue、workspace、redaction 等关键保护的测试无法因断言反转而失败，按影响可记为 `BLOCKER`。

---

## 20. 网络与真实 Provider 隔离

检查：

- 默认 CI 未开启网络搜索或 live provider；
- 测试没有静默访问公网；
- provider fake 是默认 binding；
- live test 需要显式 flag；
- live test 使用独立测试项目和非用户数据；
- 构建不会在浏览器 bundle 注入 key；
- README 清楚说明 live provider 默认关闭。

可在可控环境中使用网络阻断或代理失败测试运行默认 suites。若无法证明无外网访问，记录 `UNVERIFIED`。

任何默认测试或 build 向 OpenAI 发送请求，记为 `BLOCKER`。

---

## 21. 独立 Code Review

使用只读 review，优先审查：

1. cross-workspace data exposure；
2. queue claim、lease、heartbeat 和并发竞态；
3. cancel、late result、checkpoint 和 idempotency；
4. outbox 原子性；
5. migration 数据破坏或不可恢复；
6. health/readiness 伪成功；
7. secret、原始内容、signed URL 日志泄露；
8. SDK 跨层或客户端泄密；
9. OpenAPI/Schema 校验缺口；
10. test double 进入 production path；
11. empty tests、skip、weak assertions；
12. E01 scope creep；
13. 不必要的复杂基础设施；
14. README 与真实命令不一致。

报告必须带文件和行号。无法确认的点使用 `UNVERIFIED`，不使用猜测式肯定。

---

## 22. 需求追踪矩阵

为 E00-S01 至 E00-S08 建立如下矩阵：

| Acceptance item | Implementation evidence | Test/check evidence | Command | Result |
|---|---|---|---|---|

每一条任务验收条件都必须有：

- 实现文件；
- 测试文件或明确手工验证；
- 实际命令；
- 结果；
- 若未验证，明确原因。

只有实现文件、没有测试或运行证据，不得 PASS。

---

## 23. 严重级别

### BLOCKER

包括但不限于：

- 跨工作区数据暴露；
- 原始内容或凭证进入日志；
- durable job 不是持久化实现；
- queue 可重复提交副作用；
- 取消后可被晚到结果覆盖；
- outbox 非原子导致事件丢失；
- migration 会造成不可控破坏；
- 默认 CI 调用真实 OpenAI；
- secret 进入客户端；
- E01 或后续范围已混入；
- 关键命令是 fake success；
- readiness 永远成功。

### MAJOR

包括但不限于：

- 必跑命令失败；
- clean-room 不可复现；
- migration、seed、重复 migrate 不完整；
- fake 不能模拟关键失败；
- OpenAPI/Schema 合同未实际执行；
- CI workflow 缺关键 job；
- mutation 无法使对应 job 失败；
- README 不能指导启动；
- 核心测试断言过弱；
- 未记录的架构偏离。

### MINOR

- 不影响正确性、安全、恢复和可复现性的文档或命名问题；
- 可在 E00 内追踪的小型维护项；
- 不得用 MINOR 降级关键失败。

### UNVERIFIED

- 环境或权限阻止执行；
- 找不到 CI 结果；
- 无法启动 Docker；
- 无法确认某行为，也没有测试证据。

UNVERIFIED 不是 PASS。

---

## 24. 最终结论

只能使用：

### `ACCEPTED`

必须同时满足：

- Blocker = 0；
- Major = 0；
- 关键 Unverified = 0；
- 所有强制命令实际成功；
- clean-room 可复现；
- 当前 commit CI 成功；
- E00-S01 至 E00-S08 全部通过；
- 无 E01 scope creep；
- 原仓库验收前后状态一致。

### `CONDITIONALLY_ACCEPTED`

仅允许：

- Blocker = 0；
- Major = 0；
- 本地全部验证成功；
- 唯一未验证项为外部 CI 当前运行结果，或一个明确不影响 E00 安全和正确性的环境项；
- 条件必须具体、可执行、可在进入 E01 前关闭。

不得把 queue、workspace、migration、redaction、provider 隔离或 build 的未验证项放入条件接受。

### `REJECTED`

任一条件成立：

- Blocker > 0；
- Major > 0；
- 多个关键 Unverified；
- 必跑命令失败；
- E01 scope creep；
- 无法证明 clean-room；
- 验收证据与实施报告明显不符。

---

## 25. 最终报告格式

严格按以下格式输出：

```text
# SerialOS E00 Independent Acceptance Report

## 1. Verdict
- Verdict: ACCEPTED | CONDITIONALLY_ACCEPTED | REJECTED
- Base commit:
- Implementation commit/diff:
- Branch:
- Accepted plan:
- Implementation report:
- Original working tree unchanged: YES/NO

## 2. Counts
- Blocker:
- Major:
- Minor:
- Unverified:

## 3. Executive conclusion
- What E00 demonstrably provides:
- What it does not yet prove:
- Whether E01 may start: YES/NO

## 4. Scope audit
| Category | Files/count | Result | Notes |
|---|---:|---|---|
| E00 implementation | ... | ... | ... |
| E00 tests | ... | ... | ... |
| E01 or later | ... | ... | ... |
| Secrets/generated files | ... | ... | ... |

## 5. Slice acceptance matrix
| Slice | Status | Implementation evidence | Test evidence | Runtime evidence |
|---|---|---|---|---|
| E00-S01 | PASS/FAIL/UNVERIFIED | ... | ... | ... |
...
| E00-S08 | PASS/FAIL/UNVERIFIED | ... | ... | ... |

## 6. Mandatory command results
| Command | Exit code | Duration | Result summary |
|---|---:|---:|---|

## 7. Clean-room result
- Copy method:
- Frozen install:
- Migration:
- Seed:
- Re-migrate:
- Build:
- Startup:
- Cleanup:

## 8. Durable job evidence
| Behavior | Implementation | Test | Result |
|---|---|---|---|

## 9. Security and isolation evidence
| Control | Evidence | Result |
|---|---|---|
| Workspace fail closed | ... | ... |
| Cross-workspace denial | ... | ... |
| Log redaction | ... | ... |
| Client secret isolation | ... | ... |
| Provider isolation | ... | ... |
| Security headers | ... | ... |
| Audit append-only | ... | ... |

## 10. Contract and migration evidence
- OpenAPI:
- JSON Schema:
- Negative fixtures:
- Migration checksum:
- Mutation tests:

## 11. CI and smoke
- Current commit CI URL/run identifier if available:
- CI result:
- Web health:
- Worker health:
- Readiness dependency failure:
- DB roundtrip:
- Storage roundtrip:
- Production/container smoke:

## 12. Findings
### Blocker
- [ID] file:line - finding - evidence - impact

### Major
- ...

### Minor
- ...

### Unverified
- ...

## 13. Differences from implementation report
- None | details

## 14. Conditions before E01
- None | exact closure criteria

## 15. Final decision
- E00 task may be marked accepted: YES/NO
- E01 may start: YES/NO
- Required next action:
```

报告输出后立即停止。不要修复，不要改变任务状态，不要开始 E01。

---

## 26. 交给 Codex 的启动消息

将本文件放到仓库，例如：

```text
prompts/00-e00-independent-acceptance.md
```

在一个新的、未参与实现的 Codex 会话中发送：

```text
你现在是 SerialOS E00 的独立验收工程师。

严格读取并执行：
prompts/00-e00-independent-acceptance.md

只读审查原仓库。所有安装、启动、mutation 和破坏性验证只能在临时副本中进行。
不修改受版本控制文件，不自动修复，不改变任务状态，不开始 E01。

不相信实施报告中的通过结论，只相信代码、测试、命令退出码、运行结果和 CI 证据。
未实际验证的项目标记为 UNVERIFIED，不得推断 PASS。

严格按文档第 25 节输出完整报告，然后停止。
```
