---
name: verify-release
description: Verify that a SerialOS Epic or vertical slice is actually complete before it is marked accepted. Use after implementation and code review. Runs requirement traceability, tests, security checks, and diff inspection, and reports evidence without inventing results.
---

# Verify a SerialOS slice or release

## Goal

Produce evidence that the active slice satisfies its task, product invariants, contracts, security rules, and definition of done. Verification is read/test oriented. Do not quietly implement missing features while verifying.

## Inputs

Read:

- `AGENTS.md`;
- active task and accepted execution plan;
- linked requirements and acceptance documents;
- changed files and diff;
- test reports, migration history, ADRs, OpenAPI, JSON Schemas, and eval fixtures.

## Workflow

1. Identify the exact commit/diff and active requirement IDs.
2. Build a traceability table: acceptance criterion -> implementation evidence -> test/check -> result.
3. Inspect for scope expansion and unimplemented placeholders.
4. Verify state-machine legality, idempotency, cancellation, retry, stale write, and late-result guards where relevant.
5. Verify workspace scope, authorization, privacy, logs, audit, file/URL handling, and arbitrary-code protections where relevant.
6. Validate data migration and rollback/forward strategy in an isolated database.
7. Validate OpenAPI and all impacted JSON Schemas.
8. Run the active task's required tests, then the repository checks:

```bash
pnpm specs:validate
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm test:integration
pnpm test:e2e
pnpm build
```

Run `pnpm db:migrate` and migration tests when data changed. Run relevant eval/security/performance suites when the task requires them.

9. For every command, record exit status and meaningful summary. Never write “passes” when it was not run.
10. Inspect UI behavior for loading, empty, error, retry, stale/conflict, permission, and success states.
11. Confirm docs, contracts, migrations, fixtures, task status, and ADRs match the implementation.
12. Classify findings:
    - blocker: cannot accept;
    - major: incomplete or unsafe, cannot accept;
    - minor: can accept only if task policy permits and tracked;
    - note: verified limitation already in scope documents.
13. Return a verdict: `accepted`, `rejected`, or `conditionally_accepted` only when the task explicitly allows minor open items.

## Mandatory product checks

Always check that:

- no personal experience, quote, statistic, source, or publication state is fabricated;
- model output is schema-validated;
- official approval cannot occur with blocker or stale review;
- model-generated arbitrary code/HTML cannot execute;
- raw creator content and credentials do not appear in logs;
- workspace deletion and isolation behavior are truthful;
- export is not represented as publishing;
- AI model/config/cost metadata are traceable.

## Final report

Include:

- verdict;
- requirement traceability summary;
- commands run with results;
- findings with files/lines;
- tests not run and reason;
- residual risks and documented limitations;
- whether task status may be changed to `accepted`.

Do not modify task status unless the user explicitly asked verification to do so and the verdict is accepted.
