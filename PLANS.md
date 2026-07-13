# Execution Plan Template

Use this template for each Epic or any task that spans multiple files, services, migrations, or user flows.

## 1. Objective

State the user-visible outcome and the exact task IDs being implemented.

## 2. Scope

### In scope

List behavior that will exist when complete.

### Out of scope

List adjacent behavior that must not be implemented in this plan.

## 3. Inputs reviewed

List the product, architecture, contract, UX, security, and acceptance documents read.

## 4. Current-state findings

Describe the relevant repository structure, existing behavior, constraints, and technical debt.

## 5. Decisions

For every non-trivial choice, state:

- Decision;
- Reason;
- Alternatives considered;
- Whether an ADR is required.

## 6. Data changes

List migrations, indexes, backfills, retention implications, and rollback strategy.

## 7. API changes

List routes, payloads, status codes, idempotency behavior, and compatibility concerns.

## 8. Worker and AI changes

List job types, state transitions, prompts, schemas, model routing, retries, budgets, and provider mocks.

## 9. UI changes

List routes, components, loading states, empty states, errors, keyboard behavior, and responsive behavior.

## 10. Security and privacy

Cover authorization, input validation, upload handling, prompt injection, PII, secrets, audit logging, and deletion.

## 11. Test plan

Specify unit, integration, E2E, accessibility, schema, migration, and opt-in live-provider tests.

## 12. Implementation sequence

Use small numbered steps. Each step should leave the repository buildable.

## 13. Verification commands

List exact commands and any required environment setup.

## 14. Rollback

Explain how to revert code, migrations, feature flags, and partially completed jobs.

## 15. Risks and open questions

Only include questions that block implementation. For non-blocking ambiguity, make the smallest safe choice and record it.
