import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://automationpractice.techwithjatin.com/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Automation Practice/);

});

test('Login Test1', async ({ page }) => {
  await page.goto('https://automationpractice.techwithjatin.com/');

  await page.getByRole('link', {name: 'Sign in'}).click();

  await page.locator('#email').fill('njnanjaos@gmail.com');
  await page.locator('#passwd').fill('asomdsaoim')
  await page.getByRole('button', {name :'Sign in'}).click();
  await page.getByText('Authentication failed.').isVisible();
});

test('Link Validation test', async ({ page }) => {
  await page.goto('https://automationpractice.techwithjatin.com/');

  await page.getByRole('link', {name: 'Sign in'}).click();

  await page.locator('#email').fill('kegid85637@bultoc.com');
  await page.locator('#passwd').fill('password')
  await page.getByRole('button', {name :'Sign in'}).click();

  await page.locator('.info-account').isVisible();

  await page.getByRole('link', {name : 'T-shirts'}).click();
  await expect(page).toHaveTitle('T-shirts - Automation Practice');
  await page.getByRole('link', {name : 'Dresses', exact: true}).click();
  await expect(page).toHaveTitle('Dresses - Automation Practice');
  await page.getByRole('link', {name : 'Women', exact: true}).first().click();
  await expect(page).toHaveTitle('Women - Automation Practice');
});

test('Add products', async ({ page }) => {
  await page.goto('https://automationpractice.techwithjatin.com/');

  await page.getByRole('link', {name: 'Sign in'}).click();

  await page.locator('#email').fill('kegid85637@bultoc.com');
  await page.locator('#passwd').fill('password')
  await page.getByRole('button', {name :'Sign in'}).click();
  
  await page.getByRole('link', {name : 'Women', exact: true}).first().click();
  await expect(page).toHaveTitle('Women - Automation Practice');
  await page.locator('.product-container').first().waitFor();
  const products = page.locator('.product-container');
  const count = await products.count();

  for (let i = 0; i < count; i++) {
    const product = products.nth(i);

    const productName = await product.locator('.product-name').innerText();
    console.log(productName);
    if (productName === 'Blouse') {
      // Hover to make Add to cart button visible (important)
      
      await product.hover();

      // Click Add to cart
      await product.locator('.ajax_add_to_cart_button').click();
      break;
    }
  }

  await expect(page.getByRole('link', {name: 'Proceed to checkout'})).toBeVisible();

  await page.getByRole('link', {name: 'Proceed to checkout'}).click();

  await expect(page.getByRole('heading', {name: 'Shopping-cart summary'})).toBeVisible();
  await page.getByRole('link', {name: 'Proceed to checkout'}).click();
  await expect(page).toHaveTitle('Address - Automation Practice');

  await page.getByRole('button', {name: 'Save'}).click();
});