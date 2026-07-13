# E09 安全互动作品

## 规划指令

```text
使用 $review-product-requirements 和 $plan-vertical-slice，为 tasks/E09-interactive-artifacts.md 的最小尚未完成切片制定计划。

重点核对 FR-ART-001~007、interactive-artifact schema、calculator/quiz/checklist、formula DSL、renderer isolation、CSP/iframe、static build、a11y、artifact security tests 和批准失效。

计划必须明确禁止 eval/new Function/动态 import/任意 HTML JS/外部网络。模型只生成 JSON spec；server schema + semantic validator；formula parser 有 AST、复杂度上限、fuzz；preview postMessage 校验；ZIP 防 traversal。

不实现账号、支付、外部 API、公共托管或敏感信息收集。规划后停下。
```

## 实施指令

```text
使用 $implement-vertical-slice 实施已接受的 E09 切片。先建立版本化 template registry 和共享验证，再逐个完成 calculator、quiz、checklist。任何 unknown field 或 code-like payload 必须失败关闭。

运行 E2E-010、schema mutation、formula property/fuzz、XSS/CSP/iframe、no-network、ZIP、a11y、deterministic build 和全库检查，再使用 $verify-release。不要开始范围外模板。
```
