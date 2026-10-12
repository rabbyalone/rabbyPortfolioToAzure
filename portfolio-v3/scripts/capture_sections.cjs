const { chromium } = require('playwright');
const path = require('path');

const ARTIFACT_DIR = 'C:\\Users\\USER\\.gemini\\antigravity-ide\\brain\\67d4ba9b-f9be-4334-8eeb-a9dd9608d7f1';

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1.5 });
  await page.goto('http://localhost:5174/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y <= scrollHeight; y += 400) {
    await page.evaluate((top) => window.scrollTo({ top, behavior: 'instant' }), y);
    await page.waitForTimeout(100);
  }
  await page.waitForTimeout(1000);

  // 1. Hero
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'local_sec_01_hero.png') });

  // 2. Works
  await page.evaluate(() => window.scrollTo(0, 900));
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'local_sec_02_works.png') });

  // 3. Services
  await page.evaluate(() => window.scrollTo(0, 2395));
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'local_sec_03_services.png') });

  // 4. About
  await page.evaluate(() => window.scrollTo(0, 3955));
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'local_sec_04_about.png') });

  // 5. Reviews
  await page.evaluate(() => window.scrollTo(0, 4865));
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'local_sec_05_reviews.png') });

  // 6. Contact / Bottom
  await page.evaluate(() => window.scrollTo(0, 6252));
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'local_sec_06_bottom.png') });

  console.log('Saved local_sec_01 through 06');
  await browser.close();
}

main().catch(console.error);
