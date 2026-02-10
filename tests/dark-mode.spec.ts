import { test, expect } from "@playwright/test";

/**
 * Converts the body's computed background-color to a normalized rgb string.
 * Tailwind v4 outputs oklch values; this renders through a canvas to get consistent rgb.
 */
async function getBodyBgRgb(page: import("@playwright/test").Page) {
  return page.evaluate(() => {
    const color = getComputedStyle(document.body).backgroundColor;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 1;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
    return `rgb(${r}, ${g}, ${b})`;
  });
}

/**
 * Same as getBodyBgRgb but for the text color (color property).
 */
async function getBodyColorRgb(page: import("@playwright/test").Page) {
  return page.evaluate(() => {
    const color = getComputedStyle(document.body).color;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 1;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
    return `rgb(${r}, ${g}, ${b})`;
  });
}

// Verify light mode colors when system prefers light
test("body has light mode styles by default", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");

  // bg-[#f5f0e8] -> rgb(245, 240, 232)
  expect(await getBodyBgRgb(page)).toBe("rgb(245, 240, 232)");
  // text-[#3d3530] -> rgb(61, 53, 48)
  expect(await getBodyColorRgb(page)).toBe("rgb(61, 53, 48)");
});

// Verify dark mode colors when system prefers dark
test("body switches to dark mode styles when system theme is dark", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");

  // dark:bg-[#12110f] -> rgb(18, 17, 15)
  expect(await getBodyBgRgb(page)).toBe("rgb(18, 17, 15)");
  // dark:text-[#fcf9f5] -> rgb(252, 249, 245)
  expect(await getBodyColorRgb(page)).toBe("rgb(252, 249, 245)");
});

// Verify theme updates live when system preference toggles without a page reload
test("theme changes dynamically when system preference changes", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  expect(await getBodyBgRgb(page)).toBe("rgb(245, 240, 232)");

  // Switch to dark
  await page.emulateMedia({ colorScheme: "dark" });
  expect(await getBodyBgRgb(page)).toBe("rgb(18, 17, 15)");

  // Switch back to light
  await page.emulateMedia({ colorScheme: "light" });
  expect(await getBodyBgRgb(page)).toBe("rgb(245, 240, 232)");
});
