import { test, expect } from "@playwright/test";

// Load trạng thái login từ file
test.use({ storageState: "./storage/auth.json" });

test("Truy cập dashboard sau khi login sẵn", async ({ page }) => {
	await page.goto(
		"https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index",
	);
	// Kiểm tra có mặt phần tử trên dashboard
	await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
});
// Test này sẽ không cần đăng nhập lại, vì trạng thái login đã có trong auth.json.
