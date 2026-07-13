# E02 素材收件箱

状态：`not_started`  
依赖：E01 accepted  
关联需求：FR-MAT-001、FR-MAT-002、FR-MAT-003、FR-MAT-004、FR-MAT-005、FR-MAT-006、FR-MAT-007、FR-MAT-008、FR-MAT-009、FR-MAT-010

## 1. 用户结果

用户能把零散文字、文件、音频、图片、网页和评论批次放入一个可信收件箱，看到真实处理进度，修复失败，查看原文和版本，并在删除前理解影响。此 Epic 负责安全捕获和可恢复入库，AI 资产抽取在 E03 完成。

## 2. 输入文档

- `docs/04-user-flows.md`：F-002
- `docs/05-information-architecture.md`：P-003、P-004
- `docs/06-functional-spec.md`：C
- `docs/07-ai-pipeline.md`：素材标准化前段
- `docs/09-data-model.md`
- `docs/10-api-contracts.md`
- `docs/12-ux-ui-spec.md`
- `docs/14-security-privacy.md`
- `docs/15-test-and-acceptance.md`：Upload、SSRF、E2E-002/E2E-003 的捕获部分

## 3. 范围

### 包含

- 文本粘贴；
- 预签名文件上传；
- MP3/M4A/WAV/MP4 音频；
- PDF、DOCX、TXT、Markdown；
- JPG/PNG/WebP 图片；
- 安全 URL 抓取；
- 评论粘贴与 CSV；
- 收件箱列表、详情、筛选、状态时间线；
- original immutable object、normalized version skeleton；
- hash、文件元数据、重复提示；
- retry、archive、delete impact；
- 配额、MIME、大小、恶意文件和 SSRF 防护。

### 不包含

- 观点资产生成；
- embeddings、语义搜索；
- 最终音频转写和图像理解结果，E03 接管；
- 自动读取用户私有平台；
- 浏览器扩展；
- OCR 准确性承诺；
- 自动级联删除用户已确认资产。

## 4. 素材状态机

```text
uploaded -> processing
processing -> ready_for_enrichment | ready | needs_review | failed
ready_for_enrichment -> processing                 # E03 enrichment
ready | needs_review | failed -> processing        # explicit reprocess
uploaded | ready_for_enrichment | ready | needs_review | failed -> archived
任意未删除状态 -> deleting -> deleted
```

`material.status` 使用上述粗粒度生命周期；`material_processing_steps` 保存 `uploading`、`validating`、`normalizing`、`transcribing`、`embedding`、`extracting_assets` 等详细阶段、attempt 和错误。失败是否可重试由错误分类记录，不拆成两种顶层状态。

- 状态只能由合法命令迁移；
- 每步记录时间、attempt、error code、retryable 和用户可读消息；
- 刷新后状态从服务端恢复；
- late worker result 不得复活已删除/取消素材。

## 5. 垂直切片

### E02-S01 文本素材

验收：

- 支持 title、body、source type、privacy、tags、是否本人经历；
- body 最大 100,000 字符，服务端二次校验；
- 创建请求支持 idempotency key；
- original 与 normalized v1 分开保存；
- SHA-256 和 normalized hash；
- 重复时显示可能重复项，允许保留或取消，不静默合并；
- 列表和详情可见，失败可重试。

### E02-S02 文件与预签名上传

流程：create upload session -> direct upload -> complete -> server verify -> queue.

验收：

- key 包含 workspace 和随机 ID，不使用原文件名；
- 签名短期有效、限定 content length/type；
- complete 时由服务端读取真实 magic bytes 与大小；
- 未完成上传自动过期清理；
- 超限、类型伪装、零字节、hash mismatch 有稳定错误；
- 私有文件仅通过短期 signed URL 访问；
- 多段上传若实现，必须可取消和清理。

### E02-S03 音频、文档与图片捕获

验收：

