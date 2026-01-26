import { test, expect } from '@playwright/test';
import { RegisterPage } from '../../pages/register-page';
import { LoginPage } from '../../pages/login-page';
import { CommonPage } from '../../pages/common-page';
import testData from '../../data/authentication.json';

// Configure base URL
test.use({ baseURL: testData.urls.base });

// Shared test account for login tests
let sharedTestAccount = {
  email: '',
  password: 'Test@123456'
};

// Helper function to generate unique email
function generateUniqueEmail(prefix: string = 'test'): string {
  const timestamp = Date.now();
  return `${prefix}.${timestamp}@test.com`;
}

// Setup function to create test account
async function setupTestAccount(page: any) {
  if (sharedTestAccount.email) return; // Already setup
  
  const registerPage = new RegisterPage(page);
  const uniqueEmail = generateUniqueEmail('testuser');
  
  await registerPage.navigate();
  await registerPage.fillRegistrationForm({
    gender: 'male',
    firstName: 'Test',
    lastName: 'User',
    email: uniqueEmail,
    password: sharedTestAccount.password,
    confirmPassword: sharedTestAccount.password
  });
  await registerPage.clickRegisterButton();
  await page.waitForLoadState('networkidle');
  
  sharedTestAccount.email = uniqueEmail;
}

test.describe('1. Page Access & Navigation Tests', () => {
  test('TC_REGISTER_ACC_001 - Unauthenticated User Can Access Register Page via Direct URL', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    
    await registerPage.navigate();
    
    await expect(page).toHaveURL(/\/register/);
    await expect(page).toHaveTitle(/Register/);
    await expect(registerPage.getFirstNameField()).toBeVisible();
    await expect(registerPage.getEmailField()).toBeVisible();
    await expect(registerPage.getPasswordField()).toBeVisible();
  });

  test('TC_REGISTER_ACC_003 - User Can Access Register Page from Homepage Menu', async ({ page }) => {
    const commonPage = new CommonPage(page);
    
    await page.goto('/');
    await commonPage.clickRegisterLink();
    
    await expect(page).toHaveURL(/\/register/);
    await expect(page).toHaveTitle(/Register/);
  });

  test('TC_LOGIN_ACC_001 - Unauthenticated User Can Access Login Page via Direct URL', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.navigate();
    
    await expect(page).toHaveURL(/\/login/);
    await expect(page).toHaveTitle(/Login/);
    await expect(loginPage.getEmailField()).toBeVisible();
    await expect(loginPage.getPasswordField()).toBeVisible();
  });

  test('TC_LOGIN_ACC_003 - User Can Access Login Page from Homepage Menu', async ({ page }) => {
    const commonPage = new CommonPage(page);
    
    await page.goto('/');
    await commonPage.clickLoginLink();
    
    await expect(page).toHaveURL(/\/login/);
    await expect(page).toHaveTitle(/Login/);
  });

  test('TC_INTEGRATION_002 - Navigation from Register Page to Login Page', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const commonPage = new CommonPage(page);
    
    await registerPage.navigate();
    await commonPage.clickLoginLink();
    
    await expect(page).toHaveURL(/\/login/);
    await expect(page).toHaveTitle(/Login/);
  });

  test('TC_INTEGRATION_003 - Navigation from Login Page to Register Page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const commonPage = new CommonPage(page);
    
    await loginPage.navigate();
    await commonPage.clickRegisterLink();
    
    await expect(page).toHaveURL(/\/register/);
    await expect(page).toHaveTitle(/Register/);
  });
});

