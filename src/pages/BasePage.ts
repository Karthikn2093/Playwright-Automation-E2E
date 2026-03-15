import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigate(path: string = ''): Promise<void> {
        await this.page.goto(path);
    }

    async clickByRole(role: 'link' | 'button' | 'heading', name: string, exact: boolean = false): Promise<void> {
        await this.page.getByRole(role, { name, exact }).click();
    }

    async fillField(locator: Locator, value: string): Promise<void> {
        await locator.fill(value);
    }

    async expectPageTitle(titlePattern: string | RegExp): Promise<void> {
        await expect(this.page).toHaveTitle(titlePattern);
    }

    async expectVisible(locator: Locator): Promise<void> {
        await expect(locator).toBeVisible();
    }

    async waitForLocator(locator: Locator): Promise<void> {
        await locator.waitFor();
    }

    async selectDropDownOption(locator: Locator, value: string): Promise<void> {
        await locator.selectOption(value);
    }

    async selectCustomDropdownOption(locator: Locator, value: string): Promise<void> {
        await locator.click();
        await this.page.getByRole('list', { name: value }).click();
    }

}