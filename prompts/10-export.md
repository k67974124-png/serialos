# E10 导出、发布记录与反馈

## 规划指令

```text
使用 $review-product-requirements 和 $plan-vertical-slice，为 tasks/E10-export-feedback.md 的最小尚未完成切片制定计划。

重点核对 FR-EXP-001~006、P-013/P-014、approval snapshot、draft watermark、Markdown/JSON/ZIP、signed URL、manual publishing record、metrics snapshots、comments feedback、E2E-011/012。

计划必须区分 approved export、draft export、exported、manually published。导出永远引用固定版本；approval 在构建中失效时定义行为；ZIP deterministic/path-safe；下载短期签名；指标有 as_of 和历史；评论复用素材隐私流程。

不接第三方发布 API，不保存平台 cookie，不自动抓指标或回复评论。规划后停下。
```

## 实施指令

```text
使用 $implement-vertical-slice 实施已接受的 E10 切片。所有 UI 和事件不得把导出称为发布。正式包只来自有效批准 snapshot；草稿每种格式都必须带水印/manifest 标记。

运行 E2E-011/012、snapshot immutability、ZIP hash/path、signed URL/cross-tenant、retry/idempotency、metrics history、comment feedback 和全库检查，再使用 $verify-release。不要添加自动发布。
```
