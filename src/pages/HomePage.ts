import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
 
export class HomePage extends BasePage {
  // Selectors
  private readonly tShirtsLink = this.page.getByRole('link', { name: 'T-shirts' });
  private readonly dressesLink = this.page.getByRole('link', { name: 'Dresses', exact: true });
  private readonly womenLink = this.page.getByRole('link', { name: 'Women', exact: true });
 
  constructor(page: Page) {
    super(page);
  }
 
  async goto(): Promise<void> {
    await this.navigate('https://automationpractice.techwithjatin.com/');
  }
 
  async goToTShirts(): Promise<void> {
    await this.tShirtsLink.click();
    await this.expectPageTitle('T-shirts - Automation Practice');
  }
 
  async goToDresses(): Promise<void> {
    await this.dressesLink.click();
    await this.expectPageTitle('Dresses - Automation Practice');
  }
 
  async goToWomen(): Promise<void> {
    await this.womenLink.first().click();
    await this.expectPageTitle('Women - Automation Practice');
  }
}