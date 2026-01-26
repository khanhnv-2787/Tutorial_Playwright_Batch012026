import { Page } from '@playwright/test';
import selectors from '../selectors/authentication.json';

export class LoginPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('/login');
  }

  async fillEmail(email: string) {
    await this.page.getByLabel('Email:').fill(email);
  }

  async fillPassword(password: string) {
    await this.page.getByLabel('Password:').fill(password);
  }

  async checkRememberMe() {
    await this.page.getByLabel('Remember me?').check();
  }

  async uncheckRememberMe() {
    await this.page.getByLabel('Remember me?').uncheck();
  }

  async clickLoginButton() {
    await this.page.getByRole('button', { name: 'Log in' }).click();
  }

  async login(email: string, password: string, rememberMe: boolean = false) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    if (rememberMe) {
      await this.checkRememberMe();
    }
    await this.clickLoginButton();
  }

  async clickForgotPassword() {
    await this.page.getByRole('link', { name: 'Forgot password?' }).click();
  }

  getEmailField() {
    return this.page.getByLabel('Email:');
  }

  getPasswordField() {
    return this.page.getByLabel('Password:');
  }

  getRememberMeCheckbox() {
    return this.page.getByLabel('Remember me?');
  }

  getLoginButton() {
    return this.page.getByRole('button', { name: 'Log in' });
  }

  getValidationSummary() {
    return this.page.locator(selectors.login.validationSummary.loc);
  }

  getForgotPasswordLink() {
    return this.page.getByRole('link', { name: 'Forgot password?' });
  }
}
