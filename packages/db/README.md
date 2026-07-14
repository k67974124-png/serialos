# `@serialos/db`

This package owns PostgreSQL migrations, typed schema projections, transaction boundaries and workspace-scoped data helpers.

Production dependencies:

- `pg` is the PostgreSQL 16 driver used by migrations, probes and transactional infrastructure.
- `drizzle-orm` provides the typed SQL/schema projection selected by ADR-0002. Canonical DDL remains the reviewed SQL migration history.

The package does not expose later-Epic business repositories or HTTP/framework types.
