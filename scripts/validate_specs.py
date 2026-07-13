#!/usr/bin/env python3
"""Static validation for the SerialOS specification package.

This validator intentionally avoids connecting to external services. It checks the
machine-readable contracts and the consistency of the handoff package. E00 should
port or wrap these checks behind `pnpm specs:validate`.
"""

from __future__ import annotations

import argparse
import glob
import json
import re
import sys
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any, Iterable

try:
    import yaml
except ImportError as exc:  # pragma: no cover - environment guard
    raise SystemExit("Missing dependency: PyYAML. Install scripts/requirements.txt") from exc

try:
    from jsonschema import Draft202012Validator, FormatChecker
except ImportError as exc:  # pragma: no cover - environment guard
    raise SystemExit("Missing dependency: jsonschema. Install scripts/requirements.txt") from exc


HTTP_METHODS = {"get", "put", "post", "delete", "options", "head", "patch", "trace"}
REQUIREMENT_RE = re.compile(r"\b(?:FR-[A-Z]+-\d{3}|NFR-\d{3})\b")
KNOWN_FILE_REF_RE = re.compile(
    r"`((?:docs|tasks|schemas|contracts|db|prompts|examples|evals|\.agents|scripts)/[^`\s]+|"
    r"(?:AGENTS|README|START_HERE|PLANS|MASTER_SPEC|FILE_MANIFEST|VALIDATION_REPORT)\.md)`"
)
STALE_TERMS = {
    "awaiting_interview",
    "budget_blocked",
    "failed_retryable",
    "failed_terminal",
    "cancelled",
    "partially_supported",
    "contradicted",
    "personal_opinion",
    "case_claim",
    "dismissed_false_positive",
}


@dataclass
class Result:
    errors: list[str] = field(default_factory=list)
    warnings: list[str] = field(default_factory=list)
    metrics: dict[str, int] = field(default_factory=dict)

    def error(self, message: str) -> None:
        self.errors.append(message)

    def warn(self, message: str) -> None:
        self.warnings.append(message)


def load_yaml(path: Path) -> Any:
    return yaml.safe_load(path.read_text(encoding="utf-8"))


def load_json(path: Path) -> Any:
    return json.loads(path.read_text(encoding="utf-8"))


def resolve_pointer(document: Any, pointer: str) -> Any:
    if pointer in ("", "#"):
        return document
    if pointer.startswith("#"):
        pointer = pointer[1:]
    if not pointer.startswith("/"):
        raise KeyError(f"Unsupported JSON Pointer: {pointer}")
    current = document
    for raw_part in pointer[1:].split("/"):
        part = raw_part.replace("~1", "/").replace("~0", "~")
        if not isinstance(current, dict) or part not in current:
            raise KeyError(pointer)
        current = current[part]
    return current


def walk_refs(node: Any, location: str = "root") -> Iterable[tuple[str, str]]:
    if isinstance(node, dict):
        ref = node.get("$ref")
        if isinstance(ref, str):
            yield location, ref
        for key, value in node.items():
            yield from walk_refs(value, f"{location}/{key}")
    elif isinstance(node, list):
        for index, value in enumerate(node):
            yield from walk_refs(value, f"{location}[{index}]")


def validate_json_schemas(root: Path, result: Result) -> None:
    files = sorted((root / "schemas").glob("*.json"))
    result.metrics["json_schemas"] = len(files)
    if not files:
        result.error("No JSON Schemas found under schemas/")
        return

    seen_ids: dict[str, Path] = {}
    for path in files:
        try:
            schema = load_json(path)
            Draft202012Validator.check_schema(schema)
        except Exception as exc:  # noqa: BLE001 - validation collector
            result.error(f"{path.relative_to(root)}: invalid Draft 2020-12 schema: {exc}")
            continue

        if schema.get("$schema") != "https://json-schema.org/draft/2020-12/schema":
            result.error(f"{path.relative_to(root)}: missing Draft 2020-12 $schema")
        schema_id = schema.get("$id")
        if isinstance(schema_id, str):
            previous = seen_ids.get(schema_id)
            if previous:
                result.error(
                    f"Duplicate JSON Schema $id {schema_id}: "
                    f"{previous.relative_to(root)} and {path.relative_to(root)}"
                )
            seen_ids[schema_id] = path
        if schema.get("type") == "object" and schema.get("additionalProperties") is not False:
            result.error(f"{path.relative_to(root)}: root object must set additionalProperties=false")


