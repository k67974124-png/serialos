# E09 安全互动作品

状态：`not_started`  
依赖：E08 accepted  
关联需求：FR-ART-001、FR-ART-002、FR-ART-003、FR-ART-004、FR-ART-005、FR-ART-006、FR-ART-007、FR-CLAIM-007

## 1. 用户结果

用户可以从内容主题生成一个可编辑、可预览、可测试、可导出的计算器、测试或清单。作品通过严格 JSON Schema 和安全渲染器构建，不执行模型生成的任意 JavaScript，也不收集超出产品说明的数据。

## 2. 输入文档

- `docs/04-user-flows.md`：F-008
- `docs/05-information-architecture.md`：P-012
- `docs/06-functional-spec.md`：J
- `docs/08-content-quality-and-safety.md`
- `docs/11-system-architecture.md`：Artifact Engine
- `docs/12-ux-ui-spec.md`
- `docs/14-security-privacy.md`
- `docs/15-test-and-acceptance.md`：E2E-010、Artifact Security Tests
- `schemas/interactive-artifact.schema.json`

## 3. 范围

### 包含

- calculator、quiz、checklist 三类；
- template registry/version；
- artifact brief/spec generation；
- schema + semantic validation；
- constrained formula DSL；
- safe renderer；
- editor、preview、sample data、validation；
- static export bundle；
- a11y、responsive、CSP、fuzz/security tests；
- artifact version 与批准失效关联。

### 不包含

- 任意 HTML/JS/CSS 生成并执行；
- server-side user code；
- 外部 API 调用；
- 用户账号、支付、数据库写入；
- 收集姓名、邮箱、手机号或敏感健康数据；
- 自动托管公共域名；
- 复杂数据可视化编辑器；
- multiplayer 或评论。

## 4. 安全模型

- 模型只生成 JSON spec；
- spec 先做 JSON Schema validation，再做 semantic validation；
- renderer 由仓库内审计过的组件组成；
- formula 使用 parser + AST + allowlist，不用 `eval`、`Function`、动态 import；
- 无网络能力；
- preview iframe 使用最小 sandbox；
- 文本 escape，URL allowlist；
- 资源预算限制字段数、选项数、公式深度、文本长度和结果数量；
- analytics 默认仅匿名事件且需宿主明确开启。

## 5. 垂直切片

### E09-S01 Template registry 与合同

验收：

- template type/version 不可变；
- schema 由 `interactive-artifact.schema.json` 生成/校验共享类型；
- server 和 renderer 校验使用同一 source；
- unsupported version 明确失败；
- migrations 可升级旧 spec 但保留原版；
- feature flag 控制模板；
- 示例 fixtures 无任意代码。

### E09-S02 Calculator DSL

能力：数值、布尔、枚举输入；加减乘除、min/max、round、clamp、条件；格式化百分比/货币/时长。

验收：

- tokenizer/parser/AST/evaluator 自实现或采用安全库并 ADR；
- 无属性访问、函数注入、循环、递归、网络、日期执行；
- division by zero、NaN、overflow、missing input 有确定行为；
- formula complexity 上限；
- fuzz/property tests；
- 示例 AI 时间回报率计算器正确。

### E09-S03 Quiz renderer

验收：

- single/multi select；
- 每题和选项稳定 ID；
- weighted score 与结果区间；
- 无重叠/空洞区间 validator；
- 可选解释和下一步；
- 不把结果描述成医疗/法律诊断；
- keyboard、screen reader、progress；
- reset 不泄漏上次状态。

### E09-S04 Checklist renderer

验收：

- sections/items、required、optional note、progress；
- 状态默认仅 local browser，除非宿主显式保存；
- print/export summary；
- 清除状态；
- 大清单性能限制；
- 键盘和可访问 label；
- 不收集自由文本 PII 作为 MVP 默认。

### E09-S05 AI spec 生成与编辑器

验收：

- 使用 content brief/evidence，不含无来源事实；
- 模型选择三种模板之一并说明为何；
- invalid spec repair 一次；
- semantic errors 显示到字段；
- 表单化编辑器，不提供 raw executable code；
- preview 使用 sample values；
- 用户修改产生 version；
- 作品状态 draft/valid/invalid/reviewed/approved_snapshot。

### E09-S06 Preview 隔离与构建

验收：

- iframe sandbox 不允许 same-origin + scripts 的危险组合，具体策略 ADR；
- CSP 阻止 network、object、frame ancestors（导出时按宿主配置）；
- postMessage 验证 origin/schema；
- build deterministic，输出 manifest/hash；
- 禁止外部字体/脚本默认加载；
- ZIP 中含静态文件、README、license/attribution 信息；
- 文件名和文本转义；
- 构建失败可诊断重试。

### E09-S07 审核与批准联动

验收：

- artifact 文案/数据声明进入 claim review；
- invalid/unsafe spec 是 blocker；
- 已批准内容绑定 artifact version；
- artifact 修改使 approval invalid；
- 无 artifact 的内容仍可批准；
- 导出只使用有效批准 artifact build；
- audit 包含 spec/build hash。

## 6. API 与事件

- `GET /content-runs/{id}/artifact`；
- `POST /content-runs/{id}/artifact/generate`；
- `PATCH /artifacts/{id}`；
- `POST /artifacts/{id}/build`；
- `GET /jobs/{id}`。

事件：`artifact.generation_requested`、`artifact.spec_generated`、`artifact.validated`、`artifact.updated`、`artifact.build_requested`、`artifact.built`、`artifact.build_failed`、`approval.invalidated`。

## 7. 异常与攻击面

- nested expression bomb；
- huge option arrays；
- HTML/JS in labels；
- malicious URLs；
- prototype pollution keys；
- NaN/infinity；
- postMessage spoof；
- stale build after edit；
- model emits unknown fields/code；
- ZIP path traversal；
- browser storage collision；
- analytics covert PII。

## 8. 自动化验收

- E2E-010 三类模板至少各一条；
- JSON schema mutation；
- formula unit/property/fuzz；
- XSS payload corpus；
- CSP and iframe integration；
- ZIP traversal test；
- no-network browser assertion；
- WCAG scan + keyboard flow；
- deterministic build hash；
- artifact change invalidates approval。

## 9. 完成门

- 仓库中不存在 artifact `eval`/`new Function`/动态代码路径；
- 模型输出无法绕过 server validation；
- 三类模板在 390 px 和桌面可用；
- static bundle 离线运行；
- 作品和内容共享同一审核/批准边界。
