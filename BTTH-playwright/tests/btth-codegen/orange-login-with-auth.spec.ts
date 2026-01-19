import test, { chromium } from "@playwright/test";

test("test", async ({ page }) => {
	const browser = await chromium.launch();
	const context = await browser.newContext();
	const newPage = await context.newPage();

	// Truy cập trang login
	await newPage.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

	// Thực hiện đăng nhập
	await newPage.getByPlaceholder("Username").fill("Admin");
	await newPage.getByPlaceholder("Password").fill("admin123");
	await newPage.getByRole("button", { name: "Login" }).click();

	// Đợi trang dashboard hoặc một dấu hiệu của đăng nhập thành công
	await newPage.waitForURL("**/dashboard/index");

	// Lưu trạng thái vào file auth.json
	await context.storageState({ path: "./storage/auth.json" });

	await newPage.close();
	await browser.close();
});
