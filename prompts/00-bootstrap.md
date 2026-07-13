# E00 工程基座

## 规划指令

```text
你是 SerialOS 的首席工程师。使用 $review-product-requirements 和 $plan-vertical-slice。

先阅读：
- AGENTS.md
- README.md
- PLANS.md
- tasks/README.md
- tasks/E00-foundation.md
- docs/00-project-charter.md
- docs/01-prd.md
- docs/03-scope-and-release-plan.md
- docs/09-data-model.md
- docs/11-system-architecture.md
- docs/14-security-privacy.md
- docs/15-test-and-acceptance.md
- contracts/openapi.yaml
- db/schema.sql
- schemas/

先检查规格是否矛盾，再为 E00-S01 至 E00-S08 形成分阶段执行计划。计划必须说明 monorepo 目录、依赖选择、migration、job/outbox、external ports/fakes、OpenAPI/schema validation、logging/redaction、CI、Docker Compose、测试和 ADR。

当前只规划 E00，不写业务代码，不实现可用登录、素材或 AI 产品能力。对当前版本依赖的选择可查官方文档，但网络保持最小范围。规划完成后停下。
```

## 实施指令

```text
使用 $implement-vertical-slice 按已接受的 E00 执行计划实现。一次完成一个 E00-Sxx，保持每步可构建。默认 CI 不调用 live OpenAI。任何架构偏离写 ADR。

完成 E00 后运行 tasks/E00-foundation.md 要求的全部命令，再使用 $verify-release 和 /review。输出实际命令结果、风险和任务状态。不要开始 E01。
```