def validate_examples(root: Path, result: Result) -> None:
    files = sorted((root / "examples").glob("*.example.json"))
    result.metrics["contract_examples"] = len(files)
    schema_names = {path.name for path in (root / "schemas").glob("*.schema.json")}
    example_schema_names = {path.name.replace(".example.json", ".schema.json") for path in files}
    missing_examples = sorted(schema_names - example_schema_names)
    unknown_examples = sorted(example_schema_names - schema_names)
    if missing_examples:
        result.error(f"Schemas without contract examples: {missing_examples}")
    if unknown_examples:
        result.error(f"Contract examples without schemas: {unknown_examples}")

    for example_path in files:
        schema_path = root / "schemas" / example_path.name.replace(".example.json", ".schema.json")
        if not schema_path.exists():
            continue
        try:
            instance = load_json(example_path)
            schema = load_json(schema_path)
            errors = sorted(
                Draft202012Validator(schema, format_checker=FormatChecker()).iter_errors(instance),
                key=lambda item: list(item.path),
            )
        except Exception as exc:  # noqa: BLE001
            result.error(f"{example_path.relative_to(root)}: cannot validate example: {exc}")
            continue
        for error in errors:
            location = "/".join(str(part) for part in error.path) or "$"
            result.error(
                f"{example_path.relative_to(root)} at {location}: {error.message}"
            )


def validate_openapi(root: Path, result: Result) -> dict[str, Any] | None:
    path = root / "contracts" / "openapi.yaml"
    try:
        spec = load_yaml(path)
    except Exception as exc:  # noqa: BLE001
        result.error(f"contracts/openapi.yaml: invalid YAML: {exc}")
        return None

    if not isinstance(spec, dict):
        result.error("contracts/openapi.yaml: root must be an object")
        return None
    if spec.get("openapi") != "3.1.0":
        result.error("contracts/openapi.yaml: openapi must be 3.1.0")

    paths = spec.get("paths")
    if not isinstance(paths, dict):
        result.error("contracts/openapi.yaml: paths must be an object")
        return spec

    operation_ids: dict[str, str] = {}
    tag_names = {tag.get("name") for tag in spec.get("tags", []) if isinstance(tag, dict)}

    for location, ref in walk_refs(spec):
        if ref.startswith("#/"):
            try:
                resolve_pointer(spec, ref)
            except KeyError:
                result.error(f"Unresolved internal OpenAPI ref {ref} at {location}")
            continue

        file_part, _, fragment = ref.partition("#")
        target = (path.parent / file_part).resolve()
        if not target.exists():
            result.error(f"Missing external OpenAPI ref {ref} at {location}")
            continue
        try:
            document = load_json(target) if target.suffix.lower() == ".json" else load_yaml(target)
            if fragment:
                resolve_pointer(document, f"#{fragment}")
        except Exception as exc:  # noqa: BLE001
            result.error(f"Invalid external OpenAPI ref {ref} at {location}: {exc}")

    for route, path_item in paths.items():
        if not isinstance(path_item, dict):
            result.error(f"OpenAPI path {route}: path item must be an object")
            continue
        placeholders = set(re.findall(r"{([^}]+)}", route))
        path_parameters = path_item.get("parameters", [])

        for method, operation in path_item.items():
            if method not in HTTP_METHODS:
                continue
            if not isinstance(operation, dict):
                result.error(f"{method.upper()} {route}: operation must be an object")
                continue

            operation_id = operation.get("operationId")
            descriptor = f"{method.upper()} {route}"
            if not operation_id:
                result.error(f"{descriptor}: missing operationId")
            elif operation_id in operation_ids:
                result.error(
                    f"Duplicate operationId {operation_id}: {operation_ids[operation_id]} and {descriptor}"
                )
            else:
                operation_ids[operation_id] = descriptor

            if not operation.get("responses"):
                result.error(f"{descriptor}: missing responses")

            op_tags = operation.get("tags", [])
            for tag in op_tags:
                if tag not in tag_names:
                    result.error(f"{descriptor}: undeclared tag {tag}")

            declared: set[str] = set()
            for parameter in list(path_parameters) + list(operation.get("parameters", [])):
                resolved = parameter
                if isinstance(parameter, dict) and "$ref" in parameter:
                    try:
                        resolved = resolve_pointer(spec, parameter["$ref"])
                    except KeyError:
                        continue
                if isinstance(resolved, dict) and resolved.get("in") == "path":
                    declared.add(str(resolved.get("name")))
                    if resolved.get("required") is not True:
                        result.error(f"{descriptor}: path parameter {resolved.get('name')} must be required")
            missing = placeholders - declared
            extra = declared - placeholders
            if missing:
                result.error(f"{descriptor}: undeclared path parameters {sorted(missing)}")
            if extra:
                result.error(f"{descriptor}: extra path parameters {sorted(extra)}")

    result.metrics["openapi_paths"] = len(paths)
    result.metrics["openapi_operations"] = len(operation_ids)
    result.metrics["openapi_component_schemas"] = len(
        spec.get("components", {}).get("schemas", {})
    )
    return spec


