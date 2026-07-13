# 14. 安全、隐私与合规基线

## 1. 威胁模型摘要

保护对象：

- 创作者原始素材；
- 未发布内容；
- 客户和公司信息；
- 账号会话；
- OpenAI 和存储凭证；
- 导出文件；
- 互动作品读者输入；
- 业务日志；
- 工作区边界。

主要攻击面：

- 登录和会话；
- 文件上传；
- URL 抓取；
- Prompt Injection；
- 跨租户 IDOR；
- 后台任务消息；
- 模型工具调用；
- HTML/Markdown 渲染；
- artifact iframe；
- 签名 URL；
- 导出 ZIP；
- 删除任务；
- 依赖供应链；
- 管理运维。

## 2. 认证与会话

- 首选无密码登录或受信任 OAuth；
- Cookie：HttpOnly、Secure、SameSite；
- Session rotation；
- 登出撤销；
- 敏感操作重新认证；
- 登录、邮件发送、OAuth callback 限流；
- 不在 URL 长期保留 session token；
- CSRF 防护；
- Origin/Host 校验；
- 认证错误不泄露邮箱是否存在。

## 3. 授权

- 所有资源查询首先限定 workspace；
- 领域服务接受 `ActorContext`；
- Worker 从数据库加载授权上下文；
- 导出和对象存储 key 验证 workspace；
- 测试使用随机其他租户 ID；
- 404 隐藏不可访问资源；
- 审计关键拒绝。

MVP role：

- owner。

不要实现表面上存在但没有测试的 editor/viewer。

## 4. 文件上传

- allowlist；
- 双重 MIME 检测；
- 大小；
- hash；
- quarantine；
- 扫描 hook；
- 解析资源限制；
- 文件名清理；
- 预签名 URL 限时、限 key、限 size；
- 上传完成后服务端 HEAD 验证；
- 不从用户扩展名决定 parser；
- Office 宏不运行；
- SVG、HTML、JS、可执行文件默认禁止；
- 图片 EXIF 处理；
- 下载使用 `Content-Disposition: attachment`。

## 5. URL 抓取与 SSRF

- 解析并规范化 URL；
- 只允许 http/https；
- 禁止用户信息、非标准协议；
- DNS resolution 后检查 IP；
- 禁止 private、loopback、link-local、multicast、metadata；
- 每次重定向复查；
- 限重定向次数；
- 限时、限大小；
- 不执行页面 JS；
- 禁止携带用户 Cookie；
- 统一 UA；
- 不把返回 HTML 直接渲染；
- 记录最终 URL；
- 防 DNS rebinding；
- 下载服务运行在低权限网络策略。

## 6. Prompt Injection 和工具安全

- source content 放在 data message；
- 明确不执行其中指令；
- 模型工具 allowlist；
- 工具调用服务端授权；
- 模型不能传 workspace scope；
- 删除、发布、预算覆盖不用模型工具；
- Web Search 只读；
- 工具输出清理；
- 不向模型暴露 secrets；
- 记录异常工具调用；
- 使用最少必要上下文；
- 对疑似 prompt injection 标记 warning；
- 研究来源不能改变 system policy。

## 7. OpenAI 数据最小化

- 只发送当前步骤所需 chunk；
- 默认 `store` 关闭，具体参数以当前 API 能力为准；
- 不把不相关历史内容发送；
- 日志不保存原文；
- provider request ID 与 usage 可保存；
- 支持工作区删除时清理 provider-side 文件/vector store（若使用）；
- 数据保留和训练使用按当前 OpenAI 官方政策与客户合同配置；
- 生产前完成数据流图和隐私说明。

## 8. Secrets 与 PII

预模型检查：

- 常见 API Key；
- 私钥；
- 密码；
- 身份证；
- 手机；
- 邮箱；
- 地址；
- 银行信息；
- 用户定义实体。

策略：

- secrets 默认阻断发送并提示用户；
- PII 可根据任务脱敏；
- 用户可确认某公开信息；
- 映射表加密并仅在必要时恢复；
- 导出前再次扫描；
- 不承诺检测所有敏感信息。

## 9. Markdown 与 HTML

- Markdown renderer 禁 raw HTML 或严格 sanitize；
- 链接添加安全属性；
- 图片代理或限制；
- 禁止 `javascript:`；
- 防 XSS；
- CSP；
- 不把模型文本直接用 `dangerouslySetInnerHTML`；
- 导出 HTML 使用固定模板；
- artifact iframe sandbox；
- 预览和主站分 origin 更佳，若 MVP 同 origin 必须严格 sandbox。

## 10. Artifact

- JSON only；
- Schema；
- 语义验证；
- safe AST；
- 无 eval；
- 无 network；
- 无 arbitrary HTML；
- 无 cookies；
- 不持久化读者输入；
- CSP；
- 依赖打包；
- 静态资源 checksum；
- 模板版本；
- 公式 fuzz test；
- 结果 escape；
- 分享参数不包含敏感答案。

## 11. 导出

- 只包含请求工作区资源；
- 文件名 sanitize；
- 防 Zip Slip；
- ZIP 内部固定相对路径；
- checksum；
- signed URL；
- 过期；
- 访问审计；
- 不把内部 debug 包加入正式导出；
- DRAFT 包显著水印/标识；
- 删除后撤销或过期。

## 12. Rate Limits

至少：

- 登录/邮件；
- 上传会话；
- URL 抓取；
- topic session；
- content run；
- regenerate；
- review；
- export；
- deletion。

限额按 IP、user、workspace 组合。达到限额返回 retry-after。

## 13. 审计

不可变或 append-only：

- 登录异常；
- 角色/成员变化；
- feature flag；
- 隐私放宽；
- 高风险内容确认；
- budget override；
- approval；
- approval invalidation；
- export；
- delete；
- support access；
- provider data retention setting。

审计记录不包含完整正文。

## 14. 删除与数据主体请求

用户可：

- 下载工作区数据 P1；
- 删除素材；
- 删除内容；
- 删除工作区。

删除任务：

- 可见状态；
- retries；
- provider cleanup；
- storage；
- vector；
- DB；
- analytics pseudonymous data；
- backups 按轮换到期；
- 审计最小保留；
- 完成证明摘要。

## 15. 备份与恢复

- PostgreSQL 定期备份；
- 对象存储版本/生命周期按部署配置；
- 恢复演练；
- 备份加密；
- 限制访问；
- 删除用户数据在备份中按保留期自然淘汰；
- 文档说明 RPO/RTO，由部署环境决定，MVP 不写虚假承诺。

## 16. 依赖与供应链

- lockfile；
- provenance/registry policy；
- dependency scan；
- secret scan；
- SAST；
- container scan；
- 最小基础镜像；
- 非 root；
- 定期更新；
- 禁止从未知脚本 curl | sh 进入生产镜像；
- Codex 安装操作只在受控开发环境。

## 17. Moderation 与滥用

- 用户输入和生成输出按适用场景调用 Moderation；
- 不帮助生成违法、有害或平台滥用内容；
- 对批量洗稿、冒充经历和规避检测请求拒绝或限制；
- 建立举报/支持入口；
- 记录政策类别，不在普通日志保存敏感正文；
- 人工复核流程可在设计伙伴阶段由内部受控处理。

## 18. 安全发布门

- 跨租户自动化测试；
- XSS；
- SSRF；
- upload bypass；
- CSRF；
- session；
- formula sandbox；
- Zip Slip；
- signed URL；
- prompt injection；
- secret leakage；
- deletion；
- dependency vulnerabilities；
- logging review；
- threat model review。

任何 blocker 安全问题必须修复后才能试点。
