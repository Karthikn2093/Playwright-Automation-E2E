import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  private readonly proceedToCheckoutLink = this.page.getByRole('link', { name: 'Proceed to checkout' });
  private readonly cartSummaryHeading = this.page.getByRole('heading', { name: 'Shopping-cart summary' });
  private readonly saveButton = this.page.getByRole('button', { name: 'Save' });

  constructor(page: Page) {
    super(page);
  }

  async expectCheckoutButtonVisible(): Promise<void> {
    await this.expectVisible(this.proceedToCheckoutLink);
  }

  async proceedToCart(): Promise<void> {
    await this.proceedToCheckoutLink.click();
    await this.expectVisible(this.cartSummaryHeading);
  }

  async proceedToAddress(): Promise<void> {
    await this.proceedToCheckoutLink.click();
    await this.expectPageTitle('Address - Automation Practice');
  }

  async saveAddress(): Promise<void> {
    await this.saveButton.click();
  }
}