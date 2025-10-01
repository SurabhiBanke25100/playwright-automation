import {test,expect} from '@playwright/test';
import { devices } from '@playwright/test';
import { time } from 'console';


test.use({viewport: { width: 1920, height: 1050 }});

const artname = "buildings";
const  qrcodename = "amazon.in";
const designame = "classic";
const templatename = "template for circle";
const bgname = "Automobiles Business card EN";

test.beforeEach(async({page})=>{
   
   await page.goto("https://stagingaiod4.designnbuy.live/en/coffee-mug.html");   
    //await page.goto("https://bwgraphics.com/products/vinyl-banners-copy?_pos=1&_psq=viny&_ss=e&_v=1.0");
  // await page.goto("https://stagingaiod4.designnbuy.live/en/t-shirtblack.html");
  //await page.goto("https://clickprinterco.com/products/vinyl-banners-copy");

    
  });

 test.afterEach(async({page})=>{
    await page.close();
 })

test('validating the customisation of product',async({page})=>{

    await page.waitForSelector('#customize', { state: 'visible' });      //Wait for the element to be visible  this is used due to flakyness
    await page.locator('#customize').click();

     //--------------Using iframe to handle the design tool-----------
     const iframe = page.frameLocator('#designtool_iframe');
    
     const toolpanel = iframe.locator('h5:has-text("Tool Panel")');

     if(toolpanel.isVisible()){ 
     await iframe.locator('div.modal-header:has-text("Tool Panel") > button.close').click();
     } 
     else{
      console.warn("tool panel not visible!!");
     }
     
     await iframe.locator("#canvasBackground").waitFor({state:'visible'});
     

     const settingtab = iframe.locator('span[data-lang-text="settings"]');
     await settingtab.waitFor({state:'visible'});
    
     const butonclose = iframe.locator('button#close');
  // await butonclose.waitFor({state:'visible'});

    if (await butonclose.isVisible()) {   
    await butonclose.click(); 
   } 

     const textSpan = iframe.locator('span[data-lang-text="text"]');
     await textSpan.waitFor({state:'visible'});
     await textSpan.click();
 
     
     //Validating the Text="Heading" is visible or not
     await expect.soft(iframe.locator('span[data-lang-text="Paragraph Text"]')).toBeVisible();
     await iframe.locator('span[data-lang-text="Paragraph Text"]').click();
     
    //  try{
    //  const Unexpectedtokererrtext = iframe.locator('div.dialog-icon');
    //  if(Unexpectedtokererrtext.isVisible()){
    //     await expect(iframe.locator('//div[contains(@class, "dialog-msg")]//p[contains(., "Unexpected token")]')).toBeVisible();
    //      await expect(iframe.locator('button.btn:has-text("Got It")')).toBeVisible();
    //      await iframe.locator('button.btn:has-text("Got It")').click();
    //  }
    // }
    // catch(error){
    //    console.log("Error not found!!,continue the testing!!");
    // }

     const textvalidation = iframe.locator('//*[@id="svgcontent"]//*[contains(@class, "layer")]/*[starts-with(@id, "svg_") and name()="g"]/*[name()="rect"]').nth(0);
     await expect(textvalidation).toBeVisible();
     

      console.log(`success msg: Text element is visible`);
    
     //Validating the art on the design tool
     await expect.soft(iframe.locator('span[data-lang-text="art"]')).toBeVisible();
     await iframe.locator('span[data-lang-text="art"]').click();
     await iframe.locator('tab-pane#artPanel').waitFor({state:'visible'});
     const searchbox =iframe.locator('//tab-pane[@id="artPanel"]//input[@data-lang-place-holder="Search"]');
     await searchbox.waitFor({ state: 'visible'});
     await searchbox.click();
     await searchbox.fill(`${artname}`);
      //content is dynamic 
     const imgframe = iframe.locator('//category-panel[@id="animalsCat"]//div//category-panelitem//div//img').nth(0);
     await expect.soft(imgframe).toBeVisible();
     
     const imgLocator = iframe.locator('img[title="buildings1"]');
     await imgLocator.waitFor({state: 'visible', timeout: 30000});
     await imgframe.click();
     
    //  try{
    //  const tokenerrelementart = iframe.locator('div.dialog-icon');
    //  if(await tokenerrelementart.isVisible()){
    //   await expect(iframe.locator('//div[contains(@class, "dialog-msg")]//p[contains(., "Unexpected token")]')).toBeVisible();
    //   await expect(iframe.locator('button.btn:has-text("Got It")')).toBeVisible();
    //   await iframe.locator('button.btn:has-text("Got It")').click();
    //  }
    // }
    // catch(error){
    //   console.log("Error not found!!,coninue the testing!!");
    // }
    
     await expect(iframe.locator('#workarea')).toBeVisible();
     const imgvisiblity = iframe.locator('//*[@id="svgcontent"]//*[contains(@class, "layer")]/*[contains(@id, "svg_") and name()="g" and .//*[name()="path" and @fill]]');
     await expect(imgvisiblity).toBeVisible();
    
     console.log(`success msg: Art image is viisble`);
   
    
    //validating the photos functionality
      await expect(iframe.locator('span[data-lang-text="Photos"]')).toBeVisible();
      await iframe.locator('span[data-lang-text="Photos"]').click();
      await iframe.locator('tab-pane#photoPanel').waitFor({state:'visible'});
      await iframe.locator('dnb-tabpanel#addTab').waitFor({state:'visible'});
      await iframe.locator('#mycomputer').waitFor({state:'visible'});

     //checking the overlays or preloader are hidden or not to check the chekbox:
     //await iframe.locator('.preloader-wrapper, .modal').waitFor({ state: 'hidden', timeout: 15000 });

     //--------------------checking with diff methoid-------
    const labelLocator = iframe.locator('label.custom-control-label[for^="imageRights-"]');
    await expect(labelLocator).toBeVisible({ timeout: 10000 });
    await labelLocator.click();

    const checkboxLocator = iframe.locator('input.custom-control-input[id^="imageRights-"][type="checkbox"]');
    const isChecked = await checkboxLocator.isChecked();
    console.log("Checkbox checked state:", isChecked);
     
    await iframe.locator('span[data-lang-text="Drag & drop file or click to browse file, supported file(s) {.jpg, .jpeg, .png, .ai, .eps, .pdf}"]').isEnabled();
    await iframe.locator('//dnb-tabpanel[@id="mycomputer"]//div[contains(@class,"upload-file-item")]//i').waitFor({state:'visible'});
    

  //Absolute path for your file (use / or double backslashes for Windows)
  const filePath = 'C:/Users/DNB/Documents/Plywright project test/playwright-automation/tests/UploadFiles/catface.jpg';

  //Ensure 'mycomputer' tab is visible and active
  await expect(iframe.locator('#mycomputer')).toBeVisible();
  await expect(iframe.locator('#mycomputer')).toHaveClass(/active/);

   //Find and set files on the correct hidden input inside 'mycomputer'
    const fileInput = iframe.locator('#mycomputer input[type="file"][accept*=".jpg"]');

   // Check the input exists and is hidden
    const inputCount = await fileInput.count();
    console.log('Found file inputs:', inputCount);

   //Set the file for upload (no need to click any label or icon)
    await fileInput.setInputFiles(filePath);

   //Wait for upload to finish: ensure a new img is present in image-gallery UNDER mycomputer
    const galleryImage = iframe.locator('#mycomputer .image-gallery img');
    await galleryImage.waitFor({ state: 'visible', timeout: 12000 });

   //Screenshot for visual validation (optional)
    await iframe.locator('#mycomputer .image-gallery').screenshot({ path: 'uploaded-gallery.png' });

  //Check how many images appear
    const imgCount = await galleryImage.count();
    console.log('Uploaded images found:', imgCount);

 //validating the Codes functionality
      await expect(iframe.locator('span[data-lang-text="Codes"]')).toBeVisible();
      await iframe.locator('span[data-lang-text="Codes"]').click();
      await expect(iframe.locator('span[data-lang-text="Plain Text"]')).toBeVisible();
      await iframe.locator('span[data-lang-text="Plain Text"]').click();
      await expect(iframe.locator('#Plain-Text-Container')).toBeVisible();
      await expect(iframe.locator('textarea[data-lang-place-holder="Please add text"]')).toBeVisible();
      await iframe.locator('textarea[data-lang-place-holder="Please add text"]').fill(`${qrcodename}`);
      await page.keyboard.press('Tab'); 
      await page.keyboard.press('Tab'); 
      await page.keyboard.press('Enter');

     await expect(iframe.locator('#workarea')).toBeVisible();
     const codeimgvisiblity = iframe.locator('//*[@id="svgcontent"]//*[contains(@class, "layer")]/*[name()="image" and contains(@*[local-name()="href"], "QRcode")]');
     await expect(codeimgvisiblity).toBeVisible();

     console.log(`success msg : Code generated!!!!`);  

    
//------------------------------------------------------------------------------
      //validating the design functionality
      
      await expect(iframe.locator('span[data-lang-text="designs"]')).toBeVisible();
      await iframe.locator('span[data-lang-text="designs"]').click(); 
      await iframe.locator('tab-pane#designsPanel').waitFor({state:'visible'});

     const designsearchbox =iframe.locator('//tab-pane[@id="designsPanel"]//input[contains(@placeholder, "Search") or contains(@data-lang-place-holder, "Search")]');
     await designsearchbox.waitFor({ state: 'visible'});
     await designsearchbox.click();
     await designsearchbox.fill(`${designame}`);  

    
     const designimgframe = iframe.locator('//category-panel[@id="designspanel"]//div//category-panelitem//div//img').nth(0);

     await designimgframe.waitFor({state:'visible'});
     await designimgframe.click();      
      
     //wait until window is visible
     await iframe.locator('div.dialog-msg').waitFor({state:'visible'});
     //button assertion
     await expect(iframe.locator('button.btn:has-text("Scrap & Add")')).toBeVisible();
     await iframe.locator('button.btn:has-text("Scrap & Add")').click();  
     await expect(iframe.locator('#canvasBackground')).toBeVisible({timeout: 15000});
     console.log("design img displayed successfully!");

     //bg module
   
    const bgtab = iframe.locator('span[data-lang-text="background"]');
    try {
    if (await bgtab.isVisible()) {
    await bgtab.click();
    console.log("bg tab is clicked!!");
    await iframe.locator('tab-pane#backgroundPanel').waitFor({state:'visible'});
     
    await iframe.locator(`span:has-text(${bgname})`).waitFor({state:'visible'});
    await iframe.locator(`span:has-text(${bgname})`).nth(0).click();
    await iframe.locator('category-panel#bgCat').waitFor({ state: 'visible' });
    await expect(iframe.locator('//category-panel[@id="bgCat"]//div//img')).toBeVisible();
    await iframe.locator('//category-panel[@id="bgCat"]//div//img').nth(0).click();
    console.log('bg image is selected!!!');
  } 
    // further steps
   else {
    console.warn("bgtab not visible, skipping...");
  }
} catch (error) {
  console.warn("Error interacting with bgtab:", error);
}

//template
    const templatetab = iframe.locator('span[data-lang-text="templates"]');
    try{
    if(await templatetab.isVisible()){ 
      console.log("template tab visible, clicking...");
      await templatetab.click();
      await iframe.locator('tab-pane#templatesPanel').waitFor({state:'visible'});
      const searchbox =iframe.locator('//tab-pane[@id="templatesPanel"]//input[@data-lang-place-holder="Search"]');
      await searchbox.waitFor({ state: 'visible'});
      await searchbox.click();
      await searchbox.fill(`${templatename}`);        
     
      const template =  iframe.locator('//category-panel[@id="templatespanel"]//div//category-panelitem//div//img');

      await expect(template).toBeVisible();
      await template.nth(0).click();
      await iframe.locator('div.dialog-msg').waitFor({state:'visible'});
      await iframe.locator('button.btn:has-text("Continue")').waitFor({state:'visible'});
      await iframe.locator('button.btn:has-text("Continue")').click();
     await expect(iframe.locator('//*[@id="svgcontent"]//*[contains(@class, "layer")]/*[contains(@id, "svg_") and name()="g" and .//*[name()="path" and @fill]]').nth(0)).toBeVisible();
      console.log('image is visible clearly!');
    }
    else{
      console.log("template tab is not displayed, hence skipping click!");
    }
  }
    catch(error){
      console.warn("Error interacting with templatetab:", error);
    }

     //Validating the layouts tool
    const layouttab = iframe.locator('span[data-lang-text="layouts"]');
    try{
    if(await layouttab.isVisible()){
      console.log("layout tab visible ,hence clicking it!!");
     await layouttab.click();
    } 
    else{
      console.warn('Layout tab not exists, skipping click');
    }
  }
  catch(error){
    console.warn("Error interacting with layoutab:", error);
  }
    
     
});