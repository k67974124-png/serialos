const REDACTED = "[REDACTED]";
const REDACTED_UNSERIALIZABLE = "[REDACTED_UNSERIALIZABLE]";
const SENSITIVE_KEYS = new Set([
  "accesstoken",
  "answer",
  "answers",
  "apikey",
  "authorization",
  "body",
  "content",
  "cookie",
  "emailbody",
  "html",
  "interviewanswer",
  "interviewanswers",
  "material",
  "materialtext",
  "normalizedtext",
  "originaltext",
  "password",
  "prompt",
  "rawcontent",
  "rawtext",
  "secret",
  "secretkey",
  "signedurl",
  "text",
  "transcript",
  "transcription",
]);
const SENSITIVE_KEY_SUFFIXES = [
  "accesstoken",
  "apikey",
  "authorization",
  "cookie",
  "password",
  "privatekey",
  "refreshtoken",
  "secretaccesskey",
  "secretkey",
  "signedurl",
] as const;
const SENSITIVE_QUERY_KEYS = new Set([
  "access_token",
  "signature",
  "token",
  "x-amz-credential",
  "x-amz-security-token",
  "x-amz-signature",
]);

function normalizedKey(key: string): string {
  return key.toLowerCase().replaceAll(/[^a-z0-9]/gu, "");
}

function isSensitiveKey(key: string): boolean {
  const normalized = normalizedKey(key);
  return (
    SENSITIVE_KEYS.has(normalized) ||
    SENSITIVE_KEY_SUFFIXES.some((suffix) => normalized.endsWith(suffix))
  );
}

function redactUrlCandidate(candidate: string): string {
  try {
    const url = new URL(candidate);
    const sensitive = [...url.searchParams.keys()].some((key) =>
      SENSITIVE_QUERY_KEYS.has(key.toLowerCase()),
    );
    return sensitive ? "[REDACTED_SIGNED_URL]" : candidate;
  } catch {
    return candidate;
  }
}

function redactString(value: string): string {
  return value
    .replaceAll(/Bearer\s+[A-Za-z0-9._~+/=-]+/giu, "Bearer [REDACTED]")
    .replaceAll(/\bsk-[A-Za-z0-9_-]{8,}\b/gu, "[REDACTED_API_KEY]")
    .replaceAll(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/giu, "[REDACTED_EMAIL]")
    .replaceAll(/https?:\/\/[^\s"'<>]+/giu, (candidate) => redactUrlCandidate(candidate));
}

function visit(value: unknown, seen: WeakSet<object>, depth: number): unknown {
  if (depth > 12) {
    return "[REDACTED_DEPTH_LIMIT]";
  }
  if (value === null || typeof value === "number" || typeof value === "boolean") {
    return value;
  }
  if (typeof value === "string") {
    return redactString(value);
  }
  if (typeof value === "bigint") {
    return value.toString();
  }
  if (typeof value !== "object") {
    return "[UNSUPPORTED_VALUE]";
  }
  if (value instanceof Date) {
    return value.toISOString();
  }
  if (seen.has(value)) {
    return "[REDACTED_CIRCULAR]";
  }
  seen.add(value);
  if (value instanceof Error) {
    return {
      message: "[REDACTED_ERROR_MESSAGE]",
      name: value.name,
    };
  }
  if (Array.isArray(value)) {
    return value.map((item) => visit(item, seen, depth + 1));
  }

  let entries: readonly (readonly [string, unknown])[];
  try {
    entries = Object.entries(value);
  } catch {
    return REDACTED_UNSERIALIZABLE;
  }

  const output: Record<string, unknown> = {};
  for (const [key, item] of entries) {
    output[key] = isSensitiveKey(key) ? REDACTED : visit(item, seen, depth + 1);
  }
  return output;
}

export function redactLogValue(value: unknown): unknown {
  return visit(value, new WeakSet<object>(), 0);
}
