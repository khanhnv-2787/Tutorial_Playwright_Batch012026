import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).click();
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('H');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Hoc ');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Hoc P');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Hoc Playwright');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  await page.getByRole('checkbox', { name: 'Toggle Todo' }).check();
  await page.getByRole('button', { name: 'Delete' }).click();
  await expect(page.locator('.todo-list li')).toHaveCount(0);
});