# ADR-0002: SQL migrations and typed data access

- Status: proposed
- Date: 2026-07-12
- Owners: TBD
- Related requirements: E00-S03, FR-OPS-001 through FR-OPS-006, FR-AUTH-003 foundation

## Context

The repository supplies a complete PostgreSQL/pgvector `db/schema.sql` but no executable migration history or typed data layer. E00 requires converting that SQL, proving checksum and forward upgrade behavior, and creating workspace-scoped repository/transaction primitives. The first implementation also needs a prior-version upgrade test even though no migration currently exists.

## Decision

- Keep PostgreSQL as the source of truth and use Drizzle ORM with the `pg` driver for typed application access.
- Use SQL migrations executed by the Drizzle migration runner rather than regenerating the supplied schema from ORM metadata.
- Create `0001_baseline.sql` as an immutable snapshot of the supplied SQL before E00 runtime corrections.
- Create `0002_foundation_runtime.sql` for the queue fields/constraints and audit append-only enforcement required by E00.
- Update `db/schema.sql` to represent the head schema after `0002`; keep Drizzle schema declarations as a typed projection protected by integration/drift tests.
- Migrate the full supplied schema in E00, but expose no later-Epic business handlers or UI.
- Use forward-only repair after data exists. Automated down migrations may be used only in isolated tests where explicitly safe.
- Seed only deterministic synthetic data, including two same-shape workspaces for isolation tests.

## Alternatives considered

- **ORM-generated schema as the new sole source:** rejected because it would replace rather than faithfully convert the supplied SQL and could silently lose constraints/indexes.
- **Kysely or Prisma:** viable typed layers, but they diverge from the documented default without a demonstrated benefit for E00.
- **One migration only:** simpler, but cannot demonstrate the required previous-version forward upgrade and obscures E00 schema corrections.
- **Migrate only foundation tables:** rejected because E00-S03 explicitly names the complete `db/schema.sql`; splitting ownership now risks later incompatibility.
- **PostgreSQL Row Level Security in E00:** deferred because it is not specified and would introduce a second authorization model before E01. Workspace fail-closed application scoping remains mandatory.

## Consequences

- Initial migration is large, but it exactly establishes the specified database contract.
- SQL and typed declarations are two representations; CI must catch drift against a migrated database.
- Later migrations must be forward compatible and update both head schema documentation and typed projections.
- Business tables exist before business capabilities, but cannot be reached through product routes in E00.
- Audit update/delete rejection is enforced below the repository layer.

## Validation

- Empty database applies `0001` and `0002`;
- database at `0001` upgrades to `0002` without data loss;
- migration checksum tamper fails closed;
- migrate and seed can be re-run safely;
- migrated schema contains required extensions, enums, tables, constraints and indexes;
- workspace helper rejects absent scope and cannot read another seeded workspace;
- audit rows can be inserted but not updated/deleted through the application database role/path.

