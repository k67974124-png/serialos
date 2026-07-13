# 19. 官方实现资料核对说明

本项目开工包按照 2026-07-12 可查的 OpenAI 官方文档设计。实现前和升级模型时，Codex 应通过官方文档核对参数、可用模型与数据控制。

重点核对：

- Codex `AGENTS.md`：Codex 会在开始工作前读取仓库级指令，并支持目录层级覆盖。
- Codex Skills：仓库级 Skill 位于 `.agents/skills/*/SKILL.md`。
- Codex CLI：复杂任务先规划；`codex exec` 适合脚本化和 CI 任务。
- Codex 安全：默认使用 workspace sandbox、审批和受限网络，不使用 bypass 参数。
- GPT-5.6 模型：Sol、Terra、Luna 的能力定位和实际可用 ID。
- Responses API：文本、图像、工具和状态化调用。
- Structured Outputs：使用严格 JSON Schema。
- Function Calling：应用执行工具时由服务端校验。
- Web Search：通过 Responses API 工具启用，并保存来源。
- Speech-to-Text：文件上传转写。
- Embeddings：`text-embedding-3-small` 或经 ADR 选择的替代。
- Moderation：对适用输入和输出执行安全分类。
- Data Controls：核对生产项目的数据保留和训练使用设置。

实现时只信任 OpenAI 官方域名的当前文档，不从博客复制可能过期的参数。模型、价格、上下文长度和可用功能都应配置化，不写成不可变产品承诺。
