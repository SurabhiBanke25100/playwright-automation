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
await page.locator('input#nav-search-submit-button').waitFor({state:'visible'});
await page.locator('input#nav-search-submit-button').click();

await page.waitForSelector('//div[contains(@class,"puis-card-container")]//div//a//h2//span');
const products =  await page.$$('//div[contains(@class,"puis-card-container")]//div//a//h2//span');
for(const product of products){
   const productlist = await product.textContent();
   console.log(productlist);
 
}
const context = page.context();
const [newPage] = await Promise.all([
  context.waitForEvent('page'), // wait for new tab
  page.locator('//div[contains(@class,"puis-card-container")]//div//a//h2//span').first().click()
]);

await newPage.waitForLoadState('domcontentloaded');


// Wait for title section visibility
await page.locator('#titleSection').waitFor({ state: 'visible', timeout: 10000 });
await expect(page.locator('#titleSection')).toBeVisible();

// Get and print product title text
const productTitle = page.locator('#productTitle');
await productTitle.waitFor({ state: 'visible' });
const titleText = await productTitle.textContent();
console.log('Product Title:', titleText.trim());
T


await page.evaluate(()=>{
      window.scrollBy(0,15);
});

await page.locator('div#variation_size_name').waitFor({state:'visible'});

//await page.locator('#native_dropdown_selected_size_name').waitFor({state:'visible'});

await page.locator('span#size_name_0').waitFor({state:'visible'});
await page.locator('span#size_name_0').click();


// await expect(page.locator('#quantity')).toBeVisible();
await page.waitForTimeout(15000);


 });