# 16. 交付 Backlog

详细任务见 `tasks/`。本文件用于产品、工程和 Codex 快速对齐。

## Epic E00 工程基座

目标：可本地启动、测试和部署的单仓库基座。

用户价值：暂无直接用户价值，但建立后续每个垂直切片的可重复验证。

关键交付：

- monorepo；
- Web/Worker；
- PostgreSQL + pgvector；
- 对象存储；
- 队列/outbox；
- auth skeleton；
- OpenAI fake；
- contracts/schema validation；
- logging/tracing；
- CI；
- Docker Compose；
- health；
- ADR。

依赖：无。

## Epic E01 认证、工作区和引导

目标：新用户能安全登录、创建工作区、保存画像草稿、建立首个栏目并进入今日页。

关键交付：

- magic link/GitHub 其一；
- workspace owner；
- onboarding 6 步；
- autosave；
- profile version；
- column；
- feature flags；
- audit；
- cross-tenant tests。

依赖：E00。

## Epic E02 素材收件箱

目标：用户能捕获文本、文件、音频、图片、URL 和评论，并看到可恢复状态。

先实现垂直顺序：

1. 文本；
2. 预签名文件；
3. 音频；
4. PDF/DOCX；
5. 图片；
6. URL；
7. 评论 CSV。

关键交付：

- list/detail；
- file validation；
- storage；
- status timeline；
- versions；
- retry/archive/delete impact。

依赖：E01。

## Epic E03 AI 入库与观点资产

目标：素材被标准化、切分、嵌入并抽取为可追溯资产。

关键交付：

- AiGateway；
- structured outputs；
- model router；
- prompt registry；
- material pipeline；
- chunks；
- embeddings；
- asset schema；
- provenance；
- confirmation/edit/merge；
- privacy；
- provider fake；
- eval fixtures。

依赖：E02。

## Epic E04 创作者画像与栏目完善

目标：基于历史内容生成可确认画像建议，并把栏目作为选题约束。

关键交付：

- suggestion patch；
- evidence；
- confidence；
- active profile；
- terminology/banned phrases；
- column CRUD；
- profile settings；
- version history。

依赖：E03。

## Epic E05 AI 选题会

目标：从栏目和资产生成 3 至 5 个有证据候选。

关键交付：

- configuration；
- retrieval；
- candidate generation；
- deterministic filter；
- Sol editorial rank；
- six scores；
- historical similarity；
- candidate cards/compare；
- select/edit/archive/feedback；
- job/cost。

依赖：E04。

## Epic E06 制作任务与采访

目标：选题变成可恢复的制作任务，素材不足时先采访。

关键交付：

- content run state machine；
- checkpoints；
- gap analysis；
- interview questions；
- text/audio answers；
- budget；
- start/pause/cancel/retry/resume；
- task timeline；
- context collection。

依赖：E05。

## Epic E07 内容包生成与编辑

目标：生成标准内容包并支持版本化编辑和局部重生成。

关键交付：

- brief；
- master article；
- video；
- carousel；
- shorts；
- micro posts；
- shot list；
- parallel steps；
- Markdown editor；
- autosave；
- versions；
- regeneration diff；
- source map。

依赖：E06。

## Epic E08 声明、质量门与批准

目标：用户清楚看到事实和风险，blocker 能可靠阻止批准。

关键交付：

- claim extraction；
- source mapping；
- deterministic QA；
- Sol review；
- findings；
- stale/re-run；
- review sidebar；
- approval；
- invalidation；
- quality report；
- moderation。

依赖：E07。

## Epic E09 互动作品

目标：通过安全模板生成 calculator、quiz、checklist。

关键交付：

- artifact schema；
- formula parser；
- semantic validator；
- three renderers；
- editor；
- iframe preview；
- a11y；
- static build；
- security/fuzz tests。

依赖：E08，可以与 E10 部分并行。

## Epic E10 导出、发布记录和反馈

目标：把批准内容带入用户现有发布流程并让反馈回流。

关键交付：

- ZIP/Markdown/JSON；
- draft watermark；
- signed download；
- export center；
- publishing record；
- manual metrics；
- comments import；
- content library；
- audit。

依赖：E08；artifact export 依赖 E09。

## Epic E11 发布硬化

目标：达到设计伙伴可用的安全、评测和运维门槛。

关键交付：

- Golden Set；
- eval runner；
- security tests；
- deletion worker；
- retention；
- dead-letter runbook；
- provider outage；
- rate limits；
- dashboards；
- accessibility；
- performance；
- backup/restore docs；
- release checklist。

依赖：所有 Epic 的核心路径。

## 统一 Story 格式

每个 Story 必须包含：

- ID；
- 用户结果；
- 前置条件；
- 行为；
- 验收；
- API；
- 数据；
- UI；
- 异常；
- 安全；
- telemetry；
- tests；
- out-of-scope。

## 发布优先级

Codex 不应同时大面积铺开多个 Epic。推荐：

- 一个 Epic 一份执行计划；
- 每个 Epic 按可演示垂直切片交付；
- 完成 Definition of Done 后再进入下一个；
- E11 要求在前面增量落实，不要最后才补安全。