- 保存媒体时长/页数/尺寸等可获得元数据；
- 上传后完成安全校验和基础标准化；需要 E03 转写/理解的素材进入 `ready_for_enrichment`，不伪装已转写；
- parser/decoder 错误可读且不泄露内部路径；
- password-protected PDF/DOCX 标记为需用户处理；
- 图片提取文本是可编辑版本，不覆盖 original；
- 扫描和解析在 worker 隔离进程/受限资源中执行。

### E02-S04 URL 安全抓取

验收：

- 仅 http/https；
- DNS 解析前后均阻断 localhost、私网、link-local、云 metadata、非标准协议；
- 每次重定向重新验证，限制次数；
- 限制 body、timeout、content type；
- HTML sanitizer 移除 script、iframe、event handler 和危险 URL；
- 保存 requested/final URL、抓取时间、title、publisher、canonical（若可信）；
- robots/访问失败时显示原因，不绕过认证和 paywall；
- SSRF 测试覆盖 IPv4、IPv6、DNS rebinding 表征、encoded addresses。

### E02-S05 评论批次

验收：

- 支持粘贴和 CSV mapping preview；
- 必填正文，可选匿名作者键、平台、日期、互动数；
- 不默认保留邮箱、手机号、私信 ID 等个人信息；
- 行级错误不阻断所有有效行，用户可下载错误报告；
- 批次和单条评论可追踪；
- hash 去重可见；
- 大批次使用 job 并显示进度。

### E02-S06 收件箱列表与详情

列表支持：类型、状态、日期、标签、隐私、重复、失败筛选。

详情包含：

- original metadata；
- normalized versions；
- processing timeline；
- 重复候选；
- downstream dependencies；
- retry/archive/delete；
- 用户可编辑标题、标签、隐私、本人经历标记。

验收：

- 空态、首次上传、处理中、部分失败、终止失败均有明确 UI；
- 批量操作权限与确认正确；
- 列表分页/游标稳定；
- 轮询或实时更新不产生请求风暴；
- keyboard focus 与 screen-reader status 合理。

### E02-S07 删除影响与保留摘要

验收：

- 删除前列出引用该素材的资产、候选、内容和声明；
- 无依赖可直接进入异步删除；
- 有依赖时选择：取消、保留已确认摘要并断开原文、或允许的级联删除；
- 保留摘要必须去除 source excerpt 并标记 provenance degraded；
- 删除 object、derived files 和 DB 后记录 audit；
- 失败可重试，UI 不提前移除为已完成。

## 6. API 与事件

按 OpenAPI：

- `POST /materials/text`；
- `POST /materials/url`；
- `POST /materials/uploads`；
- `POST /materials/{id}/complete-upload`；
- `GET /materials`；
- `GET/PATCH/DELETE /materials/{id}`；
- `POST /materials/{id}/reprocess`。

主要事件：`material.created`、`upload.completed`、`material.validation_succeeded`、`material.normalization_requested`、`material.ready_for_enrichment`、`material.failed`、`material.deletion_requested`。

## 7. 数据

主要实体：material_items、material_versions、material_files、material_processing_steps、comment_batches、comments、duplicate_candidates、jobs、audit_events。Original object immutable；任何用户编辑生成新 normalized version，并通过 optimistic concurrency 防止覆盖。

## 8. 安全与隐私

- default-deny 文件类型；
- archive bomb、超大解压、parser timeout 防护；
- 文件名仅作显示且转义；
- HTML 不直接渲染；
- raw body 不进日志；
- URL fetch 使用受限 egress；
- 私密素材不进入公共缓存；
- 失败文件保持私有并按 retention 清理。

## 9. 自动化验收

- 文本创建到 ready_for_enrichment；
- 音频上传与真实 metadata；
- MIME spoof、oversize、expired signature；
- SSRF 测试矩阵；
- CSV 部分成功；
- duplicate 提示；
- worker crash/retry；
- delete impact 与 late result；
- cross-workspace file key；
- P-003/P-004 可访问性。

## 10. 完成门

- 所有支持类型可通过 UI 入库；
- 处理状态真实、可恢复；
- 任一失败有稳定 code 与用户动作；
- 原始对象不可编辑；
- 删除和重复不静默；
- E01 E2E 无回归；
- 未开始生成观点资产。
