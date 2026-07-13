# E07 内容包生成与编辑器

## 规划指令

```text
使用 $review-product-requirements 和 $plan-vertical-slice，为 tasks/E07-content-pack-editor.md 的最小尚未完成切片制定计划。

重点核对 FR-CONT-001~010、content brief/content pack schema、P-011、parallel generation、channel adaptation、versioned editor、local regeneration、source map、stale 和 E2E-006。

计划必须说明 brief gate、每种内容独立 schema/prompt、partial success、budget、AI late result 不覆盖用户编辑、autosave concurrency、restore/new version、regen diff、source invalidation、Markdown/XSS 和 responsive/a11y。

不生成图片/视频文件，不自动发布，不把截短长文当多平台内容，不批准内容。规划后停下。
```

## 实施指令

```text
使用 $implement-vertical-slice 实施已接受的 E07 切片。所有内容资产默认 draft；每个 AI 输出和用户编辑版本化。局部重生成先显示 diff，接受后才落库，并重新建立 source map。

运行 E2E-006、partial failure、autosave race、two-tab conflict、regen unchanged-region、source stale、XSS/a11y 和全库检查，再使用 $verify-release。不要开始 E08。
```
