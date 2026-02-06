import { test, expect } from "@playwright/test";

const pages = ["/", "/about", "/blog/hello-world"];

// Each page should have exactly one h1
for (const url of pages) {
  test(`${url} has exactly one h1`, async ({ page }) => {
    await page.goto(url);
    const h1s = page.locator("h1");
    await expect(h1s).toHaveCount(1);
  });
}

// Landmarks present on every page
for (const url of pages) {
  test(`${url} has required landmarks`, async ({ page }) => {
    await page.goto(url);
    await expect(page.locator("header")).toHaveCount(1);
    await expect(page.locator("main")).toHaveCount(1);
    await expect(page.locator("footer")).toHaveCount(1);
    await expect(page.locator("nav[aria-label]")).toHaveCount(1);
  });
}

// All images have alt text
for (const url of pages) {
  test(`${url} images all have alt text`, async ({ page }) => {
    await page.goto(url);
    const images = page.locator("img");
    const count = await images.count();
    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute("alt");
      expect(alt).toBeTruthy();
    }
  });
}

// All interactive elements are keyboard focusable
test("nav links are keyboard focusable", async ({ page }) => {
  await page.goto("/");
  const links = page.locator("nav a");
  const count = await links.count();
  for (let i = 0; i < count; i++) {
    const tabIndex = await links.nth(i).getAttribute("tabindex");
    // Should not have negative tabindex
    expect(tabIndex).not.toBe("-1");
  }
});
