import { test, expect } from "@playwright/test";
import LoginPage from "./pages/LoginPage";

test.describe("saucedemo login page", () => {
	let loginPage: LoginPage;
	test.beforeEach(async ({ page }) => {
		loginPage = new LoginPage(page);
		await loginPage.goto();
	});

	test.afterEach(async ({ page }, testInfo) => {
		if (testInfo.status !== testInfo.expectedStatus) {
			await page.screenshot({
				path: `screenshots/saucedemo/${testInfo.title}-${Date.now()}.png`,
				fullPage: true,
			});
		}
	});

	test("should login success with valid credentials", async ({ page }) => {
		await loginPage.login("standard_user", "secret_sauce");
		await expect(page).toHaveURL(/inventory/);
		await expect(page.locator(".title")).toHaveText("Products");
	});

	test("should login failed with invalid credentials", async ({ page }) => {
		await loginPage.login("invalid_user", "invalid_password");

		const errorMessage = await loginPage.getErrorMessage();

		expect(errorMessage).toContain(
			"Username and password do not match any user in this service"
		);
	});
});

test.describe("saucedemo product page", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("https://www.saucedemo.com/");
		await page.fill("#user-name", "standard_user");
		await page.fill("#password", "secret_sauce");
		await page.click("#login-button");
		await expect(page).toHaveURL(/.*inventory/);
	});

	test.afterEach(async ({ page }, testInfo) => {
		if (testInfo.status !== testInfo.expectedStatus) {
			await page.screenshot({
				path: `screenshots/saucedemo/${testInfo.title}-${Date.now()}.png`,
				fullPage: true,
			});
		}
	});

	test("should display correct number of products on page", async ({ page }) => {
		const productItems = page.locator(".inventory_item");
		await expect(productItems).toHaveCount(6);
	});

	test("should display Products as page title", async ({ page }) => {
		const title = page.locator(".title");
		await expect(title).toHaveText("Products");
	});

	test("should display prices for all products", async ({ page }) => {
		const prices = page.locator(".inventory_item_price");
		await expect(prices).toHaveCount(6);
		await expect(prices.first()).toBeVisible();
	});
});

test.describe("saucedemo cart page", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("https://www.saucedemo.com/");
		await page.fill("#user-name", "standard_user");
		await page.fill("#password", "secret_sauce");
		await page.click("#login-button");
		await expect(page).toHaveURL(/.*inventory/);
		await page.click(".inventory_item:first-child .btn_inventory");
	});

	test.afterEach(async ({ page }, testInfo) => {
		if (testInfo.status !== testInfo.expectedStatus) {
			await page.screenshot({
				path: `screenshots/saucedemo/${testInfo.title}-${Date.now()}.png`,
				fullPage: true,
			});
		}
	});

	test("should display added product in cart", async ({ page }) => {
		const cartBadge = page.locator(".shopping_cart_badge");
		await expect(cartBadge).toHaveText("1");
		
		await page.click(".shopping_cart_link");
		
		const cartItem = page.locator(".cart_item");
		await expect(cartItem).toHaveCount(1);
	});

	test("should display correct product name in cart", async ({ page }) => {
		await page.click(".shopping_cart_link");
		
		const productName = page.locator(".inventory_item_name");
		await expect(productName).toHaveText("Sauce Labs Backpack");
	});

	test("should be able to remove product from cart", async ({ page }) => {
		await page.click(".shopping_cart_link");
		
		await page.click(".cart_button");
		
		const cartItem = page.locator(".cart_item");
		await expect(cartItem).toHaveCount(0);
		
		const cartBadge = page.locator(".shopping_cart_badge");
		await expect(cartBadge).not.toBeVisible();
	});
});

test.describe("Hooks execution order demonstration", () => {
	
	test.beforeAll(async () => {
		console.log("========================================");
		console.log("Starting test group execution");
		console.log("========================================");
	});

	test.beforeEach(async ({ page }) => {
		console.log("Before test: Logging in...");
		await page.goto("https://www.saucedemo.com/");
		await page.fill("#user-name", "standard_user");
		await page.fill("#password", "secret_sauce");
		await page.click("#login-button");
		await expect(page).toHaveURL(/.*inventory/);
		console.log("Login successful");
	});

	test.afterEach(async ({ page }, testInfo) => {
		console.log(`After test: ${testInfo.title} - Status: ${testInfo.status}`);
		
		if (testInfo.status !== testInfo.expectedStatus) {
			console.log("Test failed! Taking screenshot...");
			await page.screenshot({
				path: `screenshots/saucedemo/hooks-${testInfo.title}-${Date.now()}.png`,
				fullPage: true,
			});
			console.log("Screenshot saved");
		}
	});

	test.afterAll(async () => {
		console.log("========================================");
		console.log("Test group execution completed");
		console.log("========================================");
	});

	test("should verify inventory page title is correct", async ({ page }) => {
		console.log("Executing test: verify page title");
		const title = page.locator(".title");
		await expect(title).toHaveText("Products");
		console.log("Test passed");
	});

	// Demo failed test
	// test("should verify cart badge shows correct count - INTENTIONAL FAIL", async ({ page }) => {
	// 	console.log("Executing test: verify cart badge (this will fail)");
	// 	const cartBadge = page.locator(".shopping_cart_badge");
	// 	await expect(cartBadge).toHaveText("999");
	// 	console.log("Test passed");
	// });

	test("should verify product list is visible", async ({ page }) => {
		console.log("Executing test: verify product list");
		const productList = page.locator(".inventory_list");
		await expect(productList).toBeVisible();
		console.log("Test passed");
	});
});
