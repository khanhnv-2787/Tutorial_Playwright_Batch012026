import { test, expect } from "@playwright/test";

test("should fill value and register successfully", async ({ page }) => {
	await page.goto(
		"https://material.playwrightvn.com/01-xpath-register-page.html"
	);

	const userNameInput = page.locator("#username");
	const emailInput = page.locator("#email");
	const genderRadio = page.locator("input[name='gender'][value='male']");
	const hobbiesCheckbox = page.locator(
		"input[name='hobbies'][value='reading']"
	);
	const interestsSelect = page.locator("select[name='interests']");
	const countrySelect = page.locator("select[name='country']");
	const dobInput = page.locator("input[name='dob']");
	const profileInput = page.locator("input[name='profile']");
	const bioInput = page.locator("textarea[name='bio']");
	const ratingInput = page.locator("input[name='rating']");
	const favcolorInput = page.locator("input[name='favcolor']");
	const newsletterInput = page.locator("input[name='newsletter'][value='yes']");
	const enableFeatureInput = page.locator("label.switch");

	await userNameInput.fill("nvkhanh");
	await emailInput.fill("nvkhanh@example.com");
	await genderRadio.check();
	await hobbiesCheckbox.check();
	await interestsSelect.selectOption(["music"]);
	await countrySelect.selectOption(["usa"]);
	await dobInput.fill("1999-02-01");
	await profileInput.setInputFiles("tests/btth-html/fixtures/avatar-example.png");
	await bioInput.fill("This is a short bio.");
	await ratingInput.fill("5");
	await favcolorInput.fill("#000000");
	await newsletterInput.check();
	await enableFeatureInput.click();

	await expect(userNameInput).toHaveValue("nvkhanh");
	await expect(emailInput).toHaveValue("nvkhanh@example.com");
	await expect(genderRadio).toBeChecked();
	await expect(hobbiesCheckbox).toBeChecked();
	await expect(interestsSelect).toHaveValues(["music"]);
	await expect(countrySelect).toHaveValue("usa");
	await expect(dobInput).toHaveValue("1999-02-01");
	await expect(profileInput).toHaveValue(/avatar-example\.png$/);
	await expect(bioInput).toHaveValue("This is a short bio.");
	await expect(ratingInput).toHaveValue("5");
	await expect(favcolorInput).toHaveValue("#000000");
	await expect(newsletterInput).toBeChecked();
	await expect(enableFeatureInput).toBeChecked();

	const submitButton = page.locator("button[type='submit']");
	await submitButton.click();

	const userTable = page.locator("table#userTable");
	await expect(userTable).toContainText("nvkhanh");
	await expect(userTable).toContainText("nvkhanh@example.com");
});
