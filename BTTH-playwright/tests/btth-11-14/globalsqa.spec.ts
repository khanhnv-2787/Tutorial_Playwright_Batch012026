import { test, expect } from "@playwright/test";

test.describe("GlobalsQA Registration and Login", () => {
	const baseURL =
		"https://www.globalsqa.com/angularJs-protractor/registration-login-example/#";

	// Generate unique user data for each test run
	const timestamp = Date.now();
	const testUser = {
		firstName: "Test",
		lastName: "User",
		username: `testuser${timestamp}`,
		password: "Password123!",
	};

	test("Should register new account successfully and login with it", async ({
		page,
	}) => {
		// Navigate to registration page
		await page.goto(`${baseURL}/register`);

		// 1. Verify that the page title displays correctly as "Register"
		const pageTitle = page.locator("h2");
		await expect(pageTitle).toBeVisible();
		await expect(pageTitle).toHaveText("Register");

		// 2. Verify that all input fields are visible
		const firstNameInput = page.locator('input[name="firstName"]');
		const lastNameInput = page.locator('input[name="lastName"]');
		const usernameInput = page.locator('input[name="username"]');
		const passwordInput = page.locator('input[name="password"]');

		await expect(firstNameInput).toBeVisible();
		await expect(lastNameInput).toBeVisible();
		await expect(usernameInput).toBeVisible();
		await expect(passwordInput).toBeVisible();

		// 3. Fill in the information in the fields and click the "Register" button
		await firstNameInput.fill(testUser.firstName);
		await lastNameInput.fill(testUser.lastName);
		await usernameInput.fill(testUser.username);
		await passwordInput.fill(testUser.password);

		// Click Register button
		const registerButton = page.locator("button.btn-primary");
		await registerButton.click();

		// Verify registration success message
		const successMessage = page.locator(".alert-success");
		await expect(successMessage).toBeVisible();
		await expect(successMessage).toContainText("Registration successful");

		// Wait for redirect or manually navigate to login page
		await page.waitForTimeout(1000);

		// 4. Login with the newly created account
		await page.goto(`${baseURL}/login`);

		// Verify we're on login page
		const loginTitle = page.locator("h2");
		await expect(loginTitle).toHaveText("Login");

		// Fill login form
		const loginUsernameInput = page.locator('input[name="username"]');
		const loginPasswordInput = page.locator('input[name="password"]');

		await loginUsernameInput.fill(testUser.username);
		await loginPasswordInput.fill(testUser.password);

		// Click Login button
		const loginButton = page.locator("button.btn-primary");
		await loginButton.click();

		// Verify successful login - check if we're redirected to home page
		await page.waitForURL(/.*#\/$/);

		// Verify user is logged in - check for logged in message or username display
		await expect(page.locator('body')).toContainText("You're logged in");
		
		// Verify username is displayed
		await expect(page.locator("body")).toContainText(testUser.username);

		// Verify Logout link is present
		const logoutLink = page.locator('a').filter({ hasText: 'Logout' });
		await expect(logoutLink).toBeVisible();
	});
});
