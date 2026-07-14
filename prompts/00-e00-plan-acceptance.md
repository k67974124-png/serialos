# SerialOS 第一轮规划验收指令

版本：v1.0  
适用阶段：`START_HERE.md` 中“首先只规划，不写业务代码”的第一轮执行完成后  
验收对象：E00 工程基座执行计划及其需求审查结果

---

## 1. 你的角色

你是 **SerialOS 第一轮规划的独立验收工程师**。

本轮只做审查和验证，不实现功能、不修复问题、不重写计划、不继续 E00 实施，也不开始 E01。

请遵守以下硬性规则：

1. 不相信上一轮会话的“已完成”“全部通过”等总结，只相信仓库文件、Git 差异和实际命令输出。
2. 不修改任何受版本控制的文件。
3. 不安装新的生产依赖。
4. 不调用真实 OpenAI API，不访问第三方生产服务。
5. 未实际检查或无法取得证据的项目必须标记为 `UNVERIFIED`，不得推断为通过。
6. 发现问题后只报告，不在本轮自动修复。
7. 若发现上一轮已经写入业务代码或开始 E01，必须将其作为范围违规处理。
8. 最终只能给出本文件定义的三种结论之一。

---

## 2. 验收目的

确认第一轮交付是否已经完成以下工作：

- 正确理解 SerialOS MVP 的产品边界与关键不变量；
- 识别规格中的矛盾、缺失、假设和不可验收项；
- 按 `PLANS.md` 形成一份可执行、可测试、可回滚的 E00 实施计划；
- 覆盖 E00-S01 至 E00-S08 的全部切片；
- 明确目录、依赖、数据、API、Worker、外部服务适配器、安全、测试、CI 和风险；
- 将必要技术取舍记录为 ADR 或明确列为待建 ADR；
- 没有越界实现 E00 或 E01 业务功能；
- 规划完成后停止，等待人工批准。

本轮验收的是 **“是否具备可靠开工条件”**，不是产品功能是否已经实现。

---

## 3. 必须阅读的基准文件

按顺序读取：

1. `AGENTS.md`
2. `START_HERE.md`
3. `PLANS.md`
4. `README.md`
5. `docs/00-project-charter.md`
6. `docs/01-prd.md`
7. `docs/03-scope-and-release-plan.md`
8. `docs/11-system-architecture.md`
9. `docs/14-security-privacy.md`
10. `docs/15-test-and-acceptance.md`
11. `docs/17-decisions-and-assumptions.md`
12. `docs/18-codex-execution-guide.md`
13. `tasks/README.md`
14. `tasks/E00-foundation.md`
15. 本轮新增或修改的执行计划、需求审查记录与 ADR

若上述任何基准文件缺失，记录为 `BLOCKER`。

---

## 4. 第一步：建立只读证据基线

先运行并记录完整输出：

```bash
git rev-parse --show-toplevel
git branch --show-current
git status --short
git diff --name-status
git diff --stat
git diff --check
```

如果工作区是干净的，继续检查最近一次提交：

```bash
git log -1 --oneline --decorate
git show --name-status --stat --oneline HEAD
```

然后定位本轮规划文件：

```bash
find . -maxdepth 4 -type f \
  \( -iname '*E00*plan*.md' -o -iname '*execution*plan*.md' -o -iname '*foundation*plan*.md' \) \
  -not -path './node_modules/*' \
  -not -path './.git/*' \
  | sort

rg -l 'E00-S01|Monorepo 与命令合同|E00 工程基座' . \
  -g '*.md' \
  -g '!MASTER_SPEC.md' \
  -g '!node_modules/**' \
  -g '!.git/**'
```

若无法定位唯一且明确的 E00 执行计划，结论不得为 `ACCEPTED`。

### 受控文件完整性检查

运行：

```bash
python scripts/validate_specs.py
```

预期：

```text
Errors:   0
Warnings: 0
Verdict:  PASS
```

如脚本无法运行或结果不是 PASS，记录为 `BLOCKER`。

---

