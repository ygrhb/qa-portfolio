import { test, expect } from '@playwright/test';

test.describe('Logowanie na saucedemo', () => {
  test('poprawne logowanie przekierowuje na listę produktów', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/inventory/);
    await expect(page.getByText('Products')).toBeVisible();
  });

  test('błędne hasło pokazuje komunikat o błędzie', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('zle_haslo');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText(/do not match any user/i)).toBeVisible();
  });
});

test('zablokowany użytkownik nie może się zalogować', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('locked_out_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  // użytkownik dostaje komunikat o blokadzie
  await expect(page.locator('[data-test="error"]')).toContainText('this user has been locked out');
  // i nie trafia na listę produktów
  await expect(page).not.toHaveURL(/inventory/);
});
