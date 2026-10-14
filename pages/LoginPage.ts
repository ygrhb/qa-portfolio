
import { Page } from  "@playwright/test";

export class LoginPage {

    constructor(private page: Page) {
    }

    async open(): Promise<void> {
        await this.page.goto('/');      
    }

    async login(username:string, password:string): Promise<void> {
        await this.page.getByTestId('username').fill(username)
        await this.page.getByTestId('password').fill(password)
        await this.page.getByTestId('login-button').click()
    }
}


