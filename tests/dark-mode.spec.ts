import { test, expect } from "@playwright/test";

/**
 * Converts the body's computed background-color to a normalized rgb string.
 * Tailwind v4 outputs oklch values; this renders through a canvas to get consistent rgb.
 */
async function getBodyBgRgb(page: import("@playwright/test").Page) {
  return page.evaluate(() => {
    // Read the computed background-color (may be oklch, rgb, etc.)
    const color = getComputedStyle(document.body).backgroundColor;

    // Create a 1x1 canvas to convert any color format to rgb
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 1;
    const ctx = canvas.getContext("2d")!;

    // Paint the color and read back the pixel as rgba
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

  // bg-white -> rgb(255, 255, 255)
  expect(await getBodyBgRgb(page)).toBe("rgb(255, 255, 255)");
  // text-gray-900 -> rgb(16, 24, 40) (oklch rounding)
  expect(await getBodyColorRgb(page)).toBe("rgb(16, 24, 40)");
});

// Verify dark mode colors when system prefers dark
test("body switches to dark mode styles when system theme is dark", async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");

  // dark:bg-gray-950 -> rgb(3, 7, 18)
  expect(await getBodyBgRgb(page)).toBe("rgb(3, 7, 18)");
  // dark:text-gray-100 -> rgb(243, 244, 246)
  expect(await getBodyColorRgb(page)).toBe("rgb(243, 244, 246)");
});

// Verify theme updates live when system preference toggles without a page reload
test("theme changes dynamically when system preference changes", async ({
  page,
}) => {
  // Start in light mode
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  expect(await getBodyBgRgb(page)).toBe("rgb(255, 255, 255)");

  // Switch to dark — background should update immediately
  await page.emulateMedia({ colorScheme: "dark" });
  expect(await getBodyBgRgb(page)).toBe("rgb(3, 7, 18)");

  // Switch back to light — background should revert
  await page.emulateMedia({ colorScheme: "light" });
  expect(await getBodyBgRgb(page)).toBe("rgb(255, 255, 255)");
});
