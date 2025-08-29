import {test,expect} from '@playwright/test';
//import { StrictMode } from 'react';
test.use({viewport: { width: 1920, height: 1050 }});

test('search the product',async({page})=>{
     await page.goto("https://www.simplesigns.biz/");
     await expect(page.locator('.announcement-bar')).toHaveText('Welcome to Simplesigns.biz');
     await page.getByRole('button',{name: 'Search'}).click();
     await expect(page.locator('#Search-In-Modal')).toBeVisible();
     await page.locator('#Search-In-Modal').fill('I Love Cheer');
     //await expect(page.getByRole('option',{name: 'I Love Cheer'})).toBeVisible();
     await expect(page.locator('div.predictive-search__item-content:has-text("I Love Cheer")')).toBeVisible();
     await page.locator('div.predictive-search__item-content:has-text("I Love Cheer")').click();

     await expect(page).toHaveURL('https://www.simplesigns.biz/products/cheer-v4-bagtagz?_pos=1&_psq=I+Love+Cheer&_ss=e&_v=1.0');
    // await page.getByRole('option',{name: 'custom-holographic-square-sticker'}).click();
     await expect(page.locator('h1')).toHaveText('I Love Cheer');
     //await expect(page.locator('h1')).toHaveText('custom-holographic-square-sticker');
     await page.keyboard.press('ArrowDown');
     await expect(page.locator('#customize')).toBeVisible({timeout: 10000});
     await page.locator('#customize').click();

     //--------------iframe Automation to handle the design tool-------

     const iframe = page.frameLocator('#designtool_iframe');
     await iframe.locator('h5:has-text("Tool Panel")').waitFor({ state: 'visible' });

     await iframe.locator('div.modal-header:has-text("Tool Panel") > button.close').click();

     await iframe.locator('button#close').waitFor({ state: 'visible' });
     await iframe.locator('button#close').click();

     await iframe.locator('.dnbicon-type').click();
     
     await page.close();
});