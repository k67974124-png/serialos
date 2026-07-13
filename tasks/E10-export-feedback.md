# E10 导出、发布记录与反馈回流

状态：`not_started`  
依赖：E08 accepted；artifact bundle 依赖 E09 accepted  
关联需求：FR-EXP-001、FR-EXP-002、FR-EXP-003、FR-EXP-004、FR-EXP-005、FR-EXP-006、FR-CLAIM-007、FR-OPS-004

## 1. 用户结果

用户可以把批准的内容包导出为可直接进入现有发布流程的 Markdown/JSON/ZIP，安全下载并记录自己发布到了哪里。之后手工录入表现数据或导入评论，让效果和受众问题回到内容系统，但系统绝不谎称替用户完成了发布。

## 2. 输入文档

- `docs/04-user-flows.md`：F-009、F-010
- `docs/05-information-architecture.md`：P-013、P-014
- `docs/06-functional-spec.md`：K
- `docs/09-data-model.md`
- `docs/10-api-contracts.md`
- `docs/12-ux-ui-spec.md`
- `docs/13-analytics-evals.md`
- `docs/14-security-privacy.md`
- `docs/15-test-and-acceptance.md`：E2E-011、012

## 3. 范围

### 包含

- export request/state；
- approved export 和 draft watermark export；
- Markdown、JSON、ZIP；
- artifact static bundle（E09 后）；
- manifest、source/quality report 可选；
- short-lived signed downloads；
- export center/history/expiry/retry；
- manual publishing records；
- manual metrics；
- comments re-import；
- content library filters；
- feedback links 与 analytics/audit。

### 不包含

- 公众号、小红书、抖音、视频号 API 自动发布；
- 平台 cookie 自动化；
- 自动抓取账号指标；
- 社交媒体账号凭证；
- 自动回复评论；
- 计费；
- 公共 CDN 托管 artifact。

## 4. 垂直切片

### E10-S01 导出权限与版本选择

验收：

- 默认只能导出最新有效批准 snapshot；
- 当前有未批准编辑时明确选择批准版或带水印草稿；
- blocker/stale review 不允许无水印正式导出；
- draft export 文件和 manifest 明显标记；
- 选择内容格式、渠道资产、是否含 source/quality report、artifact；
- 请求 idempotent；
- UI 不出现“已发布”。

### E10-S02 Export worker 与格式

ZIP 建议结构：

```text
serialos-export-{run}/
  manifest.json
  README.md
  content/master-article.md
  content/video-script.md
  content/carousel.json
  content/short-videos.md
  content/micro-posts.md
  content/shot-list.md
  review/quality-report.json
  sources/source-ledger.json   # 用户选择时
  artifact/                    # 有有效 build 时
```

验收：

- manifest 含 workspace/run/approval/version/hash/time/formats；
- Markdown UTF-8、稳定换行、无不安全 HTML；
- JSON 符合版本化 schema；
- deterministic ordering；
- ZIP 防 path traversal；
- worker crash 可恢复；
- 同 snapshot + options 可复用 hash 相同产物；
- draft watermark 不可被某一格式遗漏。

### E10-S03 下载与导出中心

验收：

- 短期 signed URL，不能猜测；
- 到期后重新签发而非重建；
- 下载、重试、删除有 audit；
- 状态 queued/building/ready/failed/expired/deleted；
- 文件大小与 expiry 可见；
- 跨 workspace 不可访问；
- 删除 export object 不删除内容；
- 大包有进度和失败原因。

### E10-S04 内容库

验收：

- 按栏目、状态、格式、日期、批准/发布、标签、标题搜索；
- 区分 draft、approved snapshot、exported、manually published；
- 进入 Studio 保留选定版本；
- 不把 export 当 publish；
- empty/no-results/error 状态；
- 分页稳定；
- 最近指标仅在用户录入时显示。

### E10-S05 手工发布记录

字段：platform、URL、published_at、asset/version、notes、optional platform content ID。

验收：

- URL 正规化和协议校验；
- 同平台/URL 重复提示；
- published_at 按 workspace timezone 输入、UTC 保存；
- 可编辑/删除并 audit；
- 发布记录不改变内容 approval；
- 内容库状态基于真实记录，不基于导出；
- 系统文案始终说明“由你记录”。

### E10-S06 表现数据

指标采用平台无关结构：views、impressions、reads、likes、comments、shares、saves、clicks、subscriptions、leads，允许 custom label/value。

验收：

- 每次录入有 as_of 时间和来源说明；
- 非负数、单位校验；
- 历史快照不覆盖；
- 不跨平台直接比较未归一指标；
- 展示趋势和原始值，不制造因果结论；
- 修正值有 audit；
- 无数据不显示虚构图表。

### E10-S07 评论反馈回流

验收：

- 从 publishing record 导入粘贴/CSV；
- 复用 E02 评论隐私和校验；
- 关联 content asset/version/platform；
- E03 可抽取 audience_question，但需按现有 pipeline 处理；
- 用户反馈与模型推断分开；
- 删除发布记录不自动删除评论素材；
- 重复评论提示；
- 后续选题可过滤“来自已发布内容反馈”。

## 5. API 与事件

- `GET/POST /exports`；
- `GET /exports/{id}`；
- `POST /content-assets/{id}/publishing-records`；
- `POST /publishing-records/{id}/metrics`；
- 评论导入复用 materials API 或补充合同后实现。

事件：`export.requested`、`export.completed`、`export.failed`、`export.downloaded`、`publishing_record.created`、`metrics.recorded`、`comments.imported`。

## 6. 数据

主要实体：exports、export_files、publishing_records、metric_snapshots、feedback_links、comment_batches、comments、audit_events。Export 永远引用 approval snapshot 或明确 draft version，不能引用“最新”浮动指针。

## 7. 异常与边界

- approval 在 export 运行中失效；
- artifact build 缺失；
- signed URL 到期；
- ZIP 超限；
- duplicate export request；
- download object 删除；
- invalid platform URL；
- metrics correction；
- comments CSV partial error；
- user deletes workspace/export；
- content edited after publishing record。

## 8. 自动化验收

- E2E-011 导出；
- E2E-012 反馈回流；
- approved vs draft watermark；
- export snapshot immutability；
- deterministic ZIP/manifest；
- signed URL expiry/cross-tenant；
- export retry idempotency；
- publish state truthfulness；
- metric history；
- comment-to-audience-question loop。

## 9. 完成门

- 用户可拿到完整、可辨版本的文件包；
- 系统从不把导出描述为发布；
- 正式导出只来自有效批准 snapshot；
- 发布和指标均有明确人工来源；
- 评论可回到既有素材/资产流程；
- 没有第三方平台凭证或自动化发布代码。