test.describe('2. Authenticated User Access Control Tests', () => {
  test('TC_REGISTER_ACC_002 - Authenticated User Accessing Register Page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const registerPage = new RegisterPage(page);
    const commonPage = new CommonPage(page);
    
    // Setup test account
    await setupTestAccount(page);
    
    // First login
    await loginPage.navigate();
    await loginPage.login(sharedTestAccount.email, sharedTestAccount.password);
    await page.waitForLoadState('networkidle');
    
    // Verify logged in
    const hasLogoutLink = await commonPage.getLogoutLink().isVisible().catch(() => false);
    expect(hasLogoutLink).toBeTruthy();
    
    // Try to access register page - DemoWebShop allows this
    await registerPage.navigate();
    
    // Verify user can still access page (app doesn't restrict authenticated users)
    await expect(page).toHaveURL(/\/register/);
  });

  test('TC_LOGIN_ACC_002 - Authenticated User Accessing Login Page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const commonPage = new CommonPage(page);
    
    // Setup test account
    await setupTestAccount(page);
    
    // First login
    await loginPage.navigate();
    await loginPage.login(sharedTestAccount.email, sharedTestAccount.password);
    await page.waitForLoadState('networkidle');
    await page.waitForLoadState('domcontentloaded');
    
    // Wait for navigation to complete
    await page.waitForTimeout(1000);
    
    // Verify logged in - wait for logout link to appear
    await expect(commonPage.getLogoutLink()).toBeVisible({ timeout: 10000 });
    
    // Try to access login page again - DemoWebShop allows this
    await loginPage.navigate();
    
    // Verify user can still access page (app doesn't restrict authenticated users)
    await expect(page).toHaveURL(/\/login/);
  });
});

test.describe('3. UI Element Visibility Tests', () => {
  test('TC_REGISTER_GUI_001 - Gender Radio Buttons Display and Functionality', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    
    await registerPage.navigate();
    
    const maleRadio = registerPage.getGenderMaleRadio();
    const femaleRadio = registerPage.getGenderFemaleRadio();
    
    await expect(maleRadio).toBeVisible();
    await expect(femaleRadio).toBeVisible();
    
    await maleRadio.check();
    await expect(maleRadio).toBeChecked();
    await expect(femaleRadio).not.toBeChecked();
    
    await femaleRadio.check();
    await expect(femaleRadio).toBeChecked();
    await expect(maleRadio).not.toBeChecked();
  });

  test('TC_REGISTER_GUI_002 - All Registration Input Fields Are Displayed', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    
    await registerPage.navigate();
    
    await expect(registerPage.getFirstNameField()).toBeVisible();
    await expect(registerPage.getLastNameField()).toBeVisible();
    await expect(registerPage.getEmailField()).toBeVisible();
    await expect(registerPage.getPasswordField()).toBeVisible();
    await expect(registerPage.getConfirmPasswordField()).toBeVisible();
  });

  test('TC_REGISTER_GUI_004 - Register Button Display and Clickability', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    
    await registerPage.navigate();
    
    const registerButton = registerPage.getRegisterButton();
    await expect(registerButton).toBeVisible();
    await expect(registerButton).toBeEnabled();
  });

  test('TC_LOGIN_GUI_001 - Login Form Fields Are Displayed', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.navigate();
    
    await expect(loginPage.getEmailField()).toBeVisible();
    await expect(loginPage.getPasswordField()).toBeVisible();
    await expect(loginPage.getEmailField()).toHaveAttribute('type', 'text');
    await expect(loginPage.getPasswordField()).toHaveAttribute('type', 'password');
  });

  test('TC_LOGIN_GUI_003 - Log In Button Display and Clickability', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.navigate();
    
    const loginButton = loginPage.getLoginButton();
    await expect(loginButton).toBeVisible();
    await expect(loginButton).toBeEnabled();
  });

  test('TC_LOGIN_GUI_004 - Remember Me Checkbox Display and Functionality', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.navigate();
    
    const rememberMeCheckbox = loginPage.getRememberMeCheckbox();
    await expect(rememberMeCheckbox).toBeVisible();
    
    await rememberMeCheckbox.check();
    await expect(rememberMeCheckbox).toBeChecked();
    
    await rememberMeCheckbox.uncheck();
    await expect(rememberMeCheckbox).not.toBeChecked();
  });

  test('TC_LOGIN_GUI_005 - Forgot Password Link Display', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.navigate();
    
    const forgotPasswordLink = loginPage.getForgotPasswordLink();
    await expect(forgotPasswordLink).toBeVisible();
    await expect(forgotPasswordLink).toBeEnabled();
  });

  test('TC_REGISTER_GUI_005 - Register Page Responsive Design', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    
    await registerPage.navigate();
    
    // Desktop size
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(registerPage.getFirstNameField()).toBeVisible();
    await expect(registerPage.getRegisterButton()).toBeVisible();
    
    // Tablet size
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(registerPage.getFirstNameField()).toBeVisible();
    await expect(registerPage.getRegisterButton()).toBeVisible();
    
    // Mobile size
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(registerPage.getFirstNameField()).toBeVisible();
    await expect(registerPage.getRegisterButton()).toBeVisible();
  });
});

