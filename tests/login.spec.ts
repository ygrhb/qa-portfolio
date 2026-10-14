import { test, expect } from '@playwright/test';



test.describe('Logowanie na saucedemo', () => {

  test.beforeEach(async ({ page }) => { // część scenariuszy logowania
    await page.goto('/');
  });

  test('poprawne logowanie przekierowuje na listę produktów', async ({ page }) => {
    await page.getByTestId('username').fill('standard_user');
    await page.getByTestId('password').fill('secret_sauce');
    await page.getByTestId('login-button').click();

    await expect(page).toHaveURL(/inventory/);
    await expect(page.getByText('Products')).toBeVisible();
  });

  test('błędne hasło pokazuje komunikat o błędzie', async ({ page }) => {
    await page.getByTestId('username').fill('standard_user');
    await page.getByTestId('password').fill('zle_haslo');
    await page.getByTestId('login-button').click();

    await expect(page.getByTestId('error')).toContainText('do not match any user');
    await expect(page).toHaveURL('/');
  });


  test('zablokowany użytkownik nie może się zalogować', async ({ page }) => {
    await page.getByTestId('username').fill('locked_out_user');
    await page.getByTestId('password').fill('secret_sauce');
    await page.getByTestId('login-button').click();

    // użytkownik dostaje komunikat o blokadzie
    await expect(page.getByTestId('error')).toContainText('this user has been locked out');
    // i nie trafia na listę produktów
    await expect(page).toHaveURL('/');
  });


  test('użytkownik nie może się zalogować z pustym loginem', async ({ page }) => {
    await page.getByTestId('password').fill('secret_sauce');
    await page.getByTestId('login-button').click();

    // użytkownik dostaje komunikat o potrzebnym loginie
    await expect(page.getByTestId('error')).toContainText('Username is required');
    // i nie trafia na listę produktów
    await expect(page).toHaveURL('/');
  });

  test('użytkownik nie może się zalogować z pustym hasłem', async ({ page }) => {
    await page.getByTestId('username').fill('standard_user');
    await page.getByTestId('login-button').click();

    // użytkownik dostaje komunikat o potrzebnym haśle
    await expect(page.getByTestId('error')).toContainText('Password is required');
    // i nie trafia na listę produktów
    await expect(page).toHaveURL('/');
  });


});

