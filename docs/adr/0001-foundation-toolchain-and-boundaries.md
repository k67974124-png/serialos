# ADR-0001: Foundation toolchain and package boundaries

- Status: proposed
- Date: 2026-07-12
- Owners: TBD
- Related requirements: E00-S01, E00-S07, E00-S08, NFR-001 through NFR-007

## Context

E00 must turn a specification-only handoff into a reproducible TypeScript monorepo without coupling domain/application code to Next.js or installing later-Epic product infrastructure. The architecture recommends several tools but allows equivalent choices. The active E00 task also names `packages/testkit`, while the architecture example uses `packages/test-kit`.

## Decision

- Use a pinned Node LTS, Corepack, pnpm workspaces, Turborepo and strict TypeScript.
- Use Next.js App Router for `apps/web` and an independent Node.js process for `apps/worker`.
- Create exactly the E00 package boundaries: `domain`, `application`, `db`, `contracts`, `ai`, `storage`, `jobs`, `observability`, `ui`, `config`, and `testkit`.
- Use `packages/testkit` to match the active task. Defer `artifact-engine` to E09.
- Shared packages may not import Next.js; domain may not import ORM, queue, storage or provider SDKs. Enforce this with dependency graph/lint checks.
- Use Pino-compatible JSON logging, OpenTelemetry API abstractions and an in-process metrics registry, without requiring a telemetry vendor.
- Use GitHub Actions as a thin default CI adapter over portable pnpm scripts. Pin action revisions. Do not add deployment automation.
- Select and lock exact stable compatible dependency versions during E00-S01 after checking primary project documentation/registries.

## Alternatives considered

- **npm workspaces or Nx:** viable, but pnpm/Turbo match the provided architecture and require fewer project-specific layers.
- **One Next.js application containing the worker and domain:** rejected because long work must not live in request lifetimes and framework code cannot be the domain model.
- **Create every future package immediately:** rejected as scope expansion; empty future abstractions would not provide tested behavior.
- **Provider-specific CI logic only:** rejected because the extracted project has no confirmed remote; portable pnpm scripts preserve replaceability.

## Consequences

- The repository has one deterministic command graph and a small number of explicit boundaries.
- CI can be ported by replacing only the workflow adapter.
- `testkit` differs from the architecture diagram but matches E00 acceptance.
- Exact dependency versions are not decided by this planning ADR; they must be pinned in the implementation lockfile and documented.
- GitHub Actions is not a commitment to GitHub deployment or GitHub OAuth.

## Validation

- Clean `pnpm install --frozen-lockfile` and `pnpm build`;
- lint rule/dependency graph test proving no cycles and no forbidden framework imports;
- all root commands invoke real checks;
- Web and Worker production build smoke;
- CI invokes the same pnpm commands documented for local use.

