import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';


test.describe('Kupowanie na saucedemo', () => {
  let inventoryPage: InventoryPage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => { 
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);

    await loginPage.open()
    await loginPage.login('standard_user', 'secret_sauce')
  });


  test('testing inventory', async() => {

    await inventoryPage.addToCart('sauce-labs-backpack')
   await expect(inventoryPage.cartBadge()).toHaveText('1');

  });



});
