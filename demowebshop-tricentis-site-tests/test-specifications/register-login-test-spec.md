# DemoWebShop - User Registration & Login Test Plan

## Application Overview

The DemoWebShop (https://demowebshop.tricentis.com/) provides a comprehensive e-commerce platform with user authentication capabilities. This test plan covers the complete user registration and login functionality, including:

- **User Registration**: New user account creation with gender selection, personal information (first name, last name), email validation, and password management
- **User Authentication**: Login functionality with email/password credentials, remember me option, and session management
- **Access Control**: Permission validation for authenticated and unauthenticated users accessing registration and login pages
- **Navigation**: Inter-page navigation between register, login, and main application pages
- **Security**: Input validation, XSS protection, SQL injection prevention, and secure password handling
- **Session Management**: User session persistence, logout functionality, and session timeout handling

---

## Test Scenarios

**File:** `tests/authentication/register-login.spec.ts`

_Note: All test scenarios below will be generated in this single file. Test cases are reorganized by similar actions and operations to enable code reusability and optimization through shared helper functions._

---

## 1. Page Access & Navigation Tests

### TC_REGISTER_ACC_001 - Unauthenticated User Can Access Register Page via Direct URL

**Pre-conditions:**
- User is not logged in
- Browser is open

**Test Data:**
```json
{
  "url": "https://demowebshop.tricentis.com/register"
}
```

**Steps:**
1. Open browser
2. Navigate to https://demowebshop.tricentis.com/register
3. Verify page loads

**Expected Results:**
- Register page displayed successfully with registration form
- Page title contains "Register"
- All registration form fields are visible

---

### TC_REGISTER_ACC_003 - User Can Access Register Page from Homepage Menu

**Pre-conditions:**
- Browser open on homepage

**Test Data:**
```json
{
  "url": "https://demowebshop.tricentis.com"
}
```

**Steps:**
1. Navigate to homepage at https://demowebshop.tricentis.com
2. Click on 'Register' link in top menu
3. Verify redirect to register page

**Expected Results:**
- Register page displayed successfully
- URL changes to /register
- Registration form is visible

---

### TC_LOGIN_ACC_001 - Unauthenticated User Can Access Login Page via Direct URL

**Pre-conditions:**
- User is not logged in
- Browser is open

**Test Data:**
```json
{
  "url": "https://demowebshop.tricentis.com/login"
}
```

**Steps:**
1. Open browser
2. Navigate to https://demowebshop.tricentis.com/login
3. Verify page loads

**Expected Results:**
- Login page displayed successfully with login form
- Page title contains "Login"
- Email and password fields are visible

---

### TC_LOGIN_ACC_003 - User Can Access Login Page from Homepage Menu

**Pre-conditions:**
- Browser open on homepage

**Test Data:**
```json
{
  "url": "https://demowebshop.tricentis.com"
}
```

**Steps:**
1. Navigate to homepage at https://demowebshop.tricentis.com
2. Click on 'Log in' link in top menu
3. Verify redirect to login page

**Expected Results:**
- Login page displayed successfully
- URL changes to /login
- Login form is visible

---

### TC_INTEGRATION_002 - Navigation from Register Page to Login Page

**Pre-conditions:**
- User on register page

**Steps:**
1. Navigate to register page
2. Locate link/button to login page
3. Click on the login page link

**Expected Results:**
- User navigated to login page successfully
- URL changes to /login
- Login form is displayed

---

### TC_INTEGRATION_003 - Navigation from Login Page to Register Page

**Pre-conditions:**
- User on login page

**Steps:**
1. Navigate to login page
2. Locate link/button to register page (if exists)
3. Click on the register page link

**Expected Results:**
- User navigated to register page successfully
- URL changes to /register
- Registration form is displayed

---

## 2. Authenticated User Access Control Tests

### TC_REGISTER_ACC_002 - Authenticated User Accessing Register Page

**Pre-conditions:**
- User is already logged in

**Test Data:**
```json
{
  "url": "https://demowebshop.tricentis.com/register",
  "email": "validuser@test.com",
  "password": "Test@123456"
}
```

**Steps:**
1. Login with valid credentials (email: validuser@test.com, password: Test@123456)
2. Navigate to https://demowebshop.tricentis.com/register
3. Observe behavior

**Expected Results:**
- User redirected to customer account page OR register page displayed with message
- No duplicate registration allowed
- Appropriate access control message displayed

---

### TC_LOGIN_ACC_002 - Authenticated User Accessing Login Page

**Pre-conditions:**
- User is already logged in

**Test Data:**
```json
{
  "url": "https://demowebshop.tricentis.com/login",
  "email": "validuser@test.com",
  "password": "Test@123456"
}
```

**Steps:**
1. Login with valid credentials (email: validuser@test.com, password: Test@123456)
2. Navigate to https://demowebshop.tricentis.com/login
3. Observe behavior

**Expected Results:**
- User redirected to account dashboard or homepage
- Login page not accessible when already logged in
- User remains authenticated

---

## 3. UI Element Visibility Tests

### TC_REGISTER_GUI_001 - Gender Radio Buttons Display and Functionality

**Pre-conditions:**
- User on register page

**Steps:**
1. Navigate to register page
2. Locate gender radio buttons (Male/Female)
3. Click Male radio button
4. Verify Male is selected
5. Click Female radio button
6. Verify Female is selected and Male is deselected

**Expected Results:**
- Both radio buttons are visible with clear labels
- Radio buttons are clickable
- Radio buttons are mutually exclusive (only one can be selected at a time)
- Selected state is visually indicated

---

### TC_REGISTER_GUI_002 - All Registration Input Fields Are Displayed

**Pre-conditions:**
- User on register page

**Steps:**
1. Navigate to register page
2. Verify presence of First name input field
3. Verify presence of Last name input field
4. Verify presence of Email input field
5. Verify presence of Password input field
6. Verify presence of Confirm password input field

**Expected Results:**
- All input fields are visible
- Each field has appropriate label text
- Fields are in logical order
- All fields are enabled and ready for input

---

### TC_REGISTER_GUI_004 - Register Button Display and Clickability

**Pre-conditions:**
- User on register page

**Steps:**
1. Navigate to register page
2. Locate Register button
3. Verify button text is "Register"
4. Verify button styling and enabled state

**Expected Results:**
- Register button is visible
- Button is properly styled with clear text
- Button is enabled and clickable
- Button has appropriate styling for a call-to-action

---

### TC_LOGIN_GUI_001 - Login Form Fields Are Displayed

**Pre-conditions:**
- User on login page

**Steps:**
1. Navigate to login page
2. Verify Email field is present with label
3. Verify Password field is present with label
4. Verify field labels are clear

**Expected Results:**
- Both Email and Password fields are visible
- Fields have appropriate labels ("Email", "Password")
- Fields are enabled and ready for input
- Fields have proper input types (email, password)

---

### TC_LOGIN_GUI_003 - Log In Button Display and Clickability

**Pre-conditions:**
- User on login page

**Steps:**
1. Navigate to login page
2. Locate Log in button
3. Verify button text
4. Verify styling and enabled state

**Expected Results:**
- Log in button is visible
- Button is properly styled with clear text
- Button is enabled and clickable
- Button has appropriate styling

---

### TC_LOGIN_GUI_004 - Remember Me Checkbox Display and Functionality

**Pre-conditions:**
- User on login page

**Steps:**
1. Navigate to login page
2. Locate 'Remember me' checkbox
3. Click to check the checkbox
4. Verify checked state
5. Click to uncheck the checkbox
6. Verify unchecked state

**Expected Results:**
- Remember me checkbox is visible with label
- Checkbox toggles between checked and unchecked states
- Visual feedback for checked/unchecked states
- Label is clickable and toggles checkbox

---

### TC_LOGIN_GUI_005 - Forgot Password Link Display

**Pre-conditions:**
- User on login page

**Steps:**
1. Navigate to login page
2. Locate 'Forgot password' link
3. Verify link text
4. Verify link is clickable

**Expected Results:**
- Forgot password link is visible
- Link has clear text (e.g., "Forgot password?")
- Link is styled appropriately (underlined or colored)
- Link is clickable

---

### TC_REGISTER_GUI_005 - Register Page Responsive Design

**Pre-conditions:**
- User on register page

**Steps:**
1. Navigate to register page
2. Resize browser window to desktop size (1920x1080)
3. Verify layout
4. Resize browser window to tablet size (768x1024)
5. Verify layout adjusts
6. Resize browser window to mobile size (375x667)
7. Verify layout adjusts

**Expected Results:**
- Page layout adjusts appropriately to different screen sizes
- All elements remain accessible and visible
- No horizontal scrolling required
- Form fields stack vertically on smaller screens
- Buttons remain accessible and properly sized

---

## 4. Password Masking & Security Display Tests

### TC_REGISTER_GUI_003 - Registration Password Fields Mask Input

**Pre-conditions:**
- User on register page

**Test Data:**
```json
{
  "password": "Test@123"
}
```

**Steps:**
1. Navigate to register page
2. Click in Password field
3. Type "Test@123"
4. Verify characters are masked
5. Click in Confirm password field
6. Type "Test@123"
7. Verify characters are masked

**Expected Results:**
- Password characters displayed as dots/asterisks (●●●●●●●●)
- Confirm password characters displayed as dots/asterisks
- Actual password text is not visible
- Field type is "password"

---

### TC_LOGIN_GUI_002 - Login Password Field Masks Input

**Pre-conditions:**
- User on login page

**Test Data:**
```json
{
  "password": "Test@123"
}
```

**Steps:**
1. Navigate to login page
2. Click in Password field
3. Type "Test@123"
4. Verify characters are masked as dots/asterisks

**Expected Results:**
- Password characters displayed as dots/asterisks (●●●●●●●●)
- Actual password text is not visible
- Field type is "password"

---

## 5. Valid Registration & Login Tests (Happy Path)

### TC_REGISTER_FUNC_001 - Successful Registration with All Valid Data

**Pre-conditions:**
- User on register page not logged in

**Test Data:**
```json
{
  "gender": "Male",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe.{timestamp}@test.com",
  "password": "Test@123456",
  "confirmPassword": "Test@123456"
}
```

**Steps:**
1. Navigate to register page
2. Select gender radio button: Male
3. Click in First name field
4. Type "John"
5. Click in Last name field
6. Type "Doe"
7. Click in Email field
8. Type "john.doe.{timestamp}@test.com" (use unique timestamp)
9. Click in Password field
10. Type "Test@123456"
11. Click in Confirm password field
12. Type "Test@123456"
13. Click Register button
14. Wait for response

**Expected Results:**
- Registration successful
- Success message displayed (e.g., "Your registration completed")
- User redirected to confirmation page or account page
- User is automatically logged in OR shown login prompt
- No error messages displayed

---

### TC_LOGIN_FUNC_001 - Successful Login with Valid Credentials

**Pre-conditions:**
- User has registered account
- User is not logged in

**Test Data:**
```json
{
  "email": "validuser@test.com",
  "password": "Test@123456"
}
```

**Steps:**
1. Navigate to login page
2. Click in Email field
3. Type "validuser@test.com"
4. Click in Password field
5. Type "Test@123456"
6. Click Log in button
7. Wait for redirect

**Expected Results:**
- User logged in successfully
- User redirected to homepage or dashboard
- User email displayed in header (e.g., "validuser@test.com")
- Login link replaced with Logout link
- No error messages displayed

---

### TC_INTEGRATION_001 - Complete Registration Then Login Flow

**Pre-conditions:**
- User not registered or logged in

**Test Data:**
```json
{
  "gender": "Female",
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane.smith.{timestamp}@test.com",
  "password": "Secure@789",
  "confirmPassword": "Secure@789"
}
```

**Steps:**
1. Navigate to register page
2. Select gender: Female
3. Enter First name: "Jane"
4. Enter Last name: "Smith"
5. Enter Email: "jane.smith.{timestamp}@test.com" (unique)
6. Enter Password: "Secure@789"
7. Enter Confirm password: "Secure@789"
8. Click Register button
9. Verify registration success message
10. Note the registered email
11. Navigate to login page
12. Enter the newly registered email
13. Enter password: "Secure@789"
14. Click Log in button

**Expected Results:**
- Registration successful with success message
- Navigation to login page successful
- Login successful with newly registered credentials
- User authenticated and redirected to account page
- User email displayed in header
- Complete end-to-end flow works seamlessly

---

## 6. Email Validation Tests

### TC_REGISTER_FUNC_002 - Registration with Email Missing @ Symbol

**Pre-conditions:**
- User on register page

**Test Data:**
```json
{
  "gender": "Male",
  "firstName": "John",
  "lastName": "Doe",
  "email": "testuser.com",
  "password": "Test@123456",
  "confirmPassword": "Test@123456"
}
```

**Steps:**
1. Navigate to register page
2. Select gender: Male
3. Enter First name: "John"
4. Enter Last name: "Doe"
5. Enter Email: "testuser.com" (without @ symbol)
6. Enter Password: "Test@123456"
7. Enter Confirm password: "Test@123456"
8. Click Register button

**Expected Results:**
- Registration fails
- Error message displayed: "Wrong email" or similar validation error
- Email field highlighted or marked as invalid
- User remains on register page
- Registration does not proceed

---

### TC_REGISTER_FUNC_003 - Registration with Invalid Email Domain

**Pre-conditions:**
- User on register page

**Test Data:**
```json
{
  "gender": "Male",
  "firstName": "John",
  "lastName": "Doe",
  "email": "test@",
  "password": "Test@123456",
  "confirmPassword": "Test@123456"
}
```

**Steps:**
1. Navigate to register page
2. Fill all fields with valid data
3. Enter Email: "test@" (missing domain)
4. Click Register button

**Expected Results:**
- Registration fails
- Error message: "Wrong email" or validation error displayed
- Email field marked as invalid
- User remains on register page

---

### TC_LOGIN_FUNC_007 - Login with Email Missing @ Symbol

**Pre-conditions:**
- User on login page

**Test Data:**
```json
{
  "email": "testuser.com",
  "password": "Test@123456"
}
```

**Steps:**
1. Navigate to login page
2. Enter email: "testuser.com" (without @ symbol)
3. Enter password: "Test@123456"
4. Click Log in button

**Expected Results:**
- Browser validation error OR error message about invalid email format
- Email field marked as invalid
- Login fails
- User remains on login page

---

## 7. Empty Field Validation Tests

### TC_REGISTER_FUNC_005 - Registration with All Fields Empty

**Pre-conditions:**
- User on register page

**Test Data:**
```json
{
  "allFields": "empty"
}
```

**Steps:**
1. Navigate to register page
2. Leave all fields empty (do not enter any data)
3. Click Register button without filling any field

**Expected Results:**
- Registration fails
- Validation errors displayed for all required fields
- Error messages such as:
  - "First name is required"
  - "Last name is required"
  - "Email is required"
  - "Password is required"
- User remains on register page

---

### TC_REGISTER_FUNC_006 - Registration with First Name Empty

**Pre-conditions:**
- User on register page

**Test Data:**
```json
{
  "gender": "Male",
  "firstName": "",
  "lastName": "Doe",
  "email": "test@test.com",
  "password": "Test@123456",
  "confirmPassword": "Test@123456"
}
```

**Steps:**
1. Navigate to register page
2. Select gender: Male
3. Leave First name field empty
4. Enter Last name: "Doe"
5. Enter Email: "test@test.com"
6. Enter Password: "Test@123456"
7. Enter Confirm password: "Test@123456"
8. Click Register button

**Expected Results:**
- Registration fails
- Error message: "First name is required"
- First name field highlighted as invalid
- User remains on register page

---

### TC_REGISTER_FUNC_007 - Registration with Last Name Empty

**Pre-conditions:**
- User on register page

**Test Data:**
```json
{
  "gender": "Male",
  "firstName": "John",
  "lastName": "",
  "email": "test@test.com",
  "password": "Test@123456",
  "confirmPassword": "Test@123456"
}
```

**Steps:**
1. Navigate to register page
2. Fill all fields except Last name
3. Leave Last name field empty
4. Click Register button

**Expected Results:**
- Registration fails
- Error message: "Last name is required"
- Last name field highlighted as invalid
- User remains on register page

---

### TC_REGISTER_FUNC_008 - Registration with Email Empty

**Pre-conditions:**
- User on register page

**Test Data:**
```json
{
  "gender": "Male",
  "firstName": "John",
  "lastName": "Doe",
  "email": "",
  "password": "Test@123456",
  "confirmPassword": "Test@123456"
}
```

**Steps:**
1. Navigate to register page
2. Fill all fields except Email
3. Leave Email field empty
4. Click Register button

**Expected Results:**
- Registration fails
- Error message: "Email is required"
- Email field highlighted as invalid
- User remains on register page

---

### TC_REGISTER_FUNC_009 - Registration with Password Empty

**Pre-conditions:**
- User on register page

**Test Data:**
```json
{
  "gender": "Male",
  "firstName": "John",
  "lastName": "Doe",
  "email": "test@test.com",
  "password": "",
  "confirmPassword": ""
}
```

**Steps:**
1. Navigate to register page
2. Fill all fields except Password and Confirm password
3. Leave Password fields empty
4. Click Register button

**Expected Results:**
- Registration fails
- Error message: "Password is required"
- Password field highlighted as invalid
- User remains on register page

---

### TC_LOGIN_FUNC_004 - Login with Both Email and Password Empty

**Pre-conditions:**
- User on login page

**Test Data:**
```json
{
  "email": "",
  "password": ""
}
```

**Steps:**
1. Navigate to login page
2. Leave both Email and Password fields empty
3. Click Log in button

**Expected Results:**
- Login fails
- Validation error displayed
- Error message indicates required fields are empty
- User cannot login
- User remains on login page

---

### TC_LOGIN_FUNC_005 - Login with Email Empty

**Pre-conditions:**
- User on login page

**Test Data:**
```json
{
  "email": "",
  "password": "Test@123456"
}
```

**Steps:**
1. Navigate to login page
2. Leave Email field empty
3. Enter password: "Test@123456"
4. Click Log in button

**Expected Results:**
- Login fails
- Error message: "Please enter your email" or validation error
- Email field highlighted as invalid
- User remains on login page

---

### TC_LOGIN_FUNC_006 - Login with Password Empty

**Pre-conditions:**
- User on login page

**Test Data:**
```json
{
  "email": "validuser@test.com",
  "password": ""
}
```

**Steps:**
1. Navigate to login page
2. Enter email: "validuser@test.com"
3. Leave Password field empty
4. Click Log in button

**Expected Results:**
- Login fails
- Error message: "Please enter your password" or validation error
- Password field highlighted as invalid
- User remains on login page

---

## 8. Password Validation Tests

### TC_REGISTER_FUNC_010 - Registration with Password Mismatch

**Pre-conditions:**
- User on register page

**Test Data:**
```json
{
  "gender": "Male",
  "firstName": "John",
  "lastName": "Doe",
  "email": "test@test.com",
  "password": "Test@123456",
  "confirmPassword": "Test@654321"
}
```

**Steps:**
1. Navigate to register page
2. Fill all required fields
3. Enter Password: "Test@123456"
4. Enter Confirm password: "Test@654321" (different from password)
5. Click Register button

**Expected Results:**
- Registration fails
- Error message: "The password and confirmation password do not match"
- Confirm password field highlighted as invalid
- User remains on register page

---

### TC_REGISTER_FUNC_011 - Registration with Password Too Short

**Pre-conditions:**
- User on register page

**Test Data:**
```json
{
  "gender": "Male",
  "firstName": "John",
  "lastName": "Doe",
  "email": "test@test.com",
  "password": "12345",
  "confirmPassword": "12345"
}
```

**Steps:**
1. Navigate to register page
2. Fill all required fields
3. Enter short password: "12345" (5 characters)
4. Enter Confirm password: "12345"
5. Click Register button

**Expected Results:**
- Registration fails
- Error message about minimum password length requirement (6 characters)
- Password field highlighted as invalid
- User remains on register page

---

## 9. Invalid Login Credential Tests

### TC_REGISTER_FUNC_004 - Registration with Duplicate Email

**Pre-conditions:**
- User on register page
- Email "existing@test.com" is already registered in system

**Test Data:**
```json
{
  "gender": "Male",
  "firstName": "John",
  "lastName": "Doe",
  "email": "existing@test.com",
  "password": "Test@123456",
  "confirmPassword": "Test@123456"
}
```

**Steps:**
1. Navigate to register page
2. Fill all fields with valid data
3. Enter Email: "existing@test.com" (email that already exists in system)
4. Click Register button

**Expected Results:**
- Registration fails
- Error message: "The specified email already exists" or similar
- Email field may be highlighted
- User remains on register page
- Duplicate account not created

---

### TC_LOGIN_FUNC_002 - Login with Incorrect Password

**Pre-conditions:**
- User on login page
- Valid user account exists

**Test Data:**
```json
{
  "email": "validuser@test.com",
  "password": "WrongPassword123"
}
```

**Steps:**
1. Navigate to login page
2. Enter valid email: "validuser@test.com"
3. Enter incorrect password: "WrongPassword123"
4. Click Log in button

**Expected Results:**
- Login fails
- Error message: "Login was unsuccessful" or similar
- User remains on login page
- No sensitive information revealed about why login failed
- Failed login attempt may be logged

---

### TC_LOGIN_FUNC_003 - Login with Non-existent Email

**Pre-conditions:**
- User on login page

**Test Data:**
```json
{
  "email": "nonexistent@test.com",
  "password": "Test@123456"
}
```

**Steps:**
1. Navigate to login page
2. Enter non-existent email: "nonexistent@test.com"
3. Enter any password: "Test@123456"
4. Click Log in button

**Expected Results:**
- Login fails
- Error message: "Login was unsuccessful" or "No customer account found"
- User remains on login page
- No indication whether email exists or not (security measure)

---

## 10. Security & Input Sanitization Tests

### TC_REGISTER_FUNC_012 - Registration with Special Characters in Name Fields

**Pre-conditions:**
- User on register page

**Test Data:**
```json
{
  "gender": "Male",
  "firstName": "John<script>",
  "lastName": "Doe'OR'1'='1",
  "email": "test@test.com",
  "password": "Test@123456",
  "confirmPassword": "Test@123456"
}
```

**Steps:**
1. Navigate to register page
2. Enter First name: "John<script>" (with script tag)
3. Enter Last name: "Doe'OR'1'='1" (with SQL injection pattern)
4. Fill other fields with valid data
5. Click Register button

**Expected Results:**
- Input is sanitized and accepted OR validation error displayed
- No script execution occurs
- No SQL injection vulnerability
- Either:
  - Special characters are stripped/escaped and registration succeeds
  - OR validation error about invalid characters
- Application remains secure

**Notes:**
- Verify input sanitization is working correctly
- Ensure XSS and SQL injection are prevented
- Check security logs if applicable

---

### TC_LOGIN_FUNC_011 - Login with SQL Injection Attempt in Email Field

**Pre-conditions:**
- User on login page

**Test Data:**
```json
{
  "email": "' OR '1'='1",
  "password": "anything"
}
```

**Steps:**
1. Navigate to login page
2. Enter SQL injection pattern in email field: "' OR '1'='1"
3. Enter any password: "anything"
4. Click Log in button

**Expected Results:**
- Login unsuccessful
- No SQL injection vulnerability exploited
- Appropriate error message displayed (generic error, not SQL error)
- No database error messages exposed to user
- Security event may be logged
- User remains unauthenticated

**Notes:**
- Critical security test
- Verify SQL injection is prevented
- Ensure no sensitive error details revealed

---

### TC_LOGIN_FUNC_012 - Login with XSS Attack in Email Field

**Pre-conditions:**
- User on login page

**Test Data:**
```json
{
  "email": "<script>alert('XSS')</script>@test.com",
  "password": "Test@123456"
}
```

**Steps:**
1. Navigate to login page
2. Enter XSS script in email field: "<script>alert('XSS')</script>@test.com"
3. Enter password: "Test@123456"
4. Click Log in button

**Expected Results:**
- No script execution occurs
- No alert popup displayed
- Input sanitized or rejected
- Login unsuccessful
- User remains on login page
- Application remains secure

**Notes:**
- Critical security test
- Verify XSS protection is working
- Ensure input is properly escaped/sanitized

---

### TC_LOGIN_FUNC_008 - Login with Special Characters in Email

**Pre-conditions:**
- User on login page

**Test Data:**
```json
{
  "email": "test@<script>.com",
  "password": "Test@123456"
}
```

**Steps:**
1. Navigate to login page
2. Enter email with special characters: "test@<script>.com"
3. Enter password: "Test@123456"
4. Click Log in button

**Expected Results:**
- Validation error or sanitized input
- Login unsuccessful
- No script execution
- Input properly handled by application
- User remains on login page

---

## 11. Remember Me Functionality Tests

### TC_LOGIN_FUNC_009 - Login with Remember Me Checked

**Pre-conditions:**
- User on login page
- User has valid account

**Test Data:**
```json
{
  "email": "validuser@test.com",
  "password": "Test@123456",
  "rememberMe": true
}
```

**Steps:**
1. Navigate to login page
2. Enter valid email: "validuser@test.com"
3. Enter valid password: "Test@123456"
4. Check the 'Remember me' checkbox
5. Click Log in button
6. Verify successful login
7. Close browser completely
8. Reopen browser
9. Navigate to https://demowebshop.tricentis.com

**Expected Results:**
- User logged in successfully initially
- Persistent cookie is set (expiration > session)
- After browser restart, user is still logged in
- User email displayed in header
- No need to login again
- Remember me functionality works correctly

---

### TC_LOGIN_FUNC_010 - Login with Remember Me Unchecked

**Pre-conditions:**
- User on login page
- User has valid account

**Test Data:**
```json
{
  "email": "validuser@test.com",
  "password": "Test@123456",
  "rememberMe": false
}
```

**Steps:**
1. Navigate to login page
2. Enter valid email: "validuser@test.com"
3. Enter valid password: "Test@123456"
4. Leave 'Remember me' checkbox unchecked
5. Click Log in button
6. Verify successful login
7. Close browser completely
8. Reopen browser
9. Navigate to https://demowebshop.tricentis.com

**Expected Results:**
- User logged in successfully initially
- Session cookie is set (expires on browser close)
- After browser restart, user is logged out
- Login link visible again in header
- User must login again to access account
- Session was not persisted

---

## 12. Logout & Session Management Tests

### TC_LOGIN_FUNC_013 - User Can Logout After Logging In

**Pre-conditions:**
- User logged in successfully

**Test Data:**
```json
{
  "email": "validuser@test.com",
  "password": "Test@123456"
}
```

**Steps:**
1. Login with valid credentials (email: validuser@test.com, password: Test@123456)
2. Verify successful login
3. Locate Log out link in header
4. Click Log out link
5. Wait for redirect

**Expected Results:**
- User logged out successfully
- User redirected to homepage
- Login link visible again in header (replaces Logout link)
- User email no longer displayed
- Session is terminated
- User must login again to access authenticated pages

---

### TC_LOGIN_FUNC_014 - Session Timeout After Inactivity

**Pre-conditions:**
- User logged in successfully

**Test Data:**
```json
{
  "email": "validuser@test.com",
  "password": "Test@123456",
  "inactivityPeriod": "as per session timeout setting"
}
```

**Steps:**
1. Login successfully with valid credentials
2. Verify successful login
3. Remain inactive for the session timeout period (do not interact with application)
4. After timeout period, try to perform an action (e.g., navigate to account page, add item to cart)
5. Observe behavior

**Expected Results:**
- Session expired after inactivity period
- User logged out automatically
- User prompted to login again OR redirected to login page
- Timeout message may be displayed
- User must re-authenticate to continue

**Notes:**
- Session timeout duration depends on application configuration
- Test with actual configured timeout value
- Verify security of session management

---

## Quality Standards

**Test Specification Requirements:**

- All test scenarios are independent and can be run in any order
- Test cases are grouped by similar operations to enable code reusability:
  - Group 1: Navigation and access tests (can share navigation helpers)
  - Group 2: Authentication state tests (can share login/logout helpers)
  - Group 3: UI visibility tests (can share element locator helpers)
  - Group 4: Password masking tests (can share input validation helpers)
  - Group 5: Valid registration/login (can share form filling helpers)
  - Group 6-11: Various validation tests (can share assertion helpers)
  - Group 12: Session management (can share session helpers)
- Steps use clear, actionable language (Navigate, Click, Type, Enter, Verify)
- Expected results are specific and measurable
- Test data is provided in structured JSON format
- Both positive and negative test scenarios are included
- Security tests validate XSS and SQL injection prevention
- All critical user flows are covered (registration, login, logout)

**Output Format:**
This test plan is structured as a markdown file with:
- Clear hierarchical organization (# → ## → ###)
- Unique TC_ID for each test case maintained from original CSV
- Test cases reorganized by operational similarity for optimal Playwright automation
- Numbered steps for precise test execution
- Bulleted lists for expected results
- JSON format for test data
- Professional formatting suitable for team collaboration and AI test generation

---

**Test Coverage Summary:**
- **Total Test Cases: 35**
- **Critical Priority: 7** (Registration, Login, Duplicate email, Invalid credentials, Security)
- **High Priority: 20** (Access control, Empty fields, Email validation, UI elements)
- **Medium Priority: 7** (UI elements, Security, Remember me, Session management)
- **Low Priority: 1** (Remember me checkbox UI)

**Test Types:**
- Access Control & Security: 4 tests
- Navigation: 4 tests
- UI/UX: 10 tests
- Positive Testing: 3 tests
- Negative Testing: 11 tests
- Security Testing: 4 tests
- Functional Testing: 4 tests
- Integration Testing: 1 test