## 5. 第二步：判断上一轮是否越界

根据 Git 差异或最近提交，给所有变化分类：

- `PLAN`：执行计划、审查记录；
- `ADR`：技术决策记录；
- `SPEC_CLARIFICATION`：为消除矛盾而做的最小规格澄清；
- `STATUS_ONLY`：任务状态或索引更新；
- `IMPLEMENTATION`：应用代码、依赖、迁移、测试、Docker、CI 等实现；
- `E01_OR_LATER`：登录、素材、选题、内容、审核、互动作品等后续 Epic 功能；
- `UNRELATED`：与本轮无关的变化。

第一轮允许的变化仅限：

- `PLAN`
- `ADR`
- 有充分理由的最小 `SPEC_CLARIFICATION`
- 可选的 `STATUS_ONLY`

以下任一情况视为范围违规：

- 新增或修改 `apps/`、`packages/`、`src/`、`tests/`、migration、Docker Compose、CI 工作流；
- 新增根 `package.json`、lockfile 或生产依赖；
- 实现登录、素材、AI、选题、内容、审核、导出或发布能力；
- 开始 E01 或后续 Epic；
- 未说明原因的大范围规格重写。

若出现 `E01_OR_LATER`，最终结论必须为 `REJECTED`。  
若出现 E00 `IMPLEMENTATION`，至少记为 `MAJOR`；除非本次任务明确要求实施，否则最终结论不得为 `ACCEPTED`。

---

## 6. 第三步：验证产品理解

检查计划或审查记录是否准确复述并约束以下不变量：

1. SerialOS 是面向中文知识型创作者的 AI 编辑操作系统；
2. 不伪造个人经历、客户故事、引用、统计或来源；
3. 外部可验证声明必须关联来源，或明确标记为 unsupported；
4. blocker 未解决时不能批准内容；
5. MVP 不自动发布到第三方平台；
6. MVP 不执行模型生成的任意代码；
7. 互动作品只能通过批准的 JSON Schema 和安全模板渲染；
8. 原始创作者内容不得进入应用日志；
9. 所有应用使用的 AI 输出必须经过 Schema 校验；
10. 模型 ID、推理等级、预算和价格元数据必须可配置；
11. 长任务必须由 Worker 执行，不能依赖 Web 请求生命周期；
12. PostgreSQL 是事实源，任务必须持久化、可重试、幂等；
13. 默认 CI 不调用真实 OpenAI API；
14. MVP 不引入 Redis、Kafka、Kubernetes 或微服务，除非有被批准的 ADR；
15. E00 不交付登录、素材、选题、内容或互动作品业务能力。

判定规则：

- 准确覆盖 13 至 15 项且无实质性误读：`PASS`；
- 缺少 1 至 2 项但计划未与其冲突：`MINOR`；
- 缺少 3 项以上，或与任一安全/真实性不变量冲突：`MAJOR` 或 `BLOCKER`。

---

## 7. 第四步：检查规格审查质量

第一轮必须对规格进行会审，而不是直接照抄任务标题。

检查是否存在一份明确的审查结果，至少回答：

- 规格之间是否有冲突；
- 是否存在缺失定义；
- 是否存在无法自动化验收的要求；
- 哪些是假设；
- 哪些问题会阻塞 E00；
- 非阻塞模糊项采用了什么最小安全决策；
- 哪些决策需要 ADR；
- E00 是否可以进入实施。

审查结论应明确使用以下语义之一：

- `READY_TO_IMPLEMENT`
- `READY_WITH_RECORDED_ASSUMPTIONS`
- `NOT_READY`

若使用其他文字，必须能无歧义映射到以上三种状态。

以下情况为 `MAJOR`：

- 完全没有规格冲突检查；
- 把所有问题笼统写为“实现时再看”；
- 发现阻塞问题却仍宣布可直接实施；
- 对关键未决项擅自扩展产品范围。

---

## 8. 第五步：检查是否符合 `PLANS.md`

E00 计划必须覆盖下列 15 个部分，标题可以略有不同，但内容不得缺失：

