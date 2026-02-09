import { test, expect } from "@playwright/test";

const activeClass = "font-semibold";
const inactiveClass = "text-gray-600";

test.describe("Navigation active state", () => {
  test("Home link is active on the index page", async ({ page }) => {
    await page.goto("/");
    const nav = page.locator("nav[aria-label='Main navigation']");
    const homeLink = nav.locator("a", { hasText: "Home" });
    const aboutLink = nav.locator("a", { hasText: "About" });

    await expect(homeLink).toHaveClass(new RegExp(activeClass));
    await expect(aboutLink).toHaveClass(new RegExp(inactiveClass));
  });

  test("Home link is active on a blog post page", async ({ page }) => {
    await page.goto("/blog/hello-world");
    const nav = page.locator("nav[aria-label='Main navigation']");
    const homeLink = nav.locator("a", { hasText: "Home" });
    const aboutLink = nav.locator("a", { hasText: "About" });

    await expect(homeLink).toHaveClass(new RegExp(activeClass));
    await expect(aboutLink).toHaveClass(new RegExp(inactiveClass));
  });

  test("About link is active on the about page", async ({ page }) => {
    await page.goto("/about");
    const nav = page.locator("nav[aria-label='Main navigation']");
    const homeLink = nav.locator("a", { hasText: "Home" });
    const aboutLink = nav.locator("a", { hasText: "About" });

    await expect(aboutLink).toHaveClass(new RegExp(activeClass));
    await expect(homeLink).toHaveClass(new RegExp(inactiveClass));
  });
});