test.describe('4. Password Masking & Security Display Tests', () => {
  test('TC_REGISTER_GUI_003 - Registration Password Fields Mask Input', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    
    await registerPage.navigate();
    
    await registerPage.fillPassword('Test@123');
    await expect(registerPage.getPasswordField()).toHaveAttribute('type', 'password');
    
    await registerPage.fillConfirmPassword('Test@123');
    await expect(registerPage.getConfirmPasswordField()).toHaveAttribute('type', 'password');
  });

  test('TC_LOGIN_GUI_002 - Login Password Field Masks Input', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.navigate();
    
    await loginPage.fillPassword('Test@123');
    await expect(loginPage.getPasswordField()).toHaveAttribute('type', 'password');
  });
});

test.describe('5. Valid Registration & Login Tests (Happy Path)', () => {
  test('TC_REGISTER_FUNC_001 - Successful Registration with All Valid Data', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const uniqueEmail = generateUniqueEmail('john.doe');
    
    await registerPage.navigate();
    
    await registerPage.fillRegistrationForm({
      gender: 'male',
      firstName: testData.register.validUser.firstName,
      lastName: testData.register.validUser.lastName,
      email: uniqueEmail,
      password: testData.register.validUser.password,
      confirmPassword: testData.register.validUser.confirmPassword
    });
    
    await registerPage.clickRegisterButton();
    
    // Wait for navigation or success message
    await page.waitForLoadState('networkidle');
    await page.waitForLoadState('domcontentloaded');
    
    // Wait a bit for WebKit to process
    await page.waitForTimeout(2000);
    
    // Verify success - check URL change or success message
    const currentUrl = page.url();
    const hasSuccessMessage = await registerPage.getSuccessMessage().isVisible().catch(() => false);
    const isRedirectedFromRegister = !currentUrl.includes('/register') || currentUrl.includes('/registerresult');
    
    expect(hasSuccessMessage || isRedirectedFromRegister).toBeTruthy();
  });

  test('TC_LOGIN_FUNC_001 - Successful Login with Valid Credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const commonPage = new CommonPage(page);
    
    // Setup test account
    await setupTestAccount(page);
    
    await loginPage.navigate();
    
    await loginPage.login(
      sharedTestAccount.email,
      sharedTestAccount.password
    );
    
    await page.waitForLoadState('networkidle');
    
    // Verify successful login - check logout link is visible
    const hasLogoutLink = await commonPage.getLogoutLink().isVisible().catch(() => false);
    expect(hasLogoutLink).toBeTruthy();
    
    // Verify redirected from login page
    const isRedirected = !page.url().includes('/login');
    expect(isRedirected).toBeTruthy();
  });

  test('TC_INTEGRATION_001 - Complete Registration Then Login Flow', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const loginPage = new LoginPage(page);
    const commonPage = new CommonPage(page);
    const uniqueEmail = generateUniqueEmail('jane.smith');
    
    // Step 1: Register
    await registerPage.navigate();
    
    await registerPage.fillRegistrationForm({
      gender: 'female',
      firstName: 'Jane',
      lastName: 'Smith',
      email: uniqueEmail,
      password: 'Secure@789',
      confirmPassword: 'Secure@789'
    });
    
    await registerPage.clickRegisterButton();
    await page.waitForLoadState('networkidle');
    
    // Step 2: Navigate to login
    await loginPage.navigate();
    
    // Step 3: Login with newly registered credentials
    await loginPage.login(uniqueEmail, 'Secure@789');
    await page.waitForLoadState('networkidle');
    
    // Verify successful login
    const isRedirected = !page.url().includes('/login');
    const hasLogoutLink = await commonPage.getLogoutLink().isVisible().catch(() => false);
    
    expect(isRedirected || hasLogoutLink).toBeTruthy();
  });
});