1. Objective
2. Scope
3. Inputs reviewed
4. Current-state findings
5. Decisions
6. Data changes
7. API changes
8. Worker and AI changes
9. UI changes
10. Security and privacy
11. Test plan
12. Implementation sequence
13. Verification commands
14. Rollback
15. Risks and open questions

对每一项给出：

- `PASS`：内容明确且足以指导实施；
- `PARTIAL`：存在但不可执行或过于笼统；
- `FAIL`：缺失或与基准规格冲突。

以下任一项为 `FAIL` 时属于 `MAJOR`：

- Scope
- Decisions
- Data changes
- Worker and AI changes
- Security and privacy
- Test plan
- Implementation sequence
- Verification commands
- Rollback

---

## 9. 第六步：检查 E00 八个切片覆盖

计划必须逐项覆盖：

### E00-S01 Monorepo 与命令合同

必须说明：

- `apps/web`、`apps/worker`；
- 共享 package 边界与依赖方向；
- pnpm workspace、TypeScript strict、lint、formatter；
- 所有 required commands 如何真实落地；
- 如何检测包循环依赖；
- lockfile 策略。

### E00-S02 本地基础设施与配置

必须说明：

- PostgreSQL + pgvector；
- MinIO 或 S3 兼容本地服务；
- Mailpit 或等价开发邮件服务；
- `.env.example` 与类型化启动校验；
- dev/test 隔离；
- liveness 与 readiness 的不同语义；
- bucket bootstrap 的可重入性；
- 启动与清理命令。

### E00-S03 数据库、迁移与工作区作用域

必须说明：

- migration 工具与选择理由；
- 从 `db/schema.sql` 到正式 migration 的办法；
- 空库 migrate、seed、重复 migrate、升级测试；
- migration checksum 或等价保护；
- transaction boundary；
- workspace-scoped repository fail-closed；
- UTC、ID、version 字段约定；
- schema 偏差如何记录 ADR；
- migration 回滚或 roll-forward 策略。

### E00-S04 Durable Job、Outbox 与幂等

必须说明：

- enqueue、claim、lease/lock、heartbeat；
- success、retry、dead-letter、cancel；
- checkpoint、attempt、provider request ID；
- exponential backoff + jitter；
- idempotency key 与副作用去重；
- transactional outbox；
- worker graceful shutdown；
- 崩溃恢复、并发提交、迟到结果、poison job 的测试方案。

### E00-S05 外部服务端口与测试替身

必须说明：

- `AiGateway`、`EmbeddingGateway`、`TranscriptionGateway`、`WebResearchGateway`；
- `ObjectStorage`、`Mailer`、`Clock`、`IdGenerator`；
- adapter 与 application/domain 的依赖方向；
- deterministic fake/fixture；
- 成功、Schema invalid、429、超时、5xx、取消的模拟；
- usage、cost、provider request ID 统一返回；
- Prompt/Schema registry 与版本命名；
- 默认 CI 无公网、无真实 OpenAI；
- model route 从配置读取。

### E00-S06 API、错误与合同

必须说明：

- OpenAPI 自动验证；
- request/response validation；
- stable error code 与统一 envelope；
- request ID；
- session、workspace、idempotency、pagination 基础边界；
- contract test harness；
- undeclared response 如何使测试失败；
- stack trace 不返回客户端；
- 404 与越权响应不泄露资源存在性。

### E00-S07 可观测与安全基线

必须说明：

- JSON structured logs；
- request/job/provider call correlation；
- trace/span abstraction 与 metrics registry；
- 原始素材、Authorization、Cookie、API key 的 redaction；
- append-only audit event；
- CSP、安全 headers、CSRF 策略；
- rate limiter 接口；
- 私有文件短期 signed URL；
- 对应安全测试。

### E00-S08 CI 与最小 Smoke

必须说明：

- spec、format、lint、typecheck、unit、integration、build jobs；
- 可选 E2E 和 live-provider smoke 的隔离；
- CI 干净环境与依赖缓存；
- Web、Worker、DB、object storage roundtrip smoke；
- README 干净机器启动步骤；
- 至少一个正式 ADR；
- 如何证明故意破坏 Schema、type、migration 时 CI 会失败。

