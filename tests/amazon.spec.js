import {test,expect} from '@playwright/test';
 test.use({viewport: { width: 1920, height: 1050 }});

 test.beforeEach(async({page})=>{

 await page.goto("https://www.amazon.in/");

 });

 test.afterEach(async({page})=>{
       await page.close();
 });

 test('validating the amazon page',async({page})=>{
await expect(page.locator('#twotabsearchtextbox')).toBeVisible();
await page.locator('#twotabsearchtextbox').fill('t-shirt for man');
await page.keyboard.press('Enter');
//await expect(page.locator('h2:has-text("Results")')).toBeVisible();
await page.waitForSelector('#brandsRefinements', { state: 'visible' });   // Wait for the element to be visible  this is used due to flakyness
// // Example: Filter brand "Allen Solly"
const brandCheckbox = page.getByRole('link', { name: /Allen Solly/i });
await brandCheckbox.click();
await expect(brandCheckbox).toBeChecked();

await page.waitForTimeout(5000);

 });