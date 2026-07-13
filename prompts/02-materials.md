# E02 素材收件箱

## 规划指令

```text
使用 $review-product-requirements 和 $plan-vertical-slice，为 tasks/E02-material-inbox.md 的最小尚未完成切片制定计划。

先实现顺序：文本 -> 预签名文件 -> 音频/文档/图片 -> URL -> 评论 -> 删除影响。重点核对 FR-MAT-001~010、P-003/P-004、upload tests、SSRF tests、object storage 和 material 状态机。

计划必须写明 MIME/magic-byte/size 校验、immutable original、normalized versions、hash/duplicate UX、job checkpoints、late-result guard、signed URL、parser isolation、SSRF 每次重定向验证、CSV partial success、删除依赖和日志脱敏。

此 Epic 不生成观点资产、不做 embeddings、不声称转写已完成。规划后停下。
```

## 实施指令

```text
使用 $implement-vertical-slice 实施已接受的 E02 切片。所有文件和 URL 按默认拒绝策略处理。不要直接渲染导入 HTML，不在日志写原文。状态必须来自持久化 job，不用假进度。

完成后运行 upload/SSRF/security/integration/E2E 检查和全库验证，使用 $verify-release。不要开始 E03。
```