def parse_sql_enums(sql: str) -> dict[str, list[str]]:
    enums: dict[str, list[str]] = {}
    pattern = re.compile(
        r"CREATE\s+TYPE\s+([a-z_][a-z0-9_]*)\s+AS\s+ENUM\s*\((.*?)\)\s*;",
        flags=re.IGNORECASE | re.DOTALL,
    )
    for match in pattern.finditer(sql):
        enums[match.group(1)] = re.findall(r"'([^']+)'", match.group(2))
    return enums


def validate_sql(root: Path, result: Result) -> dict[str, list[str]]:
    path = root / "db" / "schema.sql"
    sql = path.read_text(encoding="utf-8")
    tables = re.findall(
        r"(?im)^CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?(?:public\.)?([a-z_][a-z0-9_]*)",
        sql,
    )
    enums = parse_sql_enums(sql)

    for kind, names in (("table", tables), ("enum type", list(enums))):
        duplicates = sorted({name for name in names if names.count(name) > 1})
        if duplicates:
            result.error(f"Duplicate SQL {kind}s: {duplicates}")

    references = re.findall(
        r"(?i)REFERENCES\s+(?:public\.)?([a-z_][a-z0-9_]*)\s*(?:\(|\b)", sql
    )
    for reference in sorted(set(references)):
        if reference not in tables:
            result.error(f"SQL foreign key references undefined table: {reference}")

    names: list[str] = []
    names.extend(
        re.findall(
            r"(?im)^CREATE\s+(?:UNIQUE\s+)?INDEX\s+(?:IF\s+NOT\s+EXISTS\s+)?([a-z_][a-z0-9_]*)",
            sql,
        )
    )
    names.extend(re.findall(r"(?i)CONSTRAINT\s+([a-z_][a-z0-9_]*)", sql))
    duplicates = sorted({name for name in names if names.count(name) > 1})
    if duplicates:
        result.error(f"Duplicate SQL constraint/index names: {duplicates}")

    if sql.count("(") != sql.count(")"):
        result.error(f"SQL parenthesis imbalance: {sql.count('(')} opening vs {sql.count(')')} closing")

    # Validate simple enum defaults declared on one line.
    enum_defaults = re.findall(
        r"(?im)^\s*[a-z_][a-z0-9_]*\s+([a-z_][a-z0-9_]*)\s+[^,\n]*DEFAULT\s+'([^']+)'",
        sql,
    )
    for enum_name, default in enum_defaults:
        if enum_name in enums and default not in enums[enum_name]:
            result.error(f"SQL enum default {enum_name}={default!r} is not a declared value")

    result.metrics["sql_tables"] = len(tables)
    result.metrics["sql_enum_types"] = len(enums)
    return enums


