import { Page, Locator } from "@playwright/test";

export class InventoryPage {
    constructor(private page: Page) {
    }

    async addToCart(nazwa: string): Promise<void> {
        await this.page.getByTestId(`add-to-cart-${nazwa}`).click();
    }

    cartBadge(): Locator {
        return this.page.getByTestId('shopping-cart-badge');
    }
}