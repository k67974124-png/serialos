# E06 制作任务与补充采访

## 规划指令

```text
使用 $review-product-requirements 和 $plan-vertical-slice，为 tasks/E06-content-run-interview.md 的最小尚未完成切片制定计划。

重点核对 FR-RUN-001~007、content run 状态机、snapshot、checkpoint、budget、interview questions/answers、pause/cancel/retry/resume、concurrency 和 E2E-005/014/015。

计划必须覆盖 input hash、late provider result、duplicate start、worker crash、hard/soft budget、0 问题路径、无法回答时缩小范围、回答是否进入长期资产的 opt-in、audio transcription failure 和 timeline UX。

不要生成完整内容包，不替用户回答，不自动保存采访为长期资产。规划后停下。
```

## 实施指令

```text
使用 $implement-vertical-slice 实施已接受的 E06 切片。状态只能通过 domain command 迁移。取消、恢复和预算逻辑在 API/UI 外仍须强制。步骤结果持久化且可重放。

运行 state-machine property、crash/retry/idempotency、budget、interview、audio provenance、E2E 和全库检查，再使用 $verify-release。不要开始 E07。
```
