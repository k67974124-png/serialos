# ADR-0004: Canonical contract sources and generated TypeScript types

- Status: accepted
- Date: 2026-07-12
- Owners: TBD
- Related requirements: E00-S05, E00-S06, FR-OPS-006

## Context

The handoff already contains OpenAPI 3.1, nine Draft 2020-12 AI JSON Schemas and matching examples. E00 must provide runtime validation and typed contracts without manually maintaining equivalent JSON Schema, Zod, OpenAPI and TypeScript definitions. The full OpenAPI describes all MVP Epics even though E00 may implement only health routes.

## Decision

- Keep `contracts/openapi.yaml` canonical for HTTP operations and `schemas/*.schema.json` canonical for AI structured outputs.
- Generate TypeScript types into `packages/contracts/src/generated/`; generated files are never hand-edited.
- Validate runtime JSON Schema with Ajv Draft 2020-12 and resolve OpenAPI 3.1 references through a parser behind `packages/contracts`.
- Use Zod for environment/config and local non-canonical value objects, not as a second handwritten copy of AI/API contracts.
- Check in generated outputs for reproducible builds and add a generation-diff CI check.
- In E00, maintain an implemented-operation manifest containing only `getLiveness` and `getReadiness`. Registered routes/responses must match OpenAPI; later declared operations are not fabricated.
- Deterministic provider fakes must pass the same schema validators as future real adapters.

## Alternatives considered

- **Zod-first and regenerate every existing contract:** rejected because it would replace the supplied canonical assets during a foundation task.
- **Handwritten TypeScript interfaces:** rejected because drift would be undetectable until runtime.
- **Require all OpenAPI handlers in E00:** rejected because it would implement later Epics or create fake success states.
- **Skip generated files and generate only during build:** viable, but makes clean installs more fragile and obscures review diffs.

## Consequences

- Contract changes become visible and reproducible in code review.
- CI must verify both source validity and generated-output freshness.
- OpenAPI and AI schemas remain separate canonical domains; shared primitives should be referenced/generated rather than copied where possible.
- E00 contract coverage is honest about implemented operations while still validating the entire specification.

Implementation uses pinned `@apidevtools/swagger-parser` for complete OpenAPI validation and dereferencing, Ajv 2020 plus `ajv-formats` for runtime JSON Schema enforcement, `@hey-api/openapi-ts` for OpenAPI type generation compatible with the pinned TypeScript 6 toolchain, and `json-schema-to-typescript` for the nine AI-schema type sets. Prettier is a generation-only dependency so checked-in artifacts and drift checks are byte-stable across clean installs.

## Validation

- all OpenAPI references resolve;
- all nine examples validate against their matching schemas;
- negative fixtures and undeclared response tests fail;
- generated output has no diff after regeneration;
- E00 operation manifest exactly matches registered Web routes;
- fake AI outputs use production validators and invalid-schema fixtures are rejected.
