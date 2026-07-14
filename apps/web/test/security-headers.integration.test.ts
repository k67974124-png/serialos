import { describe, expect, it } from "vitest";

import nextConfig, { CONTENT_SECURITY_POLICY, SECURITY_HEADERS } from "../next.config.js";

describe("Next.js security header integration", () => {
  it("applies the CSP and baseline headers to every route", async () => {
    const entries = await nextConfig.headers?.();
    expect(entries?.[0]).toEqual({ headers: [...SECURITY_HEADERS], source: "/:path*" });
    expect(
      Object.fromEntries(SECURITY_HEADERS.map((header) => [header.key, header.value])),
    ).toMatchObject({
      "Content-Security-Policy": CONTENT_SECURITY_POLICY,
      "Referrer-Policy": "no-referrer",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
    });
    expect(CONTENT_SECURITY_POLICY).toContain("default-src 'self'");
    expect(CONTENT_SECURITY_POLICY).toContain("object-src 'none'");
    expect(CONTENT_SECURITY_POLICY).toContain("frame-ancestors 'none'");
    expect(CONTENT_SECURITY_POLICY).not.toContain("http:");
    expect(CONTENT_SECURITY_POLICY).not.toContain("https:");
  });

  it("prevents health response caching", async () => {
    const entries = await nextConfig.headers?.();
    expect(entries?.[1]).toEqual({
      headers: [{ key: "Cache-Control", value: "no-store" }],
      source: "/health/:path*",
    });
  });
});
