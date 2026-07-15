# SerialOS E00 Independent-Finding Remediation Report

## 1. Status

- Result: `LOCAL_REMEDIATION_COMPLETE_HOSTED_CI_PENDING`
- Verify-release verdict for task acceptance: `rejected`; the code-addressable remediation is locally complete, but exact-commit hosted CI and new independent acceptance remain mandatory
- Baseline HEAD: `534979d64a98065812dc03568b788ba17d9300b1`
- Remediation commit: `NOT_CREATED`; changes remain in the working tree for review
- Branch: `main`
- Active plan: `docs/plans/E00-foundation.md`
- Task state: `verification` (unchanged)
- E01 started: `NO`
- Task may be changed to `accepted`: `NO`; a new independent acceptance is still required

The code-addressable portions of B-001, M-001, M-003, M-004 and U-001 are closed locally. The earlier follow-up majors IA2-M-001 and IA2-M-002, the latest E00-ACC-MAJ-001, and the repository-actionable E00-ACC-UNV-002 are also closed locally. M-002 is locally remediated and its workflow declaration passes, but the required GitHub-hosted result cannot exist until this diff is committed and pushed.

## 2. Finding closure matrix

| Finding | Remediation evidence | Verification evidence | Local result |
|---|---|---|---|
| B-001 log leakage | Recursive key normalization/suffix redaction plus a strict structured-field/value allowlist; raw content, credential variants, unknown objects, Error details and allowed-key smuggling fail closed | 9 observability tests; default unit suite 45/45; Worker integration proves payload IDs do not enter logs | CLOSED |
| M-001 Windows contract drift | `.gitattributes` pins canonical/generated text to LF | `core.autocrlf=true` clean clone, frozen install, 14 contract tests and byte scan with generated CRLF count 0 | CLOSED |
| M-002 hosted CI bootstrap | Pinned pnpm action uses `standalone: true` and explicit `11.12.0`; workflow self-check enforces both | Local workflow declaration and every declared command pass | PENDING HOSTED RUN |
| M-003 false readiness | Web and Worker add a zero-row `FOR UPDATE SKIP LOCKED` plus update-capability queue probe | Migrated DB ready; empty DB live 200/ready 503; PostgreSQL outage/recovery gives Web and Worker ready `200/503/200` while live remains 200 | CLOSED |
| M-004 Worker/correlation gap | Production Worker composes outbox dispatch, bounded claim loops, queue runtime and correlation; migration 0003 persists non-null request/trace IDs | Real PostgreSQL Worker test dispatches, succeeds/dead-letters, preserves correlation and drains; production smoke passes | CLOSED |
| U-001 Corepack permission | README documents repository-local Corepack shim; CI standalone pnpm does not require global shim creation | Local shim installed pnpm 11.12.0 and completed frozen install without administrator access | CLOSED LOCALLY |
| IA2-M-001 integration setup order | Queue-readiness integration creates an empty database and a separate migrated database instead of assuming the shared test database is already migrated | After deleting all test volumes, `pnpm infra:test:up && pnpm test:integration` passed 18/18 before any root test-database migration or E2E run | CLOSED |
| IA2-M-002 Windows E2E exit | The wrapper launches Playwright through the pinned pnpm entrypoint; a unit regression verifies the child-command path and successful exit | Root `pnpm test:e2e` applied 0001-0003, passed both Playwright cases and exited 0 in 8.4 seconds; a second 289-file clean-room run exited 0 in 9.5 seconds | CLOSED |
| E00-ACC-MAJ-001 Windows E2E teardown | The wrapper owns a direct production standalone Node child, copies the required static assets, and stops the child in `finally`; Playwright no longer owns a nested Next process tree | A failed assertion returned nonzero without hanging; the final 290-file clean room ran the root command three consecutive times with exit 0, 2/2 assertions, and zero listeners on port 53010 after each run | CLOSED |
| E00-ACC-UNV-002 readiness recovery | Production smoke stops and starts only the isolated `serialos-test` PostgreSQL service and checks both processes across the outage; checked-out transaction clients handle connection errors without crashing Worker | Clean-room smoke printed Web/Worker live/ready `200/200`, live/ready `200/503`, then ready `200`; object storage and database roundtrips also passed | CLOSED LOCALLY |

## 3. Additional defects found and closed during remediation

| Area | Defect | Resolution and proof |
|---|---|---|
| E2E orchestration | Queue-aware readiness correctly returned 503 on a fresh but unmigrated E2E database | `pnpm test:e2e` now migrates its isolated test database first; a clean test volume applied 0001-0003 and both Playwright tests passed |
| Forward migration | Nullable legacy correlation could strand pre-0003 durable rows | 0003 backfills identifiable `migration:<row-id>` traces and migration request IDs, then applies `NOT NULL`; upgrade-with-data test passes |
| Worker resilience | The durable runtime pool had no idle-client error listener, so stopping PostgreSQL terminated Worker liveness | Added a safe pool-error observer and default unit regression; live stays 200 during the real outage and readiness recovers |
| Checked-out PostgreSQL connection failure | A transaction client could emit an unhandled `error` event while PostgreSQL was stopped, terminating Worker before recovery | Transactions attach a scoped client error listener, skip rollback on a failed connection and destroy it on release; a unit regression and the real outage/recovery smoke pass |
| Startup cleanup | Runtime startup failure could leak health-server/probe resources | Worker composition now closes all created resources on health-server or runtime startup failure |
| Integration clean-room order | Queue readiness compared the shared test database with an empty database and silently required another command to migrate the shared database first | The test now owns both comparison databases and migrates only the positive fixture; fresh volumes pass without prior migration state |
| Windows E2E process lifecycle | A pnpm-launched Playwright/Next process tree still retained a child after both assertions passed | The wrapper now starts one production standalone Node process directly, copies static assets, runs Playwright without `webServer`, and stops the child in `finally`; four runner regressions cover command execution, direct process termination and assets |

