# E05 AI 选题会

## 规划指令

```text
使用 $review-product-requirements 和 $plan-vertical-slice，为 tasks/E05-topic-meeting.md 的最小尚未完成切片制定计划。

重点核对 FR-TOP-001~007、topic-candidate schema、P-007/P-008、六维评分、historical similarity、evidence score cap、topic feedback 和 idempotent select。

计划必须把 retrieval、structured generation、deterministic filter、semantic dedupe、Sol editorial rank、overall formula、候选 UI 和创建 run draft 分开。少于 3 个独特候选时解释不足，不能复制凑数。所有 context 使用固定 snapshot 和 workspace/privacy scope。

不抓热点，不自动选择，不生成正文。规划后停下。
```

## 实施指令

```text
使用 $implement-vertical-slice 实施已接受的 E05 切片。模型提供分项建议，overall 由版本化确定性公式复算。候选 evidence ID 必须验证存在且属于 snapshot。

运行 E2E-004、候选数量不足、去重、评分、相似度、反馈、并发选择、privacy/eval 和全库检查，再使用 $verify-release。不要开始 E06。
```
