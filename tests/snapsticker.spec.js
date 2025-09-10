import {test,expect} from '@playwright/test';
import { beforeEach } from 'node:test';

test.use({viewport: { width: 1920, height: 1050 }});

test.beforeEach(async({page})=>{
   
    await page.goto("https://stagingaiod4.designnbuy.live/en/coffee-mug.html/");   
    
});

 test.afterEach(async({page})=>{
       await page.close();
 })

test('validating the customisation of product',async({page})=>{
    
    //  await expect(page.locator('.announcement-bar')).toHaveText('Welcome to our store');
    //  await page.getByRole('button',{name: 'Search'}).click();
    //  await expect(page.locator('#Search-In-Modal')).toBeVisible();
    //  await page.locator('#Search-In-Modal').fill('custom-holographic-square-sticker');
    //  await expect(page.getByRole('option',{name: 'custom-holographic-square-sticker'})).toBeVisible();
     
    //  await page.keyboard.press('Enter');

    //  await expect(page.locator('#CardLink--8069671518397')).toBeVisible();
    //  await page.locator('#CardLink--8069671518397').click();

    //  //await expect(page.locator('h1')).toHaveText('Custom Holographic Square Sticker');
    //  //await page.keyboard.press('ArrowDown');

    await page.waitForSelector('#customize', { state: 'visible' });   // Wait for the element to be visible  this is used due to flakyness
    await page.locator('#customize').click();

     //--------------Using iframe to handle the design tool-----------
     const iframe = page.frameLocator('#designtool_iframe');
     await iframe.locator('h5:has-text("Tool Panel")').waitFor({ state: 'visible' });

     await iframe.locator('div.modal-header:has-text("Tool Panel") > button.close').click();

     await iframe.locator('button#close').waitFor({ state: 'visible' });
     await iframe.locator('button#close').click();
     
     await expect(iframe.locator('span:has-text("text")')).toBeVisible();
     await iframe.locator('span:has-text("text")').click(); 

     //Validating the Text="Heading" is visible or not
     await expect(iframe.locator('span[data-lang-text="Paragraph Text"]')).toBeVisible();
     await iframe.locator('span[data-lang-text="Paragraph Text"]').click();
     await expect(iframe.locator('tspan:has-text("Paragraph heading")')).toBeVisible();
     
     //Validating the art on the design tool
     await expect(iframe.locator('span:has-text("art")')).toBeVisible();
     await iframe.locator('span:has-text("art")').click();
     await iframe.locator('h6:has-text("Buildings")').waitFor({ state: 'visible' });
     await iframe.locator('h6:has-text("Buildings")').click();
     const imgLocator = iframe.locator('img[title="buildings1"]');
     await imgLocator.waitFor({state: 'visible'});
     await imgLocator.click();
    //  await iframe.locator('#svg_9').first().waitFor({ state: 'visible' ,timeout: 15000});
    
    //validating the photos functionality
      await expect(iframe.locator('span[data-lang-text="Photos"]')).toBeVisible();
      await iframe.locator('span[data-lang-text="Photos"]').click();
      await expect(iframe.locator('a[data-lang-text="Upload"]')).toBeVisible();
      
    //validating the Codes functionality
      await expect(iframe.locator('span[data-lang-text="Codes"]')).toBeVisible();
      await iframe.locator('span[data-lang-text="Codes"]').click();
      await expect(iframe.locator('span[data-lang-text="Plain Text"]')).toBeVisible();
      await iframe.locator('span[data-lang-text="Plain Text"]').click();
      await expect(iframe.locator('#Plain-Text-Container')).toBeVisible();
      await expect(iframe.locator('textarea[data-lang-place-holder="Please add text"]')).toBeVisible();
      await iframe.locator('textarea[data-lang-place-holder="Please add text"]').fill('amazon.in');
      await page.keyboard.press('Tab'); 
      await page.keyboard.press('Tab'); 
       await page.keyboard.press('Enter'); 
      //  await expect(iframe.locator('span:has-text("Generate")')).toBeVisible();  
      //  await iframe.locator('span:has-text("Generate")').click();
      // await expect(iframe.locator('image[id="svg_12"]').first()).toBeVisible();

      //validating the design functionality
      await expect(iframe.locator('span[data-lang-text="designs"]')).toBeVisible();
      await iframe.locator('span[data-lang-text="designs"]').click(); 
      await expect(iframe.locator('h6[title="Classic"]').first()).toBeVisible();
      await iframe.locator('h6[title="Classic"]').first().click();
      const imgLocatordesign = iframe.locator('img[title="Nope mask"]');
      await expect(imgLocatordesign).toBeVisible();
      await imgLocatordesign.click();

    
        // Wait for search input to be visible
        await iframe.locator('input[data-lang-place-holder="Search"]').nth(4).waitFor({ state: 'visible', timeout: 15000 });
        await iframe.locator('input[data-lang-place-holder="Search"]').nth(4).click();
        await iframe.locator('input[data-lang-place-holder="Search"]').fill('Artwork');

        await expect(this.iframe.locator('img[title="artistic 20"]')).toBeVisible();
        await iframe.locator('img[title="artistic 20"]').click();
        await iframe.locator('button.btn:has-text("Scrap & Add")').waitFor({ state: 'visible', timeout: 15000 });
        await iframe.locator('button.btn:has-text("Scrap & Add")').click();
    
        
      
     
});