## 4. Slice acceptance matrix

| Slice | Local status | Main remediation evidence | Verification |
|---|---|---|---|
| E00-S01 | PASS | Windows-stable LF policy and reproducible root commands | Frozen install, format, lint, typecheck, dependency/command checks |
| E00-S02 | PASS | Queue-capability readiness and resilient Worker pool | Fresh Compose, normal/empty/outage/recovery probes, production smoke |
| E00-S03 | PASS | Checksummed 0003 with legacy-row backfill and non-null correlation | Empty/upgrade/repeat migration, seed and migration mutation tests |
| E00-S04 | PASS | Actual Worker outbox/claim loops and correlation persistence | 18 integration tests including production composition, crash, contention, cancel, idempotency and outbox paths |
| E00-S05 | PASS | Existing deterministic fakes remain unchanged | Offline 2/2; no OpenAI key for default tests/build/smoke |
| E00-S06 | PASS | LF-stable generated contracts | 14 contract tests plus Windows clean-clone byte proof |
| E00-S07 | PASS | Runtime-validated log allowlists and pool failure sanitization | Unit sentinel tests, Worker logs, headers/audit tests in full suites |
| E00-S08 | PASS LOCALLY / PENDING HOSTED CI | Standalone pinned pnpm action, self-contained integration setup, deterministic standalone E2E lifecycle and local full workflow | All local gates pass from a 290-file clean-room copy; three consecutive E2E executions exited 0 without a remaining listener; new GitHub Actions run not yet available |

## 5. Commands actually run on the final diff

| Command/check | Exit | Result |
|---|---:|---|
| `pnpm install --frozen-lockfile` | 0 | Lockfile unchanged; pnpm 11.12.0 |
| `pnpm specs:validate` | 0 | 87 requirements, 81 paths, 96 operations, 9 schemas; 0 errors/warnings |
| `pnpm contracts:check` | 0 | 3 files / 14 tests; generated output current |
| `pnpm format:check` | 0 | PASS |
| `pnpm lint` | 0 | PASS |
| `pnpm typecheck` | 0 | 23 Turbo tasks plus test TypeScript PASS |
| `pnpm test` | 0 | 14 files / 45 tests, including four E2E runner regressions and the failed-connection transaction regression |
| `pnpm test:offline` | 0 | 1 file / 2 tests; public provider transport denied |
| `pnpm test:integration` | 0 | 7 files / 18 tests against isolated PostgreSQL/MinIO |
| `pnpm test:e2e` | 0 | 2 Playwright tests; readiness, axe, keyboard and 390 px; three consecutive clean-room commands exited 0 and left zero listeners on port 53010 |
| `pnpm build` | 0 | 13 packages; only E00 page and health routes |
| `pnpm ci:prove-failures` | 0 | Schema, TypeScript and migration mutations all failed as required and were removed |
| `pnpm dependency:check` | 0 | 13 workspaces, 0 cycles |
| `pnpm command:check` | 0 | 11 required commands are real |
| `pnpm ci:verify-workflow` | 0 | 13 gates and 3 pinned actions |
| `pnpm test:live` with default flag | 0 | No provider network call attempted |
| `pnpm smoke` | 0 | Production Web/Worker baseline 200, PostgreSQL outage readiness 503, recovery 200, database and object storage PASS |
| Fresh `db:migrate`, `db:seed`, repeat both | 0 | 0001-0003 applied; repeat migration no-op; seed idempotent |
| Windows clean copy + frozen install + full gates | 0 | 290-file snapshot without `.git`, `.env`, `node_modules` or caches; Node 24.12.0/pnpm 11.12.0 frozen install and all local gates PASS |
| Production PostgreSQL stop/recovery | 0 | Web/Worker readiness `200/503/200`; liveness remained 200 |
| Empty database runtime | 0 | Worker live 200; ready 503; `queue=unavailable` |

`OPENAI_API_KEY` was absent and the live-provider flag was unset for the final default test/build path.

## 6. Security and scope review

- Raw creator text and credential sentinels cannot be emitted through arbitrary fields, reported key variants, nested arrays/objects, Error values, signed URLs or the allowed `result` field.
- Worker logs include only validated correlation identifiers, duration and stable E00 status/error codes; payloads and original exception messages are omitted.
- Queue claims, terminal writes, retry, cancellation, late-result guards and outbox dispatch remain transactionally scoped and workspace-bound.
- Unknown job types become non-retryable dead letters; no placeholder or fake success path was added.
- No skipped tests, TODO business logic, live provider dependency, client secret, E01 route, E01 use case or publishing behavior was added.
- Task state remains `verification`; E01 remains not started.

## 7. Not run and residual condition

- A GitHub-hosted run for this remediation diff was not run because there is no remediation commit to push and no push authorization was requested.
- The current baseline run for `534979d...` remains historical evidence for the rejected implementation and cannot validate an uncommitted working-tree repair.
- E00 still requires a new independent acceptance against the exact committed candidate after its hosted CI succeeds.

## 8. Handoff

1. Review and commit this E00-only remediation diff.
2. Push it and require every GitHub Actions gate, including cleanup, to succeed on that exact commit.
3. Start a new independent E00 acceptance session against the committed baseline.
4. Do not mark E00 accepted and do not start E01 before that verdict.
