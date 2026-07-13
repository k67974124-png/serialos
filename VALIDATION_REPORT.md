# SerialOS Specification Validation Report

## Metrics

- `contract_examples`: 9
- `functional_requirements`: 80
- `json_schemas`: 9
- `markdown_files`: 66
- `nonfunctional_requirements`: 7
- `openapi_component_schemas`: 60
- `openapi_operations`: 96
- `openapi_paths`: 81
- `package_files`: 90
- `requirements`: 87
- `sql_enum_types`: 24
- `sql_tables`: 57

## Result

- Errors: 0
- Warnings: 0
- Verdict: **PASS**

## Validation Boundary

This report performs static validation only. `db/schema.sql` was checked for references, duplicate names, enum defaults, and structural consistency, but it was not executed against a live PostgreSQL server. E00 must convert it into migrations and run them in an isolated database.
