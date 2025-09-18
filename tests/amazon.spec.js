import {test,expect} from '@playwright/test';
 test.use({viewport: { width: 1920, height: 1050 }});

 test.beforeEach(async({page})=>{

 await page.goto("https://www.amazon.in/");

 });

 test.afterEach(async({page})=>{
       await page.close();
 });
 const brandname = 'allen solly';

 test('validating the amazon page',async({page})=>{
await expect(page.locator('#twotabsearchtextbox')).toBeVisible();
await page.locator('#twotabsearchtextbox').fill(`t-shirt for man ${brandname}`);
await page.keyboard.press('Enter');

const products =  page.locator('(//div[contains(@class,s-product-image-container)]//span//a//div//img)')
await products.nth(0).click();

await expect(page.locator('#productTitle')).waitFor({state:'visible'});
await page.locator('#inline-twister-expander-content-size_name').waitFor({state:'visible'});
await expect(page.locator('span#size_name_0-announce')).toBeVisible();
await page.locator('span#size_name_0-announce').click();

await expect(page.locator('#quantity')).toBeVisible();

 });