# E08 声明账本、审校与批准

## 规划指令

```text
使用 $review-product-requirements 和 $plan-vertical-slice，为 tasks/E08-claims-review-approval.md 的最小尚未完成切片制定计划。

重点核对 FR-CLAIM-001~007、source-claim/review-result schema、claim taxonomy、support status、deterministic checks、Sol review、finding lifecycle、stale 和 immutable approval snapshot。

计划必须证明 blocker 在 domain/API/UI 都不能绕过，模型不能把 unsupported 升为 supported，warning risk acceptance 有 policy，内容/source/artifact 变化会失效批准，late review 不覆盖新版本。质量报告不得暴露 chain-of-thought。

不自动决定争议事实，不提供法律/医疗认证，不发布。规划后停下。
```

## 实施指令

```text
使用 $implement-vertical-slice 实施已接受的 E08 切片。先实现确定性规则和 claim integrity，再接模型审校。批准必须绑定不可变 hash/version snapshot。

运行 E2E-007/008/009、rule matrix、stale/concurrent approve、model support guard、moderation、eval 和全库检查，再使用 $verify-release。不要开始 E09/E10。
```
