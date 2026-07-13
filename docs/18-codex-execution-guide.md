# 18. Codex 执行指南

## 1. 为什么采用仓库化规格

Codex 会在开始工作前读取 `AGENTS.md`，并可通过仓库级 `.agents/skills` 使用可复用工作流。因此本项目把长期规则放入 `AGENTS.md`，把复杂产品说明拆分到 `docs/`，把每个 Epic 的可验收工作放入 `tasks/`。

不要把所有要求复制到每条 Prompt。Codex 应：

- 先读取相关文件；
- 先规划；
- 一次实现一个垂直切片；
- 运行测试和 review；
- 遇到重复问题更新规则或 Skill。

## 2. 开始方式

交互式：

```bash
cd serialos
codex -m gpt-5.6-sol
```

进入 Plan 模式并使用 `START_HERE.md` 的第一条指令。

非交互自动化可使用 `codex exec`，但只适合边界清晰、已有测试的工作。不要在首次架构或复杂产品任务中直接无监督运行。

## 3. 模型选择

### Sol

使用：

- Epic 规划；
- 架构；
- 复杂迁移；
- AI orchestration；
- 安全审查；
- Studio 复杂交互；
- artifact 安全；
- 发布审查。

### Terra

使用：

- 明确的垂直切片；
- 页面和 API 实现；
- 测试；
- 重构；
- 文档更新；
- 一般 bug。

### Luna

使用：

- 机械改名；
- 重复类型迁移；
- fixture 生成；
- 文档索引；
- 简单 CRUD；
- 已明确模式下的批量工作。

任何模型都必须遵循相同完成定义。不要为了节省模型费用跳过测试。

## 4. 推荐任务循环

1. 用 `$plan-vertical-slice` 生成计划；
2. 人工检查范围；
3. 用 `$implement-vertical-slice` 实现；
4. 运行命令；
5. 用 `/review` 检查 diff；
6. 用 `$verify-release` 检查验收；
7. 修复；
8. 提交；
9. 更新任务状态；
10. 进入下一切片。

## 5. Worktree

多个代理并行时：

- 每个 Epic/切片使用独立 worktree；
- 不并行修改同一 migration、schema 或共享类型；
- 主线程负责集成；
- 子代理用于探索、测试和安全审查；
- 合并前 rebase 并运行全套验证。

不允许两个代理同时在同一目录修改同一文件树。

## 6. 网络与权限

默认：

- workspace-write；
- on-request；
- network off。

需要网络：

- 初始化安装依赖；
- 查阅当前官方文档；
- opt-in live provider tests。

建议只允许：

- npm registry；
- official framework docs；
- OpenAI official docs；
- GitHub releases of selected dependencies。

不要使用危险的 sandbox/approval bypass。不得把 `.env` 或凭证放入 Codex Prompt。

## 7. 规划输出要求

每份计划必须：

- 引用需求 ID；
- 明确 in/out；
- 列出 migrations；
- 列出 API；
- 列出 job；
- 列出页面；
- 列出异常；
- 列出 security；
- 列出 telemetry；
- 列出 tests；
- 列出 rollback；
- 不包含“以后再补测试”。

## 8. 实现输出要求

Codex 完成任务时输出：

- 实现摘要；
- 文件列表；
- 用户可见行为；
- 数据/API 变化；
- 执行的验证命令及结果；
- 未运行的检查及原因；
- 风险；
- ADR；
- 后续仅限当前 Epic 的下一步。

不得声称测试通过，除非实际运行。

## 9. Review 指令

```text
Review this change against:
- AGENTS.md
- the active task document
- docs/06-functional-spec.md
- docs/14-security-privacy.md
- docs/15-test-and-acceptance.md

Prioritize:
1. cross-workspace data exposure
2. fabricated success states
3. state-machine violations
4. AI output validation gaps
5. retry/idempotency bugs
6. content or secrets in logs
7. arbitrary code or unsafe HTML
8. missing failure/recovery UX
9. tests that do not prove behavior
10. scope expansion

Report findings by severity with file and line references. Do not modify code during review.
```

## 10. 规格冲突处理

优先级：

1. Product invariants in `AGENTS.md`;
2. Security/privacy;
3. Functional requirements with IDs;
4. Task acceptance;
5. Architecture;
6. UX details;
7. Examples.

若仍冲突：

- 选择更安全、范围更小的实现；
- 写 ADR 或 issue；
- 不静默发明产品行为。

## 11. Codex Skills

本包提供：

- `plan-vertical-slice`；
- `implement-vertical-slice`；
- `review-product-requirements`；
- `verify-release`。

Skill 应保持一项职责。若 Codex 重复犯同一错误两次，先做 retrospective，再决定更新 `AGENTS.md`、任务模板或 Skill。

## 12. 首批指令

见 `prompts/`：

- `00-bootstrap.md`；
- `01-auth-onboarding.md`；
- `02-materials.md`；
- `03-assets.md`；
- `04-profile-columns.md`；
- `05-topics.md`；
- `06-content-run.md`；
- `07-content-pack.md`；
- `08-review.md`；
- `09-artifacts.md`；
- `10-export.md`；
- `11-release-hardening.md`。

这些是启动指令，不替代规格。

## 13. Codex 不应做的事

- 一次性实现全部 MVP；
- 未读任务就自行选库；
- 为“未来扩展”引入微服务；
- 用 Prompt 代替权限和状态机；
- 在客户端调用 OpenAI；
- 通过 `eval` 实现 artifact；
- 把 provider raw output 直接入 UI；
- 跳过 migration/test；
- 伪造通过结果；
- 自动发布；
- 写一套与 OpenAPI 不一致的内部 API；
- 把“待办”当完成功能。
