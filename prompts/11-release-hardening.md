# E11 设计伙伴发布硬化

## 规划指令

```text
使用 $review-product-requirements 和 $plan-vertical-slice，为 tasks/E11-release-hardening.md 制定发布硬化计划。先审计 E00-E10 的 accepted 证据和未解决风险，不新增产品功能。

计划必须覆盖 Golden Set/eval gate、cross-tenant/auth/upload/SSRF/XSS/artifact 安全、完整删除与 retention、provider outage/queue recovery、dead-letter replay、observability/alerts/runbooks、performance/a11y、backup/restore、migration rehearsal、feature flags 和 go/no-go。

逐项映射 docs/15-test-and-acceptance.md 的 E2E-001~016 与 release checklist。P0/P1、critical/high security、fabricated personal experience、unsupported fact、arbitrary artifact code、删除/恢复失败均为 no-go。

先规划并输出缺口，不通过补一堆新功能掩盖风险。规划后停下。
```

## 实施指令

```text
使用 $implement-vertical-slice 按已接受的 E11 计划逐项硬化。默认 offline CI，live provider smoke 仅在受控环境和预算下显式运行。每个故障修复必须有回归测试和 runbook 更新。

最后使用 $verify-release，对全部需求、E2E、eval、安全、性能、a11y、删除、backup/restore 和运维证据形成 go/no-go 报告。没有证据的检查写“未运行”，不得推测通过。
```
