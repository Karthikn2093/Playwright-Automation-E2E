import { test } from '../src/fixtures/Base.Fixture';
import { users } from '../src/data/testData';
 
test.describe('Navigation', () => {
 
  test.beforeEach(async ({ homePage, loginPage }) => {
    await homePage.goto();
    await loginPage.login(users.validUser.email, users.validUser.password);
    await loginPage.expectLoginSuccess();
  });
 
  test('@regression category navigation links go to correct pages', async ({ homePage }) => {
    await homePage.goToTShirts();
    await homePage.goToDresses();
    await homePage.goToWomen();
  });
 
});