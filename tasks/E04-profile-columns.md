# E04 创作者画像与栏目完善

状态：`not_started`  
依赖：E03 accepted  
关联需求：FR-ONB-002、FR-ONB-003、FR-ONB-004、FR-ONB-005、FR-COL-001、FR-COL-002、FR-COL-003、FR-AI-006、FR-AI-008

## 1. 用户结果

用户能把已确认历史素材转化为一份“系统建议、本人确认”的创作者画像，管理术语、禁用表达、内容边界和栏目结构。后续选题与写作只能消费当前激活版本，任何模型建议都不能悄悄改变创作者立场。

## 2. 输入文档

- `docs/02-personas-and-jtbd.md`
- `docs/04-user-flows.md`：F-003
- `docs/05-information-architecture.md`：P-015
- `docs/06-functional-spec.md`：B、E
- `docs/07-ai-pipeline.md`
- `docs/08-content-quality-and-safety.md`
- `docs/09-data-model.md`
- `schemas/creator-profile.schema.json`

## 3. 范围

### 包含

- profile suggestion job；
- field-level evidence/confidence；
- draft、comparison、activation 和 version history；
- positioning、audiences、goals、voice、boundaries、credibility；
- preferred terms、banned phrases、sensitive topics、disclosure rules；
- column CRUD、history、archive；
- column promise、audience、topic scope、formats、structure、cadence；
- seriality context summary；
- settings UI 和测试。

### 不包含

- 画像自动激活；
- 模型微调或声音克隆；
- 多品牌/多人账号；
- 社交平台账号连接；
- 复杂品牌审批准则；
- 选题生成。

## 4. 画像版本规则

- `suggested`：模型输出，不能被下游当作确认；
- `draft`：用户正在编辑；
- `active`：用户明确激活；
- `superseded`：旧 active；
- 同一时刻仅一个 active；
- 激活是事务，记录 actor、time、source version；
- 删除来源不应篡改旧版本，但应标记 evidence availability。

## 5. 垂直切片

### E04-S01 画像建议生成

验收：

- 至少 3 个已处理历史内容时启用正常置信度；少于 3 个显示低置信度；
- 默认只使用 confirmed assets 和用户允许的 privacy；
- 每个建议字段列出 supporting asset IDs、反例/冲突、confidence；
- 无足够证据返回 unknown，不补齐漂亮答案；
- 输出符合 `creator-profile.schema.json`；
- 模型建议、prompt/schema/model/version 全记录；
- 重跑不覆盖用户 draft。

### E04-S02 Diff、编辑与激活

验收：

- 用户逐字段 accept/edit/ignore；
- suggestions 与 current active side-by-side；
- 可预览激活后变化；
- 必填字段校验；
- 激活使用 optimistic concurrency；
- 激活后下游 run snapshot 固定版本；
- 旧内容不会因画像更新自动改变；
- audit 完整。

### E04-S03 术语、禁用表达与边界

验收：

- preferred term 支持 canonical、aliases、usage note；
- banned phrase 支持 severity、replacement、reason；
- sensitive topic 支持禁止/需确认/可公开；
- disclosure rules 说明客户、雇主、金额、健康、法律等边界；
- 重复/冲突规则在保存时提示；
- 规则仅作为下游约束，不能改写历史素材；
- 导入恶意文本不得转化为系统指令。

### E04-S04 栏目完整 CRUD

验收：

- 栏目字段符合 FR-COL-002；
- structure template 采用数据结构而非任意可执行模板；
- cadence 支持 weekly/biweekly/monthly/custom label，不在 MVP 建自动排期；
- archive 不破坏既有 run；
- 复制栏目生成新 ID 与 draft；
- 栏目列表显示最近使用、内容数量、更新节奏和空状态；
- 只有 active 栏目可用于新任务。

### E04-S05 连载上下文

系统为每个栏目维护只读 summary：

- 已批准主题；
- 常用角度；
- 未回答问题；
- 可延展线索；
- 重复风险；
- 最近发布时间（手工记录亦可）。

验收：

- summary 来源于可追溯数据；
- 更新异步、可重建；
- 不能把未批准稿当已发布；
- 用户可查看来源和纠错；
- E05 使用固定 snapshot，避免运行中漂移。

## 6. API 与数据

- `GET/PATCH /creator-profile`；
- `POST /creator-profile/suggestions`；
- `POST /creator-profile/activate`；
- `GET/POST /columns`；
- `GET/PATCH/DELETE /columns/{columnId}`。

主要实体：creator_profiles、creator_profile_versions、profile_suggestions、profile_evidence、terminology_rules、content_boundaries、columns、column_versions、column_context_snapshots。

## 7. 异常与边界

- 两个标签页同时激活；
- 建议生成中用户修改画像；
- 证据被删除或 privacy 提高；
- 冲突观点；
- 输入资料不足；
- 无 active column；
- 被引用栏目归档；
- 术语互相循环替换；
- 模型把历史文章中的引用误判为本人语气。

## 8. 自动化验收

- suggestion schema 与 field evidence；
- 少于 3 篇低置信度；
- active version atomicity；
- stale version conflict；
- archive referenced column；
- terminology conflict；
- privacy filtering；
- prompt injection fixture；
- UI diff keyboard navigation；
- profile snapshot downstream test。

## 9. 完成门

- 模型不能自动激活画像；
- 用户能解释每个 AI 建议从哪里来；
- 画像、术语和栏目均版本化；
- E05 可读取稳定、完整、已确认的 context snapshot；
- 不引入排期或自动发布范围。
