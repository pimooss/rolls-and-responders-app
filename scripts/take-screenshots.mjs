#!/usr/bin/env node
import { chromium } from 'playwright';

const baseURL = 'http://localhost:5173/rolls-and-responders-app/';
const screenshotDir = '.github/screenshots';

async function takeScreenshots() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  try {
    console.log('📸 Taking screenshots...\n');

    // 1. Landing Page
    console.log('1/5 Landing page...');
    await page.goto(baseURL);
    await page.waitForLoadState('networkidle');
    await page.screenshot({
      path: `${screenshotDir}/01-landing.png`,
      fullPage: true
    });

    // 2. Facilitator Console
    console.log('2/5 Facilitator console...');
    await page.click('button:has-text("Facilitator Console")');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1500);
    await page.screenshot({
      path: `${screenshotDir}/02-facilitator.png`,
      fullPage: true
    });

    // 3. Player Display - Open in new page
    console.log('3/5 Player display...');
    const playerPage = await context.newPage();
    await playerPage.goto(baseURL);
    await playerPage.waitForLoadState('networkidle');
    await playerPage.click('button:has-text("Player Display")');
    await playerPage.waitForLoadState('networkidle');
    await playerPage.waitForTimeout(1500);
    await playerPage.screenshot({
      path: `${screenshotDir}/03-player-display.png`,
      fullPage: true
    });
    await playerPage.close();

    // 4. Dice Rolling Interface
    console.log('4/5 Dice rolling...');
    await page.click('button:has-text("Roll")');
    await page.waitForTimeout(500);
    await page.screenshot({
      path: `${screenshotDir}/04-dice-roll.png`,
      fullPage: true
    });

    // 5. Inject Trigger
    console.log('5/5 Inject interface...');
    // Scroll to injects section using Playwright's locator
    const injectsHeading = page.locator('h3:has-text("Available Injects")').first();
    if (await injectsHeading.count() > 0) {
      await injectsHeading.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
    }
    await page.screenshot({
      path: `${screenshotDir}/05-injects.png`,
      fullPage: true
    });

    console.log('\n✅ Screenshots saved to', screenshotDir);

  } catch (error) {
    console.error('❌ Error taking screenshots:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

takeScreenshots().catch(console.error);
