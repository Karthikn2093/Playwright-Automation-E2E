import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
  private readonly productContainers = this.page.locator('.product-container');

  constructor(page: Page) {
    super(page);
  }
  
  async addProductToCartByName(productName: string): Promise<void> {
    await this.waitForLocator(this.productContainers.first());

    const count = await this.productContainers.count();

    for (let i = 0; i < count; i++) {
      const product = this.productContainers.nth(i);
      const name = await product.locator('.product-name').innerText();

      if (name.trim() === productName) {
        await product.hover();
        await product.locator('.ajax_add_to_cart_button').click();
        return;
      }
    }

    throw new Error(`Product "${productName}" was not found on the page.`);
  }
}