import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';



test.describe('Logowanie na saucedemo', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => { // część scenariuszy logowania
    loginPage = new LoginPage(page);
    await loginPage.open()
  });

  test('poprawne logowanie przekierowuje na listę produktów', async ({page}) => {
    await loginPage.login('standard_user', 'secret_sauce');

    await expect(page).toHaveURL(/inventory/);
    await expect(page.getByText('Products')).toBeVisible();
  });


  test('błędne hasło pokazuje komunikat o błędzie', async ({ page }) => {

    await loginPage.login('standard_user', 'błędne hasło')

    await expect(page).toHaveURL('/')
    await expect(page.getByTestId('error')).toContainText('do not match any user in this service')

  });


  test('zablokowany użytkownik nie może się zalogować', async ({ page }) => {

    await loginPage.login('locked_out_user', 'secret_sauce')

    await expect(page).toHaveURL('/')
    await expect(page.getByTestId('error')).toContainText('this user has been locked out')
  });


  test('użytkownik nie może się zalogować z pustym loginem', async ({ page }) => {

    await loginPage.login('', 'secret_sauce')

    await expect(page).toHaveURL('/')
    await expect(page.getByTestId('error')).toContainText('Username is required')

  });

  test('użytkownik nie może się zalogować z pustym hasłem', async ({ page }) => {

    await loginPage.login('standard_user', '')

    await expect(page).toHaveURL('/')
    await expect(page.getByTestId('error')).toContainText('Password is required')

  });


});

