import { Page } from "@playwright/test";

class LoginPage {
	readonly page: Page;
	readonly usernameInput;
	readonly passwordInput;
	readonly loginBtn;
	readonly errorMessage;

	constructor(page: Page) {
		this.page = page;
		this.usernameInput = page.locator("#user-name");
		this.passwordInput = page.locator("#password");
		this.loginBtn = page.locator("#login-button");
		this.errorMessage = page.locator('[data-test="error"]');
	}

	async goto() {
		await this.page.goto("https://www.saucedemo.com");
	}

	async login(username: string, password: string) {
		await this.usernameInput.fill(username);
		await this.passwordInput.fill(password);
		await this.loginBtn.click();
	}

	async getErrorMessage() {
		return await this.errorMessage.textContent();
	}
}

export default LoginPage;
