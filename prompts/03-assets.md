# E03 AI 入库与观点资产

## 规划指令

```text
使用 $review-product-requirements 和 $plan-vertical-slice，为 tasks/E03-ai-ingestion-assets.md 中最小尚未完成切片制定计划。

重点核对 FR-AI-001~008、FR-OPS-001/002/006、AI pipeline、insight-asset schema、素材 provenance、privacy、eval 门槛。计划必须区分 normalization/transcription、chunking、embeddings、asset extraction、schema repair、semantic validation、confirmation/edit/merge 和 UI。

必须覆盖 provider 429/timeout/invalid schema、budget、cancel、material version change、deleted source、duplicate delivery、model/prompt/schema/usage ledger。personal_experience 只能来自显式或用户确认来源，0 资产是合法结果。

默认测试使用 deterministic fake，不访问 live API。规划后停下。
```

## 实施指令

```text
使用 $implement-vertical-slice 实施已接受的 E03 切片。业务层不得 import provider SDK。所有模型返回都经过 JSON Schema 与语义校验，非法 source ID 直接拒绝。用户确认版本不得被重新处理覆盖。

运行 schema mutation、provider error matrix、provenance、privacy、personal-experience eval、E2E-002/003 和全库检查，再使用 $verify-release。不要开始 E04。
```
