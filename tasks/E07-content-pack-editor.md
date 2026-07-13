# E07 内容包生成与编辑器

状态：`not_started`  
依赖：E06 accepted  
关联需求：FR-CONT-001、FR-CONT-002、FR-CONT-003、FR-CONT-004、FR-CONT-005、FR-CONT-006、FR-CONT-007、FR-CONT-008、FR-CONT-009、FR-CONT-010、FR-RUN-002、FR-RUN-006、FR-OPS-001、FR-OPS-006

## 1. 用户结果

系统基于已确认上下文生成一套彼此协调但适合不同渠道的内容资产：母内容、视频脚本、图文卡片、短视频、短观点和拍摄清单。用户能逐项编辑、自动保存、查看版本、比较局部重生成结果，并随时知道段落用了哪些来源。

## 2. 输入文档

- `docs/04-user-flows.md`：F-006
- `docs/05-information-architecture.md`：P-011
- `docs/06-functional-spec.md`：H
- `docs/07-ai-pipeline.md`
- `docs/08-content-quality-and-safety.md`
- `docs/09-data-model.md`
- `docs/12-ux-ui-spec.md`
- `schemas/content-brief.schema.json`
- `schemas/content-pack.schema.json`

## 3. 范围

### 包含

- versioned content brief；
- 6 类文本内容资产 + shot list；
- staged/parallel generation；
- channel-specific adaptation；
- Markdown/plain structured editor；
- autosave、optimistic concurrency、version history；
- local regeneration with instruction + diff；
- source map；
- stale indicators；
- copy/export preview（正式导出 E10）；
- generation cost/status/error UI。

### 不包含

- 图片/视频文件生成；
- 数字人、配音、自动剪辑；
- 富 HTML 任意渲染；
- 直接发布；
- 质量批准，E08；
- 互动作品，E09；
- 仅把长文截短来冒充跨平台适配。

## 4. 标准内容包

至少支持：

1. `master_article`：800-2500 中文字可配置；
2. `video_script`：3-8 分钟，含 hook、段落、画面/演示提示、CTA；
3. `carousel`：6-10 页，每页 title/body/visual note；
4. `short_video_scripts`：默认 3 条，每条 hook/body/close/shot note；
5. `micro_posts`：默认 5 条，允许不同角度；
6. `shot_list`：镜头、屏幕录制、B-roll、字幕重点、依赖素材；
7. `interactive_artifact_placeholder`：仅 brief，E09 生成。

## 5. 垂直切片

### E07-S01 Content brief

验收：

- brief 包含 core claim、audience job、promise、evidence map、personal materials、counterpoints、limitations、structure、channel plans、CTA、forbidden claims；
- 输出符合 schema；
- 用户可编辑并确认；
- 修改 core claim/evidence 后下游生成标 stale；
- brief version 固定在每次 generation batch；
- 无关键 evidence 时不能进入生产，返回 E06。

### E07-S02 母内容生成

验收：

- 使用明确 source IDs，不允许凭空 personal story；
- opinion/fact/experience 在 internal source map 中有类型；
- 保留反例、边界和不确定性；
- 避免 banned phrases 和术语冲突；
- schema/length/section validator；
- model failure 可单步 retry；
- 生成结果先是 draft，不标 approved/published。

### E07-S03 渠道内容并行生成

验收：

- video、carousel、shorts、micro posts、shot list 可以依赖 approved brief 或母内容 draft snapshot；
- 每种格式独立 prompt/schema/version；
- 渠道目标不同，不能只做字符截断；
- 并行失败时展示 partial success，可只重试失败项；
- 子任务共享 budget 且 hard stop；
- 每项来源 map 可追踪；
- short scripts 之间需 angle diversity 检查。

### E07-S04 Studio 信息架构

布局：

- 左侧：内容资产导航与状态；
- 中间：编辑器/预览；
- 右侧：来源、版本、生成、后续 E08 审核面板；
- 顶部：run 状态、保存、预算、批准入口占位。

验收：

- URL 可直接打开指定 asset；
- loading/empty/generating/partial/failed/stale 清晰；
- 切换资产不丢草稿；
- 小屏转为 tabs/drawer；
- keyboard shortcuts 不覆盖浏览器关键行为；
- unsaved state 与 server saved state 明确。

### E07-S05 编辑、autosave 与版本

验收：

- Markdown/structured field 安全存储；
- debounce autosave，version/ETag 防乱序；
- 冲突时不静默覆盖，提供 compare/copy；
- 每次 AI 生成、用户显式保存、批准前 snapshot 形成版本；
- history 显示 actor、origin、time、reason；
- restore 创建新版本而非删除历史；
- 输入不执行 HTML/script。

### E07-S06 局部重生成

用户选择段落/卡片/脚本字段，输入方向，获得候选版本。

验收：

- 只发送必要上下文并带 source constraints；
- 不修改其他区域；
- 先展示 side-by-side diff，accept 后才写新版本；
- reject 保留反馈但不改正文；
- 新文本的 source map 重新生成；
- 不能借局部重生成绕过 forbidden claims 或个人经历规则；
- 支持 idempotency 与 cost preview。

### E07-S07 Source map 与 stale

验收：

- 段落/块关联 asset/source/claim candidate；
- 点击显示 excerpt 和位置；
- source 删除、privacy 变化、brief 更新时标 stale；
- stale 不自动删除用户编辑，要求重新审查；
- source map 本身不显示隐私素材给无权主体；
- orphan source 有修复入口。

## 6. API 与事件

- `GET /content-runs/{id}/brief`；
- `GET /content-runs/{id}/assets`；
- `GET/PATCH /content-assets/{id}`；
- `POST /content-assets/{id}/regenerate`；
- `GET /jobs/{id}`。

事件：`content_brief.generated`、`content_asset.generation_requested`、`content_asset.generated`、`content_asset.failed`、`content_asset.edited`、`content_asset.version_created`、`content_asset.regenerated`、`content_run.content_ready`。

## 7. 数据与并发

主要实体：content_briefs、content_brief_versions、content_assets、content_asset_versions、content_blocks、content_source_links、regeneration_requests、generation_batches、run_steps。所有编辑使用 version integer/ETag；AI job commit 前检查 snapshot/version。

## 8. 异常与边界

- 一个格式失败，其他成功；
- 用户编辑时 AI 晚到；
- source 失效；
- 生成超长/空文本/schema invalid；
- Markdown 注入；
- autosave offline/重连；
- two-tab conflict；
- budget 中断；
- 用户改变 brief；
- local regeneration selection 已变化。

## 9. 自动化验收

- E2E-006；
- partial generation/retry；
- autosave race；
- restore creates new version；
- local regen accept/reject；
- unchanged region hash；
- channel diversity checks；
- personal experience source constraint；
- stale source；
- editor XSS/security；
- responsive/a11y。

## 10. 完成门

- 完整包可生成且各渠道有独立结构；
- 每项内容可编辑、版本化和回溯；
- AI 晚到结果不能覆盖用户文本；
- 没有 arbitrary HTML；
- 仍为 draft，E08 未通过前不能批准或正式导出。
