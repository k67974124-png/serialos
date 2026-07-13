---
name: implement-vertical-slice
description: Implement one approved SerialOS vertical-slice plan end to end. Use after planning is accepted. Covers domain, migration, API, worker, UI, observability, security, and tests while preventing scope expansion.
---

# Implement an approved SerialOS vertical slice

## Preconditions

- One active task under `tasks/` is named.
- An execution plan following `PLANS.md` exists and is accepted.
- The working tree is understood. Do not overwrite unrelated user changes.
- Required architecture or product decisions are either specified or recorded in an ADR.

If these are not true, use `$plan-vertical-slice` first.

## Workflow

1. Read `AGENTS.md`, the active task, the accepted plan, linked specs, contracts, schemas, migrations, and tests.
2. Confirm the implementation boundary in one short note. Do not begin another slice.
3. Implement domain rules and state transitions before wiring framework handlers.
4. Add or update migrations with safe forward behavior. Never edit an already released migration unless repository policy explicitly permits it.
5. Implement application services and ports. Keep external SDK calls inside adapters.
6. Implement API handlers that validate input, enforce session/workspace scope, use stable error codes, and match `contracts/openapi.yaml`.
7. Implement worker behavior with persisted checkpoints, idempotency, cancellation, retry classification, and late-result guards.
8. Implement UI states: loading, empty, progress, success, validation error, permission failure, retryable failure, terminal failure, stale/conflict, and recovery.
9. Add audit, structured logs, metrics, and traces without raw creator content or secrets.
10. Add tests in the same change:
    - unit for domain rules;
    - integration for DB/queue/storage/adapters;
    - contract/schema tests;
    - E2E for the user path and blocker/recovery paths;
    - security/eval tests where required.
11. Update OpenAPI, JSON Schemas, docs, fixtures, seed, and task status when behavior changes.
12. Run the narrow checks during development, then all checks required by the task and `AGENTS.md`.
13. Inspect the diff for scope creep, placeholders, silent catches, fake success, unsafe HTML/code, missing workspace filters, and leaked content.
14. Use `$verify-release` before declaring completion.

## Non-negotiable constraints

- Never fabricate a provider response in production behavior.
- Never call OpenAI from the browser.
- Never trust model IDs, source IDs, scores, statuses, or code without server validation.
- Never allow a blocker review to be bypassed.
- Never execute model-generated code or raw HTML.
- Never use an unscoped repository query for workspace data.
- Never log raw material, content, interview answers, API keys, cookies, or signed URLs.
- Never mark export as publish.
- Never auto-accept a creator profile, personal experience, claim, or risk.

## Handling ambiguity

Choose the smallest behavior that satisfies the active requirement and product invariants. Record material choices in an ADR. Do not add a large abstraction for a hypothetical future requirement.

## Completion response

Report only facts you verified:

- implemented user behavior;
- requirements and slice completed;
- key files/migrations/contracts changed;
- commands run and exact results;
- tests not run and why;
- known risks or follow-up within the same Epic;
- task status.

Do not start the next slice.
