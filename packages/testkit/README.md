# @serialos/testkit

Deterministic test doubles and the E00 foundation smoke harness.

Dependency rationale:

- `@serialos/ai`, `@serialos/application`, `@serialos/domain`, and `@serialos/storage` provide the public ports and types exercised by deterministic fakes.
- `@serialos/db`, `pg`, and `@types/pg` are used only by the foundation smoke command to perform a real isolated PostgreSQL write/read/rollback roundtrip.
- `tsx` executes the TypeScript smoke harness locally and in CI; no testkit dependency is shipped to the Web or Worker runtime.