def validate_cross_contract_states(
    root: Path, spec: dict[str, Any] | None, sql_enums: dict[str, list[str]], result: Result
) -> None:
    if spec is None:
        return
    schemas = spec.get("components", {}).get("schemas", {})
    mappings = {
        "run_status": ("ContentRun", "status"),
        "job_status": ("Job", "status"),
        "export_status": ("Export", "status"),
        "content_asset_status": ("ContentAsset", "status"),
        "content_asset_type": ("ContentAsset", "type"),
    }
    for sql_name, (schema_name, property_name) in mappings.items():
        expected = sql_enums.get(sql_name)
        actual = (
            schemas.get(schema_name, {})
            .get("properties", {})
            .get(property_name, {})
            .get("enum")
        )
        if expected is None or actual is None:
            result.error(f"Cannot compare SQL {sql_name} with OpenAPI {schema_name}.{property_name}")
        elif expected != actual:
            result.error(
                f"State mismatch: SQL {sql_name}={expected} vs "
                f"OpenAPI {schema_name}.{property_name}={actual}"
            )

    # External claim schema must agree with the SQL enums.
    claim_schema = load_json(root / "schemas" / "source-claim.schema.json")
    claim_item = (
        claim_schema.get("properties", {})
        .get("claims", {})
        .get("items", {})
        .get("properties", {})
    )
    claim_type = claim_item.get("claimType", {}).get("enum")
    support = claim_item.get("supportStatus", {}).get("enum")
    if claim_type != sql_enums.get("claim_type"):
        result.error(f"Claim type mismatch: schema={claim_type}, SQL={sql_enums.get('claim_type')}")
    if support != sql_enums.get("support_status"):
        result.error(f"Claim support mismatch: schema={support}, SQL={sql_enums.get('support_status')}")


def resolve_file_pattern(root: Path, source_file: Path, raw_ref: str) -> list[Path]:
    ref = raw_ref.rstrip(".,;:，。；：")
    root_named = re.match(
        r"^(?:AGENTS|README|START_HERE|PLANS|MASTER_SPEC|FILE_MANIFEST|VALIDATION_REPORT)\.md$",
        ref,
    )
    base = root if root_named or re.match(
        r"^(?:docs|tasks|schemas|contracts|db|prompts|examples|evals|\.agents|scripts)/", ref
    ) else source_file.parent
    pattern = str((base / ref).resolve())
    if glob.has_magic(pattern):
        return [Path(item) for item in glob.glob(pattern)]
    target = Path(pattern)
    return [target] if target.exists() else []


def validate_markdown_and_manifest(root: Path, result: Result) -> None:
    files = [path for path in root.rglob("*") if path.is_file()]
    markdown_files = [path for path in files if path.suffix.lower() == ".md"]

    for path in markdown_files:
        text = path.read_text(encoding="utf-8", errors="replace")
        for match in re.finditer(r"\[[^\]]*\]\(([^)]+)\)", text):
            raw_ref = match.group(1).split("#", 1)[0]
            if not raw_ref or "://" in raw_ref or raw_ref.startswith("#"):
                continue
            if not resolve_file_pattern(root, path, raw_ref):
                result.error(f"{path.relative_to(root)}: broken Markdown link {raw_ref}")

        for match in KNOWN_FILE_REF_RE.finditer(text):
            raw_ref = match.group(1)
            matches = resolve_file_pattern(root, path, raw_ref)
            if matches:
                continue
            if glob.has_magic(raw_ref):
                result.warn(
                    f"{path.relative_to(root)}: future/glob reference currently has no match: {raw_ref}"
                )
            else:
                result.error(f"{path.relative_to(root)}: missing referenced file {raw_ref}")

    result.metrics["markdown_files"] = len(markdown_files)
    result.metrics["package_files"] = len(files)


