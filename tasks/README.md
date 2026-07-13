# 实施任务索引

本目录是 Codex 的执行队列。每个 Epic 都是一个产品可验收的阶段，不是按技术层横切的“大仓库改造”。实现时必须先读任务文件列出的输入文档，再用 `PLANS.md` 创建执行计划。

## 状态约定

每个 Epic 的状态只能是：

- `not_started`：尚未开始；
- `planning`：正在形成执行计划；
- `in_progress`：计划已接受，正在实现；
- `verification`：功能完成，正在验证；
- `blocked`：存在外部阻塞，任务文件中必须记录原因；
- `accepted`：产品、工程与验收门均通过。

不得把“代码已写完”当作 `accepted`。完成定义以 `AGENTS.md` 和对应任务文件为准。

## 依赖顺序

```text
E00 Foundation
  └─ E01 Auth, workspace, onboarding
      └─ E02 Material inbox
          └─ E03 AI ingestion and insight assets
              └─ E04 Creator profile and columns
                  └─ E05 Topic meeting
                      └─ E06 Content run and interview
                          └─ E07 Content pack and editor
                              └─ E08 Claims, review, approval
                                  ├─ E09 Interactive artifacts
                                  └─ E10 Export and feedback
                                      └─ E11 Release hardening
```

E09 与 E10 在 E08 后可并行，但不得并行修改同一数据库迁移、共享 Schema 或同一页面树。E11 是设计伙伴发布门，不是“以后再做的运维杂项”。

## Epic 一览

| Epic | 文件 | 用户可见结果 | 核心依赖 |
|---|---|---|---|
| E00 | `E00-foundation.md` | 可重复启动、测试和演进的工程基座 | 无 |
| E01 | `E01-auth-onboarding.md` | 用户能登录、创建工作区、完成引导 | E00 |
| E02 | `E02-material-inbox.md` | 用户能收集并管理多种素材 | E01 |
| E03 | `E03-ai-ingestion-assets.md` | 素材变成可追溯观点资产 | E02 |
| E04 | `E04-profile-columns.md` | 用户能确认画像、术语和栏目 | E03 |
| E05 | `E05-topic-meeting.md` | 用户得到 3 至 5 个有证据选题 | E04 |
| E06 | `E06-content-run-interview.md` | 选题变成可恢复任务，缺口先采访 | E05 |
| E07 | `E07-content-pack-editor.md` | 生成并编辑完整多平台内容包 | E06 |
| E08 | `E08-claims-review-approval.md` | 风险可见，阻断项可靠阻止批准 | E07 |
| E09 | `E09-interactive-artifacts.md` | 生成安全的计算器、测试或清单 | E08 |
| E10 | `E10-export-feedback.md` | 批准内容可导出，发布结果可回流 | E08，部分依赖 E09 |
| E11 | `E11-release-hardening.md` | 达到首批设计伙伴可用门槛 | E00-E10 |

## 每个 Epic 的执行节奏

1. 运行 `$review-product-requirements`，检查任务与规格是否矛盾；
2. 运行 `$plan-vertical-slice`，写入当前执行计划；
3. 一次实现一个任务文件中的垂直切片；
4. 每个切片都交付 UI、API、数据、任务、错误态和测试；
5. 运行任务指定的验证命令；
6. 用 `/review` 做独立差异审查；
7. 运行 `$verify-release`；
8. 更新 Epic 状态、ADR 与已知风险；
9. 由人工接受后进入下一 Epic。

## 统一 Story 定义

每个 Story 至少说明：

- Story ID 与关联 FR；
- 用户结果；
- 前置条件；
- UI 与交互；
- API 与事件；
- 数据变化；
- 异步任务；
- 失败、空、重试和权限状态；
- 审计与可观测；
- 自动化验收。

Codex 不得为了“先跑起来”删除失败分支或伪造成功状态。复杂能力可以拆成多个切片，但每个切片必须可运行、可测试、可回滚。
