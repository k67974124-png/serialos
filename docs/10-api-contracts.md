# 10. API 合约与事件

机器可读草案见 `contracts/openapi.yaml`。本文件定义 API 设计原则和主要端点行为。

## 1. 约定

Base path：

```text
/api/v1
```

格式：

- JSON 请求与响应；
- 文件上传使用预签名 URL 或 multipart；
- 时间使用 ISO 8601 UTC；
- ID 为 UUID 字符串；
- 金额使用字符串小数或整数微单位，不用浮点；
- 列表使用 cursor pagination；
- 所有写入返回资源版本；
- 错误使用统一 envelope；
- 重要创建请求支持 `Idempotency-Key`；
- API 不暴露 provider 原始错误给用户。

## 2. 认证

Web 应用使用安全会话 Cookie。未来公开 API 可增加 bearer token，但不属于 P0。

匿名可访问端点仅包括：

- `POST /api/v1/auth/magic-links`；
- `POST /api/v1/auth/magic-links/verify`；
- `GET /health/live`；
- `GET /health/ready`。

`GET /api/v1/auth/session` 与 `POST /api/v1/auth/logout` 需要有效会话。除上述匿名端点和健康检查外，所有 `/api/v1` 端点都要求工作区上下文。工作区从会话和服务端路由解析，不信任请求 body 中的 `workspaceId`。

## 3. 统一错误

```json
{
  "error": {
    "code": "RUN_BUDGET_EXCEEDED",
    "message": "本次制作任务已达到预算上限。",
    "requestId": "req_...",
    "details": {
      "runId": "...",
      "current": "8.14",
      "limit": "8.00"
    },
    "retryable": false
  }
}
```

规则：

- `message` 为用户可读中文；
- `code` 稳定；
- `details` 不含敏感数据；
- `requestId` 可用于支持；
- validation error 返回字段路径；
- 不返回堆栈；
- 404 用于隐藏无权资源。

## 4. 分页

请求：

```text
?limit=30&cursor=<opaque>&sort=-createdAt
```

响应：

```json
{
  "data": [],
  "page": {
    "nextCursor": null,
    "hasMore": false
  }
}
```

`limit` 默认 30，最大 100。

## 5. 幂等

以下要求 `Idempotency-Key`：

- 创建工作区；
- 创建素材上传；
- 创建选题会；
- 创建制作任务；
- 恢复任务；
- 创建导出；
- 发起删除。

服务端保存 key、工作区、请求 hash 和响应引用。相同 key 不同 payload 返回 409。

## 6. 并发编辑

内容资产、画像、栏目和互动 spec 使用 `version`。

更新请求：

```json
{
  "version": 4,
  "patch": {}
}
```

版本不一致返回 409 `VERSION_CONFLICT`，并返回当前版本摘要。

## 7. 主要端点

## 7.1 Auth and Onboarding

### POST `/auth/magic-links`

请求邮箱魔法链接。无论账户是否存在，均返回一致的 `202`，并执行速率限制。

### POST `/auth/magic-links/verify`

消费一次性 token，创建或轮换安全会话 Cookie。token 只可使用一次。

### GET `/auth/session`

返回当前用户、当前工作区和会话摘要，不返回原始 session token。

### POST `/auth/logout`

吊销当前会话并清除 Cookie。

### GET `/onboarding`
### PATCH `/onboarding`

读取或幂等保存首次引导进度。更新采用 `version` 进行乐观并发，旧响应不得覆盖新草稿。

## 7.2 Workspaces

### POST `/workspaces`

创建工作区。

### GET `/workspace`

返回当前工作区和 feature flags。

### PATCH `/workspace`

更新名称、locale、timezone 等。

### POST `/workspace/deletion`

发起删除。

### GET `/workspace/deletion`

查看状态。

## 7.3 Creator Profile

### GET `/creator-profile`

当前 active 和 draft 建议。

### PATCH `/creator-profile`

