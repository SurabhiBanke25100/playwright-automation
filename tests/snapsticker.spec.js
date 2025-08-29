import {test,expect} from '@playwright/test';
//import { StrictMode } from 'react';
test.use({viewport: { width: 1920, height: 1050 }});

test('search the product',async({page})=>{
     await page.goto("https://snapstickers.com/");
     await expect(page.locator('.announcement-bar')).toHaveText('Welcome to our store');
     await page.getByRole('button',{name: 'Search'}).click();
     await expect(page.locator('#Search-In-Modal')).toBeVisible();
     await page.locator('#Search-In-Modal').fill('custom-holographic-square-sticker');
     await expect(page.getByRole('option',{name: 'custom-holographic-square-sticker'})).toBeVisible();

     await expect(page.locator('div.predictive-search__item-content:has-text("Custom Holographic Square Sticker")')).toBeVisible();
     await page.locator('div.predictive-search__item-content:has-text("Custom Holographic Square Sticker")').click();

     await expect(page).toHaveURL('https://snapstickers.com/products/custom-holographic-square-sticker?_pos=1&_psq=custom-holographic-square-sticker&_ss=e&_v=1.0');
    // await page.getByRole('option',{name: 'custom-holographic-square-sticker'}).click();
     await expect(page.locator('h1')).toHaveText('Custom Holographic Square Sticker');
     //await expect(page.locator('h1')).toHaveText('custom-holographic-square-sticker');
     await page.keyboard.press('ArrowDown');
     await expect(page.locator('#customize')).toBeVisible();
     await page.locator('#customize').click();

     //--------------using iframe to handle the design tool-------
     const iframe = page.frameLocator('#designtool_iframe');
     await iframe.locator('h5:has-text("Tool Panel")').waitFor({ state: 'visible' });

     await iframe.locator('div.modal-header:has-text("Tool Panel") > button.close').click();

     await iframe.locator('button#close').waitFor({ state: 'visible' });
     await iframe.locator('button#close').click();
     
     await expect(iframe.locator('.dnbicon-type')).toBeVisible();
     await iframe.locator('.dnbicon-type').click();
     
     //Validating the Text="Heading" is visible or not
     await expect(iframe.locator('span[data-lang-text="Heading"]')).toBeVisible();
     await iframe.locator('span[data-lang-text="Heading"]').click();
       

     await page.close();
});