import {test,expect} from '@playwright/test';

test.use({viewport: {width:1920 ,height:1050}});

test.beforeEach(async({page})=>{
   
    await page.goto("https://snapstickers.com/");   
    
});

test.afterEach(async({page})=>{
  await page.close();
});

test('validating the add to cart functionality',async({page})=>{

 await expect(page.locator('.announcement-bar')).toHaveText('Welcome to our store');
     await page.getByRole('button',{name: 'Search'}).click();
     await expect(page.locator('#Search-In-Modal')).toBeVisible();
     await page.locator('#Search-In-Modal').fill('custom-holographic-square-sticker');
     await expect(page.getByRole('option',{name: 'custom-holographic-square-sticker'})).toBeVisible();
     await page.keyboard.press('Enter');
     await expect(page.locator('#CardLink--8069671518397')).toBeVisible();
     await page.locator('#CardLink--8069671518397').click();

     await page.waitForSelector("#ProductSubmitButton-template--18706941444285__main", {state: 'visible'});
     await page.locator('#ProductSubmitButton-template--18706941444285__main').click();
     await expect(page.locator('h2.cart-notification__heading')).toHaveText('Item added to your cart');

     await expect(page.locator('#cart-notification-button')).toBeVisible();
     await page.locator('#cart-notification-button').click();
    
     //------------cart page validation----------------
     await expect(page.locator('div.title-wrapper-with-link')).toBeVisible();
     await expect(page.locator('#CartItem-1')).toBeVisible();
     await expect(page.locator('#Quantity-1')).toBeVisible();
    
     const quantityInput = page.locator('input.quantity__input');
     await expect(quantityInput).toHaveAttribute('value', '1');

    //---------checkout page validation--------------------
    await expect(page.locator('#checkout')).toBeVisible();
    await page.locator('#checkout').click();
    const url=  await expect(page).toHaveURL(/checkout/);
    const currentUrl = page.url();
    console.log(`Navigated to checkout page: ${currentUrl}`);

    




});
