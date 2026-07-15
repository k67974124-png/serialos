# SerialOS

SerialOS 是面向中文知识型创作者的 AI 编辑操作系统。本仓库当前只完成 E00 工程基座：可重复安装的 TypeScript 单仓库、Web 与 Worker、PostgreSQL/pgvector、S3 兼容对象存储、持久任务、类型化合同、可观测与安全基线，以及默认离线的 CI。登录、内容生产、审校、导出和发布均未实现。

## 环境要求

- Git
- Node.js 24.12.0（见 `.nvmrc`）
- Corepack 与 pnpm 11.12.0（见 `package.json`）
- Docker Engine 与 Docker Compose v2
- Python 3.11 或更高版本

本地端口必须可用：Web `3000`、Worker 健康检查 `3001`、PostgreSQL `55431`、MinIO API/控制台 `59010/59011`、Mailpit SMTP/UI `51024/58024`。隔离测试使用 `55432`、`59000/59001`、`51025/58025`。

若 `3000` 或 `3001` 已被占用，可在 `.env` 中修改 `WEB_PORT`、`APP_URL` 与 `WORKER_HEALTH_PORT`；跨平台启动脚本会使用这些值，不需要修改 package script。

## 首次安装

```bash
corepack enable
pnpm install --frozen-lockfile
python -m pip install -r scripts/requirements.txt
cp .env.example .env
```

PowerShell 中复制环境文件：

```powershell
Copy-Item .env.example .env
```

若 Windows 上的 Node/NVM 安装目录不可写，裸 `corepack enable` 会因无法创建全局 shim 而返回 `EPERM`。使用仓库本地 shim，不需要管理员权限：

```powershell
New-Item -ItemType Directory -Force .corepack-bin | Out-Null
corepack enable --install-directory .corepack-bin
$env:PATH = "$(Resolve-Path .corepack-bin);$env:PATH"
pnpm install --frozen-lockfile
```

`.corepack-bin` 已被忽略，不得提交。CI 使用 pnpm 官方 standalone action，并显式固定为 `11.12.0`，不依赖 runner 预装 Node.js 来启动 pnpm。

`.env.example` 仅包含本地开发值和空的 provider key。不要把真实密钥提交到仓库。

## 启动本地开发环境

先启动依赖并执行迁移和合成数据种子：

```bash
pnpm infra:up
pnpm db:migrate
pnpm db:seed
```

迁移和种子命令可重复执行。然后启动 Web 与 Worker：

```bash
pnpm dev
```

可访问：

- 工程状态页：<http://localhost:3000>
- Web 存活/就绪：<http://localhost:3000/health/live>、<http://localhost:3000/health/ready>
- Worker 存活/就绪：<http://127.0.0.1:3001/health/live>、<http://127.0.0.1:3001/health/ready>
- MinIO 控制台：<http://127.0.0.1:59011>
- Mailpit：<http://127.0.0.1:58024>

Web 与 Worker readiness 同时检查 PostgreSQL 连接、durable queue claim/update 能力和对象存储。数据库可连接但 migration/`jobs` 表缺失时，liveness 仍为 `200`，readiness 必须为 `503` 且只暴露 `queue=unavailable`。

就绪检查会真实探测 PostgreSQL 与 MinIO；依赖不可用时返回经过清理的 `503`，存活检查仍独立工作。

## 验证与测试

无需 OpenAI key。常用门禁：

```bash
pnpm specs:validate
pnpm contracts:check
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm test:offline
pnpm build
pnpm dependency:check
```

集成测试、浏览器测试和烟雾测试使用独立的 `serialos-test` Compose 项目，不会复用开发数据库或 bucket。Integration case 会创建、迁移和删除各自的临时数据库，不依赖共享测试库已迁移。`pnpm test:e2e` 会先校验并迁移隔离测试数据库，再通过锁定的 pnpm 入口启动浏览器测试 Web，并在测试结束后退出：

```bash
pnpm infra:test:up
pnpm test:integration
pnpm exec playwright install chromium
pnpm test:e2e
pnpm smoke
pnpm infra:test:down
```

`pnpm smoke` 会执行生产构建，运行迁移与种子，启动生产模式 Web 和 Worker，完成 PostgreSQL 与 MinIO 写入/读取/删除回环，并在隔离的 `serialos-test` 栈中停止 PostgreSQL，证明 Web/Worker liveness 保持 `200`、readiness 变为 `503`，随后重启数据库并证明 readiness 恢复为 `200`。`pnpm ci:prove-failures` 在临时目录中故意破坏 Schema、TypeScript 类型和 migration checksum；只有三项均因预期原因失败且临时文件已删除时，该命令才成功。

完整本地发布门禁：

```bash
pnpm install --frozen-lockfile
pnpm infra:test:up
pnpm specs:validate
pnpm contracts:check
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm test:offline
pnpm test:integration
pnpm test:e2e
pnpm build
pnpm smoke
pnpm dependency:check
pnpm ci:prove-failures
pnpm ci:verify-workflow
pnpm infra:test:down
```

## Live provider 策略

默认测试与 CI 明确关闭 live provider，不访问真实 OpenAI API，也不需要任何 provider key：

```bash
pnpm test:live
```

E00 尚未实现 live adapter。即使显式设置 `FEATURE_LIVE_PROVIDER_TESTS=true`，命令也会在任何网络调用前以 `LIVE_PROVIDER_ADAPTER_NOT_IMPLEMENTED_IN_E00` 失败。后续 AI Epic 只有在实现合成 smoke fixture、独立密钥和预算后才能改变该行为。

## 停止与清理

停止服务但保留数据卷：

```bash
pnpm infra:down
pnpm infra:test:down
```

删除 SerialOS 本地开发和测试 Compose 项目及其数据卷：

```bash
pnpm infra:clean
```

`infra:clean` 会永久删除项目作用域内的本地数据库和对象，不能用于生产资源。脚本会校验固定 Compose 项目名，不会按模糊路径或全局名称清理其他 Docker 资源。

## 工程边界

- `apps/web`：Next.js Web 与公开健康路由
- `apps/worker`：独立 Worker 与仅回环监听的健康服务
- `packages/domain`、`application`、`db`、`jobs`：框架无关领域、应用、数据与持久任务边界
- `packages/ai`、`storage`、`contracts`：外部服务端口、对象存储和版本化合同
- `packages/observability`、`config`、`ui`、`testkit`：日志/追踪、类型化配置、基础 UI 与确定性测试替身

所有外部服务均位于接口之后；默认 CI 使用确定性替身。E00 不包含 E01 路由、认证或任何自动发布能力。
