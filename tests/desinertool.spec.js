import { test, expect } from '@playwright/test';

test.use({
  viewport: { width: 1903, height: 969 }
});

test('Designer Tool Automation - Coffee Mug Personalization', async ({ page }) => {
  // Navigate to the staging site
  await page.goto('https://stagingaiod4.designnbuy.live/en/');

  // Search for the product "coffee mug"
  const searchInput = page.locator('input#search');
  await searchInput.click();
  await searchInput.fill('coffee mug');
  await page.keyboard.press('Enter');

  // Wait for product link and click
  const productLink = page.locator('a.product-item-link:has-text("coffee mug")');
  await expect(productLink).toBeVisible();
  await productLink.click();

  // Click on the "Personalize" button
  const personalizeButton = page.getByRole('button', { name: /personalize/i });
  await expect(personalizeButton).toBeVisible();
  await personalizeButton.click();

  // Switch to iframe and validate preview popup
  const iframe = page.frameLocator('#designtool_iframe');
  /*const previewPopup = iframe.locator('preview-popup#previewPopup');
  await expect(previewPopup).toBeVisible({timeout: 10000});*/

  // Close preview popup
  const closeButton = iframe.locator('button#close');
  await expect(closeButton).toBeVisible();
  await closeButton.click();

  // Close tool panel modal
  const toolPanelClose = iframe.locator('div.modal-header:has-text("Tool Panel") > button.close');
  await expect(toolPanelClose).toBeVisible();
  await toolPanelClose.click();

  // Click on "Text" tool
  const textToolIcon = iframe.locator('.dnbicon-type');
  await expect(textToolIcon).toBeVisible();
  await textToolIcon.click();

  // Validate and click on "Heading" text option
  const headingText = iframe.locator('span[data-lang-text="Heading"]');
  await expect(headingText).toBeVisible();
  await headingText.click();

  // Validate canvas visibility
  await expect(iframe.locator('svg#canvasBackground')).toBeVisible();
  await expect(iframe.locator('rect#svg_3')).toBeVisible();

  // Click on "Art" tab
  const artTab = iframe.locator('span.tab-caption:has-text("art")');
  await expect(artTab).toBeVisible();
  await artTab.click();

  // Search and select "4th July" art
  const artSearchInput = iframe.locator('(//input[@data-lang-place-holder="Search"])[2]');
  await expect(artSearchInput).toBeVisible();
  await artSearchInput.fill('4th July');
  await expect(iframe.locator('//span[@data-lang-text="Search Result"]')).toBeVisible();
  const artImage = iframe.locator('//img[contains(@alt, "4th July - 1 design")]');
  await expect(artImage).toBeVisible();
  await artImage.click();


});
