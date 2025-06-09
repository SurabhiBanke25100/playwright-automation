import { test, expect } from '@playwright/test';

test.use({
  viewport: { width: 1920, height: 1050 }
});

test('interact with cross-origin iframe', async ({ page }) => {
  await page.goto('https://gamiz-wp.designnbuy.biz/');

  // Search for product
  await page.locator('#dgwt-wcas-search-input-1').click();
  await page.locator('#dgwt-wcas-search-input-1').fill('T-Shirt (QA)');
  await page.locator('.dgwt-wcas-st-title', { hasText: 'T-Shirt (QA)' }).click();

  // Click personalize
  await page.getByRole('button', { name: /personalize/i }).click();

  // Interact with iframe
  const iframe = page.frameLocator('#designtool_iframe');

  await iframe.locator('button#close').waitFor({ state: 'visible' });
  await iframe.locator('button#close').click();

 // await iframe.locator('//div[@class=".modal-header"]').waitFor({ state: 'visible' });
  //const heading = await page.locator('h5.caption.text-uppercase');
  //await heading.waitFor({state: 'visible'});

 /* const headingText = await heading.textContent();
  expect(headingText).toBe('Tool Panel');*/

  await iframe.locator('div.modal-header:has-text("Tool Panel") > button.close').click();

  await expect(iframe.locator('.dnbicon-type')).toBeVisible();
  await iframe.locator('.dnbicon-type').click();

//Validating the Text="Heading" is visible or not
  await expect(iframe.locator('span[data-lang-text="Heading"]')).toBeVisible();
  await iframe.locator('span[data-lang-text="Heading"]').click();
 
  await expect(iframe.locator('svg#canvasBackground')).toBeVisible();
  await  expect(iframe.locator('rect#svg_3')).toBeVisible({timeout:10000});

//Validating the Art is visible or not
  await iframe.locator('span.tab-caption:has-text("art")').click();

  
 // await expect(iframe.locator('input[data-lang-place-holder="Search"]')).toBeVisible({ timeout: 10000 });

  const searchInput = iframe.locator('input[data-lang-place-holder="Search"]');
  await expect(searchInput).toBeVisible({timeout: 10000});
  await searchInput.click();
  await searchInput.fill('animals');
  await searchInput.press('Enter');

  await expect(iframe.locator('img[alt="animals2 design"]')).toBeVisible({ timeout: 50000 });
  await iframe.locator('img[alt="animals2 design"]').click();
  

});
