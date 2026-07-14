import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("reports Web liveness and readiness", async ({ request }) => {
  const live = await request.get("/health/live");
  const ready = await request.get("/health/ready");

  expect(live.status()).toBe(200);
  expect(await live.json()).toMatchObject({ status: "ok" });
  expect(ready.status()).toBe(200);
  expect(await ready.json()).toMatchObject({ status: "ok" });
});

test("renders an accessible Chinese E00 status page at 390 px", async ({ page }) => {
  await page.setViewportSize({ height: 844, width: 390 });
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1, name: "工程基座运行中" })).toBeVisible();
  await expect(page.getByText("登录、内容生产和发布能力不属于 E00")).toBeVisible();
  await expect(page.locator("body")).not.toContainText("E01");

  const accessibility = await new AxeBuilder({ page }).analyze();
  expect(accessibility.violations).toEqual([]);

  await page.keyboard.press("Tab");
  const healthLink = page.getByRole("link", { name: "查看 Web 存活状态" });
  await expect(healthLink).toBeFocused();
  await expect(healthLink).toHaveCSS("outline-style", "solid");
});