更新草稿字段。

### POST `/creator-profile/suggestions`

异步生成画像建议，返回 job。

### POST `/creator-profile/activate`

用户确认并激活版本。

## 7.4 Columns

### GET `/columns`
### POST `/columns`
### GET `/columns/{columnId}`
### PATCH `/columns/{columnId}`
### POST `/columns/{columnId}/archive`

## 7.5 Materials

### POST `/materials/uploads`

创建上传会话：

```json
{
  "fileName": "voice.m4a",
  "mediaType": "audio/mp4",
  "sizeBytes": 12345,
  "sha256": "...",
  "privacyLevel": "internal_reference",
  "isPersonalExperience": true
}
```

返回素材 ID、object key 和预签名上传信息。

### POST `/materials/text`

创建文本素材。

### POST `/materials/url`

创建 URL 素材。URL 抓取由 Worker 执行。

### POST `/materials/comments`

创建评论批次。

### POST `/materials/{id}/complete-upload`

确认上传完成并入队。

### GET `/materials`
### GET `/materials/{id}`
### PATCH `/materials/{id}`

更新标题、标签、隐私等。

### POST `/materials/{id}/reprocess`

指定版本与步骤。

### POST `/materials/{id}/archive`
### DELETE `/materials/{id}`

删除请求必须包含策略：

```json
{
  "mode": "delete_with_derivatives",
  "version": 3
}
```

## 7.6 Insight Assets

### GET `/assets`

筛选和搜索。

### GET `/assets/{id}`
### PATCH `/assets/{id}`
### POST `/assets/{id}/confirm`
### POST `/assets/merge`
### POST `/assets/{id}/hide`
### GET `/assets/{id}/similar`

## 7.7 Topic Sessions

### POST `/topic-sessions`

```json
{
  "columnId": "...",
  "audienceId": "...",
  "materialDateRange": {
    "from": "2026-06-01T00:00:00Z",
    "to": "2026-07-12T23:59:59Z"
  },
  "preferUnusedAssets": true,
  "allowWebResearch": false,
  "formats": ["master_article", "video_script", "carousel"],
  "excludedTopics": []
}
```

返回 202 与 job。

### GET `/topic-sessions/{id}`
### GET `/topic-sessions/{id}/candidates`
### PATCH `/topic-candidates/{id}`
### POST `/topic-candidates/{id}/feedback`
### POST `/topic-candidates/{id}/select`
### POST `/topic-candidates/{id}/regenerate`

单项重生成有单独预算。

## 7.8 Content Runs

### POST `/content-runs`

从 selected topic 创建。

### GET `/content-runs`
### GET `/content-runs/{id}`
### GET `/content-runs/{id}/timeline`
### POST `/content-runs/{id}/start`
### POST `/content-runs/{id}/cancel`
### POST `/content-runs/{id}/retry`
### POST `/content-runs/{id}/resume`
### POST `/content-runs/{id}/approve-budget`

### GET `/content-runs/{id}/interview`
### POST `/content-runs/{id}/interview/answers`

批量保存回答。音频先创建素材。

## 7.9 Content Brief and Assets

### GET `/content-runs/{id}/brief`
### PATCH `/content-runs/{id}/brief`

用户编辑简报后，下游标记 stale。

### GET `/content-runs/{id}/assets`
### GET `/content-assets/{id}`
### PATCH `/content-assets/{id}`

保存新版本。

### POST `/content-assets/{id}/regenerate`

```json
{
  "version": 4,
  "selection": {
    "start": 120,
    "end": 430
  },
  "instruction": "缩短并保留案例，不新增事实。",
  "preserve": {
    "facts": true,
    "structure": false,
    "voice": true
  }
}
```

### POST `/content-assets/{id}/accept-regeneration`
### GET `/content-assets/{id}/versions`
### POST `/content-assets/{id}/save-insight`

## 7.10 Claims and Review

