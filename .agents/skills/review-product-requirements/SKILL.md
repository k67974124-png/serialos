---
name: review-product-requirements
description: Review SerialOS product and implementation specifications for contradictions, gaps, unverifiable acceptance criteria, unsafe assumptions, and scope creep before coding. Use at the start of an Epic or when requirements appear inconsistent.
---

# Review SerialOS requirements before implementation

## Goal

Find specification defects while they are still cheap. This skill reviews product requirements, not code quality. It should make the active slice implementable without silently inventing behavior.

## Inputs

Read:

- `AGENTS.md` product invariants;
- active `tasks/*.md`;
- linked functional, flow, IA, UX, data, API, architecture, safety, analytics, and test documents;
- relevant JSON Schemas and `contracts/openapi.yaml`;
- relevant ADRs and existing implementation constraints.

## Review lenses

### 1. Outcome and scope

- Is the user-visible outcome clear?
- Are in-scope and out-of-scope boundaries consistent?
- Does the task accidentally require a later Epic?
- Is there a smallest shippable vertical slice?

### 2. State and ownership

- Are all states, transitions, actors, terminal states, stale states, and cancellation rules defined?
- Which system is the source of truth?
- What is immutable or versioned?
- What happens when two tabs, jobs, or retries race?

### 3. Data and contracts

- Does every required field exist in the data model and API?
- Do OpenAPI, JSON Schema, SQL, UI labels, and requirement language agree?
- Are IDs, workspace scope, time zone, privacy, versions, and provenance explicit?
- Is migration behavior possible without data loss?

### 4. AI behavior

- Is model output schema-validated and semantically checked?
- Are source IDs and claims verified against stored data?
- Are prompts/version/model/cost/retry recorded?
- Can the system return zero results instead of fabricating?
- Is human confirmation distinguished from model suggestion?
- Does any safety boundary rely only on a prompt?

### 5. Failure and recovery

- Are empty, partial, timeout, provider outage, budget, cancellation, stale, duplicate, deletion, and late-result paths defined?
- Is retryability classified?
- Can the user see and recover from the failure?
- Is idempotency specified for write and job boundaries?

### 6. Security and privacy

- Are workspace isolation, SSRF, upload, XSS, signed URLs, logs, secrets, retention, deletion, audit, and rate limits addressed?
- Can untrusted imported text become an instruction?
- Can arbitrary model code or HTML execute?
- Could a response reveal whether another tenant's resource exists?

### 7. Verifiability

- Can every acceptance statement be proven by an automated test, an explicit manual check, or a metric?
- Are performance, a11y, eval, and security thresholds present where needed?
- Does a “done” statement depend on future manual work that is not represented as a state?

## Severity

- `blocker`: implementation would violate a product invariant, expose data, destroy data, or be impossible to accept;
- `major`: important flow, contract, failure, or test is ambiguous;
- `minor`: wording, naming, or low-risk detail should be clarified;
- `suggestion`: non-blocking improvement within current scope.

## Output

Write a concise review with:

1. findings ordered by severity, each citing file, heading/line, conflicting requirement, impact, and smallest resolution;
2. requirement-to-contract gaps;
3. missing acceptance tests;
4. decisions that require an ADR;
5. a verdict: `ready_to_plan`, `ready_with_recorded_assumptions`, or `not_ready`.

Do not rewrite the whole PRD. Do not implement code. Do not expand scope to fix a minor gap.
