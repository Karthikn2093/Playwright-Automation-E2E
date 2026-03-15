import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  // Selectors
  private readonly emailInput = this.page.locator('#email');
  private readonly passwordInput = this.page.locator('#passwd');
  private readonly signInButton = this.page.getByRole('button', { name: 'Sign in' });
  private readonly signInLink = this.page.getByRole('link', { name: 'Sign in' });
  private readonly authErrorMessage = this.page.getByText('Authentication failed.');
  private readonly accountInfo = this.page.locator('.info-account');
 
  constructor(page: Page) {
    super(page);
  }
 
  async goToSignInPage(): Promise<void> {
    await this.signInLink.click();
  }
 
  async login(email: string, password: string): Promise<void> {
    await this.goToSignInPage();
    await this.fillField(this.emailInput, email);
    await this.fillField(this.passwordInput, password);
    await this.signInButton.click();
  }
 
  async expectLoginSuccess(): Promise<void> {
    await this.expectVisible(this.accountInfo);
  }
 
  async expectLoginFailure(): Promise<void> {
    await this.expectVisible(this.authErrorMessage);
  }
}