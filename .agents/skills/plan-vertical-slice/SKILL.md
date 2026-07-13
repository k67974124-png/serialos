---
name: plan-vertical-slice
description: Plan one SerialOS Epic or vertical slice before implementation. Use when a task spans UI, API, database, workers, AI orchestration, security, or multiple files. Produces a concrete execution plan aligned with requirement IDs and acceptance tests without changing business code.
---

# Plan a SerialOS vertical slice

## Goal

Create an implementation-ready plan for exactly one Epic or one named slice. The plan must preserve the product invariants in `AGENTS.md`, stay within the active task file, and end in user-visible, testable behavior.

## Inputs

The request must identify one task under `tasks/`. If it identifies only an Epic, choose the smallest incomplete slice in that Epic. Do not plan later Epics.

Read in this order:

1. `AGENTS.md`;
2. `README.md`;
3. the active `tasks/*.md` file;
4. every document listed under that task's “输入文档” or “关联规格” section;
5. `contracts/openapi.yaml`, relevant JSON Schemas, and `db/schema.sql`;
6. existing repository code, migrations, tests, ADRs, and current execution plan.

## Workflow

1. Restate the exact user-visible outcome and requirement IDs.
2. Inspect the repository before proposing files. Do not assume the scaffold matches the specification.
3. Identify dependencies already implemented and gaps that block this slice.
4. Check for conflicts among product invariants, security, functional requirements, API contracts, data schema, UX, and task acceptance.
5. Resolve only low-risk implementation details. Record material choices as an ADR proposal.
6. Divide work into a sequence that keeps the repository runnable after each step.
7. For each step list:
   - files/packages;
   - migrations and rollback/forward strategy;
   - domain commands/state transitions;
   - API changes and contract updates;
   - worker jobs, retries, idempotency, cancellation;
   - UI loading/empty/error/success/recovery states;
   - security/privacy controls;
   - logs, traces, metrics, audit;
   - unit, integration, E2E, eval, security tests as applicable.
8. List failure cases explicitly, including stale writes, duplicate delivery, late provider results, cross-workspace access, and provider outage where relevant.
9. Map every acceptance criterion to one or more tests or inspection steps.
10. Use the structure in `PLANS.md`. Save the plan in the repository location selected by existing conventions.
11. Stop after the plan. Do not implement business code unless the user explicitly asks for implementation in the same request.

## Quality bar

The plan is unacceptable when it:

- says “add tests later”;
- proposes an API not reflected in the OpenAPI contract;
- uses a background job without idempotency and recovery;
- treats a model prompt as an authorization or safety boundary;
- permits arbitrary model-generated code;
- hides failure behind a successful UI state;
- adds out-of-scope features or speculative infrastructure;
- does not mention data migration and workspace scope;
- cannot be verified with commands or user behavior.

## Final response

Return:

- plan path;
- scope and requirement IDs;
- decisions requiring human attention;
- tests and commands that will prove completion;
- blockers, if any.

Do not claim implementation has begun.
