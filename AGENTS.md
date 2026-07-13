# SerialOS Repository Instructions

## Mission

Build the SerialOS MVP exactly as specified. The product is a Chinese-first AI editorial operating system for solo knowledge creators. The application must preserve creator authenticity, source traceability, human approval, and deterministic safety boundaries.

## Read before changing code

For any task, read the relevant files in this order:

1. `docs/00-project-charter.md`
2. `docs/01-prd.md`
3. `docs/03-scope-and-release-plan.md`
4. The task-specific document under `tasks/`
5. Any linked functional, data, API, UX, security, or test specification

For multi-step work, create or update an execution plan using `PLANS.md`.

## Product invariants

- Never fabricate personal experience, customer stories, quotes, statistics, or sources.
- Every externally verifiable claim must be linked to one or more stored sources or marked as unsupported.
- Opinion and personal experience must be explicitly typed; they are not treated as external facts.
- A content run with blocker findings cannot be approved.
- MVP has no automatic publishing to third-party social platforms.
- MVP does not execute arbitrary model-generated code.
- Interactive artifacts are rendered from approved JSON schemas and safe templates only.
- Raw creator content must never appear in application logs.
- Deleting a workspace must schedule deletion of database records, files, vector data, and provider-side resources.
- All AI outputs used by the application must be schema-validated.
- Model IDs, reasoning levels, budgets, and pricing metadata must be configurable.
- User-facing copy is Simplified Chinese unless a locale explicitly says otherwise.
- Code, identifiers, commit messages, and technical comments are English.

## Architecture constraints

- Use a TypeScript monorepo.
- Keep web, worker, domain logic, data access, AI orchestration, contracts, and UI components separated.
- External services must be behind interfaces and have deterministic test doubles.
- Long-running AI and file-processing work must run in the worker, not inside web request lifetimes.
- Jobs must be idempotent and retryable. Persist step state and provider request IDs.
- Use PostgreSQL as the source of truth.
- Use S3-compatible object storage for original files and export bundles.
- Use pgvector for retrieval in MVP unless an ADR replaces it.
- Use a PostgreSQL-backed durable job queue unless an ADR replaces it.
- Avoid introducing Redis, Kafka, Kubernetes, or microservices in MVP.
- Do not make the web framework the domain model. Domain services must be testable without HTTP.

## Implementation rules

- Prefer vertical slices that end in user-visible behavior.
- Add or update tests in the same change as behavior.
- Do not leave placeholder implementations, `TODO` business logic, silent catches, or fake success states.
- Do not add production dependencies without recording why they are needed.
- Use strict TypeScript and avoid `any`; narrow unknown inputs at boundaries.
- Validate environment variables at startup.
- Validate all API payloads and AI outputs.
- Use database transactions for state transitions that must be atomic.
- Use optimistic concurrency or version fields for editable content.
- Store all timestamps in UTC and render in the workspace time zone.
- Use UUIDs or sortable UUID-compatible IDs consistently.
- Treat prompts and schemas as versioned application assets.
- Do not store secrets in the repository or expose provider keys to the browser.

## Required commands

The final repository must expose, at minimum:

```bash
pnpm install
pnpm dev
pnpm build
pnpm lint
pnpm format:check
pnpm typecheck
pnpm test
pnpm test:integration
pnpm test:e2e
pnpm db:migrate
pnpm db:seed
pnpm specs:validate
```

If the selected tooling changes a command, update this file and the README in the same commit.

## Testing expectations

- Unit-test domain rules, state machines, scoring, redaction, cost budgets, and artifact formula evaluation.
- Integration-test repositories, queue idempotency, object storage, and OpenAI adapters using mocks or recorded fixtures.
- End-to-end-test the critical happy path and blocker paths.
- Do not call live OpenAI APIs in default CI.
- Keep a small opt-in live-provider smoke test behind an explicit environment flag.
- Every bug fix must include a regression test.
- AI eval fixtures live under `evals/` and must not contain private customer data.

## UI expectations

- Desktop-first, responsive down to 390 px.
- Meet WCAG 2.2 AA for critical flows.
- Keyboard navigation, visible focus, semantic labels, and error summaries are required.
- Show explicit progress and recoverable failures for asynchronous jobs.
- Do not imply content has been published unless the user records or confirms publishing.
- Avoid vague “AI magic” copy. State what the system is doing and what evidence it used.

## Security expectations

- Default-deny file types and enforce size limits.
- Sanitize imported HTML and never render untrusted HTML directly.
- Use signed, short-lived URLs for private files.
- Rate-limit authentication, uploads, AI run creation, and export endpoints.
- Apply workspace scoping to every query.
- Redact secrets and obvious personal identifiers before sending material to models where feasible.
- Run moderation and policy checks on relevant input and output.
- Audit destructive actions, approvals, exports, and settings changes.
- Never run Codex with sandbox or approval bypass flags in this repository.

## Definition of done

A task is done only when:

1. The acceptance criteria in the task document pass.
2. Relevant unit, integration, and E2E tests pass.
3. Lint, formatting, type checking, build, migrations, and schema validation pass.
4. Loading, empty, success, error, retry, and permission states are handled.
5. Observability is added for new background work.
6. Security and privacy implications are addressed.
7. API and user-facing documentation are updated.
8. There are no blocker review findings.
9. The change does not introduce out-of-scope functionality.

When a requirement is ambiguous, prefer the smallest implementation that preserves the product invariants. Record the decision in an ADR rather than inventing a larger feature.
