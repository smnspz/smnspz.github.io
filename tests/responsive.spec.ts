import { test, expect } from "@playwright/test";

const pages = ["/", "/about", "/blog/hello-world"];
const viewports = [
  { name: "mobile", width: 320, height: 568 },
  { name: "desktop", width: 1280, height: 800 },
];

for (const vp of viewports) {
  for (const page of pages) {
    test(`${page} renders without horizontal overflow on ${vp.name}`, async ({
      page: p,
    }) => {
      await p.setViewportSize({ width: vp.width, height: vp.height });
      await p.goto(page);

      // Body should not be wider than viewport
      const bodyWidth = await p.evaluate(() => document.body.scrollWidth);
      expect(bodyWidth).toBeLessThanOrEqual(vp.width);

      // No horizontal scrollbar
      const hasOverflow = await p.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth
      );
      expect(hasOverflow).toBe(false);
    });
  }
}

// Content should not touch edges on mobile
test("content has padding on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto("/");

  // Check body has left padding > 0
  const paddingLeft = await page.evaluate(() => {
    return parseFloat(getComputedStyle(document.body).paddingLeft);
  });
  expect(paddingLeft).toBeGreaterThan(0);
});

// Container should be constrained on desktop
test("content is constrained on desktop", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/");

  // Body max-width should be less than viewport
  const bodyWidth = await page.evaluate(() => document.body.clientWidth);
  expect(bodyWidth).toBeLessThan(1280);
});