对每个切片给出 `PASS / PARTIAL / FAIL` 与文件行号证据。

若任一切片完全缺失，记录为 `MAJOR`。  
若 E00-S03、E00-S04、E00-S05 或 E00-S07 缺少关键安全/一致性设计，记录为 `BLOCKER` 或 `MAJOR`。

---

## 10. 第七步：检查实施顺序是否可执行

计划应拆成小步骤，并满足：

- 每一步都有明确输入、输出与完成条件；
- 每一步结束时仓库仍可构建或有清晰的暂存门；
- 依赖顺序合理，不在基础合同前实现上层业务；
- migration、repository、queue、adapter、API、observability、CI 的先后关系清晰；
- 不以“一次性完成全部基座”作为单一步骤；
- 每一步都映射到一个或多个 E00-Sxx；
- 每一步都有对应验证方法；
- 明确何时创建 ADR；
- 最后一步停止于 E00，不进入 E01。

以下情况为 `MAJOR`：

- 只有高层项目符号，没有可执行步骤；
- 多个高风险子系统被揉成一个无法独立验证的大步骤；
- 测试全部放在最后补；
- 先写业务功能，再补基础设施；
- 没有明确停止点。

---

## 11. 第八步：检查测试与验收映射

计划必须把验收条件映射到自动化证据，而不只是写“补测试”。

至少检查以下映射是否存在：

| 验收对象 | 至少需要的证据 |
|---|---|
| Monorepo | clean install、build、lint、typecheck、dependency cycle check |
| 配置 | 缺失配置 fail-fast、secret 不回显 |
| Readiness | DB 不可用时失败；liveness 语义独立 |
| Migration | empty DB、seed、repeat migrate、upgrade/checksum |
| Workspace | 无 workspace ID 时 repository fail-closed |
| Queue | crash recovery、idempotency、dead-letter、cancel、late result、concurrency |
| Outbox | 业务写入与 outbox 原子提交 |
| Provider fake | success、invalid schema、429、timeout、5xx、cancel |
| API contract | undeclared response、stable error、request ID、no stack trace |
| Security | redaction、headers、audit append-only、signed URL |
| Smoke | Web、Worker、DB、storage roundtrip |
| CI | 破坏 Schema、type、migration 时对应 job 失败 |

每项必须写明：

- 测试层级：unit / integration / contract / smoke / E2E；
- 预期测试位置或命名；
- 执行命令；
- 预期成功与失败信号。

只写“应该测试”而没有命令或证据路径，标记为 `PARTIAL`。

---

## 12. 第九步：检查精确验证命令

计划必须包含或明确映射以下命令：

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

并说明：

- `pnpm install --frozen-lockfile`；
- 如何启动和停止本地依赖；
- 如何启动 Web 与 Worker；
- 如何执行 health/readiness 和 roundtrip smoke；
- 如何运行可选 `pnpm test:e2e`；
- 默认测试如何确保不访问公网；
- live-provider smoke 如何通过显式环境变量开启；
- 如何清理测试数据与容器卷。

计划阶段尚未实现这些命令是允许的，但计划必须明确由哪个步骤创建，以及最终如何证明它们不是 `echo pass` 或空脚本。

若没有精确命令，记录为 `MAJOR`。

---

## 13. 第十步：检查技术决策与 ADR

至少检查下列决策是否明确：

- monorepo/workspace 工具；
- Next.js 与 Worker 的运行边界；
- migration/ORM 或 query 工具；
- PostgreSQL durable queue 方案；
- transactional outbox 方案；
- OpenAPI request/response 校验方案；
- JSON Schema Draft 2020-12 校验方案；
- object storage adapter；
- structured logging、trace、metrics 方案；
- testing 工具组合；
- Docker Compose 服务；
- CI 平台与 jobs；
- workspace scoping 实现策略。

每个非平凡决策应说明：

