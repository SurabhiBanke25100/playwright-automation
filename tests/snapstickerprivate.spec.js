import { test, expect } from '@playwright/test';

// Set viewport globally for the test
test.use({ viewport: { width: 1920, height: 1050 } });

// Use a new incognito context before each test
test.beforeEach(async ({ browser }) => {
  // Create a new incognito context (private browsing mode)
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://snapstickers.com/");

  // Store page and context in test context
  // We don't need to use test.setTestInfo; we just need to use the page directly.
  test.info().page = page;
  test.info().context = context;
});

// Clean up after each test
test.afterEach(async () => {
  // Close the context and associated page after the test
  const page = test.info().page;
  const context = test.info().context;
  await context.close();
});

// Your test case for customizing the product
test('validating the customization of product', async () => {
  const page = test.info().page;

  // Check that the welcome message is visible
  await expect(page.locator('.announcement-bar')).toHaveText('Welcome to our store');
  
  // Perform the search
  await page.getByRole('button', { name: 'Search' }).click();
  await expect(page.locator('#Search-In-Modal')).toBeVisible();
  await page.locator('#Search-In-Modal').fill('custom-holographic-square-sticker');
  await expect(page.getByRole('option', { name: 'custom-holographic-square-sticker' })).toBeVisible();
  
  // Press Enter to search
  await page.keyboard.press('Enter');
  
  // Ensure the product is visible
  await expect(page.locator('#CardLink--8069671518397')).toBeVisible();
  await page.locator('#CardLink--8069671518397').click();
  
  // Wait for the customization section
  await page.waitForSelector('#customize', { state: 'visible' });
  await page.locator('#customize').click();

  // Handle the design tool iframe
  const iframe = page.frameLocator('#designtool_iframe');
  await iframe.locator('h5:has-text("Tool Panel")').waitFor({ state: 'visible' });
  await iframe.locator('div.modal-header:has-text("Tool Panel") > button.close').click();
  
  await iframe.locator('button#close').waitFor({ state: 'visible' });
  await iframe.locator('button#close').click();

  // Click on text and validate functionality
  await expect(iframe.locator('span:has-text("text")')).toBeVisible();
  await iframe.locator('span:has-text("text")').click();
  
  // Validating paragraph text
  await expect(iframe.locator('span[data-lang-text="Paragraph Text"]')).toBeVisible();
  await iframe.locator('span[data-lang-text="Paragraph Text"]').click();
  await expect(iframe.locator('tspan:has-text("Paragraph heading")')).toBeVisible();

  // Validating art on the design tool
  await expect(iframe.locator('span:has-text("art")')).toBeVisible();
  await iframe.locator('span:has-text("art")').click();
  await iframe.locator('h6:has-text("Buildings")').waitFor({ state: 'visible' });
  await iframe.locator('h6:has-text("Buildings")').click();
  
  const imgLocator = iframe.locator('img[title="buildings1"]');
  await imgLocator.waitFor({ state: 'visible' });
  await imgLocator.click();

  // Validate photos functionality
  await expect(iframe.locator('span[data-lang-text="Photos"]')).toBeVisible();
  await iframe.locator('span[data-lang-text="Photos"]').click();
  await expect(iframe.locator('a[data-lang-text="Upload"]')).toBeVisible();

  // Validate Codes functionality
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

  // Validate the design functionality
  await expect(iframe.locator('span[data-lang-text="designs"]')).toBeVisible();
  await iframe.locator('span[data-lang-text="designs"]').click();
  await expect(iframe.locator('h6[title="Classic"]').first()).toBeVisible();
  await iframe.locator('h6[title="Classic"]').first().click();

  const imgLocatordesign = iframe.locator('img[title="Nope mask"]');
  await expect(imgLocatordesign).toBeVisible();
  await imgLocatordesign.click();

  // Wait for search input in iframe
  await iframe.locator('input[data-lang-place-holder="Search"]').nth(4).waitFor({ state: 'visible', timeout: 15000 });
  await iframe.locator('input[data-lang-place-holder="Search"]').nth(4).click();
  await iframe.locator('input[data-lang-place-holder="Search"]').fill('Artwork');

  await expect(iframe.locator('img[title="artistic 20"]')).toBeVisible();
  await iframe.locator('img[title="artistic 20"]').click();
  await iframe.locator('button.btn:has-text("Scrap & Add")').waitFor({ state: 'visible', timeout: 15000 });
  await iframe.locator('button.btn:has-text("Scrap & Add")').click();
  
});
