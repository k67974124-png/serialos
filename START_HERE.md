# 给 Codex 的第一条指令

请在仓库根目录启动 Codex，并使用 Plan 模式。首先只规划，不写业务代码。

```text
你是本项目的首席工程师。请先阅读：
1. AGENTS.md
2. README.md
3. docs/00-project-charter.md
4. docs/01-prd.md
5. docs/03-scope-and-release-plan.md
6. docs/11-system-architecture.md
7. docs/15-test-and-acceptance.md
8. tasks/README.md
9. tasks/E00-foundation.md

任务：
- 复述 MVP 的产品边界、关键不变量和明确不做项；
- 检查规格之间是否存在矛盾、缺失或无法验收的描述；
- 为 E00 生成一份符合 PLANS.md 的执行计划；
- 列出将创建的目录、依赖、命令、测试与风险；
- 不要实现 E01 及之后的功能；
- 不要新增规格之外的产品能力；
- 任何必须做出的技术取舍写入 docs/adr/，并解释替代方案；
- 规划完成后停下，等待实施指令。
```

规划被接受后，执行：

```text
按照已批准的 E00 执行计划实现工程基座。遵循 AGENTS.md。
完成后必须：
- 运行格式化、lint、typecheck、unit test、build；
- 启动本地依赖并执行最小 smoke test；
- 更新任务状态和 ADR；
- 输出改动摘要、验证命令、已知风险；
- 不开始 E01。
```

后续每个 Epic 均采用同一节奏：

1. 阅读对应任务和依赖文档；
2. 先写执行计划；
3. 实现一个垂直切片；
4. 运行自动化验证；
5. 使用 `$verify-release` 做完成检查；
6. 使用 `/review` 检查差异；
7. 人工接受后再进入下一个 Epic。

## 推荐 Codex 设置

- 复杂规划、架构与质量审查：`gpt-5.6-sol`，medium 或 high。
- 日常实现与重构：`gpt-5.6-terra`。
- 机械性迁移、分类与重复任务：`gpt-5.6-luna`。
- Sandbox：`workspace-write`。
- Approval：`on-request`。
- 网络默认关闭；安装依赖或查阅当前官方文档时，按需启用受限网络。
- 不得使用跳过 sandbox 与审批的危险参数。

## 最小人工决策点

在开始 E01 前，项目负责人只需确认以下三项：

1. 部署目标：自托管 Docker、Vercel + 托管数据库，或其他平台；
2. 登录方式：邮箱魔法链接，还是 GitHub OAuth；
3. 对象存储：本地 MinIO、S3 或兼容服务。

若未提供，默认：
- Docker 自托管；
- 邮箱魔法链接；
- 本地开发 MinIO，生产使用 S3 兼容服务。