- 选择；
- 原因；
- 替代方案；
- 是否需要 ADR；
- 对 E00 验收和未来 Epic 的影响。

以下情况为 `MAJOR`：

- 只列库名，不解释选择；
- 关键方案与架构约束冲突；
- 引入 Redis、Kafka、Kubernetes、微服务却没有被批准的 ADR；
- 将 OpenAI SDK 直接作为 domain/application 依赖；
- 用内存队列代替持久任务并声称满足 E00。

---

## 14. 第十一步：检查回滚与风险

计划必须覆盖：

- 代码回滚；
- migration 回滚或安全 roll-forward；
- 配置回滚；
- Docker/基础设施回滚；
- 已领取和未完成 job 的处理；
- outbox 未投递事件的处理；
- 部分完成步骤的恢复；
- feature flag 是否必要；
- 数据丢失与重复副作用风险；
- 开发环境与 CI 差异风险；
- 依赖版本与供应链风险。

阻塞问题必须明确列出；非阻塞问题应做最小安全决策并记录。

只有一句“通过 Git revert 回滚”不算完整回滚方案。

---

## 15. 必须执行的快速文本检查

请运行并审阅结果，不要只贴命令：

```bash
# 计划是否覆盖全部切片
for slice in E00-S01 E00-S02 E00-S03 E00-S04 E00-S05 E00-S06 E00-S07 E00-S08; do
  rg -n "$slice" <E00_PLAN_FILE> >/dev/null \
    && echo "PASS $slice" \
    || echo "MISSING $slice"
done

# 查找计划中常见的模糊或延后表达
rg -n -i \
  'TODO|TBD|later|以后再补|后续处理|视情况|按需|可能|大概|暂定|简单实现|先跳过|暂不考虑' \
  <E00_PLAN_FILE>

# 查找可能越界的实现文件
find . -maxdepth 4 -type f \
  \( -path './apps/*' -o -path './packages/*' -o -path './src/*' -o -path './tests/*' \
     -o -path './migrations/*' -o -path './.github/workflows/*' \
     -o -name 'package.json' -o -name 'pnpm-lock.yaml' \
     -o -name 'docker-compose.yml' -o -name 'compose.yaml' \) \
  -not -path './node_modules/*' \
  -not -path './.git/*' \
  | sort
```

将 `<E00_PLAN_FILE>` 替换为实际计划路径。

模糊词本身不自动判错，但每处必须判断它是否造成不可执行、不可测试或逃避决策。

---

## 16. 严重程度定义

### BLOCKER

导致无法安全进入 E00 实施，例如：

- 基准规格损坏或静态校验失败；
- 计划缺失；
- 产品真实性、安全或数据隔离不变量被违反；
- durable job、workspace scoping、provider isolation 等关键设计缺失；
- 存在未解决的规格冲突，却仍准备实施；
- 默认计划调用真实生产服务或暴露 secret。

### MAJOR

不一定立即造成安全事故，但计划不足以可靠实施，例如：

- E00 切片缺失；
- 缺少精确测试和验证命令；
- 实施顺序不可执行；
- 缺少 migration/outbox/idempotency/rollback 方案；
- 第一轮越界写了实现代码；
- 关键技术取舍没有依据。

### MINOR

不阻碍开工但应补齐，例如：

- 个别标题与模板命名不同；
- 非关键文件路径尚未最终确定；
- 文档措辞或索引可改进；
- 风险描述可更精确，但已有安全默认值。

---

## 17. 最终判定规则

最终只能输出一个结论：

### `ACCEPTED`

必须同时满足：

- 无 `BLOCKER`；
- 无 `MAJOR`；
- 静态规格校验 PASS；
- 产品边界和不变量理解正确；
- 15 个计划部分完整；
- E00-S01 至 E00-S08 全部为 PASS；
- 测试、验证、回滚和风险足以指导实施；
- 没有 E01 或后续范围；
- 没有未解释的实现代码；
- 计划明确停在等待 E00 实施批准。

