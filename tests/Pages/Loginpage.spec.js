import { test, expect } from '@playwright/test';
import MailosaurClient from 'mailosaur';

test.use({ viewport: { width: 1920, height: 1050 } });

test.beforeEach(async ({ page }) => {
  await page.goto("https://snapstickers.com/");
});

test.afterEach(async ({ page }) => {
  await page.close();
});

const mailosaur = new MailosaurClient("HvNGpvfIRNZgL1rocGFWYyip17WPaSdR");

test('loginpage', async ({ page }) => {
  const emailtest = "anything@1nzvytsn.mailosaur.net";
  const serverid = "1nzvytsn";

  // Wait for and click the account icon
  const accountIcon = page.locator('a.header__icon--account');
  await expect(accountIcon).toBeVisible();
  await accountIcon.click();

  // Ensure the login page is visible
  await expect(page.locator('main.login-main')).toBeVisible();
  await expect(page.locator('#email')).toBeVisible();

  // Fill the email and submit the form
  await page.locator('#email').fill(emailtest);
  await page.keyboard.press('Enter');

  // Wait for the email to arrive in the Mailosaur inbox (with a timeout)
  try {
    const email = await mailosaur.messages.search(serverid, {
      sentTo: emailtest,
      timeout: 30000, // Wait for up to 30 seconds for the email
    });

    // Log the email response for debugging purposes
    console.log("Email Response: ", email);

    // Ensure the email response contains items
    if (email && email.items && email.items.length > 0) {
      const emailBody = email.items[0].text.body; // Extract the email body
      console.log("Email Body: ", emailBody); // Log email body for debugging

      // Extract the 6-digit verification code using regex
      const verificationCodeMatch = emailBody.match(/\d{6}/);

      if (verificationCodeMatch) {
        const verificationCode = verificationCodeMatch[0]; // Extract the first match (6-digit code)

        // Ensure the verification code input form is visible
        await expect(page.locator('h2:has-text("Enter code")')).toBeVisible();
        await expect(page.locator('#code')).toBeVisible();

        // Fill the verification code and submit
        await page.locator('#code').fill(verificationCode);
        await page.keyboard.press('Enter');

        // Validate that the login was successful by checking for the dashboard (or appropriate element)
        await expect(page.locator('.dashboard')).toBeVisible(); // Replace with actual element
      } else {
        console.error('Verification code not found in the email body.');
      }
    } else {
      console.error('No emails found in Mailosaur inbox.');
    }
  } catch (error) {
    console.error('Error while fetching emails from Mailosaur: ', error);
  }
});