def validate_requirements(root: Path, result: Result) -> None:
    functional = (root / "docs" / "06-functional-spec.md").read_text(encoding="utf-8")
    requirements = sorted(set(REQUIREMENT_RE.findall(functional)))
    task_text = "\n".join(
        path.read_text(encoding="utf-8") for path in sorted((root / "tasks").glob("E*.md"))
    )
    traceability = (root / "docs" / "20-requirement-traceability.md").read_text(encoding="utf-8")

    missing_tasks = [req for req in requirements if req not in task_text]
    missing_trace = [req for req in requirements if req not in traceability]
    duplicate_trace = [req for req in requirements if len(re.findall(rf"\|\s*{re.escape(req)}\s*\|", traceability)) != 1]

    if missing_tasks:
        result.error(f"Requirements not assigned to an Epic: {', '.join(missing_tasks)}")
    if missing_trace:
        result.error(f"Requirements missing from traceability: {', '.join(missing_trace)}")
    if duplicate_trace:
        result.error(f"Requirements without exactly one traceability row: {', '.join(duplicate_trace)}")

    result.metrics["requirements"] = len(requirements)
    result.metrics["functional_requirements"] = sum(req.startswith("FR-") for req in requirements)
    result.metrics["nonfunctional_requirements"] = sum(req.startswith("NFR-") for req in requirements)


def validate_stale_terms(root: Path, result: Result) -> None:
    ignored_names = {"MASTER_SPEC.md", "VALIDATION_REPORT.md"}
    for token in sorted(STALE_TERMS):
        hits: list[str] = []
        for path in root.rglob("*"):
            if not path.is_file() or path.name in ignored_names:
                continue
            if path.suffix.lower() not in {".md", ".json", ".yaml", ".yml", ".sql"}:
                continue
            if token in path.read_text(encoding="utf-8", errors="ignore"):
                hits.append(str(path.relative_to(root)))
        if hits:
            result.error(f"Stale state/token {token}: {hits}")


def render_report(result: Result) -> str:
    lines = ["# SerialOS Specification Validation Report", ""]
    lines.append("## Metrics")
    lines.append("")
    for key, value in sorted(result.metrics.items()):
        lines.append(f"- `{key}`: {value}")
    lines.append("")
    lines.append("## Result")
    lines.append("")
    lines.append(f"- Errors: {len(result.errors)}")
    lines.append(f"- Warnings: {len(result.warnings)}")
    lines.append(f"- Verdict: **{'PASS' if not result.errors else 'FAIL'}**")
    lines.append("")

    if result.errors:
        lines.extend(["## Errors", ""])
        lines.extend(f"- {item}" for item in result.errors)
        lines.append("")
    if result.warnings:
        lines.extend(["## Warnings", ""])
        lines.extend(f"- {item}" for item in result.warnings)
        lines.append("")

    lines.extend(
        [
            "## Validation Boundary",
            "",
            "This report performs static validation only. `db/schema.sql` was checked for references, "
            "duplicate names, enum defaults, and structural consistency, but it was not executed against "
            "a live PostgreSQL server. E00 must convert it into migrations and run them in an isolated database.",
            "",
        ]
    )
    return "\n".join(lines)


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", type=Path, default=Path(__file__).resolve().parents[1])
    parser.add_argument("--report", type=Path, help="Write a Markdown report")
    args = parser.parse_args()

    root = args.root.resolve()
    result = Result()
    validate_json_schemas(root, result)
    validate_examples(root, result)
    spec = validate_openapi(root, result)
    sql_enums = validate_sql(root, result)
    validate_cross_contract_states(root, spec, sql_enums, result)
    validate_markdown_and_manifest(root, result)
    validate_requirements(root, result)
    validate_stale_terms(root, result)

    report = render_report(result)
    if args.report:
        report_path = args.report if args.report.is_absolute() else root / args.report
        report_path.write_text(report, encoding="utf-8")
    print(report)
    return 1 if result.errors else 0


if __name__ == "__main__":
    sys.exit(main())
