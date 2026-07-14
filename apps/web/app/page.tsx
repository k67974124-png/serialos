const foundationChecks = [
  "Web 与 Worker 健康检查已启用",
  "PostgreSQL 与对象存储就绪检查已启用",
  "默认测试不会调用真实 AI 服务",
] as const;

export default function FoundationStatusPage() {
  return (
    <main>
      <section aria-labelledby="foundation-heading">
        <p className="eyebrow">SerialOS · E00</p>
        <h1 id="foundation-heading">工程基座运行中</h1>
        <p className="summary">
          此页面仅用于确认 SerialOS
          工程基座可以启动、构建并报告依赖状态。登录、内容生产和发布能力不属于 E00，当前尚未开放。
        </p>
        <h2>当前基座检查</h2>
        <ul className="status-list" aria-label="工程基座状态">
          {foundationChecks.map((check) => (
            <li key={check}>{check}</li>
          ))}
        </ul>
        <a className="health-link" href="/health/live">
          查看 Web 存活状态
        </a>
      </section>
    </main>
  );
}