### `ACCEPTED_WITH_MINOR_FOLLOWUPS`

必须同时满足：

- 无 `BLOCKER`；
- 无 `MAJOR`；
- 只有不影响安全、架构或可验收性的 `MINOR`；
- 每个 minor 都有明确修订位置和建议；
- 可以在开始 E00 实施时同步修正，而不会改变计划主路径。

### `REJECTED`

出现任一情况：

- 存在 `BLOCKER` 或 `MAJOR`；
- 关键项目只能标记为 `UNVERIFIED`；
- 已开始 E01 或后续业务功能；
- E00 八个切片未完整覆盖；
- 计划缺少安全、测试、验证或回滚；
- 计划无法作为下一轮实施的可靠输入。

不得创造“基本通过”“大体没问题”“建议通过”等第四种结论。

---

## 18. 输出格式

严格按以下格式输出，不要省略章节。

```markdown
# SerialOS 第一轮规划验收报告

## 1. 最终结论
- Verdict: ACCEPTED | ACCEPTED_WITH_MINOR_FOLLOWUPS | REJECTED
- Blocker: <数量>
- Major: <数量>
- Minor: <数量>
- Unverified: <数量>
- 一句话结论：<是否可以进入 E00 实施，以及原因>

## 2. 验收环境
- Repository root:
- Branch:
- HEAD commit:
- Working tree state:
- E00 plan file:
- Reviewed ADR files:
- Validation command and exit code:

## 3. 变更范围审查
| 文件或目录 | 分类 | 是否允许 | 说明 |
|---|---|---:|---|

## 4. 产品边界与不变量
| 检查项 | 状态 | 证据文件与行号 | 说明 |
|---|---|---|---|

## 5. 规格会审结果
- Readiness: READY_TO_IMPLEMENT | READY_WITH_RECORDED_ASSUMPTIONS | NOT_READY
- 已识别冲突：
- 已识别缺失：
- 已记录假设：
- 阻塞问题：

## 6. PLANS.md 完整性矩阵
| 章节 | PASS/PARTIAL/FAIL | 证据文件与行号 | 缺口 |
|---|---|---|---|

## 7. E00 切片验收矩阵
| 切片 | PASS/PARTIAL/FAIL | 计划步骤 | 测试与命令 | 风险/缺口 |
|---|---|---|---|---|
| E00-S01 | | | | |
| E00-S02 | | | | |
| E00-S03 | | | | |
| E00-S04 | | | | |
| E00-S05 | | | | |
| E00-S06 | | | | |
| E00-S07 | | | | |
| E00-S08 | | | | |

## 8. 技术决策与 ADR
| 决策 | 是否明确 | 替代方案是否记录 | ADR 状态 | 评价 |
|---|---:|---:|---|---|

## 9. 测试与验收映射
| 验收条件 | 测试层级 | 计划中的测试位置 | 执行命令 | 状态 |
|---|---|---|---|---|

## 10. 验证命令审查
| 命令 | 是否规划 | 预期创建步骤 | 成功信号 | 状态 |
|---|---:|---|---|---|

## 11. 实施顺序、回滚与风险
- 实施顺序评价：
- 每步是否保持仓库可验证：
- 回滚完整性：
- 关键风险：
- 开放问题：

## 12. Findings
### Blocker
1. <无则写“无”>

### Major
1. <无则写“无”>

### Minor
1. <无则写“无”>

### Unverified
1. <无则写“无”>

## 13. 进入下一轮前必须完成的动作
1. <按优先级列出；无需动作则写“无，可以批准 E00 实施”>

## 14. 证据摘要
- 实际运行的命令：
- 命令退出码：
- 未运行的命令及原因：
- 本轮是否修改受版本控制文件：否
```

---

## 19. 结束条件

完成报告后立即停止。

不要：

- 修改计划；
- 创建实现文件；
- 修复 findings；
- 运行 E00 实施；
- 开始 E01；
- 把 `UNVERIFIED` 写成 `PASS`。

等待项目负责人根据报告决定：批准 E00 实施，或先修订第一轮规划。