import { test, expect } from "@playwright/test";

test("should fill value on search box and redirect to HTML tutorial page", async ({ page }) => {
	await page.goto("https://www.w3schools.com/");

	const searchInput = page.locator("#tnb-google-search-input");
	await expect(searchInput).toBeVisible();

	await searchInput.fill("HTML");
	await searchInput.press("Enter");
	await expect(page).toHaveURL("https://www.w3schools.com/html/default.asp");
	await expect(page).toHaveTitle(/HTML Tutorial/);
});
