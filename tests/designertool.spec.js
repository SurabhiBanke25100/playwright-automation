import {test,expect} from '@playwright/test';
import { beforeEach } from 'node:test';

test.use({viewport: { width: 1920, height: 1050 }});

test.beforeEach(async({page})=>{
   
    await page.goto("https://snapstickers.com/products/custom-holographic-square-sticker");   
   
    
});

 test.afterEach(async({page})=>{
       await page.close();
 })

test('validating the customisation of product',async({page})=>{
    
    await page.waitForSelector('#customize', { state: 'visible' });   // Wait for the element to be visible  this is used due to flakyness
    await page.locator('#customize').click();

     //--------------Using iframe to handle the design tool-----------
     const iframe = page.frameLocator('#designtool_iframe');

     
     await iframe.locator('h5:has-text("Tool Panel")').waitFor({ state: 'visible' });

     await iframe.locator('div.modal-header:has-text("Tool Panel") > button.close').click();

     
     const butonclose = iframe.locator('button#close');
     if(butonclose.isVisible()){
       await butonclose.click();
     }

     await expect(iframe.locator('span:has-text("text")')).toBeVisible();
     await iframe.locator('span:has-text("text")').click(); 

     //Validating the Text="Heading" is visible or not
     await expect(iframe.locator('span[data-lang-text="Paragraph Text"]')).toBeVisible();
     await iframe.locator('span[data-lang-text="Paragraph Text"]').click();
     await expect(iframe.locator('tspan:has-text("Paragraph heading")')).toBeVisible();
     
     //Validating the art on the design tool
     await expect(iframe.locator('span:has-text("art")')).toBeVisible();
     await iframe.locator('span:has-text("art")').click();
     
     const searchbox =iframe.locator('(//input[@data-lang-place-holder="Search"])[2]');
     await searchbox.waitFor({ state: 'visible'});
     await searchbox.click();
     await searchbox.fill('buildings');

     const imgframe = iframe.locator('//category-panel[@id="animalsCat"]//div//category-panelitem//div//img').nth(0);

     await expect(imgframe).toBeVisible({timeout:20000});
     
     const imgLocator = iframe.locator('img[title="buildings1"]');
     await imgLocator.waitFor({state: 'visible', timeout: 15000});
     await imgLocator.click();
     
     await expect(iframe.locator('#workarea')).toBeVisible();
     const imgvisiblity = iframe.locator('(//*[@id="svgcontent"]//*[@class="layer"])[2]');
     await expect(imgvisiblity).toBeVisible();
     console.log(`success msg image is viisble`);
    //  await iframe.locator('#svg_9').first().waitFor({ state: 'visible' ,timeout: 15000});
    
    //validating the photos functionality
      await expect(iframe.locator('span[data-lang-text="Photos"]')).toBeVisible();
     // await iframe.locator('span[data-lang-text="Photos"]').click();
    //   await expect(iframe.locator('a[data-lang-text="Upload"]')).toBeVisible();

      
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

    const designsearchbox =iframe.locator('(//input[@data-lang-place-holder="Search"])[5]');
     await designsearchbox.waitFor({ state: 'visible'});
     await designsearchbox.click();
     await designsearchbox.fill('Classic');

    const designimgframe = iframe.locator('//category-panel[@id="designspanel"]//div//category-panelitem//div//img').nth(0);

     await expect(designimgframe).toBeVisible({timeout:20000});
     
     const designimgLocator = iframe.locator('img[title="Nope mask"]');
     await designimgLocator.waitFor({state: 'visible', timeout: 15000});
     await designimgLocator.click();
      
     //wait until window is visible
     await expect(iframe.locator('div.dialog-msg')).toBeVisible();
     //button assertion
      await expect(iframe.locator('button.btn:has-text("Scrap & Add")')).toBeVisible();
     await iframe.locator('button.btn:has-text("Scrap & Add")').click();
     
     await expect(iframe.locator('#workarea')).toBeVisible();
     const designimgvisiblity = iframe.locator('(//*[@id="svgcontent"]//*[@class="layer"])[4]');
     await expect(designimgvisiblity).toBeVisible();
     console.log(`success msg image is viisble`);



    
        // Wait for search input to be visible
        // await iframe.locator('input[data-lang-place-holder="Search"]').nth(4).waitFor({ state: 'visible', timeout: 15000 });
        // await iframe.locator('input[data-lang-place-holder="Search"]').nth(4).click();
        // await iframe.locator('input[data-lang-place-holder="Search"]').fill('Artwork');

        // await expect(this.iframe.locator('img[title="artistic 20"]')).toBeVisible();
        // await iframe.locator('img[title="artistic 20"]').click();
        // await iframe.locator('button.btn:has-text("Scrap & Add")').waitFor({ state: 'visible', timeout: 15000 });
        // await iframe.locator('button.btn:has-text("Scrap & Add")').click();
    
        
      
     
});