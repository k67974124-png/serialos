# E01 认证、工作区与首次引导

## 规划指令

```text
使用 $review-product-requirements 和 $plan-vertical-slice，为 tasks/E01-auth-onboarding.md 中最小尚未完成切片制定计划。

重点核对：FR-AUTH-001~004、FR-ONB-001~005、栏目最小 CRUD、P-001/P-002/P-015、E2E-001/013/016、OpenAPI 和数据模型。

计划必须覆盖 session 安全、工作区创建幂等、所有查询的 workspace scope、autosave 乱序、profile suggestion 与 user confirmed 分离、栏目 postpone、删除状态真实、loading/empty/error/retry/a11y、audit 与 cross-tenant tests。

默认邮箱魔法链接。不要实现团队、计费、社交 OAuth、真实 AI 画像建议或后续素材功能。先规划，停下等待接受。
```

## 实施指令

```text
使用 $implement-vertical-slice 实施已接受的 E01 切片。严格遵循 OpenAPI；认证端点缺合同时先补合同。所有写操作做服务端校验、workspace scope、CSRF/rate limit 和 audit。不得把 queued deletion 显示为 completed。

运行相关 unit/integration/E2E/a11y，再运行全库检查并用 $verify-release。不要开始 E02。
```
