# E04 创作者画像与栏目

## 规划指令

```text
使用 $review-product-requirements 和 $plan-vertical-slice，为 tasks/E04-profile-columns.md 的最小尚未完成切片制定计划。

重点核对 creator-profile schema、FR-ONB-002~005、FR-COL-001~003、AI suggestion 与 user confirmation 分离、profile/column version、术语与敏感边界、栏目 seriality context。

计划必须说明 field-level evidence/confidence、少于 3 篇历史内容时的低置信度、diff/activate transaction、stale conflict、privacy filtering、prompt injection 防护、archive referenced column 和下游 snapshot。

不得自动激活画像，不做微调、自动排期、选题或发布。规划后停下。
```

## 实施指令

```text
使用 $implement-vertical-slice 实施已接受的 E04 切片。模型输出只保存为 suggestion；用户逐字段接受或编辑后才能激活。每次激活和栏目变化版本化并 audit。

运行 suggestion schema、version concurrency、privacy、terminology conflict、prompt-injection、a11y 和全库检查，使用 $verify-release。不要开始 E05。
```
