import { test, expect } from '../src/fixtures/Base.Fixture';
import { users, urls } from '../src/data/testData';
 
test.describe('Login', () => {
 
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
  });
 
  test('@smoke homepage has correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Automation Practice/);
  });
 
  test('@regression invalid credentials show authentication error', async ({ loginPage }) => {
    await loginPage.login(users.invalidUser.email, users.invalidUser.password);
    await loginPage.expectLoginFailure();
  });
 
  test('@smoke valid credentials log user in successfully', async ({ loginPage }) => {
    await loginPage.login(users.validUser.email, users.validUser.password);
    await loginPage.expectLoginSuccess();
  });
 
});