# DemoWebShop - Authentication Tests

## 📁 Project Structure

```
demowebshop-tricentis-site-tests/
├── tests/
│   └── authentication/
│       └── register-login.spec.ts    # Main test file (35 test cases)
├── pages/
│   ├── register-page.ts              # Register page object
│   ├── login-page.ts                 # Login page object
│   └── common-page.ts                # Common navigation elements
├── selectors/
│   └── authentication.json           # All selectors for auth pages
├── data/
│   └── authentication.json           # Test data for auth tests
└── test-specifications/
    └── register-login-test-spec.md   # Test specification document
```

## 🎯 Test Coverage

**Total Test Cases: 35**

### Test Groups:
1. **Page Access & Navigation** (6 tests) - TC_REGISTER_ACC_001, TC_REGISTER_ACC_003, TC_LOGIN_ACC_001, TC_LOGIN_ACC_003, TC_INTEGRATION_002, TC_INTEGRATION_003
2. **Authenticated User Access Control** (2 tests) - TC_REGISTER_ACC_002, TC_LOGIN_ACC_002
3. **UI Element Visibility** (8 tests) - TC_REGISTER_GUI_001-005, TC_LOGIN_GUI_001, TC_LOGIN_GUI_003-005
4. **Password Masking & Security Display** (2 tests) - TC_REGISTER_GUI_003, TC_LOGIN_GUI_002
5. **Valid Registration & Login (Happy Path)** (3 tests) - TC_REGISTER_FUNC_001, TC_LOGIN_FUNC_001, TC_INTEGRATION_001
6. **Email Validation** (3 tests) - TC_REGISTER_FUNC_002-003, TC_LOGIN_FUNC_007
7. **Empty Field Validation** (7 tests) - TC_REGISTER_FUNC_005-009, TC_LOGIN_FUNC_004-006
8. **Password Validation** (2 tests) - TC_REGISTER_FUNC_010-011
9. **Invalid Login Credentials** (3 tests) - TC_REGISTER_FUNC_004, TC_LOGIN_FUNC_002-003
10. **Security & Input Sanitization** (4 tests) - TC_REGISTER_FUNC_012, TC_LOGIN_FUNC_008, TC_LOGIN_FUNC_011-012
11. **Remember Me Functionality** (2 tests) - TC_LOGIN_FUNC_009-010
12. **Logout & Session Management** (2 tests) - TC_LOGIN_FUNC_013-014

## 🏗️ Architecture

### Page Object Model (POM)
- **RegisterPage**: All interactions with registration page
- **LoginPage**: All interactions with login page
- **CommonPage**: Common navigation elements (header links)

### Selector Management
- All selectors extracted to `selectors/authentication.json`
- No hardcoded selectors in test files
- Easy maintenance and updates

### Test Data Management
- All test data in `data/authentication.json`
- Separated from test logic
- Includes valid/invalid scenarios
- URLs centralized

## 🚀 Running Tests

### Run all authentication tests
```bash
npx playwright test tests/authentication/register-login.spec.ts
```

### Run specific test group
```bash
npx playwright test tests/authentication/register-login.spec.ts -g "Page Access"
```

### Run by test case ID
```bash
npx playwright test tests/authentication/register-login.spec.ts -g "TC_LOGIN_FUNC_001"
```

### Run in headed mode
```bash
npx playwright test tests/authentication/register-login.spec.ts --headed
```

### Run with specific browser
```bash
npx playwright test tests/authentication/register-login.spec.ts --project=chromium
```

### Debug mode
```bash
npx playwright test tests/authentication/register-login.spec.ts --debug
```

## 📊 Test Priorities

- **Critical** (7 tests): Core registration, login, security
- **High** (20 tests): Access control, validation, UI elements
- **Medium** (7 tests): UI features, remember me, session management
- **Low** (1 test): UI checkbox functionality

## 🔍 Test Types

- **Positive Testing** (3 tests): Valid scenarios
- **Negative Testing** (11 tests): Invalid inputs, error handling
- **Security Testing** (4 tests): XSS, SQL injection prevention
- **UI/UX Testing** (10 tests): Element visibility, responsiveness
- **Access Control** (4 tests): Permission validation
- **Navigation** (4 tests): Inter-page navigation
- **Functional** (4 tests): Session, logout, remember me
- **Integration** (1 test): End-to-end flow

## 📝 Key Features

### ✅ Best Practices Implemented
- Page Object Model for maintainability
- Separated selectors for easy updates
- Centralized test data
- Unique email generation for registration tests
- Proper wait strategies (networkidle)
- Comprehensive error handling
- Security testing (XSS, SQL injection)
- Cross-browser testing support
- Responsive design validation

### 🛡️ Security Tests
- SQL Injection prevention (TC_LOGIN_FUNC_011)
- XSS Attack prevention (TC_LOGIN_FUNC_012)
- Special characters handling (TC_REGISTER_FUNC_012, TC_LOGIN_FUNC_008)
- Input sanitization validation

### 🔄 Test Data Generation
- Dynamic email generation using timestamps
- Prevents email collision in registration tests
- Format: `prefix.{timestamp}@test.com`

## 🧪 Sample Test Execution

```bash
# Run all tests
npx playwright test

# Run with UI
npx playwright test --ui

# Generate report
npx playwright show-report

# Run specific browser
npx playwright test --project=chromium

# Parallel execution
npx playwright test --workers=4
```

## 📈 Maintenance

### Adding New Tests
1. Add test case to specification file
2. Update selectors in `selectors/authentication.json` if needed
3. Add test data to `data/authentication.json` if needed
4. Add page object methods if needed
5. Write test in `tests/authentication/register-login.spec.ts`

### Updating Selectors
- Edit `selectors/authentication.json`
- No need to modify test files
- Single source of truth for all locators

### Updating Test Data
- Edit `data/authentication.json`
- Centralized test data management
- Easy to add new scenarios

## 🎯 Coverage Matrix

| Feature | Positive | Negative | Security | UI | Total |
|---------|----------|----------|----------|----|----- |
| Registration | 1 | 8 | 1 | 5 | 15 |
| Login | 2 | 7 | 3 | 5 | 17 |
| Navigation | 4 | 0 | 0 | 0 | 4 |
| **Total** | **7** | **15** | **4** | **10** | **36** |

## 📞 Support

For issues or questions:
1. Check test specification: `test-specifications/register-login-test-spec.md`
2. Review workflow: `.github/prompts/3_test_generation_workflow.md`
3. Verify selectors: `selectors/authentication.json`
4. Check test data: `data/authentication.json`

## 🔗 Related Files

- **Test Specification**: [register-login-test-spec.md](../test-specifications/register-login-test-spec.md)
- **CSV Test Cases**: [register-login-test-cases.csv](../test-cases/register-login-test-cases.csv)
- **Workflow Guide**: [3_test_generation_workflow.md](../.github/prompts/3_test_generation_workflow.md)