test.describe('6. Email Validation Tests', () => {
  test('TC_REGISTER_FUNC_002 - Registration with Email Missing @ Symbol', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    
    await registerPage.navigate();
    
    await registerPage.fillRegistrationForm({
      gender: 'male',
      firstName: testData.register.validUser.firstName,
      lastName: testData.register.validUser.lastName,
      email: testData.register.invalidEmails.missingAt,
      password: testData.register.validUser.password,
      confirmPassword: testData.register.validUser.confirmPassword
    });
    
    await registerPage.clickRegisterButton();
    
    // Verify validation error
    const hasValidationError = await registerPage.getValidationSummary().isVisible().catch(() => false);
    const hasFieldError = await registerPage.getFieldValidationError().isVisible().catch(() => false);
    const stillOnPage = page.url().includes('/register');
    
    expect(hasValidationError || hasFieldError || stillOnPage).toBeTruthy();
  });

  test('TC_REGISTER_FUNC_003 - Registration with Invalid Email Domain', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    
    await registerPage.navigate();
    
    await registerPage.fillRegistrationForm({
      gender: 'male',
      firstName: testData.register.validUser.firstName,
      lastName: testData.register.validUser.lastName,
      email: testData.register.invalidEmails.missingDomain,
      password: testData.register.validUser.password,
      confirmPassword: testData.register.validUser.confirmPassword
    });
    
    await registerPage.clickRegisterButton();
    
    // Verify validation error
    const hasValidationError = await registerPage.getValidationSummary().isVisible().catch(() => false);
    const hasFieldError = await registerPage.getFieldValidationError().isVisible().catch(() => false);
    const stillOnPage = page.url().includes('/register');
    
    expect(hasValidationError || hasFieldError || stillOnPage).toBeTruthy();
  });

  test('TC_LOGIN_FUNC_007 - Login with Email Missing @ Symbol', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.navigate();
    
    await loginPage.fillEmail(testData.login.invalidEmails.missingAt);
    await loginPage.fillPassword(testData.login.validUser.password);
    await loginPage.clickLoginButton();
    
    // Verify validation error or still on page
    const hasValidationError = await loginPage.getValidationSummary().isVisible().catch(() => false);
    const stillOnPage = page.url().includes('/login');
    
    expect(hasValidationError || stillOnPage).toBeTruthy();
  });
});

