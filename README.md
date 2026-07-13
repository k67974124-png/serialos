# SerialOS「连载工坊」Codex 项目开工包

版本：1.0  
日期：2026-07-12  
产品阶段：MVP  
主要语言：中文产品界面与内容，英文代码与标识符

SerialOS 是面向中文知识型自媒体创作者的 AI 单人编辑部。它把语音、笔记、网页、历史文章和评论，持续转化为有个人观点、可追溯、可审阅的栏目内容包。每个内容包可以包含：

- 一篇母内容；
- 一份 3 至 8 分钟视频脚本；
- 一组小红书图文卡片；
- 三条短视频脚本；
- 若干短观点；
- 一个模板化互动作品；
- 一份来源与声明账本；
- 一份质量检查结果。

本仓库不是概念提案，而是可直接交给 Codex 的实现规格。Codex 应从 `START_HERE.md` 开始，遵循 `AGENTS.md`，按 `tasks/` 中的依赖顺序实现。

## 关键产品原则

1. 先证据，后表达。
2. 不得编造创作者经历、客户案例、数据或引语。
3. 自动生产，人工批准，MVP 不自动向外部平台发布。
4. 多平台内容必须重新编辑，不得只做机械裁剪。
5. 互动作品采用安全模板，不执行模型生成的任意代码。
6. 每次 AI 调用必须可追踪、可重放、可评估。
7. 生成结果必须通过结构化输出校验与质量门。

## 文档地图

- `START_HERE.md`：交给 Codex 的第一条指令。
- `AGENTS.md`：仓库级工程规则和完成定义。
- `PLANS.md`：复杂任务的执行计划模板。
- `MASTER_SPEC.md`：合并后的完整产品与技术规格。
- `FILE_MANIFEST.md`：文件大小、用途与 SHA-256 清单。
- `docs/`：按主题拆分的详细规格。
- `schemas/`：AI 结构化输出 JSON Schema。
- `examples/`：与 Schema 一一对应的合同示例与测试 fixtures。
- `contracts/openapi.yaml`：产品 API 合约。
- `db/schema.sql`：核心 PostgreSQL 数据模型。
- `tasks/`：按依赖排列的实施 Epic。
- `.agents/skills/`：仓库级 Codex Skills。
- `prompts/`：可复制给 Codex 的阶段性指令。
- `scripts/validate_specs.py`：离线规格编译与一致性检查。
- `VALIDATION_REPORT.md`：最近一次静态验证结果。

## 推荐实现顺序

1. `E00` 工程基座与本地环境；
2. `E01` 认证、工作区与引导；
3. `E02` 素材收件箱；
4. `E03` AI 入库与观点资产；
5. `E04` 创作者画像与栏目；
6. `E05` AI 选题会；
7. `E06` 制作任务与补充采访；
8. `E07` 内容包生成；
9. `E08` 声明账本、质量门与审核；
10. `E09` 互动作品模板；
11. `E10` 导出、发布记录与数据回流；
12. `E11` 安全、评测、可观测与发布门。

## MVP 之外

以下能力禁止在未记录 ADR 的情况下提前实现：

- 自动发布到公众号、小红书、抖音或视频号；
- 数字人、声音克隆和自动配音；
- 多人协作与复杂权限；
- 任意代码生成后直接执行；
- 热点批量搬运；
- 自动回复评论；
- 付费订阅与账单；
- 原生移动应用；
- 对创作者历史内容进行模型微调。

## 参考技术方案

技术选择以 `docs/11-system-architecture.md` 为准。原则上采用：

- TypeScript monorepo；
- Next.js Web 应用；
- 独立 Node.js Worker；
- PostgreSQL + pgvector；
- S3 兼容对象存储；
- PostgreSQL 持久化任务队列；
- OpenAI Responses API、Structured Outputs、Web Search、Embeddings 与 Speech-to-Text；
- Playwright、Vitest、类型检查和静态分析；
- Docker Compose 本地依赖。

所有具体依赖版本应在首次初始化时选择“当前稳定且互相兼容”的版本，并提交 lockfile。不得在业务代码中硬编码模型、价格或供应商凭证。
