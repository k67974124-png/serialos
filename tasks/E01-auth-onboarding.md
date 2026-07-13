# E01 认证、工作区与首次引导

状态：`not_started`  
依赖：E00 accepted  
关联需求：FR-AUTH-001、FR-AUTH-002、FR-AUTH-003、FR-AUTH-004、FR-ONB-001、FR-ONB-002、FR-ONB-003、FR-ONB-004、FR-ONB-005、FR-COL-001、FR-COL-002

## 1. 用户结果

一位新用户能够安全登录，创建自己的工作区，分步保存创作者画像，建立至少一个栏目并进入“今日”页。刷新、返回和重新登录不会丢失进度；任何跨工作区访问都失败且不泄露资源是否存在。

## 2. 输入文档

- `docs/02-personas-and-jtbd.md`
- `docs/04-user-flows.md`：F-001
- `docs/05-information-architecture.md`：P-001、P-002、P-015
- `docs/06-functional-spec.md`：A、B、E
- `docs/09-data-model.md`
- `docs/10-api-contracts.md`
- `docs/12-ux-ui-spec.md`
- `docs/14-security-privacy.md`
- `docs/15-test-and-acceptance.md`：E2E-001、E2E-013、E2E-016

## 3. 范围

### 包含

- 默认邮箱魔法链接认证；
- session 创建、轮换、过期和退出；
- 单用户单 owner 工作区模型；
- 首次引导 6 步、autosave、resume；
- creator profile 草稿与显式确认字段；
- 首个栏目创建、编辑和归档；
- 今日页最小状态与下一步入口；
- 工作区设置和删除申请；
- workspace isolation、audit、rate limit、CSRF；
- 认证与引导的 loading/empty/error/retry。

### 不包含

- 团队邀请、角色权限、SSO；
- 付费订阅；
- AI 画像建议的真实生成，留到 E04；
- 自动创建多个栏目；
- 外部社交平台 OAuth；
- 删除执行 Worker 的完整实现可在 E11 硬化，但本 Epic 必须有状态机和可测试 stub，不得假装已删除。

## 4. 关键状态

### Onboarding

`not_started -> in_progress -> completed`

- 每步保存为 draft；
- `completed` 必须有 active profile version；
- 至少一个 active column，或用户明确选择 postpone；
- 画像建议字段与用户确认字段必须分开；
- 完成后仍可在设置中编辑并产生新版本。

### Workspace deletion

`requested -> reauth_required -> queued -> deleting -> completed | failed`

删除请求进入 queued 之前不允许返回成功完成。删除期间禁止新 AI run 和上传。

## 5. 垂直切片

### E01-S01 登录与 session

用户输入邮箱，得到一次性链接，在同一浏览器完成登录。

验收：

- 链接单次使用、短期有效、hash 存储；
- 不论邮箱是否存在，请求登录的 UI 响应一致；
- 登录请求和验证均 rate limited；
- session cookie `HttpOnly`、`Secure`（生产）、合适 SameSite；
- session rotation、防 fixation、logout；
- 未登录访问受保护页跳转并保留安全 return path；
- 邮件服务失败显示可恢复状态而不泄露账户信息。

### E01-S02 工作区创建与隔离

验收：

- 第一次登录幂等创建或恢复 workspace setup；
- slug 唯一，冲突返回明确建议；
- owner membership 与 workspace 同事务创建；
- 每个 repository 查询必须显式 workspace scope；
- API、job、storage path、audit 都带 workspace ID；
- 跨租户集成测试覆盖 profile、column、job 和 settings。

### E01-S03 引导草稿

步骤：

1. 身份与定位；
2. 目标受众；
3. 内容目标；
4. 语气与边界；
5. 代表内容与可信度；
6. 栏目。

验收：

- 每步 blur/continue 自动保存并显示最后保存时间；
- 刷新、返回、切换步骤恢复；
- 网络失败保留本地未提交值并可重试；
- 字段校验可读，错误 summary 可键盘定位；
- 不将模型建议误显示为用户确认；
- 用户可跳过非必填字段，必须解释后果而非阻塞。

### E01-S04 栏目最小 CRUD

验收：

- 字段：name、promise、audience、topic boundaries、excluded topics、default formats、structure、cadence；
- 已被引用的栏目只可 archive；
- archive 后不出现在新建任务默认选择中；
- 空栏目时今日页给出明确行动；
- postpone 决策有持久提醒，可在设置关闭提醒但不伪造栏目。

### E01-S05 今日页与设置

今日页最小模块：

- 引导状态；
- 收件箱入口；
- 栏目缺失提醒；
- 尚无内容任务的空状态；
- 最近系统失败（此阶段可为空）；
- 隐私和删除入口。

验收：

- 完成引导后默认进入今日页；
- 不展示虚构数据或示例指标；
- 所有 CTA 路由正确；
- 移动 390 px 与桌面均可操作；
- 键盘完成关键流程。

### E01-S06 工作区删除请求

验收：

- 二次认证；
- 明确显示将删除的资源类别；
- 创建 deletion request 与 audit；
- queued 后锁定新写入；
- 当前 Epic 可由 deterministic worker 执行开发数据删除；生产级 provider cleanup 在 E11 完成；
- 失败保留可重试状态，不能提前注销为“完成”。

## 6. API 与数据

按 `contracts/openapi.yaml` 实现：

- `/auth/magic-links`、`/auth/magic-links/verify`、`/auth/session`、`/auth/logout`；
- `/workspaces`、`/workspace`、`/workspace/deletion`；
- `/onboarding`；
- `/creator-profile`、`/creator-profile/activate`；
- `/columns`、`/columns/{columnId}`、`/columns/{columnId}/archive`。

主要表：`users`、`auth_magic_links`、`user_sessions`、`workspaces`、`workspace_members`、`creator_profiles`、`creator_profile_versions`、`columns`、`onboarding_progress`、`deletion_requests`、`audit_logs`。认证成功后的 session cookie 由服务端设置，API 响应不得返回可持久化的明文 session token。

## 7. 异常与边界

- magic link 过期、已用、被撤销；
- 多标签页同时完成引导；
- workspace slug 冲突；
- autosave 乱序，旧响应不得覆盖新版本；
- 用户在删除队列中打开旧页面；
- session 过期时保留未保存表单；
- 两个工作区使用同一 object key 的隔离测试；
- owner 记录部分失败必须回滚。

## 8. 自动化验收

- E2E-001 首次引导；
- E2E-013 跨租户；
- 删除请求主路径和失败路径；
- session security integration；
- autosave race regression；
- WCAG critical flow scan；
- audit assertions。

## 9. 完成门

- 真实邮件开发流程可跑通；
- 所有页面含 loading/empty/error/success；
- 任何资源 URL 改 workspace 后均不可见；
- profile 和 column 版本可追溯；
- 没有 AI 建议伪装为用户确认；
- E00 全套命令继续通过。