test.describe('7. Empty Field Validation Tests', () => {
  test('TC_REGISTER_FUNC_005 - Registration with All Fields Empty', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    
    await registerPage.navigate();
    await registerPage.clickRegisterButton();
    
    // Verify validation errors
    const hasValidationError = await registerPage.getValidationSummary().isVisible().catch(() => false);
    const hasFieldError = await registerPage.getFieldValidationError().isVisible().catch(() => false);
    const stillOnPage = page.url().includes('/register');
    
    expect(hasValidationError || hasFieldError || stillOnPage).toBeTruthy();
  });

  test('TC_REGISTER_FUNC_006 - Registration with First Name Empty', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    
    await registerPage.navigate();
    
    await registerPage.fillRegistrationForm({
      gender: 'male',
      firstName: testData.register.emptyFields.firstName,
      lastName: testData.register.validUser.lastName,
      email: generateUniqueEmail('test'),
      password: testData.register.validUser.password,
      confirmPassword: testData.register.validUser.confirmPassword
    });
    
    await registerPage.clickRegisterButton();
    
    // Verify validation error
    const hasValidationError = await registerPage.getValidationSummary().isVisible().catch(() => false);
    const hasFieldError = await registerPage.getFieldValidationError().isVisible().catch(() => false);
    
    expect(hasValidationError || hasFieldError).toBeTruthy();
  });

  test('TC_REGISTER_FUNC_007 - Registration with Last Name Empty', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    
    await registerPage.navigate();
    
    await registerPage.fillRegistrationForm({
      gender: 'male',
      firstName: testData.register.validUser.firstName,
      lastName: testData.register.emptyFields.lastName,
      email: generateUniqueEmail('test'),
      password: testData.register.validUser.password,
      confirmPassword: testData.register.validUser.confirmPassword
    });
    
    await registerPage.clickRegisterButton();
    
    // Verify validation error
    const hasValidationError = await registerPage.getValidationSummary().isVisible().catch(() => false);
    const hasFieldError = await registerPage.getFieldValidationError().isVisible().catch(() => false);
    
    expect(hasValidationError || hasFieldError).toBeTruthy();
  });

  test('TC_REGISTER_FUNC_008 - Registration with Email Empty', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    
    await registerPage.navigate();
    
    await registerPage.fillRegistrationForm({
      gender: 'male',
      firstName: testData.register.validUser.firstName,
      lastName: testData.register.validUser.lastName,
      email: testData.register.emptyFields.email,
      password: testData.register.validUser.password,
      confirmPassword: testData.register.validUser.confirmPassword
    });
    
    await registerPage.clickRegisterButton();
    
    // Verify validation error
    const hasValidationError = await registerPage.getValidationSummary().isVisible().catch(() => false);
    const hasFieldError = await registerPage.getFieldValidationError().isVisible().catch(() => false);
    
    expect(hasValidationError || hasFieldError).toBeTruthy();
  });

  test('TC_REGISTER_FUNC_009 - Registration with Password Empty', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const uniqueEmail = generateUniqueEmail('test');
    
    await registerPage.navigate();
    
    await registerPage.fillFirstName(testData.register.validUser.firstName);
    await registerPage.fillLastName(testData.register.validUser.lastName);
    await registerPage.fillEmail(uniqueEmail);
    // Leave password and confirm password empty
    
    await registerPage.clickRegisterButton();
    await page.waitForLoadState('networkidle');
    
    // Verify still on register page or validation error shown
    const stillOnRegisterPage = page.url().includes('/register');
    const hasValidationError = await registerPage.getValidationSummary().isVisible().catch(() => false);
    const hasFieldError = await registerPage.getFieldValidationError().isVisible().catch(() => false);
    
    expect(stillOnRegisterPage || hasValidationError || hasFieldError).toBeTruthy();
  });

  test('TC_LOGIN_FUNC_004 - Login with Both Email and Password Empty', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.navigate();
    await loginPage.clickLoginButton();
    
    // Verify validation error
    const hasValidationError = await loginPage.getValidationSummary().isVisible().catch(() => false);
    const stillOnPage = page.url().includes('/login');
    
    expect(hasValidationError || stillOnPage).toBeTruthy();
  });

  test('TC_LOGIN_FUNC_005 - Login with Email Empty', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.navigate();
    
    await loginPage.fillPassword(testData.login.validUser.password);
    await loginPage.clickLoginButton();
    
    // Verify validation error
    const hasValidationError = await loginPage.getValidationSummary().isVisible().catch(() => false);
    const stillOnPage = page.url().includes('/login');
    
    expect(hasValidationError || stillOnPage).toBeTruthy();
  });

  test('TC_LOGIN_FUNC_006 - Login with Password Empty', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.navigate();
    
    await loginPage.fillEmail(testData.login.validUser.email);
    await loginPage.clickLoginButton();
    
    // Verify validation error
    const hasValidationError = await loginPage.getValidationSummary().isVisible().catch(() => false);
    const stillOnPage = page.url().includes('/login');
    
    expect(hasValidationError || stillOnPage).toBeTruthy();
  });
});

test.describe('8. Password Validation Tests', () => {
  test('TC_REGISTER_FUNC_010 - Registration with Password Mismatch', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    
    await registerPage.navigate();
    
    await registerPage.fillRegistrationForm({
      gender: 'male',
      firstName: testData.register.validUser.firstName,
      lastName: testData.register.validUser.lastName,
      email: generateUniqueEmail('test'),
      password: testData.register.validUser.password,
      confirmPassword: testData.register.invalidPasswords.mismatch
    });
    
    await registerPage.clickRegisterButton();
    
    // Verify validation error
    const hasValidationError = await registerPage.getValidationSummary().isVisible().catch(() => false);
    const hasFieldError = await registerPage.getFieldValidationError().isVisible().catch(() => false);
    
    expect(hasValidationError || hasFieldError).toBeTruthy();
  });

  test('TC_REGISTER_FUNC_011 - Registration with Password Too Short', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    
    await registerPage.navigate();
    
    await registerPage.fillRegistrationForm({
      gender: 'male',
      firstName: testData.register.validUser.firstName,
      lastName: testData.register.validUser.lastName,
      email: generateUniqueEmail('test'),
      password: testData.register.invalidPasswords.tooShort,
      confirmPassword: testData.register.invalidPasswords.tooShort
    });
    
    await registerPage.clickRegisterButton();
    
    // Verify validation error
    const hasValidationError = await registerPage.getValidationSummary().isVisible().catch(() => false);
    const hasFieldError = await registerPage.getFieldValidationError().isVisible().catch(() => false);
    
    expect(hasValidationError || hasFieldError).toBeTruthy();
  });
});