### GET `/content-runs/{id}/claims`
### PATCH `/claims/{id}`
### POST `/claims/{id}/sources`
### DELETE `/claims/{id}/sources/{sourceId}`

### POST `/content-runs/{id}/review`

创建或重跑质量检查。

### GET `/content-runs/{id}/review`
### PATCH `/review-findings/{id}`

warning 可 accepted_risk；blocker 请求被拒绝。

### POST `/content-runs/{id}/approve`

请求包含当前 version set checksum。返回 approval。

## 7.11 Artifacts

### GET `/content-runs/{id}/artifact`
### POST `/content-runs/{id}/artifact/generate`
### PATCH `/artifacts/{id}`
### POST `/artifacts/{id}/validate`
### POST `/artifacts/{id}/build`
### GET `/artifacts/{id}/preview-token`
### GET `/artifacts/{id}/builds`

## 7.12 Exports

### POST `/exports`

```json
{
  "contentRunId": "...",
  "format": "zip",
  "includeSources": true,
  "includeQualityReport": false,
  "includeArtifact": true,
  "draft": false
}
```

### GET `/exports`
### GET `/exports/{id}`
### POST `/exports/{id}/refresh-download`

## 7.13 Publishing and Metrics

### POST `/content-assets/{id}/publishing-records`
### GET `/content-assets/{id}/publishing-records`
### PATCH `/publishing-records/{id}`
### POST `/publishing-records/{id}/metrics`
### POST `/publishing-records/{id}/comments-import`

## 7.14 Usage and Audit

### GET `/usage/current`
### GET `/usage/by-run/{runId}`
### GET `/audit-logs`

审计列表仅 owner 可见。

## 7.15 Operations

### GET `/health/live`

仅验证进程存活，不访问数据库、队列、对象存储或模型服务。

### GET `/health/ready`

检查数据库、任务队列和对象存储的可用性，不调用任何付费模型。依赖不可用时返回 `503` 和去敏后的依赖状态。

### GET `/jobs/{id}`

返回工作区内任务的状态、进度、当前步骤、重试能力和资源链接。

Feature Flag 和 Prompt 版本在 MVP 中由受控配置与发布流程管理，不提供浏览器公开写接口；所有变更写审计日志。

## 8. 异步 Job 响应

```json
{
  "data": {
    "jobId": "...",
    "resourceId": "...",
    "status": "queued",
    "statusUrl": "/api/v1/jobs/..."
  }
}
```

### GET `/jobs/{id}`

返回：

- status；
- progress；
- currentStep；
- startedAt；
- updatedAt；
- retryable；
- userMessage；
- errorCode；
- resource links。

## 9. 内部领域事件

完整列表见 `contracts/events.md`。

关键事件：

- workspace.created；
- onboarding.completed；
- material.created；
- material.processing_requested；
- material.ready；
- material.failed；
- assets.extracted；
- profile.suggestion_ready；
- topic_session.requested；
- topic_session.completed；
- topic.selected；
- content_run.started；
- content_run.needs_input；
- content_run.step_completed；
- content_run.review_ready；
- content_run.approved；
- approval.invalidated；
- artifact.built；
- export.ready；
- publishing_record.created；
- metrics.recorded；
- workspace.deletion_requested；
- workspace.deleted。

事件至少包含 eventId、occurredAt、workspaceId、actor、aggregateId、version 和 payloadVersion。

## 10. Webhook

MVP 不提供外部 Webhook。内部事件在数据库事务中写 outbox，由 Worker 消费。未来开放 webhook 时不得直接复用内部事件 payload。

## 11. API 安全

- CSRF 防护；
- SameSite Cookie；
- Origin 校验；
- 请求体大小限制；
- 上传签名和对象 key 隔离；
- URL SSRF；
- 统一授权；
- 速率限制；
- 幂等；
- 审计；
- 输出编码；
- 不在 API 中回显 provider raw prompt。
