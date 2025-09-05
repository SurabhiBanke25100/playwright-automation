import { test, expect } from '@playwright/test';
import MailosaurClient from 'mailosaur';

test.use({ viewport: { width: 1920, height: 1050 } });

const mailosaur = new MailosaurClient("HvNGpvfIRNZgL1rocGFWYyip17WPaSdR");

test('verify code email received', async ({ page }) => {
  const emailtest = "anything@1nzvytsn.mailosaur.net";
  const serverid = "1nzvytsn";

  // Step 1: Go to site & trigger login
  await page.goto("https://snapstickers.com/");
  const accountIcon = page.locator('a.header__icon--account');
  await expect(accountIcon).toBeVisible();
  await accountIcon.click();

  await expect(page.locator('#email')).toBeVisible();
  await page.locator('#email').fill(emailtest);
  await page.keyboard.press('Enter');

  // Step 2: Wait for OTP page
  //await page.waitForSelector('#code', { timeout: 20000 });

  // Step 3: Fetch latest email from Mailosaur
  const email = await mailosaur.messages.get(serverid, {
    sentTo: emailtest,
  });

  console.log("Email Subject:", email.subject);

  // Step 4: Verify email contains 6-digit code
  const verificationCodeMatch = email.text.body.match(/\d{6}/);
  expect(verificationCodeMatch).not.toBeNull(); // ✅ Assertion: code is present

  console.log("✅ Verification code received:", verificationCodeMatch[0]);


});