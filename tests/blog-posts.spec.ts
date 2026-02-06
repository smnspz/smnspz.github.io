import { test, expect } from "@playwright/test";
import fs from "fs";
import path from "path";

// Read all .md files from the blog content directory to get slugs
const blogDir = path.resolve("src/content/blog");
const slugs = fs
  .readdirSync(blogDir)
  .filter((file) => file.endsWith(".md"))
  .map((file) => file.replace(/\.md$/, ""));

// Generate a test for each blog post slug
for (const slug of slugs) {
  test(`/blog/${slug} renders correctly`, async ({ page }) => {
    const response = await page.goto(`/blog/${slug}`);

    // Page should return 200
    expect(response?.status()).toBe(200);

    // Post title should be present as an h1
    const h1 = page.locator("h1");
    await expect(h1).toBeVisible();
    await expect(h1).not.toBeEmpty();

    // Date should be present in a <time> element with a datetime attribute
    const time = page.locator("time[datetime]");
    await expect(time).toBeVisible();
    await expect(time).not.toBeEmpty();

    // Post body should have content
    const body = page.locator("body");
    const text = await body.textContent();
    expect(text?.length).toBeGreaterThan(0);
  });
}
