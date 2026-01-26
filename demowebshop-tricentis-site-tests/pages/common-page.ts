import { Page } from '@playwright/test';
import selectors from '../selectors/authentication.json';

export class CommonPage {
  constructor(private page: Page) {}

  async clickRegisterLink() {
    await this.page.getByRole('link', { name: selectors.common.registerLink.text }).click();
  }

  async clickLoginLink() {
    await this.page.getByRole('link', { name: selectors.common.loginLink.text }).click();
  }

  async clickLogoutLink() {
    await this.page.getByRole('link', { name: selectors.common.logoutLink.text }).click();
  }

  getRegisterLink() {
    return this.page.getByRole('link', { name: selectors.common.registerLink.text });
  }

  getLoginLink() {
    return this.page.getByRole('link', { name: selectors.common.loginLink.text });
  }

  getLogoutLink() {
    return this.page.getByRole('link', { name: selectors.common.logoutLink.text });
  }

  getUserEmail() {
    return this.page.locator(selectors.common.userEmail.loc);
  }
}
