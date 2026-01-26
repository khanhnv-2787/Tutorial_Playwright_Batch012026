import { Page } from '@playwright/test';
import selectors from '../selectors/authentication.json';

export class RegisterPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('/register');
  }

  async selectGender(gender: 'male' | 'female') {
    const selector = gender === 'male' 
      ? selectors.register.genderMaleRadio.loc 
      : selectors.register.genderFemaleRadio.loc;
    await this.page.locator(selector).check();
  }

  async fillFirstName(firstName: string) {
    await this.page.getByLabel('First name:').fill(firstName);
  }

  async fillLastName(lastName: string) {
    await this.page.getByLabel('Last name:').fill(lastName);
  }

  async fillEmail(email: string) {
    await this.page.getByLabel('Email:', { exact: true }).fill(email);
  }

  async fillPassword(password: string) {
    await this.page.getByLabel('Password:', { exact: true }).fill(password);
  }

  async fillConfirmPassword(confirmPassword: string) {
    await this.page.getByLabel('Confirm password:').fill(confirmPassword);
  }

  async clickRegisterButton() {
    await this.page.getByRole('button', { name: 'Register' }).click();
  }

  async fillRegistrationForm(data: {
    gender?: 'male' | 'female';
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) {
    if (data.gender) {
      await this.selectGender(data.gender);
    }
    await this.fillFirstName(data.firstName);
    await this.fillLastName(data.lastName);
    await this.fillEmail(data.email);
    await this.fillPassword(data.password);
    await this.fillConfirmPassword(data.confirmPassword);
  }

  getValidationSummary() {
    return this.page.locator(selectors.register.validationSummary.loc);
  }

  getFieldValidationError() {
    return this.page.locator(selectors.register.fieldValidationError.loc);
  }

  getSuccessMessage() {
    return this.page.locator(selectors.register.successMessage.loc);
  }

  getFirstNameField() {
    return this.page.getByLabel('First name:');
  }

  getLastNameField() {
    return this.page.getByLabel('Last name:');
  }

  getEmailField() {
    return this.page.getByLabel('Email:', { exact: true });
  }

  getPasswordField() {
    return this.page.getByLabel('Password:', { exact: true });
  }

  getConfirmPasswordField() {
    return this.page.getByLabel('Confirm password:');
  }

  getRegisterButton() {
    return this.page.getByRole('button', { name: 'Register' });
  }

  getGenderMaleRadio() {
    return this.page.locator(selectors.register.genderMaleRadio.loc);
  }

  getGenderFemaleRadio() {
    return this.page.locator(selectors.register.genderFemaleRadio.loc);
  }
}
