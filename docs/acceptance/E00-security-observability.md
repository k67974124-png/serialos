# E00 安全与可观测边界

## 结构化日志字段

普通应用日志是换行分隔 JSON。稳定字段为 `event`、`time`、`level`，关联字段仅允许 `requestId`、`traceId`、`jobId`、`providerRequestId`、`workspaceId`，结果字段可使用 `result` 和 `durationMs`。UUID、标识符、非负时长及 E00 稳定结果/错误码允许列表均在运行时校验；未知字段或不合规值直接丢弃。在交给 Pino 前必须递归脱敏；不得记录 Authorization、Cookie、API key、access token、签名 URL、素材原文、标准化正文、转写、Prompt、邮件正文、采访回答、异常 stack 或异常原始 message。敏感键匹配先忽略大小写和分隔符，再覆盖 provider/服务前缀后的 `apiKey`、`secretKey`、`secretAccessKey`、token、password、cookie 和 signed URL 后缀；`content`、`material`、`transcription` 等原始内容键始终拒绝。不可枚举的未知对象替换为固定占位符，不能令 logger 崩溃或回退到原值。

新 outbox/job 同时持久化 request ID 与 trace ID。Worker 只能记录这些关联 ID、状态和安全错误码，不记录 job payload；未注册 job type 进入 dead letter，不伪装成功。

## 审计字段

审计事件只追加以下字段：`id`、`workspaceId`、`actorUserId`、`actorType`、`action`、`resourceType`、`resourceId`、`beforeSummary`、`afterSummary`、`requestId`、`createdAt`。Summary 只能保存有界的状态摘要和变化字段名，敏感正文键与长文本会在应用边界被拒绝。应用端口只暴露 `append`，数据库触发器拒绝 UPDATE 和 DELETE。

## HTTP 与 CSRF 边界

E00 只公开 GET health 路由，没有状态变更业务路由。全站应用 CSP、frame、MIME sniffing、referrer、permissions 和 cross-origin 基础 headers；health 响应不可缓存。后续 Epic 增加任何 POST、PUT、PATCH 或 DELETE 路由时，必须在处理业务输入前调用同源 Origin 校验，并配合 `SameSite` 会话 Cookie；缺失或跨源 Origin 必须 fail closed。

## 本地限流与私有文件

E00 的 `InMemoryRateLimiter` 是可由 deterministic Clock 测试的单进程基元，不代表多实例生产限流。调用方只能使用不含 PII 的 opaque key。私有对象始终限定在 `workspaces/{workspaceId}/...`，签名读 URL 最长 900 秒；日志处理器会删除完整签名 URL。
