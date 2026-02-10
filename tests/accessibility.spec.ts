import { test, expect } from "@playwright/test";
import { Routes } from "../src/routes";

const pages = [Routes.Root, `${Routes.Blog}/hello-world`];

// Each page should have exactly one h1 in main content
for (const url of pages) {
  test(`${url} has exactly one h1`, async ({ page }) => {
    await page.goto(url);
    const h1s = page.locator("main h1");
    await expect(h1s).toHaveCount(1);
  });
}

// Landmarks present on every page
for (const url of pages) {
  test(`${url} has required landmarks`, async ({ page }) => {
    await page.goto(url);
    await expect(page.locator("body > header")).toHaveCount(1);
    await expect(page.locator("body > main")).toHaveCount(1);
    await expect(page.locator("body > footer")).toHaveCount(1);
  });
}

// All images have alt text
for (const url of pages) {
  test(`${url} images all have alt text`, async ({ page }) => {
    await page.goto(url);
    const images = page.locator("main img");
    const count = await images.count();
    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute("alt");
      expect(alt).toBeTruthy();
    }
  });
}

// All links are keyboard focusable
test("links are keyboard focusable", async ({ page }) => {
  await page.goto("/");
  const links = page.locator("main a");
  const count = await links.count();
  for (let i = 0; i < count; i++) {
    const tabIndex = await links.nth(i).getAttribute("tabindex");
    expect(tabIndex).not.toBe("-1");
  }
});
