import { test } from '../src/fixtures/Base.Fixture';
import { users, products } from '../src/data/testData';
 
test.describe('Cart & Checkout', () => {
 
  test.beforeEach(async ({ homePage, loginPage }) => {
    await homePage.goto();
    await loginPage.login(users.validUser.email, users.validUser.password);
    await loginPage.expectLoginSuccess();
  });
 
  test('@regression user can add a product to cart and proceed to address step', async ({
    homePage,
    productsPage,
    cartPage,
  }) => {
    // Navigate to Women's category
    await homePage.goToWomen();
 
    // Add a specific product by name
    await productsPage.addProductToCartByName(products.blouse);
 
    // Proceed through checkout steps
    await cartPage.expectCheckoutButtonVisible();
    await cartPage.proceedToCart();
    await cartPage.proceedToAddress();
    await cartPage.saveAddress();
  });
 
});