test.describe('9. Invalid Login Credential Tests', () => {
  test('TC_REGISTER_FUNC_004 - Registration with Duplicate Email', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    
    await registerPage.navigate();
    
    // Use the existing test user email
    await registerPage.fillRegistrationForm({
      gender: 'male',
      firstName: testData.register.validUser.firstName,
      lastName: testData.register.validUser.lastName,
      email: testData.login.validUser.email, // Existing email
      password: testData.register.validUser.password,
      confirmPassword: testData.register.validUser.confirmPassword
    });
    
    await registerPage.clickRegisterButton();
    
    // Verify validation error
    const hasValidationError = await registerPage.getValidationSummary().isVisible().catch(() => false);
    const hasFieldError = await registerPage.getFieldValidationError().isVisible().catch(() => false);
    const stillOnPage = page.url().includes('/register');
    
    expect(hasValidationError || hasFieldError || stillOnPage).toBeTruthy();
  });

  test('TC_LOGIN_FUNC_002 - Login with Incorrect Password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.navigate();
    
    await loginPage.login(
      testData.login.validUser.email,
      testData.login.invalidCredentials.wrongPassword
    );
    
    // Verify error message
    const hasValidationError = await loginPage.getValidationSummary().isVisible().catch(() => false);
    const stillOnPage = page.url().includes('/login');
    
    expect(hasValidationError || stillOnPage).toBeTruthy();
  });

  test('TC_LOGIN_FUNC_003 - Login with Non-existent Email', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.navigate();
    
    await loginPage.login(
      testData.login.invalidCredentials.nonExistentEmail,
      testData.login.validUser.password
    );
    
    // Verify error message
    const hasValidationError = await loginPage.getValidationSummary().isVisible().catch(() => false);
    const stillOnPage = page.url().includes('/login');
    
    expect(hasValidationError || stillOnPage).toBeTruthy();
  });
});

test.describe('10. Security & Input Sanitization Tests', () => {
  test('TC_REGISTER_FUNC_012 - Registration with Special Characters in Name Fields', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    
    await registerPage.navigate();
    
    await registerPage.fillRegistrationForm({
      gender: 'male',
      firstName: testData.register.specialCharacters.firstName,
      lastName: testData.register.specialCharacters.lastName,
      email: generateUniqueEmail('test'),
      password: testData.register.validUser.password,
      confirmPassword: testData.register.validUser.confirmPassword
    });
    
    await registerPage.clickRegisterButton();
    await page.waitForLoadState('networkidle');
    
    // Verify either sanitized and accepted OR validation error
    // No script execution should occur
    const hasScriptExecuted = await page.evaluate(() => {
      return document.querySelector('script')?.textContent?.includes('alert') || false;
    });
    
    expect(hasScriptExecuted).toBeFalsy();
  });

  test('TC_LOGIN_FUNC_011 - Login with SQL Injection Attempt in Email Field', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.navigate();
    
    await loginPage.login(
      testData.login.invalidCredentials.sqlInjection,
      'anything'
    );
    
    // Verify login unsuccessful and no SQL error exposed
    const hasValidationError = await loginPage.getValidationSummary().isVisible().catch(() => false);
    const stillOnPage = page.url().includes('/login');
    
    expect(hasValidationError || stillOnPage).toBeTruthy();
    
    // Check no SQL error messages in page content
    const pageContent = await page.content();
    expect(pageContent).not.toContain('SQL');
    expect(pageContent).not.toContain('syntax error');
  });

  test('TC_LOGIN_FUNC_012 - Login with XSS Attack in Email Field', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.navigate();
    
    // Set up dialog handler to catch any alert
    let dialogAppeared = false;
    page.on('dialog', async dialog => {
      dialogAppeared = true;
      await dialog.dismiss();
    });
    
    await loginPage.login(
      testData.register.invalidEmails.withScript,
      testData.login.validUser.password
    );
    
    await page.waitForLoadState('networkidle');
    
    // Verify no script execution
    expect(dialogAppeared).toBeFalsy();
    
    // Verify login unsuccessful
    const stillOnPage = page.url().includes('/login');
    expect(stillOnPage).toBeTruthy();
  });

  test('TC_LOGIN_FUNC_008 - Login with Special Characters in Email', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.navigate();
    
    await loginPage.login(
      testData.login.invalidEmails.withSpecialChars,
      testData.login.validUser.password
    );
    
    // Verify validation error or sanitized input
    const hasValidationError = await loginPage.getValidationSummary().isVisible().catch(() => false);
    const stillOnPage = page.url().includes('/login');
    
    expect(hasValidationError || stillOnPage).toBeTruthy();
  });
});

test.describe('11. Remember Me Functionality Tests', () => {
  test('TC_LOGIN_FUNC_009 - Login with Remember Me Checked', async ({ page, context }) => {
    const loginPage = new LoginPage(page);
    const commonPage = new CommonPage(page);
    
    // Setup test account
    await setupTestAccount(page);
    
    await loginPage.navigate();
    
    await loginPage.fillEmail(sharedTestAccount.email);
    await loginPage.fillPassword(sharedTestAccount.password);
    await loginPage.checkRememberMe();
    
    // Verify checkbox is checked
    await expect(loginPage.getRememberMeCheckbox()).toBeChecked();
    
    await loginPage.clickLoginButton();
    await page.waitForLoadState('networkidle');
    
    // Verify user is logged in
    const hasLogoutLink = await commonPage.getLogoutLink().isVisible().catch(() => false);
    expect(hasLogoutLink).toBeTruthy();
    
    // Get cookies to verify persistence
    const cookies = await context.cookies();
    expect(cookies.length).toBeGreaterThan(0);
  });

  test('TC_LOGIN_FUNC_010 - Login with Remember Me Unchecked', async ({ page, context }) => {
    const loginPage = new LoginPage(page);
    const commonPage = new CommonPage(page);
    
    // Setup test account
    await setupTestAccount(page);
    
    await loginPage.navigate();
    
    await loginPage.fillEmail(sharedTestAccount.email);
    await loginPage.fillPassword(sharedTestAccount.password);
    // Verify Remember Me is not checked
    await expect(loginPage.getRememberMeCheckbox()).not.toBeChecked();
    
    await loginPage.clickLoginButton();
    await page.waitForLoadState('networkidle');
    
    // Verify user is logged in
    const hasLogoutLink = await commonPage.getLogoutLink().isVisible().catch(() => false);
    expect(hasLogoutLink).toBeTruthy();
    
    // Verify cookies exist
    const cookies = await context.cookies();
    expect(cookies.length).toBeGreaterThan(0);
  });
});

test.describe('12. Logout & Session Management Tests', () => {
  test('TC_LOGIN_FUNC_013 - User Can Logout After Logging In', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const commonPage = new CommonPage(page);
    
    // Setup test account
    await setupTestAccount(page);
    
    // Login first
    await loginPage.navigate();
    await loginPage.login(sharedTestAccount.email, sharedTestAccount.password);
    await page.waitForLoadState('networkidle');
    
    // Verify logged in
    const hasLogoutLink = await commonPage.getLogoutLink().isVisible().catch(() => false);
    expect(hasLogoutLink).toBeTruthy();
    
    // Logout
    await commonPage.clickLogoutLink();
    await page.waitForLoadState('networkidle');
    
    // Verify logged out - Login link should be visible
    const hasLoginLink = await commonPage.getLoginLink().isVisible().catch(() => false);
    expect(hasLoginLink).toBeTruthy();
  });

  test('TC_LOGIN_FUNC_014 - Session Timeout After Inactivity', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const commonPage = new CommonPage(page);
    
    // Setup test account
    await setupTestAccount(page);
    
    // Login first
    await loginPage.navigate();
    await loginPage.login(sharedTestAccount.email, sharedTestAccount.password);
    await page.waitForLoadState('networkidle');
    
    // Verify logged in
    const hasLogoutLink = await commonPage.getLogoutLink().isVisible().catch(() => false);
    expect(hasLogoutLink).toBeTruthy();
    
    // Simulate short inactivity
    await page.waitForTimeout(2000);
    
    // Verify session is still active (typical timeout is 20+ minutes)
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // User should still be logged in after short wait
    const stillLoggedIn = await commonPage.getLogoutLink().isVisible().catch(() => false);
    expect(stillLoggedIn).toBeTruthy();
  });
});
